import AdminLayout from "@/components/layouts/admin";
import ButtonAuth from "@/components/ui/button";
import { Product } from "@/types/product.type";
import { formatIDR } from "@/utils/currency";
import Image from "next/image";
import { useEffect, useState } from "react";
import ModalAddProduct from "./modalAddProduct";

type Props = {
  products: Product[];
};

export default function ProductsAdminView({ products }: Props) {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [modalAddProduct, setModalAddProduct] = useState(false);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <AdminLayout>
        <header>
          <h1 className="text-xl font-bold uppercase">product page</h1>
        </header>
        <ButtonAuth
          type="button"
          onClick={() => setModalAddProduct(true)}
          className="w-max bg-gray-800 hover:scale-105 text-gray-100"
        >
          <i className="bx bx-plus mr-2" />
          Add Product
        </ButtonAuth>
        <div className="shadow-lg rounded-lg overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="w-1/12 text-center py-4 px-4 uppercase font-semibold text-sm border">
                  #
                </th>
                <th className="w-2/12 text-center py-4 px-4 uppercase font-semibold text-sm border">
                  Image
                </th>
                <th className="w-3/12 text-center py-4 px-4 uppercase font-semibold text-sm border">
                  Name
                </th>
                <th className="w-2/12 text-center py-4 px-4 uppercase font-semibold text-sm border">
                  Category
                </th>
                <th className="w-2/12 text-center py-4 px-4 uppercase font-semibold text-sm border">
                  Price
                </th>
                <th className="w-2/12 text-center py-4 px-4 uppercase font-semibold text-sm border">
                  Size
                </th>
                <th className="w-2/12 text-center py-4 px-4 uppercase font-semibold text-sm border">
                  Qty
                </th>
                <th className="w-2/12 text-center py-4 px-4 uppercase font-semibold text-sm border">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-900 bg-neutral-100">
              {productsData.map((product: any, index: number) => (
                <tr
                  key={index}
                  className="border-b border-gray-300 hover:bg-gray-100"
                >
                  <td className="text-center py-4 px-4">1</td>
                  <td className="py-4 px-4 text-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="mx-auto"
                    />
                  </td>
                  <td className="py-4 px-4 text-left">{product.name}</td>
                  <td className="py-4 px-4 text-center">{product.category}</td>
                  <td className="py-4 px-4 text-center">
                    {formatIDR(product.price)}
                  </td>
                  <td className="py-4 px-4 text-center align-center">
                    {product.stock.map((item: any, index: number) => (
                      <div key={index} className="mb-1">
                        {item.size}
                      </div>
                    ))}
                  </td>
                  <td className="py-4 px-4 text-center align-center">
                    {product.stock.map((item: any, index: number) => (
                      <div key={index} className="mb-1">
                        {item.qty}
                      </div>
                    ))}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      type="button"
                      className="text-blue-800 hover:text-blue-600 mx-2 text-2xl"
                      aria-label="Edit"
                    >
                      <i className="bx bxs-edit" />
                    </button>
                    <button
                      type="button"
                      className="text-red-800 hover:text-red-600 mx-2 text-2xl"
                      aria-label="Delete"
                    >
                      <i className="bx bxs-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {modalAddProduct && (
        <ModalAddProduct
          setModalAddProduct={setModalAddProduct}
          setProductsData={setProductsData}
        />
      )}
    </>
  );
}
