import React from 'react';

const renderCircles = (props) => {
	// console.log('render circles', props)
  return (coords, index) => {
    if (coords.type === "house"){
      var color = "orange"
    } else if(coords.type === "flat"){
      var color = "green"
    } else if(coords.type === "apartment"){
      var color = "blue"
    }
  	// console.log('cooorrrrddsss', coords)
    const circleProps = {
      cx: props.xScale(coords.sqrft),
      cy: props.yScale(coords.rooms),
      r: 5,
      key: index,
      fill: color
    };
    return <circle {...circleProps} />;
  };
};

export default (props) => {
	// console.log(props, 'tootie')
  return <g>{ props.data.map(renderCircles(props)) }</g>
}