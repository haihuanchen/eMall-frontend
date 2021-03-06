import React from 'react'
import { withRouter } from "react-router-dom";
import '../App.css'
import {Form, Container, Row, Col, Button} from 'react-bootstrap'

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
        this.setState({ [e.target.name]: e.target.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault();
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
        return(
            <Container>
                <Row>
                    <Col>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group >
                            <Form.Label>Username</Form.Label>
                            <Form.Control name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Enter your username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control name="confirmation" type="password" value={this.state.confirmation} onChange={this.handleChange} placeholder="Enter Confirmation" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Address</Form.Label>
                            <Form.Control name="address" type="text" value={this.state.address} onChange={this.handleChange} placeholder="Enter address" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control name="profileImage" type="text" value={this.state.profileImage} onChange={this.handleChange} placeholder="Enter image url" />
                        </Form.Group>

                        <Button variant="primary" type="submit"> Submit</Button>
                    </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(CreateAccount)