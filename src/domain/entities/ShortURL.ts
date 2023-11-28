export default class ShortURL {
  private _clicks: number;
  private _updatedAt: Date;
  private _deletedAt: Date | null;
  public createdAt: Date;

  constructor(
    public readonly urlId: string,
    public originUrl: string,
    public ownerId: string | null
  ){
    this.createdAt = new Date();
    this._updatedAt = new Date();
    this._deletedAt = null;
    this._clicks = 0;
  }

  public get clicks(): number {
    return this._clicks;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public get deletedAt(): Date | null {
    return this._deletedAt;
  }

  public updateClicks() {
    this._clicks++;
    this._updatedAt = new Date();
  }

  public deactivateURL() {
    this._deletedAt = new Date();
  }
}