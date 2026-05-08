import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import '../login/login.css';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.user && result.user._id) {
        navigate('/login');
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error.message);
      alert("Error during registration");
    } finally {
      setFormData({
        name: '',
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
          <h1>Create Account</h1>
          <p>Join us today! It only takes a minute.</p>
        </div>

        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-4" controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="John Doe" 
              name='name' 
              value={formData.name} 
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </Form.Group>

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
              placeholder="Create a strong password" 
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </Form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup;