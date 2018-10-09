import Square from './Square';

class PseudoSquare extends Square {}

describe('Square', () => {
  describe('open', () => {
    it('should set isOpen property to true', () => {
      const square = new PseudoSquare;

      expect(
        square.isOpen,
      ).toBe(false);

      square.open();

      expect(
        square.isOpen,
      ).toBe(true);
    });
  });

  describe('toggleFlag', () => {
    it('should set hasFlag property from false to true', () => {
      const square = new PseudoSquare;

      expect(
        square.isFlagged,
      ).toBe(false);

      square.toggleFlag();

      expect(
        square.isFlagged,
      ).toBe(true);
    });
  });
});
