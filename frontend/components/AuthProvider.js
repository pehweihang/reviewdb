import React, { Component } from 'react';

// first we will make a new context
const AuthContext = React.createContext();

// Then create a provider Component
class AuthProvider extends Component {
  state = {
    auth: false,
  };
  render() {
    return (
      <AuthContext.Provider
        value={{
          state: this.state,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

// then make a consumer which will surface it
const AuthConsumer = AuthContext.Consumer;

export default AuthProvider;
export { AuthConsumer };