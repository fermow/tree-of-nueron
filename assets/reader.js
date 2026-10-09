(() => {
  const isTerm = location.pathname.endsWith('term.html');
  const id = new URLSearchParams(location.search).get('id');
  const item = (isTerm ? window.NEURON_TERMS.items : window.NEURON_HISTORY.events).find(x => x.id === id);
  if (!item) return;
  const key = `${isTerm ? 'term' : 'event'}:${id}`;
  try {
    const state = JSON.parse(localStorage.getItem('neuron-reading-v1')) || {};
    const validKeys = new Set([...window.NEURON_HISTORY.events.map(e=>'event:'+e.id),...window.NEURON_TERMS.items.map(t=>'term:'+t.id)]);
    const opened = new Set((Array.isArray(state.opened) ? state.opened : []).filter(x=>validKeys.has(x)));
    opened.add(key);
    localStorage.setItem('neuron-reading-v1',JSON.stringify({opened:[...opened],last:key}));
  } catch { /* Reading works when browser storage is unavailable. */ }
  document.querySelectorAll('.archive-figure img').forEach(img=>img.addEventListener('error',()=>img.closest('.archive-figure').classList.add('media-unavailable'),{once:true}));
  const links=[...document.querySelectorAll('.reader-tabs a')];
  if ('IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){links.forEach(a=>a.setAttribute('aria-current',String(a.hash===`#${entry.target.id}`)));}},{rootMargin:'-70px 0px -60% 0px',threshold:0});
    links.forEach(a=>{const target=document.getElementById(a.hash.slice(1));if(target)observer.observe(target);});
  }
})();
