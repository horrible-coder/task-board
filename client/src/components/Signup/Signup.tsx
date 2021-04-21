import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import apis from "../../api";
import "./Signup.scss";

export interface Props {}

const Signup: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const history = useHistory();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!email) throw new Error("Provide an email.");
      if (!password) throw new Error("Provide a password.");
      if (!fullName) throw new Error("Provide your full name.");
      if (password.length < 8)
        throw new Error("Password should be minimum of 8 characters.");
    } catch (err) {
      window.alert(err.message);
      return;
    }

    const payload = {
      email: email,
      password: password,
      fullname: fullName[0].toUpperCase() + fullName.slice(1),
    };

    await apis
      .createUser(payload)
      .then((res) => {
        window.alert(res.data.message);
        setEmail("");
        setPassword("");
        setFullName("");
        history.push("/login");
      })
      .catch((err) => {
        window.alert(err.response.data.errors.body);
      });
  };

  return (
    <div className="signup">
      <h1 className="heading">Sign Up</h1>
      <input
        type="text"
        value={email}
        onChange={handleEmailChange}
        placeholder="Email"
      ></input>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      ></input>
      <input
        type="text"
        value={fullName}
        onChange={handleFullNameChange}
        placeholder="Full Name"
      ></input>
      <p>
        Have an account?{" "}
        <Link to="/login">
          <span>Login</span>
        </Link>
      </p>
      <button onClick={handleSubmit}>Sign Up</button>
    </div>
  );
};

export default Signup;
