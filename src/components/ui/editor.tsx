"use client";

import React from "react";
import { Editor } from "@tinymce/tinymce-react";

interface MyEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  disabled?: boolean;
}

const MyEditor: React.FC<MyEditorProps> = ({
  value,
  onChange,
  height = 300,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full">
      <Editor
        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
        value={value}
        onEditorChange={(newValue) => onChange(newValue)}
        init={{
          height: 500,
          menubar: true,
          statusbar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | link image | removeformat",
          content_style:
            "body { font-family:Inter, sans-serif; font-size:14px }",
        }}
      />
    </div>
  );
};


export default MyEditor;
