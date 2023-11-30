var sound2=''
var sound=''
var leftWristX=0;
var leftWristY=0;
var rightWristX=0;
var rightWristY=0;
var scoreLeftWrist=0;
var scoreRightWrist=0;
function preload(){
    sound=loadSound('music.mp3');
    sound2=loadSound('Marshmello - Alone.mp3')
}

function setup() {
   canvas=createCanvas(400,300);
   canvas.position(490,200);
   video=createCapture(VIDEO);
   video.hide();

   poseNet=ml5.poseNet(video,modelLoaded);
   poseNet.on('pose',gotPoses);
}

function tocar(){
    sound.play();
    sound.setVolume(0.3);
    sound.rate(1);
}
function modelLoaded() {
    console.log('modelo carregado');
}
function draw() {
    image(video,0,0,399,399)
    fill('red');
    stroke('red'); 
    sound_status=sound.isPlaying();
    sound2_status=sound2.isPlaying();
    if (scoreLeftWrist>0.2) {
        circle(leftWristX,leftWristY,21);
        sound.stop();
        if (sound2_status==false) {
            sound2.play()
        }
    }
    if (scoreRightWrist>0.2) {
        circle(rightWristX,rightWristY,21);
        sound2.stop();
        if (sound_status==false) {
            sound.play()
        }
    }
}
function gotPoses(results) {
    if (results.length>0) {
        console.log(results)
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
    }

}