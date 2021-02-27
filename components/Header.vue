<template>
	<div id="header" class="bg-white text-lg flex flex-row justify-between sticky top-0 w-full z-50">
		<NuxtLink to="/" class="m-2 flex flex-row items-center">
			<img src="~/assets/images/oucrc-logo-small.png" alt="ロゴ">
			<img src="~/assets/images/oucrc-label-small.png" alt="岡山大学電子計算機研究会" class="hidden md:block">
		</NuxtLink>
		<div class="m-2 hidden md:flex flex-grow justify-end">
			<nav id="navigation" class="self-center">
				<NuxtLink to="/">ホーム</NuxtLink>
				<NuxtLink to="/article">作品紹介</NuxtLink>
				<NuxtLink to="/members">部員紹介</NuxtLink>
				<NuxtLink to="/join">入部フォーム</NuxtLink>
			</nav>
		</div>
		<div class="h-auto flex flex-row">
			<img src="~/assets/images/search.svg" width="23" height="23" alt="検索" class="m-2">
			<img src="~/assets/images/hamburger.svg" width="23" height="16" alt="メニュー" class="m-2 block md:hidden">
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style scoped>
#navigation > * {
	@apply m-1
}
</style>
