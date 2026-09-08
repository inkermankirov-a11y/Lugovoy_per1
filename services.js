function applyPassportIcons(){
  document.querySelectorAll('#passport-service .service-icon, #passport-dialog .passport-head .service-icon').forEach(icon=>{
    icon.innerHTML='<img src="./passport-icon.svg?v=8" alt="" width="50" height="50">';
    icon.classList.add('passport-image-icon');
  });
}

function addServicePlaceholders(){
  const list=document.querySelector('#services-dialog .service-list');
  if(!list||document.querySelector('#elevator-service'))return;
  const cards=[
    {id:'elevator-service',title:'Обслуживание лифтов',icon:'./elevator-icon.svg?v=9'},
    {id:'intercom-service',title:'Домофон',icon:'./intercom-icon.svg?v=9'},
    {id:'spring-service',title:'Домашний родник',icon:'./domashniy-rodnik.svg?v=9'}
  ];
  for(const card of cards){
    const item=document.createElement('div');
    item.className='service-entry service-entry-static';
    item.id=card.id;
    item.style.cursor='default';
    item.innerHTML=`<span class="service-icon" aria-hidden="true" style="background:#e4f3eb"><img src="${card.icon}" alt="" width="50" height="50" style="display:block;width:50px;height:50px;object-fit:contain"></span><span><strong>${card.title}</strong><small>Информация уточняется</small></span>`;
    list.appendChild(item);
  }
}

function initServices(){
  applyPassportIcons();
  addServicePlaceholders();
}

initServices();
document.addEventListener('DOMContentLoaded',initServices);

document.addEventListener('click',e=>{
  const button=e.target.closest('button');
  if(!button)return;
  const services=document.querySelector('#services-dialog');
  const passport=document.querySelector('#passport-dialog');
  if(button.id==='service-organizations') services?.showModal();
  if(button.id==='passport-service'){
    services?.close();
    passport?.showModal();
  }
  if(button.id==='passport-back'){
    passport?.close();
    services?.showModal();
  }
});
