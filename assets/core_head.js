/* 인공지능을 위한 수학 — 공통 도구(그림·끌기·미션·별). 유클리드 공간 해설의 도구를 이어 씀 */
'use strict';
var NS='http://www.w3.org/2000/svg';
var C={teal:'#0f8f84',orange:'#e8731a',navy:'#1e2f6e',blue:'#2458d6',green:'#13733a',red:'#c9302c',grid:'#e3e8ee',axis:'#1e2f6e',muted:'#5b6874'};
function el(tag,a,parent){var e=document.createElementNS(NS,tag);for(var k in a){if(a[k]!=null)e.setAttribute(k,a[k]);}if(parent)parent.appendChild(e);return e;}
function txt(parent,x,y,s,a){a=a||{};var t=el('text',Object.assign({x:x,y:y,'font-size':a.size||14,fill:a.fill||C.navy,'font-family':a.font||'"Cambria Math","Times New Roman",serif','font-style':a.italic===false?'normal':'italic','text-anchor':a.anchor||'start','font-weight':a.weight||'normal'},{}),parent);t.textContent=s;return t;}
function ktxt(parent,x,y,s,a){a=a||{};a.font='"IBM Plex Sans KR","Malgun Gothic","Noto Sans KR",sans-serif';a.italic=false;return txt(parent,x,y,s,a);}
function r2(v){return Math.round(v*100)/100;}
function r1(v){return Math.round(v*10)/10;}
function fmt(v,d){d=d==null?2:d;var s=(Math.round(v*Math.pow(10,d))/Math.pow(10,d)).toFixed(d);if(s.indexOf('.')>=0)s=s.replace(/\.?0+$/,'');if(s==='-0')s='0';return s;}
function num(v){return v<0?'−'+fmt(-v):fmt(v);}
function svgOf(host,W,H){host.innerHTML='';var s=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':'실험 패널 그림: '+(function(){var n=host.parentNode&&host.parentNode.querySelector('.ph small');return n?n.textContent:'';})()},host);var d=el('defs',{},s);
  ['teal','orange','navy','blue','green','red'].forEach(function(c){var m=el('marker',{id:'ah-'+c+'-'+host.id,viewBox:'0 0 10 10',refX:8.5,refY:5,markerWidth:7,markerHeight:7,orient:'auto-start-reverse'},d);el('path',{d:'M0,0 L10,5 L0,10 z',fill:C[c]},m);});
  s._id=host.id;return s;}
function arrow(s,x1,y1,x2,y2,c,w){return el('line',{x1:x1,y1:y1,x2:x2,y2:y2,stroke:C[c],'stroke-width':w||3,'marker-end':'url(#ah-'+c+'-'+s._id+')'},s);}
function dash(s,x1,y1,x2,y2,c){return el('line',{x1:x1,y1:y1,x2:x2,y2:y2,stroke:C[c]||c,'stroke-width':1.6,'stroke-dasharray':'5 4'},s);}
/* 좌표평면 */
function plane(s,o){var W=o.W,H=o.H,p=o.pad||36;var sx=(W-2*p)/(o.x1-o.x0),sy=(H-2*p)/(o.y1-o.y0);
  if(o.equal){var k=Math.min(sx,sy);sx=sy=k;}
  var ox=p-o.x0*sx,oy=H-p+o.y0*sy;s._sx=sx;
  var P={X:function(x){return ox+x*sx;},Y:function(y){return oy-y*sy;},inv:function(px,py){return[(px-ox)/sx,(oy-py)/sy];},sx:sx,sy:sy};
  var g=el('g',{},s);var st=o.step||1;
  if(o.grid!==false){for(var x=Math.ceil(o.x0/st)*st;x<=o.x1+1e-9;x+=st)el('line',{x1:P.X(x),y1:P.Y(o.y0),x2:P.X(x),y2:P.Y(o.y1),stroke:C.grid},g);
  for(var y=Math.ceil(o.y0/st)*st;y<=o.y1+1e-9;y+=st)el('line',{x1:P.X(o.x0),y1:P.Y(y),x2:P.X(o.x1),y2:P.Y(y),stroke:C.grid},g);}
  var ax0=Math.max(o.x0,Math.min(0,o.x1)),ay0=Math.max(o.y0,Math.min(0,o.y1));
  if(o.ax!==undefined)ax0=o.ax;if(o.ay!==undefined)ay0=o.ay;
  el('line',{x1:P.X(o.x0),y1:P.Y(ay0),x2:P.X(o.x1)+14,y2:P.Y(ay0),stroke:C.axis,'stroke-width':2,'marker-end':'url(#ah-navy-'+s._id+')'},g);
  el('line',{x1:P.X(ax0),y1:P.Y(o.y0),x2:P.X(ax0),y2:P.Y(o.y1)-14,stroke:C.axis,'stroke-width':2,'marker-end':'url(#ah-navy-'+s._id+')'},g);
  if(/[^\x00-\x7f]/.test((o.xl||'')+(o.yl||''))){ktxt(g,P.X(o.x1)+14,P.Y(ay0)-12,o.xl,{size:13,anchor:'end'});ktxt(g,P.X(ax0)+12,P.Y(o.y1)-2,o.yl,{size:13});}else{txt(g,P.X(o.x1)+10,P.Y(ay0)+20,o.xl||'x',{size:16});txt(g,P.X(ax0)-22,P.Y(o.y1)-8,o.yl||'y',{size:16});}
  var ls=o.label||st;
  if(o.ticks!==false){for(var a=Math.ceil(o.x0/ls)*ls;a<=o.x1+1e-9;a+=ls){if(Math.abs(a-ax0)<1e-9&&!o.zeroX)continue;txt(g,P.X(a),P.Y(ay0)+18,fmt(a),{size:12.5,anchor:'middle',italic:false,fill:C.muted});}
  for(var b=Math.ceil(o.y0/ls)*ls;b<=o.y1+1e-9;b+=ls){if(Math.abs(b-ay0)<1e-9)continue;txt(g,P.X(ax0)-8,P.Y(b)+4,fmt(b),{size:12.5,anchor:'end',italic:false,fill:C.muted});}
  if(o.x0<=0&&o.y0<=0)txt(g,P.X(0)-14,P.Y(0)+18,'0',{size:12.5,italic:false,fill:C.muted});}
  return P;}
/* 끌기 */
function drag(s,node,onMove){var on=false;var host=s.parentNode;var idx=s.querySelectorAll('g.drag').length;
  node.setAttribute('tabindex','0');node.setAttribute('role','slider');node.setAttribute('aria-label','끌어서 옮기는 점 (화살표 키로도 움직입니다)');
  node.addEventListener('keydown',function(e){var k={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(!k)return;e.preventDefault();
    var c=node.querySelector('circle');var st=(s._sx||24)*(+(host.dataset.ksnap||1));host.dataset.kf=idx;onMove(+c.getAttribute('cx')+k[0]*st,+c.getAttribute('cy')+k[1]*st);});
  function pt(e){var m=s.getScreenCTM().inverse();var q=s.createSVGPoint();q.x=e.clientX;q.y=e.clientY;q=q.matrixTransform(m);return q;}
  node.classList.add('drag');
  node.addEventListener('pointerdown',function(e){on=true;node.setPointerCapture(e.pointerId);e.preventDefault();});
  node.addEventListener('pointermove',function(e){if(!on)return;var q=pt(e);onMove(q.x,q.y);});
  node.addEventListener('pointerup',function(){on=false;});node.addEventListener('pointercancel',function(){on=false;});
  if(host.dataset.kf!=null&&+host.dataset.kf===idx)node.focus({preventScroll:true});}
function handle(s,x,y,c,label){var g=el('g',{},s);el('circle',{cx:x,cy:y,r:16,fill:C[c],'fill-opacity':.14},g);el('circle',{cx:x,cy:y,r:8,fill:C[c],stroke:'#fff','stroke-width':2},g);return g;}
function dot(s,x,y,c,r){return el('circle',{cx:x,cy:y,r:r||6,fill:C[c]||c,stroke:'#fff','stroke-width':1.5},s);}
function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
function snap(v,st){return Math.round(v/st)*st;}
function readout(host){var d=host.parentNode.querySelector('.readout');return d;}
function rightMark(s,x,y,ux,uy,vx,vy,k){k=k||10;el('path',{d:'M'+(x+ux*k)+','+(y+uy*k)+' L'+(x+ux*k+vx*k)+','+(y+uy*k+vy*k)+' L'+(x+vx*k)+','+(y+vy*k),fill:'none',stroke:C.orange,'stroke-width':1.5},s);}
var P={};
var DATA=__DATA__;
function mean(a){var s=0;for(var i=0;i<a.length;i++)s+=a[i];return s/a.length;}
function sd(a){var m=mean(a),s=0;for(var i=0;i<a.length;i++)s+=(a[i]-m)*(a[i]-m);return Math.sqrt(s/a.length);}
function median(a){var b=a.slice().sort(function(x,y){return x-y;}),n=b.length;return n%2?b[(n-1)/2]:(b[n/2-1]+b[n/2])/2;}
function quart(a,q){var b=a.slice().sort(function(x,y){return x-y;}),n=b.length,pos=(n-1)*q,lo=Math.floor(pos),hi=Math.ceil(pos);return b[lo]+(b[hi]-b[lo])*(pos-lo);}
function corr(x,y){var mx=mean(x),my=mean(y),a=0,b=0,c=0;for(var i=0;i<x.length;i++){a+=(x[i]-mx)*(y[i]-my);b+=(x[i]-mx)*(x[i]-mx);c+=(y[i]-my)*(y[i]-my);}return a/Math.sqrt(b*c);}
function cov(x,y){var mx=mean(x),my=mean(y),a=0;for(var i=0;i<x.length;i++)a+=(x[i]-mx)*(y[i]-my);return a/x.length;}
function rng(seed){var s=seed>>>0;return function(){s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
function ctrlOf(host){return host.parentNode.querySelector('.ctrl');}
function q$(host,sel){return host.parentNode.querySelector(sel);}
function live(host,html){var r=readout(host);if(r)r.innerHTML=html;}
/* ===== 미션과 별 ===== */
var SKEY='mfa_lab_stars_v1';
function loadStars(){try{return JSON.parse(localStorage.getItem(SKEY)||'{}');}catch(e){return {};}}
function saveStars(o){try{localStorage.setItem(SKEY,JSON.stringify(o));}catch(e){}}
function mission(host,i){var pn=host.closest('.panel');if(!pn)return;var li=pn.querySelector('.missions li[data-m="'+i+'"]');if(!li||li.classList.contains('done'))return;
  li.classList.add('done');var key=pn.getAttribute('data-dash');var all=loadStars();var a=all[key]||[0,0,0];a[i]=1;all[key]=a;saveStars(all);judge(pn);}
function judge(pn){var n=pn.querySelectorAll('.missions li.done').length;var j=pn.querySelector('.judge');if(!j)return;
  j.querySelector('.st').textContent='★★★'.slice(0,n)+'☆☆☆'.slice(0,3-n);
  var msg=j.getAttribute('data-m'+n);if(msg)j.querySelector('.msg').textContent=msg;
  if(n>=2){var ms=pn.querySelector('.missions');if(ms)ms.classList.add('showhard');}
  if(n>=1){var sec=pn.closest('section');var nx=sec&&sec.querySelector('.next a.go');if(nx)nx.classList.add('lit');}}
function restoreStars(){var all=loadStars();document.querySelectorAll('.panel[data-dash]').forEach(function(pn){var a=all[pn.getAttribute('data-dash')];if(!a)return;
  a.forEach(function(v,i){if(v){var li=pn.querySelector('.missions li[data-m="'+i+'"]');if(li){li.classList.add('done');li.title='이전에 완료한 미션';}}});judge(pn);});}
