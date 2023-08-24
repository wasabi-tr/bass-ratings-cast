export const revalidateIndex = () => {
  fetch('/api/revalidate')
}
export const revalidateLure = (id: string) => {
  fetch(`/api/revalidate/lure/${id}`)
}
export const revalidateProfile = (id: string) => {
  fetch(`/api/revalidate/profile/${id}`)
}
export const revalidateBrand = (slug: string) => {
  fetch(`/api/revalidate/brand/${slug}`)
}
