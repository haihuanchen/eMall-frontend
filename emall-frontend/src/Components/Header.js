import React from 'react';
import './header.scss';
import Logo from '../assets/logo.jpg'
import {Link, NavLink} from 'react-router-dom';

export default class Header extends React.Component{
    render(){
        const {handleSearchChange, search, currentUser} = this.props
        return(
            <header>
                <nav className='navbar navbar-light bg-dark'> 
                    <Link to='/home' className='navbar-brand'><img className='logo' src = {Logo} alt = "eMall Logo"/></Link>
                    <Link to="/home"><button id='home-btn' href="#" className="btn btn-primary btn-lg active" aria-pressed="true">Home</button></Link>
                    <input placeholder="Enter Item to search." onChange={handleSearchChange} value={search}/>
                    <Link to="/itemform"> {currentUser && <button href="#" className="btn btn-primary btn-lg active" aria-pressed="true">Add an Item</button>} </Link>
                    <Link to="/shoppingcart"> {currentUser && <button href="#" className="btn btn-primary btn-lg active" aria-pressed="true">View Shopping Cart</button>} </Link>
                    <Link to="/orders"> {currentUser && <button href="#" className="btn btn-primary btn-lg active" aria-pressed="true">View Orders</button>} </Link>
                    <NavLink to="/signup"><button href="#" className="btn btn-primary btn-lg active" aria-pressed="true">Sign Up</button></NavLink>
                </nav>
            </header>
        )
    }
}