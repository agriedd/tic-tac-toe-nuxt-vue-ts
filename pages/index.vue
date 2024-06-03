<script setup lang="ts">

const playerTurn = ref<number>(0)
const playerTurnUpdated = (value: number) => {
	playerTurn.value = value
}

</script>
<template>
	<div class="bg-slate-950 min-h-screen text-white flex flex-col items-center">
		<div class="max-w-sm w-full h-screen flex flex-col justify-center gap-1 p-2 relative" style="position: relative;">
			<div class="p-6 bg-slate-900 bg-opacity-90 rounded-lg rotate-180 grow transition-all text-slate-600" :class="[
				{
					'ring-1 ring-rose-900 !text-white': playerTurn === 1
				}
			]">
				Player 2
			</div>
			<div @click="$router.push({name: 'offline'})">
				<GameBoard @update:player-turn="playerTurnUpdated"></GameBoard>
			</div>
			<div class="p-6 bg-slate-900 bg-opacity-90 rounded-lg grow transition-all text-slate-600" :class="[
				{
					'ring-1 ring-blue-900 !text-white': playerTurn === 0
				}
			]">
				Player 1
			</div>
			<div class="max-w-sm w-full h-screen flex flex-col justify-end gap-1 p-2 !absolute bottom-0 left-0 right-0 bg-gradient-to-b z-10 from-slate-950 to-transparent" style="position: absolute; background: linear-gradient(to bottom, #02061700, #020617); bottom: 0px;">
				<div @click="$router.push({name: 'offline'})" class="grow">

				</div>
				<div class="p-6 transition-all text-white min-h-96 h-1/2 flex flex-col gap-4 justify-end">
					<h1 class="text-5xl font-extrabold" style="font-size: 3rem; font-weight: 900;">
						Tic Tac Toe
					</h1>
					<div class="text-slate-300 pt-8">
						Select Mode:
					</div>
					<NuxtLink class="bg-rose-700 hover:bg-rose-600 hover:shadow-rose-900 shadow-lg transition-all font-bold p-4 px-6 block rounded-lg text-center hover:ring ring-rose-300" :to="{name: 'offline'}">
						Offline
					</NuxtLink>
					<NuxtLink class="bg-teal-700 hover:bg-teal-600 hover:shadow-teal-900 shadow-lg transition-all font-bold p-4 px-6 block rounded-lg text-center hover:ring ring-teal-300" :to="{name: 'online'}">
						Online
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>