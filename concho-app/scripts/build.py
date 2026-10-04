#!/usr/bin/env python3
"""Compila el sitio Concho App en dist/ y empaca el ZIP para Hostinger.

Pasos: Tailwind (CSS minificado) → plantilla src/index.html con site.config.json
→ copia de JS e imágenes → vista previa en preview/concho-app/ → ZIP.

Uso:  npm run build   (o  python3 scripts/build.py)
"""
import datetime
import hashlib
import html
import json
import os
import re
import shutil
import subprocess
import zipfile

from _logging import SITE_DIR, log_execution

SRC = os.path.join(SITE_DIR, "src")
DIST = os.path.join(SITE_DIR, "dist")
PREVIEW = os.path.join(SITE_DIR, "preview", "concho-app")  # simula la subcarpeta /concho-app/
ZIP_PATH = os.path.join(SITE_DIR, "concho-app-hostinger.zip")
TAILWIND = os.path.join(SITE_DIR, "node_modules", ".bin", "tailwindcss")

IF_BLOCK = re.compile(r"<!--@if ([\w.]+)-->(.*?)(?:<!--@else-->(.*?))?<!--@endif-->", re.S)
TOKEN = re.compile(r"\{\{\s*([\w.]+)\s*\}\}")

HTACCESS = """# Concho App: ajustes opcionales para Hostinger (Apache/LiteSpeed)
Options -Indexes
DirectoryIndex index.html

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 month"
  ExpiresByType image/png "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 month"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>
"""


def lookup(ctx, path):
    value = ctx
    for part in path.split("."):
        if not isinstance(value, dict) or part not in value:
            raise KeyError(f"Falta '{path}' en site.config.json")
        value = value[part]
    return value


def render(template, ctx):
    def block(match):
        try:
            truthy = bool(lookup(ctx, match.group(1)))
        except KeyError:
            truthy = False
        return match.group(2) if truthy else (match.group(3) or "")

    out = IF_BLOCK.sub(block, template)
    out = TOKEN.sub(lambda m: html.escape(str(lookup(ctx, m.group(1))), quote=True), out)
    # Quita el comentario de plantilla del HTML publicado.
    out = re.sub(r"\s*<!-- Plantilla:.*?-->", "", out)
    leftovers = re.findall(r"\{\{|<!--@", out)
    if leftovers:
        raise ValueError(f"Quedaron marcas de plantilla sin resolver: {leftovers[:3]}")
    return out


def short_hash(path):
    with open(path, "rb") as fh:
        return hashlib.sha256(fh.read()).hexdigest()[:10]


@log_execution
def build(config_path=None):
    config_path = config_path or os.path.join(SITE_DIR, "site.config.json")
    with open(config_path, encoding="utf-8") as fh:
        config = json.load(fh)

    if os.path.isdir(DIST):
        shutil.rmtree(DIST)
    os.makedirs(os.path.join(DIST, "assets", "css"))
    os.makedirs(os.path.join(DIST, "assets", "js"))

    # 1. CSS con Tailwind (solo las clases usadas).
    css_out = os.path.join(DIST, "assets", "css", "site.css")
    subprocess.run([TAILWIND, "-c", os.path.join(SITE_DIR, "tailwind.config.js"),
                    "-i", os.path.join(SRC, "css", "input.css"), "-o", css_out, "--minify"],
                   check=True, cwd=SITE_DIR, capture_output=True)

    # 2. JavaScript e imágenes.
    js_out = os.path.join(DIST, "assets", "js", "main.js")
    shutil.copyfile(os.path.join(SRC, "js", "main.js"), js_out)
    shutil.copytree(os.path.join(SRC, "assets", "img"), os.path.join(DIST, "assets", "img"))

    # 3. Plantilla HTML.
    site_url = config.get("siteUrl", "").rstrip("/")
    og_image = "assets/img/og-concho-app.jpg"
    ctx = dict(config)
    ctx["hero"] = dict(config["hero"], videosJson=json.dumps(config["hero"]["videos"]))
    ctx["meta"] = {
        "canonical": f"{site_url}/" if site_url else "",
        "ogImage": f"{site_url}/{og_image}" if site_url else og_image,
    }
    ctx["build"] = {
        "css": f"assets/css/site.css?v={short_hash(css_out)}",
        "js": f"assets/js/main.js?v={short_hash(js_out)}",
        "year": datetime.date.today().year,
    }
    with open(os.path.join(SRC, "index.html"), encoding="utf-8") as fh:
        page = render(fh.read(), ctx)
    with open(os.path.join(DIST, "index.html"), "w", encoding="utf-8") as fh:
        fh.write(page)
    with open(os.path.join(DIST, ".htaccess"), "w", encoding="utf-8") as fh:
        fh.write(HTACCESS)

    # 4. Vista previa servida desde una subcarpeta, como en el hosting.
    if os.path.isdir(PREVIEW):
        shutil.rmtree(PREVIEW)
    shutil.copytree(DIST, PREVIEW)

    # 5. ZIP solo con archivos de despliegue (orden estable).
    if os.path.exists(ZIP_PATH):
        os.remove(ZIP_PATH)
    files = []
    for folder, _, names in os.walk(DIST):
        for name in names:
            if name == ".DS_Store":
                continue
            full = os.path.join(folder, name)
            files.append((full, os.path.relpath(full, DIST)))
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as zf:
        for full, rel in sorted(files, key=lambda f: f[1]):
            zf.write(full, rel)

    total = sum(os.path.getsize(f) for f, _ in files)
    print(f"dist/: {len(files)} archivos, {total / 1024:.0f} KB")
    print(f"ZIP:   {ZIP_PATH} ({os.path.getsize(ZIP_PATH) / 1024:.0f} KB)")
    return {"files": len(files), "bytes": total}


if __name__ == "__main__":
    import sys
    build(config_path=sys.argv[1] if len(sys.argv) > 1 else None)
