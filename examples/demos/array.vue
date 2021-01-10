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
        "type": "array",
        "title": "array",
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
      // console.log(v);
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
    Demo,
  }
}
</script>
