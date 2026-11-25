(function(root){
const min=t=>Number(t.slice(0,2))*60+Number(t.slice(3));
const duration=t=>(min(t.arrival)-min(t.departure)+1440)%1440;
const regional=t=>['6606','6610'].includes(t.number);
const add=(d,n)=>{let x=new Date(d+'T12:00:00Z');x.setUTCDate(x.getUTCDate()+n);return x.toISOString().slice(0,10)};
const kyiv=(now=new Date())=>{const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Kyiv',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(now).map(x=>[x.type,x.value]));return {date:`${p.year}-${p.month}-${p.day}`,seconds:+p.hour*3600 + +p.minute*60 + +p.second,time:`${p.hour}:${p.minute}`}};
function daily(rows,date){let day=new Date(date+'T12:00:00Z').getUTCDay(),seen=new Set();return rows.filter(t=>date>=t.start&&date<=t.end&&t.days.includes(day)).sort((a,b)=>min(a.departure)-min(b.departure)).filter(t=>{let k=[t.number,t.departure,t.arrival].join('/');if(seen.has(k))return false;seen.add(k);return true})}
function upcoming(rows,date,seconds){return daily(rows,date).filter(t=>min(t.departure)*60>seconds)}
function next(rows,date,seconds){let today=upcoming(rows,date,seconds);if(today.length)return {train:today[0],date,offset:0};for(let i=1;i<=7;i++){let d=add(date,i),a=daily(rows,d);if(a.length)return {train:a[0],date:d,offset:i}}return null}
root.TrainLogic={min,duration,regional,add,kyiv,daily,upcoming,next};if(typeof module!=='undefined')module.exports=root.TrainLogic;
})(globalThis);
