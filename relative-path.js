/**
 * RelativePath.js
 * This is a simple script that enables the use of relative(%) values for defining svg paths
 * @author divinemaniac (Bikash Paneru)
 * @version 1.0
 * @license MIT
 * @url https://github.com/mrdivinemaniac/RelativePath.js
 */
var RelativePath = {
    elems: [],
    add: function(elem, width, height) {
        if(width) elem.dataset.width = width;
        if(height) elem.dataset.height = height;
        elems.push(elem);
        RelativePath.processElem(elem);
    },
    THRESHOLD: {
        SM: 568,
        MD: 768,
        LG: 1024,
        XL: 1280
    }
};

RelativePath.getDimension = function(elem, code, type) {
    if(!code) code = "parent";
    code = code.trim();
    var num = parseInt(code);
    if(isNaN(num)) {
        var lower = code.toLowerCase();
        if(lower == "parent" || lower == "100%") {
            if(type == 0) return elem.parentNode.getBoundingClientRect().width;
            else return elem.parentNode.getBoundingClientRect().height;
        } else if (lower == "window") {
            if(type == 0) return window.innerWidth;
            else return window.innerHeight;
        } else {
            return eval(code);
        }
    } else {
        return num;
    }
};

RelativePath.convert = function(value, width, height) {
    value = value.trim();
    var newVal = "";
    var numBuffer = "";
    var afterComma = false;

    //Take all numeric values before percentage and convert them
    for(i = 0; i<value.length; ++i) {              
        //Check if current character is a number
        if(value[i] != '-' && isNaN(parseInt(value[i]))) {
            if(value[i] == ',') {
                //Write and Empty the number buffer
                newVal += numBuffer;
                numBuffer = "";

                afterComma = true;
                newVal += ',';
            } else if (value[i] == '%') {
                //Convert the number buffer to absolute value
                var num = parseInt(numBuffer)/100;
                if(afterComma) {
                    //This is a y coordinate
                    num *= height;
                } else {
                    //This is an x coordinate
                    num *= width;
                }
                //Write and Empty the number buffer
                newVal += num;
                numBuffer = "";

                afterComma = false;
            } else {
                //Write and Empty the number buffer
                newVal += numBuffer;
                numBuffer = "";

                afterComma = false;
                newVal += value[i];
            }
        } else {
            //Add the number to a buffer
            numBuffer += value[i];
        }
    }

    //Flush the number buffer
    newVal += numBuffer;

    return newVal;
};

RelativePath.processElem = function(elem) {
    var data = elem.dataset;
    var width = RelativePath.getDimension(elem, data.relWidth, 0);
    var height = RelativePath.getDimension(elem, data.relHeight, 1);

    var winW = window.innerWidth;
    var thres = RelativePath.THRESHOLD;

    if(data.relDXl && winW >= thres.XL)
        elem.setAttribute("d", RelativePath.convert(data.relDXl, width, height));
    else if (data.relDLg && winW >= thres.LG)
        elem.setAttribute("d", RelativePath.convert(data.relDLg, width, height));
    else if (data.relDMd && winW >= thres.MD)
        elem.setAttribute("d", RelativePath.convert(data.relDMd, width, height));
        else if (data.relDSm && winW >= thres.SM)
        elem.setAttribute("d", RelativePath.convert(data.relDSm, width, height));
    else
        elem.setAttribute("d", RelativePath.convert(data.relD, width, height));

};

RelativePath.processElems = function() {
    var elems = RelativePath.elems;
    for(var i=0; i < elems.length; ++i) {
        RelativePath.processElem(elems[i]);
    }
};

RelativePath.auto = function() {
    RelativePath.elems = document.querySelectorAll("path[data-rel-d]");
    RelativePath.processElems();
};

window.addEventListener("resize", RelativePath.processElems);