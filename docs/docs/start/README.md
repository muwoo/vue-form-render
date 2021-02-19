# 开始使用

## 安装
```shell
npm i vue3-form-render --save
# or
yarn add vue3-form-render
```

目前仅支持[Ant Design of Vue](https://2x.antdv.com/docs/vue/introduce-cn/) 组件库，由于`vue3 form render`没有内置`antd`所以我们需要手动安装：
```shell
npm i --save ant-design-vue@next
# or
yarn add ant-design-vue@next
```

## 使用
引入 `Ant Design of Vue`
```js
import { createApp } from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// import icons

import {
  FileImageOutlined,
  UploadOutlined,
  PlusOutlined,
  BarsOutlined,
  DeleteOutlined,
  DragOutlined,
} from '@ant-design/icons-vue';

const app = createApp(App);

app.component('FileImageOutlined', FileImageOutlined)
app.component('UploadOutlined', UploadOutlined)
app.component('PlusOutlined', PlusOutlined)
app.component('BarsOutlined', BarsOutlined)
app.component('DeleteOutlined', DeleteOutlined)
app.component('DragOutlined', DragOutlined)

app.use(Antd);
app.mount('#app');
```

然后在需要使用的组件中，即可使用`vue3 form render`:

```vue
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
import FormRender from 'vue3-form-render';
// form render style
import 'vue3-form-render/lib/vue3-form-render.css';

export default {
  name: 'App',
  setup() {
    const state = reactive({
      schema: {
        type: 'object',
        properties: {
          string: {
            title: 'string',
            type: 'string',
            maxLength: 4,
            'ui:options': {
              placeholder: 'enter more than 4 characters',
            },
          }
        },
      },
      formData: {
        string: 'aaa'
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

```

<demo />

## API

### Props
|  参数   | 说明  | 类型 | 默认值|
|  ----  | ----  | ---- | ---- |
| schame  | JSON Schema | object | -- |
| formData  | 表单的数据 | object | -- |

### Events

|  事件名   | 说明  | 回调函数 | 
|  ----  | ----  | ---- |
| on-change  | 用户触发表单更新的回调函数 | function(value: formData) |
| on-validate  | 用户触发表单更新的校验回调函数 | function(value: validates) |

