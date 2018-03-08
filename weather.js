/*
    Abstraction
    The abstract class is Day.

    Inheritance
    The first concrete class is NiceDay that inherits from Day.
    HotDay and ColdDay inherit from NiceDay.

    Polymorphism
    Polymorphism is used because HotDay and ColdDay both contain calculateDanger()
    which performs different calculations for each class.

    Encapsulation
    The getters temp() and dangerFactor() encapsulate any class variables that need to be called.
 */

class Day{//This class will not be called directly it's my "abstract" class
    //Days are constructed based off the range given and the previous days temperature
    constructor(tempRange, temp){
        this._tempRange = tempRange;
        this._temp = temp;
    }

    //Getter for temp
    get temp(){
        return this._temp;
    }

}

class NiceDay extends Day{//This is my first child class. I'm storing the "tempTomorrow" function here to force abstraction

    //this is used to determine the temp for the next day
    get tempTomorrow(){
        //Sets the range for tomorrows temp to today's temp plus or minus five degrees
        let tmrsRange = {high: this._temp+5, low: this._temp-5};
        //Keeps tomorrows low temp within the user specified range

        if (tmrsRange.low < this._tempRange.low){
            tmrsRange.low = this._tempRange.low;
            //console.log(tmrsRange.min < this._tempRange.min);
        }
        //Keeps tomorrows high temp within the user specified range

        if (tmrsRange.high > this._tempRange.high){
            tmrsRange.high = this._tempRange.high;
        }
        //Calculates a random whole number within the approved range
        return Math.round((Math.random()*(tmrsRange.high-tmrsRange.low))+tmrsRange.low);

    }

}

class HotDay extends NiceDay{
    //adds in a danger property
    constructor(tempRange, temp){
        super(tempRange, temp);
        this._danger = this.calculateDanger();
    }
    // getter for danger
    get dangerFactor(){
        return this._danger;
    }
    //determines how dangerous the heat is
    calculateDanger(){
        if(this._temp < 95){
            return "low"
        } else if (this._temp < 100){
            return "medium"
        } else {
            return "high"
        }

    }

}

class ColdDay extends NiceDay{
    //see HotDay
    constructor(tempRange, temp){
        super(tempRange, temp);
        this._danger = this.calculateDanger();
    }
    //see HotDay
    get dangerFactor(){
        return this._danger;
    }
    //determines how dangerous the cold is
    calculateDanger(){
        if(this._temp > 55){
            return "low"
        } else if (this._temp > 45){
            return "medium"
        } else {
            return "high"
        }

    }

}



function predictWeather() {
    //clears the output div
    document.getElementById("output").innerHTML = "";
    //Pull highs and lows from the web form.
    let highInput = document.getElementById("hi").value;
    let lowInput = document.getElementById("lo").value;
    let validator = new Validator();
    //validates input
    let high = validator.checkInt(highInput);
    let low = validator.checkInt(lowInput);
    //throws errors for bad input
    if (high === false || low === false || high > 136 || low < -126) {
        alert("Both fields must be filled in with whole numbers between -126 and 136.");
    }else if(low > high){
        alert("The lowest temperature can not be higher than the highest temperature");
    //Below is the process for good input
    }else{
        //sets up  the range of available temperatures
        let range ={high: high, low: low};
        let temp = Math.round((Math.random()*(high-low))+low);
        //logs all info to the console
        console.log("High: "+ range.high + "\nLow: "+ range.low +"\nStarting Temp: " + temp);
        console.log("---------- Begin Simulation ----------");
        //gives the output div a class, mostly i just wanted a box to appear around the results
        document.getElementById("output").className = "results";
        //Displays the users choices on the web page
        let choices = document.createTextNode("High: "+ range.high+"  Low: " +range.low);
        document.getElementById("output").appendChild(choices);
        //this creates a day zero that will be the start point for the simulation
        let today = createDay(range,temp);

        //A loop that creates 31 days
        for (let i=1;i <= 31;i++){
            //sends the previous days info to create the current day
            today = createDay(range,today.tempTomorrow);
            //creates a div for displaying each days data
            let dayDiv = document.createElement("div");
            let weatherRpt;
            if (today instanceof HotDay){//Checks if the day is hot and displays appropriate data
                console.log("Day "+i+" Temp: "+today.temp+". Danger level: "+ today.dangerFactor);
                dayDiv.className = "hot_day";//sets the div class for formatting
                weatherRpt = document.createTextNode("Day "+i+" Temp: "+today.temp+" degrees fahrenheit. Risk level for a heat injury: "+ today.dangerFactor);
                dayDiv.appendChild(weatherRpt);//appends the above text to the div
                document.getElementById("output").appendChild(dayDiv);//appends the dayDiv to the output area

            }else if(today instanceof ColdDay) {//Checks if the day is cold and displays appropriate data
                console.log("Day " + i + " Temp: " + today.temp + ". Danger level: " + today.dangerFactor);
                dayDiv.className = "cold_day";
                weatherRpt = document.createTextNode("Day "+i+" Temp: "+today.temp+" degrees fahrenheit. Risk level for a cold weather injury: "+ today.dangerFactor);
                dayDiv.appendChild(weatherRpt);
                document.getElementById("output").appendChild(dayDiv);
            }else{//default is a nice day just displays the temperature
                console.log("Day "+i+" Temp: "+today.temp+".");
                dayDiv.className = "nice_day";
                weatherRpt = document.createTextNode("Day "+i+" Temp: "+today.temp+" degrees fahrenheit.");
                dayDiv.appendChild(weatherRpt);
                document.getElementById("output").appendChild(dayDiv);
            }
        }


        console.log("----------- End Simulation -----------")
    }

}


function createDay(range,temp){
    //determines the type of day to create based on the range and temp submitted
    let newDay;
    if (temp < 65){
         newDay = new ColdDay(range,temp);
    }else if (temp > 85){
        newDay = new HotDay(range,temp);
    }else{
         newDay = new NiceDay(range,temp);
    }
    return newDay;
}

function checkKey(key){//lets you press enter to start the main function instead of clicking with a mouse
    if(key.keyCode === 13){
        key.preventDefault();//not sure about this line, the how to suggested it be here to not cause errors, i'll learn more later
        predictWeather();
    }
}
