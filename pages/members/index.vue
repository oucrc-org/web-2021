<template>
  <div class="container mb-32 mx-auto px-10">
    <Title label="部員一覧" class="mt-16"/>

    <div v-for="year in years">
      <div class="mb-12 mt-20 relative text-center">
        <div class="border-b border-heading pt-3"></div>
        <h3
          class="absolute bg-white font-bold inline-block mx-auto left-0 right-0 text-subtext top-0 tracking-widest w-40">
          {{year}}年度入部
        </h3>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 px-4 sm:px-12 xl:px-32">
        <div v-for="content in members.contents" v-if="content.enteryear === year">
          <MemberIndexCard
            :href="`members/${content.id}`"
            :img-path="content.avatar !== void(0) ? content.avatar.url : null"
            :name="content.name"
            :status="content.status"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return{
      members: {
        contents: []
      },
      years: []
    };
  },
  mounted() {
    this.setYear(this.members.contents)
  },
  methods: {
    setYear(contents){
      let yearSet = new Set()
      for(let content of contents){
        yearSet.add(content.enteryear)
      }
      this.years = yearSet
    }
  },
  asyncData({ error }) {
    return axios.get('https://oucrc.microcms.io/api/v1/member', {
      headers: {
        'X-API-KEY': '6d1b79a2-58de-49aa-bb5c-d2828e0d7d47'
      },
      params: {
        limit: 10000,
        fields: 'id,name,avatar,enteryear,status'
      }
    }).then(response => {
      return {
        members: response.data
      }
    }).catch(e => {
      error({
        statusCode: e.response.status,
        message: e.message
      })
    })
  }
};
</script>
