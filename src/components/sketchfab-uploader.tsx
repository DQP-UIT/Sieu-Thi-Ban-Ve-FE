"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Upload3DModel({
  onUploadSuccess,
}: {
  onUploadSuccess: (uid: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !name) {
      Swal.fire(
        "Thiếu thông tin",
        "Hãy chọn file và đặt tên mô hình.",
        "warning"
      );
      return;
    }

    const formData = new FormData();
    formData.append("modelFile", file);
    formData.append("name", name);

    setLoading(true);
    try {
      const res = await axios.post("/api/sketchfab-upload", formData);
      const uid = res.data.uid;
      Swal.fire("Thành công", "Tải lên Sketchfab thành công!", "success");
      onUploadSuccess(uid);
      setFile(null);
      setName("");
    } catch (error: any) {
      Swal.fire(
        "Lỗi",
        error.response?.data?.error || "Lỗi không xác định",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Tên mô hình"
        className="input input-bordered w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="file"
        accept=".zip,.gltf,.glb"
        className="file-input w-full"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="btn btn-accent w-full"
        disabled={loading}
      >
        {loading ? "Đang tải lên..." : "Tải lên Sketchfab"}
      </button>
    </div>
  );
}
