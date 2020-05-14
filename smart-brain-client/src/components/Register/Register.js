import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  onSubmitRegister = () => {
    const { name, user, password } = this.state;
    if (!name || !user || !password) {
      return console.log("Form not fully filled");
    }
    fetch('https://xsmart-brain.herokuapp.com/api/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("Home");
        }
      });
  }

  onPressEnter = (event) => {
    if (event.key === 'Enter') {
      this.onSubmitRegister();
    }
  }

  render() {
    return (
      <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
        <main className='pa4 black-80'>
          <div className='measure'>
            <fieldset className='ba b--transparent ph0 mh0'>
              <legend className='f1 fw6 ph0 mh0'>Register</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f4' htmlFor='name'>Name</label>
                <input className='pa2 input-reset ba bg-transparent hover-bg-dark-blue hover-white w-100'
                  type='text' name='name' onChange={this.onNameChange} onKeyDown={this.onPressEnter} />
              </div>
              <div className='mt3'>
                <label className='db fw6 lh-copy f4' htmlFor='username'>Username</label>
                <input className='pa2 input-reset ba bg-transparent hover-bg-dark-blue hover-white w-100'
                  type='text' name='username' onChange={this.onUsernameChange} onKeyDown={this.onPressEnter} />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f4' htmlFor='password'>Password</label>
                <input className='b pa2 input-reset ba bg-transparent hover-bg-dark-blue hover-white w-100'
                  type='password' name='password' onChange={this.onPasswordChange} onKeyDown={this.onPressEnter} />
              </div>
            </fieldset>
            <div>
              <input className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib'
                type='submit' value="Confirm" onClick={this.onSubmitRegister} onKeyDown={this.onPressEnter} />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
