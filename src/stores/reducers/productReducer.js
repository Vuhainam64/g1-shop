function productReducer(state = null, action) {
  switch (action.type) {
    case "SET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.products,
      };
    case "GET_ALL_PRODUCTS_NULL":
      return {
        ...state,
        products: null,
      };
    default:
      return state;
  }
};

export default productReducer;