import React, { useState } from 'react';
import "../../allcss/buttontour.css";
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Buttontour(props) {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        explain: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [error, setError] = useState(null)

    const addRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/requests/", formData)
            console.log("Success!", response.data)
            props.handleClose();
            props.setAlertReq(true)
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
    };

    return (
        <>
            <div className='buttontour'>
                <div className="buttontour-content">
                    <div>
                        {error && <div className={`alertreq m-3`}>Заполните все поля!</div>}
                        <Form >
                            <div className="buttontour-close">
                                <h3>Горящие туры со скидкой 40%</h3>
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label>Личные данные</Form.Label>
                                <Form.Control id="validationDefault01" type="email" name='email' placeholder="name@example.com" value={formData.email} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Имя" name='name' value={formData.name} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Control id="validationDefault02" type="text" name='phone' placeholder="Номер телефона" value={formData.phone} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label >Описание</Form.Label>
                                <Form.Control as="textarea" rows={3} name="explain" value={formData.explain} onChange={handleChange} />
                            </Form.Group>
                            <button className="btn buttontour-btn" onClick={addRequest}>Рассчитать тур</button>
                        </Form>
                        
                    </div>
                </div>
            </div>
        </>

    )
}

export default Buttontour
