import React, { Component } from 'react'
import { Grid, Button, Header, Icon, Segment, Form } from 'semantic-ui-react'
import TeamCollection from './TeamCollection'

export default class TeamContainer extends Component {



  renderTeamCollections = () => {
    let newTeamsArr = [...this.props.teams];
    return newTeamsArr.map(team => {
      return <TeamCollection key={team.id} deletePokemonFromTeam={this.props.deletePokemonFromTeam} deleteTeam={this.props.deleteTeam} capitalizeFirstLetterOfName={this.props.capitalizeFirstLetterOfName} capitalizeFirstLetterOfType={this.props.capitalizeFirstLetterOfType} {...team} />
    })
  }

  renderForm = () => {
    return  <Form success>
      <Form.Input label='Team Name' value={this.props.teamName} onChange={this.props.updateTeamName} placeholder='Enter the name of the team' />
      <div className="submitFormBtn">
        <Button color='teal' onClick={this.props.postTeam}>Add Team</Button>
      </div>
    </Form>
  }

  render() {
    console.log("team container", this.props.teams)
    return (
      /* if user has no teams we display this with ternary */
      <Grid celled="internally">
        {this.props.teams.length > 0 ?
           <Grid.Row>
              <Grid.Column width={13}>
                {this.renderTeamCollections()}
              </Grid.Column>
              <Grid.Column width={3}>
                {this.renderForm()}
              </Grid.Column>
            </Grid.Row> :
          <Grid.Row>
            <Grid.Column width={13}>
              <Segment placeholder>
                <Header icon>
                  <Icon name='search' />
                  You have no teams at the moment.
                  Create one with the form on the right ->
                </Header>
              </Segment>
            </Grid.Column>
            <Grid.Column width={3}>
              {this.renderForm()}
            </Grid.Column>
          </Grid.Row>}
      </Grid>
    )
  }
}
