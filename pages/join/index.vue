<template>
  <div class="container mb-32 mx-auto px-10">

    <OGPSetter
      title="入部申込み"
      description="OUCRC（岡山大学電子計算機研究会）への入部申込みフォームです！"
      :url="this.$route.path"
    />

    <Title label="入部フォーム" class="mt-16"/>

    <section class="text-center tracking-widest mt-8">
      <form @submit.prevent="submitForm" action="">
        <div class="max-w-xs mx-auto flex-col">
          <div class="my-4">
            <label for="student-no" class="text-left block">学籍番号（半角）*</label>
            <input id="student-no" v-model="form.studentNumber" type="text" minlength="8" maxlength="8"
                   name="entry.1552183669" required placeholder="01234567" class="inputbox"
                   :class="{'invalid': !valid.studentNumber}" @change="valid.studentNumber = true">
          </div>
          <div class="my-4">
            <label for="real-name" class="text-left block">名前*</label>
            <input id="real-name" v-model="form.realName" type="text" name="entry.514745000" required
                   placeholder="電算 太郎" class="inputbox">
          </div>
          <div class="my-4">
            <label for="email" class="text-left block">大学のメールアドレス（半角）*</label>
            <input id="email" v-model="form.email" type="email" name="entry.821989733" required
                   placeholder="example@okayama-u.ac.jp" class="inputbox" :class="{'invalid': !valid.email}"
                   @change="valid.email = true">
          </div>
          <div class="my-4">
            <label for="phone" class="text-left block">電話番号（半角）*</label>
            <input id="phone" v-model="form.phone" type="tel" minlength="9" maxlength="13" name="entry.793184820"
                   required placeholder="090-1234-5678" class="inputbox" :class="{'invalid': !valid.phone}"
                   @change="valid.phone = true">
          </div>
          <div class="my-4">
            <label for="nickname" class="text-left block">ニックネーム</label>
            <input id="nickname" v-model="form.nickname" type="text" name="entry.1050056731" placeholder="任意"
                   class="inputbox">
          </div>
          <div class="my-4">
            <label for="hobby" class="text-left block">趣味</label>
            <input id="hobby" v-model="form.hobby" type="text" name="entry.528663940"
                   placeholder="電子工作,アプリ開発,ゲーム,etc..." class="inputbox">
          </div>
          <div class="my-4">
            <label for="comment" class="text-left block">一言コメント</label>
            <input id="comment" v-model="form.comment" type="text" name="entry.1197263570" placeholder="任意"
                   class="inputbox">
          </div>
        </div>

        <DoubleLineButton label="送信" @click.native="submitForm" class="mt-16 cursor-pointer"/>
      </form>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        studentNumber: '',
        realName: '',
        email: '',
        phone: '',
        nickname: '',
        hobby: '',
        comment: ''
      },
      valid: {
        studentNumber: false,
        email: false,
        phone: false
      }
    }
  },
  methods: {
    submitForm() {
      if (!this.form.studentNumber.match(/^[0-9]{8}$/)) {
        this.valid.studentNumber = false
      }
      // HTML5と同レベルのValidation（RFC非準拠）
      if (!this.form.email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        this.valid.email = false
      }
      if (!this.form.phone.match(/^[0-9-()]{9,13}$/)) {
        this.valid.phone = false
      }
      if (Object.values(this.valid).some(x => !x)) {
        return false
      }
      if (!window.confirm('送信してもよろしいですか？')) {
        return false
      }

      const url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSds9xqdBsruaabapqvRkaW1gV10pv9lOJNasLCv5CHDZokdwQ/formResponse'
      const params = new URLSearchParams({
        'entry.1552183669': this.form.studentNumber,
        'entry.514745000': this.form.realName,
        'entry.821989733': this.form.email,
        'entry.793184820': this.form.phone,
        'entry.1050056731': this.form.nickname,
        'entry.528663940': this.form.hobby,
        'entry.1197263570': this.form.comment
      })
      axios.post(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).finally(() => {
        window.alert('申込みが完了しました。')
        this.$router.push('/')
        return true
      })
    }
  }
}
</script>

<style scoped>
.inputbox {
  @apply border-b border-black border-solid leading-10 text-center w-full tracking-widest placeholder-divider
}

input.inputbox:placeholder-shown {
  @apply border-b border-black
}

.inputbox:valid {
  @apply border-b-2 border-green-500
}

.inputbox:invalid, .inputbox.invalid {
  @apply border-b-2 border-red-600
}
</style>
