module.exports=[3124,a=>{"use strict";var b=a.i(87924),c=a.i(75716),d=a.i(72131),e=a.i(32886);function f(a,b){return(...a)=>{try{return b(...a)}catch{throw Error(void 0)}}}let g=f(0,e.useTranslations);f(0,e.useFormatter);let h=c.keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`,i=c.keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`,j=c.keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`,k=c.keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`,l=c.default.div.withConfig({displayName:"page__Container",componentId:"sc-776073b3-0"})`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #fdf4ff, #fae8ff, #f0f9ff, #ecfeff);
  background-size: 400% 400%;
  animation: ${k} 15s ease infinite;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  overflow: hidden;
  position: relative;
  padding: 2rem;
`,m=c.default.div.withConfig({displayName:"page__Decoration",componentId:"sc-776073b3-1"})`
  position: absolute;
  top: ${a=>a.$top};
  left: ${a=>a.$left};
  font-size: ${a=>a.$size};
  animation: ${h} 6s ease-in-out infinite;
  animation-delay: ${a=>a.$delay};
  opacity: 0.4;
  user-select: none;
  pointer-events: none;
  z-index: 1;
`,n=c.default.div.withConfig({displayName:"page__GlassCard",componentId:"sc-776073b3-2"})`
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
  animation: ${j} 1s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 10;

  @media (max-width: 480px) {
    padding: 3rem 1.5rem;
  }
`,o=c.default.div.withConfig({displayName:"page__LogoWrapper",componentId:"sc-776073b3-3"})`
  margin-bottom: 2rem;
  display: inline-block;
  font-size: 3rem;
  animation: ${i} 3s infinite ease-in-out;
`,p=c.default.div.withConfig({displayName:"page__StatusBadge",componentId:"sc-776073b3-4"})`
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
`,q=c.default.span.withConfig({displayName:"page__Dot",componentId:"sc-776073b3-5"})`
  width: 8px;
  height: 8px;
  background: #db2777;
  border-radius: 50%;
  display: inline-block;
  animation: ${i} 1.5s infinite;
`,r=c.default.h1.withConfig({displayName:"page__Title",componentId:"sc-776073b3-6"})`
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
`,s=c.default.p.withConfig({displayName:"page__Description",componentId:"sc-776073b3-7"})`
  color: #64748b;
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`,t=c.default.div.withConfig({displayName:"page__ProgressContainer",componentId:"sc-776073b3-8"})`
  width: 100%;
  background: #f1f5f9;
  height: 12px;
  border-radius: 999px;
  margin-bottom: 3rem;
  overflow: hidden;
  position: relative;
`,u=c.default.div.withConfig({displayName:"page__ProgressBar",componentId:"sc-776073b3-9"})`
  height: 100%;
  width: ${a=>a.width}%;
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
`,v=c.default.div.withConfig({displayName:"page__ProgressText",componentId:"sc-776073b3-10"})`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  font-weight: 600;
  color: #94a3b8;
  margin-top: 0.75rem;
`,w=c.default.div.withConfig({displayName:"page__InputGroup",componentId:"sc-776073b3-11"})`
  display: flex;
  gap: 0.75rem;
  max-width: 450px;
  margin: 0 auto;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`,x=c.default.input.withConfig({displayName:"page__Input",componentId:"sc-776073b3-12"})`
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
`,y=c.default.button.withConfig({displayName:"page__Button",componentId:"sc-776073b3-13"})`
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
`,z=c.default.div.withConfig({displayName:"page__Footer",componentId:"sc-776073b3-14"})`
  margin-top: 3rem;
  font-size: 0.875rem;
  color: #94a3b8;
`;a.s(["default",0,function(){let a=g("ComingSoon"),[c,e]=(0,d.useState)(0);return(0,d.useEffect)(()=>{let a=setTimeout(()=>e(75),500);return()=>clearTimeout(a)},[]),(0,b.jsxs)(l,{children:[(0,b.jsx)(m,{$top:"15%",$left:"10%",$delay:"0s",$size:"4rem",children:"🎨"}),(0,b.jsx)(m,{$top:"20%",$left:"85%",$delay:"1s",$size:"3rem",children:"🧩"}),(0,b.jsx)(m,{$top:"75%",$left:"15%",$delay:"2s",$size:"3.5rem",children:"🧸"}),(0,b.jsx)(m,{$top:"80%",$left:"80%",$delay:"1.5s",$size:"4rem",children:"🌈"}),(0,b.jsx)(m,{$top:"10%",$left:"50%",$delay:"0.5s",$size:"2.5rem",children:"📚"}),(0,b.jsxs)(n,{children:[(0,b.jsx)(o,{children:"🏠"}),(0,b.jsx)("div",{children:(0,b.jsxs)(p,{children:[(0,b.jsx)(q,{})," ",a("badge")]})}),(0,b.jsxs)(r,{children:[(0,b.jsx)("span",{children:"KinderCare"})," ",a("title")]}),(0,b.jsx)(s,{children:a("description")}),(0,b.jsxs)("div",{style:{position:"relative"},children:[(0,b.jsx)(t,{children:(0,b.jsx)(u,{width:c})}),(0,b.jsxs)(v,{children:[(0,b.jsx)("span",{children:a("progressLabel")}),(0,b.jsxs)("span",{children:[c,"%"]})]})]}),(0,b.jsxs)("div",{style:{marginTop:"2rem"},children:[(0,b.jsx)(s,{style:{fontSize:"0.9rem",marginBottom:"1rem"},children:a("emailPrompt")}),(0,b.jsxs)(w,{children:[(0,b.jsx)(x,{type:"email",placeholder:a("emailPlaceholder")}),(0,b.jsx)(y,{children:a("notifyButton")})]})]}),(0,b.jsx)(z,{children:a("footer")})]})]})}],3124)}];

//# sourceMappingURL=apps_principal_src_app_%5Blocale%5D_page_tsx_0d4ox~a._.js.map