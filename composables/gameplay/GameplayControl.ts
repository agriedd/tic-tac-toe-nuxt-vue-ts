import type {
  BoardCell,
  BoardCellHistory,
  Cell,
  Player,
} from "~/types/IGameBoard";

interface Options {
  onPlayerTurn?: (value: number) => void,
  onWin?: () => void
}
export const useGameplayControl = (
  board: Ref<BoardCell[]>,
  history: Ref<BoardCellHistory[]>,
  playerTurn: Ref<number>,
  options?: Options
) => {

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
      .filter((e) => e.value === lastSideDraw)
      .map((e) => e.i);

    const stacks: {cond: number, point: number}[] = []
    let winner: boolean = false

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

  const playerDraw = (player: Player, position: { x: Cell; y: Cell }): void => {
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
    if (board.value[cellIndex].value == null) {
      /**
       * set cell value
       *
       */
      board.value[cellIndex].value = player.side === "blue" ? "o" : "x";

      history.value.push({
        x: position.x,
        y: position.y,
        player: player,
        value: board.value[cellIndex].value,
        created_at: new Date().getTime(),
      });
      switchTurn();
      checkLines();
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
