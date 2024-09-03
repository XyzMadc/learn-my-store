type Props = {
  uploadedImage: File | null;
  name: string;
  setUploadedImage: any;
};

export default function InputFile({
  name,
  uploadedImage,
  setUploadedImage,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-4 w-full hover:bg-gray-200 transition-colors cursor-pointer">
      <input
        type="file"
        id={name}
        name={name}
        className="hidden"
        onChange={(e: any) => {
          e.preventDefault();
          setUploadedImage(e.target.files[0]);
        }}
      />
      <label
        htmlFor={name}
        className="cursor-pointer flex flex-col items-center text-gray-500"
      >
        {uploadedImage?.name ? (
          <p className="">{uploadedImage.name}</p>
        ) : (
          <>
            <p>Click to upload an image</p>
            <p className="mt-1 text-sm">
              Maximum size: <span className="font-semibold">1 MB</span>
            </p>
          </>
        )}
      </label>
    </div>
  );
}
