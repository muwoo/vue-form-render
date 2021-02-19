import Draggable from "vue3-form-render-vuedraggable";
import XLSX from 'xlsx';
import {getSubSchemas, resolve, clone, validate, convertValue} from '../utils';
import input from './input';
import url from './url'
import color from './color';
import date from './date';
import image from './image';
import number from './number';
import boolean from './boolean';
import range from './range';
import multiSelect from './multiSelect'
import multiCheckbox from './multiCheckbox'
import richText from './richText'

const reader = new FileReader();

const index = {
  props: {
    schema: Object,
    formData: Object,
    value: [String, Number, Boolean, Object],
    onChange: Function,
    name: String,
  },
  setup(props) {
    return () => {
      const childrenSchemas = getSubSchemas(props.schema);

      return (
        <div className="form-item object">
          {props.schema.title && <div className="title">{props.schema.title}</div>}
          <div className="content">
            {
              Object.keys(props.value).map((name, index) => {
                const schema = childrenSchemas[index].schema;
                const Field = widgets[mapping[`${schema.type}${schema.format ? `:${schema.format}` : ''}`]];
                if (!Field) return null;
                if (convertValue(schema['ui:hidden'], props.value[name], props.value)) return null;
                const invalidText = validate({
                  name,
                  schema,
                  value: props.value[name],
                  required: props.schema.required
                });
                return (
                  <Field
                    invalidText={invalidText}
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
        </div>
      )
    }
  }
}

const array = {
  props: {
    schema: Object,
    formData: Object,
    value: [String, Number, Boolean, Object],
    onChange: Function,
    name: String,
    invalidText: String,
  },
  setup(props) {
    const parseExcel = (file) => {
      const childrenSchemas = getSubSchemas(props.schema);
      reader.readAsArrayBuffer(file);
      // 第二步 监听读取完成后的回调
      reader.onload = function(e){
        const data = e.target.result;
        const wb = XLSX.read(data,{
          type:'array'
        });
        // 通过SheetNames[0]得到第一个sheet的名称
        const sheet1name = wb.SheetNames[0];
        // 取出第一个sheet
        const sheet1 = wb.Sheets[sheet1name];
        // 调用XLSX.utils.sheet_to_json方法将sheet转化为json;
        let value = [];
        const originValue = props.value[0] ? clone(props.value)[0] : resolve(childrenSchemas[0].schema);
        if (typeof originValue !== "object") {
          value = XLSX.utils.sheet_to_json(sheet1, {header:1});
          value = value.map(v => v[0]);
        } else {
          value = XLSX.utils.sheet_to_json(sheet1);
        }

        props.onChange(props.name, value);
      }

      return false;
    }

    const exportExcel = () => {
      const childrenSchemas = getSubSchemas(props.schema);
      let data = props.value.length ? clone(props.value) : [resolve(childrenSchemas[0].schema)];
      if (typeof data[0] !== "object") data = [data]
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws);
      XLSX.writeFile(wb, `${props.schema.title}.xlsx`);
    }

    return () => {
      const childrenSchemas = getSubSchemas(props.schema);

      const type = props.schema["ui:widget"];

      if (type === 'multiSelect') {
        return (
          <multiSelect
            className="flex1"
            value={props.value}
            schema={props.schema}
            name={props.name}
            onChange={(key, val) => {
              props.onChange(props.name, val);
            }}
          />
        )
      }

      if (props.schema.enum) {
        return (
          <multiCheckbox
            className="flex1"
            value={props.value}
            schema={props.schema}
            name={props.name}
            onChange={(key, val) => {
              props.onChange(props.name, val);
            }}
          />
        )
      }

      return (
        <div className="form-item object">
          {
            props.schema.title && (
              <div className="title">
                {props.schema.title}
                <span style={{
                  color: props.invalidText && '#ff4d4f'
                }}>{props.invalidText && props.invalidText}</span>
                <div className="flex align-center">
                  <a-upload
                    accept=".xlsx"
                    multiple={false}
                    showUploadList={false}
                    beforeUpload={parseExcel}
                  >
                    <span className="upload-excel">导入 excel</span>
                  </a-upload>
                  <span className="upload-excel" onClick={exportExcel}>下载 excel</span>
                  {props.schema.maxLength && props.schema.maxLength <= props.value.length ? null :
                   <PlusOutlined
                    onClick={() => {
                      const value = [
                        ...props.value,
                      ];
                      value.push(value[0] || resolve(childrenSchemas[0].schema));
                      props.onChange(props.name, value);
                    }}
                  />}
                </div>

              </div>
            )
          }
          <div className="content">
            <Draggable
              modelValue={props.value}
              class="list-group"
              handle=".handle"
              itemKey="list-group"
              onUpdate:modelValue={(v) => {
                const value = [
                  ...clone(v),
                ];
                props.onChange(props.name, value);
              }}
              v-slots={{
                item: ({index}) => {
                  const v = props.value[index];

                  const schema = childrenSchemas[index]?.schema || childrenSchemas[0].schema;
                  const Field = widgets[mapping[`${schema.type}${schema.format ? `:${schema.format}` : ''}`]];
                  if (!Field) return null;
                  return (
                    <a-collapse>
                      <a-collapse-panel
                        key="1"
                        v-slots={{
                          header: () => <DragOutlined class="handle" />,
                          extra: () => (
                            props.schema.minLength && props.schema.minLength >= props.value.length ? null :
                              <DeleteOutlined
                                onClick={() => {
                                  const value = clone(props.value);
                                  value.splice(index, 1);
                                  props.onChange(props.name, value);
                                }}
                              />
                          )
                        }}
                      >
                        <Field
                          className="flex1"
                          value={v}
                          schema={schema}
                          name={`${index}`}
                          onChange={(key, val) => {
                            const value = [
                              ...props.value,
                            ];
                            value[key] = val;
                            props.onChange(props.name, value);
                          }}
                        />
                      </a-collapse-panel>
                    </a-collapse>
                  )
                }
              }}
            >
            </Draggable>
          </div>
        </div>
      )
    }
  },
  components: {
    Draggable,
  }
}

const mapping = {
  default: 'input',
  string: 'input',
  object: 'map',
  array: 'array',
  number: 'number',
  boolean: 'boolean',
  multiSelect: 'multiSelect',
  multiCheckbox: 'multiCheckbox',
  'range:dateTime': 'range',
  'string:email': 'input',
  'string:textarea': 'input',
  'string:url': 'url',
  'string:color': 'color',
  'string:image': 'image',
  'string:date': 'date',
  'string:richText': 'richText',
}

const widgets = {
  input,
  map: index,
  url,
  color,
  date,
  array,
  image,
  number,
  boolean,
  range,
  multiSelect,
  multiCheckbox,
  richText,
}

export {
  widgets,
  mapping
}