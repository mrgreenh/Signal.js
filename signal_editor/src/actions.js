import reactor from './reactor.js'
import actionTypes from './stores/actionTypes.js'

export default {
  changeModuleValue(newValue, propName, moduleIndex){
    reactor.dispatch(actionTypes.CHANGE_MODULE_VALUE, {newValue, propName, moduleIndex});
  },
  changeSignalValue(newValue, newDelayedValue){
    reactor.dispatch(actionTypes.CHANGE_SIGNAL_VALUE, {newValue, newDelayedValue})
  }
};
