// Initializes the page with a default plot
  d3.json("/mean").then(function(stateData, err) {
    if (err) throw err;
    console.log(stateData)
    //parse data
    stateData.forEach(function(data) {
      data.ozone = +data.Mean_ozone * 100;
      data.pm = +data.Mean_pm;
    });
  
    // var firstdataset = [{labels:stateData.map(row => row.state), data:stateData.map(row => row.ozone)}];
    // var seconddataset = [{labels:stateData.map(row => row.state), data:stateData.map(row => row.pm)}];

    var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart (ctx, {
        type:'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data:{
            labels:stateData.map(row => row.State),
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
    d3.select('.container').html('');
    d3.select('.container').html('<canvas id="myChart" width="1600" height="900"></canvas>');
    ctx = document.getElementById('myChart').getContext('2d');
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
          labels:stateData.map(row => row.State),
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

  if (dataset === 'dataset2') {
     myChart = new Chart (ctx, {
      type:'bar', //bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
          labels:stateData.map(row => row.State),
          datasets:[{
              label: 'Ozone (ppm x 100)',
              data:stateData.map(row => row.ozone),
              backgroundColor:'red',
              borderWidth:1,
              borderColor: 'red',
              hoverBorderWidth:4,
              hoverBorderColor:'#000'
          }] //closing L149
      },//closing L144
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
          labels:stateData.map(row => row.State),
          datasets:[{
              label: 'PM2.5 (ug/cubic meter)',
              data:stateData.map(row => row.pm),
              backgroundColor:'blue',
              borderWidth:1,
              borderColor: 'blue',
              hoverBorderWidth:4,
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

  }); 