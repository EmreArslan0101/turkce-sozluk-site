//SCSS dosyasını kullanabilmek için o dosyayı böyle çağırıyoruz.
//For being able to use SCSS file, we call it like that.
import "./styles/css&scss/main.scss";

//Diğer yazdığımız ".js" dosyalarını burada çağırıyorum.
//I call other ".js" files that we have written.

import UI from "./ui";
const ui = new UI();

import Data from "./api";
const data = new Data();

//Kelimenin anlamını bulmayı arama tuşuna (Ara) tıklanarak yapılabilmesini sağlıyorum.
//I make it allow the find the meanings of the word/name with clicking to searching button (Ara).

document.querySelector(".btn").addEventListener("click",(e) => {

    findTheMeaning();

});

//Kelimenin anlamını bulmayı arama kutusundayken "Enter" tuşuna basarak yapılabilmesini sağlıyorum.
//I make it allow the find the meanings of the word/name with pushing to "Enter" button (Ara).

document.querySelector("input").addEventListener("keypress",(event) => {

    if(event.key === "Enter"){

        findTheMeaning();

    };


});

//Aranan kelimenin anlamını bulup listelemeyi tek fonksiyon haline getirdiğim fonksiyon.
//Function that, I allowed to find the meaning and list then in once.

function findTheMeaning(){

    ui.checkInput(() => {
            data.getWordData(document.querySelector("#arama").value)
            .then(theData => {

                //Eğer kelime TDK veritabanında yoksa hem "isimAnlamlari" hem de "kelimeAnlamlari", "Sonuç Bulunamadı" olarak döner. Bu sayede kelimenin var olup olmadığını anlayıp, ona göre hata mesajı oluşturuyouz.
                //If the word is not in TLA database, "isimAnlamlari" and "kelimeAnlamlari" return as "Sonuç Bulunamadı". Therefore, we can understand if this word is exist or not. Then, we can create an error message due to that.

                if(theData.isimAnlamlari === "Sonuç Bulunamadı" && theData.kelimeAnlamlari === "Sonuç Bulunamadı"){

                    ui.addAlertMessage("Lütfen geçerli bir kelime/isim giriniz");

                }

                //Eğer kelime TDK veritabanında varsa ilk önce listenin içindeki tüm elemanları temizliyoruz ve sırasıyla tüm anlamları yerleştiriyoruz.
                //If the word is in TLA database, we clear all of the elements of list and we put all the meanings in order.
                else{

                    ui.anlam_listesi.innerHTML = "";
                    ui.setWordMeaningsOnTable(theData.kelimeAnlamlari,document.querySelector("#arama").value);
                    ui.setNameMeaningsOnTable(theData.isimAnlamlari,document.querySelector("#arama").value);
                    console.log(theData);

                };
                
            })
            .catch(err => console.error(new Error(err)));

        }

    );
    
};

//Tıklama Sayacı
//Click Counter

let clickCount = 0;

//Türkçedeki özel harfleri küçük ve büyük harf halinde yazabilmek için fonksiyon.
//Function for typing special letters of Turkish lower case and upper case.

document.getElementById("special-letters").addEventListener("click",(e) => {

    //Özel harfleri yazabilmek için eğer durumu
    //If statement for typing special letters

    if(e.target != document.querySelector("#special-letters").lastChild){

        document.querySelector("#arama").value += e.target.value;

    //Küçük-Büyük harf değişimi için eğer durumu
    //Else statement for Lower-Upper case change

    }else{

        //Bu eğer durumu, harflerin küçük yada büyük harf modunda olup olmadığını ve okun işlevini yukarıda oluşturduğumuz tıklama sayacının değerinin ikiye bölümünden kalanı sayesinde anlıyor.
        //This if statement understands if letters are in lower or upper case mode and function of arrow with remainder of division by two.

        if(clickCount%2 == 0){

            //Tüm çocukların büyük harf moduna geçmesini sağlayan for...of döngüsü
            //For...of that allows the all letters change to upper case mode

            for(let i of document.querySelector("#special-letters").children){
    
                //Ok hariç tüm değerleri büyük harfli yaparken, okun sadece yönünü ve dolaylı olarak da işlevini değiştiriyor.
                //While it makes all values upper case except arrow, It just changes direction of arrow and indirectly changes the function of arrow.

                switch(i.value == "↑"){
    
                    case false:

                        i.value = i.value.toUpperCase();

                        break;

                    case true:

                        document.querySelector("#special-letters").lastChild.value = "↓";

                        break;

    
                };
                
            };
    
            //Okun işlevini değiştirmek için tıklama sayacına bir ekliyor.
            //It adds one to click counter for chnaging function of arrow.

            clickCount++;
    
        //Az önce anlattığım eğer durumunun aynısı ama bu sefer harfleri küçük harf yapıyor ve okun işlevini eski haline döndürüyor.
        //Same if statement with I told before, but this time, it makes letter lower case and changes function of arrow back.
        
        }else if(clickCount%2 == 1){
    
            for(let i of document.querySelector("#special-letters").children){
    
                switch(i.value == "↓"){
    
                    case false:
                        i.value = i.value.toLowerCase();
                        break;
                    case true:
                        document.querySelector("#special-letters").lastChild.value = "↑"
                        break;
    
                };
                
            };
    
            document.querySelector("#special-letters").children[2].value = "ı";
    
            clickCount++;
    
        };

    };

});


