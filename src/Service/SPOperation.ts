'use strict';

import {sp} from '@pnp/sp/presets/all'


// ...


export  class SPOperation
{

    
/**
 * CreateListItem
listname:string :Promise<string>*/
public CreateListItem(listname:string, item:any):Promise<string> {
    console.log(item);
 return new Promise<string>(async(reslove,reject)=>{
 sp.web.lists.getByTitle(listname).items.add(item).then(
     (result:any)=>{reslove("Item Added Success fully with Item ID");
     console.log(result)
    }
    //  (errror:any)=>{reject("Error Occured")}
 )
 })   


 
// /**
//  * CreateListItem
// listname:string :Promise<string>*/
// public CreateListItem(listname:string):Promise<string> {
//     return new Promise<string>(async(reslove,reject)=>{
   
//     })  

}
/**
 * Test
 :void*/
public Test():void {
    
}
} 

