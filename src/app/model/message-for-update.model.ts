export class MessageForUpdate {

  private _id: number;

  private _content: string;

  constructor() {
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get values(): any {
    return {
      content: this.content,
      id: this.id
    };
  }
}
