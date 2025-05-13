"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

interface IOrder {
  id: number;
  productId: number;
  orderUserName: string;
  orderPhoneNumber: string;
  orderCity: string;
  orderAdress: string;
  createdAt: string;
  solved: boolean;
}

const PAGE_SIZE = 10;

const OrderTable = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const {data: session} = useSession();

  const filtered = orders.filter((o) =>
    [o.orderUserName, o.orderPhoneNumber, o.orderCity, o.orderAdress]
      .some((field) =>
        field.toLowerCase().includes(filter.toLowerCase())
      )
  );

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        params: { page: 1, pageSize: 10 * PAGE_SIZE },
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`
        }
      })
      .then((res) => {
        setOrders(res.data.data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load orders", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Booking Management</h1>
        <input
          type="text"
          placeholder="Search by name, city or address..."
          className="input input-bordered w-1/3"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>STT</th>
              <th>ID</th>
              <th>Product ID</th>
              <th>User Name</th>
              <th>Phone Number</th>
              <th>City</th>
              <th>Address</th>
              <th>Created At</th>
              <th>Solved</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="text-center py-4">Loading...</td>
              </tr>
            ) : paginated.length > 0 ? (
              paginated.map((order, index) => (
                <tr key={order.id}>
                  <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
                  <td>{order.id}</td>
                  <td>{order.productId}</td>
                  <td>{order.orderUserName}</td>
                  <td>{order.orderPhoneNumber}</td>
                  <td>{order.orderCity}</td>
                  <td>{order.orderAdress}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.solved ? "✅" : "❌"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-4">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end gap-2">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <span className="btn btn-sm btn-disabled">
          Page {page} / {totalPages}
        </span>
        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderTable;
