import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import BoardPiece from './boardPiece.js'

class ChessBoard extends Component {
	constructor(props){
	  super(props)
	  this.state = {
	  	board: this.props.board || null
	  }
	  console.log(this.props)
    }

    componentWillReceiveProps(nextProps){
    	this.setState({
    		board: nextProps.board
    	})
    }

    render(){
    	if(this.state.board){
    	let arr = Object.values(this.state.board)
    	arr = arr.slice(0,this.props.n)
    return(
  <Grid columns={this.props.n} padded style={{'justify-content': 'center'}}>
    {arr.map((row, key) => (
    	(
      	<Grid.Row key={key}>
      	{row.map((val, key) => {
      		return(
      			<BoardPiece val={val} key={key} />
      			)
      	})}
      </Grid.Row>
     )
    ))}

  </Grid>
    )} else {
  	return(<div> Enter some data! </div>)
  }
}

}


export default ChessBoard