import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Props = {
  uploadedImage: File | any;
  name: string;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
};

export default function InputFile({
  uploadedImage,
  name,
  setUploadedImage,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-gray-700 text-lg font-semibold">Image</label>
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-4 w-full hover:bg-gray-200 transition-colors cursor-pointer">
        <input
          type="file"
          className="hidden"
          id={name}
          name={name}
          onChange={(e: any) => {
            e.preventDefault();
            setUploadedImage(e.currentTarget.files[0]);
          }}
        />
        <label
          htmlFor={name}
          className="cursor-pointer flex flex-col items-center"
        >
          {uploadedImage ? (
            <Image
              src={uploadedImage.image}
              alt="Avatar Preview"
              className="rounded-lg max-h-48 object-cover mb-2"
            />
          ) : (
            <>
              <p className="text-gray-500">
                Upload a new avatar, larger image will be resized automatically
              </p>
              <p className="text-gray-500 mt-1 text-sm">
                Maximum upload size is{" "}
                <span className="font-semibold">1 MB</span>
              </p>
            </>
          )}
        </label>
        {uploadedImage && (
          <p className="mt-2 text-gray-500 text-sm">{uploadedImage.name}</p>
        )}
      </div>
    </div>
  );
}
