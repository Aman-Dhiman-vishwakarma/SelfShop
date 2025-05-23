import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import SingleProduct from "../components/SingleProduct";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../redux/productSlice";
import Paginetion from "../components/Paginetion";
import { setQuery } from "../redux/sectionFilterSlice";
import SkeletonProduct from "../components/SkeletonProduct";

const sortOptions = [
  {
    id: "price",
    name: "Low to High",
    value: "asce",
    href: "#",
    current: false,
  },
  {
    id: "price",
    name: "High to Low",
    value: "desc",
    href: "#",
    current: false,
  },
];



const gender = ["Men", "Women Ethnic", "Women Western", "Kids", "Girls"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AllProducts = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const naviget = useNavigate();
  const dispatch = useDispatch();
  const { allProducts } = useSelector((store) => store.product);
  const { firstC, secondC, thirdC } = useSelector(
    (store) => store.sectionfilter
  );
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [page, setPage] = useState(1);
  const productsInPage = 10;
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  // const {top, second, third} = useParams();
  let filterValue = null;
 
  const handleFilter = (sectionId, value) => {
    filterValue = urlParams.getAll(sectionId);
    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((p) => p !== value);

      if (filterValue.length == 0) {
        urlParams.delete(sectionId);
      }
    } else {
      filterValue.push(value);
    }
    if (filterValue.length > 0) {
      urlParams.set(sectionId, filterValue.join(","));
    }
    dispatch(setQuery(urlParams.toString()))
    naviget(`/allproducts/${firstC || ""}${secondC ? `/${secondC}` : "" }${thirdC ? `/${thirdC}` : "" }?${urlParams.toString()}`);
    getProducts();
  };



  const handleShort = (or) => {
    urlParams.set("order", or);
    naviget(`/allproducts/${firstC || ""}${secondC ? `/${secondC}` : "" }${thirdC ? `/${thirdC}` : "" }?${urlParams.toString()}`);
    getProducts();
  }

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/product/getproducts?startIndex=${
          (page - 1) * productsInPage
        }&limit=${productsInPage}&${urlParams.toString()}&topLavelCategory=${
          firstC || ""
        }&secondLavelCategory=${secondC || ""}&thirdLavelCategory=${
          thirdC || ""
        }`
      );

      if (res?.data.success) {
        setLoading(false);
        dispatch(setAllProducts(res.data.products));
        setTotalProductCount(res.data.totalProducts);
      }
    } catch (error) {
      setLoading(false);
    }
  };


  useEffect(() => {
    getProducts();
    fetchAllBrands();


    return()=>{
      filterValue = null       
    }
  }, [page, firstC, secondC, thirdC, location.search]);

  const handlePage = (page) => {
    setPage(page);
  };

  const fetchAllBrands = async () => {
    try {
      const {data} = await axios.get("/api/brand/getallbrands")
      if (data.success) {
        setBrands(data.brands)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const filters = [
    {
      id: "brand",
      name: "Brand",
      options: brands
    },
   
  ];


  return (
    <div className="bg-white lg:px-12">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-18">
            <h1 className="text-3xl font-medium tracking-tight text-gray-800 pt-4">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={() =>
                                handleShort(option.value)
                              }
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900 cursor-pointer"
                                  : "text-gray-500 cursor-pointer",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-4">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <form className="hidden lg:block">
                <div className="border-b-[1px] border-gray-200 pb-3">
                  <Link to="/allproducts" className="text-white font-semibold text-sm rounded-md bg-green-700 mb-2 px-2 py-[6px]">Clear Filters</Link>
                  {/* <h1 className="text-lg font-medium mt-2 mb-4">Products you Looking:</h1> */}
                  <div className=" flex flex-wrap gap-4 mt-5">
                    {gender.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => handleFilter("gender", item)}
                        className={`px-3 py-1 ${(urlParams.get("gender")?.split(",").includes(item)) ? "border-red-500 border-2 text-red-600 bg-red-50" : "border-red-100 border-2"} rounded-full list-none font-semibold cursor-pointer`}
                      >
                        {item}
                      </li>
                    ))}
                  </div>
                </div>
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  checked={(urlParams.get(section.id)?.split(",").includes(option.value)) ? true : false}
                                  onChange={() =>
                                    handleFilter(section.id, option.value)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.lable}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              {!loading ? (
                <div className="lg:col-span-4 flex flex-wrap justify-between md:justify-normal">
                  <div className="lg:grid lg:grid-cols-4 gap-10 mx-auto ">
                    {allProducts?.length !== 0 ? (
                      allProducts?.map((item, index) => (
                        <SingleProduct key={index} item={item} />
                      ))
                    ) : (
                      <div className="flex justify-center items-center font-semibold text-xl col-span-3">
                        Products Not Found
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="lg:col-span-4 flex flex-wrap justify-between md:justify-normal">
                  <div className="lg:grid lg:grid-cols-4 gap-10 mx-auto ">
               {Array.from({length:8}).map((i, index)=><SkeletonProduct key={index}/>)}
               </div>
               </div>
              )}
            </div>
          </section>
          {/* {section of products ad filter end heare} */}
          <Paginetion
            totalProductCount={totalProductCount}
            productsInPage={productsInPage}
            handlePage={handlePage}
            page={page}
          />
        </main>
      </div>
    </div>
  );
};

export default AllProducts;
