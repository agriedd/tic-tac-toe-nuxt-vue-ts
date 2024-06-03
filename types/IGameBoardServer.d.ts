export type Cell = 0 | 1 | 2;
export type Side = "red" | "blue";
export type Draw = "x" | "o" | null;

export interface BoardCellServer {
  x: Cell;
  y: Cell;
  value: Draw;
  mark: boolean;
  deprecated?: boolean;
}
export interface BoardCellHistoryServer {
  x: Cell;
  y: Cell;
  value: Draw;
  player: Player;
  created_at: number;
}

export interface PlayerServer {
  side: Side;
  name: string;
  created_at: number;
  id: string;
}

export interface ConnectionServer {
  id: string;
  created_at: number;
}

export interface ScoresServer {
	red: number,
	blue: number,
  }
  