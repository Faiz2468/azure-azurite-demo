# Azure Blob Storage on Azurite

A small demo of Azure Blob Storage using [Azurite](https://github.com/Azure/Azurite), Microsoft's free, open-source local emulator for Azure Storage. It needs no Azure account, no credit card and no Docker.

## What it does

`demo.js` uses the official `@azure/storage-blob` SDK to:

1. Create a container
2. Upload a blob
3. List the blobs in the container
4. Download the blob and print its content

## Stack

- **Azurite**: local Azure Storage emulator (Blob, Queue and Table services)
- **@azure/storage-blob**: Microsoft's Azure Blob Storage SDK for JavaScript
- **Node.js**

## Running it locally

```bash
# 1. Install dependencies
npm install

# 2. Start Azurite (leave this terminal running)
npx azurite --location azurite-data --skipApiVersionCheck

# 3. In a second terminal, run the demo
node demo.js
```

Expected output:

```
Container ready: demo-container
Uploaded: hello.txt
Found blob: hello.txt (45 bytes)
Downloaded content: Hello from Azurite - local Azure Blob Storage
```

## Notes

- The script connects with `UseDevelopmentStorage=true`, which points the SDK at the local Azurite emulator. The SDK calls are the ones used against real Azure Blob Storage, so a real storage account would need a different connection string. This demo has not been run against a live Azure account.
- `--skipApiVersionCheck` is needed because the latest `@azure/storage-blob` SDK requests an API version newer than the one Azurite supports. Without the flag, Azurite rejects the first request with a 400 error. It is safe for local development.
- Azurite also starts the Queue and Table services. This demo only uses Blob.
- `azurite-data/` and `node_modules/` are git-ignored.