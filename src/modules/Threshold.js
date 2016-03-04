import SignalModule from '../SignalModule'

class Threshold extends SignalModule {

    constructor(configuration){
        super(1);
        this._threshold = configuration.threshold.value;
        //Nothing else to add for now but other modules might have more to say
    }

    _processOutput(){
        var result = 0;
        for(var value of this._buffer.iterate()){
            if(value >= this._threshold) result = value;
            else result = 0;
        }
        return result;
    }

    static getConfigurationSchema(){
        var conf = super.getConfigurationSchema();
        return Object.assign(conf, {
            type: Threshold.MODULE_NAME,
            threshold: {
                display: "Buffer Size",
                type: "number",
                range: [1,100],
                value: 100
            }
        });
    }
}

Threshold.MODULE_NAME = "Threshold";

export default Threshold;
