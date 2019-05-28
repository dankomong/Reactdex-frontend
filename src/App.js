import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonCollection from './components/PokemonCollection'
import PokemonDeet from './components/PokemonDeet'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import TeamContainer from './components/TeamContainer'
import { Route, Switch, Redirect } from 'react-router-dom'

const API = 'http://localhost:3001/pokedexs/index'

class App extends Component {

  state = {
    pokemon: [],
    kanto: [],
    johto: [],
    hoenn: [],
    sinnoh: [],
    currentUser: null
  }

  getPokemon = () => {
    // testing for Kanto pokemon only
    fetch(API).then(res => res.json()).then(parsedRes => {
      this.setState({
        pokemon: [...parsedRes[0].pokemons, ...parsedRes[1].pokemons, ...parsedRes[2].pokemons, ...parsedRes[3].pokemons],
        kanto: parsedRes[0].pokemons,
        johto: parsedRes[1].pokemons,
        hoenn: parsedRes[2].pokemons,
        sinnoh: parsedRes[3].pokemons
      })
      //console.log("kl;asdfj", parsedRes)
    })
  }

  capitalizeFirstLetterOfName = (name) => {
    let newWord = name

    return newWord.charAt(0).toUpperCase() + newWord.slice(1);
  }

  capitalizeFirstLetterOfType = (type) => {
    let newWord = type

    return newWord.charAt(0).toUpperCase() + newWord.slice(1);
  }

  logOut = () => {
		localStorage.removeItem('token')
		this.setState({
			currentUser: null
		}, () => {
			this.props.history.push("/login")
		})
	}

  setCurrentUser = (data) => {
		localStorage.setItem("token", data.token)
		this.setState({
			currentUser: data.user
		})
	}

  componentDidMount() {
    this.getPokemon()
  }

  render() {
    console.log('state', this.state.pokemon)
    return (
      <div>
        <Navbar currentUser={this.state.currentUser} logOut={this.logOut}/>
        <Switch>
          <Route path="/pokemon/:id" render={(routerProps) => {
            const foundPokemon = this.state.pokemon.find(pokemon => pokemon.id === parseInt(routerProps.match.params.id))
            if (foundPokemon){
              return <PokemonDeet capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} pokemon={foundPokemon} {...routerProps} />
            } else {
              return <div>Loading</div>
            }
          }} />
          <Route
            path="/login"
            render={(routerProps) => {
									return <LoginForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
								}} />
          <Route path="/regions/kanto" render={(routerProps) => <PokemonCollection region={"Kanto"} pokemon={this.state.kanto} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />
          <Route path="/regions/johto" render={(routerProps) => <PokemonCollection region={"Johto"} pokemon={this.state.johto} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />
          <Route path="/regions/hoenn" render={(routerProps) => <PokemonCollection region={"Hoenn"} pokemon={this.state.hoenn} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />
          <Route path="/regions/sinnoh" render={(routerProps) => <PokemonCollection region={"Sinnoh"} pokemon={this.state.sinnoh} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />

          <Route path="/teams" render={(routerProps) => <TeamContainer currentUser={this.state.currentUser} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />


          <Route path="/home" render={(routerProps) => <PokemonCollection pokemon={this.state.kanto} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />


        </Switch>
      </div>
    );
  }
}

export default App;
