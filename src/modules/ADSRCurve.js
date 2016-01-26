import SignalModule from '../SignalModule'

class ADSRCurve extends SignalModule {

    constructor(configuration){
        super(2);

        this._state = ADSRCurve.STATES.WAITING;
        this._previousReturnValue = 0;

        var attackValue = configuration.attack.value;
        this.attackStep = attackValue ? 1/attackValue : 1;
        var decayValue = configuration.decay.value;
        this.decayStep = decayValue ? 1/decayValue : 1;
        var releaseValue = configuration.release.value;
        this.releaseStep = releaseValue ? 1/releaseValue : 1;
        this.sustain = configuration.sustain.value ? configuration.sustain.value/100 : 0;
    }

    _processOutput(){
        //Only looks at current value and precedent value
        // 0 -> 1 triggers attack logic
        // 1 -> 0 triggers release logic
        // 1 -> 1 keeps the sustain/decay sequence going
        var values = [];
        var result = this._previousReturnValue;
        for(var value of this._buffer.iterate()){
            values.push(value) //Should get 2 values in total
        }
        if(values.length!=2) return 0;


        //Transition state based on input velocity
        switch(values.join("")){
            case "01":
                this._state = ADSRCurve.STATES.ATTACKING;
                break;
            case "10":
                this._state = ADSRCurve.STATES.RELEASING;
                break;
        }


        //Execute state logic and transition based on result
        switch(this._state){
            case ADSRCurve.STATES.WAITING:
                break;
            case ADSRCurve.STATES.ATTACKING:
                if(this._previousReturnValue<1){
                    result = Math.min(this._previousReturnValue + this.attackStep, 1);
                }
                else{
                    result = this._previousReturnValue;
                    this._state = ADSRCurve.STATES.DECAYING;
                }
                break;
            case ADSRCurve.STATES.DECAYING:
                if(this._previousReturnValue > this.sustain){
                    result = Math.max(this._previousReturnValue - this.decayStep, this.sustain);
                }else{
                    result = this._previousReturnValue;
                    this._state = ADSRCurve.STATES.SUSTAINING;
                }
                break;
            case ADSRCurve.STATES.RELEASING:
                if(this._previousReturnValue > 0){
                    result = Math.max(this._previousReturnValue - this.releaseStep, 0);
                }else{
                    result = 0;
                    this._state = ADSRCurve.STATES.WAITING;
                }
                break;
            case ADSRCurve.STATES.SUSTAINING:
                result = this._previousReturnValue;
                break;
        }

        this._previousReturnValue = result;
        return result;
    }

    static getConfigurationSchema(){
        var conf = super.getConfigurationSchema();
        return Object.assign(conf, {
            type: ADSRCurve.MODULE_NAME,
            attack: {
                display: "Attack frames count",
                type: "number",
                range: [0,10000],
                value: 0
            },
            sustain: {
                display: "Sustain percentage",
                type: "number",
                range: [0,100],
                value: 100
            },
            decay: {
                display: "Decay frames count",
                type: "number",
                range: [0,10000],
                value: 20
            },
            release: {
                display: "Release frames count",
                type: "number",
                range: [0,10000],
                value: 50
            }
        });
    }
}

ADSRCurve.MODULE_NAME = "ADSRCurve";
ADSRCurve.STATES = {
    WAITING: "waiting",
    ATTACKING: "attacking",
    DECAYING: "decaying",
    SUSTAINING: "sustaining",
    RELEASING: "releasing"
};

export default ADSRCurve;