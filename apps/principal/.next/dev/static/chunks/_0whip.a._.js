(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/principal/src/app/[locale]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UnderDevelopment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const float = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;
const pulse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;
const slideUp = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;
const gradientBG = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const Container = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "page__Container",
    componentId: "sc-776073b3-0"
})`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #fdf4ff, #fae8ff, #f0f9ff, #ecfeff);
  background-size: 400% 400%;
  animation: ${gradientBG} 15s ease infinite;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  overflow: hidden;
  position: relative;
  padding: 2rem;
`;
_c = Container;
const Decoration = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "page__Decoration",
    componentId: "sc-776073b3-1"
})`
  position: absolute;
  top: ${(props)=>props.$top};
  left: ${(props)=>props.$left};
  font-size: ${(props)=>props.$size};
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${(props)=>props.$delay};
  opacity: 0.4;
  user-select: none;
  pointer-events: none;
  z-index: 1;
`;
_c1 = Decoration;
const GlassCard = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "page__GlassCard",
    componentId: "sc-776073b3-2"
})`
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
  animation: ${slideUp} 1s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  z-index: 10;

  @media (max-width: 480px) {
    padding: 3rem 1.5rem;
  }
`;
_c2 = GlassCard;
const LogoWrapper = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "page__LogoWrapper",
    componentId: "sc-776073b3-3"
})`
  margin-bottom: 2rem;
  display: inline-block;
  font-size: 3rem;
  animation: ${pulse} 3s infinite ease-in-out;
`;
_c3 = LogoWrapper;
const StatusBadge = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "page__StatusBadge",
    componentId: "sc-776073b3-4"
})`
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
`;
_c4 = StatusBadge;
const Dot = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].span.withConfig({
    displayName: "page__Dot",
    componentId: "sc-776073b3-5"
})`
  width: 8px;
  height: 8px;
  background: #db2777;
  border-radius: 50%;
  display: inline-block;
  animation: ${pulse} 1.5s infinite;
`;
_c5 = Dot;
const Title = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].h1.withConfig({
    displayName: "page__Title",
    componentId: "sc-776073b3-6"
})`
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
`;
_c6 = Title;
const Description = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].p.withConfig({
    displayName: "page__Description",
    componentId: "sc-776073b3-7"
})`
  color: #64748b;
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;
_c7 = Description;
const ProgressContainer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "page__ProgressContainer",
    componentId: "sc-776073b3-8"
})`
  width: 100%;
  background: #f1f5f9;
  height: 12px;
  border-radius: 999px;
  margin-bottom: 3rem;
  overflow: hidden;
  position: relative;
`;
_c8 = ProgressContainer;
const ProgressBar = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "page__ProgressBar",
    componentId: "sc-776073b3-9"
})`
  height: 100%;
  width: ${(props)=>props.width}%;
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
`;
_c9 = ProgressBar;
const ProgressText = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "page__ProgressText",
    componentId: "sc-776073b3-10"
})`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  font-weight: 600;
  color: #94a3b8;
  margin-top: 0.75rem;
`;
_c10 = ProgressText;
const InputGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "page__InputGroup",
    componentId: "sc-776073b3-11"
})`
  display: flex;
  gap: 0.75rem;
  max-width: 450px;
  margin: 0 auto;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
_c11 = InputGroup;
const Input = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].input.withConfig({
    displayName: "page__Input",
    componentId: "sc-776073b3-12"
})`
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
`;
_c12 = Input;
const Button = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].button.withConfig({
    displayName: "page__Button",
    componentId: "sc-776073b3-13"
})`
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
`;
_c13 = Button;
const Footer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "page__Footer",
    componentId: "sc-776073b3-14"
})`
  margin-top: 3rem;
  font-size: 0.875rem;
  color: #94a3b8;
`;
_c14 = Footer;
;
function UnderDevelopment() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(69);
    if ($[0] !== "34fe2fbeb96195d6823841aa820c7a79645f8b9f24870f0141255506ca994030") {
        for(let $i = 0; $i < 69; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "34fe2fbeb96195d6823841aa820c7a79645f8b9f24870f0141255506ca994030";
    }
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])("ComingSoon");
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "UnderDevelopment[useEffect()]": ()=>{
                const timer = setTimeout({
                    "UnderDevelopment[useEffect() > setTimeout()]": ()=>setProgress(75)
                }["UnderDevelopment[useEffect() > setTimeout()]"], 500);
                return ()=>clearTimeout(timer);
            }
        })["UnderDevelopment[useEffect()]"];
        t1 = [];
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Decoration, {
            $top: "15%",
            $left: "10%",
            $delay: "0s",
            $size: "4rem",
            children: "🎨"
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 257,
            columnNumber: 10
        }, this);
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Decoration, {
            $top: "20%",
            $left: "85%",
            $delay: "1s",
            $size: "3rem",
            children: "🧩"
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 258,
            columnNumber: 10
        }, this);
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Decoration, {
            $top: "75%",
            $left: "15%",
            $delay: "2s",
            $size: "3.5rem",
            children: "🧸"
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 259,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Decoration, {
            $top: "80%",
            $left: "80%",
            $delay: "1.5s",
            $size: "4rem",
            children: "🌈"
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 260,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Decoration, {
            $top: "10%",
            $left: "50%",
            $delay: "0.5s",
            $size: "2.5rem",
            children: "📚"
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 261,
            columnNumber: 10
        }, this);
        $[3] = t2;
        $[4] = t3;
        $[5] = t4;
        $[6] = t5;
        $[7] = t6;
    } else {
        t2 = $[3];
        t3 = $[4];
        t4 = $[5];
        t5 = $[6];
        t6 = $[7];
    }
    let t7;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LogoWrapper, {
            children: "🏠"
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 276,
            columnNumber: 10
        }, this);
        $[8] = t7;
    } else {
        t7 = $[8];
    }
    let t8;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dot, {}, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 283,
            columnNumber: 10
        }, this);
        $[9] = t8;
    } else {
        t8 = $[9];
    }
    let t9;
    if ($[10] !== t) {
        t9 = t("badge");
        $[10] = t;
        $[11] = t9;
    } else {
        t9 = $[11];
    }
    let t10;
    if ($[12] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusBadge, {
                children: [
                    t8,
                    " ",
                    t9
                ]
            }, void 0, true, {
                fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
                lineNumber: 298,
                columnNumber: 16
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 298,
            columnNumber: 11
        }, this);
        $[12] = t9;
        $[13] = t10;
    } else {
        t10 = $[13];
    }
    let t11;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "KinderCare"
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 306,
            columnNumber: 11
        }, this);
        $[14] = t11;
    } else {
        t11 = $[14];
    }
    let t12;
    if ($[15] !== t) {
        t12 = t("title");
        $[15] = t;
        $[16] = t12;
    } else {
        t12 = $[16];
    }
    let t13;
    if ($[17] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
            children: [
                t11,
                " ",
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 321,
            columnNumber: 11
        }, this);
        $[17] = t12;
        $[18] = t13;
    } else {
        t13 = $[18];
    }
    let t14;
    if ($[19] !== t) {
        t14 = t("description");
        $[19] = t;
        $[20] = t14;
    } else {
        t14 = $[20];
    }
    let t15;
    if ($[21] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Description, {
            children: t14
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 337,
            columnNumber: 11
        }, this);
        $[21] = t14;
        $[22] = t15;
    } else {
        t15 = $[22];
    }
    let t16;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = {
            position: "relative"
        };
        $[23] = t16;
    } else {
        t16 = $[23];
    }
    let t17;
    if ($[24] !== progress) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProgressContainer, {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProgressBar, {
                width: progress
            }, void 0, false, {
                fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
                lineNumber: 354,
                columnNumber: 30
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 354,
            columnNumber: 11
        }, this);
        $[24] = progress;
        $[25] = t17;
    } else {
        t17 = $[25];
    }
    let t18;
    if ($[26] !== t) {
        t18 = t("progressLabel");
        $[26] = t;
        $[27] = t18;
    } else {
        t18 = $[27];
    }
    let t19;
    if ($[28] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: t18
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 370,
            columnNumber: 11
        }, this);
        $[28] = t18;
        $[29] = t19;
    } else {
        t19 = $[29];
    }
    let t20;
    if ($[30] !== progress) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: [
                progress,
                "%"
            ]
        }, void 0, true, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 378,
            columnNumber: 11
        }, this);
        $[30] = progress;
        $[31] = t20;
    } else {
        t20 = $[31];
    }
    let t21;
    if ($[32] !== t19 || $[33] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProgressText, {
            children: [
                t19,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 386,
            columnNumber: 11
        }, this);
        $[32] = t19;
        $[33] = t20;
        $[34] = t21;
    } else {
        t21 = $[34];
    }
    let t22;
    if ($[35] !== t17 || $[36] !== t21) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t16,
            children: [
                t17,
                t21
            ]
        }, void 0, true, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 395,
            columnNumber: 11
        }, this);
        $[35] = t17;
        $[36] = t21;
        $[37] = t22;
    } else {
        t22 = $[37];
    }
    let t23;
    if ($[38] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = {
            marginTop: "2rem"
        };
        $[38] = t23;
    } else {
        t23 = $[38];
    }
    let t24;
    if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = {
            fontSize: "0.9rem",
            marginBottom: "1rem"
        };
        $[39] = t24;
    } else {
        t24 = $[39];
    }
    let t25;
    if ($[40] !== t) {
        t25 = t("emailPrompt");
        $[40] = t;
        $[41] = t25;
    } else {
        t25 = $[41];
    }
    let t26;
    if ($[42] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Description, {
            style: t24,
            children: t25
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 431,
            columnNumber: 11
        }, this);
        $[42] = t25;
        $[43] = t26;
    } else {
        t26 = $[43];
    }
    let t27;
    if ($[44] !== t) {
        t27 = t("emailPlaceholder");
        $[44] = t;
        $[45] = t27;
    } else {
        t27 = $[45];
    }
    let t28;
    if ($[46] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Input, {
            type: "email",
            placeholder: t27
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 447,
            columnNumber: 11
        }, this);
        $[46] = t27;
        $[47] = t28;
    } else {
        t28 = $[47];
    }
    let t29;
    if ($[48] !== t) {
        t29 = t("notifyButton");
        $[48] = t;
        $[49] = t29;
    } else {
        t29 = $[49];
    }
    let t30;
    if ($[50] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
            children: t29
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 463,
            columnNumber: 11
        }, this);
        $[50] = t29;
        $[51] = t30;
    } else {
        t30 = $[51];
    }
    let t31;
    if ($[52] !== t28 || $[53] !== t30) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
            children: [
                t28,
                t30
            ]
        }, void 0, true, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 471,
            columnNumber: 11
        }, this);
        $[52] = t28;
        $[53] = t30;
        $[54] = t31;
    } else {
        t31 = $[54];
    }
    let t32;
    if ($[55] !== t26 || $[56] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t23,
            children: [
                t26,
                t31
            ]
        }, void 0, true, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 480,
            columnNumber: 11
        }, this);
        $[55] = t26;
        $[56] = t31;
        $[57] = t32;
    } else {
        t32 = $[57];
    }
    let t33;
    if ($[58] !== t) {
        t33 = t("footer");
        $[58] = t;
        $[59] = t33;
    } else {
        t33 = $[59];
    }
    let t34;
    if ($[60] !== t33) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Footer, {
            children: t33
        }, void 0, false, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 497,
            columnNumber: 11
        }, this);
        $[60] = t33;
        $[61] = t34;
    } else {
        t34 = $[61];
    }
    let t35;
    if ($[62] !== t10 || $[63] !== t13 || $[64] !== t15 || $[65] !== t22 || $[66] !== t32 || $[67] !== t34) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Container, {
            children: [
                t2,
                t3,
                t4,
                t5,
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlassCard, {
                    children: [
                        t7,
                        t10,
                        t13,
                        t15,
                        t22,
                        t32,
                        t34
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
                    lineNumber: 505,
                    columnNumber: 42
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/principal/src/app/[locale]/page.tsx",
            lineNumber: 505,
            columnNumber: 11
        }, this);
        $[62] = t10;
        $[63] = t13;
        $[64] = t15;
        $[65] = t22;
        $[66] = t32;
        $[67] = t34;
        $[68] = t35;
    } else {
        t35 = $[68];
    }
    return t35;
}
_s(UnderDevelopment, "4KPK0ltensrPjMsO+TRbUuFBRto=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c15 = UnderDevelopment;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15;
__turbopack_context__.k.register(_c, "Container");
__turbopack_context__.k.register(_c1, "Decoration");
__turbopack_context__.k.register(_c2, "GlassCard");
__turbopack_context__.k.register(_c3, "LogoWrapper");
__turbopack_context__.k.register(_c4, "StatusBadge");
__turbopack_context__.k.register(_c5, "Dot");
__turbopack_context__.k.register(_c6, "Title");
__turbopack_context__.k.register(_c7, "Description");
__turbopack_context__.k.register(_c8, "ProgressContainer");
__turbopack_context__.k.register(_c9, "ProgressBar");
__turbopack_context__.k.register(_c10, "ProgressText");
__turbopack_context__.k.register(_c11, "InputGroup");
__turbopack_context__.k.register(_c12, "Input");
__turbopack_context__.k.register(_c13, "Button");
__turbopack_context__.k.register(_c14, "Footer");
__turbopack_context__.k.register(_c15, "UnderDevelopment");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFormatter",
    ()=>useFormatter,
    "useTranslations",
    ()=>useTranslations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-intl/dist/esm/development/react.js [app-client] (ecmascript)");
;
/**
 * This is the main entry file when non-'react-server'
 * environments import from 'next-intl'.
 *
 * Maintainer notes:
 * - Make sure this mirrors the API from 'react-server'.
 * - Make sure everything exported from this module is
 *   supported in all Next.js versions that are supported.
 */ // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function callHook(name, hook) {
    return (...args)=>{
        try {
            return hook(...args);
        } catch  {
            throw new Error(`Failed to call \`${name}\` because the context from \`NextIntlClientProvider\` was not found.

This can happen because:
1) You intended to render this component as a Server Component, the render
   failed, and therefore React attempted to render the component on the client
   instead. If this is the case, check the console for server errors.
2) You intended to render this component on the client side, but no context was found.
   Learn more about this error here: https://next-intl.dev/docs/environments/server-client-components#missing-context`);
        }
    };
}
const useTranslations = callHook('useTranslations', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]);
const useFormatter = callHook('useFormatter', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormatter"]);
;
}),
]);

//# sourceMappingURL=_0whip.a._.js.map