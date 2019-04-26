function init(){
    
    load_seasons();
    load_char();
       // console.log(data.length)

    
    
}
function load_seasons(){
    d3.json("/season_load", function(data){
        var enter_season = d3.select("#dropdown-3");

        console.log(data);
        for(x=0; data.length; x++){
            //console.log(data[x].All)
            enter_season
                .append("option")
                .text(data[x].All)
                .property("value", data[x].All);
        }
    });
}
function load_char(){
    d3.json("/char_load", function(char_data){
        var char1 = d3.select("#dropdown-1");
        var char2 = d3.select("#dropdown-2");
        console.log(char_data);
        for(x=0; char_data.length; x++){
            char1
                .append("option")
                .text(char_data[x].name)
                .property("value", char_data[x].name);
            char2
                .append("option")
                .text(char_data[x].name)
                .property("value", char_data[x].name);
        }
    })
}
init();
