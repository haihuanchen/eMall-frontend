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
                    <img src = {Logo} alt = "eMall Logo"/>
                    <Link to="/home"><button>Home</button></Link>
                    <input placeholder="Enter Item to search." onChange={handleSearchChange} value={search}/>
                    <NavLink to="/signup"><button>Sign Up</button></NavLink>
                    <Link to="/itemform"> {currentUser && <button>Add an Item</button>} </Link>
                </div>
            </header>
        )
    }
}