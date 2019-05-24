import React, { Component } from 'react';

export default class PokemonCard extends Component {
  render() {
    return (
      <div key={this.props.i}>
        <img src={this.props.pokemon.sprite} />
      </div>
    )
  }
}
