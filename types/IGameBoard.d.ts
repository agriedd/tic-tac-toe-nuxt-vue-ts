export type Cell = 0 | 1 | 2
export type Side = 'red'|'blue'
export type Draw = 'x' | 'o' | null
export interface BoardCell {
	x: Cell,
	y: Cell,
	value: Draw,
	mark: boolean
}
export interface BoardCellHistory {
	x: Cell,
	y: Cell,
	value: Draw,
	player: Player,
	created_at: number,
}

export interface Player {
	side: Side,
	name: string,
	created_at: number,
}