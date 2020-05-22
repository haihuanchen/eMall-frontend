import React, {Component} from 'react';
import ItemCard from '../Components/ItemCard'

export default class ItemContainer extends Component{
    render(){
        return(
            <div className='container'> 
                {this.props.items.map(item => <ItemCard 
                    key={item.id} 
                    item={item} 
                    delItem={this.props.delItem} 
                    handleEdit={this.props.handleEdit} 
                    handleCart={this.props.handleCart} 
                    reviews={this.props.reviews}
                    setCurrentItem={this.props.setCurrentItem}
                    currentItem={this.props.currentItem}
                    delReview={this.props.delReview}
                />)}
            </div>
        )
    }
}