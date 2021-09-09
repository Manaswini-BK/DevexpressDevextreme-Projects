//Dropdowns - Department,  Line , Unit, StartTime , Endtime
var DepartmentJsonData;
var DepartmentValue = "DepartmentId";
var DepartmentCaption = "DepartmentName";
var LineJsonData;
var LineValue = "LineId";
var LineCaption = "LineName";
var UnitJsonData;
var DowntimeJsonData;
var kpiGrid = false;
var searchData = false;
var flagLoaded = false;
var departmentId = 0;
var startTime;
var endTime;
var lineId = 0;
var GridHeaderTextColor = "black";
var GridDataTextColor = "black";
var selectBoxValues = ["Duration","Count"];
DowntimeJsonData = {
	"Location": [
		{
			"Id": 215,
			"Location": "Redraw Can",
			"Total": 124.0,
			"MTTR": "00:31:00 hrs",
			"MTBF": "47:19:10 hrs",
			"Fault": 100.0,
			"EventCnt": 4,
			"RS_ID": 1
		}
	],
	"Faults": [
		{
			"FaultValue": "Unspecified",
			"Total": 1.0,
			"MTTR": "00:01:00 hrs",
			"MTBF": "00:25:05 hrs",
			"Fault": 0.81,
			"EventCnt": 1,
			"RS_ID": 2
		},
		{
			"FaultValue": "Clottage",
			"Total": 61.0,
			"MTTR": "01:01:00 hrs",
			"MTBF": "187:51:12 hrs",
			"Fault": 49.19,
			"EventCnt": 1,
			"RS_ID": 2
		},
		{
			"FaultValue": "Breakdown",
			"Total": 62.0,
			"MTTR": "00:31:00 hrs",
			"MTBF": "00:30:11 hrs",
			"Fault": 50.0,
			"EventCnt": 2,
			"RS_ID": 2
		}
	],
	"Reason1": [
		{
			"Id": 34,
			"Type": "Minor Stops",
			"Total": 1.0,
			"MTTR": "00:01:00 hrs",
			"MTBF": "00:02:06 hrs",
			"Fault": 0.81,
			"EventCnt": 1,
			"RS_ID": 3
		},
		{
			"Id": 35,
			"Type": "Setup & Adjustments",
			"Total": 123.0,
			"MTTR": "00:41:00 hrs",
			"MTBF": "63:04:52 hrs",
			"Fault": 99.19,
			"EventCnt": 3,
			"RS_ID": 3
		}
	],
	"Reason2": [
		{
			"Id": 20,
			"Reason": "Operator Assist",
			"Total": 1.0,
			"MTTR": "00:01:00 hrs",
			"MTBF": "00:02:06 hrs",
			"Fault": 0.81,
			"EventCnt": 1,
			"RS_ID": 4,
			"Reason1ID": 34
		},
		{
			"Id": 39,
			"Reason": "Quality Change",
			"Total": 61.0,
			"MTTR": "01:01:00 hrs",
			"MTBF": "187:51:12 hrs",
			"Fault": 49.19,
			"EventCnt": 1,
			"RS_ID": 4,
			"Reason1ID": 35
		},
		{
			"Id": 36,
			"Reason": "Product Change",
			"Total": 62.0,
			"MTTR": "00:31:00 hrs",
			"MTBF": "00:41:41 hrs",
			"Fault": 50.0,
			"EventCnt": 2,
			"RS_ID": 4,
			"Reason1ID": 35
		}
	],
	"Reason3": [
		{
			"Id": 21,
			"Detail": "Machine Jam",
			"Total": 1.0,
			"MTTR": "00:01:00 hrs",
			"MTBF": "00:02:06 hrs",
			"Fault": 0.81,
			"EventCnt": 1,
			"RS_ID": 5,
			"Reason2Id": 20
		},
		{
			"Id": 37,
			"Detail": "CIP",
			"Total": 1.0,
			"MTTR": "00:01:00 hrs",
			"MTBF": "00:25:05 hrs",
			"Fault": 0.81,
			"EventCnt": 1,
			"RS_ID": 5,
			"Reason2Id": 36
		},
		{
			"Id": 38,
			"Detail": "Configuration",
			"Total": 61.0,
			"MTTR": "01:01:00 hrs",
			"MTBF": "00:58:17 hrs",
			"Fault": 49.19,
			"EventCnt": 1,
			"RS_ID": 5,
			"Reason2Id": 36
		},
		{
			"Id": 0,
			"Detail": "Unspecified",
			"Total": 61.0,
			"MTTR": "01:01:00 hrs",
			"MTBF": "187:51:12 hrs",
			"Fault": 49.19,
			"EventCnt": 1,
			"RS_ID": 5,
			"Reason2Id": 39
		}
	],
	"Product": [
		{
			"Id": 7,
			"Total": 124.0,
			"# Events": 4,
			"p": [
				{
					"Product": "001",
					"MTTR": "00:31:00 hrs",
					"MTBF": "01:29:00 hrs",
					"Quality Distribution": 25.83,
					"Fault": 100.0,
					"RS_ID": 7
				}
			]
		}
	],
	"Crew": [
		{
			"Crew": "Unspecified",
			"Total": 124.0,
			"MTTR": "00:31:00 hrs",
			"MTBF": "47:19:10 hrs",
			"Fault": 100.0,
			"EventCnt": 4,
			"RS_ID": 8
		}
	],
	"Shift": [
		{
			"Shift": "Unspecified",
			"Total": 124.0,
			"MTTR": "00:31:00 hrs",
			"MTBF": "47:19:10 hrs",
			"Fault": 100.0,
			"EventCnt": 4,
			"RS_ID": 9
		}
	]
}
//let dataComponent = EMBED.getComponent();
/**
  * returning JSON data 
  */

function returnParsedIfJson(str, field) {
  var rtn = "";
  try {
    if (str != undefined) {
      rtn = JSON.parse(str);
    }
  } catch (e) {
    alert("The field " + field + " is not a JSON string.")
    return str;
  }
  return rtn;
};

function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }

  return true;
}

function isObject(object) {
  return object != null && typeof object === 'object';
}

/***
 * css style data
 */
/*function styleData() {
  let styleData = EMBED.getTheme();
  GridHeaderTextColor = styleData.settings[19].value;                   // Theme Field name: "Header text" of "Grid" section
  GridDataTextColor = styleData.settings[20].value;                     // Theme Field name: "Grid text" of "Grid" section
  jQuery("#header-title").css("color", styleData.settings[6].value);    // Theme Field name: "Header 1 text" of "Headers" section
  jQuery(".h3text-color").css("color", styleData.settings[10].value);   // Theme Field name: "Header 3 text" of "Headers" section
  jQuery(".h3text-color").css("font-size", "20px");
}*/

/**
 * 
 * page load calling funcion to get the data 
 */

function useData(data) {
  //data = data || EMBED.getData();
  //debugger;
  // if (flagLoaded == false) {
  //   styleData();
  //   flagLoaded = true;
  // }
  /*var ParsedDowntimeJsonData = returnParsedIfJson(data.DowntimeJsonData, "DowntimeJsonData");
  if (DowntimeJsonData == undefined || !deepEqual(DowntimeJsonData, returnParsedIfJson(data.DowntimeJsonData, "DowntimeJsonData"))) {
    DowntimeJsonData = ParsedDowntimeJsonData;
  }
  for (let l of DowntimeJsonData){
    console.log(l);
    debugger;
  }
  callChart1("#chart1",DowntimeJsonData,"Reason","Time","Downtime Breakdown");*/
  /*var ParsedLineJsonData = returnParsedIfJson(data.LineJsonData, "LineJsonData");
  if (LineJsonData == undefined || !deepEqual(LineJsonData, returnParsedIfJson(data.LineJsonData, "LineJsonData"))) {
    LineJsonData = ParsedLineJsonData;
    renderLines();
  }

  var ParsedPlantJsonData = returnParsedIfJson(data.PlantJsonData, "LineJsonData");
  if (PlantJsonData == undefined || !deepEqual(LineJsonData, returnParsedIfJson(data.PlantJsonData, "PlantJsonData"))) {
    PlantJsonData = ParsedPlantJsonData;
    renderPlant();
  }

  var ParsedBatchJsonData = returnParsedIfJson(data.BatchJsonData, "BatchJsonData");
  if (BatchJsonData == undefined || !deepEqual(BatchJsonData, returnParsedIfJson(data.BatchJsonData, "BatchJsonData"))) {
    BatchJsonData = ParsedBatchJsonData;
    renderBatch();
  }

  var ParsedMachineJsonData = returnParsedIfJson(data.MachineJsonData, "MachineJsonData");
  if (MachineJsonData == undefined || !deepEqual(MachineJsonData, returnParsedIfJson(data.MachineJsonData, "MachineJsonData"))) {
    MachineJsonData = ParsedMachineJsonData;
    renderMachine();
  }
   
  var ParsedDataGridJsonData = returnParsedIfJson(data.DataGridJsonData, "DataGridJsonData");
  if (DataGridJsonData == undefined || !deepEqual(DataGridJsonData, returnParsedIfJson(data.DataGridJsonData, "DataGridJsonData"))) {
    DataGridJsonData = ParsedDataGridJsonData;
    DataGrid();
  }
  startDate();
  endDate(); */
};
$(function() { 
  // var ParsedDowntimeJsonData = returnParsedIfJson(DowntimeJsonData, "DowntimeJsonData");
  // if (DowntimeJsonData == undefined || !deepEqual(DowntimeJsonData, returnParsedIfJson(DowntimeJsonData, "DowntimeJsonData"))) {
  //   DowntimeJsonData = ParsedDowntimeJsonData;
  // }
  for (let l of Object.keys(DowntimeJsonData)){
    if(l === "Reason1"){
      var dataSource = DowntimeJsonData[l];
    }
  }
  $("#span2").hide();
  $("#span3").hide();
  $("#span4").hide();
  callChart1("#chart1",dataSource,"Reason Level 1");
  details();
});

//useData();
//EMBED.onChangeData(useData);

/***
 * loader function
 */
function loader(status) {
  jQuery("#loadIndicatorContainer").dxLoadPanel({
    shadingColor: "rgba(0,0,0,0.4)",
    position: { of: "#loading" },
    showIndicator: true,
    showPane: true,
    shading: true,
    visible: status
  });
}

function updateGlobalVariable(Value, Command, ExecuteAction) {

  loader(true);
  var commandsArray = $scope.component.multiActions.commands;
  var i = 0;
  if (commandsArray && commandsArray.length) {
    commandsArray[i].commandActions[0].source.value = 0;
    while (i <= commandsArray.length) {
      if (commandsArray[i].commandId == Command) {
        commandsArray[i].commandActions[0].source.value = Value;
        break;
      }
      i++;
    }
  }
  if (ExecuteAction) {
    //EMBED.executeAction(Command);
  }
};

/*Refresh function */

jQuery("#refresh-button").dxButton({
  stylingMode: "contained",
  text: "Refresh",
  type: "default",
  width: 120,
  onClick: function () {
    updateGlobalVariable(new Date(), "RefreshButtonClicked", true);
  }
});
/**
 * render departments dddd
 */
 $(function() {
  // let oneValue = DepartmentJsonData.length === 1 ? true : false; // if there is only one value, select that on initial load
  // let valExpr = oneValue ? DepartmentJsonData[0].LineName : "";
  $("#department").dxSelectBox({
    dataSource: DepartmentJsonData,
    displayExpr: DepartmentCaption,
    valueExpr: DepartmentValue,
    value: departmentId,
    showClearButton: true,
    searchEnabled: true,
    //placeholder: oneValue ? valExpr : "All",
    onValueChanged: function (data) {
      var DataValue = data.value;
      if (DataValue == null) {
        DataValue = "0";
      }
      if (departmentId != DataValue) {
        departmentId = DataValue;
        updateGlobalVariable(departmentId, "SelectedDepartmentValueChanged", true);
      }
    },
  }).dxSelectBox("instance");
});

/**
* render lines llll
*/
$(function() {
  // let oneValue = LineJsonData.length === 1 ? true : false;
  // let valExpr = oneValue ? LineJsonData[0].LineName : "";
  $("#lineList").dxSelectBox({
    displayExpr: LineCaption,
    items: LineJsonData,
    //placeholder: oneValue ? valExpr : "All",
    showClearButton: true,
    searchEnabled: true,
    valueExpr: LineValue,
    value: lineId,
    onValueChanged: function (data) {
      var DataValue = data.value;
      if (DataValue == null) {
        DataValue = "0";
      }
      if (lineId != DataValue) {
        lineId = DataValue;
        updateGlobalVariable(lineId, "SelectedLineValueChanged", true);
      }
    }
  }).dxSelectBox("instance");
});

$(function() {
  // let oneValue = UnitJsonData.length === 1 ? true : false;
  // let valExpr = oneValue ? UnitJsonData[0].UnitName : "";
  $("#unit").dxSelectBox({
    //displayExpr: PlantCaption,
    items: UnitJsonData,
    //placeholder: oneValue ? valExpr : "All",
    showClearButton: true,
    searchEnabled: true,
    //valueExpr: PlantValue,
    value: lineId,
    onValueChanged: function (data) {
      var DataValue = data.value;
      if (DataValue == null) {
        DataValue = "0";
      }
      if (lineId != DataValue) {
        lineId = DataValue;
        updateGlobalVariable(lineId, "SelectedUnitValueChanged", true);
      }
    }
  }).dxSelectBox("instance");
});

/**
* render start dates  ssss
*/
$(function() {
  $("#start-time").dxDateBox({
    displayFormat: "d MMM yyyy HH:mm:ss",
    placeholder: "Select Start Date",
    type: "datetime",
    value: new Date(),
    onValueChanged: function (data) {
      startTime = data.value;
      updateGlobalVariable(startTime, "SelectedStartTimeChanged", true);
    }
  })/*.dxValidator({
    validationRules: [{
      type: "custom",
      validationCallback: function (e) {
        return e.value < endTime;
      },
      message: "Start Time should not exceed End Time"
    }]
  }); */
  /*For start time range validation 
    max: endTime,
    dateOutOfRangeMessage: "StartDate is out of range"
  */
});

/**
* render end dates eeee
*/
$(function() {
  $("#end-time").dxDateBox({
    displayFormat: "d MMM yyyy HH:mm:ss",
    placeholder: "Select End Date",
    type: "datetime",
    value: new Date(),
    //disabled: relativedateId === "4020110" ? false : true,
    onValueChanged: function (data) {
      endTime = data.value;
      updateGlobalVariable(endTime, "SelectedEndTimeChanged", true);
    }
  })/*.dxValidator({
    validationRules: [{
      type: "custom",
      validationCallback: function (e) {
        return e.value > startTime;
      },
      message: "End Time should be greater than Start Time"
    }]
  });*/
  /*For end time range validation 
    min: startTime,
    dateOutOfRangeMessage: "EndDate is out of range",
   */
});

function details(){
  let details = "";
  if(Object.keys(DowntimeJsonData).length === 0){
    details = ("No Downtime Occured").bold();
  }
  else{
    let d;
    for (let l of Object.keys(DowntimeJsonData)){
      if(l === "Location"){
        d = DowntimeJsonData[l];
      }
    }
    let text = "Summary Statistics";
    details = text + "\n" + "Events: " + d[0].EventCnt +"   Total: " + d[0].Total + "   MTBF: " +d[0].MTBF + "   MTTR: " + d[0].MTTR;
  }
  $("#details").dxTextArea({
    value: details,
    readOnly: true,
    height: 90,
    stylingMode: 'filled'
  });
}

$(function() {
  $("#reset").dxButton({
    stylingMode: "outlined",
    text: "Reset",
    type: "normal",
    width: 120,
    onClick: function() {
      let chart1 = document.getElementById("chart1");
      let chart1Instance = DevExpress.viz.dxChart.getInstance(chart1);
      if (chart1Instance) {
        $("#chart1").dxChart("clearSelection");
      }
      let chart2 = document.getElementById("chart2");
      let chart2Instance = DevExpress.viz.dxChart.getInstance(chart2);
      if (chart2Instance) {
        $("#chart2").dxChart("dispose");
      }
      let chart3 = document.getElementById("chart3");
      let chart3Instance = DevExpress.viz.dxChart.getInstance(chart3);
      if (chart3Instance) {
        $("#chart3").dxChart("dispose");
      }
      let chart4 = document.getElementById("chart4");
      let chart4Instance = DevExpress.viz.dxChart.getInstance(chart4);
      if (chart4Instance) {
        $("#chart4").dxChart("dispose");
      }
      let selectBox2 = document.getElementById("selectBox2");
      let selectBox2Instance = DevExpress.ui.dxSelectBox.getInstance(selectBox2);
      if (selectBox2Instance) {
        selectBox2Instance.option("visible",false);
      }
      let selectBox3 = document.getElementById("selectBox3");
      let selectBox3Instance = DevExpress.ui.dxSelectBox.getInstance(selectBox3);
      if (selectBox3Instance) {
        selectBox3Instance.option("visible",false);
      }
      let selectBox4 = document.getElementById("selectBox4");
      let selectBox4Instance = DevExpress.ui.dxSelectBox.getInstance(selectBox4);
      if (selectBox4Instance) {
        selectBox4Instance.option("visible",false);
      }

      $("#span2").hide();
      $("#span3").hide();
      $("#span4").hide();
    }
  });
});

 function callChart1(id,datasource,title){
   // dataSourceForDuration and dataSourceForCount
    var dataSourceForDuration = [...datasource];
    var dataSourceForCount = [...datasource];
    var totalEvents = 0;
    for (l of datasource){
      totalEvents += l.EventCnt;     
    }
    for(const element of dataSourceForCount) {
      element.EventsPercent = (element.EventCnt/totalEvents) * 100;
    }
    
    var chart = $(id).dxChart({
    rotated: true,
    dataSource: datasource,
    commonSeriesSettings: {
        type: "bar",
        argumentField: "Type",
        valueField: "Fault",
        barWidth: 30
    },
    seriesTemplate: {
      nameField: 'Type'
    },
    title: title,
    argumentAxis: {
        label: {
          visible: false
        },
        tick: {
          visible: false
        },
    },
    valueAxis: {
        tick: {
            visible: true
        },
        label: {
            visible: true
        }
    },
    legend: {
        visible: true,
        verticalAlignment: "bottom",
        horizontalAlignment: "center",
        itemTextPosition: "right",
    },
    tooltip: {
      enabled: true,
      location: "edge",
      customizeTooltip: function (arg) {
        let type = (arg.point.data.Type).bold();
        let events = arg.point.data.EventCnt;
        let duration = convertMinsToHrsMins(arg.point.data.Total);
          return {
              text: type +"\n"+ " Fraction: " + arg.valueText +"\n"+ " Count: " +events+" Events" +"\n"+ " Duration: " +duration
          };
      }
    },
    onPointClick: function(e) {
      e.target.select();
      let l;
      var dataSource;
      let reason1Id = e.target.data.Id;
      let reason2Title = "Reason Level 2 - " +e.target.data.Type;
      for (l of Object.keys(DowntimeJsonData)){
        if(l === "Reason2"){
          dataSource = DowntimeJsonData[l];
        }
      }
      if(dataSource && dataSource.length != 0){
        let reason2Datasource = dataSource.filter(d => d.Reason1ID === reason1Id);
        if(reason2Datasource && reason2Datasource.length != 0){
          callChart2("#chart2",reason2Datasource,reason2Title);
        }
      }      
    },
  }).dxChart("instance");
  /*this selectBox gives options to view Chart by Duration or Count*/
  callViewBySelectBox("#selectBox1",chart,dataSourceForDuration,dataSourceForCount);
 }

 function callChart2(id,datasource,title){  
  $("#span2").show();
   // dataSourceForDuration and dataSourceForCount
   var dataSourceForDuration = [...datasource];
   var dataSourceForCount = [...datasource];
   var totalEvents = 0;
   for (l of datasource){
     totalEvents += l.EventCnt;     
   }
   for(const element of dataSourceForCount) {
     element.EventsPercent = ((element.EventCnt/totalEvents) * 100).toFixed(2);
   }
  var chart = $(id).dxChart({
    rotated: true,
    dataSource: datasource,
    commonSeriesSettings: {
        type: "bar",
        argumentField: "Reason",
        valueField: "Fault",
        barWidth: 30
    },
    seriesTemplate: {
      nameField: 'Reason'
    },
    title: title,
    argumentAxis: {
        label: {
           visible: false
        },
        tick: {
          visible: false
      },
    },
    valueAxis: {
        tick: {
            visible: true
        },
        label: {
            visible: true
        }
    },
    legend: {
      visible: true,
      verticalAlignment: "bottom",
      horizontalAlignment: "center",
      itemTextPosition: "right",
    },
    tooltip: {
      enabled: true,
      location: "edge",
      customizeTooltip: function (arg) {
        let type = (arg.point.data.Reason).bold();
        let events = arg.point.data.EventCnt;
        let duration = convertMinsToHrsMins(arg.point.data.Total);
          return {
            text: type +"\n"+ " Fraction: " + arg.valueText +"\n"+ " Count: " +events+" Events" +"\n"+ " Duration: " +duration
          };
      }
    },
    onPointClick: function(e) {
      e.target.select();
      let l;
      var dataSource;
      let reason2Id = e.target.data.Id;
      let reason3Title = "Reason Level 3 - " +e.target.data.Reason;
      for (l of Object.keys(DowntimeJsonData)){
        if(l === "Reason3"){
          dataSource = DowntimeJsonData[l];
        }
      }
      if(dataSource && dataSource.length != 0){
        let reason3Datasource = dataSource.filter(d => d.Reason2Id === reason2Id);
        if(reason3Datasource && reason3Datasource.length != 0){
          callChart3("#chart3",reason3Datasource,reason3Title);
        }        
      }      
    },
  }).dxChart("instance");
  /*this selectBox gives options to view Chart by Duration or Count*/
  callViewBySelectBox("#selectBox2",chart,dataSourceForDuration,dataSourceForCount);
 }

 function callChart3(id,datasource,title){
  $("#span3").show();  
   // dataSourceForDuration and dataSourceForCount
   var dataSourceForDuration = [...datasource];
   var dataSourceForCount = [...datasource];
   var totalEvents = 0;
   for (l of datasource){
     totalEvents += l.EventCnt;     
   }
   for(const element of dataSourceForCount) {
     element.EventsPercent = (element.EventCnt/totalEvents) * 100;
   }
  var chart = $(id).dxChart({
    rotated: true,
    dataSource: datasource,
    commonSeriesSettings: {
        type: "bar",
        argumentField: "Detail",
        valueField: "Fault",
        barWidth: 30
    },
    seriesTemplate: {
      nameField: 'Detail'
    },
    title: title,
    argumentAxis: {
        label: {
          visible: false
        },
        tick: {
          visible: false
      },
    },
    valueAxis: {
        tick: {
            visible: true
        },
        label: {
            visible: true
        }
    },
    legend: {
      visible: true,
      verticalAlignment: "bottom",
      horizontalAlignment: "center",
      itemTextPosition: "right",
    },
    tooltip: {
      enabled: true,
      location: "edge",
      customizeTooltip: function (arg) {
        let type = (arg.point.data.Detail).bold();
        let events = arg.point.data.EventCnt;
        let duration = convertMinsToHrsMins(arg.point.data.Total);
          return {
            text: type +"\n"+ " Fraction: " + arg.valueText +"\n"+ " Count: " +events+" Events" +"\n"+ " Duration: " +duration
          };
      }
    },
    onPointClick: function(e) {
      e.target.select();
      let l;
      var dataSource;
      let reason3Id = e.target.data.Id;
      let reason4Title = "Downtime Breakdown ->" +e.target.data.Type;
      for (l of Object.keys(DowntimeJsonData)){
        if(l === "Reason4"){
          dataSource = DowntimeJsonData[l];
        }
      }
      if(dataSource && dataSource.length != 0){
        let reason3Datasource = dataSource.filter(d => d.Reason3Id === reason3Id);
        if(reason3Datasource && reason3Datasource.length != 0){
          callChart4("#chart4",DowntimeJsonData,reason4Title);
        }        
      }      
    },
  }).dxChart("instance");
  /*this selectBox gives options to view Chart by Duration or Count*/
  callViewBySelectBox("#selectBox3",chart,dataSourceForDuration,dataSourceForCount);
 }

 function callChart4(id,datasource,title){  
  $("#span4").show();
  $(id).dxChart({
    rotated: true,
    dataSource: datasource,
    series: {
        color: "#4169E1",
        type: "bar",
        argumentField: "Detail",
        valueField: "Total",
        barWidth: 30
    },
    title: title,
    argumentAxis: {
        label: {
            customizeText: function() {
                return this.valueText;
            }
        }
    },
    valueAxis: {
        tick: {
            visible: true
        },
        label: {
            visible: true
        }
    },
    legend: {
        visible: false
    },
    tooltip: {
      enabled: true,
      location: "edge",
      customizeTooltip: function (arg) {
        let type = arg.point.data.Type;
        let events = arg.point.data.EventCnt;
          return {
              text: " Type: " +type +"\n"+ " Duration: " + arg.valueText +"\n"+ " Events: " +events
          };
      }
    },
    onPointClick: function(e) {
      e.target.select();
    },
  });
 }

 function convertMinsToHrsMins(minutes) {
  var h = Math.floor(minutes / 60);
  var m = minutes % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return h + ':' + m + ':00';
}

function callViewBySelectBox(id,chart,dataSourceForDuration,dataSourceForCount){
  $(id).dxSelectBox({
    items: selectBoxValues,
    width: 200,
    value: selectBoxValues[0],
    visible: true,
    onValueChanged: function(data) {
        let series = chart.option('commonSeriesSettings');
        //debugger;
        if(data.value == "Duration") {
          chart.option("dataSource", dataSourceForDuration);            
          series.valueField = 'Fault';  
          chart.option('series', series); 
        } else if(data.value == "Count") {
          chart.option("dataSource", dataSourceForCount);
          series.valueField = 'EventsPercent';  
          chart.option('series', series);
        }
    }
  });
}