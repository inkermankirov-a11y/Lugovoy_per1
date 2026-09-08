function serviceDialog(id,title,icon,body){
  if(document.getElementById(id)) return document.getElementById(id);
  const dialog=document.createElement('dialog');
  dialog.id=id;
  dialog.className='service-detail-dialog';
  dialog.innerHTML=`<button type="button" class="passport-back service-detail-back">← Обслуживающие организации</button><div class="dialog-top"><h2>${title}</h2><button data-close aria-label="Закрыть">✕</button></div><div class="service-detail-head"><span class="service-icon service-image-icon"><img src="${icon}" alt="" width="50" height="50"></span><div><strong>${title}</strong><p>Контактная информация</p></div></div>${body}`;
  document.body.appendChild(dialog);
  dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
  dialog.querySelector('.service-detail-back').addEventListener('click',()=>{dialog.close();document.getElementById('services-dialog')?.showModal();});
  return dialog;
}

function ensureVideoSurveillanceCard(){
  const list=document.querySelector('#services-dialog .service-list');
  if(!list||document.getElementById('video-service'))return;
  const button=document.createElement('button');
  button.type='button';
  button.id='video-service';
  button.className='service-entry';
  button.innerHTML=`<span class="service-icon service-image-icon" aria-hidden="true"><img src="./video-camera-icon.svg?v=24" alt="" width="50" height="50"></span><span><strong>Видеонаблюдение</strong><small>«Домовой IT» · доступ и получение видеозаписей</small></span>`;
  list.appendChild(button);
}

function prepareServiceCards(){
  ensureVideoSurveillanceCard();
  const specs={
    'elevator-service':{
      subtitle:'ООО «Лифтовая Компания» · обслуживание лифтов',
      dialog:'elevator-detail-dialog',
      title:'Обслуживание лифтов',
      icon:'./elevator-icon.svg?v=13',
      body:`<div class="passport-grid"><section class="passport-card"><h3>🔧 Обслуживание лифтов</h3><p><strong>Организация:</strong> ООО «Лифтовая Компания»</p><a class="passport-phone" href="tel:+78332497131">8 (8332) 49-71-31</a><a class="service-contact-link" href="mailto:liftst@mail.ru">✉️ liftst@mail.ru</a></section><section class="passport-card passport-note"><h3>🚨 Аварийный телефон</h3><p>На уточнении.</p></section></div>`
    },
    'intercom-service':{
      subtitle:'ООО «Лифтовая Компания» · обслуживание / подключение домофона',
      dialog:'intercom-detail-dialog',
      title:'Домофон',
      icon:'./intercom-icon.svg?v=13',
      body:`<div class="passport-grid"><section class="passport-card"><h3>🔧 Обслуживание / подключение домофона</h3><p><strong>Организация:</strong> ООО «Лифтовая Компания»</p><a class="passport-phone" href="tel:+78332497131">8 (8332) 49-71-31</a><a class="service-contact-link" href="mailto:liftst@mail.ru">✉️ liftst@mail.ru</a></section></div>`
    },
    'spring-service':{
      subtitle:'г. Киров, ул. Пугачёва, д. 9',
      dialog:'spring-detail-dialog',
      title:'Домашний родник',
      icon:'./domashniy-rodnik.svg?v=13',
      body:`<div class="passport-grid"><section class="passport-card"><h3>💧 Домашний родник</h3><p>🏢 <strong>Адрес:</strong> г. Киров, ул. Пугачёва, д. 9</p><a class="passport-phone" href="tel:+78332413770">+7 (8332) 41-37-70</a><a class="service-contact-link" href="https://xn--80ahbpbejkkdefz2i.xn--p1ai/" target="_blank" rel="noopener">🌐 Открыть сайт</a></section></div>`
    },
    'video-service':{
      subtitle:'«Домовой IT» · доступ и получение видеозаписей',
      dialog:'video-detail-dialog',
      title:'Видеонаблюдение',
      icon:'./video-camera-icon.svg?v=24',
      body:`<div class="passport-grid">
        <section class="passport-card">
          <h3>📹 «Домовой IT»</h3>
          <a class="passport-phone" href="tel:+78332494989">8 (8332) 49-49-89</a>
          <a class="service-contact-link" href="mailto:domovoi.it@mail.ru">✉️ domovoi.it@mail.ru</a>
          <a class="service-contact-link" href="https://vk.com/domovoy" target="_blank" rel="noopener">VK · Домовой IT</a>
          <a class="service-contact-link" href="https://domovoyit.ru/" target="_blank" rel="noopener">🌐 domovoyit.ru</a>
        </section>
        <section class="passport-card">
          <h3>📱 Как получить удалённый online-доступ</h3>
          <p><strong>1.</strong> Установите мобильное приложение DMSS.</p>
          <a class="service-contact-link" href="https://play.google.com/store/apps/details?id=com.mm.android.DMSS" target="_blank" rel="noopener">▶️ DMSS в Google Play</a>
          <a class="service-contact-link" href="https://apps.apple.com/app/dmss/id1493268178" target="_blank" rel="noopener"> DMSS в App Store</a>
          <p><strong>2.</strong> Отправьте запрос на электронную почту <strong>domovoi.it@mail.ru</strong> с указанием адреса и обязательно приложите документ, подтверждающий право собственности, например выписку из ЕГРН.</p>
          <a class="service-contact-link" href="mailto:domovoi.it@mail.ru">✉️ Написать запрос</a>
        </section>
        <section class="passport-card">
          <h3>🎥 Как получить видеозапись с камер</h3>
          <p>Отправьте запрос на электронную почту или через Telegram / WhatsApp.</p>
          <a class="service-contact-link" href="mailto:domovoi.it@mail.ru">✉️ domovoi.it@mail.ru</a>
          <a class="passport-phone" href="tel:+79229104989">8 (922) 910-49-89</a>
          <a class="service-contact-link" href="https://wa.me/79229104989" target="_blank" rel="noopener">💬 Написать в WhatsApp</a>
          <p><strong>В запросе укажите:</strong> Ф.И.О., адрес, дату, время, местоположение видеокамеры и электронную почту, на которую нужно отправить запись.</p>
        </section>
      </div>`
    }
  };
  for(const [id,s] of Object.entries(specs)){
    let card=document.getElementById(id);
    if(!card) continue;
    if(card.tagName!=='BUTTON'){
      const button=document.createElement('button');
      button.type='button';
      button.id=card.id;
      button.className='service-entry';
      button.innerHTML=card.innerHTML;
      card.replaceWith(button);
      card=button;
    }
    const small=card.querySelector('small'); if(small) small.textContent=s.subtitle;
    card.style.cursor='pointer';
    const dlg=serviceDialog(s.dialog,s.title,s.icon,s.body);
    card.addEventListener('click',()=>{document.getElementById('services-dialog')?.close();dlg.showModal();});
  }
}

document.addEventListener('click',e=>{
  const dialog=e.target;
  if(!(dialog instanceof HTMLDialogElement)||!dialog.open)return;
  const r=dialog.getBoundingClientRect();
  const inside=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;
  if(!inside)dialog.close();
});

document.addEventListener('DOMContentLoaded',()=>setTimeout(prepareServiceCards,0));

if(!document.querySelector('script[data-contact-actions]')){
  const script=document.createElement('script');
  script.src='./contact-actions.js?v=22';
  script.defer=true;
  script.dataset.contactActions='1';
  document.head.appendChild(script);
}
