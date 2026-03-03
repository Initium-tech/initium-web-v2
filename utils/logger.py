import sqlite3
import time
import functools
import os
import json
import traceback

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'logs', 'antigravity.db')

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS executions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            script_name TEXT,
            start_time REAL,
            end_time REAL,
            duration REAL,
            status TEXT,
            error_message TEXT,
            tokens_used INTEGER,
            metadata TEXT
        )
    ''')
    conn.commit()
    conn.close()

def log_execution(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        init_db()
        script_name = os.path.basename(func.__code__.co_filename)
        start_time = time.time()
        status = "SUCCESS"
        error_message = None
        
        print(f"[LOGGER] Starting {script_name}...")
        
        try:
            result = func(*args, **kwargs)
            return result
        except Exception as e:
            status = "ERROR"
            error_message = traceback.format_exc()
            print(f"[LOGGER] Error in {script_name}: {e}")
            raise
        finally:
            end_time = time.time()
            duration = end_time - start_time
            
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO executions (script_name, start_time, end_time, duration, status, error_message, metadata)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (script_name, start_time, end_time, duration, status, error_message, json.dumps(kwargs)))
            conn.commit()
            conn.close()
            print(f"[LOGGER] Finished {script_name} with status {status}")
            
    return wrapper
