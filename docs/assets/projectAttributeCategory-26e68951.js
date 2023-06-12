import{_,d as V,o as w,c as k,a as g,b as a,w as o,F as A,e as r}from"./index-a0da786e.js";import{c as E,E as s,a as j,b as F,d as v,e as I}from"./el-table-column-ae829375.js";import{E as P,a as z,b as $,c as U}from"./el-form-item-49f3f214.js";import{E as B}from"./el-message-f42fc2e1.js";import{a as L,g as N,d as O,b as W,u as T}from"./projectAttributeCategory-e0d1fe07.js";const D=V({data(){return{categories:[],page:{total:0,current:1,size:10},searchId:null,dialogFormVisible:!1,projectAttributeCategory:{name:"",id:0,attributeCount:0,paramCount:0},formLabelWidth:80}},mounted(){this.getCategoriesPage(1)},methods:{search(){if(this.searchId==null||this.searchId==""){alert("请输入商品属性分类编号后查询");return}L(this.searchId).then(e=>{e.data==null?this.categories=[]:(this.categories=[],this.categories.push(e.data.help))}).catch(e=>{console.log(e)})},research(){this.searchId=null,this.getCategoriesPage(1)},toEdit(e){this.dialogFormVisible=!0,this.projectAttributeCategory=E(e)},getCategoriesPage(e){N({current:e,size:10}).then(n=>{console.log(n);const p=n.data.page;this.categories=p.records,this.page=p}).catch(n=>{console.log(n)})},currentchange(e){this.getCategoriesPage(e),this.page.current=e},del(e){confirm("是否删除")==!0&&console.log(e),console.log(e),O(e).then(t=>{if(t.success)this.getCategoriesPage(this.page.current);else return!1}).catch(t=>{})},toAdd(){this.dialogFormVisible=!0,this.projectAttributeCategory={name:"",id:0,attributeCount:0,paramCount:0}},save(){const e=this.projectAttributeCategory;e.id==0?W(e).then(t=>{if(t.success)this.dialogFormVisible=!1,this.getCategoriesPage(this.page.current),s(t.msg);else return s(t.msg),!1}).catch(t=>{s("网络错误联系管理员")}):T(e).then(t=>{if(t.success)this.dialogFormVisible=!1,this.getCategoriesPage(this.page.current),s(t.msg);else return s(t.msg),!1}).catch(t=>{s("网络错误联系管理员")})}}}),M={style:{"margin-top":"10px"}},q={style:{width:"95%",margin:"0 auto"}},G={class:"dialog-footer"};function H(e,t,n,p,J,K){const m=$,u=P,i=z,d=I,h=j,b=F,c=B,f=U,C=v;return w(),k(A,null,[g("div",M,[g("div",q,[a(u,{label:"商品属性分类编号","label-width":140,style:{display:"inline-flex","margin-right":"10px"}},{default:o(()=>[a(m,{modelValue:e.searchId,"onUpdate:modelValue":t[0]||(t[0]=l=>e.searchId=l),placeholder:"请输入商品属性分类编号"},null,8,["modelValue"])]),_:1}),a(i,{type:"primary",onClick:e.search},{default:o(()=>[r("查询")]),_:1},8,["onClick"]),a(i,{type:"warning",onClick:e.research},{default:o(()=>[r("重置")]),_:1},8,["onClick"]),a(i,{type:"success",onClick:e.toAdd},{default:o(()=>[r("添加")]),_:1},8,["onClick"])]),a(h,{data:e.categories,style:{width:"95%",margin:"0 auto"}},{default:o(()=>[a(d,{prop:"id",label:"编号",width:"80"}),a(d,{prop:"name",label:"名称",width:"120"}),a(d,{prop:"paramCount",label:"属性数量",width:"120"}),r(),a(d,{prop:"attributeCount",label:"参数数量",width:"120"}),a(d,{fixed:"right",label:"功能管理",width:"120"},{default:o(l=>[a(i,{link:"",type:"primary",size:"small",onClick:y=>e.toEdit(l.row)},{default:o(()=>[r("更新")]),_:2},1032,["onClick"]),a(i,{link:"",type:"primary",size:"small",onClick:y=>e.del(l.row.id)},{default:o(()=>[r("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),a(b,{layout:"prev, pager, next","page-size":e.page.size,total:e.page.total,style:{width:"95%",margin:"0 auto"},onCurrentChange:e.currentchange},null,8,["page-size","total","onCurrentChange"])]),a(C,{modelValue:e.dialogFormVisible,"onUpdate:modelValue":t[5]||(t[5]=l=>e.dialogFormVisible=l),title:"商品属性分类编辑"},{footer:o(()=>[g("span",G,[a(i,{onClick:t[4]||(t[4]=l=>e.dialogFormVisible=!1)},{default:o(()=>[r("取消")]),_:1}),a(i,{type:"primary",onClick:e.save},{default:o(()=>[r("保存 ")]),_:1},8,["onClick"])])]),default:o(()=>[a(f,{model:e.projectAttributeCategory},{default:o(()=>[a(u,{label:"名称","label-width":e.formLabelWidth},{default:o(()=>[a(m,{modelValue:e.projectAttributeCategory.name,"onUpdate:modelValue":t[1]||(t[1]=l=>e.projectAttributeCategory.name=l),placeholder:"请输入名称",style:{width:"80%"}},null,8,["modelValue"])]),_:1},8,["label-width"]),a(u,{label:"属性数量","label-width":e.formLabelWidth},{default:o(()=>[a(c,{modelValue:e.projectAttributeCategory.attributeCount,"onUpdate:modelValue":t[2]||(t[2]=l=>e.projectAttributeCategory.attributeCount=l),style:{width:"80%"},placeholder:"请输入属性数量"},null,8,["modelValue"])]),_:1},8,["label-width"]),a(u,{label:"参数数量","label-width":e.formLabelWidth},{default:o(()=>[a(c,{modelValue:e.projectAttributeCategory.paramCount,"onUpdate:modelValue":t[3]||(t[3]=l=>e.projectAttributeCategory.paramCount=l),style:{width:"80%"},placeholder:"请输入参数数量"},null,8,["modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"])],64)}const Z=_(D,[["render",H],["__scopeId","data-v-9da9d44f"]]);export{Z as default};
