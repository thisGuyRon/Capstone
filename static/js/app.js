/*// initial init function call to load the drop down values
init();
//initial d3 object captues
var tbody = d3.select("tbody");
var button = d3.select("#filter-btn");

//even listener for filter button click
button.on("click", handleClick);

// function to handle button click
function handleClick(){
    // prevent console and page reload
    d3.event.preventDefault();
    // clear existing records
    tbody.html("");
    //d3 objects and variables to grab data from event click
    var inputType = d3.select("#selectType");
    var inputPrice = d3.select("#selectPrice");
    var filterType=inputType.property("value");
    var filterPrice = inputPrice.property("value");


    console.log(filterType);
    d3.json("static/js/final.json", function(data) {
        //set variable to begin filter data
        var filterRest = data;
        console.log(filterRest);

        //if user did not select restaurant type, ignore filtering
       if(filterType){
            filterRest = filterRest.filter(rest => rest.type === filterType);
            console.log(filterRest);
        }
        //if user did not select price, ignore filtering
        if (filterPrice){
            filterRest = filterRest.filter(rest => rest.price === filterPrice);
            console.log(filterRest);
        }
        console.log(filterRest);
        //loop and bind data to table
        filterRest.forEach(function(row) {
            var restRow = tbody.append("tr");
            var restName = restRow.append("td").text(row.name);
            var restType = restRow.append("td").text(row.type);
            var restRating = restRow.append("td").text(row.rating);
            var restPrice = restRow.append("td").text(row.price);
            var restAddress = restRow.append("td").text(row.address);
            var restCity    =restRow.append("td").text(row.city);
            var restZip = restRow.append("td").text(row.zip);
            
        })     
    }) 
}

//function to list filtering population
function init(){
    var rType = [];
    var rPrice = [];

    var selectType = d3.select("#selectType");
    var selectPrice = d3.select("#selectPrice");

    //add restaurant types to list
    //add restaurant price to list
    d3.json("static/js/final.json", function(data) {
        console.log(data);
        data.forEach(function(row) {
            rType.push(row.type);
            rPrice.push(row.price);
            rType.sort();
            rPrice.sort();
            
            }) 
            //remove duplicates
            var uniqueType = new Set(rType);
            var uniquePrice = new Set(rPrice);
            var uniqueZip = new Set(rZip);
            console.log(uniquePrice);
            //push to dropdown
            uniqueType.forEach((kind)=>{
                selectType
                .append("option")
                .text(kind)
                .property("value", kind);
            });
            uniquePrice.forEach((dollar)=>{
                selectPrice
                .append("option")
                .text(dollar)
                .property("value", dollar);
            });


    });
    // initial load of list for all restaurants
    d3.json("static/js/final.json", function(data) {
        data.forEach(function(row) {
            var restRow = tbody.append("tr");
            var restName = restRow.append("td").text(row.name);
            var restType = restRow.append("td").text(row.type);
            var restRating = restRow.append("td").text(row.rating);
            var restPrice = restRow.append("td").text(row.price);
            var restAddress = restRow.append("td").text(row.address);
            var restCity    =restRow.append("td").text(row.city);
            var restZip = restRow.append("td").text(row.zip);
            
            }) 

    });
}
*/
