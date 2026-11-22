/* ===== 실전 연습장 — 사업장 3곳 ===== */
function ncdf(x){var t=1/(1+0.2316419*Math.abs(x)),d=0.3989423*Math.exp(-x*x/2),p=d*t*(0.3193815+t*(-0.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));return x>0?1-p:p;}
function lfact(k){var s=0;for(var i=2;i<=k;i++)s+=Math.log(i);return s;}
function nPdf(x){return Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);}
function gauss(R){var u=Math.max(R(),1e-12),v=R();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}
function lineChart(host,o){var W=560,H=260,pad=44;var s=svgOf(host,W,H);var x0=o.x0,x1=o.x1,y0=o.y0,y1=o.y1;
  function X(v){return pad+(v-x0)/(x1-x0)*(W-pad-14);}function Y(v){return H-30-(v-y0)/(y1-y0||1)*(H-50);}
  el('line',{x1:pad,y1:H-30,x2:W-10,y2:H-30,stroke:C.navy,'stroke-width':1.5},s);el('line',{x1:pad,y1:H-30,x2:pad,y2:14,stroke:C.navy,'stroke-width':1.5},s);
  ktxt(s,W-10,H-8,o.xl,{size:12,anchor:'end',fill:C.muted});ktxt(s,pad+4,14,o.yl,{size:12,fill:C.muted});
  (o.ticks||[]).forEach(function(t){txt(s,X(t),H-16,fmt(t,2),{size:11,anchor:'middle',italic:false,fill:C.muted});});
  (o.series||[]).forEach(function(se){var d='';se.xs.forEach(function(x,i){var y=clamp(se.ys[i],y0,y1);d+=(i?'L':'M')+X(x)+','+Y(y);});el('path',{d:d,fill:'none',stroke:se.c,'stroke-width':2.5,'stroke-dasharray':se.dash||''},s);if(se.label)ktxt(s,X(se.xs[se.xs.length-1])-4,Y(clamp(se.ys[se.ys.length-1],y0,y1))-6,se.label,{size:12,anchor:'end',fill:se.c});});
  (o.bars||[]).forEach(function(b){var bw=(W-pad-14)/(x1-x0)*0.8;el('rect',{x:X(b[0])-bw/2,y:Y(b[1]),width:bw,height:Y(y0)-Y(b[1]),fill:b[2]||'#cfe9e5',stroke:C.teal},s);});
  (o.vlines||[]).forEach(function(v){el('line',{x1:X(v[0]),y1:14,x2:X(v[0]),y2:H-30,stroke:v[1],'stroke-width':2,'stroke-dasharray':v[2]||''},s);ktxt(s,X(v[0])+4,26+(v[4]||0),v[3],{size:12,fill:v[1]});});
  (o.dots||[]).forEach(function(d){dot(s,X(d[0]),Y(clamp(d[1],y0,y1)),d[2],6);});return s;}
function board(host,items){var b=panelOf(host).querySelector('.score');b.innerHTML=items.map(function(it){return '<div class="sc '+(it[2]?'good':'bad')+'"><span>'+it[0]+'</span><b>'+it[1]+'</b></div>';}).join('');}
function says(host,lines){var t=panelOf(host).querySelector('.ptalk');t.innerHTML=lines.map(function(l){return '<div class="line"><img src="../assets/chars/'+l[0]+'_'+l[1]+'.webp" alt="" aria-hidden="true" data-who="'+l[0]+'" width="44" height="44"><div class="bub"><b style="color:var(--c-'+({doctor:'doc',haru:'asst',fruitfly:'fly',jupanbot:'robo'})[l[0]]+')">'+({doctor:'박사',haru:'조수 하루',fruitfly:'초파리 연구원',jupanbot:'주판봇'})[l[0]]+'</b>'+l[2]+'</div></div>';}).join('');}
function won(v){return fmt(Math.round(v/1000)*1000/10000,1)+'만 원';}

/* --- 장면 1: 불량 검사 공장 --- */
P.factory=function(host){var ct=ctrlOf(host);var ip=ct.querySelector('[name=prev]'),it=ct.querySelector('[name=thr]');var touched=false,p0=+ip.value,trapSeen=false;
  var N=10000,MISS=50000,FALSE=5000,SH=2.2;
  function stat(t,p){var rec=1-ncdf(t-SH),fpr=1-ncdf(t);var tp=p*rec,fp=(1-p)*fpr;return {rec:rec,fpr:fpr,prec:tp+fp>0?tp/(tp+fp):0,acc:p*rec+(1-p)*(1-fpr),cost:N*(p*(1-rec)*MISS+(1-p)*fpr*FALSE),flag:N*(tp+fp)};}
  [ip,it].forEach(function(i){i.addEventListener('input',function(){touched=true;draw();});});
  function draw(){var p=+ip.value/100,t=+it.value;var S=stat(t,p);var ts=[],cs=[],best={c:Infinity},bestAcc=0;for(var x=-1;x<=5.0001;x+=0.05){var q=stat(x,p);ts.push(x);cs.push(q.cost/10000);if(q.cost<best.c)best={c:q.cost,t:x};if(q.acc>bestAcc)bestAcc=q.acc;}
    var g1=panelOf(host).querySelector('.g1'),g2=panelOf(host).querySelector('.g2');var xs=[],ya=[],yb=[];for(x=-3;x<=6;x+=0.1){xs.push(x);ya.push(nPdf(x));yb.push(nPdf(x-SH));}
    lineChart(g1,{x0:-3,x1:6,y0:0,y1:0.45,xl:'검사 점수',yl:'분포 모양',ticks:[-2,0,2,4],series:[{xs:xs,ys:ya,c:C.teal,label:'정상품'},{xs:xs,ys:yb,c:C.red,label:'불량품'}],vlines:[[t,C.navy,'','임계값']]});
    lineChart(g2,{x0:-1,x1:5,y0:0,y1:Math.max.apply(0,cs.slice(10)),xl:'임계값',yl:'하루 손실(만 원)',ticks:[0,1,2,3,4],series:[{xs:ts,ys:cs,c:C.orange}],vlines:[[best.t,C.green,'4 4','최소',0],[t,C.navy,'','내 선택',14]]});
    board(host,[['정밀도(경보 중 진짜 불량)',fmt(100*S.prec,1)+'%',S.prec>=0.5],['재현율(불량 중 잡은 것)',fmt(100*S.rec,1)+'%',S.rec>=0.8],['정확도',fmt(100*S.acc,2)+'%',true],['하루 손실',won(S.cost),S.cost<=best.c*1.02]]);
    var near=S.cost<=best.c*1.02;
    says(host,[['haru','e07','하루 '+N.toLocaleString()+'개 검사 중 경보 '+Math.round(S.flag)+'개, 놓친 불량 약 '+Math.round(N*p*(1-S.rec))+'개입니다. 손실은 '+won(S.cost)+', 가장 적을 때는 '+won(best.c)+'입니다.'],
      ['fruitfly','e09',S.acc>=bestAcc-0.0005&&!near?'정확도가 최고인데 손실이 왜 이렇게 커? 놓친 불량 한 개가 5만 원이잖아.':'불량률을 바꿔 봐. 같은 임계값이 계속 좋을까?'],
      ['jupanbot','e16','정확도가 제일 높은 임계값이 무조건 정답이죠!'],
      ['doctor',near?'e10':'e08',near?'좋아요. 이 공장 조건에서는 손실이 가장 적은 자리입니다.':'임계값은 정확도가 아니라 "어느 실수가 더 비싼가"로 정합니다.']]);
    if(!touched)return;if(S.acc>=bestAcc-0.0005&&S.cost>best.c*1.1)trapSeen=true;if(near)mission(host,0);if(trapSeen)mission(host,1);if(Math.abs(+ip.value-p0)>=1&&near)mission(host,2);}
  draw();};

/* --- 장면 2: 콜센터 --- */
P.callcenter=function(host){var ct=ctrlOf(host);var il=ct.querySelector('[name=lam]'),ic=ct.querySelector('[name=agents]');var touched=false,l0=+il.value,trapSeen=false;var PER=3,WAGE=20000,LOST=15000;
  function pmf(k,l){return Math.exp(-l+k*Math.log(l)-lfact(k));}
  function stat(c,l){var cap=PER*c,miss=0,serv=0;for(var k=0;k<=80;k++){var q=pmf(k,l);if(k<=cap)serv+=q;else miss+=(k-cap)*q;}return {miss:miss,serv:serv,cost:WAGE*c+LOST*miss};}
  [il,ic].forEach(function(i){i.addEventListener('input',function(){touched=true;draw();});});
  function draw(){var l=+il.value,c=+ic.value;var S=stat(c,l);var cs=[],xs=[],best={c:Infinity};for(var a=1;a<=15;a++){var q=stat(a,l);xs.push(a);cs.push(q.cost/10000);if(q.cost<best.c)best={c:q.cost,a:a};}
    var bars=[];for(var k=0;k<=40;k++)bars.push([k,pmf(k,l),k<=PER*c?'#cfe9e5':'#f6c9c6']);
    lineChart(panelOf(host).querySelector('.g1'),{x0:-1,x1:41,y0:0,y1:Math.max.apply(0,bars.map(function(b){return b[1];}))*1.15,xl:'한 시간 전화 수',yl:'확률',ticks:[0,10,20,30,40],bars:bars,vlines:[[PER*c+0.5,C.navy,'','처리 한도']]});
    lineChart(panelOf(host).querySelector('.g2'),{x0:1,x1:15,y0:0,y1:Math.max.apply(0,cs),xl:'상담원 수',yl:'시간당 비용(만 원)',ticks:[2,4,6,8,10,12,14],series:[{xs:xs,ys:cs,c:C.orange}],dots:[[c,S.cost/10000,'navy']],vlines:[[best.a,C.green,'4 4','최소']]});
    var near=S.cost<=best.c*1.001;var naive=Math.ceil(l/PER);
    board(host,[['놓친 전화(시간당)',fmt(S.miss,1)+'통',S.miss<1],['서비스 수준(다 받을 확률)',fmt(100*S.serv,1)+'%',S.serv>=0.8],['상담원',c+'명',true],['시간당 비용',won(S.cost),near]]);
    says(host,[['haru','e07','평균 '+l+'통일 때 상담원 '+c+'명이면 놓친 전화가 시간당 '+fmt(S.miss,1)+'통, 비용 '+won(S.cost)+'입니다. 가장 쌀 때는 '+best.a+'명, '+won(best.c)+'입니다.'],
      ['fruitfly','e09',c===naive&&S.serv<0.85?'평균만큼만 뽑았네. 전화는 평균보다 많이 오는 시간이 절반 가까이 되는걸?':'막대 그래프의 빨간 부분이 넘친 전화야. 꼬리를 봐.'],
      ['jupanbot','e16','평균 '+l+'통 ÷ 3통 = '+naive+'명! 계산 끝이죠!'],
      ['doctor',near?'e10':'e08',near?'좋아요. 평균이 아니라 분포의 꼬리까지 본 선택입니다.':'포아송 분포는 평균 둘레로 흩어집니다. 흩어짐까지 비용에 넣으세요.']]);
    if(!touched)return;if(c===naive&&S.serv<0.85)trapSeen=true;if(near)mission(host,0);if(trapSeen)mission(host,1);if(Math.abs(l-l0)>=3&&near)mission(host,2);}
  draw();};

/* --- 장면 3: 광고 예산 분석 (겹치는 특성과 릿지) --- */
P.ads=function(host){var ct=ctrlOf(host);var ir=ct.querySelector('[name=rho]'),ik=ct.querySelector('[name=lam]');var touched=false,r0=+ir.value,trapSeen=false;var NT=25,NV=15,B1=3,B2=2;
  function data(rho){var R=rng(2026),X=[],y=[];for(var i=0;i<NT+NV;i++){var a=gauss(R),z=gauss(R),b=rho*a+Math.sqrt(1-rho*rho)*z;X.push([a,b]);y.push(B1*a+B2*b+2.5*gauss(R));}return {X:X,y:y};}
  function fit(D,lam){var s11=0,s12=0,s22=0,s1y=0,s2y=0,my=0,m1=0,m2=0;for(var i=0;i<NT;i++){m1+=D.X[i][0];m2+=D.X[i][1];my+=D.y[i];}m1/=NT;m2/=NT;my/=NT;
    for(i=0;i<NT;i++){var a=D.X[i][0]-m1,b=D.X[i][1]-m2,c=D.y[i]-my;s11+=a*a;s12+=a*b;s22+=b*b;s1y+=a*c;s2y+=b*c;}var A=s11+lam,Bm=s12,Cm=s22+lam,det=A*Cm-Bm*Bm;var w1=(Cm*s1y-Bm*s2y)/det,w2=(A*s2y-Bm*s1y)/det;
    function rm(lo,hi){var e=0;for(var j=lo;j<hi;j++){var pr=my+w1*(D.X[j][0]-m1)+w2*(D.X[j][1]-m2);e+=(pr-D.y[j])*(pr-D.y[j]);}return Math.sqrt(e/(hi-lo));}return {w1:w1,w2:w2,tr:rm(0,NT),va:rm(NT,NT+NV)};}
  [ir,ik].forEach(function(i){i.addEventListener('input',function(){touched=true;draw();});});
  function draw(){var rho=+ir.value,lam=+ik.value;var D=data(rho);var S=fit(D,lam);var ls=[],w1s=[],w2s=[],vs=[],best={v:Infinity};for(var k=0;k<=40.0001;k+=0.5){var q=fit(D,k);ls.push(k);w1s.push(q.w1);w2s.push(q.w2);vs.push(q.va);if(q.va<best.v)best={v:q.va,k:k};}
    var lo=Math.min(-1,Math.min.apply(0,w1s.concat(w2s))),hi=Math.max(5,Math.max.apply(0,w1s.concat(w2s)));
    lineChart(panelOf(host).querySelector('.g1'),{x0:0,x1:40,y0:lo,y1:hi,xl:'λ (릿지)',yl:'계수',ticks:[0,10,20,30,40],series:[{xs:ls,ys:w1s,c:C.blue,label:'TV'},{xs:ls,ys:w2s,c:C.green,label:'온라인'},{xs:[0,40],ys:[B1,B1],c:C.blue,dash:'3 4'},{xs:[0,40],ys:[B2,B2],c:C.green,dash:'3 4'}],vlines:[[lam,C.navy,'','내 λ']]});
    lineChart(panelOf(host).querySelector('.g2'),{x0:0,x1:40,y0:Math.min.apply(0,vs)*0.95,y1:Math.max.apply(0,vs)*1.03,xl:'λ (릿지)',yl:'검증 오차',ticks:[0,10,20,30,40],series:[{xs:ls,ys:vs,c:C.orange}],dots:[[lam,S.va,'navy']],vlines:[[best.k,C.green,'4 4','최소']]});
    var near=S.va<=best.v*1.01,off=Math.max(Math.abs(S.w1-B1),Math.abs(S.w2-B2));
    board(host,[['TV 계수 (진짜 3)',fmt(S.w1,2),Math.abs(S.w1-B1)<1],['온라인 계수 (진짜 2)',fmt(S.w2,2),Math.abs(S.w2-B2)<1],['학습 오차',fmt(S.tr,2),true],['검증 오차',fmt(S.va,2),near]]);
    says(host,[['haru','e07','두 채널의 겹침(상관) '+rho+', λ = '+lam+'에서 검증 오차 '+fmt(S.va,2)+'입니다. 가장 작을 때는 λ = '+best.k+', '+fmt(best.v,2)+'입니다.'],
      ['fruitfly','e09',off>1?'계수가 진짜 값(3과 2)에서 많이 벗어났어. 두 채널이 같이 움직이면 누가 매출을 올렸는지 가리기 어려워.':'겹침을 0.99까지 올리고 λ를 0으로 해 봐.'],
      ['jupanbot','e16','학습 오차가 제일 작은 λ = 0이 최고 아닌가요?'],
      ['doctor',near?'e10':'e08',near?'좋아요. λ는 학습 오차가 아니라 검증 오차로 고릅니다.':'학습 데이터에서만 잘 맞는 계수는 다음 분기에 틀립니다. 검증 오차를 보세요.']]);
    if(!touched)return;if(lam===0&&rho>=0.95&&off>1)trapSeen=true;if(near&&lam>0)mission(host,0);if(trapSeen)mission(host,1);if(rho<=0.5&&Math.abs(rho-r0)>=0.3&&near)mission(host,2);}
  draw();};

/* --- 탭 --- */
function tabs(){document.querySelectorAll('.ctrlset input[type=range]').forEach(function(i){var o=document.createElement('b');o.className='tn';o.style.cssText='display:inline;min-width:3em';o.textContent=i.value;i.after(o);i.addEventListener('input',function(){o.textContent=i.value;});});var bs=document.querySelectorAll('.ptabs button'),ps=document.querySelectorAll('.scene');function go(id){ps.forEach(function(p){p.hidden=p.id!==id;});bs.forEach(function(b){b.classList.toggle('on',b.getAttribute('data-tab')===id);});}
  bs.forEach(function(b){b.addEventListener('click',function(){var id=b.getAttribute('data-tab');go(id);try{history.replaceState(null,'','#'+id);}catch(e){}});});
  var h=(location.hash||'').slice(1);go(document.getElementById(h)&&document.getElementById(h).classList.contains('scene')?h:ps[0].id);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',tabs);else tabs();
