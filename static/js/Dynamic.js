var seasons = [
 {seasons:"All"},
 {seasons:"1"},
 {seasons:"2"},
 {seasons:"3"},
 {seasons:"4"},
 {seasons:"5"},
 {seasons:"6"},
 {seasons:"7"},
 {seasons:"8"},
 {seasons:"9"},
 {seasons:"10"},
 {seasons:"11"},
 {seasons:"12"},
 {seasons:"13"},
 {seasons:"14"},
 {seasons:"15"},
 {seasons:"16"},
 {seasons:"17"},
 {seasons:"18"},
 {seasons:"19"},
 {seasons:"20"},
 {seasons:"21"},
 {seasons:"22"},
 {seasons:"23"},
 {seasons:"24"},
 {seasons:"25"},
 {seasons:"26"},
 {seasons:"27"}
 
];
//console.log(seasons);
var characters = [
    {name:"Homer Simpson"},
    {name:"Marge Simpson"},
    {name:"Bart Simpson"},
    {name:"Lisa Simpson"},
    {name:"C. Montgomery Burns"},
    {name:"Moe Szyslak"},
    {name:"Seymour Skinner"},
    {name:"Ned Flanders"},
    {name:"Grampa Simpson"},
    {name:"Milhouse Van Houten"},
    {name:"Chief Wiggum"},
    {name:"Krusty the Clown"},
    {name:"Nelson Muntz"},
    {name:"Lenny Leonard"},
    {name:"Apu Nahasapeemapetilon"},
    {name:"Waylon Smithers"},
    {name:"Kent Brockman"},
    {name:"Carl Carlson"},
    {name:"Edna Krabappel-Flanders"},
    {name:"Dr. Julius Hibbert"},
    {name:"Selma Bouvier"},
    {name:"Barney Gumble"},
    {name:"Rev. Timothy Lovejoy"},
    {name:"Sideshow Bob"},
    {name:"Gary Chalmers"}
];
var char1 = d3.select(".btn-char1");
var char2 = d3.select(".btn-char2");
function init(){
    
    load_seasons();
    load_char();
       // console.log(data.length)

    
    
}
async function load_seasons(){
    //d3.json("/season_load", function(data){
        var enter_season = d3.select("#dropdown-3");

      // console.log(data);
       console.log(seasons);
      // for(x=0; x<data.length; x++){
        for(x=0; x<seasons.length; x++){
            //console.log(seasons[x].seasons)
            enter_season
                .append("option")
                .text(seasons[x].seasons)
                .property("value", seasons[x].seasons);
        }
       // load_char();
  //  })
   }

async function load_char(){
    //await load_seasons();
 //  d3.json("/char_load", function(char_data){
        var char1 = d3.select("#dropdown-1");
        var char2 = d3.select("#dropdown-2");
        console.log(characters);
       // for(x=0; x<char_data.length; x++){
        for(x=0; x<characters.length; x++){
            //console.log(char_data[x].name);
            char1
                .append("option")
                .text(characters[x].name)
                .property("value", characters[x].name);
            char2
                .append("option")
                .text(characters[x].name)
                .property("value", characters[x].name);
        }
  //  })
}
init();

char1.on("click", char1_load);
char2.on("click", char2_load);

function char1_load(){
    d3.event.preventDefault();
    var seasonInput=d3.select("#dropdown-3");
    var seasonValue = seasonInput.property("value");
    var char1Input = d3.select("#dropdown-1");
    var char1Value = char1Input.property("value");
    var char1JS=encodeURIComponent(char1Value.trim())
    var char1_url = "/character/" + char1JS +"/"+seasonValue;
    
   d3.json(char1_url, function(character1){
       if (seasonValue==="All"){
            var season=[];
            var seasonLineCount=[];
            var seasonWordCount=[];
            var lineTotal=0;
            var wordTotal=0;
            var lineMax=0;
            var wordMax=0;
            var appearances=0;
            var lineAverage;
            var wordAverage;
            for(x=0;x<character1.length;x++){
                var line = character1[x].Lines;
                var word = character1[x].Words;
                lineTotal = lineTotal+character1[x].Lines;
                wordTotal = wordTotal+character1[x].Words;
                if(line>0){
                    appearances++;
                };
            if(line>lineMax){
                lineMax = line;
            }
            if(word>wordMax){
                wordMax=word;
            };
                season.push(character1[x].season);
                seasonLineCount.push(character1[x].Lines);
                seasonWordCount.push(character1[x].Words);
            }
            wordAverage = wordTotal/appearances;
            lineAverage = lineTotal/appearances;
            console.log(wordAverage);
            console.log(lineAverage);
            console.log(lineMax);
            console.log(wordMax);
            console.log(appearances);
            console.log(lineTotal);
            console.log(wordTotal); 
            var trace1 = {
                x: season,
                y: seasonLineCount,
                type: 'scatter'
            };
            Plotly.newPlot('char1-graph-lines', [trace1]);

            var trace2 = {
                x: season,
                y: seasonWordCount,
                type: 'scatter'
            };
            Plotly.newPlot('char1-graph-words', [trace2]);

       }
       else{
        var episodes=[];
        var episodeLineCount=[];
        var episodeWordCount=[];
        var lineTotal=0;
        var wordTotal=0;
        var lineMax=0;
        var wordMax=0;
        var appearances=0;
        var lineAverage;
        var wordAverage;
        for(x=0;x<character1.length;x++){
            var line = character1[x].Lines;
            var word = character1[x].Words;
            lineTotal = lineTotal+character1[x].Lines;
            wordTotal = wordTotal+character1[x].Words;
            if(line>0){
                appearances++;
            };
            if(line>lineMax){
                lineMax = line;
            }
            if(word>wordMax){
                wordMax=word;
            };
            episodes.push(character1[x].Episode);
            episodeLineCount.push(character1[x].Lines);
            episodeWordCount.push(character1[x].Words);
        }
        wordAverage = wordTotal/appearances;
        lineAverage = lineTotal/appearances;
        console.log(wordAverage);
        console.log(lineAverage);
        console.log(lineMax);
        console.log(wordMax);
        console.log(appearances);
        console.log(lineTotal);
        console.log(wordTotal);
        var trace1 = {
            x: episodes,
            y: episodeLineCount,
            type: 'scatter'
        };
        Plotly.newPlot('char1-graph-lines', [trace1]);

        var trace2 = {
            x: episodes,
            y: episodeWordCount,
            type: 'scatter'
        };
        Plotly.newPlot('char1-graph-words', [trace2]);
       }
        console.log(character1[0].Episode);
        console.log(season);
        console.log(seasonLineCount);
        console.log(seasonWordCount);
        
    })
    
    
}
function char2_load(){
    d3.event.preventDefault();
    var seasonInput=d3.select("#dropdown-3");
    var seasonValue = seasonInput.property("value");
    var char2Input = d3.select("#dropdown-2");
    var char2Value = char2Input.property("value");
    var char2JS=encodeURIComponent(char2Value.trim())
    console.log(char2JS);
    console.log(seasonValue);
    var char2_url = "/character/" + char2JS +"/"+seasonValue;
    
   d3.json(char2_url, function(character2){
        console.log(character2);
        if (seasonValue==="All"){
            var season=[];
            var seasonLineCount=[];
            var seasonWordCount=[];
            var lineTotal=0;
            var wordTotal=0;
            var lineMax=0;
            var wordMax=0;
            var appearances=0;
            var lineAverage;
            var wordAverage;
                for(x=0;x<character2.length;x++){
                    var line = character2[x].Lines;
                    var word = character2[x].Words;
                    lineTotal = lineTotal+character2[x].Lines;
                    wordTotal = wordTotal+character2[x].Words;
                    if(line>0){
                        appearances++;
                    };
                    if(line>lineMax){
                        lineMax = line;
                    }
                    if(word>wordMax){
                        wordMax=word;
                    }
    
                    season.push(character2[x].season);
                    seasonLineCount.push(character2[x].Lines);
                    seasonWordCount.push(character2[x].Words);
                }
                wordAverage = wordTotal/appearances;
                lineAverage = lineTotal/appearances;
                console.log(wordAverage);
                console.log(lineAverage);
                console.log(lineMax);
                console.log(wordMax);
                console.log(appearances);
                console.log(lineTotal);
                console.log(wordTotal); 
                var trace1 = {
                    x: season,
                    y: seasonLineCount,
                    type: 'scatter'
                };
                Plotly.newPlot('char2-graph-lines', [trace1]);
    
                var trace2 = {
                    x: season,
                    y: seasonWordCount,
                    type: 'scatter'
                };
                Plotly.newPlot('char2-graph-words', [trace2]);
    
           }
           else{
            var episodes=[];
            var episodeLineCount=[];
            var episodeWordCount=[];
            var lineTotal=0;
            var wordTotal=0;
            var lineMax=0;
            var wordMax=0;
            var appearances=0;
            var lineAverage;
            var wordAverage;
            for(x=0;x<character2.length;x++){
                var line = character2[x].Lines;
                var word = character2[x].Words;
                lineTotal = lineTotal+character2[x].Lines;
                wordTotal = wordTotal+character2[x].Words;
                if(line>0){
                    appearances++;
                };
                if(line>lineMax){
                    lineMax = line;
                }
                if(word>wordMax){
                    wordMax=word;
                }
                episodes.push(character2[x].Episode);
                episodeLineCount.push(character2[x].Lines);
                episodeWordCount.push(character2[x].Words);
            }
            console.log(wordAverage);
            console.log(lineAverage);
            console.log(lineMax);
            console.log(wordMax);
            console.log(appearances);
            console.log(lineTotal);
            console.log(wordTotal);
            var trace1 = {
                x: episodes,
                y: episodeLineCount,
                type: 'scatter'
            };
            Plotly.newPlot('char2-graph-lines', [trace1]);
    
            var trace2 = {
                x: episodes,
                y: episodeWordCount,
                type: 'scatter'
            };
            Plotly.newPlot('char2-graph-words', [trace2]);
           }
    })
}
