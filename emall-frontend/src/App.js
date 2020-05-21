import React, {Component} from 'react';
import './App.css';
import HomeView from './Containers/HomeView'
import CreateAccount from './Components/CreateAccount'
import Header from './Components/Header'
import CreateItem from './Components/CreateItem'
import ShoppingCart from './Components/ShoppingCart'
import Order from './Components/Order'
import CreateReview from './Components/CreateReview'
import { Route, Switch, withRouter } from 'react-router-dom';

const baseUrl = 'http://localhost:3000'

class App extends Component {
  state = {
    userIndex: [],
    itemIndex: [],
    orderIndex: [],
    reviewIndex: [],
    currentUser: {
      id: 26,
      username: "SamChen",
      password: "123",
      email: "samchen@123.com",
      address: "123 road, New York, NY 10007",
      profileImage: "none"
    },
    search: '',
    currentItem: {},
    shoppingCart: [],
    cartTotal: 0
  }

  componentDidMount(){
    fetch(`${baseUrl}/users`)
      .then(res => res.json())
      .then(data => this.setState({userIndex: data}))
    
    fetch(`${baseUrl}/items`)
      .then(res => res.json())
      .then(data => this.setState({itemIndex: data}))
    
    fetch(`${baseUrl}/orders`)
      .then(res => res.json())
      .then(data => this.setState({orderIndex: data}))
    
      fetch(`${baseUrl}/reviews`)
      .then(res => res.json())
      .then(data => this.setState({reviewIndex: data}))
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

  setCurrentItem = (item) => {
    this.setState({currentItem: item})
  }

  editItem = (editItem) => {
    let updatedItems = this.state.itemIndex.map(item => item.id === editItem.id ? editItem : item)
    this.setState({itemIndex: updatedItems, currentItem: {} })
  }

  handleCart = (item) => {
    let alreadyInCart = this.state.shoppingCart.find(cartItem => cartItem.id === item.id)
    if(alreadyInCart){ //buyer id === seller id or in shopping cart
      alert('Already in your shopping cart!')
    }
    else if(this.state.currentUser.id === item['user_id'] ){
      alert('This item belongs to you!')
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

  delOrder = (orderId) => {
    const filteredOrders = this.state.orderIndex.filter(order => order.id !== orderId)
    this.setState({orderIndex: filteredOrders})
  }

  delReview = (reviewId) => {
    let filteredReviews = this.state.reviewIndex.filter(review => review.id !== reviewId)
    this.setState({reviewIndex: filteredReviews})
  }

  addReview = (newReview) => {
    this.setState({reviewIndex: [...this.state.reviewIndex, newReview]})
  }

  render(){
    const {itemIndex, currentUser, search, currentItem, shoppingCart, cartTotal, orderIndex, reviewIndex} = this.state
    let searchedItems = itemIndex.filter(item => item.description.toLowerCase().includes(search.toLocaleLowerCase()))
    let targetedReviews = reviewIndex.filter(review => review['item_id'] === currentItem.id)
    // console.log(orderIndex)
    return (
      <div className="App">
        <Header search={search} handleSearchChange={this.handleSearchChange} currentUser={currentUser.id}/>
        <h1> Welcome to eMall {currentUser.username}, where your dreams become reality!</h1>
        <Switch>
          <Route exact path="/home" render = {()=> <HomeView 
            items={itemIndex} 
            currentUser={currentUser} 
            search={searchedItems} 
            delItem={this.delItem} 
            handleEdit={this.handleEdit} 
            handleCart={this.handleCart}
            reviews={targetedReviews}
            setCurrentItem={this.setCurrentItem}
            currentItem={currentItem.id}
            delReview={this.delReview}
          />}/>
          <Route path="/signup" render={()=> <CreateAccount createUser={this.createUser} {...this.props}/>} />
          <Route path="/itemform" render={()=> <CreateItem 
            sellerId={currentUser.id} 
            addItem={this.addItem} 
            currentItem={currentItem} 
            editItem={this.editItem} 
            {...this.props}
          />}/>
          <Route path="/shoppingcart" render={()=> <ShoppingCart 
            buyerId={currentUser.id} 
            cart={shoppingCart} 
            cartTotal={cartTotal} 
            cartItemDel={this.cartItemDel} 
            checkoutCart={this.checkoutCart} 
            {...this.props}
          />}/>
          <Route path="/orders" render={()=> <Order buyerId={currentUser.id} orders={orderIndex} delOrder={this.delOrder} {...this.props}/>} />
          <Route path="/reviewform" render={()=> <CreateReview currentItem={currentItem.id} currentUser={currentUser.id} addReview={this.addReview} {...this.props}/>} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
