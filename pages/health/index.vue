<template>
  <div id="health" class="container text-center mx-auto">
    <div v-if="showAlert" class="bg-blockquote mt-8 py-3 relative text-green-600">
      <a class="absolute cursor-pointer mr-4 right-0" @click="showAlert = false">×</a>
      <p>{{ alert }}</p>
    </div>
    <form @submit.prevent="register" v-if="issetMember" class="mt-8">
      <fieldset>
        <legend class="text-primary text-2xl">体温を入力してください</legend>

        <img
          class="mt-16 mx-auto"
          src="@/assets/images/health/health2.png"
          width="200"
          height="200"
          alt="Icon"
        />

        <div>
          <input
            v-model="temperature"
            type="number"
            max="38"
            min="35"
            step="0.1"
            class="bg-blockquote mt-8 px-4 py-2 text-primary w-64"
            placeholder="35.0 〜 38.0"
            required
          />
        </div>

        <button
          class="bg-secondary cursor-pointer inline-block mt-10 px-5 py-2 text-white"
          type="submit"
        >
          完了
        </button>

        <div class="mt-4">
          <a class="cursor-pointer text-primary" @click="resetMember"
            >{{ memberName }}ではありません</a
          >
        </div>
      </fieldset>
    </form>
    <form v-else class="mt-8">
      <fieldset>
        <legend class="text-primary text-2xl">あなたのニックネームを選択してください</legend>

        <img
          class="mt-16 mx-auto"
          src="@/assets/images/health/health1.png"
          width="200"
          height="200"
          alt="Icon"
        />

        <div>
          <select v-model="memberKey" class="bg-blockquote mt-8 px-5 py-2 text-primary w-64">
            <option disabled value="initial">ニックネームを選択</option>
            <option
              v-for="member in members"
              :key="member.member_key"
              v-bind:value="member.member_key"
            >
              {{ member.nick_name }}
            </option>
          </select>
        </div>

        <div class="mt-4">
          <label class="text-primary">
            <input v-model="saveMemberKey" type="checkbox" />
            次回もこのユーザーで入力する
          </label>
        </div>

        <a
          class="bg-secondary cursor-pointer inline-block mt-10 px-5 py-2 text-white"
          @click="confirmMember"
        >
          次へ
        </a>
      </fieldset>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      showAlert: false,
      alert: null,
      members: null,
      issetMember: false,
      memberKey: 'initial',
      memberName: null,
      saveMemberKey: false,
      temperature: null,
    }
  },
  watch: {
    memberKey: {
      immediate: true,
      handler() {
        if (this.memberKey !== 'initial')
          axios
            .get(
              'https://i10jan-api.herokuapp.com/v1.1/personal/inputTemperatureAction?member_key=' +
                this.memberKey
            )
            .then((response) => {
              if (response.data.success) this.memberName = response.data.data
            })
      },
    },
  },
  asyncData() {
    return axios
      .get('https://i10jan-api.herokuapp.com/v1.1/personal/memberSelectAction')
      .then((response) => {
        if (response.data.success)
          return {
            members: response.data.data,
          }
      })
  },
  mounted() {
    if (this.$cookies.get('MemberKey') !== undefined && this.$cookies.get('MemberKey') !== null) {
      this.issetMember = true
      this.memberKey = this.$cookies.get('MemberKey')
    }
  },
  methods: {
    confirmMember: function () {
      if (this.memberKey === 'initial') {
        this.showAlert = true
        this.alert = 'ニックネームを選択してください'
      } else {
        this.showAlert = false
        this.issetMember = true
        if (this.saveMemberKey) this.$cookies.set('MemberKey', this.memberKey)
      }
    },
    resetMember: function () {
      this.issetMember = false
      this.memberKey = 'initial'
      this.$cookies.remove('MemberKey')
    },
    register: function () {
      if (this.temperature == null || this.temperature < 35 || this.temperature > 38) {
        this.showAlert = true
        this.alert = '35.0℃ 〜 38.0℃で体温を入力してください'
      } else {
        this.showAlert = false
        axios
          .post(
            'https://i10jan-api.herokuapp.com/v1.1/personal/registerAction?member_key=' +
              this.memberKey +
              '&body_temperature=' +
              this.temperature
          )
          .then((response) => {
            if (response.data.success) {
              this.temperature = null
              this.showAlert = true
              this.alert = '登録完了しました！'
            } else {
              this.showAlert = true
              this.alert = '登録に失敗しました'
            }
          })
      }
    },
  },
}
</script>

<style scoped></style>
