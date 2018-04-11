import React, { Component } from 'react';
// import Input from './dataInput';
import NQueen from './NQueens.js';
// import Board from './finBoard.js';
import RecordTable from './RecordTable'
import axios from 'axios';
import { Button, Input , Header} from 'semantic-ui-react'
import Board from './chessBoard.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      pop : null,
      n : null,
      dimensions: null,
      rounds : null,
      board : null
    };
    this.handleChangePop = this.handleChangePop.bind(this);
    this.handleChangeN = this.handleChangeN.bind(this);
    this.handleChangeRounds = this.handleChangeRounds.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.highscoreCheck = this.highscoreCheck.bind(this);
  }

  componentDidMount(){
    axios.get('/api/getRecords').then((data) =>{
       var payload = {}
       data.data.forEach((val) => {
        payload[val.N.N] = val

       })
      this.setState({
        records: payload,
        _passAlong: data.data
      })
    })
  }
  
  handleChangeN(e) {
    /*this.setState is asynchronous*/
    this.setState({ n: e.target.value })
  }

  handleChangePop(e) {
    /*this.setState is asynchronous*/
    this.setState({ pop: e.target.value })
  }

  handleChangeRounds(e) {
    /*this.setState is asynchronous*/
    this.setState({ rounds: e.target.value })
  }

  highscoreCheck(){
    //calculate overall score....
    //check the N against the current record overall score
  }

  handleClick(e) {
    console.log("sqrft: ", this.state.pop)
    console.log("rooms: ", this.state.n)
    var foo = new NQueen(this.state.n, this.state.pop, this.state.rounds)
    console.log("foo", foo.n, foo.pop, foo.rounds)
    var fin = foo.run()
    console.log('fin', fin)
    this.setState({board: fin.board, dimensions: this.state.n}, () => {
      let payload = {
        rounds : fin.rounds.toString(),
        population: this.state.pop,
        N : this.state.n
      }
      // axios.post('/api/UpdateRecord', payload).then((data) =>{
      //   console.log('finished sending to server', data)
      // })
      })
  }

  render () {
      return (

        <div style={{'textAlign':'center'}}>
         <Header as='h1'>Genetic Algorithm</Header>
        <img src={require("./ml-logo.png")} id="logo" style={{margin:'auto'}}/>
          <div className="row" style={{justifyContent:'center'}}>
            <div className="stuff" style={{justifyContent:'center'}}>
              <div style={{paddingBottom: '10px'}}>
                <Input id="N" className="form-control" placeholder="N" type="text" value={this.state.n} onChange={this.handleChangeN}/>
                <Input id="pop" className="form-control" placeholder="Population" type="text" value={this.state.pop} onChange={this.handleChangePop}/>
                <Input id="rounds" className="form-control" placeholder="Max Generations" type="text" value={this.state.rounds} onChange={this.handleChangeRounds}/>
                <Button onClick={this.handleClick} style={{marginTop: '10px'}}>
                Click Here
                </Button>
              </div>
              <Board n={this.state.dimensions} board={this.state.board} />
            </div>
          </div>
          <RecordTable records={this.state._passAlong}/>
        </div>
      )
    }
}



export default App;