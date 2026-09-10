(()=>{
  const L=()=>['ru','en','fr','de'].includes(document.documentElement.lang)?document.documentElement.lang:'ru';
  const T={
    ru:{title:'О программе «Этажи»',address:'610007 · Луговой переулок дом 1',developer:'Разработчик:',name:'Прудников Евгений Сергеевич',free:'Бесплатное использование, изменение и распространение. Продажа и платный доступ запрещены без письменного разрешения автора.',scheme:'Схема условная, без масштаба. Стояк показывает расположение квартир по вертикали, а не схему инженерных коммуникаций.',terms:'Полные условия распространения',close:'Закрыть',license:`ЭТАЖИ — УСЛОВИЯ БЕСПЛАТНОГО ИСПОЛЬЗОВАНИЯ И РАСПРОСТРАНЕНИЯ
Редакция 1.0 от 08.09.2026. Применяется к веб-версии программы 1.0.

© 2026 Прудников Евгений Сергеевич
Разработчик и указанный правообладатель: Прудников Евгений Сергеевич.

1. Разрешённое использование
Безвозмездно предоставляется неисключительное право использовать программу «Этажи», копировать её, изучать и изменять исходный код, а также бесплатно распространять исходную и изменённые версии, включая исполняемые файлы. Разрешение действует без территориальных ограничений на весь срок действия исключительного права при соблюдении настоящих условий. Использование программы в личной и профессиональной деятельности разрешено.

2. Запрет платного распространения
Продажа программы и её изменённых версий, взимание платы за копию, скачивание, доступ или право использования запрещены без отдельного письменного разрешения правообладателя. Запрет распространяется также на включение программы в платные программные комплекты и подписки.

3. Сохранение авторства и условий
При распространении необходимо сохранять уведомление «© 2026 Прудников Евгений Сергеевич» и полный текст настоящих условий. Изменённые версии должны содержать заметное указание на изменения и их автора. Изменения не должны приписываться первоначальному разработчику. Получателям предоставляются те же права и ограничения по настоящим условиям.

4. Гарантии и ответственность
Программа предоставляется «как есть», без гарантий точности расчётов, пригодности для определённой цели и бесперебойной работы. В пределах, допускаемых применимым законодательством, правообладатель не отвечает за убытки вследствие использования программы. Условия не ограничивают ответственность, которую закон запрещает исключать.

5. Границы действия
Настоящий текст является отдельными пользовательскими условиями, а не MIT. Он не отменяет разрешений, ранее предоставленных для версий под MIT. Права на сторонние компоненты и материалы определяются их собственными условиями; настоящие условия не предоставляют дополнительных прав на них.`},
    en:{title:'About “Floors”',address:'610007 · 1 Lugovoy Lane',developer:'Developer:',name:'Evgeniy Sergeevich Prudnikov',free:'Free use, modification and distribution are permitted. Sale and paid access are prohibited without the author’s written permission.',scheme:'The diagram is schematic and not to scale. The vertical stack shows apartment positions by floor, not engineering utility routes.',terms:'Full distribution terms',close:'Close',license:`FLOORS — TERMS OF FREE USE AND DISTRIBUTION
Version 1.0 dated 08 September 2026. Applies to web version 1.0 of the program.

© 2026 Evgeniy Sergeevich Prudnikov
Developer and stated rights holder: Evgeniy Sergeevich Prudnikov.

1. Permitted use
A non-exclusive right is granted free of charge to use the “Floors” program, copy it, study and modify its source code, and freely distribute original and modified versions, including executable files. This permission applies worldwide for the entire term of the exclusive right, subject to these terms. Use of the program for personal and professional purposes is permitted.

2. Prohibition of paid distribution
Selling the program or modified versions, or charging for a copy, download, access, or right of use, is prohibited without separate written permission from the rights holder. This prohibition also applies to including the program in paid software bundles or subscriptions.

3. Preservation of authorship and terms
Any distribution must retain the notice “© 2026 Evgeniy Sergeevich Prudnikov” and the full text of these terms. Modified versions must clearly state the changes and identify their author. Changes must not be attributed to the original developer. Recipients receive the same rights and restrictions under these terms.

4. Warranties and liability
The program is provided “as is”, without warranties regarding calculation accuracy, fitness for a particular purpose, or uninterrupted operation. To the extent permitted by applicable law, the rights holder is not liable for losses resulting from use of the program. These terms do not limit liability where exclusion is prohibited by law.

5. Scope
These terms are separate user terms and are not the MIT License. They do not revoke permissions previously granted for versions distributed under MIT. Rights to third-party components and materials are governed by their own terms; these terms grant no additional rights to them.`},
    fr:{title:'À propos de « Étages »',address:'610007 · 1, ruelle Lugovoy',developer:'Développeur :',name:'Evgeniy Sergeevich Prudnikov',free:'L’utilisation, la modification et la distribution gratuites sont autorisées. La vente et l’accès payant sont interdits sans autorisation écrite de l’auteur.',scheme:'Le schéma est indicatif et n’est pas à l’échelle. La colonne indique la position verticale des appartements, et non le tracé des réseaux techniques.',terms:'Conditions complètes de distribution',close:'Fermer',license:`ÉTAGES — CONDITIONS D’UTILISATION ET DE DISTRIBUTION GRATUITES
Version 1.0 du 08 septembre 2026. S’applique à la version web 1.0 du programme.

© 2026 Evgeniy Sergeevich Prudnikov
Développeur et titulaire des droits indiqué : Evgeniy Sergeevich Prudnikov.

1. Utilisation autorisée
Un droit non exclusif est accordé gratuitement pour utiliser le programme « Étages », le copier, étudier et modifier son code source, ainsi que distribuer gratuitement les versions originales et modifiées, y compris les fichiers exécutables. Cette autorisation s’applique sans limitation territoriale pendant toute la durée du droit exclusif, sous réserve du respect des présentes conditions. L’utilisation du programme à des fins personnelles et professionnelles est autorisée.

2. Interdiction de distribution payante
La vente du programme ou de ses versions modifiées, ainsi que toute facturation d’une copie, d’un téléchargement, d’un accès ou d’un droit d’utilisation, est interdite sans autorisation écrite distincte du titulaire des droits. Cette interdiction couvre également l’inclusion du programme dans des ensembles logiciels ou abonnements payants.

3. Maintien de la paternité et des conditions
Toute distribution doit conserver la mention « © 2026 Evgeniy Sergeevich Prudnikov » ainsi que le texte intégral des présentes conditions. Les versions modifiées doivent indiquer clairement les modifications et leur auteur. Les modifications ne doivent pas être attribuées au développeur initial. Les destinataires bénéficient des mêmes droits et restrictions prévus par les présentes conditions.

4. Garanties et responsabilité
Le programme est fourni « en l’état », sans garantie concernant l’exactitude des calculs, l’adéquation à un usage particulier ou le fonctionnement ininterrompu. Dans les limites permises par la législation applicable, le titulaire des droits n’est pas responsable des pertes résultant de l’utilisation du programme. Les présentes conditions ne limitent pas une responsabilité que la loi interdit d’exclure.

5. Champ d’application
Le présent texte constitue des conditions d’utilisation distinctes et non une licence MIT. Il n’annule pas les autorisations précédemment accordées pour des versions distribuées sous MIT. Les droits relatifs aux composants et contenus tiers sont régis par leurs propres conditions ; les présentes conditions n’accordent aucun droit supplémentaire sur ceux-ci.`},
    de:{title:'Über „Etagen“',address:'610007 · Lugovoy-Gasse 1',developer:'Entwickler:',name:'Evgeniy Sergeevich Prudnikov',free:'Kostenlose Nutzung, Änderung und Verbreitung sind erlaubt. Verkauf und kostenpflichtiger Zugang sind ohne schriftliche Genehmigung des Autors untersagt.',scheme:'Die Darstellung ist schematisch und nicht maßstabsgetreu. Der Strang zeigt die vertikale Lage der Wohnungen, nicht den Verlauf technischer Leitungen.',terms:'Vollständige Verbreitungsbedingungen',close:'Schließen',license:`ETAGEN — BEDINGUNGEN FÜR KOSTENLOSE NUTZUNG UND VERBREITUNG
Version 1.0 vom 08. September 2026. Gilt für die Webversion 1.0 des Programms.

© 2026 Evgeniy Sergeevich Prudnikov
Entwickler und angegebener Rechteinhaber: Evgeniy Sergeevich Prudnikov.

1. Zulässige Nutzung
Es wird unentgeltlich ein nicht ausschließliches Recht eingeräumt, das Programm „Etagen“ zu nutzen, zu kopieren, seinen Quellcode zu untersuchen und zu ändern sowie Original- und geänderte Versionen einschließlich ausführbarer Dateien kostenlos zu verbreiten. Diese Erlaubnis gilt weltweit für die gesamte Dauer des ausschließlichen Rechts unter Einhaltung dieser Bedingungen. Die Nutzung des Programms für private und berufliche Zwecke ist zulässig.

2. Verbot der entgeltlichen Verbreitung
Der Verkauf des Programms und geänderter Versionen sowie die Erhebung von Gebühren für Kopien, Downloads, Zugang oder Nutzungsrechte ist ohne gesonderte schriftliche Genehmigung des Rechteinhabers untersagt. Das Verbot gilt auch für die Aufnahme des Programms in kostenpflichtige Softwarepakete und Abonnements.

3. Erhalt der Urheberschaft und Bedingungen
Bei jeder Verbreitung müssen der Hinweis „© 2026 Evgeniy Sergeevich Prudnikov“ und der vollständige Text dieser Bedingungen erhalten bleiben. Geänderte Versionen müssen die Änderungen und deren Urheber deutlich kennzeichnen. Änderungen dürfen nicht dem ursprünglichen Entwickler zugeschrieben werden. Empfänger erhalten dieselben Rechte und Beschränkungen nach diesen Bedingungen.

4. Gewährleistung und Haftung
Das Programm wird „wie besehen“ bereitgestellt, ohne Gewähr für die Genauigkeit von Berechnungen, die Eignung für einen bestimmten Zweck oder einen unterbrechungsfreien Betrieb. Soweit nach anwendbarem Recht zulässig, haftet der Rechteinhaber nicht für Schäden, die aus der Nutzung des Programms entstehen. Diese Bedingungen beschränken keine Haftung, deren Ausschluss gesetzlich unzulässig ist.

5. Geltungsbereich
Dieser Text stellt eigenständige Nutzungsbedingungen dar und ist nicht die MIT-Lizenz. Er widerruft keine zuvor für unter MIT veröffentlichte Versionen erteilten Rechte. Rechte an Komponenten und Materialien Dritter richten sich nach deren eigenen Bedingungen; diese Bedingungen gewähren daran keine zusätzlichen Rechte.`}
  };
  function apply(){
    const d=document.getElementById('info-dialog');if(!d)return;const x=T[L()];
    const ps=d.querySelectorAll(':scope > p');
    const title=d.querySelector('#info-title');if(title)title.textContent=x.title;
    const close=d.querySelector('[data-close]');if(close)close.setAttribute('aria-label',x.close);
    if(ps[0])ps[0].textContent=x.address;
    if(ps[1])ps[1].innerHTML=`${x.developer} <strong>${x.name}</strong>`;
    if(ps[2])ps[2].textContent=x.free;
    if(ps[3])ps[3].textContent=x.scheme;
    const summary=d.querySelector('details summary');if(summary)summary.textContent=x.terms;
    const license=d.querySelector('#license');if(license)license.textContent=x.license;
  }
  new MutationObserver(()=>requestAnimationFrame(apply)).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  document.addEventListener('click',e=>{if(e.target.closest('#about,.lang-option')){setTimeout(apply,0);setTimeout(apply,80)}});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
  window.applyAboutLanguage=apply;
})();
