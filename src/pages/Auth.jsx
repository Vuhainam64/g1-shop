import { AiOutlineCheck } from "react-icons/ai";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Footer, Navbar } from "../layouts";
import { Login, SignUp } from "../components/Auth";
import { fadeInOut } from "../animations";
import { signInWithGoogle } from "../untils/helpers";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (alert) {
      const timeoutId = setTimeout(() => {
        setAlert(false);
        setAlertMessage("");
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [alert]);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="flex mt-6 mb-10">
          <div
            className={`w-full md:max-w-6xl mx-auto px-4 flex md:flex-row-reverse flex-wrap ${
              isLogin ? "" : "items-center"
            }`}
          >
            <div className="w-full md:w-1/2 md:p-6">
              <div className="border rounded-md p-6 shadow-md sticky top-4">
                <div>
                  {isLogin ? (
                    <>
                      <h2 className="font-semibold text-2xl">
                        Login to G1 Shop
                      </h2>
                      <small>Welcome back! Please enter your details.</small>
                      <Login
                        setAlert={setAlert}
                        setAlertMessage={setAlertMessage}
                      />
                    </>
                  ) : (
                    <>
                      <h2 className="font-semibold text-2xl">
                        Create an account
                      </h2>
                      <small>Sign up in less than 2 minutes.</small>
                      <SignUp
                        setAlert={setAlert}
                        setAlertMessage={setAlertMessage}
                      />
                    </>
                  )}
                  <AnimatePresence>
                    {alert && (
                      <motion.p
                        key={"Alert Message"}
                        {...fadeInOut}
                        className="text-red-500"
                      >
                        {alertMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-center gap-12">
                    <div className="h-[1px] bg-[rgba(15,6,6,0.2)] rounded-md w-24 m-5"></div>
                    <p className="text-sm text-[rgba(15,6,6,0.2)] m-5">OR</p>
                    <div className="h-[1px] bg-[rgba(15,6,6,0.2)] rounded-md w-24 m-5"></div>
                  </div>

                  <motion.div
                    onClick={signInWithGoogle}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center gap-3 bg-[rgba(2566,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(2566,256,256,0.4)] cursor-pointer border border-gray-500"
                  >
                    <FcGoogle className="text-3xl" />
                    <p className="text-xl  ">Sign In With Google</p>
                  </motion.div>

                  {isLogin ? (
                    <p className="text-gray-500 mt-4">
                      {" "}
                      Doesn't have an account?{" "}
                      <span
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-semibold ml-1 text-blue-500 text-base cursor-pointer"
                      >
                        Sign Up
                      </span>
                    </p>
                  ) : (
                    <p className="text-gray-500 mt-4">
                      {" "}
                      Already have an account?{" "}
                      <span
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-semibold ml-1 text-blue-500 text-base cursor-pointer"
                      >
                        Login
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* Context form  */}
            <div className="w-full md:w-1/2 md:p-6 mt-8 md:mt-0">
              <h1 className="font-bold text-3xl">
                {" "}
                The World at Your Fingertips - Connecting People, Anytime,
                Anywhere.{" "}
              </h1>
              <p className="text-gray-900 my-4 text-lg">
                {" "}
                The World at Your Fingertips{" "}
              </p>
              <div className="flex flex-wrap justify-center">
                <div className="flex items-center text-gray-400 text-sm  px-3 pb-3 ">
                  <AiOutlineCheck className=" text-blue-600 " />
                  <span>Unlimited forms</span>
                </div>
                <div className="flex items-center text-gray-400 text-sm  px-3 pb-3 ">
                  <AiOutlineCheck className=" text-blue-600" />
                  <span> Unlimited fields </span>
                </div>
                <div className="flex items-center text-gray-400 text-sm  px-3 pb-3 ">
                  <AiOutlineCheck className=" text-blue-600" />
                  <span>Unlimited responses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Auth;
