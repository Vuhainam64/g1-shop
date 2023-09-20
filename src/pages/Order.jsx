import { useDispatch, useSelector } from "react-redux";
import { Footer, Navbar } from "../layouts";
import { useEffect } from "react";
import { setOrders } from "../stores/actions/ordersAction";
import { OrderData } from "../components";
import { getAllOrder, getUserOrders } from "../untils/helpers";
import { auth } from "../config/firebase.config";

function Order() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const userId = auth.currentUser.uid;
  useEffect(() => {
    if (!orders) {
      getUserOrders(userId).then((data) => {
        dispatch(setOrders(data));
      });
    }
  }, [orders, dispatch, userId]);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className=" flex items-center justify-center flex-col pt-6 w-full gap-4">
        {orders ? (
          <>
            {orders.map((item, i) => (
              <OrderData key={i} index={i} data={item} admin={true} />
            ))}
          </>
        ) : (
          <>
            <h1 className="text-[72px] text-headingColor font-bold">No Data</h1>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Order;
