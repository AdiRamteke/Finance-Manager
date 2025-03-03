// LoginPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({ email: "", password: "" });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    setLoading(true);
    try {
      const { data } = await axios.post(loginAPI, { email, password });
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        toast.success(data.message, toastOptions);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", toastOptions);
    }
    setLoading(false);
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div style={styles.container}>
      <Container style={styles.formContainer}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 className="text-center mt-4">
              <AccountBalanceWalletIcon sx={{ fontSize: 45, color: "#ffcc00" }} />
            </h1>
            <h2 style={styles.title}>Login</h2>
            <Form>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label style={styles.label}>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  style={styles.input}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label style={styles.label}>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  style={styles.input}
                />
              </Form.Group>

              <div style={styles.linksContainer}>
                <Button
                  type="submit"
                  style={styles.button}
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                >
                  {loading ? "Signing in…" : "Login"}
                </Button>
                <p style={styles.registerText}>
                  Don't Have an Account? <Link to="/register" style={styles.link}>Register</Link>
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
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
  },
  formContainer: {
    padding: "2.5rem",
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "12px",
    backdropFilter: "blur(12px)",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
  },
  title: {
    color: "#ffffff",
    textAlign: "center",
    marginBottom: "1.8rem",
  },
  label: {
    color: "#f1f1f1",
  },
  input: {
    background: "rgba(255, 255, 255, 0.2)",
    border: "none",
    color: "white",
  },
  linksContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1.2rem",
  },
  link: {
    color: "#ffcc00",
    textDecoration: "none",
    marginBottom: "0.5rem",
  },
  button: {
    backgroundColor: "#ffcc00",
    border: "none",
    padding: "0.8rem 2.5rem",
    fontSize: "1rem",
    borderRadius: "6px",
    marginTop: "1rem",
    color: "black",
    transition: "0.3s",
  },
  registerText: {
    color: "#ccc",
    marginTop: "1rem",
  },
};

export default Login;
