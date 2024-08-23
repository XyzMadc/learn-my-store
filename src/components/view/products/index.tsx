import SidebarFilterProducts from "@/components/fragments/sidebarFilterProducts";
import { Product } from "@/types/product.type";
import { formatIDR } from "@/utils/currency";
import Image from "next/image";
import CardProduct from "./card";

type Props = {
  products: Product[];
};

export default function ViewProducts({ products }: Props) {
  return (
    <div className="flex">
      {/* Sidebar Filter */}
      <SidebarFilterProducts />

      {/* Product Grid */}
      <main className="w-3/4 p-4">
        <div className="grid grid-cols-3 gap-6">
          {/* Product 1 */}
          {products.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
