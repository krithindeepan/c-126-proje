var song1=""
var song2=""
song1_status=""
song2_status=""
scoreL=0
leftWristx=0
scoreR=0
leftWristy=0
rightWristx=0
rightWristy=0
function preload() {
song1=loadSound("music.mp3")
song2=loadSound("music2.mp3")
}
function setup() {
canvas=createCanvas(600,500)
canvas.center()
video=createCapture(VIDEO)
video.hide()
poseNet=ml5.poseNet(video,modelloaded)
poseNet.on('pose',gotposes)
}
function gotposes(results) {
if(results.length>0)
{
    scoreL=results[0].pose.keypoints[9].score
    scoreR=results[0].pose.keypoints[10].score
leftWristx=results[0].pose.leftWrist.x
leftWristy=results[0].pose.leftWrist.y
rightWristx=results[0].pose.rightWrist.x
rightWristy=results[0].pose.rightWrist.y
}

}
function modelloaded() {
    console.log("modelisloaded")
}
function draw() {
    image(video,0,0,600,500)
    fill("red")
    stroke("black")
    song1_status=song1.isPlaying()
    song2_status=song2.isPlaying()
    if(scoreL>0.2)
{
circle(leftWristx,leftWristy,20)
song2.stop()
if(song1_status==false)
{
    song1.play()
}
}
if(scoreR>0.2)
{
circle(rightWristx,rightWristy,20)
song1.stop()
if(song2_status==false)
{
    song2.play()
}
}
}
function play(){
    song1.play()
}
