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
    //console.log(this.props.pokemon)
    //console.log('PROP', this.props)
    return (
      <div key={this.props.i} onClick={this.handleClick}>
        {this.state.toggle ? <div className="card"><p><strong>Type: </strong>{this.props.capitalizeFirstLetterOfType(this.props.pokemon.type)}</p><Link to={`/pokemon/${this.props.pokemon.id}`}><p>More details</p></Link></div>
        :
        <Card>
          <Image src={this.props.pokemon.sprite} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.props.capitalizeFirstLetterOfName(this.props.pokemon.name)}</Card.Header>
          </Card.Content>
        </Card>}

      </div>
    )
  }
}
