import { productServices } from "@/services/product";
import { useEffect, useState } from "react";
import ViewProducts from "../../components/view/products";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <ViewProducts products={products} />
    </>
  );
}
