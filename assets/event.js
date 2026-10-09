(() => {
  const { events, eras, references } = window.NEURON_HISTORY;
  const id = new URLSearchParams(window.location.search).get("id");
  const index = events.findIndex(item => item.id === id);
  const root = document.getElementById("detail");

  if (index < 0) {
    root.innerHTML = `<section class="not-found"><main><p class="eyebrow">Unknown branch</p><h1>That milestone is not on this tree.</h1><a class="primary-button" href="index.html">Return to the roots →</a></main></section>`;
    return;
  }

  const event = events[index];
  const research = window.NEURON_RESEARCH?.[event.id];
  const era = eras.find(item => item.id === event.era);
  const previous = events[index - 1];
  const next = events[index + 1];
  const linkedTerms = window.NEURON_TERMS?.items.filter(term => term.anchor === event.id) || [];
  const scene = window.NEURON_VISUALS.scenes[event.id];
  const media = window.NEURON_VISUALS.archive[event.id];
  document.title = `${event.person} · ${event.date} · Tree of Neuron`;
  document.documentElement.style.setProperty("--hero-color", era.color);

  const refs = event.refs.map(refId => {
    const ref = references[refId];
    return `<li><a href="${ref.url}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(ref.label)}</span><b>${refId} ↗</b></a></li>`;
  }).join("");

  function motif(kind) {
    const drawings = {
      brain: `<path d="M43 76C23 77 18 62 25 51c-7-10-1-24 11-25 4-13 18-15 26-7 10-8 25-3 27 10 14 5 15 20 8 27 4 13-8 24-22 20-7 12-24 11-32 0Z"/><path d="M58 20c-5 13 5 20-4 30M28 48c13-8 19-4 26 2m27-12c-12 0-19 6-23 16M30 63c11-2 19 1 20 14m29-10c-10-5-21 0-22 12"/>`,
      fibers: `<path d="M12 25C46 18 66 32 101 22M12 46c35-6 57 10 90 0M12 67c35-6 55 10 90 0M12 86c32-10 56 8 90-2"/><circle cx="43" cy="24" r="4"/><circle cx="70" cy="47" r="4"/>`,
      frog: `<path d="M18 74c14-20 28-16 41-14 14-4 19-16 26-29M59 60c-1 14 8 22 22 24M57 60c-11-10-12-22-8-36M83 31l10-10M81 84l15 5"/><path d="m72 16 9-9-3 10 11-3-10 14"/>`,
      electric: `<path d="M12 72h24V30h32v42h32M44 30v42m17-42v42"/><path d="m82 15-8 18h10l-8 17"/><circle cx="12" cy="72" r="5"/><circle cx="100" cy="72" r="5"/>`,
      neuron: `<circle cx="47" cy="50" r="15"/><path d="M34 44 18 30l-9-2m25 27L18 68 9 82m35-47-2-24m20 25 17-16 8-2M62 53c18 2 21 12 36 12m-8-2 10-12m-10 14 12 13"/><circle cx="47" cy="50" r="5"/>`,
      membrane: `<path d="M12 38h88M12 72h88"/><g fill="currentColor" stroke="none">${[22,39,56,73,90].map(x => `<circle cx="${x}" cy="38" r="4"/><circle cx="${x}" cy="72" r="4"/>`).join("")}</g><path d="m51 14 7 9-7 9m15 45-7 9 7 9"/>`,
      wave: `<path d="M9 60h23l10-8 10 23 12-51 10 36h29M12 86h91M12 86V16"/>`,
      word: `<path d="M17 18h34c11 0 15 6 15 15v53c-5-10-13-12-24-12H17V18Zm49 0h20c9 0 12 5 12 13v43H81c-8 0-13 4-15 12"/><path d="M27 35h27M27 47h27M76 35h13m-13 12h13"/>`
    };
    return `<svg viewBox="0 0 112 104" role="img" aria-label="Conceptual illustration of ${escapeHtml(event.title)}"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${drawings[kind] || drawings.word}</g></svg>`;
  }
  const visualMark = motif(scene[3]);
  const image = media ? `<figure class="archive-figure"><div class="archive-mat">
    <img src="https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(media.file)}?width=1000" alt="${escapeHtml(media.caption)}" loading="eager" referrerpolicy="no-referrer">
    <div class="archive-fallback">${visualMark}<span>Illustrated evidence</span></div></div>
    <figcaption>${escapeHtml(media.caption)} <a href="https://commons.wikimedia.org/wiki/File:${encodeURIComponent(media.file.replaceAll(" ", "_"))}" target="_blank" rel="noopener noreferrer">${escapeHtml(media.credit)} · image source and license ↗</a></figcaption></figure>`
    : `<figure class="archive-figure illustrated"><div class="archive-mat">${visualMark}<span>Conceptual illustration</span></div><figcaption>No event-specific historical image is used. This visual explains the idea, not the original apparatus.</figcaption></figure>`;

  root.innerHTML = `
    <article class="visual-event">
      <header class="detail-hero">
        <div>
          <p class="detail-kicker"><i></i>${escapeHtml(era.label)} · milestone ${String(index + 1).padStart(2, "0")} of ${events.length}</p>
          <h1>${escapeHtml(event.title)}</h1>
          <p class="detail-summary">${escapeHtml(event.summary)}</p>
          ${research ? `<p class="evidence-kind">${escapeHtml(research.kind)}</p>` : ""}
          <dl class="detail-facts">
            <div><dt>Researcher / tradition</dt><dd>${escapeHtml(event.person)}</dd></div>
            <div><dt>Date</dt><dd>${escapeHtml(event.date)}</dd></div>
            <div><dt>Research thread</dt><dd>${escapeHtml(era.label)}</dd></div>
          </dl>
        </div>
        ${image}
      </header>

      <section class="evidence-map" aria-label="Visual summary of this historical milestone">
        <div class="map-heading"><b>THE IDEA AT A GLANCE</b><span>A simplified teaching sketch · not an original apparatus diagram</span></div>
        <div class="scene-steps">
          ${scene.slice(0, 3).map((label, i) => `<div class="scene-step"><small>0${i + 1} · ${["starting point", "inquiry", "what emerged"][i]}</small><span class="scene-symbol">${motif(scene[3])}</span><strong>${escapeHtml(label)}</strong></div>`).join("")}
        </div>
      </section>

      ${event.id === "bernstein" ? `<section class="bernstein-synthesis" aria-label="Bernstein's synthesis and its limit">
        <div class="map-heading"><b>THREE PATHS MEET · 1902</b><span>Conceptual map, not a claim of direct influence from every predecessor</span></div>
        <div class="synthesis-paths">
          <a href="event.html?id=bernstein-rheotome"><small>1868 · measurement</small><b>Traveling electrical change</b><span>What phenomenon needs an explanation?</span></a>
          <a href="event.html?id=overton"><small>1895–1899 · cell biology</small><b>Selective cell boundary</b><span>Where can a gradient be maintained?</span></a>
          <a href="event.html?id=nernst"><small>1889 · physical chemistry</small><b>Ion gradient → potential</b><span>How does the voltage depend on concentration?</span></a>
        </div>
        <div class="synthesis-model"><div><small>Modern ideal K⁺ equilibrium form · inside relative to outside</small><strong>Eₖ = (RT/F) ln([K⁺]out / [K⁺]in)</strong><p>T is absolute temperature; actual ion activities replace concentrations in the precise relation. This approximation assumes K⁺ dominates permeability.</p></div><div><small>Where the 1902 excitation model failed</small><strong>Negative rest → zero?</strong><p>Bernstein's simple loss-of-selectivity model stopped at zero. The later measured spike briefly went above zero; subsequent sodium experiments explained that peak.</p></div></div>
      </section>` : ""}

      <div class="story-grid">
        <div class="story-main">
          ${research ? `<section class="story-section">
            <div class="section-label"><span>00</span>Historical context</div>
            <h2>Why did this question arise?</h2>
            <p>${escapeHtml(research.background)}</p>
          </section>` : ""}
          <section class="story-section">
            <div class="section-label"><span>01</span>The question</div>
            <h2>What were they trying to understand?</h2>
            <p>${escapeHtml(event.question)}</p>
          </section>

          <section class="story-section">
            <div class="section-label"><span>02</span>Method & evidence</div>
            <h2>How did they investigate it?</h2>
            <p>${escapeHtml(event.method)}</p>
            ${research ? `<div class="research-explanation"><b>What the sources describe</b><p>${escapeHtml(research.procedure)}</p></div>` : ""}
            <h3 class="steps-heading">${research?.kind.includes("terminology") || research?.kind.includes("language") ? "Historical sequence" : "Summarized evidence sequence"}</h3>
            <ol class="experiment-steps">${event.steps.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
          </section>

          <section class="story-section">
            <div class="section-label"><span>03</span>Answer and interpretation</div>
            <h2>What did the evidence answer?</h2>
            ${research ? `<p>${escapeHtml(research.answer)}</p>` : ""}
            <h3 class="steps-heading">What changed in the model</h3>
            <p>${escapeHtml(event.result)}</p>
          </section>
        </div>

        <aside class="story-side">
          <div class="finding-card accent"><span class="card-label">Observation</span><p>${escapeHtml(event.observation)}</p></div>
          ${research ? `<div class="finding-card confidence-card"><span class="card-label">How certain is this conclusion?</span><p>${escapeHtml(research.strength)}</p></div>` : ""}
          <div class="finding-card"><span class="card-label">Limitation</span><p>${escapeHtml(event.limitation)}</p></div>
          ${research ? `<div class="finding-card"><span class="card-label">What the evidence does not show</span><p>${escapeHtml(research.caution)}</p></div>` : ""}
          ${event.equation ? `<div class="finding-card equation-card"><span class="card-label">Current balance</span><code>${escapeHtml(event.equation)}</code></div>` : ""}
          <div class="question-card"><span class="card-label">The next question</span><p>${escapeHtml(event.next)}</p></div>
        </aside>
      </div>

      ${linkedTerms.length ? `<section class="event-terms">
        <p class="eyebrow">Language at this point in history</p>
        <h2>What did they call it?</h2>
        <div>${linkedTerms.map(term => `<a href="term.html?id=${encodeURIComponent(term.id)}"><small>${escapeHtml(term.date)} · ${escapeHtml(term.kind)}</small><b>${escapeHtml(term.word)} ↗</b><span>${escapeHtml(term.former)} → ${escapeHtml(term.current)}</span></a>`).join("")}</div>
      </section>` : ""}

      <section class="sources">
        <p class="eyebrow">References carried by this node</p>
        <h2>Source trail</h2>
        ${research ? `<p class="source-context">Reading trail: ${escapeHtml(research.source)}. The steps above explain the cited evidence; they are not a complete replication protocol. Evidence strength is a qualitative assessment, not a measured probability.</p>` : ""}
        <ul class="reference-list">${refs}</ul>
      </section>

      <nav class="event-nav" aria-label="Adjacent milestones">
        ${previous ? `<a href="event.html?id=${encodeURIComponent(previous.id)}"><small>← Earlier · ${escapeHtml(previous.date)}</small><b>${escapeHtml(previous.title)}</b></a>` : `<a href="index.html"><small>At the roots</small><b>Explore the whole tree</b></a>`}
        ${next ? `<a href="event.html?id=${encodeURIComponent(next.id)}"><small>Later · ${escapeHtml(next.date)} →</small><b>${escapeHtml(next.title)}</b></a>` : `<a href="index.html"><small>The canopy</small><b>Return to the full tree</b></a>`}
      </nav>
    </article>`;

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  }
  root.querySelector(".archive-figure img")?.addEventListener("error", error => {
    error.currentTarget.closest(".archive-figure").classList.add("media-unavailable");
  });
})();
