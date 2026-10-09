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
  const era = eras.find(item => item.id === event.era);
  const previous = events[index - 1];
  const next = events[index + 1];
  document.title = `${event.person} · ${event.date} · Tree of Neuron`;
  document.documentElement.style.setProperty("--hero-color", era.color);

  const refs = event.refs.map(refId => {
    const ref = references[refId];
    return `<li><a href="${ref.url}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(ref.label)}</span><b>${refId} ↗</b></a></li>`;
  }).join("");

  root.innerHTML = `
    <article>
      <header class="detail-hero">
        <div>
          <p class="detail-kicker"><i></i>${escapeHtml(era.label)} · milestone ${String(index + 1).padStart(2, "0")} of ${events.length}</p>
          <h1>${escapeHtml(event.title)}</h1>
          <p class="detail-summary">${escapeHtml(event.summary)}</p>
        </div>
        <div class="hero-stamp" aria-label="${escapeHtml(event.date)}, ${escapeHtml(event.person)}">
          <div><div class="stamp-date">${escapeHtml(event.date)}</div><div class="stamp-person">${escapeHtml(event.person)}</div></div>
        </div>
      </header>

      <div class="story-grid">
        <div class="story-main">
          <section class="story-section">
            <div class="section-label"><span>01</span>The question</div>
            <h2>What were they trying to understand?</h2>
            <p>${escapeHtml(event.question)}</p>
          </section>

          <section class="story-section">
            <div class="section-label"><span>02</span>Method & experiment</div>
            <h2>How was the question tested?</h2>
            <p>${escapeHtml(event.method)}</p>
            <ol class="experiment-steps">${event.steps.map(step => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
          </section>

          <section class="story-section">
            <div class="section-label"><span>03</span>Model shift</div>
            <h2>What changed after this result?</h2>
            <p>${escapeHtml(event.result)}</p>
          </section>
        </div>

        <aside class="story-side">
          <div class="finding-card accent"><span class="card-label">Observation</span><p>${escapeHtml(event.observation)}</p></div>
          <div class="finding-card"><span class="card-label">Limitation</span><p>${escapeHtml(event.limitation)}</p></div>
          ${event.equation ? `<div class="finding-card equation-card"><span class="card-label">Current balance</span><code>${escapeHtml(event.equation)}</code></div>` : ""}
          <div class="question-card"><span class="card-label">The next question</span><p>${escapeHtml(event.next)}</p></div>
        </aside>
      </div>

      <section class="sources">
        <p class="eyebrow">References carried by this node</p>
        <h2>Source trail</h2>
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
})();
