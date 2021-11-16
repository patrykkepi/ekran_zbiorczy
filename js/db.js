function getTiberpackTestTable(){
    return new Promise((resolve)=>{
        $.ajax({
            type: "GET",
            url: "services/getTiberpackTestTable.php"
        }).done((resp)=>{
            try {
                resolve(JSON.parse(resp).data);
            } catch {
                resolve("b.d.");
            }   
        });
    })
}
