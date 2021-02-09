# 教程
## 介绍
我们在写一些常规后台页面的时候，避免不了是需要经常和表单打交道。所以可以想偷懒的小伙伴可能会考虑有没有办法不去做`表单工程师`?用代码解决重复的人肉工作，没错，我们可以通过 [JSON Schema](https://json-schema.org/understanding-json-schema/) 来描述我们的表单信息，这比重复的写表单控件可方便多了。

但是 `JSON Schema` 到表单的映射，则是需要我们去关注的，so... 业界有没有比较好的方案呢？答案是肯定的，比如以下几个表单渲染工具：

* [Form Render](https://x-render.gitee.io/form-render)
* [Formliy](https://formilyjs.org/#/bdCRC5/dzUZU8il)
* ...

`Formliy` 是一款比较强大的表单渲染器，目前对 React 支持最友好，Vue 相关的有一个 [vue-formly](https://github.com/formly-js/vue-formly) 但也仅仅是 Vue 2.x 的。还有就是 `Formliy` 过于强大，不仅仅支持 JSON Schema 还支持 JSX Schema 渲染表单。而我们只是单纯需要像 [Form Render](https://x-render.gitee.io/form-render) 这样的 JSON Schema 标准的轻量易用型框架。

所以 有了这个 基于 [Vue 3.x 的 Form render](https://github.com/muwoo/vue-form-render)


## 基于 form-render
`vue3.x form render` 是基于 `form render` 的 `vue 3.x` 版本的实现，所以可以有 `form render` 的一切优势，比如极简API:
```vue
<FormRender
  :schema="schema"
  :formData="formData"
  @on-change="change"
  @on-validate="validate"
/>
```
<demo />

## 规范协议
在 `schema` 的设计上，我们也是依赖于国际标准的 `JSON Schema` 规范，并在此基础上添加几条简单约定，满足表单 UI 更丰富表达：

* JSON schema 是 `vue-form-render` 的 schema 的一个子集，可以无缝接入
* 有别于 JSON schema 的扩展的字段，都用 ui: 开头
* 所有表单元素都有的 ui 属性各给一个独立字段，例如ui:disabled、ui:hidden
* 只有某些表单元素用的到的 ui 属性统一存放在 ui:options，详见[uiSchema]() 配置

随着form-render 表单设计器的接入，协议层对于用户已经可看做实现细节，通过表单设计器，大伙可以轻松搭建表单，生成对应 schema




