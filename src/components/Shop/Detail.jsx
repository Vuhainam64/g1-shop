import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";
import { AiFillHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Footer, Navbar } from "../../layouts";
import { motion } from "framer-motion";
import { buttonClick } from "../../animations";
import { auth, db } from "../../config/firebase.config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { setCartItems } from "../../stores/actions/cartAction";

function Detail() {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products?.products?.find((item) => item.id === parseInt(id))
  );
  const cart = useSelector((state) => state.cart);
  const userId = auth.currentUser?.uid;
  const dispatch = useDispatch();

  const sendToCart = async () => {
    console.log("add cart");
    console.log(userId);
    try {
      const docRef = doc(db, `cartItems/${userId}/items`, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const quantity = docSnap.data().quantity + 1;
        await updateDoc(docRef, {
          quantity,
        });
      } else {
        const data = {
          productId: id,
          product_name: product.title,
          product_category: product.category,
          product_price: product.price,
          imageURL: product.image,
          quantity: 1,
        };

        // Dispatch the action to update the cart in Redux store
        dispatch(setCartItems([...cart, data]));
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (!product) {
    return <Spinner />;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={product?.title}
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.brand}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <div className="flex mb-4">
                {/* Star rating icons here */}
                <span className="text-gray-600 ml-3">
                  {product.rating.rate} star
                </span>
              </div>
              <p className="leading-relaxed">{product.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {/* Color options buttons here */}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  {/* Size select dropdown here */}
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${product.price}
                </span>
                <button
                  onClick={sendToCart}
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                >
                  Add to Cart
                </button>
                <motion.div
                  {...buttonClick}
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                >
                  <AiFillHeart className="text-lg" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
