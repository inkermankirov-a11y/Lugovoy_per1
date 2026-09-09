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
      subtitle:'ООО «ЛифтСтандарт» · обслуживание лифтов',
      dialog:'elevator-detail-dialog',
      title:'Обслуживание лифтов',
      icon:'./elevator-icon.svg?v=13',
      body:`<div class="passport-grid">
        <section class="passport-card primary-lift-contact">
          <h3>📞 Диспетчер</h3>
          <a class="passport-phone" href="tel:+78332476020">8 (8332) 47-60-20</a>
        </section>
        <section class="passport-card passport-note">
          <h3>🚨 Аварийная служба</h3>
          <a class="passport-phone" href="tel:+78332447248">8 (8332) 44-72-48</a>
        </section>
        <section class="passport-card lift-rules-card">
          <h3>📋 Инструкция и правила пользования</h3>
          <p><strong>Специализированная лифтовая организация:</strong> ООО «ЛифтСтандарт».</p>
          <ol class="lift-rules">
            <li>Для вызова кабины нажмите кнопку у входа в лифт.</li>
            <li>Двери кабины открываются автоматически. После открытия дверей убедитесь, что кабина находится перед Вами.</li>
            <li>При входе в кабину с ребенком войдите первыми, при выходе — пропустите ребенка вперед. Если ребенок в коляске, то при входе и выходе из лифта держите ребенка на руках.</li>
            <li>Войдя в кабину, нажмите кнопку нужного Вам этажа.</li>
            <li>Для быстрого закрытия дверей нажмите кнопку закрытия дверей.</li>
            <li>Для повторного открытия дверей нажмите кнопку открытия дверей.</li>
            <li>При неисправности лифта нажмите и удерживайте кнопку вызова диспетчера до ответа автоинформатора. Дождитесь ответа диспетчера, затем сообщите о случившемся и выполняйте его рекомендации.</li>
          </ol>
          <div class="lift-warning"><strong>Внимание:</strong> при возникновении пожара в здании лифт будет принудительно направлен на основной посадочный этаж. По прибытии кабины на этот этаж необходимо покинуть кабину и выйти из здания. Использование лифта во время пожара не допускается.</div>
          <h3 class="lift-forbidden-title">⛔ Запрещается</h3>
          <ol class="lift-rules">
            <li>Самостоятельная эвакуация из неисправного лифта.</li>
            <li>Курение, перевозка легковоспламеняющихся и взрывчатых веществ.</li>
            <li>Открывание дверей вручную и задержка их закрытия.</li>
            <li>Перегрузка кабины и перевозка крупногабаритных грузов.</li>
            <li>Проезд детей дошкольного возраста без сопровождения взрослых.</li>
            <li>Использование лифта во время пожарной тревоги.</li>
          </ol>
        </section>
      </div>`
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
          <a class="service-contact-link" href="https://domovoyit.ru/" target="_blank" rel="noopener">🌐 domovoyit.ru</a>
        </section>
        <section class="passport-card">
          <h3>📱 Как получить удалённый online-доступ</h3>
          <p><strong>1.</strong> Установите мобильное приложение DMSS.</p>
          <a class="service-contact-link store-link" href="https://play.google.com/store/apps/details?id=com.mm.android.DMSS" target="_blank" rel="noopener"><img src="./google-play-icon.svg?v=25" alt="Google Play" width="24" height="24"><span>DMSS в Google Play</span></a>
          <a class="service-contact-link store-link" href="https://apps.apple.com/app/dmss/id1493268178" target="_blank" rel="noopener"><img src="./app-store-icon.svg?v=25" alt="App Store" width="24" height="24"><span>DMSS в App Store</span></a>
          <p><strong>2.</strong> Отправьте запрос на электронную почту <strong>domovoi.it@mail.ru</strong> с указанием адреса и обязательно приложите документ, подтверждающий право собственности, например выписку из ЕГРН.</p>
          <a class="service-contact-link" href="mailto:domovoi.it@mail.ru">✉️ Написать запрос</a>
        </section>
        <section class="passport-card">
          <h3>🎥 Как получить видеозапись с камер</h3>
          <p>Отправьте запрос на электронную почту или через Max.</p>
          <a class="service-contact-link" href="mailto:domovoi.it@mail.ru">✉️ domovoi.it@mail.ru</a>
          <a class="passport-phone" href="tel:+79229104989">8 (922) 910-49-89</a>
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
  script.src='./contact-actions.js?v=27';
  script.defer=true;
  script.dataset.contactActions='1';
  document.head.appendChild(script);
}
