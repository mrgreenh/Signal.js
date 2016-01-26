import SignalModule from '../SignalModule'

class Offset extends SignalModule {

    constructor(configuration){
        super(1);
        this._offset = configuration.offset.value;
    }

    _processOutput(){
        return this._buffer.getFirstItem()+parseFloat(this._offset);
    }

    static getConfigurationSchema(){
        var conf = super.getConfigurationSchema();
        return Object.assign(conf, {
            type: Offset.MODULE_NAME,
            offset: {
                display: "Offset",
                type: "number",
                range: [-1000,10000],
                value: 1
            }
        });
    }
}

Offset.MODULE_NAME = "Offset";

export default Offset;