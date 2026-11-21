/* ===== 3부 실습 대시보드 ===== */
var PL3=DATA.perch.map(function(p){return p[0];}),PH3=DATA.perch.map(function(p){return p[1];}),PW3=DATA.perch.map(function(p){return p[2];});

/* --- 13장: 기울기 돋보기 --- */
P.deriv=function(host){var ct=ctrlOf(host);var iw=ct.querySelector('[name=w]'),ih=ct.querySelector('[name=h]'),ib=ct.querySelector('[name=b]');var area=false;var HS=[1,0.5,0.1,0.01,0.001];
  ct.querySelector('[data-act=area]').addEventListener('click',function(e){area=!area;e.target.classList.toggle('on',area);draw();});
  [iw,ih,ib].forEach(function(i){i.addEventListener('input',draw);});
  function f(w){return (w-3)*(w-3)+1;}
  function draw(){var s=svgOf(host,640,380);
    if(!area){var w=+iw.value,h=HS[+ih.value];var Pp=plane(s,{W:640,H:380,x0:0,x1:6,y0:0,y1:10,step:1,xl:'가중치 w',yl:'손실'});
      var d='';for(var i=0;i<=120;i++){var x=6*i/120;d+=(i?'L':'M')+Pp.X(x)+','+Pp.Y(f(x));}el('path',{d:d,fill:'none',stroke:C.navy,'stroke-width':3},s);
      var sec=(f(w+h)-f(w))/h,tan=2*(w-3);
      function line(m,c){var xa=Math.max(0,w-1.6),xb=Math.min(6,w+1.6);el('line',{x1:Pp.X(xa),y1:Pp.Y(f(w)+m*(xa-w)),x2:Pp.X(xb),y2:Pp.Y(f(w)+m*(xb-w)),stroke:c,'stroke-width':2.5},s);}
      line(sec,C.orange);line(tan,C.green);dot(s,Pp.X(w),Pp.Y(f(w)),'teal',7);if(w+h<=6)dot(s,Pp.X(w+h),Pp.Y(f(w+h)),'orange',5);
      live(host,'손실 f(w) = (w − 3)² + 1 · 지금 w = '+fmt(w,1)+
        '<div class="formula-live">할선 기울기 [f(w + h) − f(w)] / h = [f('+fmt(w+h,3)+') − f('+fmt(w,1)+')] / '+h+' = <b>'+fmt(sec,3)+'</b> · 접선 기울기 f′(w) = 2(w − 3) = <b>'+fmt(tan,3)+'</b></div>'+
        (tan>0?'기울기 + → w를 <b>줄이면</b> 손실이 줄어듭니다.':tan<0?'기울기 − → w를 <b>늘리면</b> 손실이 줄어듭니다.':'<span class="alert">기울기 0 → 손실이 가장 작은 바닥입니다!</span>')+
        '<br><span class="hint">주황: 할선(두 점을 이은 선) · 초록: 접선(미분). h를 줄이면 주황이 초록에 붙습니다.</span>');
      if(h<=0.01&&Math.abs(sec-tan)<0.02)mission(host,0);if(Math.abs(tan)<0.1)mission(host,1);}
    else{var b=+ib.value;var Pp2=plane(s,{W:640,H:380,x0:0,x1:2.2,y0:0,y1:2.2,step:0.5,equal:true,xl:'x',yl:'y'});
      el('path',{d:'M'+Pp2.X(0)+','+Pp2.Y(0)+' L'+Pp2.X(b)+','+Pp2.Y(b)+' L'+Pp2.X(b)+','+Pp2.Y(0)+' Z',fill:'#cfe9e5',stroke:C.teal},s);
      el('line',{x1:Pp2.X(0),y1:Pp2.Y(0),x2:Pp2.X(2.2),y2:Pp2.Y(2.2),stroke:C.navy,'stroke-width':3},s);
      live(host,'넓이 칠하기 — y = x 아래, 0부터 '+fmt(b,1)+'까지<div class="formula-live">∫₀^'+fmt(b,1)+' x dx = [x²/2]₀^'+fmt(b,1)+' = '+fmt(b,1)+'² / 2 = <b>'+fmt(b*b/2,3)+'</b></div><span class="hint">확률밀도 곡선 아래 넓이가 1이 되는 것도 이 계산입니다(L12).</span>');
      if(Math.abs(b*b/2-0.5)<1e-9)mission(host,2);}
    ct.querySelector('.hnow').textContent='h = '+HS[+ih.value];}
  draw();};

/* --- 14장: 등고선 내려가기 --- */
P.gd=function(host){var ct=ctrlOf(host);var ia=ct.querySelector('[name=alpha]');var std=false,start=[-0.5,3.5],path=null,runs=[];var M=[2,1];
  function Amat(){if(std)return [[1,0],[0,1.5]];var t=Math.PI/6,c=Math.cos(t),sn=Math.sin(t),l1=1,l2=25;return [[l1*c*c+l2*sn*sn,(l1-l2)*c*sn],[(l1-l2)*c*sn,l1*sn*sn+l2*c*c]];}
  function loss(w){var A=Amat(),d=[w[0]-M[0],w[1]-M[1]];return 0.5*(d[0]*(A[0][0]*d[0]+A[0][1]*d[1])+d[1]*(A[1][0]*d[0]+A[1][1]*d[1]));}
  function grad(w){var A=Amat(),d=[w[0]-M[0],w[1]-M[1]];return [A[0][0]*d[0]+A[0][1]*d[1],A[1][0]*d[0]+A[1][1]*d[1]];}
  ct.querySelector('[data-act=std]').addEventListener('click',function(e){std=!std;e.target.classList.toggle('on',std);path=null;draw();});
  ct.querySelector('[data-act=run]').addEventListener('click',function(){var w=start.slice(),pts=[w.slice()],a=+ia.value;for(var i=0;i<30;i++){var g=grad(w);w=[w[0]-a*g[0],w[1]-a*g[1]];pts.push(w.slice());if(!isFinite(w[0])||Math.abs(w[0])>1e6)break;}path=pts;
    var dist=Math.hypot(w[0]-M[0],w[1]-M[1]);runs.push({std:std,a:a,ok:dist<0.05,div:loss(w)>loss(start)||!isFinite(dist)});draw();});
  ia.addEventListener('input',function(){path=null;draw();});
  function draw(){var s=svgOf(host,560,440);var Pp=plane(s,{W:560,H:440,x0:-1,x1:5,y0:-2,y1:4,step:1,equal:true,xl:'w₁',yl:'w₂'});
    var A=Amat();var tr=A[0][0]+A[1][1],dt=A[0][0]*A[1][1]-A[0][1]*A[0][1],disc=Math.sqrt(tr*tr/4-dt),l1=tr/2+disc,l2=tr/2-disc;
    var v1=Math.abs(A[0][1])<1e-12?(A[0][0]>=A[1][1]?[1,0]:[0,1]):[l1-A[1][1],A[0][1]];var nv=Math.hypot(v1[0],v1[1]);v1=[v1[0]/nv,v1[1]/nv];var v2=[-v1[1],v1[0]];
    [0.05,0.3,1,2.5,5,9,15].forEach(function(k){var d='';for(var i=0;i<=72;i++){var t=2*Math.PI*i/72,r1=Math.sqrt(2*k/l1)*Math.cos(t),r2=Math.sqrt(2*k/l2)*Math.sin(t);var x=M[0]+r1*v1[0]+r2*v2[0],y=M[1]+r1*v1[1]+r2*v2[1];d+=(i?'L':'M')+Pp.X(x)+','+Pp.Y(y);}el('path',{d:d,fill:'none',stroke:'#9fb3c8','stroke-width':1.2},s);});
    ktxt(s,Pp.X(M[0])+10,Pp.Y(M[1])-10,'★ 정규방정식의 답',{size:12.5,fill:C.orange});txt(s,Pp.X(M[0]),Pp.Y(M[1])+6,'★',{size:20,anchor:'middle',fill:C.orange,italic:false});
    var bg=el('rect',{x:0,y:0,width:560,height:440,fill:'transparent'},s);s.insertBefore(bg,s.childNodes[1]);
    bg.addEventListener('click',function(e){var m=s.getScreenCTM().inverse(),q=s.createSVGPoint();q.x=e.clientX;q.y=e.clientY;q=q.matrixTransform(m);start=Pp.inv(q.x,q.y).map(function(v){return Math.round(v*10)/10;});path=null;draw();});
    var msg='';if(path){var d='';path.forEach(function(p,i){var x=clamp(p[0],-3,7),y=clamp(p[1],-4,6);d+=(i?'L':'M')+Pp.X(x)+','+Pp.Y(y);});el('path',{d:d,fill:'none',stroke:C.red,'stroke-width':2.5},s);
      path.forEach(function(p){if(Math.abs(p[0])<8&&Math.abs(p[1])<8)dot(s,Pp.X(p[0]),Pp.Y(p[1]),'red',3);});var w=path[path.length-1];var dist=Math.hypot(w[0]-M[0],w[1]-M[1]);
      msg=(path.length-1)+'걸음 뒤 손실 '+(isFinite(loss(w))&&loss(w)<1e6?fmt(loss(w),4):'<span class="bad">폭발</span>')+' · 답(★)까지 거리 '+(isFinite(dist)&&dist<1e6?fmt(dist,3):'—')+(dist<0.05?' <span class="alert">도착!</span>':loss(w)>loss(start)?' <span class="bad">← 걸음이 너무 커서 튕겨 나갔습니다</span>':' (아직 가는 중)');}
    dot(s,Pp.X(start[0]),Pp.Y(start[1]),'teal',8);
    live(host,'출발 ('+fmt(start[0],1)+', '+fmt(start[1],1)+') · 학습률 α = '+ia.value+' · 그릇 모양: '+(std?'표준화 켬 → 둥근 그릇':'표준화 끔 → 길쭉한 그릇')+' (곡률 큰 쪽 '+fmt(l1,1)+', 작은 쪽 '+fmt(l2,1)+')'+
      '<div class="formula-live">θ_new = θ_old − α∇f(θ) · 안정 조건: α < 2 / '+fmt(l1,1)+' = '+fmt(2/l1,3)+'</div>'+(msg||'<span class="hint">그림을 눌러 출발점을 정하고 "30걸음"을 누르세요.</span>'));
    runs.forEach(function(r){if(r.ok)mission(host,0);if(r.div)mission(host,1);});
    runs.forEach(function(r){runs.forEach(function(q){if(r.std&&!q.std&&r.a===q.a&&r.ok&&!q.ok)mission(host,2);});});}
  draw();};

/* --- 15장: 옵티마이저 경주 --- */
P.race=function(host){var ct=ctrlOf(host);var ia=ct.querySelector('[name=alpha]');var shape='long',res=null;
  var SH={round:{n:'둥근 그릇',f:function(x,y){return 0.5*(x*x+y*y);},g:function(x,y){return[x,y];},s:[-2.5,2],min:0},
    long:{n:'길쭉한 그릇',f:function(x,y){var u=0.866*x+0.5*y,v=-0.5*x+0.866*y;return 0.5*(u*u+20*v*v);},g:function(x,y){var u=0.866*x+0.5*y,v=-0.5*x+0.866*y;return[0.866*u-0.5*20*v,0.5*u+0.866*20*v];},s:[-2.5,2],min:0},
    bumpy:{n:'울퉁불퉁한 그릇',f:function(x,y){return 0.5*(x*x+y*y)+0.8*(2-Math.cos(3*x)-Math.cos(3*y));},g:function(x,y){return[x+2.4*Math.sin(3*x),y+2.4*Math.sin(3*y)];},s:[-2.6,2.4],min:0},
    saddle:{n:'안장점',f:function(x,y){return 0.5*x*x+0.25*y*y*y*y-0.5*y*y;},g:function(x,y){return[x,y*y*y-y];},s:[2.5,0.001],min:-0.25}};
  ct.querySelectorAll('[data-shape]').forEach(function(b){b.addEventListener('click',function(){shape=b.getAttribute('data-shape');ct.querySelectorAll('[data-shape]').forEach(function(x){x.classList.toggle('on',x===b);});res=null;draw();});});
  ia.addEventListener('input',function(){res=null;draw();});
  ct.querySelector('[data-act=go]').addEventListener('click',function(){var S=SH[shape],a=+ia.value,N=60;var out={};
    ['gd','mom','adam'].forEach(function(k){var w=S.s.slice(),v=[0,0],m=[0,0],q=[0,0],pts=[w.slice()];
      for(var t=1;t<=N;t++){var g=S.g(w[0],w[1]);
        if(k==='gd'){w=[w[0]-a*g[0],w[1]-a*g[1]];}
        else if(k==='mom'){v=[0.9*v[0]+g[0],0.9*v[1]+g[1]];w=[w[0]-a*v[0],w[1]-a*v[1]];}
        else{m=[0.9*m[0]+0.1*g[0],0.9*m[1]+0.1*g[1]];q=[0.999*q[0]+0.001*g[0]*g[0],0.999*q[1]+0.001*g[1]*g[1]];var mh=[m[0]/(1-Math.pow(0.9,t)),m[1]/(1-Math.pow(0.9,t))],qh=[q[0]/(1-Math.pow(0.999,t)),q[1]/(1-Math.pow(0.999,t))];w=[w[0]-a*mh[0]/(Math.sqrt(qh[0])+1e-8),w[1]-a*mh[1]/(Math.sqrt(qh[1])+1e-8)];}
        if(!isFinite(w[0])||Math.abs(w[0])>1e4||Math.abs(w[1])>1e4){pts.push([NaN,NaN]);break;}pts.push(w.slice());}
      var last=pts[pts.length-1];out[k]={pts:pts,loss:isFinite(last[0])?S.f(last[0],last[1]):Infinity};});
    res={shape:shape,a:a,out:out};draw();
    mission(host,0);if(shape==='saddle')mission(host,1);if(shape==='long'&&out.gd.loss-SH.long.min<0.01)mission(host,2);});
  function draw(){var S=SH[shape];var s=svgOf(host,560,420);var Pp=plane(s,{W:560,H:420,x0:-3,x1:3,y0:-2.6,y1:2.6,step:1,equal:true,xl:'w₁',yl:'w₂'});
    var g=el('g',{},s),R=24;for(var i=0;i<R;i++)for(var j=0;j<R;j++){var x=-3+6*(i+.5)/R,y=-2.6+5.2*(j+.5)/R;var v=S.f(x,y)-S.min;var t=clamp(Math.log(1+v)/Math.log(1+(shape==='long'?60:8)),0,1);
      el('rect',{x:Pp.X(-3+6*i/R),y:Pp.Y(-2.6+5.2*(j+1)/R),width:Pp.sx*6/R+0.5,height:Pp.sy*5.2/R+0.5,fill:'rgb('+Math.round(232-60*t)+','+Math.round(244-80*t)+','+Math.round(248-40*t)+')'},g);}
    s.insertBefore(g,s.childNodes[1]);dot(s,Pp.X(S.s[0]),Pp.Y(S.s[1]),'navy',7);
    var COL={gd:C.red,mom:C.blue,adam:C.green},NM={gd:'경사하강',mom:'모멘텀',adam:'Adam'};var msg='';
    if(res){['gd','mom','adam'].forEach(function(k){var d='';res.out[k].pts.forEach(function(p,i){if(!isFinite(p[0]))return;d+=(i?'L':'M')+Pp.X(clamp(p[0],-3.5,3.5))+','+Pp.Y(clamp(p[1],-3,3));});el('path',{d:d,fill:'none',stroke:COL[k],'stroke-width':2.5,opacity:.9},s);});
      var rank=['gd','mom','adam'].slice().sort(function(a,b){return res.out[a].loss-res.out[b].loss;});
      msg='60걸음 뒤 손실(바닥 '+S.min+'): '+['gd','mom','adam'].map(function(k){return '<span style="color:'+COL[k]+'">■</span> '+NM[k]+' '+(isFinite(res.out[k].loss)?fmt(res.out[k].loss,4):'<span class="bad">폭발</span>');}).join(' · ')+'<br>순위: <b>'+rank.map(function(k){return NM[k];}).join(' → ')+'</b>';}
    live(host,'그릇: <b>'+S.n+'</b> · 학습률 α = '+ia.value+' (세 방법 모두 같은 α)<br>'+(msg||'<span class="hint">"출발!"을 누르면 세 방법이 같은 점(남색)에서 동시에 출발합니다.</span>'));}
  draw();};

/* --- 16장: 생선 가게 종합 시뮬레이터 --- */
var CLS=DATA.bream.map(function(b){return [b[0],1];}).concat(DATA.smelt.map(function(s){return [s[0],0];})).concat([[18.5,1],[19.5,0]]);
P.shop=function(host){var ct=ctrlOf(host);var sel={L:1,H:0,L3:0},std=false,meth='ne',lam=ct.querySelector('[name=lam]'),thr=ct.querySelector('[name=thr]');var duel=false;
  ct.querySelectorAll('[data-f]').forEach(function(b){b.classList.toggle('on',!!sel[b.getAttribute('data-f')]);b.addEventListener('click',function(){var k=b.getAttribute('data-f');sel[k]=sel[k]?0:1;b.classList.toggle('on',!!sel[k]);draw();});});
  ct.querySelector('[data-act=std]').addEventListener('click',function(e){std=!std;e.target.classList.toggle('on',std);draw();});
  ct.querySelectorAll('[data-meth]').forEach(function(b){b.addEventListener('click',function(){meth=b.getAttribute('data-meth');ct.querySelectorAll('[data-meth]').forEach(function(x){x.classList.toggle('on',x===b);});draw();});});
  ct.querySelector('[data-act=duel]').addEventListener('click',function(){duel=true;draw();});
  [lam,thr].forEach(function(i){i.addEventListener('input',draw);});
  function design(fs,z){var cols=[];if(fs.L)cols.push(PL3);if(fs.H)cols.push(PH3);if(fs.L3)cols.push(PL3.map(function(v){return v*v*v;}));
    if(z)cols=cols.map(function(c){var m=mean(c),s_=sd(c);return c.map(function(v){return (v-m)/s_;});});return PL3.map(function(_,i){return [1].concat(cols.map(function(c){return c[i];}));});}
  function solveLin(A,b){var n=b.length,M=A.map(function(r,i){return r.concat([b[i]]);});for(var c=0;c<n;c++){var p=c;for(var r=c+1;r<n;r++)if(Math.abs(M[r][c])>Math.abs(M[p][c]))p=r;var t=M[c];M[c]=M[p];M[p]=t;if(Math.abs(M[c][c])<1e-12)return null;
      for(r=0;r<n;r++){if(r===c)continue;var f=M[r][c]/M[c][c];for(var k=c;k<=n;k++)M[r][k]-=f*M[c][k];}}return M.map(function(r,i){return r[n]/r[i];});}
  function fit(fs,z,mt,L){var X=design(fs,z),p=X[0].length,y=PW3,n=y.length,b;
    if(mt==='ne'){var A=[],v=[];for(var i=0;i<p;i++){A.push([]);var s1=0;for(var r=0;r<n;r++)s1+=X[r][i]*y[r];v.push(s1);for(var j=0;j<p;j++){var s2=0;for(r=0;r<n;r++)s2+=X[r][i]*X[r][j];A[i].push(s2+(i===j&&i>0?L:0));}}b=solveLin(A,v);if(!b)return {mae:NaN,bad:'행렬식 0'};}
    else{b=new Array(p).fill(0);for(var t=0;t<100;t++){var g=new Array(p).fill(0);for(r=0;r<n;r++){var e=-y[r];for(i=0;i<p;i++)e+=X[r][i]*b[i];for(i=0;i<p;i++)g[i]+=e*X[r][i]/n;}for(i=0;i<p;i++)b[i]-=0.3*(g[i]+(i>0?L*b[i]/n:0));if(!isFinite(b[0])||Math.abs(b[0])>1e9)return {mae:Infinity,bad:'발산'};}}
    var mae=0;for(r=0;r<n;r++){var pr=0;for(i=0;i<p;i++)pr+=X[r][i]*b[i];mae+=Math.abs(pr-y[r]);}return {mae:mae/n};}
  function draw(){var L=+lam.value;var any=sel.L||sel.H||sel.L3;var R=any?fit(sel,std,meth,L):{mae:NaN,bad:'특성 없음'};var NE=any?fit(sel,std,'ne',L):{mae:NaN};
    var th=+thr.value;var TP=0,FP=0,FN=0,TN=0,ce=0;CLS.forEach(function(c){var p=1/(1+Math.exp(-1.2*(c[0]-19)));p=clamp(p,1e-6,1-1e-6);ce+=c[1]?-Math.log(p):-Math.log(1-p);var pr=p>=th;if(pr&&c[1])TP++;else if(pr)FP++;else if(c[1])FN++;else TN++;});ce/=CLS.length;
    var mae=R.mae;var good=isFinite(mae);
    var h='<div class="tbl"><table><tbody><tr><th>① 회귀: 무게 예측</th><td>특성 '+[sel.L?'길이':'',sel.H?'높이':'',sel.L3?'길이³':''].filter(Boolean).join('·')+' · '+(std?'표준화 켬':'표준화 끔')+' · '+(meth==='ne'?'정규방정식':'경사하강 100걸음(α = 0.3)')+' · λ = '+L+'</td><td><b>'+(good?'평균 빗나감 '+fmt(mae,1)+'g':'<span class="bad">'+(R.bad||'실패')+'</span>')+'</b>'+(meth==='gd'&&isFinite(NE.mae)?'<br><span class="hint">같은 특성의 정규방정식: '+fmt(NE.mae,1)+'g</span>':'')+'</td></tr>'+
      '<tr><th>② 분류: 도미 vs 빙어</th><td>확률 P(도미) = σ(1.2 × (길이 − 19)) · 임계값 '+th+' 이상이면 도미</td><td>맞힌 도미 '+TP+' · 빙어를 도미로(위양성) <b>'+FP+'</b> · 놓친 도미 <b>'+FN+'</b> · 맞힌 빙어 '+TN+'<br>평균 교차 엔트로피 '+fmt(ce,3)+'</td></tr></tbody></table></div>';
    if(duel){var sia=fit({L:1},false,'gd',0),moa=fit({L3:1},true,'ne',0);
      h+='<div class="solve"><h4>대결 결과 — 심판 하루</h4><p>시아: 길이만 · 표준화 끔 · 경사하강 → <span class="bad">'+(isFinite(sia.mae)?fmt(sia.mae,1)+'g':'발산(숫자가 폭발)')+'</span></p><p>모아: 길이³ · 표준화 켬 · 정규방정식 → <b>'+fmt(moa.mae,1)+'g</b></p><p>모아 승! 길이³은 \"무게는 부피에 비례\"라는 생각을 특성으로 넣은 것이고(1장 함수 모양), 표준화는 그릇을 둥글게 했습니다(6·15장).</p></div>';}
    host.innerHTML=h;
    live(host,'<span class="hint">회귀와 분류를 한 화면에서 조정합니다. 숫자는 설명용 예시값입니다.</span>');
    if(good&&mae<=20)mission(host,0);if(meth==='gd'&&good&&isFinite(NE.mae)&&Math.abs(mae-NE.mae)<=1)mission(host,1);if(meth==='gd'&&good&&mae<=17)mission(host,2);}
  draw();};

/* --- 별 모음판 --- */
P.board=function(host){var NM={map:'0 수학 지도',func:'1 함수 기계',table:'2 생선 표',vec:'3 닮은 생선',matmul:'4 행렬곱 공장',solve:'5 한 번에 풀기',stats:'6 통계판',corr:'7 겹치는 정보',pca:'8 방향 돌리기',prob:'9 확률 통',bayes:'10 베이즈 검사소',dist:'11 분포 맞추기',ent:'12 놀람 저울',deriv:'13 기울기 돋보기',gd:'14 등고선',race:'15 옵티마이저 경주',shop:'16 종합 시뮬레이터'};
  function draw(){var all=loadStars(),tot=0;host.innerHTML='<div class="starboard">'+Object.keys(NM).map(function(k){var a=all[k]||[0,0,0],n=a.reduce(function(x,y){return x+y;},0);tot+=n;return '<div><b>'+'★★★'.slice(0,n)+'☆☆☆'.slice(0,3-n)+'</b>'+NM[k]+'</div>';}).join('')+'</div>';
    live(host,'모은 별 <b>'+tot+'</b> / 51 '+(tot>=40?'<span class="alert">— 연구실 수학 인증!</span>':'<span class="hint">— 별이 비어 있는 장으로 돌아가 다시 해 보세요.</span>'));}
  draw();host.parentNode.querySelector('[data-act=refresh]').addEventListener('click',draw);};
