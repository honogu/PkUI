(function(){"use strict";var e={913:function(e,n,i){var t=i(406),a=i(648),o=i(15),r=i(495);const l=(0,o.iH)(),s=(0,o.iH)();function u(){const e=async()=>{const e=await fetch("firms"),n=await e.json();return n||[]},n=async()=>{l.value=await e()},i=async e=>{const n=await fetch("firms/"+e),i=await n.json();i&&(s.value=i)},t=async e=>{const i=new FormData;i.append("Name",e.name),i.append("Image",e.image),i.append("EnglishDescription",e.englishDescription),i.append("EstonianDescription",e.estonianDescription);const t=await fetch("firms",{method:"POST",body:i}),a=await t.json();if(a){if(200!=t.status)return void 0==a.errors?a:a.errors;l.value=a,await n()}},a=async(e,n)=>{const t=new FormData;t.append("Name",e.name),t.append("Image",e.image),t.append("EnglishDescription",e.englishDescription),t.append("EstonianDescription",e.estonianDescription);const a=await fetch("firms/"+n,{method:"PUT",body:t}),o=await a.json();if(o){if(200!=a.status)return void 0==o.errors?o:o.errors;l.value=o,await i(""==e.name?n:e.name)}},o=async e=>{const i=await fetch("firms/"+e,{method:"DELETE"}),t=await i.json();t&&(s.value=t,await n())};return{firm:s,firms:l,load:n,postFirm:t,getFirm:i,updateFirm:a,deleteFirm:o}}const c=e=>((0,a.dD)("data-v-36bf56a2"),e=e(),(0,a.Cn)(),e),m=c((()=>(0,a._)("label",{for:"name"},"Name:",-1))),p=c((()=>(0,a._)("label",{for:"image"},"Image:",-1))),f=["src"],g=["src"],v=c((()=>(0,a._)("label",{for:"englishDescription"},"English description:",-1))),w=c((()=>(0,a._)("label",{for:"estonianDescription"},"Estonian description:",-1))),d=c((()=>(0,a._)("label",{for:"key"},"Key:",-1))),D=c((()=>(0,a._)("button",{type:"submit"},"SALVESTA",-1)));var y=(0,a.aZ)({__name:"FirmForm",props:{firm:null,errors:null},emits:["on-submit"],setup(e,{emit:n}){const i=e;let{load:l}=u();const s=(0,o.iH)({name:i.firm?.name??"",image:i.firm?.image??"",englishDescription:i.firm?.englishDescription??"",estonianDescription:i.firm?.estonianDescription??"",key:""});(0,a.bv)((()=>l()));let c=(0,o.iH)();function y(e){var n=e.target.files||e.dataTransfer.files;n.length&&h(n[0])}function h(e){var n=new FileReader;n.onload=n=>{null!=n.target&&(s.value.image=e,c.value=URL.createObjectURL(e))},n.readAsDataURL(e)}return(l,u)=>((0,a.wg)(),(0,a.iD)("form",{onSubmit:u[5]||(u[5]=(0,t.iM)((e=>n("on-submit",s.value)),["prevent"]))},[m,(0,a.wy)((0,a._)("input",{name:"name","onUpdate:modelValue":u[0]||(u[0]=e=>s.value.name=e),type:"text"},null,512),[[t.nr,s.value.name]]),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.errors?.Name,(e=>((0,a.wg)(),(0,a.iD)("p",{key:e},(0,r.zw)(e),1)))),128)),p,(0,a._)("input",{name:"image",type:"file",onChange:u[1]||(u[1]=e=>y(e))},null,32),void 0!=(0,o.SU)(c)?((0,a.wg)(),(0,a.iD)("img",{key:0,src:(0,o.SU)(c),alt:"Firms logo"},null,8,f)):void 0!=i.firm?.name?((0,a.wg)(),(0,a.iD)("img",{key:1,src:"firms/"+i.firm?.name+"/image/"+(new Date).toISOString(),alt:"Firms logo"},null,8,g)):(0,a.kq)("",!0),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.errors?.Image,(e=>((0,a.wg)(),(0,a.iD)("p",{key:e},(0,r.zw)(e),1)))),128)),v,(0,a.wy)((0,a._)("input",{name:"englishDescription","onUpdate:modelValue":u[2]||(u[2]=e=>s.value.englishDescription=e),type:"text"},null,512),[[t.nr,s.value.englishDescription]]),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.errors?.EnglishDescription,(e=>((0,a.wg)(),(0,a.iD)("p",{key:e},(0,r.zw)(e),1)))),128)),w,(0,a.wy)((0,a._)("input",{name:"estonianDescription","onUpdate:modelValue":u[3]||(u[3]=e=>s.value.estonianDescription=e),type:"text"},null,512),[[t.nr,s.value.estonianDescription]]),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.errors?.EstonianDescription,(e=>((0,a.wg)(),(0,a.iD)("p",{key:e},(0,r.zw)(e),1)))),128)),d,(0,a.wy)((0,a._)("input",{name:"key","onUpdate:modelValue":u[4]||(u[4]=e=>s.value.key=e),type:"text"},null,512),[[t.nr,s.value.key]]),D],32))}}),h=i(744);const b=(0,h.Z)(y,[["__scopeId","data-v-36bf56a2"]]);var k=b;const _={key:0},S=["src"],U={key:1},O=(0,a._)("h1",null,"✏️",-1),F={key:2},H=(0,a._)("h1",null,"❌",-1);var j=(0,a.aZ)({__name:"FirmDetails",emits:["on-toggle"],setup(e,{emit:n}){let{firm:i,load:t,updateFirm:l,deleteFirm:s}=u();(0,a.bv)((()=>t()));let c=(0,o.iH)(!1),m=(0,o.iH)(!1);function p(){c.value=!1,m.value=!1}function f(){c.value=!0,m.value=!1}function g(){c.value=!1,m.value=!0}(0,a.YP)(i,p);let v=(0,o.iH)();async function w(e){v.value=void 0,v.value=await l(e,i.value?.name??""),void 0==v.value&&p()}async function d(){await s(i.value?.name??""),n("on-toggle")}return(e,n)=>(0,o.SU)(c)||(0,o.SU)(m)?(0,o.SU)(c)?((0,a.wg)(),(0,a.iD)("div",U,[O,(0,a.Wm)(k,{onOnSubmit:w,firm:(0,o.SU)(i),errors:(0,o.SU)(v)},null,8,["firm","errors"]),(0,a._)("button",{onClick:p},"👎")])):((0,a.wg)(),(0,a.iD)("div",F,[H,(0,a._)("button",{onClick:d},"👍"),(0,a._)("button",{onClick:p},"👎")])):((0,a.wg)(),(0,a.iD)("div",_,[(0,a._)("img",{src:"firms/"+(0,o.SU)(i)?.name+"/image/"+(new Date).toISOString(),alt:"logo"},null,8,S),(0,a._)("p",null,(0,r.zw)((0,o.SU)(i)?.name)+" "+(0,r.zw)((0,o.SU)(i)?.englishDescription)+" "+(0,r.zw)((0,o.SU)(i)?.estonianDescription),1),(0,a._)("button",{onClick:f},"✏️"),(0,a._)("button",{onClick:g},"❌")]))}});const E=j;var C=E;const T=["onClick"];var x=(0,a.aZ)({__name:"NavBar",setup(e){let{firms:n}=u();return(e,i)=>((0,a.wg)(),(0,a.iD)("ul",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)((0,o.SU)(n),(n=>((0,a.wg)(),(0,a.iD)("li",{key:n,onClick:i=>e.$emit("on-toggle",n)},(0,r.zw)(n),9,T)))),128)),(0,a._)("li",{onClick:i[0]||(i[0]=n=>e.$emit("on-toggle"))},"New firm")]))}});const z=x;var I=z,Y=(0,a.aZ)({__name:"App",setup(e){let{load:n,getFirm:i,postFirm:t}=u();(0,a.bv)((()=>n()));let r=(0,o.iH)(!1);async function l(e){null!=e?(await i(e),r.value=!0):r.value=!1}let s=(0,o.iH)();async function c(e){s.value=void 0,s.value=await t(e),void 0==s.value&&l(e.name)}return(e,n)=>((0,a.wg)(),(0,a.iD)(a.HY,null,[(0,a.Wm)(I,{onOnToggle:l}),(0,o.SU)(r)?((0,a.wg)(),(0,a.j4)(C,{key:0,onOnToggle:l})):((0,a.wg)(),(0,a.j4)(k,{key:1,onOnSubmit:c,errors:(0,o.SU)(s)},null,8,["errors"]))],64))}});const K=Y;var N=K;(0,t.ri)(N).mount("#app")}},n={};function i(t){var a=n[t];if(void 0!==a)return a.exports;var o=n[t]={exports:{}};return e[t](o,o.exports,i),o.exports}i.m=e,function(){var e=[];i.O=function(n,t,a,o){if(!t){var r=1/0;for(c=0;c<e.length;c++){t=e[c][0],a=e[c][1],o=e[c][2];for(var l=!0,s=0;s<t.length;s++)(!1&o||r>=o)&&Object.keys(i.O).every((function(e){return i.O[e](t[s])}))?t.splice(s--,1):(l=!1,o<r&&(r=o));if(l){e.splice(c--,1);var u=a();void 0!==u&&(n=u)}}return n}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[t,a,o]}}(),function(){i.d=function(e,n){for(var t in n)i.o(n,t)&&!i.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={143:0};i.O.j=function(n){return 0===e[n]};var n=function(n,t){var a,o,r=t[0],l=t[1],s=t[2],u=0;if(r.some((function(n){return 0!==e[n]}))){for(a in l)i.o(l,a)&&(i.m[a]=l[a]);if(s)var c=s(i)}for(n&&n(t);u<r.length;u++)o=r[u],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(c)},t=self["webpackChunkpkui"]=self["webpackChunkpkui"]||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))}();var t=i.O(void 0,[998],(function(){return i(913)}));t=i.O(t)})();
//# sourceMappingURL=app.98f4e1be.js.map