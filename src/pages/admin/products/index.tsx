import ProductAdminView from "@/components/view/admin/products";
import { productServices } from "@/services/product";
import { useEffect, useState } from "react";

export default function AdminProductPage() {
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
      <ProductAdminView products={products} />
    </>
  );
}
