import LowPass from './LowPass'
import Multiplier from './Multiplier'
import ADSRCurve from './ADSRCurve'
import Offset from './Offset'
import WhiteNoise from './WhiteNoise'
import Threshold from './Threshold'
import Delay from './Delay'

class ModulesBag {
    static getModulesMap(){
        return {
                    [LowPass.MODULE_NAME]: LowPass,
                    [Multiplier.MODULE_NAME]: Multiplier,
                    [ADSRCurve.MODULE_NAME]: ADSRCurve,
                    [Offset.MODULE_NAME]: Offset,
                    [WhiteNoise.MODULE_NAME]: WhiteNoise,
                    [Threshold.MODULE_NAME]: Threshold,
                    [Delay.MODULE_NAME]: Delay
                }
    }

    static getModule(moduleName){
        return ModulesBag.getModulesMap()[moduleName];
    }
}

export default ModulesBag;
