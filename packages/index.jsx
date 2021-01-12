/* eslint-disable */
import {toRefs, watch, reactive} from 'vue';
import { resolve, clone, getValidateList } from './utils/index';
import {widgets, mapping} from './widgets';

export default {
  props: {
    schema: Object,
    formData: Object
  },

  setup(props, {emit}) {
    if (!props.schema) return null;

    const {formData, schema} = toRefs(props)

    let data = resolve(props.schema, formData.value);
    emit('on-change', data);
    watch(formData,() => {
      data = resolve(props.schema, formData.value);
      emit('on-validate', getValidateList(data, props.schema));
    });

    watch(schema.value,() => {
      data = resolve(props.schema, formData.value);
      emit('on-change', data);
    });

    const handleChange = (key, val) => {
      emit('on-change', clone(val));
    };
    return () => {
      const Field = widgets[mapping[`${props.schema.type}${props.schema.format ? `:${props.schema.format}` : ''}`]];
      return (
        <div className="vue-form-render">
          <Field
            schema={props.schema}
            formData={data}
            value={data}
            name="$form"
            onChange={handleChange}
          />
        </div>
      )
    }
  }
}