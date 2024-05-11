<script lang="ts" setup>
import type { BoardCell, BoardCellHistory, Cell, Player } from '~/types/IGameBoard';

const emit = defineEmits<{
	(e: 'update:player-turn', value: number): void
}>()

const boards = ref<BoardCell[]>([
	
]);
const history = ref<BoardCellHistory[]>([
	
]);
const players = ref<Player[]>([]);
const playerTurn = ref<number>(0)

const { generateEmpty, generatePlayers } = useGeneratorBoard()
const { playerDraw } = useGameplayControl(boards, history, playerTurn, {
	onPlayerTurn(value) {
		emit('update:player-turn', value)
	},
})

const drawCell = (position: {x: Cell, y: Cell})=>{
	const player = players.value[playerTurn.value]
	playerDraw(player, position)
}

onMounted(()=>{
	boards.value = generateEmpty()
	players.value = generatePlayers()
	emit('update:player-turn', playerTurn.value)
})

</script>
<template>
	<div class="aspect-square grid grid-cols-3 grid-rows-3 gap-1">
		<div v-for="(cell, i) in boards" :key="i" 
			@click="drawCell({x: cell.x, y: cell.y})"
			class="bg-slate-800 rounded-lg text-white flex flex-col justify-center items-center fill-slate-100 transition-all cursor-pointer hover:ring"
			:class="[
				{
					'hover:ring-blue-800 active:bg-blue-900': playerTurn === 0 && cell.value === null && !cell.mark,
					'hover:ring-rose-800 active:bg-rose-900': playerTurn === 1 && cell.value === null && !cell.mark,
					'hover:ring-blue-800': cell.value === 'o' && !cell.mark,
					'hover:ring-rose-800': cell.value === 'x' && !cell.mark,
					'!bg-blue-800 hover:ring-0': cell.value === 'o' && cell.mark,
					'!bg-rose-800 hover:ring-0': cell.value === 'x' && cell.mark,
					'!fill-slate-600 delay-500': cell.deprecated
				}
			]">
			<div v-if="cell.value === 'x'">
				<svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24" style=""><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
			</div>
			<div v-else-if="cell.value === 'o'">
				<svg xmlns="http://www.w3.org/2000/svg" width="3.2rem" height="3.2rem" viewBox="0 0 24 24" style=""><path d="M12 2C6.486 2 2 6.486 2 12c.001 5.515 4.487 10.001 10 10.001 5.514 0 10-4.486 10.001-10.001 0-5.514-4.486-10-10.001-10zm0 18.001c-4.41 0-7.999-3.589-8-8.001 0-4.411 3.589-8 8-8 4.412 0 8.001 3.589 8.001 8-.001 4.412-3.59 8.001-8.001 8.001z"></path></svg>
			</div>
		</div>
	</div>
</template>