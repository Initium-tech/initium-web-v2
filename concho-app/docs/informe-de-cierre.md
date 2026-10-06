# Informe de cierre: sitio Concho App

**Fecha:** 4 de octubre de 2026
**Estado:** COMPLETO y verificado localmente. **No se desplegó**: no se subió nada a Hostinger ni a ningún dominio, y no se cambiaron DNS, el sitio de Initium, las páginas existentes de Concho Ads ni ninguna de las apps.

## Qué se construyó

Un sitio estático de una sola página, en español, para el ecosistema **Concho App**. Presenta tres productos con el mismo peso:

- **Concho Studio:** historias audiovisuales con Conchito, usando el arte canónico aprobado. El piloto aparece como «en producción final» y Guánica como «en desarrollo». El reproductor del piloto, con transcripción, está listo pero apagado hasta que exista un máster aprobado.
- **Concho Rutas:** descubrimiento de lugares, eventos y rutas para residentes y visitantes. Lo que está en desarrollo y lo que vendrá «más adelante» aparecen por separado. Incluye el ícono real de la app y una ilustración rotulada. El CTA es de contacto, porque no hay descarga pública.
- **Concho Ads:** publicidad interactiva en tabletas dentro de vehículos. Incluye sus públicos (anunciantes y agencias, conductores y flotas, pasajeros) y el flujo del piloto (anunciante → contenido aprobado → interacción del pasajero → reportes), con condiciones. Lleva una captura real de la app rotulada como en desarrollo, «Solicitar información» y la reunión de Bookings ya verificada.

También incluye un hero con los dos videos originales de la intro (en el mismo orden, silenciados, en línea, con póster, pausa y alternativas). Siguen las secciones de ecosistema, cómo se complementan, preguntas frecuentes (10), contacto y pie con enlaces legales vigentes de Initium Tech. Tiene tema oscuro por defecto y claro opcional, que se recuerda entre visitas.

## Lista de tareas

- [x] Leer CLAUDE.md, AGENTS.md y `directives/maestro.md`, y las referencias de Concho Ads: `index.html` (versión publicada), `landing.html`, `conchito.html`, `nosotros.html` y `conchoadsoverview.md`.
- [x] Extraer la evidencia de las carpetas de Concho Ads, Concho Studio y ConchoRutas, sin abrir secretos.
- [x] Verificar los videos y el logo de la CDN, las redes, la página de reuniones y las páginas legales.
- [x] Revisar e inventariar logos, arte de Conchito, capturas e íconos.
- [x] Escribir la tabla de evidencia antes de redactar los textos.
- [x] Preparar las imágenes optimizadas (`npm run assets`).
- [x] Hacer el build con Tailwind 3 local y la plantilla con configuración central (`npm run build`).
- [x] Escribir la revisión estática con prueba negativa (`npm run check`).
- [x] Pruebas de navegador en 375, 768 y 1440 px con ambos temas (`npm run qa`).
- [x] Corregir hallazgos y volver a probar (ver «Correcciones»).
- [x] Generar el ZIP para Hostinger, el README, el inventario y este informe.
- [ ] Despliegue: **fuera del alcance**, pendiente de que el dueño lo autorice.

## Verificación realizada

### Build y revisión estática (`npm run build`, `npm run check`)

Todo pasa en la corrida final:

- 16 archivos en `dist/` (533 KB); el ZIP tiene 418 KB y `unzip -t` no detecta errores.
- Todos los archivos locales existen, todas las imágenes de `dist/` se usan y no hay marcas de plantilla sin resolver.
- 9 anclas internas, todas con destino, y 27 ids sin duplicados.
- 9 imágenes, todas con `alt`, `width` y `height`.
- 6 enlaces externos, todos con `target="_blank"` y `rel="noopener noreferrer"`.
- `lang="es"`, título, descripción, Open Graph, Twitter y favicons presentes.
- Contenido obligatorio presente: los tres nombres de producto, contacto, «Una iniciativa de Initium Tech, LLC», la explicación de DOOH y el rótulo de la ilustración.
- Ninguna frase prohibida: precios, «garantiz…», ROI, «tiempo real», «App Store», «Google Play», «activa», Vertex, Gemini, AWS, Flutter y otras.
- El ZIP coincide exactamente con `dist/`, sin `node_modules`, `.md`, `src` ni scripts.
- **Prueba negativa:** al inyectar «$75» y «garantizada» y romper un ancla, el revisor marcó los 3 problemas. Después se restauró el archivo.

### Navegador (`npm run qa`: Chrome 154 sin interfaz, puppeteer-core y axe-core 4.13)

**85 de 85 comprobaciones pasaron** (`docs/qa-resultados.json`, 2026-10-04):

| Área | Resultado |
|---|---|
| 375, 768 y 1440 px, en oscuro y en claro | Sin desborde horizontal, sin texto recortado, todas las imágenes cargan, sin errores de consola ni solicitudes fallidas, y los tres nombres de producto visibles y separados. |
| Accesibilidad (axe: WCAG 2.0/2.1 A/AA y buenas prácticas, incluido contraste) | **0 violaciones** en las 6 combinaciones de ancho y tema. |
| Tema | Oscuro por defecto; el botón cambia el tema en móvil y escritorio, actualiza `aria-pressed` y `theme-color`, y la elección persiste al recargar. |
| Menú móvil | Abre con `aria-expanded`, Escape lo cierra y devuelve el foco, y un enlace lo cierra y lleva a la sección (#rutas queda a 89 px, debajo del encabezado). |
| Anclas y CTA | Las 9 anclas desplazan a su sección debajo del encabezado fijo. Los 5 CTA con `data-interest` preseleccionan el tema del formulario. Los CTA del hero van a #ecosistema y #ads. |
| Preguntas frecuentes | Las 10 preguntas abren y cierran. |
| Formulario | Los campos vacíos bloquean el borrador. Con datos válidos se genera `mailto:rgarcia@initiumtec.com` con el asunto «Consulta sobre Concho Rutas…». El mensaje dice que abre la aplicación de correo y nunca afirma que se envió. No se envió ningún correo. |
| Video del hero | Arranca silenciado y en línea; pasa del primer clip al segundo y regresa al primero (comprobado con reproducción real); la pausa se respeta; se pausa fuera de pantalla y se reanuda al volver; no hay audio automático. |
| Alternativas | Con movimiento reducido no hay reproducción automática, se ve el póster, se ofrece «Reproducir video» y la flotación se desactiva. Con ahorro de datos el video no se descarga. Si fallan los MP4 (bloqueados a propósito) quedan el póster, el texto y la navegación, y el botón se oculta. Sin JavaScript, los enlaces móviles quedan visibles. |

### Otras comprobaciones

- **Navegador integrado de la app (panel):** la página carga en `/concho-app/` a 1024, 1440 y 375 px, sin mensajes de consola. El tema claro se activa y el menú móvil abre (confirmado por estado del DOM). Como el panel estaba oculto, Chrome pausa los videos y no hace carga diferida allí; por eso la reproducción y la carga de imágenes se verificaron en Chrome sin interfaz.
- **Enlaces externos:**
  - La página de Microsoft Bookings «Conchoads meeting scheduler» carga; no se reservó nada.
  - Instagram es «Concho Apps (@conchoapps)».
  - Facebook es la página «ConchoAds», y se rotuló así.
  - `initiumtec.com/privacy.html` y `/terms.html` responden 200.
- **Reproductor del piloto, con una configuración de prueba temporal:** no descarga nada antes del clic; luego reproduce los 42,75 s con controles, mueve el foco al video y muestra la transcripción de 5 líneas. Se usó una transcodificación local que nunca se empacó. El sitio final se recompiló sin el reproductor.
- **Hero contra el original:** se mantienen la composición en dos columnas, la insignia con punto pulsante, el titular en Inter 900 con palabra dorada en degradado, la fila de tres «cifras» con divisores, los botones dorado y contorno, las tres tarjetas flotantes, el indicador «Descubre más», la superposición oscura, la retícula y los mismos videos.

## Capturas (`concho-app/screenshots/`)

- Escritorio 1440: `desktop-1440-{dark,light}-hero.png` y `desktop-1440-{dark,light}-full.jpg`
- Tableta 768: `tablet-768-{dark,light}-hero.png` y `tablet-768-{dark,light}-full.jpg`
- Móvil 375: `mobile-375-{dark,light}-hero.png`, `mobile-375-{dark,light}-full.jpg` y `mobile-375-dark-menu-open.png`
- Alternativa: `mobile-375-reduced-motion-poster.png`
- Referencia original (versión publicada de Concho Ads): `reference-original-conchoads-desktop-1440-hero.png` y `reference-original-conchoads-mobile-375-hero.png`
- Prueba del reproductor (build temporal, no publicado): `qa-build-prueba-reproductor-piloto-activado.png`

## Correcciones hechas durante la verificación

1. Comentario de plantilla con `<!--@if-->` anidado → se reescribió para que no rompa el HTML.
2. Divisores y flechas decorativos dentro de `<ul>`/`<ol>` → se movieron fuera de las listas.
3. Tarjetas del flujo de Ads translúcidas sobre la línea conectora → fondo opaco.
4. Ilustración de Rutas flotando a mitad de columna → alineada arriba y fija al desplazar en escritorio (`overflow-clip` para que `sticky` funcione).
5. Encabezado en tema claro grisáceo sobre el hero oscuro → 95 % de opacidad en claro (80 % en oscuro, como el original).
6. Facebook rotulado genérico → «Facebook ConchoAds», porque la página es de Concho Ads.
7. Instagram: «Sigue a Conchito» → «Síguenos en Instagram», porque la cuenta es de Concho Apps.
8. La imagen social leía el nombre fijo → ahora toma `brand.name` y `brand.motto` de `site.config.json`.

Además se corrigieron errores del propio arnés de pruebas (desplazamiento suave contra carga diferida, falsos positivos con `sr-only`, captura de páginas muy altas a 2×). No eran defectos del sitio.

## Decisiones pendientes del dueño

1. **Logo de Concho App:** el archivo «umbrella» `ConchoAppsLogov2.png` dice CONCHO ADS. Hoy el encabezado usa el emblema del sapo más el nombre tipográfico. Si hay un logotipo oficial de Concho App, basta con reemplazar `concho-emblema.webp` y los favicons.
2. **Nombre definitivo:** «Concho App» es el nombre de trabajo. Se cambia en `site.config.json` → `brand.name` (y luego `npm run assets` para la imagen social).
3. **Piloto de Concho Studio:** aprobar el máster final, que tiene un cambio de música pendiente, exportar una versión web y activar `studio.pilotVideo`.
4. **Miniatura del piloto y foto dentro de la captura de Ads:** confirmar que ambas están aprobadas o licenciadas.
5. **Dominio:** cuando se confirme, llenar `siteUrl` para tener canonical, `og:url` y `og:image` absolutas.
6. **Condiciones comerciales de Concho Ads:** el sitio no muestra precios. Si se aprueban condiciones del piloto, se pueden añadir con evidencia.
7. **Video de la intro:** el primer clip muestra una interfaz ilustrativa y la marca de agua «Veo». Se reutilizó tal cual, como pide el encargo; conviene confirmar que sigue vigente.
8. **Sitio de Initium (`productos.html`):** marca ConchoAds como «Live», lo que contradice el veredicto NO-GO. No se tocó (fuera del alcance).
9. **Riesgo de nombre:** el roadmap de Studio advierte posible confusión con el «Concho» de otro artista.

## Archivos fuera de `concho-app/` tocados

- `.claude/launch.json` (nuevo): configuración del servidor de vista previa local.
- `logs/antigravity.db`: registros de ejecución que exige la regla de observabilidad del proyecto.

No se modificó ninguna otra página ni archivo existente.
