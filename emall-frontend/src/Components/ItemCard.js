import React, {Component} from 'react';
import ReviewContainer from '../Containers/ReviewContainer'
import '../App.css';
import {Link} from 'react-router-dom';

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
            <div className="item">
                <h3>{title}</h3>
                <p>{description}</p>
                <img className='image' src= {image} alt= ""/><br/><br/>
                <button onClick={()=> {this.handleClick(); setCurrentItem(this.props.item)}}> {this.state.toggled ? "Less Info" : "More Info"}</button><br/><br/>
                    { this.state.toggled &&
                    <div> 
                        <p> ${price}</p>
                        <p> Quantity: {quantity}</p>
                        <p> Category: {category}</p>
                        <p> Condition: {condition}</p>
                        <button onClick={()=> handleCart(this.props.item)}> Add to Shopping Cart</button><br/><br/>
                        <button onClick={()=> handleEdit(this.props.item)}>Edit this Item</button><br/><br/>
                        <button onClick={()=>this.handleDel(id)}> Delete this Item</button><br/><br/>
                        <Link to="/reviewform"> {currentItem && <button>Add a Review</button>}</Link><br/><br/>
                        <ReviewContainer reviews={reviews} currentItem={currentItem} delReview={delReview}/><br/>
                    </div>
                    }
            </div>
        )
    }
}