import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonCollection from './components/PokemonCollection'
import PokemonDeet from './components/PokemonDeet'
import Navbar from './components/Navbar'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import TeamContainer from './components/TeamContainer'
import { Route, Switch, Redirect } from 'react-router-dom'

const API = 'http://localhost:3001/pokedexs/index'

class App extends Component {

  state = {
    pokemon: [],
    filteredPokemon:[],
    kanto: [],
    johto: [],
    hoenn: [],
    sinnoh: [],
    currentUser: null,
    teams: [],
  }

  getPokemon = () => {
    // testing for Kanto pokemon only
    fetch(API).then(res => res.json()).then(parsedRes => {
      this.setState({
        pokemon: [...parsedRes[0].pokemons, ...parsedRes[1].pokemons, ...parsedRes[2].pokemons, ...parsedRes[3].pokemons],
        filteredPokemon:[...parsedRes[0].pokemons, ...parsedRes[1].pokemons, ...parsedRes[2].pokemons, ...parsedRes[3].pokemons],
        kanto: parsedRes[0].pokemons,
        johto: parsedRes[1].pokemons,
        hoenn: parsedRes[2].pokemons,
        sinnoh: parsedRes[3].pokemons
      })
      //console.log("kl;asdfj", parsedRes)
    })
  }

  getTeams = () => {
    fetch('http://localhost:3001/teams/index').then(res => res.json())
      .then(parsedRes => {
        this.setState({
          teams: parsedRes
        })
      })
  }

  deleteTeam = (id) => {
    console.log('ID', id)
    fetch('http://localhost:3001/delete_team', {
      method: 'DELETE',
      headers: {
        "TeamID": id
      }
    }).then(res => res.json()).then(parsedRes => {
      this.setState({
        teams: parsedRes
      })
    })
  }

  postTeam = () => {
    // fetch request here to post user-teams
    // and then in the response of the fetch we'll use the response to
    // set the state
    let token = localStorage.getItem("token")
    fetch('http://localhost:3001/create_team', {
      method: 'POST',
      headers: {
      'Authorization':token,
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        searchTerm: this.state.searchTerm,
        teams: this.state.teams
      })
    }).then(res => res.json())
    .then(parsedRes => {
      if(parsedRes.errors){
        alert(parsedRes.errors)
      }else{
      this.setState({
        teams: [...this.state.teams, parsedRes]}
      )
    }
  })

}

  updateSearchTerm = (e) => {

    let pokeArr = []
    this.state.pokemon.forEach(pokemon=>{
      if(pokemon.name.includes(e.target.value)){
        pokeArr.push(pokemon)
      }
    })
    // this.setState({
    //   searchTerm: e.target.value
    // },()=>{
      this.setState({
        filteredPokemon:pokeArr
      })
    // })
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
      debugger
			this.props.history.push("/home")
		})
	}

  setCurrentUser = (data) => {
		localStorage.setItem("token", data.token)
		this.setState({
			currentUser: data.user,
      teams:data.user.teams
		})
	}

  autoLogin=()=>{
    let token = localStorage.getItem("token")
    if(token){
    fetch('http://localhost:3001/auto_login', {
      method: 'POST',
      headers: {
      'Authorization':token,
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      }}).then(res=>res.json())
    .then(parsedRes=>{
      if(parsedRes.errors){
        alert(parsedRes.errors)
      }else{
        this.setState({
          currentUser:parsedRes
        },()=>this.props.history.push("/home"))
      }
    })}
  }

  login=()=>{
    this.props.history.push("/login")
  }
  register=()=>{
    this.props.history.push("/register")
  }

  componentDidMount() {
    this.getPokemon()
    this.getTeams()
    this.autoLogin()
  }

  checkForUser=()=>{
    if(this.state.currentUser){
      return(
        <div>
        <Navbar currentUser={this.state.currentUser} handleSearchTerm={this.updateSearchTerm}logOut={this.logOut}/>
        <Switch>
          <Route path="/pokemon/:id" render={(routerProps) => {
            const foundPokemon = this.state.pokemon.find(pokemon => pokemon.id === parseInt(routerProps.match.params.id))
            if (foundPokemon){
              return <PokemonDeet capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} pokemon={foundPokemon} {...routerProps} />
            } else {
              return <div>Loading</div>
            }
          }} />
          <Route path="/collection" render={(routerProps)=> <PokemonCollection region="Your Collection" pokemon={this.state.teams} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>}/>
          <Route path="/regions/kanto" render={(routerProps) => <PokemonCollection region={"Kanto"} pokemon={this.state.kanto} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />
          <Route path="/regions/johto" render={(routerProps) => <PokemonCollection region={"Johto"} pokemon={this.state.johto} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />
          <Route path="/regions/hoenn" render={(routerProps) => <PokemonCollection region={"Hoenn"} pokemon={this.state.hoenn} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />
          <Route path="/regions/sinnoh" render={(routerProps) => <PokemonCollection region={"Sinnoh"} pokemon={this.state.sinnoh} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />

          <Route path="/teams" render={(routerProps) => <TeamContainer searchTerm={this.state.searchTerm} updateSearchTerm={this.updateSearchTerm} teams={this.state.teams} postTeam={this.postTeam} deleteTeam={this.deleteTeam} currentUser={this.state.currentUser} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />


          <Route path="/home" render={(routerProps) =>{return<h1>home</h1>}}/>


        </Switch>
        </div>)
    }else{
      return(
        <div>
        <Navbar currentUser={this.state.currentUser} register={this.register}login={this.login}/>
        <Switch>
        <Route
        exact path="/register"
        render={(routerProps) =>{
           return<RegisterForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
         }} />
        <Route
         exact path="/login"
         render={(routerProps) => {
               return <LoginForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
             }} />
              </Switch>
        </div>)
      }
  }

  render() {
    return (
      <div>
      {this.checkForUser()}
      </div>
    );
  }
}

export default App;
