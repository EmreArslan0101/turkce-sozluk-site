---Türkçe Sözlük - Turkish Dictionary--

Verilerin TDK'ya ait API'dan alındığı bir türkçe sözlük sitesi / A dictionary website that gets data from Turkish Language Association API.

Bu site, insanların anlamını bulmak istediği kelimenin veya insan isminin anlamını, TDK'nun belirlediği anlama uygun olarak sade ve kolay bulunabilir bir şekilde göstermesi ve Türkçe kelimeler ile alakalı bilgileri TDK'nun sitelerinden nasıl alınacağı hakkında yol göstermesi amacıyla oluşturulmuştur./ This site has been created in order to show the meaning of the word or human name that people want to find the meaning of, in a simple and easy to find way in accordance with the meaning determined by TLA, and to guide how to get information about Turkish words from TLA's sites.

Bu site TDK'nın kendisine ait olan JSON API linkleri sayesinde gereken veriyi alabilmektedir./ This site can get the required data through JSON API links which is owned by TLA.

-Bu sitede şuanlık sadece kelimelerin genel türkçe sözlükteki anlamları gösterilmektedir, daha sonra eklemeler yapılacaktır.
-İsimlerin anlamları ise sitede olduğu gibi Kadın ve Erkek için olarak ayrılmış, ayrıca bir anlam hem kadınlarda da hemde erkeklerde geçerliyse o isim kadın/erkek olarak gösterilmektedir.
-Database/JSON API ile ilgili JavaScript dosyası "./src/api.js"dir.
-Arayüz işlemleri ile ilgili JavaScript dosyası "./src/ui.js"dir.
-Sitedeki gerçekleşen asıl işlemlerin dosyası  "./src/index.js"dir.
-Tüm SCSS/SVG/Favicon dosyalarını "./src/styles/" altında bulabilirsiniz.

– This site currently shows only the meanings of words in the general turkish dictionary, then additions will be made.
The meaning of the names is reserved for Male and Female, as on the site, and if the meaning applies to both male and female, the name is shown as "kadın/erkek"("female/male").
-Database/JSON API related JavaScript file is "./src/api.js".
-JavaScript file for interface operations is "./src/ui.js".
-The file of the actual operations on the site is "./src/index.js".
-You can find all SCSS/SVG/Favicon files under "./src/styles/".

--- Update Log/Güncelleme Günlüğü ---

-Türkçe'de ki özel karakterleri yazabilmek için bir arayüz eklendi. / There added an interface for allows typing special characters in Turkish.