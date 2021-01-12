<template>
  <div>
    <Demo
        :schemaProps="schema"
        :formDataProps="formData"
        :validate="onValidate"
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
          string: {
            title: '字符串',
            type: 'string',
            maxLength: 4,
            'ui:options': {
              placeholder: '试着输入超过4个字符',
            },
          },
          select: {
            title: '单选',
            type: 'string',
            enum: ['a', 'b', 'c'],
            enumNames: ['选项1', '选项2', '选项3'],
          },
          object: {
            type: 'object',
            title: 'object',
            properties: {
              string2: {
                title: '字符串',
                type: 'string'
              },
            },
            "required": [
              "string2"
            ]
          }
        },
        "required": [
          "string"
        ]
      },
      formData: {
      },
    });

    const change = (v) => {
      state.formData = v;
      // console.log(v);
    }
    const onValidate = (v) => {
      console.log(v);
    }

    return {
      ...toRefs(state),
      change,
      onValidate,
    }
  },
  components: {
    Demo,
  }
}
</script>
