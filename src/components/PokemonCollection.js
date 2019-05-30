import React, { Component } from 'react'
import StackGrid from 'react-stack-grid';
import PokemonCard from './PokemonCard'

export default class PokemonCollection extends Component {


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


setPokemonArr=()=>{
  let pokemonArr=[]


  if(this.props.region ==="Your Collection"){
    let newArr=[]
    let newObj ={}

    this.props.pokemon.forEach(arr=>
      arr.pokemons.forEach(pokemon=>{
        if(newObj[pokemon.name]===undefined){
          newObj[pokemon.name]=true
          newArr.push(pokemon)

        }
        else{}
      }))



      // newArr.forEach(pokemon=>{
      //   if(pokemonArr.length===0){pokemonArr.push(pokemon)}
      //   else{
      //     pokemonArr.forEach(obj=>{
      //       debugger
      //       if(obj.id!==pokemon.id){
      //         pokemonArr.push(pokemon)
      //       }
      //     })
      //   }
      // }
      pokemonArr=newArr
  }else{
    console.log(this.props.pokemon)
    if(this.props.pokemon===undefined){pokemonArr=[]}
    else{pokemonArr = [...this.props.pokemon]}
  }
  console.log("Thank you brenden")
  debugger
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
