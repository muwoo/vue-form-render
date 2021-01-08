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

export {
  resolve,
  getSubSchemas,
  clone,
};