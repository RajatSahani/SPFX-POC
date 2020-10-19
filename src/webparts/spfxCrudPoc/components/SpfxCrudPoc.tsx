import * as React from 'react';

import styles from './SpfxCrudPoc.module.scss';
import { ISpfxCrudPocProps } from './ISpfxCrudPocProps';
import { ISpfxCrudPocState } from './ISpfxCrudPocState'
import { escape } from '@microsoft/sp-lodash-subset';

import { TextField, Label, PrimaryButton, Link } from 'office-ui-fabric-react'


import { SPOperation } from '../../../Service/SPOperation'
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';
import { Item, Items } from '@pnp/sp/items';
import { sp } from '@pnp/sp/presets/all'
export default class SpfxCrudPoc extends React.Component<ISpfxCrudPocProps, ISpfxCrudPocState> {
  private _spOperation;
  private column: IColumn[] = [{ key: "Name", name: "Name", fieldName: "Name", minWidth: 100, maxWidth: 200 },
  { key: "Address", name: "Address", fieldName: "Address", minWidth: 100, maxWidth: 200 },
  { key: "MobileNumber", name: "Mobile Nummber", fieldName: "MobileNumber", minWidth: 100, maxWidth: 200 },
  { key: "Action", name: "Action", fieldName: "Action", minWidth: 100, maxWidth: 200 }
  ];
  public constructor(props: ISpfxCrudPocProps) {
    super(props);
    this.state = {
      ID: "",
      Name: "",
      Adress: "",
      MobileNumber: "",
      items: [],
      columns: this.column
    }

    this._spOperation = new SPOperation();
    this._Submit = this._Submit.bind(this);
    this.getName = this.getName.bind(this);
    this.GetMobileNumber = this.GetMobileNumber.bind(this);
    this.Cancel = this.Cancel.bind(this);
    this.GetAddress = this.GetAddress.bind(this);
    this.Edit = this.Edit.bind(this);
    this.RecycleItem = this.RecycleItem.bind(this);
    this.AlertHI = this.AlertHI.bind(this);
    this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
  }

  /**
   * Cancel
   */
  public Cancel(): void {
    this.setState({
      ID: "",
      Name: "",
      Adress: "",
      MobileNumber: ""
    })

  }

  public Reset(): void {
    this.setState({
      ID: "",
      Name: "",
      Adress: "",
      MobileNumber: ""
    })
    this.BindDetailsList();
  }
  /**
   * _Submit
   */
  public _Submit(): void {
    console.log("start of Method")
    var Item = {
      ID: "",
      Name: "",
      Address: "",
      MobileNumber: ""
    };
    Item.ID = this.state.ID,
      Item.Name = this.state.Name;
    Item.Address = this.state.Adress;
    Item.MobileNumber = this.state.MobileNumber;
    if (Item.ID == "") {
      delete Item.ID;
      this._spOperation.CreateListItem("Test", Item).then((result) => {
        this.Reset();
        alert(result);
      });
    }
    else {
      this._spOperation.updateItemByID("Test", parseInt(Item.ID), Item).then((result) => {
        this.Reset();
        alert(result);
      });
    }

  }
  /**
   * Edit
   */
  public Edit(): void {
    console.log("Edit Method")
    this._spOperation.GetItemByID("Test", 3).then((result) => {

      this.setState(
        {
          ID: result.ID,
          Name: result.Name,
          Adress: result.Address,
          MobileNumber: result.MobileNumber
        }
      )
    })

  }

  /**
   * RecycleItem
   */
  public RecycleItem(): void {
    console.log("Start  Of Recycle Item")


    this._spOperation.DeleteItemByID("Test", 5).then((result) => {

      this.Reset();
    });




  }
  /**
   * Edit
   */
  public Edit1(listname: string, ID: number): void {
    console.log("Edit Method")
    this._spOperation.GetItemByID(listname, ID).then((result) => {

      this.setState(
        {
          ID: result.ID,
          Name: result.Name,
          Adress: result.Address,
          MobileNumber: result.MobileNumber
        }
      )
    })

  }
  public AlertHI() {
    alert("HI")
  }

  /**
   * RecycleItem
   */
  public RecycleItem1(listname: string, ID: number): void {
    console.log("Start  Of Recycle Item")


    this._spOperation.DeleteItemByID(listname, ID).then((result) => {

      alert(result);
      this.Reset();
    });




  }
  /**
   * getName
   */
  public getName(ev: any, Value: any): void {
    this.setState({
      Name: Value
    })
  }
  public GetAddress(ev: any, Value: any): void {
    this.setState({
      Adress: Value
    })
  }
  public GetMobileNumber(ev: any, Value: any): void {
    this.setState({
      MobileNumber: Value
    })
  }
  /**
   * BindDetailsList
   */
  public BindDetailsList() {
    this._spOperation.GetAllItems("Test").then(result => {

      this.setState({
        items: result
      })
      // rest of script
    });

  }
  componentDidMount() {
    console.log("from component did mount");

    this.BindDetailsList();

  }
  private onStart = (evt: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>, id: string) => {



    this.setState({
      Name: "test",
      Adress: "test",
      MobileNumber: "Test"
    })

    evt.preventDefault();

  }
  private _onRenderItemColumn(item: any, index: number, column: IColumn): React.ReactNode {
    if (column.fieldName === 'Action') {
      return (<div>
        <PrimaryButton text={"Edit"} onClick={() => { this.Edit1("Test", item.ID) }} ></PrimaryButton> |
        <PrimaryButton text={"Delete"} onClick={() => { this.RecycleItem1("Test", item.ID) }}></PrimaryButton>
        
      </div>
        
      );
    }
    return item[column.fieldName];
  }

  public render(): React.ReactElement<ISpfxCrudPocProps> {

    return (
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm4 ms-xl4"><Label>ID</Label></div>
          <div className="ms-Grid-col ms-sm8 ms-xl8"><TextField value={this.state.ID} disabled={true}></TextField></div>
        </div>

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm4 ms-xl4"><Label>Name</Label></div>
          <div className="ms-Grid-col ms-sm8 ms-xl8"><TextField placeholder={"Please Enter Name"} onChange={this.getName} value={this.state.Name}></TextField></div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm4 ms-xl4"><Label>Address</Label></div>
          <div className="ms-Grid-col ms-sm8 ms-xl8"><TextField placeholder={"Please Enter Address"} onChange={this.GetAddress} value={this.state.Adress}></TextField></div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm4 ms-xl4"><Label>MobileNumber</Label></div>
          <div className="ms-Grid-col ms-sm8 ms-xl8"><TextField placeholder={"Please Enter Mobile Number"} onChange={this.GetMobileNumber} value={this.state.MobileNumber}></TextField></div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm4 ms-xl4"><PrimaryButton text={"Submit"} onClick={this._Submit}></PrimaryButton>
            <PrimaryButton text={"Cancel"} onClick={this.Cancel}></PrimaryButton>
          </div>
          <div className="ms-Grid-col ms-sm8 ms-xl8">
            {/* <PrimaryButton text={"Edit"} onClick={this.Edit}></PrimaryButton>
            <PrimaryButton text={"Delete"} onClick={this.RecycleItem}></PrimaryButton> */}
            {/*             
            <PrimaryButton text={"Edit"} onClick={()=>{this.Edit1("Test",7)}}></PrimaryButton>
            <PrimaryButton text={"Delete"} onClick={()=>{this.RecycleItem1("Test",7)}}></PrimaryButton> */}

          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-xl12">
            <DetailsList items={this.state.items} columns={this.column}
              onRenderItemColumn={this._onRenderItemColumn}
            // onRenderItemColumn={(item: any, index: number, column: IColumn) => {
            //   if (column.fieldName === 'Action') {
            //     return (<div>


            //       <PrimaryButton text={"Edit"} onClick={() => { this.Edit1("Test", item.ID) }} ></PrimaryButton> |
            //       <PrimaryButton text={"Delete"} onClick={() => { this.RecycleItem1("Test", item.ID) }}></PrimaryButton>


            //     </div>

            //     );
            //   }
            //   return item[column.fieldName];

            // }}
            ></DetailsList>
          </div>

        </div>
      </div>
      
    );
  }
}
