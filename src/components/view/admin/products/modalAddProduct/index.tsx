import ButtonAuth from "@/components/ui/button";
import Dropdown from "@/components/ui/dropdown";
import InputAuth from "@/components/ui/input";
import InputFile from "@/components/ui/inputFIle";
import Modal from "@/components/ui/modal";
import { uploadFile } from "@/lib/firebase/service";
import { productServices } from "@/services/product";
import { Product } from "@/types/product.type";
import { Spinner, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type Props = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

export default function ModalAddProduct({
  setModalAddProduct,
  setProductsData,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const session: any = useSession();
  const toast = useToast();

  const handleStock = (e: any, index: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[index][type] = e.target.value;
    setStockCount(newStockCount);
  };

  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "main." + file.name.split(".")[1];
    if (file) {
      uploadFile(
        id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await productServices.updateProduct(
              id,
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setModalAddProduct(false);
              const { data } = await productServices.getAllProducts();
              setProductsData(data.data);
              toast({
                title: "Success",
                description: "Product added successfully",
                status: "success",
              });
            } else {
              setIsLoading(false);
              toast({
                title: "Error",
                description: "Failed to add product",
                status: "error",
              });
            }
          } else {
            setIsLoading(false);
            toast({
              title: "Error",
              description: "Failed to upload image",
              status: "error",
            });
          }
        }
      );
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form: any = e.target as HTMLFormElement;
    const data = {
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
      status: form.status.value,
      stock: stockCount,
      image: "",
    };

    const result = await productServices.addProduct(
      data,
      session.data?.accessToken
    );
    console.log(result.data.data.id);

    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
    }
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)} className="max-w-5xl">
      <h2 className="text-xl font-bold">Update User</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 overflow-y-scroll h-[25rem]"
      >
        <div className="flex items-start gap-4 justify-between">
          <div className="space-y-4 w-1/2">
            <InputAuth
              className="text-gray-700"
              label="Product Name"
              name="name"
              type="text"
              placeholder="Insert Product Name"
            />
            <InputAuth
              className="text-gray-700"
              label="Price"
              name="price"
              type="number"
              placeholder="Insert Product Price"
            />
            <Dropdown
              label="Category"
              name="category"
              options={[
                { label: "Men", value: "men" },
                { label: "Women", value: "women" },
              ]}
            />
            <Dropdown
              label="Status"
              name="status"
              options={[
                { label: "Released", value: "true" },
                { label: "Not Released", value: "false" },
              ]}
            />
          </div>
          <div className="space-y-4 w-1/2">
            <label
              className="text-gray-700 text-lg font-semibold"
              htmlFor="stock"
            >
              Stock
            </label>
            {stockCount.map(
              (item: { size: string; qty: number }, index: number) => (
                <div key={index} className="flex items-center gap-4">
                  <InputAuth
                    label="Size"
                    name="size"
                    type="text"
                    onChange={(e) => handleStock(e, index, "size")}
                    className="text-gray-700"
                  />
                  <InputAuth
                    label="Quantity"
                    name="qty"
                    type="number"
                    onChange={(e) => handleStock(e, index, "qty")}
                    className="text-gray-700"
                  />
                </div>
              )
            )}
            <ButtonAuth
              type="button"
              onClick={() =>
                setStockCount([...stockCount, { size: "", qty: 0 }])
              }
            >
              Add New Stock
            </ButtonAuth>
          </div>
        </div>
        <InputFile
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          name="image"
        />
        <ButtonAuth type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Add Product"}
        </ButtonAuth>
      </form>
    </Modal>
  );
}
