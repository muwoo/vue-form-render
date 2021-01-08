import {toRefs} from 'vue';
import moment from 'moment';
import '../styles/common.less';

const DatePicker = (props) => {
  return (
    <a-date-picker
      {...props}
      value={props.value ? moment(props.value) : null}
      onChange={props.onChange}
    />
  )
}

const MonthPicker = (props) => {
  return (
    <a-month-picker
      {...props}
      value={props.value ? moment(props.value) : null}
      onChange={props.onChange}
    />
  )
}

const WeekPicker = (props) => {
  return (
    <a-week-picker
      {...props}
      value={props.value ? moment(props.value) : null}
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
    const handleChange = (moment, str) => {
      onChange.value(name.value, str);
    }
    const options = props.schema["ui:options"] || {};
    const Picker = Map[options.type || 'DatePicker'];
    return () => {

      return (
        <div className="form-item">
          <div>{props.schema.title}</div>
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