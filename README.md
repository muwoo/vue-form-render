<p align="center">    
<img width=350 align= "center" alt="logo" src="https://user-images.githubusercontent.com/21073039/104408849-ef6d2280-559f-11eb-93e4-fed00748e4b6.png" />
</p>   
<h1 align= "center">vue-form-render</h1>
<p align="center">
 <a href="https://www.npmjs.com/package/kaer-form-render">
    <img alt="npm" src="https://img.shields.io/github/package-json/v/muwoo/vue-form-render" />
 </a>
 <a href="">
    <img alt="npm" src="https://img.shields.io/github/last-commit/muwoo/vue-form-render" />
 </a>
 <a href="">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/muwoo/vue-form-render"></a>
 </a>
 <a href="">
    <img alt="GitHub repo size" src="https://img.shields.io/github/stars/muwoo/vue-form-render?style=social"></a>
 </a>
</p>

Base on Vue 3.x, Quickly generates custom form configuration interfaces using JSON Schema.
## examples

[form-render live Demo](https://muwoo.github.io/vue-form-render/)

![image](https://user-images.githubusercontent.com/21073039/104298169-a1541280-54fe-11eb-9e16-da4414962293.png)


## install
```shell
npm i vue3-form-render --save
```
`vue3 form render` depend on [Ant Design of Vue](https://2x.antdv.com/docs/vue/introduce-cn/)
to render from items.so before we use `vue3 form render` we need to install `Ant Design of Vue` and import it to our project:
```js
import { createApp } from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(Antd);
app.mount('#app');
```

## easy demo

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

## Documentation
For extensive documentation see the examples folder or read it on [vue3-form-render](https://muwoo.github.io/vue-form-render)


## API

### Props
|  Property   | Description  | Type | Default|
|  ----  | ----  | ---- | ---- |
| schame  | JSON Schema | object | -- |
| formData  | formData | object | -- |

### Events

|  Events Name	   | Description  | Arguments | 
|  ----  | ----  | ---- |
| on-change  | Callback function for user to trigger form update | function(value: formData) |
| on-validate  | Validation callback function for user to trigger form update | function(value: validates) |

## Contribution
If you like this project, you can support it by contributing. If you find a bug, please let me know, applying a pull request is welcome. This project needs your support. You can fix typos, add new examples, or build with me new features.

Support this project by giving it a Star ⭐

## Special thanks

this Project inspiration from [form-render](https://x-render.gitee.io/form-render/guide/design) 
but There is no similar framework for Vue 3.x


## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/muwoo/vue-form-render/blob/master/LICENSE) file for details.
