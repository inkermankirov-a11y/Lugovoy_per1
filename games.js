(()=>{
  const tr={
    ru:{title:'Игры',sub:'Мини-игры для телефона',back:'← Назад к разделам',section:'Игры',hint:'Небольшие игры, которые работают прямо в браузере.',soon:'Скоро',play:'Играть',gameBack:'← К списку игр',newGame:'Новая игра',score:'Счёт',best:'Рекорд',how:'Свайпайте по полю, чтобы соединять одинаковые плитки.',won:'Вы собрали 2048!',gameOver:'Ходов больше нет',continue:'Продолжить',again:'Начать заново',board:'Игровое поле 2048',games:[['🧩','2048','Собирайте одинаковые плитки.'],['🐍','Змейка','Классическая змейка со свайпами.'],['🧠','Память','Находите одинаковые пары.'],['💣','Сапёр','Открывайте клетки и избегайте мин.'],['⭕','Крестики-нолики','Игра против компьютера.']]},
    en:{title:'Games',sub:'Mini games for your phone',back:'← Back to sections',section:'Games',hint:'Small games that run directly in the browser.',soon:'Soon',play:'Play',gameBack:'← Back to games',newGame:'New game',score:'Score',best:'Best',how:'Swipe the board to merge matching tiles.',won:'You made 2048!',gameOver:'No moves left',continue:'Continue',again:'Start again',board:'2048 game board',games:[['🧩','2048','Merge matching tiles.'],['🐍','Snake','Classic snake with swipe controls.'],['🧠','Memory','Find matching pairs.'],['💣','Minesweeper','Open cells and avoid mines.'],['⭕','Tic-tac-toe','Play against the computer.']]},
    fr:{title:'Jeux',sub:'Mini-jeux pour téléphone',back:'← Retour aux sections',section:'Jeux',hint:'De petits jeux qui fonctionnent directement dans le navigateur.',soon:'Bientôt',play:'Jouer',gameBack:'← Retour aux jeux',newGame:'Nouvelle partie',score:'Score',best:'Record',how:'Faites glisser le plateau pour fusionner les tuiles identiques.',won:'Vous avez obtenu 2048 !',gameOver:'Plus aucun coup possible',continue:'Continuer',again:'Recommencer',board:'Plateau de jeu 2048',games:[['🧩','2048','Fusionnez les tuiles identiques.'],['🐍','Snake','Le serpent classique avec des gestes.'],['🧠','Mémoire','Trouvez les paires identiques.'],['💣','Démineur','Ouvrez les cases et évitez les mines.'],['⭕','Morpion','Jouez contre l’ordinateur.']]},
    de:{title:'Spiele',sub:'Minispiele fürs Handy',back:'← Zurück zu den Bereichen',section:'Spiele',hint:'Kleine Spiele, die direkt im Browser laufen.',soon:'Bald',play:'Spielen',gameBack:'← Zurück zu den Spielen',newGame:'Neues Spiel',score:'Punkte',best:'Rekord',how:'Wischen Sie über das Feld, um gleiche Kacheln zusammenzuführen.',won:'2048 erreicht!',gameOver:'Keine Züge mehr möglich',continue:'Weiterspielen',again:'Neu starten',board:'2048-Spielfeld',games:[['🧩','2048','Gleiche Kacheln zusammenführen.'],['🐍','Snake','Klassisches Snake mit Wischsteuerung.'],['🧠','Memory','Finde gleiche Paare.'],['💣','Minesweeper','Felder öffnen und Minen vermeiden.'],['⭕','Tic-Tac-Toe','Gegen den Computer spielen.']]}
  };
  const lang=()=>tr[document.documentElement.lang]?document.documentElement.lang:'ru';
  const key='lugovoy-2048-state',bestKey='lugovoy-2048-best';
  let board=Array(16).fill(0),score=0,best=Number(localStorage.getItem(bestKey)||0),wonShown=false;
  let nav,view,gameView;

  function build(){
    const grid=document.querySelector('.new-home-grid');
    nav=document.querySelector('.new-home-nav');
    const main=document.getElementById('top');
    if(!grid||!nav||!main)return;

    let button=grid.querySelector('[data-action="games"]');
    if(!button){
      button=document.createElement('button');
      button.type='button';button.className='new-home-card nav-games';button.dataset.action='games';
      button.innerHTML='<span class="nav-emoji">🎮</span><strong></strong><small></small>';
      grid.appendChild(button);
    }

    view=document.querySelector('.games-view');
    if(!view){
      view=document.createElement('section');view.className='games-view';view.hidden=true;
      view.innerHTML='<button type="button" class="games-back"></button><h2 class="games-title"></h2><p class="games-subtitle"></p><div class="games-grid"></div>';
      main.insertBefore(view,nav.nextSibling);
      view.querySelector('.games-back').addEventListener('click',showHome);
    }

    gameView=document.querySelector('.game2048-view');
    if(!gameView){
      gameView=document.createElement('section');gameView.className='game2048-view';gameView.hidden=true;
      gameView.innerHTML=`<button type="button" class="game2048-back"></button><div class="game2048-head"><div><h2>2048</h2><p class="game2048-help"></p></div><button type="button" class="game2048-new"></button></div><div class="game2048-scores"><div><span class="score-label"></span><strong id="score2048">0</strong></div><div><span class="best-label"></span><strong id="best2048">0</strong></div></div><div class="game2048-board" role="application" tabindex="0"><div class="game2048-cells"></div><div class="game2048-overlay" hidden><strong></strong><div><button type="button" class="game2048-continue"></button><button type="button" class="game2048-restart"></button></div></div></div>`;
      main.insertBefore(gameView,view.nextSibling);
      gameView.querySelector('.game2048-back').addEventListener('click',showGames);
      gameView.querySelector('.game2048-new').addEventListener('click',newGame);
      gameView.querySelector('.game2048-restart').addEventListener('click',newGame);
      gameView.querySelector('.game2048-continue').addEventListener('click',()=>{wonShown=true;hideOverlay();save();});
      const gameBoard=gameView.querySelector('.game2048-board');
      let sx=0,sy=0,tracking=false;
      gameBoard.addEventListener('pointerdown',e=>{tracking=true;sx=e.clientX;sy=e.clientY;gameBoard.setPointerCapture?.(e.pointerId);});
      gameBoard.addEventListener('pointerup',e=>{if(!tracking)return;tracking=false;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<24)return;move(Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up'));});
      gameBoard.addEventListener('pointercancel',()=>tracking=false);
      gameBoard.addEventListener('keydown',e=>{const dirs={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};if(dirs[e.key]){e.preventDefault();move(dirs[e.key]);}});
    }

    button.addEventListener('click',e=>{e.stopPropagation();showGames();});
    view.addEventListener('click',e=>{const card=e.target.closest('[data-game]');if(card?.dataset.game==='2048')show2048();});
    load();apply();render();
  }

  function showHome(){view.hidden=true;gameView.hidden=true;nav.hidden=false;nav.scrollIntoView({behavior:'smooth',block:'start'});}
  function showGames(){nav.hidden=true;document.querySelector('.new-ui-search-view')?.setAttribute('hidden','');gameView.hidden=true;view.hidden=false;view.scrollIntoView({behavior:'smooth',block:'start'});}
  function show2048(){view.hidden=true;gameView.hidden=false;gameView.scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>gameView.querySelector('.game2048-board')?.focus({preventScroll:true}),200);render();}

  function newGame(){board=Array(16).fill(0);score=0;wonShown=false;addRandom();addRandom();hideOverlay();save();render();}
  function addRandom(){const empty=[];board.forEach((v,i)=>{if(!v)empty.push(i)});if(!empty.length)return;const i=empty[Math.floor(Math.random()*empty.length)];board[i]=Math.random()<.9?2:4;}
  function collapse(line){const vals=line.filter(Boolean),out=[];let gained=0;for(let i=0;i<vals.length;i++){if(vals[i]===vals[i+1]){const v=vals[i]*2;out.push(v);gained+=v;i++;}else out.push(vals[i]);}while(out.length<4)out.push(0);return [out,gained];}
  function move(dir){
    const old=board.slice();let gained=0,next=Array(16).fill(0);
    for(let n=0;n<4;n++){
      let line=[];
      if(dir==='left'||dir==='right')for(let c=0;c<4;c++)line.push(board[n*4+c]);
      else for(let r=0;r<4;r++)line.push(board[r*4+n]);
      if(dir==='right'||dir==='down')line.reverse();
      let result,pts;[result,pts]=collapse(line);gained+=pts;
      if(dir==='right'||dir==='down')result.reverse();
      if(dir==='left'||dir==='right')for(let c=0;c<4;c++)next[n*4+c]=result[c];
      else for(let r=0;r<4;r++)next[r*4+n]=result[r];
    }
    if(old.every((v,i)=>v===next[i]))return;
    board=next;score+=gained;if(score>best){best=score;localStorage.setItem(bestKey,String(best));}
    addRandom();save();render();
    if(!wonShown&&board.some(v=>v>=2048))showOverlay('won');else if(!hasMoves())showOverlay('over');
  }
  function hasMoves(){if(board.some(v=>!v))return true;for(let r=0;r<4;r++)for(let c=0;c<4;c++){const v=board[r*4+c];if(c<3&&v===board[r*4+c+1])return true;if(r<3&&v===board[(r+1)*4+c])return true;}return false;}
  function save(){localStorage.setItem(key,JSON.stringify({board,score,wonShown}));}
  function load(){try{const s=JSON.parse(localStorage.getItem(key));if(Array.isArray(s?.board)&&s.board.length===16){board=s.board.map(Number);score=Number(s.score)||0;wonShown=!!s.wonShown;if(board.every(v=>!v)){newGame();return;}return;}}catch{}newGame();}
  function showOverlay(type){const t=tr[lang()],o=gameView.querySelector('.game2048-overlay');o.hidden=false;o.dataset.type=type;o.querySelector('strong').textContent=type==='won'?t.won:t.gameOver;o.querySelector('.game2048-continue').hidden=type!=='won';}
  function hideOverlay(){const o=gameView?.querySelector('.game2048-overlay');if(o)o.hidden=true;}
  function render(){if(!gameView)return;const cells=gameView.querySelector('.game2048-cells');cells.innerHTML=board.map(v=>`<div class="tile2048${v?' has-value':''}" data-value="${v||0}">${v||''}</div>`).join('');gameView.querySelector('#score2048').textContent=score;gameView.querySelector('#best2048').textContent=best;}

  function apply(){
    const t=tr[lang()],button=document.querySelector('[data-action="games"]');
    if(button){button.querySelector('strong').textContent=t.title;button.querySelector('small').textContent=t.sub;}
    if(view){view.querySelector('.games-back').textContent=t.back;view.querySelector('.games-title').textContent=t.section;view.querySelector('.games-subtitle').textContent=t.hint;view.querySelector('.games-grid').innerHTML=t.games.map((g,i)=>`<button type="button" class="game-card${i===0?' game-ready':''}" ${i===0?'data-game="2048"':''}><span class="game-icon" aria-hidden="true">${g[0]}</span><span><strong>${g[1]}</strong><small>${g[2]}</small><span class="game-soon">${i===0?t.play:t.soon}</span></span></button>`).join('');}
    if(gameView){gameView.querySelector('.game2048-back').textContent=t.gameBack;gameView.querySelector('.game2048-new').textContent=t.newGame;gameView.querySelector('.game2048-help').textContent=t.how;gameView.querySelector('.score-label').textContent=t.score;gameView.querySelector('.best-label').textContent=t.best;gameView.querySelector('.game2048-board').setAttribute('aria-label',t.board);gameView.querySelector('.game2048-continue').textContent=t.continue;gameView.querySelector('.game2048-restart').textContent=t.again;const o=gameView.querySelector('.game2048-overlay');if(!o.hidden)showOverlay(o.dataset.type||'over');}
  }
  new MutationObserver(()=>requestAnimationFrame(apply)).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();