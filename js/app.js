const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Math.random().toString(36).slice(2,8),LS='haccp_studio_v9',sleep=ms=>new Promise(r=>setTimeout(r,ms));
const C=(name,w,kind='text')=>({id:uid(),name,w,kind});
const base=()=>({v:9,mode:'sheet',orient:'portrait',paper:'A4',font:10,rowH:13,mL:25,org:'ООО «Название»',tag:'СИСТЕМА КАЧЕСТВА НА ОСНОВЕ ПРИНЦИПОВ ХАССП',title:'ЖУРНАЛ МОНИТОРИНГА',pages:5,rpp:20,meta:[],cols:[],rows:[],limits:'',sigs:[],cells:{},demo:false});
const R=a=>a.map(label=>({id:uid(),label}));

const PRESETS={
 oil:()=>({...base(),title:'ЖУРНАЛ МОНИТОРИНГА ККТ: ФРИТЮРНЫЕ МАСЛА',meta:[{label:'Предприятие/Филиал',val:'Цех №2'},{label:'Оборудование',val:'Фритюрница №4'},{label:'Период',val:''}],
  cols:[C('№ п/п',8,'num'),C('Контролируемый параметр',50,'label'),C('Фактический показатель',24),C('Подпись',18)],
  rows:R(['Объём масла на начало смены (л)','Температура фритюра перед жаркой (°C)','Органолептика (вкус, запах, цвет)','Добавлено свежего масла (л)','Слив отработанного масла (л)','Объём масла на конец смены (л)']),
  limits:'Критические пределы (ТР ТС 021/2011):\n1. Запрещено использовать масло с горьким вкусом или запахом гари.\n2. Предельный распад — не более 1% измененных триглицеридов.',sigs:[{role:'Дежурный повар',name:''},{role:'Технолог',name:''}]}),
 temp:()=>({...base(),mode:'journal',orient:'landscape',font:9,rowH:9,pages:3,rpp:12,title:'ЖУРНАЛ УЧЕТА ТЕМПЕРАТУРНОГО РЕЖИМА ХОЛОДИЛЬНОГО ОБОРУДОВАНИЯ',meta:[{label:'Цех',val:''},{label:'Оборудование',val:''}],
  cols:[C('Дата',10),C('t° по паспорту (°C)',15),{...C('t° утро (°C)',15),min:0,max:6},{...C('t° вечер (°C)',15),min:0,max:6},C('Влажность, %',15),C('Отклонения / меры',20),C('Подпись',10)],
  limits:'Среднетемпературное оборудование: 0…+6 °C. Низкотемпературное: −18 °C и ниже.',sigs:[{role:'Ответственный',name:''}]}),
 blank:()=>({...base(),title:'НАЗВАНИЕ ЖУРНАЛА',meta:[{label:'Подразделение',val:''}],cols:[C('№',8,'num'),C('Параметр',52,'label'),C('Значение',24),C('Подпись',16)],rows:R(['Параметр 1','Параметр 2','Параметр 3']),limits:'',sigs:[{role:'Ответственный',name:''}]}),
 sanit:()=>({...base(),mL:30,rowH:12,title:'ЛИСТ КОНТРОЛЯ САНИТАРНОГО СОСТОЯНИЯ И МОЙКИ ОБОРУДОВАНИЯ',tag:'САНПИН 2.3/2.4.3590-20',meta:[{label:'Оборудование',val:''},{label:'Ответственный',val:''}],
  cols:[C('№',6,'num'),C('Объект санобработки',45,'label'),C('Метод и средство',25),C('Качество (смыв/визуал)',24)],
  rows:R(['Рабочая поверхность ленты','Защитные кожухи и направляющие','Приводной вал и натяжной механизм','Пульт управления','Подпольное пространство']),
  limits:'Визуальная чистота — отсутствие следов сырья и моющих средств. АТФ-тест: < 30 RLU.',sigs:[{role:'Исполнитель',name:''},{role:'Проверил',name:''}]}),
 receive:()=>({...base(),title:'ЖУРНАЛ ПРИЁМКИ СЫРЬЯ И ПРОДУКЦИИ',meta:[{label:'Склад / Цех',val:''},{label:'Период',val:''}],
  cols:[C('№',6,'num'),C('Дата/время',12),C('Поставщик / ТТН',22),C('Наименование',28,'label'),C('t° приёмки',12),C('Состояние / срок',14),C('Подпись',10)],
  rows:R(['Мясо / птица','Рыба / морепродукты','Молочная продукция','Овощи / зелень','Сухие продукты','Упаковка / тара']),
  limits:'Температура охлаждённого сырья ≤ +4 °C, замороженного ≤ −15 °C. Упаковка целая, маркировка читаема, сроки годности в норме.',sigs:[{role:'Кладовщик',name:''},{role:'Технолог',name:''}]}),
 cook:()=>({...base(),title:'ЖУРНАЛ КОНТРОЛЯ ТЕМПЕРАТУРЫ ТЕПЛОВОЙ ОБРАБОТКИ',meta:[{label:'Цех',val:''},{label:'Смена',val:''}],
  cols:[C('№',6,'num'),C('Блюдо / партия',28,'label'),C('Время начала',12),C('t° в центре (°C)',14),C('Время выдержки',12),C('Результат',14),C('Подпись',10)],
  rows:R(['Котлеты / фарш','Птица целиком','Супы / соусы','Гарниры','Выпечка','Регенерация']),
  limits:'Критический предел: температура в центре продукта ≥ +75 °C (птица, фарш) или ≥ +63 °C (цельные куски).',sigs:[{role:'Повар',name:''},{role:'Шеф-повар',name:''}]}),
 clean:()=>({...base(),mode:'journal',orient:'landscape',font:9,rowH:10,pages:4,rpp:10,title:'ЖУРНАЛ УБОРКИ И ДЕЗИНФЕКЦИИ ПРОИЗВОДСТВЕННЫХ ПОМЕЩЕНИЙ',meta:[{label:'Участок',val:''}],
  cols:[C('Дата',10),C('Зона',18),C('Вид уборки',16),C('Средство / концентрация',20),C('Время',10),C('Отметка',12),C('Подпись',10)],
  limits:'График уборки согласно программе производственного контроля. Дезинфекция — после окончания смены.',sigs:[{role:'Уборщик',name:''},{role:'Контролёр',name:''}]}),
 pest:()=>({...base(),title:'ЖУРНАЛ КОНТРОЛЯ ДЕЗИНСЕКЦИИ И ДЕРАТИЗАЦИИ',meta:[{label:'Объект',val:''},{label:'Период',val:''}],
  cols:[C('№',6,'num'),C('Дата',12),C('Зона / точка',30,'label'),C('Тип мероприятия',20),C('Результат',16),C('Подпись',12)],
  rows:R(['Кухня горячий цех','Холодный цех','Склад сухой','Склад холодильный','Мусорная зона','Туалеты / раздевалки']),
  limits:'Профилактические обработки — не реже 1 раза в месяц. При обнаружении вредителей — внеплановая обработка.',sigs:[{role:'Ответственный',name:''},{role:'Представитель службы',name:''}]}),
 health:()=>({...base(),title:'ЖУРНАЛ КОНТРОЛЯ ЗДОРОВЬЯ ПЕРСОНАЛА',meta:[{label:'Подразделение',val:''},{label:'Месяц',val:''}],
  cols:[C('№',6,'num'),C('ФИО',28,'label'),C('Должность',18),C('Дата осмотра',14),C('Результат',16),C('Допуск',10),C('Подпись',10)],
  rows:R(['Сотрудник 1','Сотрудник 2','Сотрудник 3','Сотрудник 4','Сотрудник 5']),
  limits:'Ежедневный осмотр перед сменой. При признаках ОРВИ / кишечных инфекций — отстранение до выздоровления.',sigs:[{role:'Медработник / Ответственный',name:''}]})
};

const LEG={orientation:'orient',fontSizeTable:'font',rowHeight:'rowH',marginLeft:'mL',systemTag:'tag',limitsText:'limits',journalPages:'pages',journalRowsPerPage:'rpp',metaFields:'meta',columns:'cols',signatures:'sigs'};
const num=(v,a,b,d)=>{v=parseFloat(v);return isFinite(v)?Math.min(b,Math.max(a,v)):d};
function norm(o){
 if(!o||typeof o!=='object'||Array.isArray(o))throw Error('Файл не похож на шаблон');
 o={...o};for(const k in LEG)if(k in o&&!(LEG[k] in o))o[LEG[k]]=o[k];
 const s={...base(),...o},t=(v,n=3000)=>String(v??'').slice(0,n);
 ['org','tag','title','limits'].forEach(k=>s[k]=t(s[k]));
 s.paper=['A4','A3','A5'].includes(s.paper)?s.paper:'A4';s.mode=s.mode==='journal'?'journal':'sheet';s.orient=s.orient==='landscape'?'landscape':'portrait';
 s.font=num(s.font,6,16,10);s.rowH=num(s.rowH,5,30,12);s.mL=num(s.mL,10,50,25);s.pages=Math.round(num(s.pages,1,200,5));s.rpp=Math.round(num(s.rpp,1,60,20));s.demo=!!s.demo;
 const arr=a=>Array.isArray(a)?a.slice(0,200):[];
 s.meta=arr(s.meta).map(m=>({label:t(m.label,200),val:t(m.val??'',500)}));
 s.sigs=arr(s.sigs).map(m=>({role:t(m.role,200),name:t(m.name??'',200)}));
 s.cols=arr(s.cols).slice(0,20).map((c,i)=>({id:/^\w{1,12}$/.test(c.id)?c.id:uid(),name:t(c.name,300),w:num(c.w??c.width,3,100,15),min:num(c.min,-1e6,1e6,null),max:num(c.max,-1e6,1e6,null),kind:['num','label','text'].includes(c.kind)?c.kind:/^№/.test(c.name)?'num':(i===1&&s.mode==='sheet'?'label':'text')}));
 const rl=o.rowLabels||[];s.rows=arr(s.rows).length?arr(s.rows).map(r=>({id:/^\w{1,12}$/.test(r.id)?r.id:uid(),label:t(r.label,500)})):R(rl.map(x=>t(x,500)));
 const cells={},src=o.cells||o.autoFilledData||{};
 for(const k in src){let m;const v=t(src[k],500);
  if(/^[\w]+\|/.test(k))cells[k]=v;
  else if((m=k.match(/^cell_sheet_(\d+)_(\d+)$/))&&s.rows[m[1]]&&s.cols[m[2]])cells[`${s.rows[m[1]].id}|${s.cols[m[2]].id}`]=v;
  else if((m=k.match(/^cell_journal_(\d+)_(\d+)_(\d+)$/))&&s.cols[m[3]])cells[`${m[1]}|${m[2]}|${s.cols[m[3]].id}`]=v}
 s.cells=cells;s.v=9;return s}

let S,last,past=[],future=[],tm;
const lib=()=>{try{return JSON.parse(localStorage[LS+'_lib']||'[]')}catch{return[]}};
const toast=(m,ms=2600)=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),ms)};
function save(){try{localStorage[LS]=last}catch{toast('Память браузера недоступна — сохраняйте JSON вручную')}}
function flush(){clearTimeout(tm);const s=JSON.stringify(S);if(s!==last){past.push(last);if(past.length>80)past.shift();future=[];last=s;save()}updUndo()}
const touch=()=>{clearTimeout(tm);tm=setTimeout(()=>{flush();audit()},400)};
function setState(s,keepHist){S=s;if(!keepHist){past=[];future=[]}last=JSON.stringify(S);save();full()}
function undo(){flush();if(!past.length)return;future.push(last);S=JSON.parse(past.pop());last=JSON.stringify(S);save();full()}
function redo(){flush();if(!future.length)return;past.push(last);S=JSON.parse(future.pop());last=JSON.stringify(S);save();full()}
const updUndo=()=>{$('#bUndo').disabled=!past.length;$('#bRedo').disabled=!future.length};

const stage=$('#stage'),view=$('#view');
const PAPER={A4:[210,297],A3:[297,420],A5:[148,210]},dim=()=>{const[w,h]=PAPER[S.paper]||PAPER.A4;return S.orient==='landscape'?[h,w]:[w,h]};
const badVal=(c,v)=>{if(!c||c.kind!=='text'||(c.min==null&&c.max==null))return false;const x=parseFloat(String(v).replace(',','.').replace('−','-'));return isFinite(x)&&((c.min!=null&&x<c.min)||(c.max!=null&&x>c.max))};
const pg=(inner,cls='')=>`<section class="pg ${S.orient} ${cls}" style="--mL:${S.mL}mm;width:${dim()[0]}mm;height:${dim()[1]}mm">${S.demo?'<i class="wm">ОБРАЗЕЦ</i>':''}<div class="bd">${inner}</div><footer class="ft"><span>${esc(S.org)}</span><span class="ck"></span></footer></section>`;
const ed=(a,v,c='')=>`<span contenteditable spellcheck="true" lang="ru" ${a} ${c?`class="${c}"`:''}>${esc(v)}</span>`;

function table(p,n,a=0){const sum=S.cols.reduce((a,c)=>a+c.w,0)||1,sheet=S.mode==='sheet';
 let h=`<table class="tb" style="font-size:${S.font}pt"><colgroup>${S.cols.map(c=>`<col style="width:${(c.w/sum*100).toFixed(2)}%">`).join('')}</colgroup><thead><tr>${S.cols.map((c,ci)=>`<th draggable="true" data-col="${ci}" data-ctx="col">${esc(c.name)}</th>`).join('')}</tr></thead><tbody>`;
 for(let i=a;i<a+n;i++){const row=sheet?S.rows[i]:null;h+=`<tr style="height:${S.rowH}mm" data-row="${sheet?i:''}" draggable="${sheet?'true':'false'}">`;
  for(const c of S.cols){const k=sheet?`${row.id}|${c.id}`:`${p}|${i}|${c.id}`;
   if(c.kind==='num')h+=`<td data-ctx="cell">${sheet?i+1:(p-1)*n+i+1}</td>`;
   else if(c.kind==='label'&&sheet)h+=`<td class="l" contenteditable spellcheck="true" lang="ru" data-row="${i}" data-ctx="rowlabel" draggable="true">${esc(row.label)}</td>`;
   else h+=`<td${badVal(c,S.cells[k])?' class="bad"':''} contenteditable spellcheck="true" lang="ru" data-k="${k}" data-ctx="cell">${esc(S.cells[k]||'')}</td>`}
  h+='</tr>'}
 return h+'</tbody></table>'}
const sigs=()=>S.sigs.map((s,i)=>`<div class="sig">${ed(`data-sr="${i}"`,s.role)}<i>подпись</i><span>ФИО: ${ed(`data-sn="${i}"`,s.name)}</span></div>`).join('');
const metaH=()=>`<div class="meta">${S.meta.map((m,i)=>`<div><b>${esc(m.label)}:</b>${ed(`data-m="${i}"`,m.val)}</div>`).join('')}</div>`;
const meas=$('#meas');
function fits(html){meas.innerHTML=pg(html);const b=$('.bd',meas);return b.scrollHeight<=b.clientHeight+1}
const hdrSheet=()=>`<div class="tag">${ed('data-f="tag"',S.tag)}</div><h2 class="ttl">${ed('data-f="title"',S.title)}</h2>${metaH()}`;

function render(){const sy=view.scrollTop,sx=view.scrollLeft;let pages=[];
 if(S.mode==='sheet'){const n=S.rows.length,tail=`<div class="lim">${ed('data-f="limits"',S.limits)}</div>`+sigs(),head=fst=>fst?hdrSheet():`<div class="tag">${esc(S.title)} (продолжение)</div>`;let a=0,first=true;
  for(let guard=0;guard<300;guard++){const rest=n-a;
   if(rest<=0){pages.push(first?hdrSheet()+table(1,0,0)+tail:head(false)+tail);break}
   const full=head(first)+table(1,rest,a)+tail;if(fits(full)){pages.push(full);break}
   let lo=1,hi=rest;while(lo<hi){const m=(lo+hi+1)>>1;fits(head(first)+table(1,m,a))?lo=m:hi=m-1}
   pages.push(head(first)+table(1,lo,a));a+=lo;first=false}
  pages[pages.length-1]+='<button class="noprint addrow" data-a="addrow">+ строка</button>'}
 else{pages=[`<div class="cov"><b>${ed('data-f="org"',S.org)}</b><div><h2>${ed('data-f="title"',S.title)}</h2><p>Программа производственного контроля по принципам ХАССП</p></div><div style="text-align:left">Начат: «___» __________ 20__ г.<br>Окончен: «___» __________ 20__ г.</div></div>`,
  ...Array.from({length:S.pages},(_,i)=>`<div style="text-align:right;font-weight:700">Лист № ${i+1}</div>${metaH()}${table(i+1,S.rpp)}<p style="font-size:9.5pt;font-style:italic">Подпись контролирующего лица: ____________________</p>`),
  `<div style="margin:auto;text-align:center;border:1px solid #000;padding:24px;width:140mm">В журнале пронумеровано, прошнуровано и скреплено печатью <b>${S.pages}</b> листов.<br><br>Руководитель: ___________ / _______________<br><br>М.П.<br><br>Дата сдачи в архив: «___» __________ 20__ г.</div><button class="noprint addrow" data-a="addpage">+ страница</button>`]}
 stage.innerHTML=pages.map(h=>pg(h)).join('');meas.innerHTML='';
 $('#pgsz').textContent=`@page{size:${S.paper} ${S.orient}}`;checksum();view.scrollTop=sy;view.scrollLeft=sx;requestAnimationFrame(audit);bindDrag()}

async function checksum(){let c='';try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify([S.org,S.title,S.cols,S.rows,S.cells,S.meta])));c=[...new Uint8Array(b)].slice(0,4).map(x=>x.toString(16).padStart(2,'0')).join('')}catch{}
 const d=new Date().toLocaleDateString('ru-RU');$$('.ck').forEach((e,i)=>e.textContent=`${c?'№ '+c+' · ':''}${d} · стр. ${i+1}/${$$('.ck').length}`)}

stage.addEventListener('input',e=>{const t=e.target,d=t.dataset,v=t.innerText.replace(/\u00a0/g,' ').replace(/\n+$/,'');
 if(d.k){v?S.cells[d.k]=v:delete S.cells[d.k];t.classList.toggle('bad',badVal(S.cols.find(c=>c.id===d.k.split('|').pop()),v))}else if(d.row)S.rows[d.row].label=v;else if(d.f)S[d.f]=v;else if(d.m)S.meta[d.m].val=v;else if(d.sn)S.sigs[d.sn].name=v;else if(d.sr)S.sigs[d.sr].role=v;else return;
 const b=$(`[data-b="${d.f}"]`);if(b&&b!==document.activeElement)b.value=v;touch()});
stage.addEventListener('paste',e=>{e.preventDefault();document.execCommand('insertText',false,(e.clipboardData||window.clipboardData).getData('text/plain'))});

/* ---------- Context menu (right click) ---------- */
const ctx=$('#ctx');
function hideCtx(){ctx.hidden=true;ctx.innerHTML=''}
function showCtx(x,y,items){
 ctx.innerHTML=items.map(it=>it==='-'?`<div class="ctx-sep"></div>`:`<button data-act="${it.a}" ${it.d?'disabled':''}>${it.t}</button>`).join('');
 ctx.hidden=false;const r=ctx.getBoundingClientRect(),vw=innerWidth,vh=innerHeight;
 ctx.style.left=Math.min(x,vw-r.width-8)+'px';ctx.style.top=Math.min(y,vh-r.height-8)+'px'}
stage.addEventListener('contextmenu',e=>{
 e.preventDefault();const t=e.target.closest('[data-ctx]');if(!t)return hideCtx();
 const type=t.dataset.ctx;let items=[];
 if(type==='col'){const ci=+t.dataset.col;items=[
  {a:'col-left',t:'Вставить графу слева'},{a:'col-right',t:'Вставить графу справа'},'-',
  {a:'col-copy',t:'Копировать графу'},{a:'col-del',t:'Удалить графу',d:S.cols.length<2},'-',
  {a:'col-num',t:'Тип: Номер'},{a:'col-label',t:'Тип: Название строки'},{a:'col-text',t:'Тип: Текст'}
 ];ctx._col=ci}
 else if(type==='rowlabel'||type==='cell'){const tr=t.closest('tr'),ri=tr?+tr.dataset.row:-1;
  items=[{a:'row-add',t:'Добавить строку ниже'},{a:'row-dup',t:'Дублировать строку'},{a:'row-del',t:'Удалить строку',d:S.rows.length<1},'-',
   {a:'cell-clear',t:'Очистить ячейку'},{a:'cell-copy',t:'Копировать значение'}];
  if(type==='rowlabel')items.unshift({a:'row-edit',t:'Редактировать название'});
  ctx._row=ri;ctx._cell=t}
 else return hideCtx();
 showCtx(e.clientX,e.clientY,items)});
document.addEventListener('click',e=>{if(!ctx.contains(e.target))hideCtx()});
ctx.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b||b.disabled)return;const a=b.dataset.act;
 if(a.startsWith('col-')){const i=ctx._col;if(a==='col-left'||a==='col-right'){const nc=C('Новая графа',12);S.cols.splice(a==='col-left'?i:i+1,0,nc)}
  else if(a==='col-copy'){const c={...S.cols[i],id:uid()};S.cols.splice(i+1,0,c)}
  else if(a==='col-del'&&S.cols.length>1)S.cols.splice(i,1);
  else if(a==='col-num')S.cols[i].kind='num';else if(a==='col-label')S.cols[i].kind='label';else if(a==='col-text')S.cols[i].kind='text'}
 else if(a.startsWith('row-')){const i=ctx._row;if(a==='row-add')S.rows.splice(i+1,0,{id:uid(),label:'Параметр'});
  else if(a==='row-dup'&&i>=0)S.rows.splice(i+1,0,{id:uid(),label:S.rows[i].label});
  else if(a==='row-del'&&S.rows.length)S.rows.splice(i,1)}
 else if(a==='cell-clear'&&ctx._cell){const k=ctx._cell.dataset.k;if(k){delete S.cells[k];ctx._cell.textContent=''}else if(ctx._cell.dataset.row){S.rows[ctx._cell.dataset.row].label='';ctx._cell.textContent=''}}
 else if(a==='cell-copy'&&ctx._cell){navigator.clipboard?.writeText(ctx._cell.innerText||'');toast('Скопировано')}
 hideCtx();flush();panel();render();touch()});

/* ---------- Drag & drop columns / rows ---------- */
let dragCol=null,dragRow=null;
function bindDrag(){
 $$('th[draggable]',stage).forEach(th=>{
  th.ondragstart=e=>{dragCol=+th.dataset.col;e.dataTransfer.effectAllowed='move';th.classList.add('dragging')};
  th.ondragend=()=>{th.classList.remove('dragging');dragCol=null;$$('th',stage).forEach(x=>x.classList.remove('dragover'))};
  th.ondragover=e=>{e.preventDefault();e.dataTransfer.dropEffect='move';$$('th',stage).forEach(x=>x.classList.remove('dragover'));th.classList.add('dragover')};
  th.ondrop=e=>{e.preventDefault();const to=+th.dataset.col;if(dragCol==null||dragCol===to)return;
   const [c]=S.cols.splice(dragCol,1);S.cols.splice(to,0,c);flush();render();touch();toast('Графа перемещена')}});
 $$('tr[draggable="true"]',stage).forEach(tr=>{
  tr.ondragstart=e=>{if(e.target.closest('td[contenteditable]'))return;dragRow=+tr.dataset.row;e.dataTransfer.effectAllowed='move';tr.classList.add('dragging')};
  tr.ondragend=()=>{tr.classList.remove('dragging');dragRow=null;$$('tr',stage).forEach(x=>x.classList.remove('dragover'))};
  tr.ondragover=e=>{e.preventDefault();$$('tr',stage).forEach(x=>x.classList.remove('dragover'));tr.classList.add('dragover')};
  tr.ondrop=e=>{e.preventDefault();const to=+tr.dataset.row;if(dragRow==null||dragRow===to||isNaN(to))return;
   const [r]=S.rows.splice(dragRow,1);S.rows.splice(to,0,r);flush();render();touch();toast('Строка перемещена')}})}

/* ---------- Panel & tabs ---------- */
const U=Object.assign({bg:'gray',theme:'dark',scale:100,splash:true},(()=>{try{return JSON.parse(localStorage[LS+'_u'])}catch{return{}}})());
const saveU=()=>{try{localStorage[LS+'_u']=JSON.stringify(U)}catch{}};
const applyU=()=>{document.body.dataset.bg=U.bg;document.body.dataset.ui=U.theme;document.documentElement.style.setProperty('--ui',U.scale/100)};
let tab=innerWidth>900?'struct':'doc';
const TITLES={struct:'Структура документа',data:'Данные',check:'Проверка',tools:'Инструменты технолога',more:'Настройки'};
const LST={meta:['label','val'],cols:['name','w','kind'],rows:['label'],sigs:['role','name']};
const NEW={meta:()=>({label:'Реквизит',val:''}),cols:()=>C('Графа',15),rows:()=>({id:uid(),label:'Параметр'}),sigs:()=>({role:'Должность',name:''})};
const KINDS={num:'Номер',label:'Название строки',text:'Текст'};
const inp=(L,i,f,v)=>f==='kind'?`<select data-l="${L}|${i}|kind" aria-label="Тип">${Object.entries(KINDS).map(([k,n])=>`<option value="${k}"${k===v?' selected':''}>${n}</option>`).join('')}</select>`
 :`<input ${f==='w'?'type="number" class="w" min="3" max="100"':'spellcheck="true" lang="ru"'} data-l="${L}|${i}|${f}" value="${esc(v)}" aria-label="${f}">`;
const listH=L=>(S[L]||[]).map((x,i)=>`<div class="lr" draggable="true" data-list="${L}" data-i="${i}"><button data-a="up" data-list="${L}" data-i="${i}" aria-label="Выше">▲</button><button data-a="dn" data-list="${L}" data-i="${i}" aria-label="Ниже">▼</button>${LST[L].map(f=>inp(L,i,f,x[f])).join('')}<button data-a="del" data-list="${L}" data-i="${i}" aria-label="Удалить">✕</button></div>`).join('')+`<button data-a="add" data-list="${L}">+ Добавить</button>`;
const f=(l,k,t='text',x='')=>`<label>${l}</label><input data-b="${k}" type="${t}" ${x} ${t==='text'?'spellcheck="true" lang="ru"':''}>`;
const sec=(t,b)=>`<section class="sec"><h4>${t}</h4>${b}</section>`;
const opt=(arr,cur)=>arr.map(([v,n])=>`<option value="${v}"${v===cur?' selected':''}>${n}</option>`).join('');

const PRESET_NAMES={oil:'Фритюрные масла',temp:'Температура оборудования',sanit:'Санитарный контроль',blank:'Пустой лист',receive:'Приёмка сырья',cook:'Тепловая обработка',clean:'Уборка и дезинфекция',pest:'Дезинсекция / дератизация',health:'Здоровье персонала'};

function tabHTML(){const sheet=S.mode==='sheet';
 if(tab==='struct'){const lb=lib();return sec('Шаблоны',`<select id="tpl"><option value="">— выбрать шаблон —</option>${Object.keys(PRESETS).map(k=>`<option value="p:${k}">${PRESET_NAMES[k]||k}</option>`).join('')}${lb.map(t=>`<option value="u:${t.id}">${esc(t.name)}</option>`).join('')}</select><div class="row2" style="margin-top:8px"><button data-a="tsave">Сохранить как шаблон</button><button data-a="tdel">Удалить шаблон</button><button data-a="jin">Загрузить JSON</button><button data-a="jout">Скачать JSON</button></div>`)
  +sec('Документ',f('Организация','org')+f('Заголовок','title')+f('Служебная строка','tag')+'<label>Реквизиты шапки</label>'+listH('meta'))
  +sec('Графы таблицы',listH('cols')+'<p class="note">Перетаскивайте графы на листе за заголовок. Правый клик — меню. «Номер» нумерует, «Название строки» — подписи, «Текст» — запись.</p>')
  +(sheet?sec('Строки таблицы',listH('rows'))+sec('Регламент под таблицей','<textarea data-b="limits" rows="4" spellcheck="true" lang="ru"></textarea>')
   :sec('Размер журнала',`<div class="row2"><div>${f('Страниц','pages','number','min=1 max=200')}</div><div>${f('Строк на странице','rpp','number','min=1 max=60')}</div></div><button data-a="fit" style="margin-top:8px">Подобрать строки под лист</button>`))
  +sec('Подписи',listH('sigs'))}
 if(tab==='data')return sec('Образец данных',`<div class="row2"><div><label>От</label><input id="fmin" type="number" step="any" value="18"></div><div><label>До</label><input id="fmax" type="number" step="any" value="24"></div></div><button data-a="demofill" style="margin-top:8px">Заполнить образцом</button><p class="note">Если у графы заданы нормы — берётся её диапазон. Появится водяной знак «ОБРАЗЕЦ».</p>`)
  +sec(sheet?'Период':'Даты',`<label>Месяц</label><input type="month" id="fmonth" value="${new Date().toISOString().slice(0,7)}"><button data-a="dates" style="margin-top:8px">${sheet?'Вписать период в шапку':'Проставить даты по строкам'}</button>`)
  +sec('Нормы граф',(S.cols.map((c,i)=>c.kind==='text'?`<div class="lr"><span class="nm">${esc(c.name)}</span><input class="w" type="number" step="any" placeholder="мин" data-l="cols|${i}|min" value="${c.min??''}"><input class="w" type="number" step="any" placeholder="макс" data-l="cols|${i}|max" value="${c.max??''}"></div>`:'').join('')||'<p class="note">Нет текстовых граф.</p>')+'<p class="note">Значения вне нормы подсвечиваются красным.</p>')
  +sec('Найти и заменить',`<input id="rf" placeholder="Найти" spellcheck="true" lang="ru"><input id="rt" placeholder="Заменить на" style="margin-top:6px" spellcheck="true" lang="ru"><button data-a="replace" style="margin-top:8px">Заменить везде</button>`)
  +sec('Очистка','<button data-a="clr">Очистить введённые данные</button>');
 if(tab==='check')return sec('Состояние','<div id="stats" class="stat"></div>')+sec('Замечания','<div id="aud"></div><button data-a="recalc">Пересчитать страницы</button>')+sec('Орфография','<button data-a="spell">Проверить онлайн (LanguageTool)</button><p class="note">Текст уходит на languagetool.org. Подчёркивание ошибок работает офлайн.</p>');
 if(tab==='tools')return sec('Инструменты автора',`
  <div class="tools-grid">
   <a class="tool" href="https://smol0901-jpg.github.io/ph-metr/" target="_blank" rel="noopener">pH-CHECK PRO<br><small>Анализатор кислотности</small></a>
   <a class="tool" href="https://smol0901-jpg.github.io/calculator/" target="_blank" rel="noopener">DEFORM-1<br><small>Калькулятор ужарки</small></a>
   <a class="tool" href="https://smol0901-jpg.github.io/calculator-prod/" target="_blank" rel="noopener">Ужарка (карманный)<br><small>Быстрый расчёт</small></a>
   <a class="tool" href="https://haccp-control.netlify.app/" target="_blank" rel="noopener">HACCP Control<br><small>Enterprise Architect</small></a>
   <a class="tool" href="https://smol0901-jpg.github.io/Flowforge-2-3/" target="_blank" rel="noopener">FlowForge Studio<br><small>Блок-схемы процессов</small></a>
   <a class="tool" href="https://smol0901-jpg.github.io/school-planer/index.html" target="_blank" rel="noopener">Школьный планер<br><small>Расписание и заметки</small></a>
  </div>`)
  +sec('Связь с автором',`
  <p class="note" style="margin-bottom:10px"><b>NEURAL_ARCHITECT_PREMIUM++</b><br>Смолянинов Александр Вячеславович</p>
  <div class="row2">
   <a class="btn" href="https://t.me/ASV_prod" target="_blank" rel="noopener">Telegram @ASV_prod</a>
   <a class="btn" href="https://dzen.ru/asv_prod" target="_blank" rel="noopener">Дзен ASV_PROD</a>
  </div>
  <div class="row2" style="margin-top:8px">
   <a class="btn alt" href="https://vk.com/smolyaninovchef" target="_blank" rel="noopener">ВК smolyAninovchef</a>
   <a class="btn alt" href="https://github.com/smol0901-jpg" target="_blank" rel="noopener">GitHub</a>
  </div>
  <p class="note" style="margin-top:12px">Обратная связь, заказы доработок, внедрение на производстве — через Telegram.</p>`)
  +sec('Быстрые действия','<button data-a="backup">Полная резервная копия (БД)</button><button data-a="jin" style="margin-top:6px">Импорт JSON / шаблона</button>');
 if(tab==='more')return sec('Страница и печать',`<div class="row2"><div><label>Бумага</label><select data-b="paper">${opt([['A4','A4'],['A3','A3'],['A5','A5']],S.paper)}</select></div><div><label>Ориентация</label><select data-b="orient">${opt([['portrait','Книжная'],['landscape','Альбомная']],S.orient)}</select></div></div><div class="row2"><div>${f('Шрифт, pt','font','number','min=6 max=16 step=0.5')}</div><div>${f('Высота строки, мм','rowH','number','min=5 max=30')}</div></div>${f('Левое поле (прошивка), мм','mL','number','min=10 max=50')}<label class="chk"><input type="checkbox" data-b="demo"> Водяной знак «ОБРАЗЕЦ»</label>`)
  +sec('Рабочая область',`<label>Фон</label><select data-u="bg">${opt([['gray','Серый'],['dark','Тёмный'],['light','Светлый'],['blue','Синий'],['grid','Клетка']],U.bg)}</select><label>Тема интерфейса</label><select data-u="theme">${opt([['dark','Тёмная'],['light','Светлая']],U.theme)}</select><label>Размер интерфейса: ${U.scale}%</label><input type="range" min="85" max="130" step="5" data-u="scale" value="${U.scale}"><label class="chk"><input type="checkbox" data-u="splash"${U.splash?' checked':''}> Показывать заставку при запуске</label>`)
  +sec('Данные приложения','<div class="row2"><button data-a="backup">Резервная копия</button><button data-a="restore">Восстановить</button></div><button data-a="reset" style="margin-top:8px">Сбросить всё</button><p class="note">Всё хранится только в этом браузере / устройстве. Офлайн-режим полный.</p>')
  +sec('О приложении',`<p class="note"><b>HACCP Studio Pro v9</b><br>NEURAL_ARCHITECT_PREMIUM++ · ASV_PROD<br>Ctrl+Z / Ctrl+Y — отмена, Ctrl+S — JSON, Ctrl+P — печать.<br>Перетаскивание граф и строк, правый клик — контекстное меню.<br>Установка: меню браузера → «Установить приложение».</p>
  <button data-a="update" style="margin-top:8px">Проверить обновления</button>`);
 return ''}

const P=$('#panel');
function panel(){const st=P.scrollTop;if(tab==='doc'){P.innerHTML='';return}
 P.innerHTML=`<div class="sh"><span>${TITLES[tab]}</span><button data-a="close" aria-label="Закрыть">✕</button></div>`+tabHTML();
 $$('[data-b]',P).forEach(e=>{const v=S[e.dataset.b];e.type==='checkbox'?e.checked=!!v:e.value=v});P.scrollTop=st;audit()}
function setTab(t){tab=(tab===t&&t!=='doc')?'doc':t;document.body.classList.toggle('open',tab!=='doc');$$('.nav [data-t]').forEach(b=>b.classList.toggle('on',b.dataset.t===tab));P.scrollTop=0;panel()}
$$('.nav [data-t]').forEach(b=>b.onclick=()=>setTab(b.dataset.t));$('.nav [data-act=exp]').onclick=()=>$('#dlg').showModal();
$('#shade').onclick=()=>{if(tab!=='doc')setTab(tab)};
function full(){$$('.seg button').forEach(b=>b.classList.toggle('on',b.dataset.mode===S.mode));panel();render();updUndo()}

P.addEventListener('input',e=>{const t=e.target;
 if(t.dataset.b){const k=t.dataset.b,n=['font','rowH','mL','pages','rpp'].includes(k);if(n&&t.value==='')return;S[k]=t.type==='checkbox'?t.checked:n?num(t.value,+t.min||1,+t.max||999,S[k]):t.value;render();touch()}
 else if(t.dataset.l){const[L,i,k]=t.dataset.l.split('|');S[L][i][k]=k==='w'?num(t.value,3,100,15):(k==='min'||k==='max')?(t.value===''?null:num(t.value,-1e6,1e6,null)):t.value;render();touch()}
 else if(t.dataset.u){U[t.dataset.u]=t.type==='checkbox'?t.checked:t.dataset.u==='scale'?+t.value:t.value;saveU();applyU();if(t.dataset.u==='scale')t.previousElementSibling.textContent=`Размер интерфейса: ${U.scale}%`}});
const loadObj=o=>{if(o&&o.backup){if(Array.isArray(o.lib))localStorage[LS+'_lib']=JSON.stringify(o.lib.slice(0,200).filter(x=>x&&x.id&&x.state));if(o.settings)Object.assign(U,o.settings);saveU();applyU();flush();setState(norm(o.state),true);toast('Копия восстановлена')}else{flush();setState(norm(o),true);toast('Шаблон загружен')}};
P.addEventListener('change',e=>{const t=e.target;
 if(t.id==='tpl'&&t.value){const[a,k]=t.value.split(':');const s=a==='p'?PRESETS[k]():lib().find(x=>x.id===k)?.state;if(s){flush();setState(norm(s),true);toast('Шаблон загружен')}t.value=''}});
$('#jf').addEventListener('change',e=>{const t=e.target;if(!t.files[0])return;const r=new FileReader();r.onload=()=>{try{loadObj(JSON.parse(r.result))}catch(x){toast('Ошибка: '+x.message)}};r.readAsText(t.files[0]);t.value=''});
P.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,L=b.dataset.list,i=+b.dataset.i;
 if(a==='close')return setTab(tab);
 if(a==='add'){S[L].push(NEW[L]())}else if(a==='del'){if(L==='cols'&&S.cols.length<2)return toast('Нужна хотя бы одна графа');S[L].splice(i,1)}
 else if(a==='up'||a==='dn'){const j=i+(a==='up'?-1:1);if(j<0||j>=S[L].length)return;[S[L][i],S[L][j]]=[S[L][j],S[L][i]]}
 else if(a==='jin'||a==='restore')return $('#jf').click();else if(a==='jout')return exp.json();else if(a==='backup')return backup();
 else if(a==='tsave'){const n=prompt('Название шаблона');if(!n)return;const l=lib();l.push({id:uid(),name:n.slice(0,80),state:S});try{localStorage[LS+'_lib']=JSON.stringify(l)}catch{return toast('Нет места в памяти браузера')}panel();return toast('Шаблон сохранён')}
 else if(a==='tdel'){const v=$('#tpl').value;if(!v.startsWith('u:'))return toast('Выберите свой шаблон в списке');if(confirm('Удалить шаблон?')){localStorage[LS+'_lib']=JSON.stringify(lib().filter(x=>'u:'+x.id!==v));panel()}return}
 else if(a==='fit'){S.rpp=maxRows();flush();panel();toast(`Строк на странице: ${S.rpp}`)}
 else if(a==='demofill')return demo();else if(a==='dates')return dates($('#fmonth').value);
 else if(a==='replace'){const n=replaceAll($('#rf').value,$('#rt').value);if(n){panel();render();touch()}return toast(n?`Заменено: ${n}`:'Совпадений нет')}
 else if(a==='clr'){if(confirm('Удалить все введённые значения в таблицах?')){S.cells={};render();touch();toast('Данные очищены')}return}
 else if(a==='recalc'){render();return toast('Страницы пересчитаны')}
 else if(a==='spell')return spell();
 else if(a==='update')return checkUpdate(true);
 else if(a==='reset'){if(confirm('Удалить все шаблоны, настройки и текущий документ?')){Object.keys(localStorage).filter(k=>k.startsWith(LS)).forEach(k=>localStorage.removeItem(k));location.reload()}return}
 else return;
 if(['add','del','up','dn'].includes(a)){flush();panel()}render();touch()});
stage.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;
 if(b.dataset.a==='addrow'){S.rows.push({id:uid(),label:'Параметр'});toast('Строка добавлена')}else if(b.dataset.a==='addpage'){S.pages=Math.min(200,S.pages+1);toast(`Страниц в журнале: ${S.pages}`)}else return;
 flush();if(tab!=='doc')panel();render();touch()});

let needRepag=false;
stage.addEventListener('focusout',e=>{if(!e.relatedTarget&&needRepag){needRepag=false;render()}});
function maxRows(){const[,H]=dim().map(Number),hdr=S.meta.length?16+Math.ceil(S.meta.length/2)*7:8;return Math.max(1,Math.floor((H-34-14-hdr-8)/S.rowH))}
function demo(){const g1=parseFloat($('#fmin')?.value),g2=parseFloat($('#fmax')?.value),skip=/подпис|откл|мер|оценк|метод|дат|качеств/i,cs=S.cols.filter(c=>c.kind==='text'&&!skip.test(c.name));let n=0;
 const fill=(k,c)=>{const a=c.min??g1,b=c.max??g2;if(!isFinite(a)||!isFinite(b)||b<a)return;S.cells[k]=(a+Math.random()*(b-a)).toFixed(1);n++};
 S.mode==='sheet'?S.rows.forEach(r=>cs.forEach(c=>fill(`${r.id}|${c.id}`,c))):[...Array(S.pages)].forEach((_,p)=>[...Array(S.rpp)].forEach((_,i)=>cs.forEach(c=>fill(`${p+1}|${i}|${c.id}`,c))));
 if(!n)return toast('Укажите диапазон «От–До» или нормы граф');S.demo=true;flush();render();touch();toast(`Заполнено ячеек: ${n}. Включён знак «ОБРАЗЕЦ»`)}
const MONTHS=['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
function dates(m){if(!m)return toast('Выберите месяц');const[y,mo]=m.split('-').map(Number);
 if(S.mode==='sheet'){const mf=S.meta.find(x=>/период|дат/i.test(x.label));if(!mf)return toast('В шапке нет поля «Период» или «Дата»');mf.val=`${MONTHS[mo-1]} ${y}`;flush();render();touch();return toast('Период вписан')}
 const dc=S.cols.find(c=>c.kind==='text'&&/дат/i.test(c.name));if(!dc)return toast('Нет графы с названием «Дата»');
 const days=new Date(y,mo,0).getDate();let d=0;for(let p=1;p<=S.pages;p++)for(let i=0;i<S.rpp;i++){d++;const k=`${p}|${i}|${dc.id}`;d<=days?S.cells[k]=`${String(d).padStart(2,'0')}.${String(mo).padStart(2,'0')}.${y}`:delete S.cells[k]}
 flush();render();touch();toast(`Проставлено дат: ${Math.min(days,S.pages*S.rpp)}`)}
function replaceAll(a,b){if(!a)return 0;const re=new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');let n=0;const r=s=>String(s).replace(re,()=>{n++;return b});
 ['org','title','tag','limits'].forEach(k=>S[k]=r(S[k]));S.meta.forEach(m=>{m.label=r(m.label);m.val=r(m.val)});S.rows.forEach(x=>x.label=r(x.label));S.cols.forEach(c=>c.name=r(c.name));S.sigs.forEach(s=>{s.role=r(s.role);s.name=r(s.name)});for(const k in S.cells)S.cells[k]=r(S.cells[k]);flush();return n}
function backup(){flush();dl(new Blob([JSON.stringify({backup:1,v:9,state:S,lib:lib(),settings:U,ts:new Date().toISOString()},null,2)],{type:'application/json'}),'haccp-studio-backup-v9.json');toast('Полная резервная копия скачана')}

function audit(){const out=[],w=S.cols.reduce((a,c)=>a+c.w,0);let over=0;
 $$('.pg').forEach((p,i)=>{const b=$('.bd',p),o=b.scrollHeight>b.clientHeight+1;p.classList.toggle('over',o);if(o){over++;out.push(`Страница ${i+1} не помещается на лист ${S.paper} — уменьшите шрифт или высоту строк`)}});
 needRepag=S.mode==='sheet'&&over>0;
 if(Math.round(w)!==100)out.push(`Сумма ширин граф ${Math.round(w)}% (будет приведена к 100%)`);
 if(!S.org.trim()||!S.title.trim())out.push('Не заполнены организация или заголовок');
 if(!S.sigs.length)out.push('Нет строк подписей');if(S.font<8)out.push('Шрифт меньше 8 pt трудно читать на печати');
 if(S.mode==='sheet'&&!S.cols.some(c=>c.kind==='label'))out.push('Нет графы типа «Название строки» — подписи строк не видны');
 const txt=[S.org,S.title,S.tag,S.limits,...S.rows.map(r=>r.label)].join('\n');
 if(/ {2,}/.test(txt))out.push('Двойные пробелы в тексте');if(/\s[,.;:!?]/.test(txt))out.push('Пробел перед знаком препинания');if(/"/.test(txt))out.push('Прямые кавычки: лучше «ёлочки»');
 const tc=S.cols.filter(c=>c.kind==='text'),colOf=k=>S.cols.find(c=>c.id===k.split('|').pop());
 const vals=Object.entries(S.cells).filter(([k,v])=>v&&colOf(k)?.kind==='text'),bad=vals.filter(([k,v])=>badVal(colOf(k),v)).length;
 if(bad)out.push(`Значений вне нормы: ${bad} (подсвечены красным)`);
 const cap=tc.length*(S.mode==='sheet'?S.rows.length:S.pages*S.rpp),fill=Math.min(vals.length,cap);
 const nb=$('#nbadge');nb.textContent=out.length;nb.hidden=!out.length;
 const el=$('#aud');if(el)el.innerHTML=out.length?out.map(x=>`<div class="iss w">⚠ ${esc(x)}</div>`).join(''):'<div class="iss o">✓ Замечаний нет, всё помещается на лист</div>';
 const st=$('#stats');if(st)st.innerHTML=`<div><b>${$$('.pg').length}</b>страниц</div><div><b>${cap?Math.round(fill/cap*100):0}%</b>заполнено</div><div><b>${bad}</b>вне нормы</div>`}
async function spell(){const txt=[S.org,S.title,S.tag,S.limits,...S.meta.map(m=>m.label),...S.cols.map(c=>c.name),...S.rows.map(r=>r.label),...S.sigs.map(s=>s.role)].join('\n').slice(0,19000);
 if(!navigator.onLine)return toast('Онлайн-проверка требует интернет');toast('Проверяю…',8000);
 try{const r=await fetch('https://api.languagetool.org/v2/check',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({text:txt,language:'ru-RU'})});const j=await r.json();
  const m=j.matches.slice(0,15);$('#aud').innerHTML=m.length?m.map(x=>`<div class="iss w">✎ «${esc(txt.substr(x.offset,x.length))}» — ${esc(x.message)}${x.replacements[0]?` → ${esc(x.replacements[0].value)}`:''}</div>`).join(''):'<div class="iss o">✓ Ошибок не найдено</div>';toast(`Найдено: ${j.matches.length}`)}catch{toast('Сервис проверки недоступен')}}

const CDN='https://cdn.jsdelivr.net/npm/',LIBS={h2c:['vendor/html2canvas.min.js',CDN+'html2canvas@1.4.1/dist/html2canvas.min.js'],pdf:['vendor/jspdf.umd.min.js',CDN+'jspdf@2.5.1/dist/jspdf.umd.min.js'],xlsx:['vendor/xlsx.full.min.js',CDN+'xlsx@0.18.5/dist/xlsx.full.min.js']},CHK={h2c:'html2canvas',pdf:'jspdf',xlsx:'XLSX'};
const load=k=>window[CHK[k]]?Promise.resolve():LIBS[k].reduce((p,u)=>p.catch(()=>new Promise((ok,no)=>{const s=document.createElement('script');s.src=u;s.crossOrigin='anonymous';s.onload=()=>window[CHK[k]]?ok():no();s.onerror=()=>{s.remove();no()};document.head.append(s)})),Promise.reject()).catch(()=>{throw Error('Не удалось загрузить библиотеку. Нужен интернет при первом экспорте')});
const dl=(blob,name)=>{const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)};
const fname=()=>(S.title||'haccp').replace(/[^\p{L}\p{N}]+/gu,'_').slice(0,40);
async function shots(){await load('h2c');const z=zoom;setZoom(1);flush();await sleep(60);const out=[];for(const p of $$('.pg'))out.push(await html2canvas(p,{scale:2,backgroundColor:'#fff',ignoreElements:el=>el.classList?.contains('noprint')}));setZoom(z);return out}
async function buildPdf(){const c=await shots();await load('pdf');const L=S.orient==='landscape',[w,h]=dim(),fm=S.paper.toLowerCase(),d=new window.jspdf.jsPDF({orientation:L?'l':'p',unit:'mm',format:fm,compress:true});c.forEach((x,i)=>{if(i)d.addPage(fm,L?'l':'p');d.addImage(x.toDataURL('image/jpeg',.92),'JPEG',0,0,w,h)});return d}
const exp={
 async pdf(){toast('Собираю PDF…',9000);(await buildPdf()).save(fname()+'.pdf');toast('PDF готов')},
 async share(){toast('Готовлю PDF…',9000);const d=await buildPdf(),f=new File([d.output('blob')],fname()+'.pdf',{type:'application/pdf'});if(navigator.canShare?.({files:[f]}))try{await navigator.share({files:[f],title:S.title})}catch{}else{d.save(fname()+'.pdf');toast('Отправка недоступна, PDF сохранён')}},
 async png(){toast('Собираю PNG…',9000);const c=await shots();for(let i=0;i<c.length;i++){const b=await new Promise(r=>c[i].toBlob(r));dl(b,`${fname()}_${i+1}.png`);await sleep(350)}toast('PNG готов')},
 async xlsx(){await load('xlsx');const m=[[S.tag],[S.title],[],...S.meta.map(x=>[x.label+':',x.val]),[],S.cols.map(c=>c.name)],head=m.length;
  const rowsOf=(p,n)=>{for(let i=0;i<n;i++)m.push(S.cols.map(c=>c.kind==='num'?(S.mode==='sheet'?i+1:(p-1)*n+i+1):c.kind==='label'&&S.mode==='sheet'?S.rows[i].label:S.cells[S.mode==='sheet'?`${S.rows[i].id}|${c.id}`:`${p}|${i}|${c.id}`]||''))};
  S.mode==='sheet'?rowsOf(1,S.rows.length):[...Array(S.pages)].forEach((_,p)=>rowsOf(p+1,S.rpp));
  S.sigs.forEach((s,i)=>{if(!i)m.push([]);m.push([s.role+':','',s.name])});const ws=XLSX.utils.aoa_to_sheet(m),n=S.cols.length-1;
  ws['!cols']=S.cols.map(c=>({wch:Math.max(8,Math.round(c.w*.6))}));ws['!merges']=[{s:{r:0,c:0},e:{r:0,c:n}},{s:{r:1,c:0},e:{r:1,c:n}}];
  ws['!pageSetup']={orientation:S.orient,paperSize:({A4:9,A3:8,A5:11})[S.paper]||9,fitToWidth:1,fitToHeight:0};ws['!views']=[{state:'frozen',ySplit:head}];
  const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'HACCP');XLSX.writeFile(wb,fname()+'.xlsx');toast('Excel готов')},
 doc(){const L=S.orient==='landscape',h=`<html xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><style>@page{size:${S.paper} ${S.orient};margin:15mm 12mm 15mm ${S.mL}mm}body{font-family:'Times New Roman';font-size:11pt}table{border-collapse:collapse;width:100%}td,th{border:1px solid #000;padding:4px;text-align:center}.pg{page-break-after:always}.wm,.ft{display:none}.meta div{display:block}</style></head><body>${stage.innerHTML.replace(/ contenteditable/g,'').replace(/<button class="noprint[\s\S]*?<\/button>/g,'')}</body></html>`;
  dl(new Blob(['\ufeff'+h],{type:'application/msword'}),fname()+'.doc')},
 json(){flush();dl(new Blob([JSON.stringify(S,null,2)],{type:'application/json'}),fname()+'.json');toast('JSON сохранён')},
 print(){const o=$$('.pg.over').length;if(o&&!confirm(`${o} стр. не помещаются на лист и будут обрезаны. Печатать всё равно?`))return;flush();window.print()}};
const dlg=$('#dlg');
dlg.addEventListener('click',async e=>{const x=e.target.dataset?.x;if(!x)return;dlg.close();if(x==='close')return;try{await exp[x]()}catch(er){toast(er.message,4500)}});

let zoom=1;const pw=()=>dim()[0]*3.7795;
function setZoom(z){zoom=Math.min(3,Math.max(.25,z));stage.style.zoom=zoom;try{localStorage[LS+'_z']=zoom}catch{}}
const fit=()=>setZoom((view.clientWidth-(innerWidth<900?20:44))/pw());
$('#zIn').onclick=()=>setZoom(zoom*1.15);$('#zOut').onclick=()=>setZoom(zoom/1.15);$('#zFit').onclick=fit;
view.addEventListener('wheel',e=>{if(e.ctrlKey){e.preventDefault();setZoom(zoom*(e.deltaY<0?1.08:.93))}},{passive:false});
const ptr=new Map();let d0=0,z0=1;
view.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'){ptr.set(e.pointerId,e);if(ptr.size===2){const[a,b]=[...ptr.values()];d0=Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);z0=zoom}}});
view.addEventListener('pointermove',e=>{if(!ptr.has(e.pointerId))return;ptr.set(e.pointerId,e);if(ptr.size===2){const[a,b]=[...ptr.values()];setZoom(z0*Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)/d0)}});
['pointerup','pointercancel'].forEach(t=>view.addEventListener(t,e=>ptr.delete(e.pointerId)));
$$('.seg button').forEach(b=>b.onclick=()=>{if(S.mode===b.dataset.mode)return;flush();S.mode=b.dataset.mode;full();touch()});
$('#bUndo').onclick=undo;$('#bRedo').onclick=redo;
$('#bUpdate').onclick=()=>checkUpdate(true);

async function checkUpdate(manual){
 if(!navigator.onLine){if(manual)toast('Нет сети — обновление недоступно');return}
 try{
  if(manual)toast('Проверяю обновления…');
  if('serviceWorker'in navigator){
   const reg=await navigator.serviceWorker.getRegistration();
   if(reg){await reg.update();
    if(reg.waiting){reg.waiting.postMessage({type:'SKIP_WAITING'});toast('Обновление найдено. Перезагрузите страницу',5000);return}
    if(manual)toast('У вас актуальная версия')}
  }else if(manual)toast('Service Worker недоступен')
 }catch(e){if(manual)toast('Ошибка проверки обновлений')}}

addEventListener('keydown',e=>{if(!(e.ctrlKey||e.metaKey))return;const k=e.key.toLowerCase(),inField=e.target.closest?.('input,textarea,[contenteditable]');
 if(k==='s'){e.preventDefault();exp.json()}else if(k==='p'){e.preventDefault();exp.print()}else if(!inField&&k==='z'){e.preventDefault();e.shiftKey?redo():undo()}else if(!inField&&k==='y'){e.preventDefault();redo()}});
addEventListener('beforeunload',flush);addEventListener('resize',()=>{if(innerWidth<900&&zoom>1.2)fit()});
addEventListener('online',()=>{toast('Связь восстановлена');checkUpdate(false)});addEventListener('offline',()=>toast('Нет сети — работаем офлайн'));

let ip;addEventListener('beforeinstallprompt',e=>{e.preventDefault();ip=e;$('#bInstall').hidden=false});
$('#bInstall').onclick=async()=>{if(ip){ip.prompt();await ip.userChoice;ip=null;$('#bInstall').hidden=true}};
addEventListener('appinstalled',()=>{$('#bInstall').hidden=true;toast('Приложение установлено')});
if(/iphone|ipad/i.test(navigator.userAgent)&&!navigator.standalone)setTimeout(()=>toast('Установка: «Поделиться» → «На экран Домой»',6000),2500);
if('serviceWorker'in navigator)addEventListener('load',()=>{const had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had)toast('Приложение обновлено. Перезапустите для применения',6000)});navigator.serviceWorker.register('sw.js').catch(()=>{});(window.requestIdleCallback||setTimeout)(()=>['h2c','pdf','xlsx'].forEach(k=>load(k).catch(()=>{})));setTimeout(()=>checkUpdate(false),4000)});

const st=document.createElement('style');st.id='pgsz';document.head.append(st);
try{S=norm(JSON.parse(localStorage[LS]))}catch{try{S=norm(JSON.parse(localStorage['haccp_studio_v6']||'null'))}catch{S=norm(PRESETS.oil())}}
applyU();last=JSON.stringify(S);document.body.classList.toggle('open',tab!=='doc');$$('.nav [data-t]').forEach(b=>b.classList.toggle('on',b.dataset.t===tab));full();let z=+localStorage[LS+'_z'];z?setZoom(z):fit();

stage.addEventListener('keydown',e=>{if(e.key!=='Enter'||e.shiftKey||e.isComposing)return;const td=e.target.closest?.('td[contenteditable]');if(!td)return;e.preventDefault();
 const tr=td.parentElement,i=[...tr.children].indexOf(td),nt=tr.nextElementSibling?.children[i];if(nt?.isContentEditable){nt.focus();const r=document.createRange();r.selectNodeContents(nt);const s=getSelection();s.removeAllRanges();s.addRange(r)}});
const netEl=$('#net'),updNet=()=>{const on=navigator.onLine;netEl.classList.toggle('off',!on);netEl.lastChild.textContent=on?'онлайн':'офлайн'};
addEventListener('online',updNet);addEventListener('offline',updNet);updNet();
window.__appReady=true;
