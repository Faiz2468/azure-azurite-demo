const { BlobServiceClient } = require("@azure/storage-blob");

async function main() {
  // "UseDevelopmentStorage=true" points the SDK at the local Azurite emulator
  const service = BlobServiceClient.fromConnectionString("UseDevelopmentStorage=true");

  // 1. Create a container (like a folder of blobs)
  const container = service.getContainerClient("demo-container");
  await container.createIfNotExists();
  console.log("Container ready: demo-container");

  // 2. Upload a blob
  const content = "Hello from Azurite - local Azure Blob Storage";
  const blob = container.getBlockBlobClient("hello.txt");
  await blob.upload(content, Buffer.byteLength(content));
  console.log("Uploaded: hello.txt");

  // 3. List blobs in the container
  for await (const item of container.listBlobsFlat()) {
    console.log("Found blob:", item.name, `(${item.properties.contentLength} bytes)`);
  }

  // 4. Download and print the blob's content
  const download = await blob.download();
  const body = await new Response(download.readableStreamBody).text();
  console.log("Downloaded content:", body);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});