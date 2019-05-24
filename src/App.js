import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from 'semantic-ui-react';
import PokemonCard from './components/PokemonCard'
import StackGrid from 'react-stack-grid';

const API = 'http://localhost:3001/pokedex/index'

class App extends Component {

  state = {
    pokemon: []
  }

  getPokemon = () => {
    // testing for Kanto pokemon only
    fetch(API).then(res => res.json()).then(parsedRes => {
      this.setState({
        pokemon: parsedRes[0].pokemons
      })
    })
  }

  renderPokemonCards = () => {
    const pokemonArr = [...this.state.pokemon];
    // should make a pokemon card component for this...
    return pokemonArr.map((poke, index) => {
      return <PokemonCard key={poke.id} i={index + 1} pokemon={poke} />
    })
  }

  componentDidMount() {
    this.getPokemon()
  }

  render() {
    console.log('state', this.state)
    return (
      <StackGrid
        columnWidth={150}
        >
        {this.renderPokemonCards()}

      </StackGrid>
    );
  }
}

export default App;
