import React, {Fragment} from 'react'
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
            <Fragment>
                <h1>Welcome to Your Orders</h1>
                {yourOders.map(order => 
                <div className='item' key={order.id}>
                    {order.items.map(item => {
                    return(
                        <div key={item.id}>
                            <p>{item.title}</p>
                            <p>{item.description}</p>
                            <p>${item.price}</p>
                            <p> Quantity: {item.quantity}</p>
                            <img className='image' src={item.image} alt=''/><br/><br/>
                        </div>
                    )
                    })}
                    <p>Shipping Address: {order.shippingAddress}</p>
                    <h3 className='total'>Your Total Amount: ${order.totalAmount} </h3>
                    <button onClick={()=>this.handleDel(order.id)}>Delete this Order</button>
                </div>     
                )} 
            </Fragment>
        )
    }
}

export default withRouter(Order)