<template>
  <div class="demo-preview">
    <div class="preview">
      <formRender
          v-if="!error"
          :schema="schema"
          :formData="formData"
          @on-change="change"
          @on-validate="validate"
          :options="options"
      />
      <div v-else>
        {{error}}
      </div>
    </div>

    <prism-editor
        class="my-editor"
        :modelValue="schemaStr"
        @update:modelValue="changeSchema"
        :highlight="highlighter"
        line-numbers
    >
    </prism-editor>
  </div>
</template>

<script>
import parseJson from 'json-parse-better-errors';
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

import {reactive, toRefs} from 'vue';
import formRender from '../../packages/index.jsx';

const schema2str = obj => JSON.stringify(obj, null, 2) || '';

export default {
  name: 'App',
  props: {
    schemaProps: Object,
    formDataProps: Object,
  },
  setup({schemaProps, formDataProps}) { // eslint-disable-line
    const state = reactive({
      schema: schemaProps,
      formData: formDataProps,
      error: '',
      schemaStr: '',
    });
    const change = (v) => {
      state.formData = v;
      console.log(v);
    }
    const validate = (v) => {
      console.log(v);
    }

    const tryParse = (schemaStr) => {
      let schema = {};
      try {
        schema = parseJson(schemaStr);
        if (typeof schema !== 'object') {
          state.error = 'schema非正确json';
          return;
        }
        state.error = '';
        return schema;
      } catch (error) {
        state.error = String(error);
      }
      return '';
    }

    const changeSchema = (v) => {
      try {
        state.schemaStr = v;
        const schema = tryParse(v);
        console.log(schema);
        if (schema) {
          state.schema = schema;
        }

      } catch (e) {
        console.log(e);
      }
    }
    state.schemaStr = schema2str(state.schema);
    return {
      ...toRefs(state),
      change,
      validate,
      changeSchema
    }
  },
  components: {
    formRender,
    PrismEditor,
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js);
    }
  }
}
</script>


<style lang="less">
.demo-preview {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  .preview {
    flex: 1;
    border: 1px solid #ddd;
  }
}
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  flex: 1;
  margin-left: 20px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
