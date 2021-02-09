<template>
  <div>
    <formRender
      :schema="schema"
      :formData="formData"
      @on-change="change"
      @on-validate="validate"
    />
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue';

// render index
import FormRender from '../../packages/index';

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
          "image": {
            "title": "图片展示",
            "type": "string",
            "format": "image"
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
          },
          "richText": {
            "title": "富文本编辑器",
            "type": "string",
            "format": "richText"
          }
        },
      },
      formData: {
      },
    });

    const change = (v) => {
      state.formData = v;
      console.log(v);
    }
    const validate = (v) => {
      console.log(v);
    }

    return {
      ...toRefs(state),
      change,
      validate,
    }
  },
  components: {
    FormRender,
  }
}
</script>