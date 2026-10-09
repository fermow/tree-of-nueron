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

## Explore the atlas

The homepage is a scrollable illustrated reading experience, designed for laptop trackpads, phones and keyboards.

- **Timeline:** 47 chronological event cards, grouped into six historical periods.
- **Parallel paths:** research columns within each period, plus three explicit meeting points (Galvani, Bernstein and propagation by 1952).
- **Word origins:** 16 illustrated terminology histories with documented and approximate dates distinguished.
- Search names, years, titles, research questions and concepts. Use `/` to focus search.
- Combine historical-period, research-thread and milestone-type filters.
- Choose the **12-stop essential journey** for a first reading; all other stories remain available.
- Every event and term has a credited image, a dedicated reading page and references. Some related stories share an appropriate image.
- Detail pages include section navigation, previous/next stories, and related research connections.
- Recently opened stories and a continue-reading link are saved in browser-local storage. No account or tracking service is needed.
- Images load online from Wikimedia Commons. An image-source link remains available if an image fails. All text and teaching sketches are local.

To update an existing clone:

```bash
git pull
make up
```

The page assets use versioned URLs to avoid stale browser caches after this redesign. No runtime packages or build step are needed.

## Content architecture

Historical content lives in `assets/data.js`, research explanations in `assets/research.js`, and word histories in `assets/terms.js`. `assets/atlas.js` renders the chronological index, filters and parallel views; `assets/atlas.css` styles the homepage. The reading pages share `assets/reader.css` and `assets/reader.js`.

`assets/graph.js` preserves the research relationships, including branching and convergence. Connections relate evidence and questions; they are not proof of direct personal influence. The earlier pan-and-zoom renderer remains in `assets/tree.js` for reference but is not loaded by the reading-first homepage.

Curated image assignments and captions are in `assets/media.js`, extending `assets/visuals.js`. Every image links to its Commons description page for provenance and reuse terms. The catalogue is in [IMAGE_SOURCES.md](IMAGE_SOURCES.md). Captions distinguish original apparatus, later portraits, micrographs and modern explanatory diagrams. Images are not represented as evidence of a naming date or as a different investigator’s original experiment.

The supplied PDFs are the core source corpus, supplemented where needed by linked historical scholarship and primary works. The pre-Galvani context, Galvani's 1780 laboratory program, and the 1781 distant-spark account rely especially on Piccolino's historical study and Galvani's 1791 publication. The PDFs are not duplicated in this repository; detail pages identify relevant PDF pages where applicable and link the cited primary and secondary references. The extra research notes are in [`assets/research.js`](assets/research.js). A historical reconstruction or summarized evidence sequence is not a complete laboratory replication protocol. Confidence statements distinguish support for a narrow observation from support for a broader historical model; they are qualitative, not numerical probabilities.

Terminology history lives in [`assets/terms.js`](assets/terms.js). Its entries are linked to related observations; their dates track documented usage or approximate periods, rather than implying every word was coined in one moment. In particular, the historical sources used here do not establish a precise first neuronal use of *soma*.

The event page illustrations and image credits live in [`assets/visuals.js`](assets/visuals.js). Historical and explanatory images load from Wikimedia Commons when online; captions distinguish original sources, later depictions and modern reconstructions. Each links to its Commons page for provenance and license. The three-part sketches are teaching abstractions, not facsimiles of historical apparatus.

The osmosis and cell-boundary strand now starts with Nollet's natural-membrane observation (1748), continues through Dutrochet's endosmometer (1826), Nägeli and Cramer's plant-cell plasmolysis (1855), and Pfeffer's supported artificial membrane (1877), then reaches Overton's permeability comparisons (1895–1899). These are related questions, not one continuous experiment; especially, an animal bladder and an artificial copper-ferrocyanide film are not the living cell's lipid membrane.

Bernstein's differential rheotome study (1868) and membrane hypothesis (1902) are separate milestones. The 1902 page maps three contributing paths: earlier electrical recordings, work on selective cell boundaries, and Nernst's electrochemical relation (1889). The temperature experiment measured a cut-to-intact frog-muscle injury current; it did not directly measure the intracellular resting voltage. The displayed K⁺ equilibrium equation is a modern teaching form under simplified assumptions, and the later positive overshoot exposed the limit of Bernstein's excitation proposal.

The myelin strand follows Virchow's 1854 name, Ranvier's gaps, Thudichum's chemical investigation, Schmitt's diffraction evidence, Tasaki's 1939 node-based findings, Huxley and Stämpfli's 1949 test, and a separate 1952 study by Hodler, Stämpfli and Tasaki. Parallel glial work identifies oligodendrocytes before their central-myelin role was demonstrated. Electron microscopy by Ben Geren (1954) and Bunge, Bunge and Pappas (1962) traces peripheral and central myelin origins respectively. The 1952 Hodgkin–Huxley squid-axon model and saltatory conduction in myelinated peripheral fibers are complementary findings from distinct preparations. Four dedicated word-history nodes distinguish earlier medullary terms, the 1854 name *myelin*, Ranvier's eponym and saltatory conduction.

## Validation

```bash
make check
```

Checks cover all 63 detail pages and image assignments, reference integrity, chronology, search, combined filters, parallel views, deep links, and the essential journey. They do not test remote image delivery or replace visual browser QA.

The project is intentionally buildless: plain HTML, CSS, SVG, and JavaScript.
