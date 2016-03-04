Signal.js is a little javascript utility meant to make it easy and fun to process streams of numbers with something similar to an effects rack. It really is just a 'thing' that takes numbers in one side and spits other numbers out from the other side. And I understand that might sound very generic, in fact it is. The reason why this came into being is another project I am working on, where I need to turn MIDI notes into some kind of a visual representation.

Now this is what a MIDI note looks like:
![alt text](/Signal.js/squarewave.png "Square wave")
Now imagine applying that to, say, the size of a circle on screen. The circle would just blink in and out of the page. Boring, right?
So you make it go through a low-pass filter and you get something less flashy and more natural, like:
![alt text](/Signal.js/lowpass.png "Square wave after lowpass")
But then say your musical note needs to represent a wobbly noisy sound. Then you might want to blend in some white noise, maybe offset this stream of numbers and amplify it a bit. And then say you want to add a delay... The list goes on. What I needed was some library that quickly lets me define filters and effects similar to the ones I would find in a sound effects rack. And that in the same way lets me pipe them one after the other. So that's what Signal.js is.

Turns out you can use this for javascript animations in a broader sense, for anything related to user interactions that produce streams of numbers, for example scrolling or accelerometer data. But I might write an article with some better examples of that sort later. Maybe one of those Medium posts because it's so "in" now to write Medium posts =)

## Writing a new module
This is an example on how you define a module, and this one is literally the most complicated there is at the time of writing:
```
import SignalModule from '../SignalModule'

class LowPass extends SignalModule {

    constructor(configuration){
        super(configuration.bufferSize.value);
        //Nothing else to add for now but other modules might have more to say
    }

    _processOutput(){
        //One new value was just pushed into the buffer. The output on the other side is...
        var sum = 0;
        for(let value of this._buffer.iterate()){
            sum += value;
        }
        return sum ? sum/this._buffer.length : 0;
    }

    static getConfigurationSchema(){
        /*Useful when you want to build a little editor with sliders
        that lets you modify your effects rack.
        You would use this metadata to build the UI.*/
        var conf = super.getConfigurationSchema();
        return Object.assign(conf, {
            type: LowPass.MODULE_NAME,
            bufferSize: {
                display: "Buffer Size",
                type: "number",
                range: [2,100],
                value: 100
            }
        });
    }
}

LowPass.MODULE_NAME = "LowPass";

export default LowPass;
```

## Usage

```
import Signal from 'path/to/signal'
//Get a list of available modules
var modulesNamesList = Signal.getModulesList();
```

Get the configuration schema for some module. This will contain some default values that you can use as configuration for a module instance. It will also contain extra information that can turn out useful if you want to build some visual configuration tool.

```
var newModuleConfiguration = Signal.getConfigurationSchemaForModule(modulesNamesList[0]);
```

Now you can do one of two things:
- Create a configuration object, which is basically an array of configurations objects, and pass that to Signal, which will build the pipeline for you
- Manually import and initialize modules, and .chain() them.

```
var processingPipeline = new Signal([
                                        newModuleConfiguration,
                                        otherNewModuleConfiguration
                                    ]);

//OR

var LowPass = Signal.getModule(moduleNamesList[0]);
var WhiteNoise = Signal.getModule("WhiteNoise");
var whiteNoiseConfig = Signal.gerConfigurationSchemaForModule("WhiteNoise");
var processingPipeline = new LowPass(newModuleConfiguration)
                                    .chain(new WhiteNoise(whiteNoiseConfig));
```

Finally, start using your pipeline by pushing value. Each .push(newValue) will return the result of such value going through all filters in your pipeline.


```
var outputSignal = [];
var inputSignal = [];

for(let val of inputSignal){ //Don't try this at home
    outputSignal.push(processingPipeline.push(val));
}
```