if (window == top) {
    chrome.extension.onRequest.addListener(
        function (req, sender, sendResponse) {
            sendResponse(solve());        
        }
    );
}
function get_query_answer(link, query) {
    console.log("link is :" + link);
    console.log("query is :" + query);
    var req = new XMLHttpRequest();
    req.open("GET", link, false);
    req.onreadystatechange = function (e) {
        //console.log(req, e);
        if (req.readyState == 4) {
            if (req.status == 200) {
                return true;
            }
        }
        return false;
    }
    req.send();
    //console.log(req.getAllResponseHeaders());
    var page = document.implementation.createHTMLDocument("");
    page.body.innerHTML = req.responseText;
    var attrs = page.getElementById('J_AttrUL');
    //console.log(attrs);
    if (link.indexOf("item.taobao.com") != -1) {
        attrs = page.getElementsByClassName('attributes-list')[0];
        console.log(attrs);
    }
    console.log(attrs);
    for (var i = 0; i < attrs.children.length; ++i) {
        attr = attrs.children[i];
        console.log(attr);
        attr = unescape(attr.firstChild.textContent);
        attrPairs = attr.split(":");
        if (attrPairs[0] == query) {
            console.log(attrPairs[1]);
            return attrPairs[1];
        }
    }
    console.log("question answer not found!");
    return null;
}
var solve = function() {
    console.log("bingo!");
    var div = document.getElementById('J_Question');
    var answerInputDiv = document.getElementById('J_AnswerInput');
    var node = div.children[0];
    var answer = null;
    console.log(node.tagName);
    if (node.tagName == "EM") {
        answer = "试用报告"; 
    } else {
        var link = div.children[0].getAttribute('href');
        var query = div.children[1].firstChild.textContent;
        answer = get_query_answer(link, query);
    }
    answerInputDiv.setAttribute('value', answer);
    return answer;
}
