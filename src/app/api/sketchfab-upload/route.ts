import { NextRequest, NextResponse } from "next/server";
import FormDataNode from "form-data";
import axios from "axios";
import { createReadStream, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { promises as fs } from "fs";

export async function POST(req: NextRequest) {
  const token = process.env.SKETCHFAB_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Missing Sketchfab token" },
      { status: 500 }
    );
  }

  const form = await req.formData();
  const file: File | null = form.get("modelFile") as File;
  const name = form.get("name") as string;

  if (!file || !name) {
    return NextResponse.json(
      { error: "Thiếu file hoặc tên model" },
      { status: 400 }
    );
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const tmpPath = join(tmpdir(), file.name);
    await fs.writeFile(tmpPath, buffer);

    const uploadForm = new FormDataNode();
    uploadForm.append("modelFile", createReadStream(tmpPath));
    uploadForm.append("name", name);
    uploadForm.append("isPublished", "true");
    uploadForm.append("description", "Uploaded via API");
    uploadForm.append("tags", "api,3d,react");
    uploadForm.append("license", "by"); 

    const sketchfabRes = await axios.post(
      "https://api.sketchfab.com/v3/models",
      uploadForm,
      {
        headers: {
          Authorization: `Token ${token}`,
          ...uploadForm.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    const uid = sketchfabRes.data.uid;

    return NextResponse.json({ uid }, { status: 200 });
  } catch (err: any) {
    console.error("Upload error:", err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: 500 }
    );
  }
}
