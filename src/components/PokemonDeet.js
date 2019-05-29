import React, { Component, Fragment } from 'react'
import { Button, Icon } from 'semantic-ui-react'


export default class PokemonDeet extends Component {

  state = {
    addClicked: false
  }

  handleAddPokemon = () => {
    this.setState(prevState => {
      return {
        addClicked: !prevState.addClicked
      }
    })
  }

  renderTeamButtons = () => {
    let length = this.props.teams.length
    const colorsArr = ["blue", "pink", "yellow", "teal"]
    return (
      <Button.Group>
        {this.props.teams.map((team, index) => {
          if (length - 1 === index) {
            return <Button color={colorsArr[index]}>{team.name}</Button>
          }
          else {
            return <Fragment><Button color={colorsArr[index]}>{team.name}</Button><Button.Or /></Fragment>
          }
        })}
      </Button.Group>
    )
  }

  render() {
    console.log('deet', this.props.teams)
    return (
      <div className="deet-header">
        <img src={this.props.pokemon.sprite} alt={this.props.pokemon.name} />
        <h1>{this.props.capitalizeFirstLetterOfName(this.props.pokemon.name)} </h1>
        <p><strong>Type: </strong> {this.props.capitalizeFirstLetterOfType(this.props.pokemon.type)} </p>
        <p><strong>Base Stats</strong></p>
        <p><strong>HP: </strong>{this.props.pokemon.hp}</p>
        <p><strong>Attack: </strong>{this.props.pokemon.attack}</p>
        <p><strong>Special Attack: </strong>{this.props.pokemon.sp_attack}</p>
        <p><strong>Defense: </strong>{this.props.pokemon.defense}</p>
        <p><strong>Special Defense: </strong>{this.props.pokemon.sp_defense}</p>
        <p><strong>Speed: </strong>{this.props.pokemon.speed}</p>
        <p><strong>Total: </strong>{this.props.pokemon.total}</p>
        <Button animated onClick={() => this.props.history.goBack()}>
          <Button.Content visible>Back</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow left' />
          </Button.Content>
        </Button>
        <Button color='teal' onClick={this.handleAddPokemon}>
          Add Pokemon to Team
        </Button>
        {this.state.addClicked ? <div>
          <h2>Select the team you want to add it to: </h2>
          {this.renderTeamButtons()}
      </div> : null}
      </div>
    )
  }
}
