import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerAPI } from "../../utils/ApiRequest";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    setLoading(true);
    
    try {
      const { data } = await axios.post(registerAPI, { name, email, password });
      
      if (data.success) {
        delete data.user.password;
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/");
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", toastOptions);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <Container style={styles.formContainer}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 className="text-center mt-5">
              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
            </h1>
            <h2 style={styles.title}>Register</h2>
            <Form>
              <Form.Group controlId="formBasicName" className="mt-3">
                <Form.Label style={styles.label}>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={values.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label style={styles.label}>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label style={styles.label}>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <div style={styles.linksContainer}>
                <Button
                  type="submit"
                  style={styles.button}
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Signup"}
                </Button>
                <p style={styles.registerText}>
                  Already have an account? <Link to="/login" style={styles.link}>Login</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #141e30, #243b55)",
  },
  formContainer: {
    padding: "2rem",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    backdropFilter: "blur(10px)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  title: {
    color: "white",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  label: {
    color: "white",
  },
  linksContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1rem",
  },
  link: {
    color: "#ffcc00",
    textDecoration: "none",
    marginBottom: "0.5rem",
  },
  button: {
    backgroundColor: "#ffcc00",
    border: "none",
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    borderRadius: "5px",
    marginTop: "1rem",
    color: "black",
  },
  registerText: {
    color: "#9d9494",
    marginTop: "1rem",
  },
};

export default Register;
