import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import pic from "../images/pic1.png";
import { Link } from "react-router-dom";
import SignIn from './SignIn';
import { FcGoogle } from "react-icons/fc";



const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
    // Add authentication logic here
  };

  // Updated color scheme to match the design
  const styles = {
    pageBackground: {
      backgroundColor: '#A67B5B', // Beige background
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardContainer: {
      width: '100%',
      maxWidth: '1000px',
      height: '600px',
      margin: '0 auto',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    },
    imageCol: {
      padding: '0',
      position: 'relative',
      height: '100%',
    },
    formCol: {
      backgroundColor: '#FFFFFF',
      padding: '3rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    fullHeightImage: {
      width: '100%',
      height: '100%',
      objectFit: 'fill',
      objectPosition: 'center',
    },
    imageOverlay: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.3)', // Subtle dark overlay
      zIndex: '1',
    },
    imageText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      textAlign: 'center',
      width: '80%',
      zIndex: '2',
    },
    mainTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    subtitle: {
      fontSize: '1.2rem',
      fontWeight: '300',
    },
    formTitle: {
      color: '#5D1E14', // Dark brown
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    formSubtitle: {
      color: '#666',
      marginBottom: '2rem',
    },
    inputLabel: {
      fontWeight: '500',
      marginBottom: '0.5rem',
    },
    formControl: {
      borderRadius: '8px',
      padding: '0.75rem 1rem',
      marginBottom: '1.5rem',
      fontSize: '1rem',
    },
    passwordField: {
      marginBottom: '0',
    },
    forgotPassword: {
      textAlign: 'right',
      marginBottom: '2rem',
    },
    forgotPasswordLink: {
      color: '#8B1E3F', // Maroon
      textDecoration: 'none',
    },
    signinButton: {
      backgroundColor: '#8B1E3F', // Maroon
      borderColor: '#8B1E3F',
      borderRadius: '8px',
      padding: '0.75rem',
      fontWeight: '500',
      marginBottom: '2rem',
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: '0 0 1.5rem 0',
      color: '#888',
    },
    dividerLine: {
      flex: '1',
      height: '1px',
      backgroundColor: '#ddd',
    },
    dividerText: {
      padding: '0 1rem',
      fontSize: '0.875rem',
    },
    socialButtonsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    socialButton: {
      flex: '1',
      backgroundColor: 'white',
      borderColor: '#ddd',
      borderRadius: '8px',
      padding: '0.75rem',
      color: '#333',
    },
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.cardContainer}>
        <Row className="h-100 m-0">
          {/* Left Column - Image with text overlay */}
          <Col md={6} className="p-0" style={styles.imageCol}>
            <div style={styles.imageOverlay}></div>
            <img src={pic} alt="Library shelves" style={styles.fullHeightImage} />
            <div style={styles.imageText}>
              <div style={styles.mainTitle}>Discover Books</div>
              <div style={styles.subtitle}>Your journey through knowledge begins here</div>
            </div>
          </Col>

          {/* Right Column - Sign Up Form */}

          <Col md={6} className="p-4" style={styles.formCol}>
            <div>
              <h1 style={styles.formTitle}>Create an account</h1>
              <p style={styles.formSubtitle}>Join our online library community today.</p>

              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label style={styles.inputLabel}>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.formControl}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="mb-2" style={styles.inputLabel}>
                    Password
                  </Form.Label>
                  <InputGroup style={styles.passwordField}>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-end-0"
                      style={{ height: "40px" }} // Ensure uniform height
                    />
                    <InputGroup.Text
                      className="bg-white border-start-0 d-flex align-items-center p-0"
                      style={{ cursor: "pointer", height: "40px", width: "40px", justifyContent: "center" }}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <BsEye /> : <BsEyeSlash />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>


                <div style={styles.forgotPassword}>
                  <a href="#forgot" style={styles.forgotPasswordLink}>
                    Forgot your password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-100"
                  style={styles.signinButton}
                >
                  SIGN UP
                </Button>

                <div style={styles.divider}>
                  <div style={styles.dividerLine}></div>
                  <span style={styles.dividerText}>or continue with</span>
                  <div style={styles.dividerLine}></div>
                </div>

                <div style={styles.socialButtonsContainer}>
                  <Button variant="outline-secondary" style={styles.socialButton}>
                    {/* <FaGoogle style={{ marginRight: "8px" }} />  */}
                    <FcGoogle style={{ color: "#4285F4", marginRight: "8px" }} /> 
                    Google
                  </Button>
                </div>

                <div className="text-center">
                  <span className="text-muted">Already have an account? </span>
                  <a href="/signin" style={styles.forgotPasswordLink} className="fw-medium">
                    Sign In here
                  </a>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Signup;