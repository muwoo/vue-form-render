import {toRefs} from "vue";
import '../styles/common.less';

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
    const handleChange = (e) => {
      onChange.value(name.value, e.target.value);
    }

    const upload = ({file}) => {
      try {
        const imgSrc = file.response.data[0];
        onChange.value(name.value, imgSrc);
      } catch (e) {
        // ignore
      }
    }

    return () => {
      return (
        <div className="form-item">
          <div className="form-item-title">
            {props.schema.title}
            <span style={{
              color: props.invalidText && '#ff4d4f'
            }}>{props.invalidText && props.invalidText}</span>
          </div>
          <div className="flex align-center">
            {
              props.schema.action && <a-upload
                action={props.schema.action}
                onChange={upload}
                showUploadList={false}
                accept=".png,.gif,.jpg,.jpeg"
                name="filed"
                data={{
                  action: 'fileUpload'
                }}
              >
                <a-button>
                  <upload-outlined/>
                </a-button>
              </a-upload>
            }
            <a-input
              className="flex1"
              value={value.value}
              type="text"
              onInput={handleChange}
            />
            <a-popover v-slots={{
              content: () => (
                <a-image width={100} src={value.value} />
              )
            }}>
              <div>
                <a-button> <FileImageOutlined /></a-button>
              </div>
            </a-popover>
          </div>
        </div>
      )
    }
  }
}