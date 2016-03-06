(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ModulesBag = require('./modules/ModulesBag');

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

},{"./modules/ModulesBag":8}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SignalBuffer = require("./SignalBuffer");

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

},{"./SignalBuffer":2}],4:[function(require,module,exports){
'use strict';

var _Signal = require('./Signal');

var _Signal2 = _interopRequireDefault(_Signal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

define(function () {
    return _Signal2.default;
});

},{"./Signal":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SignalModule2 = require("../SignalModule");

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

},{"../SignalModule":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SignalModule2 = require("../SignalModule");

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

},{"../SignalModule":3}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SignalModule2 = require("../SignalModule");

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

},{"../SignalModule":3}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LowPass = require('./LowPass');

var _LowPass2 = _interopRequireDefault(_LowPass);

var _Multiplier = require('./Multiplier');

var _Multiplier2 = _interopRequireDefault(_Multiplier);

var _ADSRCurve = require('./ADSRCurve');

var _ADSRCurve2 = _interopRequireDefault(_ADSRCurve);

var _Offset = require('./Offset');

var _Offset2 = _interopRequireDefault(_Offset);

var _WhiteNoise = require('./WhiteNoise');

var _WhiteNoise2 = _interopRequireDefault(_WhiteNoise);

var _Threshold = require('./Threshold');

var _Threshold2 = _interopRequireDefault(_Threshold);

var _Delay = require('./Delay');

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

},{"./ADSRCurve":5,"./Delay":6,"./LowPass":7,"./Multiplier":9,"./Offset":10,"./Threshold":11,"./WhiteNoise":12}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SignalModule2 = require("../SignalModule");

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

},{"../SignalModule":3}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SignalModule2 = require("../SignalModule");

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

},{"../SignalModule":3}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SignalModule2 = require("../SignalModule");

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

},{"../SignalModule":3}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SignalModule2 = require("../SignalModule");

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

},{"../SignalModule":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvU2lnbmFsLmpzIiwic3JjL1NpZ25hbEJ1ZmZlci5qcyIsInNyYy9TaWduYWxNb2R1bGUuanMiLCJzcmMvbWFpbi5qcyIsInNyYy9tb2R1bGVzL0FEU1JDdXJ2ZS5qcyIsInNyYy9tb2R1bGVzL0RlbGF5LmpzIiwic3JjL21vZHVsZXMvTG93UGFzcy5qcyIsInNyYy9tb2R1bGVzL01vZHVsZXNCYWcuanMiLCJzcmMvbW9kdWxlcy9NdWx0aXBsaWVyLmpzIiwic3JjL21vZHVsZXMvT2Zmc2V0LmpzIiwic3JjL21vZHVsZXMvVGhyZXNob2xkLmpzIiwic3JjL21vZHVsZXMvV2hpdGVOb2lzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNFTTtBQUNGLGFBREUsTUFDRixDQUFZLGFBQVosRUFBMEI7OEJBRHhCLFFBQ3dCOzs7QUFDdEIsYUFBSyxnQkFBTCxHQUF3QixLQUFLLG1CQUFMLENBQXlCLGFBQXpCLENBQXhCO0FBRHNCLEtBQTFCOztpQkFERTs7NENBS2tCLGVBQWUsWUFBVzs7QUFFMUMsZ0JBQUcsQ0FBQyxhQUFELElBQWtCLENBQUMsY0FBYyxNQUFkLEVBQXNCLE9BQTVDO0FBQ0EsZ0JBQUkseUJBQXlCLGNBQWMsR0FBZCxFQUF6QixDQUhzQztBQUkxQyxnQkFBSSxpQkFBaUIscUJBQVcsYUFBWCxHQUEyQix1QkFBdUIsSUFBdkIsQ0FBNUMsQ0FKc0M7QUFLMUMsZ0JBQUksWUFBWSxJQUFJLGNBQUosQ0FBbUIsc0JBQW5CLENBQVosQ0FMc0M7QUFNMUMsZ0JBQUcsVUFBSCxFQUFlLFdBQVcsS0FBWCxDQUFpQixTQUFqQixFQUFmO0FBQ0EsaUJBQUssbUJBQUwsQ0FBeUIsYUFBekIsRUFBd0MsU0FBeEMsRUFQMEM7O0FBUzFDLG1CQUFPLFNBQVAsQ0FUMEM7Ozs7NkJBWXpDLE9BQU07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UTs7Ozs7O0FBR1oscUNBQWlCLEtBQUssT0FBTCxDQUFhLE9BQWIsNEJBQWpCLG9HQUF3Qzt3QkFBaEMsb0JBQWdDOztBQUNwQyw0QkFBTyxLQUFLLFNBQUw7QUFDSCw2QkFBSyxVQUFMOztBQUNJLHFDQUFTLFFBQVEsVUFBUixDQURiO0FBRUksa0NBRko7QUFESiw2QkFJUyxTQUFMO0FBQ0kscUNBQVMsUUFBUSxVQUFSLENBRGI7QUFFSSxrQ0FGSjtBQUpKLHFCQURvQztpQkFBeEM7Ozs7Ozs7Ozs7Ozs7O2FBSFk7O0FBYVosbUJBQU8sTUFBUCxDQWJZOzs7O2lEQWdCZTtBQUMzQixnQkFBSSxrQ0F4Qk4sdURBd0JNLENBRHVCO0FBRTNCLG1CQUFPLE9BQU8sTUFBUCxDQUFjLElBQWQsRUFBb0I7QUFDdkIsc0JBQU0sV0FBVyxXQUFYO0FBQ04sMEJBQVU7QUFDTiw2QkFBUyxVQUFUO0FBQ0EsMEJBQU0sYUFBTjtBQUNBLDZCQUFTO0FBQ0wsb0NBQVksVUFBWjtBQUNBLG1DQUFXLFNBQVg7cUJBRko7QUFJQSwyQkFBTyxVQUFQO2lCQVBKO2FBRkcsQ0FBUCxDQUYyQjs7OztXQXZCN0I7OztBQXdDTixXQUFXLFdBQVgsR0FBeUIsWUFBekI7O2tCQUVlIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBNb2R1bGVzQmFnIGZyb20gJy4vbW9kdWxlcy9Nb2R1bGVzQmFnJ1xuXG5jbGFzcyBTaWduYWwge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ3VyYXRpb24peyAvL0NvbmZpZ3VyYXRpb24gaXMgYW4gYXJyYXlcbiAgICAgICAgdGhpcy5fcHJvY2Vzc2luZ0NoYWluID0gdGhpcy5fcGFyc2VDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb24pOyAvL1RoaXMgc2hvdWxkIGFjY2VwdCB0aGUgc2luZ2xlIHNpZ25hbCBjb25maWd1cmF0aW9uXG4gICAgfVxuXG4gICAgX3BhcnNlQ29uZmlndXJhdGlvbihjb25maWd1cmF0aW9uLCBwcmV2TW9kdWxlKXtcbiAgICAgICAgLy9UT0RPIGZpeCBidWcgdGhhdCB3aXBlcyBvdXQgY29uZmlndXJhdGlvblxuICAgICAgICBpZighY29uZmlndXJhdGlvbiB8fCAhY29uZmlndXJhdGlvbi5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgdmFyIG5ld01vZHVsZUNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uLnBvcCgpO1xuICAgICAgICB2YXIgbmV3TW9kdWxlQ2xhc3MgPSBNb2R1bGVzQmFnLmdldE1vZHVsZXNNYXAoKVtuZXdNb2R1bGVDb25maWd1cmF0aW9uLnR5cGVdXG4gICAgICAgIHZhciBuZXdNb2R1bGUgPSBuZXcgbmV3TW9kdWxlQ2xhc3MobmV3TW9kdWxlQ29uZmlndXJhdGlvbik7XG4gICAgICAgIGlmKHByZXZNb2R1bGUpIHByZXZNb2R1bGUuY2hhaW4obmV3TW9kdWxlKTtcbiAgICAgICAgdGhpcy5fcGFyc2VDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb24sIG5ld01vZHVsZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ld01vZHVsZTtcbiAgICB9XG5cbiAgICBwdXNoKHZhbHVlKXtcbiAgICAgICAgaWYodGhpcy5fcHJvY2Vzc2luZ0NoYWluKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NpbmdDaGFpbi5xdWV1ZVNhbXBsZSh2YWx1ZSk7XG4gICAgICAgIGVsc2UgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBvdXRwdXQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NpbmdDaGFpbi5vdXRwdXQoKTtcbiAgICB9XG5cbiAgICAvL1RPRE8gbW92ZSBpbnNpZGUgbW9kdWxlcyBiYWdcbiAgICBzdGF0aWMgZ2V0TW9kdWxlc0xpc3QoKXtcbiAgICAgICAgdmFyIG1vZHVsZXNMaXN0ID0gW107XG4gICAgICAgIGZvcih2YXIgaSBpbiBNb2R1bGVzQmFnLmdldE1vZHVsZXNNYXAoKSl7XG4gICAgICAgICAgICBtb2R1bGVzTGlzdC5wdXNoKGkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1vZHVsZXNMaXN0O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRDb25maWd1cmF0aW9uU2NoZW1hRm9yTW9kdWxlKG1vZHVsZU5hbWUpe1xuICAgICAgICByZXR1cm4gTW9kdWxlc0JhZy5nZXRNb2R1bGUobW9kdWxlTmFtZSkuZ2V0Q29uZmlndXJhdGlvblNjaGVtYSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRNb2R1bGUobW9kdWxlTmFtZSl7XG4gICAgICAgIHJldHVybiBNb2R1bGVzQmFnLmdldE1vZHVsZShtb2R1bGVOYW1lKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZ25hbDtcbiIsImNsYXNzIFNpZ25hbEJ1ZmZlciB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSl7XG4gICAgICAgIHRoaXMuX21heFNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgcHVzaChpdGVtKXtcbiAgICAgICAgdmFyIHJlY29yZCA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBpdGVtXG4gICAgICAgIH07XG4gICAgICAgIGlmKCF0aGlzLmhhc093blByb3BlcnR5KFwiX2ZpcnN0SXRlbVwiKSlcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0SXRlbSA9IHJlY29yZDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5fbGFzdEl0ZW0ubmV4dCA9IHJlY29yZDtcbiAgICAgICAgdGhpcy5fbGFzdEl0ZW0gPSByZWNvcmQ7XG5cbiAgICAgICAgdGhpcy5sZW5ndGggKys7XG5cbiAgICAgICAgaWYodGhpcy5fbWF4U2l6ZSAmJiB0aGlzLmxlbmd0aCA+IHRoaXMuX21heFNpemUpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaGlmdCgpO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLl9maXJzdEl0ZW07XG4gICAgfVxuXG4gICAgc2hpZnQoKXtcbiAgICAgICAgdmFyIHNoaWZ0ZWRFbGVtZW50O1xuICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KFwiX2ZpcnN0SXRlbVwiKSlcbiAgICAgICAgICAgIHNoaWZ0ZWRFbGVtZW50ID0gdGhpcy5fZmlyc3RJdGVtO1xuICAgICAgICAgICAgdGhpcy5fZmlyc3RJdGVtID0gdGhpcy5fZmlyc3RJdGVtLm5leHQ7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCAtLTtcbiAgICAgICAgcmV0dXJuIHNoaWZ0ZWRFbGVtZW50O1xuICAgIH1cblxuICAgIGdldEZpcnN0SXRlbSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3RJdGVtLnZhbHVlO1xuICAgIH1cblxuICAgICppdGVyYXRlKCl7XG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgdmFyIGN1cnJlbnRJdGVtID0gdGhpcy5fZmlyc3RJdGVtO1xuICAgICAgICBmb3IodmFyIGk9MDsgaTx0aGlzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHlpZWxkIGN1cnJlbnRJdGVtLnZhbHVlO1xuICAgICAgICAgICAgY3VycmVudEl0ZW0gPSBjdXJyZW50SXRlbS5uZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH0gICBcblxufVxuXG5leHBvcnQgZGVmYXVsdCBTaWduYWxCdWZmZXI7IiwiaW1wb3J0IFNpZ25hbEJ1ZmZlciBmcm9tICcuL1NpZ25hbEJ1ZmZlcidcblxuY2xhc3MgU2lnbmFsTW9kdWxlIHtcbiAgICBjb25zdHJ1Y3RvcihidWZmZXJTaXplKXsgLy9VcGRhdGUgdG8gYWNjZXB0IGEgY29uZmlndXJhdGlvbiBvYmplY3RcbiAgICAgICAgdGhpcy5fYnVmZmVyID0gbmV3IFNpZ25hbEJ1ZmZlcihidWZmZXJTaXplKTtcbiAgICB9XG5cbiAgICBxdWV1ZVNhbXBsZSh2YWx1ZSl7XG4gICAgICAgIGlmKGlzTmFOKHZhbHVlKSkgdGhyb3cgXCJTaWduYWxzIG9ubHkgYWNjZXB0IG51bWJlcnNcIjtcbiAgICAgICAgaWYodGhpcy5oYXNPd25Qcm9wZXJ0eShcIl9jaGFpbmVkTW9kdWxlXCIpKXtcbiAgICAgICAgICAgIGxldCBiYWNrUHJvcGFnYXRlZFZhbHVlID0gdGhpcy5fY2hhaW5lZE1vZHVsZS5xdWV1ZVNhbXBsZSh2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIucHVzaChiYWNrUHJvcGFnYXRlZFZhbHVlKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vdXRwdXQoKTtcbiAgICB9XG5cbiAgICBvdXRwdXQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3NPdXRwdXQoKTtcbiAgICB9XG5cbiAgICBfcHJvY2Vzc091dHB1dCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVyLmdldEZpcnN0SXRlbSgpIHx8IDA7XG4gICAgfVxuXG4gICAgY2hhaW4obW9kdWxlKXtcbiAgICAgICAgdGhpcy5fY2hhaW5lZE1vZHVsZSA9IG1vZHVsZTtcbiAgICAgICAgbW9kdWxlLmFkZENoYWluUHJlZGVjZXNzb3IodGhpcyk7XG4gICAgICAgIHJldHVybiBtb2R1bGU7XG4gICAgfVxuXG4gICAgYWRkQ2hhaW5QcmVkZWNlc3Nvcihtb2R1bGUpe1xuICAgICAgICB0aGlzLl9jaGFpblByZWRlY2Vzc29yID0gbW9kdWxlO1xuICAgIH1cblxuICAgIGdldENvbmZpZ3VyYXRpb25TY2hlbWEoKXtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRDb25maWd1cmF0aW9uU2NoZW1hKCl7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpZ25hbE1vZHVsZTsiLCJpbXBvcnQgU2lnbmFsIGZyb20gJy4vU2lnbmFsJ1xuXG5kZWZpbmUoZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gU2lnbmFsO1xufSk7IiwiaW1wb3J0IFNpZ25hbE1vZHVsZSBmcm9tICcuLi9TaWduYWxNb2R1bGUnXG5cbmNsYXNzIEFEU1JDdXJ2ZSBleHRlbmRzIFNpZ25hbE1vZHVsZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWd1cmF0aW9uKXtcbiAgICAgICAgc3VwZXIoMik7XG5cbiAgICAgICAgdGhpcy5fc3RhdGUgPSBBRFNSQ3VydmUuU1RBVEVTLldBSVRJTkc7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzUmV0dXJuVmFsdWUgPSAwO1xuXG4gICAgICAgIHZhciBhdHRhY2tWYWx1ZSA9IGNvbmZpZ3VyYXRpb24uYXR0YWNrLnZhbHVlO1xuICAgICAgICB0aGlzLmF0dGFja1N0ZXAgPSBhdHRhY2tWYWx1ZSA/IDEvYXR0YWNrVmFsdWUgOiAxO1xuICAgICAgICB2YXIgZGVjYXlWYWx1ZSA9IGNvbmZpZ3VyYXRpb24uZGVjYXkudmFsdWU7XG4gICAgICAgIHRoaXMuZGVjYXlTdGVwID0gZGVjYXlWYWx1ZSA/IDEvZGVjYXlWYWx1ZSA6IDE7XG4gICAgICAgIHZhciByZWxlYXNlVmFsdWUgPSBjb25maWd1cmF0aW9uLnJlbGVhc2UudmFsdWU7XG4gICAgICAgIHRoaXMucmVsZWFzZVN0ZXAgPSByZWxlYXNlVmFsdWUgPyAxL3JlbGVhc2VWYWx1ZSA6IDE7XG4gICAgICAgIHRoaXMuc3VzdGFpbiA9IGNvbmZpZ3VyYXRpb24uc3VzdGFpbi52YWx1ZSA/IGNvbmZpZ3VyYXRpb24uc3VzdGFpbi52YWx1ZS8xMDAgOiAwO1xuICAgIH1cblxuICAgIF9wcm9jZXNzT3V0cHV0KCl7XG4gICAgICAgIC8vT25seSBsb29rcyBhdCBjdXJyZW50IHZhbHVlIGFuZCBwcmVjZWRlbnQgdmFsdWVcbiAgICAgICAgLy8gMCAtPiAxIHRyaWdnZXJzIGF0dGFjayBsb2dpY1xuICAgICAgICAvLyAxIC0+IDAgdHJpZ2dlcnMgcmVsZWFzZSBsb2dpY1xuICAgICAgICAvLyAxIC0+IDEga2VlcHMgdGhlIHN1c3RhaW4vZGVjYXkgc2VxdWVuY2UgZ29pbmdcbiAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fcHJldmlvdXNSZXR1cm5WYWx1ZTtcbiAgICAgICAgZm9yKHZhciB2YWx1ZSBvZiB0aGlzLl9idWZmZXIuaXRlcmF0ZSgpKXtcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKSAvL1Nob3VsZCBnZXQgMiB2YWx1ZXMgaW4gdG90YWxcbiAgICAgICAgfVxuICAgICAgICBpZih2YWx1ZXMubGVuZ3RoIT0yKSByZXR1cm4gMDtcblxuXG4gICAgICAgIC8vVHJhbnNpdGlvbiBzdGF0ZSBiYXNlZCBvbiBpbnB1dCB2ZWxvY2l0eVxuICAgICAgICBzd2l0Y2godmFsdWVzLmpvaW4oXCJcIikpe1xuICAgICAgICAgICAgY2FzZSBcIjAxXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBBRFNSQ3VydmUuU1RBVEVTLkFUVEFDS0lORztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCIxMFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gQURTUkN1cnZlLlNUQVRFUy5SRUxFQVNJTkc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vRXhlY3V0ZSBzdGF0ZSBsb2dpYyBhbmQgdHJhbnNpdGlvbiBiYXNlZCBvbiByZXN1bHRcbiAgICAgICAgc3dpdGNoKHRoaXMuX3N0YXRlKXtcbiAgICAgICAgICAgIGNhc2UgQURTUkN1cnZlLlNUQVRFUy5XQUlUSU5HOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBBRFNSQ3VydmUuU1RBVEVTLkFUVEFDS0lORzpcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9wcmV2aW91c1JldHVyblZhbHVlPDEpe1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBNYXRoLm1pbih0aGlzLl9wcmV2aW91c1JldHVyblZhbHVlICsgdGhpcy5hdHRhY2tTdGVwLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fcHJldmlvdXNSZXR1cm5WYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBBRFNSQ3VydmUuU1RBVEVTLkRFQ0FZSU5HO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQURTUkN1cnZlLlNUQVRFUy5ERUNBWUlORzpcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9wcmV2aW91c1JldHVyblZhbHVlID4gdGhpcy5zdXN0YWluKXtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gTWF0aC5tYXgodGhpcy5fcHJldmlvdXNSZXR1cm5WYWx1ZSAtIHRoaXMuZGVjYXlTdGVwLCB0aGlzLnN1c3RhaW4pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9wcmV2aW91c1JldHVyblZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IEFEU1JDdXJ2ZS5TVEFURVMuU1VTVEFJTklORztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFEU1JDdXJ2ZS5TVEFURVMuUkVMRUFTSU5HOlxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX3ByZXZpb3VzUmV0dXJuVmFsdWUgPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gTWF0aC5tYXgodGhpcy5fcHJldmlvdXNSZXR1cm5WYWx1ZSAtIHRoaXMucmVsZWFzZVN0ZXAsIDApO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IEFEU1JDdXJ2ZS5TVEFURVMuV0FJVElORztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFEU1JDdXJ2ZS5TVEFURVMuU1VTVEFJTklORzpcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9wcmV2aW91c1JldHVyblZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcHJldmlvdXNSZXR1cm5WYWx1ZSA9IHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlndXJhdGlvblNjaGVtYSgpe1xuICAgICAgICB2YXIgY29uZiA9IHN1cGVyLmdldENvbmZpZ3VyYXRpb25TY2hlbWEoKTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oY29uZiwge1xuICAgICAgICAgICAgdHlwZTogQURTUkN1cnZlLk1PRFVMRV9OQU1FLFxuICAgICAgICAgICAgYXR0YWNrOiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJBdHRhY2sgZnJhbWVzIGNvdW50XCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICByYW5nZTogWzAsMTAwMDBdLFxuICAgICAgICAgICAgICAgIHZhbHVlOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VzdGFpbjoge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiU3VzdGFpbiBwZXJjZW50YWdlXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICByYW5nZTogWzAsMTAwXSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogMTAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVjYXk6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcIkRlY2F5IGZyYW1lcyBjb3VudFwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IFswLDEwMDAwXSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogMjBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWxlYXNlOiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJSZWxlYXNlIGZyYW1lcyBjb3VudFwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IFswLDEwMDAwXSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogNTBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5BRFNSQ3VydmUuTU9EVUxFX05BTUUgPSBcIkFEU1JDdXJ2ZVwiO1xuQURTUkN1cnZlLlNUQVRFUyA9IHtcbiAgICBXQUlUSU5HOiBcIndhaXRpbmdcIixcbiAgICBBVFRBQ0tJTkc6IFwiYXR0YWNraW5nXCIsXG4gICAgREVDQVlJTkc6IFwiZGVjYXlpbmdcIixcbiAgICBTVVNUQUlOSU5HOiBcInN1c3RhaW5pbmdcIixcbiAgICBSRUxFQVNJTkc6IFwicmVsZWFzaW5nXCJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFEU1JDdXJ2ZTsiLCJpbXBvcnQgU2lnbmFsTW9kdWxlIGZyb20gJy4uL1NpZ25hbE1vZHVsZSdcblxuY2xhc3MgRGVsYXkgZXh0ZW5kcyBTaWduYWxNb2R1bGUge1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlndXJhdGlvbil7XG4gICAgICAgIHN1cGVyKGNvbmZpZ3VyYXRpb24uZnJhbWVzLnZhbHVlKTtcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8Y29uZmlndXJhdGlvbi5mcmFtZXMudmFsdWU7IGkrKyl7XG4gICAgICAgICAgdGhpcy5fYnVmZmVyLnB1c2goMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlndXJhdGlvblNjaGVtYSgpe1xuICAgICAgICB2YXIgY29uZiA9IHN1cGVyLmdldENvbmZpZ3VyYXRpb25TY2hlbWEoKTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oY29uZiwge1xuICAgICAgICAgICAgdHlwZTogRGVsYXkuTU9EVUxFX05BTUUsXG4gICAgICAgICAgICBmcmFtZXM6IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBcIkZyYW1lc1wiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IFsxLDIwMF0sXG4gICAgICAgICAgICAgICAgdmFsdWU6IDEwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbkRlbGF5Lk1PRFVMRV9OQU1FID0gXCJEZWxheVwiO1xuXG5leHBvcnQgZGVmYXVsdCBEZWxheTtcbiIsImltcG9ydCBTaWduYWxNb2R1bGUgZnJvbSAnLi4vU2lnbmFsTW9kdWxlJ1xuXG5jbGFzcyBMb3dQYXNzIGV4dGVuZHMgU2lnbmFsTW9kdWxlIHtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ3VyYXRpb24pe1xuICAgICAgICBzdXBlcihjb25maWd1cmF0aW9uLmJ1ZmZlclNpemUudmFsdWUpO1xuICAgICAgICAvL05vdGhpbmcgZWxzZSB0byBhZGQgZm9yIG5vdyBidXQgb3RoZXIgbW9kdWxlcyBtaWdodCBoYXZlIG1vcmUgdG8gc2F5XG4gICAgfVxuXG4gICAgX3Byb2Nlc3NPdXRwdXQoKXtcbiAgICAgICAgLy9PbmUgbmV3IHZhbHVlIHdhcyBqdXN0IHB1c2hlZCBpbnRvIHRoZSBidWZmZXIuIFRoZSBvdXRwdXQgb24gdGhlIG90aGVyIHNpZGUgaXMuLi5cbiAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgIGZvcih2YXIgdmFsdWUgb2YgdGhpcy5fYnVmZmVyLml0ZXJhdGUoKSl7XG4gICAgICAgICAgICBzdW0gKz0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bSA/IHN1bS90aGlzLl9idWZmZXIubGVuZ3RoIDogMDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlndXJhdGlvblNjaGVtYSgpe1xuICAgICAgICAvKlVzZWZ1bCB3aGVuIHlvdSB3YW50IHRvIGJ1aWxkIGEgbGl0dGxlIGVkaXRvciB3aXRoIHNsaWRlcnNcbiAgICAgICAgdGhhdCBsZXRzIHlvdSBtb2RpZnkgeW91ciBlZmZlY3RzIHJhY2suXG4gICAgICAgIFlvdSB3b3VsZCB1c2UgdGhpcyBtZXRhZGF0YSB0byBidWlsZCB0aGUgVUkuKi9cbiAgICAgICAgdmFyIGNvbmYgPSBzdXBlci5nZXRDb25maWd1cmF0aW9uU2NoZW1hKCk7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGNvbmYsIHtcbiAgICAgICAgICAgIHR5cGU6IExvd1Bhc3MuTU9EVUxFX05BTUUsXG4gICAgICAgICAgICBidWZmZXJTaXplOiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJCdWZmZXIgU2l6ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IFsyLDEwMF0sXG4gICAgICAgICAgICAgICAgdmFsdWU6IDEwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbkxvd1Bhc3MuTU9EVUxFX05BTUUgPSBcIkxvd1Bhc3NcIjtcblxuZXhwb3J0IGRlZmF1bHQgTG93UGFzcztcbiIsImltcG9ydCBMb3dQYXNzIGZyb20gJy4vTG93UGFzcydcbmltcG9ydCBNdWx0aXBsaWVyIGZyb20gJy4vTXVsdGlwbGllcidcbmltcG9ydCBBRFNSQ3VydmUgZnJvbSAnLi9BRFNSQ3VydmUnXG5pbXBvcnQgT2Zmc2V0IGZyb20gJy4vT2Zmc2V0J1xuaW1wb3J0IFdoaXRlTm9pc2UgZnJvbSAnLi9XaGl0ZU5vaXNlJ1xuaW1wb3J0IFRocmVzaG9sZCBmcm9tICcuL1RocmVzaG9sZCdcbmltcG9ydCBEZWxheSBmcm9tICcuL0RlbGF5J1xuXG5jbGFzcyBNb2R1bGVzQmFnIHtcbiAgICBzdGF0aWMgZ2V0TW9kdWxlc01hcCgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBbTG93UGFzcy5NT0RVTEVfTkFNRV06IExvd1Bhc3MsXG4gICAgICAgICAgICAgICAgICAgIFtNdWx0aXBsaWVyLk1PRFVMRV9OQU1FXTogTXVsdGlwbGllcixcbiAgICAgICAgICAgICAgICAgICAgW0FEU1JDdXJ2ZS5NT0RVTEVfTkFNRV06IEFEU1JDdXJ2ZSxcbiAgICAgICAgICAgICAgICAgICAgW09mZnNldC5NT0RVTEVfTkFNRV06IE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgW1doaXRlTm9pc2UuTU9EVUxFX05BTUVdOiBXaGl0ZU5vaXNlLFxuICAgICAgICAgICAgICAgICAgICBbVGhyZXNob2xkLk1PRFVMRV9OQU1FXTogVGhyZXNob2xkLFxuICAgICAgICAgICAgICAgICAgICBbRGVsYXkuTU9EVUxFX05BTUVdOiBEZWxheVxuICAgICAgICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0TW9kdWxlKG1vZHVsZU5hbWUpe1xuICAgICAgICByZXR1cm4gTW9kdWxlc0JhZy5nZXRNb2R1bGVzTWFwKClbbW9kdWxlTmFtZV07XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2R1bGVzQmFnO1xuIiwiaW1wb3J0IFNpZ25hbE1vZHVsZSBmcm9tICcuLi9TaWduYWxNb2R1bGUnXG5cbmNsYXNzIE11bHRpcGxpZXIgZXh0ZW5kcyBTaWduYWxNb2R1bGUge1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlndXJhdGlvbil7XG4gICAgICAgIHN1cGVyKDEpO1xuICAgICAgICB0aGlzLl9mYWN0b3IgPSBjb25maWd1cmF0aW9uLmZhY3Rvci52YWx1ZTtcbiAgICB9XG5cbiAgICBfcHJvY2Vzc091dHB1dCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVyLmdldEZpcnN0SXRlbSgpKnBhcnNlRmxvYXQodGhpcy5fZmFjdG9yKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlndXJhdGlvblNjaGVtYSgpe1xuICAgICAgICB2YXIgY29uZiA9IHN1cGVyLmdldENvbmZpZ3VyYXRpb25TY2hlbWEoKTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oY29uZiwge1xuICAgICAgICAgICAgdHlwZTogTXVsdGlwbGllci5NT0RVTEVfTkFNRSxcbiAgICAgICAgICAgIGZhY3Rvcjoge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiRmFjdG9yXCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICByYW5nZTogWy0xMDAwLDEwMDAwXSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogMVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk11bHRpcGxpZXIuTU9EVUxFX05BTUUgPSBcIk11bHRpcGxpZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgTXVsdGlwbGllcjsiLCJpbXBvcnQgU2lnbmFsTW9kdWxlIGZyb20gJy4uL1NpZ25hbE1vZHVsZSdcblxuY2xhc3MgT2Zmc2V0IGV4dGVuZHMgU2lnbmFsTW9kdWxlIHtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ3VyYXRpb24pe1xuICAgICAgICBzdXBlcigxKTtcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gY29uZmlndXJhdGlvbi5vZmZzZXQudmFsdWU7XG4gICAgfVxuXG4gICAgX3Byb2Nlc3NPdXRwdXQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlci5nZXRGaXJzdEl0ZW0oKStwYXJzZUZsb2F0KHRoaXMuX29mZnNldCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldENvbmZpZ3VyYXRpb25TY2hlbWEoKXtcbiAgICAgICAgdmFyIGNvbmYgPSBzdXBlci5nZXRDb25maWd1cmF0aW9uU2NoZW1hKCk7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGNvbmYsIHtcbiAgICAgICAgICAgIHR5cGU6IE9mZnNldC5NT0RVTEVfTkFNRSxcbiAgICAgICAgICAgIG9mZnNldDoge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiT2Zmc2V0XCIsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgICAgICByYW5nZTogWy0xMDAwLDEwMDAwXSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogMVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbk9mZnNldC5NT0RVTEVfTkFNRSA9IFwiT2Zmc2V0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IE9mZnNldDsiLCJpbXBvcnQgU2lnbmFsTW9kdWxlIGZyb20gJy4uL1NpZ25hbE1vZHVsZSdcblxuY2xhc3MgVGhyZXNob2xkIGV4dGVuZHMgU2lnbmFsTW9kdWxlIHtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ3VyYXRpb24pe1xuICAgICAgICBzdXBlcigxKTtcbiAgICAgICAgdGhpcy5fdGhyZXNob2xkID0gY29uZmlndXJhdGlvbi50aHJlc2hvbGQudmFsdWU7XG4gICAgICAgIC8vTm90aGluZyBlbHNlIHRvIGFkZCBmb3Igbm93IGJ1dCBvdGhlciBtb2R1bGVzIG1pZ2h0IGhhdmUgbW9yZSB0byBzYXlcbiAgICB9XG5cbiAgICBfcHJvY2Vzc091dHB1dCgpe1xuICAgICAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICAgICAgZm9yKHZhciB2YWx1ZSBvZiB0aGlzLl9idWZmZXIuaXRlcmF0ZSgpKXtcbiAgICAgICAgICAgIGlmKHZhbHVlID49IHRoaXMuX3RocmVzaG9sZCkgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgICBlbHNlIHJlc3VsdCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0Q29uZmlndXJhdGlvblNjaGVtYSgpe1xuICAgICAgICB2YXIgY29uZiA9IHN1cGVyLmdldENvbmZpZ3VyYXRpb25TY2hlbWEoKTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oY29uZiwge1xuICAgICAgICAgICAgdHlwZTogVGhyZXNob2xkLk1PRFVMRV9OQU1FLFxuICAgICAgICAgICAgdGhyZXNob2xkOiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogXCJCdWZmZXIgU2l6ZVwiLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICAgICAgcmFuZ2U6IFsxLDEwMF0sXG4gICAgICAgICAgICAgICAgdmFsdWU6IDEwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblRocmVzaG9sZC5NT0RVTEVfTkFNRSA9IFwiVGhyZXNob2xkXCI7XG5cbmV4cG9ydCBkZWZhdWx0IFRocmVzaG9sZDtcbiIsImltcG9ydCBTaWduYWxNb2R1bGUgZnJvbSAnLi4vU2lnbmFsTW9kdWxlJ1xuXG5jbGFzcyBXaGl0ZU5vaXNlIGV4dGVuZHMgU2lnbmFsTW9kdWxlIHtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZ3VyYXRpb24pe1xuICAgICAgICBzdXBlcigxKTtcbiAgICAgICAgdGhpcy5fb3BlcmF0b3IgPSBjb25maWd1cmF0aW9uLm9wZXJhdG9yLnZhbHVlO1xuICAgIH1cblxuICAgIF9wcm9jZXNzT3V0cHV0KCl7XG4gICAgICAgIHZhciByZXN1bHQgPSAwO1xuICAgICAgICB2YXIgbm9pc2VWYWx1ZSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIGZvcih2YXIgdmFsdWUgb2YgdGhpcy5fYnVmZmVyLml0ZXJhdGUoKSl7XG4gICAgICAgICAgICBzd2l0Y2godGhpcy5fb3BlcmF0b3Ipe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJhZGRpdGlvblwiOiAvLyBzdW1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdmFsdWUgKyBub2lzZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicHJvZHVjdFwiOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB2YWx1ZSAqIG5vaXNlVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldENvbmZpZ3VyYXRpb25TY2hlbWEoKXtcbiAgICAgICAgdmFyIGNvbmYgPSBzdXBlci5nZXRDb25maWd1cmF0aW9uU2NoZW1hKCk7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGNvbmYsIHtcbiAgICAgICAgICAgIHR5cGU6IFdoaXRlTm9pc2UuTU9EVUxFX05BTUUsXG4gICAgICAgICAgICBvcGVyYXRvcjoge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiT3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICBcImFkZGl0aW9uXCI6IFwiYWRkaXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJwcm9kdWN0XCI6IFwicHJvZHVjdFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCJhZGRpdGlvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuV2hpdGVOb2lzZS5NT0RVTEVfTkFNRSA9IFwiV2hpdGVOb2lzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBXaGl0ZU5vaXNlO1xuIl19
