import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { fetchProducts } from "../store/productSlice";
import { STATUSES } from "../store/productSlice";

function Products() {
  const dispatch = useDispatch();

  // Alias as product1
  const { data: products1, status } = useSelector((state) => state.product);
  //   const [products1, setProducts] = useState([]);
  useEffect(() => {
    dispatch(fetchProducts());
    // const fetchProducts = async () => {
    //   const res = await fetch("https://dummyjson.com/products");
    //   const data = await res.json();
    //   console.log(data);
    //   setProducts(data.products);
    // };
    // fetchProducts();
  }, []);
  const handleadd = (product) => {
    // to add product in react store
    dispatch(add(product));
  };

  if (status === STATUSES.LOADING) {
    return (
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        LOADING...
      </h1>
    );
  }

  if (status === STATUSES.ERROR) {
    return <h1>Something went Wrong!</h1>;
  }
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
