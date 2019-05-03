var tbody = d3.select("tbody");
var button = d3.select("#search-btn");

button.on("click", handleClick);

function handleClick(){

    d3.event.preventDefault();
    tbody.html("");
    var search = d3.select("#search-element");
    var input = search.property("value");
    
    var url = "/search/" + input;
    console.log(url);
    d3.json(url, function(data){
        console.log(data);
        data.forEach(function(dataRow) {
            var row = tbody.append("tr");
            var seasonData = row.append("td");
            seasonData.text(dataRow.Season_No);
            var episodeNoData = row.append("td");
            episodeNoData.text(dataRow.Season_Episode_No);
            var titleData = row.append("td");
            titleData.text(dataRow.title);
            var lineData = row.append("td");
            lineData.text(dataRow.line);
            var picData = row.append("td");
            //picData.text(dataRow.image);
            var picHTML = '<img src=' + dataRow.image + ' style="width:100px;height:75px;">'
            //<img src="img_girl.jpg" alt="Girl in a jacket" style="width:500px;height:600px;">
            picData.html(picHTML);

            
            console.log(dataRow.Season_Episode_No);
            
        });
    })

}
