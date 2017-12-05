export class MessageForSave {

  private _text: string;

  private _senderId: number;

  private _recipientId: number;

  constructor() {
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get senderId(): number {
    return this._senderId;
  }

  set senderId(value: number) {
    this._senderId = value;
  }

  get recipientId(): number {
    return this._recipientId;
  }

  set recipientId(value: number) {
    this._recipientId = value;
  }

  get values(): any {
    return {
      text: this.text,
      senderId: this.senderId,
      recipientId: this.recipientId
    };
  }
}
