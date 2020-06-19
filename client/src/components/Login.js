import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { axiosWithAuth } from '../utils/axiosWithAuth';


const initialLogin = [
  {
    id: uuid(),
    username: 'username',
    password: 'password',

  },
]


const initialFormValues = {
  username: '',
  password: '',
}

const Login = (props) => {
  const [formData, setFormData] = useState({})
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }
  const onSubmit = evt => {
    evt.preventDefault();
    axiosWithAuth()
        .post("http://localhost:5000/api/login", formData)
        .then(res => {
            window.localStorage.setItem("token", res.data.payload);
            props.history.push("/protected")
        })
        .catch(err => alert("login api fail"));

    console.log(formData)
    setFormData({
      name: '',
      password: '',

    });
  }

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div className="app-form register">
      <h2>Login</h2>
      <form className="form" onSubmit={onSubmit}>
        <label>Name:&nbsp;<input type='text' name='username' value={formData.name} onChange={handleChange} /></label>
        <label>Password:&nbsp;<input type='password' name='password' value={formData.password} onChange={handleChange} /></label>
        <button>Submit</button>
      </form>

      

    </div>
  );
};

export default Login;
