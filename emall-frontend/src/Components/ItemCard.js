import React, {Component} from 'react';

export default class ItemCard extends Component{
    state = {
        toggled: false
    }

    handleClick = () => {
        this.setState({toggled: !this.state.toggled})
    }
    render(){
        const {title, description, price, quantity, category, image, condition} = this.props.item

        return(
            <div className="item">
                <h3>{title}</h3>
                <p>{description}</p>
                <img className='image' onClick={this.handleClick} src= {image} alt= ""/>
                    { this.state.toggled &&
                    <div> 
                        <p> ${price}</p>
                        <p> Quantity: {quantity}</p>
                        <p> Category: {category}</p>
                        <p> Condition: {condition}</p>
                        <button> Add to Shopping Cart</button>
                    </div>
                    }  
            </div>
        )
    }
}