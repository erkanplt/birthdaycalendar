# birthdaycalendar
(Angular,Spring Boot) Birthday Calendar Project
(26.07.2020)

PROJE GÖRSELLERİ VE AÇIKLAMASI

 - Sol menüden ulaşılan 'Liste Görünümü' sayfası
     - Sayfa içerisinde 3 adet tablo bulunmaktadır. Bu tablolar sisteme kaydedilen doğum tarihlerini zamanına göre sıralamaktadır. Sisteme girilen günden önceki tarihler geçmiş      doğum günü tablosunda ve kırmızı renkte listelenmektedir. Bugün olan doğum günü tarihleri mavi renkte ve bugün olan doğum günleri tablosunda listelenmektedir. Son olarak        gelecek günlerde olan doğum günü tarihleri gelecek doğum günleri tablosunda siyah renkte listelenmektedir. Zamana göre kullanılan renkler bu şekilde belirlenmiş olup,            takvimde de aynı renklerle ifade edilecektir. İlgili tablo için herhangi bir kayıt olmadığı takdirde bilgisi gösterilmektedir(gelecek doğum günleri tablosundaki gibi). Her      kayıt yanında bir silme ve güncelleme iconu bulunmaktadır. Sayfanın üst kısmında ise doğum günü ekle butonu bulunmaktadır.
     
 ![1](https://user-images.githubusercontent.com/65369334/88481771-04101c80-cf66-11ea-8809-39bec10305ea.png)
 
 - Doğum Günü Ekle Butonu
    - Butona tıklanıldığı zaman bir pencere açılmaktadır. Pencerenin sağ üst kısmında pencereyi kapatma iconu bulunmaktadır. Aynı zamanda ESC tuşu ile de kapanmaktadır. Pencere     içerisinde doğum tarihi,isim ve kaç yıl kaydedilmek istendiği bilgisi alınmaktadır(Default değer 1'dir).
    
 ![2](https://user-images.githubusercontent.com/65369334/88482130-112e0b00-cf68-11ea-8770-a84608fd1dac.png)
 
 (5 yıl kaydedilmesi istendiği için ileri yıllar için de listeye eklenmiştir.)
 ![3](https://user-images.githubusercontent.com/65369334/88482147-2c991600-cf68-11ea-8aa0-50353849a095.png)

 - Kayıtlar Yanında Bulunan Güncelleme ve Silme Butonu
    - Tıklanıldığı zaman güncelleme penceresi açılmakta ve ilgili kayıt için veriler çekilmektedir. Herhangi bir değişiklik yapılıp onaylandığı zaman kayıt güncellenmektedir.       Silme butonu da aynı şekilde kaydı silmektedir. 
    
 ![4](https://user-images.githubusercontent.com/65369334/88482184-61a56880-cf68-11ea-8676-cff181525e54.png)
 
 (Güncelleme esnasında tarih değiştiği için tablosu değişmiştir.)
 ![5](https://user-images.githubusercontent.com/65369334/88482246-bf39b500-cf68-11ea-8b63-34f86cd1d211.png)
 
 - Sol Menüden ulaşılan 'Takvim Görünümü' sayfası
    - Eklenilen kayıtlar takvim üzerinde de ilgili tarihte görüntülenmektedir. Tablolar için yaptığımız zamanına göre renklendirmeler burada da aynı şekilde uyumludur.
    
 ![6](https://user-images.githubusercontent.com/65369334/88482264-dbd5ed00-cf68-11ea-83f4-a326fbcd0a95.png)
 
 - Takvimde herhangi bir güne tıklanıldığında açılan kayıt penceresi
    - Herhangi bir günün üstüne basıldığı zaman o gün için bir kayıt penceresi açılmaktadır. Seçilen tarih belli olduğu için tarih hariç diğer bilgiler alınmaktadır.
 
 (31 Temmuz 2020 tarihine tıklanılmıştır.)
 ![7](https://user-images.githubusercontent.com/65369334/88482407-c44b3400-cf69-11ea-8e2b-9fec3aa4b095.png)
 
 (Kayıt ilgili tarih için başarılı bir şekilde yapılmıştır.)
 ![8](https://user-images.githubusercontent.com/65369334/88482413-c7462480-cf69-11ea-819a-f5ada2752d33.png)
 
 - Takvimde bulunan herhangi bir kayıt üstüne tıklanıldığında açılan detaylar penceresi
    - Herhangi bir kayıt üzerine tıklanıldığı zaman o kayıt ile ilgili detaylar bir pencere üzerinde listelenmektedir.
    
  ![9](https://user-images.githubusercontent.com/65369334/88482481-18561880-cf6a-11ea-98ff-8ed5325fe0a4.png)
