import SignalBuffer from './SignalBuffer'

class SignalModule {
    constructor(bufferSize){
        this._buffer = new SignalBuffer(bufferSize);
    }

    queueSample(value){
        if(isNaN(value)) throw "Signals only accept numbers";
        if(this.hasOwnProperty("chainedModule")){
            let backPropagatedValue = this._chainedModule.queueSample(value);
            this._buffer.push(backPropagatedValue);
        }else{
            this._buffer.push(value);
        }

        return this.output();
    }

    output(){
        return this._processOutput();
    }

    _processOutput(){
        return this._buffer.getFirstItem() || 0;
    }

    chain(module){
        this._chainedModule = module;
        module.addChainPredecessor(this);
        return module;
    }

    addChainPredecessor(module){
        this._chainPredecessor = module;
    }

    getConfigurationSchema(){
        return {};
    }

    static getConfigurationSchema(){
        return {};
    }
}

export default SignalModule;