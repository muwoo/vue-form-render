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
          content: {
            title: '富文本编辑器',
            type: 'string',
            format: 'richText',
          },
        },
      },
      formData: {
        content: '<a>超链接</a>'
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
