import { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { auth, db } from "./config/firebase.config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { SET_USER } from "./stores/actions/userActions";
import { Auth, Order, PageNotFound, Shop } from "./pages";
import { Cart, Spinner } from "./components";
import Home from "./pages/Home";
import { VerifyPopup } from "./components/Auth";
import { Detail } from "./components/Shop";
import { setCartItems } from "./stores/actions/cartAction";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const dispatch = useDispatch();
  const userId = auth.currentUser?.uid;
  const isCart = useSelector((state) => state.isCart);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (userCred) => {
        if (userCred) {
          setIsLogin(true);
          console.log(userCred?.providerData[0]);
          setDoc(
            doc(db, "user", userCred?.uid),
            userCred?.providerData[0]
          ).then(() => {
            dispatch(SET_USER(userCred?.providerData[0]));
            if (userCred.emailVerified) {
              setIsEmailVerified(true);
              navigate("/home", { replace: true });
            } else {
              setIsEmailVerified(false);
              navigate("/auth", { replace: true });
            }
          });
        } else {
          navigate("/auth", { replace: true });
        }

        setInterval(() => {
          setIsLoading(false);
        }, 1000);
      },
      [dispatch, navigate]
    );
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(userId);
    const fetchCartItems = async () => {
      try {
        const docRef = collection(db, `cartItems/${userId}/items`);
        const querySnapshot = await getDocs(docRef);

        const items = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            productId: data.productId,
            product_name: data.product_name,
            product_category: data.product_category,
            product_price: data.product_price,
            imageURL: data.imageURL,
            quantity: data.quantity,
          });
        });

        dispatch(setCartItems(items)); // Update the state with the retrieved cart items
        console.log("User's cart items:", items);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    if (userId) {
      fetchCartItems(); // Call the function to fetch cart items
    }
  }, [userId, dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white dark:bg-notion-dark">
          <Routes>
            <Route path="/404" element={<PageNotFound />} />
            <Route path="/home/*" element={<Home />} />
            <Route path="/shop/*" element={<Shop />} />
            <Route path="/shop/:id" element={<Detail />} />

            {!isLogin && (
              <>
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<Navigate to="/auth" />} />
              </>
            )}

            {isLogin && !isEmailVerified && (
              <>
                <Route path="/verify" element={<VerifyPopup />} />
                <Route path="*" element={<Navigate to="/verify" />} />
              </>
            )}

            {isLogin && isEmailVerified && (
              <>
                <Route path="/order" element={<Order />} />
              </>
            )}

            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          {isCart && <Cart />}
        </div>
      )}
    </>
  );
}

export default App;
