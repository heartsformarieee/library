(()=>{
function boot(){
  if(typeof books==='undefined'||typeof render!=='function')return;
  const oldPersist=typeof persist==='function'?persist:null;
  persist=function(){
    const lightweight=books.map(b=>b.official?{id:b.id,shelf:b.shelf,favorite:!!b.favorite,progress:b.progress||0,lastChapter:b.lastChapter||0}:b);
    try{localStorage.setItem('archive-books',JSON.stringify(lightweight))}catch(err){console.warn('Archive state storage limited; reading stats remain separate.',err)}
  };
  persist();
  if(typeof saveReadingData==='function')saveReadingData();
  render();
  console.info('Archive storage optimized for',books.length,'books.');
}
setTimeout(boot,100);
})();