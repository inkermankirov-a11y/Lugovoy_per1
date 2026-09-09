(()=>{
  const labels={ru:'О сайте',en:'About',fr:'À propos',de:'Info'};
  const sync=()=>{
    const about=document.getElementById('about');
    const switcher=document.querySelector('.lang-switcher');
    if(!about)return;
    const lang=document.documentElement.lang||'ru';
    const label=labels[lang]||labels.ru;
    if(about.textContent!==label)about.textContent=label;
    if(switcher&&about.nextElementSibling!==switcher)about.after(switcher);
  };
  const start=()=>{
    sync();
    setTimeout(sync,50);
    setTimeout(sync,300);
    new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
