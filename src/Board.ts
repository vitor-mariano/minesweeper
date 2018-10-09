import Square from './Squares/Square';
import Safe from './Squares/Safe';
import Bomb from './Squares/Bomb';
import 'core-js/features/array/flat';

type Size = [number, number];
type Point = [number, number];

enum Coordinates { X, Y }

export default class Board {
  public map: Square[][];

  constructor(
    public size: Size,
    public bombs: number,
  ) {}

  private getArea(): number {
    const [width, height] = this.size;

    return width * height;
  }

  generate(firstPoint: Point): Square[][] {
    const [width, height] = this.size;
    const bombIndexes = this.generateBombIndexes(firstPoint);

    return Array.from(Array(height), (value, y) =>
      Array.from(Array(width), (value, x) =>
        bombIndexes.includes(this.convertPointToIndex([x, y])) ?
          new Bomb :
          new Safe(
            this.countBombsNear([x, y], bombIndexes),
            x === firstPoint[Coordinates.X] && y === firstPoint[Coordinates.Y],
          ),
      ),
    );
  }

  private generateBombIndexes(excludedPoint: Point): number[] {
    const excludedIndex = this.convertPointToIndex(excludedPoint);

    return Array
      .from(Array(this.getArea()), (value, index) => ({
        index,
        position: Math.random(),
      }))
      .filter(({ index }) => index !== excludedIndex)
      .sort((a, b) => b.position - a.position)
      .slice(0, this.bombs)
      .map(({ index }) => index);
  }

  private convertIndexToPoint(index: number): Point {
    const [width] = this.size;

    return [
      index % width,
      Math.floor(index / width),
    ];
  }

  private convertPointToIndex(point: Point): number {
    const [width] = this.size;
    const [x, y] = point;

    return width * y + x;
  }

  private countBombsNear([x, y]: Point, bombIndexes: number[]): number {
    const range = [-1, 0, 1];

    return range
      .map(rx =>
        range.map((ry) => {
          const point: Point = [x + rx, y + ry];

          return this.hasPoint(point) && bombIndexes.includes(
            this.convertPointToIndex(point),
          );
        }),
      )
      .flat()
      .filter(isBomb => isBomb)
      .length;
  }

  private hasPoint([x, y]: Point): boolean {
    const [width, height] = this.size;

    return x >= 0 && x < width && y >= 0 && y < height;
  }
}
