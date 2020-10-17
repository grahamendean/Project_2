d3.csv("Data/merge.csv").then(function(ozoneData, err) {
    if (err) throw err;
    console.log(ozoneData);
  
    //parse data
    ozoneData.forEach(function(data) {
      data.ozone = +data.mean_x * 100;
      data.pm = +data.mean_y;
    });

    // var ozone = ozoneData.mean_x;
    // var pm = ozoneData.mean_y;
    // var ozoneState = ozoneData.state_name_x;
    // var pmState = ozoneData.state_name_y;

    //d3.selectAll(".nav-link dropdown-toggle active").on("change", updatePlotly);

    function updatePlotly(params) {

}

    var ctx = document.getElementById('myChart').getContext('2d');

    let myChart = new Chart (ctx, {
        type:'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data:{
            labels:ozoneData.map(row => row.state_name_x),
            datasets:[{
                label: 'Ozone (ppm)',
                data:ozoneData.map(row => row.ozone),
                backgroundColor:'red',
                borderWidth:1,
                borderColor: 'red',
                hoverBorderWidth:2,
                hoverBorderColor:'#000'
            },
        
        {
            // labels:ozoneData.map(row => row.state_name_x),
            // datasets:[{
                label: 'PM2.5 (ug/cubic meter x 100)',
                data:ozoneData.map(row => row.pm),
                backgroundColor:'blue',
                borderWidth:1,
                borderColor: 'blue',
                hoverBorderWidth:2,
                hoverBorderColor:'#000'
            // }]//closing L34
            }], //closing L22
        }, //closing L20
        options:{
        title: {
            display:true,
            position: 'top',
            text:"Air pollutant graph",
            fontSize: 25,
        }, //closing L46
        legend:{
            position:'top',
            labels: {
                fontColor: '#000'
            } //closing L53
        }, //closing L51
        layout: {
            padding: {
                left:50, 
                right:0,
                bottom:0,
                top:0
            } // closing L58
        }, //closing L57
        // tooltip:{
        //     enabled:true
        // }, // closing L65 
        } //closing L45}
    
    }); // closing L18
});