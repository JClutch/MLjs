import React, { Component } from 'react';


class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: this.props.board, 
      n: this.props.n
    };
}

  componentWillReceiveProps(nextProps){
    this.setState({data: nextProps.board, n: nextProps.n})
  }

  componentDidMount (){
    // console.log('johny', this.props)
  }

  render () {
  if(this.state.data){
  let arr = Object.values(this.state.data)
  arr = arr.slice(0,this.state.n)
    return(
  arr.map((val) =>{
    return (<div> {val.join('  ')} </div>)
  })
  )
} else{
  return(<div>Waiting</div>)
}    
  }
}



export default Board;