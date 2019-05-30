import React, { Component, Fragment } from 'react'
import { Container, Button, Form } from 'semantic-ui-react'

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
			if (data.errors || data.error){alert(data.errors||data.error)}
			else {
        // the data in this case may be different so might have to change the setState
        // in the setCurrentUser func
				this.props.setCurrentUser(data)
				this.props.history.push(`/home`)

			}
		})
	}

  render() {
    return (
			<Container>
			<h1>Log in!</h1>
			<Form onChange={this.handleChange}>
		    <Form.Field>
		      <label>Username</label>
		      <input name="username"placeholder='username' />
		    </Form.Field>
		    <Form.Field>
		      <label>Password</label>
		      <input name="password"type="password"placeholder='Password' />
		    </Form.Field>
		    <Button onClick={this.handleSubmit}>Submit</Button>
		  </Form>
			</Container>
    )
  }
}
