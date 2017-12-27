
export class Page<T> {

  private _content: Array<T>;

  private _totalPages: number;

  private _totalElement: number;

  private _numberOfElements: number;

  constructor(content: Array<T> = [], totalPages: number = 0, totalElement: number = 0, numberOfElements: number = 0) {
    this._content = content;
    this._totalPages = totalPages;
    this._totalElement = totalElement;
    this._numberOfElements = numberOfElements;
  }

  get content(): Array<T> {
    return this._content;
  }

  set content(value: Array<T>) {
    this._content = value;
  }

  get totalPages(): number {
    return this._totalPages;
  }

  set totalPages(value: number) {
    this._totalPages = value;
  }

  get totalElement(): number {
    return this._totalElement;
  }

  set totalElement(value: number) {
    this._totalElement = value;
  }

  get numberOfElements(): number {
    return this._numberOfElements;
  }

  set numberOfElements(value: number) {
    this._numberOfElements = value;
  }
}
