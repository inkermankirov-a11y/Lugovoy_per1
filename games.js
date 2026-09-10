(()=>{
  const tr={
    ru:{title:'Игры',sub:'Мини-игры для телефона',back:'← Назад к разделам',section:'Игры',hint:'Небольшие игры, которые будут работать прямо в браузере.',soon:'Скоро',games:[['🧩','2048','Собирайте одинаковые плитки.'],['🐍','Змейка','Классическая змейка со свайпами.'],['🧠','Память','Находите одинаковые пары.'],['💣','Сапёр','Открывайте клетки и избегайте мин.'],['⭕','Крестики-нолики','Игра против компьютера.']]},
    en:{title:'Games',sub:'Mini games for your phone',back:'← Back to sections',section:'Games',hint:'Small games that will run directly in the browser.',soon:'Soon',games:[['🧩','2048','Merge matching tiles.'],['🐍','Snake','Classic snake with swipe controls.'],['🧠','Memory','Find matching pairs.'],['💣','Minesweeper','Open cells and avoid mines.'],['⭕','Tic-tac-toe','Play against the computer.']]},
    fr:{title:'Jeux',sub:'Mini-jeux pour téléphone',back:'← Retour aux sections',section:'Jeux',hint:'De petits jeux qui fonctionneront directement dans le navigateur.',soon:'Bientôt',games:[['🧩','2048','Fusionnez les tuiles identiques.'],['🐍','Snake','Le serpent classique avec des gestes.'],['🧠','Mémoire','Trouvez les paires identiques.'],['💣','Démineur','Ouvrez les cases et évitez les mines.'],['⭕','Morpion','Jouez contre l’ordinateur.']]},
    de:{title:'Spiele',sub:'Minispiele fürs Handy',back:'← Zurück zu den Bereichen',section:'Spiele',hint:'Kleine Spiele, die direkt im Browser laufen.',soon:'Bald',games:[['🧩','2048','Gleiche Kacheln zusammenführen.'],['🐍','Snake','Klassisches Snake mit Wischsteuerung.'],['🧠','Memory','Finde gleiche Paare.'],['💣','Minesweeper','Felder öffnen und Minen vermeiden.'],['⭕','Tic-Tac-Toe','Gegen den Computer spielen.']]}
  };
  const lang=()=>tr[document.documentElement.lang]?document.documentElement.lang:'ru';
  function build(){
    const grid=document.querySelector('.new-home-grid');
    const nav=document.querySelector('.new-home-nav');
    const main=document.getElementById('top');
    if(!grid||!nav||!main)return;
    let button=grid.querySelector('[data-action="games"]');
    if(!button){
      button=document.createElement('button');
      button.type='button';
      button.className='new-home-card nav-games';
      button.dataset.action='games';
      button.innerHTML='<span class="nav-emoji">🎮</span><strong></strong><small></small>';
      grid.appendChild(button);
    }
    let view=document.querySelector('.games-view');
    if(!view){
      view=document.createElement('section');
      view.className='games-view';
      view.hidden=true;
      view.innerHTML='<button type="button" class="games-back"></button><h2 class="games-title"></h2><p class="games-subtitle"></p><div class="games-grid"></div>';
      main.insertBefore(view,nav.nextSibling);
      view.querySelector('.games-back').addEventListener('click',()=>{view.hidden=true;nav.hidden=false;nav.scrollIntoView({behavior:'smooth',block:'start'});});
    }
    button.addEventListener('click',e=>{e.stopPropagation();nav.hidden=true;document.querySelector('.new-ui-search-view')?.setAttribute('hidden','');view.hidden=false;view.scrollIntoView({behavior:'smooth',block:'start'});});
    apply();
  }
  function apply(){
    const t=tr[lang()],button=document.querySelector('[data-action="games"]'),view=document.querySelector('.games-view');
    if(button){button.querySelector('strong').textContent=t.title;button.querySelector('small').textContent=t.sub;}
    if(!view)return;
    view.querySelector('.games-back').textContent=t.back;
    view.querySelector('.games-title').textContent=t.section;
    view.querySelector('.games-subtitle').textContent=t.hint;
    view.querySelector('.games-grid').innerHTML=t.games.map(g=>`<article class="game-card"><span class="game-icon" aria-hidden="true">${g[0]}</span><div><strong>${g[1]}</strong><small>${g[2]}</small><span class="game-soon">${t.soon}</span></div></article>`).join('');
  }
  new MutationObserver(()=>requestAnimationFrame(apply)).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();