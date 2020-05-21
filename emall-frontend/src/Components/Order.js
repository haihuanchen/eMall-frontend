import React, {Fragment} from 'react'
import { withRouter } from "react-router-dom";
import '../App.css';

class Order extends React.Component{
    render(){
        const yourOders = this.props.orders.filter(order => order['user_id'] === this.props.buyerId)
        return(
            <Fragment>
                <h1>Welcome to Your Orders</h1>
                {yourOders.map(order => 
                <div className='item' key={order.id}>
                    <p>Shipping Address: {order.shippingAddress}</p>
                    <h3 className='total'>Your Total Amount: ${order.totalAmount} </h3>
                </div>     
                )} 
            </Fragment>
        )
    }
}

export default withRouter(Order)