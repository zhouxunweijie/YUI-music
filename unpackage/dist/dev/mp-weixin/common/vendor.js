(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"雨","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' &&
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"雨","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"雨","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"雨","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"雨","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent'])
        .call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        })
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 4 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 5 */
/*!***********************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/pages.json ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/*!****************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/mixins/audio.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 10));var _playStore = _interopRequireDefault(__webpack_require__(/*! ./playStore.js */ 13));
var _index = _interopRequireDefault(__webpack_require__(/*! @/store/moduleName/index.js */ 15));
var _util = _interopRequireDefault(__webpack_require__(/*! @/common/util */ 16));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{
  extends: _playStore.default,
  methods: {
    initAudio: function initAudio() {var _this = this;
      console.log('初始化播放器');
      var Audio = uni.getBackgroundAudioManager();

      // 音频加载成功，可以播放
      Audio.onCanplay(function () {
        console.log('音频加载成功', _this.Audio.duration);
        _this.setTotalSeconds(_this.Audio.duration);
        _this.setPlayState(true);
        _this.play();
      });

      Audio.onPlay(function () {
        console.log('开始播放');
      });

      Audio.onPause(function () {
        console.log('播放暂停');
        _this.setPlayState(false);
      });

      Audio.onStop(function () {
        console.log('播放非自然停止');
        _this.setPlayState(false);
      });

      Audio.onEnded(function () {
        console.log('播放自然停止');
        _this.setPlayState(false);
        var index = _this.playIndex + 1;
        if (index > _this.playList.length) {
          _this.setPlayIndex(0);
          index = 0;
        } else {
          _this.setPlayIndex(index);
        }

        _this.setMusic(index);
      });

      Audio.onTimeUpdate(function () {
        // console.log('播放进度更新事件');
        _this.setPlaySeconds(_this.Audio.currentTime);
        var progress = (_this.Audio.currentTime / _this.totalSeconds * 100).toFixed(0);
        _this.setProgress(Number(progress));
      });

      Audio.onError(function (res) {
        console.log('播放失败');
        _this.setPlayState(false);
      });
      _vue.default.prototype.Audio = Audio;
      _vue.default.prototype.setAudio = this.setAudio;
      _vue.default.prototype.play = this.play;
      _vue.default.prototype.pause = this.pause;
      _vue.default.prototype.getMusicPlayUrl = this.$api.getPlayUrl;
      _vue.default.prototype.getLrc = this.$api.getLrc;
      _vue.default.prototype.getMusicOtherInfo = this.$api.getMusicOtherInfo;

      // this.setPlayList([])
    },
    setMusic: function setMusic(index, fun) {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var music, newUrl, length;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                music = _this2.playList[index];if (!(
                index !== _this2.playIndex)) {_context.next = 16;break;}_context.next = 4;return (

                  _this2.getMusicPlayUrl(music));case 4:music.url = _context.sent;if (!(
                music.url === "")) {_context.next = 10;break;}_context.next = 8;return (
                  _this2.$api.isCanPlayInKuwo(music.name + " " + music.singer));case 8:newUrl = _context.sent;
                if (newUrl != 'res not found') {
                  music.url = newUrl;
                } else {
                  //说明该歌曲无法播放
                  music.canPlay = false;
                  index = ++index;
                  length = _this2.playList.length;
                  if (index == length - 1) {
                    index = 0;
                  }
                  _util.default.showToast('当前音乐不支持播放，自动播放下首音乐');
                  _this2.setMusic(index, function () {});
                }case 10:if (



                music.coverImage) {_context.next = 13;break;}_context.next = 13;return (
                  _this2.getMusicOtherInfo(music).then(function (musicResult) {
                    music.coverImage = musicResult;
                  }));case 13:


                if (music.url) {
                  _this2.Audio.src = music.url;
                  _this2.setPlayIndex(index);
                  _this2.setPlayList(_this2.playList);
                } else {
                  console.log('音乐无法播放,请重新选择来源');
                }_context.next = 19;break;case 16:

                console.log(_this2.playState, 'this.playState');
                console.log(_this2.music, 'this.music');
                if (!_this2.playState) {
                  _this2.Audio.src = music.url;
                }case 19:

                fun && fun();case 20:case "end":return _context.stop();}}}, _callee);}))();
    },
    // 开始播放
    play: function play() {
      this.Audio.play();
    },
    // 暂停播放
    pause: function pause() {
      this.Audio.pause();
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 10 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 11);

/***/ }),
/* 11 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 12);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 12 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 13 */
/*!********************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/mixins/playStore.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vuex = __webpack_require__(/*! vuex */ 14);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =





{
  computed: _objectSpread(_objectSpread({},
  (0, _vuex.mapState)([
  'totalSeconds',
  'playSeconds',
  'progress',
  'playState',
  'playMode',
  'musicIsReady',
  'playList',
  'playIndex',
  'playName',
  'playImg',
  'playUrl',
  'showPlayBar'])),
  (0, _vuex.mapGetters)([
  'totalDuration',
  'playDuration'])),

  methods: _objectSpread({},
  (0, _vuex.mapMutations)([
  'setPlayIndex',
  'setShowPlayBar',
  'setPlayMode',
  'setPlayState',
  'setProgress',
  'setTotalSeconds',
  'setPlaySeconds',
  'setPlayList'])) };exports.default = _default;

/***/ }),
/* 14 */
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(item =>String.fromCharCode(item)).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 15 */
/*!**************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/store/moduleName/index.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  totalSeconds: "totalSeconds", // 总秒数
  playSeconds: "playSeconds", // 播放秒数
  progress: 'progress', // 进度百分比
  playMode: 'playMode', // 播放模式
  playList: 'playList', // 播放列表
  playIndex: 'playIndex', // 当前播放下标
  playName: 'playName', // 当前播放歌曲
  playImg: 'playImg', // 当前播放歌曲图片
  playUrl: 'playUrl', // 当前播放歌曲链接
  showPlayBar: 'showPlayBar', // 是否显示播放控件
  playState: 'playState' // 歌曲播放状态
};exports.default = _default;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/util.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.secondToDuration = secondToDuration;exports.objEquals = objEquals;exports.isExist = isExist;exports.findIndex = findIndex;exports.findObj = findObj;exports.isFind = isFind;exports.showToast = showToast;exports.formatLrc = formatLrc;exports.sortLrcArr = sortLrcArr;exports.formatTime = formatTime;exports.transformLrc = transformLrc;exports.isUseNetWork = isUseNetWork;function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * 秒数转时长  1 → 00:01
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */
function secondToDuration(second) {var fixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var sec = (second % 60).toFixed(fixed);
  var min = Math.floor(second / 60);
  if (min.toString().length < 2) {
    min = '0' + min;
  }
  if (sec < 10) {
    sec = '0' + sec;
  }
  return min + ':' + sec;
}

/**
   * 判断两个对象是否相等
   * @param {Object} o1
   * @param {Object} o2
   */
function objEquals(o1, o2) {
  if (o1 && o2) {
    return o1.platform == o2.platform && o1.id == o2.id;
  } else {
    return false;
  }
}

function isExist(list, obj) {
  for (var itemIndex in list) {
    var item = list[itemIndex];
    if (objEquals(item, obj)) {
      return true;
    }
  }
  return false;
}

function findIndex(list, obj) {
  for (var itemIndex in list) {
    var item = list[itemIndex];
    if (objEquals(item, obj)) {
      return parseInt(itemIndex);
    }
  }
  return -1;
}

function findObj(list, obj) {
  var index = findIndex(list, obj);
  if (inde != -1) {
    return list[index];
  }
  return null;
}

function isFind(list, obj) {
  var index = findIndex(list, obj);
  if (index != -1) {
    return true;
  }
  return false;
}

function showToast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;var icon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "none";var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "bottom";
  uni.showToast({
    title: title,
    icon: icon,
    duration: duration,
    position: position });

}
/**
   * 格式化歌词
   * @param {String} lrcStr 歌词文本
   * @param {String} mode 格式 object 对象模式，array 数组模式
   */
function formatLrc(lrcStr) {var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'object';
  var reg = /\[\d*:\d*(\.|:)\d*]/g;
  var timeReg = /\[(\d{2,})\:(\d{2})(?:\.(\d{1,3}))?\]/g; // eslint-disable-line no-useless-escape
  var timeResult = [];
  var index = 0;
  if (mode == 'object') {
    var lrcs = {};
    lrcStr.split("\n").forEach(function (item) {
      var timeRegAry = item.match(reg);
      if (timeRegAry) {
        var time = timeRegAry[0];
        var min = parseInt(time.match(/\[\d*/i).toString().slice(1));
        var sec = parseInt(time.match(/\:\d*/i).toString().slice(1));
        var second = min * 60 + sec;
        var content = item.replace(timeRegAry, "");
        lrcs[second] = {
          time: time,
          content: content };

      }
    });
    return lrcs;
  } else {
    var _lrcs = [];
    lrcStr.split("\n").forEach(function (item) {
      var timeRegAry = item.match(reg);
      if (timeRegAry) {
        var time = timeRegAry[0];
        var min = parseInt(time.match(/\[\d*/i).toString().slice(1));
        var sec = parseInt(time.match(/\:\d*/i).toString().slice(1));
        var second = min * 60 + sec;
        var content = item.replace(timeRegAry, "");
        _lrcs.push({
          second: second,
          time: time,
          content: content });

      }
    });
    return _lrcs;
  }

}
//下面三个为酷我音乐解析歌词
function sortLrcArr(arr) {
  var lrcSet = new Set();
  var lrc = [];
  var lrcT = [];var _iterator = _createForOfIteratorHelper(

  arr),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var item = _step.value;
      if (lrcSet.has(item.time)) {
        lrc.push(item);
      } else {
        lrcT.push(item);
        lrcSet.add(item.time);
      }
    }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
  if (lrc.length) {
    lrc.unshift(lrcT.shift());
  } else {
    lrc = lrcT;
    lrcT = [];
  }

  return {
    lrc: lrc,
    lrcT: lrcT };

}

function formatTime(time) {
  var m = parseInt(time / 60);
  var s = (time % 60).toFixed(2);
  return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
}

function transformLrc(songinfo, lrclist) {var _this = this;
  return "[ti:".concat(songinfo.songName, "]\n[ar:").concat(songinfo.artist, "]\n[al:").concat(songinfo.album, "]\n[by:]\n[offset:0]\n").concat(lrclist ? lrclist.map(function (l) {return "[".concat(_this.formatTime(l.time), "]").concat(l.lineLyric, "\n");}).join('') : '暂无歌词');
}


//是否能够使用流量进行播放、下载
function isUseNetWork(bool) {
  var network;
  uni.getNetworkType({
    success: function success(res) {
      network = res.networkType;
    } });

  if (!bool && (network == "2g" || network == "3g" || network == "4g" || network == "5g")) {
    // if(!bool && (network == "wifi" )){
    return false;
  } else {
    return true;
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 17 */,
/* 18 */,
/* 19 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 20 */
/*!***************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/store/index.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 14));
var util = _interopRequireWildcard(__webpack_require__(/*! @/common/util.js */ 16));


var _index = _interopRequireDefault(__webpack_require__(/*! @/store/moduleName/index.js */ 15));

var _StorageUtil = _interopRequireDefault(__webpack_require__(/*! @/common/StorageUtil.js */ 21));
var _playMode = __webpack_require__(/*! @/core/playMode.js */ 22);function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



// const modulesFiles = require.context('./modules', false, /\.js$/)

// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
// 	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
// 	const value = modulesFiles(modulePath)
// 	modules[moduleName] = value.default
// 	modules[moduleName]['namespaced'] = true;
// 	return modules
// }, {})

_vue.default.use(_vuex.default);



var store = new _vuex.default.Store({
  //modules,
  strict: false,
  state: {
    // 总秒数
    totalSeconds: _StorageUtil.default.get(_index.default.totalSeconds, 0),
    // 播放秒数
    playSeconds: _StorageUtil.default.get(_index.default.playSeconds, 0),
    // 进度条
    progress: _StorageUtil.default.get(_index.default.progress, 0),
    // 播放状态
    playState: false,
    // 播放模式 list:列表循环，single:单曲循环
    playMode: _StorageUtil.default.getJson(_index.default.playMode, _playMode.playModeConfig.list),
    // 音乐是否准备完毕
    musicIsReady: false,
    // 播放列表
    playList: _StorageUtil.default.getJson(_index.default.playList, []),
    // 当前播放的下标
    playIndex: _StorageUtil.default.get(_index.default.playIndex, -1),
    // lrcStr: null,
    // // 歌词
    // lrcs: [],
    // // 当前歌词
    // lrc: {
    // 	time: '[00:00.00]',
    // 	content: '歌词加载中'
    // },
    playName: _StorageUtil.default.get(_index.default.playName, ""),
    playImg: _StorageUtil.default.get(_index.default.playImg, ""),
    //当前播放地址
    playUrl: _StorageUtil.default.get(_index.default.playUrl, ""),
    recentlyPlayList: [],
    // 参数：歌单
    paramSongList: [],
    // 是否首次运行
    isFirstRun: true,
    showPlayBar: _StorageUtil.default.get(_index.default.showPlayBar, false) // 是否显示播放控件
  },
  getters: {
    // 总时长 00:00
    totalDuration: function totalDuration(state) {
      return (0, util.secondToDuration)(state.totalSeconds);
    },
    // 播放时长
    playDuration: function playDuration(state) {
      return (0, util.secondToDuration)(state.playSeconds);
    } },

  mutations: {
    setTotalSeconds: function setTotalSeconds(state, num) {
      this.totalSeconds = num;
      _StorageUtil.default.set(_index.default.totalSeconds, num);
    },
    setPlaySeconds: function setPlaySeconds(state, num) {
      this.playSeconds = num;
      _StorageUtil.default.set(_index.default.playSeconds, num);
    },
    setPlayIndex: function setPlayIndex(state, playIndex) {
      state[_index.default.playIndex] = playIndex;
      _StorageUtil.default.set(_index.default.playIndex, playIndex);
    },
    setShowPlayBar: function setShowPlayBar(state, status) {
      state.showPlayBar = status;
      _StorageUtil.default.set(_index.default.showPlayBar, status);
    },
    setPlayMode: function setPlayMode(state, status) {
      state[_index.default.playMode] = status;
      _StorageUtil.default.setJson(_index.default.playMode, status);
    },
    setProgress: function setProgress(state, status) {
      state[_index.default.progress] = status;
      _StorageUtil.default.set(_index.default.progress, status);
    },
    setPlayList: function setPlayList(state, list) {
      state[_index.default.playList] = list;
      _StorageUtil.default.setJson(_index.default.playList, list);
    },
    setPlayState: function setPlayState(state, status) {
      state[_index.default.playState] = status;
    } },

  actions: {} });var _default =




store;exports.default = _default;

/***/ }),
/* 21 */
/*!**********************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/StorageUtil.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var set = function set(key) {var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  try {
    uni.setStorageSync(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

var setJson = function setJson(key) {var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  try {
    uni.setStorageSync(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
};

var get = function get(key) {var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  try {
    var value = uni.getStorageSync(key, value);
    if (value) {
      return value;
    } else {
      return defaultValue;
    }
  } catch (e) {
    return defaultValue;
  }
};
var getJson = function getJson(key) {var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  try {
    var value = uni.getStorageSync(key, value);
    if (value) {
      return JSON.parse(value);
    } else {
      return defaultValue;
    }
  } catch (e) {
    return defaultValue;
  }
};var _default =

{
  set: set,
  setJson: setJson,
  get: get,
  getJson: getJson };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 22 */
/*!*****************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/core/playMode.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.sourceConfig = exports.playModeConfig = void 0;var playModeConfig = {
  list: { id: 'list', icon: 'icon-shunxubofang', name: '列表循环' },
  single: { id: 'single', icon: 'icon-xunhuanbofang', name: '单曲循环' } };exports.playModeConfig = playModeConfig;


var sourceConfig = {
  qq: { platform: 'qq', name: 'qq音乐' },
  kuwo: { platform: 'kuwo', name: '酷我' },
  // migu:{platform:'migu', name:'咪咕'},
  kugou: { platform: 'kugou', name: '酷狗' },
  wyy: { platform: 'wyy', name: '网易云' } };exports.sourceConfig = sourceConfig;

/***/ }),
/* 23 */
/*!****************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/apis/service.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.api = exports.http = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! @/common/luch-request/index.js */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var http = new _index.default();exports.http = http;
var api = new _index.default();exports.api = api;


/**
                                                   * 此文件为request请求封装
                                                   */

http.setConfig(function (config) {/* config 为默认全局配置*/
  // config.baseURL = 'http://api.music.canace.cn'; /* 根域名 */
  config.baseURL = 'http://api.uniquestfq.ltd';
  config.header = {
    'content-type': 'application/x-www-form-urlencoded' };

  return config;
});
//请求前拦截
http.interceptors.request.use(function (config) {// 可使用async await 做异步操作
  config.header = _objectSpread({},
  config.header);

  //获取存储的token
  // const token = uni.getStorageSync('token');
  // config.header.token=token;
  return config;
}, function (config) {// 可使用async await 做异步操作
  return Promise.reject(config);
});


// 请求后拦截器
http.interceptors.response.use(function (response) {
  return response;
}, function (response) {
  //未登录时清空缓存跳转
  if (response.statusCode == 401) {
    uni.clearStorageSync();
    uni.navigateTo({
      url: "/pages/login/wechat" });

  }
  return Promise.reject(response);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 24 */
/*!*****************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/luch-request/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 25));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
_Request.default;exports.default = _default;

/***/ }),
/* 25 */
/*!************************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/luch-request/core/Request.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _dispatchRequest = _interopRequireDefault(__webpack_require__(/*! ./dispatchRequest */ 26));
var _InterceptorManager = _interopRequireDefault(__webpack_require__(/*! ./InterceptorManager */ 34));
var _mergeConfig = _interopRequireDefault(__webpack_require__(/*! ./mergeConfig */ 35));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ 36));
var _utils = __webpack_require__(/*! ../utils */ 29);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Request = /*#__PURE__*/function () {
  /**
                                     * @param {Object} arg - 全局配置
                                     * @param {String} arg.baseURL - 全局根路径
                                     * @param {Object} arg.header - 全局header
                                     * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
                                     * @param {String} arg.dataType = [json] - 全局默认的dataType
                                     * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。App和支付宝小程序不支持
                                     * @param {Object} arg.custom - 全局默认的自定义参数
                                     * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认30000。仅微信小程序（2.10.0）、支付宝小程序支持
                                     * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
                                     * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
                                     * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
                                     * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
                                     */
  function Request() {var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Request);
    if (!(0, _utils.isPlainObject)(arg)) {
      arg = {};
      console.warn('设置全局参数必须接收一个Object');
    }
    this.config = _objectSpread(_objectSpread({}, _defaults.default), arg);
    this.interceptors = {
      request: new _InterceptorManager.default(),
      response: new _InterceptorManager.default() };

  }

  /**
     * @Function
     * @param {Request~setConfigCallback} f - 设置全局默认配置
     */_createClass(Request, [{ key: "setConfig", value: function setConfig(
    f) {
      this.config = f(this.config);
    } }, { key: "middleware", value: function middleware(

    config) {
      config = (0, _mergeConfig.default)(this.config, config);
      var chain = [_dispatchRequest.default, undefined];
      var promise = Promise.resolve(config);

      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });

      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    }

    /**
       * @Function
       * @param {Object} config - 请求配置项
       * @prop {String} options.url - 请求路径
       * @prop {Object} options.data - 请求参数
       * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
       * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
       * @prop {Object} [options.header = config.header] - 请求header
       * @prop {Object} [options.method = config.method] - 请求方法
       * @returns {Promise<unknown>}
       */ }, { key: "request", value: function request()
    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.middleware(config);
    } }, { key: "get", value: function get(

    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.middleware(_objectSpread({
        url: url,
        method: 'GET' },
      options));

    } }, { key: "post", value: function post(

    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'POST' },
      options));

    } }, { key: "put", value: function put(


    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'PUT' },
      options));

    } }, { key: "delete", value: function _delete(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE' },
      options));

    } }, { key: "connect", value: function connect(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT' },
      options));

    } }, { key: "head", value: function head(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD' },
      options));

    } }, { key: "options", value: function options(




    url, data) {var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS' },
      _options));

    } }, { key: "trace", value: function trace(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE' },
      options));

    } }, { key: "upload", value: function upload(



    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'UPLOAD';
      return this.middleware(config);
    } }, { key: "download", value: function download(

    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'DOWNLOAD';
      return this.middleware(config);
    } }]);return Request;}();



/**
                               * setConfig回调
                               * @return {Object} - 返回操作后的config
                               * @callback Request~setConfigCallback
                               * @param {Object} config - 全局默认config
                               */exports.default = Request;

/***/ }),
/* 26 */
/*!********************************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/luch-request/core/dispatchRequest.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../adapters/index */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =


function _default(config) {
  return (0, _index.default)(config);
};exports.default = _default;

/***/ }),
/* 27 */
/*!**************************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/luch-request/adapters/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 28));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ../core/buildFullPath */ 30));
var _settle = _interopRequireDefault(__webpack_require__(/*! ../core/settle */ 33));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * 返回可选值存在的配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Array} keys - 可选值数组
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Object} config2 - 配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @return {{}} - 存在的配置项
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
var mergeKeys = function mergeKeys(keys, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });
  return config;
};var _default =
function _default(config) {
  return new Promise(function (resolve, reject) {
    var _config = {
      url: (0, _buildURL.default)((0, _buildFullPath.default)(config.baseURL, config.url), config.params),
      header: config.header,
      complete: function complete(response) {
        response.config = config;
        try {
          // 对可能字符串不是json 的情况容错
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {
        }
        (0, _settle.default)(resolve, reject, response);
      } };

    var requestTask;
    if (config.method === 'UPLOAD') {
      delete _config.header['content-type'];
      delete _config.header['Content-Type'];
      var otherConfig = {



        filePath: config.filePath,
        name: config.name };

      var optionalKeys = [






      'formData'];

      requestTask = uni.uploadFile(_objectSpread(_objectSpread(_objectSpread({}, _config), otherConfig), mergeKeys(optionalKeys, config)));
    } else if (config.method === 'DOWNLOAD') {
      requestTask = uni.downloadFile(_config);
    } else {
      var _optionalKeys = [
      'data',
      'method',

      'timeout',

      'dataType',

      'responseType'];











      requestTask = uni.request(_objectSpread(_objectSpread({}, _config), mergeKeys(_optionalKeys, config)));
    }
    if (config.getTask) {
      config.getTask(requestTask, config);
    }
  });
};exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 28 */
/*!****************************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/luch-request/helpers/buildURL.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildURL;

var utils = _interopRequireWildcard(__webpack_require__(/*! ./../utils */ 29));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function encode(val) {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

/**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
function buildURL(url, params) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

/***/ }),
/* 29 */
/*!*****************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/luch-request/utils.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.isObject = isObject;exports.isDate = isDate;exports.isURLSearchParams = isURLSearchParams;exports.forEach = forEach;exports.isBoolean = isBoolean;exports.isPlainObject = isPlainObject;exports.deepMerge = deepMerge;
var toString = Object.prototype.toString;

/**
                                           * Determine if a value is an Array
                                           *
                                           * @param {Object} val The value to test
                                           * @returns {boolean} True if value is an Array, otherwise false
                                           */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}


/**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}


/**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
   * 是否为boolean 值
   * @param val
   * @returns {boolean}
   */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
   * 是否为真正的对象{} new Object
   * @param {any} obj - 检测的对象
   * @returns {boolean}
   */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}



/**
   * Function equal to merge with the difference being that no reference
   * to original objects is kept.
   *
   * @see merge
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
function deepMerge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/***/ }),
/* 30 */
/*!******************************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/luch-request/core/buildFullPath.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildFullPath;

var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 31));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 32));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                            * Creates a new URL by combining the baseURL with the requestedURL,
                                                                                                                                                                            * only when the requestedURL is not already an absolute URL.
                                                                                                                                                                            * If the requestURL is absolute, this function returns the requestedURL untouched.
                                                                                                                                                                            *
                                                                                                                                                                            * @param {string} baseURL The base URL
                                                                                                                                                                            * @param {string} requestedURL Absolute or relative URL to combine
                                                                                                                                                                            * @returns {string} The combined full path
                                                                                                                                                                            */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),
/* 31 */
/*!*********************************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/luch-request/helpers/isAbsoluteURL.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the specified URL is absolute
               *
               * @param {string} url The URL to test
               * @returns {boolean} True if the specified URL is absolute, otherwise false
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),
/* 32 */
/*!*******************************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/luch-request/helpers/combineURLs.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Creates a new URL by combining the specified URLs
               *
               * @param {string} baseURL The base URL
               * @param {string} relativeURL The relative URL
               * @returns {string} The combined URL
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ?
  baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
  baseURL;
}

/***/ }),
/* 33 */
/*!***********************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/luch-request/core/settle.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = settle; /**
                                                                                                      * Resolve or reject a Promise based on response status.
                                                                                                      *
                                                                                                      * @param {Function} resolve A function that resolves the promise.
                                                                                                      * @param {Function} reject A function that rejects the promise.
                                                                                                      * @param {object} response The response.
                                                                                                      */
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  var status = response.statusCode;
  if (status && (!validateStatus || validateStatus(status))) {
    resolve(response);
  } else {
    reject(response);
  }
}

/***/ }),
/* 34 */
/*!***********************************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/luch-request/core/InterceptorManager.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


function InterceptorManager() {
  this.handlers = [];
}

/**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected });

  return this.handlers.length - 1;
};

/**
    * Remove an interceptor from the stack
    *
    * @param {Number} id The ID that was returned by `use`
    */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
    * Iterate over all the registered interceptors
    *
    * This method is particularly useful for skipping over any
    * interceptors that may have become `null` calling `eject`.
    *
    * @param {Function} fn The function to call for each interceptor
    */
InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};var _default =

InterceptorManager;exports.default = _default;

/***/ }),
/* 35 */
/*!****************************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/luch-request/core/mergeConfig.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 29);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 合并局部配置优先的配置，如果局部有该配置项则用局部，如果全局有该配置项则用全局
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Array} keys - 配置项
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} globalsConfig - 当前的全局配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} config2 - 局部配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @return {{}}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */
var mergeKeys = function mergeKeys(keys, globalsConfig, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof globalsConfig[prop] !== 'undefined') {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
/**
    *
    * @param globalsConfig - 当前实例的全局配置
    * @param config2 - 当前的局部配置
    * @return - 合并后的配置
    */var _default =
function _default(globalsConfig) {var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = config2.method || globalsConfig.method || 'GET';
  var config = {
    baseURL: globalsConfig.baseURL || '',
    method: method,
    url: config2.url || '',
    params: config2.params || {},
    custom: _objectSpread(_objectSpread({}, globalsConfig.custom || {}), config2.custom || {}),
    header: (0, _utils.deepMerge)(globalsConfig.header || {}, config2.header || {}) };

  var defaultToConfig2Keys = ['getTask', 'validateStatus'];
  config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultToConfig2Keys, globalsConfig, config2));

  // eslint-disable-next-line no-empty
  if (method === 'DOWNLOAD') {

  } else if (method === 'UPLOAD') {
    delete config.header['content-type'];
    delete config.header['Content-Type'];
    var uploadKeys = [









    'filePath',
    'name',
    'formData'];

    uploadKeys.forEach(function (prop) {
      if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      }
    });
  } else {
    var defaultsKeys = [
    'data',

    'timeout',

    'dataType',

    'responseType'];











    config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultsKeys, globalsConfig, config2));
  }

  return config;
};exports.default = _default;

/***/ }),
/* 36 */
/*!*************************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/common/luch-request/core/defaults.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 默认的全局配置
                                                                                                      */var _default =


{
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',

  responseType: 'text',

  custom: {},

  timeout: 30000,










  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  } };exports.default = _default;

/***/ }),
/* 37 */
/*!**************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/apis/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 10));var _service = __webpack_require__(/*! @/apis/service.js */ 23);


var _StorageUtil = _interopRequireDefault(__webpack_require__(/*! @/common/StorageUtil.js */ 21));
var _index = _interopRequireDefault(__webpack_require__(/*! @/store/moduleName/index.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}
//api地址
var base_url = 'http://api.uniquestfq.ltd';
// const base_url = 'http://api.music.canace.cn'
var _default =
{
  //导出api接口地址
  base_url: base_url,

  /**
                       * 因为酷我音乐接口可以免费获取付费音乐，这里增加一个付费音乐调取酷我接口
                       */

  isCanPlayInKuwo: function isCanPlayInKuwo(music) {var _this = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var params, data;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              params = {
                key: music,
                offset: 1,
                limit: 1 };_context.next = 3;return (

                _this.search_kuwo("kuwo", params));case 3:data = _context.sent;
              console.log(data);
              //如果酷我搜索不到歌曲，则跳过该歌曲
              if (!(data == "no data")) {_context.next = 9;break;}return _context.abrupt("return",
              "res not found");case 9:_context.next = 11;return (

                _service.http.get('/v1/kuwo/song?rid=' + data[0].id).then(function (res) {
                  return res.data;
                }));case 11:return _context.abrupt("return", _context.sent);case 12:case "end":return _context.stop();}}}, _callee);}))();


  },
  /**
      * 搜索
      */
  //判断是哪个搜索
  search: function search(platform, params) {
    console.log(platform, 'platform');
    switch (platform) {
      case 'qq':
        return this.search_qq(platform, params);
        break;
      case 'kuwo':
        return this.search_kuwo(platform, params);
        break;
      case 'migu':
        return this.search_migu(platform, params);
        break;
      case 'kugou':
        return this.search_kugou(platform, params);
        break;
      case 'wyy':
        return this.search_wyy(platform, params);
        break;}

  },
  //1.qq
  search_qq: function search_qq(platform, params) {var _this2 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                _service.http.get('/v1/qq/search', {
                  params: params }).
                then(function (res) {
                  var data = res.data.data.song.list.map(function (item) {return _this2.searchBuildMusic(platform, item);});
                  // console.log(data)
                  return data;
                }));case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2);}))();
  },
  //2.酷我
  search_kuwo: function search_kuwo(platform, params) {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                _service.http.get('/v1/kuwo/search', {
                  params: params }).
                then(function (res) {
                  //搜索不到该歌曲则返回“no data”
                  if (res.data.code == -1) {
                    return "no data";
                  } else {
                    var data = res.data.data.list.map(function (item) {return _this3.searchBuildMusic(platform, item);});
                    console.log(data);
                    return data;
                  }

                }));case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3);}))();
  },
  //3.咪咕
  search_migu: function search_migu(platform, params) {var _this4 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
                _service.http.get('/v1/migu/search', {
                  params: params }).
                then(function (res) {
                  var data = res.data.musics.map(function (item) {return _this4.searchBuildMusic(platform, item);});
                  return data;
                }));case 2:return _context4.abrupt("return", _context4.sent);case 3:case "end":return _context4.stop();}}}, _callee4);}))();
  },
  //4.酷狗
  search_kugou: function search_kugou(platform, params) {var _this5 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
                _service.http.get('/v1/kugou/search', {
                  params: params }).
                then(function (res) {
                  var data = res.data.data.lists.map(function (item) {return _this5.searchBuildMusic(platform, item);});
                  return data;
                }));case 2:return _context5.abrupt("return", _context5.sent);case 3:case "end":return _context5.stop();}}}, _callee5);}))();
  },
  //5.网易云
  search_wyy: function search_wyy(platform, params) {var _this6 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
                _service.http.get('/v1/wyy/search', {
                  params: params }).
                then(function (res) {
                  var data = res.data.result.songs.map(function (item) {return _this6.searchBuildMusic(platform, item);});
                  return data;
                }));case 2:return _context6.abrupt("return", _context6.sent);case 3:case "end":return _context6.stop();}}}, _callee6);}))();
  },

  /**
      * 搜索结果转换
      */

  //判断搜索结果转换
  searchBuildMusic: function searchBuildMusic(platform, params) {
    switch (platform) {
      case 'qq':
        return this.searchBuildMusic_qq(params);
        break;
      case 'kuwo':
        return this.searchBuildMusic_kuwo(params);
        break;
      case 'migu':
        return this.searchBuildMusic_migu(params);
        break;
      case 'kugou':
        return this.searchBuildMusic_kugou(params);
        break;
      case 'wyy':
        return this.searchBuildMusic_wyy(params);
        break;}

  },
  //1.qq
  searchBuildMusic_qq: function searchBuildMusic_qq(item) {
    return {
      id: item.songmid,
      name: item.songname,
      singer: item.singer[0].name,
      platform: 'qq',
      album: item.albumname,
      coverImage: "https://y.qq.com/music/photo_new/T002R300x300M000".concat(item.albummid, ".jpg"),
      lyric_url: base_url + "/v1/qq/lyric/?mid=".concat(item.songmid),
      tlyric_url: '',
      // canPlay: item.pay.payplay != 1,
      // canPlay: item.pay.payplay != 1 ? true : (this.isCanPlayInKuwo(item.songname + " " + item.singer[0].name) !=
      // 	"res not found" ? true : false),
      canPlay: true,
      loadOtherInfo: false,
      url: '',
      lyric: '' };

  },

  //2.酷我
  searchBuildMusic_kuwo: function searchBuildMusic_kuwo(item) {
    return {
      id: item.rid,
      name: item.name,
      singer: item.artist,
      platform: 'kuwo',
      album: item.album,
      coverImage: item.pic,
      // lyric_url: `https://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=${item.rid}`,
      lyric_url: base_url + "/v1/kuwo/lyric?rid=".concat(item.rid),
      tlyric_url: '',
      /* canPlay:item.payInfo.play == '1100', */
      // canPlay: item.payInfo.play != '1111',
      canPlay: true,
      loadOtherInfo: false };

  },
  //3.咪咕
  searchBuildMusic_migu: function searchBuildMusic_migu(item) {
    return {
      id: item.copyrightId,
      name: item.songName,
      singer: item.singerName,
      platform: 'migu',
      album: item.albumName,
      coverImage: item.cover,
      lyric_url: base_url + "/v1/migu/lyric?id=".concat(item.copyrightId),
      tlyric_url: '',
      canPlay: true,
      loadOtherInfo: false };

  },
  //4.酷狗
  searchBuildMusic_kugou: function searchBuildMusic_kugou(item) {
    var name = item.SongName.indexOf("<em>") ? item.SongName : item.SongName.substring(item.SongName.indexOf(
    "<em>") + 4, item.SongName.indexOf("</em>")) + item.SongName.slice(item.SongName.indexOf("</em>") + 5);
    var singer = item.SingerName.indexOf("<em>") ? item.SingerName : item.SingerName.substring(item.SingerName.
    indexOf(
    "<em>") + 4, item.SingerName.indexOf("</em>")) + item.SingerName.slice(item.SingerName.indexOf(
    "</em>") + 5);
    return {
      id: item.AlbumID,
      hash: item.FileHash,
      name: name,
      singer: singer,
      platform: 'kugou',
      album: item.AlbumName,
      coverImage: '',
      lyric_url: base_url + "/v1/kugou/lyric?hash=".concat(item.FileHash),
      tlyric_url: '',
      // canPlay: item.AlbumPrivilege == 8 ? true : (this.isCanPlayInKuwo(name + " " + singer) !=
      // 	"res not found" ? true : false),
      canPlay: true,
      loadOtherInfo: true };

  },
  //5.网易云
  searchBuildMusic_wyy: function searchBuildMusic_wyy(item) {
    return {
      id: item.id,
      name: item.name,
      singer: item.artists[0].name,
      platform: 'wyy',
      album: item.album.name,
      coverImage: '',
      lyric_url: '',
      tlyric_url: '',
      // canPlay: item.copyrightId == 0 ? true : (this.isCanPlayInKuwo(item.name + " " + item.artists[0].name) !=
      // 	"res not found" ? true : false),
      canPlay: true,
      loadOtherInfo: true };

  },

  //获取其他信息（这里是图片地址）
  getMusicOtherInfo: function getMusicOtherInfo(params) {
    switch (params.platform) {
      case 'kugou':
        return this.$H.getCoverImage_kugou(params);
        break;
      case 'wyy':
        return this.$H.getCoverImage_wyy(params);
        break;}

  },


  /**
      * 判断歌曲地址
      */

  getPlayUrl: function getPlayUrl(params) {var _this7 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7() {return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_context7.t0 =
              params.platform;_context7.next = _context7.t0 ===
              'qq' ? 3 : _context7.t0 ===


              'kuwo' ? 5 : _context7.t0 ===


              'migu' ? 7 : _context7.t0 ===


              'kugou' ? 9 : _context7.t0 ===



              'wyy' ? 12 : 14;break;case 3:return _context7.abrupt("return", _this7.$H.getPlayUrl_qq(params));case 5:return _context7.abrupt("return", _this7.$H.getPlayUrl_kuwo(params));case 7:return _context7.abrupt("return", _this7.$H.getPlayUrl_migu(params));case 9:console.log();return _context7.abrupt("return", _this7.$H.getPlayUrl_kugou(params));case 12:return _context7.abrupt("return",
              _this7.$H.getPlayUrl_wyy(params));case 14:case "end":return _context7.stop();}}}, _callee7);}))();


  },
  /**
      * 获取歌词
      */

  getLrc: function getLrc(params) {
    switch (params.platform) {
      case 'qq':
        return this.$H.getLrc_qq(params);
        break;
      case 'kuwo':
        return this.$H.getLrc_kuwo(params);
        break;
      case 'migu':
        return this.$H.getLrc_migu(params);
        break;
      case 'kugou':
        return this.$H.getLrc_kugou(params);
        break;
      case 'wyy':
        return this.$H.getLrc_wyy(params);
        break;}

  },

  /**
      * 获取歌单
      */
  getSongListGroup: function getSongListGroup(platform, params) {
    switch (platform) {
      case 'local':
        return this.getSongListGroup_local();
        break;
      case 'qq':
        return this.getSongListGroup_qq(params);
        break;
      case 'kuwo':
        return this.getSongListGroup_kuwo(params);
        break;
      case 'migu':
        return this.getSongListGroup_migu(params);
        break;
      case 'kugou':
        return this.getSongListGroup_kugou(params);
        break;
      case 'wyy':
        return this.getSongListGroup_wyy(params);
        break;}

  },

  getSongListGroup_local: function getSongListGroup_local() {
    return new Promise(function (resolve, reject) {
      var allSongList = _StorageUtil.default.getJson(_index.default.playList, []);
      resolve(allSongList);
    });
  },

  getSongListGroup_qq: function getSongListGroup_qq(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8() {return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:_context8.next = 2;return (
                _service.http.get('/v1/qq/playlist', {
                  params: params }).
                then(function (res) {
                  if (res.data.data.list) {
                    var _list = res.data.data.list.map(function (item) {
                      return {
                        coverImage: item.imgurl,
                        name: item.dissname,
                        id: item.dissid,
                        url: null,
                        singer: item.creator.name,
                        desc: null,
                        platform: 'qq',
                        album: null };

                    });
                    return _list;
                  }
                  return list;
                }));case 2:return _context8.abrupt("return", _context8.sent);case 3:case "end":return _context8.stop();}}}, _callee8);}))();
  },
  getSongListGroup_kuwo: function getSongListGroup_kuwo(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return (
                _service.http.get('/v1/kuwo/playlist/tag', {
                  params: params }).
                then(function (res) {
                  if (res.data.data.data) {
                    var _list2 = res.data.data.data.map(function (item) {
                      return {
                        coverImage: item.img,
                        name: item.name,
                        id: item.id,
                        url: null,
                        singer: item.uname,
                        desc: null,
                        platform: 'kuwo',
                        album: null };

                    });
                    return _list2;
                  }
                }));case 2:return _context9.abrupt("return", _context9.sent);case 3:case "end":return _context9.stop();}}}, _callee9);}))();
  },
  getSongListGroup_migu: function getSongListGroup_migu(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return (

                _service.http.get('/v1/migu/playlist', {
                  params: params }).
                then(function (res) {
                  if (res.data.data.contentItemList[0].itemList) {
                    var _list3 = res.data.data.contentItemList[0].itemList.map(function (item) {
                      var match = /id=([0-9]+)&/.exec(item.actionUrl);
                      var id = match ? match[1] : '';
                      return {
                        coverImage: item.imageUrl,
                        name: item.title,
                        id: id,
                        url: null,
                        singer: item.subTitle,
                        desc: null,
                        platform: 'migu',
                        album: null };

                    });
                    return _list3;
                  }
                  return [];
                }));case 2:return _context10.abrupt("return", _context10.sent);case 3:case "end":return _context10.stop();}}}, _callee10);}))();
  },
  getSongListGroup_kugou: function getSongListGroup_kugou(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11() {return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:_context11.next = 2;return (
                _service.http.get('/v1/kugou/playlist/tag', {
                  params: params }).
                then(function (res) {
                  if (res.data.special_db) {
                    var _list4 = res.data.special_db.map(function (item) {
                      return {
                        coverImage: item.img,
                        name: item.specialname,
                        id: item.specialid,
                        url: null,
                        singer: item.nickname,
                        desc: null,
                        platform: 'kugou',
                        album: null,
                        intro: item.intro };

                    });
                    return _list4;
                  }
                  return list;
                }));case 2:return _context11.abrupt("return", _context11.sent);case 3:case "end":return _context11.stop();}}}, _callee11);}))();
  },
  getSongListGroup_wyy: function getSongListGroup_wyy(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return (
                _service.http.get('/v1/wyy/playlist', {
                  params: params }).
                then(function (res) {
                  if (res.data.playlists) {
                    var _list5 = res.data.playlists.map(function (item) {
                      return {
                        coverImage: item.coverImgUrl,
                        name: item.name,
                        id: item.id,
                        url: null,
                        singer: item.creator.nickname,
                        desc: null,
                        platform: 'wyy',
                        album: null,
                        intro: item.description,
                        updateTime: item.updateTime };

                    });
                    return _list5;
                  }
                  return list;
                }));case 2:return _context12.abrupt("return", _context12.sent);case 3:case "end":return _context12.stop();}}}, _callee12);}))();
  },


  /**
      * @param {Object} params
      * 获取歌单详情,以及歌单列表
      */
  getSongListDetails: function getSongListDetails(params) {
    switch (params.platform) {
      case 'local':
        return this.getSongListDetails_local(params);
        break;
      case 'qq':
        return this.getSongListDetails_qq(params);
        break;
      case 'kuwo':
        return this.getSongListDetails_kuwo(params);
        break;
      case 'migu':
        return this.getSongListDetails_migu(params);
        break;
      case 'kugou':
        return this.getSongListDetails_kugou(params);
        break;
      case 'wyy':
        return this.getSongListDetails_wyy(params);
        break;}

  },
  getSongListDetails_local: function getSongListDetails_local(params) {
    return new Promise(function (resolve, reject) {
      var allSongList = _StorageUtil.default.getJson(_index.default.playList, []);
      var songList = allSongList.find(function (item) {return item.id == params.id;});
      resolve(songList);
      console.log(songList);
    });
  },
  getSongListDetails_qq: function getSongListDetails_qq(params) {var _this8 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:_context13.next = 2;return (
                _service.http.get('/v1/qq/playlist/info?pid=' + params.id).then(function (res) {
                  var data = res.data.cdlist[0];
                  var songlistData = res.data.cdlist[0].songlist.map(function (item) {return _this8.searchBuildMusic(params.
                    platform,
                    item);});
                  return {
                    coverImage: data.logo,
                    name: data.dissname,
                    id: data.dissid,
                    url: null,
                    singer: data.nickname,
                    desc: data.desc,
                    platform: 'qq',
                    album: null,
                    musicList: songlistData };

                }));case 2:return _context13.abrupt("return", _context13.sent);case 3:case "end":return _context13.stop();}}}, _callee13);}))();
  },
  getSongListDetails_kuwo: function getSongListDetails_kuwo(params) {var _this9 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14() {return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_context14.next = 2;return (
                _service.http.get('/v1/kuwo/playlist/info?pid=' + params.id).then(function (res) {
                  var data = res.data.data;
                  var songlistData = data.musicList.map(function (item) {return _this9.searchBuildMusic(params.platform,
                    item);});
                  return {
                    coverImage: data.img500,
                    name: data.name,
                    id: data.id,
                    url: null,
                    singer: data.uname,
                    desc: data.info,
                    platform: 'kuwo',
                    album: null,
                    musicList: songlistData };

                }));case 2:return _context14.abrupt("return", _context14.sent);case 3:case "end":return _context14.stop();}}}, _callee14);}))();
  },
  getSongListDetails_migu: function getSongListDetails_migu(params) {var _this10 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15() {return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:_context15.next = 2;return (
                _service.http.get('/v1/qq/playlist/info?pid=' + params.id).then(function (res) {
                  var data = res.data.cdlist[0];
                  var songlistData = res.data.cdlist[0].songlist.map(function (item) {return _this10.searchBuildMusic(params.
                    platform,
                    item);});
                  return {
                    coverImage: data.logo,
                    name: data.dissname,
                    id: data.dissid,
                    url: null,
                    singer: data.nickname,
                    desc: data.desc,
                    platform: 'migu',
                    album: null,
                    musicList: songlistData };

                }));case 2:return _context15.abrupt("return", _context15.sent);case 3:case "end":return _context15.stop();}}}, _callee15);}))();
  },
  getSongListDetails_kugou: function getSongListDetails_kugou(params) {var _this11 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16() {return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:_context16.next = 2;return (
                _service.http.get('/v1/kugou/playlist/info?pid=' + params.id).then(function (res) {
                  var data = res.data;
                  var songlistData = res.data.listData.map(function (item) {return _this11.songListBuildMusic_kugou(item);});
                  return {
                    coverImage: data.picurl,
                    name: data.name,
                    id: params.id,
                    url: null,
                    singer: params.singer,
                    desc: params.intro,
                    platform: 'kugou',
                    album: null,
                    musicList: songlistData };

                }));case 2:return _context16.abrupt("return", _context16.sent);case 3:case "end":return _context16.stop();}}}, _callee16);}))();
  },
  getSongListDetails_wyy: function getSongListDetails_wyy(params) {var _this12 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17() {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:
              console.log(params);_context17.next = 3;return (
                _service.http.get('/v1/wyy/playlist/info?pid=' + params.id).then(function (res) {
                  var data = res.data.playlist;
                  var songlistData = res.data.playlist.tracks.map(function (item) {return _this12.songListBuildMusic_wyy(item);});
                  return {
                    coverImage: data.coverImgUrl,
                    name: data.name,
                    id: data.id,
                    url: null,
                    singer: data.creator.nickname,
                    desc: data.description,
                    platform: 'wyy',
                    album: null,
                    musicList: songlistData };

                }));case 3:return _context17.abrupt("return", _context17.sent);case 4:case "end":return _context17.stop();}}}, _callee17);}))();
  },
  //酷狗 歌单详情单个歌曲内容转换
  songListBuildMusic_kugou: function songListBuildMusic_kugou(item) {
    return {
      id: item.album_id,
      hash: item.hash,
      name: item.songname,
      singer: item.singername,
      platform: 'kugou',
      album: item.album_name,
      coverImage: '',
      lyric_url: base_url + "/v1/kugou/lyric?hash=".concat(item.hash),
      tlyric_url: '',
      // canPlay: item.privilege == 8 ? true : (this.isCanPlayInKuwo(item.songname + " " + item.singername) !=
      // 	"res not found" ? true : false),
      canPlay: true,
      loadOtherInfo: true };

  },
  //网易云 歌单详情单个歌曲内容转换
  songListBuildMusic_wyy: function songListBuildMusic_wyy(item) {
    return {
      id: item.id,
      name: item.name,
      singer: item.ar[0].name,
      platform: 'wyy',
      album: item.al.name,
      coverImage: '',
      lyric_url: '',
      tlyric_url: '',
      // canPlay: item.fee == 8 ? true : (this.isCanPlayInKuwo(item.name + " " + item.ar[0].name) !=
      // 	"res not found" ? true : false) ,
      canPlay: true,
      loadOtherInfo: true };

  },


  //获取排行榜信息
  getRankDetail: function getRankDetail(params) {
    switch (params.platform) {
      case 'qq':
        return this.getRankDetail_qq(params);
        break;
      case 'kuwo':
        return this.getRankDetail_kuwo(params);
        break;
      case 'migu':
        return this.getRankDetail_migu(params);
        break;
      case 'kugou':
        return this.getRankDetail_kugou(params);
        break;
      case 'wyy':
        return this.getRankDetail_wyy(params);
        break;}

  },

  getRankDetail_qq: function getRankDetail_qq(params) {var _this13 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18() {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:_context18.next = 2;return (
                _service.http.get('/v1/qq/top/?topId=' + params.key).then(function (res) {
                  var data = res.data.detail.data.songInfoList;
                  var songlistData = data.map(function (item) {return _this13.rankBuildMusic_qq(item);});
                  return {
                    coverImage: params.pic,
                    name: params.name,
                    id: params.key,
                    url: null,
                    update: params.update,
                    desc: params.intro,
                    platform: 'qq',
                    album: null,
                    musicList: songlistData };

                }));case 2:return _context18.abrupt("return", _context18.sent);case 3:case "end":return _context18.stop();}}}, _callee18);}))();
  },
  getRankDetail_kuwo: function getRankDetail_kuwo(params) {var _this14 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19() {return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:_context19.next = 2;return (
                _service.http.get('/v1/kuwo/top?topId=' + params.key).then(function (res) {
                  var data = res.data.data.musicList;
                  var songlistData = data.map(function (item) {return _this14.rankBuildMusic_kuwo(item);});
                  return {
                    coverImage: params.pic,
                    name: params.name,
                    id: params.key,
                    url: null,
                    update: params.update,
                    desc: params.intro,
                    platform: 'kuwo',
                    album: null,
                    musicList: songlistData };

                }));case 2:return _context19.abrupt("return", _context19.sent);case 3:case "end":return _context19.stop();}}}, _callee19);}))();
  },
  getRankDetail_kugou: function getRankDetail_kugou(params) {var _this15 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:_context20.next = 2;return (
                _service.http.get('/v1/kugou/top?topId=' + params.key).then(function (res) {
                  var data = res.data.data;
                  var songlistData = data.map(function (item) {return _this15.rankBuildMusic_kugou(item);});
                  return {
                    coverImage: params.pic,
                    name: params.name,
                    id: params.key,
                    url: null,
                    update: params.update,
                    desc: params.intro,
                    platform: 'kugou',
                    album: null,
                    musicList: songlistData };

                }));case 2:return _context20.abrupt("return", _context20.sent);case 3:case "end":return _context20.stop();}}}, _callee20);}))();
  },
  getRankDetail_wyy: function getRankDetail_wyy(params) {var _this16 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21() {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:_context21.next = 2;return (
                _service.http.get('/v1/wyy/top?topId=' + params.key).then(function (res) {
                  var data = res.data.playlist;
                  var songlistData = res.data.playlist.tracks.map(function (item) {return _this16.rankBuildMusic_wyy(item);});
                  return {
                    coverImage: data.coverImgUrl,
                    name: data.name,
                    id: data.key,
                    url: null,
                    update: params.update,
                    desc: params.intro,
                    platform: 'wyy',
                    album: null,
                    musicList: songlistData };

                }));case 2:return _context21.abrupt("return", _context21.sent);case 3:case "end":return _context21.stop();}}}, _callee21);}))();
  },


  //排行榜对单个歌曲进行格式化
  rankBuildMusic_qq: function rankBuildMusic_qq(item) {
    return {
      id: item.mid,
      name: item.title,
      singer: item.singer[0].name,
      platform: 'qq',
      album: item.album.name,
      coverImage: "https://y.qq.com/music/photo_new/T002R300x300M000".concat(item.album.mid, ".jpg"),
      lyric_url: base_url + "/v1/qq/lyric/?mid=".concat(item.mid),
      tlyric_url: '',
      // canPlay: item.pay.pay_play != 1 ? true : (this.isCanPlayInKuwo(item.title + " " + item.singer[0].name) !=
      // 	"res not found" ? true : false),
      canPlay: true,
      loadOtherInfo: false };

  },
  rankBuildMusic_kuwo: function rankBuildMusic_kuwo(item) {
    return {
      id: item.rid,
      name: item.name,
      singer: item.artist,
      platform: 'kuwo',
      album: item.album,
      coverImage: item.pic,
      lyric_url: base_url + "/v1/kuwo/lyric?rid=".concat(item.rid),
      tlyric_url: '',
      // canPlay: item.payInfo.play != '1111',
      canPlay: true,
      loadOtherInfo: false };

  },
  rankBuildMusic_kugou: function rankBuildMusic_kugou(item) {
    return {
      id: item.album_id,
      hash: item.hash,
      name: item.songname,
      singer: item.singername,
      platform: 'kugou',
      album: item.album_name,
      coverImage: '',
      lyric_url: base_url + "/v1/kugou/lyric?hash=".concat(item.hash),
      tlyric_url: '',
      // canPlay: item.privilege == 8 ? true : (this.isCanPlayInKuwo(tem.songname + " " + item.singername) !=
      // 	"res not found" ? true : false),
      canPlay: true,
      loadOtherInfo: true };

  },
  rankBuildMusic_wyy: function rankBuildMusic_wyy(item) {
    return {
      id: item.id,
      name: item.name,
      singer: item.ar[0].name,
      platform: 'wyy',
      album: item.al.name,
      coverImage: '',
      lyric_url: '',
      tlyric_url: '',
      // canPlay: item.fee == 8 ? true : (this.isCanPlayInKuwo(item.name + " " + item.ar[0].name) !=
      // 	"res not found" ? true : false),
      canPlay: true,
      loadOtherInfo: true };

  } };exports.default = _default;

/***/ }),
/* 38 */
/*!**************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/apis/music.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 10));var _service = __webpack_require__(/*! @/apis/service.js */ 23);


var util = _interopRequireWildcard(__webpack_require__(/*! @/common/util.js */ 16));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}var _default =

{


  /**
   * 获取歌曲地址
   */

  //1.qq
  getPlayUrl_qq: function getPlayUrl_qq(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
                _service.http.get('/v1/qq/song?mid=' + params.id).then(function (res) {
                  return res.data.data.url;
                }));case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee);}))();
  },
  //2.酷我
  getPlayUrl_kuwo: function getPlayUrl_kuwo(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                _service.http.get('/v1/kuwo/song?rid=' + params.id).then(function (res) {
                  // return res.data.data.url;
                  return res.data;
                }));case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2);}))();
  },
  //3.咪咕
  getPlayUrl_migu: function getPlayUrl_migu(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
                _service.http.get('/v1/migu/song?cid=' + params.id).then(function (res) {
                  return res.data.url;
                }));case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3);}))();
  },
  //4.酷狗
  getPlayUrl_kugou: function getPlayUrl_kugou(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
                _service.http.get('/v1/kugou/song?aid=' + params.id + '&hash=' + params.hash).then(function (res) {
                  if (res.data.data.is_free_part == 1) {
                    return "";
                  } else {
                    return res.data.data.play_url;
                  }
                }));case 2:return _context4.abrupt("return", _context4.sent);case 3:case "end":return _context4.stop();}}}, _callee4);}))();
  },
  //5.网易云
  getPlayUrl_wyy: function getPlayUrl_wyy(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
                _service.http.get('/v1/wyy/song/url?mid=' + params.id).then(function (res) {
                  return res.data.data[0].url;
                }));case 2:return _context5.abrupt("return", _context5.sent);case 3:case "end":return _context5.stop();}}}, _callee5);}))();
  },


  /**
      * 获取歌词
      */

  //1.qq
  getLrc_qq: function getLrc_qq(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
                _service.http.get('/v1/qq/lyric?mid=' + params.id).then(function (res) {
                  return res.data.lyric;
                }));case 2:return _context6.abrupt("return", _context6.sent);case 3:case "end":return _context6.stop();}}}, _callee6);}))();
  },
  //2.酷我
  getLrc_kuwo: function getLrc_kuwo(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7() {return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_context7.next = 2;return (
                _service.http.get('/v1/kuwo/lyric?rid=' + params.id).then(function (res) {var _util$sortLrcArr =



                  util.sortLrcArr(res.data.data.lrclist),lrc = _util$sortLrcArr.lrc,lrcT = _util$sortLrcArr.lrcT;
                  console.log(lrc);
                  return util.transformLrc(res.data.data.songinfo, lrc);
                }));case 2:return _context7.abrupt("return", _context7.sent);case 3:case "end":return _context7.stop();}}}, _callee7);}))();
  },
  //3.咪咕
  getLrc_migu: function getLrc_migu(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8() {return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:_context8.next = 2;return (
                _service.http.get('/v1/migu/lyric?cid=' + params.id).then(function (res) {
                  return res.data.lyric;
                }));case 2:return _context8.abrupt("return", _context8.sent);case 3:case "end":return _context8.stop();}}}, _callee8);}))();
  },
  //4.酷狗
  getLrc_kugou: function getLrc_kugou(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return (
                _service.http.get('/v1/kugou/lyric?hash=' + params.hash).then(function (res) {
                  return res.data.lyric;
                }));case 2:return _context9.abrupt("return", _context9.sent);case 3:case "end":return _context9.stop();}}}, _callee9);}))();
  },
  //5.网易云
  getLrc_wyy: function getLrc_wyy(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return (
                _service.http.get('/v1/wyy/lyric?mid=' + params.id).then(function (res) {
                  return res.data.lrc.lyric;
                }));case 2:return _context10.abrupt("return", _context10.sent);case 3:case "end":return _context10.stop();}}}, _callee10);}))();
  },

  //酷狗获取歌曲图片地址
  getCoverImage_kugou: function getCoverImage_kugou(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11() {return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:_context11.next = 2;return (
                _service.http.get('/v1/kugou/song?aid=' + params.id + '&hash=' + params.hash).then(function (res) {
                  return res.data.data.img;
                }));case 2:return _context11.abrupt("return", _context11.sent);case 3:case "end":return _context11.stop();}}}, _callee11);}))();

  },

  //网易云获取歌曲图片地址
  getCoverImage_wyy: function getCoverImage_wyy(params) {return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return (
                _service.http.get('/v1/wyy/song?mid=' + params.id).then(function (res) {
                  return res.data.songs[0].al.picUrl;
                }));case 2:return _context12.abrupt("return", _context12.sent);case 3:case "end":return _context12.stop();}}}, _callee12);}))();

  } };exports.default = _default;

/***/ }),
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */
/*!************************************************************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/uni_modules/uni-transition/components/uni-transition/createAnimation.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.createAnimation = createAnimation;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} // const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var


MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {_classCallCheck(this, MPAnimation);
    this.options = options;
    this.animation = uni.createAnimation(options);
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;

  }_createClass(MPAnimation, [{ key: "_nvuePushAnimates", value: function _nvuePushAnimates(

    type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {} };

      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    } }, { key: "_animateRun", value: function _animateRun()
    {var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles },
        config),
        function (res) {
          resolve();
        });
      });
    } }, { key: "_nvueNextAnimate", value: function _nvueNextAnimate(

    animates) {var _this2 = this;var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {var

        styles =

        obj.styles,config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    } }, { key: "step", value: function step()

    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.animation.step(config);






      return this;
    } }, { key: "run", value: function run(

    fn) {

      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);








    } }]);return MPAnimation;}();



var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d',
'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY',
'translateZ'];

var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {var _this$animation;

    (_this$animation = this.animation)[type].apply(_this$animation, arguments);




    return this;
  };
});

function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */
/*!*********************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/static/icon/home.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 82 */
/*!****************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/static/icon/home_active.png ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 83 */
/*!*******************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/static/icon/me.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 84 */
/*!**************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/static/icon/me_active.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */
/*!********************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/static/icon/wyy.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 107 */
/*!**********************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/static/icon/wyy_h.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 108 */
/*!**********************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/static/icon/kugou.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 109 */
/*!************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/static/icon/kugou_h.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAIABJREFUeF7tfQuYXEWV/zm3u/OQ8HIVFUUE5aEhmUzXqckQiBpkFUFBhEVFV1B8oeiCCiuoi/D3/V7fuIgQdhUBUVFRVAxCEiZTVTMJiKCoyGNRgVUeyiPTfc9+Z7aH/2QyM7fu7bq3b2e6vq+/nuSeOnXOuffXVbfqPBC6tI2MjOzaaDSegYi7ywcAdkDEhQCwkJnHvyf/PXFtmv+vdqkJChGbmRsA8DAiPizfEx9mHv978v9P/N269gAz3yafarX6h3q9flchAgceBAPzC8rOGPP81sM/AYLdmVnAIJ9a0MF6zPK2wBgA3IaIt8m3AGfiW2t9dd6DZ+VfKoAMDQ0NVqvVVYh4EDM/FwDmZVWs16+rLLAZEa9h5p83Go01g4ODQ2WRvqMAGRoaelqtVju0BQYBxG5lMUxPjo5a4A4AuEZAMzY2dsXg4OCdnZKmIwAxxuwXRdFxzHw8ADyhU8r3xu0KC9yLiOfHcXyB1vqXRUtcKECstQcCwHEAIMDovRwXfbe7ezzZLDgfAC4gorVFqVIIQJxzL2FmAcbRRSnWG2ebtsCliHiBUuoHeWuZK0BGR0d3iuP4TGY+OW9FevznngUQ8bNRFJ3V399/X17a5wYQa+3LAOBMAFiWl/A9vj0LAMBGADiLiL6bhzWCA6Q3a+Rxm3o8kyyQ12wSFCC9WSPpNvau52yB4LNJMIA45z7Te9fI+fb32HtZQGYTpdQpXsQJREEAYq29GAD+KYRAPR49CwSywCVEdEy7vNoGSA8c7d6CXv8cLdA2SNoCSA8cOd7aHutQFmgLJJkB0gNHqPvX41OABTKDJBNAeuBo+5Y+AgB3I+KfmVn+Ftf9LT6IOP5vZhaP5qnX2xZgDjLIBJLUAOmBI/nRQkQJDnJxHI8ICFpAuLtSqfy52WzeTUT3J3OZmcI5t7TZbC5FxInPEmbetR2ec6RvapCkAkhvK3frx2gCDMw8CgCjURSN1ut1CQYqtA0PD++GiPsBwH6IuFi+AWBpL7Bsy9uQdgvYGyCtQ8DvFHrXyzmYRMZdiYhXMvMviOiGcooJYK3dsVKpLG42my9i5kMRkcoqa8FyHenrmuIFEHEfaTaba+awX9XfmflKAUalUrmyEzNEiAfIGHNAFEUSoHboHL6XYsqNlUpllY+ToxdA5ujS6i8CCPnEcXzlwMDAn0I8pGXhIfH+ACCzioBFlmRzqvkutRIBMgeXVr9ExNXz5s1bvWTJkj/PhadmZGTk4GazeVgLMHvPBZ1bOiYutWYFyBxbWl0twKjX66sRsTmHHpItVHXOvTSO47ci4iFzwAaJS61ZATJHllYSnbZaKfX9OfBAeKvonDumBZTneXfqQsKkpdaMAGmFyW7LD825URSdV6/Xr+vC+1qYyNZaCZV+KwAMFDZowQMh4ktnCt+dESDW2ku20Rhy2ar+PBHJrlyveVrAWnsiAMhniWeXbiK7lIim9UafFiCt7CPXdpOGHrJey8yf01pf6kEbjMRaK2mNnt76SEbIp7eyQz4dEeXzRGbeDACTP49O/jciPtqiuYWZbwGA31QqlVviOL6FiORcppC2Zs2aBdtvv728n5zIzM8qZNDiBlk5XbaUmQDyHwDwhuJky3WkXyHi55RS5+Q6CgBs2rRpj7GxsRcBwAsBYN8WKLbLedxbAWAcOIj4G/nWWv8ozzGvv/76nR999FEBiiy9thUXl3OJ6I1T7bYVQCSpGyKK20RX561i5gcB4GOPPvro5w488ED5O3iTX9RFixYJGF6IiHKuUJbzBNmFuwwAxPdIlsq5tNHR0Wc0m82zAOC1uQxQLNMGM/dPTU63FUCcc59g5ncXK1vY0Zj5KgA4Q2s9HJYzwOjo6LJGo7EqiqLnx3EseYS3Dz1GYH7iGCn5o76XF1istW9AxLO63WESET+plDp1sv23AIjkyq1WqzJ7dHM60I8Q0RkhH7JNmzZtNzY29ipEfCUzvyAk74J53YWIsjP5g9BJ14wx+0iOKmZ+RcE6hRzu3kaj0T85F/AWAJFfAgCQ949ubDc3m80zli9fHsyhUpabAPAq+SDiHt1olJlkRsRNzHxhrVa7sK+v7+5Qujnn3sbMsuz6h1A8C+bzRiI6d2LMLQDinDuPmV9XsEAhhlu9efPmM1asWPHfIZgZYw6X2aIFjhAsy8zjj4h4YRzHF4ZKDi3xKi2QSPLArmqI+HWl1OunBYi19vcA0DW/lIgYA8A7lFJfbPcubNq0aRdZRrVAsbxdfl3YX17sLxSwKKV+HkJ+a+2XAeAtIXgVyONWItpzK4AYY/oRcaRAQdoaSkJVoyg6VinV9pLKGPNmRJT3Fjmv6DWAK2T5pbW+qF1jWGv/HwC8r10+RfZn5rrWWt7F4bElljHmJET8fJGCtDGW7My8moh+2AYPGB4e1lEUCTC6binQjt6+fZnZIuKHfIOLZuJrrZXzkrZneV+526Vj5rdrrb8wFSCXi09Ku8zz7o+IEtt9yLJly8YRnqVdfPHFlT333PMMZj4DERdk4TGX+oTIe7thwwaqVCrXtIqoltp8zPx9rfXhWwDEOfcIM88vs+TMfOfjHve4vsWLF0swU6ZmrT2sBYwVmRjM3U5B8t5aayVev9RLWXHtUUqN/3COL7Fa1WTL7rz3OyLK7P9jrX2KvGcw80lz9xlvX/MQs4m1Vp418TwobWPmVVJ9dxwgLZdmKW9V1raWiFZmFc4592pm/gAAZAZY1rG30X5tzyZdAJLjieiCCYD8mxQhKenNvJqIVmWVzVpbZt2yqlWWfm15LZQcJGcS0dnjAHHOfY2ZHzscKYv1ASAzOIaGhnaoVquyK7ctONKV6JZsKQozr37CE57w5j322EMyRKZuZQUJIp6nlDphAiA/K6GPUWZwtM50xGFx59R3rNchiwWGAOA1RPS7tJ0ldxcASPm0Ur2TIOJVSqmDJ5ZYEoRTpvX51eJCniUYyDn3JmbOPfYj7YMwF+gR8blKqdSBdpIVMooiOfBVJbLTb4lorwmASDSbJEguQ7u22WweuXz58v9JK4y1Vg4OJc9Tr3XOAicS0VfSDm+tlVDeKwDgaWn75kQ/RkTzcGRkZNc4joM4+QUQdFOtVjuyr69PouRStbKuZVMpsY0QI+JFSinxa0vVypaDLYqip+Lw8PCKKIrWpdIkH+LNiHhwlinaWisZECWyr9fKY4GfEJGEH6dq1tp3AcAnU3XKiTiO4wPQGCOxDt/IaYw0bN9NRJ9K00ForbXfAoC2a9GlHbdH72WB7xLRkV6Uk4istV9qZVBJ2zUoPTMfi9ba9wDAR4JyTs8sdd2GFji+CgBbBdqnH77XI0cLXEBEx6fhz8wV55y8j3R6VXC6AOTDAHB6GgUC096OiC9QSv02DV9r7ScAoKtj59Po282008V6J+mzcePGvRuNhoDkmUm0OV7/CHY6vSgivkYp9V9plHTOncbMH0vTp0fbcQu8h4hS3bORkZEXx3EsIOlIE78zAchXmPnNHZHg/zIcviPN2M65lzPzt9P06dGWwwLM/Aat9dfSSNPJgCtEPEeWWBd0yB1jw8KFCw9evHjx33wNNjQ0tLRarcovylN9+/ToSmeBFxHRT3yluuWWW+bff//9vwCAToRBrxaAXAwA0+Yl9VUiC10cxwcPDAyIO4hXW79+/cJ58+YJOErlkuAlfI9osgWunz9//gvT1F7pYCL1SwQgkifpJQXfw08Tkex3ezdr7baUDtVb722RsJUYIpUTqbX23yVBR8H2+IGcg/xMdpEKHPj2arW6YtmyZd6n972X8gLvTnFDnUpE3geCIyMjT4zjWJZazy5KRMnQKQBZh4hFhp+eTETya+DVyuZ+4CV0j8jXAqneR6y1xwJAqh1PX0Gmo2Pm9bLEklQ//e0wStE3VWTgHCsBl8KM2wxp6vcRa+3XASDVwWMb1hoVgNzUStXfBh+/roj48jR5rDp9RuOnVY+qHQukfR9xzilJR9TOmCn63iwA+QMASGGXvNs3iOjVvoOUYWmFiH+L43ha/7AoijiOY5z49tULEc/0pQ1B10oBGoLVtDwQ8TkBdkHfSkSShdGrGWPOQcQ3eRG3R3SbAERKHe/SHp/E3uKpu0Ip5RIpYbzEwE7NZlMyXyzzoc+Rpq1MKlPlksKYzCzOlUW104noo3kNZoz5tqwKAvC/GQAGiUgSAia2AmeRu+Ul/YECalx8lIi8/b1KtLRaR0QHJt4xT4IiXbkR8RSl1Gc9RUtNZq2VMNkjUnecucP7ieiDvvyKmEWkCJMAZAwR86wm9dc4jvsGBgbu8FG+DEurCTkR8dtKqaN95PahsdbKA/svPrTt0Iibttb6m+3wmK2vc+5yZg6dhfMeZh7UWksC9cRWxCzCzA1ZYnGiNO0RpPK3stbKC1hZYpO/RERva0/9/9/bOfdtZg6xJJlRpEqlMtDf329CyTyVT85hzf9ORCf7yl7ELJI7QJh5uW8pNOfc65j5PF8DFUD3b0Qk2cmDNGOMQUQKwmwaJps3b/6HFStWZE7LmiSXtfbHAJA6SjCJ76QZO46iaNAX4EXMIrkChJkv1Vp7+3l14NBy1nsnOyVKqWAVt4wxf0LEJ/k+MCno/kZEudZKtNaKg+E/ppApEykz/6fW+p99O+ftbJsrQKIoOqJer1/uo2zRp6Q+MjHzEVprL/l9+OW0nP0jEeVaitlaK06lB/noGIKGmQ/1LWW9YcOGIyuVilT0zaXlCZBUp+bOuauYubCb4GPNNMvDJH7W2scBwN+T6FJev4WI9k7ZJxW5MeZqRHxeqk5tEiPiZUqpo3zZ5HnYnRtAmPktWmuvBG4jIyNHxXF8qa9BCqTbnYhuDzHe0NDQXtVq9TcheLV4jBBRrpsZzrlrmDlz0vB2dG00GvsPDg5KxsbElmfYeF4A+V2tVuvr6+vz+sWUAH1mfnGiJQokkD3we+6554mHHnrooyGGtdZKAu4gtf+Y+Rqtda6/6s65dcxcpBPrFmZGxC8opd7uY3tjzAAibvChTUuTC0DEvUFrLeUGEpsx5lBEbKuUWuIg2QhuIiJxowjSjDGvRUSJ3my3/ZCIco3fsdbKL3cnIvgm2+a++fPnL12yZInX+VleYRu5ACSKon+s1+s/83kSitjL9pFjGprMybOnG88Y815E9D4pno6HuKloraU8dW7NOTfMzDq3AdIxPoOIvFJSteqzj9cVDNnyAMg9Dz744K6rVq1qJAkqPleNRuPmnLY+k4af9XrW9JkzMQ2QHONcIso1B5i1Vnzl6m0ZLmznG5VSfYgoJapnbevXr39qrVa7KbTbVB4A8c6mV+bKVpLyRSl1StKN8b3ezgk0M39Wax1MlulkttZK1ag+X30KpBuv9OQznnPuImZ+hQ+tL00eAPEOpbTWyv516tSUvsq1SRfUE9YYcwMi7pdWpjiOPzgwMPD+tP3S0FtrrwcAya5exvZTIvLKsJjHMis4QBCxTyklBp+1bdiwYe9qtXoTM0dJtJ24joivU0oFq9torb0PAKRYjHdj5vdprT/k3SEDobX2RgAIthmRQYTELsy8RGv9yyTCjRs3Lm40Gol0SXwmXw8NkFuJaE8fAYwxpyLix31oO0GDiC9WSonvUZCW9hSdmU/TWkt61dyatVbiMPbJbYBAjNOcqVlrNwHA0kBDQ1CAIOL5SqnX+QhnrV0LAAf40HaChpnrWuvREGMPDw8/OYqiP/ryiuP45IGBAe/EFr58J9M5537DzHtl6Vt0H2a+UGvtlSbIGPMFRAzmgR0UIL5xCNZaSUicKll10TcFAHYlIu+Hejb5rLWyM+QVTRlF0Yn1ej11haY09rHWSi1Br5k+Dd8cae8goqf78A+dZC4oQHzdrY0xRyFiGV1LJu7B35RSOyBikFiZ4eHhl0ZR5OP0mCo22+eBmUpTYA6CLOLN2MfXL07eaZ1zUnE3SEnBkAAZL3roYxVr7dkAkOvOjI8cM9Eg4k1KqWAvrtbatwBAUlKCdxCRlK3OrVlrxa9st9wGyJExM79Ta/0ZnyGMMT9CxEN8aJNoggEkTeyHMeZyRAwdspmka5rr3luLPkydcx9i5jNmok1z833Gm47GWiuZLHN1i88qm2c/bxcb59ypzBxkAygYQBDxvUopKcaT2Ky1fwKAPAKHEsf2IUjzUujDzzm3mpmnDQJCxNOUUrnuVuUYqOWjfigaqcS8yKc0eMj3kGAAYebDtNaJxU6cc89m5l+FsloefBDxE0qp00LxttaKF694805t3r5GWWWx1t4NAE/M2r9M/Zh5ldb66iSZnHPPYuZbkuh8rgcDiJTMrdfrdyUNaox5JSLmlnEjaXzP65kKis7E21orN+tZU64HjXefYVklteYf76lz6ckQ8cNKqff6CGqtlRmn7Rf1UAC5m4i8lkzWWslU+E4fJTtFk6Us3GyyWmtlV2X+JJqg2VJmAEfqk/tO2dt3XEk5qrX28jQOdWAYCiBXEpHXrkHZDwjlZkVRdHC9Xvcu7jPbDd60adN2Y2Njk6toXb3jjjsestdeewUJxJoBHA8AQK5JHHwf6tB0v//97+cfc8wxMjvM2kI5LoYCyMeISMpJJ7ZQU1/iQG0Q+Pr++AwxOjq6V7PZnAi1vQcADiEiyaifS7PWShSnxL9vk63RaOw2ODh4Z5JyxpgPhMiDHAQgzPwqrfVFSUKnOVFO4pXz9ScS0b0hxjDGPB8RJc8wMPMJWuvc8n5Ns5QLoULZeCifH5hQOdaCACSKohX1ev26JEs6517KzD4nykms8rz+dyJaFGqASemMvkdELwvFdyqfbpiZQ+ju60TqnDtIKkS1O2YQgPguScocIDXJkDcTUbAyXxNey8x8oNZ6Xbs3bLr+1lqJuCtl2EBofZn5OK316iS+obZ6gwBE6ov4pMcxxpyCiJ9OUq6T1xHxZ0qpYBkEjTGfiaJos1LqX/PQy1orGwDb5cG7pDy9AvKstbLFm/gyn6RjEIA8/PDDj1+5cuVfkwYruw9WS/7zicjLZT9JX7lujLm0VquduWzZMglMCtqMMcOI6LXtGXTgzjL7JBGd6iOCc+6/mbkt95ogAFFKVX0C651zX2DmYL76PkZKS8PMH9Zaex1G+fC21m4gouApdJxzX2fmomr1+ahaFM1qIjrOZzBrrbwXD/rQzkQTAiAPEZHXFG+t/QYAvKodgfPuG0XRO+r1ejCvWufchUop72TMPvoZY05AxHN9aLc1Gmb+sdbaK8mgtVZ2D5/fjg3aBggz/1lr/WQfIfJOn+8jQxINIr5CKXVxEp3vdWPMm31TsPrydM5tYuZgYaW+45aEzjvlaikAAgDeCZS7Yc0cRdHz6vX6NSEeBmvtUxDx2UqpIClHW+80j52rhJCxC3ncSUReMS1lAYg3op1ztzDzVKe9Ut2jarW6z7Jly4IkmZYCL3Ecb+/jgeprhMkHj759tiU6RJQdwcl+bTOqVxaAeKfotNZ2g3fpTr7VVpMePDkYjeP4wR5AkiyV6rp3saCyAMQRkVdZsbSpb1KZLQAxIv5dKRXyFP0tzHxzSIC0SmQnbqkHMEcpWTDznVrrrlpi/ZqI9vWxZhfMIN66eOp7dhRF19fr9aAJKqy1ko6o0zXkfUyQB80NROS1QRHCc7ztXSwAuIuInupjibK/g4jvjtb6YB9dfGiMMV+rVCp31uv1M33ofWmSYtx9+XQp3bVE9Fwf2a214jXd70M7E00IgDxARF4pNbtgF+sCIgp2+Nba1r6fiIImVL7uuuueXavVJNn0vHZufjf2Zebva60P95E9RObItgGCiLFSquIpcK5lhH1kSKD5IBEFS0dkrb2hFZuxr0+ygTTyd0NkZhp9UtB6n6QbY25HRK/3lTxnEKjVaot8yq11wUn6iUQULKuhtVZqlu8cRdHR9Xr92ykegkTSW2+9dcG99957FSJ2rExaopD5EHyOiP7Fh7W1VgLUnuBDmytA5s+f/+QlS5b8OUmQsvtiNZvNly9fvvw7SXr4XF+zZs2i7bff/kGhDZ1GaGL81pmIVPLymsF95O4CmrOJyOudLkR0ZdtLLDEoIu6llErMtVt2b17fwC+fh2jjxo17NxqNX0/QMvMLtdY/9embhsZaK270H03Tp5tp0yTZC3GsEAQglUqlv7+/X14aZ21ljwep1Wp79vX13Zqkh8/1aaraBs3WOFmGkhci8jGXN41v3ZZ169btPn/+/D94M56BMAhAEPG5Sqlrk4TpgojC7YjooSQ9fK47517NzP85mZaZ3661Dl5o0hizJyJeOU3uLR9Ru43mSCL6bpLQzrmVUi47iS7peiiAeFVjKnlMurfbfpJR5box5jRE/NgUgNyxYMGCA3xLG/uMM0EzMjJyeBzH30vTpxtpfbMrDg8PvyaKogvb1TEIQADgU0T07iRhRkdHlzWbzSBFaZLGynD9N0QUrNqSc+6zzLzVbgsifkEp9fYM8iV2cc69l5nbKjWdOEiHCXbccccFPjnFnHNnMHPb5euCAAQRf6yU8g1iuR8Aduiwnacb/udE9IJQcjnnLmXmo6bjx8xHa62DbvtOjGOMuUhiWkLpUSY+aTIrGmPOQcQ3tSt/EIAAQBof/e8DwEvaFTx0f2ZerbX2CuX0Gds5t46ZZzqj+FWj0ThocHAwcWvcZ6zJNFIvfN68eT8pe2HOtHq16NOcgQQ5lA4FEHjwwQd3XrVqleSDnbWVtXgnIn5IKfW+JPl9ryeVOWPmr2qt3+zLLw2dMebFiJiYaT8NzzLQIuIrlVLf8pElRMIGGScYQHzzPllrDwSAxB0vHyMEpgl9ip6YApSZX6u1bvtFcjo7hCwiE9jOmdlVKpW9+/v7E8saSCSnONFmHmhSx5AAeYtP7PUVV1wxf5dddpGZZkEIBULxkIpXSqkfhOCX4gbd1mw2Vy1fvjzI2ctU2Wcr3BNCz4J5dKSQZzCAAMDniegdPkaz1sqe/Qt9aIuiaTabevny5TbEeBs2bKBKpWJ8eMlZidY6aNaTiXFbwVWS2aPrY0eY+Vta61f62DRU4uqgSywAWENEB/koYK09CwD+zYe2KBrfrOE+8qQ9k2Bmr9nXZ+ypNHKiz8w/RcSu9tdKU6rOOXc5MwepgRlsBkHEu5VSXkV0QtaQy/LQTNdHKVVDxEYIftbaEwHgSyl43VetVg/MI/uiyGCMORkRvSrEppC5UNI0NVtCvaCHnkGE37OJ6OYkyw0NDT2pVqvdJTWtk2gLuv4wEQWrqeGc+yAzp8rOiIiXKaWmPTcJYQNrrSSaOyEErw7w2Dxv3rwnL126NDEW3xizDyImPoO+OgSbQVoDehelNMasR8T9fQXNmc47t5ePHFkfRkR8p1Iql1/6G2+8cd7DDz8su4cDPjqUiQYR1yulDvCRyVorHh3BqgaHBojkofXKhRrKFcDHaB403u9PHrzAWiu7YYf50E6lqVQqA/39/V4v+Gn5W2slR7C8tC9M27fD9O8iIq+qAMaYnyFiMI+I0ACBzZs3P23FihVStH7WNjw8vDiKol8m0RV03TuM00cea63shikf2qk0iHiVUipY4oip/K21bwGAL2eRrRN9mPkvlUpliU8F5WuvvXbnBQsW3I2I1VCyBgcIIp6klPqij4Dt/NL68PelSVNe2IentfYOAHiaD+0MNO8notycDo0xX0ZEAUrpGyJ+USl1ko+gIyMjr4rjWBKkB2t5AORypdQRPhIODw+/MYqir/rQ5kzzViIK8qu6du3a7RcsWCCx6G39ivm6dWe1i7VW3kfEq6HsbSURrfUR0jn3FWYO6r4THCAA8PdFixY9Zd999x2Px56trVu3bpf58+ff1Oli93EcHz4wMCBOlG23ULsoiGgfeOCB/VetWhVk63mqYtbaJS2XH6+UTW0bJgODNKUOWh4avwKAPTMMNWOXPAAiSQqO1Vp/00dQY8x5EkbpQ5sXDTPXtdZB4lRCFY8UXRHx43mVbhP+xpjXIuIFedm1Xb5RFB1Xr9cT6xHKOM65VzBzYqXltDLlAhAAOJeI3ugjjDHmCERMDKH04ZWVptFoPDmU6/l0obZZ5ZJ+zHyY1jo3z1ypoYiIJ7cjY059f7Nw4cIlixcv9qozmFccTC4AYeZbtdbeU50xxiCiVwLsPG4GEWEovtbadwHAJ0PxA4DfNhoNNTg4+EBAnluwstZK/ZJVefHPyNc7vY/E5EdR9Ctm9iqLkEaeXADS+uU7QWt9no8wxpjXI+LXfGhzoHmEiIKdC1hr5ZAqMfw4jR6IeI5SKrddJ2vtMxHxOmZ+Yhq5cqSV964lPl4ZIoO19p0S9p2HPLkBBADWEtFKX6GNMWsR0eu01JenJ91viWgvT9pEMmPMhYj4mkTClAShS8NNHd4YczQiXpJSrFzI03o457kjlydAII7jVw4MDPhGgG2VJicX609hysxXa62DLS+stRLuGqzO+iRx71m4cOHSxYsX/ykvuxhjPoSIZ+TFPwXflxDRD33ojTGHI2Ju2VxyBYjkalJKHeKjaGuqvAoAvFzmfXkm0SGiVKF9bRKd73Vr7fWyPPClT0OHiBcppXKtEuycu4KZvRJwpJHdlxYRz1NKeTtVGmOuQMTc5M0VIGKUNJF6HZrmP0JEwX41rbV3A0Bua3nJ1KGU+g/fBy4tXSsaUlxldk3bNwD9va3Q7cdSts7G0zn3cmbOJTvMxLi5AwQAvkNEL/c1Xt6/CNPI8TYiShO7MaMqIyMju8ZxnOiH5muLGehk2/M5RPS7NvnM2N0Ycygiei1xQsrAzP+qtf64L88cl7OPiYDGmLGQzl0zKHcQEYkXaWIbHh5+aRRFlycSBiJg5iO01kHGs9bW5cwqkGgzskHEHymlDs1zHGPMexExN3+waWRfR0Teri95HQxOlouZGwKQBxBx+zyNnWFXQvyictvWnKxrtVqtL1u2LMgpesG/vKcSUcjzlq0eAWPMpYiYWxCpr643AAAMAUlEQVTX5AGjKDqiXq97/1CFqGCb9Mwz84OyxJLkZbskEbd7nZmXa62HffgMDw/vFkWRJB5+hg99OzRRFO1Sr9el0ErbrQPnOYqIpA5fLs1aK35awt/70DeLIGlfzEN7K8wi890CEEkRv3sWxdL0SWuEojx9xWs2jR4JtCskAV1AfrOyYubrACDYBsNMgyGi1/I4o96pXsxljDzPPabocJsARLxpvco4ZzTAY93STqOz5bdtV5Ze/3JYIO2LuXPueGb+ekHS3ywAabtUbgphU72ItV56Zam1XYoxeqTdY4FUz0Nr9hgCAAkdLqKNykv6uiILQWb4xQiSxr4Ia/bGSGeBtCsKa+0bACC3M6Cp0jPzegFI0CB3DxOlXnN2+nTXQ6ceSUoLpEkE15o5pFqtFCztSzlUZnJmvkqWWIWXI0j7wr5hw4Y9KpWK+Dg9K7O2vY6lsUCWzPbWWgnN9ooxCqjoDwQgFwPAPwVk6sUqw/Qqu00St9BrXWwB+VXWWqfK2uKce6OAqgNqXyIAkZDLYM56KZRI/YLWgXOGFOr0SJMsgIh/WLBgwT6+UYLCb2RkpC+OY1layRKr6LYa88gE4atF2hf21lr0bAB4v+8YPbryWICZl2itU+VCs9aKT1iubjUzWUgC1QQgn2HmTsUkP4SIh/iUkJ6sRF5BSeV5lLY9SeI4PmpgYOCyNJo5585k5g+k6ROSFhE/K0usDwPA6SEZp+ElhRnjOD5k+fLl/5Omn3PuZ8wcLMVkmrF7tKktcDoRfTRNr4L92mYS7SMCkPcAwEfSCB+alpkv1Fqnfg+y1v4XABwbWp4ev3AWkFNvrfXr03C01ha+pTuDfKfLOcirEDFousY0xphEm/pXRvo65z7NzKdkHLPXLV8L/ISIXpR2iA5t6W4lpuR3w+Hh4RVRFK1Lq0Qe9Mz8Mq116vjikCW38tBrLvLMmvSug1u6W92mOI4PwIKi4LyfEd9KplMZ9kDibeIiCF9NRKlXJR3e0t3KLlEUPXU8YZq1VsI4a0VYzmOMmIgy1dPrgcTDujmTxHH8vIGBAXEwTdVGRkaeE8exHFovTtUxP+IxIpo3ARCpPV0mN45NRJSpMqu19u0A8Ln87NbjPIMFbm80Gi8eHByUBNKpWgnBIfKP50sbB0gZt0xl+1drrVNZukVsjHkxIgpIygT6LKp0RR9m/n6lUjkhS2RmScEh2XjGCxlNAORrzJxqK66gO3cjEe2XZSznnIDjc53M8ZRF7m7rI9u4RHQCInJa2csKDtFjwqF2YoklNculdnkZW2aQiDLWWplJZNnVa4EtwMyf0FqfloVtmcHR0udMIjp7AiDHAcD5WRQtqM+NtVpteV9f39+zjNd7L8litVn7jEZR9PF6vZ6pHkcXgEOUP56ILhgHiDHm+TkH5oe4QzeK0xoR3Z6F2cjIyP7NZvNdRaWxySJjF/R5SGYNOeMgooeyyNsl4JC6LKu01lc/VhfDOfdIHvUVshhxlj43RlF0TL1eT71TMsFzZGTklS2gdKweSWCbFMKuVb3p4+1U4uoWcCDio0qpBePvIhPWNcZcLnl0C7F2e4PciIjHKqUkSXSmZq2VMx8pdCN1JXLLo5tJuPJ1ams5NemHqWznHDNaWnbltNaHTwXISYj4+fLdn2klugsRT1FKycFS5iY7XcwsQCkki2NmQTvTse3l1KQfX6k98rG8E9CFMhMzv11r/YWpAOlHxNyy9IUSfgqf8Z2GdnkbYw6OouidvS3h/7NkiOXUxD3pdDhFlmdjclHXLWrzWWt/DwB7ZGHawT7fbDQap4QowmmMkf38V5ewXl8R5v0bIkplYqlB0nbs//Dw8LJKpfJRZk7tzVuEsrOMcSsRPZZqdQuAOOfOY+aOlmTOaJzROI5PGRgY+EXG/lt0s9YeyMxHtXa8dgvBs6w8EHGTzBhjY2MX7b///pKGtu3Wyh0gS6pOxJG3JT8ifl0p9dih+dQZpNDEXG1psnXnh1vvJeeE4rt27drtFy5ceBQzHw0Ah4XiWxI+32lVrGrrPW6yLps2bdpu8+bNH0PEt5VExyxivJGIzp3ouAVAhoaGnlatVqUUQNch/zGFED+rlAoeQLVx48b+sbExedmUcgD7ZLF8CfpIcZ+LZCmllApax8Q5tzKOYwHH/iXQM6sI9zYajf7BwcE7pwWI/Kdz7hPMHLSMcVZps/ZrZT3/lNY6eHmuiy++uPLMZz5TZhUp1DkIAJl8xbLqlrYfM98pJZ4BYM28efMuWrp06V/T8kiiN8acHEWRvG8Er1OeNHbI64j4SaXUqZN5bjGDyAVjzH6IKLNINeTgHeL1jUaj8enBwcGgv5aTdVm/fv2zarWalD0QsEhSZaky1bE2AYhW3fP1RLQhL2E2bNjQF0WReCf8c15jFMi3wcz9U9MSbQUQEchaKwmC5X1kW2iPIuKnFixY8KnFixf/JW+F1q9f//j58+cfwMxS811KiuVa+70FiGsB4FpmvjZt3qks9rjuuuueUavVTgIA+XT1rDFJ/3OJaKvUpjMBRG6sGH1bar8WoORZIXYmY91www1P2rx585OY+cnM/CREfBIAjH/LvwHgsf9HxL/GcXyffE/+GwDG/4+Z5XNfFEV/rVarv+7r67u1qJt0/fXX77x58+YJYORelawovVrjrCSitVPHnBYgrVnkEgCQ3ZttrV3JzPJ+8tNtTbG89GHmyDknnhYnMfNeeY3TQb6XEtG0+alnBIhz7iXik9JBoXMdmpnPaTabnxocHJRw416bwQLDw8PHR1Eks4baVo0kPohKqR9Mp9+MABHiDqclLeJ+SPHO1XEcXzYwMLC+iAG7ZQzn3JHMLMA4qFtkziKnpBed7VhgVoCMjo7u1Gw2pYBjpgQKWQTuYJ81iHiZfOr1+l0dlKNjQ1trnwkAL2t9vGuWd0zg9gfeWKlUVvX39983E6tZAdJ6FxGDfad9WbqGw/0CEgC4bKZpt2s08RDUWvu4SaCQe12W9E8e0rdNciQRfXc2LokAmSNLrWlt1PJTuqxWq13W19eXKm1/27cuZwbWWilINDFbPD3n4UrHPmlpNSGwF0Dm2FJrppv5vSiKZGb5Rb1ev610d9xDIGutlPueAEVRlWI9JCucJHFplQogc3SpNdtd2yjnqYhoJH8XEZUyjqZ10k2ISMw8/l34o1jOAROXVqkBMpeXWh73WE7opX73EDMPPfLII3blypXBfZ5mk2PNmjU7LVq0iKIoGhCXF2YW15dt7TDP41bMTuK7tMoEkNZM0pGin21bpmAGzCxZWIYQ8bcAcL+cfsu3fGq12n2PPPLI/Y1G4/4DDzzwwdlEE+fIJUuW7PTQQw/t3Gw2d0bEnaIo2jmO4/G/W9kjS+80WbD5ZxruEiI6Jo0sXu8gUxl2qjJuGsW6iLbZAtA4eBBRgLRz6yMA2KGLdCmzqKnBIcpkAkhvJinzc9CTbRoLZAJHWwDpgaT3IHaJBTKDo22A9EDSJY/I3BWzLXAEAUgPJHP36Su55m2DIxhAhNEccGws+fPQE2/CAmm3cmezXOaX9OmYWmvllPbMOeLc2Hsiy2cBOcA9K8m/Ko3YQQEiA4tbShzHZzLzyWkE6dH2LNCOBWTWiKLorNk8c7PwDw6QCSF6s0mW29Hrk8ECwWeNyTLkBpDebJLhVve6pLJAXrNGYQCZGKgVvitVrLbFGPdUN7VHHMQClyLiBUXE6+Q6g0w1heS8BQAByvHbSN6tIHe7x8TLAo1WmcALpss+4sUhA1GhAJmQT5LTRVF0HDMLULo2zWkGe/e6pLfAvYh4fhzHFxSR82uqeB0ByIQQkgu4VqsdyszPBQD5bNOZ1NM/G3O2xx0AcA0iXjM2NnbF5Fy5RVukowCZquzQ0NBgtVpdhYgHtUAzr2iD9MbriAU2CxiY+eeNRmPN4OCgxNaUopUKIFMt0qq+uzsA7I6I49/MPP49x5ILlOJhaVOIMQC4DRElXPk2Zn7sW6rJtsk7t+6lBshsWo+MjOzaaDSeIcBpgWcHRFwIAAuZefx78t8T16b5/20hSXduDwgzy8ux1F55WL4nPsw8/vfk/5/4u3XtAQGBfKrV6h+6NZXS/wJRDgYUm/xswgAAAABJRU5ErkJggg=="

/***/ }),
/* 110 */
/*!*********************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/static/icon/kuwo.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 111 */
/*!***********************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/static/icon/kuwo_h.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 112 */
/*!*******************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/static/icon/qq.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 113 */
/*!*********************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/static/icon/qq_h.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */
/*!****************************************************************************************************!*\
  !*** C:/Users/hp/Documents/HBuilderProjects/雨/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "id": "2852637",
  "name": "uniui图标库",
  "font_family": "uniicons",
  "css_prefix_text": "uniui-",
  "description": "",
  "glyphs": [
  {
    "icon_id": "25027049",
    "name": "yanse",
    "font_class": "color",
    "unicode": "e6cf",
    "unicode_decimal": 59087 },

  {
    "icon_id": "25027048",
    "name": "wallet",
    "font_class": "wallet",
    "unicode": "e6b1",
    "unicode_decimal": 59057 },

  {
    "icon_id": "25015720",
    "name": "settings-filled",
    "font_class": "settings-filled",
    "unicode": "e6ce",
    "unicode_decimal": 59086 },

  {
    "icon_id": "25015434",
    "name": "shimingrenzheng-filled",
    "font_class": "auth-filled",
    "unicode": "e6cc",
    "unicode_decimal": 59084 },

  {
    "icon_id": "24934246",
    "name": "shop-filled",
    "font_class": "shop-filled",
    "unicode": "e6cd",
    "unicode_decimal": 59085 },

  {
    "icon_id": "24934159",
    "name": "staff-filled-01",
    "font_class": "staff-filled",
    "unicode": "e6cb",
    "unicode_decimal": 59083 },

  {
    "icon_id": "24932461",
    "name": "VIP-filled",
    "font_class": "vip-filled",
    "unicode": "e6c6",
    "unicode_decimal": 59078 },

  {
    "icon_id": "24932462",
    "name": "plus_circle_fill",
    "font_class": "plus-filled",
    "unicode": "e6c7",
    "unicode_decimal": 59079 },

  {
    "icon_id": "24932463",
    "name": "folder_add-filled",
    "font_class": "folder-add-filled",
    "unicode": "e6c8",
    "unicode_decimal": 59080 },

  {
    "icon_id": "24932464",
    "name": "yanse-filled",
    "font_class": "color-filled",
    "unicode": "e6c9",
    "unicode_decimal": 59081 },

  {
    "icon_id": "24932465",
    "name": "tune-filled",
    "font_class": "tune-filled",
    "unicode": "e6ca",
    "unicode_decimal": 59082 },

  {
    "icon_id": "24932455",
    "name": "a-rilidaka-filled",
    "font_class": "calendar-filled",
    "unicode": "e6c0",
    "unicode_decimal": 59072 },

  {
    "icon_id": "24932456",
    "name": "notification-filled",
    "font_class": "notification-filled",
    "unicode": "e6c1",
    "unicode_decimal": 59073 },

  {
    "icon_id": "24932457",
    "name": "wallet-filled",
    "font_class": "wallet-filled",
    "unicode": "e6c2",
    "unicode_decimal": 59074 },

  {
    "icon_id": "24932458",
    "name": "paihangbang-filled",
    "font_class": "medal-filled",
    "unicode": "e6c3",
    "unicode_decimal": 59075 },

  {
    "icon_id": "24932459",
    "name": "gift-filled",
    "font_class": "gift-filled",
    "unicode": "e6c4",
    "unicode_decimal": 59076 },

  {
    "icon_id": "24932460",
    "name": "fire-filled",
    "font_class": "fire-filled",
    "unicode": "e6c5",
    "unicode_decimal": 59077 },

  {
    "icon_id": "24928001",
    "name": "refreshempty",
    "font_class": "refreshempty",
    "unicode": "e6bf",
    "unicode_decimal": 59071 },

  {
    "icon_id": "24926853",
    "name": "location-ellipse",
    "font_class": "location-filled",
    "unicode": "e6af",
    "unicode_decimal": 59055 },

  {
    "icon_id": "24926735",
    "name": "person-filled",
    "font_class": "person-filled",
    "unicode": "e69d",
    "unicode_decimal": 59037 },

  {
    "icon_id": "24926703",
    "name": "personadd-filled",
    "font_class": "personadd-filled",
    "unicode": "e698",
    "unicode_decimal": 59032 },

  {
    "icon_id": "24923351",
    "name": "back",
    "font_class": "back",
    "unicode": "e6b9",
    "unicode_decimal": 59065 },

  {
    "icon_id": "24923352",
    "name": "forward",
    "font_class": "forward",
    "unicode": "e6ba",
    "unicode_decimal": 59066 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrow-right",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrowthinright",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrow-left",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrowthinleft",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrow-up",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrowthinup",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrow-down",
    "unicode": "e6be",
    "unicode_decimal": 59070 },
  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrowthindown",
    "unicode": "e6be",
    "unicode_decimal": 59070 },

  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "bottom",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },
  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "arrowdown",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "right",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "arrowright",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "top",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "arrowup",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "left",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "arrowleft",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923334",
    "name": "eye",
    "font_class": "eye",
    "unicode": "e651",
    "unicode_decimal": 58961 },

  {
    "icon_id": "24923335",
    "name": "eye-filled",
    "font_class": "eye-filled",
    "unicode": "e66a",
    "unicode_decimal": 58986 },

  {
    "icon_id": "24923336",
    "name": "eye-slash",
    "font_class": "eye-slash",
    "unicode": "e6b3",
    "unicode_decimal": 59059 },

  {
    "icon_id": "24923337",
    "name": "eye-slash-filled",
    "font_class": "eye-slash-filled",
    "unicode": "e6b4",
    "unicode_decimal": 59060 },

  {
    "icon_id": "24923305",
    "name": "info-filled",
    "font_class": "info-filled",
    "unicode": "e649",
    "unicode_decimal": 58953 },

  {
    "icon_id": "24923299",
    "name": "reload-01",
    "font_class": "reload",
    "unicode": "e6b2",
    "unicode_decimal": 59058 },

  {
    "icon_id": "24923195",
    "name": "mic_slash_fill",
    "font_class": "micoff-filled",
    "unicode": "e6b0",
    "unicode_decimal": 59056 },

  {
    "icon_id": "24923165",
    "name": "map-pin-ellipse",
    "font_class": "map-pin-ellipse",
    "unicode": "e6ac",
    "unicode_decimal": 59052 },

  {
    "icon_id": "24923166",
    "name": "map-pin",
    "font_class": "map-pin",
    "unicode": "e6ad",
    "unicode_decimal": 59053 },

  {
    "icon_id": "24923167",
    "name": "location",
    "font_class": "location",
    "unicode": "e6ae",
    "unicode_decimal": 59054 },

  {
    "icon_id": "24923064",
    "name": "starhalf",
    "font_class": "starhalf",
    "unicode": "e683",
    "unicode_decimal": 59011 },

  {
    "icon_id": "24923065",
    "name": "star",
    "font_class": "star",
    "unicode": "e688",
    "unicode_decimal": 59016 },

  {
    "icon_id": "24923066",
    "name": "star-filled",
    "font_class": "star-filled",
    "unicode": "e68f",
    "unicode_decimal": 59023 },

  {
    "icon_id": "24899646",
    "name": "a-rilidaka",
    "font_class": "calendar",
    "unicode": "e6a0",
    "unicode_decimal": 59040 },

  {
    "icon_id": "24899647",
    "name": "fire",
    "font_class": "fire",
    "unicode": "e6a1",
    "unicode_decimal": 59041 },

  {
    "icon_id": "24899648",
    "name": "paihangbang",
    "font_class": "medal",
    "unicode": "e6a2",
    "unicode_decimal": 59042 },

  {
    "icon_id": "24899649",
    "name": "font",
    "font_class": "font",
    "unicode": "e6a3",
    "unicode_decimal": 59043 },

  {
    "icon_id": "24899650",
    "name": "gift",
    "font_class": "gift",
    "unicode": "e6a4",
    "unicode_decimal": 59044 },

  {
    "icon_id": "24899651",
    "name": "link",
    "font_class": "link",
    "unicode": "e6a5",
    "unicode_decimal": 59045 },

  {
    "icon_id": "24899652",
    "name": "notification",
    "font_class": "notification",
    "unicode": "e6a6",
    "unicode_decimal": 59046 },

  {
    "icon_id": "24899653",
    "name": "staff",
    "font_class": "staff",
    "unicode": "e6a7",
    "unicode_decimal": 59047 },

  {
    "icon_id": "24899654",
    "name": "VIP",
    "font_class": "vip",
    "unicode": "e6a8",
    "unicode_decimal": 59048 },

  {
    "icon_id": "24899655",
    "name": "folder_add",
    "font_class": "folder-add",
    "unicode": "e6a9",
    "unicode_decimal": 59049 },

  {
    "icon_id": "24899656",
    "name": "tune",
    "font_class": "tune",
    "unicode": "e6aa",
    "unicode_decimal": 59050 },

  {
    "icon_id": "24899657",
    "name": "shimingrenzheng",
    "font_class": "auth",
    "unicode": "e6ab",
    "unicode_decimal": 59051 },

  {
    "icon_id": "24899565",
    "name": "person",
    "font_class": "person",
    "unicode": "e699",
    "unicode_decimal": 59033 },

  {
    "icon_id": "24899566",
    "name": "email-filled",
    "font_class": "email-filled",
    "unicode": "e69a",
    "unicode_decimal": 59034 },

  {
    "icon_id": "24899567",
    "name": "phone-filled",
    "font_class": "phone-filled",
    "unicode": "e69b",
    "unicode_decimal": 59035 },

  {
    "icon_id": "24899568",
    "name": "phone",
    "font_class": "phone",
    "unicode": "e69c",
    "unicode_decimal": 59036 },

  {
    "icon_id": "24899570",
    "name": "email",
    "font_class": "email",
    "unicode": "e69e",
    "unicode_decimal": 59038 },

  {
    "icon_id": "24899571",
    "name": "personadd",
    "font_class": "personadd",
    "unicode": "e69f",
    "unicode_decimal": 59039 },

  {
    "icon_id": "24899558",
    "name": "chatboxes-filled",
    "font_class": "chatboxes-filled",
    "unicode": "e692",
    "unicode_decimal": 59026 },

  {
    "icon_id": "24899559",
    "name": "contact",
    "font_class": "contact",
    "unicode": "e693",
    "unicode_decimal": 59027 },

  {
    "icon_id": "24899560",
    "name": "chatbubble-filled",
    "font_class": "chatbubble-filled",
    "unicode": "e694",
    "unicode_decimal": 59028 },

  {
    "icon_id": "24899561",
    "name": "contact-filled",
    "font_class": "contact-filled",
    "unicode": "e695",
    "unicode_decimal": 59029 },

  {
    "icon_id": "24899562",
    "name": "chatboxes",
    "font_class": "chatboxes",
    "unicode": "e696",
    "unicode_decimal": 59030 },

  {
    "icon_id": "24899563",
    "name": "chatbubble",
    "font_class": "chatbubble",
    "unicode": "e697",
    "unicode_decimal": 59031 },

  {
    "icon_id": "24881290",
    "name": "upload-filled",
    "font_class": "upload-filled",
    "unicode": "e68e",
    "unicode_decimal": 59022 },

  {
    "icon_id": "24881292",
    "name": "upload",
    "font_class": "upload",
    "unicode": "e690",
    "unicode_decimal": 59024 },

  {
    "icon_id": "24881293",
    "name": "weixin",
    "font_class": "weixin",
    "unicode": "e691",
    "unicode_decimal": 59025 },

  {
    "icon_id": "24881274",
    "name": "compose",
    "font_class": "compose",
    "unicode": "e67f",
    "unicode_decimal": 59007 },

  {
    "icon_id": "24881275",
    "name": "qq",
    "font_class": "qq",
    "unicode": "e680",
    "unicode_decimal": 59008 },

  {
    "icon_id": "24881276",
    "name": "download-filled",
    "font_class": "download-filled",
    "unicode": "e681",
    "unicode_decimal": 59009 },

  {
    "icon_id": "24881277",
    "name": "pengyouquan",
    "font_class": "pyq",
    "unicode": "e682",
    "unicode_decimal": 59010 },

  {
    "icon_id": "24881279",
    "name": "sound",
    "font_class": "sound",
    "unicode": "e684",
    "unicode_decimal": 59012 },

  {
    "icon_id": "24881280",
    "name": "trash-filled",
    "font_class": "trash-filled",
    "unicode": "e685",
    "unicode_decimal": 59013 },

  {
    "icon_id": "24881281",
    "name": "sound-filled",
    "font_class": "sound-filled",
    "unicode": "e686",
    "unicode_decimal": 59014 },

  {
    "icon_id": "24881282",
    "name": "trash",
    "font_class": "trash",
    "unicode": "e687",
    "unicode_decimal": 59015 },

  {
    "icon_id": "24881284",
    "name": "videocam-filled",
    "font_class": "videocam-filled",
    "unicode": "e689",
    "unicode_decimal": 59017 },

  {
    "icon_id": "24881285",
    "name": "spinner-cycle",
    "font_class": "spinner-cycle",
    "unicode": "e68a",
    "unicode_decimal": 59018 },

  {
    "icon_id": "24881286",
    "name": "weibo",
    "font_class": "weibo",
    "unicode": "e68b",
    "unicode_decimal": 59019 },

  {
    "icon_id": "24881288",
    "name": "videocam",
    "font_class": "videocam",
    "unicode": "e68c",
    "unicode_decimal": 59020 },

  {
    "icon_id": "24881289",
    "name": "download",
    "font_class": "download",
    "unicode": "e68d",
    "unicode_decimal": 59021 },

  {
    "icon_id": "24879601",
    "name": "help",
    "font_class": "help",
    "unicode": "e679",
    "unicode_decimal": 59001 },

  {
    "icon_id": "24879602",
    "name": "navigate-filled",
    "font_class": "navigate-filled",
    "unicode": "e67a",
    "unicode_decimal": 59002 },

  {
    "icon_id": "24879603",
    "name": "plusempty",
    "font_class": "plusempty",
    "unicode": "e67b",
    "unicode_decimal": 59003 },

  {
    "icon_id": "24879604",
    "name": "smallcircle",
    "font_class": "smallcircle",
    "unicode": "e67c",
    "unicode_decimal": 59004 },

  {
    "icon_id": "24879605",
    "name": "minus-filled",
    "font_class": "minus-filled",
    "unicode": "e67d",
    "unicode_decimal": 59005 },

  {
    "icon_id": "24879606",
    "name": "micoff",
    "font_class": "micoff",
    "unicode": "e67e",
    "unicode_decimal": 59006 },

  {
    "icon_id": "24879588",
    "name": "closeempty",
    "font_class": "closeempty",
    "unicode": "e66c",
    "unicode_decimal": 58988 },

  {
    "icon_id": "24879589",
    "name": "clear",
    "font_class": "clear",
    "unicode": "e66d",
    "unicode_decimal": 58989 },

  {
    "icon_id": "24879590",
    "name": "navigate",
    "font_class": "navigate",
    "unicode": "e66e",
    "unicode_decimal": 58990 },

  {
    "icon_id": "24879591",
    "name": "minus",
    "font_class": "minus",
    "unicode": "e66f",
    "unicode_decimal": 58991 },

  {
    "icon_id": "24879592",
    "name": "image",
    "font_class": "image",
    "unicode": "e670",
    "unicode_decimal": 58992 },

  {
    "icon_id": "24879593",
    "name": "mic",
    "font_class": "mic",
    "unicode": "e671",
    "unicode_decimal": 58993 },

  {
    "icon_id": "24879594",
    "name": "paperplane",
    "font_class": "paperplane",
    "unicode": "e672",
    "unicode_decimal": 58994 },

  {
    "icon_id": "24879595",
    "name": "close",
    "font_class": "close",
    "unicode": "e673",
    "unicode_decimal": 58995 },

  {
    "icon_id": "24879596",
    "name": "help-filled",
    "font_class": "help-filled",
    "unicode": "e674",
    "unicode_decimal": 58996 },

  {
    "icon_id": "24879597",
    "name": "plus-filled",
    "font_class": "paperplane-filled",
    "unicode": "e675",
    "unicode_decimal": 58997 },

  {
    "icon_id": "24879598",
    "name": "plus",
    "font_class": "plus",
    "unicode": "e676",
    "unicode_decimal": 58998 },

  {
    "icon_id": "24879599",
    "name": "mic-filled",
    "font_class": "mic-filled",
    "unicode": "e677",
    "unicode_decimal": 58999 },

  {
    "icon_id": "24879600",
    "name": "image-filled",
    "font_class": "image-filled",
    "unicode": "e678",
    "unicode_decimal": 59000 },

  {
    "icon_id": "24855900",
    "name": "locked-filled",
    "font_class": "locked-filled",
    "unicode": "e668",
    "unicode_decimal": 58984 },

  {
    "icon_id": "24855901",
    "name": "info",
    "font_class": "info",
    "unicode": "e669",
    "unicode_decimal": 58985 },

  {
    "icon_id": "24855903",
    "name": "locked",
    "font_class": "locked",
    "unicode": "e66b",
    "unicode_decimal": 58987 },

  {
    "icon_id": "24855884",
    "name": "camera-filled",
    "font_class": "camera-filled",
    "unicode": "e658",
    "unicode_decimal": 58968 },

  {
    "icon_id": "24855885",
    "name": "chat-filled",
    "font_class": "chat-filled",
    "unicode": "e659",
    "unicode_decimal": 58969 },

  {
    "icon_id": "24855886",
    "name": "camera",
    "font_class": "camera",
    "unicode": "e65a",
    "unicode_decimal": 58970 },

  {
    "icon_id": "24855887",
    "name": "circle",
    "font_class": "circle",
    "unicode": "e65b",
    "unicode_decimal": 58971 },

  {
    "icon_id": "24855888",
    "name": "checkmarkempty",
    "font_class": "checkmarkempty",
    "unicode": "e65c",
    "unicode_decimal": 58972 },

  {
    "icon_id": "24855889",
    "name": "chat",
    "font_class": "chat",
    "unicode": "e65d",
    "unicode_decimal": 58973 },

  {
    "icon_id": "24855890",
    "name": "circle-filled",
    "font_class": "circle-filled",
    "unicode": "e65e",
    "unicode_decimal": 58974 },

  {
    "icon_id": "24855891",
    "name": "flag",
    "font_class": "flag",
    "unicode": "e65f",
    "unicode_decimal": 58975 },

  {
    "icon_id": "24855892",
    "name": "flag-filled",
    "font_class": "flag-filled",
    "unicode": "e660",
    "unicode_decimal": 58976 },

  {
    "icon_id": "24855893",
    "name": "gear-filled",
    "font_class": "gear-filled",
    "unicode": "e661",
    "unicode_decimal": 58977 },

  {
    "icon_id": "24855894",
    "name": "home",
    "font_class": "home",
    "unicode": "e662",
    "unicode_decimal": 58978 },

  {
    "icon_id": "24855895",
    "name": "home-filled",
    "font_class": "home-filled",
    "unicode": "e663",
    "unicode_decimal": 58979 },

  {
    "icon_id": "24855896",
    "name": "gear",
    "font_class": "gear",
    "unicode": "e664",
    "unicode_decimal": 58980 },

  {
    "icon_id": "24855897",
    "name": "smallcircle-filled",
    "font_class": "smallcircle-filled",
    "unicode": "e665",
    "unicode_decimal": 58981 },

  {
    "icon_id": "24855898",
    "name": "map-filled",
    "font_class": "map-filled",
    "unicode": "e666",
    "unicode_decimal": 58982 },

  {
    "icon_id": "24855899",
    "name": "map",
    "font_class": "map",
    "unicode": "e667",
    "unicode_decimal": 58983 },

  {
    "icon_id": "24855825",
    "name": "refresh-filled",
    "font_class": "refresh-filled",
    "unicode": "e656",
    "unicode_decimal": 58966 },

  {
    "icon_id": "24855826",
    "name": "refresh",
    "font_class": "refresh",
    "unicode": "e657",
    "unicode_decimal": 58967 },

  {
    "icon_id": "24855808",
    "name": "cloud-upload",
    "font_class": "cloud-upload",
    "unicode": "e645",
    "unicode_decimal": 58949 },

  {
    "icon_id": "24855809",
    "name": "cloud-download-filled",
    "font_class": "cloud-download-filled",
    "unicode": "e646",
    "unicode_decimal": 58950 },

  {
    "icon_id": "24855810",
    "name": "cloud-download",
    "font_class": "cloud-download",
    "unicode": "e647",
    "unicode_decimal": 58951 },

  {
    "icon_id": "24855811",
    "name": "cloud-upload-filled",
    "font_class": "cloud-upload-filled",
    "unicode": "e648",
    "unicode_decimal": 58952 },

  {
    "icon_id": "24855813",
    "name": "redo",
    "font_class": "redo",
    "unicode": "e64a",
    "unicode_decimal": 58954 },

  {
    "icon_id": "24855814",
    "name": "images-filled",
    "font_class": "images-filled",
    "unicode": "e64b",
    "unicode_decimal": 58955 },

  {
    "icon_id": "24855815",
    "name": "undo-filled",
    "font_class": "undo-filled",
    "unicode": "e64c",
    "unicode_decimal": 58956 },

  {
    "icon_id": "24855816",
    "name": "more",
    "font_class": "more",
    "unicode": "e64d",
    "unicode_decimal": 58957 },

  {
    "icon_id": "24855817",
    "name": "more-filled",
    "font_class": "more-filled",
    "unicode": "e64e",
    "unicode_decimal": 58958 },

  {
    "icon_id": "24855818",
    "name": "undo",
    "font_class": "undo",
    "unicode": "e64f",
    "unicode_decimal": 58959 },

  {
    "icon_id": "24855819",
    "name": "images",
    "font_class": "images",
    "unicode": "e650",
    "unicode_decimal": 58960 },

  {
    "icon_id": "24855821",
    "name": "paperclip",
    "font_class": "paperclip",
    "unicode": "e652",
    "unicode_decimal": 58962 },

  {
    "icon_id": "24855822",
    "name": "settings",
    "font_class": "settings",
    "unicode": "e653",
    "unicode_decimal": 58963 },

  {
    "icon_id": "24855823",
    "name": "search",
    "font_class": "search",
    "unicode": "e654",
    "unicode_decimal": 58964 },

  {
    "icon_id": "24855824",
    "name": "redo-filled",
    "font_class": "redo-filled",
    "unicode": "e655",
    "unicode_decimal": 58965 },

  {
    "icon_id": "24841702",
    "name": "list",
    "font_class": "list",
    "unicode": "e644",
    "unicode_decimal": 58948 },

  {
    "icon_id": "24841489",
    "name": "mail-open-filled",
    "font_class": "mail-open-filled",
    "unicode": "e63a",
    "unicode_decimal": 58938 },

  {
    "icon_id": "24841491",
    "name": "hand-thumbsdown-filled",
    "font_class": "hand-down-filled",
    "unicode": "e63c",
    "unicode_decimal": 58940 },

  {
    "icon_id": "24841492",
    "name": "hand-thumbsdown",
    "font_class": "hand-down",
    "unicode": "e63d",
    "unicode_decimal": 58941 },

  {
    "icon_id": "24841493",
    "name": "hand-thumbsup-filled",
    "font_class": "hand-up-filled",
    "unicode": "e63e",
    "unicode_decimal": 58942 },

  {
    "icon_id": "24841494",
    "name": "hand-thumbsup",
    "font_class": "hand-up",
    "unicode": "e63f",
    "unicode_decimal": 58943 },

  {
    "icon_id": "24841496",
    "name": "heart-filled",
    "font_class": "heart-filled",
    "unicode": "e641",
    "unicode_decimal": 58945 },

  {
    "icon_id": "24841498",
    "name": "mail-open",
    "font_class": "mail-open",
    "unicode": "e643",
    "unicode_decimal": 58947 },

  {
    "icon_id": "24841488",
    "name": "heart",
    "font_class": "heart",
    "unicode": "e639",
    "unicode_decimal": 58937 },

  {
    "icon_id": "24839963",
    "name": "loop",
    "font_class": "loop",
    "unicode": "e633",
    "unicode_decimal": 58931 },

  {
    "icon_id": "24839866",
    "name": "pulldown",
    "font_class": "pulldown",
    "unicode": "e632",
    "unicode_decimal": 58930 },

  {
    "icon_id": "24813798",
    "name": "scan",
    "font_class": "scan",
    "unicode": "e62a",
    "unicode_decimal": 58922 },

  {
    "icon_id": "24813786",
    "name": "bars",
    "font_class": "bars",
    "unicode": "e627",
    "unicode_decimal": 58919 },

  {
    "icon_id": "24813788",
    "name": "cart-filled",
    "font_class": "cart-filled",
    "unicode": "e629",
    "unicode_decimal": 58921 },

  {
    "icon_id": "24813790",
    "name": "checkbox",
    "font_class": "checkbox",
    "unicode": "e62b",
    "unicode_decimal": 58923 },

  {
    "icon_id": "24813791",
    "name": "checkbox-filled",
    "font_class": "checkbox-filled",
    "unicode": "e62c",
    "unicode_decimal": 58924 },

  {
    "icon_id": "24813794",
    "name": "shop",
    "font_class": "shop",
    "unicode": "e62f",
    "unicode_decimal": 58927 },

  {
    "icon_id": "24813795",
    "name": "headphones",
    "font_class": "headphones",
    "unicode": "e630",
    "unicode_decimal": 58928 },

  {
    "icon_id": "24813796",
    "name": "cart",
    "font_class": "cart",
    "unicode": "e631",
    "unicode_decimal": 58929 }] };exports.default = _default;

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map