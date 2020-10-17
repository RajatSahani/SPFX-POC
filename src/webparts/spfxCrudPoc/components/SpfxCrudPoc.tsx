import * as React from 'react';
import styles from './SpfxCrudPoc.module.scss';
import { ISpfxCrudPocProps } from './ISpfxCrudPocProps';
import { ISpfxCrudPocState } from './ISpfxCrudPocState'
import { escape } from '@microsoft/sp-lodash-subset';

import { TextField, Label, PrimaryButton } from 'office-ui-fabric-react'


import { SPOperation } from '../../../Service/SPOperation'

export default class SpfxCrudPoc extends React.Component<ISpfxCrudPocProps, ISpfxCrudPocState> {
  private _spOperation;
  
  public constructor(props: ISpfxCrudPocProps) {
    super(props);
    this.state = {
      Name: "",
      Adress: "",
      MobileNumber: ""
    }
    
    this._spOperation = new SPOperation();
    this._Submit = this._Submit.bind(this);
    this.getName = this.getName.bind(this);
    this.GetMobileNumber = this.GetMobileNumber.bind(this);
    this.GetAddress = this.GetAddress.bind(this);
  
  }
  

  /**
   * _Submit
   */
  public _Submit() {
    console.log("start of Method")
    var  Item={
      Name:"",
      Address:"",
      MobileNumber:""
      };
    Item.Name=this.state.Name;
    Item.Address=this.state.Adress;
    Item.MobileNumber=this.state.MobileNumber;
    this._spOperation.CreateListItem("Test",Item);

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
  public render(): React.ReactElement<ISpfxCrudPocProps> {

    return (
      <div className="ms-Grid" dir="ltr">
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
            <PrimaryButton text={"Cancel"}></PrimaryButton>
          </div>
          <div className="ms-Grid-col ms-sm8 ms-xl8"></div>
        </div>

      </div>

      // <div className={styles.spfxCrudPoc}>
      //   <div className={styles.container}>
      //     <div className={styles.row}>
      //       <div className={styles.column}>
      //         <span className={styles.title}>Welcome to SharePoint!</span>
      //         <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
      //         <p className={styles.description}>{escape(this.props.description)}</p>
      //         <a href="https://aka.ms/spfx" className={styles.button}>
      //           <span className={styles.label}>Learn more</span>
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
