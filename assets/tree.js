(() => {
  const { events, eras } = window.NEURON_HISTORY;
  const svg = document.getElementById("tree");
  const branchLayer = document.getElementById("branches");
  const nodeLayer = document.getElementById("nodes");
  const termLinkLayer = document.getElementById("termLinks");
  const termNodeLayer = document.getElementById("termNodes");
  const eraLabelLayer = document.getElementById("eraLabels");
  const eraRail = document.getElementById("eraRail");
  const searchInput = document.getElementById("search");
  const searchResults = document.getElementById("searchResults");
  const ns = "http://www.w3.org/2000/svg";

  const eraMap = Object.fromEntries(eras.map(era => [era.id, era]));
  const graph = window.NEURON_GRAPH;
  // Concurrent lines of inquiry. Horizontal position follows approximate
  // chronology; vertical position shows which kind of evidence was developing.
  const laneY = { roots: 240, anatomy: 560, electricity: 880, cell: 1200, ions: 1520, myelin: 1840 };
  const xById = {
    "word-before-cell": 370, alcmaeon: 690, "sacred-disease": 1010,
    aristotle: 1330, herophilus: 1650, galen: 1970,
    vesalius: 2300, willis: 2620, "leeuwenhoek-fontana": 2940,
    "electrical-medicine": 3380, "nollet-osmosis": 3420,
    "haller-irritability": 3580,
    "walsh-electric-fish": 3900, "galvani-deliberate": 4220,
    "galvani-distant-spark": 4540, galvani: 4860, volta: 5180,
    nobili: 5500, "dutrochet-osmosis": 5500,
    "remak-schwann": 5810, matteucci: 5810,
    "du-bois-reymond": 6130, helmholtz: 6450, deiters: 6450,
    "nageli-cramer": 6590, "bernstein-rheotome": 6610, golgi: 6770, "pfeffer-membrane": 7090,
    "cajal-waldeyer": 7090, names: 7410, nernst: 7440, overton: 7730,
    bernstein: 8050, "hodgkin-huxley-1939": 8370,
    "hodgkin-katz-1949": 8690, "hodgkin-huxley-1952": 9010,
    "virchow-myelin": 6260, "ranvier-nodes": 6760,
    "thudichum-lipids": 7180, "rio-oligodendrocytes": 8000,
    "lillie-model": 8260, "schmitt-diffraction": 8670,
    "tasaki-saltatory": 8660, "huxley-stampfli": 9160,
    "myelin-wave-1952": 9600, "ben-geren": 10100, "bunge-central": 10500
  };
  const world = { width: 10900, height: 2820 };
  const card = { width: 276, height: 220 };
  const points = events.map((event, index) => ({
    event, index, x: graph.positions[event.id]?.x ?? xById[event.id],
    y: graph.positions[event.id]?.y ?? laneY[event.era],
    color: graph.colors[event.id] ?? eraMap[event.era].color
  }));
  const pointMap = Object.fromEntries(points.map(point => [point.event.id, point]));
  const terms = window.NEURON_TERMS.items;
  const chapters = [
    { id: "alcmaeon", title: "Where does sensation begin?", cue: "Brain or heart?" },
    { id: "galvani-distant-spark", title: "Can electricity move us?", cue: "A frog leg responds" },
    { id: "cajal-waldeyer", title: "What is one neuron?", cue: "Separate cells emerge" },
    { id: "bernstein", title: "Where does voltage come from?", cue: "The ion gradient" },
    { id: "hodgkin-huxley-1952", title: "What makes the spike?", cue: "Sodium and potassium" },
    { id: "myelin-wave-1952", title: "How does a signal travel?", cue: "Myelin and nodes" }
  ];
  const chapterNav = document.getElementById("chapterNav");
  const currentLocation = document.getElementById("currentLocation");
  const sidebar = document.getElementById("atlasSidebar");
  const menuButton = document.getElementById("menuButton");
  let activeThread = null;

  const create = (name, attrs = {}, text = "") => {
    const element = document.createElementNS(ns, name);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    if (text) element.textContent = text;
    return element;
  };

  // Every solid segment has a named source and target. The old full-width
  // rails implied a single uninterrupted history and obscured parallel work.
  const left = p => p.x - card.width / 2 - 10;
  const right = p => p.x + card.width / 2 + 10;
  const curve = (x1, y1, x2, y2) => {
    const bend = Math.max(18, (x2 - x1) * .46);
    return `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
  };
  graph.strands.forEach(strand => {
    strand.links.forEach(([from, to]) => {
      const a = pointMap[from], b = pointMap[to];
      branchLayer.append(create("path", {
        d: curve(right(a), a.y, left(b), b.y), class: "evidence-link",
        stroke: eraMap[strand.color].color, "data-thread": strand.color
      }));
    });
  });

  // A shared research question branches into three independent approaches.
  // They meet at Galvani's planned experiment; no direct influence among
  // the three investigators is implied by their visual order.
  const fork = graph.fork;
  branchLayer.append(create("path", {
    d: `M ${fork.x} ${fork.top} V ${fork.bottom}`, class: "fork-spine"
  }));
  fork.branches.forEach((id, i) => {
    const target = pointMap[id];
    branchLayer.append(create("circle", {
      cx: fork.x, cy: target.y, r: 8, class: "fork-point", fill: target.color
    }));
    branchLayer.append(create("path", {
      d: curve(fork.x + 8, target.y, left(target), target.y),
      class: "evidence-link", stroke: target.color
    }));
  });
  const join = pointMap[fork.join];
  const joinX = left(join) - 18;
  fork.branches.forEach((id, i) => {
    const source = pointMap[id];
    const fromBelow = id === "walsh-electric-fish";
    branchLayer.append(create("path", {
      d: curve(fromBelow ? source.x + 45 : right(source),
        fromBelow ? source.y + card.height / 2 + 10 : source.y, joinX, join.y),
      class: "evidence-link", stroke: source.color
    }));
  });
  branchLayer.append(create("circle", { cx: joinX, cy: join.y, r: 10, class: "join-point" }));
  branchLayer.append(create("path", {
    d: `M ${joinX + 10} ${join.y} H ${left(join)}`,
    class: "evidence-link", stroke: eraMap.electricity.color
  }));
  eraLabelLayer.append(create("text", {
    x: joinX - 94, y: join.y - 145, class: "join-label"
  }, "EVIDENCE MEETS"));
  const forkLabel = create("g", { class: "question-label", transform: "translate(3900 1150)" });
  forkLabel.append(create("text", { x: 0, y: 0 }, fork.label),
    create("text", { x: 0, y: 22, class: "question-caption" }, "Three concurrent approaches · 1740s–1770s"));
  eraLabelLayer.append(forkLabel);

  // Dotted bridges summarize ideas brought together later, not direct
  // scientist-to-scientist influence. Route the long one below cell cards.
  graph.bridges.forEach(([from, to]) => {
    const a = pointMap[from], b = pointMap[to];
    const d = from === "du-bois-reymond"
      ? `M ${right(a)} ${a.y} C ${right(a) + 50} ${a.y + 10}, ${right(a) + 65} 1370, ${right(a) + 120} 1370 H ${left(b) - 135} Q ${left(b) - 22} 1370 ${left(b)} ${b.y}`
      : curve(right(a), a.y, left(b), b.y);
    branchLayer.append(create("path", { d, class: "concept-link" }));
  });

  points.forEach(p => {
    const foreign = create("foreignObject", {
      x: p.x - card.width / 2, y: p.y - card.height / 2,
      width: card.width, height: card.height, class: "node-foreign"
    });
    const link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    link.className = "history-card event-link";
    if (chapters.some(chapter => chapter.id === p.event.id)) link.classList.add("turning-point");
    link.href = `event.html?id=${encodeURIComponent(p.event.id)}`;
    link.dataset.id = p.event.id;
    link.dataset.era = p.event.era;
    link.style.setProperty("--node-color", p.color);
    link.setAttribute("aria-label", `${p.event.date}: ${p.event.title} — ${p.event.person}. Read the full experiment.`);
    const top = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
    top.className = "card-top";
    const date = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
    date.className = "card-date";
    date.textContent = p.event.date;
    const number = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
    number.className = "card-number";
    number.textContent = String(p.index + 1).padStart(2, "0");
    top.append(date, number);
    const topic = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
    topic.className = "card-topic";
    topic.textContent = graph.topics[p.event.id] || eraMap[p.event.era].label;
    const title = document.createElementNS("http://www.w3.org/1999/xhtml", "strong");
    title.className = "card-title";
    title.textContent = p.event.title;
    const bottom = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
    bottom.className = "card-bottom";
    const person = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
    person.className = "card-scientist";
    person.textContent = p.event.person;
    const arrow = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
    arrow.textContent = "↗";
    bottom.append(person, arrow);
    link.append(top, topic, title, bottom);
    foreign.append(link);
    nodeLayer.append(foreign);
  });

  // A small branch connects a historical label with the observation or
  // synthesis that gives it context. Its date remains independent of that card.
  terms.forEach(term => {
    const anchor = pointMap[term.anchor];
    const above = term.y < anchor.y;
    const startY = anchor.y + (above ? -1 : 1) * card.height / 2;
    const endY = term.y + (above ? 1 : -1) * 40;
    termLinkLayer.append(create("path", {
      d: `M ${anchor.x} ${startY} Q ${(anchor.x + term.x) / 2} ${(startY + endY) / 2} ${term.x} ${endY}`,
      class: "term-branch"
    }));
    const foreign = create("foreignObject", {
      x: term.x - 104, y: term.y - 40, width: 208, height: 80, class: "node-foreign"
    });
    const link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    link.className = "term-card event-link";
    link.href = `term.html?id=${encodeURIComponent(term.id)}`;
    link.dataset.id = term.id;
    link.setAttribute("aria-label", `${term.word}, ${term.date}. Explore the word's history.`);
    const date = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
    date.className = "term-date";
    date.textContent = term.date;
    const title = document.createElementNS("http://www.w3.org/1999/xhtml", "strong");
    title.className = "term-word";
    title.textContent = term.word;
    link.append(date, title);
    foreign.append(link);
    termNodeLayer.append(foreign);
  });

  function closeSidebar() {
    sidebar.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  function selectThread(thread, move = true) {
    activeThread = thread;
    document.querySelectorAll(".era-chip").forEach(chip => chip.classList.toggle("active", chip.dataset.thread === (thread || "all")));
    document.querySelectorAll(".history-card").forEach(card => card.classList.toggle("is-muted", !!thread && (thread === "words" || card.dataset.era !== thread)));
    document.querySelectorAll(".term-card").forEach(card => card.classList.toggle("is-muted", !!thread && thread !== "words"));
    document.querySelectorAll(".evidence-link").forEach(path => path.classList.toggle("is-muted", !!thread && path.dataset.thread !== thread));
    document.querySelectorAll(".concept-link, .fork-spine, .fork-point, .join-point").forEach(path => path.classList.toggle("is-muted", !!thread));
    document.querySelectorAll(".thread-label").forEach(label => label.classList.toggle("is-muted", !!thread && label.dataset.thread !== thread));
    if (move && thread) {
      if (thread === "words") { currentLocation.textContent = "The names behind the discoveries"; focusAt(7130, 1090, 1180); }
      else {
        const first = points.find(point => point.event.era === thread);
        currentLocation.textContent = eraMap[thread].label;
        focusAt(first.x + 350, first.y, 1220);
      }
      closeSidebar();
    }
  }

  const allChip = document.createElement("button");
  allChip.type = "button";
  allChip.className = "era-chip active";
  allChip.dataset.thread = "all";
  allChip.innerHTML = `<i style="--era-color:#C7A15E"></i><span>All research paths</span><small>${events.length}</small>`;
  allChip.addEventListener("click", () => { selectThread(null, false); currentLocation.textContent = "All research paths"; closeSidebar(); });
  eraRail.append(allChip);

  eras.forEach(era => {
    const first = points.find(point => point.event.era === era.id);
    const label = create("g", { class: "thread-label", "data-thread": era.id, transform: `translate(${first.x - card.width / 2} ${first.y - 155})` });
    label.append(
      create("circle", { r: 8, cx: 8, cy: -7, fill: era.color }),
      create("text", { x: 25, class: "thread-name" }, era.label),
      create("text", { x: 25, y: 22, class: "thread-range" }, era.range)
    );
    eraLabelLayer.append(label);

    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "era-chip";
    chip.dataset.thread = era.id;
    chip.style.setProperty("--era-color", era.color);
    chip.innerHTML = `<i></i><span>${era.label}</span><small>${events.filter(event => event.era === era.id).length}</small>`;
    chip.title = `${era.label} (${era.range})`;
    chip.addEventListener("click", () => selectThread(era.id));
    eraRail.append(chip);
  });
  const wordChip = document.createElement("button");
  wordChip.type = "button";
  wordChip.className = "era-chip word-chip";
  wordChip.dataset.thread = "words";
  wordChip.style.setProperty("--era-color", "#b15a72");
  wordChip.innerHTML = `<i></i><span>Words & names</span><small>${terms.length}</small>`;
  wordChip.title = "Jump to the terminology branches";
  wordChip.addEventListener("click", () => selectThread("words"));
  eraRail.append(wordChip);

  const readableWidth = () => Math.max(590, Math.min(1200, svg.clientWidth * 1.3));
  let camera = { x: 800 - readableWidth() / 2, y: -60, w: readableWidth(), h: 850 };
  let animationFrame = null;
  const bounds = { minW: 590, maxW: 2600 };

  function applyCamera() {
    const ratio = svg.clientWidth / Math.max(1, svg.clientHeight);
    camera.h = camera.w / ratio;
    camera.x = Math.max(-140, Math.min(world.width - camera.w + 140, camera.x));
    camera.y = Math.max(-70, Math.min(world.height - camera.h + 70, camera.y));
    svg.setAttribute("viewBox", `${camera.x} ${camera.y} ${camera.w} ${camera.h}`);
    const zoomRange = document.getElementById("zoomRange");
    if (zoomRange) {
      const amount = Math.log(bounds.maxW / camera.w) / Math.log(bounds.maxW / bounds.minW);
      zoomRange.value = String(Math.round(Math.max(0, Math.min(1, amount)) * 100));
    }
  }

  function focusAt(cx, cy, width = 1700) {
    const ratio = svg.clientWidth / Math.max(1, svg.clientHeight);
    const targetW = Math.max(bounds.minW, Math.min(bounds.maxW, width));
    const targetH = targetW / ratio;
    const start = { ...camera };
    const target = { x: cx - targetW / 2, y: cy - targetH / 2, w: targetW, h: targetH };
    const started = performance.now();
    cancelAnimationFrame(animationFrame);
    const animate = now => {
      const t = Math.min(1, (now - started) / 420);
      const eased = 1 - Math.pow(1 - t, 3);
      camera = {
        x: start.x + (target.x - start.x) * eased,
        y: start.y + (target.y - start.y) * eased,
        w: start.w + (target.w - start.w) * eased,
        h: start.h + (target.h - start.h) * eased
      };
      applyCamera();
      if (t < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
  }

  function openChapter(index, animate = true) {
    const chapter = chapters[index];
    const point = pointMap[chapter.id];
    selectThread(null, false);
    chapterNav.querySelectorAll(".chapter-button").forEach((button, i) => button.classList.toggle("active", i === index));
    currentLocation.textContent = chapter.title;
    if (animate) focusAt(point.x, point.y, readableWidth());
    closeSidebar();
  }

  chapters.forEach((chapter, index) => {
    const point = pointMap[chapter.id];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chapter-button" + (index === 0 ? " active" : "");
    button.innerHTML = `<span class="chapter-index">${String(index + 1).padStart(2, "0")}</span><span class="chapter-copy"><small>${escapeHtml(point.event.date)} <i>·</i> ${escapeHtml(chapter.cue)}</small><strong>${escapeHtml(chapter.title)}</strong></span><span class="chapter-arrow">↗</span>`;
    button.addEventListener("click", () => openChapter(index));
    chapterNav.append(button);
  });

  menuButton.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  function resetToBeginning() {
    openChapter(0);
    focusAt(810, 440, readableWidth());
  }

  function zoom(factor, clientX, clientY) {
    cancelAnimationFrame(animationFrame);
    const rect = svg.getBoundingClientRect();
    clientX ??= rect.left + rect.width / 2;
    clientY ??= rect.top + rect.height / 2;
    const fx = (clientX - rect.left) / rect.width;
    const fy = (clientY - rect.top) / rect.height;
    const oldW = camera.w;
    const oldH = camera.h;
    const newW = Math.max(bounds.minW, Math.min(bounds.maxW, oldW * factor));
    const newH = newW / (rect.width / rect.height);
    camera.x += (oldW - newW) * fx;
    camera.y += (oldH - newH) * fy;
    camera.w = newW;
    camera.h = newH;
    applyCamera();
  }

  svg.addEventListener("wheel", event => {
    event.preventDefault();
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) && !event.ctrlKey) {
      camera.x += event.deltaX * camera.w / svg.clientWidth;
      camera.y += event.deltaY * camera.h / svg.clientHeight;
      applyCamera();
      return;
    }
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? svg.clientHeight : 1;
    const factor = Math.exp(Math.max(-180, Math.min(180, event.deltaY * unit)) * .0018);
    zoom(factor, event.clientX, event.clientY);
  }, { passive: false });

  let drag = null;
  svg.addEventListener("pointerdown", event => {
    // Capturing the pointer on a link suppresses the native click event.
    if (event.target.closest(".event-link")) return;
    cancelAnimationFrame(animationFrame);
    drag = { x: event.clientX, y: event.clientY, cameraX: camera.x, cameraY: camera.y };
    svg.setPointerCapture(event.pointerId);
    svg.classList.add("dragging");
  });
  svg.addEventListener("pointermove", event => {
    if (!drag) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    camera.x = drag.cameraX - dx * camera.w / svg.clientWidth;
    camera.y = drag.cameraY - dy * camera.h / svg.clientHeight;
    applyCamera();
  });
  const endDrag = () => { drag = null; svg.classList.remove("dragging"); };
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);
  document.getElementById("zoomIn").addEventListener("click", () => zoom(.72));
  document.getElementById("zoomOut").addEventListener("click", () => zoom(1.39));
  document.getElementById("homeButton").addEventListener("click", () => {
    resetToBeginning();
  });
  document.getElementById("mapReset").addEventListener("click", resetToBeginning);
  document.getElementById("beginButton").addEventListener("click", resetToBeginning);
  document.getElementById("zoomRange")?.addEventListener("input", event => {
    const amount = Number(event.target.value) / 100;
    const targetW = bounds.maxW * (bounds.minW / bounds.maxW) ** amount;
    zoom(targetW / camera.w);
  });

  function runSearch(query) {
    const normalized = query.trim().toLowerCase();
    const nodeEls = [...document.querySelectorAll(".history-card, .term-card")];
    if (!normalized) {
      searchResults.hidden = true;
      nodeEls.forEach(node => node.classList.remove("dimmed", "match"));
      return;
    }
    if (activeThread) selectThread(null, false);
    const matches = events.filter(event => [event.date, event.person, event.title, event.summary, event.question].join(" ").toLowerCase().includes(normalized));
    const termMatches = terms.filter(term => [term.date, term.word, term.former, term.current, term.origin, term.transition, ...term.lineage.map(item => item.term)].join(" ").toLowerCase().includes(normalized));
    const ids = new Set([...matches, ...termMatches].map(item => item.id));
    nodeEls.forEach(node => {
      node.classList.toggle("dimmed", !ids.has(node.dataset.id));
      node.classList.toggle("match", ids.has(node.dataset.id));
    });
    searchResults.hidden = false;
    const eventResults = matches.map(event => {
      const era = eraMap[event.era];
      return `<a class="search-result" href="event.html?id=${encodeURIComponent(event.id)}" style="--result-color:${graph.colors[event.id] ?? era.color}"><b class="result-year">${escapeHtml(event.date)}</b><span><b>${escapeHtml(event.title)}</b><small>${escapeHtml(event.person)}</small></span><b class="arrow">→</b></a>`;
    });
    const wordResults = termMatches.map(term => `<a class="search-result" href="term.html?id=${encodeURIComponent(term.id)}" style="--result-color:#b15a72"><b class="result-year">${escapeHtml(term.date)}</b><span><b>${escapeHtml(term.word)}</b><small>Word history · ${escapeHtml(term.former)} → ${escapeHtml(term.current)}</small></span><b class="arrow">→</b></a>`);
    searchResults.innerHTML = eventResults.length || wordResults.length ? [...wordResults, ...eventResults].slice(0, 10).join("") : `<div class="empty-results">No branch matches “${escapeHtml(query)}”.</div>`;
  }

  searchInput.addEventListener("input", () => runSearch(searchInput.value));
  searchInput.addEventListener("keydown", event => {
    if (event.key === "Escape") { searchInput.value = ""; runSearch(""); searchInput.blur(); }
    if (event.key === "Enter") {
      const first = searchResults.querySelector("a");
      if (first) first.click();
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "/" && document.activeElement !== searchInput) { event.preventDefault(); searchInput.focus(); }
    if ((event.key === "+" || event.key === "=") && document.activeElement !== searchInput) zoom(.72);
    if (event.key === "-" && document.activeElement !== searchInput) zoom(1.39);
    if (event.key === "0" && document.activeElement !== searchInput) resetToBeginning();
  });

  const aboutDialog = document.getElementById("aboutDialog");
  document.getElementById("aboutButton").addEventListener("click", () => aboutDialog.showModal());
  aboutDialog.querySelector(".dialog-close").addEventListener("click", () => aboutDialog.close());
  aboutDialog.addEventListener("click", event => { if (event.target === aboutDialog) aboutDialog.close(); });

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }

  window.addEventListener("resize", applyCamera);
  applyCamera();
  const selectedTerm = decodeURIComponent(window.location.hash.slice(1));
  if (selectedTerm.startsWith("term-")) {
    const term = terms.find(item => item.id === selectedTerm.slice(5));
    if (term) {
      selectThread("words", false);
      currentLocation.textContent = term.word + " · word history";
      focusAt(term.x, term.y, 960);
    }
  } else if (selectedTerm.startsWith("event-")) {
    const point = pointMap[selectedTerm.slice(6)];
    if (point) {
      currentLocation.textContent = point.event.title;
      focusAt(point.x, point.y, 960);
    }
  }
})();
