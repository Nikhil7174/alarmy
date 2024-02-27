import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/reducers/auth";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  //   const { isFetching, error }: any = useSelector((state: any) => state.user);
  const handleClick = (e: any) => {
    e.preventDefault();
    register(dispatch, { username, email, password });
    navigate("/");
  };
  return (
    <>
      <div className="relative">
        <div className="backdrop-blur-lg bg-slate-500/10 absolute inset-0 "></div>
        <img src="/img/bg9.jpg" alt="" className="h-screen w-full  " />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="" id="signUpForm">
            <div className="flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
                {/* <h2 className="text-2xl font-semibold mb-4">Sign Up</h2> */}
                <div className="items-center justify-center flex mb-5">
                  <img
                    src="/img/user3.png"
                    className="min-h-10 min-w-10 h-20 w-20 items-center justify-center"
                  />
                </div>
                <form onSubmit={handleClick}>
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                      onChange={(e: any) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                      onChange={(e: any) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                      onChange={(e: any) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        {/* <input type="checkbox" className="mr-2" /> */}
                        <a href="/login" className="text-indigo-500">
                          Login
                        </a>
                      </label>
                    </div>
                    <div>
                      <a href="#" className="text-sm text-indigo-500">
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-500 to-pink-400 ... text-white p-2 rounded-md hover:bg-blue-600"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
