
let click =2;

function create(){

    let position=1;
    let name= $("#filename").val();

    //----------regular expresion------------
    let reg1= $("#regx1").val();
    let reg2= $("#regx2").val().length;
    reg2='\\d{'+reg2+'}';

    let reg3= $("#regx3").val().length;
    let reg4= $("#regx4").val().length;

    if (reg3>0){
    reg3="_\\d{"+reg3+"}";
    }else{
        reg3="";
    }
    if (reg4>0){
        reg4="_\\d{"+reg4+"}";
    }else{
        reg4="";
    }

    //---------script and process 1 body ---------
    let script = $("#fdata2").val();

    let process = '\n\t\t<process>'+
                        '\n\t\t\t<position>'+position+'</position>'+
                        '\n\t\t\t<script>'+ script + '</script>'+
                 '\n\t\t</process>';

    //------------foppy-----------------
    let foppy ="";
    let f = $('#foppy').val();
    let duplex="";
    if(f!==""){
        position =position+1;
        if (f=== "Foppy"){
            duplex="";
        } else{
            duplex = "\n\t\t\t<duplex>1</duplex>";
        }
        foppy= "\n\t\t<process spoils=\"true\">" +
                "\n\t\t\t<position>"+position+"</position>" +
                "\n\t\t\t<script>foppy.pl</script>" +
                "\n\t\t\t<dir>foppy/[path]</dir>" +
                "\n\t\t\t<xsl>Letters.xsl</xsl>" + duplex +
                "\n\t\t\t<output-folder>1. data to run/xerox</output-folder>" +
                "\n\t\t</process>"
    }

    //----------- autopilot ---------------
    let autopilot="";
    let a= $('#autopilot').val();

    if (a!=="") {
        position = position + 1;

        let extension = "ps";
        let cont = ""

        switch (a) {
            case "Autopilot PDF":
                extension = "pdf"
                ;
                break
            case "Autopilot PDF Conti":
                extension = "pdf"
                cont = '\n\t\t<continuations>' +
                    '\n\t\t\t<xpath>/data/metadata/quantities/continuations</xpath>' +
                    '\n\t\t</continuations>'
                ;
                break
            case "Autopilot PS Conti":
                cont = '\n\t\t\t<continuations>' +
                    '\n\t\t\t\t<xpath>/data/metadata/quantities/continuations</xpath>' +
                    '\n\t\t\t</continuations>'
                ;
                break
        }

           autopilot = '\n\t\t<process>' +
            '\n\t\t\t<position>' + position + '</position>' +
            '\n\t\t\t<script>Autopilot</script>' +
            '\n\t\t\t<application>' + name + '</application>' +
            '\n\t\t\t<extension>' + extension + '</extension>' +
            '\n\t\t\t<quantity>count(/data/items/item)</quantity>' +
            cont +
            '\n\t\t</process>';
    }else{
        autopilot="";
    }

    let job = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>'+ '\n<job>'+
        '\n\t<name>'+name+'</name>' + '\n\t<regex>'+reg1+reg2+reg3+reg4+'</regex>' +'\n\t<processes>' +
        process + foppy+ autopilot+'\n\t</processes>'+'\n</job>';






    return job
};

$(".add").click(function () {


    if(click===4){click=4}
    else{click++}

    console.log(click);
    $("#field"+(click)).css("display","block");
});
$(".del").click(function () {

    $("#field"+(click)).css("display","none");
    if (click===2){click=2}
    else{click--}

console.log(click);

});



$("#create").click(function () {



    let details =create() ;
    $('textarea.text').val(details);

});