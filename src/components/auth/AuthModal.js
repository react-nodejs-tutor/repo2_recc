import React, { Component } from 'react';
import Input from '../common/Input';
import Paper from '../common/Paper';
import Template from '../common/Template';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import './AuthModal.scss';

class AuthModal extends Component {
	render() {
		const { type, onChange, onSubmit, form } = this.props;

		return (
			<Template>
				<Paper>
					<h1 className="title">{type === 'login' ? 'login' : 'register'}</h1>
					<form className="auth-modal" onSubmit={onSubmit}>
						<Input
							name="username"
							full
							placeholder="아이디"
							onChange={onChange}
							value={form.username}
						/>
						<Input
							name="password"
							full
							placeholder="비밀번호"
							onChange={onChange}
							value={form.password}
						/>
						{type === 'register' && (
							<Input
								name="passwordConfirm"
								full
								placeholder="비밀번호 확인"
								onChange={onChange}
								value={form.passwordConfirm}
							/>
						)}
						<Button full marginTop>
							{type === 'login' ? 'login' : 'register'}
						</Button>

						{type === 'login' ? (
							<Link className="auth-button" to="/register">
								register
							</Link>
						) : (
							<Link className="auth-button" to="/login">
								login
							</Link>
						)}
					</form>
				</Paper>
			</Template>
		);
	}
}

export default AuthModal;
