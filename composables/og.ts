export const useOG = ({
  title,
  description,
  ogImage,
}: {
  title?: string
  description?: string
  ogImage?: string
}) => {
  useHead({
    title: (title ?? 'OUCRC').toString(),
    meta: [
      {
        property: 'description',
        content: description,
      },
      {
        property: 'og:image',
        content: ogImage,
      },
    ],
  })
  useServerSeoMeta({
    title: (title ?? 'OUCRC').toString(),
    description,
  })
}
