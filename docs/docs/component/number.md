### Number
`number` 类型可以有多种表现形式，比如基础的数字输入框`number`类型，或者`slider`这样的滑动条，下面我们会详细介绍`Vue3 form render`
所涵盖的一些 `UI` 格式：

### 基础的 number
通过 `type` 指定 `number` UI 交互，通过控制 `min` 和 `max` 可以控制数字框的最大或者最小的值。

```json
{
  "title": "数字输入框",
  "description": "1 - 1000",
  "type": "number",
  "min": 1,
  "max": 1000
}
```

<number />

### slider
通过`"ui:widget"` 可以指定 UI 渲染的表现形式，可以设置 `"ui:widget": "slider"` 来渲染 `slider` 样式
```json
{
  "title": "带滑动条",
  "type": "number",
  "ui:widget": "slider"
}
```
<number :y="80" />
