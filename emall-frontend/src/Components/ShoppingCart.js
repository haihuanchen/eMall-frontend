import React, {Fragment} from 'react'
import { withRouter } from "react-router-dom";
import '../App.css';

class ShoppingCart extends React.Component{
    render(){
        return(
            <Fragment>
                <h1>Welcome to Your Shopping Cart</h1>
                <h3 className='total'>Your Total Amount: ${this.props.cartTotal} </h3>
                <button>Checkout Shopping Cart</button>
                {this.props.cart.map(item => 
                    <div className='item' key={item.id}>
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                        <p>${item.price}</p>
                        <img className='cartImage' src={item.image} alt=''/>
                        <p> Quantity: {item.quantity}</p>
                        <p> Category: {item.category}</p>
                        <p> Condition: {item.condition}</p>
                        <button onClick={()=>this.props.cartItemDel(item)}>x</button>
                    </div>     
                )}  
            </Fragment>
        )
    }
}

export default withRouter(ShoppingCart)