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
          "multiSelect": {
            "title": "多选",
            "description": "下拉多选",
            "type": "array",
            "items": {
              "type": "string"
            },
            "enum": [
              "A",
              "B",
              "C",
              "D"
            ],
            "enumNames": [
              "杭州",
              "武汉",
              "湖州",
              "贵阳"
            ],
            "ui:widget": "multiSelect"
          },
          "boxes": {
            "title": "多选",
            "description": "checkbox",
            "type": "array",
            "items": {
              "type": "string"
            },
            "enum": [
              "A",
              "B",
              "C",
              "D"
            ],
            "enumNames": [
              "杭州",
              "武汉",
              "湖州",
              "贵阳"
            ]
          },
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