import React from 'react'
import { withRouter } from "react-router-dom";

class CreateAccount extends React.Component{
    state = {
        name: '',
        username: '',
        password: '',
        confirmation: '',
        email: '',
    }

    handleChange = (e)=>{
        // console.log([e.target.name], e.target.value)
        this.setState({ [e.target.name]: e.target.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        // console.log(this.state)
        let {name, username, password, confirmation, email} = this.state;
        if(password === confirmation){
            fetch('http://localhost:3000/users',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept:  'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    username: username,
                    email: email,
                    password: password,
                })
            })
            .then(res=>res.json())
            .then(data=> this.props.createUser(data))
            this.setState({name: '', username: '', password: '', confirmation: '', email: ''})
            this.props.history.push('/home')
        }
        else{
            alert('Password and Confirmation do not Match!')
        }
    }

    render(){
        // console.log("create account", this.props)
        return(
            <form id="account-create" onSubmit={this.handleSubmit}>
                <h1>Create Account</h1>
                <label>
                    Name:
                    <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/>
                </label>
                <br/>
                <br/>
                <label>
                    Username:
                    <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                </label>
                <br/>
                <br/>
                <label>
                    Password:
                    <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                </label>
                <br/>
                <br/>
                <label>
                    Confirm Password:
                    <input name="confirmation" type="password" value={this.state.confirmation} onChange={this.handleChange}/>
                </label>
                <br/>
                <br/>
                <label>
                    Email:
                    <input name="email" type="text" value={this.state.email} onChange={this.handleChange}/>
                </label>
                <br/>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default withRouter(CreateAccount)