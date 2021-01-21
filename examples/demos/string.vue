<template>
  <div>
    <Demo
        :schemaProps="schema"
        :formDataProps="formData"
    />
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue';
import Demo from './demo';
export default {
  name: 'App',
  setup() {
    const state = reactive({
      schema: {
        type: 'object',
        properties: {
          "input": {
            "title": "简单输入框",
            "type": "string",
          },
          // textarea
          "textarea": {
            "title": "简单文本编辑框",
            "type": "string",
            "format": "textarea"
          },
          "url": {
            "title": "URL",
            "type": "string",
            "format": "url",
          },
          "email": {
            "title": "邮箱",
            "type": "string",
            "format": "email",
          },
          "color": {
            "title": "颜色选择",
            "type": "string",
            "format": "color"
          },
          "date": {
            "title": "日期选择",
            "type": "string",
            "format": "date",
            "ui:options": {
              "placeholder": "请选择日期",
              "show-time": true,
              "format": "YYYY/MM/DD HH:mm:ss",
              "type": "DatePicker",
            }
          },
          "week": {
            "title": "week选择",
            "type": "string",
            "format": "date",
            "ui:options": {
              "format": "YYYY-wo",
              "type": "WeekPicker",
            }
          },
          "moth": {
            "title": "moth选择",
            "type": "string",
            "format": "date",
            "ui:options": {
              "format": "YYYY-MM",
              "type": "MonthPicker",
            }
          },
          "image": {
            "title": "图片展示",
            "type": "string",
            "format": "image"
          },
          "number": {
            "title": "数字",
            "type": "number",
            "ui:options": {
              "max": 3
            }
          },
          "select": {
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
        },
      },
      formData: {
      },
    });
    return {
      ...toRefs(state),
    }
  },
  components: {
    Demo
  }
}
</script>
