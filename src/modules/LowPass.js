import SignalModule from '../SignalModule'

class LowPass extends SignalModule {
    _processOutput(){
        var sum = 0;
        for(var value of this._buffer.iterate()){
            sum += value;
        }
        return sum ? sum/this._buffer.length : 0;
    }

    static getConfigurationSchema(){
        var conf = super.getConfigurationSchema();
        return Object.assign(conf, {
            bufferSize: {
                display: "Buffer Size",
                type: "number",
                range: [2,100],
                value: 100
            }
        });
    }
}

export default LowPass;