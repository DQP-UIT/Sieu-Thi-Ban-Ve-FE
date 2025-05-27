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
  return (
    <div className="w-full">
      <Editor
        apiKey="no-api-key"
        value={value}
        onEditorChange={(newValue) => onChange(newValue)}
        init={{
          height,
          menubar: false,
          statusbar: false,
          plugins: [
            "advlist autolink lists link image charmap preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste help wordcount",
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
