import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth, db } from "../config/firebase.config";
import { v4 as uuidv4 } from "uuid";
import { collection, getDocs, query, where } from "firebase/firestore";

const googleProider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, googleProider).then((useCred) => {
    window.location.reload();
  });
};

export const Menus = [
  { id: uuidv4(), name: "My Orders", uri: "/order" },
  { id: uuidv4(), name: "Settings", uri: "/setting" },
];

export const signOutAction = async () => {
  await auth.signOut().then(() => {
    window.location.reload();
  });
};

export const getAllOrder = async () => {
  try {
    const ordersRef = collection(db, "orders"); // Replace "orders" with your Firestore collection name
    const ordersQuery = query(ordersRef);

    const querySnapshot = await getDocs(ordersQuery);
    const orders = [];

    querySnapshot.forEach((doc) => {
      const orderData = doc.data();
      orders.push(orderData);
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getUserOrders = async (userId) => {
  try {
    const ordersRef = collection(db, "orders"); // Replace "orders" with your Firestore collection name
    const ordersQuery = query(ordersRef, where("userId", "==", userId)); // Filter orders by userId

    const querySnapshot = await getDocs(ordersQuery);
    const orders = [];

    querySnapshot.forEach((doc) => {
      const orderData = doc.data();
      orders.push(orderData);
    });

    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};
