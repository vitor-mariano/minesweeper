export default abstract class Square {
  public isOpen = false;
  public isFlagged = false;

  open(): void {
    this.isOpen = true;
  }

  toggleFlag(): void {
    this.isFlagged = !this.isFlagged;
  }
}
