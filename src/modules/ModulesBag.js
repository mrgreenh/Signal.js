import LowPass from './LowPass'
import Multiplier from './Multiplier'
import ADSRCurve from './ADSRCurve'

class ModulesBag {
    static getModulesMap(){
        return {
                    [LowPass.MODULE_NAME]: LowPass,
                    [Multiplier.MODULE_NAME]: Multiplier,
                    [ADSRCurve.MODULE_NAME]: ADSRCurve
                }
    }

    static getModule(moduleName){
        return ModulesBag.getModulesMap()[moduleName];
    }
}

export default ModulesBag;