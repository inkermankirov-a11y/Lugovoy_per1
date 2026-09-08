function applyPassportIcons(){
  document.querySelectorAll('#passport-service .service-icon, #passport-dialog .passport-head .service-icon').forEach(icon=>{
    icon.innerHTML='<img src="./passport-icon.svg?v=8" alt="" width="50" height="50">';
    icon.classList.add('passport-image-icon');
  });
}
applyPassportIcons();
document.addEventListener('DOMContentLoaded',applyPassportIcons);
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
