import React, { useEffect, useState } from 'react'
import SingleProduct from './SingleProduct';
import axios from 'axios';

const BestSeller = () => {
    const [resentproducts, setResentproducts] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const getResentProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/product/getbestsellerproducts");
        if (res?.data?.success) {
          setLoading(false);
          setResentproducts(res.data.bestsellerProducts);
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
          <h1 className="text-3xl font-medium ml-2 p-6">Bestseller Products:</h1>
          <div className="w-[95%] mx-auto grid md:grid-cols-3 xl:grid-cols-5 justify-items-center pt-2 gap-y-6">
            {Array.from({ length: 5 }).map((i, index) => (
              <div key={index} className="flex w-52 flex-col gap-3">
                <div className="skeleton h-60 w-full"></div>
                <div className="flex justify-between">
                  <div className="skeleton h-4 w-[80%]"></div>{" "}
                  <div className="skeleton h-4 w-[15%]"></div>
                </div>
                <div className="skeleton h-3 w-full"></div>
                <div className="flex gap-6">
                  <div className="skeleton h-6 w-20"></div>{" "}
                  <div className="skeleton h-6 w-24"></div>
                </div>
                <div className="skeleton h-5 w-28"></div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  
    return (
      <div className="">
        <h1 className="text-3xl font-medium ml-2 p-6">Bestseller Products:</h1>
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
}

export default BestSeller
