const hd=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}};hd();function ll(n,e){const t=Object.create(null),i=n.split(",");for(let r=0;r<i.length;r++)t[i[r]]=!0;return e?r=>!!t[r.toLowerCase()]:r=>!!t[r]}const dd="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",pd=ll(dd);function pf(n){return!!n||n===""}function Tn(n){if(Ce(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],r=ut(i)?_d(i):Tn(i);if(r)for(const s in r)e[s]=r[s]}return e}else{if(ut(n))return n;if(st(n))return n}}const md=/;(?![^(]*\))/g,gd=/:(.+)/;function _d(n){const e={};return n.split(md).forEach(t=>{if(t){const i=t.split(gd);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function cl(n){let e="";if(ut(n))e=n;else if(Ce(n))for(let t=0;t<n.length;t++){const i=cl(n[t]);i&&(e+=i+" ")}else if(st(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Js=n=>ut(n)?n:n==null?"":Ce(n)||st(n)&&(n.toString===xf||!Pe(n.toString))?JSON.stringify(n,mf,2):String(n),mf=(n,e)=>e&&e.__v_isRef?mf(n,e.value):or(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,r])=>(t[`${i} =>`]=r,t),{})}:gf(e)?{[`Set(${e.size})`]:[...e.values()]}:st(e)&&!Ce(e)&&!vf(e)?String(e):e,$e={},sr=[],Zt=()=>{},xd=()=>!1,vd=/^on[^a-z]/,co=n=>vd.test(n),ul=n=>n.startsWith("onUpdate:"),ct=Object.assign,fl=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},yd=Object.prototype.hasOwnProperty,ze=(n,e)=>yd.call(n,e),Ce=Array.isArray,or=n=>uo(n)==="[object Map]",gf=n=>uo(n)==="[object Set]",Pe=n=>typeof n=="function",ut=n=>typeof n=="string",hl=n=>typeof n=="symbol",st=n=>n!==null&&typeof n=="object",_f=n=>st(n)&&Pe(n.then)&&Pe(n.catch),xf=Object.prototype.toString,uo=n=>xf.call(n),bd=n=>uo(n).slice(8,-1),vf=n=>uo(n)==="[object Object]",dl=n=>ut(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Vs=ll(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),fo=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},Md=/-(\w)/g,pn=fo(n=>n.replace(Md,(e,t)=>t?t.toUpperCase():"")),wd=/\B([A-Z])/g,vr=fo(n=>n.replace(wd,"-$1").toLowerCase()),ho=fo(n=>n.charAt(0).toUpperCase()+n.slice(1)),Io=fo(n=>n?`on${ho(n)}`:""),Qs=(n,e)=>!Object.is(n,e),Fo=(n,e)=>{for(let t=0;t<n.length;t++)n[t](e)},eo=(n,e,t)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,value:t})},yf=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Yl;const Sd=()=>Yl||(Yl=typeof globalThis!="undefined"?globalThis:typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:{});let ln;class Ed{constructor(e=!1){this.active=!0,this.effects=[],this.cleanups=[],!e&&ln&&(this.parent=ln,this.index=(ln.scopes||(ln.scopes=[])).push(this)-1)}run(e){if(this.active){const t=ln;try{return ln=this,e()}finally{ln=t}}}on(){ln=this}off(){ln=this.parent}stop(e){if(this.active){let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.scopes)for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);if(this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.active=!1}}}function Td(n,e=ln){e&&e.active&&e.effects.push(n)}const pl=n=>{const e=new Set(n);return e.w=0,e.n=0,e},bf=n=>(n.w&Zn)>0,Mf=n=>(n.n&Zn)>0,Ad=({deps:n})=>{if(n.length)for(let e=0;e<n.length;e++)n[e].w|=Zn},Cd=n=>{const{deps:e}=n;if(e.length){let t=0;for(let i=0;i<e.length;i++){const r=e[i];bf(r)&&!Mf(r)?r.delete(n):e[t++]=r,r.w&=~Zn,r.n&=~Zn}e.length=t}},Ra=new WeakMap;let Vr=0,Zn=1;const Pa=30;let jt;const gi=Symbol(""),Ia=Symbol("");class ml{constructor(e,t=null,i){this.fn=e,this.scheduler=t,this.active=!0,this.deps=[],this.parent=void 0,Td(this,i)}run(){if(!this.active)return this.fn();let e=jt,t=jn;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=jt,jt=this,jn=!0,Zn=1<<++Vr,Vr<=Pa?Ad(this):Zl(this),this.fn()}finally{Vr<=Pa&&Cd(this),Zn=1<<--Vr,jt=this.parent,jn=t,this.parent=void 0,this.deferStop&&this.stop()}}stop(){jt===this?this.deferStop=!0:this.active&&(Zl(this),this.onStop&&this.onStop(),this.active=!1)}}function Zl(n){const{deps:e}=n;if(e.length){for(let t=0;t<e.length;t++)e[t].delete(n);e.length=0}}let jn=!0;const wf=[];function yr(){wf.push(jn),jn=!1}function br(){const n=wf.pop();jn=n===void 0?!0:n}function Dt(n,e,t){if(jn&&jt){let i=Ra.get(n);i||Ra.set(n,i=new Map);let r=i.get(t);r||i.set(t,r=pl()),Sf(r)}}function Sf(n,e){let t=!1;Vr<=Pa?Mf(n)||(n.n|=Zn,t=!bf(n)):t=!n.has(jt),t&&(n.add(jt),jt.deps.push(n))}function An(n,e,t,i,r,s){const o=Ra.get(n);if(!o)return;let a=[];if(e==="clear")a=[...o.values()];else if(t==="length"&&Ce(n))o.forEach((l,c)=>{(c==="length"||c>=i)&&a.push(l)});else switch(t!==void 0&&a.push(o.get(t)),e){case"add":Ce(n)?dl(t)&&a.push(o.get("length")):(a.push(o.get(gi)),or(n)&&a.push(o.get(Ia)));break;case"delete":Ce(n)||(a.push(o.get(gi)),or(n)&&a.push(o.get(Ia)));break;case"set":or(n)&&a.push(o.get(gi));break}if(a.length===1)a[0]&&Fa(a[0]);else{const l=[];for(const c of a)c&&l.push(...c);Fa(pl(l))}}function Fa(n,e){const t=Ce(n)?n:[...n];for(const i of t)i.computed&&Kl(i);for(const i of t)i.computed||Kl(i)}function Kl(n,e){(n!==jt||n.allowRecurse)&&(n.scheduler?n.scheduler():n.run())}const Ld=ll("__proto__,__v_isRef,__isVue"),Ef=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(hl)),Dd=gl(),Rd=gl(!1,!0),Pd=gl(!0),Jl=Id();function Id(){const n={};return["includes","indexOf","lastIndexOf"].forEach(e=>{n[e]=function(...t){const i=Xe(this);for(let s=0,o=this.length;s<o;s++)Dt(i,"get",s+"");const r=i[e](...t);return r===-1||r===!1?i[e](...t.map(Xe)):r}}),["push","pop","shift","unshift","splice"].forEach(e=>{n[e]=function(...t){yr();const i=Xe(this)[e].apply(this,t);return br(),i}}),n}function gl(n=!1,e=!1){return function(i,r,s){if(r==="__v_isReactive")return!n;if(r==="__v_isReadonly")return n;if(r==="__v_isShallow")return e;if(r==="__v_raw"&&s===(n?e?Yd:Df:e?Lf:Cf).get(i))return i;const o=Ce(i);if(!n&&o&&ze(Jl,r))return Reflect.get(Jl,r,s);const a=Reflect.get(i,r,s);return(hl(r)?Ef.has(r):Ld(r))||(n||Dt(i,"get",r),e)?a:vt(a)?o&&dl(r)?a:a.value:st(a)?n?Rf(a):vl(a):a}}const Fd=Tf(),Nd=Tf(!0);function Tf(n=!1){return function(t,i,r,s){let o=t[i];if(Jr(o)&&vt(o)&&!vt(r))return!1;if(!n&&!Jr(r)&&(Na(r)||(r=Xe(r),o=Xe(o)),!Ce(t)&&vt(o)&&!vt(r)))return o.value=r,!0;const a=Ce(t)&&dl(i)?Number(i)<t.length:ze(t,i),l=Reflect.set(t,i,r,s);return t===Xe(s)&&(a?Qs(r,o)&&An(t,"set",i,r):An(t,"add",i,r)),l}}function Od(n,e){const t=ze(n,e);n[e];const i=Reflect.deleteProperty(n,e);return i&&t&&An(n,"delete",e,void 0),i}function zd(n,e){const t=Reflect.has(n,e);return(!hl(e)||!Ef.has(e))&&Dt(n,"has",e),t}function Ud(n){return Dt(n,"iterate",Ce(n)?"length":gi),Reflect.ownKeys(n)}const Af={get:Dd,set:Fd,deleteProperty:Od,has:zd,ownKeys:Ud},Bd={get:Pd,set(n,e){return!0},deleteProperty(n,e){return!0}},kd=ct({},Af,{get:Rd,set:Nd}),_l=n=>n,po=n=>Reflect.getPrototypeOf(n);function ls(n,e,t=!1,i=!1){n=n.__v_raw;const r=Xe(n),s=Xe(e);t||(e!==s&&Dt(r,"get",e),Dt(r,"get",s));const{has:o}=po(r),a=i?_l:t?Ml:bl;if(o.call(r,e))return a(n.get(e));if(o.call(r,s))return a(n.get(s));n!==r&&n.get(e)}function cs(n,e=!1){const t=this.__v_raw,i=Xe(t),r=Xe(n);return e||(n!==r&&Dt(i,"has",n),Dt(i,"has",r)),n===r?t.has(n):t.has(n)||t.has(r)}function us(n,e=!1){return n=n.__v_raw,!e&&Dt(Xe(n),"iterate",gi),Reflect.get(n,"size",n)}function Ql(n){n=Xe(n);const e=Xe(this);return po(e).has.call(e,n)||(e.add(n),An(e,"add",n,n)),this}function ec(n,e){e=Xe(e);const t=Xe(this),{has:i,get:r}=po(t);let s=i.call(t,n);s||(n=Xe(n),s=i.call(t,n));const o=r.call(t,n);return t.set(n,e),s?Qs(e,o)&&An(t,"set",n,e):An(t,"add",n,e),this}function tc(n){const e=Xe(this),{has:t,get:i}=po(e);let r=t.call(e,n);r||(n=Xe(n),r=t.call(e,n)),i&&i.call(e,n);const s=e.delete(n);return r&&An(e,"delete",n,void 0),s}function nc(){const n=Xe(this),e=n.size!==0,t=n.clear();return e&&An(n,"clear",void 0,void 0),t}function fs(n,e){return function(i,r){const s=this,o=s.__v_raw,a=Xe(o),l=e?_l:n?Ml:bl;return!n&&Dt(a,"iterate",gi),o.forEach((c,u)=>i.call(r,l(c),l(u),s))}}function hs(n,e,t){return function(...i){const r=this.__v_raw,s=Xe(r),o=or(s),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=r[n](...i),u=t?_l:e?Ml:bl;return!e&&Dt(s,"iterate",l?Ia:gi),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}},[Symbol.iterator](){return this}}}}function Dn(n){return function(...e){return n==="delete"?!1:this}}function Hd(){const n={get(s){return ls(this,s)},get size(){return us(this)},has:cs,add:Ql,set:ec,delete:tc,clear:nc,forEach:fs(!1,!1)},e={get(s){return ls(this,s,!1,!0)},get size(){return us(this)},has:cs,add:Ql,set:ec,delete:tc,clear:nc,forEach:fs(!1,!0)},t={get(s){return ls(this,s,!0)},get size(){return us(this,!0)},has(s){return cs.call(this,s,!0)},add:Dn("add"),set:Dn("set"),delete:Dn("delete"),clear:Dn("clear"),forEach:fs(!0,!1)},i={get(s){return ls(this,s,!0,!0)},get size(){return us(this,!0)},has(s){return cs.call(this,s,!0)},add:Dn("add"),set:Dn("set"),delete:Dn("delete"),clear:Dn("clear"),forEach:fs(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=hs(s,!1,!1),t[s]=hs(s,!0,!1),e[s]=hs(s,!1,!0),i[s]=hs(s,!0,!0)}),[n,t,e,i]}const[Gd,Vd,Wd,qd]=Hd();function xl(n,e){const t=e?n?qd:Wd:n?Vd:Gd;return(i,r,s)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?i:Reflect.get(ze(t,r)&&r in i?t:i,r,s)}const jd={get:xl(!1,!1)},Xd={get:xl(!1,!0)},$d={get:xl(!0,!1)},Cf=new WeakMap,Lf=new WeakMap,Df=new WeakMap,Yd=new WeakMap;function Zd(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Kd(n){return n.__v_skip||!Object.isExtensible(n)?0:Zd(bd(n))}function vl(n){return Jr(n)?n:yl(n,!1,Af,jd,Cf)}function Jd(n){return yl(n,!1,kd,Xd,Lf)}function Rf(n){return yl(n,!0,Bd,$d,Df)}function yl(n,e,t,i,r){if(!st(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=r.get(n);if(s)return s;const o=Kd(n);if(o===0)return n;const a=new Proxy(n,o===2?i:t);return r.set(n,a),a}function ar(n){return Jr(n)?ar(n.__v_raw):!!(n&&n.__v_isReactive)}function Jr(n){return!!(n&&n.__v_isReadonly)}function Na(n){return!!(n&&n.__v_isShallow)}function Pf(n){return ar(n)||Jr(n)}function Xe(n){const e=n&&n.__v_raw;return e?Xe(e):n}function If(n){return eo(n,"__v_skip",!0),n}const bl=n=>st(n)?vl(n):n,Ml=n=>st(n)?Rf(n):n;function Qd(n){jn&&jt&&(n=Xe(n),Sf(n.dep||(n.dep=pl())))}function ep(n,e){n=Xe(n),n.dep&&Fa(n.dep)}function vt(n){return!!(n&&n.__v_isRef===!0)}function tp(n){return vt(n)?n.value:n}const np={get:(n,e,t)=>tp(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const r=n[e];return vt(r)&&!vt(t)?(r.value=t,!0):Reflect.set(n,e,t,i)}};function Ff(n){return ar(n)?n:new Proxy(n,np)}class ip{constructor(e,t,i,r){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this._dirty=!0,this.effect=new ml(e,()=>{this._dirty||(this._dirty=!0,ep(this))}),this.effect.computed=this,this.effect.active=this._cacheable=!r,this.__v_isReadonly=i}get value(){const e=Xe(this);return Qd(e),(e._dirty||!e._cacheable)&&(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}function rp(n,e,t=!1){let i,r;const s=Pe(n);return s?(i=n,r=Zt):(i=n.get,r=n.set),new ip(i,r,s||!r,t)}function Xn(n,e,t,i){let r;try{r=i?n(...i):n()}catch(s){mo(s,e,t)}return r}function Ut(n,e,t,i){if(Pe(n)){const s=Xn(n,e,t,i);return s&&_f(s)&&s.catch(o=>{mo(o,e,t)}),s}const r=[];for(let s=0;s<n.length;s++)r.push(Ut(n[s],e,t,i));return r}function mo(n,e,t,i=!0){const r=e?e.vnode:null;if(e){let s=e.parent;const o=e.proxy,a=t;for(;s;){const c=s.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](n,o,a)===!1)return}s=s.parent}const l=e.appContext.config.errorHandler;if(l){Xn(l,null,10,[n,o,a]);return}}sp(n,t,r,i)}function sp(n,e,t,i=!0){console.error(n)}let to=!1,Oa=!1;const Lt=[];let wn=0;const $r=[];let Wr=null,er=0;const Yr=[];let Vn=null,tr=0;const Nf=Promise.resolve();let wl=null,za=null;function op(n){const e=wl||Nf;return n?e.then(this?n.bind(this):n):e}function ap(n){let e=wn+1,t=Lt.length;for(;e<t;){const i=e+t>>>1;Qr(Lt[i])<n?e=i+1:t=i}return e}function Of(n){(!Lt.length||!Lt.includes(n,to&&n.allowRecurse?wn+1:wn))&&n!==za&&(n.id==null?Lt.push(n):Lt.splice(ap(n.id),0,n),zf())}function zf(){!to&&!Oa&&(Oa=!0,wl=Nf.then(kf))}function lp(n){const e=Lt.indexOf(n);e>wn&&Lt.splice(e,1)}function Uf(n,e,t,i){Ce(n)?t.push(...n):(!e||!e.includes(n,n.allowRecurse?i+1:i))&&t.push(n),zf()}function cp(n){Uf(n,Wr,$r,er)}function up(n){Uf(n,Vn,Yr,tr)}function go(n,e=null){if($r.length){for(za=e,Wr=[...new Set($r)],$r.length=0,er=0;er<Wr.length;er++)Wr[er]();Wr=null,er=0,za=null,go(n,e)}}function Bf(n){if(go(),Yr.length){const e=[...new Set(Yr)];if(Yr.length=0,Vn){Vn.push(...e);return}for(Vn=e,Vn.sort((t,i)=>Qr(t)-Qr(i)),tr=0;tr<Vn.length;tr++)Vn[tr]();Vn=null,tr=0}}const Qr=n=>n.id==null?1/0:n.id;function kf(n){Oa=!1,to=!0,go(n),Lt.sort((t,i)=>Qr(t)-Qr(i));const e=Zt;try{for(wn=0;wn<Lt.length;wn++){const t=Lt[wn];t&&t.active!==!1&&Xn(t,null,14)}}finally{wn=0,Lt.length=0,Bf(),to=!1,wl=null,(Lt.length||$r.length||Yr.length)&&kf(n)}}function fp(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||$e;let r=t;const s=e.startsWith("update:"),o=s&&e.slice(7);if(o&&o in i){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:f,trim:h}=i[u]||$e;h&&(r=t.map(m=>m.trim())),f&&(r=t.map(yf))}let a,l=i[a=Io(e)]||i[a=Io(pn(e))];!l&&s&&(l=i[a=Io(vr(e))]),l&&Ut(l,n,6,r);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Ut(c,n,6,r)}}function Hf(n,e,t=!1){const i=e.emitsCache,r=i.get(n);if(r!==void 0)return r;const s=n.emits;let o={},a=!1;if(!Pe(n)){const l=c=>{const u=Hf(c,e,!0);u&&(a=!0,ct(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!s&&!a?(i.set(n,null),null):(Ce(s)?s.forEach(l=>o[l]=null):ct(o,s),i.set(n,o),o)}function _o(n,e){return!n||!co(e)?!1:(e=e.slice(2).replace(/Once$/,""),ze(n,e[0].toLowerCase()+e.slice(1))||ze(n,vr(e))||ze(n,e))}let Ot=null,Gf=null;function no(n){const e=Ot;return Ot=n,Gf=n&&n.type.__scopeId||null,e}function io(n,e=Ot,t){if(!e||n._n)return n;const i=(...r)=>{i._d&&dc(-1);const s=no(e),o=n(...r);return no(s),i._d&&dc(1),o};return i._n=!0,i._c=!0,i._d=!0,i}function No(n){const{type:e,vnode:t,proxy:i,withProxy:r,props:s,propsOptions:[o],slots:a,attrs:l,emit:c,render:u,renderCache:f,data:h,setupState:m,ctx:_,inheritAttrs:p}=n;let d,g;const M=no(n);try{if(t.shapeFlag&4){const E=r||i;d=un(u.call(E,E,f,s,m,h,_)),g=l}else{const E=e;d=un(E.length>1?E(s,{attrs:l,slots:a,emit:c}):E(s,null)),g=e.props?l:hp(l)}}catch(E){Zr.length=0,mo(E,n,1),d=Je(Kt)}let A=d;if(g&&p!==!1){const E=Object.keys(g),{shapeFlag:w}=A;E.length&&w&7&&(o&&E.some(ul)&&(g=dp(g,o)),A=Kn(A,g))}return t.dirs&&(A=Kn(A),A.dirs=A.dirs?A.dirs.concat(t.dirs):t.dirs),t.transition&&(A.transition=t.transition),d=A,no(M),d}const hp=n=>{let e;for(const t in n)(t==="class"||t==="style"||co(t))&&((e||(e={}))[t]=n[t]);return e},dp=(n,e)=>{const t={};for(const i in n)(!ul(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function pp(n,e,t){const{props:i,children:r,component:s}=n,{props:o,children:a,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?ic(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(o[h]!==i[h]&&!_o(c,h))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?ic(i,o,c):!0:!!o;return!1}function ic(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(e[s]!==n[s]&&!_o(t,s))return!0}return!1}function mp({vnode:n,parent:e},t){for(;e&&e.subTree===n;)(n=e.vnode).el=t,e=e.parent}const gp=n=>n.__isSuspense;function _p(n,e){e&&e.pendingBranch?Ce(n)?e.effects.push(...n):e.effects.push(n):up(n)}function xp(n,e){if(lt){let t=lt.provides;const i=lt.parent&&lt.parent.provides;i===t&&(t=lt.provides=Object.create(i)),t[n]=e}}function Oo(n,e,t=!1){const i=lt||Ot;if(i){const r=i.parent==null?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides;if(r&&n in r)return r[n];if(arguments.length>1)return t&&Pe(e)?e.call(i.proxy):e}}const rc={};function zo(n,e,t){return Vf(n,e,t)}function Vf(n,e,{immediate:t,deep:i,flush:r,onTrack:s,onTrigger:o}=$e){const a=lt;let l,c=!1,u=!1;if(vt(n)?(l=()=>n.value,c=Na(n)):ar(n)?(l=()=>n,i=!0):Ce(n)?(u=!0,c=n.some(g=>ar(g)||Na(g)),l=()=>n.map(g=>{if(vt(g))return g.value;if(ar(g))return hi(g);if(Pe(g))return Xn(g,a,2)})):Pe(n)?e?l=()=>Xn(n,a,2):l=()=>{if(!(a&&a.isUnmounted))return f&&f(),Ut(n,a,3,[h])}:l=Zt,e&&i){const g=l;l=()=>hi(g())}let f,h=g=>{f=d.onStop=()=>{Xn(g,a,4)}};if(ts)return h=Zt,e?t&&Ut(e,a,3,[l(),u?[]:void 0,h]):l(),Zt;let m=u?[]:rc;const _=()=>{if(!!d.active)if(e){const g=d.run();(i||c||(u?g.some((M,A)=>Qs(M,m[A])):Qs(g,m)))&&(f&&f(),Ut(e,a,3,[g,m===rc?void 0:m,h]),m=g)}else d.run()};_.allowRecurse=!!e;let p;r==="sync"?p=_:r==="post"?p=()=>Mt(_,a&&a.suspense):p=()=>cp(_);const d=new ml(l,p);return e?t?_():m=d.run():r==="post"?Mt(d.run.bind(d),a&&a.suspense):d.run(),()=>{d.stop(),a&&a.scope&&fl(a.scope.effects,d)}}function vp(n,e,t){const i=this.proxy,r=ut(n)?n.includes(".")?Wf(i,n):()=>i[n]:n.bind(i,i);let s;Pe(e)?s=e:(s=e.handler,t=e);const o=lt;ur(this);const a=Vf(r,s.bind(i),t);return o?ur(o):_i(),a}function Wf(n,e){const t=e.split(".");return()=>{let i=n;for(let r=0;r<t.length&&i;r++)i=i[t[r]];return i}}function hi(n,e){if(!st(n)||n.__v_skip||(e=e||new Set,e.has(n)))return n;if(e.add(n),vt(n))hi(n.value,e);else if(Ce(n))for(let t=0;t<n.length;t++)hi(n[t],e);else if(gf(n)||or(n))n.forEach(t=>{hi(t,e)});else if(vf(n))for(const t in n)hi(n[t],e);return n}function yp(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Yf(()=>{n.isMounted=!0}),Zf(()=>{n.isUnmounting=!0}),n}const Pt=[Function,Array],bp={name:"BaseTransition",props:{mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Pt,onEnter:Pt,onAfterEnter:Pt,onEnterCancelled:Pt,onBeforeLeave:Pt,onLeave:Pt,onAfterLeave:Pt,onLeaveCancelled:Pt,onBeforeAppear:Pt,onAppear:Pt,onAfterAppear:Pt,onAppearCancelled:Pt},setup(n,{slots:e}){const t=sm(),i=yp();let r;return()=>{const s=e.default&&Xf(e.default(),!0);if(!s||!s.length)return;let o=s[0];if(s.length>1){for(const p of s)if(p.type!==Kt){o=p;break}}const a=Xe(n),{mode:l}=a;if(i.isLeaving)return Uo(o);const c=sc(o);if(!c)return Uo(o);const u=Ua(c,a,i,t);Ba(c,u);const f=t.subTree,h=f&&sc(f);let m=!1;const{getTransitionKey:_}=c.type;if(_){const p=_();r===void 0?r=p:p!==r&&(r=p,m=!0)}if(h&&h.type!==Kt&&(!ci(c,h)||m)){const p=Ua(h,a,i,t);if(Ba(h,p),l==="out-in")return i.isLeaving=!0,p.afterLeave=()=>{i.isLeaving=!1,t.update()},Uo(o);l==="in-out"&&c.type!==Kt&&(p.delayLeave=(d,g,M)=>{const A=jf(i,h);A[String(h.key)]=h,d._leaveCb=()=>{g(),d._leaveCb=void 0,delete u.delayedLeave},u.delayedLeave=M})}return o}}},qf=bp;function jf(n,e){const{leavingVNodes:t}=n;let i=t.get(e.type);return i||(i=Object.create(null),t.set(e.type,i)),i}function Ua(n,e,t,i){const{appear:r,mode:s,persisted:o=!1,onBeforeEnter:a,onEnter:l,onAfterEnter:c,onEnterCancelled:u,onBeforeLeave:f,onLeave:h,onAfterLeave:m,onLeaveCancelled:_,onBeforeAppear:p,onAppear:d,onAfterAppear:g,onAppearCancelled:M}=e,A=String(n.key),E=jf(t,n),w=(y,C)=>{y&&Ut(y,i,9,C)},D=(y,C)=>{const N=C[1];w(y,C),Ce(y)?y.every(F=>F.length<=1)&&N():y.length<=1&&N()},O={mode:s,persisted:o,beforeEnter(y){let C=a;if(!t.isMounted)if(r)C=p||a;else return;y._leaveCb&&y._leaveCb(!0);const N=E[A];N&&ci(n,N)&&N.el._leaveCb&&N.el._leaveCb(),w(C,[y])},enter(y){let C=l,N=c,F=u;if(!t.isMounted)if(r)C=d||l,N=g||c,F=M||u;else return;let H=!1;const te=y._enterCb=z=>{H||(H=!0,z?w(F,[y]):w(N,[y]),O.delayedLeave&&O.delayedLeave(),y._enterCb=void 0)};C?D(C,[y,te]):te()},leave(y,C){const N=String(n.key);if(y._enterCb&&y._enterCb(!0),t.isUnmounting)return C();w(f,[y]);let F=!1;const H=y._leaveCb=te=>{F||(F=!0,C(),te?w(_,[y]):w(m,[y]),y._leaveCb=void 0,E[N]===n&&delete E[N])};E[N]=n,h?D(h,[y,H]):H()},clone(y){return Ua(y,e,t,i)}};return O}function Uo(n){if(xo(n))return n=Kn(n),n.children=null,n}function sc(n){return xo(n)?n.children?n.children[0]:void 0:n}function Ba(n,e){n.shapeFlag&6&&n.component?Ba(n.component.subTree,e):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Xf(n,e=!1,t){let i=[],r=0;for(let s=0;s<n.length;s++){let o=n[s];const a=t==null?o.key:String(t)+String(o.key!=null?o.key:s);o.type===cn?(o.patchFlag&128&&r++,i=i.concat(Xf(o.children,e,a))):(e||o.type!==Kt)&&i.push(a!=null?Kn(o,{key:a}):o)}if(r>1)for(let s=0;s<i.length;s++)i[s].patchFlag=-2;return i}const Ws=n=>!!n.type.__asyncLoader,xo=n=>n.type.__isKeepAlive;function Mp(n,e){$f(n,"a",e)}function wp(n,e){$f(n,"da",e)}function $f(n,e,t=lt){const i=n.__wdc||(n.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if(vo(e,i,t),t){let r=t.parent;for(;r&&r.parent;)xo(r.parent.vnode)&&Sp(i,e,t,r),r=r.parent}}function Sp(n,e,t,i){const r=vo(e,n,i,!0);Kf(()=>{fl(i[e],r)},t)}function vo(n,e,t=lt,i=!1){if(t){const r=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...o)=>{if(t.isUnmounted)return;yr(),ur(t);const a=Ut(e,t,n,o);return _i(),br(),a});return i?r.unshift(s):r.push(s),s}}const Cn=n=>(e,t=lt)=>(!ts||n==="sp")&&vo(n,e,t),Ep=Cn("bm"),Yf=Cn("m"),Tp=Cn("bu"),Ap=Cn("u"),Zf=Cn("bum"),Kf=Cn("um"),Cp=Cn("sp"),Lp=Cn("rtg"),Dp=Cn("rtc");function Rp(n,e=lt){vo("ec",n,e)}function Jf(n,e){const t=Ot;if(t===null)return n;const i=bo(t)||t.proxy,r=n.dirs||(n.dirs=[]);for(let s=0;s<e.length;s++){let[o,a,l,c=$e]=e[s];Pe(o)&&(o={mounted:o,updated:o}),o.deep&&hi(a),r.push({dir:o,instance:i,value:a,oldValue:void 0,arg:l,modifiers:c})}return n}function Qn(n,e,t,i){const r=n.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[i];l&&(yr(),Ut(l,t,8,[n.el,a,n,e]),br())}}const Qf="components";function qr(n,e){return Ip(Qf,n,!0,e)||n}const Pp=Symbol();function Ip(n,e,t=!0,i=!1){const r=Ot||lt;if(r){const s=r.type;if(n===Qf){const a=um(s,!1);if(a&&(a===e||a===pn(e)||a===ho(pn(e))))return s}const o=oc(r[n]||s[n],e)||oc(r.appContext[n],e);return!o&&i?s:o}}function oc(n,e){return n&&(n[e]||n[pn(e)]||n[ho(pn(e))])}const ka=n=>n?hh(n)?bo(n)||n.proxy:ka(n.parent):null,ro=ct(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>ka(n.parent),$root:n=>ka(n.root),$emit:n=>n.emit,$options:n=>th(n),$forceUpdate:n=>n.f||(n.f=()=>Of(n.update)),$nextTick:n=>n.n||(n.n=op.bind(n.proxy)),$watch:n=>vp.bind(n)}),Fp={get({_:n},e){const{ctx:t,setupState:i,data:r,props:s,accessCache:o,type:a,appContext:l}=n;let c;if(e[0]!=="$"){const m=o[e];if(m!==void 0)switch(m){case 1:return i[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(i!==$e&&ze(i,e))return o[e]=1,i[e];if(r!==$e&&ze(r,e))return o[e]=2,r[e];if((c=n.propsOptions[0])&&ze(c,e))return o[e]=3,s[e];if(t!==$e&&ze(t,e))return o[e]=4,t[e];Ha&&(o[e]=0)}}const u=ro[e];let f,h;if(u)return e==="$attrs"&&Dt(n,"get",e),u(n);if((f=a.__cssModules)&&(f=f[e]))return f;if(t!==$e&&ze(t,e))return o[e]=4,t[e];if(h=l.config.globalProperties,ze(h,e))return h[e]},set({_:n},e,t){const{data:i,setupState:r,ctx:s}=n;return r!==$e&&ze(r,e)?(r[e]=t,!0):i!==$e&&ze(i,e)?(i[e]=t,!0):ze(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:r,propsOptions:s}},o){let a;return!!t[o]||n!==$e&&ze(n,o)||e!==$e&&ze(e,o)||(a=s[0])&&ze(a,o)||ze(i,o)||ze(ro,o)||ze(r.config.globalProperties,o)},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:ze(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};let Ha=!0;function Np(n){const e=th(n),t=n.proxy,i=n.ctx;Ha=!1,e.beforeCreate&&ac(e.beforeCreate,n,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:m,updated:_,activated:p,deactivated:d,beforeDestroy:g,beforeUnmount:M,destroyed:A,unmounted:E,render:w,renderTracked:D,renderTriggered:O,errorCaptured:y,serverPrefetch:C,expose:N,inheritAttrs:F,components:H,directives:te,filters:z}=e;if(c&&Op(c,i,null,n.appContext.config.unwrapInjectedRef),o)for(const j in o){const q=o[j];Pe(q)&&(i[j]=q.bind(t))}if(r){const j=r.call(t,t);st(j)&&(n.data=vl(j))}if(Ha=!0,s)for(const j in s){const q=s[j],W=Pe(q)?q.bind(t,t):Pe(q.get)?q.get.bind(t,t):Zt,J=!Pe(q)&&Pe(q.set)?q.set.bind(t):Zt,ce=hm({get:W,set:J});Object.defineProperty(i,j,{enumerable:!0,configurable:!0,get:()=>ce.value,set:oe=>ce.value=oe})}if(a)for(const j in a)eh(a[j],i,t,j);if(l){const j=Pe(l)?l.call(t):l;Reflect.ownKeys(j).forEach(q=>{xp(q,j[q])})}u&&ac(u,n,"c");function G(j,q){Ce(q)?q.forEach(W=>j(W.bind(t))):q&&j(q.bind(t))}if(G(Ep,f),G(Yf,h),G(Tp,m),G(Ap,_),G(Mp,p),G(wp,d),G(Rp,y),G(Dp,D),G(Lp,O),G(Zf,M),G(Kf,E),G(Cp,C),Ce(N))if(N.length){const j=n.exposed||(n.exposed={});N.forEach(q=>{Object.defineProperty(j,q,{get:()=>t[q],set:W=>t[q]=W})})}else n.exposed||(n.exposed={});w&&n.render===Zt&&(n.render=w),F!=null&&(n.inheritAttrs=F),H&&(n.components=H),te&&(n.directives=te)}function Op(n,e,t=Zt,i=!1){Ce(n)&&(n=Ga(n));for(const r in n){const s=n[r];let o;st(s)?"default"in s?o=Oo(s.from||r,s.default,!0):o=Oo(s.from||r):o=Oo(s),vt(o)&&i?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>o.value,set:a=>o.value=a}):e[r]=o}}function ac(n,e,t){Ut(Ce(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function eh(n,e,t,i){const r=i.includes(".")?Wf(t,i):()=>t[i];if(ut(n)){const s=e[n];Pe(s)&&zo(r,s)}else if(Pe(n))zo(r,n.bind(t));else if(st(n))if(Ce(n))n.forEach(s=>eh(s,e,t,i));else{const s=Pe(n.handler)?n.handler.bind(t):e[n.handler];Pe(s)&&zo(r,s,n)}}function th(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=n.appContext,a=s.get(e);let l;return a?l=a:!r.length&&!t&&!i?l=e:(l={},r.length&&r.forEach(c=>so(l,c,o,!0)),so(l,e,o)),s.set(e,l),l}function so(n,e,t,i=!1){const{mixins:r,extends:s}=e;s&&so(n,s,t,!0),r&&r.forEach(o=>so(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=zp[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const zp={data:lc,props:oi,emits:oi,methods:oi,computed:oi,beforeCreate:xt,created:xt,beforeMount:xt,mounted:xt,beforeUpdate:xt,updated:xt,beforeDestroy:xt,beforeUnmount:xt,destroyed:xt,unmounted:xt,activated:xt,deactivated:xt,errorCaptured:xt,serverPrefetch:xt,components:oi,directives:oi,watch:Bp,provide:lc,inject:Up};function lc(n,e){return e?n?function(){return ct(Pe(n)?n.call(this,this):n,Pe(e)?e.call(this,this):e)}:e:n}function Up(n,e){return oi(Ga(n),Ga(e))}function Ga(n){if(Ce(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function xt(n,e){return n?[...new Set([].concat(n,e))]:e}function oi(n,e){return n?ct(ct(Object.create(null),n),e):e}function Bp(n,e){if(!n)return e;if(!e)return n;const t=ct(Object.create(null),n);for(const i in e)t[i]=xt(n[i],e[i]);return t}function kp(n,e,t,i=!1){const r={},s={};eo(s,yo,1),n.propsDefaults=Object.create(null),nh(n,e,r,s);for(const o in n.propsOptions[0])o in r||(r[o]=void 0);t?n.props=i?r:Jd(r):n.type.props?n.props=r:n.props=s,n.attrs=s}function Hp(n,e,t,i){const{props:r,attrs:s,vnode:{patchFlag:o}}=n,a=Xe(r),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(_o(n.emitsOptions,h))continue;const m=e[h];if(l)if(ze(s,h))m!==s[h]&&(s[h]=m,c=!0);else{const _=pn(h);r[_]=Va(l,a,_,m,n,!1)}else m!==s[h]&&(s[h]=m,c=!0)}}}else{nh(n,e,r,s)&&(c=!0);let u;for(const f in a)(!e||!ze(e,f)&&((u=vr(f))===f||!ze(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(r[f]=Va(l,a,f,void 0,n,!0)):delete r[f]);if(s!==a)for(const f in s)(!e||!ze(e,f)&&!0)&&(delete s[f],c=!0)}c&&An(n,"set","$attrs")}function nh(n,e,t,i){const[r,s]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(Vs(l))continue;const c=e[l];let u;r&&ze(r,u=pn(l))?!s||!s.includes(u)?t[u]=c:(a||(a={}))[u]=c:_o(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(s){const l=Xe(t),c=a||$e;for(let u=0;u<s.length;u++){const f=s[u];t[f]=Va(r,l,f,c[f],n,!ze(c,f))}}return o}function Va(n,e,t,i,r,s){const o=n[t];if(o!=null){const a=ze(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&Pe(l)){const{propsDefaults:c}=r;t in c?i=c[t]:(ur(r),i=c[t]=l.call(null,e),_i())}else i=l}o[0]&&(s&&!a?i=!1:o[1]&&(i===""||i===vr(t))&&(i=!0))}return i}function ih(n,e,t=!1){const i=e.propsCache,r=i.get(n);if(r)return r;const s=n.props,o={},a=[];let l=!1;if(!Pe(n)){const u=f=>{l=!0;const[h,m]=ih(f,e,!0);ct(o,h),m&&a.push(...m)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!s&&!l)return i.set(n,sr),sr;if(Ce(s))for(let u=0;u<s.length;u++){const f=pn(s[u]);cc(f)&&(o[f]=$e)}else if(s)for(const u in s){const f=pn(u);if(cc(f)){const h=s[u],m=o[f]=Ce(h)||Pe(h)?{type:h}:h;if(m){const _=hc(Boolean,m.type),p=hc(String,m.type);m[0]=_>-1,m[1]=p<0||_<p,(_>-1||ze(m,"default"))&&a.push(f)}}}const c=[o,a];return i.set(n,c),c}function cc(n){return n[0]!=="$"}function uc(n){const e=n&&n.toString().match(/^\s*function (\w+)/);return e?e[1]:n===null?"null":""}function fc(n,e){return uc(n)===uc(e)}function hc(n,e){return Ce(e)?e.findIndex(t=>fc(t,n)):Pe(e)&&fc(e,n)?0:-1}const rh=n=>n[0]==="_"||n==="$stable",Sl=n=>Ce(n)?n.map(un):[un(n)],Gp=(n,e,t)=>{if(e._n)return e;const i=io((...r)=>Sl(e(...r)),t);return i._c=!1,i},sh=(n,e,t)=>{const i=n._ctx;for(const r in n){if(rh(r))continue;const s=n[r];if(Pe(s))e[r]=Gp(r,s,i);else if(s!=null){const o=Sl(s);e[r]=()=>o}}},oh=(n,e)=>{const t=Sl(e);n.slots.default=()=>t},Vp=(n,e)=>{if(n.vnode.shapeFlag&32){const t=e._;t?(n.slots=Xe(e),eo(e,"_",t)):sh(e,n.slots={})}else n.slots={},e&&oh(n,e);eo(n.slots,yo,1)},Wp=(n,e,t)=>{const{vnode:i,slots:r}=n;let s=!0,o=$e;if(i.shapeFlag&32){const a=e._;a?t&&a===1?s=!1:(ct(r,e),!t&&a===1&&delete r._):(s=!e.$stable,sh(e,r)),o=e}else e&&(oh(n,e),o={default:1});if(s)for(const a in r)!rh(a)&&!(a in o)&&delete r[a]};function ah(){return{app:null,config:{isNativeTag:xd,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let qp=0;function jp(n,e){return function(i,r=null){Pe(i)||(i=Object.assign({},i)),r!=null&&!st(r)&&(r=null);const s=ah(),o=new Set;let a=!1;const l=s.app={_uid:qp++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:pm,get config(){return s.config},set config(c){},use(c,...u){return o.has(c)||(c&&Pe(c.install)?(o.add(c),c.install(l,...u)):Pe(c)&&(o.add(c),c(l,...u))),l},mixin(c){return s.mixins.includes(c)||s.mixins.push(c),l},component(c,u){return u?(s.components[c]=u,l):s.components[c]},directive(c,u){return u?(s.directives[c]=u,l):s.directives[c]},mount(c,u,f){if(!a){const h=Je(i,r);return h.appContext=s,u&&e?e(h,c):n(h,c,f),a=!0,l._container=c,c.__vue_app__=l,bo(h.component)||h.component.proxy}},unmount(){a&&(n(null,l._container),delete l._container.__vue_app__)},provide(c,u){return s.provides[c]=u,l}};return l}}function Wa(n,e,t,i,r=!1){if(Ce(n)){n.forEach((h,m)=>Wa(h,e&&(Ce(e)?e[m]:e),t,i,r));return}if(Ws(i)&&!r)return;const s=i.shapeFlag&4?bo(i.component)||i.component.proxy:i.el,o=r?null:s,{i:a,r:l}=n,c=e&&e.r,u=a.refs===$e?a.refs={}:a.refs,f=a.setupState;if(c!=null&&c!==l&&(ut(c)?(u[c]=null,ze(f,c)&&(f[c]=null)):vt(c)&&(c.value=null)),Pe(l))Xn(l,a,12,[o,u]);else{const h=ut(l),m=vt(l);if(h||m){const _=()=>{if(n.f){const p=h?u[l]:l.value;r?Ce(p)&&fl(p,s):Ce(p)?p.includes(s)||p.push(s):h?(u[l]=[s],ze(f,l)&&(f[l]=u[l])):(l.value=[s],n.k&&(u[n.k]=l.value))}else h?(u[l]=o,ze(f,l)&&(f[l]=o)):m&&(l.value=o,n.k&&(u[n.k]=o))};o?(_.id=-1,Mt(_,t)):_()}}}const Mt=_p;function Xp(n){return $p(n)}function $p(n,e){const t=Sd();t.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:m=Zt,cloneNode:_,insertStaticContent:p}=n,d=(T,R,k,K=null,Q=null,re=null,se=!1,le=null,ue=!!R.dynamicChildren)=>{if(T===R)return;T&&!ci(T,R)&&(K=Le(T),ae(T,Q,re,!0),T=null),R.patchFlag===-2&&(ue=!1,R.dynamicChildren=null);const{type:v,ref:x,shapeFlag:I}=R;switch(v){case El:g(T,R,k,K);break;case Kt:M(T,R,k,K);break;case qs:T==null&&A(R,k,K,se);break;case cn:te(T,R,k,K,Q,re,se,le,ue);break;default:I&1?D(T,R,k,K,Q,re,se,le,ue):I&6?z(T,R,k,K,Q,re,se,le,ue):(I&64||I&128)&&v.process(T,R,k,K,Q,re,se,le,ue,_e)}x!=null&&Q&&Wa(x,T&&T.ref,re,R||T,!R)},g=(T,R,k,K)=>{if(T==null)i(R.el=a(R.children),k,K);else{const Q=R.el=T.el;R.children!==T.children&&c(Q,R.children)}},M=(T,R,k,K)=>{T==null?i(R.el=l(R.children||""),k,K):R.el=T.el},A=(T,R,k,K)=>{[T.el,T.anchor]=p(T.children,R,k,K,T.el,T.anchor)},E=({el:T,anchor:R},k,K)=>{let Q;for(;T&&T!==R;)Q=h(T),i(T,k,K),T=Q;i(R,k,K)},w=({el:T,anchor:R})=>{let k;for(;T&&T!==R;)k=h(T),r(T),T=k;r(R)},D=(T,R,k,K,Q,re,se,le,ue)=>{se=se||R.type==="svg",T==null?O(R,k,K,Q,re,se,le,ue):N(T,R,Q,re,se,le,ue)},O=(T,R,k,K,Q,re,se,le)=>{let ue,v;const{type:x,props:I,shapeFlag:B,transition:Y,patchFlag:ie,dirs:ve}=T;if(T.el&&_!==void 0&&ie===-1)ue=T.el=_(T.el);else{if(ue=T.el=o(T.type,re,I&&I.is,I),B&8?u(ue,T.children):B&16&&C(T.children,ue,null,K,Q,re&&x!=="foreignObject",se,le),ve&&Qn(T,null,K,"created"),I){for(const X in I)X!=="value"&&!Vs(X)&&s(ue,X,null,I[X],re,T.children,K,Q,He);"value"in I&&s(ue,"value",null,I.value),(v=I.onVnodeBeforeMount)&&on(v,K,T)}y(ue,T,T.scopeId,se,K)}ve&&Qn(T,null,K,"beforeMount");const b=(!Q||Q&&!Q.pendingBranch)&&Y&&!Y.persisted;b&&Y.beforeEnter(ue),i(ue,R,k),((v=I&&I.onVnodeMounted)||b||ve)&&Mt(()=>{v&&on(v,K,T),b&&Y.enter(ue),ve&&Qn(T,null,K,"mounted")},Q)},y=(T,R,k,K,Q)=>{if(k&&m(T,k),K)for(let re=0;re<K.length;re++)m(T,K[re]);if(Q){let re=Q.subTree;if(R===re){const se=Q.vnode;y(T,se,se.scopeId,se.slotScopeIds,Q.parent)}}},C=(T,R,k,K,Q,re,se,le,ue=0)=>{for(let v=ue;v<T.length;v++){const x=T[v]=le?Wn(T[v]):un(T[v]);d(null,x,R,k,K,Q,re,se,le)}},N=(T,R,k,K,Q,re,se)=>{const le=R.el=T.el;let{patchFlag:ue,dynamicChildren:v,dirs:x}=R;ue|=T.patchFlag&16;const I=T.props||$e,B=R.props||$e;let Y;k&&ei(k,!1),(Y=B.onVnodeBeforeUpdate)&&on(Y,k,R,T),x&&Qn(R,T,k,"beforeUpdate"),k&&ei(k,!0);const ie=Q&&R.type!=="foreignObject";if(v?F(T.dynamicChildren,v,le,k,K,ie,re):se||W(T,R,le,null,k,K,ie,re,!1),ue>0){if(ue&16)H(le,R,I,B,k,K,Q);else if(ue&2&&I.class!==B.class&&s(le,"class",null,B.class,Q),ue&4&&s(le,"style",I.style,B.style,Q),ue&8){const ve=R.dynamicProps;for(let b=0;b<ve.length;b++){const X=ve[b],fe=I[X],he=B[X];(he!==fe||X==="value")&&s(le,X,fe,he,Q,T.children,k,K,He)}}ue&1&&T.children!==R.children&&u(le,R.children)}else!se&&v==null&&H(le,R,I,B,k,K,Q);((Y=B.onVnodeUpdated)||x)&&Mt(()=>{Y&&on(Y,k,R,T),x&&Qn(R,T,k,"updated")},K)},F=(T,R,k,K,Q,re,se)=>{for(let le=0;le<R.length;le++){const ue=T[le],v=R[le],x=ue.el&&(ue.type===cn||!ci(ue,v)||ue.shapeFlag&70)?f(ue.el):k;d(ue,v,x,null,K,Q,re,se,!0)}},H=(T,R,k,K,Q,re,se)=>{if(k!==K){for(const le in K){if(Vs(le))continue;const ue=K[le],v=k[le];ue!==v&&le!=="value"&&s(T,le,v,ue,se,R.children,Q,re,He)}if(k!==$e)for(const le in k)!Vs(le)&&!(le in K)&&s(T,le,k[le],null,se,R.children,Q,re,He);"value"in K&&s(T,"value",k.value,K.value)}},te=(T,R,k,K,Q,re,se,le,ue)=>{const v=R.el=T?T.el:a(""),x=R.anchor=T?T.anchor:a("");let{patchFlag:I,dynamicChildren:B,slotScopeIds:Y}=R;Y&&(le=le?le.concat(Y):Y),T==null?(i(v,k,K),i(x,k,K),C(R.children,k,x,Q,re,se,le,ue)):I>0&&I&64&&B&&T.dynamicChildren?(F(T.dynamicChildren,B,k,Q,re,se,le),(R.key!=null||Q&&R===Q.subTree)&&lh(T,R,!0)):W(T,R,k,x,Q,re,se,le,ue)},z=(T,R,k,K,Q,re,se,le,ue)=>{R.slotScopeIds=le,T==null?R.shapeFlag&512?Q.ctx.activate(R,k,K,se,ue):ee(R,k,K,Q,re,se,ue):G(T,R,ue)},ee=(T,R,k,K,Q,re,se)=>{const le=T.component=rm(T,K,Q);if(xo(T)&&(le.ctx.renderer=_e),om(le),le.asyncDep){if(Q&&Q.registerDep(le,j),!T.el){const ue=le.subTree=Je(Kt);M(null,ue,R,k)}return}j(le,T,R,k,Q,re,se)},G=(T,R,k)=>{const K=R.component=T.component;if(pp(T,R,k))if(K.asyncDep&&!K.asyncResolved){q(K,R,k);return}else K.next=R,lp(K.update),K.update();else R.el=T.el,K.vnode=R},j=(T,R,k,K,Q,re,se)=>{const le=()=>{if(T.isMounted){let{next:x,bu:I,u:B,parent:Y,vnode:ie}=T,ve=x,b;ei(T,!1),x?(x.el=ie.el,q(T,x,se)):x=ie,I&&Fo(I),(b=x.props&&x.props.onVnodeBeforeUpdate)&&on(b,Y,x,ie),ei(T,!0);const X=No(T),fe=T.subTree;T.subTree=X,d(fe,X,f(fe.el),Le(fe),T,Q,re),x.el=X.el,ve===null&&mp(T,X.el),B&&Mt(B,Q),(b=x.props&&x.props.onVnodeUpdated)&&Mt(()=>on(b,Y,x,ie),Q)}else{let x;const{el:I,props:B}=R,{bm:Y,m:ie,parent:ve}=T,b=Ws(R);if(ei(T,!1),Y&&Fo(Y),!b&&(x=B&&B.onVnodeBeforeMount)&&on(x,ve,R),ei(T,!0),I&&De){const X=()=>{T.subTree=No(T),De(I,T.subTree,T,Q,null)};b?R.type.__asyncLoader().then(()=>!T.isUnmounted&&X()):X()}else{const X=T.subTree=No(T);d(null,X,k,K,T,Q,re),R.el=X.el}if(ie&&Mt(ie,Q),!b&&(x=B&&B.onVnodeMounted)){const X=R;Mt(()=>on(x,ve,X),Q)}(R.shapeFlag&256||ve&&Ws(ve.vnode)&&ve.vnode.shapeFlag&256)&&T.a&&Mt(T.a,Q),T.isMounted=!0,R=k=K=null}},ue=T.effect=new ml(le,()=>Of(v),T.scope),v=T.update=()=>ue.run();v.id=T.uid,ei(T,!0),v()},q=(T,R,k)=>{R.component=T;const K=T.vnode.props;T.vnode=R,T.next=null,Hp(T,R.props,K,k),Wp(T,R.children,k),yr(),go(void 0,T.update),br()},W=(T,R,k,K,Q,re,se,le,ue=!1)=>{const v=T&&T.children,x=T?T.shapeFlag:0,I=R.children,{patchFlag:B,shapeFlag:Y}=R;if(B>0){if(B&128){ce(v,I,k,K,Q,re,se,le,ue);return}else if(B&256){J(v,I,k,K,Q,re,se,le,ue);return}}Y&8?(x&16&&He(v,Q,re),I!==v&&u(k,I)):x&16?Y&16?ce(v,I,k,K,Q,re,se,le,ue):He(v,Q,re,!0):(x&8&&u(k,""),Y&16&&C(I,k,K,Q,re,se,le,ue))},J=(T,R,k,K,Q,re,se,le,ue)=>{T=T||sr,R=R||sr;const v=T.length,x=R.length,I=Math.min(v,x);let B;for(B=0;B<I;B++){const Y=R[B]=ue?Wn(R[B]):un(R[B]);d(T[B],Y,k,null,Q,re,se,le,ue)}v>x?He(T,Q,re,!0,!1,I):C(R,k,K,Q,re,se,le,ue,I)},ce=(T,R,k,K,Q,re,se,le,ue)=>{let v=0;const x=R.length;let I=T.length-1,B=x-1;for(;v<=I&&v<=B;){const Y=T[v],ie=R[v]=ue?Wn(R[v]):un(R[v]);if(ci(Y,ie))d(Y,ie,k,null,Q,re,se,le,ue);else break;v++}for(;v<=I&&v<=B;){const Y=T[I],ie=R[B]=ue?Wn(R[B]):un(R[B]);if(ci(Y,ie))d(Y,ie,k,null,Q,re,se,le,ue);else break;I--,B--}if(v>I){if(v<=B){const Y=B+1,ie=Y<x?R[Y].el:K;for(;v<=B;)d(null,R[v]=ue?Wn(R[v]):un(R[v]),k,ie,Q,re,se,le,ue),v++}}else if(v>B)for(;v<=I;)ae(T[v],Q,re,!0),v++;else{const Y=v,ie=v,ve=new Map;for(v=ie;v<=B;v++){const be=R[v]=ue?Wn(R[v]):un(R[v]);be.key!=null&&ve.set(be.key,v)}let b,X=0;const fe=B-ie+1;let he=!1,L=0;const de=new Array(fe);for(v=0;v<fe;v++)de[v]=0;for(v=Y;v<=I;v++){const be=T[v];if(X>=fe){ae(be,Q,re,!0);continue}let me;if(be.key!=null)me=ve.get(be.key);else for(b=ie;b<=B;b++)if(de[b-ie]===0&&ci(be,R[b])){me=b;break}me===void 0?ae(be,Q,re,!0):(de[me-ie]=v+1,me>=L?L=me:he=!0,d(be,R[me],k,null,Q,re,se,le,ue),X++)}const pe=he?Yp(de):sr;for(b=pe.length-1,v=fe-1;v>=0;v--){const be=ie+v,me=R[be],Me=be+1<x?R[be+1].el:K;de[v]===0?d(null,me,k,Me,Q,re,se,le,ue):he&&(b<0||v!==pe[b]?oe(me,k,Me,2):b--)}}},oe=(T,R,k,K,Q=null)=>{const{el:re,type:se,transition:le,children:ue,shapeFlag:v}=T;if(v&6){oe(T.component.subTree,R,k,K);return}if(v&128){T.suspense.move(R,k,K);return}if(v&64){se.move(T,R,k,_e);return}if(se===cn){i(re,R,k);for(let I=0;I<ue.length;I++)oe(ue[I],R,k,K);i(T.anchor,R,k);return}if(se===qs){E(T,R,k);return}if(K!==2&&v&1&&le)if(K===0)le.beforeEnter(re),i(re,R,k),Mt(()=>le.enter(re),Q);else{const{leave:I,delayLeave:B,afterLeave:Y}=le,ie=()=>i(re,R,k),ve=()=>{I(re,()=>{ie(),Y&&Y()})};B?B(re,ie,ve):ve()}else i(re,R,k)},ae=(T,R,k,K=!1,Q=!1)=>{const{type:re,props:se,ref:le,children:ue,dynamicChildren:v,shapeFlag:x,patchFlag:I,dirs:B}=T;if(le!=null&&Wa(le,null,k,T,!0),x&256){R.ctx.deactivate(T);return}const Y=x&1&&B,ie=!Ws(T);let ve;if(ie&&(ve=se&&se.onVnodeBeforeUnmount)&&on(ve,R,T),x&6)Z(T.component,k,K);else{if(x&128){T.suspense.unmount(k,K);return}Y&&Qn(T,null,R,"beforeUnmount"),x&64?T.type.remove(T,R,k,Q,_e,K):v&&(re!==cn||I>0&&I&64)?He(v,R,k,!1,!0):(re===cn&&I&384||!Q&&x&16)&&He(ue,R,k),K&&ye(T)}(ie&&(ve=se&&se.onVnodeUnmounted)||Y)&&Mt(()=>{ve&&on(ve,R,T),Y&&Qn(T,null,R,"unmounted")},k)},ye=T=>{const{type:R,el:k,anchor:K,transition:Q}=T;if(R===cn){we(k,K);return}if(R===qs){w(T);return}const re=()=>{r(k),Q&&!Q.persisted&&Q.afterLeave&&Q.afterLeave()};if(T.shapeFlag&1&&Q&&!Q.persisted){const{leave:se,delayLeave:le}=Q,ue=()=>se(k,re);le?le(T.el,re,ue):ue()}else re()},we=(T,R)=>{let k;for(;T!==R;)k=h(T),r(T),T=k;r(R)},Z=(T,R,k)=>{const{bum:K,scope:Q,update:re,subTree:se,um:le}=T;K&&Fo(K),Q.stop(),re&&(re.active=!1,ae(se,T,R,k)),le&&Mt(le,R),Mt(()=>{T.isUnmounted=!0},R),R&&R.pendingBranch&&!R.isUnmounted&&T.asyncDep&&!T.asyncResolved&&T.suspenseId===R.pendingId&&(R.deps--,R.deps===0&&R.resolve())},He=(T,R,k,K=!1,Q=!1,re=0)=>{for(let se=re;se<T.length;se++)ae(T[se],R,k,K,Q)},Le=T=>T.shapeFlag&6?Le(T.component.subTree):T.shapeFlag&128?T.suspense.next():h(T.anchor||T.el),Ee=(T,R,k)=>{T==null?R._vnode&&ae(R._vnode,null,null,!0):d(R._vnode||null,T,R,null,null,null,k),Bf(),R._vnode=T},_e={p:d,um:ae,m:oe,r:ye,mt:ee,mc:C,pc:W,pbc:F,n:Le,o:n};let Oe,De;return e&&([Oe,De]=e(_e)),{render:Ee,hydrate:Oe,createApp:jp(Ee,Oe)}}function ei({effect:n,update:e},t){n.allowRecurse=e.allowRecurse=t}function lh(n,e,t=!1){const i=n.children,r=e.children;if(Ce(i)&&Ce(r))for(let s=0;s<i.length;s++){const o=i[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=Wn(r[s]),a.el=o.el),t||lh(o,a))}}function Yp(n){const e=n.slice(),t=[0];let i,r,s,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(r=t[t.length-1],n[r]<c){e[i]=r,t.push(i);continue}for(s=0,o=t.length-1;s<o;)a=s+o>>1,n[t[a]]<c?s=a+1:o=a;c<n[t[s]]&&(s>0&&(e[i]=t[s-1]),t[s]=i)}}for(s=t.length,o=t[s-1];s-- >0;)t[s]=o,o=e[o];return t}const Zp=n=>n.__isTeleport,cn=Symbol(void 0),El=Symbol(void 0),Kt=Symbol(void 0),qs=Symbol(void 0),Zr=[];let Yt=null;function Jt(n=!1){Zr.push(Yt=n?null:[])}function Kp(){Zr.pop(),Yt=Zr[Zr.length-1]||null}let es=1;function dc(n){es+=n}function ch(n){return n.dynamicChildren=es>0?Yt||sr:null,Kp(),es>0&&Yt&&Yt.push(n),n}function Sn(n,e,t,i,r,s){return ch(Ye(n,e,t,i,r,s,!0))}function uh(n,e,t,i,r){return ch(Je(n,e,t,i,r,!0))}function qa(n){return n?n.__v_isVNode===!0:!1}function ci(n,e){return n.type===e.type&&n.key===e.key}const yo="__vInternal",fh=({key:n})=>n!=null?n:null,js=({ref:n,ref_key:e,ref_for:t})=>n!=null?ut(n)||vt(n)||Pe(n)?{i:Ot,r:n,k:e,f:!!t}:n:null;function Ye(n,e=null,t=null,i=0,r=null,s=n===cn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&fh(e),ref:e&&js(e),scopeId:Gf,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null};return a?(Tl(l,t),s&128&&n.normalize(l)):t&&(l.shapeFlag|=ut(t)?8:16),es>0&&!o&&Yt&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Yt.push(l),l}const Je=Jp;function Jp(n,e=null,t=null,i=0,r=null,s=!1){if((!n||n===Pp)&&(n=Kt),qa(n)){const a=Kn(n,e,!0);return t&&Tl(a,t),es>0&&!s&&Yt&&(a.shapeFlag&6?Yt[Yt.indexOf(n)]=a:Yt.push(a)),a.patchFlag|=-2,a}if(fm(n)&&(n=n.__vccOpts),e){e=Qp(e);let{class:a,style:l}=e;a&&!ut(a)&&(e.class=cl(a)),st(l)&&(Pf(l)&&!Ce(l)&&(l=ct({},l)),e.style=Tn(l))}const o=ut(n)?1:gp(n)?128:Zp(n)?64:st(n)?4:Pe(n)?2:0;return Ye(n,e,t,i,r,o,s,!0)}function Qp(n){return n?Pf(n)||yo in n?ct({},n):n:null}function Kn(n,e,t=!1){const{props:i,ref:r,patchFlag:s,children:o}=n,a=e?tm(i||{},e):i;return{__v_isVNode:!0,__v_skip:!0,type:n.type,props:a,key:a&&fh(a),ref:e&&e.ref?t&&r?Ce(r)?r.concat(js(e)):[r,js(e)]:js(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==cn?s===-1?16:s|16:s,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:n.transition,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Kn(n.ssContent),ssFallback:n.ssFallback&&Kn(n.ssFallback),el:n.el,anchor:n.anchor}}function Ei(n=" ",e=0){return Je(El,null,n,e)}function em(n,e){const t=Je(qs,null,n);return t.staticCount=e,t}function ja(n="",e=!1){return e?(Jt(),uh(Kt,null,n)):Je(Kt,null,n)}function un(n){return n==null||typeof n=="boolean"?Je(Kt):Ce(n)?Je(cn,null,n.slice()):typeof n=="object"?Wn(n):Je(El,null,String(n))}function Wn(n){return n.el===null||n.memo?n:Kn(n)}function Tl(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(Ce(e))t=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),Tl(n,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!(yo in e)?e._ctx=Ot:r===3&&Ot&&(Ot.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Pe(e)?(e={default:e,_ctx:Ot},t=32):(e=String(e),i&64?(t=16,e=[Ei(e)]):t=8);n.children=e,n.shapeFlag|=t}function tm(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=cl([e.class,i.class]));else if(r==="style")e.style=Tn([e.style,i.style]);else if(co(r)){const s=e[r],o=i[r];o&&s!==o&&!(Ce(s)&&s.includes(o))&&(e[r]=s?[].concat(s,o):o)}else r!==""&&(e[r]=i[r])}return e}function on(n,e,t,i=null){Ut(n,e,7,[t,i])}const nm=ah();let im=0;function rm(n,e,t){const i=n.type,r=(e?e.appContext:n.appContext)||nm,s={uid:im++,vnode:n,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new Ed(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:ih(i,r),emitsOptions:Hf(i,r),emit:null,emitted:null,propsDefaults:$e,inheritAttrs:i.inheritAttrs,ctx:$e,data:$e,props:$e,attrs:$e,slots:$e,refs:$e,setupState:$e,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=fp.bind(null,s),n.ce&&n.ce(s),s}let lt=null;const sm=()=>lt||Ot,ur=n=>{lt=n,n.scope.on()},_i=()=>{lt&&lt.scope.off(),lt=null};function hh(n){return n.vnode.shapeFlag&4}let ts=!1;function om(n,e=!1){ts=e;const{props:t,children:i}=n.vnode,r=hh(n);kp(n,t,r,e),Vp(n,i);const s=r?am(n,e):void 0;return ts=!1,s}function am(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=If(new Proxy(n.ctx,Fp));const{setup:i}=t;if(i){const r=n.setupContext=i.length>1?cm(n):null;ur(n),yr();const s=Xn(i,n,0,[n.props,r]);if(br(),_i(),_f(s)){if(s.then(_i,_i),e)return s.then(o=>{pc(n,o,e)}).catch(o=>{mo(o,n,0)});n.asyncDep=s}else pc(n,s,e)}else dh(n,e)}function pc(n,e,t){Pe(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:st(e)&&(n.setupState=Ff(e)),dh(n,t)}let mc;function dh(n,e,t){const i=n.type;if(!n.render){if(!e&&mc&&!i.render){const r=i.template;if(r){const{isCustomElement:s,compilerOptions:o}=n.appContext.config,{delimiters:a,compilerOptions:l}=i,c=ct(ct({isCustomElement:s,delimiters:a},o),l);i.render=mc(r,c)}}n.render=i.render||Zt}ur(n),yr(),Np(n),br(),_i()}function lm(n){return new Proxy(n.attrs,{get(e,t){return Dt(n,"get","$attrs"),e[t]}})}function cm(n){const e=i=>{n.exposed=i||{}};let t;return{get attrs(){return t||(t=lm(n))},slots:n.slots,emit:n.emit,expose:e}}function bo(n){if(n.exposed)return n.exposeProxy||(n.exposeProxy=new Proxy(Ff(If(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in ro)return ro[t](n)}}))}function um(n,e=!0){return Pe(n)?n.displayName||n.name:n.name||e&&n.__name}function fm(n){return Pe(n)&&"__vccOpts"in n}const hm=(n,e)=>rp(n,e,ts);function dm(n,e,t){const i=arguments.length;return i===2?st(e)&&!Ce(e)?qa(e)?Je(n,null,[e]):Je(n,e):Je(n,null,e):(i>3?t=Array.prototype.slice.call(arguments,2):i===3&&qa(t)&&(t=[t]),Je(n,e,t))}const pm="3.2.37",mm="http://www.w3.org/2000/svg",ui=typeof document!="undefined"?document:null,gc=ui&&ui.createElement("template"),gm={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const r=e?ui.createElementNS(mm,n):ui.createElement(n,t?{is:t}:void 0);return n==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:n=>ui.createTextNode(n),createComment:n=>ui.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ui.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},cloneNode(n){const e=n.cloneNode(!0);return"_value"in n&&(e._value=n._value),e},insertStaticContent(n,e,t,i,r,s){const o=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{gc.innerHTML=i?`<svg>${n}</svg>`:n;const a=gc.content;if(i){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}};function _m(n,e,t){const i=n._vtc;i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}function xm(n,e,t){const i=n.style,r=ut(t);if(t&&!r){for(const s in t)Xa(i,s,t[s]);if(e&&!ut(e))for(const s in e)t[s]==null&&Xa(i,s,"")}else{const s=i.display;r?e!==t&&(i.cssText=t):e&&n.removeAttribute("style"),"_vod"in n&&(i.display=s)}}const _c=/\s*!important$/;function Xa(n,e,t){if(Ce(t))t.forEach(i=>Xa(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=vm(n,e);_c.test(t)?n.setProperty(vr(i),t.replace(_c,""),"important"):n[i]=t}}const xc=["Webkit","Moz","ms"],Bo={};function vm(n,e){const t=Bo[e];if(t)return t;let i=pn(e);if(i!=="filter"&&i in n)return Bo[e]=i;i=ho(i);for(let r=0;r<xc.length;r++){const s=xc[r]+i;if(s in n)return Bo[e]=s}return e}const vc="http://www.w3.org/1999/xlink";function ym(n,e,t,i,r){if(i&&e.startsWith("xlink:"))t==null?n.removeAttributeNS(vc,e.slice(6,e.length)):n.setAttributeNS(vc,e,t);else{const s=pd(e);t==null||s&&!pf(t)?n.removeAttribute(e):n.setAttribute(e,s?"":t)}}function bm(n,e,t,i,r,s,o){if(e==="innerHTML"||e==="textContent"){i&&o(i,r,s),n[e]=t==null?"":t;return}if(e==="value"&&n.tagName!=="PROGRESS"&&!n.tagName.includes("-")){n._value=t;const l=t==null?"":t;(n.value!==l||n.tagName==="OPTION")&&(n.value=l),t==null&&n.removeAttribute(e);return}let a=!1;if(t===""||t==null){const l=typeof n[e];l==="boolean"?t=pf(t):t==null&&l==="string"?(t="",a=!0):l==="number"&&(t=0,a=!0)}try{n[e]=t}catch{}a&&n.removeAttribute(e)}const[ph,Mm]=(()=>{let n=Date.now,e=!1;if(typeof window!="undefined"){Date.now()>document.createEvent("Event").timeStamp&&(n=performance.now.bind(performance));const t=navigator.userAgent.match(/firefox\/(\d+)/i);e=!!(t&&Number(t[1])<=53)}return[n,e]})();let $a=0;const wm=Promise.resolve(),Sm=()=>{$a=0},Em=()=>$a||(wm.then(Sm),$a=ph());function Tm(n,e,t,i){n.addEventListener(e,t,i)}function Am(n,e,t,i){n.removeEventListener(e,t,i)}function Cm(n,e,t,i,r=null){const s=n._vei||(n._vei={}),o=s[e];if(i&&o)o.value=i;else{const[a,l]=Lm(e);if(i){const c=s[e]=Dm(i,r);Tm(n,a,c,l)}else o&&(Am(n,a,o,l),s[e]=void 0)}}const yc=/(?:Once|Passive|Capture)$/;function Lm(n){let e;if(yc.test(n)){e={};let t;for(;t=n.match(yc);)n=n.slice(0,n.length-t[0].length),e[t[0].toLowerCase()]=!0}return[vr(n.slice(2)),e]}function Dm(n,e){const t=i=>{const r=i.timeStamp||ph();(Mm||r>=t.attached-1)&&Ut(Rm(i,t.value),e,5,[i])};return t.value=n,t.attached=Em(),t}function Rm(n,e){if(Ce(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const bc=/^on[a-z]/,Pm=(n,e,t,i,r=!1,s,o,a,l)=>{e==="class"?_m(n,i,r):e==="style"?xm(n,t,i):co(e)?ul(e)||Cm(n,e,t,i,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Im(n,e,i,r))?bm(n,e,i,s,o,a,l):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),ym(n,e,i,r))};function Im(n,e,t,i){return i?!!(e==="innerHTML"||e==="textContent"||e in n&&bc.test(e)&&Pe(t)):e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA"||bc.test(e)&&ut(t)?!1:e in n}const Rn="transition",Lr="animation",ns=(n,{slots:e})=>dm(qf,Fm(n),e);ns.displayName="Transition";const mh={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String};ns.props=ct({},qf.props,mh);const ti=(n,e=[])=>{Ce(n)?n.forEach(t=>t(...e)):n&&n(...e)},Mc=n=>n?Ce(n)?n.some(e=>e.length>1):n.length>1:!1;function Fm(n){const e={};for(const H in n)H in mh||(e[H]=n[H]);if(n.css===!1)return e;const{name:t="v",type:i,duration:r,enterFromClass:s=`${t}-enter-from`,enterActiveClass:o=`${t}-enter-active`,enterToClass:a=`${t}-enter-to`,appearFromClass:l=s,appearActiveClass:c=o,appearToClass:u=a,leaveFromClass:f=`${t}-leave-from`,leaveActiveClass:h=`${t}-leave-active`,leaveToClass:m=`${t}-leave-to`}=n,_=Nm(r),p=_&&_[0],d=_&&_[1],{onBeforeEnter:g,onEnter:M,onEnterCancelled:A,onLeave:E,onLeaveCancelled:w,onBeforeAppear:D=g,onAppear:O=M,onAppearCancelled:y=A}=e,C=(H,te,z)=>{ni(H,te?u:a),ni(H,te?c:o),z&&z()},N=(H,te)=>{H._isLeaving=!1,ni(H,f),ni(H,m),ni(H,h),te&&te()},F=H=>(te,z)=>{const ee=H?O:M,G=()=>C(te,H,z);ti(ee,[te,G]),wc(()=>{ni(te,H?l:s),Pn(te,H?u:a),Mc(ee)||Sc(te,i,p,G)})};return ct(e,{onBeforeEnter(H){ti(g,[H]),Pn(H,s),Pn(H,o)},onBeforeAppear(H){ti(D,[H]),Pn(H,l),Pn(H,c)},onEnter:F(!1),onAppear:F(!0),onLeave(H,te){H._isLeaving=!0;const z=()=>N(H,te);Pn(H,f),Um(),Pn(H,h),wc(()=>{!H._isLeaving||(ni(H,f),Pn(H,m),Mc(E)||Sc(H,i,d,z))}),ti(E,[H,z])},onEnterCancelled(H){C(H,!1),ti(A,[H])},onAppearCancelled(H){C(H,!0),ti(y,[H])},onLeaveCancelled(H){N(H),ti(w,[H])}})}function Nm(n){if(n==null)return null;if(st(n))return[ko(n.enter),ko(n.leave)];{const e=ko(n);return[e,e]}}function ko(n){return yf(n)}function Pn(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n._vtc||(n._vtc=new Set)).add(e)}function ni(n,e){e.split(/\s+/).forEach(i=>i&&n.classList.remove(i));const{_vtc:t}=n;t&&(t.delete(e),t.size||(n._vtc=void 0))}function wc(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let Om=0;function Sc(n,e,t,i){const r=n._endId=++Om,s=()=>{r===n._endId&&i()};if(t)return setTimeout(s,t);const{type:o,timeout:a,propCount:l}=zm(n,e);if(!o)return i();const c=o+"end";let u=0;const f=()=>{n.removeEventListener(c,h),s()},h=m=>{m.target===n&&++u>=l&&f()};setTimeout(()=>{u<l&&f()},a+1),n.addEventListener(c,h)}function zm(n,e){const t=window.getComputedStyle(n),i=_=>(t[_]||"").split(", "),r=i(Rn+"Delay"),s=i(Rn+"Duration"),o=Ec(r,s),a=i(Lr+"Delay"),l=i(Lr+"Duration"),c=Ec(a,l);let u=null,f=0,h=0;e===Rn?o>0&&(u=Rn,f=o,h=s.length):e===Lr?c>0&&(u=Lr,f=c,h=l.length):(f=Math.max(o,c),u=f>0?o>c?Rn:Lr:null,h=u?u===Rn?s.length:l.length:0);const m=u===Rn&&/\b(transform|all)(,|$)/.test(t[Rn+"Property"]);return{type:u,timeout:f,propCount:h,hasTransform:m}}function Ec(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,i)=>Tc(t)+Tc(n[i])))}function Tc(n){return Number(n.slice(0,-1).replace(",","."))*1e3}function Um(){return document.body.offsetHeight}const Bm=["ctrl","shift","alt","meta"],km={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>Bm.some(t=>n[`${t}Key`]&&!e.includes(t))},Hm=(n,e)=>(t,...i)=>{for(let r=0;r<e.length;r++){const s=km[e[r]];if(s&&s(t,e))return}return n(t,...i)},gh={beforeMount(n,{value:e},{transition:t}){n._vod=n.style.display==="none"?"":n.style.display,t&&e?t.beforeEnter(n):Dr(n,e)},mounted(n,{value:e},{transition:t}){t&&e&&t.enter(n)},updated(n,{value:e,oldValue:t},{transition:i}){!e!=!t&&(i?e?(i.beforeEnter(n),Dr(n,!0),i.enter(n)):i.leave(n,()=>{Dr(n,!1)}):Dr(n,e))},beforeUnmount(n,{value:e}){Dr(n,e)}};function Dr(n,e){n.style.display=e?n._vod:"none"}const Gm=ct({patchProp:Pm},gm);let Ac;function Vm(){return Ac||(Ac=Xp(Gm))}const Wm=(...n)=>{const e=Vm().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=qm(i);if(!r)return;const s=e._component;!Pe(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.innerHTML="";const o=t(r,!1,r instanceof SVGElement);return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e};function qm(n){return ut(n)?document.querySelector(n):n}var Al={exports:{}},_h=function(e,t){return function(){for(var r=new Array(arguments.length),s=0;s<r.length;s++)r[s]=arguments[s];return e.apply(t,r)}},jm=_h,Cl=Object.prototype.toString,Ll=function(n){return function(e){var t=Cl.call(e);return n[t]||(n[t]=t.slice(8,-1).toLowerCase())}}(Object.create(null));function Ti(n){return n=n.toLowerCase(),function(t){return Ll(t)===n}}function Dl(n){return Array.isArray(n)}function oo(n){return typeof n=="undefined"}function Xm(n){return n!==null&&!oo(n)&&n.constructor!==null&&!oo(n.constructor)&&typeof n.constructor.isBuffer=="function"&&n.constructor.isBuffer(n)}var xh=Ti("ArrayBuffer");function $m(n){var e;return typeof ArrayBuffer!="undefined"&&ArrayBuffer.isView?e=ArrayBuffer.isView(n):e=n&&n.buffer&&xh(n.buffer),e}function Ym(n){return typeof n=="string"}function Zm(n){return typeof n=="number"}function vh(n){return n!==null&&typeof n=="object"}function Xs(n){if(Ll(n)!=="object")return!1;var e=Object.getPrototypeOf(n);return e===null||e===Object.prototype}var Km=Ti("Date"),Jm=Ti("File"),Qm=Ti("Blob"),eg=Ti("FileList");function Rl(n){return Cl.call(n)==="[object Function]"}function tg(n){return vh(n)&&Rl(n.pipe)}function ng(n){var e="[object FormData]";return n&&(typeof FormData=="function"&&n instanceof FormData||Cl.call(n)===e||Rl(n.toString)&&n.toString()===e)}var ig=Ti("URLSearchParams");function rg(n){return n.trim?n.trim():n.replace(/^\s+|\s+$/g,"")}function sg(){return typeof navigator!="undefined"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window!="undefined"&&typeof document!="undefined"}function Pl(n,e){if(!(n===null||typeof n=="undefined"))if(typeof n!="object"&&(n=[n]),Dl(n))for(var t=0,i=n.length;t<i;t++)e.call(null,n[t],t,n);else for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.call(null,n[r],r,n)}function Ya(){var n={};function e(r,s){Xs(n[s])&&Xs(r)?n[s]=Ya(n[s],r):Xs(r)?n[s]=Ya({},r):Dl(r)?n[s]=r.slice():n[s]=r}for(var t=0,i=arguments.length;t<i;t++)Pl(arguments[t],e);return n}function og(n,e,t){return Pl(e,function(r,s){t&&typeof r=="function"?n[s]=jm(r,t):n[s]=r}),n}function ag(n){return n.charCodeAt(0)===65279&&(n=n.slice(1)),n}function lg(n,e,t,i){n.prototype=Object.create(e.prototype,i),n.prototype.constructor=n,t&&Object.assign(n.prototype,t)}function cg(n,e,t){var i,r,s,o={};e=e||{};do{for(i=Object.getOwnPropertyNames(n),r=i.length;r-- >0;)s=i[r],o[s]||(e[s]=n[s],o[s]=!0);n=Object.getPrototypeOf(n)}while(n&&(!t||t(n,e))&&n!==Object.prototype);return e}function ug(n,e,t){n=String(n),(t===void 0||t>n.length)&&(t=n.length),t-=e.length;var i=n.indexOf(e,t);return i!==-1&&i===t}function fg(n){if(!n)return null;var e=n.length;if(oo(e))return null;for(var t=new Array(e);e-- >0;)t[e]=n[e];return t}var hg=function(n){return function(e){return n&&e instanceof n}}(typeof Uint8Array!="undefined"&&Object.getPrototypeOf(Uint8Array)),ht={isArray:Dl,isArrayBuffer:xh,isBuffer:Xm,isFormData:ng,isArrayBufferView:$m,isString:Ym,isNumber:Zm,isObject:vh,isPlainObject:Xs,isUndefined:oo,isDate:Km,isFile:Jm,isBlob:Qm,isFunction:Rl,isStream:tg,isURLSearchParams:ig,isStandardBrowserEnv:sg,forEach:Pl,merge:Ya,extend:og,trim:rg,stripBOM:ag,inherits:lg,toFlatObject:cg,kindOf:Ll,kindOfTest:Ti,endsWith:ug,toArray:fg,isTypedArray:hg,isFileList:eg},Pi=ht;function Cc(n){return encodeURIComponent(n).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var yh=function(e,t,i){if(!t)return e;var r;if(i)r=i(t);else if(Pi.isURLSearchParams(t))r=t.toString();else{var s=[];Pi.forEach(t,function(l,c){l===null||typeof l=="undefined"||(Pi.isArray(l)?c=c+"[]":l=[l],Pi.forEach(l,function(f){Pi.isDate(f)?f=f.toISOString():Pi.isObject(f)&&(f=JSON.stringify(f)),s.push(Cc(c)+"="+Cc(f))}))}),r=s.join("&")}if(r){var o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+r}return e},dg=ht;function Mo(){this.handlers=[]}Mo.prototype.use=function(e,t,i){return this.handlers.push({fulfilled:e,rejected:t,synchronous:i?i.synchronous:!1,runWhen:i?i.runWhen:null}),this.handlers.length-1};Mo.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)};Mo.prototype.forEach=function(e){dg.forEach(this.handlers,function(i){i!==null&&e(i)})};var pg=Mo,mg=ht,gg=function(e,t){mg.forEach(e,function(r,s){s!==t&&s.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[s])})},bh=ht;function fr(n,e,t,i,r){Error.call(this),this.message=n,this.name="AxiosError",e&&(this.code=e),t&&(this.config=t),i&&(this.request=i),r&&(this.response=r)}bh.inherits(fr,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var Mh=fr.prototype,wh={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach(function(n){wh[n]={value:n}});Object.defineProperties(fr,wh);Object.defineProperty(Mh,"isAxiosError",{value:!0});fr.from=function(n,e,t,i,r,s){var o=Object.create(Mh);return bh.toFlatObject(n,o,function(l){return l!==Error.prototype}),fr.call(o,n.message,e,t,i,r),o.name=n.name,s&&Object.assign(o,s),o};var Mr=fr,Sh={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},kt=ht;function _g(n,e){e=e||new FormData;var t=[];function i(s){return s===null?"":kt.isDate(s)?s.toISOString():kt.isArrayBuffer(s)||kt.isTypedArray(s)?typeof Blob=="function"?new Blob([s]):Buffer.from(s):s}function r(s,o){if(kt.isPlainObject(s)||kt.isArray(s)){if(t.indexOf(s)!==-1)throw Error("Circular reference detected in "+o);t.push(s),kt.forEach(s,function(l,c){if(!kt.isUndefined(l)){var u=o?o+"."+c:c,f;if(l&&!o&&typeof l=="object"){if(kt.endsWith(c,"{}"))l=JSON.stringify(l);else if(kt.endsWith(c,"[]")&&(f=kt.toArray(l))){f.forEach(function(h){!kt.isUndefined(h)&&e.append(u,i(h))});return}}r(l,u)}}),t.pop()}else e.append(o,i(s))}return r(n),e}var Eh=_g,Ho=Mr,xg=function(e,t,i){var r=i.config.validateStatus;!i.status||!r||r(i.status)?e(i):t(new Ho("Request failed with status code "+i.status,[Ho.ERR_BAD_REQUEST,Ho.ERR_BAD_RESPONSE][Math.floor(i.status/100)-4],i.config,i.request,i))},ds=ht,vg=ds.isStandardBrowserEnv()?function(){return{write:function(t,i,r,s,o,a){var l=[];l.push(t+"="+encodeURIComponent(i)),ds.isNumber(r)&&l.push("expires="+new Date(r).toGMTString()),ds.isString(s)&&l.push("path="+s),ds.isString(o)&&l.push("domain="+o),a===!0&&l.push("secure"),document.cookie=l.join("; ")},read:function(t){var i=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return i?decodeURIComponent(i[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),yg=function(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)},bg=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e},Mg=yg,wg=bg,Th=function(e,t){return e&&!Mg(t)?wg(e,t):t},Go=ht,Sg=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],Eg=function(e){var t={},i,r,s;return e&&Go.forEach(e.split(`
`),function(a){if(s=a.indexOf(":"),i=Go.trim(a.substr(0,s)).toLowerCase(),r=Go.trim(a.substr(s+1)),i){if(t[i]&&Sg.indexOf(i)>=0)return;i==="set-cookie"?t[i]=(t[i]?t[i]:[]).concat([r]):t[i]=t[i]?t[i]+", "+r:r}}),t},Lc=ht,Tg=Lc.isStandardBrowserEnv()?function(){var e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a"),i;function r(s){var o=s;return e&&(t.setAttribute("href",o),o=t.href),t.setAttribute("href",o),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:t.pathname.charAt(0)==="/"?t.pathname:"/"+t.pathname}}return i=r(window.location.href),function(o){var a=Lc.isString(o)?r(o):o;return a.protocol===i.protocol&&a.host===i.host}}():function(){return function(){return!0}}(),Za=Mr,Ag=ht;function Ah(n){Za.call(this,n==null?"canceled":n,Za.ERR_CANCELED),this.name="CanceledError"}Ag.inherits(Ah,Za,{__CANCEL__:!0});var wo=Ah,Cg=function(e){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""},Rr=ht,Lg=xg,Dg=vg,Rg=yh,Pg=Th,Ig=Eg,Fg=Tg,Ng=Sh,mn=Mr,Og=wo,zg=Cg,Dc=function(e){return new Promise(function(i,r){var s=e.data,o=e.headers,a=e.responseType,l;function c(){e.cancelToken&&e.cancelToken.unsubscribe(l),e.signal&&e.signal.removeEventListener("abort",l)}Rr.isFormData(s)&&Rr.isStandardBrowserEnv()&&delete o["Content-Type"];var u=new XMLHttpRequest;if(e.auth){var f=e.auth.username||"",h=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(f+":"+h)}var m=Pg(e.baseURL,e.url);u.open(e.method.toUpperCase(),Rg(m,e.params,e.paramsSerializer),!0),u.timeout=e.timeout;function _(){if(!!u){var g="getAllResponseHeaders"in u?Ig(u.getAllResponseHeaders()):null,M=!a||a==="text"||a==="json"?u.responseText:u.response,A={data:M,status:u.status,statusText:u.statusText,headers:g,config:e,request:u};Lg(function(w){i(w),c()},function(w){r(w),c()},A),u=null}}if("onloadend"in u?u.onloadend=_:u.onreadystatechange=function(){!u||u.readyState!==4||u.status===0&&!(u.responseURL&&u.responseURL.indexOf("file:")===0)||setTimeout(_)},u.onabort=function(){!u||(r(new mn("Request aborted",mn.ECONNABORTED,e,u)),u=null)},u.onerror=function(){r(new mn("Network Error",mn.ERR_NETWORK,e,u,u)),u=null},u.ontimeout=function(){var M=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",A=e.transitional||Ng;e.timeoutErrorMessage&&(M=e.timeoutErrorMessage),r(new mn(M,A.clarifyTimeoutError?mn.ETIMEDOUT:mn.ECONNABORTED,e,u)),u=null},Rr.isStandardBrowserEnv()){var p=(e.withCredentials||Fg(m))&&e.xsrfCookieName?Dg.read(e.xsrfCookieName):void 0;p&&(o[e.xsrfHeaderName]=p)}"setRequestHeader"in u&&Rr.forEach(o,function(M,A){typeof s=="undefined"&&A.toLowerCase()==="content-type"?delete o[A]:u.setRequestHeader(A,M)}),Rr.isUndefined(e.withCredentials)||(u.withCredentials=!!e.withCredentials),a&&a!=="json"&&(u.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&u.addEventListener("progress",e.onDownloadProgress),typeof e.onUploadProgress=="function"&&u.upload&&u.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(l=function(g){!u||(r(!g||g&&g.type?new Og:g),u.abort(),u=null)},e.cancelToken&&e.cancelToken.subscribe(l),e.signal&&(e.signal.aborted?l():e.signal.addEventListener("abort",l))),s||(s=null);var d=zg(m);if(d&&["http","https","file"].indexOf(d)===-1){r(new mn("Unsupported protocol "+d+":",mn.ERR_BAD_REQUEST,e));return}u.send(s)})},Ug=null,at=ht,Rc=gg,Pc=Mr,Bg=Sh,kg=Eh,Hg={"Content-Type":"application/x-www-form-urlencoded"};function Ic(n,e){!at.isUndefined(n)&&at.isUndefined(n["Content-Type"])&&(n["Content-Type"]=e)}function Gg(){var n;return(typeof XMLHttpRequest!="undefined"||typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]")&&(n=Dc),n}function Vg(n,e,t){if(at.isString(n))try{return(e||JSON.parse)(n),at.trim(n)}catch(i){if(i.name!=="SyntaxError")throw i}return(t||JSON.stringify)(n)}var So={transitional:Bg,adapter:Gg(),transformRequest:[function(e,t){if(Rc(t,"Accept"),Rc(t,"Content-Type"),at.isFormData(e)||at.isArrayBuffer(e)||at.isBuffer(e)||at.isStream(e)||at.isFile(e)||at.isBlob(e))return e;if(at.isArrayBufferView(e))return e.buffer;if(at.isURLSearchParams(e))return Ic(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString();var i=at.isObject(e),r=t&&t["Content-Type"],s;if((s=at.isFileList(e))||i&&r==="multipart/form-data"){var o=this.env&&this.env.FormData;return kg(s?{"files[]":e}:e,o&&new o)}else if(i||r==="application/json")return Ic(t,"application/json"),Vg(e);return e}],transformResponse:[function(e){var t=this.transitional||So.transitional,i=t&&t.silentJSONParsing,r=t&&t.forcedJSONParsing,s=!i&&this.responseType==="json";if(s||r&&at.isString(e)&&e.length)try{return JSON.parse(e)}catch(o){if(s)throw o.name==="SyntaxError"?Pc.from(o,Pc.ERR_BAD_RESPONSE,this,null,this.response):o}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Ug},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};at.forEach(["delete","get","head"],function(e){So.headers[e]={}});at.forEach(["post","put","patch"],function(e){So.headers[e]=at.merge(Hg)});var Il=So,Wg=ht,qg=Il,jg=function(e,t,i){var r=this||qg;return Wg.forEach(i,function(o){e=o.call(r,e,t)}),e},Ch=function(e){return!!(e&&e.__CANCEL__)},Fc=ht,Vo=jg,Xg=Ch,$g=Il,Yg=wo;function Wo(n){if(n.cancelToken&&n.cancelToken.throwIfRequested(),n.signal&&n.signal.aborted)throw new Yg}var Zg=function(e){Wo(e),e.headers=e.headers||{},e.data=Vo.call(e,e.data,e.headers,e.transformRequest),e.headers=Fc.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),Fc.forEach(["delete","get","head","post","put","patch","common"],function(r){delete e.headers[r]});var t=e.adapter||$g.adapter;return t(e).then(function(r){return Wo(e),r.data=Vo.call(e,r.data,r.headers,e.transformResponse),r},function(r){return Xg(r)||(Wo(e),r&&r.response&&(r.response.data=Vo.call(e,r.response.data,r.response.headers,e.transformResponse))),Promise.reject(r)})},Tt=ht,Lh=function(e,t){t=t||{};var i={};function r(u,f){return Tt.isPlainObject(u)&&Tt.isPlainObject(f)?Tt.merge(u,f):Tt.isPlainObject(f)?Tt.merge({},f):Tt.isArray(f)?f.slice():f}function s(u){if(Tt.isUndefined(t[u])){if(!Tt.isUndefined(e[u]))return r(void 0,e[u])}else return r(e[u],t[u])}function o(u){if(!Tt.isUndefined(t[u]))return r(void 0,t[u])}function a(u){if(Tt.isUndefined(t[u])){if(!Tt.isUndefined(e[u]))return r(void 0,e[u])}else return r(void 0,t[u])}function l(u){if(u in t)return r(e[u],t[u]);if(u in e)return r(void 0,e[u])}var c={url:o,method:o,data:o,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:l};return Tt.forEach(Object.keys(e).concat(Object.keys(t)),function(f){var h=c[f]||s,m=h(f);Tt.isUndefined(m)&&h!==l||(i[f]=m)}),i},Dh={version:"0.27.2"},Kg=Dh.version,qn=Mr,Fl={};["object","boolean","number","function","string","symbol"].forEach(function(n,e){Fl[n]=function(i){return typeof i===n||"a"+(e<1?"n ":" ")+n}});var Nc={};Fl.transitional=function(e,t,i){function r(s,o){return"[Axios v"+Kg+"] Transitional option '"+s+"'"+o+(i?". "+i:"")}return function(s,o,a){if(e===!1)throw new qn(r(o," has been removed"+(t?" in "+t:"")),qn.ERR_DEPRECATED);return t&&!Nc[o]&&(Nc[o]=!0,console.warn(r(o," has been deprecated since v"+t+" and will be removed in the near future"))),e?e(s,o,a):!0}};function Jg(n,e,t){if(typeof n!="object")throw new qn("options must be an object",qn.ERR_BAD_OPTION_VALUE);for(var i=Object.keys(n),r=i.length;r-- >0;){var s=i[r],o=e[s];if(o){var a=n[s],l=a===void 0||o(a,s,n);if(l!==!0)throw new qn("option "+s+" must be "+l,qn.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new qn("Unknown option "+s,qn.ERR_BAD_OPTION)}}var Qg={assertOptions:Jg,validators:Fl},Rh=ht,e0=yh,Oc=pg,zc=Zg,Eo=Lh,t0=Th,Ph=Qg,Ii=Ph.validators;function hr(n){this.defaults=n,this.interceptors={request:new Oc,response:new Oc}}hr.prototype.request=function(e,t){typeof e=="string"?(t=t||{},t.url=e):t=e||{},t=Eo(this.defaults,t),t.method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var i=t.transitional;i!==void 0&&Ph.assertOptions(i,{silentJSONParsing:Ii.transitional(Ii.boolean),forcedJSONParsing:Ii.transitional(Ii.boolean),clarifyTimeoutError:Ii.transitional(Ii.boolean)},!1);var r=[],s=!0;this.interceptors.request.forEach(function(m){typeof m.runWhen=="function"&&m.runWhen(t)===!1||(s=s&&m.synchronous,r.unshift(m.fulfilled,m.rejected))});var o=[];this.interceptors.response.forEach(function(m){o.push(m.fulfilled,m.rejected)});var a;if(!s){var l=[zc,void 0];for(Array.prototype.unshift.apply(l,r),l=l.concat(o),a=Promise.resolve(t);l.length;)a=a.then(l.shift(),l.shift());return a}for(var c=t;r.length;){var u=r.shift(),f=r.shift();try{c=u(c)}catch(h){f(h);break}}try{a=zc(c)}catch(h){return Promise.reject(h)}for(;o.length;)a=a.then(o.shift(),o.shift());return a};hr.prototype.getUri=function(e){e=Eo(this.defaults,e);var t=t0(e.baseURL,e.url);return e0(t,e.params,e.paramsSerializer)};Rh.forEach(["delete","get","head","options"],function(e){hr.prototype[e]=function(t,i){return this.request(Eo(i||{},{method:e,url:t,data:(i||{}).data}))}});Rh.forEach(["post","put","patch"],function(e){function t(i){return function(s,o,a){return this.request(Eo(a||{},{method:e,headers:i?{"Content-Type":"multipart/form-data"}:{},url:s,data:o}))}}hr.prototype[e]=t(),hr.prototype[e+"Form"]=t(!0)});var n0=hr,i0=wo;function dr(n){if(typeof n!="function")throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(r){e=r});var t=this;this.promise.then(function(i){if(!!t._listeners){var r,s=t._listeners.length;for(r=0;r<s;r++)t._listeners[r](i);t._listeners=null}}),this.promise.then=function(i){var r,s=new Promise(function(o){t.subscribe(o),r=o}).then(i);return s.cancel=function(){t.unsubscribe(r)},s},n(function(r){t.reason||(t.reason=new i0(r),e(t.reason))})}dr.prototype.throwIfRequested=function(){if(this.reason)throw this.reason};dr.prototype.subscribe=function(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]};dr.prototype.unsubscribe=function(e){if(!!this._listeners){var t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}};dr.source=function(){var e,t=new dr(function(r){e=r});return{token:t,cancel:e}};var r0=dr,s0=function(e){return function(i){return e.apply(null,i)}},o0=ht,a0=function(e){return o0.isObject(e)&&e.isAxiosError===!0},Uc=ht,l0=_h,$s=n0,c0=Lh,u0=Il;function Ih(n){var e=new $s(n),t=l0($s.prototype.request,e);return Uc.extend(t,$s.prototype,e),Uc.extend(t,e),t.create=function(r){return Ih(c0(n,r))},t}var Et=Ih(u0);Et.Axios=$s;Et.CanceledError=wo;Et.CancelToken=r0;Et.isCancel=Ch;Et.VERSION=Dh.version;Et.toFormData=Eh;Et.AxiosError=Mr;Et.Cancel=Et.CanceledError;Et.all=function(e){return Promise.all(e)};Et.spread=s0;Et.isAxiosError=a0;Al.exports=Et;Al.exports.default=Et;var nr=Al.exports;var wr=(n,e)=>{const t=n.__vccOpts||n;for(const[i,r]of e)t[i]=r;return t};const f0={name:"MessageField",data(){return{message:"",submitted:!1}},props:["colorScheme","localPercent","totalPercent","currentDeleted"],emits:["update:modelValue","submit"],methods:{checkSubmit(){let n=this.$refs.msg.value;n!==""&&(this.$emit("submit",n),this.submitted=!0)}}},h0={class:"flex flex-col justify-around items-center w-screen mb-16"},d0={class:"font-sans text-base font-extralight text-white text-center z-20 transition-all"},p0=Ei("Out of the last 1000 visits, "),m0=Ei(" have been deleted"),g0={class:"font-sans text-base font-extralight text-white text-center z-20 transition-all"},_0=Ei("In total, "),x0=Ei(" of visits have been deleted"),v0={class:"z-20 flex"},y0=Ye("button",{type:"submit",class:"hidden"},null,-1);function b0(n,e,t,i,r,s){return Jt(),Sn("div",h0,[Ye("div",d0,[p0,Ye("b",null,Js(t.localPercent.toFixed(2))+"%",1),m0]),Ye("div",g0,[_0,Ye("b",null,Js(t.totalPercent.toFixed(2))+"%",1),x0]),Je(ns,null,{default:io(()=>[Jf(Ye("div",v0,[Ye("form",{onSubmit:e[1]||(e[1]=Hm((...o)=>s.checkSubmit&&s.checkSubmit(...o),["prevent"]))},[Ye("input",{type:"text",ref:"msg",class:"border w-96 rounded-full h-12 text-center shadow hover:shadow-lg mt-8 p-7 font-sans text-lg",placeholder:"Leave a message",maxlength:"60",onInput:e[0]||(e[0]=o=>n.$emit("update:modelValue",o.target.value)),style:Tn({border:`4px solid rgba(${t.colorScheme[2][0]},${t.colorScheme[2][1]},${t.colorScheme[2][2]}, .6)`})},null,36),y0],32)],512),[[gh,!r.submitted&&!t.currentDeleted]])]),_:1})])}var M0=wr(f0,[["render",b0]]);const w0={name:"Header",props:["counter","colorScheme"],data(){return{}},methods:{animation(){let n=document.querySelectorAll(".wrapper");for(let t=0;t<n.length;t++)n[t].innerHTML=n[t].textContent.replace(/\S/g,"<span class='l opacity-0 inline-block'>$&</span>");let e=anime.timeline({});e.add({targets:"#greeting .l",opacity:[0,1],scale:[.7,1],easing:"easeInOutQuad",duration:600,delay:anime.stagger(100)},0),e.add({targets:"#sentence .l",opacity:[0,1],scale:[.7,1],easing:"easeInOutQuad",duration:600,delay:anime.stagger(50)},2e3),e.add({targets:"#counter",opacity:[0,1],easing:"easeInOutSine",duration:1e3},3200),e.add({targets:"#end .l",opacity:[0,1],scale:[.7,1],easing:"easeInOutQuad",duration:600,delay:anime.stagger(50)},4e3)},bruhAnimation(){var n=document.querySelector("#counter"),e={prop:0};anime({targets:e,prop:[0,this.counter],easing:"easeInOutSine",duration:2e3,delay:3200,update:function(){n.textContent=Math.floor(e.prop)}})}},computed:{time_s(){return this.counter===1?"time":"times"},shadowColor(){return`${this.colorScheme[2][0]},${this.colorScheme[2][1]},${this.colorScheme[2][2]}`},generateGreeting(){let n={English:"Hello"},e=Object.keys(n),t=e[Math.floor(e.length*Math.random())];return n[t]}},mounted(){this.animation(),this.bruhAnimation()}},S0={id:"greeting",class:"text-9xl font-bold m-7 wrapper"},E0=Ye("span",{id:"sentence",class:"wrapper"},"This website has been visited",-1),T0=Ei("\u2002 "),A0=Ei(" \u2002"),C0=Ye("span",{id:"end",class:"wrapper"},"times",-1);function L0(n,e,t,i,r,s){return Jt(),Sn("div",{class:"font-sans text-5xl font-extralight text-white text-center m-10 z-20",style:Tn({textShadow:`0px 0px 20px rgba(${s.shadowColor}, 0.5)`})},[Ye("h1",S0,Js(s.generateGreeting)+",",1),E0,T0,Ye("span",{id:"counter",class:"bg-clip-text font-bold text-7xl transition-all inline-block",style:Tn({textShadow:"none",filter:"brightness(1.3)",backgroundImage:`linear-gradient(45deg, rgb(${t.colorScheme[3][0]},${t.colorScheme[3][1]},${t.colorScheme[3][2]}), 
        rgb(${t.colorScheme[4][0]},${t.colorScheme[4][1]},${t.colorScheme[4][2]})`,backgroundClip:"text",color:"rgba(255, 255, 255, 0"})},Js(t.counter),5),A0,C0],4)}var D0=wr(w0,[["render",L0]]);const R0={name:"ContextMenu",data(){return{}},props:["colorScheme","top","left","scale"],emits:["confirm","cancel"],methods:{},computed:{shadowColor(){return`${this.colorScheme[2][0]},${this.colorScheme[2][1]},${this.colorScheme[2][2]}`}}},P0=Ye("h1",{class:"m-3"},"Are you sure you want to delete this visit?",-1);function I0(n,e,t,i,r,s){return Jt(),Sn("div",null,[Ye("div",{class:"fixed w-screen h-screen z-30 top-0 left-0",onClick:e[0]||(e[0]=o=>n.$emit("cancel"))}),Ye("div",{class:"z-40 w-60 h-40 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl bg-white shadow-white shadow-lg absolute text-center p-3 border border-red-400 font-sans font-extralight",style:Tn({boxShadow:`0px 0px 20px rgba(${s.shadowColor}, 0.5)`,top:`${t.top}px`,left:`${t.left}px`})},[P0,Ye("button",{class:"w-20 h-10 rounded-full bg-red-600 font-sans text-white m-3 hover:bg-red-500 active:scale-110 transition-all",onClick:e[1]||(e[1]=o=>n.$emit("confirm"))},"Delete"),Ye("button",{class:"w-20 h-10 rounded-full border border-blue-400 text-blue-400 hover:bg-blue-100 active:scale-110 transition-all font-sans m-3",onClick:e[2]||(e[2]=o=>n.$emit("cancel"))},"Cancel")],4)])}var F0=wr(R0,[["render",I0]]);const N0={name:"ContextMenu",data(){return{open:!1}},props:["colorScheme"],methods:{toggle(){this.open=!this.open}},computed:{shadowColor(){return`${this.colorScheme[2][0]},${this.colorScheme[2][1]},${this.colorScheme[2][2]}`}}},O0=Ye("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),z0=[O0],U0={key:0},B0=em('<h1 class="m-5 font-normal text-3xl">Welcome.</h1><p class="m-5 text-left text-lg"> This simple website allows you to anonymously leave a digital record.<br> Each <em>&quot;visit&quot;</em> is recorded through a random 3d shape (some are rarer than others).<br> Optionally, you can also leave a message.<br><br> Sounds simple, but there&#39;s a twist...<br><b>Everyone is able to delete any visit by right clicking.</b><br> Enjoy :) <br></p>',2),k0=[B0];function H0(n,e,t,i,r,s){return Jt(),Sn("div",null,[(Jt(),Sn("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-6 w-6 z-30 absolute top-3 left-3 opacity-75 hover:opacity-100 active:scale-110 transition-all",fill:"none",viewBox:"0 0 24 24",stroke:"white","stroke-width":"2",onClick:e[0]||(e[0]=(...o)=>s.toggle&&s.toggle(...o))},z0)),r.open?(Jt(),Sn("div",U0,[Ye("div",{class:"w-screen h-screen fixed z-40 top-0 left-0 bg-black opacity-50",onClick:e[1]||(e[1]=(...o)=>s.toggle&&s.toggle(...o))}),Ye("div",{class:"z-50 w-1/2 h-fit absolute rounded-md bg-white opacity-100 shadow-white shadow-lg text-center p-3 font-sans font-extralight top-0 left-0 right-0 bottom-0 m-auto",style:Tn({boxShadow:`0px 0px 20px rgba(${s.shadowColor}, 0.5)`})},k0,4)])):ja("",!0)])}var G0=wr(N0,[["render",H0]]);/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Nl="142",Fi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ni={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},V0=0,Bc=1,W0=2,Fh=1,q0=2,jr=3,is=0,Qt=1,pr=2,j0=1,$n=0,lr=1,kc=2,Hc=3,Gc=4,X0=5,ir=100,$0=101,Y0=102,Vc=103,Wc=104,Z0=200,K0=201,J0=202,Q0=203,Nh=204,Oh=205,e_=206,t_=207,n_=208,i_=209,r_=210,s_=0,o_=1,a_=2,Ka=3,l_=4,c_=5,u_=6,f_=7,zh=0,h_=1,d_=2,En=0,p_=1,m_=2,g_=3,__=4,x_=5,Uh=300,mr=301,gr=302,Ja=303,Qa=304,To=306,el=1e3,Xt=1001,tl=1002,wt=1003,qc=1004,jc=1005,Ft=1006,v_=1007,Ao=1008,yi=1009,y_=1010,b_=1011,Bh=1012,M_=1013,di=1014,pi=1015,rs=1016,w_=1017,S_=1018,cr=1020,E_=1021,T_=1022,hn=1023,A_=1024,C_=1025,xi=1026,_r=1027,L_=1028,D_=1029,R_=1030,P_=1031,I_=1033,qo=33776,jo=33777,Xo=33778,$o=33779,Xc=35840,$c=35841,Yc=35842,Zc=35843,F_=36196,Kc=37492,Jc=37496,Qc=37808,eu=37809,tu=37810,nu=37811,iu=37812,ru=37813,su=37814,ou=37815,au=37816,lu=37817,cu=37818,uu=37819,fu=37820,hu=37821,du=36492,bi=3e3,Ke=3001,N_=3200,O_=3201,kh=0,z_=1,Mn="srgb",mi="srgb-linear",Yo=7680,U_=519,nl=35044,pu="300 es",il=1035;class Ai{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const dt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ys=Math.PI/180,mu=180/Math.PI;function Yn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(dt[n&255]+dt[n>>8&255]+dt[n>>16&255]+dt[n>>24&255]+"-"+dt[e&255]+dt[e>>8&255]+"-"+dt[e>>16&15|64]+dt[e>>24&255]+"-"+dt[t&63|128]+dt[t>>8&255]+"-"+dt[t>>16&255]+dt[t>>24&255]+dt[i&255]+dt[i>>8&255]+dt[i>>16&255]+dt[i>>24&255]).toLowerCase()}function St(n,e,t){return Math.max(e,Math.min(t,n))}function B_(n,e){return(n%e+e)%e}function Zo(n,e,t){return(1-t)*n+t*e}function gu(n){return(n&n-1)===0&&n!==0}function rl(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}class Se{constructor(e=0,t=0){Se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this)}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this)}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t,i){return i!==void 0&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class zt{constructor(){zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],m=i[5],_=i[8],p=r[0],d=r[3],g=r[6],M=r[1],A=r[4],E=r[7],w=r[2],D=r[5],O=r[8];return s[0]=o*p+a*M+l*w,s[3]=o*d+a*A+l*D,s[6]=o*g+a*E+l*O,s[1]=c*p+u*M+f*w,s[4]=c*d+u*A+f*D,s[7]=c*g+u*E+f*O,s[2]=h*p+m*M+_*w,s[5]=h*d+m*A+_*D,s[8]=h*g+m*E+_*O,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,h=a*l-u*s,m=c*s-o*l,_=t*f+i*h+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const p=1/_;return e[0]=f*p,e[1]=(r*c-u*i)*p,e[2]=(a*i-r*o)*p,e[3]=h*p,e[4]=(u*t-r*l)*p,e[5]=(r*s-a*t)*p,e[6]=m*p,e[7]=(i*l-c*t)*p,e[8]=(o*t-i*s)*p,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=t,i[4]*=t,i[7]*=t,this}rotate(e){const t=Math.cos(e),i=Math.sin(e),r=this.elements,s=r[0],o=r[3],a=r[6],l=r[1],c=r[4],u=r[7];return r[0]=t*s+i*l,r[3]=t*o+i*c,r[6]=t*a+i*u,r[1]=-i*s+t*l,r[4]=-i*o+t*c,r[7]=-i*a+t*u,this}translate(e,t){const i=this.elements;return i[0]+=e*i[2],i[3]+=e*i[5],i[6]+=e*i[8],i[1]+=t*i[2],i[4]+=t*i[5],i[7]+=t*i[8],this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}function Hh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>65535)return!0;return!1}function ao(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function vi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Zs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Ko={[Mn]:{[mi]:vi},[mi]:{[Mn]:Zs}},Ht={legacyMode:!0,get workingColorSpace(){return mi},set workingColorSpace(n){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(n,e,t){if(this.legacyMode||e===t||!e||!t)return n;if(Ko[e]&&Ko[e][t]!==void 0){const i=Ko[e][t];return n.r=i(n.r),n.g=i(n.g),n.b=i(n.b),n}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)}},Gh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},nt={r:0,g:0,b:0},Gt={h:0,s:0,l:0},ps={h:0,s:0,l:0};function Jo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}function ms(n,e){return e.r=n.r,e.g=n.g,e.b=n.b,e}class Ve{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,t===void 0&&i===void 0?this.set(e):this.setRGB(e,t,i)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ht.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=mi){return this.r=e,this.g=t,this.b=i,Ht.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=mi){if(e=B_(e,1),t=St(t,0,1),i=St(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Jo(o,s,e+1/3),this.g=Jo(o,s,e),this.b=Jo(o,s,e-1/3)}return Ht.toWorkingColorSpace(this,r),this}setStyle(e,t=Mn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(s[1],10))/255,this.g=Math.min(255,parseInt(s[2],10))/255,this.b=Math.min(255,parseInt(s[3],10))/255,Ht.toWorkingColorSpace(this,t),i(s[4]),this;if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(s[1],10))/100,this.g=Math.min(100,parseInt(s[2],10))/100,this.b=Math.min(100,parseInt(s[3],10))/100,Ht.toWorkingColorSpace(this,t),i(s[4]),this;break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)){const l=parseFloat(s[1])/360,c=parseInt(s[2],10)/100,u=parseInt(s[3],10)/100;return i(s[4]),this.setHSL(l,c,u,t)}break}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.r=parseInt(s.charAt(0)+s.charAt(0),16)/255,this.g=parseInt(s.charAt(1)+s.charAt(1),16)/255,this.b=parseInt(s.charAt(2)+s.charAt(2),16)/255,Ht.toWorkingColorSpace(this,t),this;if(o===6)return this.r=parseInt(s.charAt(0)+s.charAt(1),16)/255,this.g=parseInt(s.charAt(2)+s.charAt(3),16)/255,this.b=parseInt(s.charAt(4)+s.charAt(5),16)/255,Ht.toWorkingColorSpace(this,t),this}return e&&e.length>0?this.setColorName(e,t):this}setColorName(e,t=Mn){const i=Gh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=vi(e.r),this.g=vi(e.g),this.b=vi(e.b),this}copyLinearToSRGB(e){return this.r=Zs(e.r),this.g=Zs(e.g),this.b=Zs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mn){return Ht.fromWorkingColorSpace(ms(this,nt),e),St(nt.r*255,0,255)<<16^St(nt.g*255,0,255)<<8^St(nt.b*255,0,255)<<0}getHexString(e=Mn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=mi){Ht.fromWorkingColorSpace(ms(this,nt),t);const i=nt.r,r=nt.g,s=nt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=mi){return Ht.fromWorkingColorSpace(ms(this,nt),t),e.r=nt.r,e.g=nt.g,e.b=nt.b,e}getStyle(e=Mn){return Ht.fromWorkingColorSpace(ms(this,nt),e),e!==Mn?`color(${e} ${nt.r} ${nt.g} ${nt.b})`:`rgb(${nt.r*255|0},${nt.g*255|0},${nt.b*255|0})`}offsetHSL(e,t,i){return this.getHSL(Gt),Gt.h+=e,Gt.s+=t,Gt.l+=i,this.setHSL(Gt.h,Gt.s,Gt.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Gt),e.getHSL(ps);const i=Zo(Gt.h,ps.h,t),r=Zo(Gt.s,ps.s,t),s=Zo(Gt.l,ps.l,t);return this.setHSL(i,r,s),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),e.normalized===!0&&(this.r/=255,this.g/=255,this.b/=255),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}Ve.NAMES=Gh;let Oi;class Vh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Oi===void 0&&(Oi=ao("canvas")),Oi.width=e.width,Oi.height=e.height;const i=Oi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Oi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){const t=ao("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=vi(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(vi(t[i]/255)*255):t[i]=vi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}class Wh{constructor(e=null){this.isSource=!0,this.uuid=Yn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Qo(r[o].image)):s.push(Qo(r[o]))}else s=Qo(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Qo(n){return typeof HTMLImageElement!="undefined"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&n instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&n instanceof ImageBitmap?Vh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let k_=0;class Bt extends Ai{constructor(e=Bt.DEFAULT_IMAGE,t=Bt.DEFAULT_MAPPING,i=Xt,r=Xt,s=Ft,o=Ao,a=hn,l=yi,c=1,u=bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:k_++}),this.uuid=Yn(),this.name="",this.source=new Wh(e),this.mipmaps=[],this.mapping=t,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Uh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case el:e.x=e.x-Math.floor(e.x);break;case Xt:e.x=e.x<0?0:1;break;case tl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case el:e.y=e.y-Math.floor(e.y);break;case Xt:e.y=e.y<0?0:1;break;case tl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}Bt.DEFAULT_IMAGE=null;Bt.DEFAULT_MAPPING=Uh;class it{constructor(e=0,t=0,i=0,r=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],m=l[5],_=l[9],p=l[2],d=l[6],g=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-p)<.01&&Math.abs(_-d)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+p)<.1&&Math.abs(_+d)<.1&&Math.abs(c+m+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(c+1)/2,E=(m+1)/2,w=(g+1)/2,D=(u+h)/4,O=(f+p)/4,y=(_+d)/4;return A>E&&A>w?A<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(A),r=D/i,s=O/i):E>w?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=D/r,s=y/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=O/s,r=y/s),this.set(i,r,s,t),this}let M=Math.sqrt((d-_)*(d-_)+(f-p)*(f-p)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(d-_)/M,this.y=(f-p)/M,this.z=(h-u)/M,this.w=Math.acos((c+m+g-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t,i){return i!==void 0&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Mi extends Ai{constructor(e,t,i={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const r={width:e,height:t,depth:1};this.texture=new Bt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.internalFormat=i.internalFormat!==void 0?i.internalFormat:null,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Ft,this.depthBuffer=i.depthBuffer!==void 0?i.depthBuffer:!0,this.stencilBuffer=i.stencilBuffer!==void 0?i.stencilBuffer:!1,this.depthTexture=i.depthTexture!==void 0?i.depthTexture:null,this.samples=i.samples!==void 0?i.samples:0}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Wh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qh extends Bt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=Xt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class H_ extends Bt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=wt,this.minFilter=wt,this.wrapR=Xt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerp(e,t,i,r){return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."),i.slerpQuaternions(e,t,r)}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const h=s[o+0],m=s[o+1],_=s[o+2],p=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=m,e[t+2]=_,e[t+3]=p;return}if(f!==p||l!==h||c!==m||u!==_){let d=1-a;const g=l*h+c*m+u*_+f*p,M=g>=0?1:-1,A=1-g*g;if(A>Number.EPSILON){const w=Math.sqrt(A),D=Math.atan2(w,g*M);d=Math.sin(d*D)/w,a=Math.sin(a*D)/w}const E=a*M;if(l=l*d+h*E,c=c*d+m*E,u=u*d+_*E,f=f*d+p*E,d===1-a){const w=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=w,c*=w,u*=w,f*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],h=s[o+1],m=s[o+2],_=s[o+3];return e[t]=a*_+u*f+l*m-c*h,e[t+1]=l*_+u*h+c*f-a*m,e[t+2]=c*_+u*m+a*h-l*f,e[t+3]=u*_-a*f-l*h-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){if(!(e&&e.isEuler))throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),h=l(i/2),m=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*m*_,this._y=c*m*f-h*u*_,this._z=c*u*_+h*m*f,this._w=c*u*f-h*m*_;break;case"YXZ":this._x=h*u*f+c*m*_,this._y=c*m*f-h*u*_,this._z=c*u*_-h*m*f,this._w=c*u*f+h*m*_;break;case"ZXY":this._x=h*u*f-c*m*_,this._y=c*m*f+h*u*_,this._z=c*u*_+h*m*f,this._w=c*u*f-h*m*_;break;case"ZYX":this._x=h*u*f-c*m*_,this._y=c*m*f+h*u*_,this._z=c*u*_-h*m*f,this._w=c*u*f+h*m*_;break;case"YZX":this._x=h*u*f+c*m*_,this._y=c*m*f+h*u*_,this._z=c*u*_-h*m*f,this._w=c*u*f-h*m*_;break;case"XZY":this._x=h*u*f-c*m*_,this._y=c*m*f-h*u*_,this._z=c*u*_+h*m*f,this._w=c*u*f+h*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+a+f;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-l)*m,this._y=(s-c)*m,this._z=(o-r)*m}else if(i>a&&i>f){const m=2*Math.sqrt(1+i-a-f);this._w=(u-l)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+c)/m}else if(a>f){const m=2*Math.sqrt(1+a-i-f);this._w=(s-c)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+f-i-a);this._w=(o-r)/m,this._x=(s+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(St(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e,t){return t!==void 0?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(e,t)):this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,i=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e,t){return t!==void 0?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(e,t)):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this)}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return e&&e.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(_u.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_u.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=l*t+o*r-a*i,u=l*i+a*t-s*r,f=l*r+s*i-o*t,h=-s*t-o*i-a*r;return this.x=c*l+h*-s+u*-a-f*-o,this.y=u*l+h*-o+f*-s-c*-a,this.z=f*l+h*-a+c*-o-u*-s,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e,t){return t!==void 0?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(e,t)):this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ea.copy(this).projectOnVector(e),this.sub(ea)}reflect(e){return this.sub(ea.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(St(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t,i){return i!==void 0&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ea=new P,_u=new wi;class ss{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,i=1/0,r=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.length;l<c;l+=3){const u=e[l],f=e[l+1],h=e[l+2];u<t&&(t=u),f<i&&(i=f),h<r&&(r=h),u>s&&(s=u),f>o&&(o=f),h>a&&(a=h)}return this.min.set(t,i,r),this.max.set(s,o,a),this}setFromBufferAttribute(e){let t=1/0,i=1/0,r=1/0,s=-1/0,o=-1/0,a=-1/0;for(let l=0,c=e.count;l<c;l++){const u=e.getX(l),f=e.getY(l),h=e.getZ(l);u<t&&(t=u),f<i&&(i=f),h<r&&(r=h),u>s&&(s=u),f>o&&(o=f),h>a&&(a=h)}return this.min.set(t,i,r),this.max.set(s,o,a),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ii.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0)if(t&&i.attributes!=null&&i.attributes.position!==void 0){const s=i.attributes.position;for(let o=0,a=s.count;o<a;o++)ii.fromBufferAttribute(s,o).applyMatrix4(e.matrixWorld),this.expandByPoint(ii)}else i.boundingBox===null&&i.computeBoundingBox(),ta.copy(i.boundingBox),ta.applyMatrix4(e.matrixWorld),this.union(ta);const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ii),ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Pr),gs.subVectors(this.max,Pr),zi.subVectors(e.a,Pr),Ui.subVectors(e.b,Pr),Bi.subVectors(e.c,Pr),In.subVectors(Ui,zi),Fn.subVectors(Bi,Ui),ri.subVectors(zi,Bi);let t=[0,-In.z,In.y,0,-Fn.z,Fn.y,0,-ri.z,ri.y,In.z,0,-In.x,Fn.z,0,-Fn.x,ri.z,0,-ri.x,-In.y,In.x,0,-Fn.y,Fn.x,0,-ri.y,ri.x,0];return!na(t,zi,Ui,Bi,gs)||(t=[1,0,0,0,1,0,0,0,1],!na(t,zi,Ui,Bi,gs))?!1:(_s.crossVectors(In,Fn),t=[_s.x,_s.y,_s.z],na(t,zi,Ui,Bi,gs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return ii.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return this.getCenter(e.center),e.radius=this.getSize(ii).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const gn=[new P,new P,new P,new P,new P,new P,new P,new P],ii=new P,ta=new ss,zi=new P,Ui=new P,Bi=new P,In=new P,Fn=new P,ri=new P,Pr=new P,gs=new P,_s=new P,si=new P;function na(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){si.fromArray(n,s);const a=r.x*Math.abs(si.x)+r.y*Math.abs(si.y)+r.z*Math.abs(si.z),l=e.dot(si),c=t.dot(si),u=i.dot(si);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const G_=new ss,xu=new P,xs=new P,ia=new P;class Co{constructor(e=new P,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):G_.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){ia.subVectors(e,this.center);const t=ia.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.add(ia.multiplyScalar(r/i)),this.radius+=r}return this}union(e){return this.center.equals(e.center)===!0?xs.set(0,0,1).multiplyScalar(e.radius):xs.subVectors(e.center,this.center).normalize().multiplyScalar(e.radius),this.expandByPoint(xu.copy(e.center).add(xs)),this.expandByPoint(xu.copy(e.center).sub(xs)),this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _n=new P,ra=new P,vs=new P,Nn=new P,sa=new P,ys=new P,oa=new P;class Ol{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(i).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_n.copy(this.direction).multiplyScalar(t).add(this.origin),_n.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ra.copy(e).add(t).multiplyScalar(.5),vs.copy(t).sub(e).normalize(),Nn.copy(this.origin).sub(ra);const s=e.distanceTo(t)*.5,o=-this.direction.dot(vs),a=Nn.dot(this.direction),l=-Nn.dot(vs),c=Nn.lengthSq(),u=Math.abs(1-o*o);let f,h,m,_;if(u>0)if(f=o*l-a,h=o*a-l,_=s*u,f>=0)if(h>=-_)if(h<=_){const p=1/u;f*=p,h*=p,m=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),m=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),m=-f*f+h*(h+2*l)+c;else h<=-_?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),m=-f*f+h*(h+2*l)+c):h<=_?(f=0,h=Math.min(Math.max(-s,-l),s),m=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),m=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),m=-f*f+h*(h+2*l)+c;return i&&i.copy(this.direction).multiplyScalar(f).add(this.origin),r&&r.copy(vs).multiplyScalar(h).add(ra),m}intersectSphere(e,t){_n.subVectors(e.center,this.origin);const i=_n.dot(this.direction),r=_n.dot(_n)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return a<0&&l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||i!==i)&&(i=s),(o<r||r!==r)&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,_n)!==null}intersectTriangle(e,t,i,r,s){sa.subVectors(t,e),ys.subVectors(i,e),oa.crossVectors(sa,ys);let o=this.direction.dot(oa),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Nn.subVectors(this.origin,e);const l=a*this.direction.dot(ys.crossVectors(Nn,ys));if(l<0)return null;const c=a*this.direction.dot(sa.cross(Nn));if(c<0||l+c>o)return null;const u=-a*Nn.dot(oa);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qe{constructor(){Qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}set(e,t,i,r,s,o,a,l,c,u,f,h,m,_,p,d){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=r,g[1]=s,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=u,g[10]=f,g[14]=h,g[3]=m,g[7]=_,g[11]=p,g[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qe().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/ki.setFromMatrixColumn(e,0).length(),s=1/ki.setFromMatrixColumn(e,1).length(),o=1/ki.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){e&&e.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,m=o*f,_=a*u,p=a*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=m+_*c,t[5]=h-p*c,t[9]=-a*l,t[2]=p-h*c,t[6]=_+m*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,m=l*f,_=c*u,p=c*f;t[0]=h+p*a,t[4]=_*a-m,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=m*a-_,t[6]=p+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,m=l*f,_=c*u,p=c*f;t[0]=h-p*a,t[4]=-o*f,t[8]=_+m*a,t[1]=m+_*a,t[5]=o*u,t[9]=p-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,m=o*f,_=a*u,p=a*f;t[0]=l*u,t[4]=_*c-m,t[8]=h*c+p,t[1]=l*f,t[5]=p*c+h,t[9]=m*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,m=o*c,_=a*l,p=a*c;t[0]=l*u,t[4]=p-h*f,t[8]=_*f+m,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=m*f+_,t[10]=h-p*f}else if(e.order==="XZY"){const h=o*l,m=o*c,_=a*l,p=a*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+p,t[5]=o*u,t[9]=m*f-_,t[2]=_*f-m,t[6]=a*u,t[10]=p*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(V_,e,W_)}lookAt(e,t,i){const r=this.elements;return At.subVectors(e,t),At.lengthSq()===0&&(At.z=1),At.normalize(),On.crossVectors(i,At),On.lengthSq()===0&&(Math.abs(i.z)===1?At.x+=1e-4:At.z+=1e-4,At.normalize(),On.crossVectors(i,At)),On.normalize(),bs.crossVectors(At,On),r[0]=On.x,r[4]=bs.x,r[8]=At.x,r[1]=On.y,r[5]=bs.y,r[9]=At.y,r[2]=On.z,r[6]=bs.z,r[10]=At.z,this}multiply(e,t){return t!==void 0?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(e,t)):this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],m=i[13],_=i[2],p=i[6],d=i[10],g=i[14],M=i[3],A=i[7],E=i[11],w=i[15],D=r[0],O=r[4],y=r[8],C=r[12],N=r[1],F=r[5],H=r[9],te=r[13],z=r[2],ee=r[6],G=r[10],j=r[14],q=r[3],W=r[7],J=r[11],ce=r[15];return s[0]=o*D+a*N+l*z+c*q,s[4]=o*O+a*F+l*ee+c*W,s[8]=o*y+a*H+l*G+c*J,s[12]=o*C+a*te+l*j+c*ce,s[1]=u*D+f*N+h*z+m*q,s[5]=u*O+f*F+h*ee+m*W,s[9]=u*y+f*H+h*G+m*J,s[13]=u*C+f*te+h*j+m*ce,s[2]=_*D+p*N+d*z+g*q,s[6]=_*O+p*F+d*ee+g*W,s[10]=_*y+p*H+d*G+g*J,s[14]=_*C+p*te+d*j+g*ce,s[3]=M*D+A*N+E*z+w*q,s[7]=M*O+A*F+E*ee+w*W,s[11]=M*y+A*H+E*G+w*J,s[15]=M*C+A*te+E*j+w*ce,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],m=e[14],_=e[3],p=e[7],d=e[11],g=e[15];return _*(+s*l*f-r*c*f-s*a*h+i*c*h+r*a*m-i*l*m)+p*(+t*l*m-t*c*h+s*o*h-r*o*m+r*c*u-s*l*u)+d*(+t*c*f-t*a*m-s*o*f+i*o*m+s*a*u-i*c*u)+g*(-r*a*u-t*l*f+t*a*h+r*o*f-i*o*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],m=e[11],_=e[12],p=e[13],d=e[14],g=e[15],M=f*d*c-p*h*c+p*l*m-a*d*m-f*l*g+a*h*g,A=_*h*c-u*d*c-_*l*m+o*d*m+u*l*g-o*h*g,E=u*p*c-_*f*c+_*a*m-o*p*m-u*a*g+o*f*g,w=_*f*l-u*p*l-_*a*h+o*p*h+u*a*d-o*f*d,D=t*M+i*A+r*E+s*w;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/D;return e[0]=M*O,e[1]=(p*h*s-f*d*s-p*r*m+i*d*m+f*r*g-i*h*g)*O,e[2]=(a*d*s-p*l*s+p*r*c-i*d*c-a*r*g+i*l*g)*O,e[3]=(f*l*s-a*h*s-f*r*c+i*h*c+a*r*m-i*l*m)*O,e[4]=A*O,e[5]=(u*d*s-_*h*s+_*r*m-t*d*m-u*r*g+t*h*g)*O,e[6]=(_*l*s-o*d*s-_*r*c+t*d*c+o*r*g-t*l*g)*O,e[7]=(o*h*s-u*l*s+u*r*c-t*h*c-o*r*m+t*l*m)*O,e[8]=E*O,e[9]=(_*f*s-u*p*s-_*i*m+t*p*m+u*i*g-t*f*g)*O,e[10]=(o*p*s-_*a*s+_*i*c-t*p*c-o*i*g+t*a*g)*O,e[11]=(u*a*s-o*f*s-u*i*c+t*f*c+o*i*m-t*a*m)*O,e[12]=w*O,e[13]=(u*p*r-_*f*r+_*i*h-t*p*h-u*i*d+t*f*d)*O,e[14]=(_*a*r-o*p*r-_*i*l+t*p*l+o*i*d-t*a*d)*O,e[15]=(o*f*r-u*a*r+u*i*l-t*f*l-o*i*h+t*a*h)*O,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,f=a+a,h=s*c,m=s*u,_=s*f,p=o*u,d=o*f,g=a*f,M=l*c,A=l*u,E=l*f,w=i.x,D=i.y,O=i.z;return r[0]=(1-(p+g))*w,r[1]=(m+E)*w,r[2]=(_-A)*w,r[3]=0,r[4]=(m-E)*D,r[5]=(1-(h+g))*D,r[6]=(d+M)*D,r[7]=0,r[8]=(_+A)*O,r[9]=(d-M)*O,r[10]=(1-(h+p))*O,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=ki.set(r[0],r[1],r[2]).length();const o=ki.set(r[4],r[5],r[6]).length(),a=ki.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Vt.copy(this);const c=1/s,u=1/o,f=1/a;return Vt.elements[0]*=c,Vt.elements[1]*=c,Vt.elements[2]*=c,Vt.elements[4]*=u,Vt.elements[5]*=u,Vt.elements[6]*=u,Vt.elements[8]*=f,Vt.elements[9]*=f,Vt.elements[10]*=f,t.setFromRotationMatrix(Vt),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o){o===void 0&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");const a=this.elements,l=2*s/(t-e),c=2*s/(i-r),u=(t+e)/(t-e),f=(i+r)/(i-r),h=-(o+s)/(o-s),m=-2*o*s/(o-s);return a[0]=l,a[4]=0,a[8]=u,a[12]=0,a[1]=0,a[5]=c,a[9]=f,a[13]=0,a[2]=0,a[6]=0,a[10]=h,a[14]=m,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(e,t,i,r,s,o){const a=this.elements,l=1/(t-e),c=1/(i-r),u=1/(o-s),f=(t+e)*l,h=(i+r)*c,m=(o+s)*u;return a[0]=2*l,a[4]=0,a[8]=0,a[12]=-f,a[1]=0,a[5]=2*c,a[9]=0,a[13]=-h,a[2]=0,a[6]=0,a[10]=-2*u,a[14]=-m,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ki=new P,Vt=new Qe,V_=new P(0,0,0),W_=new P(1,1,1),On=new P,bs=new P,At=new P,vu=new Qe,yu=new wi;class os{constructor(e=0,t=0,i=0,r=os.DefaultOrder){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(St(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-St(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(St(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-St(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(St(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-St(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return vu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yu.setFromEuler(this),this.setFromQuaternion(yu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}}os.DefaultOrder="XYZ";os.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class zl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let q_=0;const bu=new P,Hi=new wi,xn=new Qe,Ms=new P,Ir=new P,j_=new P,X_=new wi,Mu=new P(1,0,0),wu=new P(0,1,0),Su=new P(0,0,1),$_={type:"added"},Eu={type:"removed"};class ft extends Ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:q_++}),this.uuid=Yn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DefaultUp.clone();const e=new P,t=new os,i=new wi,r=new P(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Qe},normalMatrix:{value:new zt}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=ft.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new zl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hi.setFromAxisAngle(e,t),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(e,t){return Hi.setFromAxisAngle(e,t),this.quaternion.premultiply(Hi),this}rotateX(e){return this.rotateOnAxis(Mu,e)}rotateY(e){return this.rotateOnAxis(wu,e)}rotateZ(e){return this.rotateOnAxis(Su,e)}translateOnAxis(e,t){return bu.copy(e).applyQuaternion(this.quaternion),this.position.add(bu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Mu,e)}translateY(e){return this.translateOnAxis(wu,e)}translateZ(e){return this.translateOnAxis(Su,e)}localToWorld(e){return e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ms.copy(e):Ms.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(Ir,Ms,this.up):xn.lookAt(Ms,Ir,this.up),this.quaternion.setFromRotationMatrix(xn),r&&(xn.extractRotation(r.matrixWorld),Hi.setFromRotationMatrix(xn),this.quaternion.premultiply(Hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent($_)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Eu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(Eu)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,e,j_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ir,X_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),m=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}ft.DefaultUp=new P(0,1,0);ft.DefaultMatrixAutoUpdate=!0;const Wt=new P,vn=new P,aa=new P,yn=new P,Gi=new P,Vi=new P,Tu=new P,la=new P,ca=new P,ua=new P;class $t{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Wt.subVectors(e,t),r.cross(Wt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Wt.subVectors(r,t),vn.subVectors(i,t),aa.subVectors(e,t);const o=Wt.dot(Wt),a=Wt.dot(vn),l=Wt.dot(aa),c=vn.dot(vn),u=vn.dot(aa),f=o*c-a*a;if(f===0)return s.set(-2,-1,-1);const h=1/f,m=(c*l-a*u)*h,_=(o*u-a*l)*h;return s.set(1-m-_,_,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,yn),yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getUV(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,yn),l.set(0,0),l.addScaledVector(s,yn.x),l.addScaledVector(o,yn.y),l.addScaledVector(a,yn.z),l}static isFrontFacing(e,t,i,r){return Wt.subVectors(i,t),vn.subVectors(e,t),Wt.cross(vn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wt.subVectors(this.c,this.b),vn.subVectors(this.a,this.b),Wt.cross(vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $t.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return $t.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return $t.getUV(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return $t.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $t.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Gi.subVectors(r,i),Vi.subVectors(s,i),la.subVectors(e,i);const l=Gi.dot(la),c=Vi.dot(la);if(l<=0&&c<=0)return t.copy(i);ca.subVectors(e,r);const u=Gi.dot(ca),f=Vi.dot(ca);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Gi,o);ua.subVectors(e,s);const m=Gi.dot(ua),_=Vi.dot(ua);if(_>=0&&m<=_)return t.copy(s);const p=m*c-l*_;if(p<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(i).addScaledVector(Vi,a);const d=u*_-m*f;if(d<=0&&f-u>=0&&m-_>=0)return Tu.subVectors(s,r),a=(f-u)/(f-u+(m-_)),t.copy(r).addScaledVector(Tu,a);const g=1/(d+p+h);return o=p*g,a=h*g,t.copy(i).addScaledVector(Gi,o).addScaledVector(Vi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let Y_=0;class Ci extends Ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Y_++}),this.uuid=Yn(),this.name="",this.type="Material",this.blending=lr,this.side=is,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=Nh,this.blendDst=Oh,this.blendEquation=ir,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Ka,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=U_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yo,this.stencilZFail=Yo,this.stencilZPass=Yo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}if(t==="shading"){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=i===j0;continue}const r=this[t];if(r===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==lr&&(i.blending=this.blending),this.side!==is&&(i.side=this.side),this.vertexColors&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=this.transparent),i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.stencilWrite=this.stencilWrite,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(i.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(i.wireframe=this.wireframe),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=this.flatShading),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ul extends Ci{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=zh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const tt=new P,ws=new Se;class en{constructor(e,t,i){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i===!0,this.usage=nl,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}copyColorsArray(e){const t=this.array;let i=0;for(let r=0,s=e.length;r<s;r++){let o=e[r];o===void 0&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",r),o=new Ve),t[i++]=o.r,t[i++]=o.g,t[i++]=o.b}return this}copyVector2sArray(e){const t=this.array;let i=0;for(let r=0,s=e.length;r<s;r++){let o=e[r];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",r),o=new Se),t[i++]=o.x,t[i++]=o.y}return this}copyVector3sArray(e){const t=this.array;let i=0;for(let r=0,s=e.length;r<s;r++){let o=e[r];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",r),o=new P),t[i++]=o.x,t[i++]=o.y,t[i++]=o.z}return this}copyVector4sArray(e){const t=this.array;let i=0;for(let r=0,s=e.length;r<s;r++){let o=e[r];o===void 0&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",r),o=new it),t[i++]=o.x,t[i++]=o.y,t[i++]=o.z,t[i++]=o.w}return this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ws.fromBufferAttribute(this,t),ws.applyMatrix3(e),this.setXY(t,ws.x,ws.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)tt.fromBufferAttribute(this,t),tt.applyMatrix3(e),this.setXYZ(t,tt.x,tt.y,tt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)tt.fromBufferAttribute(this,t),tt.applyMatrix4(e),this.setXYZ(t,tt.x,tt.y,tt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)tt.fromBufferAttribute(this,t),tt.applyNormalMatrix(e),this.setXYZ(t,tt.x,tt.y,tt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)tt.fromBufferAttribute(this,t),tt.transformDirection(e),this.setXYZ(t,tt.x,tt.y,tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){return this.array[e*this.itemSize]}setX(e,t){return this.array[e*this.itemSize]=t,this}getY(e){return this.array[e*this.itemSize+1]}setY(e,t){return this.array[e*this.itemSize+1]=t,this}getZ(e){return this.array[e*this.itemSize+2]}setZ(e,t){return this.array[e*this.itemSize+2]=t,this}getW(e){return this.array[e*this.itemSize+3]}setW(e,t){return this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==nl&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class jh extends en{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Xh extends en{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class rt extends en{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Z_=0;const It=new Qe,fa=new ft,Wi=new P,Ct=new ss,Fr=new ss,ot=new P;class Rt extends Ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Z_++}),this.uuid=Yn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hh(e)?Xh:jh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new zt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return It.makeRotationFromQuaternion(e),this.applyMatrix4(It),this}rotateX(e){return It.makeRotationX(e),this.applyMatrix4(It),this}rotateY(e){return It.makeRotationY(e),this.applyMatrix4(It),this}rotateZ(e){return It.makeRotationZ(e),this.applyMatrix4(It),this}translate(e,t,i){return It.makeTranslation(e,t,i),this.applyMatrix4(It),this}scale(e,t,i){return It.makeScale(e,t,i),this.applyMatrix4(It),this}lookAt(e){return fa.lookAt(e),fa.updateMatrix(),this.applyMatrix4(fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wi).negate(),this.translate(Wi.x,Wi.y,Wi.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new rt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ss);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Ct.setFromBufferAttribute(s),this.morphTargetsRelative?(ot.addVectors(this.boundingBox.min,Ct.min),this.boundingBox.expandByPoint(ot),ot.addVectors(this.boundingBox.max,Ct.max),this.boundingBox.expandByPoint(ot)):(this.boundingBox.expandByPoint(Ct.min),this.boundingBox.expandByPoint(Ct.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Co);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new P,1/0);return}if(e){const i=this.boundingSphere.center;if(Ct.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Fr.setFromBufferAttribute(a),this.morphTargetsRelative?(ot.addVectors(Ct.min,Fr.min),Ct.expandByPoint(ot),ot.addVectors(Ct.max,Fr.max),Ct.expandByPoint(ot)):(Ct.expandByPoint(Fr.min),Ct.expandByPoint(Fr.max))}Ct.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)ot.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(ot));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)ot.fromBufferAttribute(a,c),l&&(Wi.fromBufferAttribute(e,c),ot.add(Wi)),r=Math.max(r,i.distanceToSquared(ot))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new en(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let N=0;N<a;N++)c[N]=new P,u[N]=new P;const f=new P,h=new P,m=new P,_=new Se,p=new Se,d=new Se,g=new P,M=new P;function A(N,F,H){f.fromArray(r,N*3),h.fromArray(r,F*3),m.fromArray(r,H*3),_.fromArray(o,N*2),p.fromArray(o,F*2),d.fromArray(o,H*2),h.sub(f),m.sub(f),p.sub(_),d.sub(_);const te=1/(p.x*d.y-d.x*p.y);!isFinite(te)||(g.copy(h).multiplyScalar(d.y).addScaledVector(m,-p.y).multiplyScalar(te),M.copy(m).multiplyScalar(p.x).addScaledVector(h,-d.x).multiplyScalar(te),c[N].add(g),c[F].add(g),c[H].add(g),u[N].add(M),u[F].add(M),u[H].add(M))}let E=this.groups;E.length===0&&(E=[{start:0,count:i.length}]);for(let N=0,F=E.length;N<F;++N){const H=E[N],te=H.start,z=H.count;for(let ee=te,G=te+z;ee<G;ee+=3)A(i[ee+0],i[ee+1],i[ee+2])}const w=new P,D=new P,O=new P,y=new P;function C(N){O.fromArray(s,N*3),y.copy(O);const F=c[N];w.copy(F),w.sub(O.multiplyScalar(O.dot(F))).normalize(),D.crossVectors(y,F);const te=D.dot(u[N])<0?-1:1;l[N*4]=w.x,l[N*4+1]=w.y,l[N*4+2]=w.z,l[N*4+3]=te}for(let N=0,F=E.length;N<F;++N){const H=E[N],te=H.start,z=H.count;for(let ee=te,G=te+z;ee<G;ee+=3)C(i[ee+0]),C(i[ee+1]),C(i[ee+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new en(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new P,s=new P,o=new P,a=new P,l=new P,c=new P,u=new P,f=new P;if(e)for(let h=0,m=e.count;h<m;h+=3){const _=e.getX(h+0),p=e.getX(h+1),d=e.getX(h+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,p),o.fromBufferAttribute(t,d),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,p),c.fromBufferAttribute(i,d),a.add(u),l.add(u),c.add(u),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(p,l.x,l.y,l.z),i.setXYZ(d,c.x,c.y,c.z)}else for(let h=0,m=t.count;h<m;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}merge(e,t){if(!(e&&e.isBufferGeometry)){console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",e);return}t===void 0&&(t=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));const i=this.attributes;for(const r in i){if(e.attributes[r]===void 0)continue;const o=i[r].array,a=e.attributes[r],l=a.array,c=a.itemSize*t,u=Math.min(l.length,o.length-c);for(let f=0,h=c;f<u;f++,h++)o[h]=l[f]}return this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)ot.fromBufferAttribute(e,t),ot.normalize(),e.setXYZ(t,ot.x,ot.y,ot.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let m=0,_=0;for(let p=0,d=l.length;p<d;p++){a.isInterleavedBufferAttribute?m=l[p]*a.data.stride+a.offset:m=l[p]*u;for(let g=0;g<u;g++)h[_++]=c[m++]}return new en(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Rt,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],m=e(h,i);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const m=c[f];u.push(m.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,m=f.length;h<m;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,e.parameters!==void 0&&(this.parameters=Object.assign({},e.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const Au=new Qe,qi=new Ol,ha=new Co,zn=new P,Un=new P,Bn=new P,da=new P,pa=new P,ma=new P,Ss=new P,Es=new P,Ts=new P,As=new Se,Cs=new Se,Ls=new Se,ga=new P,Ds=new P;class dn extends ft{constructor(e=new Rt,t=new Ul){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;if(r===void 0||(i.boundingSphere===null&&i.computeBoundingSphere(),ha.copy(i.boundingSphere),ha.applyMatrix4(s),e.ray.intersectsSphere(ha)===!1)||(Au.copy(s).invert(),qi.copy(e.ray).applyMatrix4(Au),i.boundingBox!==null&&qi.intersectsBox(i.boundingBox)===!1))return;let o;const a=i.index,l=i.attributes.position,c=i.morphAttributes.position,u=i.morphTargetsRelative,f=i.attributes.uv,h=i.attributes.uv2,m=i.groups,_=i.drawRange;if(a!==null)if(Array.isArray(r))for(let p=0,d=m.length;p<d;p++){const g=m[p],M=r[g.materialIndex],A=Math.max(g.start,_.start),E=Math.min(a.count,Math.min(g.start+g.count,_.start+_.count));for(let w=A,D=E;w<D;w+=3){const O=a.getX(w),y=a.getX(w+1),C=a.getX(w+2);o=Rs(this,M,e,qi,l,c,u,f,h,O,y,C),o&&(o.faceIndex=Math.floor(w/3),o.face.materialIndex=g.materialIndex,t.push(o))}}else{const p=Math.max(0,_.start),d=Math.min(a.count,_.start+_.count);for(let g=p,M=d;g<M;g+=3){const A=a.getX(g),E=a.getX(g+1),w=a.getX(g+2);o=Rs(this,r,e,qi,l,c,u,f,h,A,E,w),o&&(o.faceIndex=Math.floor(g/3),t.push(o))}}else if(l!==void 0)if(Array.isArray(r))for(let p=0,d=m.length;p<d;p++){const g=m[p],M=r[g.materialIndex],A=Math.max(g.start,_.start),E=Math.min(l.count,Math.min(g.start+g.count,_.start+_.count));for(let w=A,D=E;w<D;w+=3){const O=w,y=w+1,C=w+2;o=Rs(this,M,e,qi,l,c,u,f,h,O,y,C),o&&(o.faceIndex=Math.floor(w/3),o.face.materialIndex=g.materialIndex,t.push(o))}}else{const p=Math.max(0,_.start),d=Math.min(l.count,_.start+_.count);for(let g=p,M=d;g<M;g+=3){const A=g,E=g+1,w=g+2;o=Rs(this,r,e,qi,l,c,u,f,h,A,E,w),o&&(o.faceIndex=Math.floor(g/3),t.push(o))}}}}function K_(n,e,t,i,r,s,o,a){let l;if(e.side===Qt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side!==pr,a),l===null)return null;Ds.copy(a),Ds.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ds);return c<t.near||c>t.far?null:{distance:c,point:Ds.clone(),object:n}}function Rs(n,e,t,i,r,s,o,a,l,c,u,f){zn.fromBufferAttribute(r,c),Un.fromBufferAttribute(r,u),Bn.fromBufferAttribute(r,f);const h=n.morphTargetInfluences;if(s&&h){Ss.set(0,0,0),Es.set(0,0,0),Ts.set(0,0,0);for(let _=0,p=s.length;_<p;_++){const d=h[_],g=s[_];d!==0&&(da.fromBufferAttribute(g,c),pa.fromBufferAttribute(g,u),ma.fromBufferAttribute(g,f),o?(Ss.addScaledVector(da,d),Es.addScaledVector(pa,d),Ts.addScaledVector(ma,d)):(Ss.addScaledVector(da.sub(zn),d),Es.addScaledVector(pa.sub(Un),d),Ts.addScaledVector(ma.sub(Bn),d)))}zn.add(Ss),Un.add(Es),Bn.add(Ts)}n.isSkinnedMesh&&(n.boneTransform(c,zn),n.boneTransform(u,Un),n.boneTransform(f,Bn));const m=K_(n,e,t,i,zn,Un,Bn,ga);if(m){a&&(As.fromBufferAttribute(a,c),Cs.fromBufferAttribute(a,u),Ls.fromBufferAttribute(a,f),m.uv=$t.getUV(ga,zn,Un,Bn,As,Cs,Ls,new Se)),l&&(As.fromBufferAttribute(l,c),Cs.fromBufferAttribute(l,u),Ls.fromBufferAttribute(l,f),m.uv2=$t.getUV(ga,zn,Un,Bn,As,Cs,Ls,new Se));const _={a:c,b:u,c:f,normal:new P,materialIndex:0};$t.getNormal(zn,Un,Bn,_.normal),m.face=_}return m}class Sr extends Rt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,m=0;_("z","y","x",-1,-1,i,t,e,o,s,0),_("z","y","x",1,-1,i,t,-e,o,s,1),_("x","z","y",1,1,e,i,t,r,o,2),_("x","z","y",1,-1,e,i,-t,r,o,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new rt(c,3)),this.setAttribute("normal",new rt(u,3)),this.setAttribute("uv",new rt(f,2));function _(p,d,g,M,A,E,w,D,O,y,C){const N=E/O,F=w/y,H=E/2,te=w/2,z=D/2,ee=O+1,G=y+1;let j=0,q=0;const W=new P;for(let J=0;J<G;J++){const ce=J*F-te;for(let oe=0;oe<ee;oe++){const ae=oe*N-H;W[p]=ae*M,W[d]=ce*A,W[g]=z,c.push(W.x,W.y,W.z),W[p]=0,W[d]=0,W[g]=D>0?1:-1,u.push(W.x,W.y,W.z),f.push(oe/O),f.push(1-J/y),j+=1}}for(let J=0;J<y;J++)for(let ce=0;ce<O;ce++){const oe=h+ce+ee*J,ae=h+ce+ee*(J+1),ye=h+(ce+1)+ee*(J+1),we=h+(ce+1)+ee*J;l.push(oe,ae,we),l.push(ae,ye,we),q+=6}a.addGroup(m,q,C),m+=q,h+=j}}static fromJSON(e){return new Sr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function xr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function pt(n){const e={};for(let t=0;t<n.length;t++){const i=xr(n[t]);for(const r in i)e[r]=i[r]}return e}const J_={clone:xr,merge:pt};var Q_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ex=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Si extends Ci{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader=Q_,this.fragmentShader=ex,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&(e.attributes!==void 0&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(e))}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xr(e.uniforms),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class $h extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Nt extends $h{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=mu*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ys*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return mu*2*Math.atan(Math.tan(Ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ys*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ji=90,Xi=1;class tx extends ft{constructor(e,t,i){if(super(),this.type="CubeCamera",i.isWebGLCubeRenderTarget!==!0){console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");return}this.renderTarget=i;const r=new Nt(ji,Xi,e,t);r.layers=this.layers,r.up.set(0,-1,0),r.lookAt(new P(1,0,0)),this.add(r);const s=new Nt(ji,Xi,e,t);s.layers=this.layers,s.up.set(0,-1,0),s.lookAt(new P(-1,0,0)),this.add(s);const o=new Nt(ji,Xi,e,t);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(new P(0,1,0)),this.add(o);const a=new Nt(ji,Xi,e,t);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(new P(0,-1,0)),this.add(a);const l=new Nt(ji,Xi,e,t);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new P(0,0,1)),this.add(l);const c=new Nt(ji,Xi,e,t);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new P(0,0,-1)),this.add(c)}update(e,t){this.parent===null&&this.updateMatrixWorld();const i=this.renderTarget,[r,s,o,a,l,c]=this.children,u=e.getRenderTarget(),f=e.toneMapping,h=e.xr.enabled;e.toneMapping=En,e.xr.enabled=!1;const m=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0),e.render(t,r),e.setRenderTarget(i,1),e.render(t,s),e.setRenderTarget(i,2),e.render(t,o),e.setRenderTarget(i,3),e.render(t,a),e.setRenderTarget(i,4),e.render(t,l),i.texture.generateMipmaps=m,e.setRenderTarget(i,5),e.render(t,c),e.setRenderTarget(u),e.toneMapping=f,e.xr.enabled=h,i.texture.needsPMREMUpdate=!0}}class Yh extends Bt{constructor(e,t,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:mr,super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class nx extends Mi{constructor(e,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Yh(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ft}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Sr(5,5,5),s=new Si({name:"CubemapFromEquirect",uniforms:xr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qt,blending:$n});s.uniforms.tEquirect.value=t;const o=new dn(r,s),a=t.minFilter;return t.minFilter===Ao&&(t.minFilter=Ft),new tx(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const _a=new P,ix=new P,rx=new zt;class ai{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=_a.subVectors(i,t).cross(ix.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){const i=e.delta(_a),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(i).multiplyScalar(s).add(e.start)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||rx.getNormalMatrix(e),r=this.coplanarPoint(_a).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $i=new Co,Ps=new P;class Bl{constructor(e=new ai,t=new ai,i=new ai,r=new ai,s=new ai,o=new ai){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e){const t=this.planes,i=e.elements,r=i[0],s=i[1],o=i[2],a=i[3],l=i[4],c=i[5],u=i[6],f=i[7],h=i[8],m=i[9],_=i[10],p=i[11],d=i[12],g=i[13],M=i[14],A=i[15];return t[0].setComponents(a-r,f-l,p-h,A-d).normalize(),t[1].setComponents(a+r,f+l,p+h,A+d).normalize(),t[2].setComponents(a+s,f+c,p+m,A+g).normalize(),t[3].setComponents(a-s,f-c,p-m,A-g).normalize(),t[4].setComponents(a-o,f-u,p-_,A-M).normalize(),t[5].setComponents(a+o,f+u,p+_,A+M).normalize(),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere($i)}intersectsSprite(e){return $i.center.set(0,0,0),$i.radius=.7071067811865476,$i.applyMatrix4(e.matrixWorld),this.intersectsSphere($i)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ps.x=r.normal.x>0?e.max.x:e.min.x,Ps.y=r.normal.y>0?e.max.y:e.min.y,Ps.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ps)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Zh(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function sx(n,e){const t=e.isWebGL2,i=new WeakMap;function r(c,u){const f=c.array,h=c.usage,m=n.createBuffer();n.bindBuffer(u,m),n.bufferData(u,f,h),c.onUploadCallback();let _;if(f instanceof Float32Array)_=5126;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=5123;else if(f instanceof Int16Array)_=5122;else if(f instanceof Uint32Array)_=5125;else if(f instanceof Int32Array)_=5124;else if(f instanceof Int8Array)_=5120;else if(f instanceof Uint8Array)_=5121;else if(f instanceof Uint8ClampedArray)_=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:m,type:_,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version}}function s(c,u,f){const h=u.array,m=u.updateRange;n.bindBuffer(f,c),m.count===-1?n.bufferSubData(f,0,h):(t?n.bufferSubData(f,m.offset*h.BYTES_PER_ELEMENT,h,m.offset,m.count):n.bufferSubData(f,m.offset*h.BYTES_PER_ELEMENT,h.subarray(m.offset,m.offset+m.count)),m.count=-1)}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=i.get(c);(!h||h.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);f===void 0?i.set(c,r(c,u)):f.version<c.version&&(s(f.buffer,c,u),f.version=c.version)}return{get:o,remove:a,update:l}}class kl extends Rt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=e/a,h=t/l,m=[],_=[],p=[],d=[];for(let g=0;g<u;g++){const M=g*h-o;for(let A=0;A<c;A++){const E=A*f-s;_.push(E,-M,0),p.push(0,0,1),d.push(A/a),d.push(1-g/l)}}for(let g=0;g<l;g++)for(let M=0;M<a;M++){const A=M+c*g,E=M+c*(g+1),w=M+1+c*(g+1),D=M+1+c*g;m.push(A,E,D),m.push(E,w,D)}this.setIndex(m),this.setAttribute("position",new rt(_,3)),this.setAttribute("normal",new rt(p,3)),this.setAttribute("uv",new rt(d,2))}static fromJSON(e){return new kl(e.width,e.height,e.widthSegments,e.heightSegments)}}var ox=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,ax=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lx=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,cx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ux=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,fx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hx="vec3 transformed = vec3( position );",dx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,px=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = mix(F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence);
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,mx=`#ifdef USE_IRIDESCENCE
const mat3 XYZ_TO_REC709 = mat3(
    3.2404542, -0.9692660,  0.0556434,
   -1.5371385,  1.8760108, -0.2040259,
   -0.4985314,  0.0415560,  1.0572252
);
vec3 Fresnel0ToIor( vec3 fresnel0 ) {
   vec3 sqrtF0 = sqrt( fresnel0 );
   return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
}
vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
   return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
}
float IorToFresnel0( float transmittedIor, float incidentIor ) {
   return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
}
vec3 evalSensitivity( float OPD, vec3 shift ) {
   float phase = 2.0 * PI * OPD * 1.0e-9;
   vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
   vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
   vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
   vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( -pow2( phase ) * var );
   xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[0] ) * exp( -4.5282e+09 * pow2( phase ) );
   xyz /= 1.0685e-7;
   vec3 srgb = XYZ_TO_REC709 * xyz;
   return srgb;
}
vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
   vec3 I;
   float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
   float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
   float cosTheta2Sq = 1.0 - sinTheta2Sq;
   if ( cosTheta2Sq < 0.0 ) {
       return vec3( 1.0 );
   }
   float cosTheta2 = sqrt( cosTheta2Sq );
   float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
   float R12 = F_Schlick( R0, 1.0, cosTheta1 );
   float R21 = R12;
   float T121 = 1.0 - R12;
   float phi12 = 0.0;
   if ( iridescenceIOR < outsideIOR ) phi12 = PI;
   float phi21 = PI - phi12;
   vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );   vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
   vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
   vec3 phi23 = vec3( 0.0 );
   if ( baseIOR[0] < iridescenceIOR ) phi23[0] = PI;
   if ( baseIOR[1] < iridescenceIOR ) phi23[1] = PI;
   if ( baseIOR[2] < iridescenceIOR ) phi23[2] = PI;
   float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
   vec3 phi = vec3( phi21 ) + phi23;
   vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
   vec3 r123 = sqrt( R123 );
   vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
   vec3 C0 = R12 + Rs;
   I = C0;
   vec3 Cm = Rs - T121;
   for ( int m = 1; m <= 2; ++m ) {
       Cm *= r123;
       vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
       I += Cm * Sm;
   }
   return max( I, vec3( 0.0 ) );
}
#endif`,gx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,_x=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,xx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Mx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Sx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Ex=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
	return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,Tx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define r0 1.0
	#define v0 0.339
	#define m0 - 2.0
	#define r1 0.8
	#define v1 0.276
	#define m1 - 1.0
	#define r4 0.4
	#define v4 0.046
	#define m4 2.0
	#define r5 0.305
	#define v5 0.016
	#define m5 3.0
	#define r6 0.21
	#define v6 0.0038
	#define m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= r1 ) {
			mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;
		} else if ( roughness >= r4 ) {
			mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;
		} else if ( roughness >= r5 ) {
			mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;
		} else if ( roughness >= r6 ) {
			mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ax=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Cx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,Dx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Rx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Px="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ix=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Nx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ox=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,zx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ux=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Bx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );
	#endif
}`,Wx=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,qx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jx=`vec3 diffuse = vec3( 1.0 );
GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );
GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;
vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );
#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif
IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;
vIndirectFront += getAmbientLightIrradiance( ambientLightColor );
vIndirectFront += getLightProbeIrradiance( lightProbe, geometry.normal );
#ifdef DOUBLE_SIDED
	vIndirectBack += getAmbientLightIrradiance( ambientLightColor );
	vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry.normal );
#endif
#if NUM_POINT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		getPointLightInfo( pointLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		getSpotLightInfo( spotLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_DIR_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		getDirectionalLightInfo( directionalLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( - dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_HEMI_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		#ifdef DOUBLE_SIDED
			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry.normal );
		#endif
	}
	#pragma unroll_loop_end
#endif`,Xx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,$x=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,Yx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,Kx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,Qx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( ior - 1.0 ) / ( ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,ev=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,tv=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
float dotNVi = saturate( dot( normal, geometry.viewDir ) );
if ( material.iridescenceThickness == 0.0 ) {
	material.iridescence = 0.0;
} else {
	material.iridescence = saturate( material.iridescence );
}
if ( material.iridescence > 0.0 ) {
	material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
	material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,nv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,iv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,rv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ov=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,av=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,lv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,gv=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,_v=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,xv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,vv=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,yv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
		vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,Sv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Ev=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,Tv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,Av=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,Dv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Iv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Nv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ov=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,zv=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Uv=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,Bv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,kv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,Gv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Wv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,jv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,$v=`#ifdef USE_TRANSMISSION
	float transmissionAlpha = 1.0;
	float transmissionFactor = transmission;
	float thicknessFactor = thickness;
	#ifdef USE_TRANSMISSIONMAP
		transmissionFactor *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		thicknessFactor *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, roughnessFactor, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, ior, thicknessFactor,
		attenuationColor, attenuationDistance );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, transmissionFactor );
	transmissionAlpha = mix( transmissionAlpha, transmission.a, transmissionFactor );
#endif`,Yv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( attenuationDistance == 0.0 ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,Zv=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,Kv=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Jv=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,Qv=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,ey=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,ty=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,ny=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const iy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ry=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	gl_FragColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		gl_FragColor = vec4( mix( pow( gl_FragColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), gl_FragColor.rgb * 0.0773993808, vec3( lessThanEqual( gl_FragColor.rgb, vec3( 0.04045 ) ) ) ), gl_FragColor.w );
	#endif
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oy=`#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,ay=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ly=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,cy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,uy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,dy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,py=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,my=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,gy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_y=`#define LAMBERT
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xy=`uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>
	#ifdef DOUBLE_SIDED
		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
	#else
		reflectedLight.indirectDiffuse += vIndirectFront;
	#endif
	#include <lightmap_fragment>
	reflectedLight.indirectDiffuse *= BRDF_Lambert( diffuseColor.rgb );
	#ifdef DOUBLE_SIDED
		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
	#else
		reflectedLight.directDiffuse = vLightFront;
	#endif
	reflectedLight.directDiffuse *= BRDF_Lambert( diffuseColor.rgb ) * getShadowMask();
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,by=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,My=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ey=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ty=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ay=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ly=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Dy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ry=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Py=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Iy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Ne={alphamap_fragment:ox,alphamap_pars_fragment:ax,alphatest_fragment:lx,alphatest_pars_fragment:cx,aomap_fragment:ux,aomap_pars_fragment:fx,begin_vertex:hx,beginnormal_vertex:dx,bsdfs:px,iridescence_fragment:mx,bumpmap_pars_fragment:gx,clipping_planes_fragment:_x,clipping_planes_pars_fragment:xx,clipping_planes_pars_vertex:vx,clipping_planes_vertex:yx,color_fragment:bx,color_pars_fragment:Mx,color_pars_vertex:wx,color_vertex:Sx,common:Ex,cube_uv_reflection_fragment:Tx,defaultnormal_vertex:Ax,displacementmap_pars_vertex:Cx,displacementmap_vertex:Lx,emissivemap_fragment:Dx,emissivemap_pars_fragment:Rx,encodings_fragment:Px,encodings_pars_fragment:Ix,envmap_fragment:Fx,envmap_common_pars_fragment:Nx,envmap_pars_fragment:Ox,envmap_pars_vertex:zx,envmap_physical_pars_fragment:$x,envmap_vertex:Ux,fog_vertex:Bx,fog_pars_vertex:kx,fog_fragment:Hx,fog_pars_fragment:Gx,gradientmap_pars_fragment:Vx,lightmap_fragment:Wx,lightmap_pars_fragment:qx,lights_lambert_vertex:jx,lights_pars_begin:Xx,lights_toon_fragment:Yx,lights_toon_pars_fragment:Zx,lights_phong_fragment:Kx,lights_phong_pars_fragment:Jx,lights_physical_fragment:Qx,lights_physical_pars_fragment:ev,lights_fragment_begin:tv,lights_fragment_maps:nv,lights_fragment_end:iv,logdepthbuf_fragment:rv,logdepthbuf_pars_fragment:sv,logdepthbuf_pars_vertex:ov,logdepthbuf_vertex:av,map_fragment:lv,map_pars_fragment:cv,map_particle_fragment:uv,map_particle_pars_fragment:fv,metalnessmap_fragment:hv,metalnessmap_pars_fragment:dv,morphcolor_vertex:pv,morphnormal_vertex:mv,morphtarget_pars_vertex:gv,morphtarget_vertex:_v,normal_fragment_begin:xv,normal_fragment_maps:vv,normal_pars_fragment:yv,normal_pars_vertex:bv,normal_vertex:Mv,normalmap_pars_fragment:wv,clearcoat_normal_fragment_begin:Sv,clearcoat_normal_fragment_maps:Ev,clearcoat_pars_fragment:Tv,iridescence_pars_fragment:Av,output_fragment:Cv,packing:Lv,premultiplied_alpha_fragment:Dv,project_vertex:Rv,dithering_fragment:Pv,dithering_pars_fragment:Iv,roughnessmap_fragment:Fv,roughnessmap_pars_fragment:Nv,shadowmap_pars_fragment:Ov,shadowmap_pars_vertex:zv,shadowmap_vertex:Uv,shadowmask_pars_fragment:Bv,skinbase_vertex:kv,skinning_pars_vertex:Hv,skinning_vertex:Gv,skinnormal_vertex:Vv,specularmap_fragment:Wv,specularmap_pars_fragment:qv,tonemapping_fragment:jv,tonemapping_pars_fragment:Xv,transmission_fragment:$v,transmission_pars_fragment:Yv,uv_pars_fragment:Zv,uv_pars_vertex:Kv,uv_vertex:Jv,uv2_pars_fragment:Qv,uv2_pars_vertex:ey,uv2_vertex:ty,worldpos_vertex:ny,background_vert:iy,background_frag:ry,cube_vert:sy,cube_frag:oy,depth_vert:ay,depth_frag:ly,distanceRGBA_vert:cy,distanceRGBA_frag:uy,equirect_vert:fy,equirect_frag:hy,linedashed_vert:dy,linedashed_frag:py,meshbasic_vert:my,meshbasic_frag:gy,meshlambert_vert:_y,meshlambert_frag:xy,meshmatcap_vert:vy,meshmatcap_frag:yy,meshnormal_vert:by,meshnormal_frag:My,meshphong_vert:wy,meshphong_frag:Sy,meshphysical_vert:Ey,meshphysical_frag:Ty,meshtoon_vert:Ay,meshtoon_frag:Cy,points_vert:Ly,points_frag:Dy,shadow_vert:Ry,shadow_frag:Py,sprite_vert:Iy,sprite_frag:Fy},xe={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new zt},uv2Transform:{value:new zt},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new zt}}},fn={basic:{uniforms:pt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:pt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.fog,xe.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:pt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:pt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:pt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:pt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:pt([xe.points,xe.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:pt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:pt([xe.common,xe.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:pt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:pt([xe.sprite,xe.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},cube:{uniforms:pt([xe.envmap,{opacity:{value:1}}]),vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:pt([xe.common,xe.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:pt([xe.lights,xe.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};fn.physical={uniforms:pt([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new Se(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};function Ny(n,e,t,i,r,s){const o=new Ve(0);let a=r===!0?0:1,l,c,u=null,f=0,h=null;function m(p,d){let g=!1,M=d.isScene===!0?d.background:null;M&&M.isTexture&&(M=e.get(M));const A=n.xr,E=A.getSession&&A.getSession();E&&E.environmentBlendMode==="additive"&&(M=null),M===null?_(o,a):M&&M.isColor&&(_(M,1),g=!0),(n.autoClear||g)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),M&&(M.isCubeTexture||M.mapping===To)?(c===void 0&&(c=new dn(new Sr(1,1,1),new Si({name:"BackgroundCubeMaterial",uniforms:xr(fn.cube.uniforms),vertexShader:fn.cube.vertexShader,fragmentShader:fn.cube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,D,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,(u!==M||f!==M.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,f=M.version,h=n.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new dn(new kl(2,2),new Si({name:"BackgroundMaterial",uniforms:xr(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:is,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||f!==M.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=M,f=M.version,h=n.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function _(p,d){t.buffers.color.setClear(p.r,p.g,p.b,d,s)}return{getClearColor:function(){return o},setClearColor:function(p,d=1){o.set(p),a=d,_(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(p){a=p,_(o,a)},render:m}}function Oy(n,e,t,i){const r=n.getParameter(34921),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=d(null);let c=l,u=!1;function f(z,ee,G,j,q){let W=!1;if(o){const J=p(j,G,ee);c!==J&&(c=J,m(c.object)),W=g(z,j,G,q),W&&M(z,j,G,q)}else{const J=ee.wireframe===!0;(c.geometry!==j.id||c.program!==G.id||c.wireframe!==J)&&(c.geometry=j.id,c.program=G.id,c.wireframe=J,W=!0)}q!==null&&t.update(q,34963),(W||u)&&(u=!1,y(z,ee,G,j),q!==null&&n.bindBuffer(34963,t.get(q).buffer))}function h(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function m(z){return i.isWebGL2?n.bindVertexArray(z):s.bindVertexArrayOES(z)}function _(z){return i.isWebGL2?n.deleteVertexArray(z):s.deleteVertexArrayOES(z)}function p(z,ee,G){const j=G.wireframe===!0;let q=a[z.id];q===void 0&&(q={},a[z.id]=q);let W=q[ee.id];W===void 0&&(W={},q[ee.id]=W);let J=W[j];return J===void 0&&(J=d(h()),W[j]=J),J}function d(z){const ee=[],G=[],j=[];for(let q=0;q<r;q++)ee[q]=0,G[q]=0,j[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:ee,enabledAttributes:G,attributeDivisors:j,object:z,attributes:{},index:null}}function g(z,ee,G,j){const q=c.attributes,W=ee.attributes;let J=0;const ce=G.getAttributes();for(const oe in ce)if(ce[oe].location>=0){const ye=q[oe];let we=W[oe];if(we===void 0&&(oe==="instanceMatrix"&&z.instanceMatrix&&(we=z.instanceMatrix),oe==="instanceColor"&&z.instanceColor&&(we=z.instanceColor)),ye===void 0||ye.attribute!==we||we&&ye.data!==we.data)return!0;J++}return c.attributesNum!==J||c.index!==j}function M(z,ee,G,j){const q={},W=ee.attributes;let J=0;const ce=G.getAttributes();for(const oe in ce)if(ce[oe].location>=0){let ye=W[oe];ye===void 0&&(oe==="instanceMatrix"&&z.instanceMatrix&&(ye=z.instanceMatrix),oe==="instanceColor"&&z.instanceColor&&(ye=z.instanceColor));const we={};we.attribute=ye,ye&&ye.data&&(we.data=ye.data),q[oe]=we,J++}c.attributes=q,c.attributesNum=J,c.index=j}function A(){const z=c.newAttributes;for(let ee=0,G=z.length;ee<G;ee++)z[ee]=0}function E(z){w(z,0)}function w(z,ee){const G=c.newAttributes,j=c.enabledAttributes,q=c.attributeDivisors;G[z]=1,j[z]===0&&(n.enableVertexAttribArray(z),j[z]=1),q[z]!==ee&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](z,ee),q[z]=ee)}function D(){const z=c.newAttributes,ee=c.enabledAttributes;for(let G=0,j=ee.length;G<j;G++)ee[G]!==z[G]&&(n.disableVertexAttribArray(G),ee[G]=0)}function O(z,ee,G,j,q,W){i.isWebGL2===!0&&(G===5124||G===5125)?n.vertexAttribIPointer(z,ee,G,q,W):n.vertexAttribPointer(z,ee,G,j,q,W)}function y(z,ee,G,j){if(i.isWebGL2===!1&&(z.isInstancedMesh||j.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;A();const q=j.attributes,W=G.getAttributes(),J=ee.defaultAttributeValues;for(const ce in W){const oe=W[ce];if(oe.location>=0){let ae=q[ce];if(ae===void 0&&(ce==="instanceMatrix"&&z.instanceMatrix&&(ae=z.instanceMatrix),ce==="instanceColor"&&z.instanceColor&&(ae=z.instanceColor)),ae!==void 0){const ye=ae.normalized,we=ae.itemSize,Z=t.get(ae);if(Z===void 0)continue;const He=Z.buffer,Le=Z.type,Ee=Z.bytesPerElement;if(ae.isInterleavedBufferAttribute){const _e=ae.data,Oe=_e.stride,De=ae.offset;if(_e.isInstancedInterleavedBuffer){for(let T=0;T<oe.locationSize;T++)w(oe.location+T,_e.meshPerAttribute);z.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let T=0;T<oe.locationSize;T++)E(oe.location+T);n.bindBuffer(34962,He);for(let T=0;T<oe.locationSize;T++)O(oe.location+T,we/oe.locationSize,Le,ye,Oe*Ee,(De+we/oe.locationSize*T)*Ee)}else{if(ae.isInstancedBufferAttribute){for(let _e=0;_e<oe.locationSize;_e++)w(oe.location+_e,ae.meshPerAttribute);z.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let _e=0;_e<oe.locationSize;_e++)E(oe.location+_e);n.bindBuffer(34962,He);for(let _e=0;_e<oe.locationSize;_e++)O(oe.location+_e,we/oe.locationSize,Le,ye,we*Ee,we/oe.locationSize*_e*Ee)}}else if(J!==void 0){const ye=J[ce];if(ye!==void 0)switch(ye.length){case 2:n.vertexAttrib2fv(oe.location,ye);break;case 3:n.vertexAttrib3fv(oe.location,ye);break;case 4:n.vertexAttrib4fv(oe.location,ye);break;default:n.vertexAttrib1fv(oe.location,ye)}}}}D()}function C(){H();for(const z in a){const ee=a[z];for(const G in ee){const j=ee[G];for(const q in j)_(j[q].object),delete j[q];delete ee[G]}delete a[z]}}function N(z){if(a[z.id]===void 0)return;const ee=a[z.id];for(const G in ee){const j=ee[G];for(const q in j)_(j[q].object),delete j[q];delete ee[G]}delete a[z.id]}function F(z){for(const ee in a){const G=a[ee];if(G[z.id]===void 0)continue;const j=G[z.id];for(const q in j)_(j[q].object),delete j[q];delete G[z.id]}}function H(){te(),u=!0,c!==l&&(c=l,m(c.object))}function te(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:H,resetDefaultState:te,dispose:C,releaseStatesOfGeometry:N,releaseStatesOfProgram:F,initAttributes:A,enableAttribute:E,disableUnusedAttributes:D}}function zy(n,e,t,i){const r=i.isWebGL2;let s;function o(c){s=c}function a(c,u){n.drawArrays(s,c,u),t.update(u,s,1)}function l(c,u,f){if(f===0)return;let h,m;if(r)h=n,m="drawArraysInstanced";else if(h=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",h===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[m](s,c,u,f),t.update(u,s,f)}this.setMode=o,this.render=a,this.renderInstances=l}function Uy(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const O=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(O){if(O==="highp"){if(n.getShaderPrecisionFormat(35633,36338).precision>0&&n.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";O="mediump"}return O==="mediump"&&n.getShaderPrecisionFormat(35633,36337).precision>0&&n.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext!="undefined"&&n instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext!="undefined"&&n instanceof WebGL2ComputeRenderingContext;let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=n.getParameter(34930),h=n.getParameter(35660),m=n.getParameter(3379),_=n.getParameter(34076),p=n.getParameter(34921),d=n.getParameter(36347),g=n.getParameter(36348),M=n.getParameter(36349),A=h>0,E=o||e.has("OES_texture_float"),w=A&&E,D=o?n.getParameter(36183):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:h,maxTextureSize:m,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:d,maxVaryings:g,maxFragmentUniforms:M,vertexTextures:A,floatFragmentTextures:E,floatVertexTextures:w,maxSamples:D}}function By(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new ai,a=new zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h,m){const _=f.length!==0||h||i!==0||r;return r=h,t=u(f,m,0),i=f.length,_},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1,c()},this.setState=function(f,h,m){const _=f.clippingPlanes,p=f.clipIntersection,d=f.clipShadows,g=n.get(f);if(!r||_===null||_.length===0||s&&!d)s?u(null):c();else{const M=s?0:i,A=M*4;let E=g.clippingState||null;l.value=E,E=u(_,h,A,m);for(let w=0;w!==A;++w)E[w]=t[w];g.clippingState=E,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,m,_){const p=f!==null?f.length:0;let d=null;if(p!==0){if(d=l.value,_!==!0||d===null){const g=m+p*4,M=h.matrixWorldInverse;a.getNormalMatrix(M),(d===null||d.length<g)&&(d=new Float32Array(g));for(let A=0,E=m;A!==p;++A,E+=4)o.copy(f[A]).applyMatrix4(M,a),o.normal.toArray(d,E),d[E+3]=o.constant}l.value=d,l.needsUpdate=!0}return e.numPlanes=p,e.numIntersection=0,d}}function ky(n){let e=new WeakMap;function t(o,a){return a===Ja?o.mapping=mr:a===Qa&&(o.mapping=gr),o}function i(o){if(o&&o.isTexture&&o.isRenderTargetTexture===!1){const a=o.mapping;if(a===Ja||a===Qa)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new nx(l.height/2);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Kh extends $h{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const rr=4,Cu=[.125,.215,.35,.446,.526,.582],fi=20,xa=new Kh,Lu=new Ve;let va=null;const li=(1+Math.sqrt(5))/2,Yi=1/li,Du=[new P(1,1,1),new P(-1,1,1),new P(1,1,-1),new P(-1,1,-1),new P(0,li,Yi),new P(0,li,-Yi),new P(Yi,0,li),new P(-Yi,0,li),new P(li,Yi,0),new P(-li,Yi,0)];class Ru{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){va=this._renderer.getRenderTarget(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Iu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(va),e.scissorTest=!1,Is(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===mr||e.mapping===gr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),va=this._renderer.getRenderTarget();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ft,minFilter:Ft,generateMipmaps:!1,type:rs,format:hn,encoding:bi,depthBuffer:!1},r=Pu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pu(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hy(s)),this._blurMaterial=Gy(s,e,t)}return r}_compileMaterial(e){const t=new dn(this._lodPlanes[0],e);this._renderer.compile(t,xa)}_sceneToCubeUV(e,t,i,r){const a=new Nt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Lu),u.toneMapping=En,u.autoClear=!1;const m=new Ul({name:"PMREM.Background",side:Qt,depthWrite:!1,depthTest:!1}),_=new dn(new Sr,m);let p=!1;const d=e.background;d?d.isColor&&(m.color.copy(d),e.background=null,p=!0):(m.color.copy(Lu),p=!0);for(let g=0;g<6;g++){const M=g%3;M===0?(a.up.set(0,l[g],0),a.lookAt(c[g],0,0)):M===1?(a.up.set(0,0,l[g]),a.lookAt(0,c[g],0)):(a.up.set(0,l[g],0),a.lookAt(0,0,c[g]));const A=this._cubeSize;Is(r,M*A,g>2?A:0,A,A),u.setRenderTarget(r),p&&u.render(_,a),u.render(e,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=d}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===mr||e.mapping===gr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Iu());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new dn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Is(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,xa)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Du[(r-1)%Du.length];this._blur(e,r-1,r,s,o)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new dn(this._lodPlanes[r],c),h=c.uniforms,m=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*fi-1),p=s/_,d=isFinite(s)?1+Math.floor(u*p):fi;d>fi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${fi}`);const g=[];let M=0;for(let O=0;O<fi;++O){const y=O/p,C=Math.exp(-y*y/2);g.push(C),O===0?M+=C:O<d&&(M+=2*C)}for(let O=0;O<g.length;O++)g[O]=g[O]/M;h.envMap.value=e.texture,h.samples.value=d,h.weights.value=g,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:A}=this;h.dTheta.value=_,h.mipInt.value=A-i;const E=this._sizeLods[r],w=3*E*(r>A-rr?r-A+rr:0),D=4*(this._cubeSize-E);Is(t,w,D,3*E,2*E),l.setRenderTarget(t),l.render(f,xa)}}function Hy(n){const e=[],t=[],i=[];let r=n;const s=n-rr+1+Cu.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-rr?l=Cu[o-n+rr-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,_=6,p=3,d=2,g=1,M=new Float32Array(p*_*m),A=new Float32Array(d*_*m),E=new Float32Array(g*_*m);for(let D=0;D<m;D++){const O=D%3*2/3-1,y=D>2?0:-1,C=[O,y,0,O+2/3,y,0,O+2/3,y+1,0,O,y,0,O+2/3,y+1,0,O,y+1,0];M.set(C,p*_*D),A.set(h,d*_*D);const N=[D,D,D,D,D,D];E.set(N,g*_*D)}const w=new Rt;w.setAttribute("position",new en(M,p)),w.setAttribute("uv",new en(A,d)),w.setAttribute("faceIndex",new en(E,g)),e.push(w),r>rr&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Pu(n,e,t){const i=new Mi(n,e,t);return i.texture.mapping=To,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Is(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Gy(n,e,t){const i=new Float32Array(fi),r=new P(0,1,0);return new Si({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Hl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Iu(){return new Si({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Fu(){return new Si({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Hl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Vy(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ja||l===Qa,u=l===mr||l===gr;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return t===null&&(t=new Ru(n)),f=c?t.fromEquirectangular(a,f):t.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(c&&f&&f.height>0||u&&f&&r(f)){t===null&&(t=new Ru(n));const h=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Wy(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function qy(n,e,t,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",o),delete r[h.id];const m=s.get(h);m&&(e.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const _ in h)e.update(h[_],34962);const m=f.morphAttributes;for(const _ in m){const p=m[_];for(let d=0,g=p.length;d<g;d++)e.update(p[d],34962)}}function c(f){const h=[],m=f.index,_=f.attributes.position;let p=0;if(m!==null){const M=m.array;p=m.version;for(let A=0,E=M.length;A<E;A+=3){const w=M[A+0],D=M[A+1],O=M[A+2];h.push(w,D,D,O,O,w)}}else{const M=_.array;p=_.version;for(let A=0,E=M.length/3-1;A<E;A+=3){const w=A+0,D=A+1,O=A+2;h.push(w,D,D,O,O,w)}}const d=new(Hh(h)?Xh:jh)(h,1);d.version=p;const g=s.get(f);g&&e.remove(g),s.set(f,d)}function u(f){const h=s.get(f);if(h){const m=f.index;m!==null&&h.version<m.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function jy(n,e,t,i){const r=i.isWebGL2;let s;function o(h){s=h}let a,l;function c(h){a=h.type,l=h.bytesPerElement}function u(h,m){n.drawElements(s,m,a,h*l),t.update(m,s,1)}function f(h,m,_){if(_===0)return;let p,d;if(r)p=n,d="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[d](s,m,a,h*l,_),t.update(m,s,_)}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=f}function Xy(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case 4:t.triangles+=a*(s/3);break;case 1:t.lines+=a*(s/2);break;case 3:t.lines+=a*(s-1);break;case 2:t.lines+=a*s;break;case 0:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function $y(n,e){return n[0]-e[0]}function Yy(n,e){return Math.abs(e[1])-Math.abs(n[1])}function ya(n,e){let t=1;const i=e.isInterleavedBufferAttribute?e.data.array:e.array;i instanceof Int8Array?t=127:i instanceof Uint8Array?t=255:i instanceof Uint16Array?t=65535:i instanceof Int16Array?t=32767:i instanceof Int32Array?t=2147483647:console.error("THREE.WebGLMorphtargets: Unsupported morph attribute data type: ",i),n.divideScalar(t)}function Zy(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,o=new it,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,f,h){const m=c.morphTargetInfluences;if(e.isWebGL2===!0){const p=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,d=p!==void 0?p.length:0;let g=s.get(u);if(g===void 0||g.count!==d){let G=function(){z.dispose(),s.delete(u),u.removeEventListener("dispose",G)};var _=G;g!==void 0&&g.texture.dispose();const E=u.morphAttributes.position!==void 0,w=u.morphAttributes.normal!==void 0,D=u.morphAttributes.color!==void 0,O=u.morphAttributes.position||[],y=u.morphAttributes.normal||[],C=u.morphAttributes.color||[];let N=0;E===!0&&(N=1),w===!0&&(N=2),D===!0&&(N=3);let F=u.attributes.position.count*N,H=1;F>e.maxTextureSize&&(H=Math.ceil(F/e.maxTextureSize),F=e.maxTextureSize);const te=new Float32Array(F*H*4*d),z=new qh(te,F,H,d);z.type=pi,z.needsUpdate=!0;const ee=N*4;for(let j=0;j<d;j++){const q=O[j],W=y[j],J=C[j],ce=F*H*4*j;for(let oe=0;oe<q.count;oe++){const ae=oe*ee;E===!0&&(o.fromBufferAttribute(q,oe),q.normalized===!0&&ya(o,q),te[ce+ae+0]=o.x,te[ce+ae+1]=o.y,te[ce+ae+2]=o.z,te[ce+ae+3]=0),w===!0&&(o.fromBufferAttribute(W,oe),W.normalized===!0&&ya(o,W),te[ce+ae+4]=o.x,te[ce+ae+5]=o.y,te[ce+ae+6]=o.z,te[ce+ae+7]=0),D===!0&&(o.fromBufferAttribute(J,oe),J.normalized===!0&&ya(o,J),te[ce+ae+8]=o.x,te[ce+ae+9]=o.y,te[ce+ae+10]=o.z,te[ce+ae+11]=J.itemSize===4?o.w:1)}}g={count:d,texture:z,size:new Se(F,H)},s.set(u,g),u.addEventListener("dispose",G)}let M=0;for(let E=0;E<m.length;E++)M+=m[E];const A=u.morphTargetsRelative?1:1-M;h.getUniforms().setValue(n,"morphTargetBaseInfluence",A),h.getUniforms().setValue(n,"morphTargetInfluences",m),h.getUniforms().setValue(n,"morphTargetsTexture",g.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",g.size)}else{const p=m===void 0?0:m.length;let d=i[u.id];if(d===void 0||d.length!==p){d=[];for(let w=0;w<p;w++)d[w]=[w,0];i[u.id]=d}for(let w=0;w<p;w++){const D=d[w];D[0]=w,D[1]=m[w]}d.sort(Yy);for(let w=0;w<8;w++)w<p&&d[w][1]?(a[w][0]=d[w][0],a[w][1]=d[w][1]):(a[w][0]=Number.MAX_SAFE_INTEGER,a[w][1]=0);a.sort($y);const g=u.morphAttributes.position,M=u.morphAttributes.normal;let A=0;for(let w=0;w<8;w++){const D=a[w],O=D[0],y=D[1];O!==Number.MAX_SAFE_INTEGER&&y?(g&&u.getAttribute("morphTarget"+w)!==g[O]&&u.setAttribute("morphTarget"+w,g[O]),M&&u.getAttribute("morphNormal"+w)!==M[O]&&u.setAttribute("morphNormal"+w,M[O]),r[w]=y,A+=y):(g&&u.hasAttribute("morphTarget"+w)===!0&&u.deleteAttribute("morphTarget"+w),M&&u.hasAttribute("morphNormal"+w)===!0&&u.deleteAttribute("morphNormal"+w),r[w]=0)}const E=u.morphTargetsRelative?1:1-A;h.getUniforms().setValue(n,"morphTargetBaseInfluence",E),h.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function Ky(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);return r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),t.update(l.instanceMatrix,34962),l.instanceColor!==null&&t.update(l.instanceColor,34962)),f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Jh=new Bt,Qh=new qh,ed=new H_,td=new Yh,Nu=[],Ou=[],zu=new Float32Array(16),Uu=new Float32Array(9),Bu=new Float32Array(4);function Er(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Nu[r];if(s===void 0&&(s=new Float32Array(r),Nu[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function bt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Lo(n,e){let t=Ou[e];t===void 0&&(t=new Int32Array(e),Ou[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Jy(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Qy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yt(t,e))return;n.uniform2fv(this.addr,e),bt(t,e)}}function eb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(yt(t,e))return;n.uniform3fv(this.addr,e),bt(t,e)}}function tb(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yt(t,e))return;n.uniform4fv(this.addr,e),bt(t,e)}}function nb(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),bt(t,e)}else{if(yt(t,i))return;Bu.set(i),n.uniformMatrix2fv(this.addr,!1,Bu),bt(t,i)}}function ib(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),bt(t,e)}else{if(yt(t,i))return;Uu.set(i),n.uniformMatrix3fv(this.addr,!1,Uu),bt(t,i)}}function rb(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),bt(t,e)}else{if(yt(t,i))return;zu.set(i),n.uniformMatrix4fv(this.addr,!1,zu),bt(t,i)}}function sb(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function ob(n,e){const t=this.cache;yt(t,e)||(n.uniform2iv(this.addr,e),bt(t,e))}function ab(n,e){const t=this.cache;yt(t,e)||(n.uniform3iv(this.addr,e),bt(t,e))}function lb(n,e){const t=this.cache;yt(t,e)||(n.uniform4iv(this.addr,e),bt(t,e))}function cb(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function ub(n,e){const t=this.cache;yt(t,e)||(n.uniform2uiv(this.addr,e),bt(t,e))}function fb(n,e){const t=this.cache;yt(t,e)||(n.uniform3uiv(this.addr,e),bt(t,e))}function hb(n,e){const t=this.cache;yt(t,e)||(n.uniform4uiv(this.addr,e),bt(t,e))}function db(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2D(e||Jh,r)}function pb(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||ed,r)}function mb(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||td,r)}function gb(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Qh,r)}function _b(n){switch(n){case 5126:return Jy;case 35664:return Qy;case 35665:return eb;case 35666:return tb;case 35674:return nb;case 35675:return ib;case 35676:return rb;case 5124:case 35670:return sb;case 35667:case 35671:return ob;case 35668:case 35672:return ab;case 35669:case 35673:return lb;case 5125:return cb;case 36294:return ub;case 36295:return fb;case 36296:return hb;case 35678:case 36198:case 36298:case 36306:case 35682:return db;case 35679:case 36299:case 36307:return pb;case 35680:case 36300:case 36308:case 36293:return mb;case 36289:case 36303:case 36311:case 36292:return gb}}function xb(n,e){n.uniform1fv(this.addr,e)}function vb(n,e){const t=Er(e,this.size,2);n.uniform2fv(this.addr,t)}function yb(n,e){const t=Er(e,this.size,3);n.uniform3fv(this.addr,t)}function bb(n,e){const t=Er(e,this.size,4);n.uniform4fv(this.addr,t)}function Mb(n,e){const t=Er(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function wb(n,e){const t=Er(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Sb(n,e){const t=Er(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Eb(n,e){n.uniform1iv(this.addr,e)}function Tb(n,e){n.uniform2iv(this.addr,e)}function Ab(n,e){n.uniform3iv(this.addr,e)}function Cb(n,e){n.uniform4iv(this.addr,e)}function Lb(n,e){n.uniform1uiv(this.addr,e)}function Db(n,e){n.uniform2uiv(this.addr,e)}function Rb(n,e){n.uniform3uiv(this.addr,e)}function Pb(n,e){n.uniform4uiv(this.addr,e)}function Ib(n,e,t){const i=e.length,r=Lo(t,i);n.uniform1iv(this.addr,r);for(let s=0;s!==i;++s)t.setTexture2D(e[s]||Jh,r[s])}function Fb(n,e,t){const i=e.length,r=Lo(t,i);n.uniform1iv(this.addr,r);for(let s=0;s!==i;++s)t.setTexture3D(e[s]||ed,r[s])}function Nb(n,e,t){const i=e.length,r=Lo(t,i);n.uniform1iv(this.addr,r);for(let s=0;s!==i;++s)t.setTextureCube(e[s]||td,r[s])}function Ob(n,e,t){const i=e.length,r=Lo(t,i);n.uniform1iv(this.addr,r);for(let s=0;s!==i;++s)t.setTexture2DArray(e[s]||Qh,r[s])}function zb(n){switch(n){case 5126:return xb;case 35664:return vb;case 35665:return yb;case 35666:return bb;case 35674:return Mb;case 35675:return wb;case 35676:return Sb;case 5124:case 35670:return Eb;case 35667:case 35671:return Tb;case 35668:case 35672:return Ab;case 35669:case 35673:return Cb;case 5125:return Lb;case 36294:return Db;case 36295:return Rb;case 36296:return Pb;case 35678:case 36198:case 36298:case 36306:case 35682:return Ib;case 35679:case 36299:case 36307:return Fb;case 35680:case 36300:case 36308:case 36293:return Nb;case 36289:case 36303:case 36311:case 36292:return Ob}}class Ub{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.setValue=_b(t.type)}}class Bb{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.size=t.size,this.setValue=zb(t.type)}}class kb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const ba=/(\w+)(\])?(\[|\.)?/g;function ku(n,e){n.seq.push(e),n.map[e.id]=e}function Hb(n,e,t){const i=n.name,r=i.length;for(ba.lastIndex=0;;){const s=ba.exec(i),o=ba.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){ku(t,c===void 0?new Ub(a,n,e):new Bb(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new kb(a),ku(t,f)),t=f}}}class Ks{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,35718);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);Hb(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Hu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}let Gb=0;function Vb(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function Wb(n){switch(n){case bi:return["Linear","( value )"];case Ke:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",n),["Linear","( value )"]}}function Gu(n,e,t){const i=n.getShaderParameter(e,35713),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Vb(n.getShaderSource(e),o)}else return r}function qb(n,e){const t=Wb(e);return"vec4 "+n+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function jb(n,e){let t;switch(e){case p_:t="Linear";break;case m_:t="Reinhard";break;case g_:t="OptimizedCineon";break;case __:t="ACESFilmic";break;case x_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Xb(n){return[n.extensionDerivatives||!!n.envMapCubeUVHeight||n.bumpMap||n.tangentSpaceNormalMap||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Xr).join(`
`)}function $b(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Yb(n,e){const t={},i=n.getProgramParameter(e,35721);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===35674&&(a=2),s.type===35675&&(a=3),s.type===35676&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Xr(n){return n!==""}function Vu(n,e){return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Zb=/^[ \t]*#include +<([\w\d./]+)>/gm;function sl(n){return n.replace(Zb,Kb)}function Kb(n,e){const t=Ne[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return sl(t)}const Jb=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,Qb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qu(n){return n.replace(Qb,nd).replace(Jb,eM)}function eM(n,e,t,i){return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."),nd(n,e,t,i)}function nd(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ju(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function tM(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Fh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===q0?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===jr&&(e="SHADOWMAP_TYPE_VSM"),e}function nM(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case mr:case gr:e="ENVMAP_TYPE_CUBE";break;case To:e="ENVMAP_TYPE_CUBE_UV";break}return e}function iM(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case gr:e="ENVMAP_MODE_REFRACTION";break}return e}function rM(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case zh:e="ENVMAP_BLENDING_MULTIPLY";break;case h_:e="ENVMAP_BLENDING_MIX";break;case d_:e="ENVMAP_BLENDING_ADD";break}return e}function sM(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function oM(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=tM(t),c=nM(t),u=iM(t),f=rM(t),h=sM(t),m=t.isWebGL2?"":Xb(t),_=$b(s),p=r.createProgram();let d,g,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=[_].filter(Xr).join(`
`),d.length>0&&(d+=`
`),g=[m,_].filter(Xr).join(`
`),g.length>0&&(g+=`
`)):(d=[ju(t),"#define SHADER_NAME "+t.shaderName,_,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xr).join(`
`),g=[m,ju(t),"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularColorMap?"#define USE_SPECULARCOLORMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEENCOLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==En?"#define TONE_MAPPING":"",t.toneMapping!==En?Ne.tonemapping_pars_fragment:"",t.toneMapping!==En?jb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.encodings_pars_fragment,qb("linearToOutputTexel",t.outputEncoding),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Xr).join(`
`)),o=sl(o),o=Vu(o,t),o=Wu(o,t),a=sl(a),a=Vu(a,t),a=Wu(a,t),o=qu(o),a=qu(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,d=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,g=["#define varying in",t.glslVersion===pu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===pu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const A=M+d+o,E=M+g+a,w=Hu(r,35633,A),D=Hu(r,35632,E);if(r.attachShader(p,w),r.attachShader(p,D),t.index0AttributeName!==void 0?r.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(p,0,"position"),r.linkProgram(p),n.debug.checkShaderErrors){const C=r.getProgramInfoLog(p).trim(),N=r.getShaderInfoLog(w).trim(),F=r.getShaderInfoLog(D).trim();let H=!0,te=!0;if(r.getProgramParameter(p,35714)===!1){H=!1;const z=Gu(r,w,"vertex"),ee=Gu(r,D,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(p,35715)+`

Program Info Log: `+C+`
`+z+`
`+ee)}else C!==""?console.warn("THREE.WebGLProgram: Program Info Log:",C):(N===""||F==="")&&(te=!1);te&&(this.diagnostics={runnable:H,programLog:C,vertexShader:{log:N,prefix:d},fragmentShader:{log:F,prefix:g}})}r.deleteShader(w),r.deleteShader(D);let O;this.getUniforms=function(){return O===void 0&&(O=new Ks(r,p)),O};let y;return this.getAttributes=function(){return y===void 0&&(y=Yb(r,p)),y},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(p),this.program=void 0},this.name=t.shaderName,this.id=Gb++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=w,this.fragmentShader=D,this}let aM=0;class lM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;return t.has(e)===!1&&t.set(e,new Set),t.get(e)}_getShaderStage(e){const t=this.shaderCache;if(t.has(e)===!1){const i=new cM(e);t.set(e,i)}return t.get(e)}}class cM{constructor(e){this.id=aM++,this.code=e,this.usedTimes=0}}function uM(n,e,t,i,r,s,o){const a=new zl,l=new lM,c=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,h=r.vertexTextures;let m=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y,C,N,F,H){const te=F.fog,z=H.geometry,ee=y.isMeshStandardMaterial?F.environment:null,G=(y.isMeshStandardMaterial?t:e).get(y.envMap||ee),j=!!G&&G.mapping===To?G.image.height:null,q=_[y.type];y.precision!==null&&(m=r.getMaxPrecision(y.precision),m!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));const W=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,J=W!==void 0?W.length:0;let ce=0;z.morphAttributes.position!==void 0&&(ce=1),z.morphAttributes.normal!==void 0&&(ce=2),z.morphAttributes.color!==void 0&&(ce=3);let oe,ae,ye,we;if(q){const Oe=fn[q];oe=Oe.vertexShader,ae=Oe.fragmentShader}else oe=y.vertexShader,ae=y.fragmentShader,l.update(y),ye=l.getVertexShaderID(y),we=l.getFragmentShaderID(y);const Z=n.getRenderTarget(),He=y.alphaTest>0,Le=y.clearcoat>0,Ee=y.iridescence>0;return{isWebGL2:u,shaderID:q,shaderName:y.type,vertexShader:oe,fragmentShader:ae,defines:y.defines,customVertexShaderID:ye,customFragmentShaderID:we,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,instancing:H.isInstancedMesh===!0,instancingColor:H.isInstancedMesh===!0&&H.instanceColor!==null,supportsVertexTextures:h,outputEncoding:Z===null?n.outputEncoding:Z.isXRRenderTarget===!0?Z.texture.encoding:bi,map:!!y.map,matcap:!!y.matcap,envMap:!!G,envMapMode:G&&G.mapping,envMapCubeUVHeight:j,lightMap:!!y.lightMap,aoMap:!!y.aoMap,emissiveMap:!!y.emissiveMap,bumpMap:!!y.bumpMap,normalMap:!!y.normalMap,objectSpaceNormalMap:y.normalMapType===z_,tangentSpaceNormalMap:y.normalMapType===kh,decodeVideoTexture:!!y.map&&y.map.isVideoTexture===!0&&y.map.encoding===Ke,clearcoat:Le,clearcoatMap:Le&&!!y.clearcoatMap,clearcoatRoughnessMap:Le&&!!y.clearcoatRoughnessMap,clearcoatNormalMap:Le&&!!y.clearcoatNormalMap,iridescence:Ee,iridescenceMap:Ee&&!!y.iridescenceMap,iridescenceThicknessMap:Ee&&!!y.iridescenceThicknessMap,displacementMap:!!y.displacementMap,roughnessMap:!!y.roughnessMap,metalnessMap:!!y.metalnessMap,specularMap:!!y.specularMap,specularIntensityMap:!!y.specularIntensityMap,specularColorMap:!!y.specularColorMap,opaque:y.transparent===!1&&y.blending===lr,alphaMap:!!y.alphaMap,alphaTest:He,gradientMap:!!y.gradientMap,sheen:y.sheen>0,sheenColorMap:!!y.sheenColorMap,sheenRoughnessMap:!!y.sheenRoughnessMap,transmission:y.transmission>0,transmissionMap:!!y.transmissionMap,thicknessMap:!!y.thicknessMap,combine:y.combine,vertexTangents:!!y.normalMap&&!!z.attributes.tangent,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUvs:!!y.map||!!y.bumpMap||!!y.normalMap||!!y.specularMap||!!y.alphaMap||!!y.emissiveMap||!!y.roughnessMap||!!y.metalnessMap||!!y.clearcoatMap||!!y.clearcoatRoughnessMap||!!y.clearcoatNormalMap||!!y.iridescenceMap||!!y.iridescenceThicknessMap||!!y.displacementMap||!!y.transmissionMap||!!y.thicknessMap||!!y.specularIntensityMap||!!y.specularColorMap||!!y.sheenColorMap||!!y.sheenRoughnessMap,uvsVertexOnly:!(!!y.map||!!y.bumpMap||!!y.normalMap||!!y.specularMap||!!y.alphaMap||!!y.emissiveMap||!!y.roughnessMap||!!y.metalnessMap||!!y.clearcoatNormalMap||!!y.iridescenceMap||!!y.iridescenceThicknessMap||y.transmission>0||!!y.transmissionMap||!!y.thicknessMap||!!y.specularIntensityMap||!!y.specularColorMap||y.sheen>0||!!y.sheenColorMap||!!y.sheenRoughnessMap)&&!!y.displacementMap,fog:!!te,useFog:y.fog===!0,fogExp2:te&&te.isFogExp2,flatShading:!!y.flatShading,sizeAttenuation:y.sizeAttenuation,logarithmicDepthBuffer:f,skinning:H.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:ce,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:y.toneMapped?n.toneMapping:En,physicallyCorrectLights:n.physicallyCorrectLights,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===pr,flipSided:y.side===Qt,useDepthPacking:!!y.depthPacking,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:y.extensions&&y.extensions.derivatives,extensionFragDepth:y.extensions&&y.extensions.fragDepth,extensionDrawBuffers:y.extensions&&y.extensions.drawBuffers,extensionShaderTextureLOD:y.extensions&&y.extensions.shaderTextureLOD,rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),customProgramCacheKey:y.customProgramCacheKey()}}function d(y){const C=[];if(y.shaderID?C.push(y.shaderID):(C.push(y.customVertexShaderID),C.push(y.customFragmentShaderID)),y.defines!==void 0)for(const N in y.defines)C.push(N),C.push(y.defines[N]);return y.isRawShaderMaterial===!1&&(g(C,y),M(C,y),C.push(n.outputEncoding)),C.push(y.customProgramCacheKey),C.join()}function g(y,C){y.push(C.precision),y.push(C.outputEncoding),y.push(C.envMapMode),y.push(C.envMapCubeUVHeight),y.push(C.combine),y.push(C.vertexUvs),y.push(C.fogExp2),y.push(C.sizeAttenuation),y.push(C.morphTargetsCount),y.push(C.morphAttributeCount),y.push(C.numDirLights),y.push(C.numPointLights),y.push(C.numSpotLights),y.push(C.numHemiLights),y.push(C.numRectAreaLights),y.push(C.numDirLightShadows),y.push(C.numPointLightShadows),y.push(C.numSpotLightShadows),y.push(C.shadowMapType),y.push(C.toneMapping),y.push(C.numClippingPlanes),y.push(C.numClipIntersection),y.push(C.depthPacking)}function M(y,C){a.disableAll(),C.isWebGL2&&a.enable(0),C.supportsVertexTextures&&a.enable(1),C.instancing&&a.enable(2),C.instancingColor&&a.enable(3),C.map&&a.enable(4),C.matcap&&a.enable(5),C.envMap&&a.enable(6),C.lightMap&&a.enable(7),C.aoMap&&a.enable(8),C.emissiveMap&&a.enable(9),C.bumpMap&&a.enable(10),C.normalMap&&a.enable(11),C.objectSpaceNormalMap&&a.enable(12),C.tangentSpaceNormalMap&&a.enable(13),C.clearcoat&&a.enable(14),C.clearcoatMap&&a.enable(15),C.clearcoatRoughnessMap&&a.enable(16),C.clearcoatNormalMap&&a.enable(17),C.iridescence&&a.enable(18),C.iridescenceMap&&a.enable(19),C.iridescenceThicknessMap&&a.enable(20),C.displacementMap&&a.enable(21),C.specularMap&&a.enable(22),C.roughnessMap&&a.enable(23),C.metalnessMap&&a.enable(24),C.gradientMap&&a.enable(25),C.alphaMap&&a.enable(26),C.alphaTest&&a.enable(27),C.vertexColors&&a.enable(28),C.vertexAlphas&&a.enable(29),C.vertexUvs&&a.enable(30),C.vertexTangents&&a.enable(31),C.uvsVertexOnly&&a.enable(32),C.fog&&a.enable(33),y.push(a.mask),a.disableAll(),C.useFog&&a.enable(0),C.flatShading&&a.enable(1),C.logarithmicDepthBuffer&&a.enable(2),C.skinning&&a.enable(3),C.morphTargets&&a.enable(4),C.morphNormals&&a.enable(5),C.morphColors&&a.enable(6),C.premultipliedAlpha&&a.enable(7),C.shadowMapEnabled&&a.enable(8),C.physicallyCorrectLights&&a.enable(9),C.doubleSided&&a.enable(10),C.flipSided&&a.enable(11),C.useDepthPacking&&a.enable(12),C.dithering&&a.enable(13),C.specularIntensityMap&&a.enable(14),C.specularColorMap&&a.enable(15),C.transmission&&a.enable(16),C.transmissionMap&&a.enable(17),C.thicknessMap&&a.enable(18),C.sheen&&a.enable(19),C.sheenColorMap&&a.enable(20),C.sheenRoughnessMap&&a.enable(21),C.decodeVideoTexture&&a.enable(22),C.opaque&&a.enable(23),y.push(a.mask)}function A(y){const C=_[y.type];let N;if(C){const F=fn[C];N=J_.clone(F.uniforms)}else N=y.uniforms;return N}function E(y,C){let N;for(let F=0,H=c.length;F<H;F++){const te=c[F];if(te.cacheKey===C){N=te,++N.usedTimes;break}}return N===void 0&&(N=new oM(n,C,y,s),c.push(N)),N}function w(y){if(--y.usedTimes===0){const C=c.indexOf(y);c[C]=c[c.length-1],c.pop(),y.destroy()}}function D(y){l.remove(y)}function O(){l.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:A,acquireProgram:E,releaseProgram:w,releaseShaderCache:D,programs:c,dispose:O}}function fM(){let n=new WeakMap;function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function t(s){n.delete(s)}function i(s,o,a){n.get(s)[o]=a}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function hM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Xu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function $u(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f,h,m,_,p,d){let g=n[e];return g===void 0?(g={id:f.id,object:f,geometry:h,material:m,groupOrder:_,renderOrder:f.renderOrder,z:p,group:d},n[e]=g):(g.id=f.id,g.object=f,g.geometry=h,g.material=m,g.groupOrder=_,g.renderOrder=f.renderOrder,g.z=p,g.group=d),e++,g}function a(f,h,m,_,p,d){const g=o(f,h,m,_,p,d);m.transmission>0?i.push(g):m.transparent===!0?r.push(g):t.push(g)}function l(f,h,m,_,p,d){const g=o(f,h,m,_,p,d);m.transmission>0?i.unshift(g):m.transparent===!0?r.unshift(g):t.unshift(g)}function c(f,h){t.length>1&&t.sort(f||hM),i.length>1&&i.sort(h||Xu),r.length>1&&r.sort(h||Xu)}function u(){for(let f=e,h=n.length;f<h;f++){const m=n[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function dM(){let n=new WeakMap;function e(i,r){let s;return n.has(i)===!1?(s=new $u,n.set(i,[s])):r>=n.get(i).length?(s=new $u,n.get(i).push(s)):s=n.get(i)[r],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function pM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new Ve};break;case"SpotLight":t={position:new P,direction:new P,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new P,halfWidth:new P,halfHeight:new P};break}return n[e.id]=t,t}}}function mM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let gM=0;function _M(n,e){return(e.castShadow?1:0)-(n.castShadow?1:0)}function xM(n,e){const t=new pM,i=mM(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadow:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]};for(let u=0;u<9;u++)r.probe.push(new P);const s=new P,o=new Qe,a=new Qe;function l(u,f){let h=0,m=0,_=0;for(let C=0;C<9;C++)r.probe[C].set(0,0,0);let p=0,d=0,g=0,M=0,A=0,E=0,w=0,D=0;u.sort(_M);const O=f!==!0?Math.PI:1;for(let C=0,N=u.length;C<N;C++){const F=u[C],H=F.color,te=F.intensity,z=F.distance,ee=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)h+=H.r*te*O,m+=H.g*te*O,_+=H.b*te*O;else if(F.isLightProbe)for(let G=0;G<9;G++)r.probe[G].addScaledVector(F.sh.coefficients[G],te);else if(F.isDirectionalLight){const G=t.get(F);if(G.color.copy(F.color).multiplyScalar(F.intensity*O),F.castShadow){const j=F.shadow,q=i.get(F);q.shadowBias=j.bias,q.shadowNormalBias=j.normalBias,q.shadowRadius=j.radius,q.shadowMapSize=j.mapSize,r.directionalShadow[p]=q,r.directionalShadowMap[p]=ee,r.directionalShadowMatrix[p]=F.shadow.matrix,E++}r.directional[p]=G,p++}else if(F.isSpotLight){const G=t.get(F);if(G.position.setFromMatrixPosition(F.matrixWorld),G.color.copy(H).multiplyScalar(te*O),G.distance=z,G.coneCos=Math.cos(F.angle),G.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),G.decay=F.decay,F.castShadow){const j=F.shadow,q=i.get(F);q.shadowBias=j.bias,q.shadowNormalBias=j.normalBias,q.shadowRadius=j.radius,q.shadowMapSize=j.mapSize,r.spotShadow[g]=q,r.spotShadowMap[g]=ee,r.spotShadowMatrix[g]=F.shadow.matrix,D++}r.spot[g]=G,g++}else if(F.isRectAreaLight){const G=t.get(F);G.color.copy(H).multiplyScalar(te),G.halfWidth.set(F.width*.5,0,0),G.halfHeight.set(0,F.height*.5,0),r.rectArea[M]=G,M++}else if(F.isPointLight){const G=t.get(F);if(G.color.copy(F.color).multiplyScalar(F.intensity*O),G.distance=F.distance,G.decay=F.decay,F.castShadow){const j=F.shadow,q=i.get(F);q.shadowBias=j.bias,q.shadowNormalBias=j.normalBias,q.shadowRadius=j.radius,q.shadowMapSize=j.mapSize,q.shadowCameraNear=j.camera.near,q.shadowCameraFar=j.camera.far,r.pointShadow[d]=q,r.pointShadowMap[d]=ee,r.pointShadowMatrix[d]=F.shadow.matrix,w++}r.point[d]=G,d++}else if(F.isHemisphereLight){const G=t.get(F);G.skyColor.copy(F.color).multiplyScalar(te*O),G.groundColor.copy(F.groundColor).multiplyScalar(te*O),r.hemi[A]=G,A++}}M>0&&(e.isWebGL2||n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=xe.LTC_FLOAT_1,r.rectAreaLTC2=xe.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=xe.LTC_HALF_1,r.rectAreaLTC2=xe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=m,r.ambient[2]=_;const y=r.hash;(y.directionalLength!==p||y.pointLength!==d||y.spotLength!==g||y.rectAreaLength!==M||y.hemiLength!==A||y.numDirectionalShadows!==E||y.numPointShadows!==w||y.numSpotShadows!==D)&&(r.directional.length=p,r.spot.length=g,r.rectArea.length=M,r.point.length=d,r.hemi.length=A,r.directionalShadow.length=E,r.directionalShadowMap.length=E,r.pointShadow.length=w,r.pointShadowMap.length=w,r.spotShadow.length=D,r.spotShadowMap.length=D,r.directionalShadowMatrix.length=E,r.pointShadowMatrix.length=w,r.spotShadowMatrix.length=D,y.directionalLength=p,y.pointLength=d,y.spotLength=g,y.rectAreaLength=M,y.hemiLength=A,y.numDirectionalShadows=E,y.numPointShadows=w,y.numSpotShadows=D,r.version=gM++)}function c(u,f){let h=0,m=0,_=0,p=0,d=0;const g=f.matrixWorldInverse;for(let M=0,A=u.length;M<A;M++){const E=u[M];if(E.isDirectionalLight){const w=r.directional[h];w.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),h++}else if(E.isSpotLight){const w=r.spot[_];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),_++}else if(E.isRectAreaLight){const w=r.rectArea[p];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(g),a.identity(),o.copy(E.matrixWorld),o.premultiply(g),a.extractRotation(o),w.halfWidth.set(E.width*.5,0,0),w.halfHeight.set(0,E.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),p++}else if(E.isPointLight){const w=r.point[m];w.position.setFromMatrixPosition(E.matrixWorld),w.position.applyMatrix4(g),m++}else if(E.isHemisphereLight){const w=r.hemi[d];w.direction.setFromMatrixPosition(E.matrixWorld),w.direction.transformDirection(g),d++}}}return{setup:l,setupView:c,state:r}}function Yu(n,e){const t=new xM(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(f){i.push(f)}function a(f){r.push(f)}function l(f){t.setup(i,f)}function c(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function vM(n,e){let t=new WeakMap;function i(s,o=0){let a;return t.has(s)===!1?(a=new Yu(n,e),t.set(s,[a])):o>=t.get(s).length?(a=new Yu(n,e),t.get(s).push(a)):a=t.get(s)[o],a}function r(){t=new WeakMap}return{get:i,dispose:r}}class yM extends Ci{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=N_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class bM extends Ci{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new P,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const MM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,wM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function SM(n,e,t){let i=new Bl;const r=new Se,s=new Se,o=new it,a=new yM({depthPacking:O_}),l=new bM,c={},u=t.maxTextureSize,f={0:Qt,1:is,2:pr},h=new Si({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:MM,fragmentShader:wM}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const _=new Rt;_.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const p=new dn(_,h),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fh,this.render=function(E,w,D){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||E.length===0)return;const O=n.getRenderTarget(),y=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),N=n.state;N.setBlending($n),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);for(let F=0,H=E.length;F<H;F++){const te=E[F],z=te.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",te,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);const ee=z.getFrameExtents();if(r.multiply(ee),s.copy(z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ee.x),r.x=s.x*ee.x,z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ee.y),r.y=s.y*ee.y,z.mapSize.y=s.y)),z.map===null){const j=this.type!==jr?{minFilter:wt,magFilter:wt}:{};z.map=new Mi(r.x,r.y,j),z.map.texture.name=te.name+".shadowMap",z.camera.updateProjectionMatrix()}n.setRenderTarget(z.map),n.clear();const G=z.getViewportCount();for(let j=0;j<G;j++){const q=z.getViewport(j);o.set(s.x*q.x,s.y*q.y,s.x*q.z,s.y*q.w),N.viewport(o),z.updateMatrices(te,j),i=z.getFrustum(),A(w,D,z.camera,te,this.type)}z.isPointLightShadow!==!0&&this.type===jr&&g(z,D),z.needsUpdate=!1}d.needsUpdate=!1,n.setRenderTarget(O,y,C)};function g(E,w){const D=e.update(p);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,m.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Mi(r.x,r.y)),h.uniforms.shadow_pass.value=E.map.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(w,null,D,h,p,null),m.uniforms.shadow_pass.value=E.mapPass.texture,m.uniforms.resolution.value=E.mapSize,m.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(w,null,D,m,p,null)}function M(E,w,D,O,y,C){let N=null;const F=D.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(F!==void 0?N=F:N=D.isPointLight===!0?l:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0){const H=N.uuid,te=w.uuid;let z=c[H];z===void 0&&(z={},c[H]=z);let ee=z[te];ee===void 0&&(ee=N.clone(),z[te]=ee),N=ee}return N.visible=w.visible,N.wireframe=w.wireframe,C===jr?N.side=w.shadowSide!==null?w.shadowSide:w.side:N.side=w.shadowSide!==null?w.shadowSide:f[w.side],N.alphaMap=w.alphaMap,N.alphaTest=w.alphaTest,N.clipShadows=w.clipShadows,N.clippingPlanes=w.clippingPlanes,N.clipIntersection=w.clipIntersection,N.displacementMap=w.displacementMap,N.displacementScale=w.displacementScale,N.displacementBias=w.displacementBias,N.wireframeLinewidth=w.wireframeLinewidth,N.linewidth=w.linewidth,D.isPointLight===!0&&N.isMeshDistanceMaterial===!0&&(N.referencePosition.setFromMatrixPosition(D.matrixWorld),N.nearDistance=O,N.farDistance=y),N}function A(E,w,D,O,y){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&y===jr)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,E.matrixWorld);const F=e.update(E),H=E.material;if(Array.isArray(H)){const te=F.groups;for(let z=0,ee=te.length;z<ee;z++){const G=te[z],j=H[G.materialIndex];if(j&&j.visible){const q=M(E,j,O,D.near,D.far,y);n.renderBufferDirect(D,null,F,q,E,G)}}}else if(H.visible){const te=M(E,H,O,D.near,D.far,y);n.renderBufferDirect(D,null,F,te,E,null)}}const N=E.children;for(let F=0,H=N.length;F<H;F++)A(N[F],w,D,O,y)}}function EM(n,e,t){const i=t.isWebGL2;function r(){let L=!1;const de=new it;let pe=null;const be=new it(0,0,0,0);return{setMask:function(me){pe!==me&&!L&&(n.colorMask(me,me,me,me),pe=me)},setLocked:function(me){L=me},setClear:function(me,Me,ge,Ae,We){We===!0&&(me*=Ae,Me*=Ae,ge*=Ae),de.set(me,Me,ge,Ae),be.equals(de)===!1&&(n.clearColor(me,Me,ge,Ae),be.copy(de))},reset:function(){L=!1,pe=null,be.set(-1,0,0,0)}}}function s(){let L=!1,de=null,pe=null,be=null;return{setTest:function(me){me?we(2929):Z(2929)},setMask:function(me){de!==me&&!L&&(n.depthMask(me),de=me)},setFunc:function(me){if(pe!==me){if(me)switch(me){case s_:n.depthFunc(512);break;case o_:n.depthFunc(519);break;case a_:n.depthFunc(513);break;case Ka:n.depthFunc(515);break;case l_:n.depthFunc(514);break;case c_:n.depthFunc(518);break;case u_:n.depthFunc(516);break;case f_:n.depthFunc(517);break;default:n.depthFunc(515)}else n.depthFunc(515);pe=me}},setLocked:function(me){L=me},setClear:function(me){be!==me&&(n.clearDepth(me),be=me)},reset:function(){L=!1,de=null,pe=null,be=null}}}function o(){let L=!1,de=null,pe=null,be=null,me=null,Me=null,ge=null,Ae=null,We=null;return{setTest:function(qe){L||(qe?we(2960):Z(2960))},setMask:function(qe){de!==qe&&!L&&(n.stencilMask(qe),de=qe)},setFunc:function(qe,mt,tn){(pe!==qe||be!==mt||me!==tn)&&(n.stencilFunc(qe,mt,tn),pe=qe,be=mt,me=tn)},setOp:function(qe,mt,tn){(Me!==qe||ge!==mt||Ae!==tn)&&(n.stencilOp(qe,mt,tn),Me=qe,ge=mt,Ae=tn)},setLocked:function(qe){L=qe},setClear:function(qe){We!==qe&&(n.clearStencil(qe),We=qe)},reset:function(){L=!1,de=null,pe=null,be=null,me=null,Me=null,ge=null,Ae=null,We=null}}}const a=new r,l=new s,c=new o;let u={},f={},h=new WeakMap,m=[],_=null,p=!1,d=null,g=null,M=null,A=null,E=null,w=null,D=null,O=!1,y=null,C=null,N=null,F=null,H=null;const te=n.getParameter(35661);let z=!1,ee=0;const G=n.getParameter(7938);G.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(G)[1]),z=ee>=1):G.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),z=ee>=2);let j=null,q={};const W=n.getParameter(3088),J=n.getParameter(2978),ce=new it().fromArray(W),oe=new it().fromArray(J);function ae(L,de,pe){const be=new Uint8Array(4),me=n.createTexture();n.bindTexture(L,me),n.texParameteri(L,10241,9728),n.texParameteri(L,10240,9728);for(let Me=0;Me<pe;Me++)n.texImage2D(de+Me,0,6408,1,1,0,6408,5121,be);return me}const ye={};ye[3553]=ae(3553,3553,1),ye[34067]=ae(34067,34069,6),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),we(2929),l.setFunc(Ka),R(!1),k(Bc),we(2884),De($n);function we(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function Z(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function He(L,de){return f[L]!==de?(n.bindFramebuffer(L,de),f[L]=de,i&&(L===36009&&(f[36160]=de),L===36160&&(f[36009]=de)),!0):!1}function Le(L,de){let pe=m,be=!1;if(L)if(pe=h.get(de),pe===void 0&&(pe=[],h.set(de,pe)),L.isWebGLMultipleRenderTargets){const me=L.texture;if(pe.length!==me.length||pe[0]!==36064){for(let Me=0,ge=me.length;Me<ge;Me++)pe[Me]=36064+Me;pe.length=me.length,be=!0}}else pe[0]!==36064&&(pe[0]=36064,be=!0);else pe[0]!==1029&&(pe[0]=1029,be=!0);be&&(t.isWebGL2?n.drawBuffers(pe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(pe))}function Ee(L){return _!==L?(n.useProgram(L),_=L,!0):!1}const _e={[ir]:32774,[$0]:32778,[Y0]:32779};if(i)_e[Vc]=32775,_e[Wc]=32776;else{const L=e.get("EXT_blend_minmax");L!==null&&(_e[Vc]=L.MIN_EXT,_e[Wc]=L.MAX_EXT)}const Oe={[Z0]:0,[K0]:1,[J0]:768,[Nh]:770,[r_]:776,[n_]:774,[e_]:772,[Q0]:769,[Oh]:771,[i_]:775,[t_]:773};function De(L,de,pe,be,me,Me,ge,Ae){if(L===$n){p===!0&&(Z(3042),p=!1);return}if(p===!1&&(we(3042),p=!0),L!==X0){if(L!==d||Ae!==O){if((g!==ir||E!==ir)&&(n.blendEquation(32774),g=ir,E=ir),Ae)switch(L){case lr:n.blendFuncSeparate(1,771,1,771);break;case kc:n.blendFunc(1,1);break;case Hc:n.blendFuncSeparate(0,769,0,1);break;case Gc:n.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case lr:n.blendFuncSeparate(770,771,1,771);break;case kc:n.blendFunc(770,1);break;case Hc:n.blendFuncSeparate(0,769,0,1);break;case Gc:n.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}M=null,A=null,w=null,D=null,d=L,O=Ae}return}me=me||de,Me=Me||pe,ge=ge||be,(de!==g||me!==E)&&(n.blendEquationSeparate(_e[de],_e[me]),g=de,E=me),(pe!==M||be!==A||Me!==w||ge!==D)&&(n.blendFuncSeparate(Oe[pe],Oe[be],Oe[Me],Oe[ge]),M=pe,A=be,w=Me,D=ge),d=L,O=null}function T(L,de){L.side===pr?Z(2884):we(2884);let pe=L.side===Qt;de&&(pe=!pe),R(pe),L.blending===lr&&L.transparent===!1?De($n):De(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),a.setMask(L.colorWrite);const be=L.stencilWrite;c.setTest(be),be&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Q(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?we(32926):Z(32926)}function R(L){y!==L&&(L?n.frontFace(2304):n.frontFace(2305),y=L)}function k(L){L!==V0?(we(2884),L!==C&&(L===Bc?n.cullFace(1029):L===W0?n.cullFace(1028):n.cullFace(1032))):Z(2884),C=L}function K(L){L!==N&&(z&&n.lineWidth(L),N=L)}function Q(L,de,pe){L?(we(32823),(F!==de||H!==pe)&&(n.polygonOffset(de,pe),F=de,H=pe)):Z(32823)}function re(L){L?we(3089):Z(3089)}function se(L){L===void 0&&(L=33984+te-1),j!==L&&(n.activeTexture(L),j=L)}function le(L,de){j===null&&se();let pe=q[j];pe===void 0&&(pe={type:void 0,texture:void 0},q[j]=pe),(pe.type!==L||pe.texture!==de)&&(n.bindTexture(L,de||ye[L]),pe.type=L,pe.texture=de)}function ue(){const L=q[j];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function v(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function x(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function I(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function B(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Y(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ie(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ve(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function b(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function X(L){ce.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),ce.copy(L))}function fe(L){oe.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),oe.copy(L))}function he(){n.disable(3042),n.disable(2884),n.disable(2929),n.disable(32823),n.disable(3089),n.disable(2960),n.disable(32926),n.blendEquation(32774),n.blendFunc(1,0),n.blendFuncSeparate(1,0,1,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(513),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(519,0,4294967295),n.stencilOp(7680,7680,7680),n.clearStencil(0),n.cullFace(1029),n.frontFace(2305),n.polygonOffset(0,0),n.activeTexture(33984),n.bindFramebuffer(36160,null),i===!0&&(n.bindFramebuffer(36009,null),n.bindFramebuffer(36008,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},j=null,q={},f={},h=new WeakMap,m=[],_=null,p=!1,d=null,g=null,M=null,A=null,E=null,w=null,D=null,O=!1,y=null,C=null,N=null,F=null,H=null,ce.set(0,0,n.canvas.width,n.canvas.height),oe.set(0,0,n.canvas.width,n.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:we,disable:Z,bindFramebuffer:He,drawBuffers:Le,useProgram:Ee,setBlending:De,setMaterial:T,setFlipSided:R,setCullFace:k,setLineWidth:K,setPolygonOffset:Q,setScissorTest:re,activeTexture:se,bindTexture:le,unbindTexture:ue,compressedTexImage2D:v,texImage2D:ve,texImage3D:b,texStorage2D:Y,texStorage3D:ie,texSubImage2D:x,texSubImage3D:I,compressedTexSubImage2D:B,scissor:X,viewport:fe,reset:he}}function TM(n,e,t,i,r,s,o){const a=r.isWebGL2,l=r.maxTextures,c=r.maxCubemapSize,u=r.maxTextureSize,f=r.maxSamples,h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=/OculusBrowser/g.test(navigator.userAgent),_=new WeakMap;let p;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(v,x){return g?new OffscreenCanvas(v,x):ao("canvas")}function A(v,x,I,B){let Y=1;if((v.width>B||v.height>B)&&(Y=B/Math.max(v.width,v.height)),Y<1||x===!0)if(typeof HTMLImageElement!="undefined"&&v instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&v instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&v instanceof ImageBitmap){const ie=x?rl:Math.floor,ve=ie(Y*v.width),b=ie(Y*v.height);p===void 0&&(p=M(ve,b));const X=I?M(ve,b):p;return X.width=ve,X.height=b,X.getContext("2d").drawImage(v,0,0,ve,b),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+v.width+"x"+v.height+") to ("+ve+"x"+b+")."),X}else return"data"in v&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+v.width+"x"+v.height+")."),v;return v}function E(v){return gu(v.width)&&gu(v.height)}function w(v){return a?!1:v.wrapS!==Xt||v.wrapT!==Xt||v.minFilter!==wt&&v.minFilter!==Ft}function D(v,x){return v.generateMipmaps&&x&&v.minFilter!==wt&&v.minFilter!==Ft}function O(v){n.generateMipmap(v)}function y(v,x,I,B,Y=!1){if(a===!1)return x;if(v!==null){if(n[v]!==void 0)return n[v];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+v+"'")}let ie=x;return x===6403&&(I===5126&&(ie=33326),I===5131&&(ie=33325),I===5121&&(ie=33321)),x===33319&&(I===5126&&(ie=33328),I===5131&&(ie=33327),I===5121&&(ie=33323)),x===6408&&(I===5126&&(ie=34836),I===5131&&(ie=34842),I===5121&&(ie=B===Ke&&Y===!1?35907:32856),I===32819&&(ie=32854),I===32820&&(ie=32855)),(ie===33325||ie===33326||ie===33327||ie===33328||ie===34842||ie===34836)&&e.get("EXT_color_buffer_float"),ie}function C(v,x,I){return D(v,I)===!0||v.isFramebufferTexture&&v.minFilter!==wt&&v.minFilter!==Ft?Math.log2(Math.max(x.width,x.height))+1:v.mipmaps!==void 0&&v.mipmaps.length>0?v.mipmaps.length:v.isCompressedTexture&&Array.isArray(v.image)?x.mipmaps.length:1}function N(v){return v===wt||v===qc||v===jc?9728:9729}function F(v){const x=v.target;x.removeEventListener("dispose",F),te(x),x.isVideoTexture&&_.delete(x)}function H(v){const x=v.target;x.removeEventListener("dispose",H),ee(x)}function te(v){const x=i.get(v);if(x.__webglInit===void 0)return;const I=v.source,B=d.get(I);if(B){const Y=B[x.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&z(v),Object.keys(B).length===0&&d.delete(I)}i.remove(v)}function z(v){const x=i.get(v);n.deleteTexture(x.__webglTexture);const I=v.source,B=d.get(I);delete B[x.__cacheKey],o.memory.textures--}function ee(v){const x=v.texture,I=i.get(v),B=i.get(x);if(B.__webglTexture!==void 0&&(n.deleteTexture(B.__webglTexture),o.memory.textures--),v.depthTexture&&v.depthTexture.dispose(),v.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++)n.deleteFramebuffer(I.__webglFramebuffer[Y]),I.__webglDepthbuffer&&n.deleteRenderbuffer(I.__webglDepthbuffer[Y]);else{if(n.deleteFramebuffer(I.__webglFramebuffer),I.__webglDepthbuffer&&n.deleteRenderbuffer(I.__webglDepthbuffer),I.__webglMultisampledFramebuffer&&n.deleteFramebuffer(I.__webglMultisampledFramebuffer),I.__webglColorRenderbuffer)for(let Y=0;Y<I.__webglColorRenderbuffer.length;Y++)I.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(I.__webglColorRenderbuffer[Y]);I.__webglDepthRenderbuffer&&n.deleteRenderbuffer(I.__webglDepthRenderbuffer)}if(v.isWebGLMultipleRenderTargets)for(let Y=0,ie=x.length;Y<ie;Y++){const ve=i.get(x[Y]);ve.__webglTexture&&(n.deleteTexture(ve.__webglTexture),o.memory.textures--),i.remove(x[Y])}i.remove(x),i.remove(v)}let G=0;function j(){G=0}function q(){const v=G;return v>=l&&console.warn("THREE.WebGLTextures: Trying to use "+v+" texture units while this GPU supports only "+l),G+=1,v}function W(v){const x=[];return x.push(v.wrapS),x.push(v.wrapT),x.push(v.magFilter),x.push(v.minFilter),x.push(v.anisotropy),x.push(v.internalFormat),x.push(v.format),x.push(v.type),x.push(v.generateMipmaps),x.push(v.premultiplyAlpha),x.push(v.flipY),x.push(v.unpackAlignment),x.push(v.encoding),x.join()}function J(v,x){const I=i.get(v);if(v.isVideoTexture&&le(v),v.isRenderTargetTexture===!1&&v.version>0&&I.__version!==v.version){const B=v.image;if(B===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(B.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Le(I,v,x);return}}t.activeTexture(33984+x),t.bindTexture(3553,I.__webglTexture)}function ce(v,x){const I=i.get(v);if(v.version>0&&I.__version!==v.version){Le(I,v,x);return}t.activeTexture(33984+x),t.bindTexture(35866,I.__webglTexture)}function oe(v,x){const I=i.get(v);if(v.version>0&&I.__version!==v.version){Le(I,v,x);return}t.activeTexture(33984+x),t.bindTexture(32879,I.__webglTexture)}function ae(v,x){const I=i.get(v);if(v.version>0&&I.__version!==v.version){Ee(I,v,x);return}t.activeTexture(33984+x),t.bindTexture(34067,I.__webglTexture)}const ye={[el]:10497,[Xt]:33071,[tl]:33648},we={[wt]:9728,[qc]:9984,[jc]:9986,[Ft]:9729,[v_]:9985,[Ao]:9987};function Z(v,x,I){if(I?(n.texParameteri(v,10242,ye[x.wrapS]),n.texParameteri(v,10243,ye[x.wrapT]),(v===32879||v===35866)&&n.texParameteri(v,32882,ye[x.wrapR]),n.texParameteri(v,10240,we[x.magFilter]),n.texParameteri(v,10241,we[x.minFilter])):(n.texParameteri(v,10242,33071),n.texParameteri(v,10243,33071),(v===32879||v===35866)&&n.texParameteri(v,32882,33071),(x.wrapS!==Xt||x.wrapT!==Xt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(v,10240,N(x.magFilter)),n.texParameteri(v,10241,N(x.minFilter)),x.minFilter!==wt&&x.minFilter!==Ft&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){const B=e.get("EXT_texture_filter_anisotropic");if(x.type===pi&&e.has("OES_texture_float_linear")===!1||a===!1&&x.type===rs&&e.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||i.get(x).__currentAnisotropy)&&(n.texParameterf(v,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy)}}function He(v,x){let I=!1;v.__webglInit===void 0&&(v.__webglInit=!0,x.addEventListener("dispose",F));const B=x.source;let Y=d.get(B);Y===void 0&&(Y={},d.set(B,Y));const ie=W(x);if(ie!==v.__cacheKey){Y[ie]===void 0&&(Y[ie]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,I=!0),Y[ie].usedTimes++;const ve=Y[v.__cacheKey];ve!==void 0&&(Y[v.__cacheKey].usedTimes--,ve.usedTimes===0&&z(x)),v.__cacheKey=ie,v.__webglTexture=Y[ie].texture}return I}function Le(v,x,I){let B=3553;x.isDataArrayTexture&&(B=35866),x.isData3DTexture&&(B=32879);const Y=He(v,x),ie=x.source;if(t.activeTexture(33984+I),t.bindTexture(B,v.__webglTexture),ie.version!==ie.__currentVersion||Y===!0){n.pixelStorei(37440,x.flipY),n.pixelStorei(37441,x.premultiplyAlpha),n.pixelStorei(3317,x.unpackAlignment),n.pixelStorei(37443,0);const ve=w(x)&&E(x.image)===!1;let b=A(x.image,ve,!1,u);b=ue(x,b);const X=E(b)||a,fe=s.convert(x.format,x.encoding);let he=s.convert(x.type),L=y(x.internalFormat,fe,he,x.encoding,x.isVideoTexture);Z(B,x,X);let de;const pe=x.mipmaps,be=a&&x.isVideoTexture!==!0,me=ie.__currentVersion===void 0||Y===!0,Me=C(x,b,X);if(x.isDepthTexture)L=6402,a?x.type===pi?L=36012:x.type===di?L=33190:x.type===cr?L=35056:L=33189:x.type===pi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===xi&&L===6402&&x.type!==Bh&&x.type!==di&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=di,he=s.convert(x.type)),x.format===_r&&L===6402&&(L=34041,x.type!==cr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=cr,he=s.convert(x.type))),me&&(be?t.texStorage2D(3553,1,L,b.width,b.height):t.texImage2D(3553,0,L,b.width,b.height,0,fe,he,null));else if(x.isDataTexture)if(pe.length>0&&X){be&&me&&t.texStorage2D(3553,Me,L,pe[0].width,pe[0].height);for(let ge=0,Ae=pe.length;ge<Ae;ge++)de=pe[ge],be?t.texSubImage2D(3553,ge,0,0,de.width,de.height,fe,he,de.data):t.texImage2D(3553,ge,L,de.width,de.height,0,fe,he,de.data);x.generateMipmaps=!1}else be?(me&&t.texStorage2D(3553,Me,L,b.width,b.height),t.texSubImage2D(3553,0,0,0,b.width,b.height,fe,he,b.data)):t.texImage2D(3553,0,L,b.width,b.height,0,fe,he,b.data);else if(x.isCompressedTexture){be&&me&&t.texStorage2D(3553,Me,L,pe[0].width,pe[0].height);for(let ge=0,Ae=pe.length;ge<Ae;ge++)de=pe[ge],x.format!==hn?fe!==null?be?t.compressedTexSubImage2D(3553,ge,0,0,de.width,de.height,fe,de.data):t.compressedTexImage2D(3553,ge,L,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):be?t.texSubImage2D(3553,ge,0,0,de.width,de.height,fe,he,de.data):t.texImage2D(3553,ge,L,de.width,de.height,0,fe,he,de.data)}else if(x.isDataArrayTexture)be?(me&&t.texStorage3D(35866,Me,L,b.width,b.height,b.depth),t.texSubImage3D(35866,0,0,0,0,b.width,b.height,b.depth,fe,he,b.data)):t.texImage3D(35866,0,L,b.width,b.height,b.depth,0,fe,he,b.data);else if(x.isData3DTexture)be?(me&&t.texStorage3D(32879,Me,L,b.width,b.height,b.depth),t.texSubImage3D(32879,0,0,0,0,b.width,b.height,b.depth,fe,he,b.data)):t.texImage3D(32879,0,L,b.width,b.height,b.depth,0,fe,he,b.data);else if(x.isFramebufferTexture){if(me)if(be)t.texStorage2D(3553,Me,L,b.width,b.height);else{let ge=b.width,Ae=b.height;for(let We=0;We<Me;We++)t.texImage2D(3553,We,L,ge,Ae,0,fe,he,null),ge>>=1,Ae>>=1}}else if(pe.length>0&&X){be&&me&&t.texStorage2D(3553,Me,L,pe[0].width,pe[0].height);for(let ge=0,Ae=pe.length;ge<Ae;ge++)de=pe[ge],be?t.texSubImage2D(3553,ge,0,0,fe,he,de):t.texImage2D(3553,ge,L,fe,he,de);x.generateMipmaps=!1}else be?(me&&t.texStorage2D(3553,Me,L,b.width,b.height),t.texSubImage2D(3553,0,0,0,fe,he,b)):t.texImage2D(3553,0,L,fe,he,b);D(x,X)&&O(B),ie.__currentVersion=ie.version,x.onUpdate&&x.onUpdate(x)}v.__version=x.version}function Ee(v,x,I){if(x.image.length!==6)return;const B=He(v,x),Y=x.source;if(t.activeTexture(33984+I),t.bindTexture(34067,v.__webglTexture),Y.version!==Y.__currentVersion||B===!0){n.pixelStorei(37440,x.flipY),n.pixelStorei(37441,x.premultiplyAlpha),n.pixelStorei(3317,x.unpackAlignment),n.pixelStorei(37443,0);const ie=x.isCompressedTexture||x.image[0].isCompressedTexture,ve=x.image[0]&&x.image[0].isDataTexture,b=[];for(let ge=0;ge<6;ge++)!ie&&!ve?b[ge]=A(x.image[ge],!1,!0,c):b[ge]=ve?x.image[ge].image:x.image[ge],b[ge]=ue(x,b[ge]);const X=b[0],fe=E(X)||a,he=s.convert(x.format,x.encoding),L=s.convert(x.type),de=y(x.internalFormat,he,L,x.encoding),pe=a&&x.isVideoTexture!==!0,be=Y.__currentVersion===void 0||B===!0;let me=C(x,X,fe);Z(34067,x,fe);let Me;if(ie){pe&&be&&t.texStorage2D(34067,me,de,X.width,X.height);for(let ge=0;ge<6;ge++){Me=b[ge].mipmaps;for(let Ae=0;Ae<Me.length;Ae++){const We=Me[Ae];x.format!==hn?he!==null?pe?t.compressedTexSubImage2D(34069+ge,Ae,0,0,We.width,We.height,he,We.data):t.compressedTexImage2D(34069+ge,Ae,de,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):pe?t.texSubImage2D(34069+ge,Ae,0,0,We.width,We.height,he,L,We.data):t.texImage2D(34069+ge,Ae,de,We.width,We.height,0,he,L,We.data)}}}else{Me=x.mipmaps,pe&&be&&(Me.length>0&&me++,t.texStorage2D(34067,me,de,b[0].width,b[0].height));for(let ge=0;ge<6;ge++)if(ve){pe?t.texSubImage2D(34069+ge,0,0,0,b[ge].width,b[ge].height,he,L,b[ge].data):t.texImage2D(34069+ge,0,de,b[ge].width,b[ge].height,0,he,L,b[ge].data);for(let Ae=0;Ae<Me.length;Ae++){const qe=Me[Ae].image[ge].image;pe?t.texSubImage2D(34069+ge,Ae+1,0,0,qe.width,qe.height,he,L,qe.data):t.texImage2D(34069+ge,Ae+1,de,qe.width,qe.height,0,he,L,qe.data)}}else{pe?t.texSubImage2D(34069+ge,0,0,0,he,L,b[ge]):t.texImage2D(34069+ge,0,de,he,L,b[ge]);for(let Ae=0;Ae<Me.length;Ae++){const We=Me[Ae];pe?t.texSubImage2D(34069+ge,Ae+1,0,0,he,L,We.image[ge]):t.texImage2D(34069+ge,Ae+1,de,he,L,We.image[ge])}}}D(x,fe)&&O(34067),Y.__currentVersion=Y.version,x.onUpdate&&x.onUpdate(x)}v.__version=x.version}function _e(v,x,I,B,Y){const ie=s.convert(I.format,I.encoding),ve=s.convert(I.type),b=y(I.internalFormat,ie,ve,I.encoding);i.get(x).__hasExternalTextures||(Y===32879||Y===35866?t.texImage3D(Y,0,b,x.width,x.height,x.depth,0,ie,ve,null):t.texImage2D(Y,0,b,x.width,x.height,0,ie,ve,null)),t.bindFramebuffer(36160,v),se(x)?h.framebufferTexture2DMultisampleEXT(36160,B,Y,i.get(I).__webglTexture,0,re(x)):n.framebufferTexture2D(36160,B,Y,i.get(I).__webglTexture,0),t.bindFramebuffer(36160,null)}function Oe(v,x,I){if(n.bindRenderbuffer(36161,v),x.depthBuffer&&!x.stencilBuffer){let B=33189;if(I||se(x)){const Y=x.depthTexture;Y&&Y.isDepthTexture&&(Y.type===pi?B=36012:Y.type===di&&(B=33190));const ie=re(x);se(x)?h.renderbufferStorageMultisampleEXT(36161,ie,B,x.width,x.height):n.renderbufferStorageMultisample(36161,ie,B,x.width,x.height)}else n.renderbufferStorage(36161,B,x.width,x.height);n.framebufferRenderbuffer(36160,36096,36161,v)}else if(x.depthBuffer&&x.stencilBuffer){const B=re(x);I&&se(x)===!1?n.renderbufferStorageMultisample(36161,B,35056,x.width,x.height):se(x)?h.renderbufferStorageMultisampleEXT(36161,B,35056,x.width,x.height):n.renderbufferStorage(36161,34041,x.width,x.height),n.framebufferRenderbuffer(36160,33306,36161,v)}else{const B=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let Y=0;Y<B.length;Y++){const ie=B[Y],ve=s.convert(ie.format,ie.encoding),b=s.convert(ie.type),X=y(ie.internalFormat,ve,b,ie.encoding),fe=re(x);I&&se(x)===!1?n.renderbufferStorageMultisample(36161,fe,X,x.width,x.height):se(x)?h.renderbufferStorageMultisampleEXT(36161,fe,X,x.width,x.height):n.renderbufferStorage(36161,X,x.width,x.height)}}n.bindRenderbuffer(36161,null)}function De(v,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,v),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),J(x.depthTexture,0);const B=i.get(x.depthTexture).__webglTexture,Y=re(x);if(x.depthTexture.format===xi)se(x)?h.framebufferTexture2DMultisampleEXT(36160,36096,3553,B,0,Y):n.framebufferTexture2D(36160,36096,3553,B,0);else if(x.depthTexture.format===_r)se(x)?h.framebufferTexture2DMultisampleEXT(36160,33306,3553,B,0,Y):n.framebufferTexture2D(36160,33306,3553,B,0);else throw new Error("Unknown depthTexture format")}function T(v){const x=i.get(v),I=v.isWebGLCubeRenderTarget===!0;if(v.depthTexture&&!x.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");De(x.__webglFramebuffer,v)}else if(I){x.__webglDepthbuffer=[];for(let B=0;B<6;B++)t.bindFramebuffer(36160,x.__webglFramebuffer[B]),x.__webglDepthbuffer[B]=n.createRenderbuffer(),Oe(x.__webglDepthbuffer[B],v,!1)}else t.bindFramebuffer(36160,x.__webglFramebuffer),x.__webglDepthbuffer=n.createRenderbuffer(),Oe(x.__webglDepthbuffer,v,!1);t.bindFramebuffer(36160,null)}function R(v,x,I){const B=i.get(v);x!==void 0&&_e(B.__webglFramebuffer,v,v.texture,36064,3553),I!==void 0&&T(v)}function k(v){const x=v.texture,I=i.get(v),B=i.get(x);v.addEventListener("dispose",H),v.isWebGLMultipleRenderTargets!==!0&&(B.__webglTexture===void 0&&(B.__webglTexture=n.createTexture()),B.__version=x.version,o.memory.textures++);const Y=v.isWebGLCubeRenderTarget===!0,ie=v.isWebGLMultipleRenderTargets===!0,ve=E(v)||a;if(Y){I.__webglFramebuffer=[];for(let b=0;b<6;b++)I.__webglFramebuffer[b]=n.createFramebuffer()}else{if(I.__webglFramebuffer=n.createFramebuffer(),ie)if(r.drawBuffers){const b=v.texture;for(let X=0,fe=b.length;X<fe;X++){const he=i.get(b[X]);he.__webglTexture===void 0&&(he.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&v.samples>0&&se(v)===!1){const b=ie?x:[x];I.__webglMultisampledFramebuffer=n.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(36160,I.__webglMultisampledFramebuffer);for(let X=0;X<b.length;X++){const fe=b[X];I.__webglColorRenderbuffer[X]=n.createRenderbuffer(),n.bindRenderbuffer(36161,I.__webglColorRenderbuffer[X]);const he=s.convert(fe.format,fe.encoding),L=s.convert(fe.type),de=y(fe.internalFormat,he,L,fe.encoding),pe=re(v);n.renderbufferStorageMultisample(36161,pe,de,v.width,v.height),n.framebufferRenderbuffer(36160,36064+X,36161,I.__webglColorRenderbuffer[X])}n.bindRenderbuffer(36161,null),v.depthBuffer&&(I.__webglDepthRenderbuffer=n.createRenderbuffer(),Oe(I.__webglDepthRenderbuffer,v,!0)),t.bindFramebuffer(36160,null)}}if(Y){t.bindTexture(34067,B.__webglTexture),Z(34067,x,ve);for(let b=0;b<6;b++)_e(I.__webglFramebuffer[b],v,x,36064,34069+b);D(x,ve)&&O(34067),t.unbindTexture()}else if(ie){const b=v.texture;for(let X=0,fe=b.length;X<fe;X++){const he=b[X],L=i.get(he);t.bindTexture(3553,L.__webglTexture),Z(3553,he,ve),_e(I.__webglFramebuffer,v,he,36064+X,3553),D(he,ve)&&O(3553)}t.unbindTexture()}else{let b=3553;(v.isWebGL3DRenderTarget||v.isWebGLArrayRenderTarget)&&(a?b=v.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(b,B.__webglTexture),Z(b,x,ve),_e(I.__webglFramebuffer,v,x,36064,b),D(x,ve)&&O(b),t.unbindTexture()}v.depthBuffer&&T(v)}function K(v){const x=E(v)||a,I=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let B=0,Y=I.length;B<Y;B++){const ie=I[B];if(D(ie,x)){const ve=v.isWebGLCubeRenderTarget?34067:3553,b=i.get(ie).__webglTexture;t.bindTexture(ve,b),O(ve),t.unbindTexture()}}}function Q(v){if(a&&v.samples>0&&se(v)===!1){const x=v.isWebGLMultipleRenderTargets?v.texture:[v.texture],I=v.width,B=v.height;let Y=16384;const ie=[],ve=v.stencilBuffer?33306:36096,b=i.get(v),X=v.isWebGLMultipleRenderTargets===!0;if(X)for(let fe=0;fe<x.length;fe++)t.bindFramebuffer(36160,b.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(36160,36064+fe,36161,null),t.bindFramebuffer(36160,b.__webglFramebuffer),n.framebufferTexture2D(36009,36064+fe,3553,null,0);t.bindFramebuffer(36008,b.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,b.__webglFramebuffer);for(let fe=0;fe<x.length;fe++){ie.push(36064+fe),v.depthBuffer&&ie.push(ve);const he=b.__ignoreDepthValues!==void 0?b.__ignoreDepthValues:!1;if(he===!1&&(v.depthBuffer&&(Y|=256),v.stencilBuffer&&(Y|=1024)),X&&n.framebufferRenderbuffer(36008,36064,36161,b.__webglColorRenderbuffer[fe]),he===!0&&(n.invalidateFramebuffer(36008,[ve]),n.invalidateFramebuffer(36009,[ve])),X){const L=i.get(x[fe]).__webglTexture;n.framebufferTexture2D(36009,36064,3553,L,0)}n.blitFramebuffer(0,0,I,B,0,0,I,B,Y,9728),m&&n.invalidateFramebuffer(36008,ie)}if(t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,null),X)for(let fe=0;fe<x.length;fe++){t.bindFramebuffer(36160,b.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(36160,36064+fe,36161,b.__webglColorRenderbuffer[fe]);const he=i.get(x[fe]).__webglTexture;t.bindFramebuffer(36160,b.__webglFramebuffer),n.framebufferTexture2D(36009,36064+fe,3553,he,0)}t.bindFramebuffer(36009,b.__webglMultisampledFramebuffer)}}function re(v){return Math.min(f,v.samples)}function se(v){const x=i.get(v);return a&&v.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function le(v){const x=o.render.frame;_.get(v)!==x&&(_.set(v,x),v.update())}function ue(v,x){const I=v.encoding,B=v.format,Y=v.type;return v.isCompressedTexture===!0||v.isVideoTexture===!0||v.format===il||I!==bi&&(I===Ke?a===!1?e.has("EXT_sRGB")===!0&&B===hn?(v.format=il,v.minFilter=Ft,v.generateMipmaps=!1):x=Vh.sRGBToLinear(x):(B!==hn||Y!==yi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",I)),x}this.allocateTextureUnit=q,this.resetTextureUnits=j,this.setTexture2D=J,this.setTexture2DArray=ce,this.setTexture3D=oe,this.setTextureCube=ae,this.rebindTextures=R,this.setupRenderTarget=k,this.updateRenderTargetMipmap=K,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=T,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=se}function AM(n,e,t){const i=t.isWebGL2;function r(s,o=null){let a;if(s===yi)return 5121;if(s===w_)return 32819;if(s===S_)return 32820;if(s===y_)return 5120;if(s===b_)return 5122;if(s===Bh)return 5123;if(s===M_)return 5124;if(s===di)return 5125;if(s===pi)return 5126;if(s===rs)return i?5131:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===E_)return 6406;if(s===hn)return 6408;if(s===A_)return 6409;if(s===C_)return 6410;if(s===xi)return 6402;if(s===_r)return 34041;if(s===L_)return 6403;if(s===T_)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(s===il)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===D_)return 36244;if(s===R_)return 33319;if(s===P_)return 33320;if(s===I_)return 36249;if(s===qo||s===jo||s===Xo||s===$o)if(o===Ke)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===qo)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===jo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Xo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===$o)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===qo)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===jo)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Xo)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===$o)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Xc||s===$c||s===Yc||s===Zc)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Xc)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===$c)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Yc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Zc)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===F_)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Kc||s===Jc)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Kc)return o===Ke?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Jc)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Qc||s===eu||s===tu||s===nu||s===iu||s===ru||s===su||s===ou||s===au||s===lu||s===cu||s===uu||s===fu||s===hu)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Qc)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===eu)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===tu)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===nu)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===iu)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ru)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===su)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===ou)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===au)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===lu)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===cu)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===uu)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===fu)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===hu)return o===Ke?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===du)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===du)return o===Ke?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return s===cr?i?34042:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class CM extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Fs extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const LM={type:"move"};class Ma{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const p of e.hand.values()){const d=t.getJointPose(p,i);if(c.joints[p.jointName]===void 0){const M=new Fs;M.matrixAutoUpdate=!1,M.visible=!1,c.joints[p.jointName]=M,c.add(M)}const g=c.joints[p.jointName];d!==null&&(g.matrix.fromArray(d.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.jointRadius=d.radius),g.visible=d!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),m=.02,_=.005;c.inputState.pinching&&h>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(LM)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}}class DM extends Bt{constructor(e,t,i,r,s,o,a,l,c,u){if(u=u!==void 0?u:xi,u!==xi&&u!==_r)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===xi&&(i=di),i===void 0&&u===_r&&(i=cr),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:wt,this.minFilter=l!==void 0?l:wt,this.flipY=!1,this.generateMipmaps=!1}}class RM extends Ai{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=null,c=null,u=null,f=null,h=null,m=null;const _=t.getContextAttributes();let p=null,d=null;const g=[],M=[],A=new Nt;A.layers.enable(1),A.viewport=new it;const E=new Nt;E.layers.enable(2),E.viewport=new it;const w=[A,E],D=new CM;D.layers.enable(1),D.layers.enable(2);let O=null,y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let J=g[W];return J===void 0&&(J=new Ma,g[W]=J),J.getTargetRaySpace()},this.getControllerGrip=function(W){let J=g[W];return J===void 0&&(J=new Ma,g[W]=J),J.getGripSpace()},this.getHand=function(W){let J=g[W];return J===void 0&&(J=new Ma,g[W]=J),J.getHandSpace()};function C(W){const J=M.indexOf(W.inputSource);if(J===-1)return;const ce=g[J];ce!==void 0&&ce.dispatchEvent({type:W.type,data:W.inputSource})}function N(){r.removeEventListener("select",C),r.removeEventListener("selectstart",C),r.removeEventListener("selectend",C),r.removeEventListener("squeeze",C),r.removeEventListener("squeezestart",C),r.removeEventListener("squeezeend",C),r.removeEventListener("end",N),r.removeEventListener("inputsourceschange",F);for(let W=0;W<g.length;W++){const J=M[W];J!==null&&(M[W]=null,g[W].disconnect(J))}O=null,y=null,e.setRenderTarget(p),h=null,f=null,u=null,r=null,d=null,q.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",C),r.addEventListener("selectstart",C),r.addEventListener("selectend",C),r.addEventListener("squeeze",C),r.addEventListener("squeezestart",C),r.addEventListener("squeezeend",C),r.addEventListener("end",N),r.addEventListener("inputsourceschange",F),_.xrCompatible!==!0&&await t.makeXRCompatible(),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const J={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:_.alpha,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,J),r.updateRenderState({baseLayer:h}),d=new Mi(h.framebufferWidth,h.framebufferHeight,{format:hn,type:yi,encoding:e.outputEncoding})}else{let J=null,ce=null,oe=null;_.depth&&(oe=_.stencil?35056:33190,J=_.stencil?_r:xi,ce=_.stencil?cr:di);const ae={colorFormat:32856,depthFormat:oe,scaleFactor:s};u=new XRWebGLBinding(r,t),f=u.createProjectionLayer(ae),r.updateRenderState({layers:[f]}),d=new Mi(f.textureWidth,f.textureHeight,{format:hn,type:yi,depthTexture:new DM(f.textureWidth,f.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:_.stencil,encoding:e.outputEncoding,samples:_.antialias?4:0});const ye=e.properties.get(d);ye.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(1),l=null,o=await r.requestReferenceSpace(a),q.setContext(r),q.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}};function F(W){for(let J=0;J<W.removed.length;J++){const ce=W.removed[J],oe=M.indexOf(ce);oe>=0&&(M[oe]=null,g[oe].dispatchEvent({type:"disconnected",data:ce}))}for(let J=0;J<W.added.length;J++){const ce=W.added[J];let oe=M.indexOf(ce);if(oe===-1){for(let ye=0;ye<g.length;ye++)if(ye>=M.length){M.push(ce),oe=ye;break}else if(M[ye]===null){M[ye]=ce,oe=ye;break}if(oe===-1)break}const ae=g[oe];ae&&ae.dispatchEvent({type:"connected",data:ce})}}const H=new P,te=new P;function z(W,J,ce){H.setFromMatrixPosition(J.matrixWorld),te.setFromMatrixPosition(ce.matrixWorld);const oe=H.distanceTo(te),ae=J.projectionMatrix.elements,ye=ce.projectionMatrix.elements,we=ae[14]/(ae[10]-1),Z=ae[14]/(ae[10]+1),He=(ae[9]+1)/ae[5],Le=(ae[9]-1)/ae[5],Ee=(ae[8]-1)/ae[0],_e=(ye[8]+1)/ye[0],Oe=we*Ee,De=we*_e,T=oe/(-Ee+_e),R=T*-Ee;J.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(R),W.translateZ(T),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const k=we+T,K=Z+T,Q=Oe-R,re=De+(oe-R),se=He*Z/K*k,le=Le*Z/K*k;W.projectionMatrix.makePerspective(Q,re,se,le,k,K)}function ee(W,J){J===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(J.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;D.near=E.near=A.near=W.near,D.far=E.far=A.far=W.far,(O!==D.near||y!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,y=D.far);const J=W.parent,ce=D.cameras;ee(D,J);for(let ae=0;ae<ce.length;ae++)ee(ce[ae],J);D.matrixWorld.decompose(D.position,D.quaternion,D.scale),W.position.copy(D.position),W.quaternion.copy(D.quaternion),W.scale.copy(D.scale),W.matrix.copy(D.matrix),W.matrixWorld.copy(D.matrixWorld);const oe=W.children;for(let ae=0,ye=oe.length;ae<ye;ae++)oe[ae].updateMatrixWorld(!0);ce.length===2?z(D,A,E):D.projectionMatrix.copy(A.projectionMatrix)},this.getCamera=function(){return D},this.getFoveation=function(){if(f!==null)return f.fixedFoveation;if(h!==null)return h.fixedFoveation},this.setFoveation=function(W){f!==null&&(f.fixedFoveation=W),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=W)};let G=null;function j(W,J){if(c=J.getViewerPose(l||o),m=J,c!==null){const ce=c.views;h!==null&&(e.setRenderTargetFramebuffer(d,h.framebuffer),e.setRenderTarget(d));let oe=!1;ce.length!==D.cameras.length&&(D.cameras.length=0,oe=!0);for(let ae=0;ae<ce.length;ae++){const ye=ce[ae];let we=null;if(h!==null)we=h.getViewport(ye);else{const He=u.getViewSubImage(f,ye);we=He.viewport,ae===0&&(e.setRenderTargetTextures(d,He.colorTexture,f.ignoreDepthValues?void 0:He.depthStencilTexture),e.setRenderTarget(d))}let Z=w[ae];Z===void 0&&(Z=new Nt,Z.layers.enable(ae),Z.viewport=new it,w[ae]=Z),Z.matrix.fromArray(ye.transform.matrix),Z.projectionMatrix.fromArray(ye.projectionMatrix),Z.viewport.set(we.x,we.y,we.width,we.height),ae===0&&D.matrix.copy(Z.matrix),oe===!0&&D.cameras.push(Z)}}for(let ce=0;ce<g.length;ce++){const oe=M[ce],ae=g[ce];oe!==null&&ae!==void 0&&ae.update(oe,J,l||o)}G&&G(W,J),m=null}const q=new Zh;q.setAnimationLoop(j),this.setAnimationLoop=function(W){G=W},this.dispose=function(){}}}function PM(n,e){function t(p,d){p.fogColor.value.copy(d.color),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function i(p,d,g,M,A){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),c(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&h(p,d,A)):d.isMeshMatcapMaterial?(r(p,d),m(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),_(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(s(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?a(p,d,g,M):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map),d.alphaMap&&(p.alphaMap.value=d.alphaMap),d.bumpMap&&(p.bumpMap.value=d.bumpMap,p.bumpScale.value=d.bumpScale,d.side===Qt&&(p.bumpScale.value*=-1)),d.displacementMap&&(p.displacementMap.value=d.displacementMap,p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap),d.normalMap&&(p.normalMap.value=d.normalMap,p.normalScale.value.copy(d.normalScale),d.side===Qt&&p.normalScale.value.negate()),d.specularMap&&(p.specularMap.value=d.specularMap),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const g=e.get(d).envMap;if(g&&(p.envMap.value=g,p.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;const E=n.physicallyCorrectLights!==!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*E}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity);let M;d.map?M=d.map:d.specularMap?M=d.specularMap:d.displacementMap?M=d.displacementMap:d.normalMap?M=d.normalMap:d.bumpMap?M=d.bumpMap:d.roughnessMap?M=d.roughnessMap:d.metalnessMap?M=d.metalnessMap:d.alphaMap?M=d.alphaMap:d.emissiveMap?M=d.emissiveMap:d.clearcoatMap?M=d.clearcoatMap:d.clearcoatNormalMap?M=d.clearcoatNormalMap:d.clearcoatRoughnessMap?M=d.clearcoatRoughnessMap:d.iridescenceMap?M=d.iridescenceMap:d.iridescenceThicknessMap?M=d.iridescenceThicknessMap:d.specularIntensityMap?M=d.specularIntensityMap:d.specularColorMap?M=d.specularColorMap:d.transmissionMap?M=d.transmissionMap:d.thicknessMap?M=d.thicknessMap:d.sheenColorMap?M=d.sheenColorMap:d.sheenRoughnessMap&&(M=d.sheenRoughnessMap),M!==void 0&&(M.isWebGLRenderTarget&&(M=M.texture),M.matrixAutoUpdate===!0&&M.updateMatrix(),p.uvTransform.value.copy(M.matrix));let A;d.aoMap?A=d.aoMap:d.lightMap&&(A=d.lightMap),A!==void 0&&(A.isWebGLRenderTarget&&(A=A.texture),A.matrixAutoUpdate===!0&&A.updateMatrix(),p.uv2Transform.value.copy(A.matrix))}function s(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function a(p,d,g,M){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*g,p.scale.value=M*.5,d.map&&(p.map.value=d.map),d.alphaMap&&(p.alphaMap.value=d.alphaMap),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);let A;d.map?A=d.map:d.alphaMap&&(A=d.alphaMap),A!==void 0&&(A.matrixAutoUpdate===!0&&A.updateMatrix(),p.uvTransform.value.copy(A.matrix))}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map),d.alphaMap&&(p.alphaMap.value=d.alphaMap),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);let g;d.map?g=d.map:d.alphaMap&&(g=d.alphaMap),g!==void 0&&(g.matrixAutoUpdate===!0&&g.updateMatrix(),p.uvTransform.value.copy(g.matrix))}function c(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.roughness.value=d.roughness,p.metalness.value=d.metalness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap),d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap),e.get(d).envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function h(p,d,g){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap)),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap),d.clearcoatNormalMap&&(p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),p.clearcoatNormalMap.value=d.clearcoatNormalMap,d.side===Qt&&p.clearcoatNormalScale.value.negate())),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap)),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=g.texture,p.transmissionSamplerSize.value.set(g.width,g.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap)}function m(p,d){d.matcap&&(p.matcap.value=d.matcap)}function _(p,d){p.referencePosition.value.copy(d.referencePosition),p.nearDistance.value=d.nearDistance,p.farDistance.value=d.farDistance}return{refreshFogUniforms:t,refreshMaterialUniforms:i}}function IM(){const n=ao("canvas");return n.style.display="block",n}function id(n={}){this.isWebGLRenderer=!0;const e=n.canvas!==void 0?n.canvas:IM(),t=n.context!==void 0?n.context:null,i=n.depth!==void 0?n.depth:!0,r=n.stencil!==void 0?n.stencil:!0,s=n.antialias!==void 0?n.antialias:!1,o=n.premultipliedAlpha!==void 0?n.premultipliedAlpha:!0,a=n.preserveDrawingBuffer!==void 0?n.preserveDrawingBuffer:!1,l=n.powerPreference!==void 0?n.powerPreference:"default",c=n.failIfMajorPerformanceCaveat!==void 0?n.failIfMajorPerformanceCaveat:!1;let u;t!==null?u=t.getContextAttributes().alpha:u=n.alpha!==void 0?n.alpha:!1;let f=null,h=null;const m=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=bi,this.physicallyCorrectLights=!1,this.toneMapping=En,this.toneMappingExposure=1,Object.defineProperties(this,{gammaFactor:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaFactor has been removed."),2},set:function(){console.warn("THREE.WebGLRenderer: .gammaFactor has been removed.")}}});const p=this;let d=!1,g=0,M=0,A=null,E=-1,w=null;const D=new it,O=new it;let y=null,C=e.width,N=e.height,F=1,H=null,te=null;const z=new it(0,0,C,N),ee=new it(0,0,C,N);let G=!1;const j=new Bl;let q=!1,W=!1,J=null;const ce=new Qe,oe=new Se,ae=new P,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function we(){return A===null?F:1}let Z=t;function He(S,U){for(let $=0;$<S.length;$++){const V=S[$],ne=e.getContext(V,U);if(ne!==null)return ne}return null}try{const S={alpha:!0,depth:i,stencil:r,antialias:s,premultipliedAlpha:o,preserveDrawingBuffer:a,powerPreference:l,failIfMajorPerformanceCaveat:c};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Nl}`),e.addEventListener("webglcontextlost",L,!1),e.addEventListener("webglcontextrestored",de,!1),e.addEventListener("webglcontextcreationerror",pe,!1),Z===null){const U=["webgl2","webgl","experimental-webgl"];if(p.isWebGL1Renderer===!0&&U.shift(),Z=He(U,S),Z===null)throw He(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}Z.getShaderPrecisionFormat===void 0&&(Z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Le,Ee,_e,Oe,De,T,R,k,K,Q,re,se,le,ue,v,x,I,B,Y,ie,ve,b,X;function fe(){Le=new Wy(Z),Ee=new Uy(Z,Le,n),Le.init(Ee),b=new AM(Z,Le,Ee),_e=new EM(Z,Le,Ee),Oe=new Xy,De=new fM,T=new TM(Z,Le,_e,De,Ee,b,Oe),R=new ky(p),k=new Vy(p),K=new sx(Z,Ee),X=new Oy(Z,Le,K,Ee),Q=new qy(Z,K,Oe,X),re=new Ky(Z,Q,K,Oe),Y=new Zy(Z,Ee,T),x=new By(De),se=new uM(p,R,k,Le,Ee,X,x),le=new PM(p,De),ue=new dM,v=new vM(Le,Ee),B=new Ny(p,R,_e,re,u,o),I=new SM(p,re,Ee),ie=new zy(Z,Le,Oe,Ee),ve=new jy(Z,Le,Oe,Ee),Oe.programs=se.programs,p.capabilities=Ee,p.extensions=Le,p.properties=De,p.renderLists=ue,p.shadowMap=I,p.state=_e,p.info=Oe}fe();const he=new RM(p,Z);this.xr=he,this.getContext=function(){return Z},this.getContextAttributes=function(){return Z.getContextAttributes()},this.forceContextLoss=function(){const S=Le.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Le.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(S){S!==void 0&&(F=S,this.setSize(C,N,!1))},this.getSize=function(S){return S.set(C,N)},this.setSize=function(S,U,$){if(he.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}C=S,N=U,e.width=Math.floor(S*F),e.height=Math.floor(U*F),$!==!1&&(e.style.width=S+"px",e.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(C*F,N*F).floor()},this.setDrawingBufferSize=function(S,U,$){C=S,N=U,F=$,e.width=Math.floor(S*$),e.height=Math.floor(U*$),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(D)},this.getViewport=function(S){return S.copy(z)},this.setViewport=function(S,U,$,V){S.isVector4?z.set(S.x,S.y,S.z,S.w):z.set(S,U,$,V),_e.viewport(D.copy(z).multiplyScalar(F).floor())},this.getScissor=function(S){return S.copy(ee)},this.setScissor=function(S,U,$,V){S.isVector4?ee.set(S.x,S.y,S.z,S.w):ee.set(S,U,$,V),_e.scissor(O.copy(ee).multiplyScalar(F).floor())},this.getScissorTest=function(){return G},this.setScissorTest=function(S){_e.setScissorTest(G=S)},this.setOpaqueSort=function(S){H=S},this.setTransparentSort=function(S){te=S},this.getClearColor=function(S){return S.copy(B.getClearColor())},this.setClearColor=function(){B.setClearColor.apply(B,arguments)},this.getClearAlpha=function(){return B.getClearAlpha()},this.setClearAlpha=function(){B.setClearAlpha.apply(B,arguments)},this.clear=function(S=!0,U=!0,$=!0){let V=0;S&&(V|=16384),U&&(V|=256),$&&(V|=1024),Z.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",L,!1),e.removeEventListener("webglcontextrestored",de,!1),e.removeEventListener("webglcontextcreationerror",pe,!1),ue.dispose(),v.dispose(),De.dispose(),R.dispose(),k.dispose(),re.dispose(),X.dispose(),se.dispose(),he.dispose(),he.removeEventListener("sessionstart",We),he.removeEventListener("sessionend",qe),J&&(J.dispose(),J=null),mt.stop()};function L(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),d=!0}function de(){console.log("THREE.WebGLRenderer: Context Restored."),d=!1;const S=Oe.autoReset,U=I.enabled,$=I.autoUpdate,V=I.needsUpdate,ne=I.type;fe(),Oe.autoReset=S,I.enabled=U,I.autoUpdate=$,I.needsUpdate=V,I.type=ne}function pe(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function be(S){const U=S.target;U.removeEventListener("dispose",be),me(U)}function me(S){Me(S),De.remove(S)}function Me(S){const U=De.get(S).programs;U!==void 0&&(U.forEach(function($){se.releaseProgram($)}),S.isShaderMaterial&&se.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,$,V,ne,Te){U===null&&(U=ye);const Re=ne.isMesh&&ne.matrixWorld.determinant()<0,Fe=cd(S,U,$,V,ne);_e.setMaterial(V,Re);let Ie=$.index;const je=$.attributes.position;if(Ie===null){if(je===void 0||je.count===0)return}else if(Ie.count===0)return;let Ue=1;V.wireframe===!0&&(Ie=Q.getWireframeAttribute($),Ue=2),X.setup(ne,V,Fe,$,Ie);let ke,Ze=ie;Ie!==null&&(ke=K.get(Ie),Ze=ve,Ze.setIndex(ke));const Jn=Ie!==null?Ie.count:je.count,Li=$.drawRange.start*Ue,Di=$.drawRange.count*Ue,nn=Te!==null?Te.start*Ue:0,Ge=Te!==null?Te.count*Ue:1/0,Ri=Math.max(Li,nn),et=Math.min(Jn,Li+Di,nn+Ge)-1,rn=Math.max(0,et-Ri+1);if(rn!==0){if(ne.isMesh)V.wireframe===!0?(_e.setLineWidth(V.wireframeLinewidth*we()),Ze.setMode(1)):Ze.setMode(4);else if(ne.isLine){let Ln=V.linewidth;Ln===void 0&&(Ln=1),_e.setLineWidth(Ln*we()),ne.isLineSegments?Ze.setMode(1):ne.isLineLoop?Ze.setMode(2):Ze.setMode(3)}else ne.isPoints?Ze.setMode(0):ne.isSprite&&Ze.setMode(4);if(ne.isInstancedMesh)Ze.renderInstances(Ri,rn,ne.count);else if($.isInstancedBufferGeometry){const Ln=Math.min($.instanceCount,$._maxInstanceCount);Ze.renderInstances(Ri,rn,Ln)}else Ze.render(Ri,rn)}},this.compile=function(S,U){h=v.get(S),h.init(),_.push(h),S.traverseVisible(function($){$.isLight&&$.layers.test(U.layers)&&(h.pushLight($),$.castShadow&&h.pushShadow($))}),h.setupLights(p.physicallyCorrectLights),S.traverse(function($){const V=$.material;if(V)if(Array.isArray(V))for(let ne=0;ne<V.length;ne++){const Te=V[ne];Do(Te,S,$)}else Do(V,S,$)}),_.pop(),h=null};let ge=null;function Ae(S){ge&&ge(S)}function We(){mt.stop()}function qe(){mt.start()}const mt=new Zh;mt.setAnimationLoop(Ae),typeof self!="undefined"&&mt.setContext(self),this.setAnimationLoop=function(S){ge=S,he.setAnimationLoop(S),S===null?mt.stop():mt.start()},he.addEventListener("sessionstart",We),he.addEventListener("sessionend",qe),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(d===!0)return;S.autoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.updateMatrixWorld(),he.enabled===!0&&he.isPresenting===!0&&(he.cameraAutoUpdate===!0&&he.updateCamera(U),U=he.getCamera()),S.isScene===!0&&S.onBeforeRender(p,S,U,A),h=v.get(S,_.length),h.init(),_.push(h),ce.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),j.setFromProjectionMatrix(ce),W=this.localClippingEnabled,q=x.init(this.clippingPlanes,W,U),f=ue.get(S,m.length),f.init(),m.push(f),tn(S,U,0,p.sortObjects),f.finish(),p.sortObjects===!0&&f.sort(H,te),q===!0&&x.beginShadows();const $=h.state.shadowsArray;if(I.render($,S,U),q===!0&&x.endShadows(),this.info.autoReset===!0&&this.info.reset(),B.render(f,S),h.setupLights(p.physicallyCorrectLights),U.isArrayCamera){const V=U.cameras;for(let ne=0,Te=V.length;ne<Te;ne++){const Re=V[ne];Xl(f,S,Re,Re.viewport)}}else Xl(f,S,U);A!==null&&(T.updateMultisampleRenderTarget(A),T.updateRenderTargetMipmap(A)),S.isScene===!0&&S.onAfterRender(p,S,U),X.resetDefaultState(),E=-1,w=null,_.pop(),_.length>0?h=_[_.length-1]:h=null,m.pop(),m.length>0?f=m[m.length-1]:f=null};function tn(S,U,$,V){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)$=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)h.pushLight(S),S.castShadow&&h.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||j.intersectsSprite(S)){V&&ae.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ce);const Re=re.update(S),Fe=S.material;Fe.visible&&f.push(S,Re,Fe,$,ae.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(S.isSkinnedMesh&&S.skeleton.frame!==Oe.render.frame&&(S.skeleton.update(),S.skeleton.frame=Oe.render.frame),!S.frustumCulled||j.intersectsObject(S))){V&&ae.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ce);const Re=re.update(S),Fe=S.material;if(Array.isArray(Fe)){const Ie=Re.groups;for(let je=0,Ue=Ie.length;je<Ue;je++){const ke=Ie[je],Ze=Fe[ke.materialIndex];Ze&&Ze.visible&&f.push(S,Re,Ze,$,ae.z,ke)}}else Fe.visible&&f.push(S,Re,Fe,$,ae.z,null)}}const Te=S.children;for(let Re=0,Fe=Te.length;Re<Fe;Re++)tn(Te[Re],U,$,V)}function Xl(S,U,$,V){const ne=S.opaque,Te=S.transmissive,Re=S.transparent;h.setupLightsView($),Te.length>0&&ad(ne,U,$),V&&_e.viewport(D.copy(V)),ne.length>0&&as(ne,U,$),Te.length>0&&as(Te,U,$),Re.length>0&&as(Re,U,$),_e.buffers.depth.setTest(!0),_e.buffers.depth.setMask(!0),_e.buffers.color.setMask(!0),_e.setPolygonOffset(!1)}function ad(S,U,$){const V=Ee.isWebGL2;J===null&&(J=new Mi(1,1,{generateMipmaps:!0,type:Le.has("EXT_color_buffer_half_float")?rs:yi,minFilter:Ao,samples:V&&s===!0?4:0})),p.getDrawingBufferSize(oe),V?J.setSize(oe.x,oe.y):J.setSize(rl(oe.x),rl(oe.y));const ne=p.getRenderTarget();p.setRenderTarget(J),p.clear();const Te=p.toneMapping;p.toneMapping=En,as(S,U,$),p.toneMapping=Te,T.updateMultisampleRenderTarget(J),T.updateRenderTargetMipmap(J),p.setRenderTarget(ne)}function as(S,U,$){const V=U.isScene===!0?U.overrideMaterial:null;for(let ne=0,Te=S.length;ne<Te;ne++){const Re=S[ne],Fe=Re.object,Ie=Re.geometry,je=V===null?Re.material:V,Ue=Re.group;Fe.layers.test($.layers)&&ld(Fe,U,$,Ie,je,Ue)}}function ld(S,U,$,V,ne,Te){S.onBeforeRender(p,U,$,V,ne,Te),S.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),ne.onBeforeRender(p,U,$,V,S,Te),ne.transparent===!0&&ne.side===pr?(ne.side=Qt,ne.needsUpdate=!0,p.renderBufferDirect($,U,V,ne,S,Te),ne.side=is,ne.needsUpdate=!0,p.renderBufferDirect($,U,V,ne,S,Te),ne.side=pr):p.renderBufferDirect($,U,V,ne,S,Te),S.onAfterRender(p,U,$,V,ne,Te)}function Do(S,U,$){U.isScene!==!0&&(U=ye);const V=De.get(S),ne=h.state.lights,Te=h.state.shadowsArray,Re=ne.state.version,Fe=se.getParameters(S,ne.state,Te,U,$),Ie=se.getProgramCacheKey(Fe);let je=V.programs;V.environment=S.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(S.isMeshStandardMaterial?k:R).get(S.envMap||V.environment),je===void 0&&(S.addEventListener("dispose",be),je=new Map,V.programs=je);let Ue=je.get(Ie);if(Ue!==void 0){if(V.currentProgram===Ue&&V.lightsStateVersion===Re)return $l(S,Fe),Ue}else Fe.uniforms=se.getUniforms(S),S.onBuild($,Fe,p),S.onBeforeCompile(Fe,p),Ue=se.acquireProgram(Fe,Ie),je.set(Ie,Ue),V.uniforms=Fe.uniforms;const ke=V.uniforms;(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(ke.clippingPlanes=x.uniform),$l(S,Fe),V.needsLights=fd(S),V.lightsStateVersion=Re,V.needsLights&&(ke.ambientLightColor.value=ne.state.ambient,ke.lightProbe.value=ne.state.probe,ke.directionalLights.value=ne.state.directional,ke.directionalLightShadows.value=ne.state.directionalShadow,ke.spotLights.value=ne.state.spot,ke.spotLightShadows.value=ne.state.spotShadow,ke.rectAreaLights.value=ne.state.rectArea,ke.ltc_1.value=ne.state.rectAreaLTC1,ke.ltc_2.value=ne.state.rectAreaLTC2,ke.pointLights.value=ne.state.point,ke.pointLightShadows.value=ne.state.pointShadow,ke.hemisphereLights.value=ne.state.hemi,ke.directionalShadowMap.value=ne.state.directionalShadowMap,ke.directionalShadowMatrix.value=ne.state.directionalShadowMatrix,ke.spotShadowMap.value=ne.state.spotShadowMap,ke.spotShadowMatrix.value=ne.state.spotShadowMatrix,ke.pointShadowMap.value=ne.state.pointShadowMap,ke.pointShadowMatrix.value=ne.state.pointShadowMatrix);const Ze=Ue.getUniforms(),Jn=Ks.seqWithValue(Ze.seq,ke);return V.currentProgram=Ue,V.uniformsList=Jn,Ue}function $l(S,U){const $=De.get(S);$.outputEncoding=U.outputEncoding,$.instancing=U.instancing,$.skinning=U.skinning,$.morphTargets=U.morphTargets,$.morphNormals=U.morphNormals,$.morphColors=U.morphColors,$.morphTargetsCount=U.morphTargetsCount,$.numClippingPlanes=U.numClippingPlanes,$.numIntersection=U.numClipIntersection,$.vertexAlphas=U.vertexAlphas,$.vertexTangents=U.vertexTangents,$.toneMapping=U.toneMapping}function cd(S,U,$,V,ne){U.isScene!==!0&&(U=ye),T.resetTextureUnits();const Te=U.fog,Re=V.isMeshStandardMaterial?U.environment:null,Fe=A===null?p.outputEncoding:A.isXRRenderTarget===!0?A.texture.encoding:bi,Ie=(V.isMeshStandardMaterial?k:R).get(V.envMap||Re),je=V.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Ue=!!V.normalMap&&!!$.attributes.tangent,ke=!!$.morphAttributes.position,Ze=!!$.morphAttributes.normal,Jn=!!$.morphAttributes.color,Li=V.toneMapped?p.toneMapping:En,Di=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,nn=Di!==void 0?Di.length:0,Ge=De.get(V),Ri=h.state.lights;if(q===!0&&(W===!0||S!==w)){const sn=S===w&&V.id===E;x.setState(V,S,sn)}let et=!1;V.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==Ri.state.version||Ge.outputEncoding!==Fe||ne.isInstancedMesh&&Ge.instancing===!1||!ne.isInstancedMesh&&Ge.instancing===!0||ne.isSkinnedMesh&&Ge.skinning===!1||!ne.isSkinnedMesh&&Ge.skinning===!0||Ge.envMap!==Ie||V.fog===!0&&Ge.fog!==Te||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==x.numPlanes||Ge.numIntersection!==x.numIntersection)||Ge.vertexAlphas!==je||Ge.vertexTangents!==Ue||Ge.morphTargets!==ke||Ge.morphNormals!==Ze||Ge.morphColors!==Jn||Ge.toneMapping!==Li||Ee.isWebGL2===!0&&Ge.morphTargetsCount!==nn)&&(et=!0):(et=!0,Ge.__version=V.version);let rn=Ge.currentProgram;et===!0&&(rn=Do(V,U,ne));let Ln=!1,Ar=!1,Ro=!1;const gt=rn.getUniforms(),Cr=Ge.uniforms;if(_e.useProgram(rn.program)&&(Ln=!0,Ar=!0,Ro=!0),V.id!==E&&(E=V.id,Ar=!0),Ln||w!==S){if(gt.setValue(Z,"projectionMatrix",S.projectionMatrix),Ee.logarithmicDepthBuffer&&gt.setValue(Z,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),w!==S&&(w=S,Ar=!0,Ro=!0),V.isShaderMaterial||V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshStandardMaterial||V.envMap){const sn=gt.map.cameraPosition;sn!==void 0&&sn.setValue(Z,ae.setFromMatrixPosition(S.matrixWorld))}(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&gt.setValue(Z,"isOrthographic",S.isOrthographicCamera===!0),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial||V.isShadowMaterial||ne.isSkinnedMesh)&&gt.setValue(Z,"viewMatrix",S.matrixWorldInverse)}if(ne.isSkinnedMesh){gt.setOptional(Z,ne,"bindMatrix"),gt.setOptional(Z,ne,"bindMatrixInverse");const sn=ne.skeleton;sn&&(Ee.floatVertexTextures?(sn.boneTexture===null&&sn.computeBoneTexture(),gt.setValue(Z,"boneTexture",sn.boneTexture,T),gt.setValue(Z,"boneTextureSize",sn.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Po=$.morphAttributes;return(Po.position!==void 0||Po.normal!==void 0||Po.color!==void 0&&Ee.isWebGL2===!0)&&Y.update(ne,$,V,rn),(Ar||Ge.receiveShadow!==ne.receiveShadow)&&(Ge.receiveShadow=ne.receiveShadow,gt.setValue(Z,"receiveShadow",ne.receiveShadow)),Ar&&(gt.setValue(Z,"toneMappingExposure",p.toneMappingExposure),Ge.needsLights&&ud(Cr,Ro),Te&&V.fog===!0&&le.refreshFogUniforms(Cr,Te),le.refreshMaterialUniforms(Cr,V,F,N,J),Ks.upload(Z,Ge.uniformsList,Cr,T)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Ks.upload(Z,Ge.uniformsList,Cr,T),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&gt.setValue(Z,"center",ne.center),gt.setValue(Z,"modelViewMatrix",ne.modelViewMatrix),gt.setValue(Z,"normalMatrix",ne.normalMatrix),gt.setValue(Z,"modelMatrix",ne.matrixWorld),rn}function ud(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function fd(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return g},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(S,U,$){De.get(S.texture).__webglTexture=U,De.get(S.depthTexture).__webglTexture=$;const V=De.get(S);V.__hasExternalTextures=!0,V.__hasExternalTextures&&(V.__autoAllocateDepthBuffer=$===void 0,V.__autoAllocateDepthBuffer||Le.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,U){const $=De.get(S);$.__webglFramebuffer=U,$.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,$=0){A=S,g=U,M=$;let V=!0;if(S){const Ie=De.get(S);Ie.__useDefaultFramebuffer!==void 0?(_e.bindFramebuffer(36160,null),V=!1):Ie.__webglFramebuffer===void 0?T.setupRenderTarget(S):Ie.__hasExternalTextures&&T.rebindTextures(S,De.get(S.texture).__webglTexture,De.get(S.depthTexture).__webglTexture)}let ne=null,Te=!1,Re=!1;if(S){const Ie=S.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture)&&(Re=!0);const je=De.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(ne=je[U],Te=!0):Ee.isWebGL2&&S.samples>0&&T.useMultisampledRTT(S)===!1?ne=De.get(S).__webglMultisampledFramebuffer:ne=je,D.copy(S.viewport),O.copy(S.scissor),y=S.scissorTest}else D.copy(z).multiplyScalar(F).floor(),O.copy(ee).multiplyScalar(F).floor(),y=G;if(_e.bindFramebuffer(36160,ne)&&Ee.drawBuffers&&V&&_e.drawBuffers(S,ne),_e.viewport(D),_e.scissor(O),_e.setScissorTest(y),Te){const Ie=De.get(S.texture);Z.framebufferTexture2D(36160,36064,34069+U,Ie.__webglTexture,$)}else if(Re){const Ie=De.get(S.texture),je=U||0;Z.framebufferTextureLayer(36160,36064,Ie.__webglTexture,$||0,je)}E=-1},this.readRenderTargetPixels=function(S,U,$,V,ne,Te,Re){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=De.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Re!==void 0&&(Fe=Fe[Re]),Fe){_e.bindFramebuffer(36160,Fe);try{const Ie=S.texture,je=Ie.format,Ue=Ie.type;if(je!==hn&&b.convert(je)!==Z.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ke=Ue===rs&&(Le.has("EXT_color_buffer_half_float")||Ee.isWebGL2&&Le.has("EXT_color_buffer_float"));if(Ue!==yi&&b.convert(Ue)!==Z.getParameter(35738)&&!(Ue===pi&&(Ee.isWebGL2||Le.has("OES_texture_float")||Le.has("WEBGL_color_buffer_float")))&&!ke){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-V&&$>=0&&$<=S.height-ne&&Z.readPixels(U,$,V,ne,b.convert(je),b.convert(Ue),Te)}finally{const Ie=A!==null?De.get(A).__webglFramebuffer:null;_e.bindFramebuffer(36160,Ie)}}},this.copyFramebufferToTexture=function(S,U,$=0){const V=Math.pow(2,-$),ne=Math.floor(U.image.width*V),Te=Math.floor(U.image.height*V);T.setTexture2D(U,0),Z.copyTexSubImage2D(3553,$,0,0,S.x,S.y,ne,Te),_e.unbindTexture()},this.copyTextureToTexture=function(S,U,$,V=0){const ne=U.image.width,Te=U.image.height,Re=b.convert($.format),Fe=b.convert($.type);T.setTexture2D($,0),Z.pixelStorei(37440,$.flipY),Z.pixelStorei(37441,$.premultiplyAlpha),Z.pixelStorei(3317,$.unpackAlignment),U.isDataTexture?Z.texSubImage2D(3553,V,S.x,S.y,ne,Te,Re,Fe,U.image.data):U.isCompressedTexture?Z.compressedTexSubImage2D(3553,V,S.x,S.y,U.mipmaps[0].width,U.mipmaps[0].height,Re,U.mipmaps[0].data):Z.texSubImage2D(3553,V,S.x,S.y,Re,Fe,U.image),V===0&&$.generateMipmaps&&Z.generateMipmap(3553),_e.unbindTexture()},this.copyTextureToTexture3D=function(S,U,$,V,ne=0){if(p.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Te=S.max.x-S.min.x+1,Re=S.max.y-S.min.y+1,Fe=S.max.z-S.min.z+1,Ie=b.convert(V.format),je=b.convert(V.type);let Ue;if(V.isData3DTexture)T.setTexture3D(V,0),Ue=32879;else if(V.isDataArrayTexture)T.setTexture2DArray(V,0),Ue=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}Z.pixelStorei(37440,V.flipY),Z.pixelStorei(37441,V.premultiplyAlpha),Z.pixelStorei(3317,V.unpackAlignment);const ke=Z.getParameter(3314),Ze=Z.getParameter(32878),Jn=Z.getParameter(3316),Li=Z.getParameter(3315),Di=Z.getParameter(32877),nn=$.isCompressedTexture?$.mipmaps[0]:$.image;Z.pixelStorei(3314,nn.width),Z.pixelStorei(32878,nn.height),Z.pixelStorei(3316,S.min.x),Z.pixelStorei(3315,S.min.y),Z.pixelStorei(32877,S.min.z),$.isDataTexture||$.isData3DTexture?Z.texSubImage3D(Ue,ne,U.x,U.y,U.z,Te,Re,Fe,Ie,je,nn.data):$.isCompressedTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),Z.compressedTexSubImage3D(Ue,ne,U.x,U.y,U.z,Te,Re,Fe,Ie,nn.data)):Z.texSubImage3D(Ue,ne,U.x,U.y,U.z,Te,Re,Fe,Ie,je,nn),Z.pixelStorei(3314,ke),Z.pixelStorei(32878,Ze),Z.pixelStorei(3316,Jn),Z.pixelStorei(3315,Li),Z.pixelStorei(32877,Di),ne===0&&V.generateMipmaps&&Z.generateMipmap(Ue),_e.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?T.setTextureCube(S,0):S.isData3DTexture?T.setTexture3D(S,0):S.isDataArrayTexture?T.setTexture2DArray(S,0):T.setTexture2D(S,0),_e.unbindTexture()},this.resetState=function(){g=0,M=0,A=null,_e.reset(),X.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class FM extends id{}FM.prototype.isWebGL1Renderer=!0;class NM extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.autoUpdate=e.autoUpdate,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t}}class OM{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=nl,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=Yn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Yn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Yn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const _t=new P;class lo{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r===!0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}setX(e,t){return this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){return this.data.array[e*this.data.stride+this.offset]}getY(e){return this.data.array[e*this.data.stride+this.offset+1]}getZ(e){return this.data.array[e*this.data.stride+this.offset+2]}getW(e){return this.data.array[e*this.data.stride+this.offset+3]}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will deinterleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new en(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new lo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will deinterleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ol extends Ci{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Zi;const Nr=new P,Ki=new P,Ji=new P,Qi=new Se,Or=new Se,rd=new Qe,Ns=new P,zr=new P,Os=new P,Zu=new Se,wa=new Se,Ku=new Se;class Ju extends ft{constructor(e){if(super(),this.isSprite=!0,this.type="Sprite",Zi===void 0){Zi=new Rt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new OM(t,5);Zi.setIndex([0,1,2,0,2,3]),Zi.setAttribute("position",new lo(i,3,0,!1)),Zi.setAttribute("uv",new lo(i,2,3,!1))}this.geometry=Zi,this.material=e!==void 0?e:new ol,this.center=new Se(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ki.setFromMatrixScale(this.matrixWorld),rd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ji.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ki.multiplyScalar(-Ji.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const o=this.center;zs(Ns.set(-.5,-.5,0),Ji,o,Ki,r,s),zs(zr.set(.5,-.5,0),Ji,o,Ki,r,s),zs(Os.set(.5,.5,0),Ji,o,Ki,r,s),Zu.set(0,0),wa.set(1,0),Ku.set(1,1);let a=e.ray.intersectTriangle(Ns,zr,Os,!1,Nr);if(a===null&&(zs(zr.set(-.5,.5,0),Ji,o,Ki,r,s),wa.set(0,1),a=e.ray.intersectTriangle(Ns,Os,zr,!1,Nr),a===null))return;const l=e.ray.origin.distanceTo(Nr);l<e.near||l>e.far||t.push({distance:l,point:Nr.clone(),uv:$t.getUV(Nr,Ns,zr,Os,Zu,wa,Ku,new Se),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function zs(n,e,t,i,r,s){Qi.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(Or.x=s*Qi.x-r*Qi.y,Or.y=r*Qi.x+s*Qi.y):Or.copy(Qi),n.copy(e),n.x+=Or.x,n.y+=Or.y,n.applyMatrix4(rd)}class sd extends Ci{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ve(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Qu=new P,ef=new P,tf=new Qe,Sa=new Ol,Us=new Co;class zM extends ft{constructor(e=new Rt,t=new sd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Qu.fromBufferAttribute(t,r-1),ef.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Qu.distanceTo(ef);e.setAttribute("lineDistance",new rt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Us.copy(i.boundingSphere),Us.applyMatrix4(r),Us.radius+=s,e.ray.intersectsSphere(Us)===!1)return;tf.copy(r).invert(),Sa.copy(e.ray).applyMatrix4(tf);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new P,u=new P,f=new P,h=new P,m=this.isLineSegments?2:1,_=i.index,d=i.attributes.position;if(_!==null){const g=Math.max(0,o.start),M=Math.min(_.count,o.start+o.count);for(let A=g,E=M-1;A<E;A+=m){const w=_.getX(A),D=_.getX(A+1);if(c.fromBufferAttribute(d,w),u.fromBufferAttribute(d,D),Sa.distanceSqToSegment(c,u,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const y=e.ray.origin.distanceTo(h);y<e.near||y>e.far||t.push({distance:y,point:f.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})}}else{const g=Math.max(0,o.start),M=Math.min(d.count,o.start+o.count);for(let A=g,E=M-1;A<E;A+=m){if(c.fromBufferAttribute(d,A),u.fromBufferAttribute(d,A+1),Sa.distanceSqToSegment(c,u,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const D=e.ray.origin.distanceTo(h);D<e.near||D>e.far||t.push({distance:D,point:f.clone().applyMatrix4(this.matrixWorld),index:A,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const nf=new P,rf=new P;class UM extends zM{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)nf.fromBufferAttribute(t,r),rf.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+nf.distanceTo(rf);e.setAttribute("lineDistance",new rt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sf extends Bt{constructor(e,t,i,r,s,o,a,l,c){super(e,t,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Tr extends Rt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],o=[];a(r),c(i),u(),this.setAttribute("position",new rt(s,3)),this.setAttribute("normal",new rt(s.slice(),3)),this.setAttribute("uv",new rt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const A=new P,E=new P,w=new P;for(let D=0;D<t.length;D+=3)m(t[D+0],A),m(t[D+1],E),m(t[D+2],w),l(A,E,w,M)}function l(M,A,E,w){const D=w+1,O=[];for(let y=0;y<=D;y++){O[y]=[];const C=M.clone().lerp(E,y/D),N=A.clone().lerp(E,y/D),F=D-y;for(let H=0;H<=F;H++)H===0&&y===D?O[y][H]=C:O[y][H]=C.clone().lerp(N,H/F)}for(let y=0;y<D;y++)for(let C=0;C<2*(D-y)-1;C++){const N=Math.floor(C/2);C%2===0?(h(O[y][N+1]),h(O[y+1][N]),h(O[y][N])):(h(O[y][N+1]),h(O[y+1][N+1]),h(O[y+1][N]))}}function c(M){const A=new P;for(let E=0;E<s.length;E+=3)A.x=s[E+0],A.y=s[E+1],A.z=s[E+2],A.normalize().multiplyScalar(M),s[E+0]=A.x,s[E+1]=A.y,s[E+2]=A.z}function u(){const M=new P;for(let A=0;A<s.length;A+=3){M.x=s[A+0],M.y=s[A+1],M.z=s[A+2];const E=d(M)/2/Math.PI+.5,w=g(M)/Math.PI+.5;o.push(E,1-w)}_(),f()}function f(){for(let M=0;M<o.length;M+=6){const A=o[M+0],E=o[M+2],w=o[M+4],D=Math.max(A,E,w),O=Math.min(A,E,w);D>.9&&O<.1&&(A<.2&&(o[M+0]+=1),E<.2&&(o[M+2]+=1),w<.2&&(o[M+4]+=1))}}function h(M){s.push(M.x,M.y,M.z)}function m(M,A){const E=M*3;A.x=e[E+0],A.y=e[E+1],A.z=e[E+2]}function _(){const M=new P,A=new P,E=new P,w=new P,D=new Se,O=new Se,y=new Se;for(let C=0,N=0;C<s.length;C+=9,N+=6){M.set(s[C+0],s[C+1],s[C+2]),A.set(s[C+3],s[C+4],s[C+5]),E.set(s[C+6],s[C+7],s[C+8]),D.set(o[N+0],o[N+1]),O.set(o[N+2],o[N+3]),y.set(o[N+4],o[N+5]),w.copy(M).add(A).add(E).divideScalar(3);const F=d(w);p(D,N+0,M,F),p(O,N+2,A,F),p(y,N+4,E,F)}}function p(M,A,E,w){w<0&&M.x===1&&(o[A]=M.x-1),E.x===0&&E.z===0&&(o[A]=w/2/Math.PI+.5)}function d(M){return Math.atan2(M.z,-M.x)}function g(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}static fromJSON(e){return new Tr(e.vertices,e.indices,e.radius,e.details)}}class Gl extends Tr{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Gl(e.radius,e.detail)}}const Bs=new P,ks=new P,Ea=new P,Hs=new $t;class BM extends Rt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const r=Math.pow(10,4),s=Math.cos(Ys*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],f=new Array(3),h={},m=[];for(let _=0;_<l;_+=3){o?(c[0]=o.getX(_),c[1]=o.getX(_+1),c[2]=o.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:p,b:d,c:g}=Hs;if(p.fromBufferAttribute(a,c[0]),d.fromBufferAttribute(a,c[1]),g.fromBufferAttribute(a,c[2]),Hs.getNormal(Ea),f[0]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,f[1]=`${Math.round(d.x*r)},${Math.round(d.y*r)},${Math.round(d.z*r)}`,f[2]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let M=0;M<3;M++){const A=(M+1)%3,E=f[M],w=f[A],D=Hs[u[M]],O=Hs[u[A]],y=`${E}_${w}`,C=`${w}_${E}`;C in h&&h[C]?(Ea.dot(h[C].normal)<=s&&(m.push(D.x,D.y,D.z),m.push(O.x,O.y,O.z)),h[C]=null):y in h||(h[y]={index0:c[M],index1:c[A],normal:Ea.clone()})}}for(const _ in h)if(h[_]){const{index0:p,index1:d}=h[_];Bs.fromBufferAttribute(a,p),ks.fromBufferAttribute(a,d),m.push(Bs.x,Bs.y,Bs.z),m.push(ks.x,ks.y,ks.z)}this.setAttribute("position",new rt(m,3))}}}class Vl extends Tr{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Vl(e.radius,e.detail)}}class Wl extends Tr{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Wl(e.radius,e.detail)}}class Kr extends Rt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new P,h=new P,m=[],_=[],p=[],d=[];for(let g=0;g<=i;g++){const M=[],A=g/i;let E=0;g==0&&o==0?E=.5/t:g==i&&l==Math.PI&&(E=-.5/t);for(let w=0;w<=t;w++){const D=w/t;f.x=-e*Math.cos(r+D*s)*Math.sin(o+A*a),f.y=e*Math.cos(o+A*a),f.z=e*Math.sin(r+D*s)*Math.sin(o+A*a),_.push(f.x,f.y,f.z),h.copy(f).normalize(),p.push(h.x,h.y,h.z),d.push(D+E,1-A),M.push(c++)}u.push(M)}for(let g=0;g<i;g++)for(let M=0;M<t;M++){const A=u[g][M+1],E=u[g][M],w=u[g+1][M],D=u[g+1][M+1];(g!==0||o>0)&&m.push(A,E,D),(g!==i-1||l<Math.PI)&&m.push(E,w,D)}this.setIndex(m),this.setAttribute("position",new rt(_,3)),this.setAttribute("normal",new rt(p,3)),this.setAttribute("uv",new rt(d,2))}static fromJSON(e){return new Kr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ql extends Tr{constructor(e=1,t=0){const i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],r=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,r,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ql(e.radius,e.detail)}}class jl extends Rt{constructor(e=1,t=.4,i=8,r=6,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new P,f=new P,h=new P;for(let m=0;m<=i;m++)for(let _=0;_<=r;_++){const p=_/r*s,d=m/i*Math.PI*2;f.x=(e+t*Math.cos(d))*Math.cos(p),f.y=(e+t*Math.cos(d))*Math.sin(p),f.z=t*Math.sin(d),a.push(f.x,f.y,f.z),u.x=e*Math.cos(p),u.y=e*Math.sin(p),h.subVectors(f,u).normalize(),l.push(h.x,h.y,h.z),c.push(_/r),c.push(m/i)}for(let m=1;m<=i;m++)for(let _=1;_<=r;_++){const p=(r+1)*m+_-1,d=(r+1)*(m-1)+_-1,g=(r+1)*(m-1)+_,M=(r+1)*m+_;o.push(p,d,M),o.push(d,g,M)}this.setIndex(o),this.setAttribute("position",new rt(a,3)),this.setAttribute("normal",new rt(l,3)),this.setAttribute("uv",new rt(c,2))}static fromJSON(e){return new jl(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class kM extends Ci{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=kh,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class od extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class HM extends od{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DefaultUp),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const of=new Qe,af=new P,lf=new P;class GM{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bl,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;af.setFromMatrixPosition(e.matrixWorld),t.position.copy(af),lf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(lf),t.updateMatrixWorld(),of.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(of),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(t.projectionMatrix),i.multiply(t.matrixWorldInverse)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class VM extends GM{constructor(){super(new Kh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class WM extends od{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DefaultUp),this.updateMatrix(),this.target=new ft,this.shadow=new VM}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class qM{constructor(e,t,i=0,r=1/0){this.ray=new Ol(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new zl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return al(e,this,i,t),i.sort(cf),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)al(e[r],this,i,t);return i.sort(cf),i}}function cf(n,e){return n.distance-e.distance}function al(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const r=n.children;for(let s=0,o=r.length;s<o;s++)al(r[s],e,t,!0)}}class uf{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(St(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Nl}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Nl);const ff={type:"change"},Ta={type:"start"},hf={type:"end"};class jM extends Ai{constructor(e,t){super(),t===void 0&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),t===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Fi.ROTATE,MIDDLE:Fi.DOLLY,RIGHT:Fi.PAN},this.touches={ONE:Ni.ROTATE,TWO:Ni.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(b){b.addEventListener("keydown",ue),this._domElementKeyEvents=b},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(ff),i.update(),s=r.NONE},this.update=function(){const b=new P,X=new wi().setFromUnitVectors(e.up,new P(0,1,0)),fe=X.clone().invert(),he=new P,L=new wi,de=2*Math.PI;return function(){const be=i.object.position;b.copy(be).sub(i.target),b.applyQuaternion(X),a.setFromVector3(b),i.autoRotate&&s===r.NONE&&C(O()),i.enableDamping?(a.theta+=l.theta*i.dampingFactor,a.phi+=l.phi*i.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let me=i.minAzimuthAngle,Me=i.maxAzimuthAngle;return isFinite(me)&&isFinite(Me)&&(me<-Math.PI?me+=de:me>Math.PI&&(me-=de),Me<-Math.PI?Me+=de:Me>Math.PI&&(Me-=de),me<=Me?a.theta=Math.max(me,Math.min(Me,a.theta)):a.theta=a.theta>(me+Me)/2?Math.max(me,a.theta):Math.min(Me,a.theta)),a.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,a.phi)),a.makeSafe(),a.radius*=c,a.radius=Math.max(i.minDistance,Math.min(i.maxDistance,a.radius)),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),b.setFromSpherical(a),b.applyQuaternion(fe),be.copy(i.target).add(b),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),c=1,f||he.distanceToSquared(i.object.position)>o||8*(1-L.dot(i.object.quaternion))>o?(i.dispatchEvent(ff),he.copy(i.object.position),L.copy(i.object.quaternion),f=!1,!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",I),i.domElement.removeEventListener("pointerdown",R),i.domElement.removeEventListener("pointercancel",Q),i.domElement.removeEventListener("wheel",le),i.domElement.removeEventListener("pointermove",k),i.domElement.removeEventListener("pointerup",K),i._domElementKeyEvents!==null&&i._domElementKeyEvents.removeEventListener("keydown",ue)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const o=1e-6,a=new uf,l=new uf;let c=1;const u=new P;let f=!1;const h=new Se,m=new Se,_=new Se,p=new Se,d=new Se,g=new Se,M=new Se,A=new Se,E=new Se,w=[],D={};function O(){return 2*Math.PI/60/60*i.autoRotateSpeed}function y(){return Math.pow(.95,i.zoomSpeed)}function C(b){l.theta-=b}function N(b){l.phi-=b}const F=function(){const b=new P;return function(fe,he){b.setFromMatrixColumn(he,0),b.multiplyScalar(-fe),u.add(b)}}(),H=function(){const b=new P;return function(fe,he){i.screenSpacePanning===!0?b.setFromMatrixColumn(he,1):(b.setFromMatrixColumn(he,0),b.crossVectors(i.object.up,b)),b.multiplyScalar(fe),u.add(b)}}(),te=function(){const b=new P;return function(fe,he){const L=i.domElement;if(i.object.isPerspectiveCamera){const de=i.object.position;b.copy(de).sub(i.target);let pe=b.length();pe*=Math.tan(i.object.fov/2*Math.PI/180),F(2*fe*pe/L.clientHeight,i.object.matrix),H(2*he*pe/L.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(F(fe*(i.object.right-i.object.left)/i.object.zoom/L.clientWidth,i.object.matrix),H(he*(i.object.top-i.object.bottom)/i.object.zoom/L.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function z(b){i.object.isPerspectiveCamera?c/=b:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom*b)),i.object.updateProjectionMatrix(),f=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function ee(b){i.object.isPerspectiveCamera?c*=b:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/b)),i.object.updateProjectionMatrix(),f=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function G(b){h.set(b.clientX,b.clientY)}function j(b){M.set(b.clientX,b.clientY)}function q(b){p.set(b.clientX,b.clientY)}function W(b){m.set(b.clientX,b.clientY),_.subVectors(m,h).multiplyScalar(i.rotateSpeed);const X=i.domElement;C(2*Math.PI*_.x/X.clientHeight),N(2*Math.PI*_.y/X.clientHeight),h.copy(m),i.update()}function J(b){A.set(b.clientX,b.clientY),E.subVectors(A,M),E.y>0?z(y()):E.y<0&&ee(y()),M.copy(A),i.update()}function ce(b){d.set(b.clientX,b.clientY),g.subVectors(d,p).multiplyScalar(i.panSpeed),te(g.x,g.y),p.copy(d),i.update()}function oe(b){b.deltaY<0?ee(y()):b.deltaY>0&&z(y()),i.update()}function ae(b){let X=!1;switch(b.code){case i.keys.UP:te(0,i.keyPanSpeed),X=!0;break;case i.keys.BOTTOM:te(0,-i.keyPanSpeed),X=!0;break;case i.keys.LEFT:te(i.keyPanSpeed,0),X=!0;break;case i.keys.RIGHT:te(-i.keyPanSpeed,0),X=!0;break}X&&(b.preventDefault(),i.update())}function ye(){if(w.length===1)h.set(w[0].pageX,w[0].pageY);else{const b=.5*(w[0].pageX+w[1].pageX),X=.5*(w[0].pageY+w[1].pageY);h.set(b,X)}}function we(){if(w.length===1)p.set(w[0].pageX,w[0].pageY);else{const b=.5*(w[0].pageX+w[1].pageX),X=.5*(w[0].pageY+w[1].pageY);p.set(b,X)}}function Z(){const b=w[0].pageX-w[1].pageX,X=w[0].pageY-w[1].pageY,fe=Math.sqrt(b*b+X*X);M.set(0,fe)}function He(){i.enableZoom&&Z(),i.enablePan&&we()}function Le(){i.enableZoom&&Z(),i.enableRotate&&ye()}function Ee(b){if(w.length==1)m.set(b.pageX,b.pageY);else{const fe=ve(b),he=.5*(b.pageX+fe.x),L=.5*(b.pageY+fe.y);m.set(he,L)}_.subVectors(m,h).multiplyScalar(i.rotateSpeed);const X=i.domElement;C(2*Math.PI*_.x/X.clientHeight),N(2*Math.PI*_.y/X.clientHeight),h.copy(m)}function _e(b){if(w.length===1)d.set(b.pageX,b.pageY);else{const X=ve(b),fe=.5*(b.pageX+X.x),he=.5*(b.pageY+X.y);d.set(fe,he)}g.subVectors(d,p).multiplyScalar(i.panSpeed),te(g.x,g.y),p.copy(d)}function Oe(b){const X=ve(b),fe=b.pageX-X.x,he=b.pageY-X.y,L=Math.sqrt(fe*fe+he*he);A.set(0,L),E.set(0,Math.pow(A.y/M.y,i.zoomSpeed)),z(E.y),M.copy(A)}function De(b){i.enableZoom&&Oe(b),i.enablePan&&_e(b)}function T(b){i.enableZoom&&Oe(b),i.enableRotate&&Ee(b)}function R(b){i.enabled!==!1&&(w.length===0&&(i.domElement.setPointerCapture(b.pointerId),i.domElement.addEventListener("pointermove",k),i.domElement.addEventListener("pointerup",K)),B(b),b.pointerType==="touch"?v(b):re(b))}function k(b){i.enabled!==!1&&(b.pointerType==="touch"?x(b):se(b))}function K(b){Y(b),w.length===0&&(i.domElement.releasePointerCapture(b.pointerId),i.domElement.removeEventListener("pointermove",k),i.domElement.removeEventListener("pointerup",K)),i.dispatchEvent(hf),s=r.NONE}function Q(b){Y(b)}function re(b){let X;switch(b.button){case 0:X=i.mouseButtons.LEFT;break;case 1:X=i.mouseButtons.MIDDLE;break;case 2:X=i.mouseButtons.RIGHT;break;default:X=-1}switch(X){case Fi.DOLLY:if(i.enableZoom===!1)return;j(b),s=r.DOLLY;break;case Fi.ROTATE:if(b.ctrlKey||b.metaKey||b.shiftKey){if(i.enablePan===!1)return;q(b),s=r.PAN}else{if(i.enableRotate===!1)return;G(b),s=r.ROTATE}break;case Fi.PAN:if(b.ctrlKey||b.metaKey||b.shiftKey){if(i.enableRotate===!1)return;G(b),s=r.ROTATE}else{if(i.enablePan===!1)return;q(b),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Ta)}function se(b){if(i.enabled!==!1)switch(s){case r.ROTATE:if(i.enableRotate===!1)return;W(b);break;case r.DOLLY:if(i.enableZoom===!1)return;J(b);break;case r.PAN:if(i.enablePan===!1)return;ce(b);break}}function le(b){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(b.preventDefault(),i.dispatchEvent(Ta),oe(b),i.dispatchEvent(hf))}function ue(b){i.enabled===!1||i.enablePan===!1||ae(b)}function v(b){switch(ie(b),w.length){case 1:switch(i.touches.ONE){case Ni.ROTATE:if(i.enableRotate===!1)return;ye(),s=r.TOUCH_ROTATE;break;case Ni.PAN:if(i.enablePan===!1)return;we(),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case Ni.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;He(),s=r.TOUCH_DOLLY_PAN;break;case Ni.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Le(),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(Ta)}function x(b){switch(ie(b),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Ee(b),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;_e(b),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;De(b),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;T(b),i.update();break;default:s=r.NONE}}function I(b){i.enabled!==!1&&b.preventDefault()}function B(b){w.push(b)}function Y(b){delete D[b.pointerId];for(let X=0;X<w.length;X++)if(w[X].pointerId==b.pointerId){w.splice(X,1);return}}function ie(b){let X=D[b.pointerId];X===void 0&&(X=new Se,D[b.pointerId]=X),X.set(b.pageX,b.pageY)}function ve(b){const X=b.pointerId===w[0].pointerId?w[1]:w[0];return D[X.pointerId]}i.domElement.addEventListener("contextmenu",I),i.domElement.addEventListener("pointerdown",R),i.domElement.addEventListener("pointercancel",Q),i.domElement.addEventListener("wheel",le,{passive:!1}),this.update()}}nr.defaults.headers.common.Authorization="Token 6fe3f17dc87645641d95046019b79d7a0918dbe0";let Ur="https://thiswebsitehasxvisits.herokuapp.com",an=null,Br=null,kn=null,Hn=[],kr=[],Gn=null,Hr=null,Be=null,qt=null,Aa=null,Ca=!1,df=null,Gs=[],La=[],bn=null,Da=!1,Gr=!1;const XM={name:"Background",components:{Header:D0,MessageField:M0,ContextMenu:F0,Info:G0},data(){return{colorScheme:[],message:"",loaded:!1,counter:0,submitted:!1,localPercent:0,totalPercent:0,menuShow:!1,menuTop:0,menuLeft:0,currentDeletedDOM:!1}},methods:{generateColorScheme(){let n=()=>Math.floor(Math.random()*255);this.colorScheme=[[n(),n(),n()],[n(),n(),n()],[n(),n(),n()],[n(),n(),n()],[n(),n(),n()]]},async init(){let n=50;this.generateColorScheme();let e=[],t;try{t=await this.getData(),this.counter=t.count,this.localPercent=t.localPercent,this.totalPercent=t.totalPercent,e=t.entries}catch{e=[],this.counter=0,this.localPercent=0,this.totalPercent=0}this.loaded=!0;const i=[new ql,new Sr,new Wl,new Gl,new Vl,new Kr,new jl(1,.4,20,20)];let r=Math.random();r>999999/1e6?qt=6:r>1031/1032||r>127/128?qt=5:r>63/64?qt=4:r>31/32?qt=3:r>7/8?qt=2:r>1/2?qt=1:qt=0,Aa=this.toHexString(this.colorScheme[2]),e.unshift({id:-1,color:Aa,geometry:qt,deleted:!1}),an=new NM,Br=new Nt(75,window.innerWidth/window.innerHeight,.1,1e3),kn=new id({canvas:document.getElementById("renderer"),alpha:!0}),kn.setClearColor(16777215,0),kn.setPixelRatio(window.devicePixelRatio),kn.setSize(window.innerWidth,window.innerHeight),Br.position.setY(n+2.95),kr.push(new HM(16777181,7032614,1)),kr.push(new WM(16777215,.8)),kr[1].position.set(-1500,500,1e3),an.add(kr[0],kr[1]),Gn=new jM(Br,kn.domElement),Gn.enablePan=!1,Gn.enableDamping=!0,Gn.dampingFactor=.05,Gn.rotateSpeed=.5,Gn.zoomSpeed=.2,Gn.maxDistance=500;const s=new Kr(n),o=new BM(s),a=new UM(o,new sd({color:16777215,transparent:!0,opacity:.5}));an.add(a);let l=Math.PI*(3-Math.sqrt(5));for(let m=0;m<e.length;m++){let w=function(){return e[m]};var h=w;let _=new kM({color:parseInt(e[m].color,16)}),p=n-(e.length==1?0:m/(e.length-1))*n*2,d=Math.sqrt(n*n-p*p),g=l*m,M=Math.cos(g)*d,A=Math.sin(g)*d,E=new dn(i[e[m].geometry],_);E.position.set(M,p,A),m===0?E.name="current":E.name="deletable",E.callback=w,an.add(E);let D=Math.pow(Math.random()*2-1,3)*.1,O=Math.pow(Math.random()*2-1,3)*.1,y=Math.pow(Math.random()*2-1,3)*.1;Gs.push([D,O,y]),Hn.push(E);let C=null;if(e[m].message!=""&&m!=0){let N=document.createElement("canvas"),F=N.getContext("2d"),H;N.width=1e3,N.height=500,F.beginPath(),F.moveTo(1e3,500),F.arcTo(0,500,0,0,30),F.arcTo(0,0,1e3,0,30),F.arcTo(1e3,0,1e3,500,30),F.arcTo(1e3,500,0,500,30),F.closePath(),F.fillStyle="rgba(255, 255, 255, 1)",F.fill(),F.font="100 100px sans-serif",F.fillStyle="rgba(0, 0, 0, 1)",F.textAlign="center",this.smartFillText(e[m].message,F),Hr=new sf(N),H=new ol({map:Hr}),C=new Ju(H),C.scale.set(5,2.5,0),C.position.set(M,p+3,A),C.name="deletable",an.add(C)}Hn[m].correspondingSprite=C}for(let m=0;m<2e3;m++){let _=new Ul({color:16777215}),p=new dn(new Kr,_);p.position.setFromSphericalCoords(750,Math.acos(2*Math.random()-1),Math.random()*2*Math.PI),an.add(p)}let c=document.createElement("canvas");Be=c.getContext("2d");let u,f;c.width=1e3,c.height=500,Be.beginPath(),Be.moveTo(1e3,500),Be.arcTo(0,500,0,0,30),Be.arcTo(0,0,1e3,0,30),Be.arcTo(1e3,0,1e3,500,30),Be.arcTo(1e3,500,0,500,30),Be.closePath(),Be.fillStyle="rgba(255, 255, 255, 0.5)",Be.fill(),Be.font="100 100px sans-serif",Be.fillStyle="rgba(100, 100, 100, 1)",Be.textAlign="center",this.smartFillText("Leave a message",Be),Hr=new sf(c),u=new ol({map:Hr}),f=new Ju(u),f.scale.set(5,2.5,0),f.position.set(0,n+3,0),f.name="current",Hn[0].correspondingSprite=f,an.add(f),this.animate()},animate(){requestAnimationFrame(this.animate),Hr.needsUpdate=!0;for(let n=0;n<Hn.length;n++)Hn[n].rotation.x+=Gs[n][0],Hn[n].rotation.y+=Gs[n][1],Hn[n].rotation.z+=Gs[n][2];Gn.update(),kn.render(an,Br)},toHex(n){let e=t=>{let i=t.toString(16);return i.length==1?"0"+i:i};return parseInt(e(n[0])+e(n[1])+e(n[2]),16)},toHexString(n){let e=t=>{let i=t.toString(16);return i.length==1?"0"+i:i};return e(n[0])+e(n[1])+e(n[2])},smartFillText(n,e){let i=n.split(/\s\s*/),r=0,s=!0,o=1;for(let f=0;f<i.length;f++)r+=i[f].length,r>15&&!s&&o<=3?(r=i[f].length,i[f]=`
`+i[f],o++):s=!1;n=i.join(" ");const a=500,l=275,c=100,u=n.split(`
`);e.font="100 "+100+"px sans-serif";for(let f=0;f<u.length;f++)e.fillText(u[f],a,l+(f-(u.length-1)/2)*c)},async getData(){try{return(await nr.get(Ur+"/api/")).data}catch(n){throw console.log(n),n}},async post(n){try{const e=await nr.post(Ur+"/api/",{message:n,color:this.toHexString(this.colorScheme[2]),geometry:qt,deleted:!1});Ca=!0,df=e.data}catch(e){console.log(e)}},whitenCanvas(n){requestAnimationFrame(()=>this.whitenCanvas(n+.05)),Be.beginPath(),Be.moveTo(1e3,500),Be.arcTo(0,500,0,0,30),Be.arcTo(0,0,1e3,0,30),Be.arcTo(1e3,0,1e3,500,30),Be.arcTo(1e3,500,0,500,30),Be.closePath(),Be.clearRect(0,0,1e3,500),Be.fillStyle=`rgba(255, 255, 255, ${.5+n})`,Be.fill(),Be.font="100 100px sans-serif",Be.fillStyle="rgba(0, 0, 0, 1)",this.smartFillText(this.message,Be)},onDocumentMouseDown(n){let e=new qM,t=new Se;t.x=n.clientX/kn.domElement.clientWidth*2-1,t.y=-(n.clientY/kn.domElement.clientHeight)*2+1,e.setFromCamera(t,Br);var i=e.intersectObjects(an.children);for(let r=0;r<i.length;r++)if(i[0].object.name==="deletable"){this.menuTop=n.clientY,this.menuLeft=n.clientX,this.menuShow=!0,bn=i[0].object;break}else if(i[0].object.name==="current"){this.menuTop=n.clientY,this.menuLeft=n.clientX,this.menuShow=!0,bn=i[0].object,Gr=!0;break}},menuDelete(){let n,e;bn.hasOwnProperty("correspondingSprite")?(n=bn,e=bn.correspondingSprite):(n=Hn.find(t=>t.correspondingSprite==bn),e=bn),an.remove(n,e),Gr||La.push(n.callback()),this.menuShow=!1,bn=null,Gr&&(Da=!0,this.currentDeletedDOM=!0),Gr=!1},menuCancel(){this.menuShow=!1,bn=null,Gr=!1}},watch:{message(n){Be.clearRect(0,30,1e3,440),Be.fillStyle="rgba(255, 255, 255, 0.5)",Be.fillRect(0,30,1e3,440),Be.font="100 100px sans-serif",Be.fillStyle="rgba(0, 0, 0, 1)",this.smartFillText(n,Be)},submitted(){this.whitenCanvas(0)}},created(){},async mounted(){await this.init(),window.addEventListener("contextmenu",this.onDocumentMouseDown),window.addEventListener("beforeunload",function(n){if(!Ca)try{nr.post(Ur+"/api/",{message:"",color:Aa,geometry:qt,deleted:Da})}catch(e){console.log(e)}if(Da&&Ca)try{nr.put(`${Ur}/api/${df.id}/`,{deleted:!0})}catch(e){console.log(e)}for(let e=0;e<La.length;e++)try{nr.put(`${Ur}/api/${La[e].id}/`,{deleted:!0})}catch(t){console.log(t)}})},unmounted(){window.removeEventListener("click",this.onDocumentMouseDown)}},$M={key:0},YM={class:"font-sans flex flex-col justify-between items-center w-fit h-screen m-auto -z-10"},ZM={class:"fixed top-0 left-0",id:"renderer"};function KM(n,e,t,i,r,s){const o=qr("Header"),a=qr("MessageField"),l=qr("Info"),c=qr("ContextMenu");return Jt(),Sn("div",null,[Je(ns,null,{default:io(()=>[r.loaded?(Jt(),Sn("div",$M,[Ye("div",YM,[Je(o,{counter:r.counter,colorScheme:r.colorScheme},null,8,["counter","colorScheme"]),Je(a,{currentDeleted:r.currentDeletedDOM,colorScheme:r.colorScheme,"onUpdate:modelValue":e[0]||(e[0]=u=>r.message=u),onSubmit:e[1]||(e[1]=u=>{s.post(u),r.submitted=!0}),localPercent:r.localPercent,totalPercent:r.totalPercent},null,8,["currentDeleted","colorScheme","localPercent","totalPercent"])]),Ye("div",{class:"fixed w-screen h-screen -z-20 top-0 left-0",style:Tn({background:`linear-gradient(-45deg, rgba(${r.colorScheme[0][0]},${r.colorScheme[0][1]},${r.colorScheme[0][2]},1), rgba(${r.colorScheme[1][0]},${r.colorScheme[1][1]},${r.colorScheme[1][2]},1)`})},null,4),Je(l,{colorScheme:r.colorScheme},null,8,["colorScheme"]),r.menuShow?(Jt(),uh(c,{key:0,top:r.menuTop,left:r.menuLeft,colorScheme:r.colorScheme,onConfirm:s.menuDelete,onCancel:s.menuCancel},null,8,["top","left","colorScheme","onConfirm","onCancel"])):ja("",!0)])):ja("",!0)]),_:1}),Je(ns,null,{default:io(()=>[Jf(Ye("canvas",ZM,null,512),[[gh,r.loaded]])]),_:1})])}var JM=wr(XM,[["render",KM],["__scopeId","data-v-176e6182"]]);const QM={name:"App",components:{Background:JM}};function ew(n,e,t,i,r,s){const o=qr("Background");return Jt(),Sn("div",null,[Je(o)])}var tw=wr(QM,[["render",ew]]);Wm(tw).mount("#app");
