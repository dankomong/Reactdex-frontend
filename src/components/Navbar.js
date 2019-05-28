import React, { Component } from 'react'
import { Menu, Segment, Input, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {

  state = {
    activeItem: 'home'
  }

  handleItemClick = (e, { name }) => {
    this.setState({
       activeItem: name
     })
  }

  render() {
    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            as={ Link }
            name='home'
            to='/home'
            active={this.state.activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={ Link }
            name='teams'
            to='/teams'
            active={this.state.activeItem === 'teams'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={ Link }
            name='collection'
            to='/collection'
            active={this.state.activeItem === 'collection'}
            onClick={this.handleItemClick}
          />
          <Dropdown item text='Regions' active={this.state.activeItem === 'collection'} onClick={this.handleItemClick}>
           <Dropdown.Menu>
             <Dropdown.Item as={ Link } name='kanto' to='/regions/kanto'>Kanto</Dropdown.Item>
             <Dropdown.Item as={ Link } name='johto' to='/regions/johto'>Johto</Dropdown.Item>
             <Dropdown.Item as={ Link } name='hoenn' to='/regions/hoenn'>Hoenn</Dropdown.Item>
             <Dropdown.Item as={ Link } name='sinnoh' to='/regions/sinnoh'>Sinnoh</Dropdown.Item>
           </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item
              name='logout'
              active={this.state.activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </Segment>
    )
  }
}
