import React from 'react'
import { withRouter } from "react-router-dom";
import '../App.css'
import {Form, Container, Row, Col, Button} from 'react-bootstrap'

const itemUrl = 'http://localhost:3000/items'

class CreateItem extends React.Component{
    state = {
        title: this.props.currentItem.title ? this.props.currentItem.title : '',
        description: this.props.currentItem.description ? this.props.currentItem.description : '',
        price: this.props.currentItem.price ? this.props.currentItem.price : 0,
        quantity: this.props.currentItem.quantity ? this.props.currentItem.quantity : 1,
        category: this.props.currentItem.category ? this.props.currentItem.category : '',
        image: this.props.currentItem.image ? this.props.currentItem.image : '',
        condition: this.props.currentItem.condition ? this.props.currentItem.condition : ''
    }

    handleChange = (e)=>{
        this.setState({ [e.target.name]: e.target.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        let {title, description, price, quantity, category, image, condition} = this.state;
        if(this.props.currentItem.id){
            fetch(`${itemUrl}/${this.props.currentItem.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept:  'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    price,
                    quantity,
                    category,
                    image,
                    condition
                })
            })
            .then(res=>res.json())
            .then(changedItem=> this.props.editItem(changedItem))
            this.setState({title: '', description: '', price: 0, quantity: 1,category: '', image: '', condition: ''})
            this.props.history.push('/home')
        }
        else{
            fetch(itemUrl,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept:  'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    price,
                    quantity,
                    category,
                    image,
                    condition,
                    user_id: this.props.sellerId
                })
            })
            .then(res=>res.json())
            .then(newItem=> this.props.addItem(newItem))
            this.setState({title: '', description: '', price: 0, quantity: 1,category: '', image: '', condition: ''})
            this.props.history.push('/home')
        }      
    }

    render(){
        const {title, description, price, quantity, category, image, condition} = this.state
        return(
            <Container>
                <Row>
                    <Col>
                    <Form onSubmit={this.handleSubmit}>
                        <h1>{this.props.currentItem.title ? "Edit this Item" : "Add a new Item"}</h1>
                        <Form.Group >
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" type="text" value={title} onChange={this.handleChange} placeholder="Enter your product name" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" type="text-area" value={description} onChange={this.handleChange} placeholder="Tell us more about the product" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" type="float" value={price} onChange={this.handleChange} placeholder="Enter the price" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control name="quantity" type="number" value={quantity} onChange={this.handleChange} placeholder="Enter the quantity" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Category</Form.Label>
                            <Form.Control name="category" type="text" value={category} onChange={this.handleChange} placeholder="Enter product category" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Image</Form.Label>
                            <Form.Control name="image" type="text" value={image} onChange={this.handleChange} placeholder="Enter product image url" />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Condition</Form.Label>
                            <Form.Control name="condition" type="text" value={condition} onChange={this.handleChange} placeholder="Enter product condition" />
                        </Form.Group>

                        <Button variant="primary" type="submit"> Submit</Button>
                    </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default withRouter(CreateItem)
