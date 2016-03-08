/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ModulesBag = __webpack_require__(1);
	
	var _ModulesBag2 = _interopRequireDefault(_ModulesBag);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Signal = function () {
	    function Signal(configuration) {
	        _classCallCheck(this, Signal);
	
	        //Configuration is an array
	        this._processingChain = this._parseConfiguration(configuration); //This should accept the single signal configuration
	    }
	
	    _createClass(Signal, [{
	        key: '_parseConfiguration',
	        value: function _parseConfiguration(configuration, prevModule) {
	            //TODO fix bug that wipes out configuration
	            if (!configuration || !configuration.length) return;
	            var newModuleConfiguration = configuration.pop();
	            var newModuleClass = _ModulesBag2.default.getModulesMap()[newModuleConfiguration.type];
	            var newModule = new newModuleClass(newModuleConfiguration);
	            if (prevModule) prevModule.chain(newModule);
	            this._parseConfiguration(configuration, newModule);
	
	            return newModule;
	        }
	    }, {
	        key: 'push',
	        value: function push(value) {
	            if (this._processingChain) return this._processingChain.queueSample(value);else return undefined;
	        }
	    }, {
	        key: 'output',
	        value: function output() {
	            return this._processingChain.output();
	        }
	
	        //TODO move inside modules bag
	
	    }], [{
	        key: 'getModulesList',
	        value: function getModulesList() {
	            var modulesList = [];
	            for (var i in _ModulesBag2.default.getModulesMap()) {
	                modulesList.push(i);
	            }
	            return modulesList;
	        }
	    }, {
	        key: 'getConfigurationSchemaForModule',
	        value: function getConfigurationSchemaForModule(moduleName) {
	            return _ModulesBag2.default.getModule(moduleName).getConfigurationSchema();
	        }
	    }, {
	        key: 'getModule',
	        value: function getModule(moduleName) {
	            return _ModulesBag2.default.getModule(moduleName);
	        }
	    }]);
	
	    return Signal;
	}();
	
	exports.default = Signal;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _LowPass = __webpack_require__(2);
	
	var _LowPass2 = _interopRequireDefault(_LowPass);
	
	var _Multiplier = __webpack_require__(5);
	
	var _Multiplier2 = _interopRequireDefault(_Multiplier);
	
	var _ADSRCurve = __webpack_require__(6);
	
	var _ADSRCurve2 = _interopRequireDefault(_ADSRCurve);
	
	var _Offset = __webpack_require__(7);
	
	var _Offset2 = _interopRequireDefault(_Offset);
	
	var _WhiteNoise = __webpack_require__(8);
	
	var _WhiteNoise2 = _interopRequireDefault(_WhiteNoise);
	
	var _Threshold = __webpack_require__(9);
	
	var _Threshold2 = _interopRequireDefault(_Threshold);
	
	var _Delay = __webpack_require__(10);
	
	var _Delay2 = _interopRequireDefault(_Delay);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ModulesBag = function () {
	    function ModulesBag() {
	        _classCallCheck(this, ModulesBag);
	    }
	
	    _createClass(ModulesBag, null, [{
	        key: 'getModulesMap',
	        value: function getModulesMap() {
	            var _ref;
	
	            return _ref = {}, _defineProperty(_ref, _LowPass2.default.MODULE_NAME, _LowPass2.default), _defineProperty(_ref, _Multiplier2.default.MODULE_NAME, _Multiplier2.default), _defineProperty(_ref, _ADSRCurve2.default.MODULE_NAME, _ADSRCurve2.default), _defineProperty(_ref, _Offset2.default.MODULE_NAME, _Offset2.default), _defineProperty(_ref, _WhiteNoise2.default.MODULE_NAME, _WhiteNoise2.default), _defineProperty(_ref, _Threshold2.default.MODULE_NAME, _Threshold2.default), _defineProperty(_ref, _Delay2.default.MODULE_NAME, _Delay2.default), _ref;
	        }
	    }, {
	        key: 'getModule',
	        value: function getModule(moduleName) {
	            return ModulesBag.getModulesMap()[moduleName];
	        }
	    }]);
	
	    return ModulesBag;
	}();
	
	exports.default = ModulesBag;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _SignalModule2 = __webpack_require__(3);
	
	var _SignalModule3 = _interopRequireDefault(_SignalModule2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LowPass = function (_SignalModule) {
	    _inherits(LowPass, _SignalModule);
	
	    function LowPass(configuration) {
	        _classCallCheck(this, LowPass);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(LowPass).call(this, configuration.bufferSize.value));
	        //Nothing else to add for now but other modules might have more to say
	    }
	
	    _createClass(LowPass, [{
	        key: "_processOutput",
	        value: function _processOutput() {
	            //One new value was just pushed into the buffer. The output on the other side is...
	            var sum = 0;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = this._buffer.iterate()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var value = _step.value;
	
	                    sum += value;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            return sum ? sum / this._buffer.length : 0;
	        }
	    }], [{
	        key: "getConfigurationSchema",
	        value: function getConfigurationSchema() {
	            /*Useful when you want to build a little editor with sliders
	            that lets you modify your effects rack.
	            You would use this metadata to build the UI.*/
	            var conf = _get(Object.getPrototypeOf(LowPass), "getConfigurationSchema", this).call(this);
	            return Object.assign(conf, {
	                type: LowPass.MODULE_NAME,
	                bufferSize: {
	                    display: "Buffer Size",
	                    type: "number",
	                    range: [2, 100],
	                    value: 100
	                }
	            });
	        }
	    }]);
	
	    return LowPass;
	}(_SignalModule3.default);
	
	LowPass.MODULE_NAME = "LowPass";
	
	exports.default = LowPass;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _SignalBuffer = __webpack_require__(4);
	
	var _SignalBuffer2 = _interopRequireDefault(_SignalBuffer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SignalModule = function () {
	    function SignalModule(bufferSize) {
	        _classCallCheck(this, SignalModule);
	
	        //Update to accept a configuration object
	        this._buffer = new _SignalBuffer2.default(bufferSize);
	    }
	
	    _createClass(SignalModule, [{
	        key: "queueSample",
	        value: function queueSample(value) {
	            if (isNaN(value)) throw "Signals only accept numbers";
	            if (this.hasOwnProperty("_chainedModule")) {
	                var backPropagatedValue = this._chainedModule.queueSample(value);
	                this._buffer.push(backPropagatedValue);
	            } else {
	                this._buffer.push(value);
	            }
	
	            return this.output();
	        }
	    }, {
	        key: "output",
	        value: function output() {
	            return this._processOutput();
	        }
	    }, {
	        key: "_processOutput",
	        value: function _processOutput() {
	            return this._buffer.getFirstItem() || 0;
	        }
	    }, {
	        key: "chain",
	        value: function chain(module) {
	            this._chainedModule = module;
	            module.addChainPredecessor(this);
	            return module;
	        }
	    }, {
	        key: "addChainPredecessor",
	        value: function addChainPredecessor(module) {
	            this._chainPredecessor = module;
	        }
	    }, {
	        key: "getConfigurationSchema",
	        value: function getConfigurationSchema() {
	            return {};
	        }
	    }], [{
	        key: "getConfigurationSchema",
	        value: function getConfigurationSchema() {
	            return {};
	        }
	    }]);
	
	    return SignalModule;
	}();
	
	exports.default = SignalModule;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SignalBuffer = function () {
	    function SignalBuffer(size) {
	        _classCallCheck(this, SignalBuffer);
	
	        this._maxSize = size;
	        this.length = 0;
	    }
	
	    _createClass(SignalBuffer, [{
	        key: "push",
	        value: function push(item) {
	            var record = {
	                value: item
	            };
	            if (!this.hasOwnProperty("_firstItem")) this._firstItem = record;else this._lastItem.next = record;
	            this._lastItem = record;
	
	            this.length++;
	
	            if (this._maxSize && this.length > this._maxSize) return this.shift();else return this._firstItem;
	        }
	    }, {
	        key: "shift",
	        value: function shift() {
	            var shiftedElement;
	            if (this.hasOwnProperty("_firstItem")) shiftedElement = this._firstItem;
	            this._firstItem = this._firstItem.next;
	            this.length--;
	            return shiftedElement;
	        }
	    }, {
	        key: "getFirstItem",
	        value: function getFirstItem() {
	            return this._firstItem.value;
	        }
	    }, {
	        key: "iterate",
	        value: regeneratorRuntime.mark(function iterate() {
	            var counter, currentItem, i;
	            return regeneratorRuntime.wrap(function iterate$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            counter = 0;
	                            currentItem = this._firstItem;
	                            i = 0;
	
	                        case 3:
	                            if (!(i < this.length)) {
	                                _context.next = 10;
	                                break;
	                            }
	
	                            _context.next = 6;
	                            return currentItem.value;
	
	                        case 6:
	                            currentItem = currentItem.next;
	
	                        case 7:
	                            i++;
	                            _context.next = 3;
	                            break;
	
	                        case 10:
	                            return _context.abrupt("return");
	
	                        case 11:
	                        case "end":
	                            return _context.stop();
	                    }
	                }
	            }, iterate, this);
	        })
	    }]);
	
	    return SignalBuffer;
	}();
	
	exports.default = SignalBuffer;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _SignalModule2 = __webpack_require__(3);
	
	var _SignalModule3 = _interopRequireDefault(_SignalModule2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Multiplier = function (_SignalModule) {
	    _inherits(Multiplier, _SignalModule);
	
	    function Multiplier(configuration) {
	        _classCallCheck(this, Multiplier);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Multiplier).call(this, 1));
	
	        _this._factor = configuration.factor.value;
	        return _this;
	    }
	
	    _createClass(Multiplier, [{
	        key: "_processOutput",
	        value: function _processOutput() {
	            return this._buffer.getFirstItem() * parseFloat(this._factor);
	        }
	    }], [{
	        key: "getConfigurationSchema",
	        value: function getConfigurationSchema() {
	            var conf = _get(Object.getPrototypeOf(Multiplier), "getConfigurationSchema", this).call(this);
	            return Object.assign(conf, {
	                type: Multiplier.MODULE_NAME,
	                factor: {
	                    display: "Factor",
	                    type: "number",
	                    range: [-1000, 10000],
	                    value: 1
	                }
	            });
	        }
	    }]);
	
	    return Multiplier;
	}(_SignalModule3.default);
	
	Multiplier.MODULE_NAME = "Multiplier";
	
	exports.default = Multiplier;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _SignalModule2 = __webpack_require__(3);
	
	var _SignalModule3 = _interopRequireDefault(_SignalModule2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ADSRCurve = function (_SignalModule) {
	    _inherits(ADSRCurve, _SignalModule);
	
	    function ADSRCurve(configuration) {
	        _classCallCheck(this, ADSRCurve);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ADSRCurve).call(this, 2));
	
	        _this._state = ADSRCurve.STATES.WAITING;
	        _this._previousReturnValue = 0;
	
	        var attackValue = configuration.attack.value;
	        _this.attackStep = attackValue ? 1 / attackValue : 1;
	        var decayValue = configuration.decay.value;
	        _this.decayStep = decayValue ? 1 / decayValue : 1;
	        var releaseValue = configuration.release.value;
	        _this.releaseStep = releaseValue ? 1 / releaseValue : 1;
	        _this.sustain = configuration.sustain.value ? configuration.sustain.value / 100 : 0;
	        return _this;
	    }
	
	    _createClass(ADSRCurve, [{
	        key: "_processOutput",
	        value: function _processOutput() {
	            //Only looks at current value and precedent value
	            // 0 -> 1 triggers attack logic
	            // 1 -> 0 triggers release logic
	            // 1 -> 1 keeps the sustain/decay sequence going
	            var values = [];
	            var result = this._previousReturnValue;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = this._buffer.iterate()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var value = _step.value;
	
	                    values.push(value); //Should get 2 values in total
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            if (values.length != 2) return 0;
	
	            //Transition state based on input velocity
	            switch (values.join("")) {
	                case "01":
	                    this._state = ADSRCurve.STATES.ATTACKING;
	                    break;
	                case "10":
	                    this._state = ADSRCurve.STATES.RELEASING;
	                    break;
	            }
	
	            //Execute state logic and transition based on result
	            switch (this._state) {
	                case ADSRCurve.STATES.WAITING:
	                    break;
	                case ADSRCurve.STATES.ATTACKING:
	                    if (this._previousReturnValue < 1) {
	                        result = Math.min(this._previousReturnValue + this.attackStep, 1);
	                    } else {
	                        result = this._previousReturnValue;
	                        this._state = ADSRCurve.STATES.DECAYING;
	                    }
	                    break;
	                case ADSRCurve.STATES.DECAYING:
	                    if (this._previousReturnValue > this.sustain) {
	                        result = Math.max(this._previousReturnValue - this.decayStep, this.sustain);
	                    } else {
	                        result = this._previousReturnValue;
	                        this._state = ADSRCurve.STATES.SUSTAINING;
	                    }
	                    break;
	                case ADSRCurve.STATES.RELEASING:
	                    if (this._previousReturnValue > 0) {
	                        result = Math.max(this._previousReturnValue - this.releaseStep, 0);
	                    } else {
	                        result = 0;
	                        this._state = ADSRCurve.STATES.WAITING;
	                    }
	                    break;
	                case ADSRCurve.STATES.SUSTAINING:
	                    result = this._previousReturnValue;
	                    break;
	            }
	
	            this._previousReturnValue = result;
	            return result;
	        }
	    }], [{
	        key: "getConfigurationSchema",
	        value: function getConfigurationSchema() {
	            var conf = _get(Object.getPrototypeOf(ADSRCurve), "getConfigurationSchema", this).call(this);
	            return Object.assign(conf, {
	                type: ADSRCurve.MODULE_NAME,
	                attack: {
	                    display: "Attack frames count",
	                    type: "number",
	                    range: [0, 10000],
	                    value: 0
	                },
	                sustain: {
	                    display: "Sustain percentage",
	                    type: "number",
	                    range: [0, 100],
	                    value: 100
	                },
	                decay: {
	                    display: "Decay frames count",
	                    type: "number",
	                    range: [0, 10000],
	                    value: 20
	                },
	                release: {
	                    display: "Release frames count",
	                    type: "number",
	                    range: [0, 10000],
	                    value: 50
	                }
	            });
	        }
	    }]);
	
	    return ADSRCurve;
	}(_SignalModule3.default);
	
	ADSRCurve.MODULE_NAME = "ADSRCurve";
	ADSRCurve.STATES = {
	    WAITING: "waiting",
	    ATTACKING: "attacking",
	    DECAYING: "decaying",
	    SUSTAINING: "sustaining",
	    RELEASING: "releasing"
	};
	
	exports.default = ADSRCurve;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _SignalModule2 = __webpack_require__(3);
	
	var _SignalModule3 = _interopRequireDefault(_SignalModule2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Offset = function (_SignalModule) {
	    _inherits(Offset, _SignalModule);
	
	    function Offset(configuration) {
	        _classCallCheck(this, Offset);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Offset).call(this, 1));
	
	        _this._offset = configuration.offset.value;
	        return _this;
	    }
	
	    _createClass(Offset, [{
	        key: "_processOutput",
	        value: function _processOutput() {
	            return this._buffer.getFirstItem() + parseFloat(this._offset);
	        }
	    }], [{
	        key: "getConfigurationSchema",
	        value: function getConfigurationSchema() {
	            var conf = _get(Object.getPrototypeOf(Offset), "getConfigurationSchema", this).call(this);
	            return Object.assign(conf, {
	                type: Offset.MODULE_NAME,
	                offset: {
	                    display: "Offset",
	                    type: "number",
	                    range: [-1000, 10000],
	                    value: 1
	                }
	            });
	        }
	    }]);
	
	    return Offset;
	}(_SignalModule3.default);
	
	Offset.MODULE_NAME = "Offset";
	
	exports.default = Offset;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _SignalModule2 = __webpack_require__(3);
	
	var _SignalModule3 = _interopRequireDefault(_SignalModule2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var WhiteNoise = function (_SignalModule) {
	    _inherits(WhiteNoise, _SignalModule);
	
	    function WhiteNoise(configuration) {
	        _classCallCheck(this, WhiteNoise);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WhiteNoise).call(this, 1));
	
	        _this._operator = configuration.operator.value;
	        return _this;
	    }
	
	    _createClass(WhiteNoise, [{
	        key: "_processOutput",
	        value: function _processOutput() {
	            var result = 0;
	            var noiseValue = Math.random();
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = this._buffer.iterate()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var value = _step.value;
	
	                    switch (this._operator) {
	                        case "addition":
	                            // sum
	                            result = value + noiseValue;
	                            break;
	                        case "product":
	                            result = value * noiseValue;
	                            break;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            return result;
	        }
	    }], [{
	        key: "getConfigurationSchema",
	        value: function getConfigurationSchema() {
	            var conf = _get(Object.getPrototypeOf(WhiteNoise), "getConfigurationSchema", this).call(this);
	            return Object.assign(conf, {
	                type: WhiteNoise.MODULE_NAME,
	                operator: {
	                    display: "Operator",
	                    type: "description",
	                    options: {
	                        "addition": "addition",
	                        "product": "product"
	                    },
	                    value: "addition"
	                }
	            });
	        }
	    }]);
	
	    return WhiteNoise;
	}(_SignalModule3.default);
	
	WhiteNoise.MODULE_NAME = "WhiteNoise";
	
	exports.default = WhiteNoise;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _SignalModule2 = __webpack_require__(3);
	
	var _SignalModule3 = _interopRequireDefault(_SignalModule2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Threshold = function (_SignalModule) {
	    _inherits(Threshold, _SignalModule);
	
	    function Threshold(configuration) {
	        _classCallCheck(this, Threshold);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Threshold).call(this, 1));
	
	        _this._threshold = configuration.threshold.value;
	        //Nothing else to add for now but other modules might have more to say
	        return _this;
	    }
	
	    _createClass(Threshold, [{
	        key: "_processOutput",
	        value: function _processOutput() {
	            var result = 0;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = this._buffer.iterate()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var value = _step.value;
	
	                    if (value >= this._threshold) result = value;else result = 0;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            return result;
	        }
	    }], [{
	        key: "getConfigurationSchema",
	        value: function getConfigurationSchema() {
	            var conf = _get(Object.getPrototypeOf(Threshold), "getConfigurationSchema", this).call(this);
	            return Object.assign(conf, {
	                type: Threshold.MODULE_NAME,
	                threshold: {
	                    display: "Buffer Size",
	                    type: "number",
	                    range: [1, 100],
	                    value: 100
	                }
	            });
	        }
	    }]);
	
	    return Threshold;
	}(_SignalModule3.default);
	
	Threshold.MODULE_NAME = "Threshold";
	
	exports.default = Threshold;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _SignalModule2 = __webpack_require__(3);
	
	var _SignalModule3 = _interopRequireDefault(_SignalModule2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Delay = function (_SignalModule) {
	    _inherits(Delay, _SignalModule);
	
	    function Delay(configuration) {
	        _classCallCheck(this, Delay);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Delay).call(this, configuration.frames.value));
	
	        for (var i = 0; i < configuration.frames.value; i++) {
	            _this._buffer.push(0);
	        }
	        return _this;
	    }
	
	    _createClass(Delay, null, [{
	        key: "getConfigurationSchema",
	        value: function getConfigurationSchema() {
	            var conf = _get(Object.getPrototypeOf(Delay), "getConfigurationSchema", this).call(this);
	            return Object.assign(conf, {
	                type: Delay.MODULE_NAME,
	                frames: {
	                    display: "Frames",
	                    type: "number",
	                    range: [1, 200],
	                    value: 100
	                }
	            });
	        }
	    }]);
	
	    return Delay;
	}(_SignalModule3.default);
	
	Delay.MODULE_NAME = "Delay";
	
	exports.default = Delay;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map