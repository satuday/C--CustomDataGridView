function FP() {
    this.Ajax = Ajax;
    this.InputChecker = InputChecker;
    this.Json = Json;
    this.Slider = Slider;
    this.HintBox = HintBox;
    this.HintListBox = HintListBox;
    this.Calendar = Calendar;
    this.TabPanel = TabPanel;
    this.DataGrid = DataGrid;
    this.FormGenerator = FormGenerator;
    this.DropDownList = DropDownList;
    this.SlideShow = SlideShow;
    this.TimerFunction = TimerFunction; 
}

//#region Public Function //////
function RequestQuerystring(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];

}

document.getElementsByClassName = function (cl) {
    var retnode = [];
    var myclass = new RegExp('\\b' + cl + '\\b');
    var elem = this.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++) {
        var classes = elem[i].className;
        if (myclass.test(classes)) retnode.push(elem[i]);
    }
    return retnode;
};
//#endregion

//#region Ajax Class//////

function Ajax(ArraySet, Page) {
    this.array = ArraySet;
    this.page = Page;
    this.answer = "";
    this.CheckAjaxSupport = checkAjaxSupport;
    this.xmlHttp = null;
    this.GetRequest = getRequest;
    this.TimerRequest = timerRequest;
    this.GetAsyncRequest = getAsyncRequest;
    this.PostRequest = postRequest;
    this.PostAsyncRequest = postAsyncRequest;
    this.TimerAsyncRequest = timerAsyncRequest;

}

function postRequest() {
    this.xmlHttp = this.CheckAjaxSupport();
    if (this.xmlHttp == null) {
        alert("Your browser does not support AJAX!");
        return;
    }
    var i;
    var q = "q=";
    for (i in this.array) {
        q = q + "&q" + i + "=" + escape(this.array[i]);
    }
    var url = this.page;
    url = url + "?sid=" + Math.random();
    this.xmlHttp.open("POST", url, false);
    this.xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.xmlHttp.send(q);
    this.answer = this.xmlHttp.responseText;
    return this.answer;
}

function postAsyncRequest(div) {
    if (div == null) {
        alert("PostAsyncRequest(div) required 1 parameter");
    }
    else {
        this.xmlHttp = this.CheckAjaxSupport();
        if (this.xmlHttp == null) {
            alert("Your browser does not support AJAX!");
            return;
        }
        var i;
        var q = "q=";
        for (i in this.array) {
            q = q + "&q" + i + "=" + escape(this.array[i]);
        }
        var url = this.page;
        url = url + "?sid=" + Math.random();
        var xh = this.xmlHttp;
        xh.onreadystatechange = function () {
            if (xh.readyState == 4 && xh.status == 200) {
                document.getElementById(div).innerHTML = xh.responseText;
            }
        }
        this.xmlHttp.open("POST", url, true);
        this.xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.xmlHttp.send(q);
    }
}

function getRequest() {
    this.xmlHttp = this.CheckAjaxSupport();
    if (this.xmlHttp == null) {
        alert("Your browser does not support AJAX!");
        return;
    }
    var i;
    var q = "&q=";
    for (i in this.array) {
        q = q + "&q" + i + "=" + escape(this.array[i]);
    }
    var url = this.page;
    url = url + "?sid=" + Math.random();
    url = url + q;
    this.xmlHttp.open("GET", url, false);
    this.xmlHttp.send();
    this.answer = this.xmlHttp.responseText;
    return this.answer;
}

function getAsyncRequest(div) {
    if (div == null) {
        alert("GetAsyncRequest(div) required 1 parameter");
    }
    else {
        this.xmlHttp = this.CheckAjaxSupport();
        if (this.xmlHttp == null) {
            alert("Your browser does not support AJAX!");
            return;
        }
        var i;
        var q = "&q=";
        for (i in this.array) {
            q = q + "&q" + i + "=" + escape(this.array[i]);
        }
        var url = this.page;
        url = url + "?sid=" + Math.random();
        url = url + q;
        var xh = this.xmlHttp;
        xh.onreadystatechange = function () {
            if (xh.readyState == 4 && xh.status == 200) {
                document.getElementById(div).innerHTML = xh.responseText;
            }
        }
        this.xmlHttp.open("GET", url, true);
        this.xmlHttp.send();
    }
}

function timerRequest(div, delay) {
    if (div == null || delay == null) {
        alert("TimerRequest(div,delay) required 2 parameters");
    }
    else {
        this.xmlHttp = this.CheckAjaxSupport();
        if (this.xmlHttp == null) {
            alert("Your browser does not support AJAX!");
            return;
        }
        var i;
        var q = "&q=";
        for (i in this.array) {
            q = q + "&q" + i + "=" + escape(this.array[i]);
        }
        var url = this.page;
        url = url + "?sid=" + Math.random();
        url = url + q;
        var xh = this.xmlHttp;
        setInterval(function () {
            xh.open("GET", url, false);
            xh.send();
            document.getElementById(div).innerHTML = xh.responseText;
        }, delay);
    }
}

function timerAsyncRequest(div, delay) {
    if (div == null || delay == null) {
        alert("TimerAsyncRequest(div,delay) required 2 parameters");
    }
    else {
        this.xmlHttp = this.CheckAjaxSupport();
        if (this.xmlHttp == null) {
            alert("Your browser does not support AJAX!");
            return;
        }

        var i;
        var q = "&q=";
        for (i in this.array) {
            q = q + "&q" + i + "=" + escape(this.array[i]);
        }

        var url = this.page;
        url = url + "?sid=" + Math.random();
        url = url + q;
        var xh = this.xmlHttp;

        setInterval(function () {
            xh.open("GET", url, true);
            xh.send();
            xh.onreadystatechange = function () {
                if (xh.readyState == 4 && xh.status == 200) {
                    document.getElementById(div).innerHTML = xh.responseText;
                }
            }
        }, delay);

    }
}

function checkAjaxSupport() {
    try {
        // Firefox, Opera 8.0+, Safari
        this.xmlHttp = new XMLHttpRequest();
    }
    catch (e) {
        // Internet Explorer
        try {
            this.xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return this.xmlHttp;
}
//#endregion

//#region Input Checker Class////
function InputChecker(RequiredBox) {
    this.InputArray = Array();
    this.RequiredArray = RequiredBox;
    this.UpdateArraySet = updateArraySet;
    this.CheckingNumberInput = checkingNumberInput;
    this.CheckingAlphabetInput = checkingAlphabetInput;
    this.CheckingMoneyInput = checkingMoneyInput;
    this.CheckingEmailInput = checkingEmailInput;
    this.CheckingRequiredBox = checkingRequiredBox;
    this.CheckingFormReady = checkingFormReady;
    this.CheckingArrayForError = checkingArrayForError;
    this.ErrorNumberMessage = "Please Enter Number";
    this.ErrorAlphabetMessage = "Please Enter Letter";
    this.ErrorMoneyMessage = "Please Enter Currency";
    this.ErrorEmailMessage = "Please Enter Correct Email";
    this.ErrorRequiredMessage = "Required";
    this.ErrorAlertMessage = "Some Required Value is Missing";
    this.DivBgColor = "Red";
    this.DivPosition = "absolute";
    this.DivMarginTop = "0px";
    this.DivMarginLeft = "50px";
    this.DivWidth = "";
    this.DivHeight = "";
    this.LockInput = true;
    this.RequiredBoxAlert = true;
    this.ArrayErrorAlert = true;
    this.ErrorCheckingFormReadyMessage = "That's an error on the form please review it and try again!";
}

function checkingFormReady(functionIfReady) {
    if (this.CheckingRequiredBox() == false && this.CheckingArrayForError() == false) {
        functionIfReady();
    }
}

function checkingArrayForError() {
    var ErrorInArray = false
    for (var i = 0; i < this.InputArray.length; i++) {
        var kv = this.InputArray[i].split(":")
        if (kv[1] == "true") {
            ErrorInArray = true;
        }
    }
    if (ErrorInArray == true && this.ArrayErrorAlert == true) {
        alert(this.ErrorCheckingFormReadyMessage);
    }
    return ErrorInArray;
}

function checkingRequiredBox() {
    var ErrorTF = false;
    for (var i = 0; i < this.RequiredArray.length; i++) {
        var objElement = document.getElementById(this.RequiredArray[i]);
        if (objElement.value.length == 0) {
            var newdiv = document.createElement("div");
            newdiv.setAttribute("id", objElement.id + "Child");
            newdiv.innerHTML = this.ErrorRequiredMessage;
            newdiv.style.width = this.DivWidth;
            newdiv.style.height = this.DivHeight;
            newdiv.style.backgroundColor = this.DivBgColor;
            newdiv.style.position = this.DivPosition;
            newdiv.style.marginTop = this.DivMarginTop;
            newdiv.style.marginLeft = this.DivMarginLeft;
            objElement.parentNode.insertBefore(newdiv, objElement);
            ErrorTF = true;
        }
    }
    if (this.RequiredBoxAlert == true && ErrorTF == true) {
        alert(this.ErrorAlertMessage);
    }

    return ErrorTF;

}

function checkingNumberInput(ObjectId) {
    var objElement = document.getElementById(ObjectId.id);
    var regexp = new RegExp("[^0-9]");
    var errorFound = regexp.test(objElement.value);
    if (errorFound) {
        if (this.LockInput) {
            var str = objElement.value;
            objElement.value = str.substr(0, str.length - 1);
        }
        if (!document.getElementById(objElement.id + "Child")) {
            var newdiv = document.createElement("div");
            newdiv.setAttribute("id", objElement.id + "Child");
            newdiv.innerHTML = this.ErrorNumberMessage;
            newdiv.style.width = this.DivWidth;
            newdiv.style.height = this.DivHeight;
            newdiv.style.backgroundColor = this.DivBgColor;
            newdiv.style.position = this.DivPosition;
            newdiv.style.marginTop = this.DivMarginTop;
            newdiv.style.marginLeft = this.DivMarginLeft;
            objElement.parentNode.insertBefore(newdiv, objElement);


            this.UpdateArraySet(ObjectId.id, errorFound);

        }
    }
    else if (document.getElementById(objElement.id + "Child")) {

        var newdiv = document.getElementById(objElement.id + "Child");
        newdiv.parentNode.removeChild(newdiv);
        this.UpdateArraySet(ObjectId.id, errorFound);
    }
}

function checkingAlphabetInput(ObjectId) {
    var objElement = document.getElementById(ObjectId.id);
    var regexp = new RegExp("[^A-z]");
    var errorFound = regexp.test(objElement.value);

    if (errorFound) {
        if (this.LockInput) {
            var str = objElement.value;
            objElement.value = str.substr(0, str.length - 1);
        }
        if (!document.getElementById(objElement.id + "Child")) {
            var newdiv = document.createElement("div");
            newdiv.setAttribute("id", objElement.id + "Child");
            newdiv.innerHTML = this.ErrorAlphabetMessage;
            newdiv.style.width = this.DivWidth;
            newdiv.style.height = this.DivHeight;
            newdiv.style.backgroundColor = this.DivBgColor;
            newdiv.style.position = this.DivPosition;
            newdiv.style.marginTop = this.DivMarginTop;
            newdiv.style.marginLeft = this.DivMarginLeft;
            objElement.parentNode.insertBefore(newdiv, objElement);
            this.UpdateArraySet(ObjectId.id, errorFound);

        }
    }
    else if (document.getElementById(objElement.id + "Child")) {

        var newdiv = document.getElementById(objElement.id + "Child");
        newdiv.parentNode.removeChild(newdiv);
        this.UpdateArraySet(ObjectId.id, errorFound);
    }
}

function checkingMoneyInput(ObjectId) {
    var objElement = document.getElementById(ObjectId.id);
    var regexp = new RegExp("[^1234567890.]");
    var errorFound = regexp.test(objElement.value);

    if (errorFound) {
        if (this.LockInput) {
            var str = objElement.value;
            objElement.value = str.substr(0, str.length - 1);
        }
        if (!document.getElementById(objElement.id + "Child")) {
            var newdiv = document.createElement("div");
            newdiv.setAttribute("id", objElement.id + "Child");
            newdiv.innerHTML = this.ErrorMoneyMessage;
            newdiv.style.width = this.DivWidth;
            newdiv.style.height = this.DivHeight;
            newdiv.style.backgroundColor = this.DivBgColor;
            newdiv.style.position = this.DivPosition;
            newdiv.style.marginTop = this.DivMarginTop;
            newdiv.style.marginLeft = this.DivMarginLeft;
            objElement.parentNode.insertBefore(newdiv, objElement);
            this.UpdateArraySet(ObjectId.id, errorFound);

        }
    }
    else if (document.getElementById(objElement.id + "Child")) {

        var newdiv = document.getElementById(objElement.id + "Child");
        newdiv.parentNode.removeChild(newdiv);
        this.UpdateArraySet(ObjectId.id, errorFound);
    }
}

function checkingEmailInput(ObjectId) {
    var objElement = document.getElementById(ObjectId.id);
    var regexp = new RegExp("[@]");
    var errorFound = regexp.test(objElement.value);

    if (!errorFound) {
        if (!document.getElementById(objElement.id + "Child")) {
            var newdiv = document.createElement("div");
            newdiv.setAttribute("id", objElement.id + "Child");
            newdiv.innerHTML = this.ErrorEmailMessage;
            newdiv.style.width = this.DivWidth;
            newdiv.style.height = this.DivHeight;
            newdiv.style.backgroundColor = this.DivBgColor;
            newdiv.style.position = this.DivPosition;
            newdiv.style.marginTop = this.DivMarginTop;
            newdiv.style.marginLeft = this.DivMarginLeft;
            objElement.parentNode.insertBefore(newdiv, objElement);
            this.UpdateArraySet(ObjectId.id, !errorFound);

        }
    }
    else if (document.getElementById(objElement.id + "Child")) {

        var newdiv = document.getElementById(objElement.id + "Child");
        newdiv.parentNode.removeChild(newdiv);
        this.UpdateArraySet(ObjectId.id, !errorFound);
    }
}

function updateArraySet(key, value) {
    var notFound = true;
    if (this.InputArray.length == 0) {
        this.InputArray.push(key + ":" + value);
    }
    else {
        for (var i = 0; i < this.InputArray.length; i++) {
            var kv = this.InputArray[i].split(":")
            if (kv[0] == key) {
                this.InputArray[i] = key + ":" + value;
                notFound = false;
            }
        }
        if (notFound == true) {
            this.InputArray.push(key + ":" + value);
        }
    }
}
//#endregion

//#region Json Class//////
function Json(JsonHandler,TableName) {
    this.JH = JsonHandler;
    this.TableName = TableName;
    this.Insert = insert;
    this.Update = update;
    this.Delete = Del;
    this.Select = select;
    this.SecureSelect = secureSelect;
    this.Search = search;
    this.SecureSearch = secureSearch;
    this.WildSearch = wildSearch;
    this.SelectAll = selectAll;
    this.GetTableStructure = getTableStructure;
}

function Del(id) {
    var a = new Array();
    a[0] = "delete";
    a[1] = this.TableName;
    a[2] = id;
    var aj = new Ajax(a, this.JH);
    return aj.PostRequest();
}

function selectAll() {
    var a = new Array();
    a[0] = "selectAll";
    a[1] = this.TableName;
    var aj = new Ajax(a, this.JH);
    var JObj = eval('(' + aj.PostRequest() + ')');
    return JObj;
}

function update(JsonObj) {
    var updateObj;
    updateObj = "{";
    for (var key in JsonObj) {
        updateObj += "'" + key + "':'" + JsonObj[key] + "',";
    }
    updateObj = updateObj.slice(0, updateObj.length - 1);
    updateObj += "}";
    var a = new Array();
    a[0] = "update";
    a[1] = this.TableName;
    a[2] = updateObj;
    var aj = new Ajax(a, this.JH);
    return aj.PostRequest();
}

function insert(JsonObj) {
    var insertObj;
    insertObj = "{";
    for (var key in JsonObj) {
        insertObj += "'" + key + "':'" + JsonObj[key] + "',";
    }
    insertObj = insertObj.slice(0, insertObj.length - 1);
    insertObj += "}";
    var a = new Array();
    a[0] = "insert";
    a[1] = this.TableName;
    a[2] = insertObj;
    var aj = new Ajax(a, this.JH);
    return aj.PostRequest();
}

function search(JsonObj, WhereKey, WhereValue) {
    var returnObj = new Array();
    var x = 0
    for (var i = 0; i < JsonObj.length; i++) {

        if (JsonObj[i][WhereKey] == WhereValue) {

            returnObj[x] = JsonObj[i];
            x = x + 1;
        }

    }

    return returnObj;
}

function wildSearch(JsonObj, WhereKey, WhereValue) {


    var RgEx = new RegExp(escape(WhereValue), "i");
    var returnObj = new Array();
    var x = 0


    for (var i = 0; i < JsonObj.length; i++) {

        if (RgEx.test(JsonObj[i][WhereKey])) {

            returnObj[x] = JsonObj[i];
            x = x + 1;
        }
    }

    return returnObj;

}

function select(JsonObj, Id) {
    var returnObj;
    for (var i = 0; i < JsonObj.length; i++) {

        if (JsonObj[i]["ID"] == Id) {

            returnObj = JsonObj[i];

        }

    }

    return returnObj;

}

function getTableStructure() {
    var a = new Array();
    a[0] = "getTableStructure";
    a[1] = this.TableName;
    var aj = new Ajax(a, this.JH);
    var JObj = eval('(' + aj.PostRequest() + ')');
    return JObj;
}

function secureSelect(Id) {
    var a = new Array();
    a[0] = "secureSelect";
    a[1] = this.TableName;
    a[2] = Id;
    var aj = new Ajax(a, this.JH);
    var JObj = eval('(' + aj.PostRequest() + ')');
    return JObj;
}

function secureSearch(WhereKClause) {
    var a = new Array();
    a[0] = "secureSearch";
    a[1] = this.TableName;
    a[2] = WhereKClause;
    var aj = new Ajax(a, this.JH);
    var JObj = eval('(' + aj.PostRequest() + ')');
    return JObj;
}
//#endregion

//#region Slider Class /////////
function Slider(parentDiv, SizeType) {
    this.SizeType = SizeType;
    this.ParentDiv = parentDiv;
    this.SliderDiv = "SliderDiv" + parentDiv;
    this.Top = 0;
    this.Left = 0;
    this.Position = "absolute";
    this.Width = 10;
    this.Height = 10;
    this.Background = "#000"//"url(backcoverdark.png)";
    this.Delay = 100;
    this.Increment = 100;
    this.MaxHeight = 100;
    this.MaxWidth = 100;
    this.SlideDown = slideFromUpDown;
    this.SlideRight = slideFromRightLeft;
    this.CreateDiv = createDiv;
    this.RightLeft = "right";
    this.UpDown = "down";
    this.Zindex = 9999;
}

function createDiv(innerHTML) {
    if (this.ParentDiv == "body") {
        var objElement = document.body;
    }
    else {
        var objElement = document.getElementById(this.ParentDiv);
    }
    var newdiv = document.createElement("div");
    newdiv.setAttribute("id", this.SliderDiv);
    newdiv.innerHTML = innerHTML;
    newdiv.style.width = this.Width + this.SizeType;
    newdiv.style.height = this.Height + this.SizeType;
    newdiv.style.background = this.Background;
    newdiv.style.position = this.Position;
    newdiv.style.marginTop = this.Top + this.SizeType;
    newdiv.style.marginLeft = this.Left + this.SizeType;
    newdiv.style.overflow = "hidden";
    newdiv.style.zIndex = this.Zindex;
    objElement.parentNode.insertBefore(newdiv, objElement);
}

function slideFromUpDown(innerHTML) {


    if (this.UpDown == "down") {
        this.CreateDiv(innerHTML);
        var SDiv = document.getElementById(this.SliderDiv);
        var SDivH = SDiv.style.height.toString();
        var i = this.Height;
        var increment = this.Increment;
        var delay = this.Delay;
        var sizeType = this.SizeType;
        var maxHeight = this.MaxHeight;
        var t = setInterval(function () {
            i = i + increment;
            try {
                SDiv.style.height = i + sizeType;
            }
            catch (e)
               { }
            if (i > maxHeight) {
                clearInterval(t);
            }
        }, delay

       );
        this.UpDown = "up";
    }
    else if (this.UpDown == "up") {
        var SDiv = document.getElementById(this.SliderDiv);
        var hNumber = SDiv.style.height.slice(0, -this.SizeType.length);
        var i = hNumber; //;
        var increment = this.Increment;
        var delay = this.Delay;
        var sizeType = this.SizeType;
        var height = this.Height;
        var t = setInterval(function () {
            i = i - increment;
            try {
                SDiv.style.height = i + sizeType;
            }
            catch (e)
               { }
            if (i < height) {
                SDiv.parentNode.removeChild(SDiv);
                clearInterval(t);

            }
        }, delay

       );
        this.UpDown = "down";
    }
}

function slideFromRightLeft(innerHTML) {


    if (this.RightLeft == "right") {
        this.CreateDiv(innerHTML);
        var SDiv = document.getElementById(this.SliderDiv);
        var SDivW = SDiv.style.width.toString();
        var i = this.Width;
        var increment = this.Increment;
        var delay = this.Delay;
        var sizeType = this.SizeType;
        var maxWidth = this.MaxWidth;
        var t = setInterval(function () {
            i = i + increment;
            try {
                SDiv.style.width = i + sizeType;
            }
            catch (e)
               { }
            if (i > maxWidth) {
                clearInterval(t);
            }
        }, delay

       );
        this.RightLeft = "left";
    }
    else if (this.RightLeft == "left") {
        var SDiv = document.getElementById(this.SliderDiv);
        var wNumber = SDiv.style.width.slice(0, -this.SizeType.length);
        var i = wNumber; //;
        var increment = this.Increment;
        var delay = this.Delay;
        var sizeType = this.SizeType;
        var width = this.Width;
        var t = setInterval(function () {
            i = i - increment;
            try {
                SDiv.style.width = i + sizeType;
            }
            catch (e)
               { }
            if (i < width) {
                SDiv.parentNode.removeChild(SDiv);
                clearInterval(t);

            }
        }, delay

       );
        this.RightLeft = "right";
    }
}
//#endregion

//#region Hint Box Class /////
function HintBox() {
    this.Width = "270PX";
    this.Height = "100PX";
    this.Zindex = 2;
    this.Position = "absolute";
    this.Background = "";
    this.Backgroundrepeat = "";
    this.MarginTop = "0px";
    this.MarginRight = "0px";
    this.MarginBottom = "0px";
    this.MarginLeft = "30px";
    this.PaddingTop = "20px";
    this.PaddingRight = "10px";
    this.PaddingBottom = "20px";
    this.PaddingLeft = "20px";
    this.Delay = 100;
    this.Timer = "";
    this.Overflow = "auto";
    this.CreateDiv = hb_createDiv;
}

function hb_createDiv(parentDiv, msg) {
    if (document.getElementById("Child" + parentDiv) == null) {
        var ParentDiv = document.getElementById(parentDiv); ;
        var div = document.createElement("DIV");
        var cdiv = document.getElementById("Child" + parentDiv);
        div.setAttribute("id", "Child" + parentDiv);
        div.setAttribute("style", " z-index:" + this.Zindex + ";");
        div.style.width = this.Width;
        div.style.height = this.Height;
        div.style.background = this.Background;
        div.style.position = this.Position;
        div.style.paddingTop = this.PaddingTop;
        div.style.paddingRight = this.PaddingRight;
        div.style.paddingBottom = this.PaddingBottom;
        div.style.paddingLeft = this.PaddingLeft;
        div.style.marginTop = this.MarginTop;
        div.style.marginRight = this.MarginRight;
        div.style.marginBottom = this.MarginBottom;
        div.style.marginLeft = this.MarginLeft;
        div.style.overflow = this.Overflow;
        div.style.backgroundRepeat = this.Backgroundrepeat;
        div.innerHTML = unescape(msg);
        ParentDiv.parentNode.insertBefore(div, ParentDiv);
        var delay = this.Delay;
        var timer = this.Timer;
        addevent("Child" + parentDiv, "mouseout", function () { timer = setTimeout(function () { div.parentNode.removeChild(div) }, delay) });
        addevent(parentDiv, "mouseout", function () { timer = setTimeout(function () { div.parentNode.removeChild(div) }, delay) });
        addevent("Child" + parentDiv, "mouseover", function () { clearTimeout(timer) });
    }
}

function addevent(id, action, func) {
    div = document.getElementById(id);
    if (div.addEventListener) { div.addEventListener(action, func, false); };
    if (div.attachEvent) { div.attachEvent("on" + action, func); }
}
//#endregion

//#region Hint List Box //////
function HintListBox(JsonObject, TextBoxId, WhereKey, HiddenBoxForId, ClassObj) {
    this.ClassObj = ClassObj;
    this.TextBoxId = TextBoxId;
    this.ListBoxDivId = "ListBox" + TextBoxId;
    this.WhereKey = WhereKey;
    this.Top = "20px";
    this.Left = 0;
    this.Position = "absolute";
    this.Width = "300px";
    this.Height = "";
    this.Overflow = "hidden";
    this.Background = "#333"//"url(backcoverdark.png)";
    this.SelectBackground = "red"//"url(backcoverdark.png)";
    this.Delay = 100;
    this.JObj = JsonObject;
    this.DisplayHintBox = displayHintBox;
    this.CreateListBox = createListBox;
    this.Index = 0;
    this.SelectChoice = selectChoice;
    this.RemoveChoice = removeChoice;
    this.ObjLength = 0;
    this.Direction = "down";
    this.HiddenBoxForId = HiddenBoxForId;
    this.WhereId = "ID";
    if (HiddenBoxForId) {
        this.HiddenBoxId = "";
    }
    this.HintListMouseOver = hintListMouseOver;
    this.HintListMouseOut = hintListMouseOut;
    this.FillInTextBox = fillInTextBox;
    this.RemoveHintListBox = removeHintListBox;
}

function createListBox() {

    var objElement = document.getElementById(this.TextBoxId);

    var newdiv = document.createElement("div");
    newdiv.setAttribute("id", this.ListBoxDivId);
    newdiv.setAttribute("class", this.ListBoxDivId);
    newdiv.style.width = this.Width;
    newdiv.style.maxHeight = this.Height;
    newdiv.style.background = this.Background;
    newdiv.style.position = this.Position;
    newdiv.style.marginTop = this.Top;
    newdiv.style.overflow = this.Overflow;
    newdiv.style.marginLeft = this.Left;
    objElement.parentNode.insertBefore(newdiv, objElement);
}

function selectChoice(index) {
    var selectDiv = document.getElementById('selectdiv' + index);
    selectDiv.style.background = this.SelectBackground;

}

function removeChoice(index) {
    var removeDiv = document.getElementById('selectdiv' + index);
    removeDiv.style.background = this.Background;

}

function fillInTextBox(index) {
    document.getElementById(this.TextBoxId).value = document.getElementById("selectdiv" + index).innerHTML;

    if (this.HiddenBoxId != "") {
        document.getElementById(this.HiddenBoxId).value = document.getElementById("selectdiv" + index).title;
    }
}

function displayHintBox(event) {
    var eKeyCode = event.keyCode;


    if (eKeyCode == 40) {
        if (this.ObjLength != 0 && this.Index < this.ObjLength) {


            if (this.Direction == "up") {
                this.Index = this.Index + 1;

            }
            if (this.Index != 0) {
                this.RemoveChoice(this.Index - 1);

            }
            if (this.Index >= 0) {
                try {
                    this.SelectChoice(this.Index);
                    document.getElementById(this.TextBoxId).value = document.getElementById("selectdiv" + this.Index).innerHTML;

                    if (this.HiddenBoxForId) {
                        document.getElementById(this.HiddenBoxId).value = document.getElementById("selectdiv" + this.Index).title;
                    }
                }
                catch (err)
                        { }
            }



            if (this.Direction == "down") {
                this.Index = this.Index + 1;
            }

            this.Direction = "down";



        }
    }
    else if (eKeyCode == 38) {
        if (this.ObjLength != 0 && this.Index > 0) {

            if (this.Direction == "down") {
                this.Index = this.Index - 2;
            }
            else if (this.Direction == "up") {
                this.Index = this.Index - 1;
            }
            this.Direction = "up";

            if (this.Index >= 0) {

                try {
                    this.SelectChoice(this.Index);
                    document.getElementById(this.TextBoxId).value = document.getElementById("selectdiv" + this.Index).innerHTML;
                    if (this.HiddenBoxForId) {
                        document.getElementById(this.HiddenBoxId).value = document.getElementById("selectdiv" + this.Index).title;
                    }
                }
                catch (err)
                    { }
            }




            if (this.Index != this.ObjLength - 1) {
                this.RemoveChoice(this.Index + 1);
            }



        }
    }
    else {
        this.Index = 0;
        this.Direction = "down";
        if (!document.getElementById(this.ListBoxDivId)) {
            this.CreateListBox();
        }
        var searchStr = document.getElementById(this.TextBoxId);
        var RgEx = new RegExp(escape(searchStr.value), "i");
        var returnObj = new Array();
        var x = 0

        for (var i = 0; i < this.JObj.length; i++) {

            if (RgEx.test(this.JObj[i][this.WhereKey])) {

                returnObj[x] = this.JObj[i];
                x = x + 1;
            }

        }

        var str = "";
        this.ObjLength = returnObj.length;
        if (searchStr.value != "" && returnObj.length != 0) {
            for (var i = 0; i < returnObj.length; i++) {
                str += "<div id='selectdiv" + i + "' title='" + returnObj[i][this.WhereId] + "' onmouseover='" + this.ClassObj + ".HintListMouseOver(this.id)' onmouseout='" + this.ClassObj + ".HintListMouseOut(this.id)' onclick='" + this.ClassObj + ".FillInTextBox(" + i + ")'>" + returnObj[i][this.WhereKey] + "</div>";
                document.getElementById(this.ListBoxDivId).innerHTML = str;

            }

        }
        else {
            this.RemoveHintListBox();
            //document.getElementById(this.ListBoxDivId).innerHTML = "";
        }
    }


}

function removeHintListBox() {
    document.getElementById(this.ListBoxDivId).parentNode.removeChild(document.getElementById(this.ListBoxDivId));
}

function hintListMouseOver(id) {
    document.getElementById(id).style.background = this.SelectBackground;
}

function hintListMouseOut(id) {
    document.getElementById(id).style.background = this.Background;
}
//#endregion

//#region Calendar Class //////
function Calendar(ShowDivId, ClassObj) {
    this.Date = new Date();
    this.ShowDivId = ShowDivId;
    this.ClassObj = ClassObj;
    this.CalendarDivId = "Cal" + ShowDivId;
    this.MonthTitleDiv = "Cal" + ShowDivId + "Month";
    this.Top = 0;
    this.Left = 0;
    this.Position = "";
    this.Width = "100";
    this.Height = "100";
    this.Background = "#fff"//"url(backcoverdark.png)";
    this.CalCreateDiv = calCreateDiv;
    this.Sunday = "Sun";
    this.Monday = "Mon";
    this.Tuesday = "Tue";
    this.Wednesday = "Wed";
    this.Thursday = "Thu";
    this.Friday = "Fri";
    this.Saturday = "Sat";
    this.CalCreateTable = calCreateTable;
    this.CalCreateDay = calCreateDay;
    this.CalCreateDayDiv = calCreateDayDiv;
    this.CalCheckDayOfWeek = calCheckDayOfWeek;
    this.FillEmptyBox = fillEmptyBox;
    this.CalAddEvent = calAddEvent;
    this.CalClear = calClear;
    this.NextMonth = nextMonth;
    this.LastMonth = lastMonth;
}

function calAddEvent(id, event, func) {
    div = document.getElementById(id);
    if (div.addEventListener) {
        div.addEventListener(event, func, false);
    }
    else if (div.attachEvent) {
        div.attachEvent("on" + event, func);
    }
}

function nextMonth() {
    var today = this.Date.getDate();
    var todayWeek = this.Date.getDay();
    var todayMonth = this.Date.getMonth();
    var todayYear = this.Date.getFullYear();
    this.Date = new Date(todayYear, todayMonth + 1, today);
    this.CalCreateDay();
}

function lastMonth() {
    var today = this.Date.getDate();
    var todayWeek = this.Date.getDay();
    var todayMonth = this.Date.getMonth();
    var todayYear = this.Date.getFullYear();
    this.Date = new Date(todayYear, todayMonth - 1, today);
    this.CalCreateDay();
}

function calCreateDay() {
    if (document.getElementById(this.CalendarDivId)) {
        this.CalClear();
    }
    this.CalCreateDiv();

    var today = this.Date.getDate();
    var todayWeek = this.Date.getDay();
    var todayMonth = this.Date.getMonth();
    var todayYear = this.Date.getFullYear();

    var NextMonth = todayMonth + 1;
    var NextMonthDate = new Date(todayYear, NextMonth, today);
    var NextMonthDay = NextMonthDate.getDate();
    var DayDiff = new Date(NextMonthDate - this.Date).getDate();

    var firstDayOfMonth = new Date(todayYear, todayMonth, 1);
    this.FillEmptyBox(firstDayOfMonth.getDay());
    document.getElementById(this.MonthTitleDiv).innerHTML = getMonthName(todayMonth) + "," + today + "  " + todayYear;
    for (var i = 0; i < DayDiff; i++) {
        var thisdate = new Date(todayYear, todayMonth, i + 1);
        this.CalCreateDayDiv(this.CalCheckDayOfWeek(thisdate.getDay()), i + 1, thisdate);

    }

}

function getMonthName(monthN) {
    var month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    return month[monthN];
}

function fillEmptyBox(dayOfWeek) {
    switch (dayOfWeek) {
        case 1:
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(0), "", "")
            break;
        case 2:
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(0), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(1), "", "")
            break;
        case 3:
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(0), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(1), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(2), "", "")
            break;
        case 4:
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(0), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(1), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(2), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(3), "", "")
            break;
        case 5:
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(0), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(1), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(2), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(3), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(4), "", "")
            break;
        case 6:
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(0), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(1), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(2), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(3), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(4), "", "")
            this.CalCreateDayDiv(this.CalCheckDayOfWeek(5), "", "")
            break;

    }
}

function calCheckDayOfWeek(dayOfWeek) {
    var weeks = new Array();
    weeks[0] = this.Sunday;
    weeks[1] = this.Monday;
    weeks[2] = this.Tuesday;
    weeks[3] = this.Wednesday;
    weeks[4] = this.Thursday;
    weeks[5] = this.Friday;
    weeks[6] = this.Saturday;

    return weeks[dayOfWeek];
}

function calCreateDayDiv(dayOfWeek, innerHTML, date) {
    var objElement = document.getElementById(dayOfWeek + "Div");
    var newdiv = document.createElement("div");
    newdiv.setAttribute("id", this.CalendarDivId + date);
    Calendar.prototype.CalSingleDate = date;
    newdiv.innerHTML = this.CalSingleDate;
    newdiv.style.width = this.Width;
    newdiv.style.height = this.Height;
    newdiv.style.background = this.Background;
    newdiv.style.position = this.Position;
    newdiv.style.marginTop = this.Top;
    newdiv.style.marginLeft = this.Left;
    objElement.parentNode.insertBefore(newdiv, objElement);
}

function calCreateDiv() {

    var objElement = document.getElementById(this.ShowDivId);
    if (!document.getElementById(this.CalendarDivId)) {
        var newdiv = document.createElement("div");
        newdiv.setAttribute("id", this.CalendarDivId);
        newdiv.setAttribute("class", this.CalendarDivId);
        newdiv.innerHTML = this.CalCreateTable();
        newdiv.style.width = this.Width;
        newdiv.style.height = this.Height;
        newdiv.style.background = this.Background;
        newdiv.style.position = this.Position;
        newdiv.style.marginTop = this.Top;
        newdiv.style.marginLeft = this.Left;
        objElement.parentNode.insertBefore(newdiv, objElement);
    }
    else {
        document.getElementById(this.CalendarDivId).innerHTML = this.CalCreateTable();
    }
}

function calCreateTable() {
    var str = "<table width='0' border='0' cellspacing='0' cellpadding='0'>" +
    "<tr>" +
    "<td colspan='1'><div style='cursor:pointer' onclick='" + this.ClassObj + ".LastMonth();'><</div></td>" +
    "<td colspan='5' align='center'><div id='" + this.MonthTitleDiv + "'></div></td>" +
    "<td colspan='1' align='right'><div style='cursor:pointer' onclick='" + this.ClassObj + ".NextMonth();'>></div></td>" +
  "</tr>" +
  "<tr>" +
    "<td>" + this.Sunday + "</td>" +
    "<td>" + this.Monday + "</td>" +
    "<td>" + this.Tuesday + "</td>" +
    "<td>" + this.Wednesday + "</td>" +
    "<td>" + this.Thursday + "</td>" +
    "<td>" + this.Friday + "</td>" +
    "<td>" + this.Saturday + "</td>" +
  "</tr>" +
  "<tr>" +
    "<td valign='top'><div id='" + this.Sunday + "Div'></div></td>" +
    "<td valign='top'><div id='" + this.Monday + "Div'></div></td>" +
    "<td valign='top'><div id='" + this.Tuesday + "Div'></div></td>" +
    "<td valign='top'><div id='" + this.Wednesday + "Div'></div></td>" +
    "<td valign='top'><div id='" + this.Thursday + "Div'></div></td>" +
    "<td valign='top'><div id='" + this.Friday + "Div'></div></td>" +
    "<td valign='top'><div id='" + this.Saturday + "Div'></div></td>" +
  "</tr>" +
"</table>";
    return str;
}

function calClear() {
    document.getElementById(this.CalendarDivId).innerHTML = "";
}
//#endregion

//#region Tab Panel Class ////// 
function TabPanel(tabs, target) {
    //<<--tab 
    this.TabWidth = "100px";
    this.TabHeight = "20px";
    this.TabBackground = "#ff0";
    this.TabBackgroundRepeat = "";
    this.TabPosition = "static";
    this.TabBorderWidth = "1px";
    this.TabBorderStyle = "solid";
    this.TabBorderColor = "#000";
    this.TabDisplay = "inline-block";
    this.TabMarginTop = "0px";
    this.TabMarginRight = "0px";
    this.TabMarginBottom = "0px";
    this.TabMarginLeft = "0px";
    this.TabPaddingTop = "0px";
    this.TabPaddingRight = "0px";
    this.TabPaddingBottom = "0px";
    this.TabPaddingLeft = "0px";
    this.TabPlacement = "";
    //tab-->>
    //<<--panel
    this.PanelWidth = "600px";
    this.PanelHeight = "400px";
    this.PanelBackground = "#f00";
    this.PanelBackgroundRepeat = "";
    this.PanelPosition = "absolute";
    this.PanelBorderWidth = "1px";
    this.PanelBorderStyle = "solid";
    this.PanelBorderColor = "#000";
    this.PanelDisplay = "block";
    this.PanelMarginTop = "0px";
    this.PanelMarginRight = "0px";
    this.PanelMarginBottom = "0px";
    this.PanelMarginLeft = "0px";
    this.PanelPaddingTop = "0px";
    this.PanelPaddingRight = "0px";
    this.PanelPaddingBottom = "0px";
    this.PanelPaddingLeft = "0px";
    this.PanelZIndex = "0";
    //panel-->>
    this.Content = "";
    this.Target = target;
    this.Tabs = tabs;
    this.CreateTab = tp_createTabs;
    this.CreatePanel = tp_createPanels;
    this.TabEvent = tp_tabevent;
}

function tp_createTabs() {
    var tabs = this.Tabs;
    var tb = tabs.TabInfo
    var target = document.getElementById(this.Target);
    var divid;
    for (var i = 0; i < tb.length; i++) {
        divid = this.Target + "Tab" + i;
        div = document.createElement("span");
        div.setAttribute("id", divid);
        div.style.width = this.TabWidth;
        div.style.height = this.TabHeight;
        div.style.background = this.TabBackground;
        div.style.borderColor = this.TabBorderColor;
        div.style.borderStyle = this.TabBorderStyle;
        div.style.position = this.TabPosition;
        div.style.display = this.TabDisplay;
        div.style.paddingTop = this.TabPaddingTop;
        div.style.paddingRight = this.TabPaddingRight;
        div.style.paddingBottom = this.TabPaddingBottom;
        div.style.paddingLeft = this.TabPaddingLeft;
        div.style.marginTop = this.TabMarginTop;
        div.style.marginRight = this.TabMarginRight;
        div.style.marginBottom = this.TabMarginBottom;
        div.style.marginLeft = this.TabMarginLeft;
        div.style.backgroundRepeat = this.TabBackgroundRepeat;
        if (tb[i]["Selected"] == "True") {
            div.style.borderWidth = "2px";
        }
        else {
            div.style.borderWidth = this.TabBorderWidth;
        }

        div.innerHTML = tb[i]["TabLabel"];
        target.appendChild(div);

        //this.CreatePanel(this.Target, divid, tb[i]["PanelContent"], tb[i]["Selected"]);
    }
    this.CreatePanel();
}

function tp_createPanels() {
    var tabs = this.Tabs;
    var tb = tabs.TabInfo;
    var target = document.getElementById(this.Target);
    var panelid;
    var divid;
    for (var i = 0; i < tb.length; i++) {
        divid = this.Target + "Tab" + i;
        panelid = divid + "Panel";
        paneldiv = document.createElement('div');
        paneldiv.setAttribute("id", panelid);
        paneldiv.style.width = this.PanelWidth;
        paneldiv.style.height = this.PanelHeight;
        paneldiv.style.background = this.PanelBackground;
        paneldiv.style.borderWidth = this.PanelBorderWidth;
        paneldiv.style.borderColor = this.PanelBorderColor;
        paneldiv.style.borderStyle = this.PanelBorderStyle;
        paneldiv.style.position = this.PanelPosition;
        paneldiv.style.display = this.PanelDisplay;
        paneldiv.style.paddingTop = this.PanelPaddingTop;
        paneldiv.style.paddingRight = this.PanelPaddingRight;
        paneldiv.style.paddingBottom = this.PanelPaddingBottom;
        paneldiv.style.paddingLeft = this.PanelPaddingLeft;
        paneldiv.style.marginTop = this.PanelMarginTop;
        paneldiv.style.marginRight = this.PanelMarginRight;
        paneldiv.style.marginBottom = this.PanelMarginBottom;
        paneldiv.style.marginLeft = this.PanelMarginLeft;
        paneldiv.style.backgroundRepeat = this.PanelBackgroundRepeat;
        paneldiv.style.zIndex = this.PanelZIndex;
        paneldiv.innerHTML = tb[i]["PanelContent"];
        if (tb[i]["Selected"] == "True") { paneldiv.style.zIndex = this.PanelZIndex + 1; }
        else { paneldiv.style.zIndex = this.PanelZIndex; }
        var tabborder = this.TabBorderWidth;
        var div = this.Target;
        target.appendChild(paneldiv);
        this.TabEvent(this.Target, divid);
    }
}

function tp_tabevent(target, divid) {
    var panelid = divid + "Panel";
    var tabborder = this.TabBorderWidth;
    var panelzindex = this.PanelZIndex;
    var clickevent = function () {
        var tn = document.getElementById(target).getElementsByTagName("div");
        for (var i = 0; i < tn.length; i++) {
            tn[i].style.zIndex = panelzindex;
        }
        var pn = document.getElementById(target).getElementsByTagName("span");
        for (var n = 0; n < pn.length; n++) {
            pn[n].style.borderWidth = tabborder;
        }
        document.getElementById(panelid).style.zIndex = panelzindex + 1;
        document.getElementById(divid).style.borderWidth = "2px";

    }
    tp_addevent(divid, "click", clickevent);

}

function tp_addevent(id, action, func) {
    div = document.getElementById(id);
    if (div.addEventListener) { div.addEventListener(action, func, false); };
    if (div.attachEvent) { div.attachEvent("on" + action, func); }
}
//#endregion

//#region Datagrid Class //////
function DataGrid(JObj, ClassObj, dgDiv, VisibleColumnArray) {
    this.ClassObj = ClassObj;
    this.CreateDateGrid = createDateGrid;
    this.TableWidth = "100%";
    this.TableBorder = 0;
    this.TableAlign = "default";
    this.TableCellPadding = 0;
    this.TableCellPadding = 0;
    this.JObj = JObj;
    this.DgDiv = dgDiv;
    this.SortBy = sortBy;
    this.SortDirection = { "Field": "Value", "Direction": "Down" };
    this.AlternateRow = true;
    this.ARColor = "#00CCFF";
    this.ARColor2 = "#FFFFFF";
    this.RowHeaderFont = "Century Gothic";
    this.RowHeaderFontColor = "#333333";
    this.RowHeaderFontSize = "12px"
    this.ColumnHeaderColor = "#333333";
    this.ColumnHeaderFont = "Century Gothic";
    this.ColumnHeaderFontColor = "#FFFFFF";
    this.ColumnHeaderFontSize = "14px"
    this.NewColumnHeader = "";
    this.ChangeColumnHeader = changeColumnHeader;
    this.VisibleColumn = VisibleColumnArray;
    this.Event = "click";
    this.DataGridFunction = dataGridFunction;
    this.DataGridAllowEdit = false;
    this.IfDGAllowEditKeepFun = false;
    this.DataGridDataUpdate = dataGridDataUpdate;
    this.FinalUpdateObj = new Array();
    this.DataGridRowMouseOver = dataGridRowMouseOver;
    this.DataGridRowMouseOut = dataGridRowMouseOut;
    this.DataGridRowSelectBackground = "#666666";
}

function sortBy(field) {

    var sortD = this.SortDirection.Direction;
    var sortF = this.SortDirection.Field;


    var DataType = checkDateType(this.JObj, field);
    switch (DataType) {
        case "string":
            this.JObj = this.JObj.sort(sortbyString(field));
            if (sortD != "Down" && sortF == field) {
                this.JObj = this.JObj.reverse();
                this.SortDirection.Field = field;
                this.SortDirection.Direction = "Down";
            }
            else {
                this.SortDirection.Field = field;
                this.SortDirection.Direction = "Up";
            }
            this.CreateDateGrid();
            break;

        case "number":
            this.JObj = this.JObj.sort(sortbyInt(field));
            if (sortD != "Down" && sortF == field) {
                this.JObj = this.JObj.reverse();
                this.SortDirection.Field = field;
                this.SortDirection.Direction = "Down";
            }
            else {
                this.SortDirection.Field = field;
                this.SortDirection.Direction = "Up";
            }
            this.CreateDateGrid();
            break;

        case "object":
            this.JObj = this.JObj.sort(sortbyDate(field));
            if (sortD != "Down" && sortF == field) {
                this.JObj = this.JObj.reverse();
                this.SortDirection.Field = field;
                this.SortDirection.Direction = "Down";
            }
            else {
                this.SortDirection.Field = field;
                this.SortDirection.Direction = "Up";
            }
            this.CreateDateGrid();
            break;
    }


}

function checkDateType(Obj, field) {
    var DataType;
    var Value;
    for (var i = 0; i < Obj.length; i++) {
        Value = Obj[i][field];
        if (Value != "") {
            Value = Number(Value);
            DataType = typeof (Value);

            if (Value.toString() == "NaN") {
                Value = Obj[i][field];
                Value = new Date(Value);
                DataType = typeof (Value);
                if (Value.toString() == "NaN") {
                    DataType = "string";
                    break;
                }
            }
        }

    }
    return DataType;
}

function dataGridFunction(RObj, RowId) {
    alert(RObj.ID);
}

function changeColumnHeader(key) {
    var NCHObj = this.NewColumnHeader;
    for (var k in NCHObj) {
        if (k == key) {
            return NCHObj[k];
        }
    }
    return key;

}

function dataGridRowMouseOver(id, j) {


    document.getElementById(id).style.background = this.DataGridRowSelectBackground;
}

function dataGridRowMouseOut(id, j) {

    if (this.AlternateRow) {
        if (j == 0) {
            bgColor = this.ARColor;


        }
        else if (j == 1) {
            bgColor = this.ARColor2;
        }
    }
    document.getElementById(id).style.background = bgColor;
}

function createDateGrid() {
    var str = "<table width='" + this.TableWidth + "' border='" + this.TableBorder + "' align='" + this.TableAlign + "' cellpadding='" + this.TableCellPadding + "' cellspacing='" + this.TableCellPadding + "'><tr>";
    for (var key in this.JObj[0]) {
        if (this.VisibleColumn != null) {
            var VSCA = this.VisibleColumn;
            for (var VC in VSCA) {
                if (key == VSCA[VC]) {
                    str += "<td style='cursor:pointer;font-family:" + this.ColumnHeaderFont + "; font-size:" + this.ColumnHeaderFontSize + "; color:" + this.ColumnHeaderFontColor + "' bgcolor='" + this.ColumnHeaderColor + "' onclick=\"" + this.ClassObj + ".SortBy('" + key + "')\">" + this.ChangeColumnHeader(key) + "</td>";
                }
            }
        }
        else {
            str += "<td style='cursor:pointer;font-family:" + this.ColumnHeaderFont + "; font-size:" + this.ColumnHeaderFontSize + "; color:" + this.ColumnHeaderFontColor + "' bgcolor='" + this.ColumnHeaderColor + "' onclick=\"" + this.ClassObj + ".SortBy('" + key + "')\">" + this.ChangeColumnHeader(key) + "</td>";
        }

    }
    str += "</tr>";

    var j = 0;
    var bgColor;
    for (var i = 0; i < this.JObj.length; i++) {
        if (this.AlternateRow) {
            if (j == 0) {
                bgColor = "bgcolor='" + this.ARColor + "'";
                j = j + 1;

            }
            else if (j == 1) {
                bgColor = "bgcolor='" + this.ARColor2 + "'";
                j = j - 1;
            }
        }
        if (this.IfDGAllowEditKeepFun == false && this.DataGridAllowEdit == true) {
            str += "<tr style='cursor:pointer;font-family:" + this.RowHeaderFont + "; font-size:" + this.RowHeaderFontSize + "; color:" + this.RowHeaderFontColor + "' " + bgColor + " id='" + this.ClassObj + "Row" + i + "' onmouseover='" + this.ClassObj + ".DataGridRowMouseOver(this.id," + j + ")' onmouseout='" + this.ClassObj + ".DataGridRowMouseOut(this.id," + j + ")'>";
        }
        else {
            str += "<tr style='cursor:pointer;font-family:" + this.RowHeaderFont + "; font-size:" + this.RowHeaderFontSize + "; color:" + this.RowHeaderFontColor + "' " + bgColor + " on" + this.Event + "='" + this.ClassObj + ".DataGridFunction(" + this.ClassObj + ".JObj[" + i + "],this.id)' id='" + this.ClassObj + "Row" + i + "' onmouseover='" + this.ClassObj + ".DataGridRowMouseOver(this.id," + j + ")' onmouseout='" + this.ClassObj + ".DataGridRowMouseOut(this.id," + j + ")'>";
        }


        for (var key in this.JObj[i]) {

            if (this.VisibleColumn != null) {
                var VSCA = this.VisibleColumn;
                for (var VC in VSCA) {
                    if (key == VSCA[VC]) {
                        if (this.DataGridAllowEdit) {
                            var VL = this.JObj[i][key].length + 5;
                            str += "<td><input name='textfield' type='text' id='" + key + "' onchange='" + this.ClassObj + ".DataGridDataUpdate(" + this.ClassObj + ".JObj[" + i + "],this.id,this.value);'  value='" + unescape(this.JObj[i][key]) + "' size='" + VL + "' style='background-color:transparent; border:none;font-family:" + this.RowHeaderFont + "; font-size:" + this.RowHeaderFontSize + "; color:" + this.RowHeaderFontColor + "' /></td>";
                        }
                        else {
                            str += "<td>" + unescape(this.JObj[i][key]) + "</td>";
                        }
                    }
                }
            }
            else {
                if (this.DataGridAllowEdit) {
                    var VL = this.JObj[i][key].length;
                    str += "<td><input name='textfield' type='text' id='" + key + "' onchange='" + this.ClassObj + ".DataGridDataUpdate(" + this.ClassObj + ".JObj[" + i + "],this.id,this.value);' value='" + unescape(this.JObj[i][key]) + "' size='" + VL + "' style='background-color:transparent; border:none;font-family:" + this.RowHeaderFont + "; font-size:" + this.RowHeaderFontSize + "; color:" + this.RowHeaderFontColor + "' /></td>";
                }
                else {
                    str += "<td>" + unescape(this.JObj[i][key]) + "</td>";
                }
            }

        }
        str += "</tr>";

    }

    str += "</table>";
    document.getElementById(this.DgDiv).innerHTML = str;
}

function dataGridDataUpdate(RObj, key, value) {

    for (var k in RObj) {
        if (k == key) {
            RObj[k] = escape(value);
        }
    }
    this.FinalUpdateObj.push(RObj);
    return this.FinalUpdateObj;
}

function sortbyString(field) {

    return function (a, b) {
        a = a[field];
        b = b[field];
        var nameA = a.toLowerCase(), nameB = b.toLowerCase()
        if (nameA < nameB)
            return -1
        if (nameA > nameB)
            return 1
        return 0
    }
}

function sortbyInt(field) {

    return function (a, b) {
        a = a[field];
        b = b[field];
        return a - b
    }
}

function sortbyDate(field) {
    return function (a, b) {
        a = a[field];
        b = b[field];
        var dateA = new Date(a), dateB = new Date(b)
        if (dateA.toString() == "NaN") {
            dateA = new Date();
        }
        if (dateB.toString() == "NaN") {
            dateB = new Date();
        }
        return dateA - dateB;
    }
}
//#endregion

//#region Form Generator Class ///////
function FormGenerator(JsonHandler, TableName, TableStructureObj, TableDataObj, ClassObj) {
    this.tb = new Json(JsonHandler, TableName);
    this.tbS = TableStructureObj;
    this.tbD = TableDataObj;
    this.ClassObj = ClassObj;

    for (var tableName in this.tbS) {
        this.tbS = this.tbS[tableName];
    }
    this.GenerateInsertForm = generateInsertForm;
    this.InsertButton = insertButton;
    this.VisibleColumn = null;
    this.DDLColumn = null;
    this.AutoInsert = false;
    this.GenInputType = genInputType;
    this.ConvertToDDLObj = convertToDDLObj;
    this.TextareaCol = 30;
    this.TextareaRow = 8;
    this.UpdateId = null;
}

function generateInsertForm() {

    str = "<table width='100' border='0' cellspacing='0' cellpadding='0'>";
    for (var key in this.tbS[0]) {
        if (this.VisibleColumn != null) {
            var VSCA = this.VisibleColumn;
            for (var VC in VSCA) {
                if (key == VSCA[VC]) {
                    str += "<tr>" +
                     "<td>" + key + "</td>" +
                     "<td>" + this.GenInputType(this.tbS[0][key], key) + "</td>" +
                     "</tr>";
                }
            }
        }
        else {
            str += "<tr>" +
                "<td>" + key + "</td>" +
                "<td>" + this.GenInputType(this.tbS[0][key], key) + "</td>" +
                "</tr>";
        }
    }
    str += "</table>";
    return str;
}

function genInputType(DateType, key) {
    if (this.UpdateId == null) {
        var str = "";
        var DDLC = this.DDLColumn;
        var DDLObj;
        for (var DC in DDLC) {
            if (key == DC) {
                DateType = "dropdownlist";
                DDLObj = DDLC[DC];
            }
        }
        switch (DateType) {
            case "String":

                str = "<input type='textfield' id='" + this.ClassObj + key + "' value='' /></td>";

                break;

            case "Hidden":

                str = "<input type='hidden' id='" + this.ClassObj + key + "' value='' /></td>";

                break;

            case "Boolean":

                str = "<input type='checkbox' id='" + this.ClassObj + key + "' />"

                break;

            case "Int32":

                str = "<input type='textfield' id='" + this.ClassObj + key + "' value='' /></td>";

                break;

            case "Textarea":

                str = "<textarea name='textarea' id='" + this.ClassObj + key + "' cols='" + this.TextareaCol + "' rows='" + this.TextareaRow + "'></textarea>"

                break;

            case "dropdownlist":

                str = "<select name='select' id='" + this.ClassObj + key + "'>";
                for (var i = 0; i < DDLObj.length; i++) {
                    str += "<option value='" + unescape(DDLObj[i]["key"]) + "'>" + unescape(DDLObj[i]["value"]) + "</option>";
                }
                str += "</select>";

                break;

            case "DateTime":


                str = "<input type='textfield' id='" + this.ClassObj + key + "' value='' /></td>";



                break;

        }

        return str;
    }
    else {
        var dtR = select(this.tbD, this.UpdateId);
        var str = "";
        var DDLC = this.DDLColumn;
        var DDLObj;
        for (var DC in DDLC) {
            if (key == DC) {
                DateType = "dropdownlist";
                DDLObj = DDLC[DC];
            }
        }
        switch (DateType) {
            case "String":

                str = "<input type='textfield' id='" + this.ClassObj + key + "' value='" + unescape(dtR[key]) + "' /></td>";

                break;

            case "Hidden":

                str = "<input type='hidden' id='" + this.ClassObj + key + "' value='" + unescape(dtR[key]) + "' /></td>";

                break;

            case "Boolean":
                if (dtR[key] == "True") {
                    str = "<input type='checkbox' id='" + this.ClassObj + key + "' checked='checked' />"
                }
                else {
                    str = "<input type='checkbox' id='" + this.ClassObj + key + "' />"
                }
                break;

            case "Int32":

                str = "<input type='textfield' id='" + this.ClassObj + key + "' value='" + dtR[key] + "' /></td>";

                break;

            case "Textarea":

                str = "<textarea name='textarea' id='" + this.ClassObj + key + "' cols='" + this.TextareaCol + "' rows='" + this.TextareaRow + "'>" + unescape(dtR[key]) + "</textarea>"

                break;

            case "dropdownlist":

                str = "<select name='select' id='" + this.ClassObj + key + "'>";
                for (var i = 0; i < DDLObj.length; i++) {
                    if (dtR[key] == DDLObj[i]["key"]) {
                        str += "<option value='" + unescape(DDLObj[i]["key"]) + "' selected='selected'>" + unescape(DDLObj[i]["value"]) + "</option>";
                    }
                    else {
                        str += "<option value='" + unescape(DDLObj[i]["key"]) + "'>" + unescape(DDLObj[i]["value"]) + "</option>";
                    }
                }
                str += "</select>";

                break;
            case "DateTime":


                str = "<input type='textfield' id='" + this.ClassObj + key + "' value='' /></td>";



                break;
        }

        return str;
    }
}

function insertButton() {
    var InsertArray = new Array();
    for (var key in this.tbS[0]) {
        if (this.VisibleColumn != null) {
            var VSCA = this.VisibleColumn;
            for (var VC in VSCA) {
                if (key == VSCA[VC]) {
                    if (this.tbS[0][key] == "Boolean") {
                        InsertArray[key] = document.getElementById(this.ClassObj + key).checked;
                    }
                    else {
                        InsertArray[key] = escape(document.getElementById(this.ClassObj + key).value);
                    }
                    break;
                }
                else {
                    InsertArray[key] = null;
                }
            }
        }
        else {
            if (this.tbS[0][key] == "Boolean") {
                InsertArray[key] = document.getElementById(this.ClassObj + key).checked;
            }
            else {
                InsertArray[key] = escape(document.getElementById(this.ClassObj + key).value);
            }
        }
    }
    if (this.AutoInsert == true && this.UpdateId == null) {
        return this.tb.Insert(InsertArray);
    }
    else if (this.AutoInsert == true && this.UpdateId != null) {
        InsertArray["ID"] = this.UpdateId;
        return this.tb.Update(InsertArray);
    }
    else {
        return InsertArray;
    }
}

function convertToDDLObj(JSonObj, key, value) {
    var ddlo = "[";
    for (var i = 0; i < JSonObj.length; i++) {

        ddlo += '{"key":"' + JSonObj[i][key] + '","value":"' + JSonObj[i][value] + '"},'

    }
    ddlo = ddlo.substring(0, ddlo.length - 1)
    ddlo += "]";
    ddlo = eval('(' + ddlo + ')');
    return ddlo;
}
//#endregion

//#region Drop Down List Class ///////
function DropDownList(JObj, ClassObj) {
    this.JObj = JObj;
    this.ClassObj = ClassObj;
    this.GetDropDownList = getDropDownList;
}

function getDropDownList() {
    var dt = this.JObj;
    var str = "<table id='ddlTableId'><tr>";
    var divId = this.ClassObj;
    var dtM = search(dt, "Mainmenuid", 0);
    for (var i = 0; i < dtM.length; i++) {
        var dtc = search(dt, "Mainmenuid", dtM[i]["ID"]);
        str += "<td onmouseover=\"showHideDdl('" + divId + i + "','show')\" onmouseout=\"showHideDdl('" + divId + i + "','hide')\" onclick=\"window.location.assign('" + dtM[i]["Menuurl"] + "')\">" + dtM[i]["Menuname"] + "<div id='" + divId + i + "'>";
        for (var j = 0; j < dtc.length; j++) {
            str += "<a href='" + dtc[j]["Menuurl"] + "'><li>" + dtc[j]["Menuname"] + "</li></a>";
        }
        str += "</div></td>";
    }
    str += "</tr></table>";
    return str;
}

function showHideDdl(divId, showHide) {
    var divList = document.getElementById(divId);
    if (showHide == "show") {

        divList.style.visibility = "visible";
    }
    else if (showHide == "hide") {
        divList.style.visibility = "hidden";
    }
}
//#endregion

//#region Slide Show Class ////////
function SlideShow(JObj, SlideShowDiv, ClassObj, ThumbNailDiv, ThumbNailStyle) {
    this.JObj = JObj;
    this.Delay = 2000;
    this.StartSlideShow = true;
    this.CreateSlideShow = createSlideShow;
    this.JObjLength = JObj.length;
    this.PictureIndex = 0;
    this.ClassObj = ClassObj;
    this.SlideShowDiv = SlideShowDiv;
    this.PicturePathColumn = "PicPath";
    this.SlideShowInsertImage = slideShowInsertImage;
    this.ThumbNailDiv = ThumbNailDiv;
    this.ImageWidth = 700;
    this.ImageHeight = 500;
    this.ImageBorder = "2";
    this.ImagePath = "";
    this.ImageBorderColor = "#FFFFFF";
    this.ThumbNailImageWidth = 150;
    this.ThumbNailImageHeight = 150;
    this.ThumbNailBorder = "2";
    this.ThumbNailBorderColor = "#333333";
    this.ThumbNailActiveBorderColor = "#FFFFFF";
    this.ThumbNailBackHTML = "<div style='font-family:Arial, Helvetica, sans-serif; color:#FFF;font-weight:bold; font-size:14px;cursor:pointer'><</div>";
    this.ThumbNailForeHTML = "<div style='font-family:Arial, Helvetica, sans-serif; color:#FFF;font-weight:bold; font-size:14px;cursor:pointer'>></div>";
    this.ThumbNailHTMLHeightOrWidth = 30;
    this.SlideShowThumbNail = slideShowThumbNail;
    this.SlideShowThumbNailVertical = slideShowThumbNailVertical;
    this.SlideShowThumbNailBorderColorChange = slideShowThumbNailBorderColorChange;
    this.SlideShowTNScrollLeft = slideShowTNScrollLeft;
    this.SlideShowTNScrollRight = slideShowTNScrollRight;
    this.SlideShowTNScrollUp = slideShowTNScrollUp;
    this.SlideShowTNScrollDown = slideShowTNScrollDown;
    this.SlideShowTNScrollSpeed = 100;
    this.SlideShowTNScrollIncrement = 100;
    this.SlideShowTNScrollDelay = 50;
    this.SlideShowTNScrollTimer = null;
    if (this.StartSlideShow) {
        this.CreateSlideShow();
        if (ThumbNailStyle == "H") {
            this.SlideShowThumbNail();
        }
        else {
            this.SlideShowThumbNailVertical();
        }
    }


}

function createSlideShow() {
    var str;

    if (this.PictureIndex < this.JObjLength) {
        this.SlideShowInsertImage(this.PictureIndex);
        this.PictureIndex = this.PictureIndex + 1;

    }
    else {
        this.PictureIndex = 0;
    }
    var t = setTimeout(this.ClassObj + ".CreateSlideShow()", this.Delay);
}

function slideShowThumbNailBorderColorChange(i) {
    try {

        for (var j = 0; j < this.JObjLength; j++) {
            document.getElementById(this.ClassObj + "SSTNIMG" + j).style.borderColor = this.ThumbNailBorderColor;
        }
        document.getElementById(this.ClassObj + "SSTNIMG" + i).style.borderColor = this.ThumbNailActiveBorderColor;



    }
    catch (e) {

    }
}

function slideShowThumbNailVertical() {
    var divH = this.ImageHeight - this.ThumbNailHTMLHeightOrWidth;
    var tbH = this.ThumbNailHTMLHeightOrWidth / 2;
    var str = "<table cellspacing='0' cellpadding='0' height='" + this.ImageHeight + "'><tr><td height='" + tbH + "' onmouseout='clearTimeout(" + this.ClassObj + ".SlideShowTNScrollTimer)' onmouseover='" + this.ClassObj + ".SlideShowTNScrollDown();' bgcolor='" + this.ThumbNailBorderColor + "'>" + this.ThumbNailBackHTML + "</td></tr><tr><td><div id='" + this.ClassObj + "TNDIV' style='overflow:hidden; height:" + divH + "px'><table cellspacing='0' cellpadding='0'>";
    for (var i = 0; i < this.JObjLength; i++) {
        str += "<tr><td><img id='" + this.ClassObj + "SSTNIMG" + i + "' border='" + this.ThumbNailBorder + "' style='border-color:" + this.ThumbNailBorderColor + "' width='" + this.ThumbNailImageWidth + "' height='" + this.ThumbNailImageHeight + "' src='" + this.ImagePath + this.JObj[i][this.PicturePathColumn] + "' onclick='" + this.ClassObj + ".SlideShowInsertImage(" + i + ")' /></td></tr>";
    }
    str += "</table></div></td></tr><tr><td width='10px' onmouseout='clearTimeout(" + this.ClassObj + ".SlideShowTNScrollTimer)' onmouseover='" + this.ClassObj + ".SlideShowTNScrollUp();' bgcolor='" + this.ThumbNailBorderColor + "'>" + this.ThumbNailForeHTML + "</td></tr></table>";
    try {
        document.getElementById(this.ThumbNailDiv).innerHTML = str;
    }
    catch (e) {
        var tt = setTimeout(this.ClassObj + ".SlideShowThumbNailVertical()", this.Delay);
    }


}

function slideShowThumbNail() {
    var divW = this.ImageWidth - this.ThumbNailHTMLHeightOrWidth;
    var tbW = this.ThumbNailHTMLHeightOrWidth / 2;
    var str = "<table cellspacing='0' cellpadding='0' width='" + this.ImageWidth + "'><tr><td width='" + tbW + "' onmouseout='clearTimeout(" + this.ClassObj + ".SlideShowTNScrollTimer)' onmouseover='" + this.ClassObj + ".SlideShowTNScrollRight();' bgcolor='" + this.ThumbNailBorderColor + "'>" + this.ThumbNailBackHTML + "</td><td><div id='" + this.ClassObj + "TNDIV' style='overflow:hidden; width:" + divW + "px'><table cellspacing='0' cellpadding='0'><tr>";
    for (var i = 0; i < this.JObjLength; i++) {
        str += "<td><img id='" + this.ClassObj + "SSTNIMG" + i + "' border='" + this.ThumbNailBorder + "' style='border-color:" + this.ThumbNailBorderColor + "' width='" + this.ThumbNailImageWidth + "' height='" + this.ThumbNailImageHeight + "' src='" + this.ImagePath + this.JObj[i][this.PicturePathColumn] + "' onclick='" + this.ClassObj + ".SlideShowInsertImage(" + i + ")' /></td>";
    }
    str += "</tr></table></div></td><td width='10px' onmouseout='clearTimeout(" + this.ClassObj + ".SlideShowTNScrollTimer)' onmouseover='" + this.ClassObj + ".SlideShowTNScrollLeft();' bgcolor='" + this.ThumbNailBorderColor + "'>" + this.ThumbNailForeHTML + "</td></tr></table>";
    try {
        document.getElementById(this.ThumbNailDiv).innerHTML = str;
    }
    catch (e) {
        var tt = setTimeout(this.ClassObj + ".SlideShowThumbNail()", this.Delay);
    }


}

function slideShowTNScrollUp() {

    var TNDIV = document.getElementById(this.ClassObj + "TNDIV");
    if (this.SlideShowTNScrollSpeed < this.ThumbNailImageHeight * this.JObjLength) {
        this.SlideShowTNScrollSpeed = this.SlideShowTNScrollSpeed + this.SlideShowTNScrollIncrement;

        TNDIV.scrollTop = this.SlideShowTNScrollSpeed;
        this.SlideShowTNScrollTimer = setTimeout(this.ClassObj + ".SlideShowTNScrollUp()", this.SlideShowTNScrollDelay);
    }
}

function slideShowTNScrollDown() {

    if (this.SlideShowTNScrollSpeed > 0) {
        var TNDIV = document.getElementById(this.ClassObj + "TNDIV");
        this.SlideShowTNScrollSpeed = this.SlideShowTNScrollSpeed - this.SlideShowTNScrollIncrement;

        TNDIV.scrollTop = this.SlideShowTNScrollSpeed;
        this.SlideShowTNScrollTimer = setTimeout(this.ClassObj + ".SlideShowTNScrollDown()", this.SlideShowTNScrollDelay);
    }
}

function slideShowTNScrollLeft() {

    var TNDIV = document.getElementById(this.ClassObj + "TNDIV");
    if (this.SlideShowTNScrollSpeed < this.ThumbNailImageWidth * this.JObjLength) {
        this.SlideShowTNScrollSpeed = this.SlideShowTNScrollSpeed + this.SlideShowTNScrollIncrement;

        TNDIV.scrollLeft = this.SlideShowTNScrollSpeed;
        this.SlideShowTNScrollTimer = setTimeout(this.ClassObj + ".SlideShowTNScrollLeft()", this.SlideShowTNScrollDelay);
    }
}

function slideShowTNScrollRight() {

    if (this.SlideShowTNScrollSpeed > 0) {
        var TNDIV = document.getElementById(this.ClassObj + "TNDIV");
        this.SlideShowTNScrollSpeed = this.SlideShowTNScrollSpeed - this.SlideShowTNScrollIncrement;

        TNDIV.scrollLeft = this.SlideShowTNScrollSpeed;
        this.SlideShowTNScrollTimer = setTimeout(this.ClassObj + ".SlideShowTNScrollRight()", this.SlideShowTNScrollDelay);
    }
}

function slideShowInsertImage(pIndex) {
    this.PictureIndex = pIndex;
    str = "<img border='" + this.ImageBorder + "' style='border-color:" + this.ImageBorderColor + "' width='" + this.ImageWidth + "' height='" + this.ImageHeight + "' src='" + this.ImagePath + this.JObj[pIndex][this.PicturePathColumn] + "' />";
    this.SlideShowThumbNailBorderColorChange(this.PictureIndex);
    try {
        document.getElementById(this.SlideShowDiv).innerHTML = str;
    }
    catch (e)
        { }

}
//#endregion

///#region Loading Bar ////

function LoadingBar(parentDiv, SizeType) {
    this.SizeType = SizeType;
    this.ParentDiv = parentDiv;
    this.SliderDiv = "SliderDiv" + parentDiv;
    this.Top = 0;
    this.Left = 0;
    this.Position = "fixed";
    this.Width = 100;
    this.Height = 20;
    this.Background = "#FFF"//"url(backcoverdark.png)";
    this.Delay = 100;
    this.Increment = 100;
    this.MaxHeight = 100;
    this.MaxWidth = 100;
    this.CreateLoadingBar = LB_CreateLoadingBar;
    this.RemoveLoadingBar = LB_RemoveLoadingBar;
    this.StartLoading = LB_StartLoading;
    this.Zindex = 9999;
}
function LB_StartLoading(Func, FunctionName) {
    var FunctionStr = "";
    var FunctionArray = Func.toString().split("function " + FunctionName + "()");
    var FunctionArray = FunctionArray[1].split(";;");
    for (var i = 0; i < FunctionArray.length; i++) {
        FunctionStr += FunctionArray[i] + ";LB.CreateLoadingBar(" + i + ")";
    }
    var FinalFunction = eval(FunctionStr);

}
function LB_CreateLoadingBar(innerHTML) {
    if (document.getElementById(this.SliderDiv)) {
        document.getElementById(this.SliderDiv).innerHTML = innerHTML;
    }
    else {
        if (this.ParentDiv == "body") {
            var objElement = document.body;
        }
        else {
            var objElement = document.getElementById(this.ParentDiv);
        }
        var newdiv = document.createElement("div");
        newdiv.setAttribute("id", this.SliderDiv);
        newdiv.innerHTML = innerHTML;
        newdiv.style.width = this.Width + this.SizeType;
        newdiv.style.height = this.Height + this.SizeType;
        newdiv.style.background = this.Background;
        newdiv.style.position = this.Position;
        newdiv.style.marginTop = this.Top + this.SizeType;
        newdiv.style.marginLeft = this.Left + this.SizeType;
        newdiv.style.overflow = "hidden";
        newdiv.style.zIndex = this.Zindex;
        objElement.parentNode.insertBefore(newdiv, objElement);
    }
}

function LB_RemoveLoadingBar() {
    document.getElementById(this.SliderDiv).parentNode.removeChild(document.getElementById(this.SliderDiv));
}

///#endregion

///#region Settimeout Timer Class///
function TimerFunction(functionTocall, newClassObjName) {
    this.FunctionToCall = functionTocall;
    this.NewClassObjName = newClassObjName;
    this.TimerFun = timerFun;
    this.TimerFun();
}

function timerFun() {
    try {
        this.FunctionToCall();
        sessionStorage.removeItem(this.NewClassObjName);
    }
    catch (e) {
        sessionStorage.setItem(this.NewClassObjName, "running");
        setTimeout(this.NewClassObjName + ".TimerFun()", 1000);
    }
}
///#endregion