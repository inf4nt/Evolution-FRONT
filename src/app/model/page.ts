
export class Page<T> {

  private _content: Array<T>;

  private _totalPages: number;

  private _totalElement: number;

  constructor() {
    this._content = [];
    this._totalPages = 0;
    this._totalElement = 0;
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
}
