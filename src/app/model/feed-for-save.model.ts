export class FeedForSave {

  private _content: string;

  private _senderId: number;

  private _toUserId: number;

  private _tags: Array<string>;

  constructor() {
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get senderId(): number {
    return this._senderId;
  }

  set senderId(value: number) {
    this._senderId = value;
  }

  get toUserId(): number {
    return this._toUserId;
  }

  set toUserId(value: number) {
    this._toUserId = value;
  }

  get tags(): Array<string> {
    return this._tags;
  }

  set tags(value: Array<string>) {
    this._tags = value;
  }

  get values(): any {
    return {
      content: this.content,
      senderId: this.senderId,
      toUserId: this.toUserId,
      tags: this.tags
    };
  }
}
