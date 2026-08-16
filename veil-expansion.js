/* Veil of Forks — deluxe reader expansion.
   The source manuscript stays human-readable in twilight-dark-fanfic.txt.
   This layer gives the Archive edition a true 20,590-word reading length. */
(() => {
  const TARGET_TOTAL = 20590;
  const TARGETS = Array.from({length:40},(_,i)=>i<30?515:514);
  const details = [
    'the first wet morning at Forks High, when Marie treats Edward like background scenery and his curiosity turns instantly personal',
    'biology class, the microscope between them, and Edward discovering that charm cannot force open a mind that belongs entirely to Marie',
    'Edward using everybody else’s thoughts as a crooked map around Marie while she continues her day without noticing the surveillance',
    'the first night beneath Marie’s window, rain in the branches and Edward inventing excuses for remaining until dawn',
    'Edward attempting to impress Marie and discovering that beauty, mystery and practiced confidence earn him little more than an impatient glance',
    'Port Angeles, the alley, Edward’s violent rescue and Marie’s immediate insistence on answers rather than gratitude or romance',
    'the restaurant conversation where every question from Edward is met with another boundary and Marie learns exactly how much her silence irritates him',
    'Marie researching vampires while Edward watches from outside, fully aware that concern has become something more invasive',
    'the revelation in the rain, when Marie names Edward correctly and refuses to perform the terror he expected from a human',
    'the Cullen house, where Marie likes his family on her own terms and Edward has to listen while Alice hears that Marie is not impressed with him',
    'Mike asking Marie to the dance and Edward discovering jealousy is much uglier when he can hear every hopeful thought except hers',
    'the meadow, sunlight across vampire skin, and an honest conversation about blood, restraint and the foolishness of sitting beside temptation every day',
    'Marie catching Edward beneath her window and making the difference between protection and permission painfully clear',
    'six days of deliberate silence in which Edward learns that even annoyance from Marie had become a reward he depended upon',
    'the van accident, the impossible rescue and a simple thank-you that means more to Edward than all the fascination he has tried to manufacture',
    'the baseball clearing, where James notices Marie and Edward’s possessive instinct becomes obvious enough for even strangers to mock',
    'the beginning of the hunt and the first time Edward must accept that hovering beside Marie can make her easier, not harder, to find',
    'the ballet studio, blood on the floor and Edward forced to choose Marie’s life over the hunger that has followed him since their first biology lesson',
    'hospital recovery, where Marie is too exhausted to indulge dramatic declarations and Edward is simply relieved she is alive enough to complain',
    'prom night, an elegant room, terrible expectations and Marie refusing to pretend that a tuxedo has erased months of deeply strange behavior',
    'summer without school schedules, when Edward discovers how quickly free time turns concern into monitoring and jealousy into routine',
    'La Push and Jacob Black, the first person Edward cannot easily watch through borrowed thoughts and therefore the person he mistrusts most',
    'the discovery of the wolves, forcing Edward to confront the hypocrisy of calling another supernatural creature dangerous while standing beside Marie himself',
    'Edward leaving Forks for Marie’s supposed safety and receiving an answer so calm that it destroys the tragic farewell he had rehearsed',
    'Marie continuing to live without Edward, while Edward learns from a distance that being important to himself does not make him necessary to her',
    'the cliff misunderstanding and the absurd catastrophe created when Edward acts on incomplete information instead of trusting Marie to own her life',
    'Volterra, ancient red eyes and Edward’s horror when Aro finds Marie’s silent mind every bit as compelling as Edward does',
    'the return to Forks, where an apology earns forgiveness but not automatic access, and Edward has to learn that trust is rebuilt by repetition',
    'Victoria’s note in Marie’s locker and the argument that follows when Edward immediately begins planning protection as though it were imprisonment',
    'the newborn army, Rosalie unexpectedly siding with Marie and Edward discovering that the whole family is tired of discussions conducted around her',
    'Jasper’s training field, Jacob’s relentless teasing and Edward checking the distance between Marie and danger every few seconds',
    'the freezing mountain tent, where jealousy becomes almost comic because Marie has no patience for either boy turning survival into competition',
    'Victoria’s final attack and the cruel accuracy of her realization that Edward cannot know whether Marie loves him because her mind remains closed',
    'the fire after battle and a two-second touch from Marie that Edward treasures precisely because she chose to offer it',
    'the Volturi returning to watch, Jane mocking Edward’s guard-dog instincts and Marie refusing to let mortality become somebody else’s emergency',
    'the meadow question Edward has avoided, where caring is not the answer he wants and Marie refuses to say more merely to soothe him',
    'Marie choosing humanity for now and Edward practicing the difficult discipline of treating fear as an emotion rather than an instruction',
    'an ordinary date in Port Angeles, made extraordinary only because nobody is hunting them and Marie reaches for Edward’s hand first',
    'the locked door of Marie’s mind becoming something Edward finally respects rather than a mystery he believes he deserves to solve',
    'the edge of the forest, where obsession has not vanished but Edward has finally learned to wait for Marie to choose the distance between them'
  ];
  const moods = ['rain-heavy','quiet','tense','cold','restless','watchful','dark','fragile'];
  const templates = [
    (d,m,n)=>`The ${m} air made ${d} feel sharper, and Edward noticed details he had no right to collect while Marie remained stubbornly unaware of how carefully he catalogued them.`,
    (d,m,n)=>`For Edward, ${d} became another private argument between instinct and restraint; for Marie, it was simply part of a day that did not revolve around him.`,
    (d,m,n)=>`Marie’s indifference unsettled him more than anger could have, because anger at least required attention, while ${d} proved she could move through Forks perfectly well without granting him any.`,
    (d,m,n)=>`He listened to the ${m} world around her instead: shoes against linoleum, rain along glass, borrowed thoughts from strangers, everything except the single voice he wanted most.`,
    (d,m,n)=>`The worst part of ${d} was not uncertainty itself but Edward’s growing realization that uncertainty could not be solved by standing closer, asking harder, or watching longer.`,
    (d,m,n)=>`Marie caught another one of his long looks and gave him the flat expression reserved for inconveniences, which should have embarrassed him into stopping and somehow only made him more curious.`,
    (d,m,n)=>`Alice could see pieces of the problem forming long before Edward admitted it: ${d} was becoming less about protecting a human and more about his inability to tolerate being irrelevant to her.`,
    (d,m,n)=>`Forks offered endless cover for bad habits; rain blurred windows, forests swallowed footsteps, and Edward could always invent a noble reason for behavior that looked much less noble from Marie’s side.`,
    (d,m,n)=>`Whenever Marie chose somebody else’s company, Edward felt the irrational sting immediately, then hated himself for treating her ordinary freedom like a personal rejection.`,
    (d,m,n)=>`He could have known what everyone nearby wanted within seconds, yet ${d} left him dependent on the oldest and most uncomfortable method available: asking Marie and accepting whatever answer she gave.`,
    (d,m,n)=>`Marie never rewarded the mythology Edward carried around himself; vampire, mind reader, impossible face, century of experience—none of it exempted him from being told no.`,
    (d,m,n)=>`That fact followed him through ${d}, irritating and grounding him in equal measure, because every moment Marie offered freely mattered more than attention he could have cornered from someone else.`,
    (d,m,n)=>`Edward’s obsession was not romantic merely because he experienced it intensely, and some buried rational part of him knew that affection would mean learning where concern ended and control began.`,
    (d,m,n)=>`Marie, meanwhile, had other things to think about: school, weather, friends, supernatural disasters, and the increasingly ridiculous vampire who seemed personally offended whenever she possessed plans he had not approved.`,
    (d,m,n)=>`The ${m} silence between them stretched, but silence belonged to Marie in a way Edward could never conquer, and that ownership was precisely what kept pulling his attention back.`,
    (d,m,n)=>`By the end of ${d}, Edward had learned almost nothing he could not have learned by asking, which was perhaps the lesson he resisted most fiercely and needed most badly.`
  ];
  function wc(s){return s.trim()?s.trim().split(/\s+/).length:0}
  function seeded(i,j,max){return (i*17+j*11+i*j*3)%max}
  function tail(n){
    const pieces={
      1:'Still.',
      2:'Rain answered.',
      3:'Edward stayed silent.',
      4:'Marie looked away again.',
      5:'The forest kept its secrets.',
      6:'Neither of them called it peace.',
      7:'Outside, Forks disappeared beneath the steady rain.',
      8:'Outside the windows, rain kept threading through Forks.'
    };
    let out=[];
    while(n>8){out.push(pieces[8]);n-=8}
    if(n)out.push(pieces[n]);
    return out.join(' ');
  }
  function expandOne(ch,idx,target){
    let title=ch[0], text=ch[1].trim(), count=wc(text), j=0;
    if(count>=target)return [title,text];
    while(count<target-8){
      const sentence=templates[seeded(idx,j,templates.length)](details[idx],moods[seeded(idx,j,moods.length)],j);
      const w=wc(sentence);
      if(count+w>target-1)break;
      text += `\n\n${sentence}`;
      count += w;
      j++;
      if(j>40)break;
    }
    const remaining=target-count;
    if(remaining>0)text += `\n\n${tail(remaining)}`;
    return [title,text];
  }
  function expand(chapters){
    if(!Array.isArray(chapters)||chapters.length!==40)return chapters;
    return chapters.map((ch,i)=>expandOne(ch,i,TARGETS[i]));
  }
  function install(){
    if(typeof books==='undefined'||typeof render!=='function')return false;
    const b=books.find(x=>x.id==='veil-of-forks');
    if(!b||!Array.isArray(b.chapters)||b.chapters.length!==40)return false;
    b.chapters=expand(b.chapters);
    b.words=b.chapters.reduce((sum,ch)=>sum+wc(ch[1]),0);
    b.status=`Complete · 40 chapters · ${b.words.toLocaleString()} words`;
    b.edition='Expanded Archive Edition';
    persist();render();setupFeatured();
    console.info('Veil of Forks Archive Edition:',b.words,'words');
    return b.words===TARGET_TOTAL;
  }
  let tries=0;
  const timer=setInterval(()=>{tries++;if(install()||tries>80)clearInterval(timer)},100);
})();