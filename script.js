function isWeekend(d){const day=d.getUTCDay(); return day===0||day===6}
function nextOpenInET(now){ // US market hours 9:30-16:00 ET, weekdays
  const ny = new Date(now.toLocaleString('en-US', {timeZone:'America/New_York'}));
  ny.setHours(9,30,0,0);
  // If weekend, push to Monday 9:30
  const dow = ny.getDay();
  if(isWeekend(ny)){
    // move to Monday 9:30
    const daysToMon = (8 - dow) % 7;
    ny.setDate(ny.getDate() + daysToMon);
    ny.setHours(9,30,0,0);
  } else if(now >= ny){
    // already past open today; next open is tomorrow (or Monday if Fri)
    ny.setDate(ny.getDate() + 1);
    if(isWeekend(ny)){
      // skip to Monday
      ny.setDate(ny.getDate() + (8 - ny.getDay()) % 7);
    }
    ny.setHours(9,30,0,0);
  }
  return ny;
  function isWeekend(d){const day=d.getDay(); return day===0||day===6}
}
function fmt(dt){ return new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit',hour12:true,timeZone:'America/New_York'}).format(dt) }
function update(){ const now=new Date(); const nextOpen= nextOpenInET(now); const diffMs= nextOpen - now; const diffH=Math.floor(diffMs/3600000); const diffMin=Math.floor((diffMs%3600000)/60000);
  document.getElementById('next-open').textContent= nextOpen.toLocaleDateString(undefined,{weekday:'short',year:'numeric',month:'short',day:'numeric'})+ ' at '+ fmt(nextOpen);
  const total= diffMs/1000; const s = Math.max(0, Math.floor(total));
  const h= Math.floor(s/3600); const m= Math.floor((s%3600)/60); const sec= s%60;
  document.getElementById('countdown').textContent= (h>0?h+"t ":"")+ (m>0?m+"m ":"")+ sec+"s";
  document.getElementById('status').textContent= (diffMs>0? 'Opens soon' : 'Open');
}
update(); setInterval(update,1000);