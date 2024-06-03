<script setup lang="ts">

const playerTurn = ref<number>(0)
const playerTurnUpdated = (value: number) => {
	playerTurn.value = value
}

</script>
<template>
	<div class="bg-slate-950 min-h-screen text-white flex flex-col items-center relative">
		<NuxtLink :to="{path: '/'}" class="p-3 aspect-square rounded-full fill-white bg-slate-700 absolute m-4 top-0 right-0 z-20">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style=""><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
		</NuxtLink>
		<div class="max-w-sm w-full h-screen flex flex-col justify-center gap-1 p-2 relative">
			<div class="p-6 bg-slate-900 bg-opacity-90 rounded-lg rotate-180 grow transition-all text-slate-600" :class="[
				{
					'ring-1 ring-rose-900 !text-white': playerTurn === 1
				}
			]">
				Player 2
			</div>
			<div>
				<GameBoard @update:player-turn="playerTurnUpdated"></GameBoard>
			</div>
			<div class="p-6 bg-slate-900 bg-opacity-90 rounded-lg grow transition-all text-slate-600" :class="[
				{
					'ring-1 ring-blue-900 !text-white': playerTurn === 0
				}
			]">
				Player 1
			</div>
		</div>
	</div>
</template>