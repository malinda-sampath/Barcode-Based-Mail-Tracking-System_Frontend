import React, { useState } from "react";
import { CSSProperties } from "react";

const LoginL = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with your login logic
    if (username === "admin" && password === "password") {
      alert("Login successful!");
    } else {
      alert("Invalid username or password,Please check again");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <img src="UOR-MTS-FRONTEND\src\assets\Logo.png "/>
        <h1 style={styles.title}>GENERAL ADMINISTRATIVE UNIT</h1>
        <h2 style={styles.title}>UNIVERSITY OF RUHHUNA</h2>
        <h3 style={styles.title}>LOGIN </h3>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};



const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "fullscreen",
    justifyContent: "center",
    alignItems: "center",
    height: "300vh",
    backgroundColor: "#f5f5f5",
  },
  loginBox: {
    padding: "20px",
    backgroundColor: "#990000",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
    boxAlign: "center",
  },
  title: {
    color: "#fff",
    marginBottom: "20px",
  },
  input: {
    display: "block",
    width: "50%",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  
  },
  button: {
    width: "10%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default LoginL;
