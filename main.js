window.addEventListener('resize', function(){
    window.location.href = window.location.href;
});
refresh();


function resizeAllElements(querySelector){
    var elements = document.querySelectorAll(querySelector);
    elements.forEach((e)=>{
        resizeText(e);   
    })
}

function resizeText(element){
    if(element.innerText.length > 0){
        const maxpx = 150;
        var maxWidth = element.parentElement.offsetWidth;
        var maxHeight = element.parentElement.offsetHeight;

        //if rotaded element we need to change dimensions
        if(element.parentElement.className.includes("rotated-container")){
            maxWidth = element.parentElement.offsetHeight;
            maxHeight = element.parentElement.offsetWidth;
        }

        var px = 1;
        var processing = true;
        do {
            px++;
            element.style.fontSize = px+"px";
            if(px > maxpx || element.offsetWidth > maxWidth || element.offsetHeight > maxHeight){
                processing = false;
                element.style.fontSize = px-3+"px";
            }
        } while (processing);
    }
}
async function refresh(){
    const tiberpackTestTable = await getTiberpackTestTable();
    document.getElementById("timeNow").innerHTML = tiberpackTestTable.date_timestamp.slice(10, 16);  
    const format_name = tiberpackTestTable.format_name ? tiberpackTestTable.format_name : "";    
    const code_description_pl = tiberpackTestTable.code_description_pl ? tiberpackTestTable.code_description_pl : "";
    const last_min_outbound_count = tiberpackTestTable.last_min_outbound_count ? tiberpackTestTable.last_min_outbound_count.toFixed(0) : 0;
    const incoming_count = tiberpackTestTable.incoming_count ? tiberpackTestTable.incoming_count.toFixed(0) : 0;
    const exit_count = tiberpackTestTable.exit_count ? tiberpackTestTable.exit_count.toFixed(0) : 0;
    const discarded_carton_open_flap = tiberpackTestTable.discarded_carton_open_flap ? tiberpackTestTable.discarded_carton_open_flap : "";
    
    document.getElementById('format_name').innerHTML = format_name;
    document.getElementById('code_description_pl').innerHTML = code_description_pl;
    document.getElementById('last_min_outbound_count').innerHTML = last_min_outbound_count;
    document.getElementById('incoming_count').innerHTML = incoming_count;
    document.getElementById('exit_count').innerHTML = exit_count;
    document.getElementById('discarded_carton_open_flap').innerHTML = discarded_carton_open_flap;
    
    resizeAllElements(".resizeable-text");

}