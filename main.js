let alerts;
statuss = "";
array=[]; 
function preload(){ 
    alerts= loadSound('Downloads\Kesariya.mp3');
}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video= createCapture(380,380);
    video.size(380,380);
    video.hide();
    objectdetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting objects..."
}
function draw(){
    image(img,0,0,640,320);
    if (array[0].label=="person"){
        console.log("entered");
        for (i=0;i<array.length;i++){
            r=random(255);
            g=random(255);
            b=random(255);
            fill(r,g,b);
            showtext=Math.floor(array[i].confidence*100);
            text(array[i].label+" - "+showtext+"%",array[i].x+10,array[i].y+10)
            noFill();
            stroke(r,g,b);
            rect(array[i].x-250,array[i].y-150,array[i].height,array[i].width);
        }
        document.getElementById("status").innerHTML="Baby detected!"
        alert.stop();
    } else{
        document.getElementById("status").innerHTML="Baby detected!"
        alert.play();
    }
    if (array[0].length<=0){
        document.getElementById("status").innerHTML="Baby detected!"
        alert.play();
    }
    
}
function modelLoaded(){
    console.log("Model Loaded!")
    statuss="true";
    objectdetector.detect(img,gotResults);
}
function gotResults(error,results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        array=results;
    }
}
