import SignalModule from '../SignalModule'

class LowPass extends SignalModule {

    constructor(configuration){
        super(configuration.bufferSize.value);
        //Nothing else to add for now but other modules might have more to say
    }

    _processOutput(){
        //One new value was just pushed into the buffer. The output on the other side is...
        var sum = 0;
        for(var value of this._buffer.iterate()){
            sum += value;
        }
        return sum ? sum/this._buffer.length : 0;
    }

    static getConfigurationSchema(){
        /*Useful when you want to build a little editor with sliders
        that lets you modify your effects rack.
        You would use this metadata to build the UI.*/
        var conf = super.getConfigurationSchema();
        return Object.assign(conf, {
            type: LowPass.MODULE_NAME,
            bufferSize: {
                display: "Buffer Size",
                type: "number",
                range: [2,100],
                value: 100
            }
        });
    }
}

LowPass.MODULE_NAME = "LowPass";

export default LowPass;
