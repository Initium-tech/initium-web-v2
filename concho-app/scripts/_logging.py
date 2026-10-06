"""Conecta los scripts de concho-app con el logger del proyecto (utils/logger.py).

Si concho-app se copia fuera del repositorio Initiumwebpagev3, el decorador
se reemplaza por uno que solo imprime inicio y fin, para que la compilación
siga funcionando.
"""
import functools
import os
import sys
import time

SITE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO_DIR = os.path.dirname(SITE_DIR)

sys.path.insert(0, REPO_DIR)
try:
    from utils.logger import log_execution  # noqa: F401  (registro en logs/antigravity.db)
    LOGGER = "utils/logger.py"
except ImportError:  # pragma: no cover - solo fuera del repositorio
    LOGGER = "fallback"

    def log_execution(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            start = time.time()
            print(f"[LOGGER] Starting {func.__name__} (sin utils/logger.py)")
            try:
                return func(*args, **kwargs)
            finally:
                print(f"[LOGGER] Finished {func.__name__} in {time.time() - start:.2f}s")
        return wrapper
