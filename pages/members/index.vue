<template>
  <div class="container mb-32 mt-16 mx-auto px-10">
    <Title label="部員一覧"/>

    <div v-for="n in 4">
      <div class="mb-12 mt-20 relative text-center">
        <div class="border-b border-heading pt-3"></div>
        <h3
          class="absolute bg-white font-bold inline-block mx-auto left-0 right-0 text-subtext top-0 tracking-widest w-24">
          １回生
        </h3>
      </div>

      <div class="grid grid-cols-5 gap-10 px-32">
        <NuxtLink to="members/{member_id}" class="transform hover:scale-103 transition duration-500 ease-in-out"
                  v-for="n in 9">
          <div class="px-5">
            <img class="rounded-full" alt="仮"
                 src="https://avatars.githubusercontent.com/u/58544849?s=460&u=9e921c5bba0462a1873f73f3d8d98dcad33a2bd7&v=4">
          </div>
          <p class="font-bold mt-3 text-center text-lg text-secondary">いけちぃ</p>
          <div class="overflow-hidden px-3 text-center text-sm text-subtext">
            <p class="overflow-hidden overflow- whitespace-no-wrap" style="text-overflow: ellipsis">Apple信徒</p>
          </div>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script>
export default {}
</script>
