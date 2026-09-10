(()=>{
  const T={
    ru:{title:'Шашки',back:'← К списку игр',newGame:'Новая игра',you:'Вы',computer:'Компьютер',yourTurn:'Ваш ход',computerTurn:'Ход компьютера…',win:'Вы победили!',lose:'Компьютер победил',hint:'Вы играете белыми. Взятие обязательно. Дамка ходит по диагонали на любое расстояние.',play:'Играть',card:'Шашки против компьютера.',white:'Белые',black:'Чёрные'},
    en:{title:'Checkers',back:'← Back to games',newGame:'New game',you:'You',computer:'Computer',yourTurn:'Your turn',computerTurn:'Computer is moving…',win:'You win!',lose:'Computer wins',hint:'You play white. Captures are mandatory. Kings move any distance diagonally.',play:'Play',card:'Checkers against the computer.',white:'White',black:'Black'},
    fr:{title:'Dames',back:'← Retour aux jeux',newGame:'Nouvelle partie',you:'Vous',computer:'Ordinateur',yourTurn:'À vous',computerTurn:'L’ordinateur joue…',win:'Vous avez gagné !',lose:'L’ordinateur a gagné',hint:'Vous jouez les blancs. Les prises sont obligatoires. Les dames se déplacent librement en diagonale.',play:'Jouer',card:'Jeu de dames contre l’ordinateur.',white:'Blancs',black:'Noirs'},
    de:{title:'Dame',back:'← Zurück zu den Spielen',newGame:'Neues Spiel',you:'Sie',computer:'Computer',yourTurn:'Ihr Zug',computerTurn:'Computer zieht…',win:'Sie haben gewonnen!',lose:'Computer gewinnt',hint:'Sie spielen Weiß. Schlagen ist Pflicht. Damen ziehen beliebig weit diagonal.',play:'Spielen',card:'Dame gegen den Computer.',white:'Weiß',black:'Schwarz'}
  };
  const L=()=>T[document.documentElement.lang]?document.documentElement.lang:'ru';
  let view=null,board=[],selected=null,targets=[],turn='w',locked=false,multiFrom=null;

  function makeBoard(){
    board=Array.from({length:8},()=>Array(8).fill(null));
    for(let r=0;r<3;r++)for(let c=0;c<8;c++)if((r+c)%2)board[r][c]={p:'b',k:false};
    for(let r=5;r<8;r++)for(let c=0;c<8;c++)if((r+c)%2)board[r][c]={p:'w',k:false};
  }
  const inside=(r,c)=>r>=0&&r<8&&c>=0&&c<8;
  const dirs=[[-1,-1],[-1,1],[1,-1],[1,1]];

  function pieceCaptures(r,c){
    const piece=board[r][c];if(!piece)return[];const out=[];
    if(piece.k){
      for(const [dr,dc] of dirs){let rr=r+dr,cc=c+dc,enemy=null;while(inside(rr,cc)){const q=board[rr][cc];if(!q){if(enemy)out.push({fr:r,fc:c,tr:rr,tc:cc,cr:enemy.r,ccap:enemy.c});}else if(q.p===piece.p)break;else{if(enemy)break;enemy={r:rr,c:cc};}rr+=dr;cc+=dc;}}
    }else{
      for(const [dr,dc] of dirs){const mr=r+dr,mc=c+dc,tr=r+dr*2,tc=c+dc*2;if(inside(tr,tc)&&board[mr]?.[mc]&&board[mr][mc].p!==piece.p&&!board[tr][tc])out.push({fr:r,fc:c,tr,tc,cr:mr,ccap:mc});}
    }
    return out;
  }
  function pieceMoves(r,c){
    const piece=board[r][c];if(!piece)return[];const caps=pieceCaptures(r,c);if(caps.length)return caps;const out=[];
    if(piece.k){for(const [dr,dc] of dirs){let rr=r+dr,cc=c+dc;while(inside(rr,cc)&&!board[rr][cc]){out.push({fr:r,fc:c,tr:rr,tc:cc});rr+=dr;cc+=dc;}}}
    else{const dr=piece.p==='w'?-1:1;for(const dc of [-1,1]){const rr=r+dr,cc=c+dc;if(inside(rr,cc)&&!board[rr][cc])out.push({fr:r,fc:c,tr:rr,tc:cc});}}
    return out;
  }
  function allMoves(player){
    let captures=[],moves=[];for(let r=0;r<8;r++)for(let c=0;c<8;c++)if(board[r][c]?.p===player){const caps=pieceCaptures(r,c);if(caps.length)captures.push(...caps);else moves.push(...pieceMoves(r,c));}
    return captures.length?captures:moves;
  }
  function applyMove(m){
    const piece=board[m.fr][m.fc];board[m.fr][m.fc]=null;board[m.tr][m.tc]=piece;if(m.cr!==undefined)board[m.cr][m.ccap]=null;
    if(piece.p==='w'&&m.tr===0)piece.k=true;if(piece.p==='b'&&m.tr===7)piece.k=true;
  }
  function clickCell(r,c){
    if(locked||turn!=='w')return;
    if(selected){const m=targets.find(x=>x.tr===r&&x.tc===c);if(m){applyMove(m);selected=null;targets=[];if(m.cr!==undefined){const more=pieceCaptures(m.tr,m.tc);if(more.length){selected=[m.tr,m.tc];targets=more;multiFrom=[m.tr,m.tc];render();return;}}multiFrom=null;finishPlayerTurn();return;}}
    const piece=board[r][c];if(piece?.p!=='w')return;
    const legal=allMoves('w');const own=legal.filter(m=>m.fr===r&&m.fc===c);if(!own.length)return;selected=[r,c];targets=own;render();
  }
  function finishPlayerTurn(){render();if(checkEnd())return;turn='b';locked=true;setStatus(T[L()].computerTurn);setTimeout(computerTurn,320);}
  function computerTurn(){
    let moves=allMoves('b');if(!moves.length){checkEnd();return;}
    const captures=moves.filter(m=>m.cr!==undefined);if(captures.length)moves=captures;
    moves.sort((a,b)=>scoreMove(b)-scoreMove(a));const top=moves.slice(0,Math.min(3,moves.length));let m=top[Math.floor(Math.random()*top.length)];applyMove(m);
    if(m.cr!==undefined){let r=m.tr,c=m.tc;while(true){const more=pieceCaptures(r,c);if(!more.length)break;more.sort((a,b)=>scoreMove(b)-scoreMove(a));m=more[0];applyMove(m);r=m.tr;c=m.tc;}}
    turn='w';locked=false;selected=null;targets=[];render();if(!checkEnd())setStatus(T[L()].yourTurn);
  }
  function scoreMove(m){let s=0;if(m.cr!==undefined)s+=10;if(m.tr===7)s+=4;s+=3-Math.abs(3.5-m.tc)*.15;return s+Math.random()*.2;}
  function checkEnd(){
    const w=allMoves('w'),b=allMoves('b');if(!w.length){locked=true;setStatus(T[L()].lose);return true;}if(!b.length){locked=true;setStatus(T[L()].win);return true;}return false;
  }
  function setStatus(s){const el=view?.querySelector('.checkers-status');if(el)el.textContent=s;}
  function counts(){let w=0,b=0;for(const row of board)for(const p of row)if(p){if(p.p==='w')w++;else b++;}return{w,b};}
  function render(){
    if(!view)return;const t=T[L()],legal=turn==='w'&&!locked?allMoves('w'):[];const selectable=new Set(legal.map(m=>`${m.fr},${m.fc}`));const targetSet=new Set(targets.map(m=>`${m.tr},${m.tc}`));
    view.querySelector('.checkers-board').innerHTML=board.map((row,r)=>row.map((p,c)=>{const dark=(r+c)%2===1,key=`${r},${c}`,sel=selected&&selected[0]===r&&selected[1]===c;return `<button type="button" class="checkers-cell${dark?' dark':''}${selectable.has(key)?' selectable':''}${sel?' selected':''}${targetSet.has(key)?' target':''}" data-r="${r}" data-c="${c}" aria-label="${r+1}, ${c+1}">${p?`<span class="checker ${p.p==='w'?'white':'black'}${p.k?' king':''}"></span>`:''}</button>`}).join('')).join('');
    const n=counts();view.querySelector('[data-checkers-you]').textContent=n.w;view.querySelector('[data-checkers-computer]').textContent=n.b;
  }
  function ensureCard(){
    const grid=document.querySelector('.games-grid');if(!grid)return;let card=grid.querySelector('[data-game="checkers"]');if(!card){card=document.createElement('button');card.type='button';card.className='game-card game-ready';card.dataset.game='checkers';card.innerHTML='<span class="game-icon" aria-hidden="true">⚪</span><span><strong></strong><small></small><span class="game-soon"></span></span>';grid.appendChild(card);}const t=T[L()];card.querySelector('strong').textContent=t.title;card.querySelector('small').textContent=t.card;card.querySelector('.game-soon').textContent=t.play;
  }
  function hideOthers(){['.new-home-nav','.games-view','.game2048-view','.snake-view','.tictactoe-view','.memory-view','.minesweeper-view','.new-ui-search-view'].forEach(s=>document.querySelector(s)?.setAttribute('hidden',''));}
  function showGame(){hideOthers();view.hidden=false;view.scrollIntoView({behavior:'smooth',block:'start'});}
  function showGames(){view.hidden=true;const g=document.querySelector('.games-view');if(g){g.hidden=false;ensureCard();g.scrollIntoView({behavior:'smooth',block:'start'});}}
  function newGame(){makeBoard();selected=null;targets=[];turn='w';locked=false;multiFrom=null;setStatus(T[L()].yourTurn);render();}
  function apply(){if(!view)return;const t=T[L()];view.querySelector('h2').textContent=`⚪ ${t.title}`;view.querySelector('.checkers-back').textContent=t.back;view.querySelector('.checkers-new').textContent=t.newGame;view.querySelector('.checkers-help').textContent=t.hint;view.querySelector('.checkers-you-label').textContent=t.you;view.querySelector('.checkers-computer-label').textContent=t.computer;view.querySelector('.checkers-white-label').textContent=t.white;view.querySelector('.checkers-black-label').textContent=t.black;if(!locked)setStatus(turn==='w'?t.yourTurn:t.computerTurn);ensureCard();render();}
  function build(){
    const main=document.getElementById('top');if(!main)return;view=document.createElement('section');view.className='checkers-view';view.hidden=true;view.innerHTML=`<button type="button" class="checkers-back"></button><div class="checkers-head"><div><h2></h2><p class="checkers-help"></p></div><button type="button" class="checkers-new"></button></div><div class="checkers-info"><div><span class="checkers-you-label"></span><strong data-checkers-you>12</strong></div><div><span class="checkers-computer-label"></span><strong data-checkers-computer>12</strong></div></div><div class="checkers-status" role="status" aria-live="polite"></div><div class="checkers-board" role="grid"></div><div class="checkers-legend"><span><i class="legend-piece white"></i><span class="checkers-white-label"></span></span><span><i class="legend-piece black"></i><span class="checkers-black-label"></span></span></div>`;main.appendChild(view);
    view.querySelector('.checkers-back').addEventListener('click',showGames);view.querySelector('.checkers-new').addEventListener('click',newGame);view.querySelector('.checkers-board').addEventListener('click',e=>{const c=e.target.closest('.checkers-cell');if(c)clickCell(Number(c.dataset.r),Number(c.dataset.c));});document.addEventListener('click',e=>{const card=e.target.closest('[data-game="checkers"]');if(card){e.preventDefault();e.stopPropagation();showGame();}},true);
    newGame();apply();ensureCard();const grid=document.querySelector('.games-grid');if(grid)new MutationObserver(()=>ensureCard()).observe(grid,{childList:true});
  }
  new MutationObserver(()=>requestAnimationFrame(apply)).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(build,0));else setTimeout(build,0);
})();