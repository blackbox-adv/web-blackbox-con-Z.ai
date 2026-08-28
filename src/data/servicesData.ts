export interface ServiceDetail {
  slug: string
  title: string
  shortTitle: string
  seoTitle: string
  seoDescription: string
  heroBadge: string
  heroHeadline: string
  heroSubheadline: string
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
    title: 'Productora Audiovisual en Lima, Perú',
    shortTitle: 'Producción Audiovisual',
    seoTitle: 'Productora Audiovisual en Lima, Perú | Videos Corporativos y Comerciales 4K',
    seoDescription: 'Productora audiovisual en Lima especializada en videos corporativos, spots publicitarios, comerciales para TV y digital, y contenido 4K/6K que eleva la percepción de tu marca.',
    heroBadge: 'Cine Digital & Video Comercial 4K/6K',
    heroHeadline: 'Producción Audiovisual de Alto Impacto en Lima',
    heroSubheadline: 'Creamos comerciales, videos corporativos y piezas cinematográficas que transmiten prestigio, aumentan la confianza de tus clientes y aceleran tus ventas.',
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
        question: '¿Cuánto tiempo toma producir un video corporativo o comercial?',
        answer: 'El tiempo de producción se coordina según el alcance, locaciones y requerimientos técnicos del proyecto. Establecemos un cronograma claro desde la aprobación del guion para alinearnos a tus fechas de lanzamiento.'
      },
      {
        question: '¿Incluyen el guion y la dirección de la producción?',
        answer: 'Sí. Desarrollamos el servicio de manera integral: desde la conceptualización y redacción del guion publicitario hasta la dirección en set, locución profesional y postproducción.'
      },
      {
        question: '¿Realizan grabaciones fuera de Lima?',
        answer: 'Sí, contamos con equipamiento portátil para rodajes en cualquier región del Perú (plantas industriales, sucursales u oficinas), previa coordinación logística.'
      },
      {
        question: '¿En qué formatos entregan el material final?',
        answer: 'Entregamos en formato horizontal (16:9) en alta resolución para web y pantallas, además de versiones en formato vertical (9:16) adaptadas para redes sociales.'
      }
    ],
    relatedProjects: ['Checor', 'Makita', 'Clínica Avendaño', 'LAP Custom']
  },

  'reels-y-tiktok': {
    slug: 'reels-y-tiktok',
    title: 'Creación de Reels y Contenido para TikTok en Perú',
    shortTitle: 'Reels y TikTok Ads',
    seoTitle: 'Creación de Reels y TikTok para Marcas en Lima, Perú | Contenido Vertical 9:16',
    seoDescription: 'Agencia especializada en creación de Reels y TikToks para empresas en Lima, Perú. Producción mensual de videos verticales con guiones estratégicos, edición dinámica y enfoque de ventas.',
    heroBadge: 'Formato Vertical 9:16 de Alto Impacto',
    heroHeadline: 'Reels y TikToks Diseñados para Conectar con tu Audiencia',
    heroSubheadline: 'Impulsa el alcance de tu marca y genera consultas directas por WhatsApp con videos verticales de ritmo dinámico, subtítulos animados y narrativa persuasiva.',
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
        question: '¿Qué pasa si no tengo experiencia previa frente a cámara?',
        answer: 'Te acompañamos en todo momento. Contamos con teleprompter y dirección en set para que la comunicación resulte natural, segura y profesional.'
      },
      {
        question: '¿Cómo se organiza la jornada de grabación?',
        answer: 'Coordinamos una sesión estructurada donde se filman los guiones planificados previamente, optimizando el tiempo y facilitando la producción de todo el mes.'
      },
      {
        question: '¿Estos videos pueden utilizarse en campañas de publicidad digital?',
        answer: 'Sí, el formato y la narrativa se adaptan perfectamente para potenciar campañas tanto orgánicas como de pauta digital en Meta y TikTok.'
      }
    ],
    relatedProjects: ['Clínica Avendaño', 'Shaking', 'Burger & Eventos', 'Leomar Muebles']
  },

  'publicidad-digital-meta-ads': {
    slug: 'publicidad-digital-meta-ads',
    title: 'Agencia de Publicidad Digital y Meta Ads en Lima',
    shortTitle: 'Publicidad & Pauta Digital',
    seoTitle: 'Agencia de Meta Ads y Publicidad Digital en Lima, Perú | TikTok y Facebook Ads',
    seoDescription: 'Especialistas en campañas de publicidad digital en Facebook Ads, Instagram Ads y TikTok Ads en Lima, Perú. Estrategias enfocadas en generación de contactos calificados y retorno publicitario.',
    heroBadge: 'Estrategias de Pauta Orientadas a Resultados',
    heroHeadline: 'Publicidad Digital Diseñada para Atraer Clientes Potenciales',
    heroSubheadline: 'Estructuramos campañas con segmentación estratégica, creativos audiovisuales persuasivos y medición constante para maximizar el rendimiento de tu inversión publicitaria.',
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
        question: '¿Cómo se define el presupuesto para la pauta publicitaria?',
        answer: 'El presupuesto de inversión en las plataformas se determina de forma personalizada según el tamaño de tu negocio, tu ticket de venta y tus objetivos comerciales. Durante la asesoría inicial analizamos el escenario más adecuado para tu empresa.'
      },
      {
        question: '¿En qué plataformas gestionan las campañas publicitarias?',
        answer: 'Estructuramos y optimizamos campañas en las principales plataformas de mayor alcance en Perú: Meta Ads (Facebook e Instagram) y TikTok Ads, eligiendo el canal ideal según el perfil de tu cliente.'
      },
      {
        question: '¿Cómo se realiza el seguimiento y reporte de los resultados?',
        answer: 'Entregamos informes periódicos con los indicadores clave (volumen de contactos, costo por lead y rendimiento general) para mantener total claridad sobre el avance de las campañas.'
      }
    ],
    relatedProjects: ['Clínica Avendaño', 'Leomar Muebles', 'Makita', 'Chalqui']
  },

  'marketing-para-clinicas-salud': {
    slug: 'marketing-para-clinicas-salud',
    title: 'Marketing Médico para Clínicas y Doctores en Lima',
    shortTitle: 'Marketing Médico & Salud',
    seoTitle: 'Marketing Médico en Lima, Perú | Producción y Pauta para Clínicas y Doctores',
    seoDescription: 'Agencia de marketing médico y producción audiovisual para clínicas, cirujanos y especialistas de la salud en Lima, Perú. Estrategias éticas enfocadas en generar confianza y consultas.',
    heroBadge: 'Especialistas en Comunicación para el Sector Salud',
    heroHeadline: 'Marketing Médico Ético, Confiable y de Alto Rendimiento',
    heroSubheadline: 'Posicionamos tu especialidad médica con videos explicativos que transmiten seguridad, testimonios de pacientes y campañas éticas diseñadas para captar pacientes de valor.',
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
        question: '¿Cómo aseguran el cumplimiento de las políticas publicitarias médicas?',
        answer: 'Aplicamos pautas estrictas en la redacción y edición para evitar promesas no verificables o formatos no permitidos, priorizando la educación del paciente, credenciales médicas y la calidad de atención.'
      },
      {
        question: '¿Cuánto tiempo de dedicación requiere el médico para las grabaciones?',
        answer: 'Optimizamos al máximo el tiempo del especialista preparando los guiones con anticipación y utilizando teleprompter en set para que la grabación sea rápida y no interrumpa sus horarios de consulta.'
      },
      {
        question: '¿Qué tipo de contenidos se desarrollan para una clínica o consultorio?',
        answer: 'Desarrollamos cápsulas donde el especialista explica tratamientos de forma sencilla, resuelve dudas frecuentes y comparte testimonios de pacientes que transmiten confianza.'
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
