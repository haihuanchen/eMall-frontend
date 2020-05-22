import React from 'react';
import './header.scss'
import Logo from '../assets/logo.jpg'
import {Link, NavLink} from 'react-router-dom';

export default class Header extends React.Component{
    render(){
        const {handleSearchChange, search, currentUser} = this.props
        return(
            <header>
                <div className='navbar'> 
                    <img className='logo' src = {Logo} alt = "eMall Logo"/>
                    <Link to="/home"><a id='home-btn' href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Home</a></Link>
                    <input placeholder="Enter Item to search." onChange={handleSearchChange} value={search}/>
                    <Link to="/itemform"> {currentUser && <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Add an Item</a>} </Link>
                    <Link to="/shoppingcart"> {currentUser && <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">View Shopping Cart</a>} </Link>
                    <Link to="/orders"> {currentUser && <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">View Orders</a>} </Link>
                    <NavLink to="/signup"><a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Sign Up</a></NavLink>
                </div>
            </header>
        )
    }
}