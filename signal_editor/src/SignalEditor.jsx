import React from 'react';
import SignalModuleEditor from './SignalModuleEditor.jsx'
import SignalViewer from './SignalViewer.jsx'
import ImmutableComponent from './ImmutableComponent.js'

class SignalEditor extends ImmutableComponent{
    render(){
        var modules = this.props.modules.map((conf, index) => {
            return (
                    <li key={index}>
                      <SignalModuleEditor configuration={conf} moduleIndex={index}/>
                      <div className="module-arrow">&#x2193;</div>
                    </li>)
                    ;
        });

        return (
                <div className="signal-editor">
                    <ul>
                        {modules}
                    </ul>
                    <SignalViewer delayedSignalValue={this.props.delayedSignalValue} signalValue={this.props.signalValue} />
                </div>
            );
    }
}

export default SignalEditor;
