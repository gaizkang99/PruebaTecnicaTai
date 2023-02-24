let data = fetch('post.json').then(response => response.json());
let insertData = document.getElementById("insertData");


let finalResponse;
$.ajax({
    url: 'http://intranet.taionline.net:14036/api/loadtfunction',
    type: 'POST',
    data: JSON.stringify({
        ActiveActor: "WKU11",
        FuncName: "Tai.Backend.Qplant",
        FuncParam01: "OEEMONITOR2",
        FuncParam02: "SPAIN",
        FuncParam03: "",
        FuncParam04: "",
        FuncParam05: "",
        TraceLog: "Y"
    }),
    dataType: "json",
    contentType: "aplication/json",
    success: function (response) {
        finalResponse = response.Payload;
        managingData(finalResponse);
    },
    error: function (error) {
        console.log(error);
    }
})


function managingData(allData) {
    allData.forEach(data => {
        let divInfo = insertWorkunits(data.workunits);
        let dataStructure = `<div>
                                <h1>${data.plnname}</h1>
                                <h3>${data.sbaname}</h3>
                                <div class="info">${divInfo}</div>
                            </div>`;
        insertData.innerHTML += dataStructure;
    });
}
function insertWorkunits(data) {
    let info = [];
    data.forEach(workunit => {
        info.push(`<div class="card border-success mb-3" style="max-width: 18rem;">
                                    <div class="card-header bg-transparent border-success" id="headerCard">${workunit.wkutype}</div>
                                    <div class="card-body text-success">
                                        <h5 class="card-title" id="titleCard">${workunit.wkuname}</h5>
                                        <p class="card-text" id="infoCard" style="background-color: ${workunit.sitcolor}">
                                        State: ${workunit.sitname}<br>
                                        </p>
                                        <p class="card-text" id="infoCard">
                                        Speed: ${workunit.speed}<br>Par: ${workunit.tpar}<br>Name: ${workunit.matname} 
                                        </p>
                                    </div>
                                    <div class="card-footer bg-transparent border-success" id="footerCard">Id: ${workunit.wooid} </div>
                                </div>`);       
    });
    return info;
}
