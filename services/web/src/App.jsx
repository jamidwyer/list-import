import React, {Component} from 'react'
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import axios from 'axios'

const API_URL = 'http://www.omdbapi.com/?apikey=c5a8df09&s='; // sample
const USERS_SERVICE_URL = process.env.REACT_APP_USERS_SERVICE_URL;
const MOVIES_SERVICE_URL = process.env.REACT_APP_MOVIES_SERVICE_URL;


import './App.css';

import SearchBar from './components/SearchBar';
import ItemList from './components/ItemList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import FlashMessages from './components/FlashMessages';
import NotFound from './components/NotFound';
import SavedItems from './components/SavedItems';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: [],
      saved: [],
      flashMessages: [],
      isAuthenticated: false
    }
    this.searchItem('wizard of oz')
    this.registerUser = this.registerUser.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.deleteFlashMessage = this.deleteFlashMessage.bind(this)
    this.createFlashMessage = this.createFlashMessage.bind(this)
    this.saveItem = this.saveItem.bind(this)
    this.getLists = this.getLists.bind(this)
  }
  searchItem(term) {
    axios.get(`${API_URL}${term}`)
    .then((res) => { this.setState({ items: res.data.Search }); })
    .catch((err) => { console.log(err); })
  }
  createFlashMessage (text, type = 'success') {
    const message = { text, type }
    this.setState({
      flashMessages: [...this.state.flashMessages, message]
    })
  }
  deleteFlashMessage (index) {
    if (index > 0) {
      this.setState({
        flashMessages: [
          ...this.state.flashMessages.slice(0, index),
          ...this.state.flashMessages.slice(index + 1)
        ]
      })
    } else {
      this.setState({
        flashMessages: [...this.state.flashMessages.slice(index + 1)]
      })
    }
  }
  registerUser (userData, callback) {
    return axios.post(`${USERS_SERVICE_URL}/users/register`, userData)
    .then((res) => {
      window.localStorage.setItem('authToken', res.data.token)
      window.localStorage.setItem('user', res.data.user)
      this.setState({ isAuthenticated: true })
      this.createFlashMessage('You successfully registered! Welcome!')
      this.props.history.push('/')
      this.getLists()
    })
    .catch((error) => {
      const errorMessage = error.response.data.error
      callback(errorMessage)
    })
  }
  loginUser (userData, callback) {
    return axios.post(`${USERS_SERVICE_URL}/users/login`, userData)
    .then((res) => {
      window.localStorage.setItem('authToken', res.data.token)
      window.localStorage.setItem('user', res.data.user)
      this.setState({ isAuthenticated: true })
      this.createFlashMessage('You successfully logged in! Welcome!')
      this.props.history.push('/')
      this.getLists()
    })
    .catch((error) => {
      callback('Something went wrong')
    })
  }
  logoutUser (e) {
    e.preventDefault()
    window.localStorage.clear()
    this.setState({ isAuthenticated: false })
    this.props.history.push('/')
    this.createFlashMessage('You are now logged out.')
  }
  getCurrentUser () {
    return window.localStorage.user
  }
  saveItem (item) {
    const options = {
      url: 'http://localhost:3001/lists',
      method: 'post',
      data: {
        title: item
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.authToken}`
      }
    };
    return axios(options)
    .then((res) => { this.getLists() })
    .catch((error) => { console.log(error); })
  }
  getLists() {
    const options = {
      url: 'http://localhost:3001/lists/user',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.authToken}`
      }
    };
    return axios(options)
    .then((res) => {
      this.setState({ saved: res.data.data });
    })
    .catch((err) => { console.log(err); })
  }
  render () {
    const {isAuthenticated, flashMessages} = this.state
    return (
      <div className='App container'>
        <br/>
        <FlashMessages
          deleteFlashMessage={this.deleteFlashMessage}
          messages={flashMessages} />
        <Switch>
          <Route exact path='/' render={() => (
            isAuthenticated
            ? <div className="container text-center">
                <h1>Item Search</h1>
                <SearchBar searchItem={this.searchItem.bind(this)} />
                <a href="" onClick={this.logoutUser}>Logout</a>&nbsp;&#124;&nbsp;<Link to='/collection'>Collection</Link>
                <br/><br/><br/>
                <ItemList
                  items={this.state.items}
                  isAuthenticated={isAuthenticated}
                  getCurrentUser={this.getCurrentUser}
                  saveItem={this.saveItem}
                />
              </div>
            : <Redirect to={{
              pathname: '/login'
            }} />
          )} />
          <Route path='/register' render={() => (
            isAuthenticated
            ? <Redirect to='/' />
            : <RegisterForm
              createFlashMessage={this.createFlashMessage}
              registerUser={this.registerUser} />
          )} />
          <Route path='/login' render={() => (
            isAuthenticated
            ? <Redirect to='/' />
            : <LoginForm
              createFlashMessage={this.createFlashMessage}
              loginUser={this.loginUser} />
          )} />
          <Route path='/collection' render={() => (
            isAuthenticated
            ? <SavedItems
              createFlashMessage={this.createFlashMessage}
              saved={this.state.saved} />
            : <Redirect to={{ pathname: '/login' }} />
          )} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App
