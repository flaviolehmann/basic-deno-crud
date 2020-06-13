import Resource from "../models/resource.model.ts";

export default class ResourceService<T extends Resource> {

  private _apiData = new Array<T>();
  private _autoIncrementId = 1;

  private _generateId(data: T): T {
    data.id = this._autoIncrementId;
    this._autoIncrementId = this._autoIncrementId + 1;

    return data;
  }

  create(data: T): T {
    this._apiData = [...this._apiData, this._generateId(data)];
    return data;
  }

  index(): T[] {
    return this._apiData;
  }

  show(id: number): T {
    return this._apiData.find(elem => elem.id == id) as T;
  }

  update(data: T): T {
    this._apiData = [
      ...this._apiData.filter(elem => elem.id != data.id),
      data
    ].sort((a, b) => a.id - b.id);
    return data;
  }

  destroy(id: number): void {
    this._apiData = this._apiData.filter(elem => elem.id != id);
  }
}