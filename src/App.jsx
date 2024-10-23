import { useState, useEffect } from "react";
import axios from "axios";
import { API_ROOT } from "./utils/constants";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_ROOT}/shop/products`, {
          proxy: 1,
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.statusText === "OK") {
          const products = res.data;

          setProducts(products);
          setIsLoading(true);
        }
      } catch (error) {
        console.log("API Context Error:", error);
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);
  return (
    <div className="App">
      <h1>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, est.
        Cupiditate a atque laboriosam ab praesentium nostrum molestias,
        similique sed architecto repellat minima consectetur quo accusantium
        perspiciatis unde quae deleniti.
      </h1>
      {isLoading && (
        <div>
          {products.map((p) => (
            <img src={p.images[0]} alt="" key={p._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
