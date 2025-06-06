"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MyEditor from "./ui/editor";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineFile, AiOutlineClose } from "react-icons/ai";
import Upload3DModel from "./sketchfab-uploader";
import { useSession } from "next-auth/react";

const schema = z.object({
  name: z.string().min(1),
  size: z.string().min(1),
  cost: z.coerce.number().positive(),
  floor: z.coerce.number(),
  square: z.string(),
  userId: z.coerce.number(),
  style: z.string(),
  designedBy: z.string(),
  numberBedRoom: z.coerce.number(),
  frontAge: z.coerce.number(),
  productTypeId: z.coerce.number(),
  description: z.string(),
  images: z.any(),
  images2D: z.any(),
  images3D: z.any(),
  files: z.any(),
  videos: z.any(),
});

type FormData = z.infer<typeof schema>;

function DropzoneField({
  onDrop,
  placeholder,
  multiple = false,
}: {
  onDrop: (files: File[]) => void;
  placeholder: string;
  multiple?: boolean;
}) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    const updatedFiles = multiple
      ? [...selectedFiles, ...acceptedFiles]
      : acceptedFiles;

    setSelectedFiles(updatedFiles);
    onDrop(updatedFiles);
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== indexToRemove);
    setSelectedFiles(updatedFiles);
    onDrop(updatedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple,
    onDrop: handleDrop,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border border-dashed rounded p-4 text-center cursor-pointer transition
          ${
            isDragActive
              ? "border-primary bg-blue-50"
              : "border-gray-400 hover:border-primary"
          }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-primary">Thả file vào đây...</p>
        ) : (
          <p>{placeholder}</p>
        )}
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-3 space-y-2 text-sm">
          <p className="text-green-600 font-medium">Đã chọn:</p>
          <ul className="space-y-1">
            {selectedFiles.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-primary-content max-w-40 sm:max-w-36 rounded p-2"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <AiOutlineFile className="text-blue-500 flex-shrink-0" />
                  <span className="text-primary truncate block">
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 flex-shrink-0"
                  title="Xoá file này"
                >
                  <AiOutlineClose />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ProductUploadComponent() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      setValue("userId", Number(session.user.id));
    }
  }, [session?.user?.id]);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((file) => formData.append(key, file));
      } else {
        formData.append(key, value as any);
      }
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Tạo sản phẩm thành công!",
        text: "Bản vẽ đã được khởi tạo và lưu trữ.",
      });

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error uploading product:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi khi tạo sản phẩm",
        text: "Đã xảy ra lỗi, vui lòng thử lại.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Upload Product</h2>

      {/* Text inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          {...register("name")}
          placeholder="Name"
          className="input input-bordered w-full"
        />
        <input
          {...register("size")}
          placeholder="Size"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          {...register("cost")}
          placeholder="Cost"
          className="input input-bordered w-full"
        />
        <input
          type="number"
          {...register("floor")}
          placeholder="Floor"
          className="input input-bordered w-full"
        />

        <input
          {...register("square")}
          placeholder="Square"
          className="input input-bordered w-full"
        />

        <input
          {...register("style")}
          placeholder="Style"
          className="input input-bordered w-full"
        />
        <input
          {...register("designedBy")}
          placeholder="Designed By"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          {...register("numberBedRoom")}
          placeholder="Number of Bedrooms"
          className="input input-bordered w-full"
        />
        <input
          type="number"
          {...register("frontAge")}
          placeholder="Front Age"
          className="input input-bordered w-full"
        />

        <input
          type="number"
          {...register("productTypeId")}
          placeholder="Product Type ID"
          className="input input-bordered w-full"
        />
      </div>

      {/* MyEditor */}
      <Controller
        control={control}
        name="description"
        defaultValue=""
        render={({ field }) => (
          <div>
            <label className="font-semibold mb-1 block">Description</label>
            <MyEditor value={field.value} onChange={field.onChange} />
          </div>
        )}
      />

      {/* File dropzones */}
      <Controller
        control={control}
        name="images"
        render={() => (
          <DropzoneField
            multiple
            onDrop={(files) => setValue("images", files)}
            placeholder={"Uploading technical designs here!"}
          />
        )}
      />
      <Controller
        control={control}
        name="images2D"
        render={() => (
          <DropzoneField
            multiple
            onDrop={(files) => setValue("images2D", files)}
            placeholder={"Uploading 2D images of product here!"}
          />
        )}
      />
      <Controller
        control={control}
        name="images3D"
        render={({ field }) => (
          <div className="space-y-2">
            <label className="font-semibold block">Sketchfab Model</label>
            <Upload3DModel
              onUploadSuccess={(uid) => setValue("images3D", uid)}
            />
            {field.value && (
              <p className="text-green-600 text-sm">
                Đã tải lên: UID {field.value}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        control={control}
        name="files"
        render={() => (
          <DropzoneField
            multiple
            onDrop={(files) => setValue("files", files)}
            placeholder={"Uploading related files of product here!"}
          />
        )}
      />
      <Controller
        control={control}
        name="videos"
        render={() => (
          <DropzoneField
            multiple
            onDrop={(files) => setValue("videos", files)}
            placeholder={"Uploading videos demo of product here if you have!"}
          />
        )}
      />

      <button type="submit" className="btn btn-primary w-full">
        Submit
      </button>
    </form>
  );
}
