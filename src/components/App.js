import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  state = {
    pets: [],
    filters: {
      type: 'all'
    }
  }

  changeFilter = (event) => {
    console.log(this.state.filters.type)
    this.setState({
      filters: {
        type: event.target.value
      }
    })
    
  }

  getPets = () => {

    if (this.state.filters.type ==='all'){
      fetch("/api/pets")
      .then(resp => resp.json())
      .then((pets) => {
        this.setState({
          pets: pets
        })
      })
      
    }else{
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(resp => resp.json())
      .then((pets) => {
        this.setState({
          pets: pets
        })
      })
    }
    
    
  }

  adoptPet = (id) => {
    let pet = this.state.pets.find(pet => pet.id = id)
    pet.isAdopted = true
  }


  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.getPets} onChangeType={this.changeFilter}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
