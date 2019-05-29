import React, { Component } from 'react'
import StackGrid from 'react-stack-grid';
import PokemonCard from './PokemonCard'

export default class PokemonCollection extends Component {

setPokemonArr=()=>{
  let pokemonArr=[]
  if(this.props.region ==="Your Collection"){
    this.props.pokemon.forEach(arr=>
      arr.pokemons.forEach(pokemon=>pokemonArr.push(pokemon))
    )
  }else{
    pokemonArr = [...this.props.pokemon]
  }
    return pokemonArr.filter(pokemon=>pokemon.name.includes(this.props.searchTerm))
}


  renderPokemonCards = () => {
    const pokemonArr = this.setPokemonArr();
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
