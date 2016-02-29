const modules = [
  ["signal", "configuration"],
  (modules) => {
    return modules;
  }
]

const signalValue = ["signal", "signalValue"];
const delayedSignalValue = ["signal", "delayedSignalValue"];

export default { modules, signalValue, delayedSignalValue };
