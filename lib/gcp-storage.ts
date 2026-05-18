import { Storage } from '@google-cloud/storage'

let _storage: Storage | null = null

function getStorageClient(): Storage {
  if (_storage) return _storage

  const rawKey = process.env.GCP_PRIVATE_KEY ?? ''
  const privateKey = rawKey.includes('BEGIN RSA PRIVATE KEY') || rawKey.includes('BEGIN PRIVATE KEY')
    ? rawKey.replace(/\\n/g, '\n')
    : Buffer.from(rawKey, 'base64').toString('utf-8')

  _storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID!,
    credentials: {
      client_email: process.env.GCP_CLIENT_EMAIL!,
      private_key: privateKey,
    },
  })

  return _storage
}

export async function uploadToGcs(
  buffer: Buffer,
  storagePath: string,
  contentType: string
): Promise<void> {
  const storage = getStorageClient()
  const file = storage.bucket(process.env.GCP_BUCKET_NAME!).file(storagePath)
  await file.save(buffer, { contentType, resumable: false })
}

export async function generateSignedUrl(
  storagePath: string,
  expiresInMinutes = 60
): Promise<string> {
  const storage = getStorageClient()
  const [url] = await storage
    .bucket(process.env.GCP_BUCKET_NAME!)
    .file(storagePath)
    .getSignedUrl({
      action: 'read',
      expires: Date.now() + expiresInMinutes * 60 * 1000,
    })
  return url
}

export async function deleteFromGcs(storagePath: string): Promise<void> {
  const storage = getStorageClient()
  await storage
    .bucket(process.env.GCP_BUCKET_NAME!)
    .file(storagePath)
    .delete({ ignoreNotFound: true })
}
