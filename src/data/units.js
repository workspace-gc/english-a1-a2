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
          ["80 %", "usually / normally", "usualmente", "condiciones normales"],
          ["50 %", "often", "a menudo", "🎧 la t es muda: /ɒfən/"],
          ["30 %", "sometimes", "a veces", "ocurrencia ocasional"],
          ["15 %", "rarely / seldom", "rara vez", "frecuencia muy baja"],
          ["0 %", "never", "nunca", "ocurrencia nula"],
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
      ],
    },
  },

  // =============================================================
  // 10 · Autoevaluación final
  // =============================================================
  {
    id: "final-test",
    num: 10,
    title: "Autoevaluación final",
    tagline: "6 huecos · todo el temario",
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
            " dinner for us.",
          ],
          blanks: [
            {
              index: 0,
              options: ["these", "this"],
              answer: 0,
              explanation:
                "Se requiere el demostrativo plural de cercanía (these) para concordar con el sustantivo plural markers.",
            },
            {
              index: 1,
              options: ["always", "never"],
              answer: 0,
              explanation:
                "Adverbio de frecuencia que indica hábito positivo («siempre»), posicionado antes del verbo principal study.",
            },
            {
              index: 2,
              options: ["go", "went"],
              answer: 1,
              explanation:
                "Forma de Past Simple del verbo irregular go, exigida por el marcador temporal cerrado yesterday.",
            },
            {
              index: 3,
              options: ["library", "bookstore"],
              answer: 0,
              explanation:
                "Library es el término preciso para «biblioteca pública» donde prestan libros (borrow); bookstore es una tienda de venta.",
            },
            {
              index: 4,
              options: ["am doing", "am making"],
              answer: 0,
              explanation:
                "Present Continuous (right now) combinado con do, el verbo requerido para la actividad homework.",
            },
            {
              index: 5,
              options: ["cooking", "cook"],
              answer: 0,
              explanation:
                "Forma de gerundio (-ing) necesaria para completar el Present Continuous tras el verbo is.",
            },
          ],
        },
      ],
    },
  },
];
