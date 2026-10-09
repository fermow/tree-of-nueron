# Tree of Neuron

An interactive, source-backed history of how the modern neuron concept emerged - from the ancient Greek word *neûron* to the Hodgkin-Huxley ionic model of the action potential.

The repository name intentionally follows the requested spelling: `tree-of-nueron`.

## Run locally

Requirements: Python 3 and Make.

```bash
git clone https://github.com/fermow/tree-of-nueron.git
cd tree-of-nueron
make up
```

Open [http://127.0.0.1:8989](http://127.0.0.1:8989).

Use another port if needed:

```bash
PORT=9000 make up
```

## What is included

- 25 milestones sorted chronologically from c. 700 BCE to 1952
- five concurrent, zoomable research threads with approximate chronological order from left to right
- search by scientist, discovery, date, question, or concept
- a dedicated detail page for every node
- question, method, experimental steps, observation, result/model, limitation, next question, and references
- for every milestone: why the question arose, the evidence type, a source-grounded procedure, what the result answers, and a qualitative assessment of its limits
- responsive keyboard and touch controls
- no runtime dependencies or build step

## Controls

- drag to move through the tree
- scroll, pinch, use `+` / `-`, or adjust the on-screen zoom slider
- use the colored thread buttons to jump between lines of inquiry
- press `/` to search
- press `0` to reset the view
- click a card to open its full evidence page; use the back link to return

## Content architecture

All historical content lives in [`assets/data.js`](assets/data.js). Add another object to the `events` array and supply an `era` plus one or more reference IDs. For placement on the map, also add its id and approximate horizontal coordinate to `xById` in [`assets/tree.js`](assets/tree.js); the detail view then updates automatically. Coordinates reflect approximate order, not a proportional time scale. Colored horizontal paths indicate overlapping research, and dashed cross-links are selected conceptual relationships, not direct ancestry.

The supplied PDFs were used as the source corpus. They are not duplicated in this repository; the detail pages identify the relevant PDF pages and link the cited primary and secondary references. The extra research notes are in [`assets/research.js`](assets/research.js). A historical reconstruction or summarized evidence sequence is not a complete laboratory replication protocol. Confidence statements distinguish support for a narrow observation from support for a broader historical model; they are qualitative, not numerical probabilities.

## Validation

```bash
make check
```

The project is intentionally buildless: plain HTML, CSS, SVG, and JavaScript.
