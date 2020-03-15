
const ConvertModes={
    "to-katagana": 0,
    "to-hiragana": 1,
    "shuffle": 2,
};
var convertMode     = ConvertModes["to-katakana"];
var useRandomize    = false;
var randomizeSeed   = null;


$("#convert-mode").change(function(){
    convertMode = ConvertModes[ $(this).val() ];
    convert();
});

$("#use-randomize").change(function(){
    useRandomize = $(this).is(':checked');
    convert();
});

$("#randomize-seed").change(function(){
    randomizeSeed = $(this).val();
});

$("#kc-src-text").on( "keyup change paste",function(){
    convert();
});


function convert(){
    var str = $("#kc-src-text").val();

    switch(convertMode){
        case ConvertModes["to-katakana"]:
            str = convertKana(str,true);
            break;
        case ConvertModes["to-hiragana"]:
            str = convertKana(str,false);
            break;
        case ConvertModes["shuffle"]:
            str = convertKana(str,true);
            str = convertKana(str,false);
            break;
    }
    $('#kc-dst-text').val(str);
}



function convertKana(str,isKatakana){
    var range = isKatakana ? /[\u3041-\u3096]/g : /[\u30a1-\u30f6]/g;
    var sign = isKatakana ? 1 : -1;

    setupSeed();
    return str.replace(range, function(m)
    {
        return String.fromCharCode(m.charCodeAt(0) + getAdditional()*sign );
    });
}

function setupSeed()
{
    // MADA NAI
}

function isRandomize()
{
    return convertMode==ConvertModes["shuffle"] || useRandomize;
}

function getAdditional()
{
    return (isRandomize() && Math.random()>0.5) ? 0 : 0x60;
}
