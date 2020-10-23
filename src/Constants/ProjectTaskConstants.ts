import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react';  
export  class ProjectTaskConstants{  
    static CITY:string="City";
    static TEST:string="Test";
    static get StatusOptions(){  
        const statusOptions: IChoiceGroupOption[] = [  
            { key: "Male", text: "Male" },  
            { key: "Female", text: "Female" },  
            { key: "Others", text: "Others" }  
        ];  
        return statusOptions;  
    }      
}  