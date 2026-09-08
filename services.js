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
