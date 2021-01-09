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
            title: '对象',
            properties: {
              string: {
                title: '字符串',
                type: 'string',
                maxLength: 4,
                'ui:options': {
                  placeholder: '试着输入超过4个字符',
                },
              },
              array: {
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
              }
            }
          }
        },
      },
      formData: {
      },
    });
    return {
      ...toRefs(state),
    }
  },
  components: {
    Demo,
  }
}
</script>
