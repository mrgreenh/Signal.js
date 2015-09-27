# Signal.js
Real-time signal processing library. Really, REALLY at its early stages. But stay tuned for more (I'm develooping this as part of Synesthesia, another project that requires stuff like this), or feel free to fork and add modules (a frequency filter can be around 4 lines of code + sample configuration).

##Usage

```
import Signal from 'path/to/signal'
```
//Get a list of available modules
```
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