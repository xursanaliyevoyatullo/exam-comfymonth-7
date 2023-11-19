import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/features/basketSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const userData = useSelector((state) => state.basket.userData);
    const email = userData ? userData.email : null;
    const password = userData ? userData.password : null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loginEmail == email && loginPassword == password) {
            dispatch(setUserData(userData));
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } else if (loginEmail != email && loginPassword == password) {
            console.log("Email is Incorrect!!!");
        } else {
            console.log("Email and Password are Incorrect!!!");
        }
    };

    const handleGuest = (e) => {
        e.preventDefault();
        dispatch(setUserData({ userName: "Demo User" }));
        localStorage.setItem("userData", JSON.stringify({ userName: "Demo User" }));
        navigate("/");
    };

    return (
        <div className="flex h-screen justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="p-7 mx-5 rounded-2xl shadow-xl w-[400px] max-w-full"
            >
                <h1 className="text-3xl font-bold mb-5 text-center text-yellow-400">Login</h1>
                <div className="mb-5">
                    <label className="label">
                        <span className="label-text text-yellow-400 text-xl">Email</span>
                    </label>
                    <input
                        onChange={(e) => setLoginEmail(e.target.value)}
                        type="text"
                        className="input input-bordered w-full"
                        value={loginEmail}
                        required
                    />
                </div>
                <div className="mb-7">
                    <label className="label">
                        <span className="label-text text-yellow-400 text-xl">Password</span>
                    </label>
                    <input
                        onChange={(e) => setLoginPassword(e.target.value)}
                        type="password"
                        className="input input-bordered w-full"
                        value={loginPassword}
                        required
                    />
                </div>
                <button className="btn btn-warning w-full mb-4">Login</button>
                <button onClick={handleGuest} className="btn btn-warning w-full mb-3">
                    Guest User
                </button>
            </form>
        </div>
    );
}

export default Login;
