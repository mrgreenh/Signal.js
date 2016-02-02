import React from 'react';
import Signal from '../../src/signal.js'
import SignalModuleEditor from './SignalModuleEditor.jsx'

class SignalEditor extends React.Component{
    render(){
        var modules = this.props.configuration.map((conf, index) => {
            return <li key={index}><SignalModuleEditor configuration={conf}/></li>;
        });

        return (
                <div className="signal-editor">
                    <ul>
                        {modules}
                    </ul>
                </div>
            );
    }
}

export default SignalEditor;
