import React from "react";

interface ImageListProps {
  imglist: string[];
}

const ImageList: React.FC<ImageListProps> = ({ imglist }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {imglist.map((url, idx) => (
        <div key={idx} className="w-full mb-6 md:max-w-4xl">
          <img src={url} alt={`Image ${idx}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
