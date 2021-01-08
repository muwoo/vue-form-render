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
      "schema": {
        "title": "对象数组",
        "type": "array",
        "minItems": 1,
        "maxItems": 3,
        "uniqueItems": true,
        "items": {
          "type": "object",
          "properties": {
            "tickets": {
              "title": "门票数",
              "type": "string"
            }
          }
        }
      },
      formData: [
        {
          tickets: '123',
        }
      ],
    });

    const change = (v) => {
      state.formData = v;
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
