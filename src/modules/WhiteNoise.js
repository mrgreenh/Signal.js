import SignalModule from '../SignalModule'

class WhiteNoise extends SignalModule {

    constructor(configuration){
        super(1);
        this._operator = configuration.operator.value;
    }

    _processOutput(){
        var result = 0;
        var noiseValue = Math.random();
        for(var value of this._buffer.iterate()){
            switch(this._operator){
                case 0: // sum
                    result = value + noiseValue;
                    break;
                case 1:
                    result = value * noiseValue;
                    break;
            }
        }
        return result;
    }

    static getConfigurationSchema(){
        var conf = super.getConfigurationSchema();
        return Object.assign(conf, {
            type: WhiteNoise.MODULE_NAME,
            operator: {
                display: "Operator",
                type: "multiselection",
                options: {
                    0: "addition",
                    1: "product"
                },
                value: 0
            }
        });
    }
}

WhiteNoise.MODULE_NAME = "WhiteNoise";

export default WhiteNoise;