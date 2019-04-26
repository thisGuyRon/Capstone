
//grab data for histogram
d3.json("static/js/final.json", function(data) {
    console.log(data);
    //variable list
    restTypeList = [];
    listCheck = false;
    restTypeDict = [];
    restType=[];
    restCount=[];
    restColor=[];

    //loop to grab restaurant type list and append to dictionary object
    data.forEach(function(row){
        for(x=0; x<restTypeList.length; x++){
            if (row.type ===restTypeList[x]){
                listCheck = true;
            }
            
        }
        if (listCheck===false){
            restTypeList.push(row.type);
            restTypeDict.push({
                type: row.type,
                count: 0

            })
        }
        //reset to false to perform check for next restaurant type
        listCheck = false;


        
    })
    //loop entire data to find counts for each restaurant type
    data.forEach(function(row){
        restTypeDict.forEach(function(dict){
            if (row.type===dict.type){
                dict.count++;
            }
        })
    })
    //sort dictionary
    restTypeDict.sort(function(a, b){
        return b.count-a.count
    })

    //push dictionary into list objects for plotting
    for(z=0; z<restTypeDict.length; z++){
        restType.push(restTypeDict[z].type);
        console.log(restTypeDict[z].type);
        restCount.push(restTypeDict[z].count);
        //change colors for each load
        restColor.push(getRandomColor());

    }

    console.log(restType);
    console.log(restCount);
    console.log(restColor);
    //chart.js to plot histogram
    new Chart(document.getElementById("bar-chart"), {
        type: 'bar',
        data: {
          labels: restType,
          datasets: [
            {
              label: "Restaurant Count",
              backgroundColor: restColor,
              data: restCount
            }
          ]
        },
        options: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Charlotte Restaurant Histogram'
          }
        }
    });
    console.log(restTypeDict.length);
    console.log(restTypeDict[0].type);
})
//function for random color generater
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  return color;
}

/////////////////////////////////////////////////////////////////
////////////////Subra's scatter plot/////////////////////////////
/////////////////////////////////////////////////////////////////

var svgWidth = 860;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#-panelscatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
// d3.json(url).then(function(error, restData) {
d3.json("static/js/final.json", function(error, restData) {
  if (error) throw error;

    // Step 1: Parse Data/Cast as numbers
    // ==============================
      restData.forEach(function(data) {
        data.rating = data.rating;
        data.price = data.price.length;
      });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(restData, d => d.rating)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(restData, d => d.price)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(restData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.rating))
    .attr("cy", d => yLinearScale(d.price))
    .attr("r", "15")
    .attr("fill", "blue")
    .attr("opacity", ".1");

    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.name}<br>Rating: ${d.rating}<br>Type: ${d.type}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Price range");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
      .attr("class", "axisText")
      .text("Rating");


    });


 



        
