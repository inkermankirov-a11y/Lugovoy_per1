(()=>{
  const labels={ru:'О сайте',en:'About',fr:'À propos',de:'Info'};
  const sync=()=>{
    const about=document.getElementById('about');
    const switcher=document.querySelector('.lang-switcher');
    if(!about)return;
    const lang=document.documentElement.lang||'ru';
    about.textContent=labels[lang]||labels.ru;
    if(switcher&&about.nextElementSibling!==switcher)about.after(switcher);
  };
  const start=()=>{
    sync();
    new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    new MutationObserver(sync).observe(document.body,{childList:true,subtree:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
