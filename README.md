# MI3-CordovaVoorbeeld
Voorbeeld voor Cordova - MI3

Dit is de eerste stap in het voorbeeld van de les van vandaag.

Download deze branch of fork de repository om te starten.

Dit is op dit moment nog een nieuw (default) Cordova project, aangemaakt met het commando :

```
cordova create mi3Cordova18 net.ophalvens.mi3Cordova2018 CordovaVB2018
```
## Stap 2

Voeg het platform android toe aan het project :

```
cordova platform add android
```

## Stap 3

In stap 3 is het Framework7 framework toegevoegd en is de basis van de app aangepast zodat er een minimum van inhoud is.

Routing is aangepast en de locatie wordt mogelijk opgevraagd. 

Het effectief opvragen van de locatie zal nog niet werken in appvorm, daarvoor moet eerst nog de location plugin geïnstalleerd worden.

## Stap 4

Om de permissie voor toegang tot de geolocatie van het toestel te regelen, moet de geolocatie plugin geïnstalleerd worden :
```
cordova plugin add cordova-plugin-geolocation
```
Meer informatie over deze plugin vind je op : https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/index.html

Test als je kan de app op je eigen toestel :
```
cordova run android
```