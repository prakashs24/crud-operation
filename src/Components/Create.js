import axios from "axios";
import React,{useEffect, useState} from "react";
import { Link,useNavigate } from "react-router-dom";

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = validate(values);
        setFormErrors(errors);
        setIsSubmit(true);

        if (Object.keys(errors).length === 0) {
            axios.post('http://localhost:3000/user', values)
                .then(res => {
                    console.log(res);
                
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
    };

    const handleChange = (e) => {
        
        const fieldName = e.target.name;
        setValues({ ...values, [fieldName]: e.target.value });
        setFormErrors({ ...formErrors, [fieldName]: '' });
    };

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.name) {
            errors.name = "Name is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid email address!";
        }
        if (!values.phone) {
            errors.phone = "Phone is required!";
        }

        return errors;
    };

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 rounded bg-white border shadow px-5 pt-3 pb-5">
                <h1>Add a User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" className="form-control" placeholder="Enter Name" value={values.name} onChange={handleChange} />
                        {formErrors.name && <p className="text-danger">{formErrors.name}</p>}
                    </div>

                    <div className="mb-2">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter Email" value={values.email} onChange={handleChange} />
                        {formErrors.email && <p className="text-danger">{formErrors.email}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone">Phone:</label>
                        <input type="text" name="phone" className="form-control" placeholder="Enter Phone" value={values.phone} onChange={handleChange} />
                        {formErrors.phone && <p className="text-danger">{formErrors.phone}</p>}
                    </div>

                    <button className="btn btn-success">Submit</button>
                    <Link to="/" className="btn btn-primary ms-3">Back</Link>
                </form>
            </div>
        </div>
    );
}

export default Create;
