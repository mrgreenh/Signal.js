import React from 'react';
import Signal from '../../src/signal.js'
import Slider from 'material-ui/lib/slider';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';

class SignalModuleEditor extends React.Component{
    _getSliderRange(currentField){
        var min = currentField.range[0];
        var max = currentField.range[1];
        var range = max - min;

        var value = currentField.value;
        var offsettedValue = value - min;
        var normalizedValue = offsettedValue/range;

        return normalizedValue;
    }

    _getValueFromSlider(value, name){
        console.log(value)
        console.log(name)
    }

    _handleChange(){
        console.log("Changing")
    }

    render(){
        var signalData = this.props.configuration;

        var configurationFields = Object.keys(signalData).map((key, index) => {
            var currentField = signalData[key];
            if(key=="type") return;

            var input;
            switch(currentField.type){
                case "number":
                    var range = this._getSliderRange(currentField);
                    input = <Slider description={currentField.display}
                                    value={this._getSliderRange(currentField)}
                                    min={range[0]}
                                    max={range[1]}
                                    onChange={this._getValueFromSlider} />;
                    break;
                case "multiselection":
                    var options = Object.keys(currentField.options).map((key) => {
                        return <RadioButton key={key} value={key} label={currentField.options[key]}/>;
                    });
                    input = (
                              <RadioButtonGroup description={currentField.display} name="shipSpeed" defaultSelected="not_light">
                                {options}
                              </RadioButtonGroup>
                            )
                    break;
                default: //It's not even an object
                    input = <TextField  defaultValue={currentField.value}
                                        description={currentField.display}
                                        onChange={this._handleChange}/>;
                    break;
            }

            return (
                    <li key={index}>
                        {input}
                    </li>
                );
        });

        return (
                <div className="module-editor">
                    <strong>{signalData.type}</strong>
                    <div>
                        <ul>
                            {configurationFields}
                        </ul>
                    </div>
                </div>
            );
    }

}

export default SignalModuleEditor;
