<template>
  <div class="container mb-32 mx-auto px-10">

    <OGPSetter
      title="お問い合わせ"
      description="OUCRC（岡山大学電子計算機研究会）のお問い合わせフォームです！"
      :url="this.$route.path"
    />

    <Title label="お問い合わせフォーム" class="mt-16"/>

    <section class="text-center tracking-widest mt-8">
      <form @submit.prevent="submitForm" action="">
        <div class="max-w-xs mx-auto flex-col">
          <div class="my-4">
            <label for="name" class="text-left block">お名前 *</label>
            <input id="name" v-model="form.realName" type="text" :name="this.formName.name" required
                   placeholder="電算 太郎" class="inputbox">
          </div>
          <div class="my-4">
            <label for="email" class="text-left block">返信用メールアドレス *</label>
            <input id="email" v-model="form.email" type="email" :name="this.formName.email" required
                   placeholder="example@okayama-u.ac.jp" class="inputbox" :class="{'invalid': !valid.email}"
                   @change="valid.email = true">
          </div>
          <div class="my-4">
            <label for="comment" class="text-left block">お問い合わせ内容 *</label>
            <textarea id="comment" v-model="form.comment" type="text" :name="this.formName.body" placeholder="お問い合わせ内容をご記入下さい。"
                  required class="inputbox" />
          </div>
        </div>

        <DoubleLineButton label="送信" @click.native="submitForm" class="mt-16 cursor-pointer" />

        <p class="mt-16 leading-7 text-sm">フォームから送信できない場合は、<a
          :href="'https://docs.google.com/forms/d/e/' + formId + '/viewform'"
          class="font-bold text-blue-500" target="_blank" rel="noopener noreferrer">こちら</a>から送信をお願いします。</p>
      </form>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      // お問合せフォーム
      formId: '1FAIpQLSfnY2gyQ5P2lVdMZri-vudGDYwUHHtZ0yo7_2Cg4aeqs7VjJw',
      formName: {
        name: 'entry.514745000',
        email: 'entry.821989733',
        body: 'entry.1197263570'
      },
      form: {
        name: '',
        email: '',
        body: ''
      },
      valid: {
        email: false
      }
    }
  },
  methods: {
    validate() {
      const valid = this.valid
      // HTML5と同レベルのValidation（RFC非準拠）
      if (!this.form.email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        valid.email = false
        alert('メールアドレスを正しく入力して下さい。')
      }
      if (Object.values(valid).some(x => !x)) {
        return false
      }
      if (!window.confirm('送信してもよろしいですか？')) {
        return false
      }
    },
    submitForm() {
      const validate = this.validate()
      if(!validate) {
        return
      }
      const url = 'https://docs.google.com/forms/u/0/d/e/' + this.formId + '/formResponse'

      // 変数をkeyにするためappend
      const params = new URLSearchParams()
      params.append(this.formName.name, this.form.name)
      params.append(this.formName.email, this.form.email)
      params.append(this.formName.body, this.form.body)
      axios.post(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).finally(() => {
        window.alert('お問い合わせが完了しました。')
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
