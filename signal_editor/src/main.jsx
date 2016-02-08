import React from 'react'
import SignalEditor from './SignalEditor.jsx'
import ReactDOM from 'react-dom'
import reactor from './reactor.js'
import SignalEditorStore from './stores/SignalEditorStore.js'
import getters from './getters.js'
import {connect} from 'nuclear-js-react-addons'

reactor.registerStores({
  signal: SignalEditorStore
});

function mapStateToProps(){
  return {
    modules: getters.modules
  }
}

var ConnectedSignalEditor = connect(mapStateToProps)(SignalEditor);

ReactDOM.render(<ConnectedSignalEditor reactor={reactor} />, document.getElementById("signal-ui-container"));
