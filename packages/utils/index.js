import {getValidateList} from './validate';
import isLength from 'validator/lib/isLength';
import {isEmail, isUrl, baseGet, hasRepeat, isEmptyObject} from './utils';

// 判断schema的值是是否是“函数”
// JSON无法使用函数值的参数，所以使用"{{...}}"来标记为函数，也可使用@标记，不推荐。
function isFunction(func) {
  if (typeof func === 'function') {
    return true;
  }
  if (typeof func === 'string' && func.substring(0, 1) === '@') {
    return func.substring(1);
  }
  if (
    typeof func === 'string' &&
    func.substring(0, 2) === '{{' &&
    func.substring(func.length - 2, func.length) === '}}'
  ) {
    return func.substring(2, func.length - 2);
  }
  return false;
}

// 克隆对象
function clone(data) {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (e) {
    return data;
  }
}

// 获取当前字段默认值
function getDefaultValue(schema) {
  const { default: def, enum: enums = [], type } = schema;
  const defaultValue = {
    array: [],
    boolean: false,
    integer: '',
    null: null,
    number: '',
    object: {},
    string: '',
    range: null,
  };

  if (isFunction(def)) {
    return defaultValue[type];
  }
  if (isFunction(enums)) {
    if (type === 'array') {
      return [];
    }
    if (type === 'string' || type === 'number') {
      return '';
    }
  }

  // 如果设置默认值，优先从默认值中获取
  if (typeof def !== 'undefined') {
    return def;
  }
  // array且enum的情况，为多选框，默认值[]
  if (type === 'array' && enums.length) {
    return [];
  }
  // 如果enum是表达式，不处理
  // 如果设置枚举值，其次从枚举值中获取
  if (Array.isArray(enums) && enums[0] && typeof enums[0] !== 'undefined') {
    if (schema.hasOwnProperty('default')) { // eslint-disable-line
      return schema.default; // 就算default: undefined, 也用 undefined, 这样就可以清空了
    }
    return enums[0];
  }
  // 最后使用对应基础类型的默认值
  return defaultValue[type];
}

function resolve(schema, data, options = {}) {
  const {
    // 类型
    type,
    // 对象子集
    properties,
    // 数组子集
    items,
    // 必选值，对象的子集
    default: def,
    required = [],
    'ui:widget': widget,
  } = schema;
  const {
    // 按照required规则做数据补全
    checkRequired = false,
  } = options;

  const value =
    typeof data === 'undefined' ? getDefaultValue(schema) : clone(data);

  if (type === 'object') {
    // 如果自定义组件
    if (widget) {
      if (def && typeof def === 'object') {
        return def;
      }
      return value;
    }
    const subs = properties || {};
    const ret = {};
    Object.keys(subs).forEach(name => {
      const checkAndPass =
        checkRequired && [].concat(required).indexOf(name) !== -1;
      if (!checkRequired || checkAndPass) {
        ret[name] = resolve(subs[name], value[name], options);
      }
    });
    return ret;
  }
  if (type === 'array') {
    // 如果没有value且default有值，用default
    if (def && Array.isArray(def) && !value) {
      return def;
    }
    // 如果自定义组件
    if (widget) return value;

    const subs = [].concat(items || []);
    const ret = [];
    value.forEach &&
    value.forEach((item, idx) => {
      ret[idx] = resolve(subs[idx] || subs[0], item, options);
    });
    return ret;
  }
  return value;
}

// 对于数组或对象类型，获取其子集schema
function getSubSchemas(schema = {}) {
  const {
    // object subset
    properties,
    // array subset
    items,
    // as subset's parent
    ...$parent
  } = schema;
  const { type } = $parent;
  // no subset
  if (!properties && !items) {
    return [];
  }
  let children = {};
  if (type === 'object') {
    children = properties;
  }
  if (type === 'array') {
    children = [].concat(items);
  }
  return Object.keys(children).map(name => ({
    schema: children[name],
    name,
    // parent propsSchema
    $parent,
  }));
}

const validate = ({name, schema, value, required = []}) => {
  const {
    type,
    'ui:options': options,
    message,
    maxLength,
    minLength,
    format,
    pattern,
    maximum,
    minimum,
    maxItems,
    minItems,
    uniqueItems,
  } = schema;
  // schema 里面没有内容的，直接退出
  if (isEmptyObject(schema)) {
    return false;
  }
  if (required.indexOf(name) >= 0 && (!value || !value.length)) {
    return '不能为空'
  }
  // 正则
  const usePattern = pattern && ['string', 'number'].indexOf(type) > -1;
  // 字符串
  if (type === 'string') {
    // TODO： 考虑了下，目前先允许 string 类的填入值是 undefined null 和 数字，校验的时候先转成 string
    let _finalValue = value;
    if (typeof value !== 'string') {
      if (value === null || value === undefined) {
        _finalValue = '';
      } else {
        _finalValue = String(value);
        // return '内容不是字符串，请修改'; // 这里可以强制提示，但旧项目有修改成本
      }
    }

    const noTrim = options && options.noTrim; // 配置项，不需要trim
    const trimedValue = _finalValue.trim();
    if (trimedValue !== _finalValue && !noTrim) {
      return (message && message.trim) || `输入的内容有多余空格`;
    }
    if (_finalValue && maxLength) {
      if (!isLength(_finalValue, 0, parseInt(maxLength, 10))) {
        return (message && message.maxLength) || `长度不能大于 ${maxLength}`;
      }
    }
    if (_finalValue && (minLength || minLength === 0)) {
      if (
        !_finalValue ||
        !isLength(_finalValue, parseInt(minLength, 10), undefined)
      ) {
        return (message && message.minLength) || `长度不能小于 ${minLength}`;
      }
    }
    if (format === 'color') {
      if (value === '') return '请填写正确的颜色格式';
    }
    if (format === 'image') {
      const imagePattern =
        '([/|.|w|s|-])*.(?:jpg|gif|png|bmp|apng|webp|jpeg|json)';
      // image 里也可以填写网络链接
      const _isUrl = isUrl(value);
      const _isImg = new RegExp(imagePattern).test(value);
      if (usePattern) {
        // ignore
      } else if (value && !_isUrl && !_isImg) {
        return (message && message.image) || '请输入正确的图片格式';
      }
    }

    if (format === 'url') {
      if (usePattern) {
        // ignore
      } else if (value && !isUrl(value)) {
        return (message && message.url) || '请输入正确的url格式';
      }
    }
    if (format === 'email') {
      if (usePattern) {
        // ignore
      } else if (value && !isEmail(value)) {
        return (message && message.email) || '请输入正确的email格式';
      }
    }
  }

  // 数字相关校验
  if (type === 'number') {
    if (typeof value !== 'number') {
      return '请填写数字';
    }
    if (maximum && parseFloat(value, 10) > maximum) {
      return (message && message.maximum) || `数值不能大于 ${maximum}`;
    }
    if ((minimum || minimum === 0) && parseFloat(value, 10) < minimum) {
      return (message && message.minimum) || `数值不能小于 ${minimum}`;
    }
  }

  // 正则只对数字和字符串有效果
  // value 有值的时候才去算 pattern。从场景反馈还是这样好
  if (value && usePattern && !new RegExp(pattern).test(value)) {
    return (message && message.pattern) || '格式不匹配';
  }

  // 数组项目相关校验
  if (type === 'array') {
    if (maxItems && value && value.length > maxItems) {
      return (message && message.maxItems) || `数组长度不能大于 ${maxItems}`;
    }

    if (
      (minItems || minItems === 0) &&
      value &&
      value.length < minItems
    ) {
      return (message && message.minItems) || `数组长度不能小于 ${minItems}`;
    }

    if (uniqueItems && Array.isArray(value) && value.length > 1) {
      if (typeof uniqueItems === 'boolean') {
        if (hasRepeat(value)) {
          return '存在重复元素';
        }
      }
      if (typeof uniqueItems === 'string') {
        try {
          const nameList = value.map(item => baseGet(item, uniqueItems));
          // 只考虑非object的情况
          const isRepeat = nameList.find(
            (x, index) => nameList.indexOf(x) !== index
          );
          if (isRepeat) {
            return uniqueItems + ' 的值存在重复的';
          }
        } catch (e) {
          // ignore
        }
      }
    }
  }
  return ''
}


function safeEval(code) {
  return Function(`"use strict"; ${code}`)();
}

const evaluateString = (string, formData, rootValue) =>
  safeEval(`
  const rootValue =${JSON.stringify(rootValue)};
  const formData = ${JSON.stringify(formData)};
  return (${string})
  `);

const convertValue = (item, formData, rootValue) => {
  if (typeof item === 'function') {
    return item(formData, rootValue);
  } else if (typeof item === 'string' && isFunction(item) !== false) {
    const _item = isFunction(item);
    try {
      return evaluateString(_item, formData, rootValue);
    } catch (error) {
      console.error(error.message);
      console.error(`happen at ${item}`);
      return item;
    }
  }
  return item;
};

export {
  resolve,
  getSubSchemas,
  clone,
  getValidateList,
  validate,
  evaluateString,
  convertValue,
};