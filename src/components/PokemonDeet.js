import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'


export default class PokemonDeet extends Component {

  state = {
    addClicked: false
  }

  handleAddPokemon = () => {
    this.setState({
      addClicked: true
    })
  }

  renderTeamButtons = () => {

  }

  render() {
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
        
      </div>
    )
  }
}
