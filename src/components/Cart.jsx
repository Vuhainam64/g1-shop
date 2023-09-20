import { motion } from "framer-motion";
import { buttonClick, slideIn } from "../animations";
import { Link } from "react-router-dom";
import { setCartOff } from "../stores/actions/displayCartAction";
import { FcClearFilters } from "react-icons/fc";
import { BiChevronsRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.forEach((item) => {
        tot += item.product_price * item.quantity;
      });
      setTotal(tot);
    }
  }, [cart]);

  return (
    <motion.div
      {...slideIn}
      className="relative z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between ">
                    <motion.i
                      {...buttonClick}
                      className="cursor-pointer"
                      onClick={() => dispatch(setCartOff())}
                    >
                      <BiChevronsRight className="text-4xl text-textColor" />
                    </motion.i>
                    <h2 className="text-lg font-medium text-gray-900">
                      Shopping Cart
                    </h2>
                    <motion.i {...buttonClick} className="cursor-pointer">
                      <FcClearFilters className="text-2xl text-textColor" />
                    </motion.i>
                  </div>

                  {/* order list */}
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {cart.map((item) => (
                          <li key={item.productId} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.imageURL}
                                alt={item.product_name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <Link to="#">{item.product_name}</Link>
                                  </h3>
                                  <p className="ml-4">${item.product_price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.product_category}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  Qty {item.quantity}
                                </p>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* total + checkout */}
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500 px-2"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Cart;
