var fastXmlParser = require('fast-xml-parser');
var he = require('he');

var options = {
    attributeNamePrefix : "",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : false,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    localeRange: "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly: false,
    attrValueProcessor: a => he.decode(a, {isAttributeValue: true}),//default is a=>a
    tagValueProcessor : a => he.decode(a) //default is a=>a
};


var parse = function(xmlString){
    if(fastXmlParser.validate(xmlString)=== true){//optional
        var jsonObj = fastXmlParser.parse(xmlString,options);
        var entry = jsonObj.entry;
        var book = {};
        book.author = entry.author.name;
        var attributes = entry["db:attribute"];
        if(attributes && attributes.length > 0){
            for(let attribute of attributes){
                if(attribute.attr.name == "subtitle"){
                    book.subtitle = attribute["#text"];
                }else if(attribute.attr.name == "isbn13"){
                    book.isbn = attribute["#text"];
                }else if(attribute.attr.name == "title"){
                    book.title = attribute["#text"];
                }else if(attribute.attr.name == "pages"){
                    book.pages = attribute["#text"];
                }else if(attribute.attr.name == "publisher"){
                    book.publisher = attribute["#text"];
                }else if(attribute.attr.name == "binding"){
                    book.binding = attribute["#text"];
                }else if(attribute.attr.name == "pubdate"){
                    book.pubdate = attribute["#text"];
                }else if(attribute.attr.name == "price"){
                    book.price = attribute["#text"];
                }
            }
        }
        var links = entry.link;
        if(links && links.length > 0){
            for(let link of links){
                switch(link.attr.rel){
                    case "image":
                        book.image = link.attr.href;
                }
            }
        }
        return book;
    }
}

exports.parse = parse;