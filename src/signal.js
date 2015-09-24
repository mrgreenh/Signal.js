import ModulesBag from './modules/ModulesBag'

class Signal {
    constructor(configuration){
        //TODO implement configuration parsing
        this._processingChain = new LowPass(10); //This should accept the single signal configuration
    }

    push(value){
        return this._processingChain.queueSample(value);
    }

    output(){
        return this._processingChain.output();
    }

    //TODO move inside modules bag
    static getModulesList(){
        var modulesList = [];
        for(var i in ModulesBag.getModulesMap()){
            modulesList.push(i)
        }
        return modulesList;
    }

    static getConfigurationSchemaForModule(moduleName){
        return ModulesBag.getModule(moduleName).getConfigurationSchema();
    }
}

export default Signal;