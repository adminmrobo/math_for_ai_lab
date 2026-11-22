/* ===== 2부 실습 대시보드 ===== */
var PL=DATA.perch.map(function(p){return p[0];}),PH=DATA.perch.map(function(p){return p[1];}),PW=DATA.perch.map(function(p){return p[2];});

/* --- 6장: 생선 통계판 --- */
P.stats=function(host){var ct=ctrlOf(host);var out=false,z=false,fence=false;
  ct.querySelector('[data-act=out]').addEventListener('click',function(e){out=!out;e.target.classList.toggle('on',out);draw();});
  ct.querySelector('[data-act=z]').addEventListener('click',function(e){z=!z;e.target.classList.toggle('on',z);draw();});
  ct.querySelector('[data-act=fence]').addEventListener('click',function(e){fence=!fence;e.target.classList.toggle('on',fence);draw();});
  function draw(){var a=PL.slice();if(out)a.push(150);var m=mean(a),md=median(a),q1=quart(a,.25),q3=quart(a,.75),s_=sd(a),iqr=q3-q1,hi=q3+1.5*iqr,lo=q1-1.5*iqr;
    var vals=z?a.map(function(v){return (v-m)/s_;}):a;var x0=z?Math.floor(Math.min.apply(0,vals))-0.5:0,x1=z?Math.ceil(Math.max.apply(0,vals))+0.5:(out?160:50);
    var s=svgOf(host,640,260);var W=640,pad=40;function X(v){return pad+(v-x0)/(x1-x0)*(W-2*pad);}
    el('line',{x1:X(x0),y1:200,x2:X(x1),y2:200,stroke:C.navy,'stroke-width':2},s);
    var st=z?1:(out?20:5);for(var t=Math.ceil(x0/st)*st;t<=x1;t+=st){el('line',{x1:X(t),y1:196,x2:X(t),y2:204,stroke:C.navy},s);txt(s,X(t),222,fmt(t,1),{size:12,anchor:'middle',italic:false,fill:C.muted});}
    ktxt(s,W-pad,244,z?'z점수 (평균 0, 표준편차 1)':'길이 (cm)',{size:12.5,anchor:'end',fill:C.muted});
    var cnt={};vals.forEach(function(v,i){var k=Math.round(X(v)/8);cnt[k]=(cnt[k]||0)+1;var isO=fence&&(a[i]>hi||a[i]<lo);dot(s,X(v),186-(cnt[k]-1)*12,isO?'red':'teal',isO?8:5);});
    var T=function(v){return z?(v-m)/s_:v;};var by=70;
    el('rect',{x:X(T(q1)),y:by-16,width:Math.max(1,X(T(q3))-X(T(q1))),height:32,fill:'#e8eefc',stroke:C.navy},s);
    el('line',{x1:X(T(md)),y1:by-16,x2:X(T(md)),y2:by+16,stroke:C.navy,'stroke-width':3},s);
    el('line',{x1:X(T(Math.min.apply(0,a))),y1:by,x2:X(T(q1)),y2:by,stroke:C.navy},s);el('line',{x1:X(T(q3)),y1:by,x2:X(T(Math.max.apply(0,a))),y2:by,stroke:C.navy},s);
    el('line',{x1:X(T(m)),y1:by-30,x2:X(T(m)),y2:by+30,stroke:C.orange,'stroke-width':3,'stroke-dasharray':'6 4'},s);ktxt(s,X(T(m))+4,by-32,'평균',{size:12,fill:C.orange});
    ktxt(s,X(T(md))+4,by+30,'중앙값',{size:12,fill:C.navy});
    if(fence){el('line',{x1:X(T(hi)),y1:20,x2:X(T(hi)),y2:200,stroke:C.red,'stroke-dasharray':'3 3'},s);ktxt(s,X(T(hi))+3,32,'Q3 + 1.5×IQR',{size:11.5,fill:C.red});}
    var nOut=a.filter(function(v){return v>hi||v<lo;}).length;
    live(host,'생선 '+a.length+'마리 · 평균 <b>'+fmt(m,1)+'cm</b> · 중앙값 <b>'+fmt(md,1)+'cm</b> · 표준편차 '+fmt(s_,1)+'cm · Q1 '+fmt(q1,1)+' · Q3 '+fmt(q3,1)+' · IQR '+fmt(iqr,1)+
      (out?'<br><span class="bad">150cm 생선(15.0을 잘못 친 값) 한 마리가 들어오자 평균이 '+fmt(m-mean(PL),1)+'cm 움직였고, 중앙값은 '+fmt(md-median(PL),2)+'cm만 움직였습니다.</span>':'')+
      (z?'<br>표준화: 모든 값에서 평균을 빼고 표준편차로 나눴습니다 → 평균 0, 표준편차 1.':'')+(fence?'<br>IQR 규칙으로 표시한 이상치: '+nOut+'마리 (빨간 점)':''));
    if(out)mission(host,0);if(z)mission(host,1);if(out&&fence&&nOut>=1)mission(host,2);}
  draw();};

/* --- 7장: 겹치는 정보 찾기 --- */
P.corr=function(host){var ct=ctrlOf(host);var V={L:['길이(cm)',PL],H:['높이(cm)',PH],W:['무게(g)',PW],B:['입고 날짜(일)',DATA.bday]};var pair=['L','H'],cosOn=false,touched=false;
  ct.querySelectorAll('[data-pair]').forEach(function(b){b.addEventListener('click',function(){pair=b.getAttribute('data-pair').split('');touched=true;ct.querySelectorAll('[data-pair]').forEach(function(x){x.classList.toggle('on',x===b);});draw();});});
  ct.querySelector('[data-act=cos]').addEventListener('click',function(e){cosOn=true;e.target.classList.add('on');draw();});
  function draw(){var x=V[pair[0]][1],y=V[pair[1]][1];var r=corr(x,y),cv=cov(x,y);
    var s=svgOf(host,560,360);var xmin=Math.min.apply(0,x),xmax=Math.max.apply(0,x),ymin=Math.min.apply(0,y),ymax=Math.max.apply(0,y);
    var pad=50;function X(v){return pad+(v-xmin)/(xmax-xmin||1)*(560-2*pad);}function Y(v){return 360-pad-(v-ymin)/(ymax-ymin||1)*(360-2*pad);}
    el('line',{x1:pad-10,y1:360-pad+10,x2:560-pad+10,y2:360-pad+10,stroke:C.navy,'stroke-width':2},s);el('line',{x1:pad-10,y1:360-pad+10,x2:pad-10,y2:pad-10,stroke:C.navy,'stroke-width':2},s);
    ktxt(s,560-pad,360-pad+32,V[pair[0]][0],{size:13,anchor:'end',fill:C.muted});ktxt(s,pad-6,pad-16,V[pair[1]][0],{size:13,fill:C.muted});
    var mx=mean(x),my=mean(y);dash(s,X(mx),pad-10,X(mx),360-pad+10,'muted');dash(s,pad-10,Y(my),560-pad+10,Y(my),'muted');
    x.forEach(function(v,i){var q=(v-mx)*(y[i]-my);dot(s,X(v),Y(y[i]),q>=0?'blue':'orange',6);});
    var dx=x.map(function(v){return v-mx;}),dy=y.map(function(v){return v-my;});var dd=0,na=0,nb=0;for(var i=0;i<dx.length;i++){dd+=dx[i]*dy[i];na+=dx[i]*dx[i];nb+=dy[i]*dy[i];}var cs=dd/Math.sqrt(na*nb);
    live(host,'공분산 Cov = '+fmt(cv,2)+' (단위: '+V[pair[0]][0].replace(/.*\(|\)/g,'')+' × '+V[pair[1]][0].replace(/.*\(|\)/g,'')+') · 상관계수 r = <b>'+fmt(r,3)+'</b>'+
      '<br><span class="hint">파란 점: 두 값이 함께 평균보다 크거나 함께 작음(곱이 +) · 주황 점: 엇갈림(곱이 −)</span>'+
      (cosOn?'<div class="formula-live">평균을 뺀 두 벡터의 코사인 = Σ(dx·dy) / (‖dx‖‖dy‖) = '+fmt(dd,1)+' / ('+fmt(Math.sqrt(na),2)+' × '+fmt(Math.sqrt(nb),2)+') = <b>'+fmt(cs,3)+'</b> → 상관계수와 같습니다 (L2)</div>':''));
    if(touched&&Math.abs(r)>0.9)mission(host,0);if(pair.indexOf('B')>=0&&Math.abs(r)<0.2)mission(host,1);if(cosOn&&Math.abs(cs-r)<1e-9)mission(host,2);}
  draw();};

/* --- 8장: 방향 돌리기 (PCA) --- */
P.pca=function(host){var ct=ctrlOf(host);var ang=ct.querySelector('[name=ang]');var eig=false;
  var mx=mean(PL),sx=sd(PL),my=mean(PH),sy=sd(PH);var Z=PL.map(function(v,i){return[(v-mx)/sx,(PH[i]-my)/sy];});var r=corr(PL,PH),l1=1+r,l2=1-r;
  ang.addEventListener('input',draw);ct.querySelector('[data-act=eig]').addEventListener('click',function(e){eig=true;e.target.classList.add('on');draw();mission(host,1);});
  function draw(){var t=+ang.value*Math.PI/180,u=[Math.cos(t),Math.sin(t)];var s=svgOf(host,520,420);var Pp=plane(s,{W:520,H:420,x0:-2.6,x1:2.6,y0:-2.1,y1:2.1,step:1,equal:true,xl:'길이(z)',yl:'높이(z)'});
    el('line',{x1:Pp.X(-3*u[0]),y1:Pp.Y(-3*u[1]),x2:Pp.X(3*u[0]),y2:Pp.Y(3*u[1]),stroke:C.orange,'stroke-width':3},s);
    var pr=Z.map(function(p){return p[0]*u[0]+p[1]*u[1];});
    Z.forEach(function(p,i){var q=[pr[i]*u[0],pr[i]*u[1]];el('line',{x1:Pp.X(p[0]),y1:Pp.Y(p[1]),x2:Pp.X(q[0]),y2:Pp.Y(q[1]),stroke:'#c9d3dd'},s);dot(s,Pp.X(p[0]),Pp.Y(p[1]),'teal',5);dot(s,Pp.X(q[0]),Pp.Y(q[1]),'orange',3.5);});
    if(eig){arrow(s,Pp.X(0),Pp.Y(0),Pp.X(Math.SQRT1_2*1.8),Pp.Y(Math.SQRT1_2*1.8),'blue',4);arrow(s,Pp.X(0),Pp.Y(0),Pp.X(-Math.SQRT1_2*0.6),Pp.Y(Math.SQRT1_2*0.6),'green',4);
      ktxt(s,Pp.X(1.35)+6,Pp.Y(1.35),'고유벡터 ① (λ₁ = '+fmt(l1,3)+')',{size:12.5,fill:C.blue});ktxt(s,Pp.X(-0.5)-4,Pp.Y(0.5)-8,'② (λ₂ = '+fmt(l2,3)+')',{size:12.5,fill:C.green,anchor:'end'});}
    var v=0;pr.forEach(function(p){v+=p*p;});v/=pr.length;
    live(host,'방향 '+ang.value+'° 로 비춘 그림자(주황 점)의 퍼짐(분산) = <b>'+fmt(v,3)+'</b> · 전체 퍼짐 '+fmt(l1+l2,3)+'의 <b>'+fmt(100*v/(l1+l2),1)+'%</b>'+
      '<br><span class="hint">두 특성을 표준화했기 때문에 전체 퍼짐은 1 + 1 = 2입니다. 그림자 하나로 몇 %의 정보를 남기는지 보세요.</span>'+(eig?'<div class="formula-live">공분산 행렬 [1 '+fmt(r,3)+' ; '+fmt(r,3)+' 1] → 고유값 λ₁ = 1 + r = '+fmt(l1,3)+', λ₂ = 1 − r = '+fmt(l2,3)+' · 첫 방향이 '+fmt(100*l1/2,1)+'%를 설명</div>':''));
    if(v>=0.98*l1)mission(host,0);if(v<=l2+0.01)mission(host,2);}
  draw();};

/* --- 9장: 확률 통 --- */
P.prob=function(host){var ct=ctrlOf(host);var nb=ct.querySelector('[name=nb]'),ns=ct.querySelector('[name=ns]');var draws=0,hit=0,R=rng(42);
  [nb,ns].forEach(function(i){i.addEventListener('input',function(){draws=0;hit=0;draw();});});
  ct.querySelectorAll('[data-n]').forEach(function(b){b.addEventListener('click',function(){var n=+b.getAttribute('data-n');var p=+nb.value/(+nb.value+ +ns.value);for(var i=0;i<n;i++){if(R()<p)hit++;}draws+=n;draw();});});
  var a1=ct.querySelector('[name=ans1]'),a2=ct.querySelector('[name=ans2]');
  ct.querySelector('[data-act=chk]').addEventListener('click',function(){draw(true);});
  function draw(chk){var b=+nb.value,sm=+ns.value,p=b/(b+sm);var s=svgOf(host,600,200);
    for(var i=0;i<b+sm;i++){var x=20+(i%20)*28,y=30+Math.floor(i/20)*34;ktxt(s,x,y,i<b?'🐟':'🐠',{size:20});}
    ktxt(s,20,150,'도미 🐟 '+b+'마리 · 빙어 🐠 '+sm+'마리 (뽑고 다시 넣기)',{size:13,fill:C.muted});
    var emp=draws?hit/draws:0;el('rect',{x:20,y:162,width:560*p,height:12,fill:C.teal},s);el('rect',{x:20,y:180,width:560*emp,height:12,fill:C.orange},s);
    ktxt(s,585,172,'이론',{size:11,anchor:'end',fill:'#fff'});ktxt(s,585,190,'실제',{size:11,anchor:'end',fill:'#fff'});
    var msg='이론 P(도미) = '+b+' / '+(b+sm)+' = <b>'+fmt(p,3)+'</b> · 뽑은 횟수 '+draws+'번 중 도미 '+hit+'번 → 실제 비율 <b>'+(draws?fmt(emp,3):'—')+'</b>';
    if(draws>=10000&&Math.abs(emp-p)<0.02){msg+='<br><span class="alert">많이 뽑을수록 실제 비율이 이론 확률에 다가갑니다.</span>';mission(host,0);}
    if(chk){var v1=parseFloat(a1.value),v2=parseFloat(a2.value);var ok1=Math.abs(v1-(1-p))<0.01,ok2=Math.abs(v2-p*p)<0.01;
      msg+='<br>P(빙어) = 1 − P(도미) = '+(ok1?'<span class="alert">정답 '+fmt(1-p,3)+'</span>':'<span class="bad">다시 — 여사건 규칙을 써 보세요</span>');
      msg+=' · P(두 번 다 도미) = '+(isNaN(v2)?'—':ok2?'<span class="alert">정답 '+fmt(p*p,3)+'</span>':'<span class="bad">다시 — 독립이면 곱합니다</span>');
      if(ok1)mission(host,1);if(ok2)mission(host,2);}
    live(host,msg);}
  draw();};

/* --- 10장: 베이즈 검사소 --- */
P.bayes=function(host){var ct=ctrlOf(host);var pv=ct.querySelector('[name=prev]'),se=ct.querySelector('[name=sens]'),fp=ct.querySelector('[name=fpr]');
  ct.querySelector('[data-act=card]').addEventListener('click',function(){pv.value=1;se.value=99;fp.value=5;draw();});
  [pv,se,fp].forEach(function(i){i.addEventListener('input',draw);});
  function draw(){var p=+pv.value/100,s1=+se.value/100,f=+fp.value/100;var TP=p*s1,FP=(1-p)*f,ppv=TP/(TP+FP);
    var s=svgOf(host,640,300);var N=1000,nD=Math.round(N*p),nTP=Math.round(nD*s1),nFP=Math.round((N-nD)*f);
    for(var i=0;i<N;i++){var x=14+(i%50)*12.4,y=14+Math.floor(i/50)*12.4;var col,sick=i<nD;var pos=sick?(i<nTP):(i-nD<nFP);
      col=sick?(pos?C.red:'#f3b1ae'):(pos?C.orange:'#dfe6ee');el('rect',{x:x,y:y,width:10,height:10,rx:2,fill:col},s);}
    [[C.red,'병 있고 양성'],[C.orange,'병 없는데 양성(위양성)'],['#f3b1ae','병 있는데 놓침'],['#dfe6ee','병 없고 음성']].forEach(function(L,k){el('rect',{x:14+k*155,y:272,width:12,height:12,rx:2,fill:L[0]},s);ktxt(s,30+k*155,282,L[1],{size:12,fill:C.muted});});
    live(host,'1,000명 중 진짜 환자 약 '+nD+'명, 그중 양성 '+nTP+'명 · 건강한 사람 중 양성(위양성) 약 '+nFP+'명'+
      '<div class="formula-live">P(병 | 양성) = P(양성|병)P(병) / [P(양성|병)P(병) + P(양성|건강)P(건강)] = '+fmt(s1,3)+'×'+fmt(p,3)+' / ('+fmt(TP,4)+' + '+fmt(f,3)+'×'+fmt(1-p,3)+') = <b>'+fmt(100*ppv,1)+'%</b></div>'+
      '<span class="hint">양성 판정을 받은 사람 중 진짜 환자의 비율(정밀도)이 '+fmt(100*ppv,1)+'%입니다.</span>');
    if(Math.abs(+pv.value-1)<1e-9&&Math.abs(+se.value-99)<1e-9&&Math.abs(+fp.value-5)<1e-9)mission(host,0);if(ppv>0.5)mission(host,1);if(+pv.value<=1&&ppv>0.5)mission(host,2);}
  draw();};

/* --- 11장: 분포 맞추기 --- */
function ncdf(x){var t=1/(1+0.2316419*Math.abs(x)),d=0.3989423*Math.exp(-x*x/2),p=d*t*(0.3193815+t*(-0.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));return x>0?1-p:p;}
function lfact(k){var s=0;for(var i=2;i<=k;i++)s+=Math.log(i);return s;}
P.dist=function(host){var ct=ctrlOf(host);var ds='len',fam='norm';var p1=ct.querySelector('[name=p1]'),p2=ct.querySelector('[name=p2]'),l1=ct.querySelector('.l1'),l2=ct.querySelector('.l2');
  var DS={len:{name:'농어 길이(cm)',v:PL,edges:[10,15,20,25,30,35,40,45,50],N:24},cust:{name:'시간당 손님 수(명)',v:DATA.cust,edges:[-0.5,0.5,1.5,2.5,3.5,4.5,5.5,6.5,7.5,8.5,9.5],N:60,disc:true},gap:{name:'손님 사이 간격(분)',v:DATA.gaps,edges:[0,10,20,30,40,50,60,70,80,90,100],N:60}};
  var FAM={norm:{n:'정규',a:['μ(평균)',20,40,.5,30],b:['σ(표준편차)',2,15,.5,6]},pois:{n:'포아송',a:['λ(평균 횟수)',.5,8,.1,2]},expo:{n:'지수',a:['λ(1분당 비율)',.01,.2,.005,.1]},unif:{n:'균등',a:['a(시작)',0,40,1,15],b:['b(끝)',10,100,1,45]}};
  function setFam(f){fam=f;var F=FAM[f];ct.querySelectorAll('[data-fam]').forEach(function(x){x.classList.toggle('on',x.getAttribute('data-fam')===f);});
    l1.firstChild.textContent=F.a[0]+' ';p1.min=F.a[1];p1.max=F.a[2];p1.step=F.a[3];p1.value=F.a[4];
    if(F.b){l2.style.display='';l2.firstChild.textContent=F.b[0]+' ';p2.min=F.b[1];p2.max=F.b[2];p2.step=F.b[3];p2.value=F.b[4];}else l2.style.display='none';draw();}
  ct.querySelectorAll('[data-ds]').forEach(function(b){b.addEventListener('click',function(){ds=b.getAttribute('data-ds');ct.querySelectorAll('[data-ds]').forEach(function(x){x.classList.toggle('on',x===b);});draw();});});
  ct.querySelectorAll('[data-fam]').forEach(function(b){b.addEventListener('click',function(){setFam(b.getAttribute('data-fam'));});});
  [p1,p2].forEach(function(i){i.addEventListener('input',draw);});
  function prob(a,b){var A=+p1.value,B=+p2.value;if(fam==='norm')return ncdf((b-A)/B)-ncdf((a-A)/B);
    if(fam==='pois'){var s=0;for(var k=Math.ceil(a);k<b;k++){if(k<0)continue;s+=Math.exp(-A+k*Math.log(A)-lfact(k));}return s;}
    if(fam==='expo'){a=Math.max(a,0);b=Math.max(b,0);return Math.exp(-A*a)-Math.exp(-A*b);}
    var lo=Math.min(A,B),hi=Math.max(A,B);if(hi===lo)return 0;return Math.max(0,Math.min(b,hi)-Math.max(a,lo))/(hi-lo);}
  function draw(){var D=DS[ds],e=D.edges,nb=e.length-1;var obs=[];for(var i=0;i<nb;i++){obs.push(D.v.filter(function(v){return v>=e[i]&&v<e[i+1];}).length);}
    var ex=obs.map(function(_,i){return D.N*prob(e[i],e[i+1]);});var tot=obs.reduce(function(a,b){return a+b;},0);var tv=0;for(i=0;i<nb;i++)tv+=Math.abs(obs[i]-ex[i]);tv=tv/2/tot;
    var s=svgOf(host,620,320);var mxv=Math.max.apply(0,obs.concat(ex))*1.15||1;var bw=540/nb;
    for(i=0;i<nb;i++){var h=obs[i]/mxv*240;el('rect',{x:50+i*bw+2,y:270-h,width:bw-4,height:h,fill:'#cfe9e5',stroke:C.teal},s);
      txt(s,50+i*bw+bw/2,288,D.disc?fmt(e[i]+0.5,0):fmt(e[i],0)+'~',{size:11.5,anchor:'middle',italic:false,fill:C.muted});}
    var d='';for(i=0;i<nb;i++){var y=270-ex[i]/mxv*240;d+=(i?'L':'M')+(50+i*bw+bw/2)+','+y;}el('path',{d:d,fill:'none',stroke:C.orange,'stroke-width':3},s);
    for(i=0;i<nb;i++)dot(s,50+i*bw+bw/2,270-ex[i]/mxv*240,'orange',4);el('line',{x1:48,y1:270,x2:594,y2:270,stroke:C.navy,'stroke-width':2},s);
    ktxt(s,594,310,D.name,{size:12.5,anchor:'end',fill:C.muted});ktxt(s,50,22,'초록 막대: 실제 개수 · 주황 선: '+FAM[fam].n+' 분포가 예상한 개수(= 구간 넓이 × 전체 수)',{size:12,fill:C.muted});
    live(host,'데이터: '+D.name+' · 분포: <b>'+FAM[fam].n+'</b> · 어긋남(막대와 선이 서로 다른 몫) = <b>'+fmt(100*tv,1)+'%</b><br><span class="hint">어긋남이 작을수록 이 분포가 데이터의 모양을 잘 설명합니다. 확률 = 곡선 아래 넓이입니다(L12).</span>');
    if(ds==='len'&&fam==='norm'&&tv<=0.25)mission(host,0);if(ds==='cust'&&fam==='pois'&&tv<=0.18)mission(host,1);if(ds==='gap'&&fam==='expo'&&tv<=0.17)mission(host,2);}
  setFam('norm');};

/* --- 12장: 놀람 저울 --- */
P.ent=function(host){var ct=ctrlOf(host);var S=[ct.querySelector('[name=s0]'),ct.querySelector('[name=s1]'),ct.querySelector('[name=s2]')];var NM=['도미','빙어','농어'];var ans=0;
  ct.querySelectorAll('[data-ans]').forEach(function(b){b.addEventListener('click',function(){ans=+b.getAttribute('data-ans');ct.querySelectorAll('[data-ans]').forEach(function(x){x.classList.toggle('on',x===b);});draw();});});
  S.forEach(function(i){i.addEventListener('input',draw);});
  function draw(){var z=S.map(function(i){return +i.value;}),mz=Math.max.apply(0,z),ex=z.map(function(v){return Math.exp(v-mz);}),sm=ex.reduce(function(a,b){return a+b;},0),p=ex.map(function(v){return v/sm;});
    var ce=-Math.log(p[ans]),H=0;p.forEach(function(q){if(q>0)H-=q*Math.log2(q);});
    var s=svgOf(host,600,260);for(var i=0;i<3;i++){var h=p[i]*200;el('rect',{x:70+i*170,y:220-h,width:110,height:h,rx:6,fill:i===ans?C.teal:'#c9d3dd'},s);
      ktxt(s,125+i*170,244,NM[i]+(i===ans?' (정답)':''),{size:14,anchor:'middle',fill:i===ans?C.teal:C.muted,weight:i===ans?'bold':'normal'});txt(s,125+i*170,214-h,fmt(p[i],3),{size:14,anchor:'middle',italic:false});}
    live(host,'모델이 정답('+NM[ans]+')에 준 확률 <b>'+fmt(p[ans],3)+'</b>'+
      '<div class="formula-live">교차 엔트로피 손실 = −ln P(정답) = −ln '+fmt(p[ans],3)+' = <b>'+fmt(ce,3)+'</b> (비트로 '+fmt(ce/Math.LN2,2)+')</div>'+
      '퍼플렉시티 = e^손실 = <b>'+fmt(Math.exp(ce),2)+'</b> → 정답 맞히기가 '+fmt(Math.exp(ce),2)+'개 중 하나를 찍는 만큼 어려웠다는 뜻 · 모델 예측의 엔트로피(얼마나 망설이나) = '+fmt(H,3)+'비트 (최대 log₂3 = 1.585)');
    if(ce<0.1)mission(host,0);if(p[ans]<=0.01)mission(host,1);if(H>=0.99*Math.log2(3))mission(host,2);}
  draw();};

/* --- 2부 대결: 30번 vs 1만 번 --- */
DUELCALC.duel2=function(){var p=12/22;function err(n,seed){var R=rng(seed),tot=0;for(var k=0;k<200;k++){var h=0;for(var i=0;i<n;i++)if(R()<p)h++;tot+=Math.abs(h/n-p);}return tot/200;}
  return {l:err(30,3),r:err(10000,103),unit:'',d:3,what:'200번 되풀이한 평균 오차(이론 0.545와의 차이)'};};
