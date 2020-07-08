import React, { Component } from 'react';
import AuthModal from '../components/auth/AuthModal';

class Login extends Component {
	render() {
		return (
			<div>
				<AuthModal type="login" />
			</div>
		);
	}
}

export default Login;
