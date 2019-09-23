import React, {Component} from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import SearchBar from './components/SearchBar';
import ItemList from './components/ItemList';
import LoginForm from './components/LoginForm';
import TextInput from './components/TextInput';
import RegisterForm from './components/RegisterForm';
import FlashMessages from './components/FlashMessages';
import NotFound from './components/NotFound';
import SavedItems from './components/SavedItems';

const API_URL = 'http://www.omdbapi.com/?apikey=5e859cf9&s=';

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
    /*
      why? http://localhost:3000/users/register
      why not? http://users-service:3000/users/register
     */
    return axios.post('http://localhost:3000/users/register', userData)
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
    /*
      why? http://localhost:3000/users/login
      why not? http://users-service:3000/users/login
     */
    return axios.post('http://localhost:3000/users/login', userData)
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
  submitText (userData, callback) {
    // TODO: split by delimiter
    // TODO: send the text through to lists and items
    return axios.post('http://localhost:3000/items', userData)
      .then((res) => {
        this.createFlashMessage('Saved items')
        this.props.history.push('/')
        this.getItems()
      })
      .catch((error) => {
        callback('Something went wrong')
      }).then((res) => {
        axios.post('http://localhost:3000/lists', res)
        .then((res) => {
          this.createFlashMessage('Saved list')
          this.props.history.push('/')
          this.getLists()
        })
        .catch((error) => {
          callback('Something went wrong')
        })
      })
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
                <h1>List Source</h1>
                <Link to='/text-line-breaks'>Text separated by line breaks</Link>
                <Link to='/pinterest'>Pinterest</Link>
                <Link to='/text-commas'>Text separated by commas (CSV)</Link>
                <SearchBar searchItem={this.searchItem.bind(this)} />
                <a href="" onClick={this.logoutUser}>Logout</a>&nbsp;&#124;&nbsp;<Link to='/collection'>Collection</Link>
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
          <Route path='/pinterest' render={() => (
            isAuthenticated
            ? <SavedItems
              createFlashMessage={this.createFlashMessage}
              saved={this.state.saved} />
            : <Redirect to={{ pathname: '/login' }} />
          )} />
          <Route path='/text-commas' render={() => (
            isAuthenticated
            ? <SavedItems
              createFlashMessage={this.createFlashMessage}
              saved={this.state.saved} />
            : <Redirect to={{ pathname: '/login' }} />
          )} />
          <Route path='/text-line-breaks' render={() => (
            isAuthenticated
            ? <TextInput
              delimiter='line-break'
              submitText={this.submitText} />
            : <Redirect to={{ pathname: '/login' }} />
          )} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App;
