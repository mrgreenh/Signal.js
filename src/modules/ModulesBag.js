import LowPass from './LowPass'

class ModulesBag {
    static getModulesMap(){
        return {
                    [LowPass.MODULE_NAME]: LowPass
                }
    }

    static getModule(moduleName){
        return ModulesBag.getModulesMap()[moduleName];
    }
}

export default ModulesBag;