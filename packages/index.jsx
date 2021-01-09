/* eslint-disable */
import {toRefs, watch} from 'vue';
import { resolve, clone } from './utils/index';
import Map from './widgets/map.jsx';


export default {
  props: {
    schema: Object,
    formData: Object,
    options: Object,
  },

  setup(props, {emit}) {
    if (!props.schema) return null;

    const {formData, schema} = toRefs(props)

    let data = resolve(props.schema, formData.value);
    emit('on-change', data);
    watch(formData,() => {
      data = formData.value;
    });

    watch(schema,() => {
      data = resolve(props.schema, formData.value);
      emit('on-change', data);
    });

    // data修改比较常用，所以放第一位
    const resetData = (newData, newSchema) => {
      const _schema = newSchema || props.schema;
      const _formData = newData || props.formData;
      const res = resolve(_schema, _formData);
      return new Promise(resolve => {
        emit('on-change', res);
        resolve(res);
      });
    };

    const handleChange = (key, val) => {
      emit('on-change', clone(val));
    };
    return () => {
      return (
        <div className="vue-form-render">
          <Map
            schema={props.schema}
            formData={data}
            value={data}
            name="$form"
            onChange={handleChange}
            settings={props.options}
          />
        </div>
      )
    }
  }
}