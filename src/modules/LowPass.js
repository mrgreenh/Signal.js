import SignalModule from '../SignalModule'

class LowPass extends SignalModule {
    _processOutput(){
        var sum = 0;
        for(var value of this._buffer.iterate()){
            sum += value;
        }
        return sum ? sum/this._buffer.length : 0;
    }
}

export default LowPass;