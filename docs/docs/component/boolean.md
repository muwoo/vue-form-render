### boolean
`boolean` 类型可以有多种表现形式，比如基础的 `checkbox` 类型，或者 `switch` 这样的开关，下面我们会详细介绍`Vue3 form render`
所涵盖的一些 `UI` 格式：

### checkbox
通过 `type` 指定 `boolean` UI 交互。默认是 `checkbox`

```json
{
 "title": "是否通过",
 "type": "boolean"
}
```

<boolean />

### switch
通过`"ui:widget"` 可以指定 UI 渲染的表现形式，可以设置 `"ui:widget": "switch"` 来渲染 `switch` 样式
```json
{
  "title": "开关控制",
  "type": "boolean",
  "ui:widget": "switch"
}
```
<boolean :y="40" height="100px" />
