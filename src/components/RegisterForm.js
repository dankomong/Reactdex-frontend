import React, { Component,Fragment } from 'react'
import { Button, Form } from 'semantic-ui-react'

export default class RegisterForm extends Component {

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
		fetch("http://localhost:3001/create_user", {
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
				this.props.setCurrentUser(data)
				this.props.history.push(`/home`)

			}
		})
	}

  render() {
    return (
      <Fragment>
      <h1>Register</h1>
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
      </Fragment>
    )
  }
}
