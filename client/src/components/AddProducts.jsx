import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [sizeorConfi, setSizeorConfi] = useState(true);
  const [size, setSize] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [editSize, setEditSize] = useState("");
  const filesRef = useRef();
  const [images, setImages] = useState([]);
  const [loding, setLoding] = useState(false);
  const naviget = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    discountPrice: "",
    price: "",
    discountPercentage: "",
    stock: "",
    rating: "",
    brand: "",
    color: "",
    category: "",
    topLavelCategory: "",
    secondLavelCategory: "",
    thirdLavelCategory: "",
    bestSeller: "",
    sku: "",
    availableSizes: [],
  });
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    setImages([...images, e.target.files[0]])
  }
  const handleSizes = (e) => {
    if (size === "" || availableStock === "") {
      return toast.error("Please Fill All Detail");
    }
    setInput({
      ...input,
      availableSizes: [
        ...input.availableSizes,
        {
          name: size.toUpperCase(),
          stockAvailable: availableStock.toUpperCase(),
        },
      ],
    });
    setSize("");
    setAvailableStock("");
  };

  console.log(input)
  const sizeDelete = (name) => {
    const newSizes = input?.availableSizes.filter((s) => s.name !== name);
    setInput({
      ...input,
      availableSizes: newSizes,
    });
  };

  const sizeEdit = (item) => {
    setSize(item.name);
    setAvailableStock(item.stockAvailable);
    setEditSize(item);
  };

  const handleEditSizes = () => {
    const newSize = input?.availableSizes?.map((item) => {
      if (item.name == editSize.name) {
        return { name: size.toUpperCase(), stockAvailable: availableStock };
      }
      return item;
    });
    setInput({
      ...input,
      availableSizes: newSize,
    });
    setSize("");
    setAvailableStock("");
    setEditSize("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      images?.length === 0 ||
      input.title === "" ||
      input.description === "" ||
      input.discountPrice === "" ||
      input.stock === "" ||
      input.category === ""
    ) {
      toast.error("All fields are required!");
      return;
    }
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("discountPrice", input.discountPrice);
    formData.append("discountPercentage", input.discountPercentage);
    formData.append("price", input.price);
    formData.append("stock", input.stock);
    formData.append("rating", input.rating);
    formData.append("brand", input.brand);
    formData.append("color", input.color);
    formData.append("category", input.category);
    formData.append("topLavelCategory", input.topLavelCategory);
    formData.append("secondLavelCategory", input.secondLavelCategory);
    formData.append("thirdLavelCategory", input.thirdLavelCategory);
    formData.append("bestSeller", input.bestSeller);
    formData.append("sku", input.sku);
    formData.append("availableSizes", JSON.stringify(input.availableSizes));
    // input?.availableSizes?.forEach((item) => formData.append("availableSizes", JSON.stringify(item)));
    Array.from(images).forEach((item) => formData.append("images", item));

    try {
      setLoding(true);
      const res = await axios.post("/api/product/createproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        setLoding(false);
        naviget("/")
        toast.success(res.data.message);
      }
    } catch (error) {
      setLoding(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[64%] mx-auto gap-6 px-6 py-10 mt-8 shadow-md"
      >
        <h1 className="text-center font-semibold text-2xl pb-2">
          Add your Product
          <p className="text-gray-600 text-sm p-2">
            Remenber all words have first letter should be capital!
          </p>
        </h1>
        <input
          className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
          onChange={handleInput}
          value={input.title}
          type="text"
          name="title"
          placeholder="Add Your Product Name..."
        />
        <textarea
          className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
          onChange={handleInput}
          value={input.description}
          name="description"
          placeholder="Write Your Product Discription..."
        ></textarea>
        <input
          className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
          onChange={handleInput}
          value={input.discountPrice}
          type="number"
          name="discountPrice"
          placeholder="Add Your Product Price..."
        />
        <input
          className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
          onChange={handleInput}
          value={input.price}
          type="number"
          name="price"
          placeholder="Add Your Product Old Price..."
        />
        <input
          className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
          onChange={handleInput}
          value={input.discountPercentage}
          type="number"
          name="discountPercentage"
          placeholder="Add Your Product discountPercentage..."
        />
        <input
          className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
          onChange={handleInput}
          value={input.stock}
          type="number"
          name="stock"
          id=""
          placeholder="Add Your Product Total Stock..."
        />
        <input
          className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
          onChange={handleInput}
          value={input.rating}
          type="number"
          name="rating"
          id=""
          placeholder="Add Your Product Rating..."
        />
        <input
          className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
          onChange={handleInput}
          value={input.brand}
          type="text"
          name="brand"
          placeholder="Add Your Product Brand..."
        />
        <input
          className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
          onChange={handleInput}
          value={input.color}
          type="text"
          name="color"
          placeholder="Add Your Product Color..."
        />
        <input
          className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
          onChange={handleInput}
          value={input.category}
          type="text"
          name="category"
          placeholder="Add Your Product Category..."
        />
        <input
          className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
          onChange={handleInput}
          value={input.topLavelCategory}
          type="text"
          name="topLavelCategory"
          placeholder="Add Your Product Top Lavel Category..."
        />
        <input
          className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
          onChange={handleInput}
          value={input.secondLavelCategory}
          type="text"
          name="secondLavelCategory"
          placeholder="Add Your Product Second Lavel Category..."
        />
        <input
          className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
          onChange={handleInput}
          value={input.thirdLavelCategory}
          type="text"
          name="thirdLavelCategory"
          placeholder="Add Your Product Third Lavel Category..."
        />
        <select
          name="bestSeller"
          onChange={handleInput}
          defaultValue="Product is BestSeller or Not"
          className="select border-[1px] border-gray-700"
        >
          <option disabled={true}>Product is BestSeller or Not</option>
          <option value={true}>true</option>
          <option value={false}>false</option>
        </select>
        <input
          className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
          onChange={handleInput}
          value={input.sku}
          type="text"
          style={{ textTransform: "uppercase" }}
          name="sku"
          placeholder="Sku Number..."
        />
        <div className="">
          <div className="flex items-center gap-4 list-none">
            <li
              className={`${
                !sizeorConfi && " border-red-600"
              } cursor-pointer border-[1px] px-3 py-2 text-red-700 shadow-md rounded-md font-semibold`}
              onClick={() => setSizeorConfi(!sizeorConfi)}
            >
              Have Sizes
            </li>
            <p className="font-medium">Add your sizes hear</p>
          </div>
          {!sizeorConfi && (
            <div className="flex gap-10 p-6 border-2 mt-2">
              <div className="">
                <div className="flex gap-2 items-center text-sm font-semibold">
                  <input
                    className="w-24 outline-none px-2 py-1 rounded-md placeholder:text-gray-800 border-[1px] border-gray-700"
                    onChange={(e) => setSize(e.target.value)}
                    type="text"
                    value={size}
                    name="size"
                    placeholder="Size"
                  />
                  :
                  <input
                    className="w-20 outline-none px-2 py-1 rounded-md placeholder:text-gray-800 border-[1px] border-gray-700"
                    onChange={(e) => setAvailableStock(e.target.value)}
                    type="number"
                    value={availableStock}
                    name="availableStock"
                    placeholder="Stock"
                  />
                </div>
                {!editSize ? (
                  <button
                    onClick={handleSizes}
                    className={`mt-2 w-full text-xs font-semibold text-white p-1 bg-red-600 rounded`}
                    type="button"
                  >
                    Add
                  </button>
                ) : (
                  <button
                    onClick={handleEditSizes}
                    className={`mt-2 w-full text-xs font-semibold text-white p-1 bg-green-600 rounded`}
                    type="button"
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-8">
                {input.availableSizes?.map((item, index) => (
                  <div
                    key={index}
                    className="flex h-9 px-1 items-center bg-gray-300 rounded-md"
                  >
                    <MdEditNote
                      onClick={() => sizeEdit(item)}
                      className=" cursor-pointer text-green-800 mr-1"
                      size="24"
                    />
                    <div className="text-lg font-semibold bg-white rounded-md px-2 py-[2px] shadow-sm border-[1px] border-gray-400">
                      {item?.name} : {item?.stockAvailable}
                    </div>
                    <MdDeleteOutline
                      onClick={() => sizeDelete(item?.name)}
                      className=" cursor-pointer text-red-600 ml-1"
                      size="22"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="">
          <div className="flex items-center gap-4">
            <span
              onClick={() => filesRef.current.click()}
              className="bg-white px-3 py-1 rounded-md cursor-pointer shadow-md border-[1px]"
            >
              <FaCloudUploadAlt size="38" color="red" />
            </span>
            <input
              onChange={handleImages}
              ref={filesRef}
              className="hidden"
              type="file"
              name=""
              id=""
              
            />
            <h1 className="font-medium">You Have to Upload 4 Images One By One!</h1>
          </div>
          {images.length !== 0 && (
            <div className="flex items-center gap-4 mt-4 border-2 p-2">
              {Array.from(images).map((item, index) => (
                <img
                  key={index}
                  className="h-16"
                  src={item ? URL.createObjectURL(item) : null}
                />
              ))}
            </div>
          )}
        </div>
        {!loding ? (
          <button
            className="p-2 text-white rounded-md bg-red-500 font-semibold"
            type="submit"
          >
            Add Product
          </button>
        ) : (
          <button
            className="p-2 text-white rounded-md bg-red-500 font-semibold"
            type="button"
          >
            <span className="loading loading-spinner text-white loading-md mr-2"></span>{" "}
            It's take few seconds...
          </button>
        )}
      </form>
    </div>
  );
};

export default AddProducts;
