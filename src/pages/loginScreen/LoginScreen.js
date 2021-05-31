import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../../components/redux/actions/auth.action";
import "./_loginScreen.scss";
function LoginScreen() {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((state) => state.authReducer.accessToken);
  const handleLogin = () => {
    dispatch(login());
  };
  useEffect(() => {
    if (accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://pngimg.com/uploads/youtube/youtube_PNG2.png"
          alt="luffy"
        />
        <button onClick={handleLogin}> Login with Google</button>
        <p>This project is made using Youtube API</p>
      </div>
    </div>
  );
}

export default LoginScreen;
