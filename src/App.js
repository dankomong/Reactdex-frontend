import React, { Component,Fragment } from 'react';
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
    kanto: [],
    johto: [],
    hoenn: [],
    sinnoh: [],
    currentUser: null,
    teams: [],
    teamName:"",
  }

  getPokemon = () => {
    fetch(API).then(res => res.json()).then(parsedRes => {
      this.setState({
        pokemon: [...parsedRes[0].pokemons, ...parsedRes[1].pokemons, ...parsedRes[2].pokemons, ...parsedRes[3].pokemons,...parsedRes[4].pokemons,...parsedRes[5].pokemons,...parsedRes[6].pokemons],
        // filteredPokemon:[...parsedRes[0].pokemons,...parsedRes[1].pokemons, ...parsedRes[2].pokemons, ...parsedRes[3].pokemons,...parsedRes[4].pokemons,...parsedRes[5].pokemons,...parsedRes[6].pokemons],
        kanto: parsedRes[0].pokemons,
        johto: parsedRes[1].pokemons,
        hoenn: parsedRes[2].pokemons,
        sinnoh: parsedRes[3].pokemons,
        unova: parsedRes[4].pokemons,
        kalos: parsedRes[5].pokemons,
        special: parsedRes[6].pokemons
      })
    })
  }

  deleteTeam = (id) => {
    let token = localStorage.getItem('token')
    fetch('http://localhost:3001/delete_team', {
      method: 'DELETE',
      headers: {
        "Authorization":token,
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
        searchTerm: this.state.teamName,
        teams: this.state.teams
      })
    }).then(res => res.json())
      .then(parsedRes => {
        if(parsedRes.errors){
          alert(parsedRes.errors)
        }
        else {
        this.setState({
          teams: [...this.state.teams, parsedRes],
          teamName:""
        }
        )
      }
    })
  }

  updatePokemonTeam = (teamId, pokemonId) => {
    let token = localStorage.getItem('token')
    return fetch('http://localhost:3001/add_pokemon_to_team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        id: teamId,
        pokemon: pokemonId
      })
    }).then(res => res.json()).then(parsedRes => {
      if (parsedRes.errors) {
        return <div>You got errors boy </div>
      }
      else {
        let newArr = [...this.state.teams]
        let newObj = newArr.find(team => {
          return team.id === parsedRes.team.id
        })
        let index = newArr.indexOf(newObj)
        newArr.splice(index, 1, parsedRes.team)
        this.setState({
          teams: newArr
        })
        this.props.history.push('/teams')
      }
    })
  }

  deletePokemonFromTeam = (teamId, pokemonId) => {
    fetch('http://localhost:3001/delete_pokemon_from_team', {
      method: 'DELETE',
      headers: {
        'Team-ID': teamId,
        'Pokemon-ID': pokemonId
      }
    }).then(res => res.json()).then(parsedRes => {
      this.setState({
        teams: parsedRes
      })
    })
  }

  updateTeamName = (e) => {
      this.setState({
        teamName: e.target.value
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
			currentUser: null,
      teams:[]
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
          currentUser:parsedRes,
          teams:parsedRes.teams
        },()=>this.props.history.push("/home"))
      }
    })}
  }

  login=()=>{
    console.log("EET")
    this.props.history.push("/login")
  }
  register=()=>{
    this.props.history.push("/register")
  }

  componentDidMount() {
    this.getPokemon()
    // this.getTeams()
    this.autoLogin()
  }

  allUsersPokemons = () => {
     let newArr=[]
     let newObj ={}

     this.state.teams.forEach(arr=>
       arr.pokemons.forEach(pokemon=>{
         if(newObj[pokemon.name]===undefined){
           newObj[pokemon.name]=true
           newArr.push(pokemon)

         }
         else{}
       }))
       return newArr
     }

     resetSearchTerm = () => {
       console.log("RESETING SEARCH")
       this.setState({...this.state,searchTerm:""})
     }

  checkForUser=()=>{
    // this.resetSearchTerm()
    if (this.state.currentUser){
      return(
        <div>
        <Navbar currentUser={this.state.currentUser} logOut={this.logOut}/>
        <Switch>
          <Route path="/pokemon/:id" render={(routerProps) => {
            const foundPokemon = this.state.pokemon.find(pokemon => pokemon.id === parseInt(routerProps.match.params.id))
            if (foundPokemon){
              return <PokemonDeet teams={this.state.teams} updatePokemonTeam={this.updatePokemonTeam} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} pokemon={foundPokemon} {...routerProps} />
            } else {
              return <div>Loading</div>
            }
          }} />
          <Route path="/collection" render={(routerProps)=> <PokemonCollection region={"Your Collection"} pokemon={this.allUsersPokemons()} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>}/>
          <Route path="/regions/kanto" render={(routerProps) => <PokemonCollection region={"Kanto"} pokemon={this.state.kanto} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />
          <Route path="/regions/johto" render={(routerProps) => <PokemonCollection region={"Johto"} pokemon={this.state.johto} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />
          <Route path="/regions/hoenn" render={(routerProps) => <PokemonCollection region={"Hoenn"} pokemon={this.state.hoenn} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />
          <Route path="/regions/sinnoh" render={(routerProps) => <PokemonCollection region={"Sinnoh"} pokemon={this.state.sinnoh} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />
          <Route path="/regions/unova" render={(routerProps) => <PokemonCollection region={"Unova"} pokemon={this.state.unova} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />
          <Route path="/regions/kalos" render={(routerProps) => <PokemonCollection region={"Kalos"} pokemon={this.state.kalos} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />
          <Route path="/regions/special" render={(routerProps) => <PokemonCollection region={"Special"} pokemon={this.state.special} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />

          <Route path="/teams" render={(routerProps) => <TeamContainer deletePokemonFromTeam={this.deletePokemonFromTeam} teamName={this.state.teamName} updateTeamName={this.updateTeamName} teams={this.state.teams} postTeam={this.postTeam} deleteTeam={this.deleteTeam} currentUser={this.state.currentUser} capitalizeFirstLetterOfType={this.capitalizeFirstLetterOfType} capitalizeFirstLetterOfName={this.capitalizeFirstLetterOfName} {...routerProps}/>} />


          <Route path="/home" render={(routerProps) =>{return <Fragment><h1 style={{textAlign:"center"}}>React-Dex</h1><div className="homepage"><img src="https://i.ebayimg.com/images/g/qLMAAOSwWxNYpH6L/s-l300.jpg"/></div></Fragment>}}/>


        </Switch>
        </div>)
    }
    else {
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
        <Route path="/home" render={(routerProps) =>{return <Fragment><h1 style={{textAlign:"center"}}>React-Dex</h1><div style={{textAlign:'center'}}><img src="http://pngimg.com/uploads/pokemon/pokemon_PNG107.png"/></div></Fragment>}}/>
          <Route path="/" render={(routerProps) =>{return <Fragment><h1 style={{textAlign:"center"}}>React-Dex</h1><div style={{textAlign:'center'}}><img src="http://pngimg.com/uploads/pokemon/pokemon_PNG107.png"/></div></Fragment>}}/>
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





// store.dispatch({type: “EDIT_CAT”, payload: {id: 5, name: “yeet”})
// case "EDIT_CAT";
// let newCats = state.cats.map(cat=>{cat.id === action.payload.id ? return{...cat,name:action.payload.name}})
//  state.cats = newCats
//  return state
