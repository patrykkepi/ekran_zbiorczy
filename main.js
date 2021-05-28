start();
async function start(){
    //convert to milisec
    const intervalTime = await getRefreshPeriod()*1000;

    showScreen2();
    window.setInterval(function(){
        switchScreens();
      }, intervalTime);
}

function switchScreens(){
    if(document.getElementById('page1').style.display == 'none')
        showScreen1();
    else 
        showScreen2();
}

async function showScreen1(){
    document.getElementById('page1').style.display = '';
    document.getElementById('page2').style.display = 'none';
    const data = await getData();
    var machineListPage1 = document.getElementById('machineListPage1');

    while (machineListPage1.children.length > 0)
        machineListPage1.children.item(0).remove();

    for(let i = 0; i < data.length; i++){
        let thisMachine = data[i];
        let column = document.createElement('div');
        column.className = 'machine-column-1';
        let summ = parseFloat(thisMachine.underweight_count) + parseFloat(thisMachine.metal_count) +
        parseFloat(thisMachine.overweight_count) + parseFloat(thisMachine.double_len_count) + parseFloat(thisMachine.double_weight_count)
        + parseFloat(thisMachine.others_count);
        column.innerHTML = `
        <div class="element blue-t">
            <p class="machine-name">`+ thisMachine.dacs_name_short +`</p>
        </div>
        <div class="element blue-light">
            <p class="number-b">`+ thisMachine.product_name +`</p>
        </div>
        <div class="element `+ colorOfElement("oee_overall", thisMachine) +`">
            <p class="number-b">`+ (parseFloat(thisMachine.efficiency_sec)*60).toFixed(0) +`</p>
        </div>
        <div class="element blue-light">
            <p class="number-b">`+ thisMachine.proper_count +`</p>
        </div>
        <div class="element gray">
            <p class="number-b">`+ summ +`</p>
        </div>
        <div class="element blue-light">
            <p class="number-b">`+ (parseFloat(thisMachine.meanweight_value_g)).toFixed(2) +`</p>
        </div>
        `;

        machineListPage1.appendChild(column);
        if(i == 7)
            break;
    }
}

async function showScreen2(){
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = '';
    const data = await getData();
    var machineListPage2 = document.getElementById('machineListPage2');

    while (machineListPage2.children.length > 0)
        machineListPage2.children.item(0).remove();

    for(let i = 0; i < data.length; i++){
        let thisMachine = data[i];
        let column = document.createElement('div');
        column.className = 'machine-column-2';
        column.innerHTML = `
        <div class="element blue-t">
            <p class="machine-name">`+ thisMachine.dacs_name_short +`</p>
        </div>
        <div class="element gray">
            <p class="number-s">`+ (parseFloat(thisMachine.unplanned_breaks_sec)/60).toFixed(0) +`</p>
        </div>
        <div class="element gray">
            <p class="number-s">`+ (parseFloat(thisMachine.planned_breaks_sec)/60).toFixed(0)  +`</p>
        </div>
        <div class="element `+ colorOfElement("oee_overall", thisMachine) +`">
            <p class="number-b">`+ (parseFloat(thisMachine.oee_overall)).toFixed(0) +`</p>
        </div>
        <div class="element `+ colorOfElement("oee_efficiency", thisMachine) +`">
            <p class="number-b">`+ (parseFloat(thisMachine.oee_efficiency)).toFixed(0) +`</p>
        </div>
        <div class="element `+ colorOfElement("oee_quality", thisMachine) +`">
            <p class="number-b">`+ (parseFloat(thisMachine.oee_quality)).toFixed(0) +`</p>
        </div>
        <div class="element `+ colorOfElement("oee_availability", thisMachine) +`">
            <p class="number-b">`+ (parseFloat(thisMachine.oee_availability)).toFixed(0) +`</p>
        </div>
        `;

        machineListPage2.appendChild(column);
        if(i == 7)
        break;
    }
}

function getData(){
    return new Promise((resolve) => {
        $.ajax({
            type: "GET",
            url: "getData.php"
        }).then((resp)=>{
            let jsonData = JSON.parse(resp).data;
            resolve(jsonData);
        });
    });
};

function getRefreshPeriod(){
    return new Promise(resolve => {
        $.ajax({
            type: "GET",
            url: "getRefreshPeriod.php"
        }).then(response => {
            let jsonData = JSON.parse(response).data;
            resolve(jsonData[0].refresh_period_s);
        })
    });
}


function colorOfElement(elementId, machineData){
    let value = parseFloat(machineData[elementId]);
    switch(elementId){
        case "oee_overall":
            if(value >= parseFloat(machineData.oee_red_min) && value <= parseFloat(machineData.oee_red_max))
                return "red";
            else if(value >= parseFloat(machineData.oee_yellow_min) && value <= parseFloat(machineData.oee_yellow_max))
                return "yellow";
            else if(value >= parseFloat(machineData.oee_green_min) && value <= parseFloat(machineData.oee_green_max))
                return "green";
            break;
        case "oee_efficiency":
            if(value >= parseFloat(machineData.efficiency_red_min) && value <= parseFloat(machineData.efficiency_red_max))
                return "red";
            else if(value >= parseFloat(machineData.efficiency_yellow_min) && value <= parseFloat(machineData.efficiency_yellow_max))
                return "yellow";
            else if(value >= parseFloat(machineData.efficiency_green_min) && value <= parseFloat(machineData.efficiency_green_max))
                return "green";
            break;
        case "oee_quality":
            if(value >= parseFloat(machineData.quality_red_min) && value <= parseFloat(machineData.quality_red_max))
                return "red";
            else if(value >= parseFloat(machineData.quality_yellow_min) && value <= parseFloat(machineData.quality_yellow_max))
                return "yellow";
            else if(value >= parseFloat(machineData.quality_green_min) && value <= parseFloat(machineData.quality_green_max))
                return "green";
            break;            
        case "oee_availability":
            if(value >= parseFloat(machineData.availability_red_min) && value <= parseFloat(machineData.availability_red_max))
                return "red";
            else if(value >= parseFloat(machineData.availability_yellow_min) && value <= parseFloat(machineData.availability_yellow_max))
                return "yellow";
            else if(value >= parseFloat(machineData.availability_green_min) && value <= parseFloat(machineData.availability_green_max))
                return "green";
            break;
    }
}