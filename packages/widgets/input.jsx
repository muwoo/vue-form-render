import {toRefs} from 'vue';
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

    const handleChange = e => {
      onChange.value(name.value, e.target.value);
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
        <a-input
          {...config}
          value={value.value}
          type={type}
          disabled={disabled.value || readOnly.value}
          onInput={handleChange}
        />
      )
    };
  }
}