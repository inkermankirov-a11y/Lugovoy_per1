(()=>{
  const codes=['ru','en','fr','de'];
  const L=()=>codes.includes(document.documentElement.lang)?document.documentElement.lang:'ru';
  const idx=()=>codes.indexOf(L());

  const rows=[
    ['О программе «Этажи»','About “Floors”','À propos de « Étages »','Über „Etagen“'],
    ['Разработчик:','Developer:','Développeur :','Entwickler:'],
    ['Бесплатное использование, изменение и распространение. Продажа и платный доступ запрещены без письменного разрешения автора.','Free use, modification and redistribution are permitted. Sale and paid access are prohibited without the author’s written permission.','L’utilisation, la modification et la redistribution gratuites sont autorisées. La vente et l’accès payant sont interdits sans autorisation écrite de l’auteur.','Kostenlose Nutzung, Änderung und Weitergabe sind erlaubt. Verkauf und kostenpflichtiger Zugang sind ohne schriftliche Genehmigung des Autors verboten.'],
    ['Схема условная, без масштаба. Стояк показывает расположение квартир по вертикали, а не схему инженерных коммуникаций.','The floor plan is schematic and not to scale. The vertical stack shows apartment positions, not engineering utility lines.','Le plan est schématique et non à l’échelle. La colonne verticale indique la position des appartements, et non les réseaux techniques.','Der Plan ist schematisch und nicht maßstabsgetreu. Der vertikale Strang zeigt die Lage der Wohnungen, nicht die technischen Leitungen.'],
    ['Полные условия распространения','Full distribution terms','Conditions complètes de distribution','Vollständige Verbreitungsbedingungen'],
    ['Обслуживающие организации','Service organizations','Organismes de service','Dienstleister'],
    ['Контактная информация','Contact information','Coordonnées','Kontaktinformationen'],
    ['Обслуживание лифтов','Elevator service','Entretien des ascenseurs','Aufzugsservice'],
    ['📞 Диспетчер','📞 Dispatcher','📞 Répartiteur','📞 Leitstelle'],
    ['🚨 Аварийная служба','🚨 Emergency service','🚨 Service d’urgence','🚨 Notdienst'],
    ['📋 Инструкция и правила пользования','📋 Instructions and rules of use','📋 Instructions et règles d’utilisation','📋 Anleitung und Nutzungsregeln'],
    ['Специализированная лифтовая организация:','Specialized elevator service company:','Entreprise spécialisée dans les ascenseurs :','Spezialisiertes Aufzugsunternehmen:'],
    ['Для вызова кабины нажмите кнопку у входа в лифт.','Press the call button at the elevator entrance to call the car.','Appuyez sur le bouton d’appel à l’entrée de l’ascenseur.','Drücken Sie zum Rufen der Kabine die Ruftaste am Aufzugseingang.'],
    ['Двери кабины открываются автоматически. После открытия дверей убедитесь, что кабина находится перед Вами.','The doors open automatically. After they open, make sure the elevator car is actually in front of you.','Les portes s’ouvrent automatiquement. Après ouverture, vérifiez que la cabine est bien devant vous.','Die Türen öffnen automatisch. Vergewissern Sie sich nach dem Öffnen, dass sich die Kabine tatsächlich vor Ihnen befindet.'],
    ['При входе в кабину с ребенком войдите первыми, при выходе — пропустите ребенка вперед. Если ребенок в коляске, то при входе и выходе из лифта держите ребенка на руках.','When entering with a child, enter first; when exiting, let the child go first. If the child is in a stroller, hold the child in your arms when entering and leaving.','Avec un enfant, entrez en premier et laissez l’enfant sortir en premier. Avec une poussette, tenez l’enfant dans vos bras lors de l’entrée et de la sortie.','Mit einem Kind betreten Sie die Kabine zuerst; beim Aussteigen lassen Sie das Kind zuerst gehen. Bei einem Kinderwagen halten Sie das Kind beim Ein- und Aussteigen auf dem Arm.'],
    ['Войдя в кабину, нажмите кнопку нужного Вам этажа.','After entering, press the button for the required floor.','Dans la cabine, appuyez sur le bouton de l’étage souhaité.','Drücken Sie in der Kabine die Taste des gewünschten Stockwerks.'],
    ['Для быстрого закрытия дверей нажмите кнопку закрытия дверей.','Use the door-close button to close the doors sooner.','Pour fermer les portes plus rapidement, appuyez sur le bouton de fermeture.','Zum schnelleren Schließen drücken Sie die Tür-schließen-Taste.'],
    ['Для повторного открытия дверей нажмите кнопку открытия дверей.','Use the door-open button to reopen the doors.','Pour rouvrir les portes, appuyez sur le bouton d’ouverture.','Zum erneuten Öffnen drücken Sie die Tür-öffnen-Taste.'],
    ['При неисправности лифта нажмите и удерживайте кнопку вызова диспетчера до ответа автоинформатора. Дождитесь ответа диспетчера, затем сообщите о случившемся и выполняйте его рекомендации.','If the elevator malfunctions, press and hold the dispatcher call button until the automated message responds. Wait for the dispatcher, explain what happened and follow their instructions.','En cas de panne, maintenez le bouton d’appel du répartiteur jusqu’au message automatique. Attendez la réponse, expliquez la situation et suivez les instructions.','Bei einer Störung halten Sie die Ruftaste zur Leitstelle gedrückt, bis die automatische Ansage reagiert. Warten Sie auf die Leitstelle, schildern Sie den Vorfall und folgen Sie den Anweisungen.'],
    ['⛔ Запрещается','⛔ Prohibited','⛔ Interdit','⛔ Verboten'],
    ['Самостоятельная эвакуация из неисправного лифта.','Attempting to evacuate yourself from a faulty elevator.','Évacuation autonome depuis un ascenseur en panne.','Eigenständige Evakuierung aus einem defekten Aufzug.'],
    ['Курение, перевозка легковоспламеняющихся и взрывчатых веществ.','Smoking or transporting flammable or explosive substances.','Fumer ou transporter des substances inflammables ou explosives.','Rauchen sowie Transport entzündlicher oder explosiver Stoffe.'],
    ['Открывание дверей вручную и задержка их закрытия.','Opening the doors manually or preventing them from closing.','Ouvrir les portes manuellement ou empêcher leur fermeture.','Manuelles Öffnen der Türen oder Verhindern des Schließens.'],
    ['Перегрузка кабины и перевозка крупногабаритных грузов.','Overloading the car or transporting oversized loads.','Surcharger la cabine ou transporter des charges surdimensionnées.','Überladen der Kabine oder Transport übergroßer Lasten.'],
    ['Проезд детей дошкольного возраста без сопровождения взрослых.','Allowing preschool children to ride without an adult.','Laisser des enfants d’âge préscolaire voyager sans adulte.','Fahrt von Vorschulkindern ohne Begleitung Erwachsener.'],
    ['Использование лифта во время пожарной тревоги.','Using the elevator during a fire alarm.','Utiliser l’ascenseur pendant une alarme incendie.','Benutzung des Aufzugs während eines Feueralarms.'],
    ['Домофон','Intercom','Interphone','Gegensprechanlage'],
    ['📱 Регистрация в приложении «Наш дом»','📱 Registration in the “Nash Dom” app','📱 Inscription dans l’application « Nash Dom »','📱 Registrierung in der App „Nash Dom“'],
    ['Скачать приложение:','Download the app:','Télécharger l’application :','App herunterladen:'],
    ['«Наш дом» в Google Play','“Nash Dom” on Google Play','« Nash Dom » sur Google Play','„Nash Dom“ bei Google Play'],
    ['«Наш дом» в App Store','“Nash Dom” on the App Store','« Nash Dom » sur l’App Store','„Nash Dom“ im App Store'],
    ['Скачайте и установите мобильное приложение «Наш дом».','Download and install the “Nash Dom” mobile app.','Téléchargez et installez l’application mobile « Nash Dom ».','Laden Sie die mobile App „Nash Dom“ herunter und installieren Sie sie.'],
    ['После запуска приложения введите номер телефона для регистрации.','Open the app and enter your phone number to register.','Ouvrez l’application et saisissez votre numéro de téléphone.','Öffnen Sie die App und geben Sie Ihre Telefonnummer zur Registrierung ein.'],
    ['Для подтверждения регистрации на телефон поступит автоматический звонок. В специальное поле введите последние 4 цифры номера, с которого поступил звонок.','You will receive an automated call for confirmation. Enter the last 4 digits of the incoming number in the confirmation field.','Un appel automatique confirmera l’inscription. Saisissez les 4 derniers chiffres du numéro appelant.','Zur Bestätigung erfolgt ein automatischer Anruf. Geben Sie die letzten 4 Ziffern der anrufenden Nummer ein.'],
    ['Введите регистрационные данные: имя и фамилию.','Enter your registration details: first and last name.','Saisissez vos informations : prénom et nom.','Geben Sie Ihre Registrierungsdaten ein: Vor- und Nachname.'],
    ['Наберите на домофоне трёхзначный код, который будет показан на экране приложения, и приложите к домофону ключ-брелок. Дверь подъезда должна быть открыта.','Enter the three-digit code shown in the app on the intercom and touch the key fob to the intercom. The entrance door must be open.','Composez sur l’interphone le code à trois chiffres affiché dans l’application puis présentez le badge. La porte d’entrée doit être ouverte.','Geben Sie den in der App angezeigten dreistelligen Code an der Gegensprechanlage ein und halten Sie den Schlüsselanhänger an das Gerät. Die Eingangstür muss geöffnet sein.'],
    ['Проверьте и подтвердите адрес, затем введите номер квартиры.','Check and confirm the address, then enter the apartment number.','Vérifiez et confirmez l’adresse puis saisissez le numéro d’appartement.','Prüfen und bestätigen Sie die Adresse und geben Sie anschließend die Wohnungsnummer ein.'],
    ['После успешной регистрации в приложении появится изображение с камеры домофона.','After successful registration, the intercom camera image will appear in the app.','Après l’inscription, l’image de la caméra de l’interphone apparaîtra dans l’application.','Nach erfolgreicher Registrierung erscheint das Kamerabild der Gegensprechanlage in der App.'],
    ['🔔 Как включить звонки в приложении','🔔 How to enable calls in the app','🔔 Activer les appels dans l’application','🔔 Anrufe in der App aktivieren'],
    ['Откройте приложение «Наш дом».','Open the “Nash Dom” app.','Ouvrez l’application « Nash Dom ».','Öffnen Sie die App „Nash Dom“.'],
    ['Нажмите внизу на вторую слева вкладку.','Tap the second tab from the left at the bottom.','Appuyez sur le deuxième onglet en partant de la gauche en bas de l’écran.','Tippen Sie unten auf die zweite Registerkarte von links.'],
    ['Откройте «Управление домофоном».','Open “Intercom control”.','Ouvrez « Gestion de l’interphone ».','Öffnen Sie „Gegensprechanlage verwalten“.'],
    ['Активируйте функцию «Принимать звонки в приложении».','Enable “Receive calls in the app”.','Activez « Recevoir les appels dans l’application ».','Aktivieren Sie „Anrufe in der App empfangen“.'],
    ['Видеонаблюдение','Video surveillance','Vidéosurveillance','Videoüberwachung'],
    ['📱 Как получить удалённый online-доступ','📱 How to get remote online access','📱 Obtenir un accès distant en ligne','📱 Fernzugriff online erhalten'],
    ['Установите мобильное приложение DMSS.','Install the DMSS mobile app.','Installez l’application mobile DMSS.','Installieren Sie die mobile DMSS-App.'],
    ['✉️ Написать запрос','✉️ Send request','✉️ Envoyer la demande','✉️ Anfrage senden'],
    ['🎥 Как получить видеозапись с камер','🎥 How to obtain a camera recording','🎥 Obtenir un enregistrement vidéo','🎥 Videoaufzeichnung erhalten'],
    ['Отправьте запрос на электронную почту или через Max.','Send a request by email or via Max.','Envoyez une demande par e-mail ou via Max.','Senden Sie eine Anfrage per E-Mail oder über Max.'],
    ['Домашний родник','Home Spring','Source domestique','Hausquelle'],
    ['🌐 Открыть сайт','🌐 Open website','🌐 Ouvrir le site','🌐 Website öffnen'],
    ['Начисления · паспортный стол · задолженность','Billing · registration office · debt','Facturation · enregistrement · dettes','Abrechnung · Meldebüro · Rückstände'],
    ['НАЧИСЛЕНИЯ · ПАСПОРТНЫЙ СТОЛ · ЗАДОЛЖЕННОСТЬ','BILLING · REGISTRATION OFFICE · DEBT','FACTURATION · ENREGISTREMENT · DETTES','ABRECHNUNG · MELDEBÜRO · RÜCKSTÄNDE'],
    ['Бухгалтерия','Accounting','Comptabilité','Buchhaltung'],
    ['Паспортный стол','Registration office','Bureau d’enregistrement','Meldebüro'],
    ['Юридический отдел по взысканию задолженности','Legal debt collection','Service juridique du recouvrement','Rechtsabteilung Forderungseinzug'],
    ['Режим работы офисов','Office hours','Horaires des bureaux','Bürozeiten'],
    ['OFFICE HOURS','OFFICE HOURS','HORAIRES DES BUREAUX','BÜROZEITEN'],
    ['Адрес:','Address:','Adresse :','Adresse:'],
    ['Позвонить','Call','Appeler','Anrufen'],
    ['Закрыть','Close','Fermer','Schließen']
  ];

  const license={
    ru:`ЭТАЖИ — УСЛОВИЯ БЕСПЛАТНОГО ИСПОЛЬЗОВАНИЯ И РАСПРОСТРАНЕНИЯ\nРедакция 1.0 от 08.09.2026. Применяется к веб-версии программы 1.0.\n\n© 2026 Прудников Евгений Сергеевич\nРазработчик и указанный правообладатель: Прудников Евгений Сергеевич.\n\n1. Разрешённое использование\nБезвозмездно предоставляется неисключительное право использовать программу «Этажи», копировать её, изучать и изменять исходный код, а также бесплатно распространять исходную и изменённые версии, включая исполняемые файлы.\n\n2. Запрет платного распространения\nПродажа программы и её изменённых версий, взимание платы за копию, скачивание, доступ или право использования запрещены без отдельного письменного разрешения правообладателя.\n\n3. Сохранение авторства и условий\nПри распространении необходимо сохранять уведомление «© 2026 Прудников Евгений Сергеевич» и полный текст настоящих условий.\n\n4. Гарантии и ответственность\nПрограмма предоставляется «как есть», без гарантий точности расчётов, пригодности для определённой цели и бесперебойной работы.\n\n5. Границы действия\nНастоящий текст является отдельными пользовательскими условиями, а не MIT. Права на сторонние компоненты и материалы определяются их собственными условиями.`,
    en:`FLOORS — FREE USE AND DISTRIBUTION TERMS\nVersion 1.0 dated 08 September 2026. Applies to web version 1.0.\n\n© 2026 Evgeniy Sergeevich Prudnikov\nDeveloper and stated rights holder: Evgeniy Sergeevich Prudnikov.\n\n1. Permitted use\nA non-exclusive right is granted free of charge to use the “Floors” software, copy it, study and modify its source code, and redistribute the original or modified versions free of charge, including executable files.\n\n2. No paid distribution\nSelling the software or modified versions, or charging for a copy, download, access, or right of use, is prohibited without separate written permission from the rights holder.\n\n3. Attribution and preservation of terms\nAny redistribution must retain the notice “© 2026 Evgeniy Sergeevich Prudnikov” and the full text of these terms.\n\n4. Warranty and liability\nThe software is provided “as is”, without warranties of calculation accuracy, fitness for a particular purpose, or uninterrupted operation.\n\n5. Scope\nThese are separate user terms and are not the MIT License. Rights to third-party components and materials are governed by their own terms.`,
    fr:`ÉTAGES — CONDITIONS D’UTILISATION ET DE DISTRIBUTION GRATUITES\nVersion 1.0 du 08.09.2026. Applicable à la version web 1.0.\n\n© 2026 Evgeniy Sergeevich Prudnikov\nDéveloppeur et titulaire des droits : Evgeniy Sergeevich Prudnikov.\n\n1. Utilisation autorisée\nUn droit non exclusif est accordé gratuitement pour utiliser le logiciel « Étages », le copier, étudier et modifier son code source et redistribuer gratuitement les versions originales ou modifiées.\n\n2. Interdiction de distribution payante\nLa vente du logiciel ou de versions modifiées et toute facturation d’un accès ou d’un droit d’utilisation sont interdites sans autorisation écrite.\n\n3. Attribution et conditions\nToute redistribution doit conserver la mention de copyright et le texte intégral des présentes conditions.\n\n4. Garanties et responsabilité\nLe logiciel est fourni « tel quel », sans garantie d’exactitude, d’adéquation ou de fonctionnement ininterrompu.\n\n5. Champ d’application\nLe présent texte constitue des conditions distinctes et n’est pas la licence MIT. Les composants tiers restent soumis à leurs propres conditions.`,
    de:`ETAGEN — BEDINGUNGEN FÜR KOSTENLOSE NUTZUNG UND VERBREITUNG\nVersion 1.0 vom 08.09.2026. Gilt für die Webversion 1.0.\n\n© 2026 Evgeniy Sergeevich Prudnikov\nEntwickler und angegebener Rechteinhaber: Evgeniy Sergeevich Prudnikov.\n\n1. Zulässige Nutzung\nEs wird unentgeltlich ein nicht ausschließliches Recht eingeräumt, die Software „Etagen“ zu nutzen, zu kopieren, den Quellcode zu untersuchen und zu ändern sowie ursprüngliche und geänderte Versionen kostenlos weiterzugeben.\n\n2. Verbot kostenpflichtiger Verbreitung\nVerkauf, kostenpflichtiger Download, Zugang oder Nutzungsrechte sind ohne schriftliche Genehmigung des Rechteinhabers verboten.\n\n3. Urheberhinweis und Bedingungen\nBei jeder Weitergabe müssen Urheberhinweis und vollständiger Text dieser Bedingungen erhalten bleiben.\n\n4. Gewährleistung und Haftung\nDie Software wird „wie besehen“ ohne Gewähr für Rechengenauigkeit, Eignung oder unterbrechungsfreien Betrieb bereitgestellt.\n\n5. Geltungsbereich\nDieser Text ist eine eigenständige Nutzungsbedingung und nicht die MIT-Lizenz. Rechte an Drittkomponenten richten sich nach deren eigenen Bedingungen.`
  };

  const extra={
    en:{'г. Киров, ул. Профсоюзная, д. 1, офис 608/5':'Kirov, Profsoyuznaya St. 1, office 608/5','г. Киров, ул. Урицкого, д. 24':'Kirov, Uritskogo St. 24','г. Киров, ул. Тимирязева, д. 7/1, пом. 1001':'Kirov, Timiryazeva St. 7/1, room 1001','г. Киров, ул. Пугачёва, д. 9':'Kirov, Pugachyova St. 9','доб. 1':'ext. 1','доб. 2':'ext. 2','доб. 3':'ext. 3'},
    fr:{'г. Киров, ул. Профсоюзная, д. 1, офис 608/5':'Kirov, rue Profsoyuznaya 1, bureau 608/5','г. Киров, ул. Урицкого, д. 24':'Kirov, rue Uritskogo 24','г. Киров, ул. Тимирязева, д. 7/1, пом. 1001':'Kirov, rue Timiryazeva 7/1, local 1001','г. Киров, ул. Пугачёва, д. 9':'Kirov, rue Pugachyova 9','доб. 1':'poste 1','доб. 2':'poste 2','доб. 3':'poste 3'},
    de:{'г. Киров, ул. Профсоюзная, д. 1, офис 608/5':'Kirov, Profsoyuznaya-Str. 1, Büro 608/5','г. Киров, ул. Урицкого, д. 24':'Kirov, Uritskogo-Str. 24','г. Киров, ул. Тимирязева, д. 7/1, пом. 1001':'Kirov, Timiryazeva-Str. 7/1, Raum 1001','г. Киров, ул. Пугачёва, д. 9':'Kirov, Pugachyova-Str. 9','доб. 1':'Durchwahl 1','доб. 2':'Durchwahl 2','доб. 3':'Durchwahl 3'}
  };

  const normalize=s=>s.replace(/\s+/g,' ').trim();
  const rowByText=new Map();
  rows.forEach(r=>r.forEach(v=>rowByText.set(normalize(v),r)));

  function translateTextNodes(root=document.body){
    if(!root)return;
    const target=idx();
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){const p=n.parentElement;if(!p||['SCRIPT','STYLE','PRE'].includes(p.tagName))return NodeFilter.FILTER_REJECT;return normalize(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    for(const n of nodes){const raw=n.nodeValue, key=normalize(raw), row=rowByText.get(key);if(row){const lead=raw.match(/^\s*/)?.[0]||'',tail=raw.match(/\s*$/)?.[0]||'';n.nodeValue=lead+row[target]+tail;continue}const map=extra[L()];if(map&&map[key])n.nodeValue=map[key];}
  }

  function sync(){
    translateTextNodes(document.body);
    const pre=document.getElementById('license');if(pre)pre.textContent=license[L()];
    document.querySelectorAll('a[href^="tel:"]').forEach(a=>{const label={ru:'Позвонить',en:'Call',fr:'Appeler',de:'Anrufen'}[L()];a.dataset.callLabel=label});
    const close={ru:'Закрыть',en:'Close',fr:'Fermer',de:'Schließen'}[L()];document.querySelectorAll('dialog [data-close],#contact-action-dialog .contact-action-close').forEach(b=>b.setAttribute('aria-label',close));
  }

  let timer=0;const schedule=(delay=0)=>{clearTimeout(timer);timer=setTimeout(sync,delay)};
  document.addEventListener('click',e=>{
    if(e.target.closest('.lang-option')){setTimeout(sync,0);setTimeout(sync,80);setTimeout(sync,300);return}
    if(e.target.closest('#about,[data-action="management"],[data-action="services"],#passport-service,#elevator-service,#intercom-service,#spring-service,#video-service')){setTimeout(sync,0);setTimeout(sync,80);setTimeout(sync,250)}
  });
  new MutationObserver(()=>schedule(30)).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  new MutationObserver(records=>{if(records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1)))schedule(50)}).observe(document.body,{childList:true,subtree:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{sync();setTimeout(sync,700)});else{sync();setTimeout(sync,700)}
  window.syncSiteLanguage=sync;
})();
