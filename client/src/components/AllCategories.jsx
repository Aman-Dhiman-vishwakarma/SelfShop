import React, { useState } from "react";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setSections } from "../redux/sectionsSlice";

const AllCategories = () => {
  const { bottomSections } = useSelector((state) => state.sections);
  const [sectionArray, setSectionArray] = useState(null);
  const [sectionArrayInput, setSectionArrayInput] = useState(sectionArray);
  const [arrDeleteLoading, setArrDeleteLoading] = useState(false);
  const [indexArr, setIndexArr] = useState(null);
  const dispatch = useDispatch();

  const editSectionArr = async (section) => {
    const newArray = section.array.map((arr) => {
      if (arr == sectionArray.elm) {
        return sectionArrayInput.elm;
      }
      return arr;
    });
    const newSection = { ...section, array: newArray };
    console.log(newSection);
    try {
      setArrDeleteLoading(true);
      const res = await axios.put(
        `/api/topcategory/updatesection/${section._id}`,
        newSection,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        setArrDeleteLoading(false);
        dispatch(setSections(res.data.newSection));
        toast.success(res.data.message);
        setSectionArray(null);
        setSectionArrayInput(null);
      }
    } catch (error) {
      setArrDeleteLoading(false);
      setSectionArray(null);
      setSectionArrayInput(null);
      console.log(error);
    }
  };

  const deleteSectionArr = async (section, a) => {
    setIndexArr(a);
    const newArray = section.array.filter((arr) => arr !== a);
    const newSection = { ...section, array: newArray };
    try {
      setArrDeleteLoading(true);
      const res = await axios.put(
        `/api/topcategory/updatesection/${section._id}`,
        newSection,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        setArrDeleteLoading(false);
        dispatch(setSections(res.data.newSection));
        toast.success(res.data.message);
      }
    } catch (error) {
      setArrDeleteLoading(false);
      console.log(error);
    }
    console.log(newSection);
  };

  return (
    <div>
      <div className="mx-auto w-[90%]">
        {bottomSections.map((item, index) => (
          <div key={index} className=" shadow-md p-2 mb-4 border-[1px]">
            <h1 className="text-lg font-semibold">{item.category}</h1>
            <div className="flex gap-2 flex-wrap">
              {item.sections.map((s, i) => (
                <div
                  key={i}
                  className={`${
                    item.sections.length - 1 !== i && "border-r-2"
                  } py-2 pr-2`}
                >
                  <h2 className="text-base p-1 text-red-600 font-medium">
                    {s.name}
                  </h2>
                  <ul className="text-sm font-medium p-2">
                    {s.array.map(
                      (a, index) =>
                        sectionArray?.elm == a && sectionArray?.index == i ? (
                          <div key={index} className="">
                            <div className="px-1 flex justify-between rounded py-1 border-[1px] border-gray-300">
                              <input
                                onChange={(e) =>
                                  setSectionArrayInput({
                                    elm: e.target.value,
                                    index: i,
                                  })
                                }
                                value={sectionArrayInput?.elm}
                                className="outline-none"
                                type="text"
                              />
                              <span
                                onClick={() => {
                                  setSectionArray(null),
                                    setSectionArrayInput(null);
                                }}
                                className="px-1 cursor-pointer font-semibold bg-red-600 text-white rounded"
                              >
                                X
                              </span>
                              {arrDeleteLoading && sectionArray?.elm == a ? (
                                <span className="loading loading-spinner text-secondary loading-sm ml-2"></span>
                              ) : (
                                <span
                                  onClick={() => editSectionArr(s)}
                                  className="px-1 cursor-pointer text-sm font-semibold  bg-green-700 text-white rounded ml-1"
                                >
                                  Edit
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div key={index} className="">
                            <li className="p-[6px] flex justify-between gap-8">
                              {a}
                              <div className="flex gap-3">
                                <MdEditNote
                                  onClick={() => {
                                    setSectionArray({ elm: a, index: i }),
                                      setSectionArrayInput({
                                        elm: a,
                                        index: i,
                                      });
                                  }}
                                  size="22"
                                  className="text-green-800 cursor-pointer"
                                />{" "}
                                {arrDeleteLoading && indexArr == a ? (
                                  <span className="loading loading-spinner text-secondary loading-sm mr-2"></span>
                                ) : (
                                  <MdDeleteOutline
                                    onClick={() => deleteSectionArr(s, a)}
                                    size="20"
                                    className="text-red-700 cursor-pointer"
                                  />
                                )}
                              </div>
                            </li>
                          </div>
                        )

                      //   <div
                      //     key={index}
                      //     className="flex justify-between items-center gap-9"
                      //   >
                      //     <li className="p-[6px]">
                      //       {sectionArray?.elm == a &&
                      //       sectionArray?.index == i ? (
                      //         <div className="px-1 rounded py-1 border-[1px] border-gray-300">
                      //           <input
                      //             onChange={(e) =>
                      //                 setSectionArrayInput({
                      //                 elm: e.target.value,
                      //                 index:i
                      //               })
                      //             }
                      //             value={sectionArrayInput?.elm}
                      //             className="outline-none"
                      //             type="text"
                      //           />
                      //           X
                      //         </div>
                      //       ) : (
                      //         a
                      //       )}
                      //     </li>
                      //     <div className="flex gap-3">
                      //       <MdEditNote
                      //         onClick={() =>
                      //           {setSectionArray({ elm: a, index: i }), setSectionArrayInput({ elm: a, index: i })}
                      //         }
                      //         size="22"
                      //         className="text-green-800 cursor-pointer"
                      //       />{" "}
                      //       <MdDeleteOutline
                      //         size="20"
                      //         className="text-red-700 cursor-pointer"
                      //       />
                      //     </div>
                      //   </div>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
