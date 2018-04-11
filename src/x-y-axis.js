import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
      const node = this.node
      const dataMax = max(this.props.data)
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]])
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')
   
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()
   
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * 25)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 25)
   }
render() {
      return <svg ref={node => this.node = node}
      width={500} height={500}>
      </svg>
   }
}
export default BarChart

// import React  from 'react';
// import Axis   from './axis';

// export default (props) => {
//   const xSettings = {
//     translate: 'translate(0,' + (props.height - props.padding) + ')',
//     scale: props.xScale,
//     orient: 'bottom'
//   };
//   const ySettings = {
//     translate: 'translate(' + props.padding + ', 0)',
//     scale: props.yScale,
//     orient: 'left'
//   };
//   return <g className="xy-axis">
//     <Axis {...xSettings}/>
//     <Axis {...ySettings}/>
//   </g>
// }

//   svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));