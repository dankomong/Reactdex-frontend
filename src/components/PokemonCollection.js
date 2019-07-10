import React, { Component } from 'react'
import StackGrid from 'react-stack-grid';
import { Input,Divider } from 'semantic-ui-react'
import PokemonCard from './PokemonCard'

export default class PokemonCollection extends Component {



  state = {
    searchTerm:""
  }
//if this function turns back false dont push
// checkArr=(arr,pokemon)=>{
//   let newObj = pokemon
//   arr.forEach(pokemonObj=>{
//     debugger
//
//   })
//
// debugger
// }


resetSearchTerm = () => {
  console.log("RESETING SEARCH")
  this.setState({...this.state,searchTerm:""})
}


setPokemonArr=()=>{


  // if(this.props.region ==="Your Collection"){
  //   let newArr=[]
  //   let newObj ={}
  //   console.log(this.props.pokemons)
  //   this.props.pokemon.forEach(arr=>
  //     arr.pokemons.forEach(pokemon=>{
  //       if(newObj[pokemon.name]===undefined){
  //         newObj[pokemon.name]=true
  //         newArr.push(pokemon)
  //
  //       }
  //       else{}
  //     }))
  //
  //
  //
  //     // newArr.forEach(pokemon=>{
  //     //   if(pokemonArr.length===0){pokemonArr.push(pokemon)}
  //     //   else{
  //     //     pokemonArr.forEach(obj=>{
  //     //       debugger
  //     //       if(obj.id!==pokemon.id){
  //     //         pokemonArr.push(pokemon)
  //     //       }
  //     //     })
  //     //   }
  //     // }
  //     pokemonArr=newArr
  // }else{
  //   if(this.props.pokemon===undefined){pokemonArr=[]}
  //   else{pokemonArr = [...this.props.pokemon]}
  // }
  // console.log("Thank you brenden")
    return this.props.pokemon.filter(pokemon=>pokemon.name.includes(this.state.searchTerm))
}


  renderPokemonCards = () => {
      let pokemonArr = this.setPokemonArr();
      console.log("MAKING POKEMON")
      if(pokemonArr.length===0){return <h1 style={{textAlign:"center"}}>No Pokemon Match that search term!</h1>}
      else{
      return <StackGrid columnWidth={150}>{pokemonArr.map((poke, index) => {
        return <PokemonCard capitalizeFirstLetterOfName={this.props.capitalizeFirstLetterOfName} capitalizeFirstLetterOfType={this.props.capitalizeFirstLetterOfType} key={poke.id} i={index + 1} pokemon={poke} />
      })}</StackGrid>
    }
  }

  updateSearchTerm=(e)=>{
    this.setState({
      searchTerm:e.target.value
    })
  }

  render() {
    console.log(this.props.pokemon)
    return (
      <div>
        <div className="region-header">
          <p>{this.props.region}</p>
          <Input icon='search' value={this.state.searchTerm} onChange={this.updateSearchTerm} placeholder='Search...' />
          <Divider/>
        </div>
          {this.props.pokemon.length === 0 ? <h1 style={{textAlign:"center"}}>You have no Pokemon!</h1> :this.renderPokemonCards()}
      </div>
    )
  }
}
