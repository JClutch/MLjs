import React, { Component } from 'react';
import Input from './dataInput';
import Chart from './chart.js';
import { Button, Header} from 'semantic-ui-react'
import KKN_Display from './KKN_Display.js'



class App extends Component {
  constructor(props){
    super(props)
    this.state = {data: [null]
    };
    this.updateData = this.updateData.bind(this)
}

  updateData (arr){
    this.setState({data: arr})
  }
  
  render () {
    console.log('sooo are we updating or??', this.state)
      return (
        <div style={{'textAlign':'center'}}>
        <Header as='h1'>K-Nearest Neighbor</Header>
        <img src={require("./ml-logo.png")} id="logo" style={{margin:'auto'}}/>
          <div style={{flexDirection:'column'}}>
            <div id="inputData" style={{justifyContent: 'center', paddingBottom:'10px'}}>
              <Input update={this.updateData} />
            </div>
            <div style={{maxWidth: '100%', margin: 'auto 0'}}>
            <KKN_Display node={this.state.data[this.state.data.length-1]} />
            <Chart data={this.state.data} />
            </div>
          </div>
        </div>
      )
    }
}



export default App;