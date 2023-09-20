import { Link } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";
import { Footer, Navbar } from "../layouts";
import { BackgroundPattern, ViewFeedBack } from "../assets/img";

function Home() {
  return (
    <div className="main-layout min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <section className="bg-gradient-to-b relative from-white to-gray-100 py-12 sm:py-16 lg:py-20 xl:py-24">
          <div className="absolute inset-0">
            <img
              src={BackgroundPattern}
              alt="Background"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative -mb-32 md:-mb-52 lg:-mb-72">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight">
                Easy to shoping with{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  {" "}
                  G1 Shop
                </span>
              </h1>
              <p className="mt-4 sm:mt-5 text-base leading-7 sm:text-xl sm:leading-9 font-medium text-gray-500">
                If you have problems about the facilities you can easily send us
                feedback now <span className="font-bold">it's free</span>
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  to={"/shop"}
                  className="mr-1 v-btn py-2 px-4
                  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200
                  text-white transition ease-in duration-200 text-center text-base font-medium focus:outline-none focus:ring-2
                  focus:ring-offset-2 rounded-lg flex items-center hover:no-underline"
                >
                  <span className="no-underline mx-auto">
                    Already to shoping NOW{" "}
                  </span>
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 w-3 h-3 inline"
                  >
                    <path
                      d="M1 11L11 1M11 1H1M11 1V11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </Link>
              </div>
              <div className="justify-center flex gap-2 mt-10">
                <div className="flex items-center text-gray-400 text-sm">
                  <AiOutlineCheck className=" text-blue-600" />{" "}
                  <span>Unlimited forms</span>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <AiOutlineCheck className=" text-blue-600" />{" "}
                  <span> Unlimited fields </span>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <AiOutlineCheck className=" text-blue-600" />{" "}
                  <span>Unlimited responses</span>
                </div>
              </div>
            </div>
            <div className="w-full mt-8 relative px-6 mx-auto max-w-4xl sm:px-10 lg:px-0 z-10 flex items-center justify-center">
              <img
                src={ViewFeedBack}
                alt="cover-product"
                className="w-full shadow-2xl rounded-xl block max-w-2xl lg:max-w-5xl"
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
