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

  handleSubmit = () => {
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
			if (data.errors){
				alert(data.errors)
			} else {
        // the data in this case may be different so might have to change the setState
        // in the setCurrentUser func
				this.props.setCurrentUser(data)
				this.props.history.push(`/home`)

			}

		})
	}

  render() {
    return (
      <div>
      LoginForm here!!
      </div>
    )
  }
}
