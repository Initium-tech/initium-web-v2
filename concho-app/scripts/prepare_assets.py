#!/usr/bin/env python3
"""Prepara las imágenes optimizadas del sitio a partir de los assets aprobados.

Lee los archivos originales (CDN pública y carpetas de producto en SynologyDrive),
genera versiones WebP/PNG livianas en src/assets/img y no modifica los originales.
Solo hace falta correrlo cuando cambie un asset; el resultado ya está en src/.

Requiere macOS (swiftc, sips) y cwebp.  Uso:  python3 scripts/prepare_assets.py
"""
import glob
import json
import os
import shutil
import subprocess
import urllib.request

from _logging import SITE_DIR, log_execution

PROJECTS = os.path.expanduser("~/Library/CloudStorage/SynologyDrive-athenassync/Projects")
CDN = "https://d16y57bdjt0bnh.cloudfront.net/website-assets"

SOURCES = {
    "logo": f"{CDN}/ConchoAppsLogov2.png",
    "intro_video_1": f"{CDN}/ConchoAdsbannerwebpage.mp4",
    "studio_logo": f"{PROJECTS}/Concho Studio/ConchoStudioLogo.png",
    "conchito_canon": f"{PROJECTS}/Concho Studio/Concho_mascot_images/Conchito_front.png",
    "pilot_thumb": f"{PROJECTS}/Concho Studio/brand/ep00-conchito-youtube-thumbnail.png",
    "rutas_icon": f"{PROJECTS}/ConchoRutas/ios/Runner/Assets.xcassets/AppIcon.appiconset/Icon-App-1024x1024@1x.png",
    # macOS nombra las capturas con un espacio estrecho antes de "PM"; se resuelve con glob.
    "ads_tablet": f"{PROJECTS}/Concho Ads/imagenes productos final/Screenshot 2025-12-31 at 2.56.18*PM.png",
}

CACHE = os.path.join(SITE_DIR, ".cache")
OUT = os.path.join(SITE_DIR, "src", "assets", "img")
TOOL = os.path.join(CACHE, "imgtool")

# Recorte del emblema (sapo concho) dentro de ConchoAppsLogov2.png (415x336).
# Medido con `imgtool bbox`: el emblema ocupa x=116, y=0, 200x188; el texto empieza en y=210.
EMBLEM_CROP = (110, 0, 204, 204)


def run(*cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL)


def fetch(url, dest):
    if not os.path.exists(dest):
        urllib.request.urlretrieve(url, dest)
    return dest


def webp(src, dest, width=None, quality=80):
    cmd = ["cwebp", "-quiet", "-q", str(quality), "-alpha_q", "90", "-m", "6"]
    if width:
        cmd += ["-resize", str(width), "0"]
    run(*cmd, src, "-o", dest)


def tool(*args):
    subprocess.run([TOOL, *args], check=True)


@log_execution
def prepare_assets():
    os.makedirs(CACHE, exist_ok=True)
    os.makedirs(OUT, exist_ok=True)
    run("swiftc", "-O", "-suppress-warnings", os.path.join(SITE_DIR, "scripts", "tools", "imgtool.swift"), "-o", TOOL)

    for key, path in SOURCES.items():
        if path.startswith("http"):
            continue
        matches = glob.glob(path)
        if not matches:
            raise FileNotFoundError(f"Falta el asset de origen '{key}': {path}")
        SOURCES[key] = matches[0]

    logo = fetch(SOURCES["logo"], os.path.join(CACHE, "ConchoAppsLogov2.png"))
    video = fetch(SOURCES["intro_video_1"], os.path.join(CACHE, "ConchoAdsbannerwebpage.mp4"))

    # Logo completo de Concho Ads (sin cambios) y emblema compartido del ecosistema.
    shutil.copyfile(logo, os.path.join(OUT, "concho-ads-logo.png"))
    emblem = os.path.join(CACHE, "emblema.png")
    tool("crop", logo, *map(str, EMBLEM_CROP), emblem)
    for size, name in ((192, "favicon-192.png"),
                       (180, "apple-touch-icon.png"), (32, "favicon-32.png")):
        tool("fit", emblem, str(size), os.path.join(OUT, name))
    webp(emblem, os.path.join(OUT, "concho-emblema.webp"), width=160, quality=90)

    # Póster estático del hero: primer fotograma útil del primer video de la intro.
    frame = os.path.join(CACHE, "hero-frame.png")
    tool("frame", video, "0.5", frame)
    webp(frame, os.path.join(OUT, "hero-poster.webp"), quality=72)

    webp(SOURCES["studio_logo"], os.path.join(OUT, "concho-studio-logo.webp"), width=480, quality=86)
    webp(SOURCES["conchito_canon"], os.path.join(OUT, "conchito.webp"), width=600, quality=82)
    webp(SOURCES["pilot_thumb"], os.path.join(OUT, "conchito-piloto.webp"), width=960, quality=78)
    webp(SOURCES["rutas_icon"], os.path.join(OUT, "concho-rutas-icono.webp"), width=256, quality=86)
    webp(SOURCES["ads_tablet"], os.path.join(OUT, "concho-ads-tablet.webp"), quality=80)

    # Imagen para redes sociales (1200x630) con el emblema y la marca.
    with open(os.path.join(SITE_DIR, "site.config.json"), encoding="utf-8") as fh:
        brand = json.load(fh)["brand"]
    tool("og", emblem, brand["name"], brand["motto"],
         "Concho Studio  ·  Concho Rutas  ·  Concho Ads", os.path.join(OUT, "og-concho-app.jpg"))

    for name in sorted(os.listdir(OUT)):
        print(f"  {name:28s} {os.path.getsize(os.path.join(OUT, name)) / 1024:7.1f} KB")


if __name__ == "__main__":
    prepare_assets()
