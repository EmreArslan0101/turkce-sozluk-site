export default class UI{
    
    constructor(){

        //Anlamların listeleneceği "table" elementi
        //"table" elements that will be listed all meanings in

        this.anlam_listesi = document.getElementById("anlamlar");
   
    }

    //Arama kutucuğunun boş olup olmadığını kontrol ediyor.
    //It checks if the searchbox is empty or not.

    checkInput(cb){

        //Arama kutucuğuna yazılan değerdeki tüm whitespace(tab,space,enter falan) değerlerini siliyor.
        //It deletes all the whitespace(tab,space,enter,etc.) values.

        if(document.querySelector("#arama").value.trim() === ""){

            //Eğer kutucuk boşsa bir geri hata mesajı kutucuğu oluşturuyor (aşağıda anlatılyor).
            //If the box is blank, it creates an error message box (it explained below).

            this.addAlertMessage("Lütfen bir kelime giriniz");
            
        }
        else{

            //Eğer kutucuk boş değilse bir geri çağırma fonksiyonu dönüyor.
            //If the box is not blank, it returns a callback function.

            cb();

        };

    };

    //Hata mesajı kutucuğu oluşturmayı sağlayan fonksiyon
    //Function that creates an error message box

    addAlertMessage(message){

        //Hata mesajı kutucuğu
        //Alert message box
        const alertBox = document.createElement("div");

        //Halihazırda bir fazla hata mesajı kutusu olup olmadığını kontrol ediyor. Eğer varsa yeniden bir hata mesajı oluşturulmamasını sağlıyor.
        //It checks if there is a message box already. If there is, it prevents a regenerating of a message box.

        if(document.getElementsByClassName("alert").length >= 1){

            alertBox.textContent = message;

        }

        //Hiç mesaj kutusu yoksa, mesaj kutusu oluşturmayı sağlıyor.
        //If there is not message box, it generates a message box.
        
        else{

    
            alertBox.classList = "alert alert-danger";
    
            alertBox.role = "alert";
    
            alertBox.textContent = message;
            
            document.querySelector("main").appendChild(alertBox);
            
            setTimeout(() => alertBox.remove(),3000);

        };

    };

    //Kelimenin anlamlarını "anlam_listesi" içinde listelemeyi sağlayan fonksiyon
    //Function that list all the meaning of the word in "anlam_listesi"

    setWordMeaningsOnTable(meanings,kelime){

        //Kelimenin anlamı var mı diye kontrol ediyor, anlam bulamazsa birşey yapmıyor.
        //It checks, if the word has any meaning. If there is anything, It doesn't do anything.

        if(meanings === "Sonuç Bulunamadı"){
            
        }

        //Anlam bulursa ise kelimenin anlamlarını sıra sayısı ve anlamı bir satırda (tbody) olacak şekilde yukarıdan aşağı sıralıyor.
        //If the word has any meaning. It lists all the meanings of the word form up to down per line that contains a counting number and meaning.

        else{
    

            //(Daha detaylı bilgi için aşağıya bakınız)
            //(For more detailed info, look below)

            this.setTableHead("wordFound",kelime,"kelimesine karşılık gelen anlamlar")
    
            //Bir anlam sıra sayacı
            //A meaning order counter

            let count = 1;
    
            //Tüm anlamların "anlam_listesi"ne sırasıyla yerleşmesini sağlayan for...of döngüsü
            //For...of loop that allows the all of the meanings to be placed in "anlam_listesi"

            for(let i of meanings){
    
                const meaningBody = document.createElement("tbody");

                meaningBody.id = "kelime";
    
                const meaningShelf = document.createElement("tr");
    
                const meaningCount = document.createElement("th");
    
                meaningCount.textContent = count+".";
    
                count++;
    
                const meaning = document.createElement("td"); 
    
                meaning.textContent = i;
    
                meaningShelf.appendChild(meaningCount);
    
                meaningShelf.appendChild(meaning);
    
                meaningBody.appendChild(meaningShelf);
    
                this.anlam_listesi.appendChild(meaningBody);
    
                console.log(i);
    
            };

        };
        

    };
 
    //Yine üstteki "setWordMeaningsOnTable" fonksiyonunun aynısı ama biraz daha uzun versiyonu o yüzden sadece farklı kısımları için comment yazacağım.
    //Same function as "setWordMeaningsOnTable" above, but a bit longer version of that. Therefore, I will write comments for different parts.

    setNameMeaningsOnTable(meanings,kelime){

        
        if(meanings === "Sonuç Bulunamadı"){

        }
        else{

            this.setTableHead("wordFound",kelime,"ismine karşılık gelen anlamlar")
            
            //For...of döngüsünü sadece kadın ismi olan isimlerin anlamları için başlatıyor.
            //It starts the for...of loop just for meanings of female names.

            if(typeof meanings.kadin == "object" && typeof meanings.erkek != "object"){

                //Kadın(Female)

                let count = 1;

                for(let i of meanings.kadin){
    
                    const meaningBody = document.createElement("tbody");

                    meaningBody.id = "isim";
    
                    const meaningShelf = document.createElement("tr");
    
                    const meaningCount = document.createElement("th");
    
                    const gender = document.createElement("td");
    
                    gender.textContent = "Kadın";
    
                    meaningCount.textContent = count+".";
                    
                    count++;
    
                    const meaning = document.createElement("td");
    
                    meaning.textContent = i;
    
                    meaningShelf.appendChild(meaningCount);
    
                    meaningShelf.appendChild(meaning);
    
                    meaningShelf.appendChild(gender);
    
                    meaningBody.appendChild(meaningShelf);
    
                    this.anlam_listesi.appendChild(meaningBody);

                };

            };

            //For...of döngüsünü sadece erkek ismi olan isimlerin anlamları için başlatıyor.
            //It starts the for...of loop just for meanings of male names.

            if(typeof meanings.erkek == "object" && typeof meanings.kadin != "object"){

                //Erkek(Male)

                let count = 1;

                for(let i of meanings.erkek){
    
                    const meaningBody = document.createElement("tbody");

                    meaningBody.id = "isim";
    
                    const meaningShelf = document.createElement("tr");
    
                    const meaningCount = document.createElement("th");
    
                    const gender = document.createElement("td");
    
                    gender.textContent = "Erkek";
    
                    meaningCount.textContent = count+".";
                    
                    count++;
    
                    const meaning = document.createElement("td");
    
                    meaning.textContent = i;
    
                    meaningShelf.appendChild(meaningCount);
    
                    meaningShelf.appendChild(meaning);
    
                    meaningShelf.appendChild(gender);
    
                    meaningBody.appendChild(meaningShelf);
    
                    this.anlam_listesi.appendChild(meaningBody);

                };

            };

            //For...of döngüsünü hem erkek hem kadın isimi olan isimlerin anlamları için başlatıyor.
            //It starts the for...of loop just for both male and female name meanings.

            if(typeof meanings.kadin == "object" && typeof meanings.erkek == "object"){

                //Tümü(All)

                console.log("tümü");

                let count = 1;

                //İlk önce erkek/kadın ortak anlamları listeye ekliyor.
                //Firstly, it adds male/female same meanings to the list.
                
                for(let i of meanings.tumu){

                    console.log("tümü");
    
                    const meaningBody = document.createElement("tbody");

                    meaningBody.id = "isim";
    
                    const meaningShelf = document.createElement("tr");
    
                    const meaningCount = document.createElement("th");
    
                    const gender = document.createElement("td");
    
                    gender.textContent = "Kadın/Erkek";
    
                    meaningCount.textContent = count+".";
                    
                    count++;
    
                    const meaning = document.createElement("td");
    
                    meaning.textContent = i;
    
                    meaningShelf.appendChild(meaningCount);
    
                    meaningShelf.appendChild(meaning);
    
                    meaningShelf.appendChild(gender);
    
                    meaningBody.appendChild(meaningShelf);
    
                    this.anlam_listesi.appendChild(meaningBody);

                };


                //Sonra da eğer varsa, o ismin sadece erkek versiyonunun sahip olduğu anlamları listeye ekliyor.
                //Then, if there is, it adds just meanings of male version of that name.

                for(let i of meanings.erkek){

                    if(meanings.tumu.some((checkVal) => checkVal === i)){

                    }
                    else{
    
                        const meaningBody = document.createElement("tbody");

                        meaningBody.id = "isim";
        
                        const meaningShelf = document.createElement("tr");
        
                        const meaningCount = document.createElement("th");
        
                        const gender = document.createElement("td");
        
                        gender.textContent = "Erkek";
        
                        meaningCount.textContent = count+".";
                        
                        count++;
        
                        const meaning = document.createElement("td");
        
                        meaning.textContent = i;
        
                        meaningShelf.appendChild(meaningCount);
        
                        meaningShelf.appendChild(meaning);
        
                        meaningShelf.appendChild(gender);
        
                        meaningBody.appendChild(meaningShelf);
        
                        this.anlam_listesi.appendChild(meaningBody);

                    };

                };

                //Sonra da eğer varsa, o ismin sadece kadın versiyonunun sahip olduğu anlamları listeye ekliyor.
                //Then, if there is, it adds just meanings of female version of that name.

                for(let i of meanings.kadin){

                    if(meanings.tumu.some((checkVal) => checkVal === i)){

                    }
                    else{
    
                        const meaningBody = document.createElement("tbody");

                        meaningBody.id = "isim";
        
                        const meaningShelf = document.createElement("tr");
        
                        const meaningCount = document.createElement("th");
        
                        const gender = document.createElement("td");
        
                        gender.textContent = "Kadın";
        
                        meaningCount.textContent = count+".";
                        
                        count++;
        
                        const meaning = document.createElement("td");
        
                        meaning.textContent = i;
        
                        meaningShelf.appendChild(meaningCount);
        
                        meaningShelf.appendChild(meaning);
        
                        meaningShelf.appendChild(gender);
        
                        meaningBody.appendChild(meaningShelf);
        
                        this.anlam_listesi.appendChild(meaningBody);

                    };

                };

            };

        }

    };

    //Kelimenin anlamının bulunabilirlik durumuna göre (type), kelimenin (word) ve ekstra bir devam cümlesinin (message) yazılı olduğu bir başlık ("thead") oluşturmayı sağlayan bir fonksiyon.
    //With status of foundable meanings of word /type, it creates a header ("thead") that contains word (word) and continue title (message).

    setTableHead(type,word,message){

        //Kelime/İsim bulunduysa yani type değeri "wordFound" ise gereken başlığın ("thead") eklenmesini sağlar.
        //If the word/name found, i.e. type value is "wordFound" , It allows to add a convenient header ("thead"). 

        if(type = "wordFound" && word !== undefined && message !== undefined){

            const thead = document.createElement("thead");
    
            const th = document.createElement("th");

            th.id = "explainment";

            //Oluşturulacak başlıkta kelimenin/ismin sadece ilk harfi büyük, sonraki harflerinin küçük hali yer alıyor. Burada çağrılan IIFE bunu sağlıyor.
            //The header that will be generated has version of word/name that first letter is uppercase, next letters are lowerscase. IIFE that called there allows it.

            const kullanilicakKelime = (function(){

                const kelimeArr = word.split("");
    
                let sonuc = "";
    
                for(let i in kelimeArr){

                    switch(i == 0){

                        case true:

                            sonuc += kelimeArr[i].toUpperCase();
                            break;

                        case false:

                            sonuc += kelimeArr[i].toLowerCase();
                            break;

                    };
                    
                };
    
                return sonuc;
    
            })();

            th.textContent = kullanilicakKelime+" "+message;

            thead.appendChild(th);

            this.anlam_listesi.appendChild(thead);

            console.log(word);

        //Kelime/İsim bulunamadıysa yani type değeri "wordNotFound" ise gereken başlığın ilk haline dönemsini sağlar (ne olursa olsun).
        //If the word/name not found, i.e. type value is "wordNotFound" , It allows to make it back to first version (whatever happens). 

        }else if(type = "wordNotFound" && word == undefined && message == undefined){

            const thead = document.createElement("thead");
    
            const th = document.createElement("th");

            th.id = "explainment";

            th.textContent = "İstediğin kelimenin anlamını bul!";

            thead.appendChild(th);

            this.anlam_listesi.appendChild(thead);

            console.log(kelime);

        }
        else{


        };

    };
             
};
    
   