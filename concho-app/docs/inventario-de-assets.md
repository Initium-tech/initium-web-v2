# Inventario de assets: Concho App

Todas las imágenes publicadas salen de `scripts/prepare_assets.py`, que lee los originales sin modificarlos. Los recortes y escalados se hacen sin recolorear ni deformar. Peso total de `dist/`: unos 534 KB (ZIP: unos 418 KB).

Rutas abreviadas:
- **CDN** = `https://d16y57bdjt0bnh.cloudfront.net/website-assets/`
- **ADS** = `Projects/Concho Ads/`
- **STU** = `Projects/Concho Studio/`
- **RUT** = `Projects/ConchoRutas/`

## Publicados en el sitio

| Archivo en `dist/assets/img/` | Origen | Uso | Tratamiento | Estado y decisión |
|---|---|---|---|---|
| `concho-emblema.webp` (160×160) | CDN `ConchoAppsLogov2.png` (415×336, verificado 200), recorte del emblema (x 110, y 0, 204×204) | Encabezado y pie, junto al nombre «Concho App» | Recorte + WebP; sin cambio de color | **Decisión del dueño pendiente.** El archivo «umbrella» dice CONCHO ADS. Para no confundir la marca paraguas con Concho Ads, se usa solo el emblema del sapo y el nombre tipográfico. |
| `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png` | Mismo recorte del emblema | Íconos del navegador | Escalado | Igual que el emblema. |
| `concho-ads-logo.png` (415×336) | CDN `ConchoAppsLogov2.png` (copia exacta, idéntica en contenido a ADS `Appoved Logo.png`) | Sección Concho Ads, sobre una placa blanca | Ninguno | Logo aprobado de Concho Ads, usado solo para ese producto. La placa blanca da contraste a las letras grises. |
| `hero-poster.webp` (1280×720) | Fotograma 0,5 s de CDN `ConchoAdsbannerwebpage.mp4` (primer video de la intro) | Póster estático del hero: aparece si el video no carga, sin JavaScript, con movimiento reducido o con ahorro de datos | Fotograma exacto (AVFoundation) + WebP q72 | Derivado del video aprobado de la intro. |
| `concho-studio-logo.webp` (480×480) | STU `ConchoStudioLogo.png` (1254×1254, fondo transparente) | Sección Studio | Escalado + WebP con alfa | Logo existente de Concho Studio. |
| `conchito.webp` (600×804) | STU `Concho_mascot_images/Conchito_front.png` (896×1200) | Sección Studio | Escalado; fondo gris original | **Canon aprobado** (decisión del 2026-09-09 en la matriz EP00 §0.1: turnaround canónico, sin dientes). |
| `conchito-piloto.webp` (960×540) | STU `brand/ep00-conchito-youtube-thumbnail.png` (1280×720) | Tarjeta del episodio piloto | Escalado | Arte terminado del piloto (18-sep), coherente con el canon (lengua, sin dientes). No hay registro de aprobación formal: **confirmar con el dueño**. |
| `concho-rutas-icono.webp` (256×256) | RUT `ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-1024x1024@1x.png` | Sección Rutas | Escalado | Ícono real de la app (el mismo de la rama RC). Se presenta como ícono, sin inventar un logotipo. |
| `concho-ads-tablet.webp` (1110×698) | ADS `imagenes productos final/Screenshot 2025-12-31 at 2.56.18 PM.png` | Sección Ads | WebP q80 | Captura real de la app para tabletas, rotulada «en desarrollo». **Confirmar** la licencia de la foto de concierto que aparece dentro de la interfaz (parece un recurso de la app). |
| `og-concho-app.jpg` (1200×630) | Composición: emblema + `brand.name` + `brand.motto` sobre el fondo y la retícula del sitio | Vista previa en redes (Open Graph/Twitter) | Generada por `imgtool og` | Sin arte nuevo; solo emblema y tipografía. Mientras `siteUrl` esté vacío, la ruta es relativa (algunas redes la ignoran). |

## Usados desde la CDN (no se empacan)

| Recurso | Verificación | Uso |
|---|---|---|
| CDN `ConchoAdsbannerwebpage.mp4` (1280×720, 8 s, 1,28 MB) | 200 `video/mp4`; reproducción, secuencia y pausa comprobadas en Chrome | Primer video de la intro (silenciado, en línea) |
| CDN `ConchoAppswebIntro.mp4` (1920×1080, 9,07 s, 10 MB) | 200 `video/mp4`; se carga solo cuando termina el primero | Segundo video de la intro |
| Google Fonts: Inter 400–900 | Igual que el sitio de Concho Ads | Tipografía |

## Revisados y no usados

| Asset | Motivo |
|---|---|
| STU `episodes/ep00-pilot/_build/ep00-conchito-16x9-master.mp4` (122 MB, 22,5 Mbps) | No hay constancia de que sea el máster final aprobado: el plan S1EP01 del 2026-09-30 anota un cambio de música, y la música actual es la canción de ConchoAds. Además es un máster interno, demasiado pesado para la web. El reproductor queda listo para activarse (ver README). |
| STU `…_build/ep00-conchito-16x9-master_dialogonly.mp4`, `raw/…video-mudo…mp4`, `_selftest/selftest-master.mp4` | Variantes internas (solo diálogo, sin audio, prueba). Excluidas según el encargo. |
| STU `episodes/ep00-pilot/images sources/conchito_toma1–7_*.png` | No son canon: muestran dientes humanos (degradadas a referencia en la decisión del 2026-09-09). |
| STU `brand/concho-studio-channel-banner.png`, `brand/concho-studio-channel-icon.png` | No hacían falta; el logo transparente cubre el uso. |
| RUT `assets/images/ConchoRutasBaseLogoTransparentbk.png` (2144×1984, 6,1 MB) | Render 3D sobre panel texturizado, no es un logotipo plano; el texto «CONCHO» tiene poco contraste. Se prefirió el ícono de la app. |
| RUT `android/…/ic_launcher.png` | Ícono genérico de Flutter (marcador de posición). |
| RUT `data-feed/concho_rutas_data/images/` (94 fotos) | No son capturas de la app; 49 de 70 requieren atribución (AUDIT P0 #6). |
| Capturas de pantalla de Concho Rutas | No existen (RC `APP_STORE.md` §7). Por eso se usó una ilustración rotulada «Ilustración de referencia. No es una captura de la aplicación». |
| ADS `imagenes productos final/Screenshot … 2.56.30 PM.png` | Muestra nombres de negocios reales del conjunto demo (p. ej., Marmalade Restaurant) y podría sugerir alianzas. |
| ADS `Screenshot … 2.56.40 / 2.56.53 PM.png` | Pantallas vacías («No results found»). |
| ADS `Promo-customer-webpages/…`, `phyton_codes/events_images/…` | Promociones de negocios demo y fotos de eventos con derechos desconocidos. |
| WEB `conchoads/conchomascot.glb`, CDN `conchomascot.glb` (modelo 3D) | No hacía falta. El canon 2D aprobado es el turnaround, y un visor 3D añadiría peso. |
| Fotos del equipo (`conchoads/nosotros.html`) | El encargo no pide una sección de equipo, así que no se incluyó ninguna. |
