import LowPass from './LowPass'
import Multiplier from './Multiplier'

class ModulesBag {
    static getModulesMap(){
        return {
                    [LowPass.MODULE_NAME]: LowPass,
                    [Multiplier.MODULE_NAME]: Multiplier
                }
    }

    static getModule(moduleName){
        return ModulesBag.getModulesMap()[moduleName];
    }
}

export default ModulesBag;