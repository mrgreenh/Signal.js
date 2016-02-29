import actions from './actions.js'
import Signal from '../../src/signal.js'
import reactor from './reactor.js'
import getters from './getters.js'

class SignalActionEmitter {
  constructor(initialConf, onNewValue){
    this._signalInstance = new Signal(initialConf);
    var delayConf = [
          {
              type: "Delay",
              frames: {
                  display: "Frames",
                  type: "number",
                  range: [0,200],
                  value: 2
              }
          },
        ];
    this._delayedSignalInstance = new Signal(delayConf);
    this._interval = undefined;
    this._onNewValue = onNewValue;
  }

  changeSignalConfiguration(newConfiguration){
    this._signalInstance = new Signal(newConfiguration);
  }

  ignite(){
    function updateSignalValues(){
      var newValue = this._signalInstance.push(0);
      var newDelayedValue = this._delayedSignalInstance.push(newValue);
      this._onNewValue(newValue, newDelayedValue);
      window.requestAnimationFrame(updateSignalValues.bind(this));
    };

    updateSignalValues.bind(this)();
  }

}

export default SignalActionEmitter;
