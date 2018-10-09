import Square from './Square';

export default class Safe extends Square {
  constructor(
    public label: number,
    public isOpen = false,
  ) {
    super();
  }
}
