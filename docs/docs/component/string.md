### String
`String` 类型可以有多种表现形式，比如基础的字符串`Input`类型，或者`RichText`这样的富文本格式，下面我们会详细介绍`Vue3 form render`
所涵盖的一些 `UI` 格式：

### Input
```json
{
  "title": "简单输入框",
  "type": "string"
}
```

<string />

### textarea
通过指定`format`参数，可以设置 `string` 类型的 UI 表现形式。当设置 `"format": "textarea"` 后即可展示 `textarea` :

```json
{
  "title": "简单输入框",
  "type": "string",
  "format": "textarea"
}
```

<string :y="80" height="100px" />

### url
url 支持链接测试，以及基本的链接格式校验。
通过指定`format`参数，可以设置 `string` 类型的 UI 表现形式。当设置 `"format": "url"` 后即可展示 `url` :

```json
{
  "title": "URL",
  "type": "string",
  "format": "url"
}
```

<string :y="180" height="80px" />

### email
email 支持基本的邮箱格式校验，
通过指定`format`参数，可以设置 `string` 类型的 UI 表现形式。当设置 `"format": "email"` 后即可展示 `email` :

```json
{
  "title": "邮箱",
  "type": "string",
  "format": "email"
}
```

<string :y="260"/>

### color
color 支持基本的颜色格式校验，
通过指定`format`参数，可以设置 `string` 类型的 UI 表现形式。当设置 `"format": "color"` 后即可展示 `color` :

```json
{
  "title": "颜色选择",
  "type": "string",
  "format": "color"
}
```

<string :y="360"/>

### datePicker
通过指定`format`参数，可以设置 `string` 类型的 UI 表现形式。当设置 `"format": "date"` 后即可展示 `datePicker` :

```json
{
  "title": "日期选择",
  "type": "string",
  "format": "date",
  "ui:options": {
    "placeholder": "请选择日期",
    "show-time": true,
    "format": "YYYY/MM/DD HH:mm:ss",
    "type": "DatePicker"
  }
}
```

如果要自定义`datePicker`的一些其他属性，可以通过`ui:options`选项来设置，详细的属性可以参考[Antd DatePicker](https://2x.antdv.com/components/date-picker-cn#API)


<string :y="440"/>

### image
`image` 支持上传图片以及图片预览，
通过指定`format`参数，可以设置 `string` 类型的 UI 表现形式。当设置 `"format": "image"` 后即可展示 `image` :

```json
{
  "title": "图片展示",
  "type": "string",
  "format": "image"
}
```

<string :y="520"/>

### select
通过指定`format`参数，可以设置 `string` 类型的 UI 表现形式。当设置 `"format": "select"` 后即可展示 `select` :


```json
{
  "title": "单选",
  "type": "string",
  "enum": [
    "a",
    "b",
    "c"
  ],
  "enumNames": [
    "选项1",
    "选项2",
    "选项3"
  ]
}

```

<string :y="600"/>

### richText
通过指定`format`参数，可以设置 `string` 类型的 UI 表现形式。当设置 `"format": "richText"` 后即可展示 `select` :

```json
{
  "title": "富文本编辑器",
  "type": "string",
  "format": "richText"
}
```

<string :y="680" height="450px"/>