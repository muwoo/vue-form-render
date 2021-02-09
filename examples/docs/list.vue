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
              "type": "string"
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