// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, set, get, update, remove, ref, child} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "NAN",
    authDomain: "financialappgui2.firebaseapp.com",
    projectId: "financialappgui2",
    storageBucket: "financialappgui2.appspot.com",
    messagingSenderId: "628533819433",
    appId: "NAN",
    measurementId: "G-RB5GYRE5J3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();
const provider = new GoogleAuthProvider();

const loginlogoutreference = document.getElementById("LoginLogOut");
const navbaritemstoberemoveduponlogin = NaN;
var googleuniqueuserid = NaN;

onAuthStateChanged(auth, (user) => {
    // this function by firebase, allows us to place if statements
    if (user) {
        loginlogoutreference.innerHTML = "Logout";
        loginlogoutreference.addEventListener("click", userSignOut);
        // Upon login gather unique Google ID to access the database
        googleuniqueuserid = user.uid;
    } else {
        loginlogoutreference.innerHTML = "Login";
        loginlogoutreference.addEventListener("click", userSignIn);
        googleuniqueuserid = NaN;
    }
});

const userSignIn = async() => {
    signInWithPopup(auth, provider)
    .then((result) => {
        // if suscessfull, "then", get the result
        // from google
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        // if un-sucessfull, "catch", the error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
    });
};

const userSignOut = async() => {
    signOut(auth).then(() => {
        console.log("user has sign out");
    }).catch((error) => {
        console.log("an signout error has occur: ", error);
    });
}

function InsertGivenDateExpenses (name = "foo-company-name", category = "foo-category-type", cost = "1337", id = null) {
    // description: given name, category, day, create an entry in the database
    // note that the date is the one given by the datepicker
    // parameter: string name, string category and numerical cost and id (UnixTime)
    if (id == null) {
        id = Date.now();
    }
    var tempdatedataparsed = $("#datepicker").val().split("/");
    if (tempdatedataparsed.length <= 1) {
        // if user has not enter a date... s/he cant add
        // TODO() toast saying to please select a data
        return;
    }
    var temppyear = tempdatedataparsed[2];
    var tempmonth = Number(tempdatedataparsed[0]).toString();
    var tempday = Number(tempdatedataparsed[1]).toString();

    var tempdatedata = "expenses/" + googleuniqueuserid.toString() + "/" + temppyear.toString() + "/" + tempmonth.toString() + "/" + tempday.toString() + "/" + id;

    set(ref(db, tempdatedata), {
        Name: name,
        Category: category,
        Cost: cost
    }).then (()=> {
        console.log("Expenses Data added sucessfully!");
        // TODO upon success make a toast letting the user know its been successfully added
    }).catch ((error) => {
        console.log("Expenses Data added failed: ", error);
    })
};

function submitbuttonfunction(event) {
    // helper function to submit
    // Description: Each accordion submit/update button will trigger this fucntion
    // causing it to submit/update data in the database
    // it will also update the name of the accordion button to reflect change
    // in value
    event.preventDefault();
    console.log(event.data.param1);
    var name = $("#" + event.data.param1)[0].fname.value;
    var category = $("#" + event.data.param1)[0].fcategory.value;
    var cost = $("#" + event.data.param1)[0].fcost.value;
    InsertGivenDateExpenses(name, category, cost, event.data.param2);
    $("#summary" + event.data.param2).html( name + "-" + category);
}

function CreateANewAccordion(name = "John", category = "Doe", cost = 1337.1337, id = null) {
    var tempdatedataparsed = $("#datepicker").val().split("/");
    if (tempdatedataparsed.length <= 1) {
        // TODO() toast saying to please select a data
        return;
    }
    if (id == null) {
        id = Date.now().toString();
    }
    // define the accordion item
    var newAccordian = '<div class="accordion-item" data-internalid = "'+ id +'" id="'+ id +'">' +
                    '<h2 class="accordion-header" id="headingOne' + id +'"><button id="accordiontitlebutton'+id +
                    '"class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne'+ id+
                    '" aria-expanded="true" aria-controls="collapseOne' + id+'">'+ '<div class="form-check">'+
                    '<input class="form-check-input tocloseaccordionitems" data-internalid = "'+ id + '"type="checkbox" value="" id="flexCheckDefault'+id+'">'+
                    '<label class="form-check-label" for="flexCheckDefault'+id+'"></label></div><div id="summary'+ id +'">' +name +'-'+category+'</div></button></h2>'
                    + '<div id="collapseOne' + id + '" class="accordion-collapse collapse" aria-labelledby="headingOne' + id +
                    '" data-bs-parent="#accordionExample">' 
                    + '<div class="accordion-body">' +
                   '<form id="'+ 'form' + id + '"><label for="fname">Name:</label><br>' +
                   '<input type="text" id="fname" name="fname" value="'+ name +'"><br>' +
                   '<label for="lname">Category:</label><br>'+
                   '<input type="text" id="fcategory" name="fcategory" value="'+ category +'"><br><br>'+
                   '<label for="lname">Cost:</label><br>' + 
                   '<input type="number" id="fcost" name="fcost" value="'+ cost +'"><br><br>' + 
                   '<input type="submit" value="Submit" id="submitbutton'+ id+'"></form>';

    // add the newly created accordion into 
    $('#accordionExample').append(newAccordian);
                   // https://stackoverflow.com/questions/3273350/jquerys-click-pass-parameters-to-user-function
    $("#" + "submitbutton" + id.toString()).click({param1: "form" + id.toString(), param2: id}, submitbuttonfunction);
}


$("#addbutton").click(function(){
    // Description: The addbutton will trigger the creation of a new accordion
    // object at the button of all the other accordion
    CreateANewAccordion();
  });

function RemoveDate (path) {
    remove(ref(db, path)).then(() => {
        // TODO() Toast telling the user the items has been deleted
        console.log("Data removed succesfully");
    }).catch((error) => {
        console.log("Error found: ", error);
    })
};

function DeleteSelectedAccordionItems() {
    // Description: Remove all the selected accordion items widget and
    // delete all the entries on the database
    // loop through all the accordion tab and check which ones are checked
    //var allAccordionItems = $('.tocloseaccordionitems');
    var allCheckboxes = $(".tocloseaccordionitems:checked");
    var path = null;
    var tempdatedataparsed = $("#datepicker").val().split("/");
    var temppyear = tempdatedataparsed[2];
    var tempmonth = Number(tempdatedataparsed[0]).toString();
    var tempday = Number(tempdatedataparsed[1]).toString();
    var id = null;
    if (tempdatedataparsed.length <= 1) {
        // if user has not enter a date... s/he cant add
        // TODO() toast saying to please select a data
        return;
    }

    for (let i = 0; i < allCheckboxes.length; i++) {
        id = allCheckboxes[i].id.split("flexCheckDefault")[1];
        // define the wanted path
        path = "expenses/" + googleuniqueuserid.toString() + "/" + temppyear.toString() + "/" + tempmonth.toString() + "/" + tempday.toString() + "/" + id;
        // send a delete message to the database telling to delete this specific date and specific id
        RemoveDate(path);
    }

    // remove accordion items
    removeallaccordiotitems()

    // gather and display current data
    GatherAndDisplayCurrentDate();

}

$("#removebutton").click(function(){
    // Description: The removebutton will trigger the deletion of all selected
    // accordion object and triger deletion on the database
    console.log("removebutton has been clicked");
    DeleteSelectedAccordionItems();
});

async function FetchDataOfSelectedDay() {
    // Description: Fetches all the data available of the given day (selected from datepicker)
    var tempdatedataparsed = $("#datepicker").val().split("/");
    var year = tempdatedataparsed[2];
    var month = Number(tempdatedataparsed[0]).toString();
    var day = Number(tempdatedataparsed[1]).toString();
    const dbref = ref(db);
    var tempdatedata = "expenses/" + googleuniqueuserid.toString() + "/" + year + "/" + month + "/" + day;
    try {
      let snapshot = await get(child(dbref, tempdatedata));
      
      if (snapshot.exists()) {
        console.log("Data found in FetchDataOfSelectedDay: ", snapshot.val());
        return snapshot.val();
      } else {
        console.log("Data not found in FetchDataOfSelectedDay");
        return NaN;
      }
    } catch (error) {
        console.error("Error found in FetchDataOfSelectedDay: ", error);
        return undefined;
    }
  }


function GatherAndDisplayCurrentDate() {
    // Description: Gather all data from the back-end from the current date.
    // The data is then display within accordion items.

    // remove all current items
    removeallaccordiotitems();
    // fetch the data if they exist
    let gatheredData = FetchDataOfSelectedDay();
    gatheredData.then(function(data){
        console.log("Gathered succesfully the data: ", data);
        let arrofkeys = Object.keys(data);
        // loop through all the data
        for (let i = 0; i < arrofkeys.length; i++) {
            let k = arrofkeys[i];
            let n = data[k]["Name"];
            let cat = data[k]["Category"];
            let c = data[k]["Cost"];
            // create a button object for every daya inputed.
            CreateANewAccordion(n, cat, c, k)
        }
    }).catch(function(error){
        console.log("An error has occured with FetchDataOfSelectedDay inside datapicker.onchange: ", error);
    })
}

$("#datepicker").on("change", function() {
    // Description: Upon the value of datepicker chaging, we update the info being display
    GatherAndDisplayCurrentDate();
});
