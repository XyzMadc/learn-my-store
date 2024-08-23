import { Product } from "@/types/product.type";
import { formatIDR } from "@/utils/currency";
import Image from "next/image";

type Props = {
  product: Product;
  key: string;
};

export default function CardProduct({ product, key }: Props) {
  return (
    <div key={key} className="bg-white p-4">
      <div className="relative h-64">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.category}</p>
        <p className="text-lg font-semibold mt-2">{formatIDR(product.price)}</p>
      </div>
    </div>
  );
}
