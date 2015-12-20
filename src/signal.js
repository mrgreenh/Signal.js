import ModulesBag from './modules/ModulesBag'

class Signal {
    constructor(configuration){ //Configuration is an array
        this._processingChain = this._parseConfiguration(configuration); //This should accept the single signal configuration
    }

    _parseConfiguration(configuration, prevModule){
        //TODO fix bug that wipes out configuration
        if(!configuration || !configuration.length) return;
        var newModuleConfiguration = configuration.shift();
        var newModuleClass = ModulesBag.getModulesMap()[newModuleConfiguration.type]
        var newModule = new newModuleClass(newModuleConfiguration);
        if(prevModule) prevModule.chain(newModule);
        this._parseConfiguration(configuration, newModule);

        return newModule;
    }

    push(value){
        if(this._processingChain)
            return this._processingChain.queueSample(value);
        else return undefined;
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

    static getModule(moduleName){
        return ModulesBag.getModule(moduleName);
    }
}

export default Signal;