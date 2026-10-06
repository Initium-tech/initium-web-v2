#!/usr/bin/env python3
"""Revisión estática de dist/ y del ZIP antes de publicar.

Comprueba archivos y enlaces locales, anclas, imágenes, metadatos, enlaces
externos, contenido obligatorio y frases que no deben publicarse sin
evidencia (precios viejos, garantías, disponibilidad en tiendas, etc.).

Uso:  npm run check   (o  python3 scripts/check_dist.py)
"""
import os
import re
import sys
import zipfile
from html.parser import HTMLParser
from urllib.parse import urlparse

from _logging import SITE_DIR, log_execution

DIST = os.path.join(SITE_DIR, "dist")
ZIP_PATH = os.path.join(SITE_DIR, "concho-app-hostinger.zip")

# Afirmaciones sin evidencia aprobada o lenguaje técnico interno (ver docs/evidencia-de-contenido.md).
FORBIDDEN = [
    r"garantiz", r"\bROI\b", r"cero distracci", r"\$\s?\d", r"exclusividad", r"revenue share",
    r"participación en ganancias", r"App Store", r"Google Play", r"descárga", r"descarga la app",
    r"plataforma (DOOH )?activa", r"tiempo real", r"78 (episodios|municipios|pueblos)", r"Vertex",
    r"Gemini", r"BigQuery", r"Google Cloud", r"\bAWS\b", r"Flutter", r"Lambda", r"Cognito",
    r"non-skippable", r"imposibles de omitir", r"clientes satisfechos", r"testimonio",
    r"reproducciones diarias", r"optimización automática", r"enviado con éxito",
]
REQUIRED = [
    "Concho Studio", "Concho Rutas", "Concho Ads", "Una iniciativa de", "Initium Tech, LLC",
    "rgarcia@initiumtec.com", "787-468-5205", "Conoce. Explora.", "Ecosistema", "Contacto",
    "publicidad digital en espacios públicos y vehículos", "Ilustración de referencia",
]


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.refs, self.anchors, self.imgs, self.links, self.metas = [], [], [], [], [], {}
        self.text, self._skip, self.title = [], 0, ""
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.append(a["id"])
        for key in ("src", "href", "poster", "data-src"):
            if a.get(key):
                self.refs.append((tag, key, a[key]))
        if tag == "a" and a.get("href", "").startswith("#"):
            self.anchors.append(a["href"])
        if tag == "a" and a.get("href", "").startswith("http"):
            self.links.append(a)
        if tag == "img":
            self.imgs.append(a)
        if tag == "meta":
            self.metas[a.get("name") or a.get("property") or a.get("charset", "")] = a.get("content", "")
        if tag in ("script", "style"):
            self._skip += 1
        if tag == "title":
            self._in_title = True

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self._skip -= 1
        if tag == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if not self._skip:
            self.text.append(data)


@log_execution
def check_dist():
    problems, notes = [], []
    index = os.path.join(DIST, "index.html")
    if not os.path.exists(index):
        print("Falta dist/index.html: corre `npm run build` primero.")
        sys.exit(1)
    raw = open(index, encoding="utf-8").read()
    page = Page()
    page.feed(raw)
    text = re.sub(r"\s+", " ", " ".join(page.text))

    if re.search(r"\{\{|<!--@", raw):
        problems.append("Quedaron marcas de plantilla sin resolver.")

    # Archivos locales
    local = set()
    for tag, key, ref in page.refs:
        parsed = urlparse(ref)
        if parsed.scheme or ref.startswith("#") or ref.startswith("//"):
            continue
        path = parsed.path
        local.add(path)
        if not os.path.exists(os.path.join(DIST, path)):
            problems.append(f"Archivo local inexistente: {ref} ({tag} {key})")
    for name in os.listdir(os.path.join(DIST, "assets", "img")):
        if f"assets/img/{name}" not in local and f"assets/img/{name}" not in raw:
            problems.append(f"Imagen sin usar en dist/: {name}")

    # Anclas e ids
    dupes = {i for i in page.ids if page.ids.count(i) > 1}
    if dupes:
        problems.append(f"ids duplicados: {sorted(dupes)}")
    for href in sorted(set(page.anchors)):
        if href[1:] not in page.ids:
            problems.append(f"Ancla sin destino: {href}")

    # Imágenes
    for img in page.imgs:
        if "alt" not in img:
            problems.append(f"Imagen sin alt: {img.get('src')}")
        if not (img.get("width") and img.get("height")):
            problems.append(f"Imagen sin dimensiones reservadas: {img.get('src')}")

    # Enlaces externos
    externals = sorted({a["href"] for a in page.links})
    for a in page.links:
        if a.get("target") != "_blank" or "noopener" not in a.get("rel", ""):
            problems.append(f"Enlace externo sin target/rel seguros: {a['href']}")

    # Metadatos
    if 'lang="es"' not in raw:
        problems.append("Falta lang=\"es\".")
    for key in ("description", "og:title", "og:description", "og:image", "twitter:card", "viewport"):
        if not page.metas.get(key):
            problems.append(f"Falta meta {key}.")
    if not page.title.strip():
        problems.append("Falta <title>.")
    if 'rel="icon"' not in raw:
        problems.append("Falta favicon.")

    # Contenido obligatorio y frases prohibidas (solo texto visible)
    for item in REQUIRED:
        if item not in text:
            problems.append(f"Falta contenido obligatorio: «{item}»")
    for pattern in FORBIDDEN:
        hit = re.search(pattern, text, re.I)
        if hit:
            snippet = text[max(0, hit.start() - 40): hit.end() + 40]
            problems.append(f"Frase no permitida «{hit.group(0)}»: …{snippet}…")

    # ZIP: solo archivos de despliegue
    if not os.path.exists(ZIP_PATH):
        problems.append("Falta concho-app-hostinger.zip.")
    else:
        with zipfile.ZipFile(ZIP_PATH) as zf:
            names = zf.namelist()
        dist_files = sorted(os.path.relpath(os.path.join(d, f), DIST) for d, _, fs in os.walk(DIST) for f in fs if f != ".DS_Store")
        if sorted(names) != dist_files:
            problems.append("El ZIP no coincide exactamente con dist/.")
        bad = [n for n in names if re.search(r"(node_modules|\.md$|\.env|src/|scripts/|\.py$|\.swift$|package)", n)]
        if bad:
            problems.append(f"El ZIP incluye archivos que no son de despliegue: {bad}")
        if "index.html" not in names:
            problems.append("El ZIP no tiene index.html en la raíz.")
        notes.append(f"ZIP: {len(names)} archivos, {os.path.getsize(ZIP_PATH) / 1024:.0f} KB")

    # Peso
    total = 0
    for d, _, fs in os.walk(DIST):
        for f in fs:
            size = os.path.getsize(os.path.join(d, f))
            total += size
            if f.endswith((".webp", ".png", ".jpg")) and size > 200 * 1024:
                problems.append(f"Imagen pesada (>200 KB): {f}")
    notes.append(f"dist/: {total / 1024:.0f} KB en total")
    notes.append(f"{len(page.ids)} ids, {len(set(page.anchors))} anclas internas, {len(page.imgs)} imágenes, {len(externals)} enlaces externos")
    notes.extend(f"externo: {u}" for u in externals)

    for n in notes:
        print(f"  · {n}")
    if problems:
        print(f"\n{len(problems)} problema(s):")
        for p in problems:
            print(f"  ✗ {p}")
        raise SystemExit(1)
    print("\nOK: dist/ y el ZIP pasaron todas las revisiones estáticas.")
    return {"problems": 0}


if __name__ == "__main__":
    check_dist()
