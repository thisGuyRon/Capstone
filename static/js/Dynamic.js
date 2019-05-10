//Season json for drop down load
/*************************************************************
 * Flask Failures for 2 json pulls, led to loading each in JS
 *************************************************************/
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
 {seasons:"26"}
 //{seasons:"27"}
 
];
//Character json for drop down load
//established via query in workbench
/*************************************************************
 * Flask Failures for 2 json pulls, led to loading each in JS
 *************************************************************/
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
//buttons to load characters
var char1 = d3.select(".btn-char1");
var char2 = d3.select(".btn-char2");
//character 1 summary number fields
var char1Head = d3.select("#char1-head");   
var char1Totall = d3.select("#char1-totall");                   
var char1Totalw = d3.select("#char1-totalw");                 
var char1Appear = d3.select("#char1-appear");                 
var char1Maxl = d3.select("#char1-maxl");                  
var char1Maxw = d3.select("#char1-maxw");                 
var char1Avgl = d3.select("#char1-avgl");                 
var char1Avgw = d3.select("#char1-avgw"); 
//character 2 summary number fields                      
var char2Head = d3.select("#char2-head");                
var char2Totall = d3.select("#char2-totall");                   
var char2Totalw = d3.select("#char2-totalw");                   
var char2Appear = d3.select("#char2-appear");                   
var char2Maxl = d3.select("#char2-maxl");                    
var char2Maxw = d3.select("#char2-maxw");                    
var char2Avgl = d3.select("#char2-avgl");                   
var char2Avgw = d3.select("#char2-avgw");  

//initial function initializing list box
function init(){
    
    load_seasons();
    load_char();
       
}

// load seasons function
/*************************************************** */
/* contains code for loading fields using api call   */
/*************************************************** */
async function load_seasons(){
    //d3.json("/season_load", function(data){
        //select dropdown to add values
        var enter_season = d3.select("#dropdown-3");

      // console.log(data);
       console.log(seasons);
      // for(x=0; x<data.length; x++){
        for(x=0; x<seasons.length; x++){
            //console.log(seasons[x].seasons)
            //add values to dropdown
            enter_season
                .append("option")
                .text(seasons[x].seasons)
                .property("value", seasons[x].seasons);
        }
       // load_char();
  //  })
   }

// load characters function
/*************************************************** */
/* contains code for loading fields using api call   */
/*************************************************** */   
async function load_char(){
    //await load_seasons();
 //  d3.json("/char_load", function(char_data){
     // select drop down boxes
        var char1 = d3.select("#dropdown-1");
        var char2 = d3.select("#dropdown-2");
        console.log(characters);
       // for(x=0; x<char_data.length; x++){
        for(x=0; x<characters.length; x++){
            //console.log(char_data[x].name);
            //add options to dropdowns
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
//call init function
init();

//character click listener
char1.on("click", char1_load);
char2.on("click", char2_load);

//function for listener to fire
function char1_load(){
    //prevent refresh
    d3.event.preventDefault();
    season_imdb();
    //grab values from dropdowns
    var seasonInput=d3.select("#dropdown-3");
    var seasonValue = seasonInput.property("value");
    var char1Input = d3.select("#dropdown-1");
    var char1Value = char1Input.property("value");
    //if character has space in name, adjust with html format
    var char1JS=encodeURIComponent(char1Value.trim())
    // set url
    var char1_url = "/character/" + char1JS +"/"+seasonValue;
    //call api in flask
   d3.json(char1_url, function(character1){
       //check for all option (for different graphs)
       if (seasonValue==="All"){
           //set variables
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
                //set values for summary stats
                var line = character1[x].Lines;
                var word = character1[x].Words;
                lineTotal = lineTotal+character1[x].Lines;
                wordTotal = wordTotal+character1[x].Words;
                //check for appearances
                if(line>0){
                    appearances++;
                };
            //set max values for words and lines
            if(line>lineMax){
                lineMax = line;
            }
            if(word>wordMax){
                wordMax=word;
            };
                //push values to lists
                season.push(character1[x].season);
                seasonLineCount.push(character1[x].Lines);
                seasonWordCount.push(character1[x].Words);
            }
            //calculate averages
            wordAverage = wordTotal/appearances;
            lineAverage = lineTotal/appearances;
            //set title to graph
            var plotTitleLines = char1Value + " Lines per All Seasons";
            var plotTitleWords = char1Value + " Words per All Seasons";
            //create trace for plots
            var trace1 = {
                x: season,
                y: seasonLineCount,
                type: 'scatter'
            };
            //layout for char1 all seasons lines
            var layout1 = {
                title: {
                    text: plotTitleLines
                },
                xaxis:{
                    title:{
                    text: "Season"
                    }
                },
                yaxis:{
                    title:{
                    text:"Lines"
                    }
                }
            };
            Plotly.newPlot('char1-graph-lines', [trace1],layout1);
            //create trace for plots
            var trace2 = {
                x: season,
                y: seasonWordCount,
                type: 'scatter'
            };
            //layout for char1 all seasons words
            var layout2 = {
                title: {
                    text: plotTitleWords
                },
                xaxis:{
                    title:{
                    text: "Season"
                    }
                },
                yaxis:{
                    title:{
                    text:"Words"
                    }
                }
            };
            Plotly.newPlot('char1-graph-words', [trace2], layout2);
            //print values in summary paragraph
            char1Head.text(char1Value);
            char1Totall.text("Total Lines: "+ lineTotal);
            char1Totalw.text("Total words: " + wordTotal);
            char1Appear.text("Seasons appeared in: " + appearances);
            char1Avgl.text("Average Lines per Season: " + lineAverage);
            char1Avgw.text("Average Words per Season: " + wordAverage);
            char1Maxl.text("Max Lines in a season: " + lineMax);
            char1Maxw.text("Max Words in a season: " + wordMax);

       }
       //if not all and based off season
       else{
        //variable creation
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
            //sets values for summary
            var line = character1[x].Lines;
            var word = character1[x].Words;
            lineTotal = lineTotal+character1[x].Lines;
            wordTotal = wordTotal+character1[x].Words;
            //check for appearances
            if(line>0){
                appearances++;
            };
            //set max values
            if(line>lineMax){
                lineMax = line;
            }
            if(word>wordMax){
                wordMax=word;
            };
            //push items to list for plotting
            episodes.push(character1[x].Episode);
            episodeLineCount.push(character1[x].Lines);
            episodeWordCount.push(character1[x].Words);
        }
        //calculate averages
        wordAverage = wordTotal/appearances;
        lineAverage = lineTotal/appearances;

        //set title to graph
        var plotTitleLines = char1Value + " Lines per Episode, Season: " + seasonValue;
        var plotTitleWords = char1Value + " Words per Episode, Season: " + seasonValue;

        //create trace for plotting
        var trace1 = {
            x: episodes,
            y: episodeLineCount,
            type: 'scatter'
        };
        //layout for char1 specific season, lines
        var layout1 = {
            title: {
                text: plotTitleLines
            },
            xaxis:{
                title:{
                text: "Episode"
                }
            },
            yaxis:{
                title:{
                text:"Lines"
                }
            }
        };
        Plotly.newPlot('char1-graph-lines', [trace1], layout1);
        //create trace for plotting
        var trace2 = {
            x: episodes,
            y: episodeWordCount,
            type: 'scatter'
        };
        //layout for char1 specific season, words
        var layout2 = {
            title: {
                text: plotTitleWords
            },
            xaxis:{
                title:{
                text: "Episode"
                }
            },
            yaxis:{
                title:{
                text:"Words"
                }
            }
        };
        //print summary stats
        Plotly.newPlot('char1-graph-words', [trace2], layout2);
        char1Head.text(char1Value);
        char1Totall.text("Total Lines in season: "+ lineTotal);
        char1Totalw.text("Total words in season: " + wordTotal);
        char1Appear.text("Episodes appeared in: " + appearances);
        char1Avgl.text("Average Lines per episode: " + lineAverage);
        char1Avgw.text("Average Words per episode: " + wordAverage);
        char1Maxl.text("Max Lines in a episode: " + lineMax);
        char1Maxw.text("Max Words in a episode: " + wordMax);
       }
        
    })
    
    
}

//clone function for second character
function char2_load(){
    //prevent refresh
    d3.event.preventDefault();
    season_imdb();
    //grab values from dropdowns
    var seasonInput=d3.select("#dropdown-3");
    var seasonValue = seasonInput.property("value");
    var char2Input = d3.select("#dropdown-2");
    var char2Value = char2Input.property("value");
    //set name values to html compatible if it has spaces
    var char2JS=encodeURIComponent(char2Value.trim())
    //set url for flask api call
    var char2_url = "/character/" + char2JS +"/"+seasonValue;
   
    //call api
   d3.json(char2_url, function(character2){
        //check for season or all season breakdown
        if (seasonValue==="All"){
            //variable creation for summary
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
                    //set variables for stats
                    var line = character2[x].Lines;
                    var word = character2[x].Words;
                    lineTotal = lineTotal+character2[x].Lines;
                    wordTotal = wordTotal+character2[x].Words;
                    //add appearances
                    if(line>0){
                        appearances++;
                    };
                    //set values for max lines and words
                    if(line>lineMax){
                        lineMax = line;
                    }
                    if(word>wordMax){
                        wordMax=word;
                    }
                    //push values to list for plotting
                    season.push(character2[x].season);
                    seasonLineCount.push(character2[x].Lines);
                    seasonWordCount.push(character2[x].Words);
                }
                //calculate averages
                wordAverage = wordTotal/appearances;
                lineAverage = lineTotal/appearances;
                //set title for all season char2
                var plotTitleLines = char2Value + " lines per All Seasons";
                var plotTitleWords = char2Value + " Words per All Seasons";
                //create trace for 2nd character
                var trace1 = {
                    x: season,
                    y: seasonLineCount,
                    type: 'scatter'
                };
                var layout1 = {
                    title: {
                        text: plotTitleLines
                    },
                    xaxis:{
                        title:{
                        text: "Season"
                        }
                    },
                    yaxis:{
                        title:{
                        text:"Lines"
                        }
                    }
                };
                Plotly.newPlot('char2-graph-lines', [trace1], layout1);
                
                //create 2nd trace for 2nd character
                var trace2 = {
                    x: season,
                    y: seasonWordCount,
                    type: 'scatter'
                };
                //layout for char1 all seasons words
            var layout2 = {
                title: {
                    text: plotTitleWords
                },
                xaxis:{
                    title:{
                    text: "Season"
                    }
                },
                yaxis:{
                    title:{
                    text:"Words"
                    }
                }
            };
                Plotly.newPlot('char2-graph-words', [trace2], layout2);
                //summary values printed
                char2Head.text(char2Value);
                char2Totall.text("Total Lines: "+ lineTotal);
                char2Totalw.text("Total words: " + wordTotal);
                char2Appear.text("Seasons appeared in: " + appearances);
                char2Avgl.text("Average Lines per Season: " + lineAverage);
                char2Avgw.text("Average Words per Season: " + wordAverage);
                char2Maxl.text("Max Lines in a season: " + lineMax);
                char2Maxw.text("Max Words in a season: " + wordMax);
    
           }
           //if not filtered by all its for each season
           else{
               //create variables
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
                //set variables for summary
                var line = character2[x].Lines;
                var word = character2[x].Words;
                lineTotal = lineTotal+character2[x].Lines;
                wordTotal = wordTotal+character2[x].Words;
                //set value for appearances
                if(line>0){
                    appearances++;
                };
                //set max for lines and words
                if(line>lineMax){
                    lineMax = line;
                }
                if(word>wordMax){
                    wordMax=word;
                }
                //push values to list for plotting
                episodes.push(character2[x].Episode);
                episodeLineCount.push(character2[x].Lines);
                episodeWordCount.push(character2[x].Words);
            }
            //set averages
            wordAverage = wordTotal/appearances;
            lineAverage = lineTotal/appearances;

            //set title to graph
        var plotTitleLines = char2Value + " Lines per Episode, Season: " + seasonValue;
        var plotTitleWords = char2Value + " Words per Episode, Season: " + seasonValue;
            //create trace for 2nd character
            var trace1 = {
                x: episodes,
                y: episodeLineCount,
                type: 'scatter'
            };
            //layout for char2 specific season, lines
        var layout1 = {
            title: {
                text: plotTitleLines
            },
            xaxis:{
                title:{
                text: "Episode"
                }
            },
            yaxis:{
                title:{
                text:"Lines"
                }
            }
        };
            Plotly.newPlot('char2-graph-lines', [trace1], layout1);
            //create 2nd trace for 2nd character
            var trace2 = {
                x: episodes,
                y: episodeWordCount,
                type: 'scatter'
            };
            //layout for char1 specific season, words
        var layout2 = {
            title: {
                text: plotTitleWords
            },
            xaxis:{
                title:{
                text: "Episode"
                }
            },
            yaxis:{
                title:{
                text:"Words"
                }
            }
        };
            //print summary stats for second character
            Plotly.newPlot('char2-graph-words', [trace2], layout2);
            char2Head.text(char2Value);
            char2Totall.text("Total Lines in season: "+ lineTotal);
            char2Totalw.text("Total words in season: " + wordTotal);
            char2Appear.text("Episodes appeared in: " + appearances);
            char2Avgl.text("Average Lines per episode: " + lineAverage);
            char2Avgw.text("Average Words per episode: " + wordAverage);
            char2Maxl.text("Max Lines in a episode: " + lineMax);
            char2Maxw.text("Max Words in a episode: " + wordMax);
           }
    })
}
//change the overall season/episode graph at bottom of page
function season_imdb(){
    console.log("test");
    //grab season input value
    var seasonInput=d3.select("#dropdown-3");
    var seasonValue = seasonInput.property("value");
    //grab area to print season data
    var seasonArea = d3.select("#sea-epi-graph");
    //clear pre-existing season data
    seasonArea.html("");
    
    // switch graph of season on button press
    switch (seasonValue){
        case "All":
            seasonArea.html('<img src="../static/images/AllSeason_imdb.png" width="900" length="200">');
            console.log("test2");
            break;
        case "1":
            seasonArea.html('<img src="../static/images/season1_imdb.png" width="900" length="200">');
            break;
        case "2":
            seasonArea.html('<img src="../static/images/season2_imdb.png" width="900" length="200">');
            break;
        case "3":
            seasonArea.html('<img src="../static/images/season3_imdb.png" width="900" length="200">');
            break;
        case "4":
            seasonArea.html('<img src="../static/images/season4_imdb.png" width="900" length="200">');
            break;
        case "5":
            seasonArea.html('<img src="../static/images/season5_imdb.png" width="900" length="200">');
            break;
        case "6":
            seasonArea.html('<img src="../static/images/season6_imdb.png" width="900" length="200">');
            break;
        case "7":
            seasonArea.html('<img src="../static/images/season7_imdb.png" width="900" length="200">');
            break;
        case "8":
            seasonArea.html('<img src="../static/images/season8_imdb.png" width="900" length="200">');
            break;
        case "9":
            seasonArea.html('<img src="../static/images/season9_imdb.png" width="900" length="200">');
            break;
        case "10":
            seasonArea.html('<img src="../static/images/season10_imdb.png" width="900" length="200">');
            break;
        case "11":
            seasonArea.html('<img src="../static/images/season11_imdb.png" width="900" length="200">');
            break;
        case "12":
            seasonArea.html('<img src="../static/images/season12_imdb.png" width="900" length="200">');
            break;
        case "13":
            seasonArea.html('<img src="../static/images/season13_imdb.png" width="900" length="200">');
            break;
        case "14":
            seasonArea.html('<img src="../static/images/season14_imdb.png" width="900" length="200">');
            break;
        case "15":
            seasonArea.html('<img src="../static/images/season15_imdb.png" width="900" length="200">');
            break;
        case "16":
            seasonArea.html('<img src="../static/images/season16_imdb.png" width="900" length="200">');
            break;
        case "17":
            seasonArea.html('<img src="../static/images/season17_imdb.png" width="900" length="200">');
            break;
        case "18":
            seasonArea.html('<img src="../static/images/season18_imdb.png" width="900" length="200">');
            break;
        case "19":
            seasonArea.html('<img src="../static/images/season19_imdb.png" width="900" length="200">');
            break;
        case "20":
            seasonArea.html('<img src="../static/images/season20_imdb.png" width="900" length="200">');
            break;
        case "21":
            seasonArea.html('<img src="../static/images/season21_imdb.png" width="900" length="200">');
            break;
        case "22":
            seasonArea.html('<img src="../static/images/season22_imdb.png" width="900" length="200">');
            break;
        case "23":
            seasonArea.html('<img src="../static/images/season23_imdb.png" width="900" length="200">');
            break;
        case "24":
            seasonArea.html('<img src="../static/images/season24_imdb.png" width="900" length="200">');
            break;
        case "25":
            seasonArea.html('<img src="../static/images/season25_imdb.png" width="900" length="200">');
            break;
        case "26":
            seasonArea.html('<img src="../static/images/season26_imdb.png" width="900" length="200">');
            break;
        default:
            seasonArea.html("");
            break;

    }
}
