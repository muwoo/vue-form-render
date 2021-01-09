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
    const handleChange = (v) => {
      onChange.value(name.value, v);
    }
    return () => {
      return (
        <div className="form-item">
          {
            props.schema["ui:widget"] === 'switch' ? (
              <div>
                <div>{props.schema.title}</div>
                <a-switch
                  value={value.value}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <a-checkbox
                value={value.value}
                onChange={() => handleChange(!value.value)}
              >
                {props.schema.title}
              </a-checkbox>
            )
          }

        </div>
      )
    }
  }
}