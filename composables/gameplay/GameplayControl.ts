import type {
  BoardCell,
  BoardCellHistory,
  Cell,
  Player,
} from "~/types/IGameBoard";

interface Options {
  onPlayerTurn?: (value: number) => void,
  onPlayerDraw?: (value: number) => void,
  onWin?: () => void
}
export const useGameplayControl = (
  board: Ref<BoardCell[]>,
  history: Ref<BoardCellHistory[]>,
  playerTurn: Ref<number>,
  options?: Options
) => {

  let winner: boolean = false

  const winConds = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]

  const { generateEmpty } = useGeneratorBoard()

  const switchTurn = () => {
    /**
     * change turn
     *
     */
    playerTurn.value = playerTurn.value == 0 ? 1 : 0;
    options?.onPlayerTurn && options.onPlayerTurn(playerTurn.value);
  };

  const checkLines = () => {
    const lastSideDraw = playerTurn.value === 0 ? "x" : "o";
    const lastSideLines = board.value
      .map((e, i) => ({ i, ...e }))
      .filter((e) => e.value === lastSideDraw && !e.deprecated)
      .map((e) => e.i);

    const stacks: {cond: number, point: number}[] = []

    lastSideLines.forEach(e => {
      winConds.forEach((conds, condIndex) => {
        conds.forEach(cond => {
          if(e == cond){
            let indexStack = stacks.findIndex(stack => stack.cond === condIndex)
            if(indexStack > -1){
              const point = stacks[indexStack].point + 1
              stacks[indexStack].point = point
              if(point === 3){
                winner = true
                return
              }
            } else {
              stacks.push({
                cond: condIndex,
                point: 1
              })
            }
          }
        })
        if(winner) return
      })
      if(winner) return
    })

    if(winner){
      const stackIndex = stacks.findIndex(e => e.point === 3)
      const winOnCondIndex = stacks[stackIndex].cond
      const conds = winConds[winOnCondIndex]

      /**
       * mark cells
       * 
       */
      conds.forEach(cond => {
        board.value[cond].mark = true
      })

      options?.onWin && options.onWin()
    }

  };

  const resetGame = ()=>{
    board.value = generateEmpty()
    history.value = []
    winner = false
  }

  const checkMaxBoard = ()=>{
    const lastSideDraw = playerTurn.value === 0 ? "x" : "o";
    const curentSideDraw = playerTurn.value === 0 ? "o" : "x";
    const playerDraws = board.value.filter(e => e.value === lastSideDraw).length
    /**
     * if last player draw is greater or equal to 3 then set deprecated to it
     * and remove the current player deprecate draw
     * 
     */
    if(playerDraws >= 3){
      /**
       * set oldest player's draw to deprecated
       * 
       */
      
      const playerDrawHistories = history.value.filter(e => e.value === curentSideDraw)
      const oldestPlayerDraw = playerDrawHistories.reverse().find((_e, i) => i == 2)

      board.value.forEach((cell, cellIndex) => {
        if(cell.x === oldestPlayerDraw?.x && cell.y === oldestPlayerDraw?.y){
          board.value[cellIndex].deprecated = true
        }
      })
    }
    
    board.value.forEach((cell, cellIndex) => {
      if(cell.deprecated === true && cell.value === lastSideDraw){
        /**
         * remove deprecated
         * 
         */
        board.value[cellIndex].value = null
      }
    })
  }

  const playerDraw = (player: Player, position: { x: Cell; y: Cell }): void => {

    if(winner){
      resetGame()
      return
    }

    /**
     * find cell target
     *
     */
    const cellIndex = board.value.findIndex(
      (e) => e.x === position.x && e.y === position.y
    );
    /**
     * check if the cell is empty
     *
     */
    if (board.value[cellIndex].value == null || board.value[cellIndex].deprecated) {
      /**
       * 
       * set cell value
       *
       */
      board.value[cellIndex].value = player.side === "blue" ? "o" : "x";
      board.value[cellIndex].deprecated = undefined

      history.value.push({
        x: position.x,
        y: position.y,
        player: player,
        value: board.value[cellIndex].value,
        created_at: new Date().getTime(),
      });

      options?.onPlayerDraw && options.onPlayerDraw(playerTurn.value)

      switchTurn();
      checkLines();
      checkMaxBoard();

    } else {
      /**
       * can't set value
       *
       */
    }
  };

  return {
    playerDraw,
  };
};
