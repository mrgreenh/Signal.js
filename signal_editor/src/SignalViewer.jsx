import React from 'react'
import Signal from '../../src/signal.js'
import ImmutableComponent from './ImmutableComponent.js'

class SignalViewer extends ImmutableComponent{
    render(){
      var yellowFactor = parseInt(Math.min(this.props.signalValue, 255) / 6);
      var color = 'rgb('+(parseInt(this.props.signalValue)+yellowFactor)+','+(parseInt(this.props.signalValue)+yellowFactor)+','+parseInt(this.props.signalValue)+')';
      var noisyStyle = {
        color:color,
        textShadow: '0 0 20px rgba(255,255,255,'+Math.min((parseInt(this.props.delayedSignalValue)/255), 1)+')'
      }

      return (<h1 key={color} style={noisyStyle}>Signal <strong>JS</strong></h1>);
    }
}

export default SignalViewer;
