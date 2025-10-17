import { signOut } from "@firebase/auth";
import { auth, firestore } from "./config/firebase";
import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";

export default function Home(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDocs(collection(firestore, "products"));
      const data = [];
      result.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        data.push({ id: doc.id, ...doc.data() });
      });
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={() => signOut(auth)}>Logout</button>
      <p>Welcome {props.user.uid}!</p>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </>
  );
}
