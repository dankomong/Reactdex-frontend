import React, { Component, Fragment } from 'react'
import { Container, Button, Header, Icon, Segment } from 'semantic-ui-react'
import PokemonCard from './PokemonCard'
import StackGrid from 'react-stack-grid';

export default class TeamCollection extends Component {


  renderPokemonCards = () => {
    return this.props.pokemons.map(pokemon => {
      return <div key={pokemon.id}>
      <PokemonCard capitalizeFirstLetterOfName={this.props.capitalizeFirstLetterOfName} capitalizeFirstLetterOfType={this.props.capitalizeFirstLetterOfType} pokemon={pokemon} />
        <div className="remove-pokemonBtn">
          <Button icon='times circle outline' onClick={() => this.props.deletePokemonFromTeam(this.props.id, pokemon.id)}/>
        </div>
      </div>
    })
  }

  render() {
    console.log("pokemon teams", this.props)
    return (
      <div>
          {this.props.pokemons.length === 0 ? <Segment placeholder>
             <Header icon>
            <div className="name-header">
              <h1>{this.props.name}</h1>
            </div>
            <Icon name='search' />
            Got no Pokemon yet, add one idiot
          </Header>
          <Segment.Inline>
            <Button color='teal'>Add Pokemon</Button>
            <Button color='red' onClick={() => this.props.deleteTeam(this.props.id)}>Delete Team</Button>
          </Segment.Inline> </Segment> : <Fragment>
            <div className="teamcard-header">
              <h1><strong>Team: {this.props.name}</strong></h1>
              <StackGrid className="stack-grid" columnWidth={150}>
               {this.renderPokemonCards()} </StackGrid>
               <div className="add-deleteBtns">
                 <Button color='red' onClick={() => this.props.deleteTeam(this.props.id)}>Delete Team</Button>
              </div>
            </div>
           </Fragment> }
        </div>
    )
  }
}
