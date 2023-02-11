<template>
  <div class="container mb-32 mx-auto px-10">
    <Heading label="入部フォーム" class="mt-16" />

    <section class="text-center tracking-widest mt-8">
      <form @submit.prevent="submitForm" action="">
        <div class="max-w-xs mx-auto flex-col">
          <div class="my-4">
            <label for="student-no" class="text-left block">学籍番号（半角）*</label>
            <input
              id="student-no"
              v-model="form.studentNumber"
              type="text"
              minlength="8"
              maxlength="8"
              name="entry.1552183669"
              required
              placeholder="01234567"
              class="inputbox"
              :class="{ invalid: !valid.studentNumber }"
              @change="valid.studentNumber = true"
            />
          </div>
          <div class="my-4">
            <label for="real-name" class="text-left block">名前*</label>
            <input
              id="real-name"
              v-model="form.realName"
              type="text"
              name="entry.514745000"
              required
              placeholder="電算 太郎"
              class="inputbox"
            />
          </div>
          <div class="my-4">
            <label for="email" class="text-left block">大学のメールアドレス（半角）*</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              name="entry.821989733"
              required
              placeholder="example@okayama-u.ac.jp"
              class="inputbox"
              :class="{ invalid: !valid.email }"
              @change="valid.email = true"
            />
          </div>
          <div class="my-4">
            <label for="phone" class="text-left block">電話番号（半角）*</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              minlength="9"
              maxlength="13"
              name="entry.793184820"
              required
              placeholder="090-1234-5678"
              class="inputbox"
              :class="{ invalid: !valid.phone }"
              @change="valid.phone = true"
            />
          </div>
          <div class="my-4">
            <label for="nickname" class="text-left block">ニックネーム*</label>
            <input
              id="nickname"
              v-model="form.nickname"
              type="text"
              name="entry.1050056731"
              placeholder="タロー"
              required
              class="inputbox"
              :class="{ invalid: !valid.nickname }"
              @change="valid.nickname = true"
            />
          </div>
          <div class="my-4">
            <label for="hobby" class="text-left block">趣味</label>
            <input
              id="hobby"
              v-model="form.hobby"
              type="text"
              name="entry.528663940"
              placeholder="電子工作,アプリ開発,ゲーム,etc..."
              class="inputbox"
            />
          </div>
          <div class="my-4">
            <label for="comment" class="text-left block">一言コメント</label>
            <input
              id="comment"
              v-model="form.comment"
              type="text"
              name="entry.1197263570"
              placeholder="任意"
              class="inputbox"
            />
          </div>
        </div>

        <DoubleLineButton
          label="送信"
          @click.native="submitForm"
          class="mt-16 cursor-pointer"
          :disabled="invalid"
        />

        <p class="mt-16 leading-7 text-sm">
          フォームから送信できない場合は、<a
            href="https://docs.google.com/forms/d/e/1FAIpQLSds9xqdBsruaabapqvRkaW1gV10pv9lOJNasLCv5CHDZokdwQ/viewform"
            class="font-bold text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
            >こちら</a
          >から送信をお願いします。
        </p>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '入部申込み',
  description: 'OUCRC（岡山大学電子計算機研究会）への入部申込みフォームです！',
})
let invalid = ref(true)
const form = ref({
  studentNumber: '',
  realName: '',
  email: '',
  phone: '',
  nickname: '',
  hobby: '',
  comment: '',
})
const valid = ref({
  studentNumber: false,
  email: false,
  phone: false,
  nickname: false,
})
const check = () => {
  invalid.value = Object.values(valid.value).some((x) => !x)
}
const router = useRouter()
watch(form.value, () => {
  if (!form.value.studentNumber.match(/^[a-zA-Z0-9]{8}$/)) {
    valid.value.studentNumber = false
  }
  // HTML5と同レベルのValidation（RFC非準拠）
  if (
    !form.value.email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
  ) {
    valid.value.email = false
  }
  if (!form.value.phone.match(/^[0-9-()]{9,13}$/)) {
    valid.value.phone = false
  }
  if (form.value.nickname === '') {
    valid.value.nickname = false
  }
  check()
})
const submitForm = async () => {
  if (Object.values(valid.value).some((x) => !x)) {
    return false
  }
  if (!window.confirm('送信してもよろしいですか？')) {
    return false
  }

  const params = new URLSearchParams({
    studentNumber: form.value.studentNumber,
    realName: form.value.realName,
    email: form.value.email,
    phone: form.value.phone,
    nickname: form.value.nickname,
    hobby: form.value.hobby,
    comment: form.value.comment,
  })
  return await fetch(`/api/join?${params.toString()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(() => {
      window.alert('申込みが完了しました。')
      router.push('/')
      return true
    })
    .catch((e) => {
      window.alert('申し訳ありません。失敗しました')
      console.error(e)
    })
}
</script>

<style scoped>
.inputbox {
  @apply border-b border-black border-solid leading-10 text-center w-full tracking-widest placeholder-divider;
}

input.inputbox:placeholder-shown {
  @apply border-b border-black;
}

.inputbox:valid {
  @apply border-b-2 border-green-500;
}

.inputbox:invalid,
.inputbox.invalid {
  @apply border-b-2 border-red-600;
}
</style>
