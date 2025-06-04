"use client";

type Props = {
  modelId: string;
};

export default function SketchfabViewer({ modelId }: Props) {
  return (
    <div className="w-full h-[600px]">
      <iframe
        title="Sketchfab Model"
        src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0`}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; fullscreen; vr"
        allowFullScreen
      />
    </div>
  );
}
