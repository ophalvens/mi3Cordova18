'use strict';
/*global navigator, Dom7, document, Framework7, routes*/
//jshint esnext:true
// opgelet: app = cordova initialisatie
//          myApp = F7 initialisatie

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();


// Dom7
var $$ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
}

// ----------- Framework7 basis initialisatie ---------------- //

// Init myApp
var myApp = new Framework7({
    id: 'net.ophalvens.mi3Cordova2018',
    root: '#app',
    theme: theme,
    routes: routes,
    on: {
        pageInit: function (page) {
            if (page.route.name === "locatie") {
                $$('#btnLocatie').on('click', function () {
                    getLocation();
                });
            } 
            if (page.route.name === "data") {
                getList();
                $$('#btnVoegToe').on('click', function () {
                    voegToe();
                });
            }

        }
    }

});

// ---------- uitbreiding voorbeeld les 4 ---------------- //
function getLocation() {
    
    if (navigator.geolocation) {
        var accurate = $$("#cbPosAccurate").prop("checked");
        if(app.watchPositionID !== null){
            // de vorige watch eerst stoppen, of we hebben meerdere
            // simultane lopen.
            navigator.geolocation.clearWatch(app.watchPositionID);
            
        }
        
        app.watchPositionID = navigator.geolocation.watchPosition(
            showPosition,
            positionError, 
            { 
                enableHighAccuracy: accurate,
                maximumAge: 10 * 1000
            }
        );
        
    } else {
       myApp.dialog.alert('Het spijt me, maar geolocatie wordt niet ondersteund door deze browser.', 'Geen geolocatie ondersteuning');
    }
}
function showPosition(position) {
    app.position = position;
    //updateMap();
    
    switch (myApp.view.current.router.currentRoute.name) {
        case "locatie": 
            //updateMap();
            var tText = "";
            tText += "latitude: " + position.coords.latitude +"</br>";
            
            let esText = `Latitude: ${position.coords.latitude}<br>Longitude: ${position.coords.longitude}<br>Accuracy: ${position.coords.accuracy}m.<br>Timestamp: ${new Date(position.timestamp)}<br>`;
            
            $$("#locatieResultaat").html(esText);
            break;
        case "index": 
            alert(position); 
            break;
    }
}
function positionError(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
    switch(error.code){
        case 0:
            // unknown error
            myApp.dialog.alert('Onbekend probleem bij het bepalen van je positie. Zorg er voor dat de positiebepaling van je toestel actief is.', 'Positie probleem');
        case 1:
            // permission denied
            myApp.dialog.alert('Het spijt me, maar ik ga je moeten blijven pesten als je geen toestemming geeft om je positie te zien. Als je wilt, kan je de pagina herladen en eventueel de geschiedenis van je browser wissen. Het laatste uur is meer dan voldoende. <b>iPhone</b> : zorg er voor dat je locatie toestemming in het algemeen EN locatie toestemming aan Safari geeft.', 'Positie toelating probleem');
        case 2:
            // position unavailable (error response from location provider)
            myApp.dialog.alert('Je positie is niet beschikbaar. Zorg er voor dat de positiebepaling van je toestel actief is.', 'Positie niet beschikbaar');
        case 3:
            // timed out
            myApp.dialog.alert('Het duurt te lang om je positie te vinden. Zit je in een tunnel? Of zit je nog in de school? Op een heel aantal toestellen kan de positie sneller bepaald worden als je ook je wifi aanzet.', 'Positie timeout');
    }
    
  };

// ---------- uitbreiding voorbeeld les 5 ---------------- //


function getList() {
    // de data opvragen van de andere server

    var data = {};
    data.table = "producten";
    data.bewerking = "get";
    
    myApp.request.postJSON(
        'http://ophalvens.net/mi3/testdb.php', 
        data, 
        function(responseData, textStatus, jqXHR) {
            // responseData is al json omdat we aan postJSON meegaven dat we json verwachten
            var list = responseData.data;
            var tlines = "";
            var i;
            for ( i = 0; i < list.length; i++) {
                tlines += "<div class='row'><span class='col'>" + list[i].PR_naam + "</span><span class='col'>"+ list[i].prijs +"</span><button onClick='sendAjax(" + list[i].PR_ID + ");' class='button button-fill button-raised button-small color-orange col'>Verwijder</button> </div>";
            }

            $$("#pList").html(tlines);
        },
        function(responseData, textStatus, errorThrown) {
            $$("#resultaat").html('POST failed. :' + errorThrown);
        },
        "json"
    );
    return true;
}

function sendAjax(id) {
    // ajax call opzetten om een item te verwijderen.
    var data = {};
    data.id = id;
    data.table = "producten";
    data.bewerking = "delete";
    // opgelet : niet doorsturen als JSON :
    // CORS & json data --> preflight == problemen!
    // var JSONData = JSON.stringify(data);
    // Daarom ook geen dataType : 'json' zetten ...

    /* // Syntax met jQuery:
    $.ajax({
        type : 'POST',
        url : 'http://ophalvens.net/mi3/testdb.php',
        crossDomain : true,
        data : data,
        withCredentials : false,
        success : function(responseData, textStatus, jqXHR) {
            $$("#resultaat").html("ok!:" + responseData);
            // refresh de lijst
            getList();
        },
        error : function(responseData, textStatus, errorThrown) {
            $$("#resultaat").html('POST failed. :' + errorThrown);
        }
    });
    */
    myApp.request.postJSON(
        'http://ophalvens.net/mi3/testdb.php',
        data,
        function(responseData, textStatus, jqXHR) {
            myApp.dialog.alert("Die zien we nooit meer ... terug!", "Item verwijderd");
            // refresh de lijst
            getList();
        },
        function(responseData, textStatus, errorThrown) {
            myApp.dialog.alert('POST failed. :' + errorThrown, "Item toegevoegd");
        },
        "json"
    );

}

function voegToe(){
    var data = {};
    data.table = "producten";
    data.bewerking = "add";
    data.PR_naam = $$("#PR_naam").val();
    data.prijs = $$("#prijs").val();
    // cat zal fruit of groente zijn
    var cat = $$('input[name=categorie]:checked').val();
    // in de databank is fruit 1, groente 2
    data.PR_CT_ID = (cat == "fruit"?1:2);

    /* // Syntax met jQuery:
    $.ajax({
        type : 'POST',
        url : 'http://ophalvens.net/mi3/testdb.php',
        crossDomain : true,
        data : data,
        withCredentials : false,
        success : function(responseData, textStatus, jqXHR) {
             $$("#resultaat").html("ok!:" + responseData);
            // refresh de lijst
            getList();
        },
        error : function(responseData, textStatus, errorThrown) {
            $$("#resultaat").html('POST failed. :' + errorThrown);
        }
    });
    */
    myApp.request.postJSON(
        'http://ophalvens.net/mi3/testdb.php',
        data,
        function(responseData, textStatus, jqXHR) {
            if(responseData.status === "fail") {
                myApp.dialog.alert("Sorry, probeer nog een keer met meer data ...", responseData.error);
            } else {
                myApp.dialog.alert("ok", "Product toegevoegd");
            }
            // refresh de lijst
            getList();
        },
        function(responseData, textStatus, errorThrown) {
            myApp.dialog.alert('POST failed :' + errorThrown, "Toevoegen is niet gelukt");
        },
        "json"
    );
}