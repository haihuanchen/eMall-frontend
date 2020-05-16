import React, {Component} from 'react';
import ItemContainer from './ItemContainer'

export default class HomeView extends Component{
    render(){
        const {items, currentUser} = this.props
        return(
            <div>
                <ItemContainer items={items} currentUser={currentUser}/>
            </div>
        )
    }
}