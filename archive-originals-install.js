(()=>{
const DEMO_IDS=new Set(['velvet','ashes','orbit','thorns','rain']);
function installOriginals(){
  if(typeof window.buildArchiveOriginals!=='function'||typeof books==='undefined')return;
  const fresh=window.buildArchiveOriginals();
  const freshIds=new Set(fresh.map(b=>b.id));
  const previous=new Map(books.map(b=>[b.id,b]));
  const originals=fresh.map(b=>{
    const old=previous.get(b.id);
    return old?{...b,shelf:old.shelf||b.shelf,favorite:!!old.favorite,progress:old.progress||0,lastChapter:old.lastChapter||0}:b;
  });
  const keep=books.filter(b=>!DEMO_IDS.has(b.id)&&!freshIds.has(b.id));
  books=[...keep,...originals];
  if(typeof bootstrapLegacyReading==='function')bootstrapLegacyReading();
  if(typeof syncAllProgress==='function')syncAllProgress();
  if(typeof persist==='function')persist();
  if(typeof saveReadingData==='function')saveReadingData();
  if(typeof render==='function')render();
  console.info('Archive Originals installed:',originals.map(b=>`${b.title} (${b.words.toLocaleString()} words)`).join(' · '));
}
if(document.readyState==='loading')window.addEventListener('DOMContentLoaded',()=>setTimeout(installOriginals,0),{once:true});else setTimeout(installOriginals,0);
})();