import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice";

function Products() {
  const dispatch = useDispatch();
  const [products1, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      console.log(data);
      setProducts(data.products);
    };
    fetchProducts();
  }, []);
  const handleadd = (product) => {
    // to add product in react store
    dispatch(add(product));
  };

  console.log(products1);
  return (
    <div className="productsWrapper">
      {products1.length > 0 &&
        products1.map((product) => {
          return (
            <div className="card" key={product.id}>
              <img alt="" src={product.images[0]} />
              <h1>{product.title}</h1>
              <h1>{product.price}$</h1>
              <button onClick={() => handleadd(product)} className="btn">
                Add to cart
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default Products;
