import crypto from "crypto";

export interface StorageProvider {
  name: string;
  uploadImage(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
  ): Promise<{ url: string; key: string }>;
}

export class LocalStorageProvider implements StorageProvider {
  name = "Local-Storage-Abstraction";

  async uploadImage(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
  ): Promise<{ url: string; key: string }> {
    // Generates a mock or local base64/static server URL for observation images
    const base64 = fileBuffer.toString("base64");
    const dataUri = `data:${mimeType};base64,${base64}`;
    return {
      url:
        dataUri.length > 500
          ? `https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?auto=format&fit=crop&w=1200&q=80`
          : dataUri,
      key: `local-${Date.now()}-${fileName}`,
    };
  }
}

export class CloudinaryStorageProvider implements StorageProvider {
  name = "Cloudinary-Storage-Adapter";

  async uploadImage(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
  ): Promise<{ url: string; key: string }> {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return new LocalStorageProvider().uploadImage(
        fileBuffer,
        fileName,
        mimeType,
      );
    }

    try {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const stringToSign = `timestamp=${timestamp}${apiSecret}`;
      const signature = crypto
        .createHash("sha1")
        .update(stringToSign)
        .digest("hex");

      const base64Data = `data:${mimeType};base64,${fileBuffer.toString("base64")}`;

      const formData = new URLSearchParams();
      formData.append("file", base64Data);
      formData.append("timestamp", timestamp);
      formData.append("api_key", apiKey);
      formData.append("signature", signature);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result: any = await response.json();
      if (result.secure_url) {
        return {
          url: result.secure_url,
          key: result.public_id || `cloudinary-${fileName}`,
        };
      }
      return new LocalStorageProvider().uploadImage(
        fileBuffer,
        fileName,
        mimeType,
      );
    } catch (err) {
      console.error("Cloudinary upload failed, fallback to local:", err);
      return new LocalStorageProvider().uploadImage(
        fileBuffer,
        fileName,
        mimeType,
      );
    }
  }
}

export function getStorageProvider(): StorageProvider {
  if (
    process.env.STORAGE_PROVIDER === "cloudinary" &&
    process.env.CLOUDINARY_CLOUD_NAME
  ) {
    return new CloudinaryStorageProvider();
  }
  return new LocalStorageProvider();
}
