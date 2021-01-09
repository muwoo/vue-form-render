import {toRefs} from 'vue';

const Select = ({value, handleChange, props, type}) => {
  if (type === 'radio') {
    return (
      <a-radio-group name="radioGroup" onChange={(e) => handleChange(e.target.value)} value={value}>
        {
          props.schema.enum.map((item, index) => (
            <a-radio
              value={item}
              key={item}
            >
              {props.schema.enumNames ? props.schema.enumNames[index] || props.schema.enum[index] : props.schema.enum[index]}
            </a-radio>
          ))
        }
      </a-radio-group>
    )
  }
  return (
    <a-select
      value={value}
      onChange={handleChange}
    >
      {
        props.schema.enum.map((item, index) => (
          <a-select-option
            value={item}
            key={item}
          >
            {props.schema.enumNames ? props.schema.enumNames[index] || props.schema.enum[index] : props.schema.enum[index]}
          </a-select-option>
        ))
      }
    </a-select>
  )
}

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
      options = {},
      schema,
      onChange,
      name,
      value,
      disabled,
      readOnly,
    } = toRefs(props);
    const { format = 'text', maxLength } = schema.value;
    const type = ['image', 'email'].indexOf(format) > -1 ? 'text' : format; // TODO: 这里要是添加新的input类型，注意是一个坑啊，每次不想用html的默认都要补上

    const handleChange = v => {
      onChange.value(name.value, v);
    };

    const _options = { ...options };
    delete _options.noTrim;

    return () => {
      let suffix = undefined;
      try {
        let _value = value.value || '';
        if (typeof _value === 'number') {
          _value = String(_value);
        }
        suffix = options.suffix;
        if (!suffix && maxLength) {
          suffix = (
            <span
              style={
                _value.length > maxLength
                  ? { fontSize: 12, color: '#ff4d4f' }
                  : { fontSize: 12, color: '#999' }
              }
            >
          {_value.length + ' / ' + maxLength}
        </span>
          );
        }
      } catch (error) {
        // ignore
      }
      const config = {
        ..._options,
        maxLength,
        suffix,
      };

      return (
        <div className="form-item">
          <div>{props.schema.title}</div>
          {
            props.schema.enum ? (
              <Select
                type={props.schema["ui:widget"]}
                value={value.value}
                props={props}
                handleChange={handleChange}
              />
            ) : (
              <a-input
                {...config}
                value={value.value}
                type={type}
                disabled={disabled.value || readOnly.value}
                onInput={e => handleChange(e.target.value)}
              />
            )
          }
        </div>
      )
    };
  }
}