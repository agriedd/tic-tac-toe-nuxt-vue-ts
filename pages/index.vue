<script setup lang="ts">

const playerTurn = ref<number>(0)
const playerTurnUpdated = (value: number) => {
	playerTurn.value = value
}

</script>
<template>
	<div class="bg-red-300">
		Hello
	</div>
</template>