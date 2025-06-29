"use client";

import { normalizeOneProduct } from "@/services/product.service";
import { useSelectedProduct } from "@/store/product-store";
import { IProduct } from "@/types/type";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const PAGE_SIZE = 10;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const DesignsManageTable = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data: session, status } = useSession({ required: true });
  const user = session?.user;
  const setProduct = useSelectedProduct((p) => p.setProduct);
  const router = useRouter();

  const handleOnView = (id: number) => {
    try {
      axios.get(`${API_URL}/product/${id}`).then((res) => {
        console.log("data", res.data);
        setProduct(normalizeOneProduct(res.data));
        user?.role === "admin"
          ? router.push("/admin/product")
          : router.push("/receptionist/product");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnDelete = (id: number) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa bản thiết kế này?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const res = await axios.delete(`${API_URL}/product/${id}`);
        console.log("stt", res.status);

        const isSuccess = res.status === 200;

        await Swal.fire({
          toast: true,
          position: "top-end",
          icon: isSuccess ? "success" : "error",
          title: isSuccess ? "Thành công" : "Lỗi",
          text: isSuccess ? "Đã xóa thành công!" : "Đã xảy ra lỗi khi xóa!",
          showConfirmButton: false,
          timer: 1500,
        });

        if (isSuccess) fetchData(page);
      } catch (error) {
        console.error(error);

        await Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Lỗi hệ thống",
          text: "Không thể kết nối đến máy chủ!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleOnAds = (id: number) => {
    Swal.fire({
      title: "Bạn có chắc muốn đăng bài quảng cáo cho bản thiết kế này?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đăng",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      // Show loading modal
      Swal.fire({
        title: "Đang đăng bài quảng cáo...",
        html: `
          <div class="flex flex-col items-center gap-4">
            <p class="text-sm text-gray-600">Vui lòng đợi trong giây lát...</p>
            <div class="text-xs text-gray-500">
              Hệ thống đang xử lý và đăng bài lên Facebook
            </div>
          </div>
        `,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const res = await axios.post(`${API_URL}/facebook/post-product/${id}`);
        console.log("stt", res.status);

        const isSuccess = res.status === 201;

        // Close loading modal
        Swal.close();

        // Show result
        await Swal.fire({
          icon: isSuccess ? "success" : "error",
          title: isSuccess ? "Đăng bài thành công!" : "Đăng bài thất bại!",
          html: isSuccess
            ? `
              <div class="text-center">
                <p class="mb-3">Bài đăng đã được chia sẻ lên Facebook thành công!</p>
                <div class="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p class="text-sm text-green-700 mb-2">🔗 Link bài đăng:</p>
                  <a 
                    href="${res.data.postLink}" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-blue-600 hover:text-blue-800 underline text-sm break-all"
                  >
                    ${res.data.postLink}
                  </a>
                </div>
              </div>
            `
            : `
              <div class="text-center">
                <p class="text-red-600">Đã xảy ra lỗi khi đăng bài!</p>
                <p class="text-sm text-gray-600 mt-2">Vui lòng thử lại sau.</p>
              </div>
            `,
          showConfirmButton: true,
          confirmButtonText: isSuccess ? "Xem bài đăng" : "Đóng",
          showCancelButton: isSuccess,
          cancelButtonText: isSuccess ? "Đóng" : undefined,
        }).then((result) => {
          // If user clicks "Xem bài đăng", open the Facebook post
          if (result.isConfirmed && isSuccess && res.data.postLink) {
            window.open(res.data.postLink, "_blank", "noopener,noreferrer");
          }
        });

        if (isSuccess) {
          fetchData(page);
        }
      } catch (error: any) {
        console.error(error);

        // Close loading modal
        Swal.close();

        await Swal.fire({
          icon: "error",
          title: "Lỗi hệ thống",
          html: `
            <div class="text-center">
              <p class="text-red-600 mb-2">Không thể kết nối đến máy chủ!</p>
              <div class="bg-red-50 p-3 rounded-lg border border-red-200">
                <p class="text-sm text-red-700">
                  ${
                    error.response?.data?.message ||
                    error.message ||
                    "Lỗi không xác định"
                  }
                </p>
              </div>
              <p class="text-sm text-gray-600 mt-2">Vui lòng kiểm tra kết nối mạng và thử lại.</p>
            </div>
          `,
          showConfirmButton: true,
          confirmButtonText: "Thử lại",
          showCancelButton: true,
          cancelButtonText: "Đóng",
        }).then((result) => {
          if (result.isConfirmed) {
            handleOnAds(id);
          }
        });
      }
    });
  };

  const fetchData = async (pageNumber: number) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product`,
        {
          params: { page: pageNumber, pageSize: 10 * PAGE_SIZE },
        }
      );

      setProducts(res.data.data);
      setTotalPages(Math.ceil(res.data.data.length / PAGE_SIZE));
      console.log("Total Pages", res.data.data.length);
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
                    <td className="text-right flex flex-col space-y-2">
                      <button
                        className="btn btn-sm w-16 btn-info"
                        onClick={() => handleOnView(product.id!)}
                      >
                        View
                      </button>
                      {user?.role === "admin" ? (
                        <button
                          className="btn btn-sm w-16 btn-error"
                          onClick={() => handleOnDelete(product.id!)}
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm w-16 btn-error"
                          onClick={() => handleOnAds(product.id!)}
                        >
                          Ads design
                        </button>
                      )}
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
