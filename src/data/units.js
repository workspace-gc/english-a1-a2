/**
 * Data: unidades de la guía A1–A2
 * -------------------------------
 * Interfaz: `UNITS` — un array de unidades con la siguiente forma:
 *
 *   {
 *     id: string,            // identificador estable (claves de progreso)
 *     num: number,           // número de unidad (1–10)
 *     title: string,
 *     tagline: string,       // fórmulas o palabras clave en inglés
 *     intro: string,
 *     theory: BlockTheory[], // bloques renderizados en orden
 *     practice: { hint?: string, exercises: Exercise[] },
 *     flash?: { decks: FlashDeck[] }, // solo unidades con vocabulario
 *   }
 *
 * Tipos de BlockTheory:
 *   { type: "p", html }
 *   { type: "note", html }
 *   { type: "list", title?, items: string[] }
 *   { type: "table", caption, head: string[], rows: string[][] }
 *   { type: "examples", title?, items: { en, es }[] }
 *
 * Tipos de Exercise (ids únicos dentro de la app):
 *   { id, type: "choice", prompt, sentence?, options: string[], answer: number, explanation }
 *   { id, type: "fill", prompt, template?: string[], blanks: { before?, after?, accepts: string[] }[], explanation }
 *   { id, type: "transform", prompt, sentence, accepts: string[], explanation }
 *   { id, type: "order", prompt, words: string[], accepts: string[], explanation }
 *   { id, type: "cloze", intro, sentence: (string | { __blank: number })[], blanks: { index, options: string[], answer, explanation }[] }
 */

export const UNITS = [
  // =============================================================
  // 1 · Pronombres demostrativos
  // =============================================================
  {
    id: "demonstratives",
    num: 1,
    title: "Pronombres demostrativos",
    tagline: "this · these · that · those",
    intro:
      "Los pronombres demostrativos señalan y ubican personas u objetos. El inglés solo tiene dos distancias: cerca (near) y lejos (far).",
    theory: [
      {
        type: "table",
        caption: "Matriz de distancia y número",
        head: ["Distancia", "Singular", "Plural"],
        rows: [
          ["Cerca (near)", "this", "these"],
          ["Lejos (far)", "that", "those"],
        ],
      },
      {
        type: "note",
        html: "🧠 El modelo Coco (Sesame Street): cerca = al alcance de la mano; lejos = señalando a la distancia.",
      },
      {
        type: "note",
        html: "🎧 this /ðɪs/ es corta y cerrada; these /ðiːz/ exige alargar la vocal «i» y terminar en «z».",
      },
      {
        type: "tip",
        html: "💡 Para pronunciar <em lang='en'>these</em> como un nativo, exagera la sonrisa: estira los labios lateralmente y alarga la vocal /iː/. <em lang='en'>Thiiiiis</em> (corta y seca) vs <em lang='en'>theeeese</em> (larga y sonriente).",
      },
      {
        type: "p",
        html:
          "Regla invariable: los <strong>adjetivos nunca cambian</strong> de forma en plural (jamás añaden <em>-s</em>), pero el demostrativo y el verbo <em>to be</em> sí se adaptan al número.",
      },
      {
        type: "examples",
        items: [
          { en: "This cat is brown.", es: "Este gato es marrón." },
          { en: "These cats are brown.", es: "Estos gatos son marrones. (brown no cambia)" },
          { en: "That bag is so cute.", es: "Ese bolso es tan bonito." },
          { en: "Those bags are so cute.", es: "Esos bolsos son tan bonitos." },
        ],
      },
    ],
    practice: {
      hint: "Transforma cada oración según la indicación. Escribe la frase completa.",
      exercises: [
        {
          id: "d1",
          type: "transform",
          prompt: "Cambia a plural:",
          sentence: "This workbook is cheap.",
          accepts: ["these workbooks are cheap"],
          explanation:
            "«This» pasa a «these», el sustantivo añade -s (workbooks) y el verbo is pasa a are. El adjetivo cheap no cambia.",
        },
        {
          id: "d2",
          type: "transform",
          prompt: "Cambia a singular:",
          sentence: "Those markers are red.",
          accepts: ["that marker is red"],
          explanation:
            "El demostrativo plural Those se reduce a that, el sustantivo pierde la -s (marker) y are cambia a is.",
        },
        {
          id: "d3",
          type: "transform",
          prompt: "Cambia a plural:",
          sentence: "That house is big.",
          accepts: ["those houses are big"],
          explanation:
            "«That» pasa a «those», «house» añade -s (houses) y el verbo is cambia a are.",
        },
        {
          id: "d4",
          type: "transform",
          prompt: "Cambia a plural:",
          sentence: "This marker is blue.",
          accepts: ["these markers are blue"],
          explanation: "This → these, marker → markers, is → are. El adjetivo blue no cambia.",
        },
        {
          id: "d5",
          type: "transform",
          prompt: "Cambia a singular:",
          sentence: "These cats are brown.",
          accepts: ["this cat is brown"],
          explanation: "These → this, cats → cat, are → is.",
        },
      ],
    },
  },

  // =============================================================
  // 2 · Present Simple
  // =============================================================
  {
    id: "present-simple",
    num: 2,
    title: "Present Simple",
    tagline: "rutinas · verdades · horarios",
    intro:
      "El tiempo verbal primario para describir rutinas, hechos científicos, horarios y estados permanentes.",
    theory: [
      {
        type: "list",
        title: "¿Cuándo lo usamos?",
        items: [
          "Rutinas y hábitos diarios: <em lang=\"en\">I get up at 8.</em>",
          "Verdades y hechos científicos: <em lang=\"en\">Water boils at 100°C.</em>",
          "Horarios y eventos programados: <em lang=\"en\">The train leaves at 9.</em>",
          "Estados permanentes: <em lang=\"en\">He is French.</em>",
        ],
      },
      {
        type: "table",
        caption: "Estructura gramatical",
        head: ["Estructura", "I / you / we / they", "he / she / it (¡el premio!)"],
        rows: [
          ["Afirmativo", "sujeto + verbo base", "sujeto + verbo con -s/-es"],
          ["Negativo", "sujeto + don't + verbo base", "sujeto + doesn't + verbo base"],
          ["Interrogativo", "do + sujeto + verbo base + ?", "does + sujeto + verbo base + ?"],
        ],
      },
      {
        type: "note",
        html: "🎁 El ping: he, she y it son los VIP de la gramática y en afirmativo llevan un «premio» final: learns, eats, goes.",
      },
      {
        type: "note",
        html: "🚒 El verbo bombero: don't / doesn't absorben la negación y la -s de tercera persona; el verbo principal vuelve a su forma base. He doesn't jump — nunca «He doesn't jumps».",
      },
      {
        type: "tip",
        html: "⚠️ Error grave: el verbo <em lang='en'>to be</em> es autosuficiente, nunca lo combines con <em lang='en'>do/does</em>. ✗ <em lang='en'>Does he is happy?</em> ✓ <em lang='en'>Is he happy?</em> · ✗ <em lang='en'>I don't be tired.</em> ✓ <em lang='en'>I am not tired.</em>",
      },
      {
        type: "list",
        title: "Ortografía de la -s (tercera persona)",
        items: [
          "Regla general: -s → <em lang=\"en\">play → plays</em>. Si la -y va precedida de vocal, no cambia.",
          "Terminados en -o: -es → <em lang=\"en\">go → goes</em>, <em lang=\"en\">do → does</em>.",
          "Consonante + -y: cambia a -ies → <em lang=\"en\">study → studies</em>, <em lang=\"en\">try → tries</em>.",
          "Sibilantes (-ss, -sh, -ch, -x, -z): -es → <em lang=\"en\">kiss → kisses</em>, <em lang=\"en\">catch → catches</em>.",
        ],
      },
    ],
    practice: {
      hint: "Completa con la forma correcta del verbo entre paréntesis.",
      exercises: [
        {
          id: "p1",
          type: "fill",
          prompt: "Completa la oración:",
          sentence: "She ______ (study) English every week.",
          blanks: [{ accepts: ["studies"] }],
          explanation:
            "Tercera persona singular afirmativa: la -y precedida de consonante cambia a -ies (study → studies).",
        },
        {
          id: "p2",
          type: "fill",
          prompt: "Completa la oración:",
          sentence: "They ______ (not / drive) to work on Sundays.",
          blanks: [{ accepts: ["don't drive", "do not drive"] }],
          explanation:
            "Sujeto plural They: usa el auxiliar don't + verbo base (drive). El verbo bombero no lleva -s.",
        },
        {
          id: "p3",
          type: "choice",
          prompt: "Completa la pregunta:",
          sentence: "______ he ______ (catch) the bus at 8:00?",
          options: ["Does / catch", "Do / catches", "Does / catches", "Did / catch"],
          answer: 0,
          explanation:
            "Does abre la pregunta y absorbe la tercera persona; catch se mantiene en su forma base.",
        },
        {
          id: "p4",
          type: "transform",
          prompt: "Corrige el error:",
          sentence: "He don't eats pizza.",
          accepts: ["he doesn't eat pizza", "he does not eat pizza"],
          explanation:
            "Con he el auxiliar es doesn't y el verbo principal pierde la -s: eat, no eats.",
        },
        {
          id: "p5",
          type: "fill",
          prompt: "Completa la oración:",
          sentence: "She ______ (learn) English every week.",
          blanks: [{ accepts: ["learns"] }],
          explanation: "Tercera persona singular afirmativa: learn → learns.",
        },
        {
          id: "p6",
          type: "fill",
          prompt: "Completa la oración:",
          sentence: "They ______ (not / jump) in the pool.",
          blanks: [{ accepts: ["don't jump", "do not jump"] }],
          explanation: "Sujeto plural They con negación: don't + verbo base.",
        },
        {
          id: "p7",
          type: "fill",
          prompt: "Completa la oración:",
          sentence: "The train ______ (leave) at 9:00.",
          blanks: [{ accepts: ["leaves"] }],
          explanation: "Tercera persona singular para horarios programados: leave → leaves.",
        },
      ],
    },
  },

  // =============================================================
  // 3 · Present Continuous
  // =============================================================
  {
    id: "present-continuous",
    num: 3,
    title: "Present Continuous",
    tagline: "am / is / are + -ing",
    intro:
      "Captura acciones que ocurren en este preciso instante o en un periodo delimitado del presente.",
    theory: [
      {
        type: "p",
        html:
          "Fórmula: <strong>sujeto + to be (am / is / are) + verbo en -ing</strong>. Negativa: <em lang=\"en\">isn't / aren't</em>. Interrogativa: <em lang=\"en\">am / is / are + sujeto + verbo-ing</em>.",
      },
      {
        type: "table",
        caption: "Reglas de ortografía del gerundio (-ing)",
        head: ["Regla", "Ejemplo", "Gerundio"],
        rows: [
          ["-e muda: se elimina la -e", "dance / bake", "dancing / baking"],
          ["monosílabo C+V+C: se duplica", "beg", "begging"],
          ["bisílabo acentuado al final: se duplica", "begin", "beginning"],
          ["terminados en -ie: -ie → y + ing", "lie", "lying"],
          ["terminados en -c: se añade -k", "panic", "panicking"],
        ],
      },
      {
        type: "table",
        caption: "Present Simple vs. Present Continuous",
        head: ["Criterio", "Present Simple", "Present Continuous"],
        rows: [
          ["Propósito", "hábitos y estados permanentes", "acciones en desarrollo ahora mismo"],
          ["Marcadores", "every day, usually, on Mondays", "Look!, Listen!, right now, tonight"],
          ["Ejemplos", "I read magazines.", "I am reading a magazine."],
        ],
      },
    ],
    practice: {
      hint: "Completa con Present Simple o Present Continuous según el contexto.",
      exercises: [
        {
          id: "c1",
          type: "fill",
          prompt: "Completa la oración:",
          sentence: "Look! She ______ (dance) on the stage right now.",
          blanks: [{ accepts: ["is dancing"] }],
          explanation:
            "El disparador «Look!» y «right now» exigen Present Continuous; la -e muda de dance se elimina (dancing).",
        },
        {
          id: "c2",
          type: "fill",
          prompt: "Completa las dos oraciones:",
          sentence:
            "I usually ______ (read) a book before sleeping, but tonight I ______ (watch) a movie.",
          blanks: [
            { accepts: ["read"] },
            { accepts: ["am watching"] },
          ],
          explanation:
            "La primera es una rutina (usually → Present Simple: read); la segunda es un plan temporal de «tonight» (am watching).",
        },
        {
          id: "c3",
          type: "fill",
          prompt: "Completa la oración:",
          sentence: "Be quiet! The baby ______ (sleep).",
          blanks: [{ accepts: ["is sleeping"] }],
          explanation:
            "La llamada de atención «Be quiet!» indica que la acción ocurre en este preciso instante.",
        },
        {
          id: "c4",
          type: "transform",
          prompt: "Transforma a Present Continuous:",
          sentence: "I read a book.",
          accepts: ["i am reading a book"],
          explanation: "Sujeto I + am + verbo-ing: I am reading.",
        },
        {
          id: "c5",
          type: "transform",
          prompt: "Transforma a Present Continuous:",
          sentence: "You drive the car.",
          accepts: ["you are driving the car"],
          explanation: "La -e muda de drive se elimina al añadir -ing (driving). You are driving.",
        },
        {
          id: "c6",
          type: "transform",
          prompt: "Transforma a Present Continuous:",
          sentence: "She bakes a cake.",
          accepts: ["she is baking a cake"],
          explanation: "La -e muda de bake se elimina (baking). She is baking.",
        },
      ],
    },
  },

  // =============================================================
  // 4 · WH- Questions
  // =============================================================
  {
    id: "wh-questions",
    num: 4,
    title: "Preguntas con WH-",
    tagline: "what · which · where · why · who · whose · how",
    intro:
      "Las WH- questions piden información sustantiva. A diferencia de las Yes/No questions, no se responden con confirmación o denegación.",
    theory: [
      {
        type: "list",
        title: "Catálogo de partículas",
        items: [
          "<strong>What</strong> — opción abierta: <em lang=\"en\">What is your favorite movie?</em>",
          "<strong>Which</strong> — elección acotada: <em lang=\"en\">Which of these two bags do you want?</em>",
          "<strong>When</strong> — tiempo · <strong>Where</strong> — lugar",
          "<strong>Why</strong> — motivo (se responde con <em lang=\"en\">because</em>)",
          "<strong>Who</strong> — personas sujetas · <strong>Whose</strong> — posesión",
          "<strong>How</strong> — modo o estado: <em lang=\"en\">How are you?</em>",
        ],
      },
      {
        type: "p",
        html:
          "<strong>Patrón A (to be):</strong> partícula WH + to be + sujeto. Ej.: <em lang=\"en\">Where is your backpack?</em>",
      },
      {
        type: "p",
        html:
          "<strong>Patrón B (verbo de acción):</strong> partícula WH + do/does/did + sujeto + verbo base. Ej.: <em lang=\"en\">Where do you live?</em>",
      },
      {
        type: "tip",
        html: "💡 <strong>What vs Which:</strong> Usa <em lang='en'>What</em> cuando el universo de respuestas es ilimitado (<em lang='en'>What is your favorite movie?</em>). Usa <em lang='en'>Which</em> cuando hay opciones específicas y acotadas (<em lang='en'>Which movie do you want to watch: Scream or Titanic?</em>).",
      },
    ],
    practice: {
      hint: "Completa la pregunta con la partícula WH- adecuada según la respuesta.",
      exercises: [
        {
          id: "w1",
          type: "fill",
          prompt: "Completa la pregunta:",
          sentence: "______ is your backpack? — It is on the table.",
          blanks: [{ accepts: ["where"] }],
          explanation: "Pregunta por una ubicación o coordenadas espaciales: where.",
        },
        {
          id: "w2",
          type: "fill",
          prompt: "Completa la pregunta:",
          sentence:
            "______ of these two markers do you want, the red one or the blue one? — The red one.",
          blanks: [{ accepts: ["which"] }],
          explanation: "Elección acotada entre dos opciones delimitadas: which.",
        },
        {
          id: "w3",
          type: "fill",
          prompt: "Completa la pregunta:",
          sentence: "______ car is this? — It is Mary's car.",
          blanks: [{ accepts: ["whose"] }],
          explanation: "Indaga sobre la propiedad del vehículo: whose.",
        },
        {
          id: "w4",
          type: "choice",
          prompt: "¿Cuál es la respuesta correcta a 'Why do you want to learn English?':",
          options: ["Because it opens doors.", "It is on Monday.", "It is under the table.", "Scream."],
          answer: 0,
          explanation: "Why pregunta el motivo. La respuesta comienza obligatoriamente con Because.",
        },
        {
          id: "w5",
          type: "fill",
          prompt: "Completa la pregunta:",
          sentence: "______ is your final exam? — It is on Monday.",
          blanks: [{ accepts: ["when"] }],
          explanation: "La respuesta indica un momento temporal (on Monday), por lo que la partícula es When.",
        },
      ],
    },
  },

  // =============================================================
  // 5 · Adverbios de frecuencia
  // =============================================================
  {
    id: "frequency-adverbs",
    num: 5,
    title: "Adverbios de frecuencia",
    tagline: "always → never",
    intro:
      "Modifican al verbo indicando qué tan seguido ocurre una acción, en una escala del 100 % al 0 %.",
    theory: [
      {
        type: "table",
        caption: "La escala de frecuencia",
        head: ["%", "Adverbio", "Español", "Nota"],
        rows: [
          ["100 %", "always", "siempre", "ocurrencia continua"],
          ["~90 %", "constantly", "constantemente", "frecuencia casi permanente"],
          ["~80 %", "usually / normally", "usualmente", "condiciones normales"],
          ["~70 %", "frequently", "frecuentemente", ""],
          ["~60 %", "often", "a menudo", "🎧 la t es muda: /ɒfən/"],
          ["~50 %", "sometimes", "a veces", "flexible: puede abrir o cerrar la frase"],
          ["~20 %", "rarely", "rara vez", ""],
          ["~15 %", "seldom", "rara vez / casi nunca", "registro más formal"],
          ["~10 %", "hardly ever", "casi nunca", ""],
          ["0 %", "never", "nunca", "jamás al inicio de la frase"],
        ],
      },
      {
        type: "list",
        title: "Dónde se coloca",
        items: [
          "Antes del verbo principal: <em lang=\"en\">I never go to the beach.</em>",
          "Después del verbo to be: <em lang=\"en\">She is always happy.</em>",
          "Entre auxiliar y verbo principal: <em lang=\"en\">I don't usually eat late.</em>",
          "Sometimes / usually pueden abrir o cerrar la frase; always y never jamás la abren.",
        ],
      },
    ],
    practice: {
      hint: "Ordena las palabras en su posición sintáctica correcta.",
      exercises: [
        {
          id: "f1",
          type: "order",
          prompt: "Ordena la frase:",
          words: ["late", "is", "always", "He"],
          solution: [3, 1, 2, 0],
          accepts: ["he is always late"],
          explanation: "El adverbio always va inmediatamente después del verbo to be (is).",
        },
        {
          id: "f2",
          type: "order",
          prompt: "Ordena la frase:",
          words: ["go", "never", "We", "to the gym"],
          solution: [2, 1, 0, 3],
          accepts: ["we never go to the gym"],
          explanation: "El adverbio never precede al verbo principal (go).",
        },
        {
          id: "f3",
          type: "order",
          prompt: "Ordena la frase:",
          words: ["eat", "don't", "usually", "late", "I"],
          solution: [4, 1, 2, 0, 3],
          accepts: ["i don't usually eat late"],
          explanation: "Usually se ubica entre el auxiliar don't y el verbo principal eat.",
        },
        {
          id: "f4",
          type: "order",
          prompt: "Ordena la frase:",
          words: ["drink", "always", "I", "coffee", "in the morning"],
          solution: [2, 1, 0, 3, 4],
          accepts: ["i always drink coffee in the morning"],
          explanation: "Always precede al verbo principal drink.",
        },
        {
          id: "f5",
          type: "order",
          prompt: "Ordena la frase:",
          words: ["is", "She", "usually", "happy"],
          solution: [1, 0, 2, 3],
          accepts: ["she is usually happy"],
          explanation: "Usually va después del verbo to be (is).",
        },
      ],
    },
  },

  // =============================================================
  // 6 · Fechas y años
  // =============================================================
  {
    id: "dates-and-years",
    num: 6,
    title: "Fechas y años",
    tagline: "2nd of December · nineteen ninety-six",
    intro:
      "El inglés difiere entre la convención de EE. UU. y del Reino Unido al escribir y pronunciar fechas y años.",
    theory: [
      {
        type: "table",
        caption: "Fechas: estilo USA vs. UK",
        head: ["Criterio", "EE. UU.", "Reino Unido"],
        rows: [
          ["Orden", "Mes / Día / Año", "Día / Mes / Año"],
          ["Escritura", "December 2nd, 2024", "2nd December 2024"],
          ["Numérico", "12/02/2024", "02/12/2024"],
          ["Lectura", "December second, twenty twenty-four", "The second of December, twenty twenty-four"],
        ],
      },
      {
        type: "note",
        html: "Regla de oro: el día del mes siempre se pronuncia con un ordinal (first, second, third…), jamás con un cardinal (one, two, three).",
      },
      {
        type: "list",
        title: "Cómo se leen los años",
        items: [
          "Regla general (bloques de dos dígitos): 1996 → <em lang=\"en\">nineteen ninety-six</em>.",
          "Terminados en 00: par + hundred. 1800 → <em lang=\"en\">eighteen hundred</em>.",
          "2001–2009: two thousand + número, o cero como «oh» (twenty-oh-one).",
          "Desde 2010: bloques o completa (twenty twenty-four / two thousand twenty-four).",
          "Cero intermedio: se lee como la letra 'oh'. 1903 → <em lang=\"en\">nineteen oh three</em>.",
        ],
      },
    ],
    practice: {
      hint: "Escribe la transcripción hablada exacta (en inglés).",
      exercises: [
        {
          id: "y1",
          type: "fill",
          prompt: "¿Cómo se lee el año 1912?",
          blanks: [{ accepts: ["nineteen twelve"] }],
          explanation: "División en dos bloques de dos dígitos: 19 (nineteen) + 12 (twelve).",
        },
        {
          id: "y2",
          type: "fill",
          prompt: "¿Cómo se lee la fecha UK 02/12/2024?",
          blanks: [
            {
              accepts: [
                "the second of december, twenty twenty-four",
                "the second of december twenty twenty-four",
              ],
            },
          ],
          explanation:
            "Ordinal obligatorio para el día (second) y el orden UK: día / mes / año.",
        },
        {
          id: "y3",
          type: "fill",
          prompt: "¿Cómo se lee el año 1800?",
          blanks: [{ accepts: ["eighteen hundred"] }],
          explanation: "Por terminar en 00: primer bloque (eighteen) + hundred.",
        },
        {
          id: "y4",
          type: "fill",
          prompt: "¿Cómo se lee el año 1996?",
          blanks: [{ accepts: ["nineteen ninety-six"] }],
          explanation: "División en dos bloques de dos dígitos: 19 (nineteen) + 96 (ninety-six).",
        },
        {
          id: "y5",
          type: "fill",
          prompt: "¿Cómo se lee el año 1903?",
          blanks: [{ accepts: ["nineteen oh three"] }],
          explanation: "El cero intermedio se pronuncia como la letra 'oh': 19 (nineteen) + oh + 3 (three).",
        },
      ],
    },
  },

  // =============================================================
  // 7 · Past Simple
  // =============================================================
  {
    id: "past-simple",
    num: 7,
    title: "Past Simple",
    tagline: "yesterday · last night · ago",
    intro:
      "La estructura narrativa por excelencia para relatar eventos concluidos en un punto cerrado del pasado.",
    theory: [
      {
        type: "list",
        title: "¿Cuándo lo usamos?",
        items: [
          "Acciones completadas: <em lang=\"en\">I bought a car yesterday.</em>",
          "Secuenciar historias: <em lang=\"en\">Once upon a time…</em>",
          "Hábitos pasados que ya no ocurren: <em lang=\"en\">I had coffee every day.</em>",
        ],
      },
      {
        type: "list",
        title: "Verbos regulares (-ed)",
        items: [
          "Regla general: work → worked.",
          "Terminados en -e: solo -d → dance → danced.",
          "Consonante + -y: -ied → try → tried.",
          "Terminados en -c: -ked → panic → panicked.",
          "US vs. UK: traveled (US) / travelled (UK).",
        ],
      },
      {
        type: "table",
        caption: "Verbos irregulares por patrón",
        head: ["Patrón", "Base → Past", "Ejemplos"],
        rows: [
          ["2ª y 3ª forma idénticas", "have → had", "have/had · make/made · sleep/slept · get/got"],
          ["Vocálico I → A → U", "drink → drank", "drink/drank/drunk · sing/sang/sung · swim/swam/swum"],
          ["Transformaciones únicas", "go → went", "be/was·were · do/did · eat/ate · drive/drove"],
          ["Invariables", "put → put", "put · cut"],
        ],
      },
      {
        type: "p",
        html:
          "Negativa: <em lang=\"en\">I didn't eat pizza.</em> · Interrogativa: <em lang=\"en\">Did you call me?</em> El auxiliar <strong>did</strong> es el verbo bombero del pasado: absorbe el tiempo y el verbo principal vuelve a su base (nunca «didn't ate»).",
      },
      {
        type: "note",
        html: "⚠️ Excepción de oro: to Be jamás usa did. Negativo: wasn't / weren't. Interrogativo: Was she…? / Were you…?",
      },
      {
        type: "note",
        html: "🎧 El verbo <em lang='en'>read</em> tiene la misma ortografía en presente y pasado, pero diferente pronunciación: presente /riːd/ (rima con 'feed') vs pasado /rɛd/ (idéntico al color 'red').",
      },
      {
        type: "note",
        html: "🌍 Diferencia dialectal: <em lang='en'>got</em> (UK) vs <em lang='en'>gotten</em> (US) como participio de <em lang='en'>get</em>.",
      },
    ],
    practice: {
      hint: "Convierte los verbos entre paréntesis al Past Simple.",
      exercises: [
        {
          id: "s1",
          type: "fill",
          prompt: "Completa la oración:",
          sentence: "Yesterday, I ______ (go) to the bakery and ______ (buy) some bread.",
          blanks: [
            { accepts: ["went"] },
            { accepts: ["bought"] },
          ],
          explanation: "went y bought son las formas irregulares de go y buy en afirmativo.",
        },
        {
          id: "s2",
          type: "fill",
          prompt: "Completa la oración:",
          sentence: "She ______ (not / sleep) well last night.",
          blanks: [{ accepts: ["didn't sleep", "did not sleep"] }],
          explanation: "El auxiliar didn't absorbe el pasado; sleep se mantiene en forma base.",
        },
        {
          id: "s3",
          type: "fill",
          prompt: "Completa la pregunta:",
          sentence: "______ you ______ (watch) the movie yesterday?",
          blanks: [
            { accepts: ["did"] },
            { accepts: ["watch"] },
          ],
          explanation: "Estructura interrogativa: auxiliar Did + verbo en forma base (watch).",
        },
        {
          id: "s4",
          type: "fill",
          prompt: "Completa la oración:",
          sentence: "They ______ (be) very happy at the party.",
          blanks: [{ accepts: ["were"] }],
          explanation: "Excepción de to Be: con el sujeto plural they usa were.",
        },
        {
          id: "s5",
          type: "transform",
          prompt: "Forma la negativa:",
          sentence: "You called yesterday.",
          accepts: ["you didn't call yesterday", "you did not call yesterday"],
          explanation: "didn't absorbe el pasado; call vuelve a la forma base.",
        },
        {
          id: "s6",
          type: "transform",
          prompt: "Forma la interrogativa:",
          sentence: "You called yesterday.",
          accepts: ["did you call yesterday"],
          explanation: "Auxiliar Did + sujeto + verbo base.",
        },
        {
          id: "s7",
          type: "transform",
          prompt: "Forma la negativa:",
          sentence: "She bought a car.",
          accepts: ["she didn't buy a car", "she did not buy a car"],
          explanation: "buy es el infinitivo base; bought (pasado irregular) no aparece con didn't.",
        },
        {
          id: "s8",
          type: "transform",
          prompt: "Forma la interrogativa:",
          sentence: "She bought a car.",
          accepts: ["did she buy a car"],
          explanation: "Did + sujeto + buy (forma base del irregular to buy).",
        },
      ],
    },
  },

  // =============================================================
  // 8 · Past Continuous
  // =============================================================
  {
    id: "past-continuous",
    num: 8,
    title: "Past Continuous",
    tagline: "was / were + -ing",
    intro:
      "Recrea el trasfondo del pasado: acciones que estaban en pleno progreso en un momento determinado.",
    theory: [
      {
        type: "p",
        html:
          "Fórmula: <strong>sujeto + was / were + verbo en -ing</strong>. Negativa: <em lang=\"en\">wasn't / weren't + verbo-ing</em>. Interrogativa: <em lang=\"en\">Was / Were + sujeto + verbo-ing?</em>",
      },
      {
        type: "table",
        caption: "Estructuras",
        head: ["Sujeto", "Afirmativo", "Negativo", "Interrogativo"],
        rows: [
          ["I / he / she / it", "I was listening.", "He wasn't sleeping.", "Was she eating?"],
          ["you / we / they", "We were running.", "They weren't reading.", "Were you listening?"],
        ],
      },
      {
        type: "note",
        html: "🎧 Tono: las formas sin contraer (was not / were not) suenan formales y de reprimenda — «You were not listening to me!»",
      },
      {
        type: "examples",
        title: "Past Simple + Past Continuous en narración",
        items: [
          { en: "I was running when you called.", es: "Estaba corriendo cuando llamaste. (PC = fondo; PS = interrupción)" },
          { en: "While she was cooking, the dog ate the food.", es: "Mientras ella cocinaba, el perro se comió la comida." },
        ],
      },
    ],
    practice: {
      hint: "Pasa cada oración del Present Continuous al Past Continuous.",
      exercises: [
        {
          id: "pc1",
          type: "transform",
          prompt: "Al Past Continuous:",
          sentence: "I am running in the park.",
          accepts: ["i was running in the park"],
          explanation: "El auxiliar de presente am cambia a su forma de pasado: was.",
        },
        {
          id: "pc2",
          type: "transform",
          prompt: "Al Past Continuous:",
          sentence: "They aren't working today.",
          accepts: ["they weren't working today"],
          explanation: "El auxiliar negativo aren't pasa a weren't.",
        },
        {
          id: "pc3",
          type: "transform",
          prompt: "Al Past Continuous:",
          sentence: "Is he studying for the exam?",
          accepts: ["was he studying for the exam"],
          explanation: "Inversión interrogativa con el auxiliar en pasado: was.",
        },
        {
          id: "pc4",
          type: "fill",
          prompt: "Completa la oración:",
          sentence: "I ______ (listen) to the teacher when the phone rang.",
          blanks: [{ accepts: ["was listening"] }],
          explanation: "Acción en progreso (PC) interrumpida por el teléfono (PS).",
        },
        {
          id: "pc5",
          type: "fill",
          prompt: "Completa la oración:",
          sentence: "They ______ (run) in the park yesterday afternoon.",
          blanks: [{ accepts: ["were running"] }],
          explanation: "Sujeto plural They + were + verbo-ing.",
        },
      ],
    },
  },

  // =============================================================
  // 9 · Vocabulario clave
  // =============================================================
  {
    id: "vocabulary",
    num: 9,
    title: "Vocabulario clave",
    tagline: "make vs. do · city · nature · school",
    intro:
      "Léxico temático esencial. Para expresar aficiones se usa: sujeto + like / love / hate + verbo-ing o to + verbo (I love reading).",
    theory: [
      {
        type: "note",
        html: "🥪 Malestar de estómago (stomachache)? Recuerda la dieta BRAT: Banana, Rice, Apple, Toast.",
      },
      {
        type: "note",
        html: "☕ Café (kæfeɪ) = el local. Coffee (kɒfi) = la bebida. Coffee shop = la tienda, preferido en EE. UU. y UK.",
      },
      {
        type: "note",
        html: "📚 Falso amigo: library = biblioteca (préstamo de libros). La librería de venta es bookstore.",
      },
      {
        type: "table",
        caption: "Make vs. Do",
        head: ["Verbo", "Concepto clave", "Ejemplos típicos"],
        rows: [
          [
            "make",
            "crear algo tangible que antes no existía",
            "make a cake · make your bed · make a mistake",
          ],
          [
            "do",
            "ejecutar una tarea o rutina sin fabricar un objeto",
            "do homework · do pilates · do the dishes",
          ],
        ],
      },
      {
        type: "p",
        html: "Usa las tarjetas de abajo para repasar el léxico de las cuatro categorías. Al terminar cada mazo, pasa a la siguiente.",
      },
      {
        type: "tip",
        html: "⚠️ <em lang='en'>Homework</em> es un sustantivo <strong>incontable</strong>: no existe <em lang='en'>homeworks</em>. Siempre: <em lang='en'>do my homework</em> (nunca <em lang='en'>make my homework</em>).",
      },
    ],
    flash: {
      decks: [
        {
          title: "Aficiones",
          items: [
            { en: "singing", es: "cantar" },
            { en: "playing chess", es: "jugar al ajedrez" },
            { en: "running", es: "correr" },
            { en: "fishing", es: "pescar" },
            { en: "cooking", es: "cocinar" },
            { en: "sailing", es: "navegar" },
            { en: "swimming", es: "nadar" },
            { en: "riding a bike", es: "montar en bici" },
            { en: "riding a horse", es: "montar a caballo" },
            { en: "traveling", es: "viajar" },
            { en: "hiking", es: "senderismo / pasear por el campo" },
            { en: "reading", es: "leer" },
            { en: "playing tennis", es: "jugar al tenis" },
            { en: "basketball", es: "baloncesto" },
            { en: "cycling", es: "ciclismo" },
            { en: "playing board games", es: "jugar a juegos de mesa" },
          ],
        },
        {
          title: "La ciudad",
          items: [
            { en: "store / shop", es: "tienda (store suele ser más grande)" },
            { en: "supermarket", es: "supermercado" },
            { en: "restaurant", es: "restaurante" },
            { en: "park", es: "parque" },
            { en: "bank", es: "banco" },
            { en: "hospital", es: "hospital" },
            { en: "pharmacy / drugstore", es: "farmacia" },
            { en: "library", es: "biblioteca (¡falso amigo!)" },
            { en: "bookstore", es: "librería (tienda de libros)" },
            { en: "church", es: "iglesia" },
            { en: "bakery", es: "panadería" },
            { en: "café", es: "cafetería (el local)" },
          ],
        },
        {
          title: "Naturaleza",
          items: [
            { en: "tree", es: "árbol" },
            { en: "flower", es: "flor" },
            { en: "lake", es: "lago" },
            { en: "river", es: "río" },
            { en: "beach", es: "playa" },
            { en: "forest", es: "bosque" },
            { en: "rock", es: "roca" },
            { en: "hill", es: "colina / montañita" },
            { en: "mountain", es: "montaña" },
            { en: "creek", es: "arroyo" },
            { en: "waterfall", es: "cascada" },
          ],
        },
        {
          title: "Escuela",
          items: [
            { en: "learn", es: "aprender" },
            { en: "study", es: "estudiar" },
            { en: "practice", es: "practicar" },
            { en: "complete", es: "completar" },
            { en: "finish", es: "terminar" },
            { en: "listen", es: "escuchar" },
            { en: "paint / draw", es: "pintar / dibujar" },
            { en: "speak up", es: "hablar más alto" },
            { en: "understand", es: "entender" },
            { en: "repeat", es: "repetir" },
            { en: "memorize", es: "memorizar" },
            { en: "fail", es: "suspender / fallar" },
            { en: "cheat sheet", es: "chuleta / guía de referencia" },
            { en: "write", es: "escribir" },
            { en: "speak", es: "hablar" },
            { en: "present", es: "presentar" },
            { en: "fill the gaps", es: "rellenar los huecos" },
            { en: "correct", es: "corregir" },
            { en: "ask", es: "preguntar" },
            { en: "solve", es: "resolver" },
            { en: "add", es: "añadir" },
          ],
        },
      ],
    },
    practice: {
      hint: "Elige el verbo correcto (make o do) en cada caso.",
      exercises: [
        {
          id: "v1",
          type: "choice",
          prompt: "«Hacer la cama»:",
          options: ["make your bed", "do your bed"],
          answer: 0,
          explanation: "Make: preparas/creas algo con tus manos (una cama hecha).",
        },
        {
          id: "v2",
          type: "choice",
          prompt: "«Fregar los platos»:",
          options: ["make the dishes", "do the dishes"],
          answer: 1,
          explanation: "Do: ejecutas una tarea rutinaria sin fabricar un objeto nuevo.",
        },
        {
          id: "v3",
          type: "choice",
          prompt: "«Cometer un error»:",
          options: ["make a mistake", "do a mistake"],
          answer: 0,
          explanation: "Colocación fija: make a mistake (el error «nace» de tu acción).",
        },
        {
          id: "v4",
          type: "choice",
          prompt: "«Hacer los deberes»:",
          options: ["do homework", "make homework"],
          answer: 0,
          explanation: "Colocación fija: do homework (es una tarea, no un objeto que se fabrica).",
        },
        {
          id: "v5",
          type: "choice",
          prompt: "Traduce: 'Me gusta leer y cantar':",
          options: ["I like reading and singing.", "I like to read and to singing.", "I likes reading and singing."],
          answer: 0,
          explanation: "like + gerundio (-ing) es la forma más natural. I like reading and singing.",
        },
        {
          id: "v6",
          type: "choice",
          prompt: "Traduce: 'Odio jugar al ajedrez':",
          options: ["I hate playing chess.", "I hate to play chess.", "I am hating chess."],
          answer: 0,
          explanation: "hate + gerundio: I hate playing chess. (Ambas son correctas, pero la primera es la más natural.)",
        },
        {
          id: "v7",
          type: "choice",
          prompt: "Traduce: 'Quiero viajar':",
          options: ["I want to travel.", "I want traveling.", "I want travel."],
          answer: 0,
          explanation: "want siempre va seguido de infinitivo con to: I want to travel.",
        },
      ],
    },
  },

  // =============================================================
  // 10 · Autoevaluación final
  // =============================================================
  {
    id: "final-test",
    num: 10,
    title: "Autoevaluación I",
    tagline: "unidades 1–9 · gramática básica",
    intro:
      "Texto integrador: elige la opción gramatical y léxica correcta para cada hueco. Cada hueco cuenta un punto.",
    theory: [
      {
        type: "p",
        html:
          "Lee el texto completo antes de responder. Los disparadores (Look!, yesterday, right now) te dicen qué herramienta gramatical usar.",
      },
    ],
    practice: {
      hint: "Selecciona la opción correcta en cada hueco y pulsa «Comprobar todo».",
      exercises: [
        {
          id: "final",
          type: "cloze",
          prompt: "Completa el texto:",
          sentence: [
            "Hello! Look at ",
            { __blank: 0 },
            " markers on my desk; I use them to study every day. I ",
            { __blank: 1 },
            " study in the morning because I love learning. Yesterday, I ",
            { __blank: 2 },
            " to the public ",
            { __blank: 3 },
            " to borrow a book, but it was closed. Right now, I ",
            { __blank: 4 },
            " my English homework. My brother is in the kitchen; he is ",
            { __blank: 5 },
            " dinner for us. The path goes over a small ",
            { __blank: 6 },
            ", not a full mountain. I ",
            { __blank: 7 },
            " go to the beach in summer.",
          ],
          blanks: [
            { index: 0, options: ["these", "this"], answer: 0, explanation: "Plural de cercanía (these) para concordar con markers (plural)." },
            { index: 1, options: ["always", "never"], answer: 0, explanation: "always = 100% de frecuencia; va antes del verbo principal." },
            { index: 2, options: ["go", "went"], answer: 1, explanation: "Marcador yesterday exige Past Simple del irregular go → went." },
            { index: 3, options: ["library", "bookstore"], answer: 0, explanation: "library = biblioteca de préstamo; bookstore = tienda de venta." },
            { index: 4, options: ["am doing", "am making"], answer: 0, explanation: "Present Continuous (right now) + do homework (colocación fija)." },
            { index: 5, options: ["cooking", "cook"], answer: 0, explanation: "Gerundio (-ing) obligatorio tras is en Present Continuous." },
            { index: 6, options: ["hill", "mountain"], answer: 0, explanation: "hill = colina (menor, pendiente suave); mountain = montaña (elevada y empinada)." },
            { index: 7, options: ["often", "oftten"], answer: 0, explanation: "La t de often es muda: /ˈɒf.ən/. Ortografía correcta: often." },
          ],
        },
      ],
    },
  },

  // =============================================================
  // 11 · Pronombres y adjetivos posesivos
  // =============================================================
  {
    id: "pronouns",
    num: 11,
    title: "Pronombres y adjetivos posesivos",
    tagline: "I / me · my / mine · he / him · his",
    intro: "Los pronombres sustituyen a los sustantivos para evitar repeticiones. Los adjetivos posesivos acompañan a un sustantivo; los pronombres posesivos lo sustituyen.",
    theory: [
      {
        type: "table",
        caption: "Pronombres sujeto y objeto",
        head: ["Persona", "Sujeto", "Objeto", "Ejemplo"],
        rows: [
          ["1ª sing.", "I", "me", "She called me."],
          ["2ª sing./pl.", "you", "you", "I love you."],
          ["3ª sing. masc.", "he", "him", "I saw him."],
          ["3ª sing. fem.", "she", "her", "Tell her."],
          ["3ª sing. neutro", "it", "it", "I lost it."],
          ["1ª pl.", "we", "us", "Join us!"],
          ["3ª pl.", "they", "them", "Help them."],
        ],
      },
      {
        type: "table",
        caption: "Adjetivos y pronombres posesivos",
        head: ["Persona", "Adjetivo posesivo", "Pronombre posesivo"],
        rows: [
          ["I", "my", "mine"],
          ["you", "your", "yours"],
          ["he", "his", "his"],
          ["she", "her", "hers"],
          ["it", "its", "—"],
          ["we", "our", "ours"],
          ["they", "their", "theirs"],
        ],
      },
      {
        type: "tip",
        html: "💡 Los <strong>adjetivos posesivos</strong> van siempre antes de un sustantivo (<em lang='en'>my book</em>). Los <strong>pronombres posesivos</strong> van solos (<em lang='en'>That book is mine</em>). Nunca digas <em lang='en'>mines</em> ni <em lang='en'>yours's</em>.",
      },
      {
        type: "note",
        html: "🔴 Diferencia clave: <em lang='en'>its</em> (de él/ella para cosas) vs <em lang='en'>it's</em> (contracción de <em lang='en'>it is</em>). Son escritura diferente, misma pronunciación.",
      },
    ],
    practice: {
      hint: "Elige el pronombre o posesivo correcto.",
      exercises: [
        { id: "pr1", type: "fill", prompt: "Completa con el pronombre correcto:", sentence: "______ name is María and ______ is from Spain.", blanks: [{ accepts: ["her"] }, { accepts: ["she"] }], explanation: "Her name (adjetivo posesivo antes del sustantivo) + She is (pronombre sujeto)." },
        { id: "pr2", type: "choice", prompt: "'Can you help ______ ? (a mí)':", options: ["me", "I", "my", "mine"], answer: 0, explanation: "Tras el verbo, se necesita pronombre objeto: me." },
        { id: "pr3", type: "choice", prompt: "'This is ______ car. (de ellos)':", options: ["their", "they", "theirs", "them"], answer: 0, explanation: "Antes del sustantivo car se usa el adjetivo posesivo their." },
        { id: "pr4", type: "choice", prompt: "'That bag is ______ . (de ella)':", options: ["hers", "her", "she", "him"], answer: 0, explanation: "Sin sustantivo después, se usa el pronombre posesivo hers." },
      ],
    },
  },

  // =============================================================
  // 12 · Sustantivos y plurales
  // =============================================================
  {
    id: "nouns",
    num: 12,
    title: "Sustantivos y plurales",
    tagline: "child / children · countable / uncountable",
    intro: "Los sustantivos contables tienen singular y plural. Los incontables no admiten plural ni artículo indefinido (a/an). El inglés tiene muchos plurales irregulares que hay que memorizar.",
    theory: [
      {
        type: "list",
        title: "Sustantivos incontables comunes",
        items: [
          "<strong>Información y comunicación:</strong> <em lang='en'>information, advice, news, research</em>",
          "<strong>Materias y sustancias:</strong> <em lang='en'>water, music, money, rice, bread</em>",
          "<strong>Conceptos abstractos:</strong> <em lang='en'>love, happiness, knowledge, homework</em>",
          "Regla: nunca llevan <em lang='en'>a/an</em> ni plural. Usa <em lang='en'>some</em> para cantidad indefinida: <em lang='en'>some information</em>.",
        ],
      },
      {
        type: "table",
        caption: "Plurales irregulares",
        head: ["Singular", "Plural", "Singular", "Plural"],
        rows: [
          ["child", "children", "man", "men"],
          ["woman", "women", "mouse", "mice"],
          ["foot", "feet", "tooth", "teeth"],
          ["person", "people", "fish", "fish"],
          ["sheep", "sheep", "ox", "oxen"],
        ],
      },
      {
        type: "tip",
        html: "💡 <em lang='en'>People</em> es ya plural en inglés. No se dice <em lang='en'>peoples</em> (excepto para referirse a 'pueblos' en sentido etnográfico). <em lang='en'>There are many people here.</em>",
      },
    ],
    practice: {
      hint: "Completa con la forma correcta del plural.",
      exercises: [
        { id: "n1", type: "fill", prompt: "Completa la oración:", sentence: "The ______ (child) are playing in the park.", blanks: [{ accepts: ["children"] }], explanation: "El plural irregular de child es children." },
        { id: "n2", type: "fill", prompt: "Completa con el incontable correcto:", sentence: "I need some ______ (información). Can you help me?", blanks: [{ accepts: ["information"] }], explanation: "Information es incontable: nunca informations." },
        { id: "n3", type: "choice", prompt: "¿Cuál es el plural correcto de tooth?", options: ["tooths", "teeth", "teeths", "toothes"], answer: 1, explanation: "Plural irregular: tooth → teeth (cambio vocálico)." },
        { id: "n4", type: "transform", prompt: "Pon en plural:", sentence: "One man is here.", accepts: ["two men are here", "some men are here", "the men are here", "men are here"], explanation: "El plural de man es men; el verbo is cambia a are." },
      ],
    },
  },

  // =============================================================
  // 13 · Artículos (a, an, the)
  // =============================================================
  {
    id: "articles",
    num: 13,
    title: "Artículos (a, an, the)",
    tagline: "a dog · an hour · the sun",
    intro: "El inglés tiene dos artículos: indefinido (a/an) y definido (the). La elección depende del contexto y del sonido inicial de la palabra, no de la letra.",
    theory: [
      {
        type: "p",
        html: "<strong>a / an</strong> — artículo indefinido (cualquier elemento de su clase). La regla es fonética: <em lang='en'>a</em> antes de sonido consonántico, <em lang='en'>an</em> antes de sonido vocálico (lo que importa es el sonido, no la letra).",
      },
      {
        type: "table",
        caption: "a vs an — el sonido, no la letra",
        head: ["a (sonido consonántico)", "an (sonido vocálico)"],
        rows: [
          ["a cat, a university /juː/", "an apple, an hour /aʊ/"],
          ["a European /juː/", "an umbrella"],
          ["a hotel (US)", "an honest /ɒn/ person"],
        ],
      },
      {
        type: "list",
        title: "Cuándo usar the",
        items: [
          "Referencia específica ya mencionada: <em lang='en'>I saw a dog. The dog was barking.</em>",
          "Elemento único en el mundo: <em lang='en'>the sun, the Moon, the Internet</em>",
          "Instrumentos musicales: <em lang='en'>She plays the piano.</em>",
          "Superlativo: <em lang='en'>the best, the most beautiful</em>",
        ],
      },
      {
        type: "list",
        title: "Cuándo NO usar artículo",
        items: [
          "Sustantivos propios: <em lang='en'>I live in Spain.</em> (no <em lang='en'>the Spain</em>)",
          "Sustantivos incontables en sentido general: <em lang='en'>I like music.</em>",
          "Plurales en sentido general: <em lang='en'>Dogs are loyal animals.</em>",
          "Profesiones con <em lang='en'>be</em>: <em lang='en'>She is a doctor.</em> (con artículo indefinido)",
        ],
      },
      {
        type: "tip",
        html: "💡 <em lang='en'>I like music</em> (en general, sin artículo) vs <em lang='en'>I like the music in this film</em> (específica). El artículo <em lang='en'>the</em> indica que tanto el hablante como el oyente saben exactamente de qué se habla.",
      },
    ],
    practice: {
      hint: "Elige el artículo correcto o indica que no se necesita.",
      exercises: [
        { id: "art1", type: "fill", prompt: "Completa la oración:", sentence: "She is ______ nurse. She works at ______ big hospital.", blanks: [{ accepts: ["a"] }, { accepts: ["a"] }], explanation: "Nurse empieza con sonido consonántico /n/ → a nurse. Hospital empieza con sonido consonántico /h/ → a hospital." },
        { id: "art2", type: "fill", prompt: "Completa la oración:", sentence: "______ sun rises in the east.", blanks: [{ accepts: ["the"] }], explanation: "The sun: solo existe un sol; referencia única en el mundo." },
        { id: "art3", type: "choice", prompt: "Completa: 'I drink ______ coffee every morning':", options: ["—  (sin artículo)", "a", "the", "an"], answer: 0, explanation: "Coffee en sentido general (no una taza específica): sin artículo." },
        { id: "art4", type: "choice", prompt: "¿Cuál es correcta?", options: ["She is an university student.", "She is a university student."], answer: 1, explanation: "University empieza con sonido /juː/ (consonántico) → a university." },
      ],
    },
  },

  // =============================================================
  // 14 · Genitivo sajón y posesión
  // =============================================================
  {
    id: "genitive",
    num: 14,
    title: "Genitivo sajón y posesión",
    tagline: "Mary's car · the legs of the table · Whose?",
    intro: "El inglés expresa la posesión añadiendo 's al poseedor (genitivo sajón) cuando es una persona o animal. Para objetos inanimados, suele preferirse la construcción con of.",
    theory: [
      {
        type: "p",
        html: "<strong>Genitivo sajón:</strong> Poseedor + 's + objeto poseído. <em lang='en'>Mary's car</em> (el coche de Mary). <em lang='en'>The dog's bone</em> (el hueso del perro).",
      },
      {
        type: "list",
        title: "Reglas del genitivo",
        items: [
          "Singular: + 's → <em lang='en'>James's book</em> o <em lang='en'>James' book</em> (ambas aceptadas).",
          "Plural terminado en -s: solo apóstrofo → <em lang='en'>the students' books</em>.",
          "Plural irregular: + 's → <em lang='en'>the children's room</em>, <em lang='en'>the men's team</em>.",
        ],
      },
      {
        type: "p",
        html: "<strong>Posesión con of:</strong> Se prefiere para objetos inanimados o cuando el poseedor es una frase larga. <em lang='en'>The capital of France</em>. <em lang='en'>The end of the story</em>.",
      },
      {
        type: "table",
        caption: "Genitivo vs of",
        head: ["Situación", "Genitivo 's", "of"],
        rows: [
          ["Personas/animales", "Mary's idea ✓", "the idea of Mary (menos natural)"],
          ["Objetos", "the car's door (informal)", "the door of the car ✓"],
          ["Organizaciones", "the company's policy ✓", "the policy of the company ✓"],
        ],
      },
      {
        type: "note",
        html: "❓ Para preguntar por el poseedor: <em lang='en'>Whose + verbo + sujeto?</em> → <em lang='en'>Whose bag is this? — It is Mary's.</em>",
      },
    ],
    practice: {
      hint: "Expresa la posesión de la forma indicada.",
      exercises: [
        { id: "gen1", type: "transform", prompt: "Usa el genitivo sajón:", sentence: "The book belongs to James.", accepts: ["it is james's book", "it is james' book", "james's book", "james' book"], explanation: "Singular propio: James's book o James' book (ambas correctas)." },
        { id: "gen2", type: "fill", prompt: "Completa la pregunta:", sentence: "______ are these keys? — They are Tom's.", blanks: [{ accepts: ["whose"] }], explanation: "Whose pregunta por el poseedor de las llaves." },
        { id: "gen3", type: "choice", prompt: "¿Cuál es correcta para 'la puerta del coche'?", options: ["the door of the car", "the door's car", "the car door's", "the car of door"], answer: 0, explanation: "Para objetos inanimados se prefiere la estructura of: the door of the car." },
        { id: "gen4", type: "fill", prompt: "Completa:", sentence: "This is the ______ (niños) room.", blanks: [{ accepts: ["children's"] }], explanation: "children es un plural irregular (no termina en -s), por lo que lleva 's completo." },
      ],
    },
  },

  // =============================================================
  // 15 · There is / There are e It impersonal
  // =============================================================
  {
    id: "there-is",
    num: 15,
    title: "There is / There are e It impersonal",
    tagline: "There is a café · It is raining · It is 3 o'clock",
    intro: "'There is / There are' introducen la existencia de algo. El pronombre impersonal 'It' se usa para el tiempo atmosférico, la hora, la temperatura, la distancia y otras expresiones sin sujeto lógico.",
    theory: [
      {
        type: "table",
        caption: "There is / There are",
        head: ["Estructura", "Uso", "Ejemplo"],
        rows: [
          ["There is (There's)", "Singular o incontable", "There is a park near here."],
          ["There are", "Plural", "There are two hospitals."],
          ["There isn't / There aren't", "Negativa", "There isn't a gym here."],
          ["Is there? / Are there?", "Interrogativa", "Is there a bus stop nearby?"],
        ],
      },
      {
        type: "table",
        caption: "It impersonal — usos",
        head: ["Uso", "Ejemplo"],
        rows: [
          ["Tiempo atmosférico", "It is sunny. / It's raining."],
          ["Hora", "It is half past three."],
          ["Temperatura", "It's 25 degrees."],
          ["Distancia", "It is 5 km from here."],
          ["Expresiones", "It is important to study."],
        ],
      },
      {
        type: "tip",
        html: "💡 No confundas <em lang='en'>there</em> (existencia) con <em lang='en'>they are</em>. <em lang='en'>There is a cat</em> ≠ <em lang='en'>They are cats</em>. Y recuerda: <em lang='en'>It</em> impersonal nunca tiene referente — no traduce a ningún sustantivo concreto.",
      },
    ],
    practice: {
      hint: "Completa con la expresión correcta de existencia o el pronombre impersonal.",
      exercises: [
        { id: "ti1", type: "fill", prompt: "Completa la oración:", sentence: "______ a supermarket near here?", blanks: [{ accepts: ["is there"] }], explanation: "Interrogativa de existencia singular: Is there + sustantivo singular?" },
        { id: "ti2", type: "fill", prompt: "Completa la oración:", sentence: "______ cloudy and cold today.", blanks: [{ accepts: ["it is", "it's"] }], explanation: "It impersonal para describir el tiempo atmosférico." },
        { id: "ti3", type: "choice", prompt: "Completa: '______ many students in the class':", options: ["There are", "There is", "It are", "They are"], answer: 0, explanation: "Many students es plural → There are." },
        { id: "ti4", type: "fill", prompt: "Completa la oración:", sentence: "______ 9:15.", blanks: [{ accepts: ["it is", "it's"] }], explanation: "It impersonal para expresar la hora: It is 9:15." },
      ],
    },
  },

  // =============================================================
  // 16 · Preposiciones de tiempo y lugar
  // =============================================================
  {
    id: "prepositions",
    num: 16,
    title: "Preposiciones de tiempo y lugar",
    tagline: "at 9:00 · on Monday · in July · under the table",
    intro: "Las preposiciones at, in y on se usan tanto para el tiempo como para el lugar, pero con reglas distintas. Memorizarlas en contexto es la clave.",
    theory: [
      {
        type: "table",
        caption: "At / In / On para el TIEMPO",
        head: ["Preposición", "Uso", "Ejemplos"],
        rows: [
          ["at", "Hora exacta, momentos del día específicos", "at 9:00, at noon, at midnight, at Christmas"],
          ["in", "Meses, años, siglos, estaciones, partes del día", "in July, in 2024, in winter, in the morning"],
          ["on", "Días de la semana y fechas concretas", "on Monday, on July 4th, on my birthday"],
        ],
      },
      {
        type: "table",
        caption: "At / In / On para el LUGAR",
        head: ["Preposición", "Uso", "Ejemplos"],
        rows: [
          ["at", "Punto exacto o lugar de actividad", "at the bus stop, at home, at work, at school"],
          ["in", "Interior de un espacio cerrado o área grande", "in the room, in London, in the car"],
          ["on", "Superficie", "on the table, on the wall, on the street"],
        ],
      },
      {
        type: "list",
        title: "Otras preposiciones de lugar esenciales",
        items: [
          "<em lang='en'>under</em> — debajo de: <em lang='en'>the cat is under the table</em>",
          "<em lang='en'>next to / beside</em> — al lado de",
          "<em lang='en'>between</em> — entre dos: <em lang='en'>between the chair and the desk</em>",
          "<em lang='en'>behind</em> — detrás de · <em lang='en'>in front of</em> — delante de",
          "<em lang='en'>opposite</em> — enfrente de · <em lang='en'>above / below</em> — encima / debajo",
        ],
      },
      {
        type: "note",
        html: "🔑 <em lang='en'>by</em> para tiempo = límite máximo (<em lang='en'>by Friday</em> = antes del viernes como límite). No confundir con <em lang='en'>until</em> (continuidad: <em lang='en'>I work until Friday</em>).",
      },
    ],
    practice: {
      hint: "Elige la preposición correcta.",
      exercises: [
        { id: "prep1", type: "fill", prompt: "Completa la oración:", sentence: "I was born ______ 1996 ______ a Tuesday ______ the morning.", blanks: [{ accepts: ["in"] }, { accepts: ["on"] }, { accepts: ["in"] }], explanation: "in + año, on + día de la semana, in + partes del día." },
        { id: "prep2", type: "fill", prompt: "Completa la oración:", sentence: "The keys are ______ the table, ______ the book.", blanks: [{ accepts: ["on"] }, { accepts: ["under"] }], explanation: "on the table (superficie) y under the book (debajo)." },
        { id: "prep3", type: "choice", prompt: "'We need to finish the project ______ Friday':", options: ["by", "on", "at", "in"], answer: 0, explanation: "by = límite temporal máximo (antes del viernes como máximo)." },
        { id: "prep4", type: "choice", prompt: "'She lives ______ a small apartment ______ the city centre':", options: ["in / in", "at / in", "in / at", "on / in"], answer: 0, explanation: "in a flat (interior) + in the city centre (área geográfica)." },
      ],
    },
  },

  // =============================================================
  // 17 · Orden de palabras y conjunciones
  // =============================================================
  {
    id: "word-order",
    num: 17,
    title: "Orden de palabras y conjunciones",
    tagline: "S + V + O + Place + Time · and · but · because",
    intro: "El inglés tiene un orden de palabras muy rígido. A diferencia del español, mover elementos de su posición suena incorrecto. Las conjunciones conectan ideas de manera lógica.",
    theory: [
      {
        type: "p",
        html: "<strong>Orden canónico:</strong> Sujeto + Verbo + Objeto + Lugar + Tiempo. Este orden es prácticamente invariable en inglés: <em lang='en'>She goes to the gym every Monday.</em>",
      },
      {
        type: "table",
        caption: "Conjunciones coordinantes (FANBOYS)",
        head: ["Conjunción", "Uso", "Ejemplo"],
        rows: [
          ["and", "Adición", "I like tea and coffee."],
          ["but", "Contraste", "It's cold but sunny."],
          ["or", "Alternativa", "Tea or coffee?"],
          ["so", "Consecuencia", "I was tired, so I went to bed."],
        ],
      },
      {
        type: "table",
        caption: "Conjunciones subordinantes esenciales",
        head: ["Conjunción", "Uso", "Ejemplo"],
        rows: [
          ["because", "Causa", "I study because I love English."],
          ["when", "Tiempo", "When I arrived, she left."],
          ["if", "Condición", "If it rains, we stay home."],
          ["although", "Concesión", "Although it rained, we went out."],
        ],
      },
      {
        type: "tip",
        html: "💡 <em lang='en'>Because</em> nunca abre una oración sola como respuesta. ✗ <em lang='en'>Because I like it.</em> ✓ <em lang='en'>I study English because I like it.</em> Sin embargo, en respuestas informales orales se acepta como fragmento.",
      },
    ],
    practice: {
      hint: "Ordena las palabras o completa con la conjunción correcta.",
      exercises: [
        { id: "wo1", type: "order", prompt: "Ordena la frase:", words: ["to the gym", "every morning", "goes", "She"], solution: [3, 2, 0, 1], accepts: ["she goes to the gym every morning"], explanation: "Orden: Sujeto (She) + Verbo (goes) + Lugar (to the gym) + Tiempo (every morning)." },
        { id: "wo2", type: "fill", prompt: "Elige la conjunción correcta:", sentence: "I like summer ______ I hate winter.", blanks: [{ accepts: ["but"] }], explanation: "but introduce un contraste entre dos ideas opuestas." },
        { id: "wo3", type: "fill", prompt: "Elige la conjunción correcta:", sentence: "She was tired ______ she went to bed early.", blanks: [{ accepts: ["so"] }], explanation: "so introduce una consecuencia de lo anterior." },
        { id: "wo4", type: "transform", prompt: "Une las dos frases con 'because':", sentence: "He is happy. / He got a new job.", accepts: ["he is happy because he got a new job", "because he got a new job, he is happy"], explanation: "because une causa y efecto: He is happy because he got a new job." },
      ],
    },
  },

  // =============================================================
  // 18 · Saludos, cortesía y despedidas
  // =============================================================
  {
    id: "greetings",
    num: 18,
    title: "Saludos, cortesía y despedidas",
    tagline: "Hello · Nice to meet you · Goodbye · Please",
    intro: "Las expresiones de saludo, cortesía y despedida son la base de cualquier conversación en inglés. Hay formas formales (para el trabajo, adultos desconocidos) e informales (amigos, compañeros).",
    theory: [
      {
        type: "table",
        caption: "Saludos: formal vs informal",
        head: ["Formal", "Informal", "Traducción"],
        rows: [
          ["Good morning", "Morning! / Hi!", "Buenos días / Hola"],
          ["Good afternoon", "Hey! / Yo!", "Buenas tardes"],
          ["Good evening", "Hey there!", "Buenas noches (al llegar)"],
          ["How do you do?", "How are you? / How's it going?", "¿Cómo está usted? / ¿Cómo estás?"],
          ["Nice to meet you.", "Good to meet you!", "Encantado/a de conocerte."],
        ],
      },
      {
        type: "table",
        caption: "Despedidas y cortesía",
        head: ["Expresión", "Contexto", "Traducción"],
        rows: [
          ["Goodbye / Farewell", "Formal", "Adiós"],
          ["Bye / See you!", "Informal", "Hasta luego"],
          ["See you later / tomorrow", "Informal", "Hasta luego / mañana"],
          ["Take care!", "Informal", "¡Cuídate!"],
          ["Please", "Universal", "Por favor"],
          ["Thank you / Thanks", "Universal", "Gracias"],
          ["You're welcome", "Respuesta", "De nada"],
          ["Sorry / Excuse me", "Disculpa / Perdona", "Lo siento / Perdone"],
        ],
      },
      {
        type: "note",
        html: "🔤 El abecedario inglés tiene 26 letras. Para deletrear tu nombre: <em lang='en'>How do you spell that? — M-A-R-I-A.</em> Vocales críticas: A /eɪ/, E /iː/, I /aɪ/, U /juː/.",
      },
    ],
    flash: {
      decks: [
        {
          title: "Saludos y despedidas",
          items: [
            { en: "Good morning", es: "Buenos días" },
            { en: "Good afternoon", es: "Buenas tardes" },
            { en: "Good evening", es: "Buenas noches (al llegar)" },
            { en: "Good night", es: "Buenas noches (al irse)" },
            { en: "How are you?", es: "¿Cómo estás?" },
            { en: "Nice to meet you", es: "Encantado/a de conocerte" },
            { en: "See you later", es: "Hasta luego" },
            { en: "Take care", es: "Cuídate" },
            { en: "You're welcome", es: "De nada" },
            { en: "Excuse me", es: "Perdona / Disculpe" },
          ],
        },
      ],
    },
    practice: {
      hint: "Elige la respuesta o expresión más adecuada para cada situación.",
      exercises: [
        { id: "gr1", type: "choice", prompt: "Tu jefe llega a la oficina a las 9 de la mañana. Tú dices:", options: ["Good morning!", "Good night!", "Hey yo!", "Bye!"], answer: 0, explanation: "Good morning es el saludo formal apropiado por la mañana." },
        { id: "gr2", type: "choice", prompt: "Alguien te da las gracias. Tú respondes:", options: ["You're welcome.", "Thank you.", "Sorry.", "Goodbye."], answer: 0, explanation: "You're welcome es la respuesta estándar a Thank you." },
        { id: "gr3", type: "choice", prompt: "Conoces a alguien por primera vez. Dices:", options: ["Nice to meet you.", "How do you do? (y esperas la misma respuesta)", "Ambas son correctas.", "See you later."], answer: 2, explanation: "Tanto Nice to meet you (informal/formal) como How do you do? (muy formal) son correctas al presentarse." },
      ],
    },
  },

  // =============================================================
  // 19 · Números cardinales y ordinales
  // =============================================================
  {
    id: "numbers",
    num: 19,
    title: "Números cardinales y ordinales",
    tagline: "twenty-one · first · second · third",
    intro: "Los cardinales expresan cantidad (one, two, three…). Los ordinales expresan posición o secuencia (first, second, third…) y son imprescindibles para leer fechas y pisos de edificios.",
    theory: [
      {
        type: "table",
        caption: "Cardinales: reglas de formación",
        head: ["Rango", "Regla", "Ejemplo"],
        rows: [
          ["13–19", "-teen", "thirteen, fourteen, fifteen"],
          ["20–90", "-ty", "twenty, thirty, forty (¡sin u!)"],
          ["21–99", "decena-guion-unidad", "twenty-one, forty-five"],
          ["100", "one hundred", "one hundred and thirty-two"],
          ["1000", "one thousand", "two thousand and five"],
        ],
      },
      {
        type: "table",
        caption: "Ordinales irregulares (1–10)",
        head: ["Cardinal", "Ordinal", "Cardinal", "Ordinal"],
        rows: [
          ["one", "first (1st)", "six", "sixth (6th)"],
          ["two", "second (2nd)", "seven", "seventh (7th)"],
          ["three", "third (3rd)", "eight", "eighth (8th)"],
          ["four", "fourth (4th)", "nine", "ninth (9th)"],
          ["five", "fifth (5th)", "ten", "tenth (10th)"],
        ],
      },
      {
        type: "note",
        html: "🏢 Los pisos de un edificio: el bajo es <em lang='en'>ground floor</em> (UK) / <em lang='en'>first floor</em> (US). El primer piso en España = <em lang='en'>second floor</em> (UK) / <em lang='en'>first floor</em> (US) dependiendo del estilo.",
      },
      {
        type: "tip",
        html: "💡 <em lang='en'>Forty</em> (40) se escribe sin 'u', a diferencia de <em lang='en'>four</em> (4). Error muy común: <em lang='en'>fourty</em> → ✗ | <em lang='en'>forty</em> → ✓",
      },
    ],
    flash: {
      decks: [
        {
          title: "Ordinales",
          items: [
            { en: "1st — first", es: "primero" },
            { en: "2nd — second", es: "segundo" },
            { en: "3rd — third", es: "tercero" },
            { en: "4th — fourth", es: "cuarto" },
            { en: "5th — fifth", es: "quinto" },
            { en: "8th — eighth", es: "octavo (sin -t extra)" },
            { en: "9th — ninth", es: "noveno (sin -e)" },
            { en: "12th — twelfth", es: "duodécimo (f → ft)" },
            { en: "20th — twentieth", es: "vigésimo (-y → ieth)" },
          ],
        },
      ],
    },
    practice: {
      hint: "Escribe el número cardinal u ordinal en palabras.",
      exercises: [
        { id: "num1", type: "fill", prompt: "Escribe en palabras el número 47:", blanks: [{ accepts: ["forty-seven"] }], explanation: "Forty (sin u) + guion + seven." },
        { id: "num2", type: "fill", prompt: "¿Cuál es el ordinal de 3?", blanks: [{ accepts: ["third"] }], explanation: "El ordinal de three es third (irregular)." },
        { id: "num3", type: "choice", prompt: "¿Cómo se dice 'el quinto piso' en UK English?", options: ["the fifth floor", "the five floor", "the fiveth floor", "the fifth ground"], answer: 0, explanation: "Ordinal de five es fifth (v → f + th)." },
        { id: "num4", type: "fill", prompt: "Escribe en palabras: 325", blanks: [{ accepts: ["three hundred and twenty-five"] }], explanation: "three hundred + and + twenty-five. El 'and' une la centena con el resto." },
      ],
    },
  },

  // =============================================================
  // 20 · Días, meses y estaciones
  // =============================================================
  {
    id: "days-months",
    num: 20,
    title: "Días, meses y estaciones",
    tagline: "Monday · January · spring · yesterday",
    intro: "En inglés, los días de la semana y los meses del año siempre se escriben con mayúscula. Las estaciones, en cambio, van en minúscula.",
    theory: [
      {
        type: "table",
        caption: "Días de la semana (siempre en mayúscula)",
        head: ["Día", "Abreviatura", "Preposición"],
        rows: [
          ["Monday", "Mon", "on Monday"],
          ["Tuesday", "Tue", "on Tuesday"],
          ["Wednesday", "Wed", "on Wednesday"],
          ["Thursday", "Thu", "on Thursday"],
          ["Friday", "Fri", "on Friday"],
          ["Saturday", "Sat", "on Saturday"],
          ["Sunday", "Sun", "on Sunday"],
        ],
      },
      {
        type: "table",
        caption: "Meses del año (siempre en mayúscula)",
        head: ["Mes", "Mes", "Mes"],
        rows: [
          ["January (Jan)", "May", "September (Sep)"],
          ["February (Feb)", "June (Jun)", "October (Oct)"],
          ["March (Mar)", "July (Jul)", "November (Nov)"],
          ["April (Apr)", "August (Aug)", "December (Dec)"],
        ],
      },
      {
        type: "list",
        title: "Estaciones y expresiones temporales",
        items: [
          "Estaciones (minúscula): <em lang='en'>spring, summer, autumn/fall, winter</em>. Con preposición <em lang='en'>in</em>: <em lang='en'>in summer</em>.",
          "Expresiones relativas: <em lang='en'>yesterday, today, tomorrow, the day before yesterday, the day after tomorrow</em>.",
          "Expresiones de periodo: <em lang='en'>last week / next month / this year / in two days</em>.",
        ],
      },
    ],
    flash: {
      decks: [
        {
          title: "Días de la semana",
          items: [
            { en: "Monday", es: "lunes" },
            { en: "Tuesday", es: "martes" },
            { en: "Wednesday", es: "miércoles" },
            { en: "Thursday", es: "jueves" },
            { en: "Friday", es: "viernes" },
            { en: "Saturday", es: "sábado" },
            { en: "Sunday", es: "domingo" },
          ],
        },
        {
          title: "Meses del año",
          items: [
            { en: "January", es: "enero" },
            { en: "February", es: "febrero" },
            { en: "March", es: "marzo" },
            { en: "April", es: "abril" },
            { en: "May", es: "mayo" },
            { en: "June", es: "junio" },
            { en: "July", es: "julio" },
            { en: "August", es: "agosto" },
            { en: "September", es: "septiembre" },
            { en: "October", es: "octubre" },
            { en: "November", es: "noviembre" },
            { en: "December", es: "diciembre" },
          ],
        },
      ],
    },
    practice: {
      hint: "Completa las oraciones con el día, mes, estación o expresión correcta.",
      exercises: [
        { id: "dm1", type: "choice", prompt: "Mi clase de inglés es los lunes. Digo:", options: ["I have class on Monday.", "I have class in Monday.", "I have class at Monday.", "I have class Monday."], answer: 0, explanation: "Los días de la semana van con la preposición on." },
        { id: "dm2", type: "fill", prompt: "Completa con la estación correcta:", sentence: "It is very hot in ______. (verano)", blanks: [{ accepts: ["summer"] }], explanation: "Verano = summer. Las estaciones van en minúscula y con in." },
        { id: "dm3", type: "fill", prompt: "Completa con la expresión temporal:", sentence: "Today is Tuesday. ______ was Monday.", blanks: [{ accepts: ["yesterday"] }], explanation: "El día anterior a hoy es yesterday." },
        { id: "dm4", type: "choice", prompt: "¿Cuál es correcto?", options: ["I was born in december.", "I was born in December.", "I was born on December.", "I was born at December."], answer: 1, explanation: "Los meses van con mayúscula y con la preposición in." },
      ],
    },
  },

  // =============================================================
  // 21 · La familia
  // =============================================================
  {
    id: "family",
    num: 21,
    title: "La familia",
    tagline: "father · mother · sibling · cousin",
    intro: "El vocabulario familiar en inglés distingue el género en términos como father/mother, pero es neutro en otros como sibling (hermano/a) o parent (padre/madre en general).",
    theory: [
      {
        type: "table",
        caption: "Núcleo familiar",
        head: ["Inglés", "Español", "Inglés", "Español"],
        rows: [
          ["father / dad", "padre / papá", "mother / mum", "madre / mamá"],
          ["brother", "hermano", "sister", "hermana"],
          ["sibling", "hermano/a (neutro)", "son", "hijo"],
          ["daughter", "hija", "child / children", "hijo/a, hijos"],
          ["husband", "marido", "wife", "esposa"],
          ["partner", "pareja", "only child", "hijo único"],
        ],
      },
      {
        type: "table",
        caption: "Familia extendida",
        head: ["Inglés", "Español", "Inglés", "Español"],
        rows: [
          ["grandfather / grandpa", "abuelo", "grandmother / grandma", "abuela"],
          ["uncle", "tío", "aunt", "tía"],
          ["cousin", "primo/a (neutro)", "nephew", "sobrino"],
          ["niece", "sobrina", "parent", "progenitor (padre o madre)"],
          ["fiancé (m) / fiancée (f)", "prometido/a", "in-laws", "suegros / familia política"],
        ],
      },
      {
        type: "tip",
        html: "💡 <em lang='en'>Parents</em> = padre y madre (no 'parientes'). Los parientes en general se dicen <em lang='en'>relatives</em> o <em lang='en'>family members</em>. ¡Falso amigo clásico!",
      },
    ],
    flash: {
      decks: [
        {
          title: "La familia",
          items: [
            { en: "father", es: "padre" },
            { en: "mother", es: "madre" },
            { en: "brother", es: "hermano" },
            { en: "sister", es: "hermana" },
            { en: "sibling", es: "hermano/a (neutro)" },
            { en: "son", es: "hijo" },
            { en: "daughter", es: "hija" },
            { en: "grandfather", es: "abuelo" },
            { en: "grandmother", es: "abuela" },
            { en: "uncle", es: "tío" },
            { en: "aunt", es: "tía" },
            { en: "cousin", es: "primo/a" },
            { en: "nephew", es: "sobrino" },
            { en: "niece", es: "sobrina" },
            { en: "parents", es: "padres (¡no 'parientes'!)" },
            { en: "relatives", es: "parientes / familiares" },
          ],
        },
      ],
    },
    practice: {
      hint: "Completa el árbol genealógico o elige la relación correcta.",
      exercises: [
        { id: "fam1", type: "fill", prompt: "Completa la oración:", sentence: "My father's mother is my ______.", blanks: [{ accepts: ["grandmother", "grandma"] }], explanation: "El padre de alguien → su madre es la abuela: grandmother." },
        { id: "fam2", type: "fill", prompt: "Completa la oración:", sentence: "My sister's son is my ______.", blanks: [{ accepts: ["nephew"] }], explanation: "El hijo de tu hermana es tu sobrino: nephew." },
        { id: "fam3", type: "choice", prompt: "'My parents' significa:", options: ["Mis padres (papá y mamá)", "Mis parientes", "Mis padrinos", "Mi padre"], answer: 0, explanation: "Parents = padre y madre. 'Parientes' en inglés es relatives." },
        { id: "fam4", type: "choice", prompt: "¿Qué palabra es neutra en cuanto al género?", options: ["sibling", "brother", "sister", "nephew"], answer: 0, explanation: "Sibling = hermano/a sin especificar género. Brother (masc.) y sister (fem.) sí indican género." },
      ],
    },
  },

  // =============================================================
  // 22 · El hogar y las habitaciones
  // =============================================================
  {
    id: "home",
    num: 22,
    title: "El hogar y las habitaciones",
    tagline: "living room · kitchen · bedroom · under · next to",
    intro: "Aprende a nombrar los tipos de vivienda, las habitaciones de una casa, los muebles esenciales y a describir dónde están los objetos mediante preposiciones de lugar.",
    theory: [
      {
        type: "table",
        caption: "Tipos de vivienda y estancias principales",
        head: ["Inglés", "Español", "Inglés", "Español"],
        rows: [
          ["house", "casa independiente", "flat / apartment", "piso / apartamento"],
          ["living room", "salón / sala de estar", "bedroom", "dormitorio / habitación"],
          ["kitchen", "cocina", "bathroom", "cuarto de baño"],
          ["dining room", "comedor", "hallway / hall", "pasillo / recibidor"],
          ["garden", "jardín", "balcony", "balcón / terraza"],
        ],
      },
      {
        type: "table",
        caption: "Muebles y electrodomésticos comunes",
        head: ["Mueble / Objeto", "Español", "Estancia típica", "Nota"],
        rows: [
          ["bed", "cama", "bedroom", "make the bed = hacer la cama"],
          ["wardrobe / closet", "armario de ropa", "bedroom", "wardrobe (UK) / closet (US)"],
          ["sofa / couch", "sofá", "living room", "couch potato = teleadicto"],
          ["armchair", "sillón", "living room", "asiento individual con brazos"],
          ["fridge / refrigerator", "frigorífico / nevera", "kitchen", "fridge es la forma coloquial"],
          ["cooker / stove", "cocina / fogones", "kitchen", "cooker (UK) / stove (US)"],
          ["shower", "ducha", "bathroom", "take a shower = ducharse"],
        ],
      },
      {
        type: "tip",
        html: "💡 Diferencias UK vs US en la vivienda: en Reino Unido se dice <em lang='en'>flat</em> y la planta baja es <em lang='en'>ground floor</em> (el 1º piso es <em lang='en'>first floor</em>). En EE. UU. se dice <em lang='en'>apartment</em> y la planta baja se denomina directamente <em lang='en'>first floor</em>.",
      },
      {
        type: "examples",
        items: [
          { en: "The milk is in the fridge.", es: "La leche está en la nevera." },
          { en: "The keys are on the kitchen table.", es: "Las llaves están sobre la mesa de la cocina." },
          { en: "The cat is sleeping under the sofa.", es: "El gato está durmiendo debajo del sofá." },
          { en: "The pharmacy is next to the post office.", es: "La farmacia está al lado de la oficina de correos." },
        ],
      },
    ],
    flash: {
      decks: [
        {
          title: "Habitaciones y muebles",
          items: [
            { en: "bedroom", es: "dormitorio" },
            { en: "living room", es: "salón" },
            { en: "kitchen", es: "cocina" },
            { en: "bathroom", es: "baño" },
            { en: "hallway", es: "pasillo" },
            { en: "garden", es: "jardín" },
            { en: "wardrobe", es: "armario" },
            { en: "sofa", es: "sofá" },
            { en: "fridge", es: "nevera" },
            { en: "cooker", es: "fogones / cocina" },
            { en: "shower", es: "ducha" },
            { en: "carpet", es: "moqueta / alfombra fija" },
          ],
        },
      ],
    },
    practice: {
      hint: "Identifica la estancia, traduce vocabulario o describe la ubicación de objetos.",
      exercises: [
        { id: "hom1", type: "choice", prompt: "Where do you usually cook meals?", options: ["In the kitchen", "In the bedroom", "In the bathroom", "In the garden"], answer: 0, explanation: "Kitchen es la cocina donde se preparan las comidas." },
        { id: "hom2", type: "fill", prompt: "Completa con la preposición de lugar adecuada:", sentence: "The milk is ______ the fridge.", blanks: [{ accepts: ["in", "inside"] }], explanation: "Usamos 'in' para indicar que algo está dentro de un espacio o electrodoméstico cerrado." },
        { id: "hom3", type: "choice", prompt: "¿Cómo se llama el dormitorio principal en un hogar?", options: ["master bedroom", "living room", "kitchen", "attic"], answer: 0, explanation: "Master bedroom es la denominación habitual del dormitorio principal." },
        { id: "hom4", type: "order", prompt: "Ordena las palabras para formar la frase:", words: ["sleeping", "The cat", "under the sofa", "is"], solution: [1, 3, 0, 2], accepts: ["the cat is sleeping under the sofa"], explanation: "Sujeto (The cat) + auxiliar (is) + gerundio (sleeping) + complemento (under the sofa)." },
      ],
    },
  },

  // =============================================================
  // 23 · Comida, bebida y restaurantes
  // =============================================================
  {
    id: "food",
    num: 23,
    title: "Comida, bebida y restaurantes",
    tagline: "menu · starter · bill · gluten-free · I'd like",
    intro: "Conoce el vocabulario de alimentos, bebidas, cómo desenvolverte en un restaurante con fórmulas de cortesía y cómo comunicar alergias y preferencias alimentarias.",
    theory: [
      {
        type: "table",
        caption: "Grupos de alimentos cotidianos",
        head: ["Categoría", "Ejemplos en inglés", "Traducción"],
        rows: [
          ["Fruit", "apple, banana, orange, strawberry", "manzana, plátano, naranja, fresa"],
          ["Vegetables", "carrot, onion, potato, tomato", "zanahoria, cebolla, patata, tomate"],
          ["Meat & Fish", "chicken, beef, pork, salmon, tuna", "pollo, ternera, cerdo, salmón, atún"],
          ["Dairy", "milk, cheese, butter, yoghurt", "leche, queso, mantequilla, yogur"],
          ["Grains & Bakery", "bread, rice, pasta, cereal", "pan, arroz, pasta, cereales"],
        ],
      },
      {
        type: "table",
        caption: "En el restaurante: vocabulario y servicio",
        head: ["Inglés", "Español", "Uso o contexto"],
        rows: [
          ["starter / appetizer", "entrante", "primer plato ligero"],
          ["main course", "plato principal", "segundo plato o plato fuerte"],
          ["dessert", "postre", "plato dulce al final"],
          ["bill (UK) / check (US)", "la cuenta", "Could we have the bill, please?"],
          ["waiter / waitress", "camarero / camarera", "personal de sala"],
          ["tip", "propina", "leave a tip = dejar propina"],
        ],
      },
      {
        type: "list",
        items: [
          "<strong>Vegetarian:</strong> no come carne ni pescado.",
          "<strong>Vegan:</strong> no consume ningún producto de origen animal (ni lácteos, ni huevos, ni miel).",
          "<strong>Gluten-free:</strong> sin gluten (apto para personas celíacas).",
          "<strong>Dairy-free / Lactose-free:</strong> sin lácteos / sin lactosa.",
          "<strong>Nut allergy:</strong> alergia a frutos secos (I have a nut allergy).",
        ],
      },
      {
        type: "tip",
        html: "💡 Para pedir con cortesía en un restaurante jamás digas 'I want…' (suena muy exigente y rudo). Usa siempre <em lang='en'>I'd like…</em> (I would like) o <em lang='en'>Could I have…, please?</em>",
      },
      {
        type: "examples",
        items: [
          { en: "Could I have a bottle of mineral water, please?", es: "¿Podría traerme una botella de agua mineral, por favor?" },
          { en: "I'd like the grilled chicken with salad.", es: "Quisiera el pollo a la plancha con ensalada." },
          { en: "Is this dish gluten-free?", es: "¿Este plato es sin gluten?" },
          { en: "Can we have the bill, please?", es: "¿Nos trae la cuenta, por favor?" },
        ],
      },
    ],
    flash: {
      decks: [
        {
          title: "Comida y restaurante",
          items: [
            { en: "starter", es: "entrante" },
            { en: "main course", es: "plato principal" },
            { en: "dessert", es: "postre" },
            { en: "bill", es: "cuenta (UK)" },
            { en: "check", es: "cuenta (US)" },
            { en: "tip", es: "propina" },
            { en: "dairy-free", es: "sin lácteos" },
            { en: "gluten-free", es: "sin gluten" },
            { en: "sparkling water", es: "agua con gas" },
            { en: "still water", es: "agua sin gas" },
          ],
        },
      ],
    },
    practice: {
      hint: "Practica fórmulas de cortesía en restaurantes y vocabulario culinario.",
      exercises: [
        { id: "fd1", type: "choice", prompt: "Una persona que no toma ningún alimento de origen animal sigue una dieta:", options: ["vegan", "vegetarian", "gluten-free", "carnivore"], answer: 0, explanation: "Vegan excluye todo alimento de procedencia animal, incluidos huevos y lácteos." },
        { id: "fd2", type: "fill", prompt: "Pide la cuenta con educación en un restaurante:", sentence: "Could I ______ the bill, please?", blanks: [{ accepts: ["have", "get"] }], explanation: "Could I have the bill, please? es la frase educada habitual." },
        { id: "fd3", type: "transform", prompt: "Transforma la frase para que sea educada usando 'I'd like':", sentence: "I want a coffee.", accepts: ["I'd like a coffee.", "I would like a coffee.", "I'd like a coffee, please.", "I would like a coffee, please."], explanation: "I'd like a coffee es la alternativa cortés y natural a I want a coffee." },
        { id: "fd4", type: "choice", prompt: "¿Cómo se llama el plato principal de una comida en inglés?", options: ["main course", "starter", "dessert", "appetizer"], answer: 0, explanation: "Main course designa el plato principal o plato fuerte." },
      ],
    },
  },

  // =============================================================
  // 24 · Transporte y medios de movilidad
  // =============================================================
  {
    id: "transport",
    num: 24,
    title: "Transporte y medios de movilidad",
    tagline: "by train · on foot · platform · gate · single ticket",
    intro: "Aprende los nombres de los medios de transporte, las preposiciones exactas para cada uno (by, on, in) y vocabulario esencial de estaciones y aeropuertos.",
    theory: [
      {
        type: "table",
        caption: "Preposiciones con medios de transporte",
        head: ["Construcción", "Cuándo se usa", "Ejemplos"],
        rows: [
          ["by + medio (sin artículo)", "Medio general de desplazamiento", "by car, by train, by bus, by plane, by bike"],
          ["on foot", "¡Excepción obligatoria a pie!", "I go to school on foot (nunca 'by foot')"],
          ["on the / a + medio grande", "Vehículos donde puedes ponerte de pie", "on the bus, on the train, on the plane, on a boat"],
          ["in a / the + coche o taxi", "Vehículos cerrados y pequeños", "in a car, in a taxi, in a van"],
        ],
      },
      {
        type: "table",
        caption: "Estaciones y aeropuertos",
        head: ["Término", "Español", "Ámbito"],
        rows: [
          ["platform", "andén", "tren / metro"],
          ["gate", "puerta de embarque", "aeropuerto"],
          ["boarding pass", "tarjeta de embarque", "aeropuerto / ferry"],
          ["luggage / baggage", "equipaje (incontable)", "viajes en general"],
          ["single ticket (UK) / one-way (US)", "billete de ida", "transporte público"],
          ["return ticket (UK) / round-trip (US)", "billete de ida y vuelta", "transporte público"],
        ],
      },
      {
        type: "tip",
        html: "💡 ¡Jamás digas <em lang='en'>by foot</em>! Es uno de los errores más comunes de hispanohablantes. Ir a pie siempre se dice <em lang='en'>on foot</em>: <em lang='en'>I walk to work / I go to work on foot</em>.",
      },
      {
        type: "examples",
        items: [
          { en: "We go to London by train.", es: "Vamos a Londres en tren." },
          { en: "She arrived at the meeting on foot.", es: "Ella llegó a la reunión a pie." },
          { en: "The train departs from platform 3.", es: "El tren sale del andén 3." },
          { en: "Please proceed to gate 14 for boarding.", es: "Por favor diríjanse a la puerta 14 para embarcar." },
        ],
      },
    ],
    flash: {
      decks: [
        {
          title: "Transporte y viajes",
          items: [
            { en: "train", es: "tren" },
            { en: "bus", es: "autobús" },
            { en: "flight", es: "vuelo" },
            { en: "platform", es: "andén" },
            { en: "gate", es: "puerta de embarque" },
            { en: "luggage", es: "equipaje" },
            { en: "boarding pass", es: "tarjeta de embarque" },
            { en: "single ticket", es: "billete de ida (UK)" },
            { en: "return ticket", es: "billete de ida y vuelta (UK)" },
            { en: "underground / subway", es: "metro" },
          ],
        },
      ],
    },
    practice: {
      hint: "Selecciona la preposición correcta o el término adecuado de transporte.",
      exercises: [
        { id: "tra1", type: "choice", prompt: "Completa: 'I always go to the office ______ foot.'", options: ["on", "by", "in", "with"], answer: 0, explanation: "A pie siempre es 'on foot'. Decir 'by foot' es un error." },
        { id: "tra2", type: "fill", prompt: "Indica el medio general con preposición:", sentence: "She travels to Paris ______ train.", blanks: [{ accepts: ["by"] }], explanation: "Para el medio de transporte general se usa 'by' (by train, by car, by bus)." },
        { id: "tra3", type: "fill", prompt: "¿Cómo se llama el andén en una estación de tren?", sentence: "The train to Edinburgh departs from ______ 4.", blanks: [{ accepts: ["platform"] }], explanation: "Platform es el andén de ferrocarril." },
        { id: "tra4", type: "choice", prompt: "En Reino Unido, un billete de ida y vuelta se denomina:", options: ["a return ticket", "a single ticket", "a two-ways ticket", "a double ticket"], answer: 0, explanation: "En inglés británico un billete de ida y vuelta es a return ticket (en US es round-trip ticket)." },
      ],
    },
  },

  // =============================================================
  // 25 · Profesiones y asignaturas
  // =============================================================
  {
    id: "professions",
    num: 25,
    title: "Profesiones y asignaturas",
    tagline: "doctor · engineer · What do you do? · Maths",
    intro: "Aprende a hablar de tu profesión u oficio, reconocer los sufijos característicos de ocupaciones y nombrar las asignaturas del colegio o la universidad.",
    theory: [
      {
        type: "table",
        caption: "Sufijos comunes en profesiones",
        head: ["Sufijo", "Ejemplos en inglés", "Español"],
        rows: [
          ["-er", "teacher, writer, painter, cleaner", "profesor, escritor, pintor, limpiador"],
          ["-or", "doctor, actor, director, translator", "médico, actor, director, traductor"],
          ["-ist", "scientist, dentist, journalist, artist", "científico, dentista, periodista, artista"],
          ["-ian", "musician, electrician, politician", "músico, electricista, político"],
        ],
      },
      {
        type: "table",
        caption: "Asignaturas académicas (Subjects)",
        head: ["Asignatura", "Traducción", "Asignatura", "Traducción"],
        rows: [
          ["Maths (UK) / Math (US)", "Matemáticas", "English", "Lengua inglesa"],
          ["Science", "Ciencias naturales", "Art", "Educación plástica / Arte"],
          ["History", "Historia", "Music", "Música"],
          ["Geography", "Geografía", "P.E. (Physical Education)", "Educación física"],
          ["Biology", "Biología", "Chemistry", "Química"],
        ],
      },
      {
        type: "tip",
        html: "💡 En inglés es estrictamente obligatorio usar el artículo indefinido <em lang='en'>a / an</em> al decir la profesión: <em lang='en'>I am A teacher</em> o <em lang='en'>She is AN engineer</em>. Decir 'I am teacher' es un error grave de gramática.",
      },
      {
        type: "examples",
        items: [
          { en: "What do you do? — I am a graphic designer.", es: "¿A qué te dedicas? — Soy diseñador gráfico." },
          { en: "My father is an engineer.", es: "Mi padre es ingeniero." },
          { en: "What does your sister study? — She studies Medicine.", es: "¿Qué estudia tu hermana? — Estudia Medicina." },
          { en: "We have Maths on Monday and Wednesday.", es: "Tenemos Matemáticas los lunes y miércoles." },
        ],
      },
    ],
    flash: {
      decks: [
        {
          title: "Profesiones y asignaturas",
          items: [
            { en: "lawyer", es: "abogado/a" },
            { en: "nurse", es: "enfermero/a" },
            { en: "engineer", es: "ingeniero/a" },
            { en: "police officer", es: "agente de policía" },
            { en: "chef", es: "cocinero/a profesional" },
            { en: "journalist", es: "periodista" },
            { en: "Maths", es: "matemáticas" },
            { en: "Science", es: "ciencias" },
            { en: "History", es: "historia" },
            { en: "P.E.", es: "educación física" },
          ],
        },
      ],
    },
    practice: {
      hint: "Practica los artículos con profesiones y vocabulario de ocupaciones.",
      exercises: [
        { id: "pro1", type: "fill", prompt: "Completa con el artículo y la profesión de 'ingeniera':", sentence: "My sister is ______.", blanks: [{ accepts: ["an engineer"] }], explanation: "Engineer empieza por vocal fonética, por lo que exige el artículo 'an': an engineer." },
        { id: "pro2", type: "choice", prompt: "¿Cómo se formula la pregunta estándar para '¿A qué te dedicas?'?", options: ["What do you do?", "What are you doing?", "What do you work?", "What is your profession job?"], answer: 0, explanation: "'What do you do?' es la fórmula idiomática universal en inglés para preguntar por la profesión." },
        { id: "pro3", type: "fill", prompt: "Escribe la asignatura escolar de números en inglés británico:", sentence: "My favourite subject at school is ______.", blanks: [{ accepts: ["Maths", "maths"] }], explanation: "En inglés británico se dice 'Maths' (en US, 'Math')." },
        { id: "pro4", type: "choice", prompt: "¿Qué sufijo forma la profesión a partir de 'music'?", options: ["-ian (musician)", "-er (musicer)", "-ist (musicist)", "-or (musicor)"], answer: 0, explanation: "Music añade el sufijo -ian convirtiéndose en musician." },
      ],
    },
  },

  // =============================================================
  // 26 · Indicaciones en la calle
  // =============================================================
  {
    id: "directions",
    num: 26,
    title: "Indicaciones en la calle",
    tagline: "go straight · turn left · roundabout · Excuse me",
    intro: "Aprende a pedir y dar indicaciones para orientarte en una ciudad, identificar puntos de referencia urbanos y comprender distancias cotidianas.",
    theory: [
      {
        type: "table",
        caption: "Verbos y expresiones de dirección",
        head: ["Expresión", "Significado", "Ejemplo"],
        rows: [
          ["go straight ahead / on", "siga todo recto", "Go straight ahead for 200 metres."],
          ["turn left / turn right", "gire a la izquierda / derecha", "Turn right at the bank."],
          ["take the first/second turning on the left", "tome la 1ª/2ª calle a la izquierda", "Take the second turning on the left."],
          ["cross the road / street", "cruce la calle", "Cross the road at the zebra crossing."],
          ["go past the church", "pase por delante de la iglesia", "Go past the museum and it's there."],
          ["it's on the corner", "está en la esquina", "The bakery is on the corner."],
        ],
      },
      {
        type: "table",
        caption: "Puntos de referencia en la ciudad",
        head: ["Elemento", "Español", "Elemento", "Español"],
        rows: [
          ["traffic lights", "semáforo", "roundabout", "rotonda / glorieta"],
          ["zebra crossing", "paso de cebra", "crossroads", "cruce de calles"],
          ["bridge", "puente", "corner", "esquina"],
          ["opposite", "enfrente de", "next to", "al lado de"],
        ],
      },
      {
        type: "tip",
        html: "💡 Para pedir una indicación a un desconocido, inicia siempre con <em lang='en'>Excuse me</em>: <em lang='en'>Excuse me, could you tell me the way to the train station?</em> Es la fórmula estándar de máxima cortesía.",
      },
      {
        type: "examples",
        items: [
          { en: "Excuse me, where is the nearest pharmacy?", es: "Disculpe, ¿dónde está la farmacia más cercana?" },
          { en: "Go straight on, and take the second turning on the right.", es: "Siga todo recto y tome la segunda calle a la derecha." },
          { en: "The post office is opposite the supermarket.", es: "La oficina de correos está enfrente del supermercado." },
          { en: "It's about a 10-minute walk from here.", es: "Está a unos 10 minutos a pie de aquí." },
        ],
      },
    ],
    flash: {
      decks: [
        {
          title: "Indicaciones y referencias",
          items: [
            { en: "straight ahead", es: "todo recto" },
            { en: "turn right", es: "gire a la derecha" },
            { en: "turn left", es: "gire a la izquierda" },
            { en: "roundabout", es: "rotonda" },
            { en: "traffic lights", es: "semáforo" },
            { en: "zebra crossing", es: "paso de peatones" },
            { en: "opposite", es: "enfrente de" },
            { en: "next to", es: "al lado de" },
            { en: "on the corner", es: "en la esquina" },
          ],
        },
      ],
    },
    practice: {
      hint: "Sigue las indicaciones urbanas y formula peticiones de ayuda en la calle.",
      exercises: [
        { id: "dir1", type: "choice", prompt: "'Gire a la derecha en el semáforo' se traduce como:", options: ["Turn right at the traffic lights.", "Turn left at the traffic lights.", "Go straight to the traffic lights.", "Cross the traffic lights."], answer: 0, explanation: "Turn right = gire a la derecha; traffic lights = semáforo." },
        { id: "dir2", type: "fill", prompt: "Completa la fórmula de cortesía para pedir indicaciones:", sentence: "______ me, how do I get to the museum?", blanks: [{ accepts: ["Excuse"] }], explanation: "Excuse me es la expresión educada universal para captar la atención." },
        { id: "dir3", type: "order", prompt: "Ordena las palabras para formar la indicación:", words: ["ahead", "Go", "for two blocks", "straight"], solution: [1, 3, 0, 2], accepts: ["go straight ahead for two blocks"], explanation: "Go straight ahead (siga todo recto) + for two blocks (durante dos manzanas)." },
        { id: "dir4", type: "choice", prompt: "¿Qué significa la palabra 'roundabout'?", options: ["Rotonda o glorieta", "Paso de cebra", "Puente colgante", "Cruce sin semáforo"], answer: 0, explanation: "Roundabout es la rotonda o glorieta vehicular." },
      ],
    },
  },

  // =============================================================
  // 27 · Vocabulario navideño y festividades
  // =============================================================
  {
    id: "holidays",
    num: 27,
    title: "Vocabulario navideño y festividades",
    tagline: "Christmas tree · Merry Christmas · Santa · Easter",
    intro: "Conoce las festividades anglosajonas más destacadas, las tradiciones populares de Navidad y las expresiones de felicitación pertinentes.",
    theory: [
      {
        type: "table",
        caption: "Navidad: símbolos y tradiciones",
        head: ["Término", "Español", "Detalle cultural"],
        rows: [
          ["Christmas tree", "árbol de Navidad", "se decora con ornaments / baubles y luces"],
          ["presents / gifts", "regalos", "se abren el 25 de diciembre por la mañana"],
          ["Santa Claus / Father Christmas", "Papá Noel", "Father Christmas es el término tradicional UK"],
          ["reindeer & sleigh", "reno y trineo", "Rudolph the red-nosed reindeer"],
          ["stockings", "calcetines navideños", "se cuelgan de la chimenea (fireplace)"],
          ["Christmas carol", "villancico", "silent night, jingle bells"],
          ["nice & naughty list", "lista de buenos y traviesos", "Santa checks who has been good"],
        ],
      },
      {
        type: "table",
        caption: "Otras festividades anglosajonas",
        head: ["Festividad", "Fecha habitual", "Felicitación común"],
        rows: [
          ["New Year's Eve / Day", "31 dic / 1 ene", "Happy New Year!"],
          ["Valentine's Day", "14 de febrero", "Happy Valentine's Day!"],
          ["Easter", "marzo / abril", "Happy Easter!"],
          ["Halloween", "31 de octubre", "Happy Halloween! / Trick or treat!"],
          ["Thanksgiving", "4º jueves de noviembre (US)", "Happy Thanksgiving!"],
          ["Boxing Day", "26 de diciembre (UK/Commonwealth)", "Día festivo posterior a Navidad"],
        ],
      },
      {
        type: "tip",
        html: "💡 Para felicitar la Navidad se dice tradicionalmente <em lang='en'>Merry Christmas</em>. En cambio, para casi cualquier otra festividad se utiliza <em lang='en'>Happy</em>: <em lang='en'>Happy New Year, Happy Easter, Happy Birthday!</em>",
      },
      {
        type: "examples",
        items: [
          { en: "We put all the presents under the Christmas tree.", es: "Pusimos todos los regalos debajo del árbol de Navidad." },
          { en: "Have you been on the nice or naughty list this year?", es: "¿Has estado en la lista de los buenos o los traviesos este año?" },
          { en: "Merry Christmas and a Happy New Year to everyone!", es: "¡Feliz Navidad y Próspero Año Nuevo a todos!" },
        ],
      },
    ],
    flash: {
      decks: [
        {
          title: "Navidad y festividades",
          items: [
            { en: "Christmas tree", es: "árbol de Navidad" },
            { en: "present / gift", es: "regalo" },
            { en: "reindeer", es: "reno" },
            { en: "sleigh", es: "trineo" },
            { en: "stocking", es: "calcetín de Navidad" },
            { en: "carol", es: "villancico" },
            { en: "Easter", es: "Pascua" },
            { en: "Thanksgiving", es: "Acción de Gracias" },
            { en: "naughty", es: "travieso/a" },
            { en: "ornament", es: "adorno navideño" },
          ],
        },
      ],
    },
    practice: {
      hint: "Identifica la felicitación correcta o los términos de celebraciones anglosajonas.",
      exercises: [
        { id: "hol1", type: "choice", prompt: "¿Cuál es la felicitación tradicional para desear feliz Navidad?", options: ["Merry Christmas!", "Happy Christmas tree!", "Nice Christmas!", "Good Christmas day!"], answer: 0, explanation: "Merry Christmas es la fórmula tradicional universal para Navidad." },
        { id: "hol2", type: "fill", prompt: "Santa Claus clasifica a los niños en dos listas: nice and ______.", sentence: "Santa checks who is on the nice or ______ list.", blanks: [{ accepts: ["naughty"] }], explanation: "Naughty significa travieso/a. La tradición habla de the nice and naughty list." },
        { id: "hol3", type: "choice", prompt: "¿Cómo se llama tradicionalmente a Papá Noel en el Reino Unido?", options: ["Father Christmas", "Santa King", "Saint Nicklaus", "Old Christmas"], answer: 0, explanation: "Father Christmas es el nombre tradicional británico para Santa Claus." },
        { id: "hol4", type: "fill", prompt: "Completa la felicitación de Año Nuevo:", sentence: "______ New Year!", blanks: [{ accepts: ["Happy"] }], explanation: "Happy New Year (se usa 'Happy', no 'Merry')." },
      ],
    },
  },

  // =============================================================
  // 28 · Futuro: Will vs. Going to
  // =============================================================
  {
    id: "future",
    num: 28,
    title: "Futuro: Will vs. Going to",
    tagline: "I will help you · We are going to travel · won't",
    intro: "En inglés existen dos formas principales para hablar del futuro: 'will' para decisiones espontáneas y promesas, y 'be going to' para planes ya organizados o predicciones con evidencia directa.",
    theory: [
      {
        type: "table",
        caption: "Contraste: Will vs. Going to",
        head: ["Aspecto", "Will + infinitivo base", "Be going to + infinitivo base"],
        rows: [
          ["Uso principal 1", "Decisión espontánea en el momento", "Plan o intención previa organizada"],
          ["Uso principal 2", "Promesa u ofrecimiento voluntario", "Predicción con evidencia visual inmediata"],
          ["Afirmativa", "I will (I'll) call you later.", "I am going to visit my parents on Sunday."],
          ["Negativa", "I will not (won't) tell anyone.", "He isn't going to buy that car."],
          ["Interrogativa", "Will you come to the party?", "Are you going to study tonight?"],
        ],
      },
      {
        type: "tip",
        html: "💡 En conversación real, <em lang='en'>will</em> casi siempre se contrae: <em lang='en'>I'll, you'll, he'll, she'll, we'll, they'll</em>. La contracción negativa es <em lang='en'>won't</em> /woʊnt/ (cuidado de no confundir con <em lang='en'>want</em> /wɒnt/).",
      },
      {
        type: "examples",
        items: [
          { en: "The phone is ringing. — I'll answer it!", es: "El teléfono está sonando. — ¡Yo contesto! (decisión espontánea)" },
          { en: "Look at those black clouds! It is going to rain.", es: "¡Mira esos nubarrones negros! Va a llover. (evidencia visible)" },
          { en: "We are going to move to London next month.", es: "Nos vamos a mudar a Londres el mes que viene. (plan previsto)" },
          { en: "Don't worry, I won't forget your birthday.", es: "No te preocupes, no olvidaré tu cumpleaños. (promesa)" },
        ],
      },
    ],
    practice: {
      hint: "Distingue entre decisiones espontáneas (will) y planes o evidencias (going to).",
      exercises: [
        { id: "fut1", type: "choice", prompt: "The doorbell rings. You say to your roommate:", options: ["I will get it!", "I am going to get it!", "I get it!", "I got it!"], answer: 0, explanation: "Para una decisión tomada al instante en que suena el timbre se emplea 'will': I'll get it!" },
        { id: "fut2", type: "fill", prompt: "Completa con la forma correcta de 'have' (plan organizado):", sentence: "We ______ a party next Saturday. We bought the drinks yesterday.", blanks: [{ accepts: ["are going to have"] }], explanation: "Es un plan organizado con antelación: are going to have." },
        { id: "fut3", type: "choice", prompt: "Look at that boy on the edge of the pool! He ______ fall in!", options: ["is going to", "will", "shall", "does"], answer: 0, explanation: "Hay evidencia visual en tiempo real de lo que va a ocurrir: is going to fall." },
        { id: "fut4", type: "fill", prompt: "Completa la promesa en negativa:", sentence: "I promise I ______ tell anyone your secret.", blanks: [{ accepts: ["won't", "will not"] }], explanation: "Won't (o will not) expresa una promesa de no hacer algo en el futuro." },
      ],
    },
  },

  // =============================================================
  // 29 · Modo Imperativo y Respuestas Cortas
  // =============================================================
  {
    id: "imperative",
    num: 29,
    title: "Modo Imperativo y Respuestas Cortas",
    tagline: "Open the door · Don't run · Yes, I do · Let's go",
    intro: "El modo imperativo sirve para dar instrucciones, advertencias, consejos y órdenes directas. Las respuestas cortas permiten contestar con educación y naturalidad a preguntas de 'sí/no'.",
    theory: [
      {
        type: "table",
        caption: "El modo imperativo",
        head: ["Tipo", "Estructura", "Ejemplo", "Traducción"],
        rows: [
          ["Afirmativo", "Verbo en forma base (sin to ni sujeto)", "Open your book, please.", "Abre tu libro, por favor."],
          ["Negativo", "Don't + verbo en forma base", "Don't touch that wire!", "¡No toques ese cable!"],
          ["Sugerencia conjunta", "Let's + verbo en forma base", "Let's take a break.", "Tomemos un descanso."],
          ["Sugerencia negativa", "Let's not + verbo en forma base", "Let's not argue about this.", "No discutamos sobre esto."],
        ],
      },
      {
        type: "table",
        caption: "Short answers (Respuestas cortas por auxiliar)",
        head: ["Pregunta", "Respuesta afirmativa", "Respuesta negativa"],
        rows: [
          ["Are you tired?", "Yes, I am.", "No, I'm not."],
          ["Do you speak English?", "Yes, I do.", "No, I don't."],
          ["Does he live in Spain?", "Yes, he does.", "No, he doesn't."],
          ["Did you watch the match?", "Yes, I did.", "No, I didn't."],
          ["Can you swim?", "Yes, I can.", "No, I can't."],
        ],
      },
      {
        type: "tip",
        html: "💡 ¡Nunca contraigas un pronombre con el verbo auxiliar al final de una respuesta corta afirmativa! Decir 'Yes, I'm' o 'Yes, he's' es un error gramatical grave. Siempre usa la forma completa: <em lang='en'>Yes, I am / Yes, he is / Yes, they are</em>.",
      },
      {
        type: "examples",
        items: [
          { en: "Please sit down and make yourself comfortable.", es: "Por favor siéntate y ponte cómodo." },
          { en: "Don't be late for the meeting tomorrow.", es: "No llegues tarde a la reunión de mañana." },
          { en: "Let's go to the Italian restaurant tonight!", es: "¡Vamos al restaurante italiano esta noche!" },
          { en: "Do you have any pets? — Yes, I do.", es: "¿Tienes mascotas? — Sí." },
        ],
      },
    ],
    practice: {
      hint: "Formula órdenes e instrucciones y responde a preguntas usando el auxiliar apropiado.",
      exercises: [
        { id: "imp1", type: "transform", prompt: "Convierte a imperativo negativo: 'You must not shout in class.'", sentence: "You must not shout in class.", accepts: ["Don't shout in class.", "Do not shout in class."], explanation: "El imperativo negativo se forma con Don't + infinitivo sin to." },
        { id: "imp2", type: "fill", prompt: "Responde brevemente a la pregunta afirmativa: 'Do you study French?'", sentence: "Do you study French? — Yes, I ______.", blanks: [{ accepts: ["do"] }], explanation: "La pregunta comienza con 'Do', por lo que la respuesta corta afirmativa es 'Yes, I do'." },
        { id: "imp3", type: "choice", prompt: "¿Cuál respuesta corta es gramaticalmente correcta para 'Is she your doctor?'?", options: ["Yes, she is.", "Yes, she's.", "Yes, is she.", "Yes, she does."], answer: 0, explanation: "En respuestas cortas afirmativas nunca se contrae: 'Yes, she is'." },
        { id: "imp4", type: "fill", prompt: "Haz una sugerencia conjunta para empezar la reunión:", sentence: "______ start the meeting now!", blanks: [{ accepts: ["Let's", "let's"] }], explanation: "Let's (let us) + infinitivo introduce una propuesta para el grupo." },
      ],
    },
  },

  // =============================================================
  // 30 · Verbos Modales (Can, Could, Should, Must)
  // =============================================================
  {
    id: "modals",
    num: 30,
    title: "Verbos Modales (Can, Could, Should, Must)",
    tagline: "can · could · should · must · have to",
    intro: "Los verbos modales modifican el significado del verbo principal para expresar habilidad, permiso, consejo, posibilidad u obligación.",
    theory: [
      {
        type: "table",
        caption: "Principales verbos modales y sus funciones",
        head: ["Modal", "Función principal", "Ejemplo en inglés", "Traducción"],
        rows: [
          ["can / can't", "Habilidad o permiso informal", "I can play the piano.", "Sé tocar el piano."],
          ["could / couldn't", "Petición educada o habilidad pasada", "Could you open the window?", "¿Podrías abrir la ventana?"],
          ["should / shouldn't", "Consejo o recomendación", "You should drink more water.", "Deberías beber más agua."],
          ["must", "Obligación fuerte o deber", "You must wear a seatbelt.", "Debes llevar puesto el cinturón."],
          ["mustn't", "Prohibición estricta", "You mustn't smoke here.", "Está prohibido fumar aquí."],
          ["don't have to", "Falta de obligación (opcional)", "You don't have to come today.", "No tienes por qué venir hoy."],
        ],
      },
      {
        type: "tip",
        html: "💡 Distinción clave: <em lang='en'>Mustn't</em> significa <strong style='color:var(--chalk-red)'>prohibido</strong>. En cambio, <em lang='en'>Don't have to</em> significa que es <strong style='color:var(--chalk-green)'>opcional</strong> (no es obligatorio, pero puedes hacerlo si quieres).",
      },
      {
        type: "examples",
        items: [
          { en: "She can speak three languages fluently.", es: "Ella sabe hablar tres idiomas con fluidez." },
          { en: "Could you please lend me your pen?", es: "¿Podrías prestarme tu bolígrafo, por favor?" },
          { en: "You look exhausted, you should take a rest.", es: "Pareces agotado, deberías descansar." },
          { en: "Tomorrow is a holiday, so I don't have to get up early.", es: "Mañana es festivo, así que no tengo que madrugar." },
        ],
      },
    ],
    practice: {
      hint: "Elige o escribe el modal adecuado para cada situación (consejo, obligación, habilidad).",
      exercises: [
        { id: "mod1", type: "choice", prompt: "En una biblioteca rige la norma de silencio absoluto. El cartel dice:", options: ["You mustn't make noise.", "You don't have to make noise.", "You should make noise.", "You can make noise."], answer: 0, explanation: "Mustn't indica prohibición categórica." },
        { id: "mod2", type: "choice", prompt: "La entrada al museo es gratuita hoy:", options: ["You don't have to pay.", "You mustn't pay.", "You can't pay.", "You should pay."], answer: 0, explanation: "Don't have to indica que no hay obligación de pagar (es gratis)." },
        { id: "mod3", type: "fill", prompt: "Pide ayuda a alguien de manera cortés y educada:", sentence: "______ you help me with this heavy box, please?", blanks: [{ accepts: ["Could"] }], explanation: "Could you...? es la fórmula educada de cortesía por excelencia." },
        { id: "mod4", type: "fill", prompt: "Da un consejo de salud a un amigo resfriado:", sentence: "You have a bad cold. You ______ stay at home and rest.", blanks: [{ accepts: ["should", "ought to"] }], explanation: "Should (o ought to) se utiliza para expresar consejos y recomendaciones." },
      ],
    },
  },

  // =============================================================
  // 31 · Present Perfect
  // =============================================================
  {
    id: "present-perfect",
    num: 31,
    title: "Present Perfect",
    tagline: "have visited · already · yet · ever · never · since",
    intro: "El Present Perfect conecta el pasado con el presente. Se emplea para experiencias de vida, acciones pasadas con relevancia actual y periodos de tiempo que aún no han concluido.",
    theory: [
      {
        type: "table",
        caption: "Estructura del Present Perfect (have / has + participio)",
        head: ["Forma", "Estructura", "Ejemplo", "Traducción"],
        rows: [
          ["Afirmativa", "Sujeto + have/has + Past Participle", "She has lived here for 5 years.", "Ella vive / ha vivido aquí 5 años."],
          ["Negativa", "Sujeto + haven't/hasn't + Participle", "I haven't seen that film yet.", "Aún no he visto esa película."],
          ["Interrogativa", "Have/Has + sujeto + Participle?", "Have you ever tried sushi?", "¿Alguna vez has probado el sushi?"],
        ],
      },
      {
        type: "table",
        caption: "Adverbios temporales clave del Present Perfect",
        head: ["Adverbio", "Significado", "Posición habitual", "Ejemplo"],
        rows: [
          ["already", "ya (antes de lo previsto)", "entre have y participio", "I have already eaten."],
          ["yet", "ya / todavía (negativa y pregunta)", "al final de la frase", "Has the train arrived yet?"],
          ["ever", "alguna vez en la vida", "delante del participio", "Have you ever been to Rome?"],
          ["never", "nunca", "delante del participio", "I have never seen snow."],
          ["just", "acabar de (hace un instante)", "entre have y participio", "They have just arrived."],
          ["for / since", "durante / desde", "al final con periodo o fecha", "for 10 years / since 2015"],
        ],
      },
      {
        type: "tip",
        html: "💡 ¡Regla de oro! Si la frase incluye un marcador de tiempo cerrado en el pasado (<em lang='en'>yesterday, last year, in 2020, two days ago</em>), está <strong style='color:var(--chalk-red)'>terminantemente prohibido</strong> usar Present Perfect; debes usar <strong style='color:var(--chalk-green)'>Past Simple</strong>: <em lang='en'>I saw him yesterday</em> (nunca 'I have seen him yesterday').",
      },
      {
        type: "examples",
        items: [
          { en: "Have you ever eaten Japanese food? — Yes, many times.", es: "¿Alguna vez has comido comida japonesa? — Sí, muchas veces." },
          { en: "I have already finished all my homework.", es: "Ya he terminado todos mis deberes." },
          { en: "She hasn't called me yet.", es: "Ella todavía no me ha llamado." },
          { en: "We have known each other since 2018.", es: "Nos conocemos desde 2018." },
        ],
      },
    ],
    practice: {
      hint: "Conecta have/has con el participio y utiliza los adverbios de tiempo correctamente.",
      exercises: [
        { id: "pp1", type: "fill", prompt: "Completa con la forma correcta de 'never' y 'be':", sentence: "I ______ to Australia.", blanks: [{ accepts: ["have never been"] }], explanation: "I + have + never + participio de be (been): have never been." },
        { id: "pp2", type: "choice", prompt: "¿Cuál es la pregunta correcta para saber si alguien ha terminado una tarea?", options: ["Have you finished your homework yet?", "Did you finished your homework yet?", "Have you finish your homework already?", "Do you have finished your homework?"], answer: 0, explanation: "'Have you finished... yet?' es la construcción canónica con yet al final." },
        { id: "pp3", type: "fill", prompt: "Completa con 'for' o 'since':", sentence: "She has worked as an architect ______ 2019.", blanks: [{ accepts: ["since"] }], explanation: "Since se emplea para indicar el punto de inicio en el tiempo (año, fecha, día)." },
        { id: "pp4", type: "choice", prompt: "Ayer fui al cine. ¿Cuál es la opción correcta?", options: ["I went to the cinema yesterday.", "I have gone to the cinema yesterday.", "I have been to the cinema yesterday.", "I go to the cinema yesterday."], answer: 0, explanation: "Con un marcador temporal cerrado (yesterday) es obligatorio el Past Simple: I went." },
      ],
    },
  },

  // =============================================================
  // 32 · Present Perfect Continuous
  // =============================================================
  {
    id: "present-perfect-continuous",
    num: 32,
    title: "Present Perfect Continuous",
    tagline: "have been studying · How long · process vs. result",
    intro: "El Present Perfect Continuous enfatiza la duración, el esfuerzo continuo y la actividad ininterrumpida que comenzó en el pasado y sigue en curso o cuyos efectos son palpables.",
    theory: [
      {
        type: "table",
        caption: "Estructura: have / has been + verbo en -ing",
        head: ["Forma", "Estructura", "Ejemplo", "Traducción"],
        rows: [
          ["Afirmativa", "Sujeto + have/has been + V-ing", "I have been waiting for two hours.", "Llevo dos horas esperando."],
          ["Negativa", "Sujeto + haven't/hasn't been + V-ing", "She hasn't been sleeping well lately.", "Ella no ha estado durmiendo bien últimamente."],
          ["Interrogativa", "How long + have/has + suj + been + V-ing?", "How long have you been learning English?", "¿Cuánto tiempo llevas aprendiendo inglés?"],
        ],
      },
      {
        type: "table",
        caption: "Contraste: Present Perfect Simple vs. Continuous",
        head: ["Rasgo", "Present Perfect Simple", "Present Perfect Continuous"],
        rows: [
          ["Foco", "Resultado final o cantidad completada", "Proceso, duración o actividad en sí"],
          ["Pregunta típica", "How many / how much?", "How long?"],
          ["Ejemplo", "I have painted two rooms. (Terminadas)", "I have been painting the house. (Pintura en la ropa)"],
        ],
      },
      {
        type: "tip",
        html: "💡 Los verbos de estado (<em lang='en'>state verbs</em> como <em lang='en'>know, understand, believe, love, like, have [posesión]</em>) NO se suelen usar en tiempos continuos. Decimos: <em lang='en'>I have known her for years</em> (nunca 'I have been knowing her').",
      },
      {
        type: "examples",
        items: [
          { en: "He is completely exhausted because he has been running.", es: "Está completamente agotado porque ha estado corriendo." },
          { en: "How long have you been living in this city?", es: "¿Cuánto tiempo llevas viviendo en esta ciudad?" },
          { en: "It has been raining all afternoon.", es: "Ha estado lloviendo toda la tarde." },
        ],
      },
    ],
    practice: {
      hint: "Usa have/has been + -ing para enfatizar la duración o el proceso continuo.",
      exercises: [
        { id: "ppc1", type: "fill", prompt: "Completa con el verbo 'study' en continuo:", sentence: "She has a headache because she ______ for five hours.", blanks: [{ accepts: ["has been studying"] }], explanation: "She + has been + studying expresa la duración ininterrumpida de la actividad." },
        { id: "ppc2", type: "fill", prompt: "Completa la pregunta para saber cuánto tiempo lleva alguien trabajando:", sentence: "How long ______ you been working here?", blanks: [{ accepts: ["have"] }], explanation: "How long have you been working...? es la fórmula canónica." },
        { id: "ppc3", type: "choice", prompt: "Esta mañana he leído tres capítulos enteros (resultado y cantidad):", options: ["I have read three chapters.", "I have been reading three chapters.", "I am reading three chapters.", "I readed three chapters."], answer: 0, explanation: "Para enfatizar el resultado y la cantidad lograda se usa el Present Perfect Simple: I have read." },
        { id: "ppc4", type: "choice", prompt: "¿Cuál es la frase correcta con el verbo de estado 'know'?", options: ["I have known David for ten years.", "I have been knowing David for ten years.", "I am knowing David for ten years.", "I know David since ten years."], answer: 0, explanation: "Know es un state verb y no admite tiempos continuos: I have known David." },
      ],
    },
  },

  // =============================================================
  // 33 · Comparativos y Superlativos
  // =============================================================
  {
    id: "comparatives",
    num: 33,
    title: "Comparativos y Superlativos",
    tagline: "taller than · more expensive · the best · as ... as",
    intro: "Aprende a comparar personas, lugares y cosas mediante adjetivos comparativos (-er / more... than), superlativos (-est / the most) y estructuras de igualdad (as... as).",
    theory: [
      {
        type: "table",
        caption: "Reglas de formación de comparativos y superlativos",
        head: ["Tipo de adjetivo", "Comparativo (+ than)", "Superlativo (the + ...)"],
        rows: [
          ["Corto (1 sílaba): tall, fast", "taller than, faster than", "the tallest, the fastest"],
          ["Corto acabado en CVC: big, hot", "bigger than, hotter than", "the biggest, the hottest"],
          ["Acabado en -y: happy, easy", "happier than, easier than", "the happiest, the easiest"],
          ["Largo (2+ sílabas): expensive, famous", "more expensive than, more famous than", "the most expensive, the most famous"],
          ["Irregular: good", "better than", "the best"],
          ["Irregular: bad", "worse than", "the worst"],
          ["Irregular: far", "farther / further than", "the farthest / furthest"],
        ],
      },
      {
        type: "table",
        caption: "Comparación de igualdad: as ... as",
        head: ["Estructura", "Significado", "Ejemplo"],
        rows: [
          ["as + adjetivo + as", "tan ... como (igualdad)", "She is as tall as her brother."],
          ["not as + adjetivo + as", "no tan ... como (inferioridad)", "This phone is not as expensive as that one."],
        ],
      },
      {
        type: "tip",
        html: "💡 ¡Cuidado con los dobles comparativos! Nunca digas <em lang='en'>more better</em> o <em lang='en'>the most best</em>. Al ser irregulares, <em lang='en'>better</em> y <em lang='en'>the best</em> ya son comparativo y superlativo por sí mismos.",
      },
      {
        type: "examples",
        items: [
          { en: "Madrid is bigger than Seville, but Tokyo is the biggest city.", es: "Madrid es más grande que Sevilla, pero Tokio es la ciudad más grande." },
          { en: "Traveling by train is more comfortable than flying.", es: "Viajar en tren es más cómodo que volar." },
          { en: "He is the best tennis player in our club.", es: "Él es el mejor tenista de nuestro club." },
          { en: "My flat is not as big as yours.", es: "Mi piso no es tan grande como el tuyo." },
        ],
      },
    ],
    practice: {
      hint: "Aplica las reglas morfológicas para formar comparativos y superlativos regulares e irregulares.",
      exercises: [
        { id: "comp1", type: "fill", prompt: "Forma el comparativo del adjetivo entre paréntesis:", sentence: "This book is ______ (interesting) than the movie.", blanks: [{ accepts: ["more interesting"] }], explanation: "Interesting es un adjetivo largo de 4 sílabas; lleva 'more interesting'." },
        { id: "comp2", type: "fill", prompt: "Forma el superlativo del adjetivo entre paréntesis:", sentence: "Mount Everest is ______ (high) mountain on Earth.", blanks: [{ accepts: ["the highest"] }], explanation: "High es corto (1 sílaba): añade -est precedido del artículo 'the': the highest." },
        { id: "comp3", type: "choice", prompt: "¿Cuál es el comparativo irregular de 'bad'?", options: ["worse", "badder", "more bad", "worst"], answer: 0, explanation: "Bad es irregular: bad → worse → the worst." },
        { id: "comp4", type: "fill", prompt: "Completa con el comparativo irregular de 'good':", sentence: "My coffee was good, but yours smells even ______.", blanks: [{ accepts: ["better"] }], explanation: "El comparativo de good es better (good → better → the best)." },
      ],
    },
  },

  // =============================================================
  // 34 · Condicional Cero (Zero Conditional)
  // =============================================================
  {
    id: "zero-conditional",
    num: 34,
    title: "Condicional Cero (Zero Conditional)",
    tagline: "If + Present Simple, Present Simple · universal truths",
    intro: "El Zero Conditional se emplea para hechos comprobados, leyes de la física, verdades científicas universales y hábitos causa-efecto invariables.",
    theory: [
      {
        type: "table",
        caption: "Estructura del Zero Conditional",
        head: ["Cláusula condicional (If / When)", "Cláusula de resultado"],
        rows: [
          ["If + Present Simple", "Present Simple"],
          ["If you heat ice,", "it melts. (El hielo se derrite)"],
          ["If water reaches 100°C,", "it boils. (El agua hierve)"],
          ["When people don't sleep,", "they feel tired. (La gente se siente cansada)"],
        ],
      },
      {
        type: "tip",
        html: "💡 Si la oración empieza con la cláusula <em lang='en'>If</em>, se coloca una coma separando ambas partes: <em lang='en'>If you heat water, it boils.</em> Si se invierte el orden, no se usa coma: <em lang='en'>Water boils if you heat it.</em>",
      },
      {
        type: "examples",
        items: [
          { en: "If you touch a flame, you burn yourself.", es: "Si tocas una llama, te quemas." },
          { en: "If it rains, the grass gets wet.", es: "Si llueve, la hierba se moja." },
          { en: "Plants die if they don't get enough water.", es: "Las plantas mueren si no reciben suficiente agua." },
        ],
      },
    ],
    practice: {
      hint: "Mantén ambos verbos en Present Simple para expresar hechos científicos y verdades absolutas.",
      exercises: [
        { id: "cond0_1", type: "fill", prompt: "Completa el resultado en presente simple:", sentence: "If you freeze water, it ______ (turn) into ice.", blanks: [{ accepts: ["turns"] }], explanation: "Tercera persona singular (it): turn + s = turns." },
        { id: "cond0_2", type: "fill", prompt: "Completa el hecho de la naturaleza:", sentence: "If it rains, the ground ______ (get) wet.", blanks: [{ accepts: ["gets"] }], explanation: "En Zero Conditional el resultado va en Present Simple: gets." },
        { id: "cond0_3", type: "choice", prompt: "¿Para qué se utiliza principalmente el Zero Conditional?", options: ["Hechos científicos y verdades universales", "Planes hipotéticos futuros", "Arrepentimientos del pasado", "Peticiones de cortesía"], answer: 0, explanation: "El Zero Conditional expresa verdades científicas y leyes físicas incuestionables." },
        { id: "cond0_4", type: "order", prompt: "Ordena las palabras para formar la frase condicional:", words: ["water,", "heat", "it boils.", "If you"], solution: [3, 1, 0, 2], accepts: ["if you heat water, it boils"], explanation: "If you heat water, it boils." },
      ],
    },
  },

  // =============================================================
  // 35 · Primer Condicional (First Conditional)
  // =============================================================
  {
    id: "first-conditional",
    num: 35,
    title: "Primer Condicional (First Conditional)",
    tagline: "If + Present Simple, will + base verb · real future",
    intro: "El First Conditional habla del futuro real o muy probable: si se cumple una condición concreta en el presente, se producirá un determinado resultado en el futuro.",
    theory: [
      {
        type: "table",
        caption: "Estructura del First Conditional",
        head: ["Cláusula con IF (Condición)", "Cláusula con WILL (Resultado futuro)"],
        rows: [
          ["If + Present Simple", "will / won't + verbo en forma base"],
          ["If it rains tomorrow,", "we will stay at home."],
          ["If she studies hard,", "she will pass the exam."],
          ["If they don't hurry,", "they will miss the train."],
        ],
      },
      {
        type: "note",
        html: "⚠️ <em lang='en'>Unless</em> significa 'a menos que' o 'si no' (<em lang='en'>unless = if not</em>): <em lang='en'>Unless you leave now, you will be late</em> (= <em lang='en'>If you don't leave now, you will be late</em>).",
      },
      {
        type: "tip",
        html: "💡 ¡PROHIBIDO usar <em lang='en'>will</em> en la cláusula con <em lang='en'>if</em>! Es uno de los errores más extendidos. Decir 'If it will rain, I will stay' es incorrecto. La fórmula correcta es siempre: <em lang='en'>If it rains, I will stay</em>.",
      },
      {
        type: "examples",
        items: [
          { en: "If the weather is nice on Saturday, we will go for a hike.", es: "Si hace buen tiempo el sábado, iremos de excursión." },
          { en: "I will call you if I finish work early.", es: "Te llamaré si termino de trabajar pronto." },
          { en: "Unless you wear a coat, you will catch a cold.", es: "A menos que lleves abrigo, te resfriarás." },
        ],
      },
    ],
    practice: {
      hint: "Asegúrate de conjugar la condición con If en Present Simple y el resultado con will + infinitivo.",
      exercises: [
        { id: "cond1_1", type: "fill", prompt: "Completa la condición en Present Simple:", sentence: "If it ______ (snow) tomorrow, the children will build a snowman.", blanks: [{ accepts: ["snows"] }], explanation: "La cláusula condicional con if exige Present Simple (it snows)." },
        { id: "cond1_2", type: "fill", prompt: "Completa el resultado con 'will' + verbo:", sentence: "If you help me with the dishes, I ______ (buy) you an ice cream.", blanks: [{ accepts: ["will buy", "'ll buy"] }], explanation: "El resultado futuro se expresa con will + verbo base: will buy." },
        { id: "cond1_3", type: "choice", prompt: "¿Cuál de estas cuatro oraciones es gramaticalmente correcta?", options: ["If I have time tonight, I will phone you.", "If I will have time tonight, I will phone you.", "If I have time tonight, I phone you.", "If I would have time tonight, I phone you."], answer: 0, explanation: "La cláusula 'if' va en Present Simple (have), nunca con 'will'." },
        { id: "cond1_4", type: "fill", prompt: "Completa con la palabra que significa 'a menos que' (if not):", sentence: "______ you study hard, you will not pass the test.", blanks: [{ accepts: ["Unless", "unless"] }], explanation: "Unless = a menos que / si no." },
      ],
    },
  },

  // =============================================================
  // 36 · Segundo Condicional (Second Conditional)
  // =============================================================
  {
    id: "second-conditional",
    num: 36,
    title: "Segundo Condicional (Second Conditional)",
    tagline: "If + Past Simple, would + base verb · hypothetical",
    intro: "El Second Conditional describe situaciones hipotéticas, imaginarias o poco probables en el presente o futuro, así como sueños, deseos y consejos avanzados.",
    theory: [
      {
        type: "table",
        caption: "Estructura del Second Conditional",
        head: ["Cláusula con IF (Hipotética)", "Cláusula con WOULD (Resultado imaginado)"],
        rows: [
          ["If + Past Simple", "would / wouldn't + verbo en forma base"],
          ["If I had a million dollars,", "I would travel around the world."],
          ["If she lived in London,", "she would speak English every day."],
          ["If we didn't have to work,", "we would go to the beach."],
        ],
      },
      {
        type: "table",
        caption: "Dar consejos: If I were you, I would...",
        head: ["Estructura", "Uso", "Ejemplo"],
        rows: [
          ["If I were you + would", "Fórmula clásica para aconsejar", "If I were you, I would accept the job."],
          ["Would you rather...?", "Dilema de elección hipotética", "Would you rather have wings or breathe underwater?"],
        ],
      },
      {
        type: "tip",
        html: "💡 En el Second Conditional se utiliza tradicionalmente <em lang='en'>were</em> para todas las personas gramaticales (incluidos <em lang='en'>I, he, she, it</em>). La expresión <em lang='en'>If I were you, I would...</em> es una de las construcciones más valoradas en exámenes oficiales de nivel A2/B1.",
      },
      {
        type: "examples",
        items: [
          { en: "If I won the lottery, I would buy a house for my parents.", es: "Si ganara la lotería, compraría una casa para mis padres." },
          { en: "What would you do if you were invisible for one day?", es: "¿Qué harías si fueras invisible por un día?" },
          { en: "If I were you, I would consult a lawyer.", es: "Si yo fuera tú, consultaría a un abogado." },
        ],
      },
    ],
    practice: {
      hint: "Usa el Past Simple tras el If y 'would' + forma base en el resultado.",
      exercises: [
        { id: "cond2_1", type: "fill", prompt: "Completa la cláusula hipotética con el verbo en Past Simple:", sentence: "If I ______ (know) the answer, I would tell you.", blanks: [{ accepts: ["knew"] }], explanation: "El pasado de know es irregular: knew." },
        { id: "cond2_2", type: "fill", prompt: "Formula el consejo clásico usando 'were':", sentence: "If I ______ you, I would take that opportunity.", blanks: [{ accepts: ["were", "was"] }], explanation: "En Second Conditional formal se usa 'were' para aconsejar: If I were you." },
        { id: "cond2_3", type: "fill", prompt: "Completa el resultado hipotético con 'would':", sentence: "If we had more money, we ______ (buy) a larger apartment.", blanks: [{ accepts: ["would buy"] }], explanation: "Would + forma base del verbo (buy): would buy." },
        { id: "cond2_4", type: "choice", prompt: "¿Cuál es la expresión idiomática reina para aconsejar a un amigo?", options: ["If I were you, I would...", "If I am you, I will...", "If I was you, I do...", "If I would be you, I..."], answer: 0, explanation: "'If I were you, I would...' es la fórmula idiomática estándar para dar consejos." },
      ],
    },
  },
];
