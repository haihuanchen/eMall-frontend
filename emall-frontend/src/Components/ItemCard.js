import React, {Component} from 'react';

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

        return(
            <div className="item">
                <h3 onClick={this.handleClick}>{title}</h3>
                <p>{description}</p>
                <img className='image' onClick={this.handleClick} src= {image} alt= ""/>
                    { this.state.toggled &&
                    <div> 
                        <p> ${price}</p>
                        <p> Quantity: {quantity}</p>
                        <p> Category: {category}</p>
                        <p> Condition: {condition}</p>
                        <button> Add to Shopping Cart</button><br/><br/>
                        <button onClick={()=> this.props.handleEdit(this.props.item)}>Edit this Item</button><br/><br/>
                        <button onClick={()=>this.handleDel(id)}> Delete this Item</button>
                    </div>
                    }  
            </div>
        )
    }
}