import SignalBuffer from './SignalBuffer'

class SignalModule {
    constructor(bufferSize){ //Update to accept a configuration object
        this._buffer = new SignalBuffer(bufferSize);
    }

    queueSample(value){
        var result;
        if(isNaN(value)) throw "Signals only accept numbers";
        if(this.hasOwnProperty("_chainedModule")){
            this._buffer.push(value);
            result = this._chainedModule.queueSample(this.output());
        }else{
            this._buffer.push(value);
            result = this.output();
        }
        return result;
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