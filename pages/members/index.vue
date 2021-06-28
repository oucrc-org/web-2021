<template>
  <div class="container mx-auto px-10">
    <OGPSetter
      title="部員一覧"
      description="OUCRC（岡山大学電子計算機研究会）の皆さんのプロフィールの一覧です！"
      :url="this.$route.path"
    />

    <Title label="部員一覧" class="mt-16" />

    <section class="mb-8">
      <!-- membersByYearはcomputed内で生成しています。keyが年度です -->
      <!-- forと同時にifを使うと構文上まずいです -->
      <div v-for="(members, key) in membersByYear" :key="`join-year-${key}`">
        <div class="mb-12 mt-20 relative text-center">
          <div class="border-b border-heading pt-3"></div>
          <h3 class="absolute bg-white font-bold inline-block mx-auto left-0 right-0 text-subtext top-0 tracking-widest w-64">
            {{ key }}年度入部 ({{ members.length }}人)
          </h3>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 px-4 sm:px-12 xl:px-32">
          <div v-bind:key="content.id" v-for="content in members">
            <MemberIndexCard
              :href="`/members/${content.id}`"
              :img-path="content.avatar !== void 0 ? content.avatar.url : null"
              :name="content.name"
              :status="content.status"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios"

export default {
  computed: {
    /* entryyearごとにメンバーの配列を分けることで、v-ifを発火させる必要性をなくしています
        さらにmembers.lengthで年度ごとに人数を取得できます */
    membersByYear() {
      const allMembers = {}
      const result = {}
      this.members.contents.forEach((member) => {
        if (!allMembers[member["enteryear"]]) {
          allMembers[member["enteryear"]] = []
        }
        allMembers[member["enteryear"]].push(member)
      })
      Object.keys(allMembers)
        .sort((a, b) => {
          return b - a
        })
        .forEach((a) => {
          // ソート防止のため空白を付ける
          result[` ${a}`] = allMembers[a]
        })

      return result
    },
  },
  asyncData({ error, $config }) {
    return axios
      .get(`${$config.API_URL}/member`, {
        headers: {
          "X-API-KEY": $config.X_API_KEY,
        },
        params: {
          limit: 10000,
          fields: "id,name,avatar,enteryear,status",
        },
      })
      .then((response) => {
        return {
          members: response.data,
        }
      })
      .catch((e) => {
        error({
          statusCode: e.response.status,
          message: e.message,
        })
      })
  },
}
</script>
