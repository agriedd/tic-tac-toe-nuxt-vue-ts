<script setup lang="ts">

const playerTurn = ref<number>(0)
const playerTurnUpdated = (value: number) => {
	playerTurn.value = value
}

</script>
<template>
	<div class="bg-slate-950 min-h-screen text-white flex flex-col items-center">
		<div class="max-w-sm w-full h-screen flex flex-col justify-center gap-2 p-2">
			<div class="p-6 bg-slate-900 rounded-lg rotate-180 grow transition-all" :class="[
				{
					'ring ring-rose-400': playerTurn === 1
				}
			]">
				Player 2
			</div>
			<div>
				<!-- <GameBoard @update:player-turn="playerTurnUpdated"></GameBoard> -->
			</div>
			<div class="p-6 bg-slate-900 rounded-lg grow transition-all" :class="[
				{
					'ring ring-blue-400': playerTurn === 0
				}
			]">
				Player 1
			</div>
		</div>
	</div>
</template>