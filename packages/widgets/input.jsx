import {toRefs} from 'vue';
import { isUrl } from '../utils/utils';

const TestNode = ({ value }) => {
  const useUrl = isUrl(value);
  if (useUrl) {
    return (
      <a target="_blank" href={value}>
        测试链接
      </a>
    );
  }
  return <div>测试链接</div>;
};

const Select = ({value, handleChange, props, type, options}) => {
  if (type === 'radio') {
    return (
      <a-radio-group {...options} name="radioGroup" onChange={(e) => handleChange(e.target.value)} value={value}>
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
      {...options}
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
    } = toRefs(props);

    const handleChange = v => {
      onChange.value(name.value, v);
    };

    return () => {
      const { format = 'text', maxLength, 'ui:options': options } = schema.value;

      const type = ['image', 'email', 'url'].indexOf(format) > -1 ? 'text' : format; // TODO: 这里要是添加新的input类型，注意是一个坑啊，每次不想用html的默认都要补上

      const _options = { ...options };
      delete _options.noTrim;

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

      let addonAfter = _options.addonAfter;
      if (format === 'url' && !addonAfter) {
        addonAfter = <TestNode value={props.value} />
      }
      return (
        <div className="form-item">
          <div className="form-item-title">
            {props.schema.title}
            <span style={{
                color: props.invalidText && '#ff4d4f'
              }}>{props.invalidText && props.invalidText}</span>
          </div>
          {
            props.schema.enum ? (
              <Select
                type={props.schema["ui:widget"]}
                value={value.value}
                props={props}
                handleChange={handleChange}
                options={_options}
              />
            ) : (
              type === 'textarea' ? (
                <a-textarea
                  {...config}
                  value={value.value}
                  type={type}
                  {..._options}
                  onInput={e => handleChange(e.target.value)}
                  addonAfter={addonAfter}
                />
                ) : (
                  <a-input
                    {...config}
                    value={value.value}
                    type={type}
                    {..._options}
                    onInput={e => handleChange(e.target.value)}
                    addonAfter={addonAfter}
                  />
                )

            )
          }
        </div>
      )
    };
  }
}