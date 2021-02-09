### array

### multiSelect
多选框，可以通过设置`ui:widget` 来指定具体的 UI 交互
```json
{
  "title": "多选",
  "description": "下拉多选",
  "type": "array",
  "items": {
    "type": "string"
  },
  "enum": [
    "A",
    "B",
    "C",
    "D"
  ],
  "enumNames": [
    "杭州",
    "武汉",
    "湖州",
    "贵阳"
  ],
  "ui:widget": "multiSelect"
}
```

```json
{
  "title": "多选",
  "description": "checkbox",
  "type": "array",
  "items": {
    "type": "string"
  },
  "enum": [
    "A",
    "B",
    "C",
    "D"
  ],
  "enumNames": [
    "杭州",
    "武汉",
    "湖州",
    "贵阳"
  ]
}
```

<array height="220px"/>

### list
支持 导入 和 导出 `excel` 文件。可以先导出一个模板，再通过修改模板 excel 后上传。对于一些数据量较大的情况是非常有用的操作。
也支持常规的排序调整
```json
{
  "title": "对象数组",
  "description": "对象数组嵌套功能",
  "type": "array",
  "minItems": 1,
  "maxItems": 3,
  "items": {
    "type": "object",
    "properties": {
      "input1": {
        "title": "简单输入框",
        "type": "string",
        "ui:hidden": "{{rootValue.selet1 !== 'b'}}"
      },
      "selet1": {
        "title": "单选",
        "type": "string",
        "enum": [
          "a",
          "b",
          "c"
        ],
        "enumNames": [
          "早",
          "中",
          "晚"
        ]
      }
    }
  }
}
```
<list height="300"/>
