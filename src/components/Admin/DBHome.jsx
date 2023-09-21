import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CChart } from "@coreui/react-chartjs";
import { getAllProducts } from "../../services/api";
import { setAllProducts } from "../../stores/actions/productActions";
import { getAllOrder } from "../../untils/helpers";
import { setOrders } from "../../stores/actions/ordersAction";

function DBHome() {
  const products = useSelector((state) => state.products?.products);
  const orders = useSelector((state) => state.orders?.orders);
  const dispatch = useDispatch();

  // State để lưu danh sách category và số lượng sản phẩm theo category
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, [products, dispatch]);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: categories,
                datasets: [
                  {
                    label: "Category wise Count",
                    backgroundColor: "#f87979",
                    data: categoryCounts,
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    ticks: {
                      stepSize: 1, // Chỉ số bước nhảy giữa các giá trị trên trục y
                      precision: 0, // Số chữ số sau dấu phẩy (không có số thập phân)
                    },
                  },
                },
              }}
              labels="months"
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              data={{
                labels: ["Orders", "Delivered", "Preparing", "Cancelled"],
                datasets: [
                  {
                    backgroundColor: [
                      "#51FF00",
                      "#00B6FF",
                      "#008BFF",
                      "#FFD100",
                      "#FF00FB",
                    ],
                    data: [
                      // delivered?.length + cancelled?.length + preparing?.length,
                      // delivered?.length,
                      // preparing?.length,
                      // cancelled?.length,
                    ],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DBHome;
