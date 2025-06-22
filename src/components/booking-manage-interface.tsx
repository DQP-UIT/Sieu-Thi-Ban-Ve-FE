"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import AssignModal from "./asign-task-modal";
import { IBooking, IActor } from "@/types/type";
import UpdateBookingStatusModal from "./update-task-modal";

const PAGE_SIZE = 10;

const BookingTable = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [designerList, setDesignerList] = useState<IActor[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [filter, setFilter] = useState("");
  const [contactFilter, setContactFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  // Filter bookings based on user role
  const filteredByRole = bookings.filter((booking) => {
    // If user role is "user", only show bookings assigned to them
    if (session?.user.role === "user") {
      return booking.designer?.id === Number(session.user.id);
    }
    // For other roles (admin, receptionist, designer), show all bookings
    return true;
  });

  // Apply search filters
  const filtered = filteredByRole.filter(
    (b) =>
      [b.name, b.message].some((field) =>
        field.toLowerCase().includes(filter.toLowerCase())
      ) &&
      [b.email, b.phone_number].some((field) =>
        field.toLowerCase().includes(contactFilter.toLowerCase())
      )
  );

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const fetchBookings = useCallback(async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
      params: { page: 1, pageSize: 10 * PAGE_SIZE },
      headers: { Authorization: `Bearer ${session?.user.accessToken}` },
    });
    setBookings(res.data || []);
  }, [session?.user.accessToken]);

  const fetchDesigners = useCallback(async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/user/user`,
      {
        headers: { Authorization: `Bearer ${session?.user.accessToken}` },
      }
    );
    setDesignerList(res.data || []);
  }, [session?.user.accessToken]);

  useEffect(() => {
    setIsLoading(true);
    console.log("user", session?.user);
    Promise.all([fetchBookings(), fetchDesigners()])
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [fetchBookings, fetchDesigners]);

  const handleRefresh = async () => {
    setIsLoading(true);
    await fetchBookings();
    setIsLoading(false);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">Booking Management</h1>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search by name or message..."
            className="input input-bordered w-full"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by email or phone..."
            className="input input-bordered w-full"
            value={contactFilter}
            onChange={(e) => setContactFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>STT</th>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Message</th>
              <th>Assign</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Created At</th>
              {session?.user.role !== "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : paginated.length > 0 ? (
              paginated.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
                  <td>{booking.id}</td>
                  <td>{booking.name}</td>
                  <td>{booking.phone_number}</td>
                  <td>{booking.email}</td>
                  <td>{booking.message}</td>
                  <td>{booking.designer?.fullName ?? ""}</td>
                  <td>{booking.designer?.email ?? ""}</td>
                  <td>
                    {{
                      unassigned: <>❌ Unassigned</>,
                      assigned: <>⏳ Assigned</>,
                      handled: <>✅ Handled</>,
                    }[booking.status] ?? booking.status}
                  </td>
                  <td>{new Date(booking.created_at).toLocaleDateString()}</td>
                  {session?.user.role !== "admin" && (
                    <td className="flex flex-wrap gap-2">
                      <UpdateBookingStatusModal
                        booking={booking}
                        onSuccess={handleRefresh}
                      />
                      {session?.user.role === "receptionist" && (
                        <AssignModal
                          booking={booking}
                          designerList={designerList}
                          onSuccess={handleRefresh}
                        />
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  No bookings found.
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

export default BookingTable;
