import React, {Component} from 'react';
import ItemContainer from './ItemContainer'

export default class HomeView extends Component{
    render(){
        const {items, currentUser, search} = this.props
        return(
            <div>
                <ItemContainer items={search? search : items} currentUser={currentUser} delItem={this.props.delItem} handleEdit={this.props.handleEdit}/>
            </div>
        )
    }
}