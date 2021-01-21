import Input from './input'

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

    return () => {

      return (
        <Input
          {...props}
        />
      )
    };
  }
}