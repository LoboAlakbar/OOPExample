class Validator{
    //All Validator.getXXX(message) take in a message string to prompt the user for their input.

    getInt(message){// A method for validating user inputs are an integer.
        let postedMessage = message;

        while (true){//Loop for capturing the integer
            let res = this.getString(postedMessage);//Passes a message to this.getString.
            if(res === null){//Allows the user to cancel the prompt without causing errors.
                return res;
            }else {
                let checkInt = parseFloat(res); //Allows the 'if' below to check if the value is an int before parseInt
                                                //because parseInt will just round things without telling you
                                                //or throwing an error. It'll wreck your day. -_-
                                                //The below 'if' uses .floor and .ceil to determine if the
                                                //original number was already a whole number.
                if (checkInt === Math.floor(checkInt) || checkInt === Math.ceil(checkInt)) {
                    return parseInt(res);//If the above was true THEN we run parseInt() and turn the string into an int.
                } else {                 //Otherwise, we send back the below error to our user.
                    postedMessage = "Please enter an integer value.\n" + message;
                }
            }

        }
    /*
    #CONT future development.
    Make getInt() call getFloat() and then just do the int validation in getInt();
    */
    }


    getFloat(message){// A method for validating user inputs are a float.
        let postedMessage = message;

        while (true){//Loop for capturing the float
            let res = this.getString(postedMessage);//Passes a message to this.getString().
            if (res === null){//Allows the user to cancel the prompt without causing errors.
                return res;
            }else if (res = parseFloat(res)){//This if statement simultaneously returns "true"
                return res;                  //and parses the user input if it can be parsed into a float
                                             //if the user input can not be parsed into a float
            }else{                           //the below error message is added to the prompt.
                postedMessage = "Please enter a number value.\n" + message;
            }
        }
    }




    //A string validator it takes in a message for a prompt and gets input from the user and validates that
    getString(message){//there is no whitespace it will return null values from the user pressing cancel
        let res = "";
        let postedMessage = message;
        while(res === ""){//Loop for capturing a string that is not WhiteSpace
            res = prompt(postedMessage);//This is the prompt
            if(res === null){//Allows for user to cancel the prompt with no error
                return res;
            }else{
                //Gets rid of extra spacing, also turns only spaces back into ""
                res.trim(); //so the loop will repeat and add the below error message
            }
            if (res === ""){
                postedMessage = "You left the field blank. " + message;
            }

        }
        //Returns valid values that broke the while loop
        return res;

    }

    /*
      #CONT
      Future development.
      GetPrice() use parseFloat(input) === parseFloat(input.toFixed()) to validate a standard price format was entered.
      */


    checkInt(input){// A method for validating user inputs are an integer.



        let possInt = parseFloat(input); //Allows the 'if' below to check if the value is an int before parseInt
                                        //because parseInt will just round things without telling you
                                        //or throwing an error. It'll wreck your day. -_-
                                        //The below 'if' uses .floor and .ceil to determine if the
                                        //original number was already a whole number.
        if (possInt === Math.floor(possInt) || possInt === Math.ceil(possInt)) {
            return parseInt(input);//If the above was true THEN we run parseInt() and turn the string into an int.
        } else {                 //Otherwise, we send back the below error to our user.
            return false;
        }



        /*
        #CONT future development.
        Make getInt() call getFloat() and then just do the int validation in getInt();
        */
    }



}



class Menu{

    constructor(header, options){//The menu constructor takes in a header string which is the prompt to the user
        this.header = header;    //and an options array which are all the options the user can choose from.
        this.options = options;
    }
    //display() prompts the user to pick from options given and then returns the option as an all lowercase string.
    //works great with switch statements
    display(){//displayOptions will be the completely built prompt.
        let displayOptions = this.header+"\n"; //First the header is added.

        for(let i = 1; i < this.options.length+1; i++){//Second the options are given a line number value and added as
            displayOptions += i+": " +this.options[i-1] +"\n";//part of the displayOptions.

        }
        let postedMessage = displayOptions;//Then stored in postedMessage, this allows for adding err messages later


        while(true){//Loop that captures valid input in the form of a valid int line number or a valid string

            let validator = new Validator();
            let res = validator.getString(postedMessage);//Allows the user to cancel their prompt
            if(res === null){
                return res;
            }else{//This makes the user input all lower case for testing valid options later
                res = res.toLowerCase();
            }



            let numRes;//This checks if the value entered was a valid number
            if (numRes = parseInt(res)){//and parses it if that is the case.
                if (0 < numRes && numRes <= this.options.length){//This checks that the number is in the valid range
                    try {//of line numbers and tries to return the value of the array in lowerCase
                        return this.options[res - 1].toLowerCase();
                    }
                    catch(err){//If it was in the range but not a valid integer add the following error to the prompt
                        postedMessage = "Please enter a valid number between 1 and "+this.options.length+".\n" +displayOptions;
                    }
                }else{//If it was out of range add the following error to the prompt
                    postedMessage = "Please enter a valid number between 1 and "+this.options.length+".\n" +displayOptions;
                }

            //If the input was not a number we need to check if it is a valid option in the options array
            }else {
                let lowerCaseOptions = [];
                for(let option of this.options){//This pushes all options to a lower case array for comparing res
                    lowerCaseOptions.push(option.toLowerCase());
                }
                if(lowerCaseOptions.indexOf(res) > -1){//This tests if res, that we made lower case way above,
                    return res;                        //is in the lowercase array and returns the lower case string.
                }else{//If it is not a valid option in options add the following error to the prompt
                    postedMessage = "You have not chosen a valid option.\n" + displayOptions;
                }
            }

        }

    }

}
/*
Menu Testers
var header = "Pick a Valid option";
var options = ["Yellow", "Blue", "Orange"];
var menu = new Menu(header,options);
var output = menu.display();
console.log(output);
*/