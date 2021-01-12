import {toRefs} from 'vue';
import '../styles/common.less';

export default {
  props: {
    schema: Object,
    formData: Object,
    name: String,
    onChange: Function,
    value: [String, Number, Boolean, Object],
    disabled: Boolean,
    readOnly: Boolean,
    invalidText: String
  },
  setup(props) {
    let {
      onChange,
      name,
      value
    } = toRefs(props);
    const handleChange = (v) => {
      onChange.value(name.value, v);
    }
    return () => {
      return (
        <div className="form-item">
          <div className="form-item-title">
            {props.schema.title}
            <span style={{
              color: props.invalidText && '#ff4d4f'
            }}>{props.invalidText && props.invalidText}</span>
          </div>
          <a-checkbox-group
            value={value.value}
            onChange={handleChange}
          >
            {
              props.schema.enum.map((item, index) => (
                <a-checkbox
                  value={item}
                  key={item}
                >
                  {props.schema.enumNames ? props.schema.enumNames[index] || props.schema.enum[index] : props.schema.enum[index]}
                </a-checkbox>
              ))
            }
          </a-checkbox-group>
        </div>
      )
    }
  }
}