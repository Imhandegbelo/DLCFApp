import React, { useState } from "react";
import Input from "../components/Input";

export default function Login() {
  //   const [username, SetUsername] = useState("");
  let isLoading;
  const [errors, setErrors] = useState({ userError: "", passError: "" });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || formData.username.length < 3) {
      setErrors({ userError: "Username is required" });
      return;
    }
    if (!formData.password || formData.password.length < 3) {
      setErrors({ passError: "Don't try to login... Pray" });
      return;
    }
    console.log(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   return (
  //     <div>
  //       <form onSubmit={handleSubmit}>
  //         {/* <Input name="username" id="username" placeholder="username" onchange={""} /> */}
  //         <div className="c">
  //           <input
  //             type="text"
  //             name="username"
  //             value={formData.username}
  //             id="username"
  //             placeholder="username"
  //             onChange={handleInputChange}
  //           />
  //           <small className="text-rose-400 text-sm">{errors.userError}</small>
  //         </div>
  //         <div className="c">
  //           <input
  //             type="password"
  //             name="password"
  //             value={formData.password}
  //             id="password"
  //             placeholder="********"
  //             onChange={handleInputChange}
  //           />
  //           <small className="text-rose-400 text-sm">{errors.passError}</small>
  //         </div>
  //         <div className="c">
  //           <input type="submit" value="Login" className="" />
  //         </div>
  //       </form>
  //     </div>
  //   );
  return (
    <main className="flex flex-col md:flex-row">
      <div className="font-poppins md:w-5/12 bg-teal-500 flex justify-center items-center h-[30vh] md:h-screen">
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p className="md:mb-20 mt-4 w-10/12 mx-auto">
            To keep connected with your goals please login with personal info
          </p>
        </div>
      </div>
      
      <div className="md:w-7/12 flex justify-center pt-16 md:pt-0 md:items-center relative">
        {isLoading ? (
          //   <Spinner />
          ""
        ) : (
          <div className="w-11/12 md:w-3/5 text-center">
            <h1 className="font-bold text-4xl text-teal-500 tracking-[2px]">
              Login
            </h1>
            <p className="text-teal-900 mb-10">Login to start setting goals</p>
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <input
                  title="Username"
                  type="text"
                  autoComplete="false"
                  className="w-full bg-teal-50 py-2 px-4 text-xl"
                  value={formData.username}
                  name="username"
                  placeholder="Enter username"
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-3">
                <input
                  title="Password"
                  type="password"
                  autoComplete="false"
                  className="w-full bg-teal-50 py-2 px-4 text-xl"
                  value={formData.password}
                  name="password"
                  placeholder="Enter password"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mt-10 py-3">
                {/* <button className="flex gap-4 mx-auto items-center text-lg text-white py-3 px-20 bg-teal-500 border border-white rounded-l-full rounded-r-full hover:bg-teal-400 font-bold">
                  {/* <FaUser />
                  {isLoading ? (
                    <div className="bg-white rounded-full h-10 w-10">
                      <div className="border-b border-teal-400 animate-spin h-full w-full"></div>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button> */}
                <button className="flex gap-4 mx-auto items-center text-lg text-white py-3 px-20 bg-teal-500 border border-white rounded-l-full rounded-r-full hover:bg-teal-400 font-bold">
                  Login
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
