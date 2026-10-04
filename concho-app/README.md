# Concho App: sitio de mercadeo

Sitio estático de una sola página para el ecosistema **Concho App** de Initium Tech, que presenta por separado a **Concho Studio**, **Concho Rutas** y **Concho Ads**. Usa la identidad visual de Concho Ads (colores, tipografía Inter, retícula, tarjetas flotantes y los dos videos de la intro original).

> **Estado:** el paquete para Hostinger está listo y verificado localmente. **No se ha desplegado** en ningún servidor ni dominio.

## Estructura

```
concho-app/
├── site.config.json        ← marca, contacto, enlaces, videos, URL del sitio, piloto de Studio
├── src/
│   ├── index.html          ← plantilla con todo el texto del sitio
│   ├── css/input.css       ← temas claro/oscuro (variables) y componentes
│   ├── js/main.js          ← tema, menú móvil, video del hero, formulario
│   └── assets/img/         ← imágenes ya optimizadas (generadas por scripts/prepare_assets.py)
├── tailwind.config.js      ← paleta Concho Ads (gold, concho) y animaciones
├── scripts/                ← build, revisión estática, QA y preparación de imágenes (con utils/logger.py)
├── qa/                     ← pruebas de navegador opcionales (puppeteer-core + axe-core)
├── dist/                   ← CARPETA DE DESPLIEGUE (generada)
├── concho-app-hostinger.zip← ZIP de dist/ para subir a Hostinger (generado)
├── preview/                ← copia local servida en /concho-app/ (generada, no se sube)
├── screenshots/            ← capturas de verificación
└── docs/                   ← evidencia de contenido, inventario de assets, informe de cierre y resultados de QA
```

## Comandos

Requisitos: Node.js 18 o más reciente (probado con 26.5) y Python 3. Todos los comandos se corren dentro de `concho-app/`.

```bash
npm install
```

```bash
npm run build
```

Compila Tailwind (CSS minificado), completa `src/index.html` con `site.config.json`, genera `dist/`, `preview/concho-app/` y `concho-app-hostinger.zip`.

```bash
npm run check
```

Revisión estática: archivos y anclas, imágenes con `alt` y dimensiones, metadatos, enlaces externos, contenido obligatorio, frases prohibidas (precios viejos, garantías, tiendas de apps, jerga técnica) y contenido del ZIP.

```bash
npm run preview
```

Abre <http://localhost:8080/concho-app/> (se sirve desde una subcarpeta, igual que en el hosting).

Pruebas de navegador (opcional; requieren Google Chrome):

```bash
cd qa && npm install && cd ..
```

```bash
npm run qa
```

Corre 85 comprobaciones en 375, 768 y 1440 px, en ambos temas: desbordes, contraste y accesibilidad con axe, menú móvil, anclas, botones, formulario, secuencia y pausa del video, movimiento reducido, ahorro de datos, falla de video y modo sin JavaScript. Guarda capturas en `screenshots/` y resultados en `docs/qa-resultados.json`. Para capturar también el hero original de Concho Ads, define `CONCHOADS_REFERENCE_URL` con la ruta `file://` de `conchoads/index.html`.

Solo si cambias una imagen de origen (macOS con `swiftc`, `sips` y `cwebp`):

```bash
npm run assets
```

Cada script de Python usa `@log_execution` de `utils/logger.py` y registra la ejecución en `logs/antigravity.db`.

## Dónde cambiar cada cosa

| Qué | Dónde |
|---|---|
| Nombre de la marca ("Concho App") | `site.config.json` → `brand.name` (se usa en título, menú, textos, metadatos y formulario). La imagen social `og-concho-app.jpg` lleva el nombre y el lema dibujados: regenérala con `npm run assets` (los toma de este mismo archivo). |
| Lema y descripción para buscadores | `brand.motto`, `brand.description` |
| Correo, teléfono, enlace de reuniones | `contact.*` |
| Redes sociales | `social.*` |
| Privacidad, términos, empresa | `company.*` (hoy apuntan a las páginas vigentes de initiumtec.com) |
| Videos del hero y póster | `hero.videos` (en orden) y `hero.poster` |
| URL pública (canonical y og:url absolutos) | `siteUrl`: déjalo vacío hasta confirmar el dominio. Al llenarlo, el build añade `canonical`, `og:url` y una `og:image` absoluta. |
| Textos, secciones, preguntas frecuentes | `src/index.html` |
| Botones que preseleccionan el tema del formulario | atributo `data-interest` (`ads`, `flota`, `rutas`, `studio`) en `src/index.html` |
| Colores y temas | `tailwind.config.js` (paleta fija) y variables en `src/css/input.css` (claro/oscuro) |

Después de cualquier cambio: `npm run build` y `npm run check`.

### Activar el episodio piloto de Concho Studio

El reproductor está listo, pero **no se publica** hasta que haya un máster final aprobado. Para activarlo:

1. Exporta una versión web: MP4 H.264 a 720p, AAC, *faststart*, idealmente de 5 a 8 MB. El máster actual pesa 122 MB y no debe subirse tal cual.
2. Súbela a la CDN o a `dist/assets/video/` y pon su URL en `studio.pilotVideo`.
3. Confirma que la transcripción de `src/index.html` (bloque `pilot-player`) coincide con el audio final. Hoy usa las cinco líneas del guion bloqueado.
4. `npm run build`. El video solo se descarga cuando el visitante presiona «Ver el episodio piloto».

## Subir a Hostinger

El ZIP contiene solo archivos de despliegue (`index.html`, `assets/`, `.htaccess`), sin `node_modules`, fuentes ni documentos internos.

**En una subcarpeta (por ejemplo `initiumtec.com/concho-app/`):**

1. hPanel → **Archivos** → **Administrador de archivos** → `public_html`.
2. Crea la carpeta `concho-app` y entra en ella.
3. Sube `concho-app-hostinger.zip` y usa **Extraer** en esa misma carpeta. `index.html` debe quedar directamente dentro de `concho-app/`.
4. Borra el ZIP del servidor y abre `https://<tu-dominio>/concho-app/`.

**En un dominio o subdominio propio:** extrae el ZIP directamente en la carpeta raíz de ese dominio (su `public_html`).

Notas:
- `.htaccess` es un archivo oculto; activa «Mostrar archivos ocultos» si quieres verlo. Solo desactiva el listado de carpetas y añade caché; puedes borrarlo sin afectar el sitio.
- Todas las rutas son relativas, así que el sitio funciona en cualquier carpeta.
- Los videos del hero se sirven desde la CDN de CloudFront ya existente; no hace falta subirlos.
- Cuando confirmes el dominio final, llena `siteUrl`, recompila y vuelve a subir el ZIP para tener vista previa social con imagen absoluta y URL canónica.

## Documentación

- `docs/evidencia-de-contenido.md`: cada afirmación pública, su fuente, su estado y la redacción final, además de lo que se dejó fuera a propósito.
- `docs/inventario-de-assets.md`: origen, tratamiento y decisión de cada imagen y video.
- `docs/informe-de-cierre.md`: verificación, capturas, decisiones pendientes del dueño y estado del despliegue.
- `docs/qa-resultados.json`: salida de la última corrida de `npm run qa`.
