"use strict";

document.addEventListener("DOMContentLoaded", hentData);

//--------------------------------------------------------------------


// globale variabler

var data = void 0;
var staticData = void 0;
var jsonData = void 0;
var staticJsonData = void 0;
var queueData = void 0;
var servingData = void 0;
var queueDetails = void 0;
var servingDetails = void 0;
var sectionAnim = void 0;
var queueId = [];
var storageInfo = void 0;
var beerInfo = void 0;
var i = void 0;

//--------------------------------------------------------------------


// FUNKTION til hent data
function hentData() {
    // definér data / HENT Data
    data = FooBar.getData();
    // omdan output/string om til JSON format
    jsonData = JSON.parse(data);

    // Kald funktioner
    servingOrders();
    ticketOrders();
    tapInfo();
    queueList();
    customerList();
    beerStorageData();
    //beerTypeData();
};

//--------------------------------------------------------------------


// FUNKTION til hent Data udenom setInterval
function hentStaticData() {
    // definér data / HENT Data
    staticData = FooBar.getData();
    // omdan output/string om til JSON format
    staticJsonData = JSON.parse(staticData);
    beerTypeData();
};

//--------------------------------------------------------------------


//FUNKTION til in service
function servingOrders() {

    // find DOM elementer (SERVING ORDERS) til modtager og template elementer
    var servingTemplate = document.querySelector("#servingtemplate-container");
    var servingContainer = document.querySelector("#servingcontainer");

    //console.log("serving data", jsonData.serving);

    //udskift indhold i modtageren
    document.querySelector("#servingcontainer").innerHTML = "";

    // find serving data
    servingDetails = jsonData.serving;

    //console.log("bliver serveret", servingDetails);
    //opsæt forEach function for serving data
    servingDetails.forEach(function (servingTickets) {
        //definér klon til template
        var servingKlon = servingTemplate.cloneNode(true).content;

        // prop data for serving ID ud i DOM'en
        servingKlon.querySelector(".serving-id").textContent = servingTickets.id;

        // find ordrerne
        var servingOrders = servingTickets.order;

        // adskil arrayet med ordrerne med et return/nyt linjeskift
        var orderDetail2 = servingOrders.join("<li>");

        // Udvælg data for serving order detaljer
        servingKlon.querySelector(".serving-order").innerHTML = orderDetail2;

        // Prop data ud i DOM'en
        servingContainer.appendChild(servingKlon);

        //servingTest = servingDetails.length.i++;

        /*   lengthTest = servingDetails.slice();
          console.log("nyt array", lengthTest) */

        /*   for (i = 0; i<1; i++) {
            orderAntal = servingData + i++;
            document.querySelector("#orders-done .orderAmount").textContent = orderAntal;
          } */
    });
};

//--------------------------------------------------------------------


// FUNKTION til TICKETS eller ordrer
function ticketOrders() {

    // find DOM elementer (TICKETS) til modtager og template elementer
    var ticketTemplate = document.querySelector("#tickettemplate-container");
    var ticketContainer = document.querySelector("#ticketcontainer");

    //console.log("kø data", jsonData.queue);

    //udskift indhold i modtageren
    document.querySelector("#ticketcontainer").innerHTML = "";

    // find kø data
    queueDetails = jsonData.queue;

    queueDetails.slice(0, 4).forEach(function (tickets) {

        //  console.log("TICKETS ORDRER",tickets.order);

        // definér klon til tickets
        var ticketKlon = ticketTemplate.cloneNode(true).content;
        // prop data for ticket ID ud i DOM'en
        //  console.log("TICKET ID", tickets.id);
        ticketKlon.querySelector(".ticket-id").textContent = tickets.id;

        // find ordrerne
        var orders = tickets.order;

        // adskil arrayet med ordrerne med et return/nyt linjeskift
        var orderDetail = orders.join('<li>');

        // Udvælg data for ticket order detaljer
        ticketKlon.querySelector(".ticket-order").innerHTML = orderDetail;

        // prop Data ud i DOM'en for hver klon
        ticketContainer.appendChild(ticketKlon);
    });
};

//--------------------------------------------------------------------


// FUNKTION til KEGS, LEVEL & Storage eller ordrer

function tapInfo() {

    // find DOM elementer (TAP INFO) til modtager og template elementer
    var tapInfoTemplate = document.querySelector("#tapinfotemplate-container");
    var tapInfoContainer = document.querySelector("#tapinfocontainer");

    //Udskift DOM element
    document.querySelector("#tapinfocontainer").innerHTML = "";

    //find arrays for taps og storage og gem data i variabler
    var tapData = jsonData.taps;

    //kombiner de to arrays med concat
    //let combiData = tapStorage.concat(tapData);
    //console.log("tap info", combiData)

    tapData.forEach(function (element) {

        var tapKlon = tapInfoTemplate.cloneNode(true).content;
        // definér og omdan level data til liter
        var tapLevel = element.level * 0.01;
        // definér og omdan capacity data til liter
        var tapCap = element.capacity * 0.01;
        //find og definér DOM element til tap-level class
        var tapColor = tapKlon.querySelector(".tap-level");

        //lav ny div
        var newDiv = document.createElement("div");
        // definér klasse for ny div
        newDiv.setAttribute("class", "liquid");

        // udvælg element og data der skal outputtes i DOM'en
        tapKlon.querySelector(".tap-beer").textContent = element.beer;
        tapKlon.querySelector(".tap-level").textContent = tapLevel + " L.";
        tapKlon.querySelector(".tap-cap").textContent = tapCap + " L.";
        //tapKlon.appendChild = newDiv;
        //tapKlon.appendChild = beerGlass;

        //omdan style height til liter
        newDiv.style.height = element.level * 0.04 + "%";

        //lav condition til farver på beer level
        if (tapLevel <= 25) {
            tapColor.style.color = "#87ab66";
        }if (tapLevel <= 15) {
            tapColor.style.color = "#e79d3f";
        }if (tapLevel <= 10) {
            tapColor.style.color = "#d94d4d";
        };

        // prop data ud i DOM'en
        tapKlon.querySelector(".beer-glass").appendChild(newDiv);
        tapInfoContainer.appendChild(tapKlon);
    });
};

//--------------------------------------------------------------------


// EVENT til klik home knap
var homeBtn = document.querySelector(".home-btn");

homeBtn.addEventListener("click", function (event) {

    storageInfo = document.querySelector("#storagecontainer");

    storageInfo.classList.remove("bounceInRight");
    storageInfo.classList.add("bounceOutRight");

    beerInfo.classList.remove("bounceInRight");
    beerInfo.classList.add("bounceOutRight");

    setTimeout(function () {
        storageInfo.style.display = "none";
    }, 800);

    setTimeout(function () {
        beerInfo.style.display = "none";
    }, 800);
});

//--------------------------------------------------------------------


// EVENT til Keg Storage knap
var storageBtn = document.querySelector(".storage-btn");

storageBtn.addEventListener("click", function (event) {

    storageInfo = document.querySelector("#storagecontainer");

    storageInfo.style.display = "grid";

    storageInfo.classList.remove("bounceOutRight");
    storageInfo.classList.add("bounceInRight");

    beerInfo.classList.remove("bounceInRight");
    beerInfo.classList.add("bounceOutRight");

    setTimeout(function () {
        beerInfo.style.display = "none";
    }, 800);
});

//--------------------------------------------------------------------


// EVENT til Beer Types knap
var beersBtn = document.querySelector(".beers-btn");

beersBtn.addEventListener("click", function (event) {

    beerInfo = document.querySelector("#beertypecontainer");
    //storageInfo = document.querySelector("#storagecontainer");

    beerInfo.style.display = "grid";

    beerInfo.classList.remove("bounceOutRight");
    beerInfo.classList.add("bounceInRight");

    storageInfo.classList.remove("bounceInRight");
    storageInfo.classList.add("bounceOutRight");

    setTimeout(function () {
        storageInfo.style.display = "none";
    }, 800);
});

//--------------------------------------------------------------------


// FUNKTION til Beer STORAGE
function beerStorageData() {

    // find DOM elementer (BEER STORAGE) til modtager og template elementer
    var storageTemplate = document.querySelector("#storagetemplate-container");
    var storageContainer = document.querySelector("#storagecontainer");

    // udskift DOM element
    document.querySelector("#storagecontainer").innerHTML = "";

    // find og definér storage data
    var tapStorage = jsonData.storage;
    // definér tallet 1
    i = 1;

    tapStorage.forEach(function (storage) {

        //definér klon til template
        var storageKlon = storageTemplate.cloneNode(true).content;

        // tilføj unik class til .storage-section
        storageKlon.querySelector(".storage-section").classList = "storage-section storage" + i++;

        //udvælg element og data der skal outputtes
        storageKlon.querySelector(".tap-name").textContent = storage.name;
        storageKlon.querySelector(".tap-storage").textContent = storage.amount;

        // prop data ud i DOM'en
        storageContainer.appendChild(storageKlon);
    });
};

//--------------------------------------------------------------------


// FUNKTION til Beer TYPES
function beerTypeData() {

    // find DOM elementer (BEER TYPE DATA) til modtager og template elementer
    var beerTypeTemplate = document.querySelector("#beertypetemplate-container");
    var beerTypeContainer = document.querySelector("#beertypecontainer");

    // find beertypes data
    var beerTypes = staticJsonData.beertypes;
    var imgPath = "imgs/";
    i = 1;

    // udskift DOM element
    document.querySelector("#beertypecontainer").innerHTML = "";

    beerTypes.forEach(function (type) {

        var typeKlon = beerTypeTemplate.cloneNode(true).content;

        // tilføj unik class til hver section
        typeKlon.querySelector(".beertype-section").classList = "beertype-section section" + i++;

        //typeKlon.querySelector(".beer-name").textContent = type.name;
        typeKlon.querySelector(".beer-cat").textContent = type.category;
        typeKlon.querySelector(".beer-alco").textContent = type.alc + "%";
        typeKlon.querySelector(".beer-speed").textContent = type.pouringSpeed;
        typeKlon.querySelector(".beer-popul").textContent = type.popularity;
        // Description box her
        typeKlon.querySelector(".beer-aroma").textContent = type.description.aroma;
        typeKlon.querySelector(".beer-appea").textContent = type.description.appearance;
        typeKlon.querySelector(".beer-flavour").textContent = type.description.flavor;
        typeKlon.querySelector(".beer-mouth").textContent = type.description.mouthfeel;
        typeKlon.querySelector(".beer-impress").textContent = type.description.overallImpression;
        typeKlon.querySelector(".beer-label").setAttribute("src", imgPath + type.label);

        // Definér SE MERE KNAP 
        var btn1 = typeKlon.querySelector(".info-btn");
        // Definér SE MINDRE KNAP 
        var btn2 = typeKlon.querySelector(".close-btn");

        // EVENT til klik på se mere knap
        btn1.addEventListener("click", function (event) {

            // find target
            var clicked = event.target;
            //console.log("button er clicked - event target",clicked);

            // find targets prevoius sibling = full
            var targetClick = clicked.previousSibling.previousSibling;
            //console.log("Previous Sibling",targetClick);

            // VIS TEXTBOX
            targetClick.style.display = "inherit";
            btn2.style.display = "inherit";

            // skjul knap1
            btn1.style.display = "none";

            // NULSTIL KLASSE
            targetClick.classList.remove("fadeOut");
            // TILFØJ KLASSE
            targetClick.classList.add("fadeInDown");
        });

        btn2.addEventListener("click", function (event) {

            // find target (klikkede element)
            var clicked2 = event.target;
            //console.log("button er clicked - event target",clicked);

            // find targets prevoius sibling = full
            var targetClick2 = clicked2.previousSibling.previousSibling.previousElementSibling;
            //console.log("Previous Sibling",clicked2.previousSibling.previousSibling.previousElementSibling);

            // SKJUL TEXTBOX
            btn1.style.display = "inherit";
            btn2.style.display = "none";

            // NULSTIL KLASSE
            targetClick2.classList.remove("fadeInDown");
            // TILFØJ KLASSE
            targetClick2.classList.add("fadeOut");

            // tidsindstillet skjul description box
            setTimeout(function () {
                targetClick2.style.display = "none";
            }, 1000);
        });
        // prop dat ud i DOM'en
        beerTypeContainer.appendChild(typeKlon);
    });
};

//--------------------------------------------------------------------


// FUNKTION til Antal i KØ
function queueList() {

    // udvælg KØ og SERVING data der skal ind i DOM'en
    // Definér KØ antal
    queueData = jsonData.queue.length;
    console.log("In queue", queueData);

    // Definér SERVING antal
    servingData = jsonData.serving.length;
    console.log("In Service", servingData);

    /*  for (i = 0; i<1; i++) {
        orderAntal = servingData + i++;
        document.querySelector("#orders-done .orderAmount").textContent = orderAntal;
      }  */

    // Udvælg data for KØ og Serving ANTAL og Prop Data ud i ODM'en
    document.querySelector("#queue .queueAmount").textContent = queueData;
    document.querySelector("#serving .servingAmount").textContent = servingData;

    circleStyling();
};

//--------------------------------------------------------------------


// FUNKTION til styling af cirkler
function circleStyling() {

    var bar1 = document.querySelector("#queue-light");
    var barFill1 = document.querySelector("#queue-light-fill");
    var busy = document.querySelector(".busy");
    var almost = document.querySelector(".almost");
    var good = document.querySelector(".good");

    if (queueData < 5) {
        almost.style.display = "none";
        busy.style.display = "none";
        good.style.display = "inherit";
        bar1.style.border = "#87ab66";
        barFill1.style.background = "#87ab66";
        barFill1.style.height = "50px";
        bar1.classList.remove("neon-yellow", "neon-red");
        bar1.classList.add("neon-green");
    } else if (queueData < 10) {
        busy.style.display = "none";
        good.style.display = "none";
        almost.style.display = "inherit";
        bar1.style.border = "#e79d3f";
        barFill1.style.background = "#e79d3f";
        barFill1.style.height = "100px";
        bar1.classList.remove("neon-green", "neon-red");
        bar1.classList.add("neon-yellow");
    } else if (queueData < 15) {
        almost.style.display = "none";
        good.style.display = "none";
        busy.style.display = "inherit";
        bar1.style.border = "#d94d4d";
        barFill1.style.background = "#d94d4d";
        barFill1.style.height = "200px";
        bar1.classList.remove("neon-yellow", "neon-green");
        bar1.classList.add("neon-red");
    };

    var bar2 = document.querySelector("#serving-light");
    var barFill2 = document.querySelector("#serving-light-fill");
    var eff1 = document.querySelector(".eff1");
    var eff2 = document.querySelector(".eff2");
    var eff3 = document.querySelector(".eff3");

    if (servingData == 1) {
        eff3.style.display = "none";
        eff2.style.display = "none";
        eff1.style.display = "inherit";
        barFill2.style.background = "#d94d4d";
        barFill2.style.height = "30px";
        bar2.style.border = "#d94d4d";
        bar2.classList.remove("neon-yellow", "neon-green");
        bar2.classList.add("neon-red");
    } else if (servingData == 2) {
        eff1.style.display = "none";
        eff2.style.display = "inherit";
        eff3.style.display = "none";
        barFill2.style.background = "#e79d3f";
        barFill2.style.height = "100px";
        bar2.style.border = "#e79d3f";
        bar2.classList.remove("neon-red", "neon-green");
        bar2.classList.add("neon-yellow");
    } else if (servingData == 3) {
        eff1.style.display = "none";
        eff2.style.display = "none";
        eff3.style.display = "inherit";
        barFill2.style.background = "#87ab66";
        barFill2.style.height = "200px";
        bar2.style.border = "#87ab66";
        bar2.classList.remove("neon-yellow", "neon-red");
        bar2.classList.add("neon-green");
    }
};

//--------------------------------------------------------------------


//FUNKTION til Orders Done!

function customerList() {

    // find array for serving i JSON output
    servingData = jsonData.serving;

    // loop serving array igennem  
    servingData.forEach(function (elm) {

        // tilføj array til serving array med korresponderende ID
        queueId.push(elm.id);
        //console.log("length", queueId)

        // begræns array til length = 3
        if (queueId.length > 2) {
            // fjern det ældste id fra array
            queueId.shift();
        };
    });

    // vend/sortér array så det nyeste ID er det første
    var newId = queueId.sort(function (a, b) {
        return b - a;
    });

    //console.log("højeste ID", highestId)

    // nulstil/tilføj +1 til ID (da ticket id starter fra 0)
    var customerAmount = newId[0] + 1;

    // output data i DOM'en
    document.querySelector(".orderAmount").textContent = customerAmount;

    //console.log("Ny ID",newId)

    // hvis ID'et er = 0 output --> 0
    if (queueId == 0) {
        document.querySelector(".orderAmount").textContent = "0";
    };
};

//--------------------------------------------------------------------


// sæt interval
window.setInterval(hentData, 5000);
hentData();

hentStaticData();
