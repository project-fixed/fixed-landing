# Fixed: Estrategia de Funnel & Blueprint Narrativo

Este documento define la estrategia global de adquisición de usuarios (Funnel) y la estructura narrativa y visual de la landing page de Fixed. Actúa como el puente conceptual entre nuestras campañas de marketing, la filosofía de la marca y la implementación técnica en código (React/Next.js).

---

## 1. El Embudo de Conversión (The Funnel Strategy)

Para maximizar la conversión, hemos dividido la carga cognitiva y narrativa en dos etapas clave: los anuncios de video (Top of Funnel) y la landing page (Middle of Funnel).

### Top of Funnel (Video Ads) = El Hook Emocional
* **Objetivo:** Capturar la atención, mostrar empatía y presentar el problema fundamental del usuario (Ruido vs Señal).
* **Narrativa:** El apostador es bombardeado constantemente con datos, cuotas y tipsters ruidosos. La filosofía aquí es: *"La suerte influye, pero la preparación marca la diferencia"*. 
* **Acción:** Una vez que el usuario conecta emocionalmente con el problema a través del video, el anuncio lo redirige a la Landing Page para presentar la solución definitiva.

### Middle of Funnel (Landing Page) = La Demostración de Valor
* **Objetivo:** Como el usuario ya llega "caliente" y entiende la filosofía por el video, la landing page no pierde tiempo repitiendo el problema emocional. Pasa rápida y contundentemente a la demostración de valor (Producto, Resultados y Autoridad).
* **El Enfoque:** Mostrar inteligencia predictiva, resultados respaldados por datos y rigor matemático desde el primer pixel.

---

## 2. Estructura y Flujo de la Landing Page (Mapeo UI)

La secuencia de la página está diseñada para responder de forma asertiva a la expectativa generada por el video.

### Capa 1: Hero Section (El Puente Tech/Emocional)
* **Objetivo:** Actuar como puente lógico entre la promesa del anuncio y el producto real.
* **Mensaje:** *"Transformamos la complejidad del fútbol en decisiones claras."* / *"Inteligencia predictiva para apuestas deportivas. Decisiones respaldadas por datos, no por instinto."*
* **Traducción UI:** 
  - Fondo: `PitchGeometryBackground` (Abstracto, predictivo, no invasivo).
  - Interacción: Formulario de captura de correos (Beta Privada) y `AvatarGroup` con indicador "online" para prueba social inmediata.

### Capa 2: Demostración Inmediata de Valor (Live Detections)
* **Objetivo:** Demostrar en el primer scroll que el modelo de inteligencia funciona y arroja resultados reales (fijas o pronósticos).
* **Traducción UI:**
  - Componente: `<OddsMarquee />` ubicado de forma privilegiada justo debajo del Hero.
  - Contexto: El carrusel va encabezado por una cápsula indicadora en vivo (*"Últimas Oportunidades Detectadas por el Modelo"* con un punto verde palpitante) que enmarca las cuotas como procesamiento de inteligencia artificial en tiempo real, desvinculándose visualmente de una interfaz de "tipster barato".

### Capa 3: Autoridad y Prueba Social (Hard Stats)
* **Objetivo:** Validar cuantitativamente la herramienta con el respaldo de la comunidad y la precisión algorítmica.
* **Traducción UI:**
  - Componente: `<KeyPointsGrid />`. Un bloque contundente estático con métricas infalibles (75K+ usuarios, 92.5% de precisión, análisis 24/7 de 30+ ligas).

### Capa 4: El Producto (Dashboard Reveal)
* **Objetivo:** Tangibilizar la herramienta mostrando la interfaz sin abrumar técnicamente.
* **Traducción UI:**
  - Componente: `<ScrollExpandVideo />`. Una revelación visual majestuosa mediante scroll donde la promesa toma la forma de una plataforma profesional y limpia.

### Capa 5: Construcción de Credibilidad (El "Cómo")
* **Objetivo:** Explicar los mecanismos detrás de los resultados (metodología e IA) solo cuando el usuario ya ha comprado el "por qué" y el "qué".
* **Traducción UI:**
  - Secuencia de Componentes: 
    1. `<AITimeline />` (Paso a paso lógico del procesamiento de datos).
    2. `<DataStreamMarquee />` (Un separador visual dinámico emulando una terminal tipo Bloomberg procesando millones de variables en tiempo real).
    3. `<AILayers />` (Desglose de las capas de profundidad analítica).

### Capa 6: Confianza Institucional y Cierre
* **Objetivo:** Cerrar el embudo con asociaciones sólidas y capitalizar la retención generada en un llamado a la acción inequívoco.
* **Traducción UI:**
  - Componentes: `<BrandsCarousel />` (Partners de datos deportivos/medios) y una sección `About` asimétrica con un CTA imperativo (`ButtonArrow`) invitando al ingreso definitivo.

---

## 3. Reglas de Oro (Copywriting y Diseño)

1. **Prohibición de Lenguaje Tipster:** Nunca usar palabras como "Fijas 100% seguras", "Gana dinero rápido" o jergas de apostador promedio. El tono debe ser *"Inteligencia predictiva", "Valor esperado", "Oportunidades"* y *"Decisiones claras"*.
2. **Resultados > Algoritmos:** Aunque el producto es profundamente técnico, el usuario final no compra redes neuronales; compra "claridad" y la certeza de estar "un paso por delante del mercado".
3. **Estética "Luxury Tech":** La paleta cromática (oscuros profundos, acentos esmeraldas), tipografías limpias y micro-interacciones (pings en vivo, flujos de terminal) deben evocar un producto premium, acercando la percepción de marca al ecosistema fintech corporativo o a un producto de Apple.
