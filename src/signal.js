import LowPass from './modules/LowPass'

class Signal {
    constructor(configuration){
        //TODO implement configuration parsing
        this._processingChain = new LowPass(10);
    }

    push(value){
        return this._processingChain.queueSample(value);
    }

    output(){
        return this._processingChain.output();
    }

}

export default Signal;