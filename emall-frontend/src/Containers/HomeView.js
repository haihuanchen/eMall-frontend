import React, {Component} from 'react';
import ItemContainer from './ItemContainer'

export default class HomeView extends Component{
    render(){
        const {items, currentUser, search} = this.props
        return(
            <div>
            <ItemContainer 
                items={search? search : items} 
                currentUser={currentUser} 
                delItem={this.props.delItem} 
                handleEdit={this.props.handleEdit} 
                handleCart={this.props.handleCart} 
                reviews={this.props.reviews}
                setCurrentItem={this.props.setCurrentItem}
                currentItem={this.props.currentItem}
                delReview={this.props.delReview}
            />
            </div>
        )
    }
}