<script setup lang="ts">

const playerTurn = ref<number>(0)
const waitingPlayer = ref<boolean>(false)
const connectionId = ref<string|undefined>()
const connectionsCount = ref<number>(0)

const playerTurnUpdated = (value: number) => {
	playerTurn.value = value
}

const { $io } = useNuxtApp();

$io.on("on-connect", (event) => { connectionId.value = event.id })

$io.on("player-on-side", (event) => { 
	if(connectionId.value === event.id) {
		alert(event.side)
	} 
})

$io.on("waiting-player", () => { waitingPlayer.value = true })
$io.on("player-disconnect", () => {  })
$io.on("on-connections-update", (event) => { connectionsCount.value = event.count })

const sendPing = () => {
	console.log('Click');
	$io.emit("message", "new message sent");
}

</script>
<template>
	<div class="bg-slate-950 min-h-screen text-white flex flex-col items-center">
		<div class="max-w-sm w-full h-screen flex flex-col justify-center gap-1 p-2">
			<div class="p-6 bg-slate-900 bg-opacity-90 rounded-lg rotate-180 grow transition-all text-slate-600" :class="[
				{
					'ring-1 ring-rose-900 !text-white': playerTurn === 1
				}
			]" @click="sendPing">
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
				Player 1 (online: {{ connectionsCount }})
			</div>
			<div class="fixed bottom-0 shadow-2xl bg-black left-0 right-0 top-0 h-full w-full bg-opacity-80 flex flex-col justify-end items-center p-4" v-if="waitingPlayer">
				<div class="p-4 text-white max-w-sm w-full bg-slate-800 rounded-lg text-sm">
					Menunggu Pemain Lain...
				</div>
			</div>
		</div>
	</div>
</template>