import React, {Component} from 'react';
import { withRouter } from "react-router-dom";
import {Form, Container, Row, Col, Button} from 'react-bootstrap'

class CreateReview extends Component{
    state = {
        title: '',
        content: '',
        rating: 1,
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {title, content, rating} = this.state
        const {currentItem, currentUser} = this.props
        fetch('http://localhost:3000/reviews',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept:  'application/json'
            },
            body: JSON.stringify({
                title,
                content,
                rating,
                user_id: currentUser,
                item_id: currentItem
            })
        })
        .then(res=>res.json())
        .then(newReview=> this.props.addReview(newReview))
        this.setState({title: '', content: '', rating: 1})
        this.props.history.push('/home')
    }
    
    render(){
        const {title, content, rating} = this.state
        return(
            <Container>
                <Row>
                    <Col>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group >
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" type="text" value={title} onChange={this.handleChange} placeholder="Enter your review title" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control name="rating" type="number" value={rating} onChange={this.handleChange} placeholder="Rating it from 1-10" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Content</Form.Label>
                            <Form.Control name="content" type="text-area" value={content} onChange={this.handleChange} placeholder="Tell us more" />
                        </Form.Group>

                        <Button variant="primary" type="submit"> Submit</Button>
                    </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(CreateReview)
