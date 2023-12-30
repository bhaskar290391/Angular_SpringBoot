import { FormControl, ValidationErrors } from "@angular/forms";

export class CustomValidator {

    static notOnlyWhiteSpaces(controls:FormControl):ValidationErrors|null{
        if((controls.value !=null) && controls.value.trim().length ===0){
            return {"notOnlyWhiteSpaces":true}
        }
         
        return null;
    }
}
