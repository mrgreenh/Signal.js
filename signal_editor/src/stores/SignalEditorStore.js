import { Store, toImmutable } from 'nuclear-js'
import actionTypes from './actionTypes.js'

export default Store({
  getInitialState(){
    return toImmutable({
      configuration: [
          {
              type: "WhiteNoise",
              operator: {
                  display: "Operator",
                  type: "multiselection",
                  options: {
                      "addition": "addition",
                      "product": "product"
                  },
                  value: "addition"
              }
          },
          {
            type: "Multiplier",
            factor: {
              display: "Factor",
              type: "number",
              range: [0,255],
              value: 255
            }
          },
          {
            type: "Threshold",
            threshold: {
              display: "Limit",
              type: "number",
              range: [1,255],
              value: 97
            }
          },
          {
            type: "LowPass",
            bufferSize: {
              display: "Buffer Size",
              type: "number",
              range: [1,20],
              value: 6
            }
          }
      ],
      signalValue:0,
      delayedSignalValue:0
    });
  },

  initialize() {
    this.on(actionTypes.CHANGE_MODULE_VALUE, changeModuleValue);
    this.on(actionTypes.CHANGE_SIGNAL_VALUE, changeSignalValue);
  }
});

function changeModuleValue(state, {newValue, propName, moduleIndex}){
  return state.updateIn(['configuration', moduleIndex],
    (module) => {
      return module.setIn([propName, 'value'], newValue);
    });
}

function changeSignalValue(state, {newValue, newDelayedValue}){
  return state.set("signalValue", newValue).set("delayedSignalValue", newDelayedValue);
}
