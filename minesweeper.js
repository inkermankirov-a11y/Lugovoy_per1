(()=>{
  "use strict";
  const translations={
    ru:{
      title:"Сапёр",back:"← Все игры",newGame:"↻ Новая игра",eyebrow:"МИНИ-ИГРЫ / КЛАССИКА",
      hint:"Найдите все мины или откройте все безопасные клетки.",
      mineSettings:"Количество мин",remaining:"Осталось",time:"Время",flags:"Флаги",
      open:"👆 Открывать",flag:"🚩 Флаг",tip:"Короткое нажатие — действие · удержание — флаг",
      win:"Победа!",lose:"Взрыв!",again:"Играть ещё",
      winDetail:"Все мины обезврежены за",loseDetail:"Попробуйте другую комбинацию флагов.",
      cell:"Клетка",covered:"закрыта",flagged:"флаг",empty:"пусто",mine:"мина",play:"Играть"
    },
    en:{
      title:"Minesweeper",back:"← All games",newGame:"↻ New game",eyebrow:"MINI GAMES / CLASSIC",
      hint:"Mark every mine or reveal all safe cells.",
      mineSettings:"Number of mines",remaining:"Left",time:"Time",flags:"Flags",
      open:"👆 Reveal",flag:"🚩 Flag",tip:"Tap to act · hold to flag",
      win:"You win!",lose:"Boom!",again:"Play again",
      winDetail:"All mines cleared in",loseDetail:"Try another combination of flags.",
      cell:"Cell",covered:"hidden",flagged:"flagged",empty:"empty",mine:"mine",play:"Play"
    },
    fr:{
      title:"Démineur",back:"← Tous les jeux",newGame:"↻ Nouvelle partie",eyebrow:"MINI-JEUX / CLASSIQUE",
      hint:"Marquez toutes les mines ou découvrez les cases sûres.",
      mineSettings:"Nombre de mines",remaining:"Restantes",time:"Temps",flags:"Drapeaux",
      open:"👆 Ouvrir",flag:"🚩 Drapeau",tip:"Touchez pour jouer · maintenez pour marquer",
      win:"Victoire !",lose:"Explosion !",again:"Rejouer",
      winDetail:"Toutes les mines neutralisées en",loseDetail:"Essayez une autre combinaison.",
      cell:"Case",covered:"cachée",flagged:"drapeau",empty:"vide",mine:"mine",play:"Jouer"
    },
    de:{
      title:"Minesweeper",back:"← Alle Spiele",newGame:"↻ Neues Spiel",eyebrow:"MINISPIELE / KLASSIKER",
      hint:"Markiere alle Minen oder öffne alle sicheren Felder.",
      mineSettings:"Anzahl Minen",remaining:"Übrig",time:"Zeit",flags:"Flaggen",
      open:"👆 Öffnen",flag:"🚩 Flagge",tip:"Tippen zum Spielen · halten für Flagge",
      win:"Gewonnen!",lose:"Explosion!",again:"Noch einmal",
      winDetail:"Alle Minen entschärft in",loseDetail:"Versuche eine andere Kombination.",
      cell:"Feld",covered:"verdeckt",flagged:"markiert",empty:"leer",mine:"Mine",play:"Spielen"
    }
  };
  const lang=()=>translations[document.documentElement.lang]?document.documentElement.lang:"ru";
  const tr=()=>translations[lang()];
  const W=9,H=9,SIZE=W*H;
  const options=[10,20,30,40,50];
  const neighbors=i=>{
    const x=i%W,y=Math.floor(i/W),out=[];
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
      if(!dx&&!dy)continue;
      const nx=x+dx,ny=y+dy;
      if(nx>=0&&nx<W&&ny>=0&&ny<H)out.push(ny*W+nx);
    }
    return out;
  };
  let view=null,board=null,cells=[],mineCount=10,started=false,finished=false;
  let flagMode=false,startedAt=0,elapsed=0,clock=null,result=null;
  let hold=null,holdStart=null,blockClickUntil=0;
  const setText=(selector,value)=>{const el=view.querySelector(selector);if(el)el.textContent=value;};
  const countFlags=()=>cells.reduce((n,c)=>n+(c.flag?1:0),0);
  const formattedTime=()=>{
    const minutes=Math.floor(elapsed/60);
    const seconds=elapsed%60;
    return String(minutes).padStart(2,"0")+":"+String(seconds).padStart(2,"0");
  };
  function clearClock(){
    if(clock!==null)clearInterval(clock);
    clock=null;
  }
  function resetCells(){
    cells=Array.from({length:SIZE},()=>({mine:false,open:false,flag:false,n:0}));
  }
  function plantMines(first){
    const excluded=new Set([first,...neighbors(first)]);
    const free=[];
    for(let i=0;i<SIZE;i++)if(!excluded.has(i))free.push(i);
    for(let n=0;n<mineCount;n++){
      const pos=Math.floor(Math.random()*free.length);
      cells[free.splice(pos,1)[0]].mine=true;
    }
    cells.forEach((c,i)=>{
      c.n=c.mine?0:neighbors(i).filter(j=>cells[j].mine).length;
    });
  }
  function start(first){
    if(started)return;
    started=true;
    plantMines(first);
    startedAt=Date.now();
    clock=setInterval(()=>{
      elapsed=Math.floor((Date.now()-startedAt)/1000);
      renderStats();
    },1000);
  }
  function renderStats(){
    setText("[data-mines-left]",String(Math.max(0,mineCount-countFlags())));
    setText("[data-mines-time]",formattedTime());
    setText("[data-mines-flags]",String(countFlags()));
  }
  function renderBoard(){
    if(!board)return;
    const t=tr();
    const nodes=board.children;
    for(let i=0;i<SIZE;i++){
      const cell=cells[i],node=nodes[i];
      if(!node)continue;
      const shown=cell.open;
      node.classList.toggle("is-open",shown);
      node.classList.toggle("is-flagged",cell.flag&&!shown);
      node.classList.toggle("is-mine",shown&&cell.mine);
      node.dataset.number=shown&&!cell.mine?String(cell.n):"0";
      const value=shown?(cell.mine?"💣":cell.n||""):(cell.flag?"🚩":"");
      if(node.textContent!==String(value))node.textContent=String(value);
      const state=cell.flag&&!shown?t.flagged:shown?(cell.mine?t.mine:(cell.n||t.empty)):t.covered;
      node.setAttribute("aria-label",t.cell+" "+(i+1)+": "+state);
    }
    renderStats();
  }
  function renderControls(){
    const t=tr();
    setText(".mines-eyebrow",t.eyebrow);
    setText(".mines-head h2",t.title);
    setText(".mines-back",t.back);
    setText(".mines-new",t.newGame);
    setText(".mines-help",t.hint);
    setText(".mines-settings-label",t.mineSettings);
    setText(".mines-settings-count",String(mineCount));
    setText(".mines-left-label",t.remaining);
    setText(".mines-time-label",t.time);
    setText(".mines-flags-label",t.flags);
    setText(".mines-open-mode",t.open);
    setText(".mines-flag-mode",t.flag);
    setText(".mines-bottom-hint",t.tip);
    setText(".mines-restart",t.again);
    view.querySelector(".mines-open-mode").setAttribute("aria-pressed",String(!flagMode));
    view.querySelector(".mines-flag-mode").setAttribute("aria-pressed",String(flagMode));
    view.querySelectorAll("[data-mines-preset]").forEach(b=>{
      b.setAttribute("aria-pressed",String(Number(b.dataset.minesPreset)===mineCount));
    });
    const range=view.querySelector(".mines-range");
    range.value=String(mineCount);
    range.style.setProperty("--mine-fill",String((mineCount-10)/40*100)+"%");
    range.setAttribute("aria-label",t.mineSettings);
    if(result!==null)renderOutcome();
    renderBoard();
    decorateCard();
  }
  function chooseMines(value){
    const next=Math.max(10,Math.min(50,Math.round(Number(value)||10)));
    if(mineCount===next)return;
    mineCount=next;
    newGame();
  }
  function newGame(){
    clearClock();
    started=false;finished=false;flagMode=false;elapsed=0;result=null;
    clearTimeout(hold);hold=null;holdStart=null;blockClickUntil=0;
    resetCells();
    if(!view)return;
    const overlay=view.querySelector(".mines-overlay");
    overlay.hidden=true;
    overlay.querySelector(".mines-confetti").replaceChildren();
    renderControls();
  }
  function revealFrom(first){
    const stack=[first],visited=new Set();
    while(stack.length){
      const i=stack.pop();
      if(visited.has(i))continue;
      visited.add(i);
      const cell=cells[i];
      if(cell.open||cell.flag||cell.mine)continue;
      cell.open=true;
      if(cell.n===0){
        for(const next of neighbors(i))if(!visited.has(next))stack.push(next);
      }
    }
  }
  function didWin(){
    if(!started||finished)return false;
    const allSafeOpened=cells.every(c=>c.mine||c.open);
    const allMinesFlagged=countFlags()===mineCount&&cells.every(c=>!c.mine||c.flag);
    if(allSafeOpened||allMinesFlagged){
      finish(true);
      return true;
    }
    return false;
  }
  function openCell(i){
    const c=cells[i];
    if(!c||finished||c.open||c.flag)return;
    start(i);
    if(c.mine){
      c.open=true;
      finish(false);
      return;
    }
    revealFrom(i);
    if(!didWin())renderBoard();
  }
  function toggleFlag(i){
    const c=cells[i];
    if(!c||finished||c.open)return;
    c.flag=!c.flag;
    if(!didWin())renderBoard();
  }
  function renderOutcome(){
    const t=tr();
    const win=result===true;
    setText(".mines-result-icon",win?"🏆":"💥");
    setText(".mines-result-title",win?t.win:t.lose);
    setText(".mines-result-detail",win?t.winDetail+" "+formattedTime():t.loseDetail);
    setText(".mines-restart",t.again);
  }
  function finish(won){
    finished=true;
    result=won;
    clearClock();
    if(won)cells.forEach(c=>{if(c.mine)c.flag=true;});
    else cells.forEach(c=>{if(c.mine)c.open=true;});
    renderBoard();
    const overlay=view.querySelector(".mines-overlay");
    overlay.hidden=false;
    renderOutcome();
    if(won){
      const colors=["#5ce9c7","#9a7aff","#ffe08a","#7bc7ff"];
      const wrap=overlay.querySelector(".mines-confetti");
      for(let i=0;i<22;i++){
        const particle=document.createElement("i");
        particle.style.setProperty("--x",String(4+(i*37)%92));
        particle.style.setProperty("--delay",String((i%8)*.07)+"s");
        particle.style.setProperty("--color",colors[i%colors.length]);
        wrap.appendChild(particle);
      }
    }
  }
  function decorateCard(){
    const cards=document.querySelectorAll(".games-grid .game-card");
    const card=cards[3];
    if(!card)return;
    card.classList.add("game-ready");
    card.dataset.game="minesweeper";
    const badge=card.querySelector(".game-soon");
    if(badge)badge.textContent=tr().play;
  }
  function hideOtherViews(){
    [
      ".new-home-nav",".games-view",".game2048-view",".snake-view",
      ".memory-view",".tictactoe-view",".checkers-view",
      ".bubble-view",".new-ui-search-view"
    ].forEach(selector=>document.querySelector(selector)?.setAttribute("hidden",""));
  }
  function showGame(){
    hideOtherViews();
    document.body.classList.add("mines-playing");
    view.hidden=false;
    decorateCard();
    view.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function showGames(){
    document.body.classList.remove("mines-playing");
    view.hidden=true;
    const games=document.querySelector(".games-view");
    if(games){
      games.hidden=false;
      decorateCard();
      games.scrollIntoView({behavior:"smooth",block:"start"});
    }
  }
  function build(){
    const main=document.getElementById("top");
    if(!main)return;
    view=document.createElement("section");
    view.className="mines-view";
    view.hidden=true;
    view.innerHTML=
      '<button type="button" class="mines-back"></button>'+
      '<div class="mines-panel">'+
        '<div class="mines-head">'+
          '<div class="mines-heading">'+
            '<span class="mines-eyebrow"></span><h2></h2><p class="mines-help"></p>'+
          '</div>'+
          '<button type="button" class="mines-new"></button>'+
        '</div>'+
        '<div class="mines-settings">'+
          '<div class="mines-settings-top"><span class="mines-settings-label"></span>'+
          '<strong class="mines-settings-count">10</strong></div>'+
          '<div class="mines-presets" role="group">'+
            options.map(n=>'<button type="button" data-mines-preset="'+n+'">'+n+'</button>').join("")+
          '</div>'+
          '<div class="mines-range-wrap">'+
            '<span>10</span><input class="mines-range" type="range" min="10" max="50" step="1" value="10"><span>50</span>'+
          '</div>'+
        '</div>'+
        '<div class="mines-stats">'+
          '<div class="mines-stat-remaining"><span class="mines-left-label"></span><strong data-mines-left>10</strong></div>'+
          '<div><span class="mines-time-label"></span><strong data-mines-time>00:00</strong></div>'+
          '<div><span class="mines-flags-label"></span><strong data-mines-flags>0</strong></div>'+
        '</div>'+
        '<div class="mines-modes" role="group">'+
          '<button type="button" class="mines-open-mode" aria-pressed="true"></button>'+
          '<button type="button" class="mines-flag-mode" aria-pressed="false"></button>'+
        '</div>'+
        '<div class="mines-board-shell">'+
          '<div class="mines-board" role="grid" aria-label="Minesweeper 9×9"></div>'+
          '<div class="mines-overlay" hidden role="status" aria-live="polite">'+
            '<div class="mines-confetti" aria-hidden="true"></div>'+
            '<div class="mines-result-icon"></div><strong class="mines-result-title"></strong>'+
            '<p class="mines-result-detail"></p>'+
            '<button type="button" class="mines-restart"></button>'+
          '</div>'+
        '</div>'+
        '<p class="mines-bottom-hint"></p>'+
      '</div>';
    main.appendChild(view);
    board=view.querySelector(".mines-board");
    for(let i=0;i<SIZE;i++){
      const button=document.createElement("button");
      button.type="button";
      button.className="mine-cell";
      button.dataset.mineCell=String(i);
      button.setAttribute("role","gridcell");
      board.appendChild(button);
    }
    view.querySelector(".mines-back").addEventListener("click",showGames);
    view.querySelector(".mines-new").addEventListener("click",newGame);
    view.querySelector(".mines-restart").addEventListener("click",newGame);
    view.querySelector(".mines-open-mode").addEventListener("click",()=>{flagMode=false;renderControls();});
    view.querySelector(".mines-flag-mode").addEventListener("click",()=>{flagMode=true;renderControls();});
    view.querySelectorAll("[data-mines-preset]").forEach(b=>{
      b.addEventListener("click",()=>chooseMines(b.dataset.minesPreset));
    });
    const range=view.querySelector(".mines-range");
    range.addEventListener("input",()=>{
      const n=Number(range.value);
      view.querySelector(".mines-settings-count").textContent=String(n);
      range.style.setProperty("--mine-fill",String((n-10)/40*100)+"%");
      view.querySelectorAll("[data-mines-preset]").forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.minesPreset)===n)));
    });
    range.addEventListener("change",()=>chooseMines(range.value));
    board.addEventListener("click",e=>{
      const button=e.target.closest("[data-mine-cell]");
      if(!button||Date.now()<blockClickUntil)return;
      const i=Number(button.dataset.mineCell);
      if(flagMode)toggleFlag(i);else openCell(i);
    });
    const cancelHold=()=>{if(hold!==null)clearTimeout(hold);hold=null;holdStart=null;};
    board.addEventListener("pointerdown",e=>{
      if(e.button!==0||e.pointerType==="mouse")return;
      const button=e.target.closest("[data-mine-cell]");
      if(!button||finished)return;
      cancelHold();
      holdStart={x:e.clientX,y:e.clientY};
      const i=Number(button.dataset.mineCell);
      hold=setTimeout(()=>{
        hold=null;
        blockClickUntil=Date.now()+750;
        toggleFlag(i);
        if(typeof navigator.vibrate==="function")navigator.vibrate(24);
      },480);
    });
    board.addEventListener("pointermove",e=>{
      if(holdStart&&Math.hypot(e.clientX-holdStart.x,e.clientY-holdStart.y)>10)cancelHold();
    });
    board.addEventListener("pointerup",cancelHold);
    board.addEventListener("pointercancel",cancelHold);
    board.addEventListener("pointerleave",cancelHold);
    board.addEventListener("contextmenu",e=>{
      const button=e.target.closest("[data-mine-cell]");
      if(!button)return;
      e.preventDefault();
      cancelHold();
      if(Date.now()<blockClickUntil)return;
      blockClickUntil=Date.now()+180;
      toggleFlag(Number(button.dataset.mineCell));
    });
    document.addEventListener("click",e=>{
      const card=e.target.closest(".games-grid .game-card");
      if(!card)return;
      const cards=[...document.querySelectorAll(".games-grid .game-card")];
      if(card.dataset.game==="minesweeper"||cards.indexOf(card)===3){
        e.preventDefault();
        e.stopPropagation();
        showGame();
      }
    },true);
    newGame();
    new MutationObserver(()=>requestAnimationFrame(()=>{
      if(view)renderControls();
    })).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>setTimeout(build,0));
  else setTimeout(build,0);
})();