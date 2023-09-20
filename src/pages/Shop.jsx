import { useDispatch, useSelector } from "react-redux";
import { ProductLists } from "../components/Shop";
import { Footer, Navbar } from "../layouts";
import { useEffect } from "react";
import { getAllProducts } from "../services/api";
import { setAllProducts } from "../stores/actions/productActions";

function Shop() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, [products, dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ProductLists />
      <Footer />
    </div>
  );
}

export default Shop;
