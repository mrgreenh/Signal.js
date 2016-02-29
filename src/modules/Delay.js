import SignalModule from '../SignalModule'

class Delay extends SignalModule {

    constructor(configuration){
        super(configuration.frames.value);
        for(var i=0; i<configuration.frames.value; i++){
          this._buffer.push(0);
        }
    }

    static getConfigurationSchema(){
        var conf = super.getConfigurationSchema();
        return Object.assign(conf, {
            type: Delay.MODULE_NAME,
            frames: {
                display: "Frames",
                type: "number",
                range: [1,200],
                value: 100
            }
        });
    }
}

Delay.MODULE_NAME = "Delay";

export default Delay;
