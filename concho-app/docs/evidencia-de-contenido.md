# Evidencia de contenido: Concho App

Revisión hecha el 3–4 de octubre de 2026 contra los archivos locales de cada producto. Este documento es interno: aquí se anotan los detalles técnicos y de estado que **no** aparecen en el sitio.

**Estados:** *verificado público* (se puede comprobar en una página pública hoy) · *solo código* (existe en código o en material producido, pero no está publicado ni lanzado) · *planificado* (propuesta u hoja de ruta) · *desconocido* (no hay evidencia suficiente).

Rutas abreviadas:
- **ADS** = `Projects/Concho Ads/`
- **STU** = `Projects/Concho Studio/`
- **RUT** = `Projects/ConchoRutas/`
- **WEB** = `Projects/Initiumwebpagev3/`

## Estado general al 4 de octubre de 2026

| Producto | Estado real (interno) | Fuente | Cómo se dice en el sitio |
|---|---|---|---|
| Concho Ads | **NO-GO** para producción. Ninguna capacidad está verificada en producción. Algunas lo están solo en *staging*: identidad, gating de campañas, exportes, registro de dispositivos e ingesta de eventos. El build firmado para tableta está bloqueado y el piloto está abierto. Las actualizaciones del 3 de octubre son medidas de protección y no cambian el veredicto. | ADS `Audit-2026-09-24/Production-Readiness-Plan-2026-10-02.md`: encabezado, «Status at the 2026-10-02 evening recheck» y tabla de estado (filas 1, 5, 6 y 7) | «Piloto en preparación»; «Cómo funcionará el programa piloto»; «Las funciones disponibles dependen de la etapa de despliegue del programa piloto». |
| Concho Rutas | Sin lanzamiento público: no se ha subido nada a App Store, no hay TestFlight ni Google Play, ni enlace público de beta. Lugares, mapa, rutas e IA existen en código. Los itinerarios están en una rama RC sin fusionar, desplegada solo en *dev*. | RUT `APP_AUDIT_AND_LAUNCH_PLAN.md` («What exists now», P0 #1); RUT `.claude/worktrees/concho-rutas-ios-rc-4d66fc/docs/release/APP_STORE.md` y `PROGRESS.md` | «En desarrollo»; «Concho Rutas todavía no está disponible en tiendas de aplicaciones»; CTA «Quiero saber cuándo esté lista». |
| Concho Studio | Solo EP00 (piloto) está completo como trabajo documentado. El máster tiene la especificación bloqueada (2026-09-09/10), pero el 30 de septiembre se anotó un cambio de música pendiente y no hay registro de publicación. EP01 Guánica está en desarrollo (voz sin grabar). La tabla de 78 municipios es una propuesta. | STU `development/concho-roadmap-78-municipios-2026-09-22.md` §1; STU `episodes/s1ep01/_docs/s1ep01-plan-produccion-y-matriz-16x9-2026-09-30.md` §0 #1 y §10 | «En producción»; piloto «En producción final» y «Anunciaremos el estreno en nuestras redes»; Guánica «En desarrollo»; pueblos como «Visión editorial». |

## Tabla de afirmaciones

| Producto | Afirmación pública propuesta | Archivo / sección de apoyo | Estado | Redacción final en el sitio |
|---|---|---|---|---|
| Ecosistema | Concho reúne historias, descubrimiento y visibilidad local bajo una identidad | WEB `productos.html`, tarjeta «ConchoAds Ecosystem» («El ecosistema de marcas Concho conecta publicidad hiperlocal, descubrimiento de Puerto Rico y…») | verificado público (sitio de Initium) | «Tres productos, un mismo propósito… Juntos acercan a la gente a Puerto Rico y a su comercio local». |
| Ecosistema | Nombre paraguas «Concho App» | Encargo del dueño. STU plan EP00 07-08 (encabezado): «Concho» como app de descubrimiento turístico. El Instagram público se llama «Concho Apps» | desconocido (nombre de trabajo) | `brand.name` en `site.config.json`, cambiable en un solo lugar. |
| Ecosistema | Lema «Conoce. Explora. Conecta.» | Propuesto en el encargo; no es un lema aprobado | planificado (texto propuesto) | Titular del hero y metadatos. |
| Ecosistema | Studio inspira, Rutas ayuda a descubrir, Ads da visibilidad | Encargo del dueño (visión). No hay evidencia de integración en producción entre productos. | planificado (visión) | «Es una visión complementaria. Cada producto avanza a su propio ritmo y, por ahora, se presenta como un proyecto independiente». |
| Studio | Concho Studio es el espacio de historias; Conchito presenta lugares, cultura, comida, comunidades y naturaleza | STU plan EP00 07-08 (encabezado y §1); roadmap §1 «Documented facts» (promesa de la serie) | solo código (material producido) | «Concho Studio es el espacio de historias de Concho App…». |
| Studio | Conchito: sapo concho puertorriqueño, guayabera crema, pava de paja, sin dientes | STU plan EP00 07-08 §3 «Visual style»; STU `episodes/ep00-pilot/_docs/ep00-matriz-produccion-16x9-2026-09-09.md` §0.1 «DECISIÓN DE RAFAEL, 2026-09-09» (turnaround canónico, sin dientes) | verificado (canon interno aprobado) | «Un sapo concho puertorriqueño, con guayabera crema y pava de paja…». La imagen usada es el turnaround canónico. |
| Studio | Voz cálida y boricua, sin exagerar el acento | STU `episodes/ep00-pilot/script/concho-ep00-guion-narracion-grabacion-2026-06-30.md` «Instrucción general» | solo código | «Es de aquí, habla como la gente de aquí…». |
| Studio | Cita «Me llamo Conchito. Soy de aquí.» | Guion EP00, línea 2 (bloqueado según plan 07-08 §0) | solo código (guion bloqueado) | Cita destacada en la sección Studio. |
| Studio | Episodio piloto «¿Quién es Conchito?» | STU `episodes/ep00-pilot/_build/ep00-conchito-16x9-master.mp4` (42,75 s, 2026-09-10); plan S1EP01 §0 #1 (cambio de música pendiente); sin URL de publicación | solo código (producido, sin publicar) | «En producción final… Anunciaremos el estreno en nuestras redes». No se publica el video (ver inventario). |
| Studio | Próximo episodio: Guánica | STU `episodes/s1ep01/script/s1ep01-guion-narracion-grabacion-2026-09-30.md`; carpetas de voz y música vacías; lista §10 sin marcar | planificado (en desarrollo) | «El próximo episodio lleva a Conchito a Guánica, en el suroeste de la isla». Chip «En desarrollo». |
| Studio | Historias de los pueblos | Roadmap §2–§4 (propuesta; los contactos son pistas no contactadas) | planificado | «Visión editorial: la meta es recorrer los pueblos de Puerto Rico, uno a uno…». Sin cifras ni calendario. |
| Rutas | App móvil para descubrir lugares, eventos y rutas | RUT `ConchoRutas_Descripcion_Detallada.md` §5.1; RUT `APP_AUDIT_AND_LAUNCH_PLAN.md` «What exists now» | solo código | «Concho Rutas es una aplicación móvil para descubrir Puerto Rico: lugares, eventos y rutas…». |
| Rutas | Para residentes y visitantes | DESC §5.1 (personas residente y turista); AUDIT «Product decision» (foco de la primera versión) | planificado (público objetivo) | Tarjetas «Si vives aquí» / «Si nos visitas». |
| Rutas | Mapa para explorar | AUDIT «What exists now» (mapa); SPEC §4.1.3 | solo código | «Un mapa para explorar lo que hay a tu alrededor». |
| Rutas | Rutas curadas con paradas en orden | AUDIT «What exists now»: «Ordered stops and route progress exist» | solo código | «Rutas con paradas en orden, preparadas por nuestro equipo». |
| Rutas | Eventos | AUDIT, fila del *pipeline* de contenido: 25 eventos, solo 8 con fecha confirmada | solo código | «Eventos con fecha y lugar». |
| Rutas | Sugerencias de ConchoAI | AUDIT, fila de IA: el chatbot devuelve tarjetas de lugares y no guarda planes; RC: «AI planning» sin verificar | solo código | «ConchoAI: sugerencias de lugares a partir de tus preguntas». No se promete personalización ni itinerarios. |
| Rutas | Itinerarios guardados, pasaporte con recompensas, mapas sin conexión | AUDIT P0 #1 (itinerarios ausentes en el árbol principal); `passportexperience.md` y RC BASELINE (pasaporte apagado en v1); AUDIT «Later, after the first release» (mapas sin conexión) | planificado | Recuadro «Más adelante… Estamos evaluando…». |
| Rutas | Disponible en App Store o Google Play | RC `APP_STORE.md`: «Nothing has been uploaded or submitted» | — (no es cierto) | No se dice. El sitio aclara que «todavía no está disponible en tiendas de aplicaciones». |
| Ads | Publicidad inteligente en movimiento (lema existente) | WEB `Concho_landing/conchoadsoverview.md` «Tagline»; conchoads.com | verificado público | Titular de la sección Ads y tarjeta del ecosistema. |
| Ads | Publicidad interactiva y descubrimiento local en tabletas dentro de vehículos de transporte | ADS `concho-ads/conchoads_overview.md` «¿Qué es Concho Ads?»; ADS `TechnicalDocumentation/ConchoAds_Technical_Overview.md` §1 | solo código | «Concho Ads lleva publicidad interactiva y descubrimiento local a tabletas instaladas en vehículos de transporte». |
| Ads | Videos, promociones y códigos QR | Overview §1 (módulo de promociones con QR «Scan Me»); AUDIT F08 (video en reposo como prototipo); F14 (atribución de QR planificada) | solo código | «…a través de videos, promociones y códigos QR». No se promete atribución ni conversiones. |
| Ads | Contenido para pasajeros: lugares, eventos, promociones, trivias y juegos | Overview §1; captura «Menú Principal» (`imagenes productos final`) | solo código | Tarjeta «Pasajeros». La captura se rotula como app en desarrollo. |
| Ads | Contenido revisado y aprobado antes de mostrarse | Readiness, fila 6 (gating de campañas en *staging*); D02 (reglas de aprobación pendientes) | solo código | Paso 2 de «Cómo funcionará el programa piloto». |
| Ads | Reportes para el anunciante | Readiness fila 6 (exportes CSV en *staging*), fila 5 (PDF pendiente); AUDIT «Advertiser reporting» | solo código / planificado | «Recibes un resumen de tu campaña. El detalle de los reportes se acuerda con cada participante del piloto». |
| Ads | Programa piloto | Readiness «Physical release evidence and thresholds» (propuesta: 14 días, 5–10 vehículos, 3–5 anunciantes); registro de decisiones: «proposals, not approved policy» | planificado | «Solicita información sobre el programa piloto». Sin fechas, cupos ni cifras. |
| Ads | Para anunciantes y agencias | Overview «Propuesta de Valor para Anunciantes»; «agencias» solo aparece en el sitio anterior | solo código / desconocido (agencias) | «Anunciantes y agencias», solo como público al que se invita a escribir. |
| Ads | Para conductores y operadores de flota | Readiness filas 1 y 6 (sesión de conductor en *staging*); AUDIT «Measurable go or no-go gates» (acuerdos con operadores pendientes) | planificado | «Suma tus vehículos al programa piloto. Las condiciones de participación se conversan directamente con cada operador». |
| Ads | DOOH | Sitio anterior | verificado público | «Es publicidad DOOH: publicidad digital en espacios públicos y vehículos». |
| Contacto | Correo y teléfono | Contexto del dueño (encargo) | verificado (dato del dueño) | rgarcia@initiumtec.com · 787-468-5205 |
| Contacto | Enlace de reuniones | Verificado el 4-oct-2026 en el navegador: la página de Microsoft Bookings «Conchoads meeting scheduler» (reunión de 45 min) carga. No se reservó nada. | verificado público | «Agendar una reunión» (Concho Ads). |
| Contacto | Instagram | Verificado: perfil «Concho Apps (@conchoapps)» | verificado público | «Instagram @conchoapps». |
| Contacto | Facebook | Verificado: la página se llama «ConchoAds», con sede en Guaynabo | verificado público | «Facebook ConchoAds» (rotulado así porque la página es de Concho Ads). |
| Legal | Privacidad y términos | `https://initiumtec.com/privacy.html` y `/terms.html` responden 200. La política es de Initium Tech, LLC y menciona productos como ConchoADS. | verificado público | Enlaces en el pie: «Política de privacidad» y «Términos de servicio». |

## Lo que se dejó fuera a propósito

| Texto o dato anterior | Dónde estaba | Por qué no se publica |
|---|---|---|
| Paquetes de $75 / $100 / $150 al mes, «Mejor valor», «ahorra $25» | `conchoads/index.html` («Paquetes de Publicidad») | Texto histórico; no hay aprobación comercial vigente. Además, el modelo financiero de marzo de 2026 (`ConchoAds_Narrativa_Financiera.md`) describe otro producto (pantallas fijas). |
| «60–90 reproducciones diarias garantizadas», «Exclusividad por categoría» | Mismo bloque | Garantías sin evidencia; el reproductor de anuncios pagados es un prototipo (AUDIT F08). |
| «Plataforma DOOH activa», «opera en fase beta» | Hero y CTA del sitio anterior | Contradice el veredicto NO-GO del 2 y 3 de octubre de 2026. |
| «Métricas en tiempo real», «Trazabilidad absoluta», «ROI» | Sitio anterior | Los reportes solo se verificaron en *staging*. El ROI solo debe mostrarse con datos de atribución (AUDIT «Advertiser reporting»). |
| «Optimización automática… impulsada por IA», «Inteligencia predictiva» | Sitio anterior | La IA es un prototipo o está planificada (AUDIT F11). |
| «Cero distracciones», «bloqueadas de fábrica», «Seguridad total» | Sitio anterior | Sin evidencia verificada. |
| «Revenue share», «Gana por cada anuncio mostrado» | Sitio anterior | Términos comerciales no aprobados. |
| Vertex AI, Gemini, Google Cloud, BigQuery, Cloud Run, AWS, Flutter | Sitio anterior y documentos técnicos | Jerga de infraestructura fuera del texto público (requisito del encargo). |
| Negocios del archivo demo (p. ej., Marmalade, Walmart, Marshalls) | ADS `conchoads_demo_businesses_for_rutas.md`, línea 3 («Lista de negocios demo…») | Es un conjunto demo; no son clientes ni socios. Tampoco se usó la captura que muestra esos nombres. |
| 78 episodios, cobertura de los 78 municipios, calendario de episodios | Roadmap de Studio §4; pasaporte de Rutas | Propuestas; el dataset de Rutas cubre 38 municipios y Studio solo tiene EP00 completo. |
| Reservas, pagos, inicio de sesión con Google o Apple | SPEC §4.2 y §11; DESC §6.1 | Planificado o descartado para la primera versión (AUDIT «Product decision»; RC D5). |
| Contadores, testimonios, logos de clientes, insignias de descarga | — | No existen y no se inventaron. |
| Insignias «Live/Pilot» de `productos.html` | Sitio de Initium | El estado «Live» de ConchoAds en esa página contradice el veredicto NO-GO; el dueño debería revisarlo allí (fuera del alcance de este trabajo). |

## Riesgos a la vista del dueño

- **Logo paraguas:** el archivo `ConchoAppsLogov2.png` dice «CONCHO ADS». En el encabezado se usó solo el emblema del sapo junto al nombre tipográfico «Concho App», y el logo completo aparece solo en la sección de Concho Ads. Hace falta un logotipo oficial de Concho App.
- **Nombre:** el roadmap de Studio (§2, «Sensitivity and risks») advierte posible confusión con el personaje «Concho» de otro artista. El sitio usa solo el arte canónico de Conchito.
- **Video de la intro:** el primer clip (`ConchoAdsbannerwebpage.mp4`) se reutiliza tal cual, como pide el encargo. Muestra una interfaz ilustrativa y la marca de agua «Veo» de la herramienta de generación. Conviene confirmar que sigue aprobado para el sitio del ecosistema.
