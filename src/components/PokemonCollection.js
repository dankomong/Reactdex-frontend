import React, { Component } from 'react'
import StackGrid from 'react-stack-grid';
import PokemonCard from './PokemonCard'

export default class PokemonCollection extends Component {


  renderPokemonCards = () => {
    const pokemonArr = [...this.props.pokemon];
    return pokemonArr.map((poke, index) => {
      return <PokemonCard capitalizeFirstLetterOfName={this.props.capitalizeFirstLetterOfName} capitalizeFirstLetterOfType={this.props.capitalizeFirstLetterOfType} key={poke.id} i={index + 1} pokemon={poke} />
    })
  }

  render() {
    return (
      <div>
        <div className="region-header">
          <p>{this.props.region}</p>
        </div>
        <StackGrid
          columnWidth={150}>
          {this.renderPokemonCards()}
        </StackGrid>
      </div>
    )
  }
}
