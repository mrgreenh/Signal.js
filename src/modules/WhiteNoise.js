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
                case "addition": // sum
                    result = value + noiseValue;
                    break;
                case "product":
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
                type: "description",
                options: {
                    "addition": "addition",
                    "product": "product"
                },
                value: "addition"
            }
        });
    }
}

WhiteNoise.MODULE_NAME = "WhiteNoise";

export default WhiteNoise;
