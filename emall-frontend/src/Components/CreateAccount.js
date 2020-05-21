import React from 'react'
import { withRouter } from "react-router-dom";
import '../App.css'

class CreateAccount extends React.Component{
    state = {
        username: '',
        password: '',
        confirmation: '',
        email: '',
        address: '',
        profileImage: ''
    }

    handleChange = (e)=>{
        // console.log([e.target.name], e.target.value)
        this.setState({ [e.target.name]: e.target.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        // console.log(this.state)
        let {username, password, confirmation, email, address, profileImage} = this.state;
        if(password === confirmation){
            fetch('http://localhost:3000/users',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept:  'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    address: address,
                    profileImage: profileImage
                })
            })
            .then(res=>res.json())
            .then(data=> this.props.createUser(data))
            this.setState({username: '', password: '', confirmation: '', email: '',address: '', profileImage: ''})
            this.props.history.push('/home')
        }
        else{
            alert('Password and Confirmation do not Match!')
        }
    }

    render(){
        // console.log("create account", this.props)
        return(
            <form className="item" onSubmit={this.handleSubmit}>
                <h1>Create Account</h1><br/>   
                <label>
                    Username:
                    <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                </label><br/><br/>
                <label>
                    Password:
                    <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                </label><br/><br/>
                <label>
                    Confirm Password:
                    <input name="confirmation" type="password" value={this.state.confirmation} onChange={this.handleChange}/>
                </label><br/><br/>
                <label>
                    Email:
                    <input name="email" type="text" value={this.state.email} onChange={this.handleChange}/>
                </label><br/><br/>
                <label>
                    Address:
                    <input name="address" type="text" value={this.state.address} onChange={this.handleChange}/>
                </label><br/><br/>
                <label>
                    Profile Image:
                    <input name="profileImage" type="text" value={this.state.profileImage} onChange={this.handleChange}/>
                </label><br/><br/>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default withRouter(CreateAccount)