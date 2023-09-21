import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { buttonClick, staggerFadeInOut } from "../../animations";
import { getAllOrder } from "../../untils/helpers";
import { setOrders } from "../../stores/actions/ordersAction";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { MdAttachMoney } from "react-icons/md";

function OrderData({ index, data }) {
  const dispatch = useDispatch();

  const updateOrderSts = async (orderId, status) => {
    try {
      const orderRef = doc(db, "orders", orderId); // "orders" là tên collection, orderId là ID của đơn hàng

      await updateDoc(orderRef, { status: status }); // Cập nhật trạng thái của đơn hàng
      return true; // Trả về true nếu cập nhật thành công
    } catch (error) {
      console.error("Error updating order status:", error);
      return false; // Trả về false nếu có lỗi xảy ra
    }
  };

  const handleClick = (orderId, status) => {
    updateOrderSts(orderId, status).then((response) => {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
      });
    });
  };
  const currentPath = window.location.pathname;
  return (
    <motion.div
      {...staggerFadeInOut(index)}
      className="w-full flex flex-col items-start justify-start px-3 py-2 border relative border-gray-300 bg-lightOverlay drop-shadow-md rounded-md gap-4"
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl text-headingColor font-semibold">Orders</h1>

        <div className=" flex items-center gap-4">
          <p className="flex items-center gap-1 text-textColor">
            Total : <MdAttachMoney className="text-lg text-red-500" />{" "}
            <span className="text-headingColor font-bold">
              {data?.totalPrice.toFixed(2)}
            </span>
          </p>

          <p className="px-2 py-[2px] text-sm text-headingColor font-semibold capitalize  rounded-md bg-emerald-400 drop-shadow-md">
            {data?.status}
          </p>

          <p
            className={`text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md ${
              (data.sts === "preparing" && "text-orange-500 bg-orange-100") ||
              (data.sts === "cancelled" && "text-red-500 bg-red-100") ||
              (data.sts === "delivered" && "text-emerald-500 bg-emerald-100")
            }`}
          >
            {data?.sts}
          </p>

          {currentPath === "/dashboard/orders" && (
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg font-semibold text-headingColor">Mark As</p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.orderId, "preparing")}
                className={`text-orange-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Preparing
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.orderId, "cancelled")}
                className={`text-red-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Cancelled
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.orderId, "delivered")}
                className={`text-emerald-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Delivered
              </motion.p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-start flex-wrap w-full">
        <div className="flex items-center justify-center gap-4">
          {data?.products &&
            data.products.map((item, j) => (
              <motion.div
                {...staggerFadeInOut(j)}
                key={j}
                className="flex items-center justify-center gap-1"
              >
                <img
                  src={item.imageURL}
                  className="w-10 h-10 object-contain"
                  alt=""
                />

                <div className="flex items-start flex-col">
                  <p className="text-base font-semibold text-headingColor">
                    {item.product_name}
                  </p>
                  <div className="flex items-start gap-2">
                    <p className="text-sm text-textColor">
                      {" "}
                      Qty : {item.quantity}
                    </p>
                    <p className="flex items-center gap-1 text-textColor">
                      <MdAttachMoney className="text-base text-red-500" />
                      {parseFloat(item.product_price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

export default OrderData;
