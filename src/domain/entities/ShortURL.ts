export default class ShortURL {
  constructor(
    public readonly urlId: string,
    public readonly originUrl: string,
    public readonly ownerId: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
    public deletedAt: Date | null,
    public clicks: number,
  ) {}

  static create (props: any): ShortURL {
    return new ShortURL(props.urlId, props.originUrl, props.ownerId, props.createdAt, props.updatedAt, props.deletedAt, 0);
  }

  public updateClicks() {
    this.clicks++;
    this.updatedAt = new Date();
  }

  public deactivateURL() {
    this.deletedAt = new Date();
  }
}