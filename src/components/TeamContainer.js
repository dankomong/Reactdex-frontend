import React, { Component } from 'react'
import { Grid, Button, Header, Icon, Segment, Form } from 'semantic-ui-react'
import TeamCollection from './TeamCollection'

export default class TeamContainer extends Component {

  state = {
    teams: [],
    searchTerm: ""
  }

  updateSearchTerm = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  deleteTeam = (id) => {
    fetch('http://localhost:3001/delete_team', {
      method: 'DELETE',
      headers: {
        "TeamID": id
      }
    }).then(res => res.json()).then(parsedRes => {
      this.setState({
        teams: parsedRes
      })
    })
  }

  postTeam = () => {
    // fetch request here to post user-teams
    // and then in the response of the fetch we'll use the response to
    // set the state
    let token = localStorage.getItem('token');
    fetch('http://localhost:3001/create_team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        user: token,
        searchTerm: this.state.searchTerm,
        teams: this.state.teams
      })
    }).then(res => res.json()).then(parsedRes => {
      this.setState({
        teams: [...this.state.teams, parsedRes]
      })
    })
  }

  renderTeamCollections = () => {
    let newTeamsArr = [...this.state.teams];
    return newTeamsArr.map(team => {
      return <TeamCollection key={team.id} deleteTeam={this.deleteTeam} capitalizeFirstLetterOfName={this.props.capitalizeFirstLetterOfName} capitalizeFirstLetterOfType={this.props.capitalizeFirstLetterOfType} {...team} />
    })
  }

  renderForm = () => {
    return  <Form success>
      <Form.Input label='Team Name' value={this.state.searchTerm} onChange={this.updateSearchTerm} placeholder='Enter the name of the team' />
      <div className="submitFormBtn">
        <Button color='teal' onClick={this.postTeam}>Add Team</Button>
      </div>
    </Form>
  }

  // prob going to have to make a fetch here to get the user's current teams
  componentDidMount() {
    fetch('http://localhost:3001/teams/index').then(res => res.json())
      .then(parsedRes => {
        this.setState({
          teams: parsedRes
        })
      })
  }

  render() {
    console.log("team container", this.state.teams)
    return (
      /* if user has no teams we display this with ternary */
      <Grid celled="internally">
        {this.state.teams.length > 0 ?
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
                  Want to create one?
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
