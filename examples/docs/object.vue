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
        "title": "对象",
        "description": "这是个对象类型",
        "type": "object",
        "ui:options": {
          "collapsed": true
        },
        "properties": {
          "input1": {
            "title": "输入框1",
            "type": "string"
          },
          "input2": {
            "title": "输入框2",
            "type": "string"
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