import React, {Component} from 'react';
import './App.css';
import HomeView from './Containers/HomeView'
import CreateAccount from './Components/CreateAccount'
import Header from './Components/Header'
import CreateItem from './Components/CreateItem'
import ShoppingCart from './Components/ShoppingCart'
import Order from './Components/Order'
import { Route, Switch, withRouter } from 'react-router-dom';

const userUrl = 'http://localhost:3000/users'
const itemUrl = 'http://localhost:3000/items'
const orderUrl = 'http://localhost:3000/orders'

class App extends Component {
  state = {
    userIndex: [],
    itemIndex: [],
    orderIndex: [],
    currentUser: {
      id: 26,
      username: "SamChen",
      password: "123",
      email: "samchen@123.com",
      address: "123 road, New York, NY 10007",
      profileImage: "none"
    },
    targetedReviews: [],
    search: '',
    currentItem: {},
    shoppingCart: [],
    cartTotal: 0
  }

  componentDidMount(){
    fetch(userUrl)
      .then(res => res.json())
      .then(data => this.setState({userIndex: data}))
    
    fetch(itemUrl)
      .then(res => res.json())
      .then(data => this.setState({itemIndex: data}))
    
    fetch(orderUrl)
      .then(res => res.json())
      .then(data => this.setState({orderIndex: data}))
  }

  handleSearchChange = (e) => {
    this.setState({search: e.target.value})
  }

  createUser = (newUser) => {
    this.setState({userIndex: [...this.state.userIndex,newUser], currentUser: newUser})
  }

  addItem = (newItem) => {
    this.setState({itemIndex: [...this.state.itemIndex, newItem]})
  }

  delItem = (itemId) => {
    let filteredItems = this.state.itemIndex.filter(item => item.id !== itemId)
    this.setState({itemIndex: filteredItems})
  }

  handleEdit = (item) => {
    this.setState({currentItem: item})
    this.props.history.push('/itemform')
  }

  editItem = (editItem) => {
    let updatedItems = this.state.itemIndex.map(item => item.id === editItem.id ? editItem : item)
    this.setState({itemIndex: updatedItems, currentItem: {} })
  }

  handleCart = (item) => {
    let alreadyInCart = this.state.shoppingCart.find(cartItem => cartItem.id === item.id)
    if(this.state.currentUser.id === item['user_id'] || alreadyInCart){ //buyer id === seller id or in shopping cart
      alert('Already in your shopping cart!')
    }
    else{
      this.setState({shoppingCart: [...this.state.shoppingCart, item], cartTotal: Math.round((this.state.cartTotal + item.price)*100)/100})
    }
  }

  cartItemDel = (item) => {
    let filteredCartItems = this.state.shoppingCart.filter(cartItem => cartItem.id !== item.id)
    this.setState({shoppingCart: filteredCartItems, cartTotal: Math.round((this.state.cartTotal - item.price)*100)/100})
  }

  checkoutCart = () => {
    if (this.state.cartTotal === 0){
      alert('Please Add Items to Shopping Cart')
    }else{
      fetch('http://localhost:3000/orders',{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Accept:  'application/json'
          },
          body: JSON.stringify({
              totalAmount: this.state.cartTotal,
              shippingAddress: this.state.currentUser.address,
              user_id: this.state.currentUser.id,
              cartItems: this.state.shoppingCart
          })
      })
      .then(res=>res.json())
      .then(newOrder=> this.setState({orderIndex: [...this.state.orderIndex, newOrder], shoppingCart: [], cartTotal: 0}))
      this.props.history.push('/home')
    }
  }

  render(){
    const {itemIndex, currentUser, search, currentItem,shoppingCart, cartTotal, orderIndex} = this.state
    let searchedItems = itemIndex.filter(item => item.description.toLowerCase().includes(search.toLocaleLowerCase()))
    // console.log(this.state.orderIndex)
    return (
      <div className="App">
        <Header search={search} handleSearchChange={this.handleSearchChange} currentUser={currentUser.id}/>
        <h1> Welcome to eMall {currentUser.username}, where your dreams become reality!</h1>
        <Switch>
          <Route exact path="/home" render = {()=> <HomeView items={itemIndex} currentUser={currentUser} search={searchedItems} delItem={this.delItem} handleEdit={this.handleEdit} handleCart={this.handleCart}/>} />
          <Route path="/signup" render={()=> <CreateAccount createUser={this.createUser} {...this.props}/>} />
          <Route path="/itemform" render={()=> <CreateItem sellerId={currentUser.id} addItem={this.addItem} currentItem={currentItem} editItem={this.editItem} {...this.props}/>} />
          <Route path="/shoppingcart" render={()=> <ShoppingCart buyerId={currentUser.id} cart={shoppingCart} cartTotal={cartTotal} cartItemDel={this.cartItemDel} checkoutCart={this.checkoutCart} {...this.props}/>} />
          <Route path="/orders" render={()=> <Order buyerId={currentUser.id} orders={orderIndex} {...this.props}/>} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
