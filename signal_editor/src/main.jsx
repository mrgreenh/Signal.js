import React from 'react'
import SignalEditor from './SignalEditor.jsx'
import ReactDOM from 'react-dom'
import reactor from './reactor.js'
import SignalEditorStore from './stores/SignalEditorStore.js'
import getters from './getters.js'
import {connect} from 'nuclear-js-react-addons'
import SignalActionEmitter from './signalActionEmitter'
import actions from './actions.js'

reactor.registerStores({
  signal: SignalEditorStore
});

function mapStateToProps(){
  return {
    modules: getters.modules,
    signalValue: getters.signalValue,
    delayedSignalValue: getters.delayedSignalValue,
  }
}

var ConnectedSignalEditor = connect(mapStateToProps)(SignalEditor);
var connectedSignalEditor = <ConnectedSignalEditor reactor={reactor} />;

ReactDOM.render(connectedSignalEditor, document.getElementById("signal-ui-container"));
var initialConf = reactor.evaluate(getters.modules).toJS();
var signalActionEmitter = new SignalActionEmitter(initialConf, actions.changeSignalValue);

reactor.observe(
  getters.modules,
  function(config) {
    signalActionEmitter.changeSignalConfiguration(config.toJS());
  }
);

signalActionEmitter.ignite();
