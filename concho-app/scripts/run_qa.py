#!/usr/bin/env python3
"""Corre las pruebas de navegador (qa/qa.mjs) contra preview/ en un servidor temporal.

Sirve el sitio desde /concho-app/ (como en el hosting), toma capturas en
screenshots/ y guarda los resultados en docs/qa-resultados.json.
Requiere: `npm run build` antes, Google Chrome y `npm install` dentro de qa/.

Uso:  npm run qa
"""
import os
import socket
import subprocess
import sys
import time

from _logging import SITE_DIR, log_execution


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


@log_execution
def run_qa():
    preview = os.path.join(SITE_DIR, "preview")
    if not os.path.exists(os.path.join(preview, "concho-app", "index.html")):
        raise SystemExit("Falta preview/concho-app: corre `npm run build` primero.")
    if not os.path.isdir(os.path.join(SITE_DIR, "qa", "node_modules")):
        raise SystemExit("Faltan dependencias de QA: corre `npm install` dentro de concho-app/qa.")

    port = free_port()
    server = subprocess.Popen([sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1",
                               "--directory", preview], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        time.sleep(1)
        shots = os.path.join(SITE_DIR, "screenshots")
        os.makedirs(shots, exist_ok=True)
        cmd = ["node", os.path.join(SITE_DIR, "qa", "qa.mjs"), f"http://127.0.0.1:{port}/concho-app/", shots]
        # Referencia visual opcional: CONCHOADS_REFERENCE_URL=file:///…/Initiumwebpagev3/conchoads/index.html
        # (conchoads.com muestra una verificación anti-bots a navegadores automatizados).
        cmd.append(os.environ.get("CONCHOADS_REFERENCE_URL", ""))
        cmd.append(os.path.join(SITE_DIR, "docs", "qa-resultados.json"))
        result = subprocess.run(cmd, cwd=SITE_DIR)
    finally:
        server.terminate()
    if result.returncode:
        raise SystemExit(f"QA con fallas (código {result.returncode}). Revisa docs/qa-resultados.json.")
    return {"status": "ok"}


if __name__ == "__main__":
    run_qa()
