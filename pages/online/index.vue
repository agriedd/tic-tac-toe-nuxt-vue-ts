<script setup lang="ts">

import type { Cell } from '~/types/IGameBoard';
import happyPop from "../../public/sound/happy-pop-2-185287.mp3"
import winnerSound from "../../public/sound/sound-effect-twinklesparkle-115095.mp3"

const bubble = useSound(happyPop)
const paper = useSound(happyPop)
const win = useSound(winnerSound)

const { vibrate, isSupported } = useVibrate({ pattern: [100] })
const { vibrate: celebrateVib } = useVibrate({ pattern: [1000, 300] })

const { 
	playerTurn, disconnect, tryConnect, connectionsCount, connectionId, 
	waitingPlayer, boards, histories, players, playerDraw, isPlayer, isScpectactors, isWinner, winnerPlayer,
	loadPlayersAndBoards, playerSide, connections, scores
} = useGameConnection({
	onDraw() {
		if(isSupported.value){
			vibrate()
		}
		if(bubble.isPlaying.value){
			bubble.stop()
		}
		bubble.play()
	},
	onWin() {
		if(isSupported.value){
			celebrateVib()
		}
		if(win.isPlaying.value){
			win.stop()
		}
		win.play()
	},
})

const drawCell = (position: {x: Cell, y: Cell})=>{
	playerDraw(position)
}

onUpdated(() => {
	tryConnect()
})
onMounted(() => {
	tryConnect()
})
onUnmounted(() => {
	disconnect()
})

const isRedPlayer = computed(()=>{
	return isPlayer.value && playerSide.value === 'red'
})

</script>
<template>
	<div class="bg-slate-950 min-h-screen text-white flex flex-col items-center">
		<div class="flex gap-1 max-w-sm w-full">
			<div class="grow w-full h-screen flex justify-center gap-1 relative p-2" :class="[isRedPlayer ? 'flex-col-reverse' : 'flex-col']">
				<NuxtLink :to="{path: '/'}" class="p-3 aspect-square rounded-full fill-white bg-slate-700 absolute m-4 top-0 right-0 z-10">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style=""><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
				</NuxtLink>
				<div class="p-6 bg-slate-900 bg-opacity-90 rounded-lg grow transition-all text-slate-600" :class="[
					{
						'ring-1 ring-rose-900 !text-white': playerTurn === 'red',
						'!bg-rose-700 !text-white': isPlayer && playerSide === 'red' && playerTurn === playerSide,
						'!bg-rose-950 !text-white': isPlayer && playerSide === 'red' && playerTurn !== playerSide,
					},
					!isRedPlayer ? 'rotate-180' : ''
				]">
					Player 2
				</div>
				<div class="bg-slate-900 p-5 rounded-lg text-sm flex gap-2 fill-green-400 text-green-400 items-center">
					<svg xmlns="http://www.w3.org/2000/svg" width=".5rem" height=".5rem" viewBox="0 0 24 24" style=""><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"></path></svg>
					<div>
						(online: {{ connectionsCount }})
					</div>
				</div>
				<div>
					<GameBoardOnline :boards="boards" :player-turn="playerTurn" @draw-cell="drawCell" :is-player="isPlayer" :is-spectactor="isScpectactors" :player-side="playerSide"></GameBoardOnline>
				</div>
				<!-- <div>
					<div v-for="player in players">
						{{ player.id }}
						{{ player.side }}
					</div>
					<div class="p-4">
						{{ connectionId }}
						{{ playerSide }}
					</div>
	
					<div v-for="item in connections">
						{{ item.id }}
					</div>
				</div> -->
				<div v-if="winnerPlayer">
					<div class="bg-blue-400 p-5 text-slate-900 rounded-lg text-sm capitalize font-bold flex gap-2 justify-between" v-if="winnerPlayer?.side === 'blue'">
						<div>
							{{ winnerPlayer?.side }} side won the game!
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style=""><path d="M23 7a8.44 8.44 0 0 0-5 1.31c-.36-.41-.73-.82-1.12-1.21l-.29-.27.14-.12a3.15 3.15 0 0 0 .9-3.49A3.9 3.9 0 0 0 14 1v2a2 2 0 0 1 1.76 1c.17.4 0 .84-.47 1.31l-.23.21a16.71 16.71 0 0 0-3.41-2.2c-2.53-1.14-3.83-.61-4.47 0a2.18 2.18 0 0 0-.46.68l-.18.53L5.1 8.87C6.24 11.71 9 16.76 15 18.94l5-1.66a1 1 0 0 0 .43-.31l.21-.18c1.43-1.44.51-4.21-1.41-6.9A6.63 6.63 0 0 1 23 9zm-3.79 8.37h-.06c-.69.37-3.55-.57-6.79-3.81-.34-.34-.66-.67-.95-1-.1-.11-.19-.23-.29-.35l-.53-.64-.28-.39c-.14-.19-.28-.38-.4-.56s-.16-.26-.24-.39-.22-.34-.31-.51-.13-.24-.19-.37-.17-.28-.23-.42-.09-.23-.14-.34-.11-.27-.15-.4S8.6 6 8.58 5.9s-.06-.24-.08-.34a2 2 0 0 1 0-.24 1.15 1.15 0 0 1 0-.26l.11-.31c.17-.18.91-.23 2.23.37a13.83 13.83 0 0 1 2.49 1.54A4.17 4.17 0 0 1 12 7v2a6.43 6.43 0 0 0 3-.94l.49.46c.44.43.83.86 1.19 1.27A5.31 5.31 0 0 0 16 13.2l2-.39a3.23 3.23 0 0 1 0-1.14c1.29 1.97 1.53 3.39 1.21 3.7zM4.4 11l-2.23 6.7A3.28 3.28 0 0 0 5.28 22a3.21 3.21 0 0 0 1-.17l6.52-2.17A18.7 18.7 0 0 1 4.4 11z"></path></svg>
					</div>
					<div class="bg-rose-400 p-5 text-slate-900 rounded-lg text-sm capitalize font-bold flex gap-2 justify-between" v-else>
						<div>
							{{ winnerPlayer?.side }} side won the game!
						</div>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style=""><path d="M23 7a8.44 8.44 0 0 0-5 1.31c-.36-.41-.73-.82-1.12-1.21l-.29-.27.14-.12a3.15 3.15 0 0 0 .9-3.49A3.9 3.9 0 0 0 14 1v2a2 2 0 0 1 1.76 1c.17.4 0 .84-.47 1.31l-.23.21a16.71 16.71 0 0 0-3.41-2.2c-2.53-1.14-3.83-.61-4.47 0a2.18 2.18 0 0 0-.46.68l-.18.53L5.1 8.87C6.24 11.71 9 16.76 15 18.94l5-1.66a1 1 0 0 0 .43-.31l.21-.18c1.43-1.44.51-4.21-1.41-6.9A6.63 6.63 0 0 1 23 9zm-3.79 8.37h-.06c-.69.37-3.55-.57-6.79-3.81-.34-.34-.66-.67-.95-1-.1-.11-.19-.23-.29-.35l-.53-.64-.28-.39c-.14-.19-.28-.38-.4-.56s-.16-.26-.24-.39-.22-.34-.31-.51-.13-.24-.19-.37-.17-.28-.23-.42-.09-.23-.14-.34-.11-.27-.15-.4S8.6 6 8.58 5.9s-.06-.24-.08-.34a2 2 0 0 1 0-.24 1.15 1.15 0 0 1 0-.26l.11-.31c.17-.18.91-.23 2.23.37a13.83 13.83 0 0 1 2.49 1.54A4.17 4.17 0 0 1 12 7v2a6.43 6.43 0 0 0 3-.94l.49.46c.44.43.83.86 1.19 1.27A5.31 5.31 0 0 0 16 13.2l2-.39a3.23 3.23 0 0 1 0-1.14c1.29 1.97 1.53 3.39 1.21 3.7zM4.4 11l-2.23 6.7A3.28 3.28 0 0 0 5.28 22a3.21 3.21 0 0 0 1-.17l6.52-2.17A18.7 18.7 0 0 1 4.4 11z"></path></svg>
					</div>
				</div>
				<div v-else>
					<div class="bg-orange-400 p-5 text-slate-900 rounded-lg text-sm" v-if="isScpectactors">
						Spectacting...
					</div>
					<div class="bg-slate-900 p-5 text-slate-400 rounded-lg text-sm" v-else>
						<template v-if="playerSide === playerTurn">
							Your turn
						</template>
						<template v-else>
							Opponen turn
						</template>
					</div>
				</div>
				<div class="p-6 bg-slate-900 bg-opacity-90 rounded-lg grow transition-all text-slate-600" :class="[
					{
						'ring-1 ring-blue-900 !text-white': playerTurn === 'blue',
						'!bg-blue-700 !text-white': isPlayer && playerSide === 'blue' && playerTurn === playerSide,
						'!bg-blue-950 !text-white': isPlayer && playerSide === 'blue' && playerTurn !== playerSide,
					},
					isRedPlayer ? 'rotate-180' : ''
				]">
					<div>
						Player 1
					</div>
				</div>
				<div class="fixed bottom-0 shadow-2xl bg-black left-0 right-0 top-0 h-full w-full bg-opacity-80 flex flex-col justify-end items-center p-4"
					v-if="waitingPlayer">
					<div class="p-4 text-white max-w-sm w-full bg-slate-800 rounded-lg text-sm">
						Waiting For other player...
					</div>
				</div>
			</div>
			<div class="fixed right-0 max-w-14 h-screen flex flex-col justify-center text-slate-800 select-none pointer-events-none">
				<div class="absolute rotate-90 w-48 origin-bottom-left text-4xl font-black font-mono -translate-y-[250%] text-center" v-if="isRedPlayer">
					<span class="text-blue-900">
						{{ scores.blue }} 
					</span>
					- 
					<span class="text-red-900">
						{{ scores.red }}
					</span>
				</div>
				<div class="absolute rotate-90 w-48 origin-bottom-left text-4xl font-black font-mono -translate-y-[250%] text-center" v-else>
					<span class="text-red-900">
						{{ scores.red }}
					</span>
					- 
					<span class="text-blue-900">
						{{ scores.blue }} 
					</span>
				</div>
			</div>
		</div>
	</div>
</template>