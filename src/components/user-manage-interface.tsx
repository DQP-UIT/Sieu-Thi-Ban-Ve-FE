"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import AddUserModal from "./add-user-modal";
import { IUser } from "@/types/type";

const PAGE_SIZE = 10;

const UsersManageTable = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const filtered = users.filter((user) =>
    [user.fullName, user.email, user.role].some((field) =>
      field.toLowerCase().includes(filter.toLowerCase())
    )
  );

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const fetchUser = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/user/all`, {
        params: { page: 1, pageSize: 1000 },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUsers(res.data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load users", err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          className="input input-bordered w-1/3"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <AddUserModal onSuccess={fetchUser} />
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>STT</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date of birth</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : paginated.length > 0 ? (
              paginated.map((user, index) => (
                <tr key={user.id}>
                  <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role}</td>
                  <td>{new Date(user.dob).toLocaleDateString()}</td>
                  <td>{new Date(user.activedDay).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No users found.
                </td>
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

export default UsersManageTable;
