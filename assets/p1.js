/* ===== 1부 실습 대시보드 ===== */

/* --- 0장: 수학 지도 탐험 --- */
var MAPN=[[1,'함수'],[2,'행렬'],[3,'벡터 연산'],[4,'행렬 연산'],[5,'연립방정식'],[6,'통계'],[7,'상관·공분산'],[8,'고유값·PCA'],[9,'확률'],[10,'베이즈'],[11,'확률분포'],[12,'정보이론'],[13,'미적분'],[14,'그래디언트'],[15,'최적화']];
var MAPE=[['L1',3,4,'내적을 여러 번 = 행렬곱'],['L2',3,7,'상관계수 = 평균 뺀 코사인'],['L3',3,6,'표준편차 = 평균 뺀 길이 ÷ √n'],['L4',6,7,'분산 → 공분산'],['L4',7,8,'공분산 행렬 → PCA'],['L5',4,5,'전치·역행렬 → 정규방정식'],['L6',7,5,'겹치는 특성 → 행렬식 ≈ 0'],['L6',5,4,'λI(단위행렬)를 더해 살림 = 릿지'],['L7',5,14,'같은 답, 한 번에 vs 조금씩'],['L8',9,13,'곱셈 규칙 ↔ 연쇄 법칙'],['L9',11,14,'정규분포 오차 → 제곱 오차 손실'],['L10',11,12,'베르누이 → 교차 엔트로피'],['L11',1,9,'시그모이드 치역 0~1 = 확률'],['L12',13,11,'적분 = 확률 넓이'],['L13',8,15,'고유값 ↔ 헤시안 곡률'],['L14',10,15,'사전확률 ↔ 규제']];
function mapPos(n){if(n<=5)return[90+(n-1)*180,70];if(n<=12)return[75+(n-6)*125,215];return[270+(n-13)*180,360];}
P.map=function(host){var s=svgOf(host,900,420);s.classList.add('mapsvg');var seen={},sel=null;
  ktxt(s,12,24,'1부',{size:13,fill:C.teal});ktxt(s,12,170,'2부',{size:13,fill:C.teal});ktxt(s,12,316,'3부',{size:13,fill:C.teal});
  var eg=el('g',{},s),ng=el('g',{},s);
  function draw(){eg.innerHTML='';MAPE.forEach(function(e){var a=mapPos(e[1]),b=mapPos(e[2]);var on=sel&&(e[1]===sel||e[2]===sel);
      var mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2-(a[1]===b[1]?60:0)+(a[1]!==b[1]?0:0);var cx=mx+(a[1]===b[1]?0:(b[0]>a[0]?-30:30));
      el('path',{d:'M'+a[0]+','+a[1]+' Q'+cx+','+my+' '+b[0]+','+b[1],fill:'none',stroke:on?C.teal:'#cfd7df','stroke-width':on?3.5:1.5,'stroke-dasharray':on?'':'4 4'},eg);
      if(on){var lx=(a[0]+2*cx+b[0])/4,ly=(a[1]+2*my+b[1])/4;el('rect',{x:lx-18,y:ly-11,width:36,height:18,rx:5,fill:C.teal},eg);ktxt(eg,lx,ly+3,e[0],{size:12,fill:'#fff',anchor:'middle',weight:'bold'});}});
    ng.innerHTML='';MAPN.forEach(function(n){var p=mapPos(n[0]);var on=sel===n[0];var g=el('g',{tabindex:0,role:'button','aria-label':n[0]+'장 '+n[1],style:'cursor:pointer'},ng);
      el('rect',{x:p[0]-56,y:p[1]-22,width:112,height:44,rx:10,fill:on?C.teal:'#fff',stroke:on?C.teal:C.navy,'stroke-width':1.5},g);
      ktxt(g,p[0],p[1]-4,n[0]+'장',{size:11,fill:on?'#fff':C.orange,anchor:'middle',weight:'bold'});ktxt(g,p[0],p[1]+13,n[1],{size:13,fill:on?'#fff':C.navy,anchor:'middle'});
      function go(){sel=n[0];var lst=[];MAPE.forEach(function(e,i){if(e[1]===sel||e[2]===sel){seen[i]=1;lst.push('<span class="lk">'+e[0]+'</span>'+e[1]+'장 ↔ '+e[2]+'장 · '+e[3]);}});draw();
        var k=Object.keys(seen).length;live(host,'<b>'+n[0]+'장 '+n[1]+'</b>에 이어진 연결 고리 '+lst.length+'개<br>'+(lst.join('<br>')||'—')+'<br><span class="hint">지금까지 찾은 연결 '+k+' / '+MAPE.length+'</span>');
        if(k>=1)mission(host,0);if(k>=3)mission(host,1);if(k>=MAPE.length)mission(host,2);}
      g.addEventListener('click',go);g.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();go();}});});}
  draw();live(host,'카드를 하나 눌러 보세요. 그 장과 이어진 선이 켜집니다.');};

/* --- 1장: 함수 기계 --- */
var F1X=[2,2.5,3,3.5,4],F1Y=[0.8,1.5,2.6,4.2,6.3];
P.func=function(host){var ct=ctrlOf(host);var mode='lin',seenM={};var ia=ct.querySelector('[name=a]'),ib=ct.querySelector('[name=b]');
  var FN={lin:function(x,a,b){return a*x+b;},quad:function(x,a,b){return a*x*x+b;},sig:function(x,a,b){return 1/(1+Math.exp(-(a*x+b)));},relu:function(x,a,b){return Math.max(0,a*x+b);}};
  var NAME={lin:'직선 f(x) = a·x + b',quad:'2차 f(x) = a·x² + b',sig:'시그모이드 f(x) = 1 / (1 + e^−(a·x + b))',relu:'ReLU f(x) = max(0, a·x + b)'};
  var RANGE={lin:'치역: a ≠ 0이면 모든 실수',quad:'치역: a > 0이면 b 이상, a < 0이면 b 이하',sig:'치역: 언제나 0과 1 사이 → 확률로 읽을 수 있음',relu:'치역: 0 이상 (음수는 0으로 자름)'};
  ct.querySelectorAll('[data-mode]').forEach(function(bt){bt.addEventListener('click',function(){mode=bt.getAttribute('data-mode');ct.querySelectorAll('[data-mode]').forEach(function(x){x.classList.toggle('on',x===bt);});draw();});});
  [ia,ib].forEach(function(i){i.addEventListener('input',draw);});
  function draw(){var a=+ia.value,b=+ib.value;seenM[mode]=1;var s=svgOf(host,640,380);var Pp=plane(s,{W:640,H:380,x0:0,x1:5,y0:-1,y1:7,step:1,xl:'길이 (10cm)',yl:'무게 (100g)'});
    var d='';for(var i=0;i<=200;i++){var x=5*i/200;var y=FN[mode](x,a,b);y=clamp(y,-1.5,7.5);d+=(i?'L':'M')+Pp.X(x)+','+Pp.Y(y);}
    el('path',{d:d,fill:'none',stroke:C.orange,'stroke-width':3},s);var err=0;
    F1X.forEach(function(x,i){var f=FN[mode](x,a,b);err+=Math.abs(f-F1Y[i]);dash(s,Pp.X(x),Pp.Y(F1Y[i]),Pp.X(x),Pp.Y(clamp(f,-1.5,7.5)),'red');dot(s,Pp.X(x),Pp.Y(F1Y[i]),'teal',7);});
    ct.querySelector('.fnow').textContent=NAME[mode];
    var ex=F1X[2];live(host,'<b>'+NAME[mode]+'</b><div class="formula-live">a = '+num(a)+', b = '+num(b)+' · 길이 30cm(x = 3)를 넣으면 f(3) = '+fmt(FN[mode](ex,a,b),2)+' → 무게 약 '+fmt(FN[mode](ex,a,b)*100,0)+'g (실제 260g)</div>'+
      '빗나간 양 합계(빨간 점선 길이의 합) = <b>'+fmt(err,2)+'</b> (100g 단위)<br><span class="hint">'+RANGE[mode]+'</span>');
    if(Object.keys(seenM).length>=4)mission(host,0);if(mode==='lin'&&err<=2.2)mission(host,1);if(mode==='quad'&&err<=1.2)mission(host,2);}
  draw();};

/* --- 2장: 생선 표 만들기 --- */
var F2=[0,4,9,13,17,22].map(function(i){return DATA.perch[i];});
P.table=function(host){var ct=ctrlOf(host);var pick=[],feat={L:1,H:0,W:0};var FN={L:'길이(cm)',H:'높이(cm)',W:'무게(g)'},IX={L:0,H:1,W:2};
  var fb=ct.querySelector('.fishbtn');fb.innerHTML=F2.map(function(f,i){return '<button type="button" data-f="'+i+'">🐟 농어'+(i+1)+'</button>';}).join('');
  fb.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){var i=+b.getAttribute('data-f');var k=pick.indexOf(i);if(k>=0)pick.splice(k,1);else pick.push(i);b.classList.toggle('on',k<0);draw();});});
  ct.querySelectorAll('[data-feat]').forEach(function(b){b.classList.toggle('on',!!feat[b.getAttribute('data-feat')]);b.addEventListener('click',function(){var k=b.getAttribute('data-feat');feat[k]=feat[k]?0:1;b.classList.toggle('on',!!feat[k]);draw();});});
  function draw(){var cols=['L','H','W'].filter(function(k){return feat[k];});var m=pick.length,n=cols.length;
    var h='<div style="display:flex;gap:18px;flex-wrap:wrap;align-items:center;padding:6px 0">';
    if(!m||!n){h+='<p class="muted">위 버튼으로 생선과 특성을 골라 표를 만들어 보세요.</p>';}
    else{h+='<div class="tbl" style="width:auto"><table style="width:auto"><thead><tr><th></th>'+cols.map(function(k){return '<th>'+FN[k]+'</th>';}).join('')+'</tr></thead><tbody>'+
      pick.map(function(i){return '<tr><th>농어'+(i+1)+'</th>'+cols.map(function(k){return '<td class="tn">'+F2[i][IX[k]]+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table></div>';
      h+='<span style="font-size:22px">→</span><div class="mat">X =<table>'+pick.map(function(i){return '<tr>'+cols.map(function(k){return '<td>'+F2[i][IX[k]]+'</td>';}).join('')+'</tr>';}).join('')+'</table></div>';}
    h+='</div>';host.innerHTML=h;
    live(host,m&&n?'행렬 X의 모양 = <b>'+m+' × '+n+'</b> (가로줄 '+m+'개 = 생선 '+m+'마리, 세로줄 '+n+'개 = 특성 '+n+'개)'+(m===n?' · <span class="alert">가로줄 수 = 세로줄 수 → 정사각행렬</span>':''):'아직 비어 있는 표입니다.');
    if(m>=1&&n>=1)mission(host,0);if(m===4&&n===2)mission(host,1);if(m===n&&m>=2)mission(host,2);}
  draw();};

/* --- 3장: 닮은 생선 찾기 (벡터) --- */
P.vec=function(host){var A=[4,1],B=[1,3];
  function draw(){var s=svgOf(host,560,420);var Pp=plane(s,{W:560,H:420,x0:-1,x1:7,y0:-1,y1:6,step:1,equal:true,xl:'x₁',yl:'x₂'});
    dash(s,Pp.X(A[0]),Pp.Y(A[1]),Pp.X(B[0]),Pp.Y(B[1]),'muted');
    arrow(s,Pp.X(0),Pp.Y(0),Pp.X(A[0]),Pp.Y(A[1]),'blue',4);arrow(s,Pp.X(0),Pp.Y(0),Pp.X(B[0]),Pp.Y(B[1]),'green',4);
    txt(s,Pp.X(A[0])+10,Pp.Y(A[1])-8,'a',{size:18,fill:C.blue});txt(s,Pp.X(B[0])+10,Pp.Y(B[1])-8,'b',{size:18,fill:C.green});
    [[A,'blue'],[B,'green']].forEach(function(v){var g=handle(s,Pp.X(v[0][0]),Pp.Y(v[0][1]),v[1]);drag(s,g,function(px,py){var q=Pp.inv(px,py);v[0][0]=clamp(snap(q[0],.5),-1,7);v[0][1]=clamp(snap(q[1],.5),-1,6);draw();});});
    var dt=A[0]*B[0]+A[1]*B[1],na=Math.hypot(A[0],A[1]),nb=Math.hypot(B[0],B[1]),dist=Math.hypot(A[0]-B[0],A[1]-B[1]);var cs=(na&&nb)?dt/(na*nb):NaN;
    live(host,'a = ('+num(A[0])+', '+num(A[1])+'), b = ('+num(B[0])+', '+num(B[1])+')'+
      '<div class="formula-live">a·b = '+num(A[0])+'×'+num(B[0])+' + '+num(A[1])+'×'+num(B[1])+' = '+num(dt)+' · ‖a‖ = √('+num(A[0])+'² + '+num(A[1])+'²) = '+fmt(na,2)+' · ‖b‖ = '+fmt(nb,2)+'</div>'+
      '각도로 본 닮음 cos θ = <b>'+(isNaN(cs)?'—':fmt(cs,3))+'</b>'+(isNaN(cs)?'':' (θ ≈ '+fmt(Math.acos(clamp(cs,-1,1))*180/Math.PI,1)+'°)')+' · 거리로 본 닮음 ‖a − b‖ = <b>'+fmt(dist,2)+'</b> (점선)');
    if(na&&nb&&Math.abs(cs)<0.02)mission(host,0);if(cs>0.995&&dist>=3)mission(host,1);if(Math.abs(na-5)<1e-9&&A[0]!==0&&A[1]!==0)mission(host,2);}
  draw();};

/* --- 4장: 행렬곱 공장 --- */
P.matmul=function(host){var ct=ctrlOf(host);var w1=ct.querySelector('[name=w1]'),w2=ct.querySelector('[name=w2]'),bb=ct.querySelector('[name=b]');var shape=2,errSeen=false,row=-1;
  ct.querySelectorAll('[data-shape]').forEach(function(b){b.addEventListener('click',function(){shape=+b.getAttribute('data-shape');ct.querySelectorAll('[data-shape]').forEach(function(x){x.classList.toggle('on',x===b);});if(shape===3)errSeen=true;draw();});});
  [w1,w2,bb].forEach(function(i){i.addEventListener('input',draw);});
  function draw(){var a=+w1.value,c=+w2.value,b=+bb.value;
    if(shape===3){host.innerHTML='<div class="limit"><b>모양 오류!</b> X는 (6 × <b>2</b>), 가중치는 (<b>3</b> × 1)입니다. 가운데 두 숫자 2와 3이 달라 곱할 수 없습니다. 신경망에서 자주 보는 "shape mismatch" 오류의 정체가 이것입니다.</div>';
      live(host,'<span class="bad">곱셈 불가</span> — 가중치 모양을 2 × 1로 되돌려 보세요.');return;}
    var mae=0,rows=F2.map(function(f,i){var p=a*f[0]+c*f[1]+b;mae+=Math.abs(p-f[2]);return [f,p];});mae/=6;
    host.innerHTML='<div class="tbl"><table><thead><tr><th>생선</th><th>길이</th><th>높이</th><th>예측 무게 = 길이×w₁ + 높이×w₂ + b</th><th>실제</th><th>빗나감</th></tr></thead><tbody>'+
      rows.map(function(r,i){return '<tr data-r="'+i+'" style="cursor:pointer'+(i===row?';background:#fff7e8':'')+'"><td>농어'+(i+1)+' 👆</td><td class="tn">'+r[0][0]+'</td><td class="tn">'+r[0][1]+'</td><td class="tn">'+fmt(r[1],0)+'g</td><td class="tn">'+r[0][2]+'g</td><td class="tn">'+fmt(Math.abs(r[1]-r[0][2]),0)+'g</td></tr>';}).join('')+'</tbody></table></div>';
    host.querySelectorAll('tr[data-r]').forEach(function(tr){tr.addEventListener('click',function(){row=+tr.getAttribute('data-r');mission(host,0);draw();});});
    var rr=row>=0?'<div class="formula-live">농어'+(row+1)+' 한 줄 = 내적: ('+F2[row][0]+', '+F2[row][1]+', 1)·('+a+', '+c+', '+b+') = '+F2[row][0]+'×'+a+' + '+F2[row][1]+'×'+c+' + 1×'+b+' = '+fmt(rows[row][1],1)+'</div>':'<span class="hint">표의 가로줄을 눌러 보세요. 한 줄의 계산이 내적으로 풀립니다.</span>';
    live(host,'(6 × 2) 행렬 × (2 × 1) 가중치 + b → (6 × 1) 예측 6개를 한 번에. 평균 빗나감 = <b>'+fmt(mae,1)+'g</b>'+rr);
    if(errSeen&&shape===2)mission(host,1);if(mae<=75)mission(host,2);}
  draw();};

/* --- 5장: 한 번에 풀기 (정규방정식·행렬식·릿지) --- */
P.solve=function(host){var ct=ctrlOf(host);var lam=ct.querySelector('[name=lam]');var pts=[[1,2],[3,3.5],[5,5],[7,6.2],[9,8]],moved=false;
  ct.querySelector('[data-act=stack]').addEventListener('click',function(){pts=[[5,2],[5.1,4],[4.9,5.5],[5,7],[5.1,8.5]];lam.value=0;draw();});
  ct.querySelector('[data-act=reset]').addEventListener('click',function(){pts=[[1,2],[3,3.5],[5,5],[7,6.2],[9,8]];lam.value=0;draw();});
  lam.addEventListener('input',draw);
  function draw(){var L=+lam.value;var n=pts.length,sx=0,sxx=0,sy=0,sxy=0;pts.forEach(function(p){sx+=p[0];sxx+=p[0]*p[0];sy+=p[1];sxy+=p[0]*p[1];});
    var a11=n+L,a12=sx,a22=sxx+L;var det0=n*sxx-sx*sx,det=a11*a22-a12*a12;var ok=Math.abs(det)>1e-9;var b0=NaN,b1=NaN;
    if(ok){b0=(a22*sy-a12*sxy)/det;b1=(a11*sxy-a12*sy)/det;}
    var s=svgOf(host,600,400);var Pp=plane(s,{W:600,H:400,x0:0,x1:10,y0:0,y1:10,step:1,label:2,xl:'x',yl:'y'});
    if(ok){var X0=0,X1=10;el('line',{x1:Pp.X(X0),y1:Pp.Y(clamp(b0+b1*X0,-40,50)),x2:Pp.X(X1),y2:Pp.Y(clamp(b0+b1*X1,-40,50)),stroke:Math.abs(b1)>3?C.red:C.orange,'stroke-width':3},s);}
    pts.forEach(function(p){var g=handle(s,Pp.X(p[0]),Pp.Y(p[1]),'teal');drag(s,g,function(px,py){var q=Pp.inv(px,py);p[0]=clamp(snap(q[0],.1),0,10);p[1]=clamp(snap(q[1],.1),0,10);moved=true;draw();});});
    var M='<span class="mat">XᵀX'+(L?' + λI':'')+' =<table><tr><td>'+fmt(a11,2)+'</td><td>'+fmt(a12,2)+'</td></tr><tr><td>'+fmt(a12,2)+'</td><td>'+fmt(a22,2)+'</td></tr></table></span>';
    live(host,M+'<div class="formula-live">행렬식 det(XᵀX) = n·Σx² − (Σx)² = '+fmt(det0,3)+(L?' → λ를 더하면 '+fmt(det,3):'')+'</div>'+
      (ok?'직선: y = <b>'+fmt(b1,2)+'</b>·x + '+fmt(b0,2)+(Math.abs(b1)>3?' <span class="bad">← 기울기가 크게 흔들림</span>':''):'<span class="bad">행렬식이 0 → 역행렬이 없어 한 번에 풀 수 없음</span>')+
      '<br><span class="hint">β = (XᵀX'+(L?' + λI':'')+')⁻¹ Xᵀy · λ = '+L+(L?' (여기서는 단순하게 절편에도 λ를 더했어요)':'')+'</span>');
    if(moved)mission(host,0);if(det0<1&&L===0)mission(host,1);if(det0<1&&L>0&&ok&&Math.abs(b1)<3)mission(host,2);}
  draw();};

/* --- 1부 대결: 릿지 vs 보통 회귀 (처음 보는 생선으로 채점) --- */
DUELCALC.duel1=function(){var tx=[4.8,4.9,5.0,5.1,5.2],nz=[0.6,-0.5,0.3,-0.6,0.4],ty=tx.map(function(x,i){return 0.9*x+0.5+nz[i];});var sx=[1,3,5,7,9];
  function fit(L){var n=5,s1=0,s2=0,sy=0,sxy=0;tx.forEach(function(x,i){s1+=x;s2+=x*x;sy+=ty[i];sxy+=x*ty[i];});var a=n+L,b=s1,c=s2+L,det=a*c-b*b;return[(c*sy-b*sxy)/det,(a*sxy-b*sy)/det];}
  function mae(L){var b=fit(L),e=0;sx.forEach(function(x){e+=Math.abs(b[0]+b[1]*x-(0.9*x+0.5));});return e/5;}
  return {l:mae(0.5),r:mae(0),unit:'',d:2,what:'처음 보는 생선 5마리 평균 빗나감(100g 단위)'};};
