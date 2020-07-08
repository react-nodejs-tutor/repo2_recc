import React, { Component } from 'react';
import AuthModal from '../components/auth/AuthModal';
import { connect } from 'react-redux';
import { changeInput, resetForm, registerThunk } from '../store/modules/auth';

// 컨테이너 컴포넌트
class Register extends Component {
	handleChange = (e) => {
		const { changeInput } = this.props;
		const { name, value } = e.target;
		changeInput({ type: 'register', key: name, value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { resetForm, registerThunk } = this.props;

		// api호출
		const { username, password } = this.props.register;
		registerThunk({ username, password });

		resetForm('register');
	};

	render() {
		const { register } = this.props;
		const { handleChange, handleSubmit } = this;

		return (
			<div>
				<AuthModal
					type="register"
					onChange={handleChange}
					onSubmit={handleSubmit}
					form={register}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	register: state.auth.register,
});

const mapDispatchToProps = {
	changeInput,
	resetForm,
	registerThunk,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
