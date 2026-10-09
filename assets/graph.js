// These connections express research questions and evidence relationships,
// not a claim that every investigator directly read or influenced the next.
window.NEURON_GRAPH = {
  positions: {
    aristotle: { y: 560 },
    "electrical-medicine": { x: 3380, y: 880 },
    "haller-irritability": { y: 1200 },
    "walsh-electric-fish": { y: 560 }
  },
  colors: {
    "electrical-medicine": "#B88A2D",
    "haller-irritability": "#986A6E",
    "walsh-electric-fish": "#4C8390"
  },
  topics: {
    "electrical-medicine": "External stimulation",
    "haller-irritability": "Muscle physiology",
    "walsh-electric-fish": "Animal electricity",
    "galvani-deliberate": "Nerve–muscle response",
    "galvani-distant-spark": "Distant stimulation",
    galvani: "Animal electricity hypothesis"
  },
  // The three investigations are concurrent context for Galvani, not a
  // literal single predecessor. Their branches share a question marker.
  fork: {
    x: 3150, top: 560, bottom: 1200, center: 880,
    label: "What makes muscle contract?",
    branches: ["electrical-medicine", "haller-irritability", "walsh-electric-fish"],
    join: "galvani-deliberate"
  },
  strands: [
    { id: "early", color: "roots", links: [
      ["word-before-cell", "alcmaeon"], ["alcmaeon", "sacred-disease"],
      ["alcmaeon", "aristotle"], ["sacred-disease", "herophilus"],
      ["aristotle", "herophilus"]
    ] },
    { id: "anatomy", color: "anatomy", links: [
      ["herophilus", "galen"], ["galen", "vesalius"],
      ["vesalius", "willis"], ["willis", "leeuwenhoek-fontana"]
    ] },
    { id: "electrical", color: "electricity", links: [
      ["galvani-deliberate", "galvani-distant-spark"],
      ["galvani-distant-spark", "galvani"], ["galvani", "volta"],
      ["volta", "nobili"], ["nobili", "matteucci"],
      ["matteucci", "du-bois-reymond"], ["du-bois-reymond", "helmholtz"]
    ] },
    { id: "cellular", color: "cell", links: [
      ["remak-schwann", "deiters"], ["deiters", "golgi"],
      ["golgi", "cajal-waldeyer"], ["cajal-waldeyer", "names"]
    ] },
    { id: "membrane", color: "ions", links: [
      ["overton", "bernstein"], ["bernstein", "hodgkin-huxley-1939"],
      ["hodgkin-huxley-1939", "hodgkin-katz-1949"],
      ["hodgkin-katz-1949", "hodgkin-huxley-1952"]
    ] }
  ],
  // Dotted links mean related evidence came together, without asserting a
  // direct lineage of influence or a single uninterrupted experiment.
  bridges: [["names", "bernstein"], ["du-bois-reymond", "bernstein"]]
};
