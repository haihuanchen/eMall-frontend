import React, {Component} from 'react';
import './App.css';
import HomeView from './Containers/HomeView'
import CreateAccount from './Components/CreateAccount'
import Header from './Components/Header'
import CreateItem from './Components/CreateItem'
import { Route, Switch, withRouter } from 'react-router-dom';

const userUrl = 'http://localhost:3000/users'
const itemUrl = 'http://localhost:3000/items'

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
    currentItem: {}
  }

  componentDidMount(){
    fetch(userUrl)
      .then(res => res.json())
      .then(data => this.setState({userIndex: data}))
    
    fetch(itemUrl)
      .then(res => res.json())
      .then(data => this.setState({itemIndex: data}))
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.userIndex !== this.state.userIndex){
      this.state.itemIndex.sort((a,b) => a.id < b.id ? 0: -1)
    }
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

  render(){
    const {itemIndex, currentUser, search, currentItem} = this.state
    let searchedItems = itemIndex.filter(item => item.description.toLowerCase().includes(search.toLocaleLowerCase()))
    // console.log(itemIndex)
    return (
      <div className="App">
        <Header search={search} handleSearchChange={this.handleSearchChange} currentUser={currentUser.id}/>
        <h1> Welcome to eMall {currentUser.username}, where your dreams become reality!</h1>
        <Switch>
          <Route exact path="/home" render = {()=> <HomeView items={itemIndex} currentUser={currentUser} search={searchedItems} delItem={this.delItem} handleEdit={this.handleEdit}/>} />
          <Route path="/signup" render={()=> <CreateAccount createUser={this.createUser} {...this.props}/>} />
          <Route path="/itemform" render={()=> <CreateItem sellerId={currentUser.id} addItem={this.addItem} currentItem={currentItem} editItem={this.editItem} {...this.props}/>} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
