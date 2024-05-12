<script setup lang="ts">

const playerTurn = ref<number>(0)
const playerTurnUpdated = (value: number) => {
	playerTurn.value = value
}

</script>
<template>
	<div class="bg-slate-950 min-h-screen text-white flex flex-col items-center">
		<div class="max-w-sm w-full h-screen flex flex-col justify-center gap-1 p-2">
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