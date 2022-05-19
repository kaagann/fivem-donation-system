const Config = {
    endpoint: "http://195.85.201.110:5000/",
    serverId: "404925294396732416",
}

const RulesTexts = {
    HIZMET_KULLANIM: {
        title: "Hizmet ve Kullanım Sözleşmesi",
        description: "İşbu sözleşmenin konusu, ALICI’nın SATICI’ya ait earthrp.store internet sitesinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış ücreti belirtilen ürünün satışı ve teslimi ile ilgili olarak 4077 sayılı Tüketicilerin Korunması Hakkındaki Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır. Alıcı, satıcının isim, unvan, açık adres, telefon ve diğer erişim bilgileri satışa konu malın temel nitelikleri, vergiler dahil olmak üzere satış fiyatı, ödeme sekli, teslimat koşulları ve masrafları vs. satışa konu mal ile ilgili tüm ön bilgiler ve “cayma” hakkının kullanılması ve bu hakkın nasıl kullanılacağı, şikayet ve itirazlarını iletebilecekleri resmi makamlar vs. konusunda açık, anlaşılır ve internet ortamına uygun şekilde satıcı tarafından bilgilendirildiğini, bu ön bilgileri elektronik ortamda teyit ettiğini ve sonrasında mal sipariş verdiğini is bu sözleşme hükümlerince kabul ve beyan eder. rapixel.net sitesinde yer alan ön bilgilendirme ve alıcı tarafından verilen sipariş üzerine düzenlenen fatura is bu sözleşmenin ayrılmaz parçalarıdır."
    },
    GIZLILIK: {
        title: "Gizlilik Politikası",
        description: "İşbu sözleşmenin konusu, ALICI’nın SATICI’ya ait earthrp.store internet sitesinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış ücreti belirtilen ürünün satışı ve teslimi ile ilgili olarak 4077 sayılı Tüketicilerin Korunması Hakkındaki Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır. Alıcı, satıcının isim, unvan, açık adres, telefon ve diğer erişim bilgileri satışa konu malın temel nitelikleri, vergiler dahil olmak üzere satış fiyatı, ödeme sekli, teslimat koşulları ve masrafları vs. satışa konu mal ile ilgili tüm ön bilgiler ve “cayma” hakkının kullanılması ve bu hakkın nasıl kullanılacağı, şikayet ve itirazlarını iletebilecekleri resmi makamlar vs. konusunda açık, anlaşılır ve internet ortamına uygun şekilde satıcı tarafından bilgilendirildiğini, bu ön bilgileri elektronik ortamda teyit ettiğini ve sonrasında mal sipariş verdiğini is bu sözleşme hükümlerince kabul ve beyan eder. rapixel.net sitesinde yer alan ön bilgilendirme ve alıcı tarafından verilen sipariş üzerine düzenlenen fatura is bu sözleşmenin ayrılmaz parçalarıdır."
    },
    IADE: {
        title: "Iade Koşulları",
        description: "İşbu sözleşmenin konusu, ALICI’nın SATICI’ya ait earthrp.store internet sitesinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış ücreti belirtilen ürünün satışı ve teslimi ile ilgili olarak 4077 sayılı Tüketicilerin Korunması Hakkındaki Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır. Alıcı, satıcının isim, unvan, açık adres, telefon ve diğer erişim bilgileri satışa konu malın temel nitelikleri, vergiler dahil olmak üzere satış fiyatı, ödeme sekli, teslimat koşulları ve masrafları vs. satışa konu mal ile ilgili tüm ön bilgiler ve “cayma” hakkının kullanılması ve bu hakkın nasıl kullanılacağı, şikayet ve itirazlarını iletebilecekleri resmi makamlar vs. konusunda açık, anlaşılır ve internet ortamına uygun şekilde satıcı tarafından bilgilendirildiğini, bu ön bilgileri elektronik ortamda teyit ettiğini ve sonrasında mal sipariş verdiğini is bu sözleşme hükümlerince kabul ve beyan eder. rapixel.net sitesinde yer alan ön bilgilendirme ve alıcı tarafından verilen sipariş üzerine düzenlenen fatura is bu sözleşmenin ayrılmaz parçalarıdır."
    },
}

function formatMoney(amount){
    if (amount == undefined || amount == null || amount == "" ) return 0;
    return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

const jobs = {
    ["unemployed"]: "İşsiz",
    ["police"]: "Polis",
}


function formatJobs(job) {
    if (!jobs[job]) return "Bilinmiyor";
    return jobs[job];
}


export {RulesTexts, formatMoney, formatJobs};
export default Config;