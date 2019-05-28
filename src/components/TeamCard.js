import React, { Component } from 'react'
import { Container, Button, Header, Icon, Segment } from 'semantic-ui-react'
import PokemonCard from './PokemonCard'
import StackGrid from 'react-stack-grid';

export default class TeamCard extends Component {


  renderPokemonCards = () => {
    return this.props.pokemons.map(pokemon => {
      return <PokemonCard key={pokemon.id} capitalizeFirstLetterOfName={this.props.capitalizeFirstLetterOfName} capitalizeFirstLetterOfType={this.props.capitalizeFirstLetterOfType} pokemon={pokemon} />
    })
  }

  render() {
    console.log("pokemon teams", this.props)
    return (
      <Container>
        <div className="team-segment">
        <Segment placeholder>
            {this.props.pokemons.length === 0 ? <Header icon>
              <div className="teamcard-header">
                <h1>{this.props.name}</h1>
              </div>
              <Icon name='search' />
              Got no Pokemon yet, add one idiot
            </Header> : <div>
            <Header icon>
              <div className="teamcard-header">
                <h1><strong>{this.props.name}</strong></h1>
              </div>
            </Header>
            <StackGrid columnWidth={150}> {this.renderPokemonCards()} </StackGrid></div>}
           <Segment.Inline>
             <Button color='teal'>Add Pokemon</Button>
           </Segment.Inline>
         </Segment>
         </div>
      </Container>
    )
  }
}
