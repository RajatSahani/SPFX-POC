

import { sp } from '@pnp/sp/presets/all'
import { concatStyleSets } from 'office-ui-fabric-react';


// ...
export interface IListItem { 
    ID: string; 
    Name: string; 
    Address: string; 
    MobileNumber: string;
  } 
  

export class SPOperation {
    /**
     * CreateListItem
    listname:string :Promise<string>*/
    public CreateListItem(listname: string, item: any): Promise<string> {
        console.log(item);
        return new Promise<string>(async (reslove, reject) => {
            sp.web.lists.getByTitle(listname).items.add(item).then(
                (result: any) => {
                    reslove(`Item Added Success fully with Item ID ${result.data.ID}` );
                    console.log(result)
                }
                //  (errror:any)=>{reject("Error Occured")}
            )
        })


    }

    /**
     * GetAllItems
     */
    public GetAllItems(listname: string): Promise<any[]> {


        let ListItem: any[] = [];
        return new Promise<any[]>(async (reslove, reject) => {
            sp.web.lists.getByTitle(listname).items.getAll().then((result: any) => {
                result.map((result: any) => (ListItem.push({ ID: result.ID, Name: result.Name, Address: result.Address, MobileNumber: result.MobileNumber, Action: "" })))
            })
            reslove(ListItem);
        }

        )


        // /**
        //  * CreateListItem
        // listname:string :Promise<string>*/
        // public Demo(listname:string):Promise<string> {
        //     return new Promise<string>(async(reslove,reject)=>{

        //     })  

        // }

    }
    /**
     * GetItemByID
     */
    public GetItemByID(listname: string, ID: number): Promise<any> {
        
        let ListItem={} as IListItem;
        return new Promise<any>(
            async (resolve, reject) => {
                let result: any = await  sp.web.lists.getByTitle(listname).items.getById(ID).get();
                 console.log(result);
                 ListItem={ ID: result.ID, Name: result.Name, Address: result.Address, MobileNumber: result.MobileNumber} as IListItem
                resolve(ListItem);
            }
        );

    }
    /**
     * updateItemByID
     */
    public updateItemByID(listname:string,ID:number, Item:any):Promise<string> {
        return new Promise<string>(async(resolve,reject)=>{
            sp.web.lists.getByTitle(listname).items.getById(ID).update(Item).then((result)=>{
                resolve(`Item With ID ${ID}`)
            })
        })
        
    }

    /**
     * DeleteItemByID
     */
    public DeleteItemByID(listname:string,ID:number):Promise<string> {
        return new Promise(async(resolve,reject)=>{
            sp.web.lists.getByTitle(listname).items.getById(ID).delete().then((result)=>{
                console.log(result);
                resolve(`Item with ID ${ID} Deleted Successfully`);
            })
        });
        
    }/**
     * name
     */
    
}

