(()=>{
  const apply=()=>{
    const pill=document.querySelector('.currency-pill');
    if(!pill){setTimeout(apply,40);return;}
    if(!pill.querySelector('.currency-symbol')){
      const symbol=document.createElement('span');
      symbol.className='currency-symbol';
      symbol.textContent='$';
      symbol.setAttribute('aria-hidden','true');
      pill.prepend(symbol);
    }
    pill.classList.add('currency-pill-enhanced');
  };
  const style=document.createElement('style');
  style.textContent=`
    .currency-pill-enhanced{grid-template-columns:auto auto!important;grid-template-rows:auto auto!important;grid-template-areas:"symbol code" "symbol value"!important;column-gap:7px!important;row-gap:2px!important;min-width:88px!important;padding:7px 10px!important;text-align:left!important}
    .currency-symbol{grid-area:symbol;align-self:center;font-size:1.35rem;font-weight:900;color:#fff;line-height:1;text-shadow:0 1px 2px rgba(0,0,0,.28)}
    .currency-pill-enhanced .currency-code{grid-area:code;font-size:.72rem!important;font-weight:900!important;color:#fff!important;letter-spacing:.08em!important;line-height:1!important;text-shadow:0 1px 2px rgba(0,0,0,.25)}
    .currency-pill-enhanced .currency-value{grid-area:value;font-size:.88rem!important;font-weight:900!important;color:#fff!important;line-height:1!important;text-shadow:0 1px 2px rgba(0,0,0,.25)}
    @media(max-width:760px){.currency-pill-enhanced{min-width:68px!important;width:68px!important;padding:5px 6px!important;column-gap:4px!important}.currency-symbol{font-size:1.02rem}.currency-pill-enhanced .currency-code{font-size:.56rem!important}.currency-pill-enhanced .currency-value{font-size:.66rem!important}}
    @media(max-width:390px){.currency-pill-enhanced{min-width:64px!important;width:64px!important;padding-left:5px!important;padding-right:5px!important}.currency-symbol{font-size:.94rem}.currency-pill-enhanced .currency-code{font-size:.52rem!important}.currency-pill-enhanced .currency-value{font-size:.62rem!important}}
  `;
  document.head.appendChild(style);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();