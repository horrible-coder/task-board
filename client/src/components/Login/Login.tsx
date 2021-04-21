import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import apis from "../../api";
import { setUser } from "../../redux/users/actions";
import "./Login.scss";

export interface Props {}

const Login: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!email) throw new Error("Provide an email.");
      if (!password) throw new Error("Provide a password.");
    } catch (err) {
      window.alert(err.message);
      return;
    }

    const payload = {
      email: email,
      password: password,
    };

    await apis
      .loginUser(payload)
      .then((res) => {
        dispatch(setUser(res.data.fullname));
        setEmail("");
        setPassword("");
        history.push("/");
      })
      .catch((err) => {
        window.alert(err.response.data.errors.body);
      });
  };

  return (
    <div className="login">
      <h1 className="heading">Login</h1>
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
      <p>
        Don't have an account?{" "}
        <Link to="/signup">
          <span>Sign up</span>
        </Link>
      </p>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
