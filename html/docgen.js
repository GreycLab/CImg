// Documentation Generator for CImg

function $docgen () {

  function performSearch() {
    var searchTerms = searchInput.value.split(" ");
    var functions = document.getElementsByClassName("func");

    if (searchInput.value.length > 0) {
      for (var j = 0; j < functions.length; j++) {
        var func = functions[j];
        func.style.display = "block";
        var text = func.innerText.toLowerCase();

        for (var i = 0; i < searchTerms.length; i++) {
          if (searchTerms[i].length > 2) {
            if (!text.includes(searchTerms[i].toLowerCase())) {
              func.style.display = "none";
            }
          }
        }
      }
    } else {
      for (var j = 0; j < functions.length; j++) {
        functions[j].style.display = "block";
      }
    }

    var tmp = document.createElement("input");
    document.body.appendChild(tmp);
    tmp.style.position = "fixed";
    tmp.focus();
    document.body.removeChild(tmp);
  }

  window.globalPerformSearch = performSearch;

  function addCssFile(fileName, id) {
    var head = document.head;
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;
    link.id = id;
    head.appendChild(link);
  }

  addCssFile("https://fonts.googleapis.com/css?family=Noto Sans Mono", "codeFont");
  addCssFile("docgen-align.css", "alignmentCss");
  addCssFile("docgen-light.css", "uiLight");
  addCssFile("docgen-dark.css", "uiDark");
  uiDark.outerHTML = "";

  function switchToDarkMode() {
    uiLight.outerHTML = "";
    addCssFile("docgen-dark.css", "uiDark");
  }

  function switchToLightMode() {
    uiDark.outerHTML = "";
    addCssFile("docgen-light.css", "uiLight");
  }

  var isDarkMode = false;
  var isColorCodeEnabled = false;

  // Switch between light and dark
  function switchMode() {
    setTimeout(function () {
      document.body.style.display = "none";
      var j = false;

      if (isDarkMode) {
        switchToLightMode();
        j = false;
      } else {
        switchToDarkMode();
        j = true;
      }

      isDarkMode = j;

      if (!isDarkMode && isColorCodeEnabled) {
        colorCode();
      }

      document.body.style.display = "block";

      if (isDarkMode && !isColorCodeEnabled) {
        colorCode();
      }
    }, 20);
  }

  switchMode();

  // Apply syntax highlighting
  function colorCode() {
    var j = isColorCodeEnabled;
    var codeStyles = document.getElementById("syntaxStyle");

    if (!isColorCodeEnabled) {
      codeStyles.innerHTML = "\
        .cDigit   { color: #bea; } \
        .cType    { color: #bcf; } \
        .cCustom  { color: #edf; } \
        .cKeyword { color: #9af; } \
        .cOper1   { color: #faa; } \
        .cOper2   { color: #ddf; } \
        .cString , .cString  span { color: #fcd; } \
        .cPreproc, .cPreproc span { color: #afb; } \
        .cComment, .cComment span { color: #ddd; } \
      ";
      isColorCodeEnabled = true;
    } else {
      codeStyles.innerHTML = "";
      isColorCodeEnabled = false;
    }
  }

  window.dgColorCode = colorCode;
  window.dgSwitchMode = switchMode;

  function base64Encode(str) {
    // return btoa(String.fromCharCode(...new Uint8Array(str)));
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  var isGenerated = 0;

  function generate () {
    var ss = document.getElementById("syntaxStyle");
    if (ss == null) document.head.innerHTML += "<style id=syntaxStyle></style>";

    if (!isGenerated) {
      isGenerated = 1;

      if (!!(document.body.innerHTML.match(/window\.globalPerformSearch/))) return;

      var k2 = document.body.innerHTML;
      k2 = k2
        .replace("[++Title]", "<div class=\"func\"><h1>")
        .replace("[++EndTitle]", "</h1></div>\n\
          <input id=\"searchInput\" type=\"text\" placeholder=\"Search...\" \
          onchange=\"window.globalPerformSearch();\">\n");

      k2 = "<div id=rgnote>-- CImg --</div>\n<div><div>" + k2;
      k2 = k2.replace(
        /(?<=(\/\/!.*\n(\s{4,5}(?!\/\*\*))).*)((.|\n)+?)(\n\n)/gi,
        function(x) { return "<div class=\"_code\">" + x; }
      );

      const tag = ["tt", "b", "i", "em", "a"];

      for (var i = 0; i < tag.length; i++) {
        k2 = k2.replace(
          new RegExp("(&lt;" + tag[i] + "(?!&gt;)*?&gt;).+?(?:&lt;/" + tag[i] + "&gt;)", "gi"),
          function(x) {
            return x
              .replace("&lt;","<")
              .replace("&gt;",">")
              .replace("&lt;/"+tag[i]+"&gt;","</"+tag[i]+">");
          }
        );
      }

      k2 = k2.replace(/(?<=\\code)((.|\n)*?)(?=\s*\\endcode)/g, function(x) { return x.replace(/\n/g, "<br>"); });

      for (var i = 32; i > 5; i -= 1) {
        k2 = k2.replace(
          new RegExp("\n" + " ".repeat(i) + ".*\n" + " ".repeat(i + 2), "g"),
          function(x) { return x.replace("\n", "<br>"); }
        );
      }

      k2 = k2
        .replace (/\/\/!.*/g, function(x){return x.replace("//!","</div></div>\n\n<div class=\"func\">\n<h1>") + "</h1>";})
        .replace (/\/\*\*/g, "<div class=\"details\">")
        .replace (/\*\*\//g, "</div><div class=\"_code\">")
        .replace (/\%CImg/g, "\\CImg")
        .replace (/\\CImg/g, "<b class=\"cimg\">CImg</b>")
        .replace (/\\code/g, "<div class=\"code\">")
        .replace (/\\endcode/g, "</div>")
        .replace (/\\param.*\s*\(/g, function(x) { return x.replace("\n","<br>&nbsp;"); })
        .replace (/\\param((.+?<br>)|(.*))/g, function(x) { return x.replace("\\param","<p class=\"param\">") + "</p>"; })
        .replace (   /\\note([^\.]+?\.)+?(<br>|\n)/gm, function(x) { return x.replace(/(<br>|\n)/g, "").replace("\\note",    "<p class=\"note\"   >Note: "   ) + "</p>"; })
        .replace (/\\warning([^\.]+?\.)+?(<br>|\n)/gm, function(x) { return x.replace(/(<br>|\n)/g, "").replace("\\warning", "<p class=\"warning\">Warning: ") + "</p>"; })
        .replace (/\\par[^\n]*/g, function(x) { return x.replace("\\par ", "<h2>") + "</h2>"; })
        .replace (/\\image html [^\n]*/g, function(x) { return x.replace("\\image html ", "<img src=\"https://cimg.eu/img/reference/") + "\">"; })
        .replace (/\\return[^\n]*/g, function(x) { return x.replace("\\return", "<p class=\"return\">Returns: ") + "</p>"; })
        .replace (/\\c [^\s,\(\):\.]*/g, function(x) { return x.replace("\\c ", "<tt>") + "</tt>"; })
        .replace (/\.<\/tt>\d*/g,        function(x) { return x.replace("<\/tt>", ""  ) + "</tt>"; })
        .replace (/(  - )(.|\n)+?(  - )/g, function(x) { return x.replace("  - ", "<p class=\"bullet\">").replace("  - ", "</p>\n  - "); })

        .replace (/(<\/p>\n  - )(.|\n)*(<p class=\"bullet\">)/g,
          function(x) {
            return x
              .replace("<p class=\"bullet\">","</p>\n<p class=\"bullet\">")
              .replace("  - ","<p class=\"bullet\">") + "</p>\n";
          }
        )

        .replace (/(  - )(.|\n)*(<p)/g,    function(x) { return x.replace("  - ", "<p class=\"bullet\">") + "/p>\n<p"  ; })
        .replace (/(  - )(.|\n)*(<div)/g,  function(x) { return x.replace("  - ", "<p class=\"bullet\">") + "/p>\n<div"; })
        .replace (/(  - )(.|\n)+?(<p)/g,   function(x) { return x.replace("  - ", "<p class=\"bullet\">") + "/p>\n<p"  ; })
        .replace (/(  - )(.|\n)+?(<div)/g, function(x) { return x.replace("  - ", "<p class=\"bullet\">") + "/p>\n<div"; })

        .replace (/\\f.*?\\f\$/g, function(x) { return "<span class=\"latex\">" + x.replace(/(\\f|\$)/g, "") + "</span>" })
        .replace (/&lt; Keycode/g,"Keycode")
        .replace (/\n\n/g,"\n")
        .replace (/\\e /g,"")
        .replace (/\\p /g,"")
        .replace (/\\name/g,"[[NAME]]")
        .replace (/\\[a-z]+?(\.|\s)/g,"")
        .replace (/\[\[NAME\]\]/g,"\\name")
        .replace (/>\n/g,">");

      k2 = k2+"</div></div><br><br>";

      k2 = k2.replace(
        /(?<=<p[^>]*class="param"[^>]*>)((.|\n)+?)(?=<\/p>)/g,
        function(x) {
          x = ("<b>" + x)
            .replace(/(?<= .*)\s/, ":KKL:")
            .replace(":KKL:", "</b><br>&nbsp;&nbsp;");
          if (!x.includes("</b>")) x.replace("</p>", "</b></p>");
          x = "&bullet; " + x;
          return x;
        }
      );

      document.body.innerHTML = k2;

      var bullets = document.getElementsByClassName("bullet");
      for (var i = 0; i < bullets.length; i++) {
        var k = bullets[i].innerHTML;
        k = "&nbsp;&nbsp;&nbsp; &bullet; " + k;
        bullets[i].innerHTML = k;
      }

      var headers = document.getElementsByTagName("h1");
      for (var i = 0; i < headers.length; i++) {
        var k = headers[i].innerHTML;
        if (k.includes("\\name")) {
          k = k.replace("\\name ", " ");
          headers[i].className += " ctitle";
          var parent = headers[i].parentElement;
          parent.innerHTML = parent.innerHTML
            .replace(/<div class=\"_code\">/g, "")
            .replace("//@;", "");
        }
        k = k
          .replace(/\^2/g,"&sup2;")
          .replace(/\^3/g,"&sup3;")
          .replace(/sqrt\(/g,"√(");
        headers[i].innerHTML = k;
      }

      var details = document.getElementsByClassName("details");
      for (var i = 0; i < details.length; i++) {
        var k = details[i].innerHTML;
        k = k.split("\n").join("<br>");
        details[i].innerHTML = k;
      }

      var cKeywords = "\
alignas|alignof|and|asm|bitand|bitor|break|case|catch|class|continue|decltype|default|delete|\
do|dynamic_cast|else|enum|explicit|export|extern|false|final|for|friend|goto|if|inline|namespace|\
new|noexcept|not|operator|or|override|private|protected|public|register|reinterpret_cast|return|\
sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|true|try|\
typedef|typeid|typename|union|using|virtual|while|xor";

      var cTypes = "\
auto|bool|char|const|constexpr|double|float|int|long|mutable|short|signed|unsigned|void|volatile";

      var customTypes = "";
      for (var codeType = 0; codeType < 2; codeType++) {
        var codes = document.getElementsByClassName ((codeType == 0) ? "code" : "_code");
        for (var i = 0; i < codes.length; i++) {
          var k = "\n" + codes[i].innerHTML;
          var result = k.match(/(?<!\\W)(?:class|struct|namespace|union|typename)(?:\s|&nbsp;)+\w+/g);
          if (result) {
            for (var j = 0; j < result.length; j++) {
              customTypes += result[j].split(' ')[1] + "|";
            }
          }
        }
      }
      customTypes += "std";
      customTypes = [...new Set(customTypes.split('|'))]
        .filter(element => !cKeywords.split('|').includes(element))
        .filter(element => !cTypes   .split('|').includes(element))
        .join('|');

      for (var codeType = 0; codeType < 2; codeType++)
          {
          var codes = document.getElementsByClassName((codeType == 0) ? "code" : "_code");
          for (var i = 0; i < codes.length; i++)
              {
              var k = "\n" + codes[i].innerHTML;
              k = (k
                  .replace("\n\n", "\n")
                  .replace(/(?<!<[^>]*)(?!\/\/)(?<!\/)[\(\)=\+\-\*\/\|\^\%\!]+|&lt;|&gt;|&amp;/g, function(x) { return "<SYMB>"  + x + "</SYMB>" ; })
                  .replace(/(?<!<[^>]*)(?!\/\/)(?<!\/|&\w*)[\,\;\:\.\[\]]+/g,                     function(x) { return "<SYMB2>" + x + "</SYMB2>"; })
                  .replace(/\n/g, "<br>")
                  .replace(RegExp((codeType == 0) ? "<br> " : "<br>    ", "g"), "<br>")
                  .replace(/  /g, "&nbsp;&nbsp;")
                  + ":--|"
                  )
                .replace(/&nbsp;:--\|/g, ":--|")
                .replace("\n:--|", ":--|")
                .replace(":--|", "")
                .replace(/<div&nbsp;/g, "<div ")
                .replace(/<p&nbsp;/g, "<p ")
                .replace(/(?:\w*?|)["'][\s\S]*?["']/g, function(x) { return "<span class=\"cString\">" + x + "</span>"; })
                .replace(/(?<=\W)(?:\d[\d\.]*|[\d\.]*\d)(\w*|)/g, function(x) { return "<span class=\"cDigit\">" + x + "</span>"; })
                .replace(/(?<=(^|\n|<br>)(\s|&nbsp;)*)\#\s*\w+/g, function(x) { return "<span class=\"cPreproc\">" + x + "</span>"; })
                .replace(RegExp("(?<=\\W)(?:" + cKeywords   + ")(?!\\w)(?!=)",        "g"), function(x) { return "<span class=\"cKeyword\">" + x + "</span>";})
                .replace(RegExp("(?<=\\W)(?:" + cTypes      + ")(?!\\w)(?!(?:=|\"))", "g"), function(x) { return "<span class=\"cType\">"    + x + "</span>";})
                .replace(RegExp("(?<=\\W)(?:" + customTypes + ")(?!\\w)(?!(?:=|\"))", "g"), function(x) { return "<span class=\"cCustom\">"  + x + "</span>";})
                .replace(/<SYMB>[\s\S]*?<\/SYMB>/g,   function(x) { return "<span class=\"cOper1\">" + x + "</span>"; })
                .replace(/<SYMB2>[\s\S]*?<\/SYMB2>/g, function(x) { return "<span class=\"cOper2\">" + x + "</span>"; })
                .replace(/<\/{0,1}SYMB\d{0,1}>/g, "")
                .replace(/\/\/.*?($|\n|<br>)/g, function(x) { return "<span class=\"cComment\">" + x + "</span>"; })
                .replace(/&nbsp;&nbsp;&nbsp;/g, "&nbsp; &nbsp");
              codes[i].innerHTML = k;
              }
          }
      k2 = document.body.innerHTML;

      k2 = k2.replace(
        /(?<=<div[^>]*class="details"[^>]*>)((.|\n)+?)(?=<div class=\"_code\"[^>]*?>)/g,
        function(x) {
          x = x.replace(
            /(?:^|(?<=<\/(p|div|h2)>))(?:(?!<(p|div|h2)[^>]*?>)[\s\S]*?|$)*/g,
            function(x2) {
              return (x2.length > 12) ? ("<p class=\"info\">" + x2 + "</p>") : x2;
            }
          );
          return x;
        }
      );

      document.body.innerHTML = k2;
      k2 = document.body.innerHTML;

      k2 = k2
        .replace(/&nbsp; /g, "&nbsp;&nbsp;")
        .replace(/\s*\n/g, "\n").replace(/(&nbsp;)*<br>/g, "<br>")
        .replace(/(&nbsp;)*\n/g,"\n").replace(/(&nbsp;)*<\//g, "</")
        .replace(/<div class=\"code\">(<br>)*/g, "<div class=\"code\">")
        .replace(/<div class=\"_code\">(<br>)*/g, "<div class=\"_code\">")
        .replace(/(<br>)*<\/div>/g, "</div>")
        .replace(/<div class=\"details\">\n*(<br>)*/g, "<div class=\"details\">\n")
        .replace(/<p class=\"info\"><\/p>/g, "<hr>")
        .replace(/<\/p>[\n\s]*<br>[\n\s]*<p/g, "</p><hr><p")
        .replace(/<\/div>[\n\s]*<br>[\n\s]*<p/g, "</div><hr><p")
        .replace(/<\/p>[\n\s]*<br>[\n\s]*<div/g, "</p><hr><div")
        .replace(/<br>[\n\s]*<\/p>/g, "</p>")
        .replace(/<p[^>]*><\/p>/g, "")
        .replace(/(<\/h1>)(<br>|\n|\s)*(<b>)+/g, "</h1>")
        .replace(/&nbsp;&nbsp;&nbsp;/g, "&nbsp; &nbsp")
        .replace(
          /(?<!")http(?:s|)\:\/\/[\w\.\/]*/g,
          function(x) {
            x = x.replace("http:","https:");
            return "<a href=\"" + x + "\">" + x + "</a>";
          }
        )
        .replace(/\n+/g, " ")
        .replace(/\s\s+/g, " ");

      // k2 = "<button id='dlswitch' onclick='window.dgSwitchMode();'>Dark/Light Mode</button>" + k2;
      // k2 = "<button id='ccswitch' onclick='window.dgColorCode ();'>Color Code</button>" + k2;
      document.body.innerHTML = k2 + "<br><br>";
      colorCode();

      var k = document.body.innerHTML;
      k = "<!DOCTYPE html5><html><head><title>" + document.title + "</title>"
        + "<link rel=stylesheet href='https://fonts.googleapis.com/css?family=Noto Sans Mono'>"
        + "<link rel=stylesheet href='docgen-align.css'>"
        + "<link rel=stylesheet href='docgen-dark.css'>"
        + "<style>" + syntaxStyle.innerHTML + "</style>"
        + "<script>" + performSearch + " window.globalPerformSearch = performSearch;</script>"
        + "</head><body>"
        + k + "</body></html>";
      k = k
        .replace(/\n+/g, " ")
        .replace(/\s\s+/g, " ");
      var k2e = base64Encode(k);
      document.body.innerHTML = "<a id='ddswitch' href='data:text/plain;base64," + k2e + "' download='doc.html'>Download</a>" + k2;
    }
  }

  setTimeout (
    function() {
      generate();
    }, 60
  );

}

$docgen();