# 🎯 Identidad de Producto: Fixed

Este documento define la esencia, la misión, el posicionamiento, los conceptos clave y la estructura de flujo de **Fixed**. Toda decisión de diseño, desarrollo y marketing debe alinearse con esta definición.

---

## 1. ¿Qué es Fixed?

Fixed es una plataforma de inteligencia predictiva aplicada al fútbol.

Su propósito es analizar información futbolística compleja y transformarla en conclusiones claras, objetivas y accionables.

> 💡 **Principio fundamental:**
> Fixed no intenta adivinar el futuro. Fixed intenta estimar probabilidades.

---

## 2. Propósito y Dirección

### Misión

Transformar datos futbolísticos complejos en conclusiones claras, objetivas y accionables.

### Visión

Convertirse en la plataforma de referencia para comprender qué es probable que ocurra en un partido de fútbol antes de que comience.

### Qué significa "Fixed"

Fixed **no** significa apuesta segura ni apuesta garantizada (eso es una ilusión comercial).
Fixed significa:

> _"La conclusión más sólida que puede extraerse de toda la información disponible."_

No representa certeza. Representa convicción basada en evidencia.

---

## 3. Filosofía de Juego: "Apostar para no perder"

El principal objetivo de Fixed no es vender ganancias rápidas o fantasiosas ("floro barato" de ganancias garantizadas). Fixed se enfoca en **la consistencia en el largo plazo y la gestión del riesgo**.

- **Enfoque de analista:** Actuar con la rigurosidad de un analista deportivo profesional.
- **Reducción de pérdidas:** Ayudar al usuario (sin importar su nivel) a tomar decisiones disciplinadas para proteger su capital y no perderlo en jugadas impulsivas.
- **Validación empírica:** El modelo de Fixed opera con un **Bankroll Simulado** real (ej. 1000 unidades de inicio con stakes iniciales de 10 unidades) que valida públicamente su rendimiento a lo largo del tiempo.
- **Evolución del Stake:** Avanzar hacia sugerencias de stakes automáticos basados en metodologías matemáticas profesionales (como el Criterio de Kelly) según el perfil de riesgo del usuario.

---

## 4. Audiencia Objetivo

Fixed está diseñado para ser de utilidad en dos extremos del espectro de usuarios:

| Perfil de Usuario         | Necesidades                                                                            | Cómo lo resuelve Fixed                                                                                                     |
| :------------------------ | :------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| **Novato / Principiante** | Respuestas directas, conceptos sencillos, evitar la jerga técnica compleja.            | Recomendación directa de apuestas ("La Fija") y mercados legibles (ej: "+1.5 goles") en lugar de promedios o datos crudos. |
| **Experto / Profesional** | Métricas de rendimiento verificables, matemáticas de valor, gestión avanzada de banca. | Exposición transparente del Yield histórico, Hit Rate (tasa de acierto), Valor Esperado (+EV) y sugerencia de Stake.       |

---

## 5. Glosario y Conceptos Clave

Para evitar malentendidos técnicos o comerciales, definimos los siguientes conceptos dentro del ecosistema de la app:

- **La Fija:** Es la recomendación principal para un partido específico. Representa la opción con la combinación óptima de **mayor valor esperado (+EV)** y **confianza matemática** según el modelo predictivo. No significa ganancia asegurada.
- **Proyecciones:** Pantalla o sección donde se listan de forma organizada por ligas las recomendaciones principales ("La Fija") de cada partido.
- **Estadísticas Predictivas:** Pronósticos específicos sobre mercados comunes (ej: "+1.5 goles", "+7.5 córners") asociados a una probabilidad estimada, superando los promedios históricos tradicionales que no reflejan el contexto dinámico del juego.
- **Escenario (Guion de Partido):** Un resumen textual simple sobre cómo se prevé el desarrollo táctico y el flujo del juego (ej: _"El equipo local priorizará bloque bajo y cederá córners buscando transiciones rápidas"_). En fases iniciales, se omite el uso de gráficos de presión complejos o simulaciones interactivas para mantener el desarrollo ágil.
- **Conclusión:** La recomendación accionable final de apuesta, la cual incluye el stake sugerido y la gestión del bankroll.

---

## 6. Estructura de Flujo en la Aplicación Web

El flujo del usuario en la plataforma web está estructurado para responder directamente a las necesidades del usuario:

### A. Vista Principal (Proyecciones)

Muestra la lista de partidos de las diferentes ligas. En cada tarjeta de partido se expone directamente **"La Fija"** de ese encuentro (la opción número uno recomendada).

### B. Vista de Detalle (Análisis de Partido)

Al interactuar con la tarjeta de un partido, el usuario ingresa a una vista en profundidad que contiene:

1. **El Escenario (Guion de Partido):** Una descripción de texto sobre la dinámica esperada del encuentro.
2. **Las Estadísticas Predictivas:** Predicciones directas sobre mercados del partido (+1.5 goles, +7.5 córners, etc.).
3. **El Top 5 de Valor (+EV):** Un ranking de las 5 mejores predicciones del partido ordenadas por su valor matemático esperado. La posición **Top 1** de este ranking corresponde a la predicción mostrada como "La Fija" en la pantalla principal.

---

## 7. La regla de decisión de producto

Toda funcionalidad del backlog debe responder afirmativamente al menos a una de estas dos preguntas:

1. **¿Qué espera que ocurra?** (Resuelto por el Escenario/Guion de Partido y las Estadísticas Predictivas).
2. **¿Qué conviene apostar?** (Resuelto por La Fija, el Top 5 de Valor y las recomendaciones de Stake/Bankroll).

Si una característica no fortalece la respuesta a alguna de estas dos preguntas, no pertenece al producto.
