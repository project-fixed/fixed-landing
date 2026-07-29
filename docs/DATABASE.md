# 🗄️ Modelo de Base de Datos - Fixed Production Schema

Este documento define la estructura y relaciones del almacenamiento persistente en la base de datos de producción (Supabase/PostgreSQL) para la plataforma Fixed.

## Diagrama de Entidad-Relación (ERD)

El siguiente diagrama ilustra las tablas del sistema y sus relaciones lógicas:

```mermaid
erDiagram
    users {
        uuid id PK
        varchar email UNIQUE
        varchar first_name
        varchar last_name
        varchar username UNIQUE
        varchar phone_number UNIQUE
        varchar picture_url
        boolean email_verified
        timestamptz created_at
        timestamptz updated_at
    }
    teams {
        uuid id PK
        varchar name UNIQUE
        varchar logo_url
        varchar primary_color
        timestamptz created_at
        timestamptz updated_at
    }
    leagues {
        uuid id PK
        varchar name UNIQUE
        varchar country
        varchar logo_url
        varchar status "ACTIVE / INACTIVE"
        timestamptz created_at
        timestamptz updated_at
    }
    matches {
        uuid id PK
        uuid league_id FK
        uuid home_team_id FK
        uuid away_team_id FK
        varchar season
        varchar round
        timestamptz kickoff_at
        varchar status "PENDING/LIVE/FINISHED/etc"
        integer home_goals
        integer away_goals
        jsonb features
        integer fixture_api_id
        integer home_corners
        integer away_corners
        integer home_shots_on_target
        integer away_shots_on_target
        integer home_yellow_cards
        integer away_yellow_cards
        integer home_shots
        integer away_shots
        numeric home_possession
        numeric away_possession
        timestamptz created_at
        timestamptz updated_at
    }
    bets {
        uuid id PK
        uuid match_id FK
        varchar market "1X2/OVER_UNDER_GOALS/etc"
        varchar fixed_outcome "1/X/2/OVER/etc"
        numeric odds
        numeric probability
        numeric ev
        numeric kelly
        varchar status "PENDING/WON/LOST"
        boolean is_premium
        numeric line
        timestamptz created_at
        timestamptz updated_at
    }
    match_predictions {
        uuid id PK
        uuid match_id FK
        varchar market "GOALS/SHOTS/1X2/etc"
        varchar status
        numeric home_expected
        numeric away_expected
        timestamptz created_at
        timestamptz updated_at
    }
    team_ratings {
        uuid id PK
        uuid team_id FK
        uuid match_id FK
        numeric elo_rating
        date date
        timestamptz created_at
    }
    model_performance {
        uuid id PK
        numeric hit_rate
        numeric yield
        integer total_bets
        date period_start
        date period_end
        timestamptz created_at
    }
    backfill_progress {
        integer league_api_id PK
        integer season PK
        boolean is_completed
        timestamptz updated_at
    }
    leads {
        uuid id PK
        text email UNIQUE
        varchar lang
        varchar status "pending/invited/etc"
        text utm_source
        text utm_medium
        text utm_campaign
        timestamptz created_at
        timestamptz updated_at
    }

    matches }o--|| leagues : "belongs_to"
    matches }o--|| teams : "has_home_team"
    matches }o--|| teams : "has_away_team"
    bets }o--|| matches : "references_match"
    match_predictions }o--|| matches : "generates_prediction_for"
    team_ratings }o--|| teams : "tracks_elo_for"
    team_ratings }o--|| matches : "updates_on"
```

---

## Diccionario de Datos

### 1. `users`

Almacena la información de autenticación y perfil de los usuarios finales de la plataforma.

| Campo            | Tipo          | Constraints                 | Descripción                                            |
| :--------------- | :------------ | :-------------------------- | :----------------------------------------------------- |
| `id`             | `uuid`        | PK, NOT NULL                | Identificador único del usuario (mapeado a Auth UUID). |
| `email`          | `varchar`     | UNIQUE, NOT NULL            | Correo electrónico principal del usuario.              |
| `first_name`     | `varchar`     | NULL                        | Nombre del usuario.                                    |
| `last_name`      | `varchar`     | NULL                        | Apellidos del usuario.                                 |
| `username`       | `varchar`     | UNIQUE, NULL                | Nombre de usuario único en el sistema.                 |
| `phone_number`   | `varchar`     | UNIQUE, NULL                | Número celular.                                        |
| `picture_url`    | `varchar`     | NULL                        | Enlace a la imagen de perfil.                          |
| `email_verified` | `boolean`     | DEFAULT `false`             | Indica si el correo electrónico ha sido validado.      |
| `created_at`     | `timestamptz` | DEFAULT `CURRENT_TIMESTAMP` | Fecha de creación del registro.                        |
| `updated_at`     | `timestamptz` | DEFAULT `CURRENT_TIMESTAMP` | Última actualización del perfil.                       |

### 2. `teams`

Listado de equipos de fútbol procesados por el modelo predictivo.

| Campo           | Tipo          | Constraints                     | Descripción                             |
| :-------------- | :------------ | :------------------------------ | :-------------------------------------- |
| `id`            | `uuid`        | PK, DEFAULT `gen_random_uuid()` | Identificador único del equipo.         |
| `name`          | `varchar`     | UNIQUE, NOT NULL                | Nombre oficial del equipo.              |
| `logo_url`      | `varchar`     | NULL                            | Enlace al logo oficial.                 |
| `primary_color` | `varchar`     | NULL                            | Color hex principal para estilos en UI. |
| `created_at`    | `timestamptz` | DEFAULT `CURRENT_TIMESTAMP`     | Fecha de registro.                      |
| `updated_at`    | `timestamptz` | DEFAULT `CURRENT_TIMESTAMP`     | Última actualización.                   |

### 3. `leagues`

Ligas o torneos soportados.

| Campo        | Tipo          | Constraints                                                    | Descripción                                    |
| :----------- | :------------ | :------------------------------------------------------------- | :--------------------------------------------- |
| `id`         | `uuid`        | PK, DEFAULT `gen_random_uuid()`                                | Identificador único de la liga.                |
| `name`       | `varchar`     | UNIQUE, NOT NULL                                               | Nombre de la competición.                      |
| `country`    | `varchar`     | NULL                                                           | País organizador.                              |
| `logo_url`   | `varchar`     | NULL                                                           | Enlace al logo oficial.                        |
| `status`     | `varchar`     | DEFAULT `'ACTIVE'`, CHECK (status = `'ACTIVE'` / `'INACTIVE'`) | Estado operativo de sincronización de la liga. |
| `created_at` | `timestamptz` | DEFAULT `CURRENT_TIMESTAMP`                                    | Fecha de creación.                             |
| `updated_at` | `timestamptz` | DEFAULT `CURRENT_TIMESTAMP`                                    | Última actualización.                          |

### 4. `matches`

Encuentros deportivos con estadísticas y métricas agregadas tras su finalización.

| Campo                  | Tipo          | Constraints                       | Descripción                                                                                |
| :--------------------- | :------------ | :-------------------------------- | :----------------------------------------------------------------------------------------- |
| `id`                   | `uuid`        | PK, DEFAULT `gen_random_uuid()`   | Identificador único del encuentro.                                                         |
| `league_id`            | `uuid`        | FK -> `leagues(id)`, NOT NULL     | Liga a la que pertenece el encuentro.                                                      |
| `home_team_id`         | `uuid`        | FK -> `teams(id)`, NOT NULL       | Equipo que juega de local.                                                                 |
| `away_team_id`         | `uuid`        | FK -> `teams(id)`, NOT NULL       | Equipo que juega de visitante.                                                             |
| `season`               | `varchar`     | NOT NULL                          | Temporada (ej. `2025/2026`).                                                               |
| `round`                | `varchar`     | NOT NULL                          | Jornada o ronda del torneo.                                                                |
| `kickoff_at`           | `timestamptz` | NOT NULL                          | Hora y fecha de inicio del encuentro.                                                      |
| `status`               | `varchar`     | DEFAULT `'PENDING'`, CHECK status | Estado del encuentro (`PENDING`, `LIVE`, `FINISHED`, `POSTPONED`, `CANCELLED`, `SKIPPED`). |
| `home_goals`           | `integer`     | NULL                              | Goles marcados por el local.                                                               |
| `away_goals`           | `integer`     | NULL                              | Goles marcados por el visitante.                                                           |
| `features`             | `jsonb`       | NULL                              | Métricas agregadas y datos avanzados en formato JSON.                                      |
| `fixture_api_id`       | `integer`     | NULL                              | ID del partido en la API externa proveedora.                                               |
| `home_corners`         | `integer`     | NULL                              | Tiros de esquina del local.                                                                |
| `away_corners`         | `integer`     | NULL                              | Tiros de esquina del visitante.                                                            |
| `home_shots_on_target` | `integer`     | NULL                              | Tiros al arco del local.                                                                   |
| `away_shots_on_target` | `integer`     | NULL                              | Tiros al arco del visitante.                                                               |
| `home_yellow_cards`    | `integer`     | NULL                              | Tarjetas amarillas del local.                                                              |
| `away_yellow_cards`    | `integer`     | NULL                              | Tarjetas amarillas del visitante.                                                          |
| `home_shots`           | `integer`     | NULL                              | Tiros totales del local.                                                                   |
| `away_shots`           | `integer`     | NULL                              | Tiros totales del visitante.                                                               |
| `home_possession`      | `numeric`     | NULL                              | Posesión de balón del local (0-100).                                                       |
| `away_possession`      | `numeric`     | NULL                              | Posesión de balón del visitante (0-100).                                                   |
| `created_at`           | `timestamptz` | DEFAULT `CURRENT_TIMESTAMP`       | Fecha de creación.                                                                         |
| `updated_at`           | `timestamptz` | DEFAULT `CURRENT_TIMESTAMP`       | Última actualización.                                                                      |

### 5. `bets`

Oportunidades de apuestas de valor (Value Bets) calculadas por los modelos cuantitativos.

| Campo           | Tipo          | Constraints                       | Descripción                                                                                                                                                                         |
| :-------------- | :------------ | :-------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`            | `uuid`        | PK, DEFAULT `gen_random_uuid()`   | Identificador único del pick.                                                                                                                                                       |
| `match_id`      | `uuid`        | FK -> `matches(id)`, NOT NULL     | Partido asociado.                                                                                                                                                                   |
| `market`        | `varchar`     | NOT NULL, CHECK market            | Mercado de apuesta (`1X2`, `OVER_UNDER_GOALS`, `BOTH_TEAMS_TO_SCORE`, `OVER_UNDER_CORNERS`, `OVER_UNDER_CARDS`, `OVER_UNDER_SHOTS`, `OVER_UNDER_SHOTS_ON_TARGET`, `DOUBLE_CHANCE`). |
| `fixed_outcome` | `varchar`     | NOT NULL, CHECK outcome           | Selección de resultado recomendada (`1`, `X`, `2`, `OVER`, `UNDER`, `YES`, `NO`, `1X`, `12`, `X2`).                                                                                 |
| `odds`          | `numeric`     | NOT NULL                          | Cuota del mercado ofrecida por las casas.                                                                                                                                           |
| `probability`   | `numeric`     | NOT NULL                          | Probabilidad matemática estimada por nuestro modelo (0-1).                                                                                                                          |
| `ev`            | `numeric`     | NOT NULL                          | Valor esperado estimado (EV, ej: `0.08` para 8%).                                                                                                                                   |
| `kelly`         | `numeric`     | NULL                              | Stake óptimo sugerido mediante Criterio de Kelly.                                                                                                                                   |
| `status`        | `varchar`     | DEFAULT `'PENDING'`, CHECK status | Estado de la resolución del pick (`PENDING`, `WON`, `LOST`).                                                                                                                        |
| `is_premium`    | `boolean`     | DEFAULT `false`                   | Indica si es un pick restringido para suscripción premium.                                                                                                                          |
| `line`          | `numeric`     | NULL                              | Línea numérica del mercado (ej: `2.5` en goles o `9.5` en corners).                                                                                                                 |
| `created_at`    | `timestamptz` | DEFAULT `CURRENT_TIMESTAMP`       | Fecha de cálculo y subida.                                                                                                                                                          |
| `updated_at`    | `timestamptz` | DEFAULT `CURRENT_TIMESTAMP`       | Última actualización.                                                                                                                                                               |

### 6. `match_predictions`

Predicciones crudas del modelo para goles o estadísticas esperadas por equipo.

| Campo           | Tipo          | Constraints                     | Descripción                                                                                                            |
| :-------------- | :------------ | :------------------------------ | :--------------------------------------------------------------------------------------------------------------------- |
| `id`            | `uuid`        | PK, DEFAULT `gen_random_uuid()` | Identificador de la predicción.                                                                                        |
| `match_id`      | `uuid`        | FK -> `matches(id)`, NOT NULL   | Partido asociado.                                                                                                      |
| `market`        | `varchar`     | NOT NULL, CHECK market          | Mercado (`GOALS`, `SHOTS`, `SHOTS_ON_TARGET`, `CORNERS`, `YELLOW_CARDS`, `FOULS`, `OFFSIDES`, `1X2`, `DOUBLE_CHANCE`). |
| `status`        | `varchar`     | DEFAULT `'ACTIVE'`              | Estado de la predicción.                                                                                               |
| `home_expected` | `numeric`     | NULL                            | Cantidad / probabilidad esperada de la estadística para el local.                                                      |
| `away_expected` | `numeric`     | NULL                            | Cantidad / probabilidad esperada de la estadística para el visitante.                                                  |
| `created_at`    | `timestamptz` | DEFAULT `CURRENT_TIMESTAMP`     | Creación del registro.                                                                                                 |
| `updated_at`    | `timestamptz` | DEFAULT `now()`                 | Última actualización.                                                                                                  |

### 7. `team_ratings`

Calificaciones y rankings históricos dinámicos (ELO) de los equipos.

| Campo        | Tipo          | Constraints                     | Descripción                                     |
| :----------- | :------------ | :------------------------------ | :---------------------------------------------- |
| `id`         | `uuid`        | PK, DEFAULT `gen_random_uuid()` | Identificador del registro.                     |
| `team_id`    | `uuid`        | FK -> `teams(id)`               | Equipo calificado.                              |
| `elo_rating` | `numeric`     | NOT NULL                        | Calificación de poder ELO en la fecha indicada. |
| `date`       | `date`        | NOT NULL                        | Fecha de la calificación.                       |
| `match_id`   | `uuid`        | FK -> `matches(id)`             | Partido que generó la recalibración del rating. |
| `created_at` | `timestamptz` | DEFAULT `now()`                 | Creación del registro.                          |

### 8. `model_performance`

Métricas consolidadas de rendimiento del modelo predictivo.

| Campo          | Tipo          | Constraints                     | Descripción                                       |
| :------------- | :------------ | :------------------------------ | :------------------------------------------------ |
| `id`           | `uuid`        | PK, DEFAULT `gen_random_uuid()` | Identificador único de métrica.                   |
| `hit_rate`     | `numeric`     | NOT NULL                        | Tasa de acierto del modelo (ej: `0.65` para 65%). |
| `yield`        | `numeric`     | NOT NULL                        | Rendimiento histórico (yield) porcentual.         |
| `total_bets`   | `integer`     | NOT NULL                        | Total de apuestas evaluadas en el periodo.        |
| `period_start` | `date`        | NOT NULL                        | Inicio del periodo de análisis de métricas.       |
| `period_end`   | `date`        | NOT NULL                        | Fin del periodo de análisis de métricas.          |
| `created_at`   | `timestamptz` | DEFAULT `CURRENT_TIMESTAMP`     | Registro.                                         |

### 9. `backfill_progress`

Control administrativo para la recolección de datos históricos (backfilling).

| Campo           | Tipo          | Constraints                 | Descripción                                                    |
| :-------------- | :------------ | :-------------------------- | :------------------------------------------------------------- |
| `league_api_id` | `integer`     | PK, NOT NULL                | ID de la liga en el proveedor externo.                         |
| `season`        | `integer`     | PK, NOT NULL                | Año de la temporada (ej. `2024`).                              |
| `is_completed`  | `boolean`     | DEFAULT `false`             | Indica si los datos históricos se han importado completamente. |
| `updated_at`    | `timestamptz` | DEFAULT `CURRENT_TIMESTAMP` | Última actualización administrativa.                           |

### 10. `leads`

Registro de solicitudes de acceso a la Beta cerrada y lista de espera de la Landing Page.

| Campo          | Tipo          | Constraints                     | Descripción                                                   |
| :------------- | :------------ | :------------------------------ | :------------------------------------------------------------ |
| `id`           | `uuid`        | PK, DEFAULT `gen_random_uuid()` | Identificador del lead.                                       |
| `email`        | `text`        | UNIQUE, NOT NULL                | Correo electrónico registrado.                                |
| `lang`         | `varchar`     | NOT NULL                        | Idioma del registro (`es` / `en`).                            |
| `status`       | `varchar`     | NOT NULL, DEFAULT `'pending'`   | Estado del lead (`pending`, `invited`, `active`, `rejected`). |
| `utm_source`   | `text`        | NULL                            | Canal de origen de marketing.                                 |
| `utm_medium`   | `text`        | NULL                            | Medio de la campaña.                                          |
| `utm_campaign` | `text`        | NULL                            | Nombre de la campaña promocional.                             |
| `created_at`   | `timestamptz` | NOT NULL, DEFAULT `now()`       | Fecha de registro.                                            |
| `updated_at`   | `timestamptz` | NOT NULL, DEFAULT `now()`       | Última actualización de estado.                               |

---

## Políticas de Seguridad (RLS)

La base de datos se consume principalmente a través de servicios aislados o backends (ej. Next.js API Routes) autenticados mediante tokens de alta jerarquía (`service_role`), por lo que las políticas de cliente directo están limitadas:

- La tabla `leads` tiene habilitado RLS y restringe las consultas directas de cliente con una política global que retorna falso (`USING (false)`).
- Las consultas y escrituras se ejecutan de manera segura a nivel servidor en los Route Handlers utilizando la clave secreta `SUPABASE_SERVICE_ROLE_KEY`.
