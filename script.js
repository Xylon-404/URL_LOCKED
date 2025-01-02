check_for_unlock();
document.getElementById("url_display_id").style.display="none";

var url = document.getElementById("url");
var url_key = document.getElementById("url_key");

document.getElementById("lock_btn").addEventListener("click", encrypt, false);

function encrypt(){
    if(url.value == '' || url_key.value == ''){
        alert('URL or KEY should not be empty!')
    }
    else{
    var EncryptED = CryptoJS.AES.encrypt(url.value, url_key.value);
    var url_hash = EncryptED.toString().replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l');
    var locked_url = "https://url-locker.vercel.app/?hash="+url_hash;
    document.getElementById("lock_div_id").style.display="none";
    document.getElementById("url_display_id").style.display="block";
    document.getElementById("locked_url").innerHTML=locked_url;
    document.getElementById("copy_btn").addEventListener("click", copy, false);
    function copy(){
        var copyText = document.getElementById("locked_url");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.getSelection().removeAllRanges();
        navigator.clipboard.writeText(copyText.value);
    }
    document.getElementById("lurl_qr").src="https://api.qrserver.com/v1/create-qr-code/?data="+locked_url;
    }
}

function check_for_unlock(){
    const urlvalues = window.location.search;

    const urlparams = new URLSearchParams(urlvalues);
    
    const lurl_hash = urlparams.get('hash');
    
    if(lurl_hash != null){
        document.getElementById("lock_div_id").style.display="none";
        document.getElementById("unlock_div_id").style.display="block";
    }
    else{
        document.getElementById("lock_div_id").style.display="block";
        document.getElementById("unlock_div_id").style.display="none";
    }
}

document.getElementById("unlock_btn").addEventListener("click", unlock, false);

function unlock(){
    const urlvalues = window.location.search;

    const urlparams = new URLSearchParams(urlvalues);
    
    const lurl_hash = urlparams.get('hash').toString().replace(/p1L2u3S/g, '+').replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');
    
    if(lurl_hash != null){
    
        console.log("Hash: " + lurl_hash);

        var lurl_key = document.getElementById("lurl_key");
        try{
            var DecryptED = CryptoJS.AES.decrypt(lurl_hash, lurl_key.value);
            if (DecryptED.toString(CryptoJS.enc.Utf8).length > 0) {
                var unlocked_url = DecryptED.toString(CryptoJS.enc.Utf8);
                console.log(unlocked_url)
                window.location.replace(unlocked_url);
            } else {
                alert("URL or KEY is incorrect!");
            }
        }
        catch(e){
            alert("URL or KEY is incorrect!");
        }
    }
}






