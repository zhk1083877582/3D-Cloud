
/*! yandong/m ydong@staff.hexun.com start*/
var ua=navigator.userAgent.toLowerCase(),
device={
    os:{
    version:0,isiOS:ua.indexOf("iphone")>-1||ua.indexOf("ipad")>-1||ua.indexOf("ios")>-1,
    isAndroid:ua.indexOf("android")>-1||ua.indexOf("adr")>-1||ua.indexOf("linux;")>-1},
    browser:{version:0,isQQ:ua.indexOf("qq/")>-1,
    isqqbrowser:ua.indexOf("mqqbrowser/")>-1,
    isUC:ua.indexOf("ucbrowser/")>-1,
    isWechat:ua.indexOf("micromessenger/")>-1,
    isSamsung:ua.indexOf("samsungbrowser/")>-1,
    isSogou:ua.indexOf("sogoumobilebrowser/")>-1,
    isPinganWifi:ua.indexOf("pawifi")>-1,
    isChrome:ua.indexOf("chrome")>-1,
    isOpera:ua.indexOf("opera")>-1||ua.indexOf("opr")>-1,
    isFirefox:ua.indexOf("firefox")>-1||ua.indexOf("fxios")>-1,
    isBaiduboxapp:ua.indexOf("baiduboxapp/")>-1,
    isBaidubrowser:ua.indexOf("baidubrowser/")>-1,
    isQihoobrowser:ua.indexOf("qihoobrowser/")>-1,
    isMxios:ua.indexOf("mxios/")>-1,
    isTimMobile:ua.indexOf("tim/")>-1,
    isHXApp:ua.indexOf("hxappversion")>-1||ua.indexOf("hxapp")>-1
   }
};
device.browser.isSafari=device.os.isiOS&&ua.indexOf("safari/")>-1&&!device.browser.isqqbrowser,
device.browser.isIApp=device.os.isiOS&&!device.browser.isSafari&&!device.browser.isqqbrowser&&!device.browser.isUC&&!device.browser.isWechat&&!device.browser.isSamsung&&!device.browser.isSogou&&!device.browser.isPinganWifi,
function(a,b){
    var c=device.browser.isWechat,d=device.os.isiOS,
    e=device.browser.isQQ;
    b.extend(
        a.pageFn=a.pageFn?a.pageFn:{},
        {
            gotoapp:function(a,c){
                var d=this;
                return b("."+a).on("click",function(){return d.trggleClick(a,c),!1}),
                    b(".iconred").on("click",function(){return b(".serchalert").hide(),!1}),this
            },
            createNewUrl:function(a){
                var b;
                if(a){
                  a.id&&a.title?b=this.baseArticle:a.cid?b=this.baseChannel:a.url&&(b=this.baseLinks);
                  for(var c in a)b=b+c+"="+encodeURIComponent(a[c])+"&";b=b.substring(0,b.length-1)
                }else b=this.baseList;return b
            },
            gotoappFn:function(){
                var a=navigator.userAgent.toLowerCase(),
                b=a.indexOf("iphone")>-1||a.indexOf("ipad")>-1||a.indexOf("ios")>-1,
                c=a.indexOf("android")>-1||a.indexOf("adr")>-1||a.indexOf("linux;")>-1,
                d=a.indexOf("chrome")>-1,
                e=function(){
                    var a;
                    return function(){
                        return a?a:(a=document.createElement("iframe"),
                               a.style.display="none",
                               document.body.appendChild(a),
                               a)
                            }
                }(),
                f="hxnews://com.hx/news/newsDetail?",
                g="hxnews://",
                h=function(a,b){
                    var c=f;
                    if(a){
                        for(var d in a)c=c+d+"="+encodeURIComponent(a[d])+"&";
                        c=c.substring(0,c.length-1)
                    }
                    else c=g;
                    return c
                };
                return{
                    openApp:function(a,f){
                        var g=h(f),
                        i=e();
                        b
                        ?(window.location.href=g,setTimeout(function(){window.location.href=a},3e3))
                        :c
                         ?(d?window.location.href=g:i.src=g,setTimeout(function(){window.location.href=a},3e3))
                         :(i.src=g,setTimeout(function(){window.location.href=a},3e3))
                    }
                }
            },
            gotoappNew:function(a){return window.location.href=a,this},
            downloadurl:function(a){
                "openappindex"===a&&"undefined"!=typeof adhoc&&adhoc("track","clickItem",1);
                var b=navigator.userAgent.toLowerCase(),
                c=b.indexOf("micromessenger/")>-1,
                d=b.indexOf("iphone")>-1||b.indexOf("ipad")>-1||b.indexOf("ios")>-1,
                e=b.indexOf("qq/")>-1;
                return setTimeout(function(){
                    d
                    ?c||e
                      ?window.location.href=window.downloadurl.isWeixin[a]
                      :window.location.href="https://itunes.apple.com/cn/app/id424170160?mt=8"
                    :c||e
                      ?window.location.href=window.downloadurl.android_weixin[a]
                      :window.location.href=window.downloadurl.other[a]
                    },200),
            this},
            trggleClick:function(c,d){
                console.log(d);
                if(this.baseArticle="hxnews://com.hx/news/newsDetail?",this.baseChannel="hxnews://com.hx/news/channelList?",this.baseLinks="hxnews://com.hx/news/newsHyperLink?",this.baseList="hxnews://","appjx"===c)
                {
                    var e=b("."+c).find("a"),
                    f=d&&d.id?d.id:e.attr("id"),
                    g=d&&d.title?d.title:e.html(),
                    h=d&&d.url?d.url:e.attr("href");
                    e&&f&&g&&h&&(d={id:f,title:g,url:h})
                }else(d&&!d.cid||!d)&&a._article&&(d=b.extend(d||{},{id:a._article.id,title:a._article.title}));this.gotoNewPage(c,d)
            },
            gotoNewPage:function(a,b){
                console.log(b);
                var f=this;if(c||e)
                if(d){
                    var g=b&&b.id,h=b&&b.title,i=b&&b.cid,j=b&&b.url||"",
                    k="";
                    k=g&&h
                      ?"//img.hexun.com/2016/m/mtoapp/201807181423/html/downloadindex.0.0.1.html?u="+encodeURIComponent((j
                        ?j
                        :window.location.href)+"&id="+g+"&title="+h)
                      :i
                        ?"//img.hexun.com/2016/m/mtoapp/201807181423/html/downloadindex.0.0.1.html?u="+encodeURIComponent((j
                         ?j
                         :window.location.href)+"&cid="+i)
                        :"//img.hexun.com/2016/m/mtoapp/201807181423/html/downloadindex.0.0.1.html?u="+encodeURIComponent(j
                          ?j
                          :window.location.href),
                     window.location.href=k
                }else{
                    var l=window.downloadurl.android_weixin[a]+"&android_schema=",j="";
                    b?(b.from="鍒嗕韩鍞よ捣",j=f.createNewUrl(b))
                    :j=f.createNewUrl(),window.location.href=l+encodeURIComponent(j)
                }
                else this.downloadurl(a)
            }
        }
    ),
    pageFn.gotoapp("downloadapp2"),
    // pageFn.gotoapp("openapp_alert"),
    // pageFn.gotoapp("openappindex"),
    // pageFn.gotoapp("downloadapp1"),
    // pageFn.gotoapp("downloadapp3"),
    // pageFn.gotoapp("downloadapp4"),
    // pageFn.gotoapp("hotnewsbtn1"),
    // pageFn.gotoapp("viewbpointbtn1")
}(window,jQuery);
