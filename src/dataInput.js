import React, { Component } from 'react';
import KKN from './ml-nearest-k'
import { Button, Container, Input} from 'semantic-ui-react'

export default class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: '',
      sqrft: ''
    };
    this.handleChangeRooms = this.handleChangeRooms.bind(this);
    this.handleChangeSqrft = this.handleChangeSqrft.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleChangeRooms(e) {
  	/*this.setState is asynchronous*/
    this.setState({ rooms: e.target.value })
  }

  handleChangeSqrft(e) {
    /*this.setState is asynchronous*/
    this.setState({ sqrft: e.target.value })
  }

  handleClick(e) {
    console.log("sqrft: ", this.state.sqrft)
    console.log("rooms: ", this.state.rooms)
    KKN.addNode({"sqrft": this.state.sqrft, "rooms": this.state.rooms})
    this.props.update(KKN.allNodes)

  }

  componentWillMount() {
    KKN.normalize(KKN.trainingData)
  }

  render() {

    return (
    <div style={{justifyContent: 'center'}}>
        <Input id="rooms" className="form-control" placeholder="# of Rooms" type="text" value={this.state.rooms} onChange={this.handleChangeRooms}/>
        <Input id="sqrft" className="form-control" placeholder="Square Footage" type="text" value={this.state.sqrft} onChange={this.handleChangeSqrft}/>
        <Button onClick={this.handleClick}>Add data!</Button>
    </div>
    );
  }
}


