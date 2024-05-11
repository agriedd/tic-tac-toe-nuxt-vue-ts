import type { BoardCell, BoardCellHistory, Cell, Player } from "~/types/IGameBoard"

interface Options {
  onPlayerTurn?: (value: number) => void
}
export const useGameplayControl = (board: Ref<BoardCell[]>, history: Ref<BoardCellHistory[]>, playerTurn: Ref<number>, options?: Options) => {

  const switchTurn = ()=>{
    /**
     * change turn
     * 
     */
    playerTurn.value = playerTurn.value == 0 ? 1 : 0
    options?.onPlayerTurn && options.onPlayerTurn(playerTurn.value)
  }

  const playerDraw = (player: Player, position: {x: Cell, y: Cell}) : void => {
    /**
     * find cell target
     * 
     */
    const cellIndex = board.value.findIndex(e => e.x === position.x && e.y === position.y)
    board.value[cellIndex].value = player.side === 'blue' ? 'o' : 'x'

    history.value.push({
      x: position.x,
      y: position.y,
      player: player,
      value: board.value[cellIndex].value,
      created_at: new Date().getTime()
    })
    switchTurn()
  }

  return {
    playerDraw,
  }
}
