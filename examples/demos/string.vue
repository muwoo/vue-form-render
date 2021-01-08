<template>
  <div>
    <formRender
        :schema="schema"
        :formData="formData"
        @on-change="change"
        @validate="validate"
    />
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue';
import formRender from '../../packages/index.jsx';
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
          "color": {
            "title": "颜色选择",
            "type": "string",
            "format": "color"
          },
          "date": {
            "title": "日期选择",
            "type": "string",
            "format": "date"
          }
        },
      },
      formData: {
        input: 'aaa'
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
    formRender,
  }
}
</script>
