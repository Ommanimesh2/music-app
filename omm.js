const up =document.querySelector(".yoursongs")
const ys=document.querySelector(".uploadsongs")
const upload=document.querySelector(".upload")
const songlist=document.querySelector(".songlist")
let songItems = Array.from(document.getElementsByClassName('songitems'));
const Seekbar=document.getElementById("seekbar")
let songNumber = 0;
const audio = new Audio('songs/1.mp3');
const displaysongname=document.querySelector(".display")
const pause=document.querySelector("#pause")
const timecomp=document.querySelector(".timecomp")

const songarr=[
   {displayname:"song1",songpath:"songs/1.mp3"},
   {displayname:"song2",songpath:"songs/2.mp3"},
   {displayname:"song3",songpath:"songs/3.mp3"},
   {displayname:"song4",songpath:"songs/4.mp3"},
   {displayname:"song5",songpath:"songs/5.mp3"},
]
Seekbar.value=0

for(let i=0;i<5;i++){

    
    let hut=document.createElement("div");
    hut.innerHTML=songarr[i].displayname;
    hut.classList.add("songitems")
  
    console.log(hut)
    songlist.appendChild(hut)
    let te=hut.innerHTML

    hut.addEventListener("mouseover",()=>{
        hut.innerHTML="PLAY"
        
    })
    hut.addEventListener("mouseout",()=>{
        
        hut.innerHTML=te
    })
    hut.addEventListener("click",(e)=>{
        songNumber =i;
        displaysongname.innerText = songarr[songNumber].displayname;
        audio.currentTime=0;
        audio.src = `songs/${songNumber+1}.mp3`;
        pause.classList.remove('fa-play-circle');

        pause.classList.add('fa-pause-circle');

        audio.play()
    })


}

audio.addEventListener('timeupdate', ()=>{ 
    
    progress = parseInt((audio.currentTime/audio.duration)* 100); 
    timecomp.innerHTML=convertToTime(Math.floor(audio.currentTime))+" / "+convertToTime(audio.duration)
    Seekbar.value = progress;
})

Seekbar.addEventListener('change', ()=>{
    audio.currentTime = Seekbar.value * audio.duration/100;
})
up.addEventListener("click",()=>{
  
upload.classList.toggle('active')
songlist.classList.remove("active")
})
ys.addEventListener("click",()=>{
    
    upload.classList.remove("active")
songlist.classList.toggle('active')
})
document.querySelector("#forward").addEventListener('click', ()=>{
    if(songNumber>=9){
        songNumber = 0
    }
    else{
        songNumber += 1;
    }
    audio.src = `songs/${songNumber+1}.mp3`;
    displaysongname.innerText = songarr[songNumber].displayname;
    audio.currentTime = 0;
    audio.play();
    pause.classList.remove('fa-play-circle');
    pause.classList.add('fa-pause-circle');

})

document.querySelector('#backward').addEventListener('click', ()=>{
    if(songNumber<=0){
        songNumber = 0
    }
    else{
        songNumber -= 1;
    }
    audio.src = `songs/${songNumber+1}.mp3`;
    displaysongname.innerText = songarr[songNumber].displayname;
    audio.currentTime = 0;
    audio.play();
    pause.classList.remove('fa-play-circle');
    pause.classList.add('fa-pause-circle');
})
pause.addEventListener('click', ()=>{
    if(audio.paused || audio.currentTime<=0){
        audio.play();
        pause.classList.remove('fa-play-circle');
        pause.classList.add('fa-pause-circle');
        
    }
    else{
        audio.pause();
        pause.classList.remove('fa-pause-circle');
        pause.classList.add('fa-play-circle');
        
    }
})
function convertToTime(secs) {
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
  
    if (min < 10){ 
      min = "0" + min; 
    }
    if (sec < 10){ 
      sec  = "0" + sec;
    }
    return min + ':' + sec;
  }
function uploadedsongs(){
    let div=document.createElement("audio")
    div.classList.add('.aud')
    Seekbar.value=0
    const profileAud = document.querySelector('input.profile-aud').files[0]
    const profileAudURL = URL.createObjectURL(profileAud);
    div.setAttribute('src', profileAudURL);
    songlist.appendChild(div)
    let namesong=document.getElementById("namesong")
    displaysongname.innerText=namesong.value
    namesong.value=''
    pause.addEventListener('click', ()=>{
        audio.pause()
    if(div.paused || div.currentTime<=0){
        div.play();
        pause.classList.remove('fa-play-circle');
        pause.classList.add('fa-pause-circle');
        
    }
    else{
        div.pause();
        pause.classList.remove('fa-pause-circle');
        pause.classList.add('fa-play-circle');
        
    }
})
   
   
}
document.querySelector(".uploadbtn").addEventListener("click",()=>{
    uploadedsongs()
})