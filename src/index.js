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
    
}

