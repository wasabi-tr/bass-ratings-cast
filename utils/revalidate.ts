export const revalidateLure = () => {
  fetch('/api/revalidate')
}
export const revalidateProfile = (id: string) => {
  fetch(`/api/revalidate/profile/${id}`)
}
