"use client"

import { IProduct } from '@/types/type';
import React from 'react'
import ImageSlider from './image-slider';

interface ModalProps{
  design: IProduct;
}

const DesignModal: React.FC<ModalProps> = ({design}) => {
  return (
    <div>
      <button
        className="btn btn-soft btn-secondary rounded-lg"
        onClick={() =>
          (
            document.getElementById("my_modal_2") as HTMLDialogElement
          ).showModal()
        }
      >
        See more
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box md:min-w-fit">
          <div className="w-full">
            <ImageSlider images={design.images2D} />
          </div>
          <h3 className="font-bold text-lg">{design.name}</h3>
          <p className="w-full md:max-w-2xl h-auto py-2 text-lg">
            {design.description}
          </p>
          <p className="text-xl font-semibold">Thông số cơ bản</p>
          <p>Tầng: {design.floor}</p>
          <p>Phòng ngủ: {design.numberBedRoom}</p>
          <p>Diện tích: {design.square}m²</p>
          <p>Design by: {design.designedBy}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default DesignModal