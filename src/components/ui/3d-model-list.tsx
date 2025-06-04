import React from "react";

interface SketchfabViewerListProps {
  modelIds: string[]; // Danh sách model ID từ Sketchfab - Không phải là string dạng localhost đâu nha anh Quang
}

const SketchfabViewerList: React.FC<SketchfabViewerListProps> = ({
  modelIds,
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      {modelIds.map((id, idx) => (
        <div key={idx} className="w-full mb-6 md:max-w-4xl aspect-video">
          <iframe
            title={`Sketchfab Model ${idx}`}
            width="100%"
            height="100%"
            allow="autoplay; fullscreen; vr"
            src={`https://sketchfab.com/models/${id}/embed?autospin=1&autostart=1&ui_infos=0&ui_controls=1`}
            frameBorder="0"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default SketchfabViewerList;
