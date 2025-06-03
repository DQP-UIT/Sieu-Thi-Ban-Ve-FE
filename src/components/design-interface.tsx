import React from 'react'
import { IProduct } from '@/types/type'
import ImageSlider from './ui/image-slider';
import DesignInfoTab from './ui/design-info-table';
import ImageList from './ui/2d-image-list';
import SketchfabViewerList from './ui/3d-model-list';

const modelIds = [
  "798ffaeadacf4e08a2665785422fb45d",
  "9dc9d936a1bf49d18925bd42d8b92552",
];

interface ProductDetailProps {
    design: IProduct;
}
const ProductDetail: React.FC<ProductDetailProps> = ({design}) => {
  return (
    <div className="w-full">
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="col-span-2 col-start-1">
          <ImageSlider images={design.images2D} />
        </div>
        <div className="col-start-3 font-sans p-4">
          <div className="text-2xl font-bold">Mô tả</div>
          <div
            className="text-xl font-normal leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{ __html: design.description }}
          />
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
      {/* Model 3D */}
      {design.images3D && (
        <div className="w-full md:mt-10">
          <div className="text-2xl font-bold md:mb-4 mb-2">Mô hình 3D</div>
          <SketchfabViewerList modelIds={design.images3D} />
        </div>
      )}
    </div>
  );
}

export default ProductDetail