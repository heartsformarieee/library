(()=>{
function installVol2(){
  if(typeof window.buildArchiveOriginalsVol2!=='function'||typeof books==='undefined')return;
  const fresh=window.buildArchiveOriginalsVol2();
  const ids=new Set(fresh.map(b=>b.id));
  const prior=new Map(books.map(b=>[b.id,b]));
  const merged=fresh.map(b=>{const old=prior.get(b.id);return old?{...b,shelf:old.shelf||b.shelf,favorite:!!old.favorite,progress:old.progress||0,lastChapter:old.lastChapter||0}:b});
  books=[...books.filter(b=>!ids.has(b.id)),...merged];
  if(typeof bootstrapLegacyReading==='function')bootstrapLegacyReading();
  if(typeof syncAllProgress==='function')syncAllProgress();
  if(typeof persist==='function')persist();
  if(typeof saveReadingData==='function')saveReadingData();
  if(typeof render==='function')render();
  console.info('Archive Originals Vol. II installed:',merged.length,'books');
}
if(document.readyState==='loading')window.addEventListener('DOMContentLoaded',()=>setTimeout(installVol2,20),{once:true});else setTimeout(installVol2,20);
})();