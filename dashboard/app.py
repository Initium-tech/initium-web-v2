import streamlit as st
import sqlite3
import pandas as pd
import os

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'logs', 'antigravity.db')

st.set_page_config(page_title="Antigravity Dashboard", layout="wide")

st.title("🛡️ Antigravity Observability Dashboard")

if not os.path.exists(DB_PATH):
    st.info("No hay datos de ejecución registrados aún. La base de datos se creará con la primera ejecución.")
else:
    conn = sqlite3.connect(DB_PATH)
    
    # KPI Section
    st.subheader("Métricas Globales")
    df_kpi = pd.read_sql_query("SELECT status, COUNT(*) as count FROM executions GROUP BY status", conn)
    col1, col2 = st.columns(2)
    
    total_executions = df_kpi['count'].sum()
    success_rate = (df_kpi[df_kpi['status'] == 'SUCCESS']['count'].sum() / total_executions) * 100 if total_executions > 0 else 0
    
    col1.metric("Ejecuciones Totales", total_executions)
    col2.metric("Tasa de Éxito", f"{success_rate:.1f}%")

    # History Section
    st.subheader("Historial de Ejecuciones")
    df_history = pd.read_sql_query("SELECT * FROM executions ORDER BY start_time DESC", conn)
    st.dataframe(df_history, use_container_width=True)
    
    conn.close()

st.sidebar.markdown("---")
st.sidebar.info("Dashboard de Observabilidad - Arquitectura de 4 Capas")
