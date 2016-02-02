import React from 'react'
import SignalEditor from './SignalEditor.jsx';
import ReactDOM from 'react-dom';
var configuration = [
    {
        type: "WhiteNoise",
        operator: {
            display: "Operator",
            type: "multiselection",
            options: {
                0: "addition",
                1: "product"
            },
            value: 0
        }
    },
    {
        type: "Multiplier",
        factor: {
            display: "Factor",
            type: "number",
            range: [-1000,10000],
            value: 100
        }
    },
    {
        type: "Threshold",
        threshold: {
            display: "Buffer Size",
            type: "number",
            range: [1,100],
            value: 50
        }
    },
    {
        type: "LowPass",
        bufferSize: {
            display: "Buffer Size",
            type: "number",
            range: [2,100],
            value: 10
        }
    }
];
ReactDOM.render(<SignalEditor configuration={configuration} />, document.getElementById("signal-ui-container"));    
