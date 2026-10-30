var KARIMA="201020956352";                          // رقم مس كريمة بصيغة دولية بدون +
var API="https://sheetdb.io/api/v1/l5bu05bnss7oe";  // رابط SheetDB
var CHAT_API="https://rapid-wildflower-d6e4.msrybsmlh.workers.dev";                                    // رابط الـ Worker بتاع Gemini (شوفي الملف gemini-worker.js)
var SCHOOL_URL="https://elmasryfathy774-bit.github.io/System/";
var SPRIX_URL="https://sprixportal.jp/";
var LIB_URL="http://studentbooks.moe.gov.eg/";
var pages=[["home","الرئيسية","home"],["chat","المساعد","chat"],["books","بنك الكتب","book"],["platforms","المنصات","globe"],["translate","الترجمة","lang"],["lost-found","المفقودات","search"],["study-share","الملخصات","file"],["leaderboard","لوحة الشرف","trophy"],["suggestions","المقترحات","mail"]];
var FAQ={
"عن المدرسة":[["مين مديرة المدرسة؟","مديرة المدرسة هي مس مروة أمين."],["مين وكيلة المدرسة؟","وكيلة المدرسة هي مس أسماء يحيي."],["المدرسة فين؟","مدرسة دكتور أحمد زويل في الحي 15 بمدينة العاشر من رمضان."],["فين معمل الكمبيوتر والمكتبة؟","معمل الكمبيوتر والمكتبة في الطابق الثاني."],["مين مس كريمة؟","مس كريمة هي اللي بتنسّق استلام وتسليم الكتب الخارجية والمفقودات على واتساب، وبسرية تامة."],["مواعيد الامتحانات إمتى؟","معنديش جدول الامتحانات. راجعي لوحة إعلانات المدرسة أو اسألي المعلمة."]],
"المذاكرة":[["إزاي أنظم وقتي؟","قسّمي يومك لفترات: ٤٥ دقيقة مذاكرة و١٠ دقايق راحة. ابدأي بالمادة الأصعب وإنتي نشيطة، واكتبي جدول أسبوعي بسيط فيه وقت للراحة والنوم."],["إزاي أذاكر للامتحان؟","راجعي الملخصات بدل ما تقري المنهج كله من الأول، وحلّي أسئلة وامتحانات السنين اللي فاتت. وقبل الامتحان نامي كويس."],["إزاي أركز وأنا بذاكر؟","ذاكري في مكان هادي وسيبي الموبايل بعيد. اشتغلي ٢٥ دقيقة وريّحي ٥ دقايق، واشربي مياه."],["محتاجة ملخصات","روحي لصفحة «الملخصات» في الموقع، هتلاقي ملخصات زميلاتك، وتقدري تنشري ملخصك كمان."]],
"عن الموقع":[["إزاي أطلب كتاب خارجي؟","روحي لصفحة «بنك الكتب» واضغطي «طلب الكتاب» جنب الكتاب. هيفتح واتساب مع مس كريمة بسرية تامة وبدون أي إحراج."],["إزاي أتبرع بكتاب؟","في صفحة «بنك الكتب» املي بيانات الكتاب واضغطي «أتبرع بالكتاب». ولو كتبتي اسمك الأول هتظهري في لوحة الشرف."],["ضاع مني حاجة أعمل إيه؟","روحي لصفحة «المفقودات» وسجّلي وصف الشيء. ومس كريمة هتساعدك في استلامه."],["إزاي أبعت اقتراح بدون اسم؟","من صفحة «المقترحات» اكتبي رسالتك واضغطي إرسال. اسمك مش بيتسجل خالص."]]
};
var chatHist=[];

function ic(n){return '<svg class="ic"><use href="#i-'+n+'"/></svg>'}
function esc(s){var d=document.createElement("div");d.textContent=s==null?"":s;return d.innerHTML}
function wa(t){return "https://wa.me/"+KARIMA+"?text="+encodeURIComponent(t)}
function get(s){return fetch(API+"?sheet="+s).then(function(r){if(!r.ok)throw 0;return r.json()})}
function post(s,row){return fetch(API+"?sheet="+s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({data:[row]})}).then(function(r){if(!r.ok)throw 0})}
function today(){return new Date().toISOString().slice(0,10)}
function app(h){document.getElementById("app").innerHTML=h}
function $(i){return document.getElementById(i)}
function empty(i,t){return '<div class="empty">'+ic(i)+'<p>'+t+'</p></div>'}
var err='<p class="note">مش قادرة أوصل لجدول البيانات دلوقتي. اتأكدي إن الموقع مرفوع على استضافة وإن الإنترنت شغال.</p>';

var V={
home:function(){var d={chat:"اسألي أي سؤال عن المدرسة والمذاكرة","books":"شوفي الكتب المتاحة وتبرعي بكتبك",platforms:"اسبريكس والمكتبة الإلكترونية",translate:"ترجمي أي كلمة أو جملة فورًا","lost-found":"ضاع منكِ حاجة أو لقيتي حاجة","study-share":"ملخصات وكشاكيل زميلاتك","leaderboard":"سفيرات الخير","suggestions":"رأيك بدون اسم"};
 app('<h2>تحبي تروحي فين؟</h2><div class="grid">'+pages.slice(1).map(function(p,i){return '<a class="tile'+(p[0]==="chat"?' wide':'')+'" style="animation-delay:'+i*.06+'s" href="#'+p[0]+'"><div class="bx">'+ic(p[2])+'</div><b>'+(p[0]==="chat"?"المساعد الذكي":p[1])+'</b><span>'+d[p[0]]+'</span></a>'}).join("")+'</div>')},

chat:function(){
 app('<h2>المساعد الذكي</h2><p class="sub">اختاري موضوع وسؤال وأنا أجاوبك.</p><div class="chat" id="ch"></div><div class="chips" id="cc"></div><div class="cbar"><input id="ci" placeholder="أو اكتبي سؤالك هنا" autocomplete="off"><button class="btn" id="cs" aria-label="إرسال">'+ic("send")+'</button></div>');
 function add(t,w){var b=document.createElement("div");b.className="bub "+w;b.textContent=t;$("ch").appendChild(b);return b}
 function chip(t,f){var c=document.createElement("button");c.className="chip";c.textContent=t;c.onclick=f;$("cc").appendChild(c)}
 function end(){$("cc").scrollIntoView({block:"end"})}
 function menu(){$("cc").innerHTML="";Object.keys(FAQ).forEach(function(k){chip(k,function(){add(k,"me");add("تمام، اختاري السؤال اللي عايزاه:","bot");qs(k)})});end()}
 function qs(k){$("cc").innerHTML="";FAQ[k].forEach(function(x){chip(x[0],function(){add(x[0],"me");add(x[1],"bot");qs(k)})});chip("رجوع للمواضيع",function(){menu()});end()}
 add("مرحباً بكِ يا صديقتي، أنا شات بوت مساعد ذكي، تم تصميمي من مدرسة دكتور أحمد زويل. اختاري موضوع من تحت وأنا أجاوبك.","bot");menu();
 function send(){var i=$("ci"),t=i.value.trim();if(!t)return;i.value="";add(t,"me");
  if(!CHAT_API){add("اختاري سؤال من الأزرار اللي تحت.","bot");end();return}
  var w=add("...","bot");end();
  fetch(CHAT_API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:t,history:chatHist.slice(-10)})}).then(function(r){return r.json()}).then(function(d){var r=d.reply||"معلش، حصلت مشكلة. جرّبي تاني.";w.textContent=r;chatHist.push({role:"user",text:t},{role:"model",text:r});end()}).catch(function(){w.textContent="معلش، مقدرتش أرد دلوقتي. اختاري سؤال من الأزرار.";end()})}
 $("cs").onclick=send;$("ci").onkeydown=function(e){if(e.key==="Enter")send()}},

platforms:function(){
 function pt(u,ico,name,desc,bg,cls){return '<a class="ptile'+(cls||"")+'" href="'+u+'" target="_blank" rel="noopener noreferrer" aria-label="فتح '+name+'"><div class="pi" style="background:'+bg+'">'+ic(ico)+'</div><div><b>'+name+'</b><span class="d">'+desc+'</span></div><span class="go">'+ic("ext")+'</span></a>'}
 app('<h2>المنصات التعليمية</h2><p class="sub">اضغطي على المنصة وهتفتحلك مباشرة.</p>'
  +'<div class="sec">منصتنا</div>'+pt(SCHOOL_URL,"school","منصة المدرسة","نظام المدرسة الذكي في مكان واحد","linear-gradient(135deg,#6c3fd1,#ff6fa5)"," school")
  +'<div class="sec">المنصة التعليمية</div>'+pt(SPRIX_URL,"layers","اسبريكس","بوابة اسبريكس التعليمية","rgba(255,255,255,.22)"," feat")
  +'<div class="sec">مصادر أخرى</div>'
  +pt(LIB_URL,"lib","المكتبة الإلكترونية","كتب الطالب الرسمية من وزارة التربية والتعليم","linear-gradient(135deg,#18b394,#0f8f77)"))},

translate:function(){
 var L=[["ar","العربية"],["en","English"],["fr","Français"],["de","Deutsch"],["es","Español"],["it","Italiano"],["tr","Türkçe"],["ru","Русский"],["zh-CN","中文"],["ja","日本語"]];
 var o=function(s){return L.map(function(x){return '<option value="'+x[0]+'"'+(x[0]===s?' selected':'')+'>'+x[1]+'</option>'}).join("")};
 app('<h2>المترجم</h2><p class="sub">اكتبي النص واختاري اللغات وهترجمهولك.</p><div class="card col"><div class="tr"><div><label for="tf">من</label><select id="tf"><option value="auto" selected>تلقائي (اكتشاف اللغة)</option>'+o("")+'</select></div><button class="tbtn" id="tw" type="button" aria-label="عكس اللغتين">'+ic("swap")+'</button><div><label for="tt">إلى</label><select id="tt">'+o("ar")+'</select></div></div><label for="tx" style="display:block;margin-top:10px">النص</label><textarea id="tx" rows="4" maxlength="500" dir="auto" placeholder="اكتبي هنا..."></textarea><div class="cc2"><span id="tn">0</span>/500</div><button class="btn" id="tg">ترجمة</button></div><div class="card col"><div class="m">الترجمة</div><div class="out" id="to" dir="auto" aria-live="polite">—</div><div class="acts"><button class="btn alt" id="tcp">'+ic("copy")+'نسخ</button><button class="btn alt" id="tsp">'+ic("speak")+'استماع</button></div><p class="msg" id="tm"></p></div>');
 $("tx").oninput=function(){$("tn").textContent=this.value.length};
 $("tw").onclick=function(){var a=$("tf").value;if(a==="auto")a=window.dl||"en";if(!$("tt").querySelector('option[value="'+a+'"]'))a="en";$("tf").value=$("tt").value;$("tt").value=a;var t=$("to").textContent;if(t&&t!=="—"&&t!=="جاري الترجمة..."){$("tx").value=t;$("tn").textContent=t.length;$("to").textContent="—"}};
 $("tg").onclick=function(){var q=$("tx").value.trim(),m=$("tm");m.textContent="";if(!q)return;var f=$("tf").value,t=$("tt").value;
  if(f===t){$("to").textContent=q;return}
  $("to").textContent="جاري الترجمة...";
  fetch("https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl="+encodeURIComponent(f)+"&tl="+encodeURIComponent(t)+"&q="+encodeURIComponent(q)).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){
   var s=d[0].map(function(x){return x[0]||""}).join("");if(!s)throw 0;window.dl=d[2];$("to").textContent=s}).catch(function(){
   fetch("https://api.mymemory.translated.net/get?q="+encodeURIComponent(q)+"&langpair="+encodeURIComponent((f==="auto"?"en":f)+"|"+t)).then(function(r){return r.json()}).then(function(d){
    if(String(d.responseStatus)!=="200"||!d.responseData)throw 0;$("to").textContent=d.responseData.translatedText}).catch(function(){$("to").textContent="—";m.textContent="مقدرتش أترجم دلوقتي. اتأكدي من الإنترنت وجرّبي تاني."})})};
 $("tcp").onclick=function(){var t=$("to").textContent;if(!t||t==="—")return;var m=$("tm");(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){m.textContent="تم النسخ."}).catch(function(){m.textContent="مقدرتش أنسخ، حدّديه وانسخيه بإيدك."})};
 $("tsp").onclick=function(){var t=$("to").textContent;if(!t||t==="—"||!window.speechSynthesis)return;var u=new SpeechSynthesisUtterance(t);u.lang=$("tt").value;speechSynthesis.cancel();speechSynthesis.speak(u)}},

books:function(){
 app('<h2>بنك الكتب الخارجية</h2><p class="sub">اختاري الكتاب، ومس كريمة هتنسّق الاستلام بسرية تامة.</p><div id="bl"><p class="m">جاري التحميل...</p></div><div class="card col"><div class="t">عندك كتاب من السنة اللي فاتت؟</div><label for="bt">اسم الكتاب</label><input id="bt" placeholder="مثال: كتاب الامتحان - عربي"><label for="bg">الصف</label><select id="bg"><option>سنة أولى</option><option>سنة ثانية</option><option>سنة ثالثة</option></select><label for="bd">اسمك الأول (اختياري، علشان تظهري في لوحة الشرف)</label><input id="bd"><button class="btn" id="badd">أتبرع بالكتاب</button><p class="msg" id="bm"></p></div>');
 get("books").then(function(rows){var g={};rows.forEach(function(r){if(!r.title||r.status==="taken")return;var k=r.title+"|"+(r.grade||"");g[k]=g[k]||{t:r.title,gr:r.grade,n:0};g[k].n++});
  var ks=Object.keys(g);$("bl").innerHTML=ks.length?ks.map(function(k){var b=g[k];return '<div class="card"><div><div class="t">'+esc(b.t)+'</div><div class="m">'+esc(b.gr)+' · <span class="cnt">متاح '+b.n+'</span></div></div><a class="btn" target="_blank" rel="noopener" href="'+wa("السلام عليكم يا مس كريمة 🌸\nأنا عايزة أطلب كتاب:\n📘 "+b.t+"\nممكن ننسّق الاستلام؟ شكراً ليكي 💜")+'">طلب الكتاب</a></div>'}).join(""):empty("book","لسه مفيش كتب. كوني أول من يتبرع.")}).catch(function(){$("bl").innerHTML=err});
 $("badd").onclick=function(){var t=$("bt").value.trim(),m=$("bm");if(!t){m.textContent="اكتبي اسم الكتاب الأول.";return}var gr=$("bg").value;
  window.open(wa("السلام عليكم يا مس كريمة 🌸\nأنا عايزة أتبرع بكتاب:\n📘 الكتاب: "+t+"\n🎓 الصف: "+gr+"\nممكن ننسّق الاستلام؟ شكراً ليكي 💜"),"_blank");
  post("books",{title:t,grade:gr,status:"available",added:today(),donor:$("bd").value.trim()}).then(function(){m.textContent="شكراً يا سفيرة الخير! كمّلي مع مس كريمة على واتساب.";setTimeout(V.books,1500)}).catch(function(){m.textContent="فتحنالك واتساب مع مس كريمة. كمّلي معاها هناك."})}},

"lost-found":function(){
 app('<h2>سوق المفقودات</h2><p class="sub">سجّلي مواصفات الشيء، ومس كريمة هتساعدك في استلامه.</p><div class="card col"><label for="lk">النوع</label><select id="lk"><option>ضاع مني</option><option>لقيته</option></select><label for="lt">الوصف</label><input id="lt" placeholder="مثال: مقلمة زرقاء"><button class="btn" id="ladd">إضافة</button></div><div id="ll"><p class="m">جاري التحميل...</p></div>');
 get("lost").then(function(r){r=r.filter(function(x){return x.desc}).reverse();$("ll").innerHTML=r.length?r.map(function(x){return '<div class="card"><div><span class="badge">'+esc(x.type)+'</span><div class="t">'+esc(x.desc)+'</div></div><a class="btn alt" target="_blank" rel="noopener" href="'+wa("السلام عليكم يا مس كريمة 🌸\nأنا شوفت إعلان في المفقودات وعايزة أسأل عنه:\n🔎 "+x.desc+"\nشكراً ليكي 💜")+'">مس كريمة</a></div>'}).join(""):empty("search","مفيش مفقودات دلوقتي.")}).catch(function(){$("ll").innerHTML=err});
 $("ladd").onclick=function(){var v=$("lt").value.trim();if(!v)return;var k=$("lk").value;window.open(wa("السلام عليكم يا مس كريمة 🌸\n"+(k==="لقيته"?"أنا لقيت حاجة وعايزة أسلّمها لصاحبتها:":"أنا ضاع مني حاجة:")+"\n🔎 "+v+"\n"+(k==="لقيته"?"ممكن ننسّق التسليم؟":"ممكن تساعديني ألاقيها؟")+" شكراً ليكي 💜"),"_blank");post("lost",{type:k,desc:v,date:today()}).then(V["lost-found"]).catch(function(){})}},

"study-share":function(){
 app('<h2>بنك الملخصات والملزمات</h2><p class="sub">ارفعي الملخص على جوجل درايف وانشري رابطه هنا.</p><div class="card col"><label for="ut">عنوان الملخص</label><input id="ut"><label for="us">المادة</label><select id="us"><option>عربي</option><option>إنجليزي</option><option>رياضيات</option><option>علوم</option><option>دراسات</option><option>أخرى</option></select><label for="ul">رابط الملف (يبدأ بـ https)</label><input id="ul" type="url" dir="ltr"><button class="btn" id="uadd">نشر الملخص</button><p class="msg" id="um"></p></div><div id="ml"><p class="m">جاري التحميل...</p></div>');
 get("summaries").then(function(r){r=r.filter(function(x){return x.title&&/^https:\/\//.test(x.link||"")}).reverse();$("ml").innerHTML=r.length?r.map(function(x){return '<div class="card"><div><div class="t">'+esc(x.title)+'</div><div class="m">'+esc(x.subject)+'</div></div><a class="btn" target="_blank" rel="noopener noreferrer" href="'+esc(x.link)+'">فتح</a></div>'}).join(""):empty("file","لسه مفيش ملخصات. انشري أول ملخص.")}).catch(function(){$("ml").innerHTML=err});
 $("uadd").onclick=function(){var t=$("ut").value.trim(),l=$("ul").value.trim(),m=$("um");if(!t||!/^https:\/\//.test(l)){m.textContent="اكتبي العنوان ورابط صحيح يبدأ بـ https.";return}
  post("summaries",{title:t,subject:$("us").value,link:l,date:today()}).then(function(){V["study-share"]()}).catch(function(){m.textContent="حصلت مشكلة، جرّبي تاني."})}},

leaderboard:function(){
 app('<h2>لوحة الشرف الرقمية</h2><p class="sub">سفيرات الخير حسب عدد الكتب المتبرع بها (١٠ نقاط لكل كتاب).</p><div id="lb"><p class="m">جاري التحميل...</p></div>');
 get("books").then(function(rows){var c={};rows.forEach(function(r){var n=(r.donor||"").trim();if(n)c[n]=(c[n]||0)+1});
  var a=Object.keys(c).sort(function(x,y){return c[y]-c[x]}).slice(0,10);
  $("lb").innerHTML=a.length?a.map(function(n,i){return '<div class="card"><div class="rk"><div class="rank">'+(i+1)+'</div><div><div class="t">'+esc(n)+'</div><div class="m">'+c[n]*10+' نقطة تميز</div></div></div>'+(i===0?'<span class="badge">سفيرة الخير</span>':'')+'</div>'}).join(""):empty("trophy","لسه مفيش ترتيب. تبرعي بكتاب واكتبي اسمك، وهتظهري هنا.")}).catch(function(){$("lb").innerHTML=err})},

suggestions:function(){app('<h2>صندوق المقترحات السري</h2><p class="sub">اسمك مش بيتسجل خالص.</p><div class="card col"><label for="st">رسالتك</label><textarea id="st" rows="5"></textarea><button class="btn" id="ss">إرسال</button><p class="msg" id="sm"></p></div>');
 $("ss").onclick=function(){var t=$("st").value.trim();if(!t)return;post("suggestions",{text:t,date:today()}).then(function(){$("st").value="";$("sm").textContent="وصلت رسالتك، شكراً يا صديقتي."}).catch(function(){$("sm").textContent="حصلت مشكلة، جرّبي تاني."})}}
};

function route(){var r=(location.hash||"#home").slice(1);if(!V[r])r="home";
 $("nav").innerHTML=pages.map(function(p){return '<a href="#'+p[0]+'"'+(p[0]===r?' class="on" aria-current="page"':'')+'>'+ic(p[2])+p[1]+'</a>'}).join("");
 $("fab").style.display=r==="chat"?"none":"grid";window.scrollTo(0,0);V[r]()}
function greet(){var n=new Date(),h=n.getHours(),g,i;
 if(h>=5&&h<12){g="صباح الخير";i="sun"}else if(h>=12&&h<18){g="نهارك سعيد";i="sun"}else{g="مساء الخير";i="moon"}
 $("gr").textContent=g+" يا صديقتي";$("gi").innerHTML='<use href="#i-'+i+'"/>';
 var ds="";try{ds=n.toLocaleDateString("ar-EG",{weekday:"long",day:"numeric",month:"long"})}catch(e){}
 $("gd").textContent=(ds?ds+" · ":"")+"مكانك لكل اللي محتاجاه في المدرسة"}
function isDark(){var t=document.documentElement.getAttribute("data-theme");return t?t==="dark":window.matchMedia("(prefers-color-scheme:dark)").matches}
$("tb").onclick=function(){var n=isDark()?"light":"dark";document.documentElement.setAttribute("data-theme",n);try{localStorage.setItem("theme",n)}catch(e){}};
greet();setInterval(greet,60000);
window.addEventListener("hashchange",route);route();
