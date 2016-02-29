import React from 'react'
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
import actions from './actions.js'
import ImmutableComponent from './ImmutableComponent.js'

class SignalModuleEditor extends ImmutableComponent{
    getChildContext() {
      return {
        muiTheme: ThemeManager.getMuiTheme(darkTheme),
      };
    }

    _getSliderRange(currentField){
        var min = currentField.get("range").get(0);
        var max = currentField.get("range").get(1);
        var range = max - min;

        var value = currentField.get("value");
        var offsettedValue = value - min;
        var normalizedValue = offsettedValue/range;

        return normalizedValue;
    }

    _getValueFromSlider(event, value, currentField){
        var fieldConfig = this.props.configuration.get(currentField);
        var min = fieldConfig.get("range").get(0);
        var max = fieldConfig.get("range").get(1);
        var range = max - min;
        var deNormalizedValue = value*range;
        var offsettedValue = deNormalizedValue + min;

        this._handleChange(offsettedValue, currentField);
    }

    _handleChange(value, currentField){
        var currentModuleIndex = this.props.moduleIndex;
        actions.changeModuleValue(value, currentField, currentModuleIndex);
    }

    render(){
        var signalData = this.props.configuration;

        var configurationFields = signalData.map((value, key) => {
            var currentField = signalData.get(key);
            if(key=="type") return;

            var input;
            var label = currentField.get("display");

            var that=this;
            function sliderChangeHandler(event, value){
              that._getValueFromSlider(event, value, key);
            }
            function radioChangeHandler(event, value){
              that._handleChange(value, key);
            }

            var finalValue = currentField.get("value");
            switch(currentField.get("type")){
                case "number":
                    var range = currentField.get("range");
                    input = <Slider
                                    style={{marginBottom: 10}}
                                    value={this._getSliderRange(currentField)}
                                    min={range[0]}
                                    max={range[1]}
                                    onChange={sliderChangeHandler} />;
                    break;
                case "multiselection":
                    var options = currentField.get("options").map((value, key) => {
                        return <RadioButton key={key} value={key} label={value}/>;
                    }).toList();
                    input = (
                              <RadioButtonGroup
                                name="shipSpeed"
                                defaultSelected={finalValue}
                                onChange={radioChangeHandler}>
                                {options}
                              </RadioButtonGroup>
                            )
                    break;
                default: //It's not even an object
                    input = <TextField  defaultValue={finalValue}
                                        onChange={this._handleChange}/>;
                    break;
            }

            var displayedValue = isNaN(finalValue) ? finalValue : parseInt(finalValue);
            return (
                    <li key={key}>
                        <p className="control-label">{label} <small>[{displayedValue}]</small></p>
                        {input}
                    </li>
                );
        }).toList();

        return (
                <div className="module-editor">
                    <p className="module-name">{signalData.get("type")}</p>
                    <div className="module-name-background"></div>
                    <div className="module-controls-container">
                        <ul>
                            {configurationFields}
                        </ul>
                    </div>
                </div>
            );
    }

}
SignalModuleEditor.childContextTypes = {
  muiTheme: React.PropTypes.object,
};


export default SignalModuleEditor;
