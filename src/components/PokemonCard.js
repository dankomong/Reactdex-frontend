import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react'


export default class PokemonCard extends Component {

  state = {
    toggle: false
  }

  handleClick = () => {
    this.setState(prevState => {
      return {
        toggle: !this.state.toggle
      }
    })
  }


  render() {
    return (
      <div key={this.props.i} className="cardBox" onClick={this.handleClick}>
        {this.state.toggle ?
        <Card>
        <Image src={this.props.pokemon.sprite} wrapped ui={false} />
        <Card.Content>
        <Card.Header>{this.props.capitalizeFirstLetterOfName(this.props.pokemon.name)}</Card.Header>
        <Card.Description>Type:{this.props.capitalizeFirstLetterOfType(this.props.pokemon.type||this.props.pokemon.element)}</Card.Description>
        <Card.Description><Link to={`/pokemon/${this.props.pokemon.id}`}><p>More details</p></Link></Card.Description>
        </Card.Content>
        </Card>
        :
        <Card>
          <Image src={this.props.pokemon.sprite} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.props.capitalizeFirstLetterOfName(this.props.pokemon.name)}</Card.Header>
          </Card.Content>
        </Card>
      }
      </div>
    )
  }
}
