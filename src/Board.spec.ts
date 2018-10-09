import Board from './Board';
import Safe from './Squares/Safe';
import Bomb from './Squares/Bomb';

describe('Board', () => {
  describe('getArea', () => {
    it('should return 6 for a 3x2 board', () => {
      const board = new Board([3, 2], 0);

      expect(
        board['getArea'](),
      ).toBe(6);
    });
  });

  describe('generate', () => {
    it(
      'should generate a 3x2 board with 2 bombs spread randomically, ' +
      'excluding the point (1, 1)',
      () => {
        const board = new Board([3, 2], 2);

        board['generateBombIndexes'] = jest.fn()
          .mockReturnValueOnce([1, 5]);

        const firstSquare = new Safe(2);
        firstSquare.open();

        expect(
          board.generate([1, 1]),
        ).toEqual([
          [
            new Safe(1),
            new Bomb,
            new Safe(2),
          ],
          [
            new Safe(1),
            firstSquare,
            new Bomb,
          ],
        ]);
      },
    );
  });

  describe('generateBombIndexes', () => {
    it('should generate an array with 2 random points excluding (1, 0)', () => {
      Math.random = jest.fn()
        .mockImplementationOnce(() => 0)
        .mockImplementationOnce(() => 1)
        .mockImplementationOnce(() => 0.9)
        .mockImplementationOnce(() => 0.1)
        .mockImplementationOnce(() => 0.8)
        .mockImplementationOnce(() => 0.2);

      const board = new Board([3, 2], 2);

      expect(
        board['generateBombIndexes']([1, 0]),
      ).toEqual([2, 4]);
    });
  });

  describe('convertIndexToPoint', () => {
    it('should convert the index 7 to the point (1, 2) in a 3x4 board', () => {
      const board = new Board([3, 4], 0);

      expect(
        board['convertIndexToPoint'](7),
      ).toEqual([1, 2]);
    });

    it('should convert the index 0 to the point (0, 0) in a 3x4 board', () => {
      const board = new Board([3, 4], 0);

      expect(
        board['convertIndexToPoint'](0),
      ).toEqual([0, 0]);
    });

    it('should convert the index 11 to the point (2, 3) in a 3x4 board', () => {
      const board = new Board([3, 4], 0);

      expect(
        board['convertIndexToPoint'](11),
      ).toEqual([2, 3]);
    });
  });

  describe('convertPointToIndex', () => {
    it('should convert the point (1, 2) to the index 7 in a 3x4 board', () => {
      const board = new Board([3, 4], 0);

      expect(
        board['convertPointToIndex']([1, 2]),
      ).toBe(7);
    });

    it('should convert the point (0, 0) to the index 0 in a 3x4 board', () => {
      const board = new Board([3, 4], 0);

      expect(
        board['convertPointToIndex']([0, 0]),
      ).toBe(0);
    });

    it('should convert the point (2, 2) to the index 8 in a 3x4 board', () => {
      const board = new Board([3, 4], 0);

      expect(
        board['convertPointToIndex']([2, 3]),
      ).toBe(11);
    });
  });

  describe('countBombsNear', () => {
    it('should return 2 for (2, 1) in a 3x4 board with bombs in [1, 3, 4, 10]', () => {
      const board = new Board([3, 4], 4);

      expect(
        board['countBombsNear']([2, 1], [1, 3, 4, 10]),
      ).toBe(2);
    });
  });

  describe('hasPoint', () => {
    it('should return true to (0, 0) in a 3x2 board', () => {
      const board = new Board([3, 2], 0);

      expect(
        board['hasPoint']([0, 0]),
      ).toBeTruthy();
    });

    it('should return true to (2, 1) in a 3x2 board', () => {
      const board = new Board([3, 2], 0);

      expect(
        board['hasPoint']([2, 1]),
      ).toBeTruthy();
    });

    it('should return false to (3, 1) in a 3x2 board', () => {
      const board = new Board([3, 2], 0);

      expect(
        board['hasPoint']([3, 1]),
      ).toBeFalsy();
    });

    it('should return false to (2, 2) in a 3x2 board', () => {
      const board = new Board([3, 2], 0);

      expect(
        board['hasPoint']([3, 2]),
      ).toBeFalsy();
    });
  });
});
