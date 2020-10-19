import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

export interface ISpfxCrudPocState {
  ID:string,
  Name:string,
  Adress:string,
  MobileNumber:string,
  items: any[],
  columns?: IColumn[]
}
