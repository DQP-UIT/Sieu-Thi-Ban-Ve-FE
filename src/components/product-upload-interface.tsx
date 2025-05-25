"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MyEditor from "./ui/editor";
import axios from "axios";
import Swal from "sweetalert2";

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
  placeholder: String;
  multiple?: boolean;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className="border border-dashed border-gray-400 p-4 rounded cursor-pointer hover:border-primary transition text-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-primary">Drop files here...</p>
      ) : (
        <p>{placeholder}</p>
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
          type="number"
          {...register("userId")}
          placeholder="User ID"
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
        render={() => (
          <DropzoneField
            multiple
            onDrop={(files) => setValue("images3D", files)}
            placeholder={"Uploading 3D images of product here!"}
          />
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
