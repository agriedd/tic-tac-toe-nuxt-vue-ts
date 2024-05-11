import type { BoardCell, Cell, Draw, Player, Side } from "~/types/IGameBoard";

export const useGeneratorBoard = () => {
  
  const cellValueCollection: Draw[] = ['o','x', null]

  const generateRandom = (): BoardCell[] => {

    let result : BoardCell[] = []

    for(let i = 0; i < 9; i++){

      let yIndex: Cell = i % 3 as Cell
      let xIndex: Cell = parseInt(String(i / 3)) as Cell
      let value: Draw = cellValueCollection[ Math.floor(Math.random() * cellValueCollection.length) ]

      result.push({
        x: xIndex,
        y: yIndex,
        value,
        mark: false,
      })
    }

    return result

  };

  const generateEmpty = (): BoardCell[] => {

    let result : BoardCell[] = []

    for(let i = 0; i < 9; i++){

      let yIndex: Cell = i % 3 as Cell
      let xIndex: Cell = parseInt(String(i / 3)) as Cell
      let value: Draw = null

      result.push({
        x: xIndex,
        y: yIndex,
        value,
        mark: false
      })
    }

    return result

  };

  const generatePlayers = (): Player[] => {

    let result : Player[] = []

    for(let i = 0; i < 2; i++){
      
      const sideCollection : Side[] = ['blue', 'red']
      const side: Side = sideCollection[i]

      result.push({
        name: `Player ${i+1}`,
        created_at: new Date().getTime(),
        side,
      })
    }

    return result

  };

  return {
    generateRandom,
    generateEmpty,
    generatePlayers,
  };
};
