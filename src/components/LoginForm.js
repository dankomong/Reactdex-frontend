import React, { Component } from 'react'

export default class LoginForm extends Component {

	state = {
		username: "",
		password: "",
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

  handleSubmit = (event) => {
		event.preventDefault()
		fetch("http://localhost:3001/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accepts": "application/json"
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then(data => {
			if (data.errors){alert(data.errors)}
			else {
        // the data in this case may be different so might have to change the setState
        // in the setCurrentUser func
				this.props.setCurrentUser(data.user)
				this.props.history.push(`/home`)

			}
		})
	}

  render() {
    return (
      <div onChange={this.handleChange}>
			<h1>Log in!</h1>
    		<form>
				<label name='username'>Username</label>
				<input type='text' name='username'/>
				<label name='password'>Password</label>
				<input type='text' name='password'/>
				<button onClick={this.handleSubmit}>log in</button>
				</form>
      </div>
    )
  }
}
