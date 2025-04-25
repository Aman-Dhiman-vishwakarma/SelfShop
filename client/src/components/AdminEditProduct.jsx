import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEditeble } from "../redux/adminSlice";
import { MdDeleteOutline } from "react-icons/md";
import { MdEditNote } from "react-icons/md";

const AdminEditProduct = () => {
  const params = useParams();
  const [sizeorConfi, setSizeorConfi] = useState(true);
  const [size, setSize] = useState("");
  const [editSize, setEditSize] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const filesRef = useRef();
  const [images, setImages] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const naviget = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    discountPrice: "",
    discountPercentage: "",
    price: "",
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

  console.log(input);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

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
          stockAvailable: availableStock,
        },
      ],
    });
    setSize("");
    setAvailableStock("");
  };

  const sizeDelete = (name) => {
    const newSizes = input?.availableSizes.filter((s) => s.name !== name);
    console.log(newSizes);
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

  const getProductToEdit = async () => {
    try {
      setProductLoading(true);
      const res = await axios.get(
        `/api/product/productbyid/${params?.productId}`
      );
      if (res.data.success) {
        setProductLoading(false);
        setInput(res.data.product);
      }
    } catch (error) {
      setProductLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getProductToEdit();
  }, [params?.productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `/api/product/updateproduct/${params?.productId}`,
        input,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        setLoading(false);
        toast.success(res.data.message);
        naviget("/admin/allproducts");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  if (productLoading) {
    return (
      <div className="p-20 mt-10 text-center font-semibold">
        <span className="loading loading-spinner text-red-600 loading-xl"></span>
      </div>
    );
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[64%] mx-auto gap-6 px-6 py-10 mt-8 shadow-md"
      >
        <h1 className="text-center font-semibold text-2xl pb-2">
          Update your Product
          <p className="text-gray-600 text-sm p-2">Remenber all words have first letter should be capital!</p>
        </h1>
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-800" htmlFor="">
            Titlt
          </label>
          <input
            className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
            onChange={handleInput}
            value={input.title}
            type="text"
            name="title"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-800" htmlFor="">
            Description
          </label>
          <textarea
            className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
            onChange={handleInput}
            value={input.description}
            name="description"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-800" htmlFor="">
            DiscountPrice
          </label>
          <input
            className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
            onChange={handleInput}
            value={input.discountPrice}
            type="number"
            name="discountPrice"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-800" htmlFor="">
            DiscountPercentage
          </label>
          <input
            className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
            onChange={handleInput}
            value={input.discountPercentage}
            type="number"
            name="discountPercentage"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-800" htmlFor="">
            Price
          </label>
          <input
            className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
            onChange={handleInput}
            value={input.price}
            type="number"
            name="price"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-800" htmlFor="">
            Stock
          </label>
          <input
            className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
            onChange={handleInput}
            value={input.stock}
            type="number"
            name="stock"
            id=""
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-800" htmlFor="">
            Rating
          </label>
          <input
            className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
            onChange={handleInput}
            value={input.rating}
            type="number"
            name="rating"
            id=""
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-800" htmlFor="">
            Brand
          </label>
          <input
            className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
            onChange={handleInput}
            value={input.brand}
            type="text"
            name="brand"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-800" htmlFor="">
            Color
          </label>
          <input
            className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
            onChange={handleInput}
            value={input.color}
            type="text"
            name="color"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-800" htmlFor="">
            Category
          </label>
          <input
            className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
            onChange={handleInput}
            value={input.category}
            type="text"
            name="category"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-800" htmlFor="">
            TopLavelCategory
          </label>
          <input
            className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
            onChange={handleInput}
            value={input.topLavelCategory}
            type="text"
            name="topLavelCategory"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-800" htmlFor="">
            SecondLavelCategory
          </label>
          <input
            className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
            onChange={handleInput}
            value={input.secondLavelCategory}
            type="text"
            name="secondLavelCategory"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-800" htmlFor="">
            ThirdLavelCategory
          </label>
          <input
            className="px-3 py-2 outline-none rounded-md placeholder:text-gray-700 border-[1px] border-gray-700"
            onChange={handleInput}
            value={input.thirdLavelCategory}
            type="text"
            name="thirdLavelCategory"
          />
        </div>
        <select
          name="bestSeller"
          onChange={handleInput}
          defaultValue={input.bestSeller}
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
            <p className="font-medium">Update your sizes hear</p>
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

        {!loading ? (
          <button
            className="p-2 text-white rounded-md bg-red-500 font-semibold"
            type="submit"
          >
            Update Product
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

export default AdminEditProduct;
