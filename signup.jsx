import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCNMgOxSjhBQVHxDWbCkunQOAaIe7MKLgQ",
  authDomain: "bonus-apply.firebaseapp.com",
  projectId: "bonus-apply",
  storageBucket: "bonus-apply.appspot.com",
  messagingSenderId: "313039289662",
  appId: "1:313039289662:web:8116db3664e5b5cd34006f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, email, phone, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await setDoc(doc(db, "users", userCredential.user.uid), { name, email, phone });
      alert("Sign Up successful!");
      window.location.href = "/login";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.lottieBox}>
          <dotlottie-player
            src="https://lottie.host/d0652226-2765-417a-820f-3e48b6b61fba/LHyTJbLO9I.lottie"
            background="transparent"
            speed="1"
            style={{ width: 220, height: 220 }}
            loop
            autoplay
          />
        </div>

        <h2 style={styles.title}>Create Account</h2>

        {["name", "email", "phone", "password", "confirmPassword"].map((field) => (
          <div style={styles.inputGroup} key={field}>
            <label htmlFor={field} style={styles.label}>
              {field === "confirmPassword" ? "Confirm Password" : 
               field.charAt(0).toUpperCase() + field.slice(1).replace("Password", " Password")}
            </label>
            <input
              type={field.toLowerCase().includes("password") ? "password" : field === "email" ? "email" : "text"}
              id={field}
              placeholder={`Enter your ${field.replace("confirmPassword", "password")}`}
              style={styles.input}
              onChange={handleChange}
            />
          </div>
        ))}

        <button style={styles.button} onClick={handleSubmit}>
          Sign Up
        </button>

        <div style={styles.switchLink}>
          Already have an account? <a href="/login" style={styles.link}>Log In</a>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: "'Segoe UI', sans-serif",
    background: "linear-gradient(145deg, #0f0f0f, #1c1c1c)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
  },
  container: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "30px 20px",
    maxWidth: "400px",
    width: "100%",
    backdropFilter: "blur(15px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  lottieBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#ffd700",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    display: "block",
    color: "#ccc",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#222",
    color: "#ffd700",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#ffd700",
    color: "#111",
    fontWeight: "bold",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1.1rem",
    marginTop: "10px",
    transition: "background 0.3s ease",
  },
  switchLink: {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "0.95rem",
  },
  link: {
    color: "#ffd700",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Signup;
