import {toRefs} from "vue";
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
      value
    } = toRefs(props);
    const handleChange = (e) => {
      console.log(e.target.value);
      onChange.value(name.value, e.target.value);
    }
    return () => {
      return (
        <div className="flex align-center">
          <a-input
            style={{width: '50px', height: '32px', padding: 0}}
            value={value.value}
            type="color"
            onInput={handleChange}
          />
          <a-input
            class="flex1"
            disabled={true}
            value={value.value}
            type="text"
          />
        </div>
      )
    }
  }
}