import {toRefs} from 'vue';
import moment from 'moment';
import '../styles/common.less';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';

const DatePicker = (props) => {
  return (
    <a-date-picker
      locale={locale}
      {...props}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

const MonthPicker = (props) => {
  return (
    <a-month-picker
      locale={locale}
      {...props}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

const WeekPicker = (props) => {
  return (
    <a-week-picker
      locale={locale}
      {...props}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

const Map = {
  DatePicker,
  MonthPicker,
  WeekPicker,
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
      onChange,
      name,
      value
    } = toRefs(props);
    const handleChange = (moment, str) => {
      onChange.value(name.value, str);
    }
    const options = props.schema["ui:options"] || {};
    const Picker = Map[options.type || 'DatePicker'];
    return () => {

      return (
        <div className="form-item">
          <div className="form-item-title">
            {props.schema.title}
            <span style={{
              color: props.invalidText && '#ff4d4f'
            }}>{props.invalidText && props.invalidText}</span>
          </div>
          <Picker
            {...options}
            value={value.value ? moment(value.value, options.format) : null}
            onChange={handleChange}
          />
         </div>
      )
    }
  }
}