import os
import sys

# Add the project root to sys.path so we can import utils.logger
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_root)

from utils.logger import log_execution

def get_head_html(title):
    return f"""
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {{
            darkMode: 'class',
            theme: {{
                extend: {{
                    fontFamily: {{
                        sans: ['Inter', 'sans-serif'],
                    }},
                    colors: {{
                        initium: {{
                            blue: '#00AEEF',
                            dark: '#0f172a',
                            light: '#f8fafc',
                            gray: '#D9D9D9'
                        }},
                        ecosystem: {{
                            concho: '#245B43', // muted green tone
                            aws: '#ff9900',
                            ms: '#00a4ef'
                        }}
                    }}
                }}
            }}
        }}
    </script>
    <style>
        .glass-panel {{
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
        }}
        .dark .glass-panel {{
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }}
        .hero-pattern {{
            background-color: #f8fafc;
            background-image: radial-gradient(#00AEEF 0.5px, transparent 0.5px), radial-gradient(#00AEEF 0.5px, #f8fafc 0.5px);
            background-size: 20px 20px;
            background-position: 0 0, 10px 10px;
        }}
        .dark .hero-pattern {{
            background-color: #0f172a;
            background-image: radial-gradient(#334155 0.5px, transparent 0.5px), radial-gradient(#334155 0.5px, #0f172a 0.5px);
        }}
    </style>
</head>
"""

def get_header_html(active_page="index"):
    # Determine styles based on active page
    is_conchoads = active_page == 'conchoads'
    
    header_bg = "bg-[#1F4D3A] border-b border-[#2E6B52]" if is_conchoads else "glass-panel"
    text_color = "text-white/90 hover:text-[#C7A74A]" if is_conchoads else "text-slate-800 dark:text-slate-200 hover:text-initium-blue"
    
    def get_link_class(page_name):
        base_classes = "text-sm font-medium transition-colors"
        if is_conchoads:
            active_color = "text-[#C7A74A]" if active_page == page_name else text_color
            return f"{base_classes} {active_color}"
        else:
            active_color = "text-initium-blue" if active_page == page_name else text_color
            return f"{base_classes} {active_color}"

    # Logo logic
    if is_conchoads:
        logo_html = f"""
                    <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/ConchoAppsLogov2.png" alt="Concho Ads Logo" class="h-16 md:h-20 py-2 transition-all">
        """
    else:
        logo_html = f"""
                    <!-- Dark logo shown in light mode -->
                    <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/InitiumTech%20Darklogo.png" alt="Initium Tech Logo" class="h-10 dark:hidden transition-all">
                    <!-- Light logo shown in dark mode -->
                    <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/Initium%201@4x_transparent.png" alt="Initium Tech Logo" class="h-10 hidden dark:block transition-all">
        """
        
    border_class = "border-white/20" if is_conchoads else "border-slate-200 dark:border-slate-700"
    lang_btn_class = "text-white hover:text-[#C7A74A]" if is_conchoads else "hover:text-initium-blue"
    lang_span_class = "bg-white/10" if is_conchoads else "bg-slate-200 dark:bg-slate-700"
    theme_btn_class = "bg-white/10 hover:ring-[#C7A74A]" if is_conchoads else "bg-slate-100 dark:bg-slate-800 hover:ring-initium-blue"

    return f"""
    <!-- Header Navigation -->
    <header class="fixed w-full top-0 z-50 {header_bg} shadow-sm transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <!-- Logo -->
                <a href="{ '../' if is_conchoads else '' }index.html" class="flex-shrink-0 flex items-center gap-3 cursor-pointer">
{logo_html}
                </a>
                
                <!-- Toggles & Navigation -->
                <div class="flex items-center gap-6">
                    <nav class="hidden md:flex space-x-8">
                        <a href="{ '../' if is_conchoads else '' }index.html" class="{get_link_class('index')}" data-i18n="nav_home">Inicio</a>
                        <a href="{ '../' if is_conchoads else '' }nosotros.html" class="{get_link_class('nosotros')}" data-i18n="nav_about">Nosotros</a>
                        <a href="{ '../' if is_conchoads else '' }soluciones.html" class="{get_link_class('soluciones')}" data-i18n="nav_solutions">Soluciones</a>
                        <a href="{ '../' if is_conchoads else '' }roadmap.html" class="{get_link_class('roadmap')}" data-i18n="nav_roadmap">Roadmap</a>
                        <a href="{ '' if is_conchoads else 'conchoads/' }index.html" class="text-sm font-bold {'text-[#C7A74A]' if is_conchoads else 'text-ecosystem-concho hover:text-[#e0b95c]'} transition-colors">ConchoAds</a>
                        <a href="{ '../' if is_conchoads else '' }index.html#contacto" class="{get_link_class('contacto')}" data-i18n="nav_contact">Contacto</a>
                    </nav>

                    <div class="hidden md:flex items-center gap-4 pl-6 border-l {border_class}">
                        <!-- Language Toggle -->
                        <button class="lang-toggle flex items-center gap-2 text-sm font-semibold {lang_btn_class} transition-colors">
                            <span class="{lang_span_class} px-2 py-1 rounded text-xs select-none">ES/EN</span>
                        </button>
                        
                        <!-- Dark Mode Toggle -->
                        <button class="theme-toggle p-2 rounded-full {theme_btn_class} hover:ring-2 transition-all">
                            <!-- Sun icon -->
                            <svg class="theme-toggle-light-icon hidden w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            <!-- Moon icon -->
                            <svg class="theme-toggle-dark-icon hidden w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        </button>
                    </div>
                    
                    <div class="md:hidden flex items-center">
                        <!-- Mobile Menu Button -->
                        <button id="mobile-menu-btn" class="p-2 rounded-md {lang_btn_class} hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Mobile Menu Dropdown -->
            <div id="mobile-menu" class="hidden md:hidden absolute top-20 w-full left-0 { 'bg-[#1F4D3A] border-b border-[#2E6B52]' if is_conchoads else 'bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800' } shadow-xl">
                <nav class="flex flex-col px-4 pt-2 pb-6 space-y-3">
                    <a href="{ '../' if is_conchoads else '' }index.html" class="block {get_link_class('index')} py-2 border-b {border_class}" data-i18n="nav_home">Inicio</a>
                    <a href="{ '../' if is_conchoads else '' }nosotros.html" class="block {get_link_class('nosotros')} py-2 border-b {border_class}" data-i18n="nav_about">Nosotros</a>
                    <a href="{ '../' if is_conchoads else '' }soluciones.html" class="block {get_link_class('soluciones')} py-2 border-b {border_class}" data-i18n="nav_solutions">Soluciones</a>
                    <a href="{ '../' if is_conchoads else '' }roadmap.html" class="block {get_link_class('roadmap')} py-2 border-b {border_class}" data-i18n="nav_roadmap">Roadmap</a>
                    <a href="{ '' if is_conchoads else 'conchoads/' }index.html" class="block text-sm font-bold {'text-[#C7A74A]' if is_conchoads else 'text-ecosystem-concho'} py-2 border-b {border_class}">ConchoAds</a>
                    <a href="{ '../' if is_conchoads else '' }index.html#contacto" class="block {get_link_class('contacto')} py-2 border-b {border_class}" data-i18n="nav_contact">Contacto</a>
                    
                    <div class="flex items-center justify-between pt-2">
                        <!-- Language Toggle -->
                        <button class="lang-toggle flex items-center gap-2 text-sm font-semibold {lang_btn_class} transition-colors">
                            <span class="{lang_span_class} px-2 py-1 rounded text-xs select-none">ES / EN</span>
                        </button>
                        
                        <!-- Dark Mode Toggle -->
                        <button class="theme-toggle flex items-center gap-2 text-sm font-semibold {lang_btn_class} transition-colors">
                            <span class="dark:hidden">Dark Mode</span>
                            <span class="hidden dark:inline">Light Mode</span>
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    </header>
"""

def get_footer_html(active_page=""):
    roadmap_url = "../roadmap.html" if active_page == "conchoads" else "roadmap.html"
    return f"""
    <!-- Footer & Contact -->
    <footer id="contacto" class="bg-slate-900 text-white pt-20 pb-10 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                <!-- Contact Form -->
                <div>
                    <h2 class="text-3xl font-bold mb-6" data-i18n="contact_title">Hablemos de tu proyecto</h2>
                    <form class="space-y-4">
                        <div>
                            <input type="text" placeholder="Nombre completo" class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-initium-blue text-white" required>
                        </div>
                        <div>
                            <input type="email" placeholder="Correo electrónico" class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-initium-blue text-white" required>
                        </div>
                        <div>
                            <textarea rows="4" placeholder="¿Cómo podemos ayudarte?" class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-initium-blue text-white resize-none" required></textarea>
                        </div>
                        <button type="button" class="px-8 py-3 bg-initium-blue hover:bg-blue-600 rounded-xl font-bold transition-colors shadow-lg" data-i18n="contact_submit">Enviar Mensaje</button>
                    </form>
                </div>
                
                <!-- Info & Roadmap -->
                <div class="flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-3 mb-6">
                            <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/Initium%201@4x_transparent.png" alt="Initium Tech Logo" class="h-10">
                        </div>
                        <p class="text-slate-400 mb-8" data-i18n="footer_desc">Estandarizando infraestructuras empresariales y creando soluciones digitales modernas. Tu socio tecnológico en Puerto Rico.</p>
                        
                        <a href="{roadmap_url}" class="flex items-center gap-4 text-slate-300 hover:text-white transition-colors cursor-pointer w-max p-4 rounded-xl bg-slate-800 hover:bg-slate-700">
                            <svg class="w-6 h-6 text-initium-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            <span class="font-bold" data-i18n="footer_roadmap">Ver nuestro Roadmap de Desarrollo</span>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                <p>&copy; 2026 Initium Tech, LLC. Todos los derechos reservados.</p>
                <div class="flex gap-6">
                    <a href="#" class="hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" class="hover:text-white transition-colors">Facebook</a>
                    <a href="#" class="hover:text-white transition-colors">Instagram</a>
                </div>
            </div>
        </div>
    </footer>
"""

def get_logic_script():
    return """
    <!-- Interactive Logic -->
    <script>
        // Translations
        const translations = {
            es: {
                nav_home: 'Inicio',
                nav_about: 'Nosotros',
                nav_solutions: 'Soluciones',
                nav_roadmap: 'Roadmap',
                nav_partners: 'Partners',
                nav_contact: 'Contacto',
                hero_title: 'Innovación Tecnológica para <span class="text-initium-blue relative inline-block">Empresas<div class="absolute -bottom-2 left-0 w-full h-1 bg-initium-blue/30 rounded-full"></div></span>, Comunidades y Organizaciones en Puerto Rico',
                hero_subtitle: 'Soluciones integrales de Initium Tech: Desde automatización corporativa y ecosistemas culturales, hasta soporte especializado para Non-Profits.',
                hero_cta: 'Agenda tu Consulta Gratuita',
                explore_solutions: 'Explorar Soluciones',
                eco_title: 'Ecosistema de Soluciones',
                col1_title: 'Concho Apps Ecosystem',
                col1_item1_title: 'Concho Ads',
                col1_item1_desc: 'Plataforma de Descubrimiento turística en PR, juegos culturales y locales.',
                col1_item2_title: 'Concho Rutas',
                col1_item2_desc: 'Compañero de Viaje: conecta viajeros con proveedores de experiencias turísticas.',
                col1_item3_title: 'Borinquen Builder Game',
                col1_item3_desc: 'Juego de Construcción cultural para construir una ciudad puertorriqueña.',
                col2_core: 'Infraestructura estandarizada, automatización profesional de M365 y soporte inteligente.',
                col2_item1: 'Soluciones para universidades (ej. Campus AI) y soporte corporativo.',
                col2_item2: 'Plataformas de Microsoft, AWS y comunicaciones 3CX partner.',
                col2_item3: 'Desarrollo de páginas y aplicaciones web a la medida.',
                col3_title: 'Soluciones para Non-Profit Orgs.',
                col3_item1_title: 'Postales Contadas',
                col3_item1_desc: 'Soluciones basadas en AWS SES, lambda, S3, SWP.',
                col3_item2_title: 'Fundraising Web Pages & Apps',
                col3_item2_desc: 'Plataformas interactivas para recaudación de fondos y engagement.',
                partners_title: 'Nuestros Partners Estratégicos',
                contact_title: 'Hablemos de tu proyecto',
                contact_submit: 'Enviar Mensaje',
                footer_desc: 'Estandarizando infraestructuras empresariales y creando soluciones digitales modernas. Tu socio tecnológico en Puerto Rico.',
                footer_roadmap: 'Ver nuestro Roadmap de Desarrollo',
                roadmap_title: 'ROADMAP DE SOLUCIONES & ECOSISTEMA DE PRODUCTOS',
                roadmap_desc: 'Explora nuestros proyectos en desarrollo y planes futuros para cada pilar del ecosistema Initium.',
                status_dev: 'En Desarrollo',
                status_plan: 'En Planificación',
                status_live: 'Activo',
                ads_hero_title: 'Publicidad inteligente en movimiento',
                ads_hero_sub: 'ConchoADS convierte los "tapones" de Puerto Rico en audiencias cautivas, mostrando anuncios digitales en tabletas dentro de vehículos de transporte para maximizar alcance, recordación y resultados medibles.',
                ads_hero_bullet1: 'Red de pantallas en movimiento dentro de vehículos de servicio público y flotillas privadas.',
                ads_hero_bullet2: 'Anuncios dinámicos con métricas en tiempo real y reportes accionables.',
                ads_hero_bullet3: 'Optimización asistida por IA para mejorar desempeño de campañas sin complicar la operación.',
                ads_cta_primary: 'Quiero anunciarme',
                ads_cta_sec: 'Solicitar demo técnica',
                ads_what_title: '¿Qué es ConchoADS?',
                ads_what_p1: 'Es una plataforma de publicidad digital-out-of-home (DOOH) que usa tabletas Android montadas en vehículos para mostrar anuncios segmentados durante los trayectos.',
                ads_what_p2: 'Cada impresión se registra y se transforma en datos para medir alcance, interacción y efectividad.',
                ads_what_p3: 'Las campañas se gestionan desde un portal web seguro para cargar creatividades, definir segmentación y revisar reportes.',
                ads_what_p4: 'Está diseñada inicialmente para Puerto Rico, con capacidad de escalar a nuevas ciudades sin rediseñar la solución.',
                ads_sol_title: 'Principales soluciones',
                ads_sol_adv: 'Para anunciantes y agencias',
                ads_sol_adv_1: 'Pantallas en movimiento',
                ads_sol_adv_1_d: 'Anuncios en tabletas dentro de vehículos, con formatos de imagen, video y mensajes interactivos (por ejemplo, QR).',
                ads_sol_adv_2: 'Campañas medibles',
                ads_sol_adv_2_d: 'Registro de impresiones, clics, tiempo de exposición y eventos clave para medir el rendimiento de cada anuncio.',
                ads_sol_adv_3: 'Optimización asistida por IA',
                ads_sol_adv_3_d: 'Motor de recomendaciones (basado en Gemini AI) que sugiere ajustes de rotación, creatividades o segmentación.',
                ads_sol_adv_4: 'Reportes ejecutivos',
                ads_sol_adv_4_d: 'Tableros con KPIs resumidos para gerencia y vistas detalladas para equipos de mercadeo y agencias.',
                ads_sol_fleet: 'Para operadores de flotillas y dueños de vehículos',
                ads_sol_fleet_1: 'Nueva fuente de ingresos',
                ads_sol_fleet_1_d: 'Monetización del espacio interno del vehículo mediante revenue share por campañas activas.',
                ads_sol_fleet_2: 'Modo kiosko seguro',
                ads_sol_fleet_2_d: 'La tableta queda bloqueada a la app de ConchoADS, evitando uso no autorizado y reduciendo soporte.',
                ads_sol_fleet_3: 'Gestión centralizada de dispositivos',
                ads_sol_fleet_3_d: 'Administración remota de tabletas: estado en línea, versión de app, sincronizaciones recientes y métricas por vehículo.',
                ads_hw_title: '¿Cómo funciona?',
                ads_hw_1: 'El pasajero se sienta',
                ads_hw_1_d: 'Al iniciar el viaje, la tableta entra en ciclo de reproducción de anuncios, adaptado a la duración promedio del trayecto.',
                ads_hw_2: 'Se muestran anuncios dinámicos',
                ads_hw_2_d: 'Carrusel de piezas creativas, variando según campaña, horario, zona y reglas de segmentación.',
                ads_hw_3: 'Se capturan métricas locales',
                ads_hw_3_d: 'Cada impresión e interacción se registra localmente en la tableta, incluso sin conexión.',
                ads_hw_4: 'Sincronización segura con la nube',
                ads_hw_4_d: 'Cuando hay conectividad, los datos se sincronizan con la nube mediante APIs seguras y almacenamiento optimizado para alto volumen de eventos.',
                ads_hw_5: 'Análisis y optimización',
                ads_hw_5_d: 'Los datos alimentan modelos de IA (Gemini) que generan recomendaciones para optimizar campañas y ofrecer insights a los clientes.',
                ads_arch_title: 'Arquitectura de alto nivel',
                ads_arch_desc: 'La arquitectura es cloud-native serverless para soportar miles de dispositivos con costos controlados y alta disponibilidad. Se divide en tres capas: Dispositivo (Edge), Servicios en la nube (Backend) y Administración / Analítica / IA.<br><br>Mantenemos estrictos estándares de seguridad usando HTTPS, autenticación basada en tokens (JWT) y control de acceso por roles. Nuestro modelo de escalabilidad horizontal y monitoreo centralizado garantiza resiliencia probada en entornos distribuidos.',
                ads_arch_1: 'Capa de dispositivo (Edge)',
                ads_arch_1_d: '<ul class="list-disc pl-4 mt-2 space-y-1"><li>App móvil en React Native/Expo en tabletas Android en modo kiosko.</li><li>Módulos locales para caché de anuncios, cola de métricas y manejo offline-first.</li><li>Cliente API con autenticación basada en tokens y reconexión automática.</li></ul>',
                ads_arch_2: 'Capa de servicios en la nube (Backend)',
                ads_arch_2_d: '<ul class="list-disc pl-4 mt-2 space-y-1"><li>API HTTP detrás de un API Gateway con endpoints para anuncios, métricas, autenticación y administración.</li><li>Funciones serverless (Node.js/TypeScript) para reglas de negocio.</li><li>Base de datos NoSQL optimizada para eventos y consultas por campaña, dispositivo y rango de fechas.</li></ul>',
                ads_arch_3: 'Capa de administración, analítica y IA',
                ads_arch_3_d: '<ul class="list-disc pl-4 mt-2 space-y-1"><li>Panel web administrativo para campañas, creatividades, gestión de dispositivos y usuarios.</li><li>Servicios de analítica agregada para métricas diarias, semanales y mensuales.</li><li>Integración con APIs de Gemini AI para análisis y generación de recomendaciones.</li></ul>',
                ads_ben_title: 'Beneficios clave',
                ads_ben_1: 'Anunciantes',
                ads_ben_1_d: 'Audiencia cautiva: Impacto en personas que no pueden "hacer skip" durante su trayecto.',
                ads_ben_2: 'Agencias',
                ads_ben_2_d: 'Datos accionables: Métricas claras para justificar inversión y optimizar creatividades.',
                ads_ben_3: 'Dueños de flotillas',
                ads_ben_3_d: 'Ingreso adicional: Modelo de revenue share por vehículo y campaña activa.',
                ads_ben_4: 'Conductores / Socios',
                ads_ben_4_d: 'Plataforma simple: Tabletas administradas remotamente con mínima intervención del chofer.',
                ads_ben_5: 'Pasajeros',
                ads_ben_5_d: 'Mejor experiencia de viaje: Contenido relevante y entretenido durante el tiempo en carretera.',
                ads_cta_final_title: 'Lleva tu marca a donde está el tráfico',
                ads_cta_final_desc: 'ConchoADS está en fase de expansión y busca aliados estratégicos: marcas, agencias, flotillas y socios tecnológicos que quieran liderar la próxima ola de publicidad DOOH en movimiento.',
                ads_cta_btn1: 'Agenda una reunión',
                ads_cta_btn2: 'Recibir presentación ejecutiva'
            },
            en: {
                nav_home: 'Home',
                nav_about: 'About Us',
                nav_solutions: 'Solutions',
                nav_roadmap: 'Roadmap',
                nav_partners: 'Partners',
                nav_contact: 'Contact',
                hero_title: 'Technological Innovation for <span class="text-initium-blue relative inline-block">Businesses<div class="absolute -bottom-2 left-0 w-full h-1 bg-initium-blue/30 rounded-full"></div></span>, Communities and Organizations in Puerto Rico',
                hero_subtitle: 'Initium Tech comprehensive solutions: From corporate automation and cultural ecosystems, to specialized support for Non-Profits.',
                hero_cta: 'Schedule Your Free Consultation',
                explore_solutions: 'Explore Solutions',
                eco_title: 'Our Solution Ecosystem',
                col1_title: 'Concho Apps Ecosystem',
                col1_item1_title: 'Concho Ads',
                col1_item1_desc: 'Discovery platform for tourism in PR, featuring cultural and local games.',
                col1_item2_title: 'Concho Routes',
                col1_item2_desc: 'Travel Companion: connects travelers with local tourism experience providers.',
                col1_item3_title: 'Borinquen Builder Game',
                col1_item3_desc: 'Cultural builder game focused on establishing a Puerto Rican city layout.',
                col2_core: 'Standardized infrastructure, professional M365 automation and intelligent IT support.',
                col2_item1: 'Solutions for universities (e.g. Campus AI) and corporate technical support.',
                col2_item2: 'Microsoft platforms, AWS and official 3CX partner communications.',
                col2_item3: 'Custom web page and application development.',
                col3_title: 'Specialized Non-Profit Solutions',
                col3_item1_title: 'Postales Contadas',
                col3_item1_desc: 'Cloud solutions leveraging AWS SES, lambda functions, S3, and SWP.',
                col3_item2_title: 'Fundraising Web Pages & Apps',
                col3_item2_desc: 'Interactive platforms tailored for effective fundraising and engagement.',
                partners_title: 'Our Strategic Partners',
                contact_title: 'Let\\'s discuss your project',
                contact_submit: 'Send Message',
                footer_desc: 'Standardizing corporate infrastructures and engineering modern digital solutions. Your trusted technology partner in PR.',
                footer_roadmap: 'View our Development Roadmap',
                roadmap_title: 'SOLUTIONS ROADMAP & PRODUCT ECOSYSTEM',
                roadmap_desc: 'Explore our projects in development and future plans for each pillar of the Initium ecosystem.',
                status_dev: 'In Development',
                status_plan: 'Planning',
                status_live: 'Live',
                ads_hero_title: 'Smart Advertising in Motion',
                ads_hero_sub: 'ConchoADS turns Puerto Rico traffic jams into captive audiences, displaying digital ads on tablets inside transport vehicles to maximize reach, recall, and measurable results.',
                ads_hero_bullet1: 'Moving screen network inside public service vehicles and private fleets.',
                ads_hero_bullet2: 'Dynamic ads with real-time metrics and actionable reports.',
                ads_hero_bullet3: 'AI-assisted optimization to enhance campaign performance without complicating operations.',
                ads_cta_primary: 'I want to advertise',
                ads_cta_sec: 'Request technical demo',
                ads_what_title: 'What is ConchoADS?',
                ads_what_p1: 'It is a digital-out-of-home (DOOH) advertising platform using Android tablets mounted in vehicles to show targeted ads during trips.',
                ads_what_p2: 'Every impression is recorded and transformed into data to measure reach, interaction, and effectiveness.',
                ads_what_p3: 'Campaigns are managed from a secure web portal to upload creatives, define segmentation, and review reports.',
                ads_what_p4: 'Designed initially for Puerto Rico, with the capability to scale to new cities without redesigning the solution.',
                ads_sol_title: 'Core Solutions',
                ads_sol_adv: 'For Advertisers and Agencies',
                ads_sol_adv_1: 'Screens in motion',
                ads_sol_adv_1_d: 'In-vehicle tablet ads with image, video and interactive message formats (e.g. QR).',
                ads_sol_adv_2: 'Measurable Campaigns',
                ads_sol_adv_2_d: 'Tracking impressions, clicks, exposure time, and key events to measure performance.',
                ads_sol_adv_3: 'AI-Assisted Optimization',
                ads_sol_adv_3_d: 'Recommendation engine (powered by Gemini AI) suggesting rotation, creative, or segmentation adjustments.',
                ads_sol_adv_4: 'Executive Reports',
                ads_sol_adv_4_d: 'Dashboards with summarized KPIs for management and detailed views for marketing teams and agencies.',
                ads_sol_fleet: 'For Fleet Operators and Vehicle Owners',
                ads_sol_fleet_1: 'New Revenue Stream',
                ads_sol_fleet_1_d: 'Monetize vehicle interior space through revenue share on active campaigns.',
                ads_sol_fleet_2: 'Secure Kiosk Mode',
                ads_sol_fleet_2_d: 'The tablet is locked to the ConchoADS app, preventing unauthorized use and reducing support.',
                ads_sol_fleet_3: 'Centralized Device Management',
                ads_sol_fleet_3_d: 'Remote tablet administration: online status, app version, recent syncs, and metrics per vehicle.',
                ads_hw_title: 'How does it work?',
                ads_hw_1: 'Passenger takes a seat',
                ads_hw_1_d: 'Upon trip start, the tablet enters an ad playback cycle, adapted to average trip duration.',
                ads_hw_2: 'Dynamic ads are displayed',
                ads_hw_2_d: 'Carousel of creative pieces, varying by campaign, time, zone, and targeting rules.',
                ads_hw_3: 'Local metrics captured',
                ads_hw_3_d: 'Every impression and interaction is logged locally on the tablet, even offline.',
                ads_hw_4: 'Secure cloud sync',
                ads_hw_4_d: 'When connectivity returns, data is synced securely via APIs to storage optimized for high-volume events.',
                ads_hw_5: 'Analysis & Optimization',
                ads_hw_5_d: 'Data feeds AI models (Gemini) that generate insights and recommendations to optimize client campaigns.',
                ads_arch_title: 'High-Level Architecture',
                ads_arch_desc: 'Our cloud-native serverless architecture handles thousands of devices with controlled costs and high availability. It is divided into three layers: Device (Edge), Cloud Services (Backend), and Admin/Analytics/AI.<br><br>We uphold strict security standards using HTTPS, token-based authentication (JWT) and role-based access control. Our horizontal scalability model and centralized monitoring ensure proven resilience in distributed environments.',
                ads_arch_1: 'Device Layer (Edge)',
                ads_arch_1_d: '<ul class="list-disc pl-4 mt-2 space-y-1"><li>React Native/Expo mobile app on Android tablets in kiosk mode.</li><li>Local modules for ad caching, metrics queue, and offline-first handling.</li><li>API client with token-based auth and auto-reconnect.</li></ul>',
                ads_arch_2: 'Cloud Services Layer (Backend)',
                ads_arch_2_d: '<ul class="list-disc pl-4 mt-2 space-y-1"><li>HTTP API behind an API Gateway with endpoints for ads, metrics, auth, and admin.</li><li>Serverless functions (Node.js/TypeScript) for business rules.</li><li>Event-optimized NoSQL database for campaign/device/date range queries.</li></ul>',
                ads_arch_3: 'Admin, Analytics & AI Layer',
                ads_arch_3_d: '<ul class="list-disc pl-4 mt-2 space-y-1"><li>Admin web dashboard for campaigns, creatives, devices, and users.</li><li>Aggregated analytics services for daily, weekly, monthly metrics.</li><li>Gemini AI API integration for analysis and recommendations.</li></ul>',
                ads_ben_title: 'Key Benefits',
                ads_ben_1: 'Advertisers',
                ads_ben_1_d: 'Captive audience: Impact individuals who cannot "skip" during their ride.',
                ads_ben_2: 'Agencies',
                ads_ben_2_d: 'Actionable data: Clear metrics to justify investment and optimize creatives.',
                ads_ben_3: 'Fleet Owners',
                ads_ben_3_d: 'Additional income: Revenue share model per vehicle and active campaign.',
                ads_ben_4: 'Drivers / Partners',
                ads_ben_4_d: 'Simple platform: Remotely managed tablets requiring minimal driver intervention.',
                ads_ben_5: 'Passengers',
                ads_ben_5_d: 'Better travel experience: Relevant, entertaining content during the time on the road.',
                ads_cta_final_title: 'Take your brand where the traffic is',
                ads_cta_final_desc: 'ConchoADS is expanding and looking for strategic allies: brands, agencies, fleets, and tech partners who want to lead the next wave of moving DOOH advertising.',
                ads_cta_btn1: 'Schedule a meeting',
                ads_cta_btn2: 'Receive executive deck'
            }
        };

        // Dark Mode Logic
        const themeToggles = document.querySelectorAll('.theme-toggle');
        const themeIconsLight = document.querySelectorAll('.theme-toggle-light-icon');
        const themeIconsDark = document.querySelectorAll('.theme-toggle-dark-icon');

        function updateThemeIcons() {
            if (document.documentElement.classList.contains('dark')) {
                themeIconsDark.forEach(i => i.classList.add('hidden'));
                themeIconsLight.forEach(i => i.classList.remove('hidden'));
            } else {
                themeIconsDark.forEach(i => i.classList.remove('hidden'));
                themeIconsLight.forEach(i => i.classList.add('hidden'));
            }
        }

        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        updateThemeIcons();

        themeToggles.forEach(btn => {
            btn.addEventListener('click', function() {
                if (localStorage.getItem('color-theme')) {
                    if (localStorage.getItem('color-theme') === 'light') {
                        document.documentElement.classList.add('dark');
                        localStorage.setItem('color-theme', 'dark');
                    } else {
                        document.documentElement.classList.remove('dark');
                        localStorage.setItem('color-theme', 'light');
                    }
                } else {
                    if (document.documentElement.classList.contains('dark')) {
                        document.documentElement.classList.remove('dark');
                        localStorage.setItem('color-theme', 'light');
                    } else {
                        document.documentElement.classList.add('dark');
                        localStorage.setItem('color-theme', 'dark');
                    }
                }
                updateThemeIcons();
            });
        });

        // Language Logic
        const langToggles = document.querySelectorAll('.lang-toggle');
        
        function applyLang(lang) {
            document.documentElement.lang = lang;
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if(translations[lang][key]) {
                    el.innerHTML = translations[lang][key];
                }
            });
        }
        
        let currentLang = localStorage.getItem('lang') || 'es';
        applyLang(currentLang);

        langToggles.forEach(btn => {
            btn.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            localStorage.setItem('lang', currentLang);
            applyLang(currentLang);
        });
    </script>
</body>
</html>
"""

def generate_index():
    html = f"""<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
{get_head_html("Initium Tech - Innovación Tecnológica")}
<body class="bg-initium-light text-slate-800 dark:bg-initium-dark dark:text-slate-200 transition-colors duration-300 antialiased font-sans flex flex-col min-h-screen">
    {get_header_html("index")}
    
    <!-- Hero Section with Video Background -->
    <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center justify-center min-h-[80vh]">
        <!-- Video Background -->
        <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover z-0 opacity-100 dark:opacity-80">
            <source src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/1Initium_Tech_Intro.mp4" type="video/mp4">
        </video>
        <!-- Overlay -->
        <div class="absolute inset-0 bg-white/40 dark:bg-slate-900/50 backdrop-blur-[1px] z-0"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6" data-i18n="hero_title">
                Innovación Tecnológica para <span class="text-initium-blue relative inline-block">Empresas<div class="absolute -bottom-2 left-0 w-full h-1 bg-initium-blue/30 rounded-full"></div></span>, Comunidades y Organizaciones en Puerto Rico
            </h1>
            <p class="max-w-3xl mx-auto text-xl md:text-2xl text-slate-800 dark:text-slate-200 mb-10 leading-relaxed font-medium" data-i18n="hero_subtitle">
                Soluciones integrales de Initium Tech: Desde automatización corporativa y ecosistemas culturales, hasta soporte especializado para Non-Profits.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contacto" class="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-initium-blue rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-initium-blue transition-all shadow-lg hover:shadow-initium-blue/30 hover:-translate-y-1 transform duration-200" data-i18n="hero_cta">
                    Agenda tu Consulta Gratuita
                </a>
                <a href="soluciones.html" class="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 bg-white dark:bg-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm" data-i18n="explore_solutions">
                    Explorar Soluciones
                </a>
            </div>
        </div>
    </section>

    <!-- Partnerships Section (Moved to Index) -->
    <section id="partners" class="py-16 bg-white dark:bg-slate-900 border-t border-b border-slate-200 dark:border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 class="text-center text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-8" data-i18n="partners_title">Nuestros Partners Estratégicos</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <!-- MS Partner -->
                <div class="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-2"><span class="text-ecosystem-ms">Microsoft</span> MCP</div>
                    <span class="text-xs text-slate-500 font-mono">ID: 660957809</span>
                </div>
                <!-- AWS Partner -->
                <div class="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-2"><span class="text-ecosystem-aws">AWS</span> Partner</div>
                    <span class="text-xs text-slate-500 font-mono">ID: 1826890</span>
                </div>
                <!-- CSP Partner -->
                <div class="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-2xl font-bold text-slate-800 dark:text-white mb-2">CSP Partner</div>
                    <span class="text-xs text-slate-500 font-mono">No: 7036773</span>
                </div>
                <!-- 3CX Partner -->
                <div class="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div class="text-2xl font-bold text-slate-800 dark:text-white mb-2">3CX Partner</div>
                    <span class="text-xs text-slate-500 font-mono">ID: 245240</span>
                </div>
            </div>
        </div>
    </section>

    <div class="py-16 bg-initium-light dark:bg-initium-dark flex justify-center">
        <a href="roadmap.html" class="inline-flex items-center gap-2 text-initium-blue font-bold text-xl hover:text-blue-600 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            <span data-i18n="roadmap_title">EXPLORAR EL ECOSISTEMA Y ROADMAP</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </a>
    </div>

    {get_footer_html()}
    {get_logic_script()}
"""
    return html

def generate_soluciones():
    html = f"""<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
{get_head_html("Initium Tech - Soluciones")}
<body class="bg-initium-light text-slate-800 dark:bg-initium-dark dark:text-slate-200 transition-colors duration-300 antialiased font-sans flex flex-col min-h-screen">
    {get_header_html("soluciones")}
    
    <div class="pt-32 pb-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-4xl font-extrabold tracking-tight mb-4" data-i18n="eco_title">Ecosistema de Soluciones</h1>
            <div class="h-1 w-20 bg-initium-blue mx-auto rounded-full mb-8"></div>
        </div>
    </div>

    {get_solutions_grid()}

    {get_footer_html()}
    {get_logic_script()}
"""
    return html

def get_solutions_grid():
    return """
    <!-- Ecosystem Section (3 Columns) Shared logic -->
    <section class="pb-24 bg-transparent relative flex-grow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Column 1: B2C / Concho -->
                <div class="group relative bg-ecosystem-concho text-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                    <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl opacity-100"></div>
                    <div class="relative z-10">
                        <div class="mb-6 flex items-center justify-center">
                            <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/ConchoAppsLogo.png" alt="Concho Apps" class="h-16 object-contain bg-white p-2 rounded-xl">
                        </div>
                        <h3 class="text-2xl font-bold mb-2 text-white" data-i18n="col1_title">Concho Apps Ecosystem</h3>
                        <p class="text-sm text-white/80 font-bold mb-6 tracking-wide">B2C & Tourism</p>
                        
                        <div class="space-y-4">
                            <div class="bg-white/10 p-4 rounded-xl border border-white/20 flex gap-4 items-start shadow-inner">
                                <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/ConchoAps.png" alt="Concho Ads" class="w-12 h-12 object-contain flex-shrink-0 bg-white p-1 rounded-lg">
                                <div>
                                    <h4 class="font-bold text-white" data-i18n="col1_item1_title">Concho Ads</h4>
                                    <p class="text-sm text-white/80 mt-1" data-i18n="col1_item1_desc">Plataforma de Descubrimiento turística en PR, juegos culturales y locales.</p>
                                </div>
                            </div>
                            <div class="bg-white/10 p-4 rounded-xl border border-white/20 flex gap-4 items-start shadow-inner">
                                <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/ConchoRutasBaseLogoTransparentbk.png" alt="Concho Rutas" class="w-12 h-12 object-contain flex-shrink-0 bg-white p-1 rounded-lg">
                                <div>
                                    <h4 class="font-bold text-white" data-i18n="col1_item2_title">Concho Rutas</h4>
                                    <p class="text-sm text-white/80 mt-1" data-i18n="col1_item2_desc">Compañero de Viaje: conecta viajeros con proveedores de experiencias turísticas.</p>
                                </div>
                            </div>
                            <div class="bg-white/10 p-4 rounded-xl border border-white/20 flex gap-4 items-start shadow-inner">
                                <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/ConchoGameFullLogoTransparentbk.png" alt="Borinquen Builder" class="w-12 h-12 object-contain flex-shrink-0 bg-white p-1 rounded-lg">
                                <div>
                                    <h4 class="font-bold text-white" data-i18n="col1_item3_title">Borinquen Builder Game</h4>
                                    <p class="text-sm text-white/80 mt-1" data-i18n="col1_item3_desc">Juego de Construcción cultural para construir una ciudad puertorriqueña.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Column 2: B2B / SmartCore -->
                <div class="group relative bg-initium-blue text-white rounded-3xl p-8 shadow-xl transform md:-translate-y-4 transition-transform duration-300">
                    <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                    <div class="relative z-10">
                        <div class="mb-6 flex items-center justify-center">
                            <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/SmartCoreIT_logo.png" alt="SmartCore IT" class="h-16 object-contain bg-white p-2 rounded-xl">
                        </div>
                        <h3 class="text-2xl font-bold mb-2">Initium SmartCore IT</h3>
                        <p class="text-sm text-blue-100 font-bold tracking-wide mb-6">Business Solutions (B2B)</p>
                        
                        <p class="text-sm mb-6 leading-relaxed bg-white/10 p-4 rounded-xl backdrop-blur-sm shadow-inner" data-i18n="col2_core">
                            Infraestructura estandarizada, automatización profesional de M365 y soporte inteligente.
                        </p>

                        <div class="space-y-4">
                            <div>
                                <h4 class="font-bold border-b border-white/20 pb-1 mb-2">AI Integrated Solutions</h4>
                                <p class="text-sm text-initium-light opacity-90" data-i18n="col2_item1">Soluciones para universidades (ej. Campus AI) y soporte corporativo.</p>
                            </div>
                            <div>
                                <h4 class="font-bold border-b border-white/20 pb-1 mb-2">Cloud Base Solutions</h4>
                                <p class="text-sm text-initium-light opacity-90" data-i18n="col2_item2">Plataformas de Microsoft, AWS y comunicaciones 3CX partner.</p>
                            </div>
                            <div>
                                <h4 class="font-bold border-b border-white/20 pb-1 mb-2">Custom Development</h4>
                                <p class="text-sm text-initium-light opacity-90" data-i18n="col2_item3">Desarrollo de páginas y aplicaciones web a la medida.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Column 3: ONG -->
                <div class="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-pink-500/30 transition-all duration-300 border border-slate-200 dark:border-slate-700">
                    <div class="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="relative z-10">
                        <div class="w-16 h-16 rounded-2xl bg-pink-100/50 dark:bg-pink-500/10 flex items-center justify-center mb-6 text-pink-600 dark:text-pink-400">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <h3 class="text-2xl font-bold mb-2 text-slate-900 dark:text-white" data-i18n="col3_title">Soluciones para Non-Profit Orgs.</h3>
                        <p class="text-sm text-pink-600 dark:text-pink-400 font-bold mb-6 tracking-wide">ONGS & Fundraising</p>
                        
                        <div class="space-y-4">
                            <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                                <h4 class="font-bold text-slate-800 dark:text-slate-200" data-i18n="col3_item1_title">Postales Contadas</h4>
                                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1" data-i18n="col3_item1_desc">Soluciones basadas en AWS SES, lambda, S3, SWP.</p>
                            </div>
                            <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                                <h4 class="font-bold text-slate-800 dark:text-slate-200" data-i18n="col3_item2_title">Fundraising Web Pages & Apps</h4>
                                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1" data-i18n="col3_item2_desc">Plataformas interactivas para recaudación de fondos y engagement.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
"""

def generate_roadmap():
    html = f"""<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
{get_head_html("Initium Tech - Roadmap")}
<body class="bg-initium-light text-slate-800 dark:bg-initium-dark dark:text-slate-200 transition-colors duration-300 antialiased font-sans flex flex-col min-h-screen">
    {get_header_html("roadmap")}
    
    <div class="pt-32 pb-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
            <h1 class="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white uppercase" data-i18n="roadmap_title">
                Solutions Roadmap & Product Ecosystem
            </h1>
            <div class="h-1 w-24 bg-initium-blue mx-auto rounded-full mb-6"></div>
            <p class="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 mb-8" data-i18n="roadmap_desc">
                Explora nuestros proyectos en desarrollo y planes futuros para cada pilar del ecosistema Initium.
            </p>
        </div>
    </div>

    <!-- Roadmap Diagram Representation -->
    <section class="pb-24 bg-transparent relative flex-grow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Diagram Container -->
            <div class="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 relative overflow-hidden">
                
                <!-- 3 Columns Layout mirroring the diagram -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                    
                    <!-- Column 1: CONCHO APPS ECOSYSTEM -->
                    <div class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-6 flex flex-col">
                        <div class="flex flex-col items-center gap-4 mb-6 pb-4 border-b-2 border-slate-200 dark:border-slate-700">
                            <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/ConchoAppsLogo.png" alt="Concho Apps" class="h-12 object-contain">
                            <h3 class="text-xl font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200 text-center">CONCHO APPS ECOSYSTEM</h3>
                        </div>
                        
                        <div class="space-y-4 flex-grow">
                            <!-- Concho Ads -->
                            <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-600 flex gap-4 items-center">
                                <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/ConchoAps.png" alt="Concho Ads" class="w-16 h-16 object-contain flex-shrink-0">
                                <div>
                                    <h4 class="font-bold text-sm leading-tight">CONCHO ADS<br><span class="font-normal text-xs text-slate-500">(Integrated Discovery Platform)</span></h4>
                                    <p class="text-[11px] text-slate-600 dark:text-slate-400 mt-2 leading-tight">
                                        - Local turism and cultural app<br>
                                        - designing a Puerto Rico-focused tourism and discovery app connecting visitors & residents with local providers, cultural games & experiences.
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Concho Rutas -->
                            <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-600 flex gap-4 items-center">
                                <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/ConchoRutasBaseLogoTransparentbk.png" alt="Concho Rutas" class="w-16 h-16 object-contain flex-shrink-0">
                                <div>
                                    <h4 class="font-bold text-sm leading-tight">CONCHO RUTAS<br><span class="font-normal text-xs text-slate-500">(Traveler Companion)</span></h4>
                                    <p class="text-[11px] text-slate-600 dark:text-slate-400 mt-2 leading-tight">
                                        - Connects travelers with local tourism experience providers, serving as a companion app to Concho Ads.
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Borinquen Builder -->
                            <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-600 flex gap-4 items-center">
                                <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/ConchoGameFullLogoTransparentbk.png" alt="Concho Game" class="w-16 h-16 object-contain flex-shrink-0">
                                <div>
                                    <h4 class="font-bold text-sm leading-tight">CONCHO BORINQUEN BUILDER GAME<br><span class="font-normal text-xs text-slate-500">(Community Town Builder)</span></h4>
                                    <p class="text-[11px] text-slate-600 dark:text-slate-400 mt-2 leading-tight">
                                        - Playful mini game to gradually build and upgrade a vibrant Puerto Rican town as they progress through the roadmap.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Column 2: BUSINESS SOLUTIONS -->
                    <div class="bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border-2 border-blue-200 dark:border-blue-800 p-6 flex flex-col">
                        <div class="text-center mb-6 pb-4 border-b-2 border-blue-200 dark:border-blue-800">
                            <h3 class="text-xl font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200">SOLUCIONES EMPRESARIALES</h3>
                            <p class="text-sm font-medium text-blue-600 dark:text-blue-400">(BUSINESS SOLUTIONS)</p>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4 flex-grow">
                            <!-- SmartCore IT (Spans 1 col but larger) -->
                            <div class="col-span-1 border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 p-4 rounded-xl flex flex-col">
                                <div class="mb-4 text-center">
                                    <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/SmartCoreIT_logo.png" alt="SmartCore IT Logo" class="h-12 mx-auto object-contain dark:bg-white dark:p-1 dark:rounded-lg">
                                    <div class="text-[10px] mt-1 text-slate-500 text-right">powered by INITIUM Tec</div>
                                </div>
                                <p class="text-[11px] leading-tight text-slate-600 dark:text-slate-400 flex-grow">
                                    SmartCore IT provides standardized infrastructure and automation to help small businesses operate securely and efficiently. By integrating Microsoft 365 and automated workflows, it replaces manual tasks with scalable, professional support, allowing your business to grow without technical friction.
                                </p>
                            </div>
                            
                            <!-- AI & Cloud -->
                            <div class="col-span-1 flex flex-col gap-4">
                                <!-- AI -->
                                <div class="border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 p-3 rounded-xl flex-grow">
                                    <div class="flex justify-center mb-2"><div class="bg-blue-100 text-blue-600 p-1 rounded"><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div></div>
                                    <h4 class="font-bold text-xs text-center mb-2 leading-tight">AI INTEGRATED<br>SOLUTIONS</h4>
                                    <ul class="text-[10px] leading-tight text-slate-600 dark:text-slate-400 list-none space-y-1">
                                        <li>- Campus AI solutions for Atlantic University</li>
                                        <li>- using AWS to power internal tools like QR-based walk-in</li>
                                        <li>- registration for IT support, web apps, and integrations AI for student/staff support.</li>
                                        <li class="mt-2 text-[9px] text-blue-600 dark:text-blue-400">An analytics system for purchase management and AI to process invoices.</li>
                                    </ul>
                                </div>
                                
                                <!-- Cloud Base -->
                                <div class="border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 p-3 rounded-xl">
                                    <h4 class="font-bold text-xs text-center mb-2 leading-tight">CLOUD BASE<br>SOLUTIONS FOR<br>BUSINESS</h4>
                                    <div class="flex justify-center gap-2 mb-2 font-bold text-xs text-slate-500">
                                        <span class="text-orange-500">aws</span> <span>3CX</span>
                                    </div>
                                    <p class="text-[10px] leading-tight text-slate-600 dark:text-slate-400">
                                        - Modern voice & contact-center offerings as a 3CX partner by hosting services on AWS (analytics, recordings, AI support, dashboards) to serve corporate clients.
                                    </p>
                                </div>
                                
                                <!-- Custom Dev -->
                                <div class="border border-blue-200 dark:border-blue-800 bg-slate-100 dark:bg-slate-700 p-2 rounded-xl text-center">
                                    <h4 class="font-bold text-[11px]">CUSTOM DEVELOPMENT &lt;/&gt;</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Column 3: NON PROFIT -->
                    <div class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-6 flex flex-col">
                        <div class="text-center mb-6 pb-4 border-b-2 border-slate-200 dark:border-slate-700">
                            <h3 class="text-xl font-bold uppercase tracking-wide text-slate-800 dark:text-slate-200 leading-tight">SOLUCIONES PARA ORGANIZACIONES<br>SIN FINES DE LUCRO</h3>
                            <p class="text-sm font-medium text-slate-500">(NON-PROFIT SOLUTIONS)</p>
                        </div>
                        
                        <div class="space-y-4 flex-grow">
                            <!-- AWS Services -->
                            <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-600">
                                <div class="flex items-center gap-4 mb-3">
                                    <div class="font-bold text-3xl text-orange-500">aws</div>
                                    <h4 class="font-bold text-sm leading-tight">POSTALES CONTADAS<br><span class="font-normal">(AWS SERVICES)</span></h4>
                                </div>
                                <div class="flex justify-around items-end text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-3 bg-slate-100 dark:bg-slate-900/50 py-3 rounded-xl">
                                    <div class="text-center flex flex-col items-center gap-2">
                                        <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/awspng.png" alt="AWS SNS" class="w-8 h-8 object-contain">
                                        <span>SNS</span>
                                    </div>
                                    <div class="text-center flex flex-col items-center gap-2">
                                        <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/lambdaicon.png" alt="AWS Lambda" class="w-8 h-8 object-contain">
                                        <span>Lambda</span>
                                    </div>
                                    <div class="text-center flex flex-col items-center gap-2">
                                        <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/S3.png" alt="Amazon S3" class="w-8 h-8 object-contain">
                                        <span>S3</span>
                                    </div>
                                    <div class="text-center flex flex-col items-center gap-2">
                                        <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/aws-sns.png" alt="AWS CloudFormation" class="w-8 h-8 object-contain">
                                        <span>CloudFormation</span>
                                    </div>
                                </div>
                                <p class="text-xs text-slate-600 dark:text-slate-400">
                                    - Postales contadas solutions on AWS SNS, lambda, S3, CloudFormation.
                                </p>
                            </div>
                            
                            <!-- Fundraising -->
                            <div class="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-600 flex gap-4 items-center">
                                <div class="text-4xl">❤️</div>
                                <div>
                                    <h4 class="font-bold text-sm leading-tight mb-1">FUNDRAISING &<br>ENGAGEMENT TOOLS</h4>
                                    <p class="text-[11px] text-slate-600 dark:text-slate-400">
                                        - Fundraising web pages and web apps.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Bottom Partnerships Bar -->
                <div class="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                    <div class="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 flex flex-wrap justify-between items-center gap-4">
                        <div class="font-bold text-sm">PARTNERSHIP CREDENTIALS</div>
                        <div class="flex flex-wrap items-center gap-6 text-xs w-full sm:w-auto">
                            <div class="flex items-center gap-2">
                                <span class="font-bold text-orange-500 text-lg">aws</span>
                                <span class="text-slate-500 leading-tight">Partner ID:<br><span class="font-bold text-slate-800 dark:text-white">1826890</span></span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="grid grid-cols-2 gap-[2px] w-4 h-4"><div class="bg-red-500"></div><div class="bg-green-500"></div><div class="bg-blue-500"></div><div class="bg-yellow-500"></div></div>
                                <span class="text-slate-500 leading-tight">Microsoft MCP<br>Partner ID:<br><span class="font-bold text-slate-800 dark:text-white">660957809</span></span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-slate-500 leading-tight">CSP Partner Number:<br><span class="font-bold text-slate-800 dark:text-white">7036773</span></span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="font-bold text-slate-800 dark:text-white text-lg">3CX <span class="text-[10px] font-normal">PARTNER</span></span>
                                <span class="font-bold text-slate-800 dark:text-white">245240</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {get_footer_html()}
    {get_logic_script()}
"""
    return html

def generate_nosotros():
    html = f"""<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
{get_head_html("Initium Tech - Nosotros")}
<body class="bg-initium-light text-slate-800 dark:bg-initium-dark dark:text-slate-200 transition-colors duration-300 antialiased font-sans flex flex-col min-h-screen">
    {get_header_html("nosotros")}
    
    <div class="pt-32 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
            <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
                Misión y Visión
            </h1>
            <p class="max-w-3xl mx-auto text-xl text-slate-600 dark:text-slate-400 mb-16">
                Ser el puente principal de innovación tecnológica en el Caribe.
            </p>

            <h2 class="text-3xl font-extrabold mb-10 text-slate-900 dark:text-white">Nuestro Liderazgo</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <!-- Rafael -->
                <div class="bg-slate-100 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm shadow-sm flex flex-col items-center text-center">
                    <div class="w-24 h-24 bg-slate-300 dark:bg-slate-700 rounded-full mb-6 flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-1">Rafael I. García Rivera</h3>
                    <p class="text-xs font-bold text-initium-blue mb-4 tracking-wider">CEO & FOUNDER INITIUM TECH<br>DEVELOPER AT CONCHO ADS</p>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">
                        Visionario tecnológico con más de 20 años de experiencia liderando transformaciones digitales. Enfoque: Estrategia Tecnológica.
                    </p>
                    <a href="#" class="text-xs font-bold text-slate-500 hover:text-initium-blue flex items-center gap-2 mt-auto">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> 
                        LINKEDIN PROFILE
                    </a>
                </div>

                <!-- José -->
                <div class="bg-slate-100 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm shadow-sm flex flex-col items-center text-center">
                    <div class="w-24 h-24 bg-slate-300 dark:bg-slate-700 rounded-full mb-6 flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-1">José I. Skerrett</h3>
                    <p class="text-xs font-bold text-initium-blue mb-4 tracking-wider">COO INITIUM TECH & PRESIDENT OF CONCHO APPS</p>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Especialista en desarrollo de productos y operaciones complejas. Lidera la innovación en movilidad y AdTech.
                    </p>
                </div>

                <!-- Lisbel -->
                <div class="bg-slate-100 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm shadow-sm flex flex-col items-center text-center">
                    <div class="w-24 h-24 bg-slate-300 dark:bg-slate-700 rounded-full mb-6 flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-1">Lisbel Meléndez</h3>
                    <p class="text-xs font-bold text-initium-blue mb-4 tracking-wider">CFO (CHIEF FINANCIAL OFFICER)</p>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Experta en gestión financiera y operativa, asegurando la sostenibilidad y el crecimiento estratégico de Initium Tech.
                    </p>
                </div>

                <!-- Karim -->
                <div class="bg-slate-100 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm shadow-sm flex flex-col items-center text-center">
                    <div class="w-24 h-24 bg-slate-300 dark:bg-slate-700 rounded-full mb-6 flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-1">Karim Nieves Otero</h3>
                    <p class="text-xs font-bold text-initium-blue mb-4 tracking-wider">CMO & SECRETARY OF THE BOARD</p>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Líder en marketing estratégico y gobernanza corporativa, impulsando la marca Initium en el mercado regional.
                    </p>
                </div>
            </div>
        </div>
    </div>

    {get_footer_html()}
    {get_logic_script()}
"""
    return html

def generate_conchoads():
    html = f"""<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
{get_head_html("ConchoADS - Publicidad Inteligente")}
<body class="bg-white dark:bg-slate-900 text-[#333333] dark:text-slate-200 transition-colors duration-300 antialiased font-sans flex flex-col min-h-screen">
    {get_header_html("conchoads")}
    
    <!-- 1. Hero / Encabezado principal (Video Background Slider) -->
    <section class="relative pt-32 pb-20 bg-[#222222] text-white overflow-hidden min-h-[80vh] flex items-center">
        <!-- Video Background Element -->
        <video id="hero-video-slider" class="absolute inset-0 w-full h-full object-cover z-0" muted playsinline autoplay></video>
        
        <!-- Script to handle video switching -->
        <script>
            document.addEventListener("DOMContentLoaded", function() {{
                const videoEl = document.getElementById("hero-video-slider");
                const videos = [
                    "https://d16y57bdjt0bnh.cloudfront.net/website-assets/ConchoAdsbannerwebpage.mp4",
                    "https://d16y57bdjt0bnh.cloudfront.net/website-assets/ConchoAppswebIntro.mp4"
                ];
                let currentIndex = 0;
                
                // Initialize first video
                videoEl.src = videos[currentIndex];
                videoEl.load();
                
                videoEl.addEventListener("ended", function() {{
                    currentIndex = (currentIndex + 1) % videos.length;
                    videoEl.src = videos[currentIndex];
                    videoEl.play();
                }});
            }});
        </script>

        <!-- Overlays for readability and branding -->
        <div class="absolute inset-0 bg-black/60 z-0"></div>
        <div class="absolute inset-0 opacity-20 z-0" style="background-image: linear-gradient(#C7A74A 1px, transparent 1px), linear-gradient(90deg, #C7A74A 1px, transparent 1px); background-size: 30px 30px;">
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
            <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight mb-6" data-i18n="ads_hero_title">Publicidad inteligente en movimiento</h1>
            <p class="max-w-4xl mx-auto text-xl text-slate-200 mb-12 leading-relaxed" data-i18n="ads_hero_sub">
                ConchoADS convierte los "tapones" de Puerto Rico en audiencias cautivas, mostrando anuncios digitales en tabletas dentro de vehículos de transporte para maximizar alcance, recordación y resultados medibles.
            </p>
            <div class="max-w-3xl mx-auto text-left mb-12 space-y-4 bg-black/30 p-6 sm:p-8 rounded-2xl backdrop-blur-sm border border-white/10">
                <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-[#C7A74A] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <p class="text-slate-200 font-medium" data-i18n="ads_hero_bullet1">Red de pantallas en movimiento dentro de vehículos de servicio público y flotillas privadas.</p>
                </div>
                <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-[#C7A74A] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <p class="text-slate-200 font-medium" data-i18n="ads_hero_bullet2">Anuncios dinámicos con métricas en tiempo real y reportes accionables.</p>
                </div>
                <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-[#C7A74A] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <p class="text-slate-200 font-medium" data-i18n="ads_hero_bullet3">Optimización asistida por IA para mejorar desempeño de campañas sin complicar la operación.</p>
                </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contacto" class="px-8 py-4 bg-[#C7A74A] text-[#222222] hover:bg-[#d8b85b] rounded-xl font-bold transition-all shadow-xl text-lg hover:scale-105" data-i18n="ads_cta_primary">Quiero anunciarme</a>
                <a href="#contacto" class="px-8 py-4 bg-black/40 backdrop-blur-md border-2 border-[#C7A74A] text-[#C7A74A] hover:bg-[#C7A74A] hover:text-[#222222] rounded-xl font-bold transition-all shadow-xl text-lg hover:scale-105" data-i18n="ads_cta_sec">Solicitar demo técnica</a>
            </div>
        </div>
    </section>

    <!-- 2. ¿Qué es ConchoADS? -->
    <section class="py-20 bg-[#f8fafc] dark:bg-slate-800">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl md:text-4xl font-extrabold mb-8 text-[#222222] dark:text-white" data-i18n="ads_what_title">¿Qué es ConchoADS?</h2>
            <div class="w-20 h-1 bg-[#C7A74A] mx-auto rounded-full mb-10"></div>
            <div class="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-left md:text-center max-w-4xl mx-auto">
                <p data-i18n="ads_what_p1">Es una plataforma de publicidad <strong>digital-out-of-home (DOOH)</strong> que usa tabletas Android montadas en vehículos para mostrar anuncios segmentados durante los trayectos.</p>
                <p data-i18n="ads_what_p2">Cada impresión se registra y se transforma en datos para medir alcance, interacción y efectividad.</p>
                <p data-i18n="ads_what_p3">Las campañas se gestionan desde un portal web seguro para cargar creatividades, definir segmentación y revisar reportes.</p>
                <p data-i18n="ads_what_p4">Está diseñada inicialmente para Puerto Rico, con capacidad de escalar a nuevas ciudades sin rediseñar la solución.</p>
            </div>
        </div>
    </section>

    <!-- 3. Principales soluciones -->
    <section class="py-20 bg-white dark:bg-slate-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-16 text-[#222222] dark:text-white" data-i18n="ads_sol_title">Principales soluciones</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <!-- Para anunciantes y agencias -->
                <div class="bg-[#f8fafc] dark:bg-slate-800 rounded-3xl p-8 border border-[#E5E5E5] dark:border-slate-700 shadow-sm">
                    <h3 class="text-xl font-bold mb-6 text-[#222222] dark:text-white flex items-center gap-3 border-b border-[#E5E5E5] dark:border-slate-700 pb-4">
                        <svg class="w-8 h-8 text-[#C7A74A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
                        <span data-i18n="ads_sol_adv">Para anunciantes y agencias</span>
                    </h3>
                    <ul class="space-y-6">
                        <li>
                            <h4 class="font-bold text-lg text-[#222222] dark:text-white mb-1" data-i18n="ads_sol_adv_1">Pantallas en movimiento</h4>
                            <p class="text-slate-600 dark:text-slate-400" data-i18n="ads_sol_adv_1_d">Anuncios en tabletas dentro de vehículos, con formatos de imagen, video y mensajes interactivos (por ejemplo, QR).</p>
                        </li>
                        <li>
                            <h4 class="font-bold text-lg text-[#222222] dark:text-white mb-1" data-i18n="ads_sol_adv_2">Campañas medibles</h4>
                            <p class="text-slate-600 dark:text-slate-400" data-i18n="ads_sol_adv_2_d">Registro de impresiones, clics, tiempo de exposición y eventos clave para medir el rendimiento de cada anuncio.</p>
                        </li>
                        <li>
                            <h4 class="font-bold text-lg text-[#222222] dark:text-white mb-1 flex items-center gap-2">
                                <span data-i18n="ads_sol_adv_3">Optimización asistida por IA</span>
                            </h4>
                            <p class="text-slate-600 dark:text-slate-400" data-i18n="ads_sol_adv_3_d">Motor de recomendaciones (basado en Gemini AI) que sugiere ajustes de rotación, creatividades o segmentación.</p>
                        </li>
                        <li>
                            <h4 class="font-bold text-lg text-[#222222] dark:text-white mb-1" data-i18n="ads_sol_adv_4">Reportes ejecutivos</h4>
                            <p class="text-slate-600 dark:text-slate-400" data-i18n="ads_sol_adv_4_d">Tableros con KPIs resumidos para gerencia y vistas detalladas para equipos de mercadeo y agencias.</p>
                        </li>
                    </ul>
                </div>

                <!-- Para operadores de flotillas -->
                <div class="bg-[#222222] dark:bg-[#111111] text-white rounded-3xl p-8 shadow-sm relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-[#C7A74A] opacity-10 rounded-bl-full"></div>
                    <h3 class="text-xl font-bold mb-6 text-white flex items-center gap-3 border-b border-white/10 pb-4">
                        <svg class="w-8 h-8 text-[#C7A74A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        <span data-i18n="ads_sol_fleet">Para operadores de flotillas y dueños de vehículos</span>
                    </h3>
                    <ul class="space-y-6">
                        <li>
                            <h4 class="font-bold text-lg text-white mb-1" data-i18n="ads_sol_fleet_1">Nueva fuente de ingresos</h4>
                            <p class="text-slate-300" data-i18n="ads_sol_fleet_1_d">Monetización del espacio interno del vehículo mediante revenue share por campañas activas.</p>
                        </li>
                        <li>
                            <h4 class="font-bold text-lg text-white mb-1" data-i18n="ads_sol_fleet_2">Modo kiosko seguro</h4>
                            <p class="text-slate-300" data-i18n="ads_sol_fleet_2_d">La tableta queda bloqueada a la app de ConchoADS, evitando uso no autorizado y reduciendo soporte.</p>
                        </li>
                        <li>
                            <h4 class="font-bold text-lg text-white mb-1" data-i18n="ads_sol_fleet_3">Gestión centralizada de dispositivos</h4>
                            <p class="text-slate-300" data-i18n="ads_sol_fleet_3_d">Administración remota de tabletas: estado en línea, versión de app, sincronizaciones recientes y métricas por vehículo.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- 4. ¿Cómo funciona? -->
    <section class="py-20 bg-[#f8fafc] dark:bg-slate-800 border-y border-[#E5E5E5] dark:border-slate-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl md:text-4xl font-extrabold text-center mb-16 text-[#222222] dark:text-white" data-i18n="ads_hw_title">¿Cómo funciona?</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-[#E5E5E5] dark:border-slate-700 relative">
                    <div class="w-8 h-8 rounded-full bg-[#C7A74A] text-[#222222] font-bold flex items-center justify-center absolute -top-4 -left-4 shadow-md">1</div>
                    <h4 class="font-bold text-[#222222] dark:text-white mb-2" data-i18n="ads_hw_1">El pasajero se sienta</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400" data-i18n="ads_hw_1_d">Al iniciar el viaje, la tableta entra en ciclo de reproducción de anuncios, adaptado a la duración promedio del trayecto.</p>
                </div>
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-[#E5E5E5] dark:border-slate-700 relative mt-0 md:mt-8">
                    <div class="w-8 h-8 rounded-full bg-[#C7A74A] text-[#222222] font-bold flex items-center justify-center absolute -top-4 -left-4 shadow-md">2</div>
                    <h4 class="font-bold text-[#222222] dark:text-white mb-2" data-i18n="ads_hw_2">Se muestran anuncios dinámicos</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400" data-i18n="ads_hw_2_d">Carrusel de piezas creativas, variando según campaña, horario, zona y reglas de segmentación.</p>
                </div>
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-[#E5E5E5] dark:border-slate-700 relative mt-0 md:mt-16">
                    <div class="w-8 h-8 rounded-full bg-[#C7A74A] text-[#222222] font-bold flex items-center justify-center absolute -top-4 -left-4 shadow-md">3</div>
                    <h4 class="font-bold text-[#222222] dark:text-white mb-2" data-i18n="ads_hw_3">Se capturan métricas locales</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400" data-i18n="ads_hw_3_d">Cada impresión e interacción se registra localmente en la tableta, incluso sin conexión.</p>
                </div>
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-[#E5E5E5] dark:border-slate-700 relative mt-0 md:mt-8">
                    <div class="w-8 h-8 rounded-full bg-[#C7A74A] text-[#222222] font-bold flex items-center justify-center absolute -top-4 -left-4 shadow-md">4</div>
                    <h4 class="font-bold text-[#222222] dark:text-white mb-2" data-i18n="ads_hw_4">Sincronización segura con la nube</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400" data-i18n="ads_hw_4_d">Cuando hay conectividad, los datos se sincronizan con la nube mediante APIs seguras y almacenamiento optimizado para alto volumen de eventos.</p>
                </div>
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-[#E5E5E5] dark:border-slate-700 relative mt-0 md:mt-0">
                    <div class="w-8 h-8 rounded-full bg-[#C7A74A] text-[#222222] font-bold flex items-center justify-center absolute -top-4 -left-4 shadow-md">5</div>
                    <h4 class="font-bold text-[#222222] dark:text-white mb-2" data-i18n="ads_hw_5">Análisis y optimización</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400" data-i18n="ads_hw_5_d">Los datos alimentan modelos de IA (Gemini) que generan recomendaciones para optimizar campañas y ofrecer insights a los clientes.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. Arquitectura de alto nivel -->
    <section class="py-20 bg-white dark:bg-slate-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="text-3xl md:text-4xl font-extrabold mb-6 text-[#222222] dark:text-white" data-i18n="ads_arch_title">Arquitectura de alto nivel</h2>
                    <p class="text-slate-600 dark:text-slate-400 mb-8" data-i18n="ads_arch_desc">
                        La arquitectura es <strong>cloud-native serverless</strong> para soportar miles de dispositivos con costos controlados y alta disponibilidad. Se divide en tres capas: Dispositivo (Edge), Servicios en la nube (Backend) y Administración / Analítica / IA.<br><br>
                        Mantenemos estrictos estándares de seguridad usando HTTPS, autenticación basada en tokens (JWT) y control de acceso por roles. Nuestro modelo de escalabilidad horizontal y monitoreo centralizado garantiza resiliencia probada en entornos distribuidos.
                    </p>
                    
                    <div class="space-y-4">
                        <div class="border-l-4 border-[#C7A74A] pl-4">
                            <h4 class="font-bold text-[#222222] dark:text-white" data-i18n="ads_arch_1">Capa de dispositivo (Edge)</h4>
                            <div class="text-sm text-slate-600 dark:text-slate-400" data-i18n="ads_arch_1_d">
                                <ul class="list-disc pl-4 mt-2 space-y-1">
                                    <li>App móvil en React Native/Expo en tabletas Android en modo kiosko.</li>
                                    <li>Módulos locales para caché de anuncios, cola de métricas y manejo offline-first.</li>
                                    <li>Cliente API con autenticación basada en tokens y reconexión automática.</li>
                                </ul>
                            </div>
                        </div>
                        <div class="border-l-4 border-[#C7A74A] pl-4">
                            <h4 class="font-bold text-[#222222] dark:text-white" data-i18n="ads_arch_2">Capa de servicios en la nube (Backend)</h4>
                            <div class="text-sm text-slate-600 dark:text-slate-400" data-i18n="ads_arch_2_d">
                                <ul class="list-disc pl-4 mt-2 space-y-1">
                                    <li>API HTTP detrás de un API Gateway con endpoints para anuncios, métricas, autenticación y administración.</li>
                                    <li>Funciones serverless (Node.js/TypeScript) para reglas de negocio.</li>
                                    <li>Base de datos NoSQL optimizada para eventos y consultas por campaña, dispositivo y rango de fechas.</li>
                                </ul>
                            </div>
                        </div>
                        <div class="border-l-4 border-[#C7A74A] pl-4">
                            <h4 class="font-bold text-[#222222] dark:text-white" data-i18n="ads_arch_3">Capa de administración, analítica y IA</h4>
                            <div class="text-sm text-slate-600 dark:text-slate-400" data-i18n="ads_arch_3_d">
                                <ul class="list-disc pl-4 mt-2 space-y-1">
                                    <li>Panel web administrativo para campañas, creatividades, gestión de dispositivos y usuarios.</li>
                                    <li>Servicios de analítica agregada para métricas diarias, semanales y mensuales.</li>
                                    <li>Integración con APIs de Gemini AI para análisis y generación de recomendaciones.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-[#f8fafc] dark:bg-slate-800 rounded-3xl flex items-center justify-center p-4 relative overflow-hidden shadow-sm border border-[#E5E5E5] dark:border-slate-700">
                    <img src="https://d16y57bdjt0bnh.cloudfront.net/website-assets/ConchoAdsArchitecture.png" alt="ConchoADS Architecture Diagram" class="w-full h-auto object-contain rounded-xl">
                </div>
            </div>
        </div>
    </section>

    <!-- 6. Beneficios clave -->
    <section class="py-20 bg-[#f8fafc] dark:bg-slate-800 border-t border-[#E5E5E5] dark:border-slate-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-extrabold text-center mb-12 text-[#222222] dark:text-white" data-i18n="ads_ben_title">Beneficios clave</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-[#E5E5E5] dark:border-slate-700 hover:border-[#C7A74A] transition-colors">
                    <h4 class="font-bold text-[#222222] dark:text-white mb-2 text-lg" data-i18n="ads_ben_1">Anunciantes</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400" data-i18n="ads_ben_1_d"><strong>Audiencia cautiva:</strong> Impacto en personas que no pueden "hacer skip" durante su trayecto.</p>
                </div>
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-[#E5E5E5] dark:border-slate-700 hover:border-[#C7A74A] transition-colors">
                    <h4 class="font-bold text-[#222222] dark:text-white mb-2 text-lg" data-i18n="ads_ben_2">Agencias</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400" data-i18n="ads_ben_2_d"><strong>Datos accionables:</strong> Métricas claras para justificar inversión y optimizar creatividades.</p>
                </div>
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-[#E5E5E5] dark:border-slate-700 hover:border-[#C7A74A] transition-colors">
                    <h4 class="font-bold text-[#222222] dark:text-white mb-2 text-lg" data-i18n="ads_ben_3">Dueños de flotillas</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400" data-i18n="ads_ben_3_d"><strong>Ingreso adicional:</strong> Modelo de revenue share por vehículo y campaña activa.</p>
                </div>
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-[#E5E5E5] dark:border-slate-700 hover:border-[#C7A74A] transition-colors">
                    <h4 class="font-bold text-[#222222] dark:text-white mb-2 text-lg" data-i18n="ads_ben_4">Conductores / Socios</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400" data-i18n="ads_ben_4_d"><strong>Plataforma simple:</strong> Tabletas administradas remotamente con mínima intervención del chofer.</p>
                </div>
                <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-[#E5E5E5] dark:border-slate-700 hover:border-[#C7A74A] transition-colors">
                    <h4 class="font-bold text-[#222222] dark:text-white mb-2 text-lg" data-i18n="ads_ben_5">Pasajeros</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400" data-i18n="ads_ben_5_d"><strong>Mejor experiencia:</strong> Contenido relevante y entretenido durante el tiempo en carretera.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 7. Llamado a la acción final -->
    <section class="py-24 bg-[#222222] text-center px-4 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#C7A74A 1.5px, transparent 1.5px); background-size: 30px 30px;">
        </div>
        <div class="relative z-10 max-w-3xl mx-auto">
            <h2 class="text-4xl font-extrabold text-white mb-6" data-i18n="ads_cta_final_title">Lleva tu marca a donde está el tráfico</h2>
            <p class="text-lg text-slate-400 mb-10" data-i18n="ads_cta_final_desc">
                ConchoADS está en fase de expansión y busca aliados estratégicos: marcas, agencias, flotillas y socios tecnológicos que quieran liderar la próxima ola de publicidad DOOH en movimiento.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contacto" class="px-8 py-4 bg-[#C7A74A] text-[#222222] hover:bg-[#d8b85b] rounded-xl font-bold transition-all shadow-lg text-lg" data-i18n="ads_cta_btn1">Agenda una reunión</a>
                <a href="#contacto" class="px-8 py-4 bg-transparent border-2 border-[#C7A74A] text-[#C7A74A] hover:bg-[#A38531] hover:text-white hover:border-[#A38531] rounded-xl font-bold transition-all text-lg" data-i18n="ads_cta_btn2">Recibir presentación ejecutiva</a>
            </div>
        </div>
    </section>

    {get_footer_html("conchoads")}
    {get_logic_script()}
"""
    return html

@log_execution
def build_website():
    pages = {
        'index.html': generate_index(),
        'soluciones.html': generate_soluciones(),
        'roadmap.html': generate_roadmap(),
        'nosotros.html': generate_nosotros()
    }
    
    conchoads_dir = os.path.join(project_root, 'conchoads')
    if not os.path.exists(conchoads_dir):
        os.makedirs(conchoads_dir)
        
    for filename, content in pages.items():
        output_path = os.path.join(project_root, filename)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Generated {filename}")
        
    conchoads_path = os.path.join(conchoads_dir, 'index.html')
    with open(conchoads_path, 'w', encoding='utf-8') as f:
        f.write(generate_conchoads())
    print("Generated conchoads/index.html")
        
    return {"status": "success", "files": list(pages.keys()) + ['conchoads/index.html']}

if __name__ == "__main__":
    build_website()
