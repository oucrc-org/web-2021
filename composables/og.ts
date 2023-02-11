export const useOG = ({
  title,
  description,
  ogImage,
  titleTemplate,
}: {
  title?: (() => string | undefined) | string
  description?: (() => string | undefined) | string
  ogImage?: (() => string | undefined) | string
  titleTemplate?: string | null
}) => {
  useHead({
    title: title as string,
    meta: [
      {
        name: 'description',
        content: description,
      },
      {
        name: 'og:description',
        content: description,
      },
      {
        property: 'og:image',
        content: ogImage,
      },
    ],
  })

  useServerSeoMeta({
    title: title as string,
    titleTemplate,
    ogDescription: description,
    ogImage,
  })
}
