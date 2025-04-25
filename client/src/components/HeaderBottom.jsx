import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQuery, setvalues } from "../redux/sectionFilterSlice";
import { setBottomSections } from "../redux/sectionsSlice";

const HeaderBottom = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const [showIndex, setShowIndex] = useState(-1);
  // const  [bottomSections, setBottomSections] = useState([]);
  const {bottomSections, section} = useSelector((state)=>state.sections)
  const naviget = useNavigate();
  const dispatch = useDispatch();
  const { firstC, secondC, thirdC, query } = useSelector(
      (store) => store.sectionfilter
    );

  const handleShow = (index) => {
    setShowIndex(index);
  };

  const getAllSections = async () => {
    try {
      const res = await axios.get("/api/topcategory/alltopcategorys");
      if (res?.data?.success) {
        dispatch(setBottomSections(res.data.allTopCategorys))
        // setBottomSections(res.data.allTopCategorys)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllSections();
  }, [section])

  const handleSection = (top, second, third) => {
    dispatch(setvalues({top, second, third}))
    setShowIndex(-1)
    naviget(`/allproducts/${top}/${second ? second : third}`)
  }

  return (
    <div className="lg:flex justify-center relative items-center px-10 border-b-[1px] border-gray-300 hidden">
      <div className="flex w-[95%] items-center px-2 overflow-y-scroll no-scrollbar">
        {bottomSections?.map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => handleShow(index)}
            onMouseLeave={() => handleShow(-1)}
            className=" text-gray-700 px-3 font-medium py-2 text-nowrap list-none border-b-4 border-transparent cursor-pointer hover:border-b-4 hover:border-red-600 hover:text-red-600"
          >
            {item?.category}
            {index == showIndex && (
              <div className="w-[90%] flex gap-4 absolute left-20 top-[42px] mx-auto z-40 bg-white shadow-md">
                {item?.sections?.map((s, i)=> <div key={i} className={`p-4 ${i%2 == 0 ? "bg-white" : "bg-red-50"}`}>
                        <h1 className="text-md mb-2 font-semibold hover:underline" onClick={() => handleSection(item?.category, s.name, null)}>{s.name}</h1>
                        <ul className="text-gray-600 text-sm">
                            {s?.array?.map((a, i)=><li key={i} onClick={() => handleSection(item?.category, null, a)} className="py-1 hover:text-gray-900">{a}</li>)}
                            
                        </ul>
                    </div>)
                
                }
              </div>
            )}
          </li>
        ))}
      </div>
    </div>
  );
};

export default HeaderBottom;
