import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import Queen from './styles/queen.png'

const BoardPiece = (props) => {
	console.log(props)

	if(props.val === 1){
	  return(
		<Grid.Column key={props.key} color={'olive'} style={styles.square}>
      	  <img src={Queen} />
      	</Grid.Column>)
	} else {
	  return(
		<Grid.Column key={props.key} color={'grey'} style={styles.square}>
      	</Grid.Column>
		)
    }
}

const styles = {
	'square': {height:'100', width:'100', border: 'solid white 1px'}
}

export default BoardPiece