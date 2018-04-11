import React from 'react'
import { Card } from 'semantic-ui-react'

function round(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

const Display = (props) => {
	console.log('props in display', props)
	if(props.node){
    return (
      <Card 
      centered={true}
      header={props.node.type}
      meta='Normalized Data'
      description={'Square Feet: ' + round(props.node.sqrft, 2) + ' , Rooms: ' + round(props.node.rooms, 2)}
    />
    )}
    else{
    	return <div> </div>
    }
  }

export default Display