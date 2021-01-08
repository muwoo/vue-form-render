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
          config: {
            title: '数组',
            type: 'array',
            items: {
              "type": "object",
              properties: {
                text: {
                  title: '字符串',
                  type: 'string',
                  maxLength: 4,
                  'ui:options': {
                    placeholder: '试着输入超过4个字符',
                  },
                },
              }
            },
          }
        },
      },
      formData: {
        config: [{
          text: 'aaa'
        }]
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
