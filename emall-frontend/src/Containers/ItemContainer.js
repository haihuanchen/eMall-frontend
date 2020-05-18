import React, {Component} from 'react';
import ItemCard from '../Components/ItemCard'

export default class ItemContainer extends Component{
    render(){
        return(
            <div> 
                {this.props.items.map(item => <ItemCard key={item.id} item={item} delItem={this.props.delItem} handleEdit={this.props.handleEdit}/>)}
            </div>
        )
    }
}