import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      email: '',
      password: ''
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.user && result.user._id) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("name", result.user.name);
        navigate('/dashboard');
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error.message);
      alert("Error logging in");
    } finally {
      setFormData({
        email: '',
        password: ''
      });
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="auth-page">
      <div className="premium-card auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in.</p>
        </div>

        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="btn-auth"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </Form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login