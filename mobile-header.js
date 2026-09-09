(()=>{
  const header=document.querySelector('.masthead');
  const brandAddress=header?.querySelector('.brand p');
  const searchPanel=document.querySelector('.search-panel');
  if(!header||!brandAddress||!searchPanel)return;

  const style=document.createElement('style');
  style.textContent=`
    .mobile-house-line{display:none}
    @media(max-width:760px){
      .masthead{display:grid!important;grid-template-columns:minmax(0,1fr) auto auto auto!important;grid-template-areas:"brand weather currency about"!important;align-items:center!important;column-gap:5px!important;row-gap:0!important;padding:14px 10px!important}
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
      .quiet{grid-area:about!important;min-height:46px!important;padding:7px 8px!important;font-size:.68rem!important;white-space:nowrap!important;align-self:center!important}
      .mobile-house-line{display:block;margin:0 0 8px;color:var(--green);font-size:.82rem;font-weight:750;line-height:1.25}
    }
    @media(max-width:390px){
      .masthead{padding-left:8px!important;padding-right:8px!important;column-gap:4px!important}
      .masthead .brand img{width:30px!important;height:30px!important;flex-basis:30px!important}
      .masthead .brand h1{font-size:1.18rem!important}
      .weather-pill{width:54px!important;min-width:54px!important}.currency-pill{width:54px!important;min-width:54px!important}
      .quiet{font-size:.64rem!important;padding-left:6px!important;padding-right:6px!important}
      .mobile-house-line{font-size:.78rem;margin-bottom:7px}
    }
    @media(max-width:350px){
      .masthead .brand h1{font-size:1.08rem!important}.masthead .brand img{width:28px!important;height:28px!important;flex-basis:28px!important}
      .weather-pill{width:50px!important;min-width:50px!important}.currency-pill{width:50px!important;min-width:50px!important}
      .quiet{font-size:.6rem!important;padding-left:5px!important;padding-right:5px!important}
    }
  `;
  document.head.appendChild(style);

  let line=searchPanel.querySelector('.mobile-house-line');
  if(!line){
    line=document.createElement('div');
    line.className='mobile-house-line';
    line.textContent=brandAddress.textContent.trim();
    const heading=searchPanel.querySelector('.search-heading');
    heading?searchPanel.insertBefore(line,heading):searchPanel.prepend(line);
  }
})();

if(!document.querySelector('script[data-intercom-downloads]')){
  const script=document.createElement('script');
  script.src='./intercom-downloads.js?v=42';
  script.defer=true;
  script.dataset.intercomDownloads='1';
  document.head.appendChild(script);
}
