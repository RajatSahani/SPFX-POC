import * as React from 'react';

import styles from './SpfxCrudPoc.module.scss';
import { ISpfxCrudPocProps } from './ISpfxCrudPocProps';
import { ISpfxCrudPocState } from './ISpfxCrudPocState'
import { escape } from '@microsoft/sp-lodash-subset';

import { TextField, Label, PrimaryButton, Dropdown, IDropdownOption, ChoiceGroup, IChoiceGroupOption, DefaultButton } from 'office-ui-fabric-react'


import { SPOperation } from '../../../Service/SPOperation'
import { ProjectTaskConstants } from '../../../Constants/ProjectTaskConstants'
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';
import { Dialog, DialogType, DialogFooter, IDialogContentProps } from 'office-ui-fabric-react/lib/Dialog';

export default class SpfxCrudPoc extends React.Component<ISpfxCrudPocProps, ISpfxCrudPocState> {
  private _spOperation;
  private column: IColumn[] = [{ key: "Name", name: "Name", fieldName: "Name", minWidth: 100, maxWidth: 150 },
  { key: "Address", name: "Address", fieldName: "Address", minWidth: 100, maxWidth: 150 },
  { key: "MobileNumber", name: "Mobile Nummber", fieldName: "MobileNumber", minWidth: 100, maxWidth: 150 },
  { key: "Gendor", name: "Gendor", fieldName: "Gendor", minWidth: 100, maxWidth: 150 },
  { key: "City", name: "City", fieldName: "City", minWidth: 100, maxWidth: 150 },
  { key: "Action", name: "Action", fieldName: "Action", minWidth: 100, maxWidth: 150 }
  ];
  private dialogContentProps: IDialogContentProps = {
    type: DialogType.largeHeader,
    title: 'SPFX Crud Example',

  };

  private options: IDropdownOption[] = [];
  public constructor(props: ISpfxCrudPocProps) {
    super(props);
    this.state = {
      ID: "",
      Name: "",
      Adress: "",
      MobileNumber: "",
      DropDownOptions: [],
      CityId: 0,
      Gendor: "",
      items: [],
      columns: this.column,
      hideDialog: true,
      Message: ""
    }

    this._spOperation = new SPOperation();
    this._Submit = this._Submit.bind(this);
    this.getName = this.getName.bind(this);
    this.GetMobileNumber = this.GetMobileNumber.bind(this);
    this.Cancel = this.Cancel.bind(this);
    this.GetAddress = this.GetAddress.bind(this);
    this.Edit = this.Edit.bind(this);
    this.RecycleItem = this.RecycleItem.bind(this);

    this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
    this.GetCity = this.GetCity.bind(this);
    this.GetGendor = this.GetGendor.bind(this);
    this._closeDialog = this._closeDialog.bind(this);
  }

  /**
   * _closeDialog
   */
  public _closeDialog() {
    this.setState(
      {
        hideDialog: true
      }
    )
  }
  /**
   * Cancel
   */
  public Cancel(): void {
    this.setState({
      ID: "",
      Name: "",
      Adress: "",
      MobileNumber: "",
      CityId: 0,
      Gendor: "Male",
    })

  }

  public Reset(): void {
    this.setState({
      ID: "",
      Name: "",
      Adress: "",
      MobileNumber: "",
      CityId: 0,
      Gendor: "0",
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
      MobileNumber: "",
      Gendor: "",
      CityId: 0,
    };
    Item.ID = this.state.ID,
      Item.Name = this.state.Name;
    Item.Address = this.state.Adress;
    Item.MobileNumber = this.state.MobileNumber;
    Item.Gendor = this.state.Gendor;
    Item.CityId = this.state.CityId;
    if (Item.ID == "") {
      delete Item.ID;
      this._spOperation.CreateListItem(ProjectTaskConstants.TEST, Item).then((result) => {
        this.Reset();
        this.dialogContentProps.subText = result;
        this.setState(
          {
            hideDialog: false
          }
        )
      });
    }
    else {
      this._spOperation.updateItemByID(ProjectTaskConstants.TEST, parseInt(Item.ID), Item).then((result) => {
        this.Reset();
        this.dialogContentProps.subText = result;
        this.setState(
          {
            hideDialog: false
          }
        )
      });
    }

  }

  /**
   * Edit
   */
  public Edit(listname: string, ID: number): void {
    console.log("Edit Method")
    this._spOperation.GetItemByID(listname, ID).then((result) => {
      console.log(result);
      this.setState(
        {
          ID: result.ID,
          Name: result.Name,
          Adress: result.Address,
          MobileNumber: result.MobileNumber,
          Gendor: result.Gendor,
          CityId: result.CityId
        }
      )
    })

  }


  /**
   * RecycleItem
   */
  public RecycleItem(listname: string, ID: number): void {
    console.log("Start  Of Recycle Item")


    this._spOperation.DeleteItemByID(listname, ID).then((result) => {

      this.dialogContentProps.subText = result;
      this.setState(
        {
          hideDialog: false
        }
      )
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

  public GetGendor(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void {
    this.setState({
      Gendor: option.text
    })
  }

  public GetCity(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void {
    this.setState({
      CityId: option.key as number
    })
  }

  /**
   * BindDetailsList
   */
  public BindDetailsList() {
    this._spOperation.GetAllItems(ProjectTaskConstants.TEST).then(result => {

      this.setState({
        items: result
      })
      // rest of script
    });

  }
  /**
   * BindDropDownlist
   */
  public BindDropDownlist() {
    this._spOperation.GetAllCity(ProjectTaskConstants.CITY).then((result: IDropdownOption[]) => {

      this.setState(
        {
          DropDownOptions: result
        }
      )
    })
  }
  componentDidMount() {
    console.log("from component did mount");
    this.BindDropDownlist();
    this.BindDetailsList();

  }

  private _onRenderItemColumn(item: any, index: number, column: IColumn): React.ReactNode {
    if (column.fieldName === 'Action') {
      return (<div>
        <PrimaryButton text={"Edit"} onClick={() => { this.Edit(ProjectTaskConstants.TEST, item.ID) }} ></PrimaryButton> |
        <DefaultButton text={"Delete"} onClick={() => { this.RecycleItem(ProjectTaskConstants.TEST, item.ID) }}></DefaultButton>

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
          <div className="ms-Grid-col ms-sm8 ms-xl8"><TextField multiline={true} rows={3} placeholder={"Please Enter Address"} onChange={this.GetAddress} value={this.state.Adress}></TextField></div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm4 ms-xl4"><Label>MobileNumber</Label></div>
          <div className="ms-Grid-col ms-sm8 ms-xl8"><TextField placeholder={"Please Enter Mobile Number"} onChange={this.GetMobileNumber} value={this.state.MobileNumber}></TextField></div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm4 ms-xl4"><Label>Gendor</Label></div>
          <div className="ms-Grid-col ms-sm8 ms-xl8"><ChoiceGroup options={ProjectTaskConstants.StatusOptions} defaultSelectedKey={"Male"} onChange={this.GetGendor} value={this.state.Gendor} selectedKey={this.state.Gendor}></ChoiceGroup></div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm4 ms-xl4"><Label>City</Label></div>
          <div className="ms-Grid-col ms-sm8 ms-xl8"><Dropdown placeholder={"Please select City"} options={this.state.DropDownOptions} onChange={this.GetCity} selectedKey={this.state.CityId}></Dropdown></div>
        </div>
        <div className="ms-Grid-row" style={{ padding: 10 }}>
          <div className="ms-Grid-col ms-sm4 ms-xl4"><PrimaryButton text={"Submit"} onClick={this._Submit}></PrimaryButton>
          |
            <DefaultButton text={"Cancel"} onClick={this.Cancel}></DefaultButton>
          </div>
          <div className="ms-Grid-col ms-sm8 ms-xl8">
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-xl12">
            <DetailsList items={this.state.items} columns={this.column}
              onRenderItemColumn={this._onRenderItemColumn}
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
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-xl12">
            <Dialog
              hidden={this.state.hideDialog}
              onDismiss={this._closeDialog}
              dialogContentProps={this.dialogContentProps}

            >
              <DialogFooter>
                <PrimaryButton onClick={this._closeDialog} text="Close" />
                <DefaultButton onClick={this._closeDialog} text="Cancel" />

              </DialogFooter>
            </Dialog>
          </div>
        </div>

      </div>

    );
  }
}
