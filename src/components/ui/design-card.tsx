"use client";

import Swal from "sweetalert2";
import axios from "axios";
import { IProduct } from "@/types/type";
import DesignModal from "./design-modal";

interface DesignCardProps {
  design: IProduct;
}

const DesignCard: React.FC<DesignCardProps> = ({ design }) => {
  return (
    <div className="card bg-base-100 w-72 md:w-96 shadow-sm">
      <figure>
        <img src={design.images2D[0]} alt={design.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{design.name}</h2>
        <p className="text-gray-400">
          Tầng: {design.floor} | Phòng: {design.numberBedRoom} | Diện tích:{" "}
          {design.size}
        </p>
        <p className="text-md">Design by: {design.designedBy}</p>
        <div className="text-xl font-mono font-semibold text-right">
          {design.cost}
        </div>
        <div className="card-actions justify-end gap-4">
          <button className="btn btn-soft btn-primary rounded-lg">
            Buy Now
          </button>
          <DesignModal design={design} />
        </div>
      </div>
    </div>
  );
};

export default DesignCard;
