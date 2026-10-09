window.NEURON_TERMS = {
  references: {
    T1: { label: "Mehta et al. Etymology and the neuron(e). Brain (2020).", url: "https://academic.oup.com/brain/article/143/1/374/5679563" },
    T2: { label: "Bentivoglio. 1896–1996: The Centennial of the Axon (1996).", url: "https://pubmed.ncbi.nlm.nih.gov/8973835/" },
    T3: { label: "Bentivoglio et al. Original Golgi slides and neuronal structure (2019).", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6388087/" },
    T4: { label: "Tansey. Not Committing Barbarisms: Sherrington and the Synapse, 1897 (1997).", url: "https://pubmed.ncbi.nlm.nih.gov/9323432/" },
    T5: { label: "UTHealth Neuroscience Online: cell body, soma, perikaryon.", url: "https://nba.uth.tmc.edu/neuroscience/s1/chapter08.html" },
    T6: { label: "Liddell–Scott Greek–English Lexicon: σῶμα (sōma).", url: "https://atlas.perseus.tufts.edu/lemma/6013/" },
    T7: { label: "Tansey. The synapse: people, words and connections (2022).", url: "https://pubmed.ncbi.nlm.nih.gov/35813266/" },
    T8: { label: "Boullerne. The history of myelin: Fontana's microscopic descriptions (2016).", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5010938/" }
  },
  items: [
    {
      id: "neuron-greek", word: "neûron", date: "c. 700–650 BCE", sort: -700, x: 370, y: 400, anchor: "word-before-cell",
      former: "νεῦρον / neûron", current: "Not yet a nerve cell", kind: "Ancient word", exactDate: false,
      origin: "Classical Greek νεῦρον (neûron), plural νεῦρα (neûra): sinew, tendon, cord, sometimes a bowstring. Homer used it for sinews and bowstring material.",
      story: "This is the beginning of a word's history, not the discovery of the structure we now call a neuron. A word for a cord-like material could later be reused as anatomy became more precise.",
      transition: "From ordinary cord or sinew → a broad anatomical term for a cord-like structure → the much later cellular meaning of neuron.",
      caution: "The date is an approximate date of surviving literary use. It is not an invention date for the word and does not imply knowledge of nerve cells.",
      lineage: [{when:"Homeric Greek",term:"neûron / neûra",meaning:"Sinew, tendon, cord or bowstring"},{when:"Hellenistic anatomy",term:"neura",meaning:"Cord-like structures linked with brain and spinal cord"},{when:"1891",term:"neuron",meaning:"A proposed name for the complete cellular unit"}],
      refs: ["T1"], related: ["neura-anatomy", "neuron-1891"]
    },
    {
      id: "neura-anatomy", word: "neura", date: "c. 3rd century BCE", sort: -300, x: 1650, y: 400, anchor: "herophilus",
      former: "Cord / sinew", current: "Nerve (anatomical sense)", kind: "Meaning shift", exactDate: false,
      origin: "The older Greek plural νεῦρα (neûra) was increasingly applied to structures anatomists associated with the brain and spinal cord. Accounts of Herophilus and Erasistratus survive largely through later authors.",
      story: "Dissection made it useful to distinguish nerves from vessels and tendons. The word did not suddenly change meaning everywhere; its anatomical sense sharpened across a long period.",
      transition: "The same Greek word moved from a general resemblance to sinew toward a more specific designation for neural cords.",
      caution: "The time is approximate. The original works are lost, and a single first use of the modern anatomical sense cannot be securely assigned.",
      lineage: [{when:"Earlier Greek",term:"neûron",meaning:"Sinew, cord, bowstring"},{when:"Hellenistic medicine",term:"neura",meaning:"Cords associated with brain and spinal cord"},{when:"Modern anatomy",term:"nerves",meaning:"Bundles of nerve fibers, distinct from a neuron"}],
      refs: ["T1"], related: ["neuron-greek", "nervus", "neuron-1891"]
    },
    {
      id: "nervus", word: "nervus", date: "Classical Latin", sort: -100, x: 1970, y: 400, anchor: "galen",
      former: "Sinew / tendon", current: "Nerve", kind: "Latin word and later English lineage", exactDate: false,
      origin: "Latin nervus also had a broad range of meanings, including sinew and cord. It is the historical source of English nerve.",
      story: "When anatomical descriptions became more specific, an inherited Latin term could denote the cords connecting central organs to the body. In later English, nerve names a bundle of many fibers, especially in the peripheral nervous system.",
      transition: "Latin nervus → later European medical usage → English nerve. This linguistic lineage is distinct from the Greek-derived scientific name neuron.",
      caution: "No defensible single year of coinage is supplied by these sources. Nervus and neuron are related in subject, but English nerve does not mean one complete nerve cell.",
      lineage: [{when:"Classical Latin",term:"nervus",meaning:"Sinew, cord, later nerve"},{when:"Later medical language",term:"nerve",meaning:"A more specific anatomical pathway"},{when:"Today",term:"nerve",meaning:"A bundle of fibers, not a synonym for one neuron"}],
      refs: ["T1"], related: ["neura-anatomy", "neuron-1891"]
    },
    {
      id: "neurologia", word: "Neurologia", date: "1664", sort: 1664, x: 2620, y: 720, anchor: "willis",
      former: "Doctrine of the nerves", current: "Neurology", kind: "Name of a field", exactDate: true,
      origin: "Thomas Willis used a Greek-derived form, νευρολογία / Neurologia, in his 1664 Latin work Cerebri Anatome. It described the study or doctrine of nerves.",
      story: "Willis combined descriptions of brain, spinal cord and nerves. Naming a field signaled a growing effort to study these structures together, long before the cellular neuron had its modern name.",
      transition: "Greek neuro- (nerve) + -logia (study or account) → Neurologia → neurology.",
      caution: "This is a term for a field of study, not the name of a nerve cell or its parts. The date refers to a documented publication, not necessarily every prior use of similar wording.",
      lineage: [{when:"Before 1664",term:"nerves / nervous anatomy",meaning:"Descriptions of neural cords and organs"},{when:"Willis, 1664",term:"Neurologia",meaning:"Doctrine or study of nerves"},{when:"Today",term:"neurology",meaning:"Field concerned with the nervous system"}],
      refs: ["T1"], related: ["nervus", "neuron-1891"]
    },
    {
      id: "primitive-cylinders", word: "Primitive cylinders", date: "1781", sort: 1781, x: 2940, y: 720, anchor: "leeuwenhoek-fontana",
      former: "A thick white cord", current: "Nerve fibers", kind: "Microscopic description", exactDate: true,
      origin: "Fontana separated a fresh nerve in water with fine needles and described transparent primitive nervous cylinders under the microscope.",
      story: "A nerve visible to the naked eye had looked like one thick cord. Mechanical separation and microscopy made its finer components visible. The descriptive name reflected appearance before cellular continuity was understood.",
      transition: "Thick nerve cord → primitive nervous cylinders → nerve fibers; only later was a fiber related to the long process of a cell.",
      caution: "Primitive cylinder is a historical description, not the modern definition of an axon. Early observers could not yet establish the whole cell-to-fiber relationship.",
      lineage: [{when:"Macroscopic anatomy",term:"nerve / cord",meaning:"One thick visible structure"},{when:"Fontana, 1781",term:"primitive nervous cylinders",meaning:"Fine components revealed by teasing"},{when:"19th century onward",term:"nerve fibers",meaning:"Finer components of a nerve bundle"}],
      refs: ["T8", "T2"], related: ["axis-cylinder", "axon-1896"]
    },
    {
      id: "soma-cell-body", word: "Cell body / soma", date: "By 1865 · term later", sort: 1865, x: 4660, y: 1040, anchor: "deiters",
      former: "Ganglion cell / cell body", current: "Soma", kind: "Structure known; naming date uncertain", exactDate: false,
      origin: "Greek σῶμα (sōma) means body. In current neuroscience, soma is another name for the nucleated cell body. Deiters depicted a cell body with its processes in 1865, using descriptive language rather than a securely dated coinage of soma.",
      story: "The central body was observed before all its extensions were understood as parts of one cell. Once the long and short processes received their own names, cell body or soma gave the central part a distinct label.",
      transition: "Nerve or ganglion cell body → cell body distinguished from its processes → modern soma as a synonym for that main region.",
      caution: "The sources here do not establish a single year or inventor for the neuronal use of soma. The node's position marks the documented anatomical structure, not an invented coinage date.",
      lineage: [{when:"19th-century anatomy",term:"ganglion cell / cell body",meaning:"Nucleated central part"},{when:"Deiters, 1865",term:"cell body with processes",meaning:"One recognizable unit is drawn"},{when:"Modern terminology",term:"soma",meaning:"The cell body, as distinct from axon and dendrites"}],
      refs: ["T1", "T5", "T6"], related: ["protoplasmic-processes", "axis-cylinder", "neuron-1891"]
    },
    {
      id: "protoplasmic-processes", word: "Protoplasmic processes", date: "1865", sort: 1865, x: 4890, y: 1040, anchor: "deiters",
      former: "Short branching processes", current: "Dendrites", kind: "Old anatomical label", exactDate: true,
      origin: "Deiters' cell drawings distinguished multiple branching protoplasmic extensions from a single longer axis-cylinder process.",
      story: "Before the branch-like extensions had their modern name, their appearance and relation to the cell body were described with broader words such as process or protoplasmic extension.",
      transition: "Branching / protoplasmic processes → dendrites (His, 1889).",
      caution: "The 1865 date belongs to Deiters' posthumous anatomical publication. It does not imply that he coined the later term dendrite or knew every modern dendritic function.",
      lineage: [{when:"Deiters, 1865",term:"protoplasmic processes",meaning:"Multiple short branching extensions"},{when:"His, 1889",term:"dendrites",meaning:"Tree-like processes named"},{when:"Today",term:"dendrites",meaning:"Branching neuronal processes"}],
      refs: ["T1", "T3"], related: ["dendrite-1889", "soma-cell-body"]
    },
    {
      id: "axis-cylinder", word: "Axis cylinder", date: "By 1865", sort: 1865, x: 5120, y: 1040, anchor: "deiters",
      former: "Nerve process / primitive band", current: "Axon", kind: "Old anatomical label", exactDate: false,
      origin: "The long process was described as an axis-cylinder process; Remak's Primitivband and related terms were also used before axon became standard.",
      story: "Deiters distinguished one long process from several shorter branching ones in his 1865 drawings. Researchers were seeing different parts before a stable common vocabulary existed.",
      transition: "Primitive band / axis cylinder / nerve process → neuraxon or axon (Kölliker, 1896).",
      caution: "This is a period label, not a claim that Deiters invented axis cylinder. The date indicates documented use of the distinction in his published drawing.",
      lineage: [{when:"Earlier 19th century",term:"Primitivband / nerve process",meaning:"Long fiber-like element"},{when:"By 1865",term:"axis cylinder",meaning:"One long process distinguished from branches"},{when:"1896",term:"axon / neuraxon",meaning:"Modern name introduced"}],
      refs: ["T1", "T2", "T3"], related: ["axon-1896", "protoplasmic-processes"]
    },
    {
      id: "dendrite-1889", word: "Dendrite", date: "1889", sort: 1889, x: 5470, y: 1040, anchor: "names",
      former: "Protoplasmic processes", current: "Dendrite", kind: "Modern naming milestone", exactDate: true,
      origin: "Wilhelm His proposed dendrite in 1889 for branching neuronal processes. The root is Greek δένδρον (déndron), tree, reflecting their branching shape.",
      story: "Cells with a central body, multiple short branches and a single long process were already being drawn. Naming the branches separately helped distinguish them from the long axis-cylinder process.",
      transition: "Protoplasmic / branching processes → dendrite or dendron → the modern plural dendrites.",
      caution: "Naming in 1889 is not the date the structures were first seen. Their function and all forms of information flow were not settled by the word itself.",
      lineage: [{when:"Deiters, 1865",term:"protoplasmic processes",meaning:"Branching extensions"},{when:"His, 1889",term:"dendrite",meaning:"Tree-like name proposed"},{when:"Today",term:"dendrites",meaning:"Branching processes of a neuron"}],
      refs: ["T3"], related: ["protoplasmic-processes", "axon-1896", "soma-cell-body"]
    },
    {
      id: "neuron-1891", word: "Neuron", date: "1891", sort: 1891, x: 5700, y: 1040, anchor: "names",
      former: "Nerve cell / nerve unit", current: "Neuron", kind: "Modern naming milestone", exactDate: true,
      origin: "Waldeyer proposed das Neuron / die Neuronen in 1891 for the complete nerve unit: cell body, nerve process, collaterals and end branches. Alexander Hill's 1891 English translation used neuron in this sense.",
      story: "Microscopy by Deiters, Golgi and Cajal had made a whole cellular unit with processes increasingly plausible. Waldeyer synthesized this evidence under one name rather than discovering the cell alone.",
      transition: "Greek neûron (broad cord/sinew) → nineteenth-century nerve cell or nerve unit → neuron as the complete cellular unit (1891).",
      caution: "The word neuron had other English uses before 1891, including for a whole neuraxis. The milestone is its specific cellular meaning, not the first written occurrence of the letters.",
      lineage: [{when:"Ancient Greek",term:"neûron",meaning:"Sinew or cord"},{when:"Before 1891",term:"nerve cell / nerve unit",meaning:"Cell and processes described separately"},{when:"Waldeyer, 1891",term:"Neuron",meaning:"The whole cellular unit"}],
      refs: ["T1", "T3"], related: ["neuron-greek", "nervus", "soma-cell-body"]
    },
    {
      id: "axon-1896", word: "Axon", date: "1896", sort: 1896, x: 5930, y: 1040, anchor: "names",
      former: "Axis cylinder / primitive band", current: "Axon", kind: "Modern naming milestone", exactDate: true,
      origin: "Rudolf Albert von Kölliker introduced axon or neuraxon in 1896 for the long process previously called axis cylinder or, in Remak's terminology, primitive band. The name draws on the Greek word for an axis.",
      story: "Earlier dissections and drawings had separated one long extension from the short, branching protoplasmic extensions. Kölliker's new word made that distinction easier to teach and share.",
      transition: "Primitivband / axis cylinder / long nerve process → neuraxon / axon (1896).",
      caution: "Kölliker named an already studied structure. 1896 is a terminology milestone, not the first observation of a long cell process.",
      lineage: [{when:"Remak / Deiters",term:"primitive band / axis cylinder",meaning:"Long process attached to cell body"},{when:"Kölliker, 1896",term:"neuraxon / axon",meaning:"Dedicated name for the long process"},{when:"Today",term:"axon",meaning:"The neuron's long output process"}],
      refs: ["T2", "T3", "T1"], related: ["axis-cylinder", "dendrite-1889"]
    },
    {
      id: "synapse-1897", word: "Synapse", date: "1897", sort: 1897, x: 6160, y: 1040, anchor: "names",
      former: "Contact / nervous articulation", current: "Synapse", kind: "Modern naming milestone", exactDate: true,
      origin: "The term appeared in the 1897 seventh edition of Michael Foster's Textbook of Physiology. Sherrington developed and advocated the physiological concept; historical research credits Cambridge classicist Arthur Verrall with suggesting the word. It joins Greek syn- (together) and haptein (to clasp).",
      story: "Cajal's evidence favored distinct cells that came close rather than fused. A name was needed for the functional point of contact where one neural element influenced another.",
      transition: "Close contact / nervous articulation → synapsis / synapse (1897) → today's specialized junction between cells.",
      caution: "The naming did not prove the molecular mechanism or even directly image a modern synaptic cleft. Credit for the physiological concept and for proposing the exact word should be distinguished.",
      lineage: [{when:"Late 19th-century anatomy",term:"contact / articulation",meaning:"Separate cells meet closely"},{when:"Foster volume, 1897",term:"synapsis / synapse",meaning:"Named functional junction"},{when:"Today",term:"synapse",meaning:"Specialized signaling junction"}],
      refs: ["T4", "T7", "T1"], related: ["neuron-1891", "axon-1896"]
    }
  ]
};
