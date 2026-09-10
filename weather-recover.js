(()=>{
  const API='https://api.open-meteo.com/v1/forecast?latitude=58.6036&longitude=49.6680&current=temperature_2m,apparent_temperature,is_day,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=Europe%2FMoscow&forecast_days=7';
  const key='etazhi-weather-cache-v2';
  const condition=code=>{if(code===0)return['☀️','ясно'];if(code<=2)return['⛅','переменная облачность'];if(code===3)return['☁️','облачно'];if(code===45||code===48)return['🌫️','туман'];if(code>=51&&code<=67)return['🌧️','дождь'];if(code>=71&&code<=77)return['🌨️','снег'];if(code>=80&&code<=82)return['🌦️','ливни'];if(code>=85&&code<=86)return['🌨️','снегопад'];if(code>=95)return['⛈️','гроза'];return['🌡️','погода']};
  const signed=n=>`${Number(n)>0?'+':''}${Math.round(Number(n))}°`;
  const apply=data=>{
    if(!data?.current)return false;
    const pill=document.querySelector('.weather-pill');
    if(pill){const [sym]=condition(Number(data.current.weather_code));const icon=pill.querySelector('.weather-icon');const temp=pill.querySelector('.weather-temp');if(icon)icon.textContent=sym;if(temp)temp.textContent=signed(data.current.temperature_2m)}
    const body=document.querySelector('.forecast-body');
    if(body&&data.daily?.time?.length){const d=data.daily;const rows=d.time.slice(0,7).map((date,i)=>{const [sym,desc]=condition(Number(d.weather_code[i]));const day=i===0?'Сегодня':new Intl.DateTimeFormat('ru-RU',{weekday:'short'}).format(new Date(date+'T12:00:00')).replace('.','');const dt=new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'short'}).format(new Date(date+'T12:00:00')).replace('.','');return `<article class="forecast-day"><div class="forecast-date"><strong>${day}</strong><span>${dt}</span></div><div class="forecast-day-icon" aria-hidden="true">${sym}</div><div class="forecast-desc">${desc}</div><div class="forecast-temp">${signed(d.temperature_2m_max[i])}<span class="min">${signed(d.temperature_2m_min[i])}</span></div><div class="forecast-meta"><span>💧 ${Math.round(Number(d.precipitation_probability_max?.[i]??0))}%</span><span>💨 ${Math.round(Number(d.wind_speed_10m_max?.[i]??0))} км/ч</span></div></article>`}).join('');const [ci,ct]=condition(Number(data.current.weather_code));body.innerHTML=`<div class="forecast-current"><div class="forecast-current-icon" aria-hidden="true">${ci}</div><div><div class="forecast-current-temp">${signed(data.current.temperature_2m)}</div><div class="forecast-current-text">${ct}</div></div><div class="forecast-current-feels">Ощущается как <strong>${signed(data.current.apparent_temperature)}</strong></div></div><div class="forecast-days">${rows}</div><div class="forecast-source">Данные: Open-Meteo · прогноз обновляется автоматически</div>`}
    return true;
  };
  async function load(){
    const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),8000);
    try{const r=await fetch(API,{cache:'no-store',signal:ctrl.signal});if(!r.ok)throw Error('weather');const data=await r.json();localStorage.setItem(key,JSON.stringify({data,saved:Date.now()}));apply(data)}catch{try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved?.data)apply(saved.data)}catch{}}finally{clearTimeout(timer)}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(load,150));else setTimeout(load,150);
})();