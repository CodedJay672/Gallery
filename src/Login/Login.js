import React, { useState } from "react";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <form className="d-flex flex-column justfy-content-center align-items-center" onSubmit={handleSubmit}>
        <h1>LogIn</h1>
        <div className="mb-3">
          <label htmlFor="username" className="visually-hidden">Username</label>
          <input
            type="text"
            id="username"
            className="form-control-lg"
            value={username}
            placeholder="Enter username..."
            onChange={e => setUserName(e.target.value)}
            required
          />
          <div className="form-text">Enter a valid username.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="visually-hidden">Password</label>
          <input
            type="password"
            id="password"
            className="form-control-lg"
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <div className="form-text">Enter a valid password.</div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}