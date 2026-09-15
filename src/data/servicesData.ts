export interface ServiceDetail {
  slug: string
  title: string
  shortTitle: string
  seoTitle: string
  seoDescription: string
  heroBadge: string
  heroPill?: string
  heroHeadline: string
  heroH1Line1?: string
  heroH1Line2?: string
  heroSubheadline: string
  portfolioCategory?: string
  icon: string
  gradient: string
  accentColor: string
  problems: { title: string; desc: string }[]
  solutions: { title: string; desc: string; icon: string }[]
  processSteps: { step: string; title: string; desc: string }[]
  deliverables: string[]
  metrics: { value: string; label: string }[]
  targetIndustries: string[]
  faqs: { question: string; answer: string }[]
  relatedProjects: string[]
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  'produccion-audiovisual': {
    slug: 'produccion-audiovisual',
    title: 'Producción Audiovisual en Lima',
    shortTitle: 'Producción Audiovisual',
    seoTitle: 'Producción Audiovisual en Lima 4K/6K | Comerciales y Corporativos | BLACKBOX',
    seoDescription: 'Productora audiovisual en Lima experta en comerciales de TV, videos corporativos y contenido publicitario 4K/6K de alta conversión.',
    heroBadge: 'Producción Audiovisual en Lima, Perú',
    heroPill: 'Producción Audiovisual en Lima, Perú',
    heroHeadline: 'PRODUCCIÓN AUDIOVISUAL DE ALTO IMPACTO',
    heroH1Line1: 'PRODUCCIÓN AUDIOVISUAL',
    heroH1Line2: 'DE ALTO IMPACTO',
    heroSubheadline: 'Videos comerciales y corporativos 4K/6K en Lima que transmiten prestigio, elevan la confianza y aceleran tus ventas.',
    portfolioCategory: 'Comercial & Publicidad',
    icon: 'Video',
    gradient: 'from-blue-600 via-indigo-600 to-purple-800',
    accentColor: 'text-blue-500',
    problems: [
      {
        title: 'Videos que no transmiten la calidad real de tu producto o servicio',
        desc: 'Grabar con celular sin iluminación ni narrativa profesional hace que tu marca se perciba genérica o económica frente a la competencia.'
      },
      {
        title: 'Bajo retorno y falta de interés en tus propuestas comerciales',
        desc: 'Tus clientes potenciales necesitan ver procesos, instalaciones, tecnología y testimonios con estándar de cine para tomar decisiones de compra de alto ticket.'
      },
      {
        title: 'Falta de guion estructurado y dirección de arte',
        desc: 'Tener una buena cámara no es suficiente: se requiere conceptualización, guion publicitario, dirección de actores y edición con ritmo dinámico.'
      }
    ],
    solutions: [
      {
        title: 'Equipos Cinematográficos 4K/6K e Iluminación de Estudio',
        desc: 'Cámaras de cine digital, ópticas de primer nivel, micrófonos de solapa inalámbricos y esquemas de iluminación diseñados para resaltar cada textura.',
        icon: 'Camera'
      },
      {
        title: 'Guion Publicitario y Dirección de Escena',
        desc: 'Diseñamos el storytelling estratégico para captar la atención en los primeros 3 segundos y dirigir al espectador a una llamada a la acción clara.',
        icon: 'FileText'
      },
      {
        title: 'Postproducción, Color Grading y Diseño Sonoro',
        desc: 'Corrección de color profesional, gráficos animados (motion graphics), efectos de sonido y locución profesional con acento neutro o corporativo.',
        icon: 'Sparkles'
      }
    ],
    processSteps: [
      { step: '01', title: 'Briefing Estratégico', desc: 'Analizamos los objetivos comerciales de tu empresa, tu público objetivo y el mensaje central del video.' },
      { step: '02', title: 'Guion & Plan de Rodaje', desc: 'Redactamos el guion técnico, storyboard y coordinamos locaciones, actores y fechas de grabación.' },
      { step: '03', title: 'Día de Rodaje (Producción)', desc: 'Nuestro equipo técnico y de dirección ejecuta el rodaje con iluminación profesional y audio de alta fidelidad.' },
      { step: '04', title: 'Edición, Color y Entrega', desc: 'Ensamblamos la pieza, realizamos colorización cinematográfica, aplicamos ajustes solicitados y entregamos en formatos master y web.' }
    ],
    deliverables: [
      'Master en resolución 4K UHD para web, pantallas y televisión',
      'Versiones adaptadas a formato vertical (9:16) para Reels, TikTok y Shorts',
      'Cápsulas de video optimizadas para campañas publicitarias',
      'Fotografías fijas de alta calidad extraídas del rodaje',
      'Derechos de uso comercial de música y locución licenciada'
    ],
    metrics: [
      { value: '4K/6K', label: 'Resolución Cinematográfica' },
      { value: '+120', label: 'Proyectos Producidos' },
      { value: '100%', label: 'Compromiso de Calidad' }
    ],
    targetIndustries: [
      'Empresas Corporativas e Industriales',
      'Clínicas y Centros Médicos',
      'Marcas de E-commerce y Moda',
      'Restaurantes y Cadenas Gastronómicas',
      'Inmobiliarias y Constructoras'
    ],
    faqs: [
      {
        question: '¿Cuánto cuesta producir un video comercial o corporativo en Lima?',
        answer: 'El costo de producir un video comercial o corporativo en Lima varía principalmente según la complejidad del guion, las jornadas de rodaje, el despliegue técnico y los requerimientos específicos de postproducción. En Black Box estructuramos cotizaciones transparentes y personalizadas adaptadas a los objetivos comerciales de cada empresa en Perú. Para producciones corporativas estándar o cápsulas testimoniales de alta calidad, la inversión suele iniciar desde presupuestos accesibles para medianas empresas, mientras que campañas comerciales para televisión o lanzamientos de marca en resolución 4K y 6K requieren esquemas de iluminación escénica, dirección de arte, actores profesionales, locaciones y motion graphics avanzados. Toda propuesta económica detalla cada rubro técnico sin costos ocultos, garantizando que cada sol invertido se traduzca en una pieza audiovisual con estética de cine que eleva la percepción de tu marca, genera confianza inmediata y acelera el cierre de ventas comerciales en el mercado peruano actual.'
      },
      {
        question: '¿Qué incluye el servicio integral de producción audiovisual de Black Box en Lima?',
        answer: 'Nuestro servicio integral de producción audiovisual en Lima cubre absolutamente todas las etapas necesarias para entregar una pieza cinematográfica lista para su difusión comercial. Iniciamos con la fase de preproducción, donde investigamos a fondo tu modelo de negocio, desarrollamos el concepto creativo, redactamos el guion técnico con storytelling publicitario y coordinamos el casting de talentos, permisos y locaciones en Lima. Durante el día de rodaje, nuestro equipo técnico opera cámaras de cine digital en resolución 4K y 6K, ópticas de primer nivel, microfonía inalámbrica de alta fidelidad e iluminación profesional de estudio. Finalmente, en la postproducción realizamos el montaje narrativo dinámico, corrección de color cinematográfica en DaVinci Resolve, diseño sonoro envolvente, musicalización licenciada y gráficos animados. Entregamos tanto el master principal como versiones verticales en formato 9:16 optimizadas para captar clientes en plataformas como Reels, TikTok y YouTube Shorts.'
      },
      {
        question: '¿En cuánto tiempo entregan el video final y en qué formatos?',
        answer: 'El tiempo habitual de entrega para un proyecto audiovisual en Lima se sitúa entre siete y quince días hábiles contados a partir del último día de grabación. En situaciones de campañas urgentes o lanzamientos programados con fechas límite estrictas, disponemos de flujos de trabajo acelerados para presentar el primer corte de edición en un plazo de tres a cinco días. Tras la presentación del primer premontaje, recopilamos tus comentarios para realizar los ajustes de edición y color solicitados antes de la exportación definitiva. Entregamos los archivos finales en resolución Ultra HD 4K y Full HD en formato MP4 o ProRes, perfectamente codificados para pantallas de televisión, presentaciones corporativas de alta resolución, sitios web empresariales y pauta publicitaria digital. Además, incluimos sin costo adicional adaptaciones verticales 9:16 y cuadradas 1:1, asegurando que tu material rinda al máximo en redes sociales y campañas comerciales de conversión.'
      }
    ],
    relatedProjects: ['Checor', 'Makita', 'Clínica Avendaño', 'LAP Custom']
  },

  'reels-y-tiktok': {
    slug: 'reels-y-tiktok',
    title: 'Reels y TikTok Ads en Lima',
    shortTitle: 'Reels y TikTok',
    seoTitle: 'Reels y TikTok Ads en Lima | Videos Verticales que Convierten | BLACKBOX',
    seoDescription: 'Producción de reels y TikTok ads en Lima para marcas y empresas. Contenido dinámico 9:16 pensado para retener y viralizar.',
    heroBadge: 'Reels y TikTok Ads en Lima, Perú',
    heroPill: 'Reels y TikTok Ads en Lima, Perú',
    heroHeadline: 'REELS QUE CONECTAN',
    heroH1Line1: 'REELS QUE',
    heroH1Line2: 'CONECTAN',
    heroSubheadline: 'Producción de video vertical 9:16 con ganchos psicológicos y edición ágil para multiplicar reproducciones y ventas en Lima.',
    portfolioCategory: 'Comercial & Publicidad',
    icon: 'Smartphone',
    gradient: 'from-pink-600 via-rose-600 to-amber-600',
    accentColor: 'text-pink-500',
    problems: [
      {
        title: 'Videos que no retienen a la audiencia en los primeros segundos',
        desc: 'Si tu contenido no cuenta con un gancho visual y conceptual claro, los usuarios continúan navegando hacia otras publicaciones.'
      },
      {
        title: 'Falta de constancia y tiempo para producir contenido periódico',
        desc: 'Mantener una presencia relevante requiere una planificación estructurada que no sobrecargue la rutina de tu equipo de trabajo.'
      },
      {
        title: 'Contenido sin orientación clara hacia la acción',
        desc: 'El alcance es valioso cuando va acompañado de un mensaje que despierte el interés por conocer tus productos o servicios.'
      }
    ],
    solutions: [
      {
        title: 'Ganchos Visuales y Copywriting Enfocado',
        desc: 'Estructuramos el inicio de cada video con temáticas de alto interés y llamados a la acción claros.',
        icon: 'Zap'
      },
      {
        title: 'Jornadas de Grabación Mensuales Planificadas',
        desc: 'Grabamos en bloques de trabajo organizados para optimizar tu agenda y disponer de contenido continuo.',
        icon: 'Calendar'
      },
      {
        title: 'Edición Profesional con Subtítulos y Efectos',
        desc: 'Subtítulos animados, transiciones cuidadas y musicalización acorde a la identidad de tu negocio.',
        icon: 'Sparkles'
      }
    ],
    processSteps: [
      { step: '01', title: 'Planificación & Guiones', desc: 'Diseñamos la estructura de contenidos del mes de acuerdo con las prioridades comerciales de tu negocio.' },
      { step: '02', title: 'Jornada de Grabación', desc: 'Te guiamos durante la sesión con equipo técnico profesional y teleprompter para una grabación ágil.' },
      { step: '03', title: 'Edición y Postproducción', desc: 'Aplicamos cortes dinámicos, subtítulos y elementos visuales para maximizar la retención.' },
      { step: '04', title: 'Entrega y Recomendaciones', desc: 'Te entregamos los videos listos para su publicación junto con pautas para su difusión.' }
    ],
    deliverables: [
      'Packs de videos en formato vertical (9:16) listos para publicar',
      'Subtítulos dinámicos integrados para visualización sin audio',
      'Portadas diseñadas para el feed de Instagram y TikTok',
      'Textos sugeridos y llamados a la acción para cada publicación',
      'Acompañamiento y soporte técnico durante el rodaje'
    ],
    metrics: [
      { value: '9:16', label: 'Formato Vertical Nativo' },
      { value: 'HD / 4K', label: 'Calidad de Grabación' },
      { value: '100%', label: 'Enfoque Estratégico' }
    ],
    targetIndustries: [
      'Médicos, Especialistas y Centros de Salud',
      'Tiendas de Muebles, Decoración y Hogar',
      'Marcas de Moda, Calzado y Retail',
      'Restaurantes y Servicios Gastronómicos',
      'Servicios Profesionales y Consultores'
    ],
    faqs: [
      {
        question: '¿Cuánto cuesta la producción de Reels y TikTok Ads en Lima?',
        answer: 'El costo de producir paquetes mensuales de Reels y videos para TikTok Ads en Lima varía en función de la cantidad de piezas audiovisuales requeridas, los días de rodaje en estudio o locación y la complejidad de la edición dinámica. En Black Box estructuramos planes mensuales accesibles pensados para empresas, marcas personales y comercios en Perú que necesitan constancia sin disparar sus costos fijos. Un paquete habitual incluye la redacción de guiones con ganchos psicológicos, una jornada intensiva de grabación con iluminación profesional y teleprompter para facilitar la locución, y la postproducción completa con subtítulos animados de alta retención. Presentamos cotizaciones claras y transparentes que permiten a tu marca proyectar una imagen moderna, ganar relevancia orgánica y nutrir tus campañas de publicidad digital en Instagram y TikTok con material fresco y de alta conversión comercial.'
      },
      {
        question: '¿Qué incluye el servicio mensual de creación de Reels y TikTok en Lima?',
        answer: 'Nuestro servicio mensual de creación de Reels y TikTok en Lima es una solución integral diseñada para que tú solo tengas que presentarte a grabar mientras nosotros nos encargamos de absolutamente toda la producción técnica y creativa. Iniciamos cada ciclo mensual con una reunión estratégica donde definimos los temas de tendencia y las prioridades de venta de tu catálogo comercial. Redactamos guiones con ganchos visuales en los primeros tres segundos y llamados a la acción claros hacia WhatsApp o tu tienda virtual. Durante la jornada de rodaje utilizamos cámaras de cine 4K, teleprompter profesional para que hables con total fluidez y micrófonos inalámbricos de alta fidelidad. En postproducción añadimos cortes ágiles, efectos de sonido, musicalización licenciada, subtítulos dinámicos con palabras clave resaltadas y portadas personalizadas para el feed, entregándote cada video listo para su publicación inmediata en tus perfiles.'
      },
      {
        question: '¿En cuánto tiempo se entregan los Reels listos para publicar en redes sociales?',
        answer: 'El tiempo estándar de entrega para los paquetes mensuales de Reels y TikTok en Lima es de cinco a siete días hábiles posteriores a la jornada de rodaje en tus instalaciones o set. Durante este tiempo nuestro equipo de postproducción realiza la selección minuciosa de las mejores tomas, la sincronización de audio de alta fidelidad y el diseño de animaciones tipográficas que maximizan la tasa de retención del espectador en plataformas digitales. Te enviamos una vista previa privada para que revises los videos y apruebes los textos antes del lanzamiento oficial en redes. Una vez recibida tu conformidad, entregamos todo el lote organizado en carpetas digitales en resolución Full HD y 4K vertical 9:16, junto con textos persuasivos sugeridos, hashtags recomendados y orientaciones sobre el mejor horario de publicación para maximizar el alcance orgánico y la interacción con tus clientes potenciales en Perú.'
      }
    ],
    relatedProjects: ['Clínica Avendaño', 'Shaking', 'Burger & Eventos', 'Leomar Muebles']
  },

  'publicidad-digital-meta-ads': {
    slug: 'publicidad-digital-meta-ads',
    title: 'Agencia de Meta Ads en Lima',
    shortTitle: 'Meta Ads',
    seoTitle: 'Agencia de Meta Ads en Lima | Publicidad que Atrae Clientes | BLACKBOX',
    seoDescription: 'Campañas de Meta Ads en Facebook e Instagram en Lima. Tráfico calificado, anuncios de alto ROI y captación constante de clientes.',
    heroBadge: 'Agencia de Meta Ads en Lima, Perú',
    heroPill: 'Agencia de Meta Ads en Lima, Perú',
    heroHeadline: 'META ADS QUE TRAEN CLIENTES',
    heroH1Line1: 'META ADS QUE',
    heroH1Line2: 'TRAEN CLIENTES',
    heroSubheadline: 'Campañas publicitarias en Meta y TikTok con creativos de video optimizados para maximizar el retorno de tu inversión.',
    portfolioCategory: 'B2B & Corporativo',
    icon: 'TrendingUp',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-800',
    accentColor: 'text-emerald-500',
    problems: [
      {
        title: 'Inversión sin una estructura clara de segmentación y objetivos',
        desc: 'Promocionar publicaciones de forma aislada suele generar interacciones que no se traducen en oportunidades reales de venta.'
      },
      {
        title: 'Anuncios poco diferenciados frente a la competencia',
        desc: 'Los formatos estáticos tradicionales pierden impacto frente a piezas audiovisuales dinámicas que explican la propuesta de valor con claridad.'
      },
      {
        title: 'Falta de seguimiento sobre el rendimiento de las campañas',
        desc: 'Se requiere una medición precisa de los contactos recibidos y el costo de adquisición para tomar decisiones comerciales fundamentadas.'
      }
    ],
    solutions: [
      {
        title: 'Creativos Audiovisuales y Copywriting Estratégico',
        desc: 'Desarrollamos piezas en video y textos persuasivos orientados a despertar el interés del público objetivo.',
        icon: 'Video'
      },
      {
        title: 'Enrutamiento hacia Canales de Venta Directa',
        desc: 'Conectamos los anuncios con canales ágiles como WhatsApp o formularios calificados para facilitar el contacto inmediato.',
        icon: 'MessageSquare'
      },
      {
        title: 'Monitoreo Constante y Optimización de Campañas',
        desc: 'Analizamos métricas clave de desempeño para ajustar audiencias, piezas y asignación presupuestaria.',
        icon: 'BarChart'
      }
    ],
    processSteps: [
      { step: '01', title: 'Auditoría & Configuración Técnica', desc: 'Revisamos o configuramos los activos publicitarios (Business Manager, píxeles y eventos de conversión).' },
      { step: '02', title: 'Estrategia & Diseño de Anuncios', desc: 'Diseñamos los creativos audiovisuales y las propuestas de texto para cada segmento de audiencia.' },
      { step: '03', title: 'Lanzamiento & Monitoreo', desc: 'Activamos las campañas aplicando segmentación geográfica, intereses y públicos personalizados.' },
      { step: '04', title: 'Optimización Continua', desc: 'Ajustamos variables de rendimiento para potenciar los anuncios con mejores resultados comerciales.' }
    ],
    deliverables: [
      'Gestión y monitoreo de campañas en Meta Ads (Facebook/Instagram) y TikTok Ads',
      'Diseño y adaptación de creativos audiovisuales para los anuncios',
      'Configuración de flujos de contacto y plantillas de atención inicial',
      'Reportes periódicos con métricas de rendimiento y alcance',
      'Reuniones de coordinación y alineamiento estratégico'
    ],
    metrics: [
      { value: 'Meta & TikTok', label: 'Plataformas Publicitarias' },
      { value: '100%', label: 'Segmentación a Medida' },
      { value: 'Continuo', label: 'Monitoreo de Rendimiento' }
    ],
    targetIndustries: [
      'Clínicas, Cirugías y Centros de Especialidad',
      'Empresas de Muebles, Arquitectura y Hogar',
      'Servicios Automotrices y Equipamiento',
      'Empresas B2B y Distribuidores Mayoristas',
      'Marcas de Consumo y Gastronomía'
    ],
    faqs: [
      {
        question: '¿Cuánto cuesta gestionar campañas de publicidad en Meta Ads en Lima?',
        answer: 'El costo de gestionar campañas de publicidad en Meta Ads en Lima se compone del honorario mensual de la agencia de marketing y el presupuesto asignado directamente a las plataformas de Meta (Facebook e Instagram) o TikTok. En Black Box establecemos esquemas de trabajo claros y transparentes adaptados al tamaño de tu negocio y al volumen de contactos comerciales que requieras mensualmente. Para empresas medianas, negocios locales o servicios profesionales en Lima, recomendamos una inversión publicitaria base que permita al algoritmo recopilar datos de conversión rápidamente y optimizar la entrega de anuncios. Nuestro fee de gestión incluye la configuración avanzada del Business Manager, el diseño continuo de piezas gráficas y de video, el monitoreo diario de la pauta y reportes ejecutivos periódicos. Esta estructura asegura que cada sol rinda al máximo y mantenga un costo por adquisición rentable.'
      },
      {
        question: '¿Qué incluye el servicio de agencia de Meta Ads y publicidad digital en Lima?',
        answer: 'Nuestro servicio de agencia de Meta Ads y publicidad digital en Lima abarca una gestión integral técnica, creativa y estratégica diseñada para transformar visitantes en prospectos calificados. Iniciamos con una auditoría profunda de tus activos comerciales, instalando el Píxel de Meta, la API de Conversiones y eventos personalizados en tu sitio web para asegurar una atribución impecable. Posteriormente, nuestro equipo creativo produce anuncios audiovisuales persuasivos con ganchos de alta retención, formatos verticales 9:16 y copys orientados a ventas directas. Configuramos campañas segmentadas por ubicación geográfica precisa en Lima Metropolitana, intereses detallados y audiencias similares a tus clientes actuales. Supervisamos diariamente la puja publicitaria, realizamos pruebas continuas de creativos y enrutamos a los prospectos hacia WhatsApp con mensajes predeterminados para que tu equipo comercial cierre ventas con la máxima agilidad.'
      },
      {
        question: '¿En cuánto tiempo se ven los primeros resultados y retorno de inversión en Meta Ads?',
        answer: 'Los primeros contactos comerciales y mensajes calificados a WhatsApp suelen registrarse dentro de las primeras 48 a 72 horas posteriores al encendido de las campañas en Meta Ads. No obstante, el sistema de aprendizaje de Meta requiere entre dos y tres semanas para estabilizar el costo por resultado, identificar con precisión a los usuarios con mayor probabilidad de compra y consolidar el retorno de inversión publicitaria. Durante este período inicial de prueba, evaluamos la tasa de clics, la retención del video y el costo por conversación, ajustando los ángulos de comunicación y las audiencias para escalar los anuncios con mejor rendimiento. Te proporcionamos métricas claras desde el primer día para que verifiques en tiempo real cuántas oportunidades de venta genera tu inversión publicitaria en Lima.'
      }
    ],
    relatedProjects: ['Clínica Avendaño', 'Leomar Muebles', 'Makita', 'Chalqui']
  },

  'marketing-para-clinicas-salud': {
    slug: 'marketing-para-clinicas-salud',
    title: 'Marketing Médico para Clínicas en Lima',
    shortTitle: 'Marketing Médico',
    seoTitle: 'Marketing Médico para Clínicas en Lima | Videos Éticos que Generan Citas | BLACKBOX',
    seoDescription: 'Estrategias de marketing médico y producción audiovisual para doctores y clínicas en Lima. Genera más citas de pacientes con contenido ético.',
    heroBadge: 'Marketing Médico en Lima, Perú',
    heroPill: 'Marketing Médico en Lima, Perú',
    heroHeadline: 'MARKETING MÉDICO QUE TRAE PACIENTES',
    heroH1Line1: 'MARKETING MÉDICO',
    heroH1Line2: 'QUE TRAE PACIENTES',
    heroSubheadline: 'Videos médicos testimoniales y campañas éticas en Lima para aumentar consultas privadas y posicionar especialistas de la salud.',
    portfolioCategory: 'Salud & Bariátrica',
    icon: 'Stethoscope',
    gradient: 'from-cyan-600 via-blue-700 to-indigo-900',
    accentColor: 'text-cyan-400',
    problems: [
      {
        title: 'Políticas publicitarias estrictas en el sector salud',
        desc: 'Las plataformas digitales exigen el cumplimiento de normativas rigurosas sobre temas médicos para evitar la restricción de cuentas publicitarias.'
      },
      {
        title: 'Necesidad de generar confianza para tratamientos especializados',
        desc: 'Los pacientes evalúan con cautela la experiencia, instalaciones y tecnología antes de agendar una consulta de valoración.'
      },
      {
        title: 'Consultas no concretadas por falta de información previa',
        desc: 'Un paciente informado sobre el procedimiento valora mejor el servicio y asiste con mayor disposición a su cita médica.'
      }
    ],
    solutions: [
      {
        title: 'Videos Educativos con el Especialista',
        desc: 'Grabamos en tu consultorio o clínica para responder dudas frecuentes y explicar los procedimientos con claridad y respaldo profesional.',
        icon: 'Video'
      },
      {
        title: 'Testimonios y Experiencias de Pacientes',
        desc: 'Mostramos historias reales de satisfacción y recuperación con un enfoque respetuoso y humano.',
        icon: 'Heart'
      },
      {
        title: 'Campañas Segmentadas con Rigor Ético',
        desc: 'Llegamos a personas interesadas en tus tratamientos respetando las normativas de las plataformas digitales.',
        icon: 'Target'
      }
    ],
    processSteps: [
      { step: '01', title: 'Alineamiento de Especialidad', desc: 'Definimos los procedimientos prioritarios y el perfil de paciente ideal para cada tratamiento.' },
      { step: '02', title: 'Grabación en Consultorio o Clínica', desc: 'Filmamos en tus instalaciones cuidando la iluminación, sonido y la comodidad del doctor.' },
      { step: '03', title: 'Edición y Supervisión Normativa', desc: 'Editamos el material asegurando un mensaje claro y en estricto cumplimiento con las políticas de salud.' },
      { step: '04', title: 'Difusión y Optimización de Consultas', desc: 'Gestionamos la difusión para atraer solicitudes de información hacia los canales de recepción de la clínica.' }
    ],
    deliverables: [
      'Producción de videos educativos y reels para el sector salud',
      'Testimoniales de pacientes grabados con estándar cinematográfico',
      'Gestión y supervisión de campañas publicitarias en Meta Ads',
      'Recomendaciones de protocolo de atención inicial para recepción médica',
      'Reportes periódicos sobre alcance y solicitudes de citas recibidas'
    ],
    metrics: [
      { value: 'Ético', label: 'Cumplimiento Normativo' },
      { value: 'Alta Calidad', label: 'Producción en Clínica' },
      { value: 'Especializado', label: 'Enfoque en Salud' }
    ],
    targetIndustries: [
      'Cirujanos Bariátricos y Metabólicos',
      'Cirujanos Plásticos y Estéticos',
      'Clínicas Odontológicas y Especialidades',
      'Dermatólogos y Medicina Estética',
      'Centros de Fertilidad, Oftalmología y Traumatología'
    ],
    faqs: [
      {
        question: '¿Cuánto cuesta una estrategia de marketing médico para clínicas en Lima?',
        answer: 'El costo de una estrategia de marketing médico en Lima depende del número de especialidades a promocionar, la frecuencia de producción audiovisual mensual y el alcance geográfico de las campañas publicitarias. En Black Box diseñamos planes a la medida de consultorios privados, cirujanos y policlínicos en Lima, estructurando propuestas transparentes que abarcan desde la creación de contenidos educativos y testimoniales hasta la gestión de pauta en Meta Ads. Dado que el sector salud exige altos estándares éticos y cumplimiento riguroso de las políticas de publicidad médica para evitar bloqueos, nuestra gestión profesional previene sanciones y maximiza el retorno de cada presupuesto asignado. Desarrollamos esquemas de trabajo con honorarios claros que se amortizan con la llegada de nuevos pacientes calificados para cirugías, tratamientos estéticos o consultas de especialidad.'
      },
      {
        question: '¿Qué incluye el servicio de marketing ético y producción audiovisual para salud?',
        answer: 'Nuestro servicio especializado de marketing médico en Lima combina la producción cinematográfica en consultorio con estrategias de adquisición digital respetuosas de la deontología médica. Coordinamos sesiones de rodaje profesionales en tus instalaciones con cámaras de cine 4K, iluminación suave y teleprompter para que el médico transmita sus conocimientos con naturalidad y autoridad sin perder tiempo de consulta. Producimos videos educativos de procedimientos, cápsulas resolviendo dudas frecuentes de pacientes y testimonios conmovedores de casos de éxito grabados con dignidad y calidez humana. Adicionalmente, redactamos anuncios éticos sin promesas desmesuradas, configuramos la segmentación por distritos estratégicos de Lima y capacitamos a tu personal de recepción para responder rápidamente a los pacientes que escriben al WhatsApp buscando agendar su cita de valoración.'
      },
      {
        question: '¿En cuánto tiempo una clínica o consultorio médico comienza a recibir más pacientes?',
        answer: 'La captación de pacientes a través de campañas de marketing médico en Lima suele generar las primeras solicitudes de información y citas de valoración durante las dos primeras semanas de activación de los anuncios. A diferencia de otros sectores comerciales, el paciente de salud requiere mayor grado de confianza y validación social antes de someterse a un procedimiento quirúrgico o tratamiento médico prolongado. Por ello, la combinación de videos educativos donde el doctor demuestra su conocimiento y testimoniales reales acelera notablemente la decisión de consulta. A partir del segundo mes, con la acumulación de reproducciones, posicionamiento de autoridad y optimización del algoritmo publicitario, la clínica experimenta un flujo predecible y constante de pacientes interesados que valoran la calidad profesional del servicio médico.'
      }
    ],
    relatedProjects: ['Clínica Avendaño']
  },

  'productora-audiovisual-lima': {
    slug: 'productora-audiovisual-lima',
    title: 'Productora Audiovisual en Lima',
    shortTitle: 'Productora Audiovisual Lima',
    seoTitle: 'Productora Audiovisual en Lima | Black Box Peru',
    seoDescription: 'Productora audiovisual en Lima especializada en contenido vertical, spots comerciales y marketing digital para e-commerce y gastronomia.',
    heroBadge: 'Producción Audiovisual 4K/6K en Lima',
    heroHeadline: 'Productora Audiovisual en Lima',
    heroSubheadline: 'Spots comerciales, videos corporativos y contenido publicitario de alto impacto en resolución 4K y 6K para marcas en Lima, Perú.',
    icon: 'Video',
    gradient: 'from-blue-600 via-indigo-600 to-purple-800',
    accentColor: 'text-blue-500',
    problems: [
      {
        title: 'Falta de calidad cinematográfica en tus videos',
        desc: 'Videos grabados sin iluminación profesional ni dirección de arte perjudican la credibilidad de tu negocio.'
      },
      {
        title: 'Bajo enganche en redes y pauta publicitaria',
        desc: 'Tu público objetivo ignora videos que no capturan su atención en los primeros 3 segundos.'
      },
      {
        title: 'Ausencia de guion estratégico orientado a ventas',
        desc: 'Se requiere storytelling y llamados a la acción claros para convertir espectadores en clientes reales.'
      }
    ],
    solutions: [
      {
        title: 'Cámaras de Cine 4K/6K e Iluminación de Estudio',
        desc: 'Equipamiento cinematográfico con ópticas fijas y esquemas de iluminación diseñados a medida.',
        icon: 'Camera'
      },
      {
        title: 'Guion Publicitario y Dirección en Set',
        desc: 'Estructuración de narrativas visuales dinámicas con teleprompter y dirección de escena profesional.',
        icon: 'FileText'
      },
      {
        title: 'Color Grading y Diseño Sonoro',
        desc: 'Postproducción avanzada con corrección de color cinematográfica y masterización de audio.',
        icon: 'Sparkles'
      }
    ],
    processSteps: [
      { step: '01', title: 'Briefing & Guion', desc: 'Definición del mensaje central y elaboración del guion técnico publicitario.' },
      { step: '02', title: 'Rodaje Profesional', desc: 'Jornada de filmación en set o locación con equipamiento de cine.' },
      { step: '03', title: 'Edición & Color', desc: 'Cortes dinámicos, gradación de color y musicalización licenciada.' },
      { step: '04', title: 'Entrega Multi-Formato', desc: 'Versiones 16:9 y verticales 9:16 listas para web y pauta.' }
    ],
    deliverables: [
      'Master comercial en 4K UHD para pantallas y web',
      'Versiones verticales (9:16) optimizadas para Reels y TikTok',
      'Guion publicitario estructurado',
      'Derechos de uso comercial'
    ],
    metrics: [
      { value: '4K/6K', label: 'Resolución' },
      { value: 'Lima, PE', label: 'Cobertura' },
      { value: '100%', label: 'Calidad Cine' }
    ],
    targetIndustries: [
      'Empresas Corporativas e Industriales',
      'Clínicas y Salud',
      'E-commerce y Retail',
      'Gastronomía y Restaurantes'
    ],
    faqs: [
      {
        question: '¿Dónde opera la productora audiovisual en Lima?',
        answer: 'Black Box Peru opera como empresa de servicios en Lima, con cobertura técnica y logística en todos los distritos de Lima Metropolitana y a nivel nacional.'
      },
      {
        question: '¿Qué tipo de producciones realizan en Lima?',
        answer: 'Realizamos spots comerciales, videos corporativos, contenido para e-commerce, gastronomía y videos verticales para redes sociales.'
      }
    ],
    relatedProjects: ['Makita', 'Checor', 'Clínica Avendaño']
  },

  'agencia-marketing-digital-lima': {
    slug: 'agencia-marketing-digital-lima',
    title: 'Agencia de Marketing Digital en Lima',
    shortTitle: 'Agencia Marketing Digital Lima',
    seoTitle: 'Agencia de Marketing Digital en Lima | Black Box Peru',
    seoDescription: 'Productora audiovisual en Lima especializada en contenido vertical, spots comerciales y marketing digital para e-commerce y gastronomia.',
    heroBadge: 'Marketing Digital & Meta Ads en Lima',
    heroHeadline: 'Agencia de Marketing Digital en Lima',
    heroSubheadline: 'Campañas de publicidad digital con creativos en video de alto impacto, Meta Ads, TikTok Ads y generación de contactos calificados.',
    icon: 'TrendingUp',
    gradient: 'from-emerald-600 via-teal-600 to-cyan-800',
    accentColor: 'text-emerald-500',
    problems: [
      {
        title: 'Inversión publicitaria sin retorno comercial claro',
        desc: 'Promocionar publicaciones sin estrategia ni embudos genera gastos sin ventas.'
      },
      {
        title: 'Creativos estáticos que no convierten',
        desc: 'Las imágenes genéricas pasan desapercibidas en el feed de los usuarios.'
      },
      {
        title: 'Falta de seguimiento en contactos y leads',
        desc: 'Se necesitan canales directos hacia WhatsApp para cerrar cotizaciones ágilmente.'
      }
    ],
    solutions: [
      {
        title: 'Anuncios en Video Cinematográfico',
        desc: 'Creativos publicitarios grabados profesionalmente que detienen el scroll y generan deseo.',
        icon: 'Video'
      },
      {
        title: 'Segmentación Avanzada y Pauta Digital',
        desc: 'Gestión técnica en Meta Ads y TikTok Ads con optimización continua del costo por adquisición.',
        icon: 'Target'
      },
      {
        title: 'Embudos Directos hacia WhatsApp',
        desc: 'Rutas de conversión diseñadas para recibir clientes potenciales listos para cotizar.',
        icon: 'MessageSquare'
      }
    ],
    processSteps: [
      { step: '01', title: 'Auditoría & Estrategia', desc: 'Diagnóstico comercial y definición de audiencias clave en Lima.' },
      { step: '02', title: 'Producción de Creativos', desc: 'Grabación y edición de videos publicitarios de alta conversión.' },
      { step: '03', title: 'Activación de Campañas', desc: 'Lanzamiento en Meta Ads y TikTok Ads con segmentación precisa.' },
      { step: '04', title: 'Optimización & Reportes', desc: 'Medición periódica y escalamiento de los anuncios más rentables.' }
    ],
    deliverables: [
      'Gestión integral de campañas en Meta Ads y TikTok Ads',
      'Creativos audiovisuales y piezas en video optimizadas',
      'Configuración de píxeles y eventos de conversión',
      'Reportes periódicos de rendimiento y leads'
    ],
    metrics: [
      { value: 'Meta & TikTok', label: 'Plataformas' },
      { value: 'Lima, PE', label: 'Cobertura' },
      { value: 'ROAS', label: 'Enfoque en Ventas' }
    ],
    targetIndustries: [
      'Clínicas y Consultorios Médicos',
      'Marcas de E-commerce y Moda',
      'Restaurantes y Bares',
      'Empresas de Servicios y B2B'
    ],
    faqs: [
      {
        question: '¿Qué servicios ofrece su agencia de marketing digital en Lima?',
        answer: 'Ofrecemos gestión de publicidad en Meta Ads y TikTok Ads, producción de creativos en video, diseño de embudos hacia WhatsApp y optimización continua de campañas.'
      },
      {
        question: '¿Cómo se integran los videos con el marketing digital?',
        answer: 'Grabamos piezas audiovisuales pensadas específicamente para los formatos de pauta, logrando mayor retención y mejores costos por lead.'
      }
    ],
    relatedProjects: ['Clínica Avendaño', 'Leomar Muebles', 'Chalqui']
  },

  'videos-ecommerce-gastronomia': {
    slug: 'videos-ecommerce-gastronomia',
    title: 'Produccion de Videos para E-commerce y Gastronomia en Lima',
    shortTitle: 'Videos E-commerce & Gastronomía',
    seoTitle: 'Producción de Videos para E-commerce y Gastronomía en Lima | Black Box Peru',
    seoDescription: 'Productora audiovisual en Lima especializada en contenido vertical, spots comerciales y marketing digital para e-commerce y gastronomia.',
    heroBadge: 'Food Styling & E-commerce en Lima',
    heroHeadline: 'Produccion de Videos para E-commerce y Gastronomia en Lima',
    heroSubheadline: 'Videos de producto, unboxings, food styling y tomas macro en 4K diseñados para despertar el apetito y multiplicar las ventas online.',
    icon: 'Smartphone',
    gradient: 'from-amber-600 via-orange-600 to-red-600',
    accentColor: 'text-amber-500',
    problems: [
      {
        title: 'Fotos y videos planos que no reflejan la calidad del plato o producto',
        desc: 'Los clientes no sienten deseo de compra si la presentación visual es descuidada.'
      },
      {
        title: 'Baja conversión en tiendas online y catálogos',
        desc: 'El comprador digital necesita ver texturas, dimensiones y uso real para decidirse.'
      },
      {
        title: 'Dificultad para destacar en TikTok e Instagram',
        desc: 'Se requieren formatos verticales con ritmo rápido y audio envolvente.'
      }
    ],
    solutions: [
      {
        title: 'Food Styling y Tomas Macro en Alta Definición',
        desc: 'Iluminación cálida, cámara lenta y planos cerrados que resaltan el brillo y frescura de los alimentos.',
        icon: 'Sparkles'
      },
      {
        title: 'Videos Demostrativos y Unboxing para E-commerce',
        desc: 'Presentación clara de características, materiales y modo de uso para acelerar la compra.',
        icon: 'Camera'
      },
      {
        title: 'Creativos 9:16 Listos para Pauta Publicitaria',
        desc: 'Contenidos verticales adaptados para anuncios que generan pedidos directos por WhatsApp.',
        icon: 'Zap'
      }
    ],
    processSteps: [
      { step: '01', title: 'Plan de Rodaje & Styling', desc: 'Selección de platos o productos prioritarios y diseño de tomas.' },
      { step: '02', title: 'Grabación en Set / Restaurante', desc: 'Jornada de rodaje con iluminación de producto y ópticas macro.' },
      { step: '03', title: 'Edición & Diseño Sonoro', desc: 'Postproducción con efectos de sonido crujientes y color vibrante.' },
      { step: '04', title: 'Entrega para Web y Redes', desc: 'Videos en alta resolución para tienda virtual y pauta.' }
    ],
    deliverables: [
      'Videos gastronómicos y de producto en 4K UHD',
      'Reels y TikToks verticales (9:16) con edición dinámica',
      'Tomas en cámara lenta y planos macro de detalle',
      'Archivos optimizados para web y redes'
    ],
    metrics: [
      { value: '4K Macro', label: 'Detalle Visual' },
      { value: '9:16', label: 'Formato Reels' },
      { value: 'Lima', label: 'Cobertura' }
    ],
    targetIndustries: [
      'Restaurantes, Franquicias y Bares',
      'Tiendas Virtuales y E-commerce',
      'Marcas de Moda, Calzado y Accesorios',
      'Mueblerías y Artículos para el Hogar'
    ],
    faqs: [
      {
        question: '¿Dónde se realizan las grabaciones gastronómicas?',
        answer: 'Grabamos directamente en la cocina o salón de tu restaurante, o en nuestro set adaptado con iluminación y mesas de producto.'
      },
      {
        question: '¿En qué formatos se entregan los videos para e-commerce?',
        answer: 'Entregamos en formato horizontal (16:9) y vertical (9:16) con compresión optimizada para carga ultra rápida en sitios web.'
      }
    ],
    relatedProjects: ['Burger & Eventos', 'Shaking', 'Leomar Muebles']
  }
}
