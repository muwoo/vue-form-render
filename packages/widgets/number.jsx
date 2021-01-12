import {toRefs} from 'vue';
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
      schema,
      onChange,
      name,
      value,
      disabled,
      readOnly,
    } = toRefs(props);
    const { format = 'text', max, min } = schema.value;
    const type = ['image', 'email'].indexOf(format) > -1 ? 'text' : format; // TODO: 这里要是添加新的input类型，注意是一个坑啊，每次不想用html的默认都要补上

    const handleChange = v => {
      onChange.value(name.value, v);
    };

    const options = props.schema["ui:options"] || {};

    return () => {
      return (
        <div className="form-item">
          <div className="form-item-title">
            {props.schema.title}
            <span style={{
              color: props.invalidText && '#ff4d4f'
            }}>{props.invalidText && props.invalidText}</span>
          </div>
          {
            props.schema["ui:widget"] === 'slider' ? (
              <a-slider
                {...options}
                value={value.value}
                type={type}
                onChange={handleChange}
                max={max}
                min={min}
              />
            ) : (
              <a-input-number
                {...options}
                value={value.value}
                type={type}
                disabled={disabled.value || readOnly.value}
                onChange={handleChange}
                max={max}
                min={min}
              />
            )
          }

        </div>
      )
    };
  }
}