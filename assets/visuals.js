// Commons file pages provide the provenance and current reuse terms. Images
// illustrate a historical person, instrument or document; captions distinguish
// later depictions from an original experiment. Every event also has a local
// SVG evidence sketch, so the page remains useful offline or if media fails.
window.NEURON_VISUALS = {
  archive: {
    galen: { file: "Galen-Pig-Vivisection.jpg", credit: "1541 edition of Galen's works", caption: "A later printed depiction of the recurrent-laryngeal-nerve demonstration." },
    vesalius: { file: "1543, Andreas Vesalius' Fabrica, Base Of The Brain.jpg", credit: "Andreas Vesalius, 1543", caption: "The base of the brain in Vesalius's Fabrica." },
    willis: { file: "T. Willis \"cerebri anatome\", 1664; illustration Wellcome L0008516.jpg", credit: "Wellcome Collection / Cerebri Anatome", caption: "A brain illustration from Willis's 1664 anatomical work." },
    "haller-irritability": { file: "Haller portrait 1745.png", credit: "Portrait of Albrecht von Haller, 1745", caption: "Haller's direct-muscle-stimulation work challenged purely nerve-fluid explanations." },
    "galvani-deliberate": { file: "Luigi Galvani Experiment.jpeg", credit: "Luigi Galvani, De viribus, plate I", caption: "Galvani's published frog preparations illustrate the broader research program, not a photograph of the 1780 session." },
    "galvani-distant-spark": { file: "Galvani frog legs experiment setup.png", credit: "Galvani, De viribus, 1791", caption: "Published engraving of excitation at a distance; the observation was recorded in 1781." },
    galvani: { file: "Luigi Galvani Experiment.jpeg", credit: "Luigi Galvani, De viribus, 1791", caption: "A plate from the work that presented Galvani's animal-electricity interpretation." },
    volta: { file: "Volta batteries.jpg", credit: "Alessandro Volta, 1800", caption: "Volta's drawings of the pile and crown of cups." },
    nobili: { file: "Astatic Galvanometer.svg", credit: "PieterJanR / Wikimedia Commons", caption: "A later diagram of the astatic galvanometer principle." },
    "du-bois-reymond": { file: "Experiment for Observing the Negative Variation.jpg", credit: "LovelyOliveGreen / Wikimedia Commons", caption: "A modern reconstruction of the frog preparation used to study negative variation." },
    helmholtz: { file: "Von Helmholtz' pendulum. Wellcome L0010379.jpg", credit: "Wellcome Collection", caption: "A pendulum apparatus associated with measurements of nerve impulse speed." },
    deiters: { file: "Deiters-axon.JPG", credit: "Otto Deiters, 1865", caption: "Deiters's drawing distinguishes a long process from the other extensions." },
    golgi: { file: "Golgi Hippocampus.jpg", credit: "Camillo Golgi, historical drawing", caption: "Golgi's hippocampal drawing shows the anatomy his staining helped expose." },
    "cajal-waldeyer": { file: "CajalHippocampus.jpeg", credit: "Santiago Ramón y Cajal, 1911", caption: "A later Cajal drawing of hippocampal circuits, illustrating separate neural forms." },
    names: { file: "Purkinje cell by Cajal.png", credit: "Santiago Ramón y Cajal, historical drawing", caption: "A Purkinje-cell drawing helps distinguish cell body, branching processes and axon; it is not the 1891 naming document." },
    "hodgkin-huxley-1952": { file: "Spike HH.png", credit: "Wikimedia Commons, modern plot", caption: "A modern visualization of the action-potential shape explained by the 1952 model." }
  },
  // A compact visual vocabulary for each question. These are teaching
  // abstractions, never presented as literal apparatus reconstructions.
  scenes: {
    "word-before-cell": ["neûron = cord", "anatomical usage", "cellular unit", "word"],
    alcmaeon: ["eye and senses", "possible passages", "brain-centered view", "brain"],
    "sacred-disease": ["recurring seizures", "natural explanation", "brain as source", "brain"],
    aristotle: ["heart and brain", "compare living signs", "heart-centered model", "brain"],
    herophilus: ["human dissection", "trace distinct cords", "nerves as pathways", "fibers"],
    galen: ["pig's larynx", "interrupt one nerve", "voice is lost", "fibers"],
    vesalius: ["human anatomy", "check inherited maps", "corrected structures", "brain"],
    willis: ["brain and nerves", "map their connections", "integrated system", "brain"],
    "leeuwenhoek-fontana": ["one visible cord", "tease and magnify", "many fine fibers", "fibers"],
    "electrical-medicine": ["electrical machine", "apply a discharge", "muscle contracts", "frog"],
    "haller-irritability": ["exposed muscle", "stimulate it directly", "intrinsic response", "frog"],
    "walsh-electric-fish": ["torpedo or eel", "test conductive path", "animal discharge", "electric"],
    "galvani-deliberate": ["frog nerve + leg", "apply external charge", "visible twitch", "frog"],
    "galvani-distant-spark": ["frog near machine", "spark without wire", "contact-dependent twitch", "frog"],
    galvani: ["frog preparations", "compare arrangements", "animal-electricity idea", "frog"],
    volta: ["two unlike metals", "stack with electrolyte", "voltage without frog", "electric"],
    nobili: ["frog preparation", "sensitive galvanometer", "needle deflection", "electric"],
    "remak-schwann": ["nerve fiber", "microscopy + cell theory", "cell-related structure", "fibers"],
    matteucci: ["injured muscle", "contact two surfaces", "potential difference", "electric"],
    "du-bois-reymond": ["resting preparation", "stimulate and measure", "negative variation", "wave"],
    helmholtz: ["two nerve sites", "compare muscle delays", "finite signal speed", "wave"],
    deiters: ["isolated nerve cell", "trace all processes", "one long extension", "neuron"],
    golgi: ["crowded nervous tissue", "sparse silver stain", "whole cell visible", "neuron"],
    "cajal-waldeyer": ["stained young tissue", "follow cell endings", "distinct neural units", "neuron"],
    names: ["older part names", "compare publications", "modern vocabulary", "word"],
    overton: ["many solutes", "compare cell entry", "selective boundary", "membrane"],
    bernstein: ["ion gradient", "membrane model", "resting voltage", "membrane"],
    "hodgkin-huxley-1939": ["squid giant axon", "record from inside", "positive overshoot", "wave"],
    "hodgkin-katz-1949": ["squid axon", "lower external Na⁺", "smaller spike", "membrane"],
    "hodgkin-huxley-1952": ["squid axon", "clamp voltage", "Na⁺ and K⁺ currents", "membrane"]
  }
};
