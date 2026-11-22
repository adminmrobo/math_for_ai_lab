/* ===== 퀴즈 ===== */
function quiz(q){var ans=+q.getAttribute('data-ans');var fb=q.querySelector('.fb');var OK=q.querySelector('.qok'),NO=q.querySelector('.qno');q.querySelectorAll('.opts button').forEach(function(b,i){b.addEventListener('click',function(){q.querySelectorAll('.opts button').forEach(function(x){x.classList.remove('ok','no');});b.classList.add(i===ans?'ok':'no');fb.innerHTML=i===ans?'⭕ '+(OK?OK.innerHTML:q.getAttribute('data-ok')):'❌ '+(NO?NO.innerHTML:q.getAttribute('data-no'));});});}

/* ===== 지식 색인·꾸러미 ===== */
function kg(){var raw=document.getElementById('kg-raw');var mount=document.getElementById('kg-mount');if(!raw||!mount)return;var K=JSON.parse(raw.textContent);
  mount.innerHTML='<input class="kg-search" type="search"><div class="kg-list"></div>';
  var list=mount.querySelector('.kg-list'),inp=mount.querySelector('input');inp.placeholder='개념 찾기 (예: 행렬, 베이즈, 경사하강)';inp.setAttribute('aria-label','지식 색인 검색');
  var TY={Concept:'개념',Method:'방법',Analogy:'비유',Application:'쓰임',OpenQuestion:'열린 질문'};
  var LG=(document.documentElement.lang||'ko').slice(0,2);function L_(o){return o?(o[LG]||o.en||o.ko||''):'';}
  K.nodes.forEach(function(n){if(n.desc&&!n.definition)n.definition={ko:n.desc};});
  function render(){var q=inp.value.trim().toLowerCase();list.innerHTML=K.nodes.filter(function(n){return !q||(L_(n.label)+' '+n.label.en+' '+n.label.ko+' '+L_(n.definition)).toLowerCase().indexOf(q)>=0;}).map(function(n){
    var nb=K.edges.filter(function(e){return e.s===n.id||e.o===n.id;}).map(function(e){var o=e.s===n.id?e.o:e.s;var m=K.nodes.filter(function(x){return x.id===o;})[0];return m?L_(m.label):'';}).filter(Boolean);
    return '<div class="kg-item"><span class="t">'+(TY[n.type]||n.type)+'</span><b>'+L_(n.label)+'</b><span class="muted">'+(LG==='en'?'':n.label.en)+'</span><div>'+L_(n.definition)+'</div>'+(nb.length?'<div class="muted" style="font-size:12.5px">이웃: '+nb.join(', ')+'</div>':'')+'<a href="'+(n.page?n.page+'.html':'')+n.anchor+'">설명 보러 가기 →</a></div>';}).join('');}
  inp.addEventListener('input',render);render();
  var ex=document.getElementById('export-mount');if(!ex)return;
  ex.innerHTML='<div class="exp-btns"><button class="btn" data-x="json">kg.json</button><button class="btn" data-x="ld">JSON-LD</button><button class="btn" data-x="ttl">Turtle (Protégé)</button><button class="btn" data-x="csv">CSV (Neo4j·Gephi)</button><button class="btn" data-x="bib">BibTeX</button><button class="btn" data-x="ris">RIS</button></div>';
  function dl(name,text,type){var b=new Blob([text],{type:type||'text/plain'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},500);}
  var base=K.page;var refs=JSON.parse((document.getElementById('refs-csl')||{textContent:'[]'}).textContent);
  ex.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){var x=b.getAttribute('data-x');
    if(x==='json')dl(base+'.kg.json',JSON.stringify(K,null,2),'application/json');
    if(x==='ld')dl(base+'.jsonld',document.getElementById('kg-ld').textContent,'application/ld+json');
    if(x==='ttl'){var t='@prefix lab: <urn:lab:> .\n@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n@prefix skos: <http://www.w3.org/2004/02/skos/core#> .\n\n';
      K.nodes.forEach(function(n){t+='<urn:'+n.id+'> a lab:'+n.type+' ;\n  skos:prefLabel "'+n.label.ko+'"@ko , "'+n.label.en+'"@en ;\n  rdfs:comment "'+L_(n.definition).replace(/"/g,'\\"')+'"@ko .\n\n';});
      K.edges.forEach(function(e){t+='<urn:'+e.s+'> lab:'+e.p+' <urn:'+e.o+'> .\n';});dl(base+'.ttl',t,'text/turtle');}
    if(x==='csv'){var c='id,type,label_ko,label_en,anchor\n'+K.nodes.map(function(n){return [n.id,n.type,n.label.ko,n.label.en,(n.page||base)+'.html'+n.anchor].map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(',');}).join('\n');
      c+='\n\nsource,relation,target\n'+K.edges.map(function(e){return [e.s,e.p,e.o].join(',');}).join('\n');dl(base+'.csv',c,'text/csv');}
    if(x==='bib')dl(base+'.bib',refs.map(function(r){return '@misc{'+r.id+',\n  title = {'+r.title+'},\n  author = {'+r.author[0].literal+'},\n  howpublished = {'+(r.note||'')+'},\n  note = {accessed '+r.accessed['date-parts'][0].join('-')+'}\n}';}).join('\n\n'));
    if(x==='ris')dl(base+'.ris',refs.map(function(r){return 'TY  - GEN\nTI  - '+r.title+'\nAU  - '+r.author[0].literal+'\nN1  - '+(r.note||'')+'\nER  - ';}).join('\n'));});});}


/* ===== 대결 (6장) ===== */
function duels(){document.querySelectorAll('.duel').forEach(function(d){var cfg=JSON.parse(d.querySelector('.duel-cfg').textContent);var key=d.getAttribute('data-duel');var guess=null;
  var res=d.querySelector('.duel-res'),imgs=d.querySelectorAll('.duel-head img');var base=[].map.call(imgs,function(i){return i.getAttribute('src');});
  d.querySelectorAll('[data-guess]').forEach(function(b){b.addEventListener('click',function(){guess=b.getAttribute('data-guess');d.querySelectorAll('[data-guess]').forEach(function(x){x.classList.toggle('on',x===b);});});});
  d.querySelector('[data-act=show]').addEventListener('click',function(){var r=DUELCALC[key]();var lv=r.l,rv=r.r;var lw=isFinite(lv)?lv:Infinity,rw=isFinite(rv)?rv:Infinity;var leftWins=lw<rw;
    var mx=Math.max(isFinite(lv)?lv:0,isFinite(rv)?rv:0)||1;function bar(name,v){return '<div class="bar"><div>'+name+'</div><i style="width:'+(isFinite(v)?Math.max(6,100*v/mx):100)+'%;'+(isFinite(v)?'':'background:var(--red)')+'"></i><b>'+(isFinite(v)?fmt(v,r.d)+r.unit:'발산')+'</b><div class="hint">'+r.what+'</div></div>';}
    d.querySelector('.bars').innerHTML=bar(cfg.lname,lv)+bar(cfg.rname,rv);
    var g=guess?(((guess==='L')===leftWins)?' 먼저 맞혀 보기는 정답이었어요!':' 먼저 맞혀 보기와는 다른 결과네요.'):'';
    d.querySelector('.say-haru').textContent=cfg.lname+' '+(isFinite(lv)?fmt(lv,r.d)+r.unit:'발산(숫자가 폭발)')+', '+cfg.rname+' '+(isFinite(rv)?fmt(rv,r.d)+r.unit:'발산(숫자가 폭발)')+'입니다.'+g;
    var who={F:'초파리 승.',R:'주판봇 승.',M:'이번 판은 모아 승.'}[cfg.win];d.querySelector('.say-doc').textContent=cfg.lesson+'. '+who;
    imgs[0].setAttribute('src',base[0].replace(/_e\d+\./,leftWins?'_e16.':'_e14.'));imgs[1].setAttribute('src',base[1].replace(/_e\d+\./,leftWins?'_e14.':'_e16.'));res.hidden=false;});
  d.querySelector('[data-act=close]').addEventListener('click',function(){res.hidden=true;guess=null;d.querySelectorAll('[data-guess]').forEach(function(x){x.classList.remove('on');});imgs.forEach(function(im,i){im.setAttribute('src',base[i]);});});});}

/* ===== 용어 말풍선(11-2)과 도우미(11-4) ===== */
function terms(){var el=document.getElementById('terms');if(!el)return;var T=JSON.parse(el.textContent),keys=Object.keys(T).sort(function(a,b){return b.length-a.length;});
  var tip=document.createElement('div');tip.id='termtip';tip.hidden=true;document.body.appendChild(tip);
  document.querySelectorAll('section').forEach(function(sec){if(sec.id==='kg'||sec.id==='export')return;var done={};
    var w=document.createTreeWalker(sec,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode;if(!p||p.closest('button,h1,h2,h3,h4,nav,svg,.panel,.quiz,summary,script,.term,.fx,.formula-live,.mat,a'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT;}});
    var nodes=[];while(w.nextNode())nodes.push(w.currentNode);
    nodes.forEach(function(n){keys.forEach(function(k){if(done[k]||!n.parentNode)return;var i=n.nodeValue.indexOf(k);if(i<0)return;done[k]=1;
      var after=n.splitText(i);after.splitText(k.length);var sp=document.createElement('span');sp.className='term';sp.setAttribute('tabindex','0');sp.setAttribute('data-t',T[k]);sp.setAttribute('data-auto','1');sp.textContent=k;after.parentNode.replaceChild(sp,after);n=sp.nextSibling||n;});});});
  function show(e){var t=e.target.closest('.term');if(!t||document.body.classList.contains('terms-off'))return;tip.textContent=t.textContent+' — '+t.getAttribute('data-t');tip.hidden=false;var r=t.getBoundingClientRect();tip.style.left=Math.max(8,Math.min(window.innerWidth-290,r.left))+'px';tip.style.top=(r.bottom+6)+'px';}
  function hide(){tip.hidden=true;}
  document.addEventListener('mouseover',show);document.addEventListener('focusin',show);document.addEventListener('click',function(e){if(e.target.closest('.term'))show(e);else hide();});
  document.addEventListener('mouseout',function(e){if(e.target.closest('.term'))hide();});window.addEventListener('scroll',hide,{passive:true});document.addEventListener('keydown',function(e){if(e.key==='Escape')hide();});
  var h=document.createElement('div');h.id='helper';h.setAttribute('aria-live','polite');document.body.appendChild(h);var off=false;
  function upd(){var d=document.documentElement,pc=Math.round(100*d.scrollTop/Math.max(1,d.scrollHeight-d.clientHeight));var N=document.querySelectorAll('.quiz').length,ok=document.querySelectorAll('.quiz button.ok').length;
    h.innerHTML='읽은 곳 '+pc+'% · 퀴즈 '+ok+'/'+N+'<button type="button">밑줄: '+(off?'끔':'핵심')+'</button>';h.querySelector('button').onclick=function(){off=!off;document.body.classList.toggle('terms-off',off);upd();};}
  window.addEventListener('scroll',upd,{passive:true});document.addEventListener('click',function(){setTimeout(upd,0);});upd();}

function boot(){document.querySelectorAll('[data-panel]').forEach(function(h){var k=h.getAttribute('data-panel');if(P[k]){try{P[k](h);}catch(e){if(window.console)console.error(k,e);}}});
  document.querySelectorAll('.quiz').forEach(quiz);kg();restoreStars();duels();terms();
  var pr=document.getElementById('prog');if(pr)window.addEventListener('scroll',function(){var d=document.documentElement;pr.style.width=(100*d.scrollTop/Math.max(1,d.scrollHeight-d.clientHeight))+'%';},{passive:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
