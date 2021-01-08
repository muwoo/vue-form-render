import {getSubSchemas} from '../utils';
import input from './input';
import color from './color';
import date from './date';

const mapping = {
  default: 'input',
  string: 'input',
  object: 'map',
  'string:color': 'color',
  'string:date': 'date',
}

const map = {
  props: {
    schema: Object,
    formData: Object,
    value: [String, Number, Boolean, Object],
    onChange: Function,
    name: String,
  },
  setup(props) {
    const childrenSchemas = getSubSchemas(props.schema);
    return () => {
      return (
        <div>
          {
            Object.keys(props.value).map((name, index) => {
              const schema = childrenSchemas[index].schema;
              const Field = widgets[mapping[`${schema.type}${schema.format ? `:${schema.format}` : ''}`]];
              if (!Field) return null;
              return (
                <Field
                  value={props.value[name]}
                  schema={schema}
                  name={name}
                  onChange={(key, val) => {
                    const value = {
                      ...props.value,
                      [key]: val,
                    };
                    props.onChange(props.name, value);
                  }}
                />
              )
            })
          }
        </div>
      )
    }
  }
}

const widgets = {
  input,
  map,
  color,
  date,
}

export default map