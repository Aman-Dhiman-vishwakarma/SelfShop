import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AllAdminOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const naviget = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);

  const fetctALLOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/order/fetchallorders?${urlParams.toString()}`
      );
      if (res.data.success) {
        setLoading(false)
        setAllOrders(res.data.allOrders);
        console.log(res.data.allOrders);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  console.log(allOrders)

  useEffect(() => {
    fetctALLOrders();
  }, [urlParams.toString()]);

  const handleClick = (id) => {
    naviget(`/admin/orderdetail/${id}`);
  };

  const choosecolor = (status) => {
    switch (status) {
      case "pending":
        return "badge badge-soft badge-primary";
      case "shipping":
        return "badge badge-soft badge-success";
      case "deliverd":
        return "badge badge-soft badge-warning";
      case "cancled":
        return "badge badge-soft badge-secondary";
    }
  };

  return (
    <>
      <div className="flex gap-4 justify-end items-center p-4 px-8 mb-2">
        <span className="font-semibold">Filter Orders :</span>
        <Link
          to="/admin/allorders"
          className="badge badge-outline badge-primary font-semibold "
        >
          All
        </Link>
        <Link
          to="/admin/allorders?status=pending"
          className="badge badge-outline badge-primary font-semibold "
        >
          Pending
        </Link>
        <Link
          to="/admin/allorders?status=shipping"
          className="badge badge-outline badge-success font-semibold "
        >
          Shipping
        </Link>
        <Link
          to="/admin/allorders?status=deliverd"
          className="badge badge-outline badge-warning font-semibold "
        >
          Deliverd
        </Link>
        <Link
          to="/admin/allorders?status=cancled"
          className="badge badge-outline badge-secondary font-semibold "
        >
          Cancled
        </Link>
      </div>
      {!loading ? (
        allOrders.length !== 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-md text-gray-700 font-semibold">
              <thead>
                <tr>
                  <th></th>
                  <th>Order Id</th>
                  <th>Totalamount</th>
                  <th>Totalitems</th>
                  <th>Order Date</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {allOrders?.map((order, index) => (
                  <tr
                    onClick={() => handleClick(order?._id)}
                    key={order?._id}
                    className="cursor-pointer hover:bg-red-50"
                  >
                    <th>{index + 1}</th>
                    <td>#{order?._id}</td>
                    <td>RS. {order.totalamount}</td>
                    <td>{order.totalitems}</td>
                    <td>
                      {order.createdAt
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                    </td>
                    <td>{order?.selectedaddress?.city}</td>
                    <td>
                      <span
                        className={`${choosecolor(
                          order.status
                        )} rounded px-1 py-[2px]`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>{order.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-20 font-medium">Orders Not Found</div>
        )
      ) : (
        <div className="text-center p-20"><span className="loading loading-spinner text-secondary loading-lg"></span></div>
      )}
    </>
  );
};

export default AllAdminOrders;
