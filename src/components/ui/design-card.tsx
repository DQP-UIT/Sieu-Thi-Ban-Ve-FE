"use client";

import { IProduct } from "@/types/type";
import DesignModal from "./design-modal";
import { useSelectedProduct } from "@/store/product-store";
import { useRouter } from "next/navigation";


interface DesignCardProps {
  design: IProduct;
}

const DesignCard: React.FC<DesignCardProps> = ({ design }) => {
  const setProduct = useSelectedProduct((p)=>p.setProduct)
  const router = useRouter();
  const handleOnClick = () => {
    setProduct(design);
    router.push('/customer/product')
  }
  return (
    <div className="card bg-base-300 w-72 md:w-96 shadow-sm hover:bg-blue-500/50">
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
          <button
            className="btn btn-soft btn-primary rounded-lg"
            onClick={handleOnClick}
          >
            Detail
          </button>
          <DesignModal design={design} />
        </div>
      </div>
    </div>
  );
};

export default DesignCard;
