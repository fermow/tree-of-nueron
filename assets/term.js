(() => {
  const { items, references } = window.NEURON_TERMS;
  const id = new URLSearchParams(window.location.search).get("id");
  const term = items.find(item => item.id === id);
  const root = document.getElementById("termDetail");
  if (!term) {
    root.innerHTML = `<section class="not-found"><main><p class="eyebrow">Unknown word</p><h1>That word is not on this tree.</h1><a class="primary-button" href="index.html">Return to the map →</a></main></section>`;
    return;
  }
  const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  const relatedEvent = window.NEURON_HISTORY.events.find(event => event.id === term.anchor);
  const related = term.related.map(otherId => items.find(item => item.id === otherId)).filter(Boolean);
  const backUrl = `index.html#term-${encodeURIComponent(term.id)}`;
  document.getElementById("termBack").href = backUrl;
  document.title = `${term.word} · Word history · Tree of Neuron`;
  document.documentElement.style.setProperty("--hero-color", "#a34e68");
  root.innerHTML = `
    <article>
      <header class="term-hero">
        <p class="detail-kicker"><i></i>Terminology branch · ${escapeHtml(term.kind)}</p>
        <h1>${escapeHtml(term.word)}</h1>
        <p class="term-subtitle">${escapeHtml(term.former)} <span aria-hidden="true">→</span> ${escapeHtml(term.current)}</p>
        <div class="term-date-line"><b>${escapeHtml(term.date)}</b><span>${term.exactDate ? "Documented naming or description" : "Approximate period or undated adoption"}</span></div>
      </header>

      <div class="term-story-grid">
        <div>
          <section class="story-section">
            <div class="section-label"><span>01</span>Origin</div>
            <h2>Where did the word come from?</h2>
            <p>${escapeHtml(term.origin)}</p>
          </section>
          <section class="story-section">
            <div class="section-label"><span>02</span>Historical context</div>
            <h2>What were they seeing at the time?</h2>
            <p>${escapeHtml(term.story)}</p>
          </section>
          <section class="story-section">
            <div class="section-label"><span>03</span>Change in meaning</div>
            <h2>How did the earlier name lead here?</h2>
            <p>${escapeHtml(term.transition)}</p>
          </section>
        </div>
        <aside>
          <div class="term-caution"><span class="card-label">Dating and interpretation</span><p>${escapeHtml(term.caution)}</p></div>
          <a class="term-event-link" href="event.html?id=${encodeURIComponent(relatedEvent.id)}"><small>Connected historical milestone ↗</small><b>${escapeHtml(relatedEvent.date)} · ${escapeHtml(relatedEvent.title)}</b></a>
        </aside>
      </div>

      <section class="term-timeline">
        <p class="eyebrow">What people called it</p>
        <h2>Names across the periods</h2>
        <ol class="term-lineage">${term.lineage.map(stage => `<li><span class="term-stage-date">${escapeHtml(stage.when)}</span><strong>${escapeHtml(stage.term)}</strong><p>${escapeHtml(stage.meaning)}</p></li>`).join("")}</ol>
      </section>

      <section class="sources">
        <p class="eyebrow">Read the historical evidence</p>
        <h2>References</h2>
        <p class="source-context">A dated publication supports a documented use of a word; it does not necessarily establish the very first use or the moment a structure was discovered.</p>
        <ul class="reference-list">${term.refs.map(refId => { const ref = references[refId]; return `<li><a href="${ref.url}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(ref.label)}</span><b>${refId} ↗</b></a></li>`; }).join("")}</ul>
      </section>

      <nav class="term-related" aria-label="Related word histories">
        <h2>Follow another word</h2>
        <div>${related.map(other => `<a href="term.html?id=${encodeURIComponent(other.id)}"><small>${escapeHtml(other.date)}</small><b>${escapeHtml(other.word)} ↗</b></a>`).join("")}</div>
        <a class="term-map-link" href="${backUrl}">← Back to this branch on the map</a>
      </nav>
    </article>`;
})();
