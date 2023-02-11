import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk'

export type Category = {
  category: string
} & MicroCMSListContent

export type Series = { series: string } & MicroCMSListContent

export type Member = {
  name: string
  enteryear: number
  avatar?: MicroCMSImage
  twitter?: string
  github?: string
  youtube?: string
  status?: string
} & MicroCMSListContent

export type Article = {
  title: string
  body: string
  image: MicroCMSImage
  name: Member
  category: Category
  series: Series
} & MicroCMSListContent

export type News = {
  title: string
  body: string
} & MicroCMSListContent
