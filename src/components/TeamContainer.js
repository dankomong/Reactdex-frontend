import React, { Component } from 'react'
import { Container, Button, Header, Icon, Segment, Form } from 'semantic-ui-react'
import TeamCard from './TeamCard'

export default class TeamContainer extends Component {

  state = {
    formClicked: false,
    teams: [],
    searchTerm: ""
  }

  updateSearchTerm = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  addTeamForm = () => {
    this.setState({
      formClicked: true
    })
  }

  postTeam = () => {
    // fetch request here to post user-teams
    // and then in the response of the fetch we'll use the response to
    // set the state
    fetch('http://localhost:3001/create_team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        user: 1,
        searchTerm: this.state.searchTerm,
        teams: this.state.teams
      })
    }).then(res => res.json()).then(parsedRes => {
      if(parsedRes.id === null){
        alert("your capped out on teams!")
      }else{
        this.setState({
          teams: [...this.state.teams, parsedRes]
        })
      }
        // ('state teams', this.state.teams)
        // this.setState({
        //   teams: [...this.state.teams, parsedRes]
        // })
    })
  }

  renderTeamCards = () => {
    let newTeamsArr = [...this.state.teams];
    return newTeamsArr.map(team => {
      return <TeamCard key={team.id} capitalizeFirstLetterOfName={this.props.capitalizeFirstLetterOfName} capitalizeFirstLetterOfType={this.props.capitalizeFirstLetterOfType} {...team} />
    })
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
      <Container>
      {this.state.teams.length > 0 ? <div>
          {this.renderTeamCards()}
          <Button primary className="submitFormBtn" onClick={this.addTeamForm}>Add Team</Button>
        </div> :
        <Segment placeholder>
          <Header icon>
            <Icon name='search' />
            You have no teams at the moment.
            Want to create one?
          </Header>
          <Segment.Inline>
            <Button primary className="submitFormBtn" onClick={this.addTeamForm}>Add Team</Button>
          </Segment.Inline>
        </Segment>}
        {this.state.formClicked ? <Form success>
          <Form.Input label='Name' value={this.state.searchTerm} onChange={this.updateSearchTerm} placeholder='Enter the name of the team' />
          <Button onClick={this.postTeam}>Add Team</Button>
        </Form> : null}

      </Container>
    )
  }
}
