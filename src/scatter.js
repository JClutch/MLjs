import React from 'react'
import c3 from 'c3'

function round(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}


export default class ScatterPlot extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
		this.renderGraph = this.renderGraph.bind(this)
        console.log('what am I getting on these props', this.props)
	}

	componentDidMount(){
	}

    componentWillReceiveProps(nextProps) {
        const data = {}
        data.house = []
        data.flat = []
        data.apartment = []
        nextProps.data.forEach((val) => {
            data[val.type].push([val.sqrft, val.rooms])
        })
        this.setState({
            data: data
        }, this.renderGraph)

    }

	renderGraph(){
		var chart = c3.generate({
			bindto: '#chart',
            data: {
              xs: {
                House: 'House_x',
                Flat: 'Flat_x',
                Apartment: 'Apartment_x',
            },
              columns: [
                ['House_x', ...this.state.data.house.map((val) => {return round(val[0], 2)}) ],
                ['House', ...this.state.data.house.map((val) => {return round(val[1], 2)})],
                ['Flat_x', ...this.state.data.flat.map((val) => {return round(val[0], 2)})],
                ['Flat', ...this.state.data.flat.map((val) => {return round(val[1], 2)})],
                ['Apartment_x', ...this.state.data.apartment.map((val) => {return round(val[0], 2)})],
                ['Apartment', ...this.state.data.apartment.map((val) => {return round(val[1], 2)})],
            ],
            type: 'scatter'
        },
    axis: {
        x: {
            label: 'Square Ft.',
            tick: {
                fit: true
            }
        },
        y: {
            label: 'Rooms'
        }
    },
    tooltip: {
        format: {
            title: function (d) { return 'Sqr Ft: ' + d; },
            value: function (value, ratio, id, index) { 
                return ('Rooms: ' + value) }
    }
  }
});
	}


	render(){
		return <div id='chart'></div>
	}
}