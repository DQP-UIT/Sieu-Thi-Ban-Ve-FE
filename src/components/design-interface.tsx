import React from 'react'
import { IProduct } from '@/types/type'
import ImageSlider from './ui/image-slider';
import DesignInfoTab from './ui/design-info-table';
import ImageList from './ui/2d-image-list';

interface ProductDetailProps {
    design: IProduct;
}
const ProductDetail: React.FC<ProductDetailProps> = ({design}) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap md:grid md:grid-cols-3">
        <div className="col-span-2 col-start-1">
          <ImageSlider images={design.images2D} />
        </div>
        <div className="col-start-3 font-sans">
          <div className='text-2xl font-bold'>Mô tả</div>
          <div className='text-xl font-normal'>{design.description}</div>
        </div>
      </div>
      {/* Thông số */}
      <div className="w-full md:mt-10">
        <div className="text-2xl font-bold md:mb-4 mb-2">Thông số kỹ thuật</div>
        <DesignInfoTab design={design} />
      </div>
      {/* Designs */}
      <div className="w-full md:mt-10">
        <div className="text-2xl font-bold md:mb-4 mb-2">
          Bản vẽ kỹ thuật sản phẩm
        </div>
        <ImageSlider images={design.images} />
      </div>
      {/* Model 2D */}
      <div className="w-full md:mt-10">
        <div className="text-2xl font-bold md:mb-4 mb-2">
          Mô hình hoàn thành
        </div>
        <ImageList imglist={design.images2D} />
      </div>
    </div>
  );
}

export default ProductDetail