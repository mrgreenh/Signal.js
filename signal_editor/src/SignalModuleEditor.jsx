import React from 'react'
import Signal from '../../src/signal.js'
import Slider from 'material-ui/lib/slider'
import RadioButton from 'material-ui/lib/radio-button'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import MenuItem from 'material-ui/lib/menus/menu-item'
import TextField from 'material-ui/lib/text-field'
import reactor from './reactor.js'
import getters from './getters.js'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator'
import darkTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme.js'

@ThemeDecorator(ThemeManager.getMuiTheme(darkTheme))
class SignalModuleEditor extends React.Component{
    _getSliderRange(currentField){
        var min = currentField.get("range").get(0);
        var max = currentField.get("range").get(1);
        var range = max - min;

        var value = currentField.get("value");
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

        var configurationFields = signalData.map((value, key) => {
            var currentField = signalData.get(key);
            if(key=="type") return;

            var input;
            switch(currentField.get("type")){
                case "number":
                    var range = this._getSliderRange(currentField);
                    input = <Slider description={currentField.display}
                                    value={this._getSliderRange(currentField)}
                                    min={range[0]}
                                    max={range[1]}
                                    onChange={this._getValueFromSlider} />;
                    break;
                case "multiselection":
                    var options = currentField.get("options").map((value, key) => {
                        return <RadioButton key={key} value={key} label={value}/>;
                    }).toList();
                    input = (
                              <RadioButtonGroup description={currentField.get("display")} name="shipSpeed" defaultSelected="not_light">
                                {options}
                              </RadioButtonGroup>
                            )
                    break;
                default: //It's not even an object
                    input = <TextField  defaultValue={currentField.get("value")}
                                        description={currentField.get("display")}
                                        onChange={this._handleChange}/>;
                    break;
            }

            return (
                    <li key={key}>
                        {input}
                    </li>
                );
        }).toList();

        return (
                <div className="module-editor">
                    <strong>{signalData.get("type")}</strong>
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
