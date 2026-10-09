(() => {
  const { events, eras } = window.NEURON_HISTORY;
  const svg = document.getElementById("tree");
  const branchLayer = document.getElementById("branches");
  const nodeLayer = document.getElementById("nodes");
  const eraLabelLayer = document.getElementById("eraLabels");
  const eraRail = document.getElementById("eraRail");
  const searchInput = document.getElementById("search");
  const searchResults = document.getElementById("searchResults");
  const ns = "http://www.w3.org/2000/svg";

  const eraMap = Object.fromEntries(eras.map(era => [era.id, era]));
  const points = events.map((event, index) => {
    const x = 210 + index * 123;
    const trunkY = 900 + Math.sin(index * .57) * 98 + Math.cos(index * .22) * 38;
    const side = index % 2 === 0 ? -1 : 1;
    const branchLength = 255 + ((index * 47) % 145);
    const y = trunkY + side * branchLength;
    return { event, index, x, trunkY, y, side, color: eraMap[event.era].color };
  });

  const create = (name, attrs = {}, text = "") => {
    const element = document.createElementNS(ns, name);
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    if (text) element.textContent = text;
    return element;
  };

  const trunkPath = points.reduce((path, p, index) => {
    if (!index) return `M ${p.x} ${p.trunkY}`;
    const previous = points[index - 1];
    const mid = (previous.x + p.x) / 2;
    return `${path} C ${mid} ${previous.trunkY}, ${mid} ${p.trunkY}, ${p.x} ${p.trunkY}`;
  }, "");

  branchLayer.append(
    create("path", { d: trunkPath, class: "trunk-under", "stroke-width": 112 }),
    create("path", { d: trunkPath, class: "trunk", "stroke-width": 82 })
  );

  points.forEach((p, index) => {
    const bendX = p.x + (index % 3 - 1) * 24;
    const bendY = p.trunkY + (p.y - p.trunkY) * .58;
    const twigPath = `M ${p.x} ${p.trunkY} Q ${bendX} ${bendY}, ${p.x} ${p.y}`;
    const width = Math.max(15, 34 - index * .42);
    branchLayer.append(
      create("path", { d: twigPath, class: "twig-under", "stroke-width": width + 15 }),
      create("path", { d: twigPath, class: "twig", stroke: p.color, "stroke-width": width })
    );

    const link = create("a", {
      href: `event.html?id=${encodeURIComponent(p.event.id)}`,
      target: "_blank",
      rel: "noopener",
      class: "event-link",
      "aria-label": `${p.event.date}: ${p.event.title}. Open full milestone in a new page.`
    });
    const group = create("g", {
      class: "event-node",
      transform: `translate(${p.x} ${p.y})`,
      "data-id": p.event.id,
      "data-era": p.event.era,
      style: `--node-color:${p.color}`
    });
    group.append(
      create("circle", { r: 86, class: "node-halo", stroke: p.color }),
      create("circle", { r: 73, class: "node-disc", stroke: p.color })
    );

    const year = shortDate(p.event.date);
    group.append(create("text", { y: -28, class: "node-year" }, year));
    wrapTitle(p.event.title, 19).forEach((line, lineIndex, all) => {
      const y = all.length === 1 ? 4 : -1 + lineIndex * 17;
      group.append(create("text", { y, class: "node-title" }, line));
    });
    const person = p.event.person.length > 28 ? `${p.event.person.slice(0, 26)}…` : p.event.person;
    group.append(create("text", { y: 51, class: "node-person" }, person));
    link.append(group);
    nodeLayer.append(link);
  });

  eras.forEach((era, eraIndex) => {
    const first = points.find(point => point.event.era === era.id);
    const label = create("g", { class: "era-label", transform: `translate(${first.x - 20} ${eraIndex % 2 ? 1080 : 725})` });
    label.append(
      create("text", { class: "era-name" }, era.label),
      create("text", { y: 24, class: "era-range" }, era.range)
    );
    eraLabelLayer.append(label);

    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "era-chip";
    chip.style.setProperty("--era-color", era.color);
    chip.innerHTML = `<i></i>${era.label}`;
    chip.addEventListener("click", () => {
      document.querySelectorAll(".era-chip").forEach(el => el.classList.remove("active"));
      chip.classList.add("active");
      focusAt(first.x, first.trunkY, 1380, 780);
      document.getElementById("introCard").classList.add("dismissed");
    });
    eraRail.append(chip);
  });

  function shortDate(date) {
    if (date.includes("BCE")) return date.replace("century", "c.").split("-")[0].replace("c. ", "") + " BCE";
    const years = date.match(/\d{3,4}/g);
    return years ? years[years.length - 1] : date;
  }

  function wrapTitle(text, max) {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    words.forEach(word => {
      const candidate = line ? `${line} ${word}` : word;
      if (candidate.length > max && line) {
        lines.push(line);
        line = word;
      } else line = candidate;
    });
    if (line) lines.push(line);
    if (lines.length > 2) return [lines[0], `${lines.slice(1).join(" ").slice(0, max - 1)}…`];
    return lines;
  }

  let camera = { x: 0, y: 80, w: 3200, h: 1600 };
  let animationFrame = null;
  const bounds = { minW: 620, maxW: 3550, minX: -120, maxX: 3350, minY: -80, maxY: 1880 };

  function applyCamera() {
    const ratio = svg.clientWidth / Math.max(1, svg.clientHeight);
    camera.h = camera.w / ratio;
    camera.x = Math.min(bounds.maxX - camera.w * .55, Math.max(bounds.minX - camera.w * .05, camera.x));
    camera.y = Math.min(bounds.maxY - camera.h * .55, Math.max(bounds.minY - camera.h * .05, camera.y));
    svg.setAttribute("viewBox", `${camera.x} ${camera.y} ${camera.w} ${camera.h}`);
  }

  function focusAt(cx, cy, width = 1200, height = null) {
    const ratio = svg.clientWidth / Math.max(1, svg.clientHeight);
    const targetW = Math.max(bounds.minW, Math.min(bounds.maxW, width));
    const targetH = height || targetW / ratio;
    const start = { ...camera };
    const target = { x: cx - targetW / 2, y: cy - targetH / 2, w: targetW, h: targetH };
    const started = performance.now();
    cancelAnimationFrame(animationFrame);
    const animate = now => {
      const t = Math.min(1, (now - started) / 650);
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

  function zoom(factor, clientX = svg.clientWidth / 2, clientY = svg.clientHeight / 2) {
    const rect = svg.getBoundingClientRect();
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
    zoom(event.deltaY > 0 ? 1.12 : .89, event.clientX, event.clientY);
  }, { passive: false });

  let drag = null;
  let moved = false;
  svg.addEventListener("pointerdown", event => {
    drag = { x: event.clientX, y: event.clientY, cameraX: camera.x, cameraY: camera.y };
    moved = false;
    svg.setPointerCapture(event.pointerId);
    svg.classList.add("dragging");
  });
  svg.addEventListener("pointermove", event => {
    if (!drag) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) moved = true;
    camera.x = drag.cameraX - dx * camera.w / svg.clientWidth;
    camera.y = drag.cameraY - dy * camera.h / svg.clientHeight;
    applyCamera();
  });
  const endDrag = () => { drag = null; svg.classList.remove("dragging"); };
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);
  nodeLayer.addEventListener("click", event => { if (moved) event.preventDefault(); });

  document.getElementById("zoomIn").addEventListener("click", () => zoom(.78));
  document.getElementById("zoomOut").addEventListener("click", () => zoom(1.28));
  document.getElementById("homeButton").addEventListener("click", () => {
    focusAt(1600, 900, 3200, 1600);
    document.querySelectorAll(".era-chip").forEach(el => el.classList.remove("active"));
  });
  document.getElementById("beginButton").addEventListener("click", () => {
    document.getElementById("introCard").classList.add("dismissed");
    focusAt(points[1].x + 180, points[1].trunkY, 1250, 730);
  });

  function runSearch(query) {
    const normalized = query.trim().toLowerCase();
    const nodeEls = [...document.querySelectorAll(".event-node")];
    if (!normalized) {
      searchResults.hidden = true;
      nodeEls.forEach(node => node.classList.remove("dimmed", "match"));
      return;
    }
    const matches = events.filter(event => [event.date, event.person, event.title, event.summary, event.question].join(" ").toLowerCase().includes(normalized));
    const ids = new Set(matches.map(event => event.id));
    nodeEls.forEach(node => {
      node.classList.toggle("dimmed", !ids.has(node.dataset.id));
      node.classList.toggle("match", ids.has(node.dataset.id));
    });
    searchResults.hidden = false;
    searchResults.innerHTML = matches.length ? matches.slice(0, 8).map(event => {
      const era = eraMap[event.era];
      return `<a class="search-result" href="event.html?id=${encodeURIComponent(event.id)}" target="_blank" rel="noopener" style="--result-color:${era.color}"><b class="result-year">${shortDate(event.date)}</b><span><b>${escapeHtml(event.title)}</b><small>${escapeHtml(event.person)}</small></span><b class="arrow">↗</b></a>`;
    }).join("") : `<div class="empty-results">No branch matches “${escapeHtml(query)}”.</div>`;
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
    if ((event.key === "+" || event.key === "=") && document.activeElement !== searchInput) zoom(.82);
    if (event.key === "-" && document.activeElement !== searchInput) zoom(1.22);
    if (event.key === "0" && document.activeElement !== searchInput) focusAt(1600, 900, 3200, 1600);
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
})();
