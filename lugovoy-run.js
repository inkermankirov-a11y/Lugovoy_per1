(()=>{
  const T={
    ru:{title:'Луговой Run',back:'← К списку игр',newGame:'Новая гонка',speed:'Скорость',distance:'Дистанция',best:'Рекорд',hint:'Управляйте розовой «шестёркой»: ← →, газ и тормоз. Объезжайте машины и набирайте дистанцию.',start:'Старт',over:'Авария!',again:'Ещё раз',play:'Играть',card:'Гонки на розовой «шестёрке».'},
    en:{title:'Lugovoy Run',back:'← Back to games',newGame:'New race',speed:'Speed',distance:'Distance',best:'Best',hint:'Drive the pink classic sedan: steer, accelerate and brake. Dodge traffic and cover as much distance as possible.',start:'Start',over:'Crash!',again:'Again',play:'Play',card:'Retro racing in a pink classic sedan.'},
    fr:{title:'Lugovoy Run',back:'← Retour aux jeux',newGame:'Nouvelle course',speed:'Vitesse',distance:'Distance',best:'Record',hint:'Pilotez la berline rose : dirigez, accélérez et freinez. Évitez le trafic et parcourez la plus grande distance.',start:'Démarrer',over:'Accident !',again:'Rejouer',play:'Jouer',card:'Course rétro en berline rose.'},
    de:{title:'Lugovoy Run',back:'← Zurück zu den Spielen',newGame:'Neues Rennen',speed:'Tempo',distance:'Strecke',best:'Rekord',hint:'Fahren Sie die rosa Limousine: lenken, Gas geben und bremsen. Verkehr ausweichen und möglichst weit kommen.',start:'Start',over:'Crash!',again:'Nochmal',play:'Spielen',card:'Retro-Rennen mit rosa Limousine.'}
  };
  const L=()=>T[document.documentElement.lang]?document.documentElement.lang:'ru';
  let view,canvas,ctx,raf=0,last=0,running=false,dead=false;
  let playerX=0,speed=0,distance=0,best=Number(localStorage.getItem('lugovoy-run-best')||0),roadPhase=0,spawn=0;
  let traffic=[];const keys={left:false,right:false,gas:false,brake:false};

  function ensureCard(){
    const grid=document.querySelector('.games-grid');if(!grid)return;
    let card=grid.querySelector('[data-game="lugovoy-run"]');
    if(!card){card=document.createElement('button');card.type='button';card.className='game-card game-ready';card.dataset.game='lugovoy-run';card.innerHTML='<span class="game-icon" aria-hidden="true">🏎️</span><span><strong></strong><small></small><span class="game-soon"></span></span>';grid.appendChild(card);}
    const t=T[L()];card.querySelector('strong').textContent=t.title;card.querySelector('small').textContent=t.card;card.querySelector('.game-soon').textContent=t.play;
  }

  function build(){
    const main=document.getElementById('top');if(!main)return;
    view=document.createElement('section');view.className='run-view';view.hidden=true;
    view.innerHTML=`<button type="button" class="run-back"></button><div class="run-head"><div><h2>🏁</h2><p class="run-help"></p></div><button type="button" class="run-new"></button></div><div class="run-stats"><div><span class="run-speed-label"></span><strong data-run-speed>0</strong></div><div><span class="run-distance-label"></span><strong data-run-distance>0</strong></div><div><span class="run-best-label"></span><strong data-run-best>0</strong></div></div><div class="run-stage" tabindex="0" role="application"><canvas width="420" height="630"></canvas><div class="run-overlay"><strong></strong><button type="button"></button></div></div><div class="run-controls"><button type="button" data-run-control="left">←</button><button type="button" data-run-control="right">→</button></div><div class="run-pedal-row"><button type="button" data-run-control="brake" class="run-brake">Тормоз</button><button type="button" data-run-control="gas" class="run-gas">Газ</button></div>`;
    main.appendChild(view);canvas=view.querySelector('canvas');ctx=canvas.getContext('2d');
    view.querySelector('.run-back').addEventListener('click',showGames);view.querySelector('.run-new').addEventListener('click',reset);view.querySelector('.run-overlay button').addEventListener('click',start);
    document.addEventListener('click',e=>{const card=e.target.closest('[data-game="lugovoy-run"]');if(card){e.preventDefault();e.stopPropagation();showGame();}},true);
    view.querySelectorAll('[data-run-control]').forEach(btn=>{const k=btn.dataset.runControl;const down=e=>{e.preventDefault();keys[k]=true;btn.classList.add('is-down');if(!running&&!dead)start();};const up=e=>{e.preventDefault();keys[k]=false;btn.classList.remove('is-down');};btn.addEventListener('pointerdown',down);btn.addEventListener('pointerup',up);btn.addEventListener('pointercancel',up);btn.addEventListener('pointerleave',up);});
    view.querySelector('.run-stage').addEventListener('keydown',e=>{const m={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'gas',ArrowDown:'brake'};if(m[e.key]){e.preventDefault();keys[m[e.key]]=e.type==='keydown';if(!running&&!dead)start();}});
    document.addEventListener('keyup',e=>{const m={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'gas',ArrowDown:'brake'};if(m[e.key])keys[m[e.key]]=false;});
    let sx=0;view.querySelector('.run-stage').addEventListener('pointerdown',e=>sx=e.clientX);view.querySelector('.run-stage').addEventListener('pointerup',e=>{const dx=e.clientX-sx;if(Math.abs(dx)>28){playerX+=dx>0?.24:-.24;playerX=Math.max(-.82,Math.min(.82,playerX));}});
    apply();reset();ensureCard();
    new MutationObserver(()=>requestAnimationFrame(()=>{apply();ensureCard();})).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    const grid=document.querySelector('.games-grid');if(grid)new MutationObserver(()=>ensureCard()).observe(grid,{childList:true});
  }

  function hideOthers(){['.new-home-nav','.games-view','.game2048-view','.snake-view','.tictactoe-view','.memory-view','.minesweeper-view','.new-ui-search-view'].forEach(s=>document.querySelector(s)?.setAttribute('hidden',''));}
  function showGame(){hideOthers();view.hidden=false;view.scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>view.querySelector('.run-stage')?.focus({preventScroll:true}),150);draw();}
  function showGames(){stop();view.hidden=true;const g=document.querySelector('.games-view');if(g){g.hidden=false;ensureCard();g.scrollIntoView({behavior:'smooth',block:'start'});}}

  function reset(){stop();playerX=0;speed=0;distance=0;roadPhase=0;spawn=0;traffic=[];dead=false;Object.keys(keys).forEach(k=>keys[k]=false);showOverlay(T[L()].start);draw();stats();}
  function start(){if(dead)reset();if(running)return;hideOverlay();running=true;last=performance.now();raf=requestAnimationFrame(loop);}
  function stop(){running=false;if(raf)cancelAnimationFrame(raf);raf=0;}
  function loop(now){if(!running)return;const dt=Math.min(.035,(now-last)/1000);last=now;update(dt);draw();raf=requestAnimationFrame(loop);}

  function update(dt){
    if(keys.gas)speed+=42*dt;else speed-=8*dt;if(keys.brake)speed-=60*dt;speed=Math.max(18,Math.min(180,speed));
    const steer=(.65+speed/220)*dt;if(keys.left)playerX-=steer;if(keys.right)playerX+=steer;playerX=Math.max(-.88,Math.min(.88,playerX));
    distance+=speed*dt*.12;roadPhase=(roadPhase+speed*dt*.008)%1;spawn-=dt;
    if(spawn<=0){spawn=Math.max(.38,1.25-speed/220)+Math.random()*.45;traffic.push({x:(Math.random()*1.45-.725),z:0,type:Math.floor(Math.random()*3)});}
    for(const car of traffic)car.z+=speed*dt*.0027;traffic=traffic.filter(c=>c.z<1.15);
    for(const car of traffic){if(car.z>.72&&car.z<1.03&&Math.abs(car.x-playerX)<.27){crash();break;}}
    stats();
  }
  function crash(){dead=true;stop();const d=Math.floor(distance);if(d>best){best=d;localStorage.setItem('lugovoy-run-best',String(best));}stats();showOverlay(T[L()].over);}

  function roadX(z){const half=55+145*z;return [210-half,210+half];}
  function yFor(z){return 150+450*z*z;}
  function draw(){
    if(!ctx)return;const w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);
    ctx.fillStyle='#8fd0f0';ctx.fillRect(0,0,w,155);ctx.fillStyle='#86b85d';ctx.fillRect(0,155,w,h-155);
    ctx.fillStyle='#5d6a72';ctx.beginPath();ctx.moveTo(155,150);ctx.lineTo(265,150);ctx.lineTo(395,h);ctx.lineTo(25,h);ctx.closePath();ctx.fill();
    for(let i=0;i<12;i++){const z=((i/12+roadPhase)%1),y=yFor(z),[l,r]=roadX(z),stripe=4+18*z;ctx.fillStyle=i%2?'#fff':'#d94747';ctx.fillRect(l-stripe,y,stripe,8+18*z);ctx.fillRect(r,y,stripe,8+18*z);}
    ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=3;for(const lane of [-.33,.33]){ctx.beginPath();for(let s=0;s<12;s++){const z=(s/11),y=yFor(z),[l,r]=roadX(z),x=(l+r)/2+(r-l)*lane/2;if(s===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.stroke();}
    traffic.slice().sort((a,b)=>a.z-b.z).forEach(drawTraffic);drawPlayer();
  }
  function drawTraffic(c){const y=yFor(c.z),[l,r]=roadX(c.z),x=(l+r)/2+(r-l)*c.x/2,sc=.28+.8*c.z;const ww=42*sc,hh=66*sc;ctx.fillStyle=['#f4d03f','#3498db','#e74c3c'][c.type];ctx.fillRect(x-ww/2,y-hh,ww,hh);ctx.fillStyle='#18242c';ctx.fillRect(x-ww*.34,y-hh*.75,ww*.68,hh*.22);ctx.fillStyle='#111';ctx.fillRect(x-ww*.58,y-hh*.8,ww*.12,hh*.26);ctx.fillRect(x+ww*.46,y-hh*.8,ww*.12,hh*.26);}
  function drawPlayer(){const x=210+playerX*150,y=570;ctx.save();ctx.translate(x,y);ctx.fillStyle='#111';ctx.fillRect(-38,-56,10,34);ctx.fillRect(28,-56,10,34);ctx.fillStyle='#f18ab5';ctx.fillRect(-34,-72,68,60);ctx.fillStyle='#e86fa5';ctx.fillRect(-28,-91,56,28);ctx.fillStyle='#24333c';ctx.fillRect(-20,-86,40,18);ctx.fillStyle='#f7c3d8';ctx.fillRect(-25,-13,50,7);ctx.fillStyle='#ffd75e';ctx.fillRect(-27,-66,10,9);ctx.fillRect(17,-66,10,9);ctx.fillStyle='#fff';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillText('2106',0,-19);ctx.restore();}

  function stats(){if(!view)return;view.querySelector('[data-run-speed]').textContent=Math.round(speed);view.querySelector('[data-run-distance]').textContent=Math.floor(distance);view.querySelector('[data-run-best]').textContent=best;}
  function showOverlay(text){const o=view?.querySelector('.run-overlay');if(!o)return;o.hidden=false;o.querySelector('strong').textContent=text;o.querySelector('button').textContent=dead?T[L()].again:T[L()].start;}
  function hideOverlay(){const o=view?.querySelector('.run-overlay');if(o)o.hidden=true;}
  function apply(){if(!view)return;const t=T[L()];view.querySelector('.run-head h2').textContent=`🏁 ${t.title}`;view.querySelector('.run-back').textContent=t.back;view.querySelector('.run-new').textContent=t.newGame;view.querySelector('.run-help').textContent=t.hint;view.querySelector('.run-speed-label').textContent=t.speed;view.querySelector('.run-distance-label').textContent=t.distance;view.querySelector('.run-best-label').textContent=t.best;view.querySelector('.run-brake').textContent=L()==='ru'?'Тормоз':L()==='de'?'Bremse':L()==='fr'?'Frein':'Brake';view.querySelector('.run-gas').textContent=L()==='ru'?'Газ':L()==='de'?'Gas':L()==='fr'?'Gaz':'Gas';const o=view.querySelector('.run-overlay');if(!o.hidden)showOverlay(dead?t.over:t.start);ensureCard();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(build,0));else setTimeout(build,0);
})();