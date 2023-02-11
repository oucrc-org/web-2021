<template>
  <div class="container mx-auto px-10">
    <Heading label="お問い合わせフォーム" class="mt-16" />

    <section class="text-center tracking-widest mt-8">
      <form @submit.prevent="submitForm" action="">
        <div class="max-w-xs mx-auto flex-col">
          <div class="my-4">
            <label for="name" class="text-left block">お名前 *</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              name="name"
              required
              placeholder="電算 太郎"
              class="inputbox"
            />
          </div>
          <div class="my-4">
            <label for="email" class="text-left block">返信用メールアドレス *</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              name="email"
              required
              placeholder="example@okayama-u.ac.jp"
              class="inputbox"
              :class="{ invalid: !valid.email }"
            />
          </div>
          <div class="my-4">
            <label for="body" class="text-left block">お問い合わせ内容 *</label>
            <textarea
              id="body"
              v-model="form.body"
              type="text"
              name="body"
              placeholder="お問い合わせ内容をご記入下さい。"
              required
              class="inputbox"
              ref="bodyTextarea"
              :style="{ height: textareaHeight }"
            />
          </div>
          <div class="flex flex-col gap-3 mt-4 text-left">
            <ValidationIndicator :condition="valid.name" label="お名前(1~20文字)" />
            <ValidationIndicator :condition="valid.email" label="返信用メールアドレス" />
            <ValidationIndicator :condition="valid.body" label="本文(20~500文字)" />
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
            :href="'https://docs.google.com/forms/d/e/1FAIpQLSfnY2gyQ5P2lVdMZri-vudGDYwUHHtZ0yo7_2Cg4aeqs7VjJw/viewform'"
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
useOG({
  title: 'お問い合わせ',
  description: 'OUCRC（岡山大学電子計算機研究会）のお問い合わせフォームです！',
})
const router = useRouter()
const form = ref({
  name: '',
  email: '',
  body: '',
})
const valid = ref({
  name: false,
  email: false,
  body: false,
})
const bodyTextAreaRef = ref<HTMLTextAreaElement>()
let invalid = ref(true)
const textareaHeight = ref('80px')
const check = () => {
  invalid.value = Object.values(valid.value).some((x) => !x)
}
const submitForm = async () => {
  if (!window.confirm('送信してもよろしいですか？')) {
    return false
  }
  // 変数をkeyにするためappend
  const params = new URLSearchParams()
  params.append('name', form.value.name)
  params.append('email', form.value.email)
  params.append('body', form.value.body)
  return await fetch(`/api/contact?${params.toString()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(() => {
      window.alert('お問い合わせが完了しました。')
      router.push('/')
      return true
    })
    .catch((e) => {
      window.alert('申し訳ありません。失敗しました')
      console.error(e)
    })
}
const resizeTextarea = () => {
  textareaHeight.value = 'auto'
  nextTick(() => {
    textareaHeight.value = bodyTextAreaRef.value?.scrollHeight + 'px'
  })
}

onMounted(() => {
  resizeTextarea()
})

watch(form.value, (newValue) => {
  valid.value.name = new RegExp(/^.{1,20}$/).test(newValue.name)

  valid.value.email =
    form.value.email.length > 0 &&
    new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(
      form.value.email
    )

  valid.value.body = new RegExp(/^.{20,500}$/).test(newValue.body)
  resizeTextarea()
  check()
})
</script>

<style scoped>
.inputbox {
  @apply border-b border-black border-solid leading-10 w-full tracking-widest placeholder-divider;
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
