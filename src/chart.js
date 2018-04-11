import React       from 'react';
import ScatterPlot from './scatter';

const styles = {
  width   : 500,
  height  : 300,
  padding : 30,
};

export default class Chart extends React.Component{
  constructor(props) {
    super(props);
    this.state = { data: this.props.data };
  }

  render() {
    // console.log('test', this.state.data, this.props.data)
    return <div>
      <h1>Scatter-Plot</h1>
      <ScatterPlot data={this.props.data} {...styles} />
    </div>
  }
}