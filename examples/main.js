import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import {
  Input,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Button,
  Card,
  Image,
  InputNumber,
  Slider,
  Switch,
  Popover,
  Upload,
  Collapse
} from 'ant-design-vue';
import {
  FileImageOutlined,
  UploadOutlined,
  PlusOutlined,
  BarsOutlined,
  DeleteOutlined,
  DragOutlined,
} from '@ant-design/icons-vue';

import 'ant-design-vue/dist/antd.css';

const app = createApp(App);

app.use(Input);
app.use(Select);
app.use(DatePicker);
app.use(Radio);
app.use(Checkbox);
app.use(Button);
app.use(Card);
app.use(Image);
app.use(InputNumber);
app.use(Slider);
app.use(Switch);
app.use(Popover);
app.use(Upload);
app.use(Collapse);

app.component('FileImageOutlined', FileImageOutlined)
app.component('UploadOutlined', UploadOutlined)
app.component('PlusOutlined', PlusOutlined)
app.component('BarsOutlined', BarsOutlined)
app.component('DeleteOutlined', DeleteOutlined)
app.component('DragOutlined', DragOutlined)

app.use(router);
app.mount('#app');
