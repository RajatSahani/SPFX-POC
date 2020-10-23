import { IDropdownOption } from "office-ui-fabric-react";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

export interface ISpfxCrudPocState {
  ID:string,
  Name:string,
  Adress:string,
  MobileNumber:string,
  DropDownOptions:IDropdownOption[],
  CityId:number,
  Gendor:string,
  items: any[],
  columns?: IColumn[],
  hideDialog:boolean,
  Message:string
}
