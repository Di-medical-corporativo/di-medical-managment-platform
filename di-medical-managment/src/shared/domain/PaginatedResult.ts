export class PaginatedResult<T> {
  constructor(
    private _results: T[],
    private _pages: number
  ){}

  public get results() {
    return this._results
  }
  
  public set results(results: T[]) {
    this._results = results
  }

  public get pages() {
    return this._pages
  }

  public set pages(pages: number) {
    this._pages = pages
  }
}
