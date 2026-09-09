(()=>{
  const header=document.querySelector('.masthead');
  if(!header)return;

  const style=document.createElement('style');
  style.textContent=`
    .footer-address{display:block;margin-top:4px;color:var(--green);font-weight:700}
    @media(max-width:760px){
      .masthead{display:grid!important;grid-template-columns:minmax(0,1fr) auto auto auto auto!important;grid-template-areas:"brand weather currency about lang"!important;align-items:center!important;column-gap:5px!important;row-gap:0!important;padding:14px 10px!important}
      .masthead .brand{grid-area:brand!important;min-width:0!important;display:flex!important;align-items:center!important;gap:6px!important}
      .masthead .brand>div{min-width:0!important}
      .masthead .brand img{width:32px!important;height:32px!important;flex:0 0 32px!important}
      .masthead .brand h1{font-size:1.28rem!important;line-height:1!important;white-space:nowrap!important}
      .masthead .brand p{display:none!important}
      .header-status{display:contents!important;margin:0!important}
      .weather-pill{grid-area:weather!important;width:58px!important;min-width:58px!important;height:46px!important;padding:4px 5px!important;border-radius:10px!important;grid-template-columns:auto auto!important;grid-template-areas:"icon temp" "city city"!important;column-gap:3px!important;row-gap:2px!important}
      .weather-icon{font-size:.76rem!important}.weather-temp{font-size:.74rem!important}.weather-city{display:block!important;font-size:.45rem!important}
      .currency-pill{grid-area:currency!important;width:58px!important;min-width:58px!important;height:46px!important;padding:4px 5px!important;border-radius:10px!important;gap:2px!important}
      .currency-code{font-size:.47rem!important}.currency-value{font-size:.61rem!important}
      .quiet{grid-area:about!important;min-height:46px!important;padding:7px 7px!important;font-size:.66rem!important;white-space:nowrap!important;align-self:center!important}
      .lang-switcher{grid-area:lang!important;margin-left:0!important;align-self:center!important}
      .mobile-house-line,.mobile-footer-address{display:none!important}
      .footer-address{font-size:.88rem}
    }
    @media(max-width:390px){
      .masthead{padding-left:7px!important;padding-right:7px!important;column-gap:3px!important}
      .masthead .brand img{width:30px!important;height:30px!important;flex-basis:30px!important}
      .masthead .brand h1{font-size:1.16rem!important}
      .weather-pill{width:52px!important;min-width:52px!important}.currency-pill{width:52px!important;min-width:52px!important}
      .quiet{font-size:.61rem!important;padding-left:5px!important;padding-right:5px!important}
      .footer-address{font-size:.82rem}
    }
    @media(max-width:350px){
      .masthead .brand h1{font-size:1.02rem!important}.masthead .brand img{width:27px!important;height:27px!important;flex-basis:27px!important}
      .weather-pill{width:48px!important;min-width:48px!important}.currency-pill{width:48px!important;min-width:48px!important}
      .quiet{font-size:.57rem!important;padding-left:4px!important;padding-right:4px!important}
    }
  `;
  document.head.appendChild(style);
})();

if(!document.querySelector('script[data-intercom-downloads]')){
  const script=document.createElement('script');
  script.src='./intercom-downloads.js?v=42';
  script.defer=true;
  script.dataset.intercomDownloads='1';
  document.head.appendChild(script);
}
