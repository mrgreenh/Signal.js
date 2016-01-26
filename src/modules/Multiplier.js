import SignalModule from '../SignalModule'

class Multiplier extends SignalModule {

    constructor(configuration){
        super(1);
        this._factor = configuration.factor.value;
    }

    _processOutput(){
        return this._buffer.getFirstItem()*parseFloat(this._factor);
    }

    static getConfigurationSchema(){
        var conf = super.getConfigurationSchema();
        return Object.assign(conf, {
            type: Multiplier.MODULE_NAME,
            factor: {
                display: "Factor",
                type: "number",
                range: [-1000,10000],
                value: 1
            }
        });
    }
}

Multiplier.MODULE_NAME = "Multiplier";

export default Multiplier;