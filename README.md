# MI3-CordovaVoorbeeld
Voorbeeld voor Cordova - MI3

Branch **stap5** is het voorbeeld van **les 5**.

Deze branch bouwt verder op branch **stap4**. Kijk in die branch voor informatie om dit project op te zetten.

## Stap 5

* **`/www/`**
  * de code van je Cordova project
* **`/php/`**
  * 2 php bestanden die je eigen online webserver moet plaatsen
  * 2 sql dumps die je in PHPMyAdmin kan importeren om de tabellen van het voorbeeld aan te maken

### Geen php bestanden in je Cordova app
Een php pagina wordt enkel verwerkt als die vanop een webserver met php wordt bevraagd. Hoewel er in het voorbeeld 2 php bestanden in de map `/php` zitten, maken deze bestanden geen deel uit van je Cordova project.

### Je eigen server
Hoewel je met het voorbeeld van de les kan werken, wil je waarschijnlijk met je eigen code experimenteren voor jouw project.

* Zoek een eigen php/mysql server.
* Plaats een aangepaste versie van `/php/testdb.php` en `/php/dbcon.php` op jouw server. Let daarbij vooral op de aangepaste connectiegegevens in het bestand `/php/dbcon.php`.
* Voeg de tabellen categorieen en producten toe aan je online databank. In PHPMyAdmin kan je sql bestanden importeren.
* Pas het bestand `my-app.js` aan, zodat de ajax requests verwijzen naar het bestand `testdb.php` op jouw server.

### Meer beveiliging
Het bestand `/php/testdb.php` is wat langer en meer complex dan de versie die we in een eerdere les gebruikten. Hoewel het bestand nu iets meer complex is om te begrijpen, is deze versie wel wat beter bestand tegen o.a. sqlinjection.

De aanpassingen zouden voldoende gedocumenteerd moeten zijn. Als de aanpassingen niet duidelijk zijn, laat dan gerust iets weten.
