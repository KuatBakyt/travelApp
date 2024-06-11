import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import s from "../../allcss/registration.module.css"
import Form from 'react-bootstrap/Form';
import PreLoader from "../Preloader/Preloader";

export default function Registration(props) {
	let navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password1: "",
		password2: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {

		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const [error, setError] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await axios.post("http://127.0.0.1:8000/api/register/", formData)
			console.log("Success!", response.data)
			props.createUser(response.data)
			localStorage.setItem('user', JSON.stringify(response.data))
			localStorage.setItem('useremail', JSON.stringify(response.data.email))
			localStorage.setItem('username', JSON.stringify(response.data.username))
			navigate("/")
		}
		catch (error) {
			console.log("Error during registration!", error.response?.data);
			if (error.response && error.response.data) {
				Object.keys(error.response.data).forEach(field => {
					const errorMessages = error.response.data[field];
					if (errorMessages && errorMessages.length > 0) {
						setError(errorMessages[0]);
					}
				})
			}
		}
		finally {
			setIsLoading(false)
		}

	};
	return (
		<div className={s.registration}>
			<div className='container'>


				<h3>Регистрация:</h3>
				{
					isLoading ? <PreLoader />
						:
						<Form>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Напишите Email</Form.Label>
								<Form.Control type="email"
									name="email"
									value={formData.email}
									onChange={handleChange} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label>Имя</Form.Label>
								<Form.Control type="text"
									name="username"
									value={formData.username}
									onChange={handleChange} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea7">
								<Form.Label>Пароль</Form.Label>
								<Form.Control type="password"
									name="password1"
									value={formData.password1}
									onChange={handleChange} />
							</Form.Group>

							<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea7">
								<Form.Label>Подтвердите пароль</Form.Label>
								<Form.Control type="password"
									name="password2"
									value={formData.password2}
									onChange={handleChange} />
							</Form.Group>

							<button type="submit" className='m-2' onClick={handleSubmit}>
								Создать аккаунт
							</button>
							<Link to='/login' className='m-2'>У меня есть аккаунт</Link>
						</Form>
				}
				{error && <div className={`alert alert-danger m-3 ${s.alert}`}>{error}</div>}
			</div>
		</div>
	);
}
