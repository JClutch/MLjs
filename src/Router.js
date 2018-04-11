import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Button, Container} from 'semantic-ui-react'
import knn from './app.js'
import ga from './geneticAlgorithm.js'
import CNN from './CNN.js'

const MyRoute = () => (
  <Router>
    <Container>

        <Link to="/"><Button>K-Nearest-Neighbor</Button></Link>
        <Link to="/ga"><Button>Genetic Algorithm</Button></Link>
        <Link to="/CNN"><Button>Neural Network</Button></Link>





      <hr/>

      <Route exact path="/" component={knn}/>
      <Route exact path="/ga" component={ga}/>
      <Route exact path="/CNN" component={CNN}/>

    </Container>
  </Router>
)

export default MyRoute