import axios from "axios";

export const baseURL = "https://6506aea73a38daf4803e98b7.mockapi.io/store";

// add new product
export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/Products`, {
      ...data,
    });
    return res.data;
  } catch (err) {
    return null;
  }
};

// get all the products
export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseURL}/Products`);
    console.log("Product items: ", res.data);
    return res.data;
  } catch (err) {
    return null;
  }
};

// delete a product
export const deleteAProduct = async (productId) => {
  try {
    const res = await axios.delete(`${baseURL}/${productId}`);
    return res.data;
  } catch (err) {
    return null;
  }
};