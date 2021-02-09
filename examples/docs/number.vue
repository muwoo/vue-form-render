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
        "type": "object",
        "properties": {
          "number1": {
            "title": "数字输入框",
            "description": "1 - 1000",
            "type": "number",
            "min": 1,
            "max": 1000
          },
          "number2": {
            "title": "带滑动条",
            "type": "number",
            "ui:widget": "slider"
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