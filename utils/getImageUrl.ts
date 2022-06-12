export default function getImageUrl(url: string, localAsset?: boolean): string {
  if (localAsset && process.env.NEXT_PUBLIC_ENVIRONMENT_PHASE==='production') {
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}${url}`
  }
  return url
}