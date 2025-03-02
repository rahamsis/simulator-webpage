import { NextResponse } from "next/server";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_ENDPOINT = process.env.R2_ENDPOINT;

const s3 = new S3Client({
  region: "auto",
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID!,
    secretAccessKey: R2_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  console.log("R2_ACCESS_KEY_ID3",R2_ACCESS_KEY_ID)
  try {
    const command = new ListObjectsV2Command({
      Bucket: R2_BUCKET_NAME,
    });

    const { Contents } = await s3.send(command);

    if (!Contents) {
      return NextResponse.json({ books: [] });
    }

    // Convertir los archivos en un array de objetos con su URL
    const books = Contents.map((file) => ({
      name: file.Key,
      url: file.Key ? `/api/book?file=${encodeURIComponent(file.Key)}` : '',
    }));

    return NextResponse.json({ books });
  } catch (error) {
    console.error("❌ Error al obtener los libros:", error);
    return NextResponse.json({ error: "No se pudo obtener la lista de libros" }, { status: 500 });
  }
}
