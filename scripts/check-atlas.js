// Integration checks for the buildless index without a browser dependency.
// This exercises rendering and user actions; it does not replace visual QA.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
class Element {
  constructor(){this.innerHTML='';this.textContent='';this.value='';this.listeners={};this.classList={add(){}};}
  addEventListener(type,fn){this.listeners[type]=fn;}
  querySelectorAll(){return [];}
  setAttribute(){}
}
function setup(search='',hash='',storage=null){
  const elements={}, listeners={};
  const location={pathname:'/index.html',search,hash};
  const document={getElementById:id=>elements[id] ||= new Element(),querySelectorAll:()=>[],addEventListener:(type,fn)=>listeners[type]=fn,activeElement:{tagName:'BODY'}};
  const context={window:{addEventListener(){},scrollTo(){}},document,location,history:{replaceState(_a,_b,url){const parsed=new URL(url,'https://example.test');location.search=parsed.search;location.hash=parsed.hash;}},localStorage:{getItem:()=>storage},URLSearchParams,URL,requestAnimationFrame(){}};
  for(const f of ['data','research','terms','graph','visuals','media','atlas'])vm.runInNewContext(fs.readFileSync(`assets/${f}.js`,'utf8'),context,{filename:`assets/${f}.js`});
  return {elements,context,click(dataset){const target={dataset,hasAttribute:name=>Object.hasOwn(dataset,name.replace('data-','')),closest(){return this;}};listeners.click({target});},change(id,value){elements[id].value=value;elements[id].listeners.change({target:elements[id]});},search(value){elements.search.value=value;elements.search.listeners.input({target:elements.search});}};
}
const app=setup();
const html=()=>app.elements.results.innerHTML;
assert.equal((html().match(/class="story-card"/g)||[]).length,47);
assert.equal((html().match(/class="card-picture"/g)||[]).length,47);
for(const e of app.context.window.NEURON_HISTORY.events)assert.ok(html().includes(`event.html?id=${e.id}`),`Missing link: ${e.id}`);
app.click({thread:'myelin'});
assert.equal((html().match(/class="story-card"/g)||[]).length,app.context.window.NEURON_HISTORY.events.filter(e=>e.era==='myelin').length);
app.click({reset:''});app.search('Bernstein');assert.ok(html().includes('bernstein-rheotome'));assert.ok(html().includes('event-bernstein'));assert.ok(!html().includes('event-galen'));
app.search('<img src=x onerror=alert(1)>');assert.ok(html().includes('No matches')||html().includes('NO MATCHES'));assert.ok(!html().includes('onerror'));
app.click({reset:''});app.click({view:'words'});assert.equal((html().match(/class="story-card word-card"/g)||[]).length,16);
for(const t of app.context.window.NEURON_TERMS.items)assert.ok(html().includes(`term.html?id=${t.id}`));
app.click({view:'paths'});assert.ok(html().includes('class="confluence"'));assert.ok(html().includes('class="lane-card"'));assert.ok(html().includes('event.html?id=nernst'));
app.click({period:'modern'});assert.ok(html().includes('event.html?id=hodgkin-huxley-1952'));assert.ok(!html().includes('event.html?id=galen'));
app.click({guide:'true'});assert.equal((html().match(/class="story-card"/g)||[]).length,12);
const restored=setup('?view=words&query=synapse');assert.equal((restored.elements.results.innerHTML.match(/class="story-card word-card"/g)||[]).length,1);
const emptyStorage=setup('','','not valid JSON');assert.ok(emptyStorage.elements.results.innerHTML.includes('event-galen'));
const deep=setup('?thread=myelin','#event-galen');assert.ok(deep.elements.results.innerHTML.includes('event-galen'));
// All local resources exist and each story has a usable, attributed image.
for(const file of ['index.html','event.html','term.html'])for(const [,ref] of fs.readFileSync(file,'utf8').matchAll(/(?:src|href)="(assets\/[^"?]+)(?:\?[^"]*)?"/g))assert.ok(fs.existsSync(ref),`${file}: ${ref} missing`);
const M=app.context.window.NEURON_MEDIA;
for(const [type,items]of [['event',app.context.window.NEURON_HISTORY.events],['term',app.context.window.NEURON_TERMS.items]])for(const item of items){const media=M[type](item.id);assert.ok(media.file&&media.credit&&media.caption&&media.type);assert.match(M.url(media),/^https:\/\/commons.wikimedia.org\//);}
console.log('Atlas checks passed: 47 illustrated events, 16 illustrated words, search, periods, threads, empty states, parallel paths, deep links and 12-stop journey.');
