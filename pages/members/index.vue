<template>
  <div class="container mx-auto px-10">
    <Heading label="部員一覧" class="mt-16" />
    <section class="mb-8">
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
  <Loading v-if="pending" />
</template>

<script setup lang="ts">
const { pending, data: membersByYear } = useFetch('/api/member', {
  params: {
    limit: 1000,
    fields: 'id,name,avatar,enteryear,status',
  },
})

useOG({
  title: '部員一覧',
  description: 'OUCRC（岡山大学電子計算機研究会）の皆さんのプロフィールの一覧です！',
})
</script>
