(()=>{
  const nativeSetInterval=window.setInterval.bind(window);
  const nativeClearInterval=window.clearInterval.bind(window);
  const nativeClearTimeout=window.clearTimeout.bind(window);
  const labels={ru:'Уровень',en:'Level',fr:'Niveau',de:'Stufe'};
  const levelFor=score=>Math.min(8,1+Math.floor(Math.max(0,score)/5));
  const delayFor=score=>Math.max(90,240-(levelFor(score)-1)*20);
  const scoreNow=()=>Number(document.getElementById('snake-score')?.textContent||0);

  function ensureLevel(){
    const scores=document.querySelector('.snake-scores');
    if(!scores)return;
    let box=scores.querySelector('.snake-level-box');
    if(!box){
      box=document.createElement('div');
      box.className='snake-level-box';
      box.innerHTML='<span class="snake-level-label"></span><strong id="snake-level">1</strong>';
      scores.appendChild(box);
    }
    const lang=labels[document.documentElement.lang]?document.documentElement.lang:'ru';
    box.querySelector('.snake-level-label').textContent=labels[lang];
    box.querySelector('#snake-level').textContent=levelFor(scoreNow());
    scores.style.gridTemplateColumns='repeat(3,minmax(0,1fr))';
  }

  window.setInterval=(fn,delay,...args)=>{
    if(typeof fn!=='function'||fn.name!=='tickSnake'||Number(delay)!==135)return nativeSetInterval(fn,delay,...args);
    const token={__snakeLevelTimer:true,active:true,id:null};
    const run=()=>{
      if(!token.active)return;
      fn(...args);
      ensureLevel();
      if(!token.active)return;
      token.id=setTimeout(run,delayFor(scoreNow()));
    };
    ensureLevel();
    token.id=setTimeout(run,delayFor(scoreNow()));
    return token;
  };

  window.clearInterval=id=>{
    if(id&&id.__snakeLevelTimer){
      id.active=false;
      if(id.id!==null)nativeClearTimeout(id.id);
      return;
    }
    nativeClearInterval(id);
  };

  document.addEventListener('DOMContentLoaded',()=>setTimeout(ensureLevel,0),{once:true});
  document.addEventListener('click',e=>{if(e.target.closest('[data-game="snake"],.snake-new,.snake-restart,.snake-pause'))setTimeout(ensureLevel,0);},true);
  new MutationObserver(()=>requestAnimationFrame(ensureLevel)).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
