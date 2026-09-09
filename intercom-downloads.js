function addIntercomDownloadLinks(){
  const dialog=document.getElementById('intercom-detail-dialog');
  if(!dialog||dialog.querySelector('[data-intercom-downloads]'))return false;
  const cards=[...dialog.querySelectorAll('.passport-card')];
  const registration=cards.find(card=>card.textContent.includes('Регистрация в приложении «Наш дом»'));
  if(!registration)return false;

  const block=document.createElement('div');
  block.dataset.intercomDownloads='1';
  block.innerHTML=`
    <p><strong>Скачать приложение:</strong></p>
    <a class="service-contact-link store-link" href="https://play.google.com/store/apps/details?id=sputnik.axmor.com" target="_blank" rel="noopener"><img src="./google-play-icon.svg?v=25" alt="Google Play" width="24" height="24"><span>«Наш дом» в Google Play</span></a>
    <a class="service-contact-link store-link" href="https://apps.apple.com/ru/app/%D0%BD%D0%B0%D1%88-%D0%B4%D0%BE%D0%BC/id1371300967" target="_blank" rel="noopener"><img src="./app-store-icon.svg?v=25" alt="App Store" width="24" height="24"><span>«Наш дом» в App Store</span></a>`;
  const list=registration.querySelector('ol');
  registration.insertBefore(block,list);
  return true;
}

document.addEventListener('DOMContentLoaded',()=>{
  setTimeout(addIntercomDownloadLinks,20);
  setTimeout(addIntercomDownloadLinks,200);
});
document.addEventListener('click',e=>{
  if(e.target.closest('#intercom-service'))setTimeout(addIntercomDownloadLinks,0);
});
