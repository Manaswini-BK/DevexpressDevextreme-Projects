var ApplicationTestJson = [{
  "ID":1,
  "ApplicationTest": "Gelling Time",
  "StartTime": "01-05-2021 10:30",
  "EndTime": "01-05-2021 11:30",
  "EmployeeID": ""
}]
var QualityTestJson = [{
  "ID": 1,
  "QualityTest": "Viscosity",
  "LowerLimit": 1.3,
  "MeasuredValue": "",
  "UpperLimit": 1.5,
  "UoM": "cP",
  "EmployeeID":""
}, {
  "ID": 2,
  "QualityTest": "Density",
  "LowerLimit": 1.5,
  "MeasuredValue": "",
  "UpperLimit": 1.7,
  "UoM": "g/ml",
  "EmployeeID":""
},
{
  "ID": 3,
  "QualityTest": "Solid Content",
  "LowerLimit": 25,
  "MeasuredValue": "",
  "UpperLimit": 35,
  "UoM": "%",
  "EmployeeID":""
},
{
  "ID": 4,
  "QualityTest": "Water Content",
  "LowerLimit": 50,
  "MeasuredValue": "",
  "UpperLimit": 60,
  "UoM": "%",
  "EmployeeID":""
},
{
  "ID": 5,
  "QualityTest": "Gelling Time",
  "LowerLimit": 60,
  "MeasuredValue": "",
  "UpperLimit": 120,
  "UoM": "Min",
  "EmployeeID":""
}]
var qualityTestValues;
var SegmentActualId;
var GridHeaderTextColor = "black";
var GridDataTextColor = "black";
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
function styleData() {
  let styleData = EMBED.getTheme();
  GridHeaderTextColor = styleData.settings[19].value;                   // Theme Field name: "Header text" of "Grid" section
  GridDataTextColor = styleData.settings[20].value;                     // Theme Field name: "Grid text" of "Grid" section
  jQuery("#header-title").css("color", styleData.settings[6].value);    // Theme Field name: "Header 1 text" of "Headers" section
  jQuery(".h3text-color").css("color", styleData.settings[10].value);   // Theme Field name: "Header 3 text" of "Headers" section
  jQuery(".h3text-color").css("font-size", "20px");
}

/**
 * 
 * page load calling funcion to get the data 
 */

function useData(data) {
  data = data || EMBED.getData();
  //debugger;
  var url_string = window.location.href; 
  var url = new URL(url_string);
  SegmentActualId = url.searchParams.get("SegmentActualId");
  updateGlobalVariable(SegmentActualId, "SegmentActualId", true, true);
  if (flagLoaded == false) {
    styleData();
    flagLoaded = true;
  }
  
  var ParsedPreparedLotsJson = returnParsedIfJson(data.PreparedLotsJson, "PreparedLotsJson");
  if (PreparedLotsJson == undefined || !deepEqual(PreparedLotsJson, returnParsedIfJson(data.PreparedLotsJson, "PreparedLotsJson"))) {
    PreparedLotsJson = ParsedPreparedLotsJson;
   
  }

  var ParsedProductDescriptionJson = returnParsedIfJson(data.ProductDescriptionJson, "ProductDescriptionJson");
  if (ProductDescriptionJson == undefined || !deepEqual(ProductDescriptionJson, returnParsedIfJson(data.ProductDescriptionJson, "DataGridJsonData"))) {
    ProductDescriptionJson = ParsedProductDescriptionJson;
    
  }
  PreparedLotsDataGrid();
  ProductDescriptionDatagrid();
};
//QualityTestDatagrid();
//ApplicationTestDatagrid();
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

  //loader(true);
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
    EMBED.executeAction(Command);
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
$(function(){
  var formWidget = $("#form").dxForm({
    //formData: formData,
    readOnly: false,
    showColonAfterLabel: true,
    showValidationSummary: true,
    items: [{
      editorType: "dxDataGrid",
      editorOptions: {
        allowColumnReordering: true,
          allowColumnResizing: true,
          columnsAutoWidth: true,
          columnChooser: {
            enabled: true,
            mode: "select"
          },
          dataSource: QualityTestJson,
          editing: {
            mode: "cell",
            allowUpdating: true            
          },
          export: {
            enabled: true,
          },
          loadPanel: {
            shadingColor: "rgba(0,0,0,0.4)",
            visible: false,
            showIndicator: true,
            showPane: true,
            shading: true
          },
          paging: {
            pageSize: 7
          },
          pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true,
          },
          showBorders: true,
          showRowLines: true,
          wordWrapEnabled: true,
          columns: [
            {
              dataField: "QualityTest",
              caption: "Quality Test",
              allowEditing: false
            },
            {
              dataField: "LowerLimit",
              caption: "Lower Limit",
              allowEditing: false
            },
            {
              dataField: "MeasuredValue",
              caption: "Measured Value",
              allowEditing: true
            },
            {
              dataField: "UpperLimit",
              caption: "Upper Limit",
              allowEditing: false
            },
            {
              dataField: "UoM",
              caption: "UoM",
              allowEditing: false
            },
            {
              dataField: "EmployeeID",
              caption: "Employee ID",
              allowEditing: true
            }],
          
          onContentReady: function abc() {
            //loader(false)
          },
          onCellPrepared: function (e) {
            //debugger;
            e.cellElement.css("text-align", "center");
            e.cellElement.css("font-size", "15px");
            e.cellElement.css("font-family", "Noto Sans");
            e.cellElement.css("font-weight", "300");
            if (e.rowType == "header") {
              e.cellElement.css("font-weight", "bold");
              e.cellElement.css("color", GridHeaderTextColor);
            }
            if (e.rowType == "data") {
              e.cellElement.css("color", GridDataTextColor);
              if(e.column.dataField ==="EmployeeID"){
                e.cellElement.css("border", "2px solid lightskyblue");
              }
              if(e.column.dataField ==="MeasuredValue"){
                e.cellElement.css("border", "2px solid lightskyblue");
                if((e.data.MeasuredValue != "") /*|| (e.data.MeasuredValue != undefined) || (e.data.MeasuredValue != null)*/){
                  e.cellElement.css("color", "white");
                  if((e.data.MeasuredValue >= e.data.LowerLimit && e.data.MeasuredValue <= e.data.UpperLimit )){
                    e.cellElement.css("background-color","green");
                  }
                  else if((e.data.MeasuredValue < e.data.LowerLimit || e.data.MeasuredValue > e.data.UpperLimit )){
                    e.cellElement.css("background-color","red");
                  }
                }
              }
            }
          },
          onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Main sheet');
            DevExpress.excelExporter.exportDataGrid({
              worksheet: worksheet,
              component: e.component,
              customizeCell: function (options) {
                var excelCell = options;
                excelCell.font = { name: 'Arial', size: 12 };
                excelCell.alignment = { horizontal: 'left' };
              }
            }).then(function () {
              workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'KPIDataGrid.xlsx');
              });
            });
            e.cancel = true;
          },
          onRowValidating: function (rowData) {
            debugger;
          }
      }
    },
    {
      editorType: "dxDataGrid",
      editorOptions :{
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnsAutoWidth: true,
        columnChooser: {
          enabled: true,
          mode: "select"
        },
        dataSource: ApplicationTestJson,
        editing: {
          mode: "cell",
          allowUpdating: true            
        },
        export: {
          enabled: true,
        },
        headerFilter: {
          visible: true,
          allowSearch: true
        },
        loadPanel: {
          shadingColor: "rgba(0,0,0,0.4)",
          visible: false,
          showIndicator: true,
          showPane: true,
          shading: true
        },
        paging: {
          pageSize: 7
        },
        pager: {
          showPageSizeSelector: true,
          allowedPageSizes: [5, 10, 20],
          showInfo: true,
        },
        showBorders: true,
        showRowLines: true,
        wordWrapEnabled: true,
        columns: [
          {
            dataField: "ApplicationTest",
            caption: "Application Test",
            allowEditing: false
          },
          {
            dataField: "StartTime",
            caption: "Start Time",
            dataType: "datetime",
            allowEditing: true
          },
          {
            dataField: "EndTime",
            caption: "End Time",
            dataType: "datetime",
            allowEditing: true
          },
          {
            dataField: "EmployeeID",
            caption: "Employee ID",
            allowEditing: true
          }],
        
        onContentReady: function abc() {
          //loader(false)
        },
        onCellPrepared: function (e) {
          e.cellElement.css("text-align", "center");
          e.cellElement.css("font-size", "15px");
          e.cellElement.css("font-family", "Noto Sans");
          e.cellElement.css("font-weight", "300");
          if (e.rowType == "header") {
            e.cellElement.css("font-weight", "bold");
            e.cellElement.css("color", GridHeaderTextColor);
          }
          if (e.rowType == "data") {
            e.cellElement.css("color", GridDataTextColor);
            if(e.column.dataField ==="EmployeeID" || e.column.dataField ==="StartTime" || e.column.dataField ==="EndTime"){
              e.cellElement.css("border", "2px solid lightskyblue");
            }
          }
        },
        onExporting: function (e) {
          var workbook = new ExcelJS.Workbook();
          var worksheet = workbook.addWorksheet('Main sheet');
          DevExpress.excelExporter.exportDataGrid({
            worksheet: worksheet,
            component: e.component,
            customizeCell: function (options) {
              var excelCell = options;
              excelCell.font = { name: 'Arial', size: 12 };
              excelCell.alignment = { horizontal: 'left' };
            }
          }).then(function () {
            workbook.xlsx.writeBuffer().then(function (buffer) {
              saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'KPIDataGrid.xlsx');
            });
          });
          e.cancel = true;
        }
      }
    },
    {
      itemType: "button",
      horizontalAlignment: "right",
      buttonOptions: {
          text: "Submit",
          type: "success",
          useSubmitBehavior: true
      }
      
    }
  ]
  }).dxForm("instance")

  $("#form-container").on("submit", function(e) {
    DevExpress.ui.dialog.alert("Data submitted successfully");
  });
});

