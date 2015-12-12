import LowPass from './LowPass'
import Multiplier from './Multiplier'
import ADSRCurve from './ADSRCurve'
import Offset from './Offset'

class ModulesBag {
    static getModulesMap(){
        return {
                    [LowPass.MODULE_NAME]: LowPass,
                    [Multiplier.MODULE_NAME]: Multiplier,
                    [ADSRCurve.MODULE_NAME]: ADSRCurve,
                    [Offset.MODULE_NAME]: Offset
                }
    }

    static getModule(moduleName){
        return ModulesBag.getModulesMap()[moduleName];
    }
}

export default ModulesBag;