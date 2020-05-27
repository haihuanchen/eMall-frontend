import React from 'react'
import { withRouter } from "react-router-dom";
import '../App.css';

class ShoppingCart extends React.Component{
    render(){
        return(
            <div className='container'>
                <h3>Welcome to Your Shopping Cart</h3>
                <h3 className='total'>Your Total Amount: ${this.props.cartTotal} </h3>
                <button onClick={this.props.checkoutCart}>Checkout Shopping Cart</button>
                {this.props.cart.map(item => 
                    <div className='item' key={item.id}>
                        <img className='image' src={item.image} alt=''/>
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                        <p>${item.price}</p>
                        <p> Quantity: {item.quantity}</p>
                        <p> Category: {item.category}</p>
                        <p> Condition: {item.condition}</p>
                        <button onClick={()=>this.props.cartItemDel(item)}>Remove from Cart</button>
                    </div>     
                )}  
            </div>
        )
    }
}

export default withRouter(ShoppingCart)