<?php
    $username='ea86315bb226faba980da9e1d04d6960';
    $key='3d64768ef6f32ab690af61abdb7ad500';
    $serverId = 384983217335602176;

    // //Gelmesi gereken veriler kontrol edilir.

    if (!( (isset($_POST['res'])) && (isset($_POST['hash'])))) {
        echo "missing parameter";
        die();
    }

    //Özet kontrolü yapılır.

    $hash=hash_hmac('sha256',$_POST['res'].$username,$key,false);
    if (strcmp($hash,$_POST['hash'])!=0) {
        die();
    }

    //Veriler alınır.

    $json_result=base64_decode($_POST['res']);
    $array_result=json_decode($json_result,true);

    //Verilerle ilgili yapmanız gereken işlemleri yapınız.
    //Bildirim çeşitli ağ sorunları nedeni ile birden fazla kez gelebilir.
    //İlk olarak orderid parametresini kullanıp siparişin işlenme durumunu kontrol ediniz.


    $email=$array_result['email'];
    $orderid=$array_result['orderid'];
    $currency=$array_result['currency']; // 0..TL, 1..USD, 2...EUR
    $price=$array_result['price'];
    $buyername=$array_result['buyername'];
    $buyersurname=$array_result['buyersurname'];
    $productcount=$array_result['productcount'];
    $productid=$array_result['productid'];
    $customernote=$array_result['customernote']; //Müşterinizin siparişte doldurduğu not alanı
    $istest=$array_result['istest']; //0..canlı, 1..test



    echo "success";

    //
    // A very simple PHP example that sends a HTTP POST to a remote site
    //

    //belki burda bir hata vardır 1 sn

    $url = "http://185.250.241.83:5000/payment/";

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    
    $headers = array(
       "Accept: application/json",
       "Content-Type: application/json",
    );
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    
    $data = json_encode([
        "amount" => $price,
        "pmail" => $email,
        "serverId" => $serverId
    ]);
    
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    
    //for debug only!
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    
    $resp = curl_exec($curl);
    curl_close($curl);
    var_dump($resp);
    
    ?>

    


?>