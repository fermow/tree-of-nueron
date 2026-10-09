const fs = require("node:fs");
const vm = require("node:vm");

const context = { window: {} };
for (const file of ["assets/data.js", "assets/research.js"]) {
  vm.runInNewContext(fs.readFileSync(file, "utf8"), context, { filename: file });
}

const { events, eras, references } = context.window.NEURON_HISTORY;
const research = context.window.NEURON_RESEARCH;
const detailCode = fs.readFileSync("assets/event.js", "utf8");
const ids = new Set();
const eraIds = new Set(eras.map(era => era.id));
for (const [index, event] of events.entries()) {
  if (ids.has(event.id)) throw new Error(`Duplicate event id: ${event.id}`);
  ids.add(event.id);
  if (index && events[index - 1].sort > event.sort) throw new Error(`Out of order: ${event.id}`);
  if (!eraIds.has(event.era)) throw new Error(`Unknown research thread: ${event.id}`);
  if (!research[event.id]) throw new Error(`Missing historical analysis: ${event.id}`);
  if (!event.refs.length || event.refs.some(id => !references[id])) throw new Error(`Missing reference: ${event.id}`);
  for (const field of ["kind", "strength", "background", "procedure", "answer", "caution", "source"]) {
    if (!research[event.id][field]?.trim()) throw new Error(`Missing ${field}: ${event.id}`);
  }
  const root = { innerHTML: "" };
  const page = {
    window: { NEURON_HISTORY: context.window.NEURON_HISTORY, NEURON_RESEARCH: research, location: { search: `?id=${encodeURIComponent(event.id)}` } },
    document: { getElementById: () => root, documentElement: { style: { setProperty() {} } }, title: "" },
    URLSearchParams
  };
  vm.runInNewContext(detailCode, page, { filename: "assets/event.js" });
  if (!["Why did this question arise?", "What the sources describe", "How certain is this conclusion?", "Source trail"].every(label => root.innerHTML.includes(label))) {
    throw new Error(`Incomplete detail page: ${event.id}`);
  }
}
for (const id of Object.keys(research)) if (!ids.has(id)) throw new Error(`Unknown research entry: ${id}`);
console.log(`${events.length} chronological events have analysis, evidence assessments, and valid references.`);
