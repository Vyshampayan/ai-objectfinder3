status="";
objects=[];

function setup(){
canvas=createCanvas(400,300);
canvas.center();

video = createCapture(VIDEO);
video.size(400,300);
video.hide();

}

function start(){
    objectDetector= ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";

    object_find= document.getElementById("object_name").value;
}

function modelloaded(){
    console.log("model loaded!");
    status=true;
}
function draw(){
    image(video,0,0,400,300);
    if(status !=""){
        objectDetector.detect(video,gotResults)
    
        for(i=0; i < objects.length; i++){
        document.getElementById("status").innerHTML="Status : objects detected";
    
        percent=floor(objects[i].confidence*100);
        fill("red");
        text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke("red");
        rect(objects[i].width,objects[i].height,objects[i].x,objects[i].y);

        if(object_find == objects[i].label){
            document.getElementById("object_status").innerHTML="object found";
            }
        }
        }
        
}
function gotResults(error,results){
    if(error){
        console.log("error");
    }
    else{
        console.log(results);
        objects=results;
    }
}