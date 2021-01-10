import {onMounted, onBeforeUnmount, ref, toRefs} from 'vue';
import WangEditor from 'wangeditor';

import '../styles/common.less';

export default {
  props: {
    schema: Object,
    formData: Object,
    options: Object,
    name: String,
    onChange: Function,
    value: [String, Number, Boolean, Object],
    disabled: Boolean,
    readOnly: Boolean,
  },
  setup(props) {
    let {
      onChange,
      name,
      value,
    } = toRefs(props);

    const handleChange = (v) => {
      onChange.value(name.value, v);
    }

    const editor = ref();

    let instance;
    onMounted(() => {
      instance = new WangEditor(editor.value);
      Object.assign(instance.config, {
        onchange(newHtml) {
          handleChange(newHtml);
        },
      });
      instance.config.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list',
        'todo',
        'justify',
        'quote',
        'image',
        'video',
        'table',
        'code',
        'splitLine',
        'undo',
        'redo',
      ]
      instance.create();
      instance.txt.html(value.value)
    });
    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });

    return () => {
      return (
        <div className="form-item">
          <div>{props.schema.title}</div>
          <div ref={editor}></div>
        </div>
      )
    }
  }
}