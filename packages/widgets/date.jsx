import {toRefs} from 'vue';
import moment from 'moment';
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
    const handleChange = (moment, str) => {
      onChange.value(name.value, str);
    }
    return () => {
      return (
        <div>
          <a-date-picker
            format="YYYY-MM-DD"
            value={value.value ? moment(value.value) : null}
            onChange={handleChange}
          />
         </div>
      )
    }
  }
}