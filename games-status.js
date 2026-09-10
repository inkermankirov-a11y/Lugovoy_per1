(()=>{
  const play={ru:'Играть',en:'Play',fr:'Jouer',de:'Spielen'};
  const ids=['2048','snake','memory','minesweeper','tictactoe'];
  function apply(){
    const lang=play[document.documentElement.lang]?document.documentElement.lang:'ru';
    document.querySelectorAll('.games-grid .game-card').forEach((card,i)=>{
      if(!ids[i])return;
      card.classList.add('game-ready');
      card.dataset.game=ids[i];
      const badge=card.querySelector('.game-soon');
      if(badge)badge.textContent=play[lang];
    });
  }
  document.addEventListener('click',e=>{if(e.target.closest('[data-action="games"],.games-back,.memory-back,.mines-back,.ttt-back,.snake-back,.game2048-back'))setTimeout(apply,0);},true);
  new MutationObserver(()=>requestAnimationFrame(apply)).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,0));else setTimeout(apply,0);
  window.applyGameStatuses=apply;
})();