import React from 'react';
import { Header, Table, Rating, Dimmer, Loader, Segment } from 'semantic-ui-react'
/**
 * A counter button: tap the button to increase the count.
 */
class RecordTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: this.props.records || null
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      records: nextProps.records
    })
  }
 
  render() {
    if(this.state.records){
    return (
        <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell singleLine> N </Table.HeaderCell>
        <Table.HeaderCell>Population</Table.HeaderCell>
        <Table.HeaderCell>Rounds</Table.HeaderCell>
        <Table.HeaderCell>Overall Score</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {this.state.records.map((val, key) => {
      return(
        <Table.Row key={key}>
        <Table.Cell>
          <Header as='h2' textAlign='center'>{val.N.N}</Header>
        </Table.Cell>
        <Table.Cell>
        <Header as='h2' textAlign='center'>{val.Population.N}</Header>
        </Table.Cell>
        <Table.Cell>
        <Header as='h2' textAlign='center'>{val.Rounds.N}</Header>
        </Table.Cell>
        <Table.Cell>
        <Header as='h2' textAlign='center'>TO BE DETERMINED</Header>
        </Table.Cell>
        </Table.Row>
        )
    })}
    </Table.Body>
  </Table>
    );
    } else{
      return(
        <Segment>
    <Dimmer active>
      <Loader />
    </Dimmer>
    </Segment>
        )
    }
  }
}
export default RecordTable;