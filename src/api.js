export default class Data{

    //Aranan kelimelerin JSON dosyalarını çekmek için kullandığım fonksiyon./ Function that I use for fetching JSON files of the searched word.
    
    async getWordData(kelime){

        //API'de aranan kelime tamamı küçük harfle olacak biçimde yazılmalı yoksa hata veriyor. Bunun için arama kutusuna nasıl yazılırsa yazılsın kelimeledeki tüm harfleri küçük harfli olacak biçimde döndüren bir IIFE fonksiyonu yazdım./
        //Word that searched on API must be written in lower case, or else there occurs an error. Therefore, I wrote an IIFE function that returns the word in lowercase no matter how they written in.

        let kullanilabilirKelime = (function(){

            //İlk önce kelimeyi harflerine ayırıp bir array'e dönüştürtüyorum./ Firstly, I split the word in letters and I have it transformed it an array

            const kelimeArr = kelime.split("");

            //Sonra harflerin küçük harf halini ekleyeceğimiz, ilk başta boş olan bir string oluşturuyorum./ Then, I create a blank string that I will add lowercase version of the letters

            let sonuc = "";

            //Ardından elemanı "kelimeArr" olan bir for...of döngüsü oluşturup çalıştırıyorum./ After that, I create a for...of loop that uses "kelimeArr" and I run it.

            for(let i of kelimeArr){

                //Dönen tüm elemanları küçük harf yapıp, sırasıyla oluşturduğum "sonuc" string'ine ekliyorum. / I make lowercase all returned elements and add them to "sonuc" string that I was created
                
                sonuc += i.toLowerCase();

            };

            //En son olarak da for...of döngüsünden sonra oluşturulması tamamlanmış "sonuc" string'ini döndürüyorum ve böylece "kullanilabilirKelime" değişkenine tüm harflerin küçük harf olduğu bir string değerini eşitlemiş oluyorum./
            //Finally, I return "sonuc" string, which it is creation ended, and so I equalize "kullanilabilirKelime" variable to a string value that all letters are lowercase.

            return sonuc;

        })();

        //TDK da biz kelimelerin anlamlarını "Genel Türkçe Sözlük" API'sinden alacağız. Bunu ise aşağıda görüldüğü gibi gereken linkin sonuna arayacağımız az önce işlediğimiz aranacaz kelimeyi ekleyip fetch isteği atarak yapıyoruz.
        //In TDK, We get data of words from "General Turkish Dictionary". We do this by adding the search word we have just processed to the end of the required link, as seen below, and sending a fetch request.

        let rawWordData = await fetch("https://sozluk.gov.tr/gts?ara="+kullanilabilirKelime);

        //İsimler içinde aynısını "Kişi Adları Sözlüğü" API'sine fetch isteğinde bulunarak yapıyoruz. Ancak burada şöyle bir fark var, linkin sonuna "cins" anahtar kelimesine gereken değerleri eşitleyerek (Erkek için 2, kadın için 1 ve hem erkek hem kadın için 4) uygun cinsiyete göre almamız gerekiyor ("cins=4" yazarak da almayı denedim fakat bazı hatalar çıktığı için bu yöntemden vazgeçtim ve cinsiyetlerin anlamlarını ayrı ayrı alıyorum).
        //For names, we do the same thing with sending fetch request to "Person Names Dictionary". However, there is difference, we should fetch these values for compatible genders with equalize compatible values to "cins"(gender) keyword (For Men, it is 2.For Women, it is 1. For both genders, it is 4).(I have tried fetching data with writing "cins=4", but I abandoned this way due to some errors)

        let rawNameDataMale = await fetch("https://sozluk.gov.tr/adlar?ara="+kullanilabilirKelime+"&gore=1&cins=2");

        let rawNameDataFemale = await fetch("https://sozluk.gov.tr/adlar?ara="+kullanilabilirKelime+"&gore=1&cins=1");

        //Tüm çektiğim dataları JSON Objesi halinde alıyorum
        //I take all the data I have fetched as JSON Object

        let jsonWordData = await rawWordData.json();

        let jsonNameDataMale = await rawNameDataMale.json();

        let jsonNameDataFemale = await rawNameDataFemale.json();

        //Verileri tamamen kullanılabilir biçimde aldıktan sonra insan isimlerinin anlamlarının ve özelliklerinin "isimAnlamları" anahtar değerine eşitlendiği (ayrıca altında anlamlar "kadin","erkek" ve "tumu" olarak ayrıştırlmış halde) ve kelimelerin anlamlarının ve özelliklerinin "insan isimlerinin anlamlarının ve özelliklerinin "isimAnlamları" anahtar değerine eşitlendiği bir obje oluşturarak async fonksiyonun "fullfilled" değeri olarak döndüm.
        //After receiving the data in a fully available format, the meaning and characteristics of human names are synced to the property value of the "isimAnlamları" (also with the meanings "kadin"(women), "erkek"(men) and "tumu"(all) parsed under it), and the meaning and characteristics of the words are synced to the property value of "kelimeAnlamlari". Then, I returned all the object as "fullfilled" value of an async function

        return {

            //İnsan isimlerinin anlamlarını içeren anahtar
            //The key which contains person name meanings

            isimAnlamlari:(function(){

                //Yazılan kelimenin insan ismi olup olmadığını, API'de aranan isime ait herhangi bir değer olmadığı zaman dönen " {error:"Sonuç Bulunamadı"} " objesinin varlığını sorgularak buluyoruz. Eğer bu obje hem erkek hem de kadın için aratıldığında varsa onun bir insan ismi olmadığını anlıyoruz ve "Sonuç Bulunamadı" değerini dönüyoruz.
                //We check, if the word is a person name with poll if there is " {error:"Sonuç Bulunamadı"} " object value that returns when if it is neither a male name nor a female name. If that object is there male and female both, we understand that it is not a person name.

                if(jsonNameDataMale.error !== undefined && jsonNameDataFemale.error !== undefined){

                    return "Sonuç Bulunamadı"

                }else{

                //Ancak insan ismi ise o isme ait olan tüm kadın, erkek isim değerlerini alıyoruz
                //However, if it is person name. We get male and female values of that name


                //O ismin tüm anlamlarını ait olduğu cinsiyetlere göre sınıflandıracağımız bir obje oluşturuyoruz.
                //I created an object for classifying the meanings according to genders that belong for.
                    let testObj ={
                        
                        //Erkek isim anlamları için
                        //For male name meanings
                        erkek:(function(){

                            //Sonradan oynadığım veriyi döndürebilmek için let ile "returnData" değişkenini oluşturuyorum
                            //For returning the modified data afterwards, I created a "returndata" variable with let 

                            let returnData;

                            //İlk önce erkek ismi olup olmadığını içindeki error anahtar keilmesinin(yukarıda anlattığım) varlığını kontrol ederek anlıyoruz. Eğer erkek ismi değilse yine üstte olduğu gibi "Sonuç Bulunamadı!" verisini dönüyoruz (returnData ' ya eşitleyerek)
                            //Firstly, we check if it is a male name with is there a error key name (like I told before). If it is not a male name, we return "Sonuç Bulunamadı!"(There is no results) (like equalizing to returnData) like before.

                            if(jsonNameDataMale.error !== undefined){
                                returnData = "Sonuç Bulunamadı!";
                            }
                            else{
                                
                                //Eğer ki erkek ismiyse ve birden çok anlamı varsa, elimize geçen objenin "anlam" anahtar kelimesindeki verileri (string halde bir liste) ilk önce uygun yerlerden kırıp bir array haline getiriyoruz ve ardından o arrayin içinde halen bulunan sayıları indexlerinin 2 ye bölünebilirliğinden yararlanarak bulup atıyoruz ve içinde sadece anlamların bulunduğu bir array elde ediyoruz.
                                //If it's a male name and it got meaning more than one, we first split the data of the key word "anlam" (a string list) of the object that we get from necessary places ,and  make it an array. Then, we eliminate the numbers of that data with checking if index of that numbers can divide to 2. Finally, we make an array that only contains meanings.
                                
                                if(jsonNameDataMale[0].anlam.indexOf(".") == 1){

                                    returnData = jsonNameDataMale[0].anlam.split(".").filter((val) => {
                                        return jsonNameDataMale[0].anlam.split(".").indexOf(val)%2 === 1;
                                    });

                                }

                                //Eğer ki ismimiz erkek ismi ve sadece bir anlamı varsa, "anlam" anhatar kelimesinin değerini alıp bir array'in içine yerleştiriyoruz. Daha sonra o değeri bir for döngüsünde kullanacağımız için bir array'in içine yerleştiriyoruz.
                                //İf it's a male name and has only one meaning, we directly take the value of "anlam" keyword ,and we put it in an array. Because of we will use it value in a for loop, we put it in an array.
                                else{

                                    returnData = [jsonNameDataMale[0].anlam];
                                    
                                }
                            }

                            //Ondan sonra artık "returnData"ya ne eşitlendiyse onu dönüyoruz.
                            //After them all, we return whatever equalized to "returnData".

                            return returnData;

                        })(),

                        //Erkek isim anlamları için ne yaptıysak aynısını kadın isim anlamları için yapıyoruz.
                        //Whatever we have done for male name meanings, we do the same for female meanings.

                        kadin:(function(){

                            let returnData;

                            if(jsonNameDataFemale.error !== undefined){
                                returnData = "Sonuç Bulunamadı!";
                            }
                            else{

                                if(jsonNameDataFemale[0].anlam.indexOf(".") == 1){

                                    returnData = jsonNameDataFemale[0].anlam.split(".").filter((val) => {
                                        return jsonNameDataFemale[0].anlam.split(".").indexOf(val)%2 === 1;
                                    });

                                }
                                else{

                                    returnData = [jsonNameDataFemale[0].anlam];
                                    
                                }

                            }

                            return returnData;

                        })(),
                    };


                    //Eğer isim her erkek ismi hemde kadın ismi mi diye kontrol ediyoruz.
                    //We check the if the name is male and female name.

                    if(testObj.erkek === "Sonuç Bulunamadı!" || testObj.kadin === "Sonuç Bulunamadı!"){

                    }
                    else{

                        //İsimlerin erkek ve kadın versiyonlarındaki ortak anlamlarını içine atacağımız bir "tumu" anahtar kelimesi oluşturuyoruz.
                        //We create a "tumu"(all) keyword for setting same meanings of male and female version.

                        testObj.tumu = (function(){
    
                            //"returnData" gibi modifiye edilmiş veriyi döndürmek için bu sefer "last" adında bir değişken oluşturuyoruz.
                            //Like "returnData", we create a variable for returning modified data.
                            let last;


                            //Burada "filter" fonksiyonunu kullanacağım için herhangi bir hata çıkmasın diye erkek ve kadın isim anlam array'lerinin uzunluklarını karşılaştırıyorum.
                            //In there, I compare the length of male and female name meaning arrays for preventing some errors because of "filter" function usage.

                            if(testObj.erkek.length > testObj.kadin.length){
    
                                last = testObj.erkek.filter((val) => {
                                    return testObj.kadin.indexOf(val) !== -1;
                                });
    
                            }

                            //Yukarıdaki işlemin aynısı ama sadece kontrol edilen array'lerin yeri farklı
                            //Same process above, but places of arrays are different

                            else if(testObj.kadin.length > testObj.erkek.length){
    
                                last = testObj.kadin.filter((val) => {
                                    return testObj.erkek.indexOf(val) !== -1;
                                });
    
                            }

                            //Eğer aynı uzunluktalar ise sadece bir array'in dönemsini istedim ve onu da "kadin"(testObj.kadin) olarak seçtim (ama isterseniz "erkek" de yapabilirsiniz)
                            //If the lengths are same, I wanted return one array, and I chosen "kadin"(testObj.kadin) (but if you want, you can choose "erkek").
                            else{
    
                                last = testObj.kadin;
    
                            };
        
                            //En sonunda yine modifiye edilmiş veriyi dönüyorum ve "tumu"nun eşit olduğu değeri buluyorum
                            //Finally, I return modified value again and I found equal value of "tumu"

                            return last;
                            
                        })();

                    }

                    //Ardından artık tamamen tüm değerlerin eşitlenmiş olduğu "testObj" objesini dönüyor ve "isimAnlamlari" anahtar kelimesinin eşit olduğu değeri buluyoruz.
                    //Finally, we return "testObj" object, which it's all values are equalized, and we find value that equals to "isimAnlamlari" keyword.

                    return testObj;

                }
            })(),

            //Kelimenin anlamlarını içeren anahtar
            //The key which contains word meanings

            kelimeAnlamlari:(function(){

                //Kelimenin Genel Türkçe Sözlükte varolma durumunu kontrol ediyoruz, yoksa bize daha önce de olduğu gibi " {error:"Sonuç Bulunamadı"} " objesini dönecek.
                //We check the status of existing of the word in General Turkish Dictionary, else It returns " {error:"Sonuç Bulunamadı"} " object like before.

                if(jsonWordData.error !== undefined){

                    return "Sonuç Bulunamadı"
                    
                }else{

                    //Kelimenin anlamlarını içine koyacağımız bir array oluşturuyoruz
                    //We create an array that we put the meanings of the word

                    let testArr = [];

                    //Kelimelerin API'deki değerini sorgulatttğımızda, bazen birden fazla kelime objesi dönebiliyor bu yüzden birden fazla obje dönerse diye (array içinde dönüyor) her objedeki kelime objesini işlemek için bir for...of döngüsü oluşturuyoruz.
                    //When we query the value of the word in API, it sometimes returns more than one word object. Therefore, we created a for...of loop for process all word objects.

                    for(let i of jsonWordData){

                        //Ardından o kelimenin içinde "anlamlarListe" adında bir anahtar kelimesinde, içinde anlamların objelerinin olduğu bir array var. Oradaki tüm objelerdeki anlamları yakalayabilmek için yine bir for...of döngüsü oluşturuyoruz.
                        //Then, There is an array that contains objects of the meaning in keyword of "anlamlarListe". For catching all the meanings, we create a for...of loop again.

                        for(let ii of i.anlamlarListe){

                            //Şimdi ise üzerinde olduğumuz o objenin içinde anlamın bulunduğu anahtar kelime olan "anlam"ın değerini, önceden oluşturduğumuz "testArr"ın içine atacağız.
                            //Now, we are gonna push the value of "anlam" keyword to "testArr" that we created before.
                            testArr.push(ii.anlam)

                        };

                    }

                    //Sonunda ise tüm anlamların bulunduğu array'i "kelimeAnlamlari" ne eşit olacak şekilde döndüreceğiz
                    //Finally, we are gonna return the array that contains all of the meaning as equal to "kelimeAnlamlari"
                    
                    return testArr;

                }

            })()};

    };

};
