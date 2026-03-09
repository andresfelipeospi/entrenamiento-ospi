import { useState, useEffect, useRef } from "react";

const sections = ["Introducción", "Beneficios", "Riesgos", "Principios", "Pautas", "Conclusión"];

const beneficiosGenerales = [
  { icon: "💪", title: "Fuerza y potencia", desc: "Aumenta la fuerza y potencia de los músculos por encima del crecimiento normal." },
  { icon: "🦴", title: "Densidad ósea", desc: "Incrementa la densidad mineral ósea durante los años clave de crecimiento." },
  { icon: "🛡️", title: "Prevención de lesiones", desc: "Reduce el riesgo de lesiones en la práctica deportiva." },
  { icon: "🏃", title: "Habilidades motoras", desc: "Mejora el desempeño en saltar, lanzar y correr." },
  { icon: "🏅", title: "Rendimiento deportivo", desc: "Componente esencial para el desempeño en diferentes deportes." },
  { icon: "⚖️", title: "Composición corporal", desc: "Mejora la composición corporal en niños con sobrepeso u obesidad." },
  { icon: "🩸", title: "Sensibilidad a insulina", desc: "Incrementa la sensibilidad a la insulina en adolescentes con sobrepeso." },
  { icon: "❤️", title: "Función cardiovascular", desc: "Mejora el perfil lipídico y la función cardiovascular." },
  { icon: "🧠", title: "Bienestar psicosocial", desc: "Mejora la autoestima, imagen corporal y confianza en sí mismo." },
  { icon: "📚", title: "Rendimiento académico", desc: "Genera mejoras en el rendimiento académico y adherencia al ejercicio." },
];

const riesgos = [
  { label: "Ausencia de supervisión calificada", level: "alto" },
  { label: "Entorno inseguro o equipos inapropiados", level: "alto" },
  { label: "Técnica incorrecta en los ejercicios", level: "alto" },
  { label: "Errores en planificación de cargas", level: "medio" },
  { label: "No respetar intervalos de descanso", level: "medio" },
  { label: "Síndrome de sobreentrenamiento", level: "medio" },
  { label: "Consumo de sustancias para el rendimiento", level: "alto" },
  { label: "Equipos no adecuados para niños", level: "medio" },
];

const principios = [
  { nombre: "Progresión", desc: "No solo mayor peso, sino mayores desafíos para estimular adaptación e interés.", icon: "📈" },
  { nombre: "Regularidad", desc: "2-3 sesiones por semana en días no consecutivos, mantenidas a lo largo del tiempo.", icon: "📅" },
  { nombre: "Sobrecarga", desc: "Entrenar con exigencia superior a la habitual, variando intensidad, frecuencia o tipo.", icon: "🏋️" },
  { nombre: "Creatividad", desc: "Incorporar nuevos ejercicios o equipamiento para optimizar interés y adherencia.", icon: "🎨" },
  { nombre: "Diversión", desc: "El niño que disfruta el ejercicio tiene mayor probabilidad de adherirse al programa.", icon: "😄" },
  { nombre: "Socialización", desc: "La participación grupal ayuda a los niños a interactuar y apoyarse mutuamente.", icon: "🤝" },
  { nombre: "Supervisión", desc: "Un profesional calificado disminuye riesgos y maximiza los beneficios musculares.", icon: "👁️" },
];

const pautas = [
  "Realizar una evaluación preparticipativa adecuada.",
  "Desarrollar supervisión e instrucción calificada.",
  "Garantizar un entorno seguro y libre de riesgos.",
  "Edad de inicio: desde los 7-8 años con control postural.",
  "Comenzar con 2-3 sesiones/semana en días no consecutivos (20-30 min).",
  "Iniciar con calentamiento aeróbico y dinámico de 5-10 minutos.",
  "Enseñar técnica con progresiones metodológicas adecuadas.",
  "Respetar intervalos de descanso entre series y ejercicios.",
  "Realizar 1-3 series de 10-15 repeticiones por ejercicio.",
  "Ejercitar todos los grupos musculares agonistas y antagonistas.",
  "Incluir ejercicios específicos para región abdominal y lumbar.",
  "Utilizar ropa cómoda y zapatillas adecuadas.",
  "Planificar progresión según necesidades, edad y objetivos.",
  "Periodos de entrenamiento mínimo de 8-12 semanas.",
  "Aumentar resistencia/volumen de forma progresiva (5-10%).",
  "Entrenar de forma variada para evitar aburrimiento.",
  "Aplicar técnicas adecuadas de elongación en la recuperación.",
  "Monitorear y evaluar el entrenamiento en forma continua.",
  "Educar sobre hidratación apropiada y nutrición saludable.",
  "Apoyo e incentivo de instructores y padres.",
  "Supervisión de un instructor por cada 10 niños o adolescentes.",
];

const etapas = [
  { rango: "0–4 años", titulo: "Estimulación Ambiental", desc: "El uso de la fuerza proviene del entorno familiar. Se desarrolla la musculatura paravertebral y la postura bípeda erguida.", color: "#4ade80" },
  { rango: "4–8 años", titulo: "Maduración y Juego", desc: "No hay objetivos específicos de fuerza. Se recomiendan actividades lúdicas del tren superior: lanzamientos, trepadoras, reptación, juegos de arrastre.", color: "#38bdf8" },
  { rango: "7–19 años", titulo: "Entrenamiento Estructurado", desc: "Cuando el niño puede seguir instrucciones y tiene equilibrio y control postural, puede iniciar un programa supervisado de entrenamiento de la fuerza.", color: "#a78bfa" },
];

function useIntersection(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function AnimatedCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `all 0.55s cubic-bezier(.4,0,.2,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const quizQuestions = [
    { q: "¿A partir de qué edad puede iniciarse el entrenamiento de fuerza?", opts: ["5 años", "7-8 años", "12 años", "15 años"], correct: 1 },
    { q: "¿Cuántas sesiones semanales se recomiendan?", opts: ["1 sesión", "4-5 sesiones", "2-3 sesiones", "6-7 sesiones"], correct: 2 },
    { q: "¿Cuánto tiempo tarda en notarse el incremento de fuerza?", opts: ["2 semanas", "8 semanas", "6 meses", "1 año"], correct: 1 },
    { q: "¿Cuál es el principal riesgo del entrenamiento?", opts: ["Dejar de crecer", "Falta de supervisión calificada", "Aumentar peso corporal", "Ningún riesgo"], correct: 1 },
  ];

  function checkQuiz() {
    let correct = 0;
    quizQuestions.forEach((q, i) => { if (quizAnswers[i] === q.correct) correct++; });
    setQuizResult(correct);
  }

  const sectionRefs = sections.map(() => useRef(null));

  function scrollTo(i) {
    setActive(i);
    sectionRefs[i].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    const handleScroll = () => {
      sectionRefs.forEach((ref, i) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) setActive(i);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const S = {
    app: { fontFamily: "'Sora', sans-serif", background: "#0b1120", color: "#e2e8f0", minHeight: "100vh", overflowX: "hidden" },
    hero: {
      background: "linear-gradient(135deg, #0f2640 0%, #0b1120 60%, #0f1f0f 100%)",
      padding: "80px 24px 56px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    heroTitle: { fontSize: "clamp(1.8rem,5vw,3.2rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-1px", margin: "0 0 16px", color: "#fff" },
    heroAccent: { color: "#34d399" },
    heroBadge: { display: "inline-block", background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.35)", color: "#34d399", borderRadius: 24, padding: "6px 16px", fontSize: 13, marginBottom: 20, letterSpacing: 1 },
    heroSub: { color: "#94a3b8", fontSize: "clamp(0.9rem,2vw,1.1rem)", maxWidth: 620, margin: "0 auto 32px" },
    statsRow: { display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginTop: 40 },
    stat: { textAlign: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 24px", minWidth: 120 },
    statNum: { fontSize: "1.9rem", fontWeight: 800, color: "#34d399" },
    statLabel: { fontSize: 12, color: "#94a3b8", marginTop: 2 },
    nav: {
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(11,17,32,0.92)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,255,255,0.07)",
      padding: "0 24px", display: "flex", gap: 4, overflowX: "auto",
      scrollbarWidth: "none",
    },
    navBtn: (i) => ({
      padding: "14px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none",
      background: "transparent", color: active === i ? "#34d399" : "#94a3b8",
      borderBottom: `2px solid ${active === i ? "#34d399" : "transparent"}`,
      transition: "all .2s", whiteSpace: "nowrap", letterSpacing: 0.3,
    }),
    content: { maxWidth: 900, margin: "0 auto", padding: "0 16px 80px" },
    section: { paddingTop: 72 },
    secHeader: { marginBottom: 32 },
    secLabel: { display: "inline-block", background: "rgba(52,211,153,0.1)", color: "#34d399", borderRadius: 8, padding: "4px 12px", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 },
    secTitle: { fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, color: "#f1f5f9", margin: "0 0 8px" },
    secSub: { color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.7 },
    card: {
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16, padding: "20px 22px", transition: "border-color .2s, transform .2s",
    },
    cardHover: {},
    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16, marginTop: 20 },
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16, marginTop: 20 },
    tagAlto: { display: "inline-block", background: "rgba(239,68,68,0.15)", color: "#f87171", borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 700 },
    tagMedio: { display: "inline-block", background: "rgba(251,191,36,0.15)", color: "#fbbf24", borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 700 },
    pautaItem: (i) => ({
      display: "flex", alignItems: "flex-start", gap: 12,
      padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
    }),
    pautaNum: { minWidth: 28, height: 28, borderRadius: 8, background: "rgba(52,211,153,0.15)", color: "#34d399", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" },
    quizBox: { background: "rgba(52,211,153,0.04)", border: "1px solid rgba(52,211,153,0.15)", borderRadius: 20, padding: 28, marginTop: 32 },
    quizTitle: { fontSize: "1.1rem", fontWeight: 800, color: "#34d399", marginBottom: 20 },
    quizQ: { marginBottom: 22 },
    quizQText: { fontWeight: 600, fontSize: "0.95rem", marginBottom: 10, color: "#e2e8f0" },
    quizOpt: (selected) => ({
      display: "flex", alignItems: "center", gap: 10, padding: "9px 14px",
      borderRadius: 10, border: `1px solid ${selected ? "rgba(52,211,153,0.5)" : "rgba(255,255,255,0.07)"}`,
      background: selected ? "rgba(52,211,153,0.1)" : "transparent",
      cursor: "pointer", marginBottom: 8, fontSize: 14, color: selected ? "#34d399" : "#94a3b8",
      transition: "all .15s",
    }),
    quizSubmit: {
      background: "linear-gradient(90deg, #059669, #34d399)", color: "#0b1120", border: "none",
      borderRadius: 10, padding: "11px 28px", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 8,
    },
    resultBox: (r) => ({
      marginTop: 16, padding: 18, borderRadius: 14,
      background: r === quizQuestions.length ? "rgba(52,211,153,0.12)" : "rgba(251,191,36,0.1)",
      border: `1px solid ${r === quizQuestions.length ? "rgba(52,211,153,0.4)" : "rgba(251,191,36,0.3)"}`,
      color: r === quizQuestions.length ? "#34d399" : "#fbbf24",
      fontWeight: 700, fontSize: "1rem",
    }),
    etapaCard: (c) => ({
      borderLeft: `4px solid ${c}`, background: "rgba(255,255,255,0.03)",
      border: `1px solid rgba(255,255,255,0.07)`, borderLeftColor: c,
      borderRadius: 14, padding: "18px 20px",
    }),
    footer: {
      textAlign: "center", padding: "40px 24px 32px",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      background: "rgba(0,0,0,0.3)",
    },
    authorBadge: {
      display: "inline-flex", alignItems: "center", gap: 10,
      background: "linear-gradient(135deg,rgba(52,211,153,0.12),rgba(56,189,248,0.08))",
      border: "1px solid rgba(52,211,153,0.3)", borderRadius: 50,
      padding: "12px 28px", marginBottom: 16,
    },
    authorName: { fontWeight: 800, fontSize: "1.05rem", color: "#34d399", letterSpacing: 0.3 },
    authorRole: { fontSize: 12, color: "#64748b", marginTop: 4 },
    divider: { height: 1, background: "linear-gradient(90deg,transparent,rgba(52,211,153,0.2),transparent)", margin: "48px 0 0" },
    highlight: {
      background: "linear-gradient(135deg, rgba(52,211,153,0.08), rgba(56,189,248,0.06))",
      border: "1px solid rgba(52,211,153,0.2)", borderRadius: 16, padding: "22px 24px", marginTop: 24,
    },
    highlightText: { color: "#cbd5e1", lineHeight: 1.8, fontSize: "0.95rem" },
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <div style={S.app}>

        {/* HERO */}
        <div style={S.hero}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(52,211,153,0.12), transparent)", pointerEvents: "none" }} />
          <div style={S.heroBadge}>GUÍA INTERACTIVA · MEDICINA DEL DEPORTE</div>
          <h1 style={S.heroTitle}>
            Entrenamiento de la <span style={S.heroAccent}>Fuerza</span><br />en Niños y Adolescentes
          </h1>
          <p style={S.heroSub}>Beneficios, riesgos y recomendaciones basadas en evidencia científica para la población de 7 a 19 años.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            {["Arch Argent Pediatr 2018", "Comité Nacional Med. Deporte SAP", "Avalado AAP · NSCA · 2014"].map(t => (
              <span key={t} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "5px 14px", fontSize: 12, color: "#94a3b8" }}>{t}</span>
            ))}
          </div>
          <div style={S.statsRow}>
            {[["7–19", "Años de edad"], ["21", "Pautas generales"], ["7", "Principios clave"], [">20", "Beneficios documentados"]].map(([n, l]) => (
              <div key={l} style={S.stat}><div style={S.statNum}>{n}</div><div style={S.statLabel}>{l}</div></div>
            ))}
          </div>
        </div>

        {/* NAV */}
        <nav style={S.nav}>
          {sections.map((s, i) => (
            <button key={s} style={S.navBtn(i)} onClick={() => scrollTo(i)}>{s}</button>
          ))}
        </nav>

        <div style={S.content}>

          {/* INTRODUCCIÓN */}
          <div ref={sectionRefs[0]} style={S.section}>
            <AnimatedCard>
              <div style={S.secHeader}>
                <div style={S.secLabel}>01 · Introducción</div>
                <h2 style={S.secTitle}>¿Qué es el Entrenamiento de la Fuerza?</h2>
                <p style={S.secSub}>Método especializado de acondicionamiento físico en el que la persona trabaja contra una amplia gama de resistencias para mejorar la salud, la aptitud y el rendimiento.</p>
              </div>
              <div style={S.highlight}>
                <p style={S.highlightText}>La <strong style={{ color: "#34d399" }}>Organización Mundial de la Salud</strong> recomienda que niños y adolescentes realicen, al menos, <strong style={{ color: "#34d399" }}>60 minutos diarios</strong> de actividad física de intensidad moderada a vigorosa, incluyendo actividades de fortalecimiento muscular y óseo <strong style={{ color: "#34d399" }}>al menos 3 veces por semana</strong>.</p>
              </div>
              <div style={{ marginTop: 32 }}>
                <p style={{ color: "#7c8fa6", fontSize: 13, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>Etapas del desarrollo</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {etapas.map((e, i) => (
                    <AnimatedCard key={i} delay={i * 100}>
                      <div style={S.etapaCard(e.color)}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                          <span style={{ background: e.color + "22", color: e.color, borderRadius: 8, padding: "3px 12px", fontSize: 12, fontWeight: 800 }}>{e.rango}</span>
                          <strong style={{ color: "#f1f5f9", fontSize: "0.95rem" }}>{e.titulo}</strong>
                        </div>
                        <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.875rem", lineHeight: 1.65 }}>{e.desc}</p>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 28, padding: "18px 20px", background: "rgba(56,189,248,0.06)", borderRadius: 14, border: "1px solid rgba(56,189,248,0.15)" }}>
                <p style={{ margin: 0, color: "#7dd3fc", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  <strong>⚠️ Importante:</strong> El entrenamiento de la fuerza <strong>no debe confundirse con la halterofilia</strong> (deporte de competición que implica levantamiento máximo). Los programas para niños priorizan técnica, progresión gradual y seguridad.
                </p>
              </div>
            </AnimatedCard>
          </div>

          <div style={S.divider} />

          {/* BENEFICIOS */}
          <div ref={sectionRefs[1]} style={S.section}>
            <AnimatedCard>
              <div style={S.secHeader}>
                <div style={S.secLabel}>02 · Beneficios</div>
                <h2 style={S.secTitle}>Beneficios Potenciales para la Salud</h2>
                <p style={S.secSub}>Un programa diseñado apropiadamente puede brindar beneficios físicos, psicológicos y sociales duraderos.</p>
              </div>
            </AnimatedCard>
            <div style={S.grid2}>
              {beneficiosGenerales.map((b, i) => (
                <AnimatedCard key={i} delay={i * 50}>
                  <div style={{ ...S.card, cursor: "default" }} onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(52,211,153,0.3)"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
                    <div style={{ fontSize: 26, marginBottom: 10 }}>{b.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#f1f5f9", marginBottom: 6 }}>{b.title}</div>
                    <div style={{ color: "#94a3b8", fontSize: "0.83rem", lineHeight: 1.6 }}>{b.desc}</div>
                  </div>
                </AnimatedCard>
              ))}
            </div>

            <AnimatedCard delay={100}>
              <div style={{ marginTop: 36 }}>
                <p style={{ color: "#7c8fa6", fontSize: 13, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>En niños con sobrepeso u obesidad</p>
                <div style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 16, padding: "22px 24px" }}>
                  <p style={{ color: "#c4b5fd", lineHeight: 1.8, fontSize: "0.9rem", margin: 0 }}>
                    El entrenamiento de la fuerza <strong>mejora la composición corporal</strong> reduciendo el tejido adiposo central. Tras <strong>16 semanas</strong>, se observa un incremento significativo en la sensibilidad a la insulina. Provoca la translocación del transportador GLUT-4 a la membrana de las células musculares, mejorando la captación de glucosa. Además, <strong>los jóvenes obesos encuentran más fácil participar</strong> en ejercicios de fuerza que en actividades aeróbicas continuas, lo que favorece la adherencia.
                  </p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={150}>
              <div style={{ marginTop: 28 }}>
                <p style={{ color: "#7c8fa6", fontSize: 13, marginBottom: 16, textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>Beneficios psicosociales</p>
                <div style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.15)", borderRadius: 16, padding: "22px 24px" }}>
                  <p style={{ color: "#fde68a", lineHeight: 1.8, fontSize: "0.9rem", margin: 0 }}>
                    Investigaciones evidencian disminución de depresión, ansiedad y estrés. Estudios muestran <strong>asociación positiva entre entrenamiento de fuerza y autoestima</strong>, especialmente en adolescentes que comienzan con bajos niveles de autoestima. Un programa de <strong>12 semanas</strong> produjo mejoras significativas en la fuerza, composición corporal y autoconcepto, con bajas tasas de abandono.
                  </p>
                </div>
              </div>
            </AnimatedCard>
          </div>

          <div style={S.divider} />

          {/* RIESGOS */}
          <div ref={sectionRefs[2]} style={S.section}>
            <AnimatedCard>
              <div style={S.secHeader}>
                <div style={S.secLabel}>03 · Riesgos</div>
                <h2 style={S.secTitle}>Riesgos y Cómo Prevenirlos</h2>
                <p style={S.secSub}>Los riesgos de lesiones músculo-esqueléticas no son mayores que en cualquier actividad física, pero se incrementan en ciertas situaciones.</p>
              </div>
              <div style={{ padding: "14px 20px", background: "rgba(52,211,153,0.06)", borderRadius: 12, border: "1px solid rgba(52,211,153,0.15)", marginBottom: 24 }}>
                <p style={{ margin: 0, color: "#6ee7b7", fontSize: "0.88rem", lineHeight: 1.7 }}>
                  ✅ <strong>No existe evidencia</strong> que sugiera que el entrenamiento de la fuerza afecte adversamente el crecimiento o reduzca la talla final. El "mito" de que entrena la fuerza reduce la estatura queda <strong>descartado por la ciencia</strong>.
                </p>
              </div>
            </AnimatedCard>
            <div style={{ marginTop: 8 }}>
              {riesgos.map((r, i) => (
                <AnimatedCard key={i} delay={i * 60}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px", borderRadius: 12, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 8 }}>
                    <span style={{ fontSize: "0.9rem", color: "#cbd5e1" }}>⚠ {r.label}</span>
                    <span style={r.level === "alto" ? S.tagAlto : S.tagMedio}>{r.level === "alto" ? "ALTO" : "MEDIO"}</span>
                  </div>
                </AnimatedCard>
              ))}
            </div>
            <AnimatedCard delay={200}>
              <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 14, padding: "16px 18px" }}>
                  <p style={{ color: "#fca5a5", fontWeight: 700, marginBottom: 8, fontSize: "0.88rem" }}>⚠ Síndrome de sobreentrenamiento</p>
                  <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.82rem", lineHeight: 1.65 }}>Entrenamiento excesivo con recuperación inadecuada puede provocar consecuencias psicosociales negativas y repercusiones somáticas.</p>
                </div>
                <div style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 14, padding: "16px 18px" }}>
                  <p style={{ color: "#fca5a5", fontWeight: 700, marginBottom: 8, fontSize: "0.88rem" }}>🚫 Sustancias para el rendimiento</p>
                  <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.82rem", lineHeight: 1.65 }}>Los esteroides androgénicos están contraindicados. Prohibidos por la WADA, COI, y la Academia Americana de Pediatría.</p>
                </div>
              </div>
            </AnimatedCard>
          </div>

          <div style={S.divider} />

          {/* PRINCIPIOS */}
          <div ref={sectionRefs[3]} style={S.section}>
            <AnimatedCard>
              <div style={S.secHeader}>
                <div style={S.secLabel}>04 · Principios</div>
                <h2 style={S.secTitle}>7 Principios Fundamentales</h2>
                <p style={S.secSub}>Todo profesional que trabaje con niños debe conocer y aplicar estos principios básicos del entrenamiento infantojuvenil.</p>
              </div>
            </AnimatedCard>
            <div style={S.grid3}>
              {principios.map((p, i) => (
                <AnimatedCard key={i} delay={i * 70}>
                  <div
                    style={{ ...S.card, borderTop: "3px solid rgba(52,211,153,0.4)" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderTopColor = "#34d399"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderTopColor = "rgba(52,211,153,0.4)"; }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
                    <div style={{ fontWeight: 800, color: "#34d399", marginBottom: 6, fontSize: "0.95rem" }}>{p.nombre}</div>
                    <div style={{ color: "#94a3b8", fontSize: "0.82rem", lineHeight: 1.65 }}>{p.desc}</div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
            <AnimatedCard delay={200}>
              <div style={{ marginTop: 28, background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.15)", borderRadius: 16, padding: "20px 24px" }}>
                <p style={{ color: "#7dd3fc", fontWeight: 700, marginBottom: 8, fontSize: "0.9rem" }}>👤 Perfil del profesional calificado</p>
                <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.87rem", lineHeight: 1.75 }}>Debe poseer conocimientos equivalentes a un título universitario en Educación Física, Ciencias del Ejercicio o similar. Debe instruir sobre técnica correcta, normas de seguridad y tener un fuerte bagaje pedagógico para comunicarse eficazmente con niños y adolescentes.</p>
              </div>
            </AnimatedCard>
          </div>

          <div style={S.divider} />

          {/* PAUTAS */}
          <div ref={sectionRefs[4]} style={S.section}>
            <AnimatedCard>
              <div style={S.secHeader}>
                <div style={S.secLabel}>05 · Pautas Generales</div>
                <h2 style={S.secTitle}>21 Pautas para un Entrenamiento Seguro</h2>
                <p style={S.secSub}>Seguir estas recomendaciones garantiza que los riesgos no sean mayores que en cualquier práctica deportiva habitual.</p>
              </div>
            </AnimatedCard>
            <div style={{ marginTop: 8 }}>
              {pautas.map((p, i) => (
                <AnimatedCard key={i} delay={(i % 7) * 40}>
                  <div style={S.pautaItem(i)}>
                    <div style={S.pautaNum}>{i + 1}</div>
                    <span style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.65 }}>{p}</span>
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {/* QUIZ */}
            <AnimatedCard delay={100}>
              <div style={S.quizBox}>
                <div style={S.quizTitle}>🎯 Evalúa tu conocimiento</div>
                {quizQuestions.map((q, qi) => (
                  <div key={qi} style={S.quizQ}>
                    <div style={S.quizQText}>{qi + 1}. {q.q}</div>
                    {q.opts.map((opt, oi) => (
                      <div key={oi} style={S.quizOpt(quizAnswers[qi] === oi)} onClick={() => setQuizAnswers(a => ({ ...a, [qi]: oi }))}>
                        <span style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${quizAnswers[qi] === oi ? "#34d399" : "#334155"}`, background: quizAnswers[qi] === oi ? "#34d399" : "transparent", flexShrink: 0, display: "inline-block" }} />
                        {opt}
                      </div>
                    ))}
                  </div>
                ))}
                {quizResult === null ? (
                  <button style={S.quizSubmit} onClick={checkQuiz} disabled={Object.keys(quizAnswers).length < quizQuestions.length}>
                    Ver resultado
                  </button>
                ) : (
                  <div style={S.resultBox(quizResult)}>
                    {quizResult === quizQuestions.length
                      ? `🏆 ¡Perfecto! ${quizResult}/${quizQuestions.length} correctas`
                      : `📊 ${quizResult}/${quizQuestions.length} correctas — Repasa el contenido`}
                    <button style={{ marginLeft: 16, background: "none", border: "none", cursor: "pointer", color: "#64748b", fontSize: 13, textDecoration: "underline" }} onClick={() => { setQuizResult(null); setQuizAnswers({}); }}>reintentar</button>
                  </div>
                )}
              </div>
            </AnimatedCard>
          </div>

          <div style={S.divider} />

          {/* CONCLUSIÓN */}
          <div ref={sectionRefs[5]} style={S.section}>
            <AnimatedCard>
              <div style={S.secHeader}>
                <div style={S.secLabel}>06 · Conclusión</div>
                <h2 style={S.secTitle}>Mitos vs. Realidades</h2>
                <p style={S.secSub}>La evidencia científica y la experiencia clínica demuestran que el entrenamiento de la fuerza es útil, eficaz y seguro si está prescrito y supervisado adecuadamente.</p>
              </div>
              {[
                { mito: "Entrena fuerza reduce la estatura final", realidad: "No existe evidencia de que afecte adversamente el crecimiento lineal." },
                { mito: "Los niños no deben levantar pesas", realidad: "Con supervisión adecuada es seguro desde los 7-8 años con control postural." },
                { mito: "Solo sirve para deportistas de élite", realidad: "Beneficia a niños sedentarios, con sobrepeso, obesidad y población general." },
                { mito: "El cartílago de crecimiento siempre se lesiona", realidad: "No hay lesiones en programas supervisados con carga apropiada." },
              ].map((item, i) => (
                <AnimatedCard key={i} delay={i * 80}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 12, padding: "14px 16px" }}>
                      <div style={{ fontSize: 10, color: "#f87171", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>❌ MITO</div>
                      <p style={{ margin: 0, color: "#fca5a5", fontSize: "0.85rem", lineHeight: 1.6 }}>{item.mito}</p>
                    </div>
                    <div style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.15)", borderRadius: 12, padding: "14px 16px" }}>
                      <div style={{ fontSize: 10, color: "#34d399", fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>✅ REALIDAD</div>
                      <p style={{ margin: 0, color: "#6ee7b7", fontSize: "0.85rem", lineHeight: 1.6 }}>{item.realidad}</p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
              <AnimatedCard delay={300}>
                <div style={{ ...S.highlight, marginTop: 28 }}>
                  <p style={{ ...S.highlightText, margin: 0 }}>
                    Los niños y adolescentes que participan regularmente en programas <strong style={{ color: "#34d399" }}>seguros, efectivos y agradables</strong> podrán desarrollar una adecuada aptitud muscular, que les permitirá ser más aptos para las actividades físicas o deportivas en su vida futura. Las formas lúdicas logran <strong style={{ color: "#34d399" }}>mayor adherencia y placer</strong> por el entrenamiento.
                  </p>
                </div>
              </AnimatedCard>
            </AnimatedCard>
          </div>

        </div>

        {/* FOOTER */}
        <footer style={S.footer}>
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 11, color: "#475569", letterSpacing: 1.5, textTransform: "uppercase" }}>Guía interactiva elaborada por</span>
          </div>
          <div style={S.authorBadge}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#059669,#0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 800, color: "#fff" }}>A</div>
            <div style={{ textAlign: "left" }}>
              <div style={S.authorName}>Andrés Felipe Ospina</div>
              <div style={S.authorRole}>Guía Interactiva de Entrenamiento de la Fuerza</div>
            </div>
          </div>
          <p style={{ margin: "0 0 8px", color: "#475569", fontSize: 12 }}>
            Basado en: <em>Comité Nacional de Medicina del Deporte Infantojuvenil. Arch Argent Pediatr 2018;116 Supl 5:S82-S91</em>
          </p>
          <p style={{ margin: 0, color: "#334155", fontSize: 11 }}>Sociedad Argentina de Pediatría · NSCA 2014 · Academia Americana de Pediatría</p>
        </footer>

      </div>
    </>
  );
}
