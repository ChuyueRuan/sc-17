import{h as $,j as se,u as oe,k as p,l as y,d as X,n as ie,p as ce,q as de,s as me,v as h,x as A,y as pe,z as be,A as fe,o as v,c as K,B as H,C as t,D as L,E as P,b as O,w as W,g as F,G as ve,H as Ne,I as j,J as q,K as Ie,L as he,M as k,N as Ve,O as ye,P as Ee,Q as J,R as ge}from"./index-a0da786e.js";import{C as Z,I as T,U as V,u as we,d as _e,e as Se,b as Ae}from"./el-form-item-49f3f214.js";const Pe=100,Fe=600,Q={beforeMount(l,N){const i=N.value,{interval:r=Pe,delay:E=Fe}=$(i)?{}:i;let c,m;const u=()=>$(i)?i():i.handler(),b=()=>{m&&(clearTimeout(m),m=void 0),c&&(clearInterval(c),c=void 0)};l.addEventListener("mousedown",g=>{g.button===0&&(b(),u(),document.addEventListener("mouseup",()=>b(),{once:!0}),m=setTimeout(()=>{c=setInterval(()=>{u()},r)},E))})}},ke=se({id:{type:String,default:void 0},step:{type:Number,default:1},stepStrictly:Boolean,max:{type:Number,default:Number.POSITIVE_INFINITY},min:{type:Number,default:Number.NEGATIVE_INFINITY},modelValue:Number,readonly:Boolean,disabled:Boolean,size:oe,controls:{type:Boolean,default:!0},controlsPosition:{type:String,default:"",values:["","right"]},valueOnClear:{type:[String,Number,null],validator:l=>l===null||p(l)||["min","max"].includes(l),default:null},name:String,label:String,placeholder:String,precision:{type:Number,validator:l=>l>=0&&l===Number.parseInt(`${l}`,10)},validateEvent:{type:Boolean,default:!0}}),Te={[Z]:(l,N)=>N!==l,blur:l=>l instanceof FocusEvent,focus:l=>l instanceof FocusEvent,[T]:l=>p(l)||y(l),[V]:l=>p(l)||y(l)},Ce=["aria-label","onKeydown"],xe=["aria-label","onKeydown"],Be=X({name:"ElInputNumber"}),De=X({...Be,props:ke,emits:Te,setup(l,{expose:N,emit:i}){const r=l,{t:E}=ie(),c=ce("input-number"),m=de(),u=me({currentValue:r.modelValue,userInput:null}),{formItem:b}=we(),g=h(()=>p(r.modelValue)&&r.modelValue<=r.min),R=h(()=>p(r.modelValue)&&r.modelValue>=r.max),ee=h(()=>{const e=G(r.step);return A(r.precision)?Math.max(G(r.modelValue),e):(e>r.precision,r.precision)}),C=h(()=>r.controls&&r.controlsPosition==="right"),U=_e(),I=Se(),x=h(()=>{if(u.userInput!==null)return u.userInput;let e=u.currentValue;if(y(e))return"";if(p(e)){if(Number.isNaN(e))return"";A(r.precision)||(e=e.toFixed(r.precision))}return e}),B=(e,n)=>{if(A(n)&&(n=ee.value),n===0)return Math.round(e);let a=String(e);const s=a.indexOf(".");if(s===-1||!a.replace(".","").split("")[s+n])return e;const _=a.length;return a.charAt(_-1)==="5"&&(a=`${a.slice(0,Math.max(0,_-1))}6`),Number.parseFloat(Number(a).toFixed(n))},G=e=>{if(y(e))return 0;const n=e.toString(),a=n.indexOf(".");let s=0;return a!==-1&&(s=n.length-a-1),s},Y=(e,n=1)=>p(e)?B(e+r.step*n):u.currentValue,D=()=>{if(r.readonly||I.value||R.value)return;const e=Number(x.value)||0,n=Y(e);w(n),i(T,u.currentValue)},M=()=>{if(r.readonly||I.value||g.value)return;const e=Number(x.value)||0,n=Y(e,-1);w(n),i(T,u.currentValue)},z=(e,n)=>{const{max:a,min:s,step:o,precision:f,stepStrictly:_,valueOnClear:S}=r;a<s&&ye("InputNumber","min should not be greater than max.");let d=Number(e);if(y(e)||Number.isNaN(d))return null;if(e===""){if(S===null)return null;d=Ee(S)?{min:s,max:a}[S]:S}return _&&(d=B(Math.round(d/o)*o,f)),A(f)||(d=B(d,f)),(d>a||d<s)&&(d=d>a?a:s,n&&i(V,d)),d},w=(e,n=!0)=>{var a;const s=u.currentValue,o=z(e);if(!n){i(V,o);return}s!==o&&(u.userInput=null,i(V,o),i(Z,o,s),r.validateEvent&&((a=b==null?void 0:b.validate)==null||a.call(b,"change").catch(f=>J())),u.currentValue=o)},ne=e=>{u.userInput=e;const n=e===""?null:Number(e);i(T,n),w(n,!1)},te=e=>{const n=e!==""?Number(e):"";(p(n)&&!Number.isNaN(n)||e==="")&&w(n),u.userInput=null},re=()=>{var e,n;(n=(e=m.value)==null?void 0:e.focus)==null||n.call(e)},ae=()=>{var e,n;(n=(e=m.value)==null?void 0:e.blur)==null||n.call(e)},le=e=>{i("focus",e)},ue=e=>{var n;i("blur",e),r.validateEvent&&((n=b==null?void 0:b.validate)==null||n.call(b,"blur").catch(a=>J()))};return pe(()=>r.modelValue,e=>{const n=z(u.userInput),a=z(e,!0);!p(n)&&(!n||n!==a)&&(u.currentValue=a,u.userInput=null)},{immediate:!0}),be(()=>{var e;const{min:n,max:a,modelValue:s}=r,o=(e=m.value)==null?void 0:e.input;if(o.setAttribute("role","spinbutton"),Number.isFinite(a)?o.setAttribute("aria-valuemax",String(a)):o.removeAttribute("aria-valuemax"),Number.isFinite(n)?o.setAttribute("aria-valuemin",String(n)):o.removeAttribute("aria-valuemin"),o.setAttribute("aria-valuenow",String(u.currentValue)),o.setAttribute("aria-disabled",String(I.value)),!p(s)&&s!=null){let f=Number(s);Number.isNaN(f)&&(f=null),i(V,f)}}),fe(()=>{var e;const n=(e=m.value)==null?void 0:e.input;n==null||n.setAttribute("aria-valuenow",`${u.currentValue}`)}),N({focus:re,blur:ae}),(e,n)=>(v(),K("div",{class:L([t(c).b(),t(c).m(t(U)),t(c).is("disabled",t(I)),t(c).is("without-controls",!e.controls),t(c).is("controls-right",t(C))]),onDragstart:n[1]||(n[1]=k(()=>{},["prevent"]))},[e.controls?H((v(),K("span",{key:0,role:"button","aria-label":t(E)("el.inputNumber.decrease"),class:L([t(c).e("decrease"),t(c).is("disabled",t(g))]),onKeydown:P(M,["enter"])},[O(t(j),null,{default:W(()=>[t(C)?(v(),F(t(ve),{key:0})):(v(),F(t(Ne),{key:1}))]),_:1})],42,Ce)),[[t(Q),M]]):q("v-if",!0),e.controls?H((v(),K("span",{key:1,role:"button","aria-label":t(E)("el.inputNumber.increase"),class:L([t(c).e("increase"),t(c).is("disabled",t(R))]),onKeydown:P(D,["enter"])},[O(t(j),null,{default:W(()=>[t(C)?(v(),F(t(Ie),{key:0})):(v(),F(t(he),{key:1}))]),_:1})],42,xe)),[[t(Q),D]]):q("v-if",!0),O(t(Ae),{id:e.id,ref_key:"input",ref:m,type:"number",step:e.step,"model-value":t(x),placeholder:e.placeholder,readonly:e.readonly,disabled:t(I),size:t(U),max:e.max,min:e.min,name:e.name,label:e.label,"validate-event":!1,onWheel:n[0]||(n[0]=k(()=>{},["prevent"])),onKeydown:[P(k(D,["prevent"]),["up"]),P(k(M,["prevent"]),["down"])],onBlur:ue,onFocus:le,onInput:ne,onChange:te},null,8,["id","step","model-value","placeholder","readonly","disabled","size","max","min","name","label","onKeydown"])],34))}});var Me=Ve(De,[["__file","/home/runner/work/element-plus/element-plus/packages/components/input-number/src/input-number.vue"]]);const Le=ge(Me);export{Le as E};