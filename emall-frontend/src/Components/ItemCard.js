import React, {Component} from 'react';
import ReviewContainer from '../Containers/ReviewContainer'
import '../App.css';
import {Link} from 'react-router-dom';
// import {Col} from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'


const itemUrl = 'http://localhost:3000/items'

export default class ItemCard extends Component{
    state = {
        toggled: false
    }

    handleClick = () => {
        this.setState({toggled: !this.state.toggled})
    }

    handleDel = (itemId) => {
        fetch(`${itemUrl}/${itemId}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(deletedItem => this.props.delItem(deletedItem.id))
    }
    render(){
        const {id, title, description, price, quantity, category, image, condition} = this.props.item
        const {handleCart, handleEdit, reviews, setCurrentItem, currentItem, delReview} = this.props
        return(
            <Card style={{width: '20rem'}}>
                <Card.Img variant='top' src= {image} alt= ""/>

                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <button className='btn' onClick={()=> {this.handleClick(); setCurrentItem(this.props.item)}}> {this.state.toggled ? "Less Info" : "More Info"}</button><br/><br/>
                </Card.Body>

                { this.state.toggled &&
                <ListGroup className="list-group-flush"> 
                    <ListGroupItem> ${price}</ListGroupItem>
                    <ListGroupItem> Quantity: {quantity}</ListGroupItem>
                    <ListGroupItem> Category: {category}</ListGroupItem>
                    <ListGroupItem> Condition: {condition}</ListGroupItem><br/>
                    <button className='btn' onClick={()=> handleCart(this.props.item)}> Add to Shopping Cart</button><br/>
                    <button className='btn' onClick={()=> handleEdit(this.props.item)}>Edit this Item</button><br/>
                    <button className='btn' onClick={()=>this.handleDel(id)}> Delete this Item</button><br/>
                    <Link to="/reviewform"> {currentItem && <button className='btn'>Add a Review</button>}</Link><br/>
                    <ReviewContainer reviews={reviews} currentItem={currentItem} delReview={delReview}/><br/>
                </ListGroup>}
            </Card>
        )
    }
}