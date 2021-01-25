import {validate, convertValue} from './index';

// 值是是否为空
const isEmptyValue = (value, schema) => {
  // 多选组件的值为 [] 时，也判断为空值
  if (schema.type === 'array' && schema.enum) {
    return !value || value.length === 0;
  }
  // boolean里的false, number里的0, 都不要认为是空值
  if (value === 0 || value === false) {
    return false;
  }
  return !value;
};

const dealTypeValidate = (key, value, schema = {}, _formData) => {
  const checkList = [];
  const { type, items } = schema;
  const obj = {
    value,
    schema,
  };
  if (type === 'object') {
    const list = getValidateList(value, schema, _formData); // eslint-disable-line
    checkList.push(...list);
  } else if (type === 'array') {
    value.forEach(v => {
      const list = dealTypeValidate(key, v, items, _formData);
      checkList.push(...list);
    });
  }
  if (validate(obj)) {
    checkList.push(key);
  }
  return checkList;
};


export const getValidateList = (val = {}, schema = {}, formData) => {
  const _formData = formData || val;
  const checkList = [];
  const { properties, required } = schema;
  // 校验必填（required 属性只在 type:object 下存在）
  if (required && required.length > 0) {
    required.forEach(key => {
      const schema = (properties && properties[key]) || {};
      const hidden = schema['ui:hidden'];
      const itemValue = val && val[key];
      const _hidden = convertValue(hidden, _formData, val);
      if (isEmptyValue(itemValue, schema) && !_hidden) {
        checkList.push(key);
      }
    });
  }

  if (properties && val && Object.keys(val) && Object.keys(val).length > 0) {
    Object.keys(val).forEach(key => {
      const value = val[key];
      const schema = properties[key] || {};
      const list = dealTypeValidate(key, value, schema, _formData);
      checkList.push(...list);
    });
  }

  return checkList;
};
