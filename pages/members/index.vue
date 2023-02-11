<template>
  <div class="container mx-auto px-10">
    <Heading label="部員一覧" class="mt-16" />
    <section class="mb-8">
      <!-- membersByYearはcomputed内で生成しています。keyが年度です -->
      <!-- forと同時にifを使うと構文上まずいです -->
      <div v-for="(members, key) in membersByYear" :key="`join-year-${key}`">
        <div class="mb-12 mt-20 relative text-center">
          <div class="border-b border-heading pt-3"></div>
          <h3
            class="absolute bg-white font-bold inline-block mx-auto left-0 right-0 text-subtext top-0 tracking-widest w-64"
          >
            {{ key }}年度入部 ({{ members.length }}人)
          </h3>
        </div>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 px-4 sm:px-12 xl:px-32"
        >
          <div v-bind:key="content.id" v-for="content in members">
            <MemberIndexCard
              :href="`/members/${content.id}`"
              :img-path="
                typeof content.avatar !== 'undefined'
                  ? content.avatar.url
                  : '/images/common/oucrc-logo.webp'
              "
              :name="content.name"
              :status="content.status"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { MicroCMSListResponse } from 'microcms-js-sdk'
import type { Member } from '~/types/micro-cms'
const { data: members } = useFetch<MicroCMSListResponse<Member>>('/api/member', {
  params: {
    limit: 10000,
    fields: 'id,name,avatar,enteryear,status',
  },
})

/**
 * @example
 * ```ts
 * {年: [部員,部員,...],年: [部員,部員,...],...}
 * ```
 */
const allMembers: Record<number, Member[]> = {}
let membersByYear: Record<string, Member[]> = {}
members.value?.contents.forEach((member) => {
  if (!allMembers[member['enteryear']]) {
    allMembers[member['enteryear']] = []
  }
  allMembers[member['enteryear']].push(member)
})
Object.keys(allMembers)
  .sort((a, b) => {
    return Number(b) - Number(a)
  })
  .forEach((a) => {
    // ソート防止のため空白を付ける
    membersByYear[a.toString() + ' '] = allMembers[Number(a)]
  })

useServerSeoMeta({
  title: '部員一覧',
  description: 'OUCRC（岡山大学電子計算機研究会）の皆さんのプロフィールの一覧です！',
})
</script>
