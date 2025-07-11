import{c as s,r as i,j as t}from"./index-DpIRGi-P.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],g=s("circle-alert",u);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["line",{x1:"4",x2:"20",y1:"9",y2:"9",key:"4lhtct"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15",key:"vyu0kd"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21",key:"1ggp8o"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21",key:"weycgp"}]],k=s("hash",x);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],f=s("star",y);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],h=s("zap",p),v=({searchTerm:r,setSearchTerm:c,setSelectedWeapon:l,showSearchResults:d,setShowSearchResults:a,getFilteredWeapons:o})=>{const n=i.useCallback(e=>{e.target.closest(".weapon-search-container")||a(!1)},[a]);i.useEffect(()=>(document.addEventListener("click",n),()=>{document.removeEventListener("click",n)}),[n]);const m=e=>{l(e.id),c(e.name),a(!1)};return t.jsxs("div",{className:"relative weapon-search-container",children:[t.jsxs("label",{className:"block text-sm font-medium text-gray-300 mb-2",children:[t.jsx(h,{className:"inline h-4 w-4 mr-1"}),"Item ",t.jsx("span",{className:"text-red-400",children:"*"})]}),t.jsx("input",{type:"text",value:r,onChange:e=>{c(e.target.value),a(!0),e.target.value||l("")},onFocus:()=>a(!0),placeholder:"Item adı veya ID'si yazın...",className:"w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"}),d&&r.trim()&&t.jsx("div",{className:"absolute z-10 w-full mt-1 bg-slate-800 border border-white/20 rounded-lg max-h-60 overflow-y-auto",children:o().length>0?o().map(e=>t.jsx("div",{onClick:()=>m(e),className:"p-2 hover:bg-purple-600/30 cursor-pointer text-white border-b border-white/10 last:border-b-0",children:e.name},e.id)):t.jsx("div",{className:"p-2 text-gray-400 text-sm",children:"Sonuç bulunamadı"})})]})},N=["Bridgewatch","Caerleon","Fort Sterling","Lymhurst","Martlock","Thetford","Brecilien","Morganas Rest"],j=["T1","T2","T3","T4","T5","T6","T7","T8"],C=["0","1","2","3","4"],_=["1","2","3","4","5"],w={items:"https://raw.githubusercontent.com/ao-data/ao-bin-dumps/master/formatted/items.txt",prices:"https://europe.albion-online-data.com/api/v2/stats/prices"},A={CACHE_DURATION:5*60*1e3};export{w as A,g as C,k as H,v as I,A as P,f as S,h as Z,N as c,C as e,_ as q,j as t};
