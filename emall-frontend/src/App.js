import React, {Component} from 'react';
import './App.css';
import HomeView from './Containers/HomeView'
import Header from './Components/Header'
import CreateAccount from './Components/CreateAccount'
import { Route, Switch, withRouter } from 'react-router-dom';

const userUrl = 'http://localhost:3000/users'
const itemUrl = 'http://localhost:3000/items'

class App extends Component {
  state = {
    userIndex: [],
    itemIndex: [],
    orderIndex: [],
    currentUser: {},
    targetedReviews: [],
    search: '',
  }

  componentDidMount(){
    fetch(userUrl)
      .then(res => res.json())
      .then(data => this.setState({userIndex: data}))
    
    fetch(itemUrl)
      .then(res => res.json())
      .then(data => this.setState({itemIndex: data}))
  }

  handleSearchChange = (e) => {
    this.setState({search: e.target.value})
  }

  createUser = (newUser) => {
    this.setState({userIndex: [...this.state.userIndex,newUser], currentUser: newUser})
  }
  render(){
    // console.log(this.state.userIndex, this.state.itemIndex)
    const {itemIndex, currentUser, search} = this.state
    return (
      <div className="App">
        <Header search={search} handleSearchChange={this.handleSearchChange}/>
        <h1> Welcome to eMall, where your dreams become reality!</h1>
        <Switch>
          <Route exact path="/home" render = {()=> <HomeView items={itemIndex} currentUser={currentUser} />} />
          <Route path="/signup" render={()=> <CreateAccount createUser={this.createUser} {...this.props}/>} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
