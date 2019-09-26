import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class TextInput extends Component {
  constructor (props) {
    super(props);
    this.state = {
      errors: {},
      text: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  onSubmit (event) {
    event.preventDefault();
    this.props.submitText(this.state, (errorMessage) => {
      if (errorMessage) {
        this.props.createFlashMessage(errorMessage, 'error');
      }
    });
  }
  render () {
    const { delimiter } = this.props;
    const { text } = this.state;
    return (
      <div className="row">
        <div className="col-md-6">
          <h1>Paste Text</h1>
          <form
            onSubmit={(event) => {
              this.onSubmit(event)
            }}
            className='form-horizontal'>
            <div className='form-group'>
              <label
                htmlFor='text'
                className='col-md-2 control-label'>
                Text
              </label>
              <div className='col-md-10'>
                <input
                  type='text'
                  className='form-control'
                  id='text'
                  name='text'
                  value={text}
                  onChange={this.handleInputChange} />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-md-offset-2 col-md-10'>
                <button
                  type='submit'
                  className='btn btn-success'
                >Import</button>
                &nbsp;
                <Link
                  to='/'
                  className='btn btn-primary'
                >Cancel</Link>
                <p>Need to <Link to='/register'>register</Link>?</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default TextInput;
