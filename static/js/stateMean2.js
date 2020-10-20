// Initializes the page with a default plot
function init() {
  d3.csv("../Data/merge_mean_state.csv").then(function(stateData, err) {
    if (err) throw err;
  
    //parse data
    stateData.forEach(function(data) {
      data.ozone = +data.mean_ozone * 100;
      data.pm = +data.mean_pm;
    });
  
    // var firstdataset = [{labels:stateData.map(row => row.state), data:stateData.map(row => row.ozone)}];
    // var seconddataset = [{labels:stateData.map(row => row.state), data:stateData.map(row => row.pm)}];

    var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart (ctx, {
        type:'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data:{
            labels:stateData.map(row => row.state),
            datasets:[{
                label: 'Ozone (ppm x 100)',
                data:stateData.map(row => row.ozone),
                backgroundColor:'red',
                borderWidth:1,
                borderColor: 'red',
                hoverBorderWidth:2,
                hoverBorderColor:'#000'
            },
            { 
            // labels:ozoneData.map(row => row.state_name_x),
            // datasets:[{
                label: 'PM2.5 (ug/cubic meter)',
                data:stateData.map(row => row.pm),
                backgroundColor:'blue',
                borderWidth:1,
                borderColor: 'blue',
                hoverBorderWidth:2,
                hoverBorderColor:'#000'
            }]//closing L31
            // }], //closing L21
        },//closing L17
        options:{
        title: {
            display:true,
            position: 'top',
            text:"Air pollutant graph",
            fontSize: 25,
        }, //closing L43
        legend:{
            position:'top',
            labels: {
                fontColor: '#000'
            } //closing L51
        }, //closing L49
        layout: {
            padding: {
                left:50, 
                right:0,
                bottom:0,
                top:0
            } // closing L58
        }, //closing L55
        // tooltip:{
        //     enabled:true
        // }, // closing L65 
        } //closing L42}
    

    }); // closing L18
    // console.log(stateData);
    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", refreshChart);


function refreshChart() {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");

  // Initialize x and y arrays
  var labels = [];
  var data = [];
  console.log(myChart.tooltip._data.datasets[1])
  if (dataset === 'dataset1') {
    myChart = new Chart (ctx, {
      type:'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
          labels:stateData.map(row => row.state),
          datasets:[{
              label: 'Ozone (ppm x 100)',
              data:stateData.map(row => row.ozone),
              backgroundColor:'red',
              borderWidth:1,
              borderColor: 'red',
              hoverBorderWidth:2,
              hoverBorderColor:'#000'
          },
          { 
          // labels:ozoneData.map(row => row.state_name_x),
          // datasets:[{
              label: 'PM2.5 (ug/cubic meter)',
              data:stateData.map(row => row.pm),
              backgroundColor:'blue',
              borderWidth:1,
              borderColor: 'blue',
              hoverBorderWidth:2,
              hoverBorderColor:'#000'
          }]//closing L31
          // }], //closing L21
      },//closing L17
      options:{
      title: {
          display:true,
          position: 'top',
          text:"Air pollutant graph",
          fontSize: 25,
      }, //closing L43
      legend:{
          position:'top',
          labels: {
              fontColor: '#000'
          } //closing L51
      }, //closing L49
      layout: {
          padding: {
              left:50, 
              right:0,
              bottom:0,
              top:0
          } // closing L58
      }, //closing L55
      // tooltip:{
      //     enabled:true
      // }, // closing L65 
      } //closing L42}
    }); // closing L18
  }

  else if (dataset === 'dataset2') {
     myChart = new Chart (ctx, {
      type:'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
          labels:stateData.map(row => row.state),
          datasets:[{
              label: 'Ozone (ppm x 100)',
              // data:stateData.map(row => row.ozone),
              backgroundColor:'red',
              borderWidth:1,
              borderColor: 'red',
              hoverBorderWidth:2,
              hoverBorderColor:'#000'
          },
      
          { 
          // labels:ozoneData.map(row => row.state_name_x),
          // datasets:[{
              label: 'PM2.5 (ug/cubic meter)',
              data:stateData.map(row => row.pm),
              backgroundColor:'blue',
              borderWidth:1,
              borderColor: 'blue',
              hoverBorderWidth:2,
              hoverBorderColor:'#000'
          // }]//closing L31
          }
        ] //closing L19
      },//closing L17
      options:{
      title: {
          display:true,
          position: 'top',
          text:"Air pollutant graph",
          fontSize: 25,
      }, //closing L43
      legend:{
          position:'top',
          labels: {
              fontColor: '#000'
          } //closing L51
      }, //closing L49
      layout: {
          padding: {
              left:50, 
              right:0,
              bottom:0,
              top:0
          } // closing L58
      }, //closing L55
      // tooltip:{
      //     enabled:true
      // }, // closing L65 
      } //closing L42}
  

  }); // closing L18
  }

  else if (dataset === 'dataset3'){
    myChart = new Chart (ctx, {
      type:'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
          labels:stateData.map(row => row.state),
          datasets:[{
              label: 'Ozone (ppm x 100)',
              data:stateData.map(row => row.ozone),
              backgroundColor:'red',
              borderWidth:1,
              borderColor: 'red',
              hoverBorderWidth:2,
              hoverBorderColor:'#000'
          },
      
          { 
          // labels:ozoneData.map(row => row.state_name_x),
          // datasets:[{
              label: 'PM2.5 (ug/cubic meter)',
              // data:stateData.map(row => row.pm),
              backgroundColor:'blue',
              borderWidth:1,
              borderColor: 'blue',
              hoverBorderWidth:2,
              hoverBorderColor:'#000'
          // }]//closing L31
          }
        ] //closing L19
      },//closing L17
      options:{
      title: {
          display:true,
          position: 'top',
          text:"Air pollutant graph",
          fontSize: 25,
      }, //closing L43
      legend:{
          position:'top',
          labels: {
              fontColor: '#000'
          } //closing L51
      }, //closing L49
      layout: {
          padding: {
              left:50, 
              right:0,
              bottom:0,
              top:0
          } // closing L58
      }, //closing L55
      // tooltip:{
      //     enabled:true
      // }, // closing L65 
      } //closing L42}
  

  }); // closing L18
  }
  // Note the extra brackets around 'x' and 'y'
  myChart.update();

}

  }); // closing L3

} //closing L2

// zingchart.render({
//   id: 'myChart',
//   data: myConfig
// });



// orders.forEach(o => {
//   const opt = document.createElement('option');
//   opt.value = stateData.state;
//   opt.appendState(document.createTextNode(stateData.state));
//   document.getElementById('operator').appendState(opt);
// });


init();