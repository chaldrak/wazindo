

export class Commentaire{

    telephone: string;
    commentaire: string;
    prenoms: string;
    email: string;
    nom_user: string;

    private errorMessage: string;


    constructor(){
        this.errorMessage = "";
      }
  
      //get error message
      getErrorMessage(): string {
        return this.errorMessage;
      }//end getErrorMessage


         //check for save
         canSaveCommentaire(): boolean {
     
          
    
            return true;
          }//end canSaveCommentaire

          //check for save
          canSendContact(): boolean {
     
          
    
            return true;
          }//end canSendContact
    
}