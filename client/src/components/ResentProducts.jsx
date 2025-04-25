import React, { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";
import axios from "axios";
import SkeletonProduct from "./SkeletonProduct";

const ResentProducts = () => {
  const [resentproducts, setResentproducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getResentProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/product/getresentproducts");
      if (res?.data?.success) {
        setLoading(false);
        setResentproducts(res.data.resentProducts);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getResentProducts();
  }, []);

  if (loading) {
    return (
      <div className="">
        <h1 className="text-3xl font-semibold ml-2 p-6">Resent Products:</h1>
        <div className="w-[95%] mx-auto grid md:grid-cols-3 xl:grid-cols-5 justify-items-center pt-2 gap-y-6">
          {Array.from({ length: 5 }).map((i, index) => (
           <SkeletonProduct key={index}/>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-3xl font-semibold ml-2 p-6">Resent Products:</h1>
      <div className="w-[95%] mx-auto grid md:grid-cols-3 xl:grid-cols-5 justify-items-center pt-2 gap-y-6">
        {resentproducts.length !== 0 ? (
          resentproducts.map((item, index) => (
            <SingleProduct key={index} item={item} />
          ))
        ) : (
          <div>Not Found</div>
        )}
      </div>
    </div>
  );
};

export default ResentProducts;
