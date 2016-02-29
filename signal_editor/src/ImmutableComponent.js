import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

class ImmutableComponent extends React.Component{
  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState);
  }
}

export default ImmutableComponent;
