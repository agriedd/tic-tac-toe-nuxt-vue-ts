import type { BoardCell, BoardCellHistory, Cell, Player } from "~/types/IGameBoard"
import type { BoardCellHistoryServer, BoardCellServer, ConnectionServer, PlayerServer, ScoresServer, Side } from "~/types/IGameBoardServer"


let ws: WebSocket | null = null
interface Options {
  onDraw?: ()=>void,
  onWin?: ()=>void,
}

export const useGameConnection = (options?: Options) => {

  const playerTurn = ref<Side|null>(null)
  const connectionId = ref<string | undefined>()
  const connectionsCount = ref<number>(0)
  const boards = ref<BoardCellServer[]>([]);
  const scores = ref<ScoresServer>({ blue: 0, red: 0 });
  const connections = ref<ConnectionServer[]>([]);
  const histories = ref<BoardCellHistoryServer[]>([]);
  const players = ref<PlayerServer[]>([])
  const isScpectactors = computed(()=> players.value.findIndex(({id}) => id === connectionId.value) === -1)
  const isPlayer = computed(()=> players.value.findIndex(({id}) => id === connectionId.value) > -1)
  const playerSide = computed(()=> players.value.find(({id}) => id === connectionId.value)?.side)
  const winnerPlayer = ref<PlayerServer|undefined>()
  const isWinner = computed(()=> winnerPlayer.value?.id === connectionId.value)
  const waitingPlayer = computed(()=> players.value.length < 2)

  const connect = () => {

    const config = useRuntimeConfig()

    ws = new WebSocket(config.public.wsBase as string);

    // event emmited when connected
    ws.onopen = function () {
      ws?.send(stringifyData("wants-connection-id", {}));
    }

    // event emmited when receiving message 
    ws.onmessage = function (ev) {
      const data = ev.data
      try {

        const objData = bindDataResponse(data)

        if (typeof objData !== 'undefined') {
          switch (objData.key) {
            case 'on-connect':
              if (typeof objData.data.id === 'string') {
                connectionId.value = objData.data?.id as string | undefined
                ws?.send(stringifyData("wants-connections-count", {}))
              }
              break;
            case 'on-connections-update':
              if (typeof objData.data?.count === 'number') {
                connectionsCount.value = objData.data?.count
                connections.value = objData.data?.connections as ConnectionServer[]
              }
              break;
            case 'on-board-update':
              if (typeof objData.data?.boards === 'object' && Array.isArray(objData.data?.boards)) {
                boards.value = objData.data?.boards as BoardCellServer[]
              }
              break;
            case 'on-score-update':
              if (typeof objData.data?.score === 'object') {
                scores.value = objData.data?.score as ScoresServer
              }
              break;
            case 'on-turn-update':
              if (typeof objData.data?.turn === 'string') {
                if(playerTurn.value != objData.data?.turn){
                  options?.onDraw && options?.onDraw()
                }
                playerTurn.value = objData.data?.turn as Side
              }
              break;
            case 'on-winner':
              if (typeof objData.data?.turn === 'string') {
                try {
                  const playersCloned = useCloned(players)
                  options?.onWin && options?.onWin()
                  winnerPlayer.value = playersCloned.cloned.value.find(player => player.side === objData.data?.turn)
                } catch (error) {

                }
              }
              break;
            case 'on-players-update':
              if (typeof objData.data?.players === 'object' && Array.isArray(objData.data?.players)) {
                try {
                  players.value = objData.data?.players as PlayerServer[]
                } catch (error) {
                }
              }
              break;
            case 'on-board-reset':
              winnerPlayer.value = undefined
              break;
            case 'player-disconnect':

              break;
            default:
              break;
          }
        }


      } catch (error) {

      }
    }

    ws.onerror = () => {
      connect()
    }

    ws.onclose = () => {
      connect()
    }
    ws.addEventListener("player-on-side", (event) => {

    })

  }

  const playerDraw = (position: { x: Cell; y: Cell }): void => {
    if(ws?.readyState === ws?.OPEN){
      ws?.send(stringifyData("draw-cell", position))
    }
  };

  const loadPlayersAndBoards = (): void => {
    if(ws?.readyState === ws?.OPEN){
      ws?.send(stringifyData("wants-board-update", {}))
    }
  };

  const disconnect = () => {
    ws?.close()
  }
  const tryConnect = () => {
    if (ws?.readyState === ws?.CLOSED || !ws) {
      connect()
    }
  }

  return {
    connect,
    disconnect,
    connectionId,
    connectionsCount,
    playerTurn,
    tryConnect,
    waitingPlayer,
    boards,
    histories,
    players,
    playerDraw,
    loadPlayersAndBoards,
    isPlayer,
    isScpectactors,
    winnerPlayer,
    isWinner,
    playerSide,
    connections,
    scores,
  }
}
