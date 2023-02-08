import UuidProvider from '@providers/uuid/uuid-provider';

export abstract class Entity<T> {
  protected readonly _id: string;

  public readonly props: T;

  get id() {
    return this._id;
  }

  constructor(props: T, id?: string) {
    this._id = id ?? UuidProvider.generate();
    this.props = props;
  }
}
