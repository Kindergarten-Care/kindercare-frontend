(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,55685,e=>{"use strict";var t=e.i(43476),i=e.i(932),o=e.i(97053),a=e.i(71645),n=e.i(61745);function r(e,t){return(...e)=>{try{return t(...e)}catch{throw Error(void 0)}}}let s=r(0,n.useTranslations);r(0,n.useFormatter);let d=o.keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`,l=o.keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`,m=o.keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`,c=o.keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,p=o.default.div.withConfig({displayName:"page__Container",componentId:"sc-776073b3-0"})`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #fdf4ff, #fae8ff, #f0f9ff, #ecfeff);
  background-size: 400% 400%;
  animation: ${c} 15s ease infinite;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  overflow: hidden;
  position: relative;
  padding: 2rem;
`,f=o.default.div.withConfig({displayName:"page__Decoration",componentId:"sc-776073b3-1"})`
  position: absolute;
  top: ${e=>e.$top};
  left: ${e=>e.$left};
  font-size: ${e=>e.$size};
  animation: ${d} 6s ease-in-out infinite;
  animation-delay: ${e=>e.$delay};
  opacity: 0.4;
  user-select: none;
  pointer-events: none;
  z-index: 1;
`,g=o.default.div.withConfig({displayName:"page__GlassCard",componentId:"sc-776073b3-2"})`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 2.5rem;
  padding: 4rem 3rem;
  max-width: 650px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  animation: ${m} 1s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 10;

  @media (max-width: 480px) {
    padding: 3rem 1.5rem;
  }
`,h=o.default.div.withConfig({displayName:"page__LogoWrapper",componentId:"sc-776073b3-3"})`
  margin-bottom: 2rem;
  display: inline-block;
  font-size: 3rem;
  animation: ${l} 3s infinite ease-in-out;
`,b=o.default.div.withConfig({displayName:"page__StatusBadge",componentId:"sc-776073b3-4"})`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #fdf2f8;
  color: #db2777;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid #fbcfe8;
`,u=o.default.span.withConfig({displayName:"page__Dot",componentId:"sc-776073b3-5"})`
  width: 8px;
  height: 8px;
  background: #db2777;
  border-radius: 50%;
  display: inline-block;
  animation: ${l} 1.5s infinite;
`,x=o.default.h1.withConfig({displayName:"page__Title",componentId:"sc-776073b3-6"})`
  font-size: 3.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(to right, #6366f1, #a855f7, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`,y=o.default.p.withConfig({displayName:"page__Description",componentId:"sc-776073b3-7"})`
  color: #64748b;
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`,_=o.default.div.withConfig({displayName:"page__ProgressContainer",componentId:"sc-776073b3-8"})`
  width: 100%;
  background: #f1f5f9;
  height: 12px;
  border-radius: 999px;
  margin-bottom: 3rem;
  overflow: hidden;
  position: relative;
`,w=o.default.div.withConfig({displayName:"page__ProgressBar",componentId:"sc-776073b3-9"})`
  height: 100%;
  width: ${e=>e.width}%;
  background: linear-gradient(to right, #6366f1, #a855f7);
  border-radius: 999px;
  transition: width 1s ease-in-out;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: loading 2s infinite linear;
  }

  @keyframes loading {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
  }
`,$=o.default.div.withConfig({displayName:"page__ProgressText",componentId:"sc-776073b3-10"})`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  font-weight: 600;
  color: #94a3b8;
  margin-top: 0.75rem;
`,j=o.default.div.withConfig({displayName:"page__InputGroup",componentId:"sc-776073b3-11"})`
  display: flex;
  gap: 0.75rem;
  max-width: 450px;
  margin: 0 auto;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`,k=o.default.input.withConfig({displayName:"page__Input",componentId:"sc-776073b3-12"})`
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }
`,v=o.default.button.withConfig({displayName:"page__Button",componentId:"sc-776073b3-13"})`
  background: #1e293b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #0f172a;
    transform: translateY(-2px);
  }
`,C=o.default.div.withConfig({displayName:"page__Footer",componentId:"sc-776073b3-14"})`
  margin-top: 3rem;
  font-size: 0.875rem;
  color: #94a3b8;
`;e.s(["default",0,function(){let e,o,n,r,d,l,m,c,z,I,N,S,T,B,P,Y,D,K,A,E,F,G,L,O,R,U,X,W,q,H,J,M,Q,V,Z,ee,et=(0,i.c)(68),ei=s("ComingSoon"),[eo,ea]=(0,a.useState)(0);return et[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=setTimeout(()=>ea(75),500);return()=>clearTimeout(e)},o=[],et[0]=e,et[1]=o):(e=et[0],o=et[1]),(0,a.useEffect)(e,o),et[2]===Symbol.for("react.memo_cache_sentinel")?(n=(0,t.jsx)(f,{$top:"15%",$left:"10%",$delay:"0s",$size:"4rem",children:"🎨"}),r=(0,t.jsx)(f,{$top:"20%",$left:"85%",$delay:"1s",$size:"3rem",children:"🧩"}),d=(0,t.jsx)(f,{$top:"75%",$left:"15%",$delay:"2s",$size:"3.5rem",children:"🧸"}),l=(0,t.jsx)(f,{$top:"80%",$left:"80%",$delay:"1.5s",$size:"4rem",children:"🌈"}),m=(0,t.jsx)(f,{$top:"10%",$left:"50%",$delay:"0.5s",$size:"2.5rem",children:"📚"}),et[2]=n,et[3]=r,et[4]=d,et[5]=l,et[6]=m):(n=et[2],r=et[3],d=et[4],l=et[5],m=et[6]),et[7]===Symbol.for("react.memo_cache_sentinel")?(c=(0,t.jsx)(h,{children:"🏠"}),et[7]=c):c=et[7],et[8]===Symbol.for("react.memo_cache_sentinel")?(z=(0,t.jsx)(u,{}),et[8]=z):z=et[8],et[9]!==ei?(I=ei("badge"),et[9]=ei,et[10]=I):I=et[10],et[11]!==I?(N=(0,t.jsx)("div",{children:(0,t.jsxs)(b,{children:[z," ",I]})}),et[11]=I,et[12]=N):N=et[12],et[13]===Symbol.for("react.memo_cache_sentinel")?(S=(0,t.jsx)("span",{children:"KinderCare"}),et[13]=S):S=et[13],et[14]!==ei?(T=ei("title"),et[14]=ei,et[15]=T):T=et[15],et[16]!==T?(B=(0,t.jsxs)(x,{children:[S," ",T]}),et[16]=T,et[17]=B):B=et[17],et[18]!==ei?(P=ei("description"),et[18]=ei,et[19]=P):P=et[19],et[20]!==P?(Y=(0,t.jsx)(y,{children:P}),et[20]=P,et[21]=Y):Y=et[21],et[22]===Symbol.for("react.memo_cache_sentinel")?(D={position:"relative"},et[22]=D):D=et[22],et[23]!==eo?(K=(0,t.jsx)(_,{children:(0,t.jsx)(w,{width:eo})}),et[23]=eo,et[24]=K):K=et[24],et[25]!==ei?(A=ei("progressLabel"),et[25]=ei,et[26]=A):A=et[26],et[27]!==A?(E=(0,t.jsx)("span",{children:A}),et[27]=A,et[28]=E):E=et[28],et[29]!==eo?(F=(0,t.jsxs)("span",{children:[eo,"%"]}),et[29]=eo,et[30]=F):F=et[30],et[31]!==E||et[32]!==F?(G=(0,t.jsxs)($,{children:[E,F]}),et[31]=E,et[32]=F,et[33]=G):G=et[33],et[34]!==K||et[35]!==G?(L=(0,t.jsxs)("div",{style:D,children:[K,G]}),et[34]=K,et[35]=G,et[36]=L):L=et[36],et[37]===Symbol.for("react.memo_cache_sentinel")?(O={marginTop:"2rem"},et[37]=O):O=et[37],et[38]===Symbol.for("react.memo_cache_sentinel")?(R={fontSize:"0.9rem",marginBottom:"1rem"},et[38]=R):R=et[38],et[39]!==ei?(U=ei("emailPrompt"),et[39]=ei,et[40]=U):U=et[40],et[41]!==U?(X=(0,t.jsx)(y,{style:R,children:U}),et[41]=U,et[42]=X):X=et[42],et[43]!==ei?(W=ei("emailPlaceholder"),et[43]=ei,et[44]=W):W=et[44],et[45]!==W?(q=(0,t.jsx)(k,{type:"email",placeholder:W}),et[45]=W,et[46]=q):q=et[46],et[47]!==ei?(H=ei("notifyButton"),et[47]=ei,et[48]=H):H=et[48],et[49]!==H?(J=(0,t.jsx)(v,{children:H}),et[49]=H,et[50]=J):J=et[50],et[51]!==q||et[52]!==J?(M=(0,t.jsxs)(j,{children:[q,J]}),et[51]=q,et[52]=J,et[53]=M):M=et[53],et[54]!==X||et[55]!==M?(Q=(0,t.jsxs)("div",{style:O,children:[X,M]}),et[54]=X,et[55]=M,et[56]=Q):Q=et[56],et[57]!==ei?(V=ei("footer"),et[57]=ei,et[58]=V):V=et[58],et[59]!==V?(Z=(0,t.jsx)(C,{children:V}),et[59]=V,et[60]=Z):Z=et[60],et[61]!==N||et[62]!==B||et[63]!==Y||et[64]!==L||et[65]!==Q||et[66]!==Z?(ee=(0,t.jsxs)(p,{children:[n,r,d,l,m,(0,t.jsxs)(g,{children:[c,N,B,Y,L,Q,Z]})]}),et[61]=N,et[62]=B,et[63]=Y,et[64]=L,et[65]=Q,et[66]=Z,et[67]=ee):ee=et[67],ee}],55685)}]);