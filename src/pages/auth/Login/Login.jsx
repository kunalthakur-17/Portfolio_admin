import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import backgroundImage from "../../../assets/images/login_background.png";
import logoImage from "../../../assets/images/app_logo.png";
import { loginAction } from "../../../redux/auth/action";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user, loading } = useSelector((state) => state.loginReducer);

    const store = useSelector((state) => state);

    const loginReducer = store?.loginReducer;
    const user = loginReducer?.user;

    console.log("loginReducer", loginReducer);

  useEffect(()=>{
    if(user){
      if(user.role === "admin"){
        navigate("/dashBoard", { replace: true });
      }
    }
  },[user, navigate]);
  

  const handleLogin = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!credentials.username) newErrors.username = "Email is required";
    if (!credentials.password) newErrors.password = "Password is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    dispatch(loginAction({ email: credentials.username, password: credentials.password }));
  };



  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
      }}
    >
      {/* DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      ></div>

      <div className="container" style={{ zIndex: 2 }}>
        <div className="row" style={{ minHeight: "100vh" }}>
          {/* LEFT SECTION */}
          <div className="col-6 d-flex justify-content-center align-items-center">
            <div className="text-center text-white">
              <img
                src={logoImage}
                alt="Logo"
                width="159"
                height="238"
                className="mb-4"
              />
              <h2 style={{ fontSize: "37px", fontWeight: "700" }}>
                Lorem Ipsum is simply
              </h2>
              <p style={{ fontSize: "20px" }}>Lorem Ipsum is simply</p>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-6 d-flex justify-content-center align-items-center">
            <Card
                style={{
                  width: "539px",
                  borderRadius: "15px",
                  padding: "35px",
                  boxShadow: "0 4px 35px rgba(0,0,0,0.25)",
                  background: "rgba(255,255,255,0.97)",
                }}
              >
                <div className="row">
                  <div className="col-9">
                    <p className="mb-0" style={{ fontSize: "21px" }}>
                      Welcome to{" "}
                      <span className="text-danger fw-bold">Chapel farm</span>
                    </p>
                    <p className="mb-4" style={{ fontSize: "31px" }}>
                      Sign in
                    </p>
                  </div>
                </div>

                <form onSubmit={handleLogin}>
                  {/* USERNAME */}
                  <div className="mb-3">
                    <label className="form-label">
                      Enter your email address
                    </label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="Email"
                      value={credentials.username}
                      onChange={(e) => {
                        setCredentials({
                          ...credentials,
                          username: e.target.value.trimStart(),
                        });
                        setErrors({ ...errors, username: "" });
                      }}
                    />
                    {errors.username && <small className="text-danger">{errors.username}</small>}
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-2">
                    <label className="form-label">Password</label>
                    <div className="position-relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control custom-input"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => {
                          setCredentials({
                            ...credentials,
                            password: e.target.value.trimStart(),
                          });
                          setErrors({ ...errors, password: "" });
                        }}
                      />
                      <button
                        type="button"
                        className="btn position-absolute"
                        style={{
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          border: "none",
                          background: "transparent",
                          padding: "0",
                          color: "#6c757d",
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                  </div>

                 

                  <button
                    type="submit"
                    className="btn w-100 mt-5 text-white"
                    style={{
                      background:
                        "linear-gradient(to bottom, #800020, rgb(159 35 25))",
                      border: "none",
                      padding: "12px",
                      borderRadius: "8px",
                      fontSize: "16px",
                      height: "54px",
                    }}
                  >
                    Sign in
                  </button>
                </form>
              </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;