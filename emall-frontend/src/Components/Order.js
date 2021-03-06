import React from 'react'
import { withRouter } from "react-router-dom";
import '../App.css';

class Order extends React.Component{

    handleDel = (orderId) =>{
        fetch(`http://localhost:3000/orders/${orderId}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(deletedOrder => this.props.delOrder(deletedOrder.id))
    }

    render(){
        const yourOders = this.props.orders.filter(order => order['user_id'] === this.props.buyerId)
        return(
            <>
                <h1>Welcome to Your Orders</h1>
                <div className='container'>
                    {yourOders.map(order => 
                    <div className='item' key={order.id}>
                        {order.items.map(item => {
                        return(
                            <div key={item.id}>
                                <img className='image' src={item.image} alt=''/><br/><br/>
                                <p>{item.title}</p>
                                <p>{item.description}</p>
                                <p>${item.price}</p>
                                <p> Quantity: {item.quantity}</p><br/>
                            </div>
                        )
                        })}
                        <p>Shipping Address: {order.shippingAddress}</p>
                        <h3 className='total'>Your Total Amount: ${order.totalAmount} </h3>
                        <button onClick={()=>this.handleDel(order.id)}>Cancel this Order</button>
                    </div>     
                    )} 
                </div>
            </>
        )
    }
}

export default withRouter(Order)