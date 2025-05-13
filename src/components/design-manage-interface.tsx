"use client";

import { IProduct } from "@/types/type";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  onView: (product: IProduct) => void;
  onDelete: (productId: number) => void;
}

const PAGE_SIZE = 10;

const DesignsManageTable: React.FC<Props> = ({ onView, onDelete }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (pageNumber: number) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product`,
        {
          params: { page: pageNumber, pageSize: 10 * PAGE_SIZE },
        }
      );

      setProducts(res.data.data); // res.data.data là danh sách sản phẩm
      setTotalPages(Math.ceil(res.data.data.length / PAGE_SIZE));
      console.log("Total Pages", res.data.data.length); // trả về totalPages
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  const filtered = products.filter((d) =>
    [d.name, d.style, d.designedBy].some((field) =>
      field.toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Design Manager</h1>
        <input
          type="text"
          placeholder="Search by name, style or designer..."
          className="input input-bordered w-1/3"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-lg font-semibold">
          Loading...
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>STT</th>
                <th>ID</th>
                <th>Name</th>
                <th>Size</th>
                <th>Cost</th>
                <th>Floor</th>
                <th>Square</th>
                <th>Style</th>
                <th>Bedrooms</th>
                <th>Frontage</th>
                <th>Designer</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered
                .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
                .map((product, index) => (
                  <tr key={product.id}>
                    <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.size}</td>
                    <td>{product.cost.toLocaleString()}</td>
                    <td>{product.floor}</td>
                    <td>{product.square}</td>
                    <td>{product.style}</td>
                    <td>{product.numberBedRoom}</td>
                    <td>{product.frontAge}m</td>
                    <td>{product.designedBy}</td>
                    <td className="text-right space-y-2">
                      <button
                        className="btn btn-sm w-16 btn-info"
                        onClick={() => onView(product)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-sm w-16 btn-error"
                        onClick={() => onDelete(product.id!)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-center mt-4 gap-2">
            <button
              className="btn btn-sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              « Prev
            </button>
            <span className="btn btn-sm btn-disabled">
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignsManageTable;
