/*
    1. render songs
    2. Scoll top
    3. Play, pause, seek(kéo)
    4. CD rotate
    5. Next/Prev
    6. Random 
    7. Next/ repeat when ended
    8. Active song
    9. Scroll active song into view
    10. Play song when click
*/


const $ = document.querySelector.bind(document);
const $$  = document.querySelectorAll.bind(document);

const PLAYER_STOGARE_KEY = 'Chan'
const player = $('.player')
const playBtn = $('.btn-toggle-play')
const nameSong = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $("#audio")
const nextBtn = $('.btn-next')
const preBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $(".btn-repeat")
//console.log(randomBtn)
const progress = $("#progress")

    var  currentIndex = 0;
    const playlist = $(".playlist")
    const cd = $(".cd")
   

    const app = {
        currentIndex: 0,
        isPlaying: false,
        isRandom: false,
        isRepeat: false,
        config: JSON.parse(localStorage.getItem(PLAYER_STOGARE_KEY))||{
            isRepeat: false,
            isRandom: false,
        },
        setConfig: function(key,value){
            this.config[key]=value;
            localStorage.setItem(PLAYER_STOGARE_KEY,JSON.stringify(this.config));
        },
        songs:  [ 
        {
            name : '1 phút',
            singer : 'Andiez',
            path : './Music/song1.mp3',
            image : './Img/image1.jpg'
        },
        {
            name : 'Bang Bang',
            singer : 'Jessie',
            path : './Music/song2.mp3',
            image : './Img/image2.jpg'
        },
        {
            name : 'Byte',
            singer : 'Martin',
            path : './Music/song3.mp3',
            image : './Img/image3.jpg'
        },
        {
            name : 'Chiều hôm ấy',
            singer : 'JayKii',
            path : './Music/song4.mp3',
            image : './Img/image4.jpg'
        },
        {
            name : 'Chưa bao giờ',
            singer : 'Trung Quân',
            path : './Music/song5.mp3',
            image : './Img/image5.jpg'
        },
     ],
        render: function(){
                //console.log('123')// nếu index = index hiện tại thì đổi thành song active
                const htmls = this.songs.map((song,index) =>{
                 return ` <div class="song ${index === this.currentIndex ? 'active':''}" data-index="${index}">
                            <div class="thumb" style="background-image: url('${song.image}')"></div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>`
                })
                playlist.innerHTML = htmls.join('');
        },
        defineProperties : function(){
             Object.defineProperty(this, 'currentSong',{// xem lai
                get : function(){
                    //console.log(songIndex)
                    return this.songs[this.currentIndex];
                }
             });
        },
        // nextSongWhenEnd: function(){
        //     alert(audio.ended)
        //     if(audio.ended===true) {
        //         console.log("het bai")
        //         app.nextSong();
        //     }
        // },
        handlEvents: function(){
            // ẩn CD
            const cdWidth = cd.offsetWidth;
                document.onscroll = function() {
                    size = window.scrollY;
                    newWidth = cdWidth - size;
                    cd.style.width = newWidth >0 ? newWidth + "px": 0 ;
                    //console.log(document.documentElement.scrollY)
                    cd.style.opacity = newWidth / cdWidth;
                }

                const cdThumbAnimation = cdThumb.animate([// xem lại animate
                    {transform: 'rotate(360deg)'}
                ],{
                    duration: 10000,// 10s
                    iterations: Infinity,
                    
                })
                cdThumbAnimation.pause();
                // Xu ly khi click vao play
                playBtn.onclick = function(){
                    //onsole.log(1)
                    if(app.isPlaying==false){
                        audio.play();
                        // hết bài qua bài khác
                        
                    }
                    else{
                        audio.pause();
                    }
                    
                    //Xu li khi song duoc play 
                    audio.onplay = function(){
                        //console.log("check")
                        app.isPlaying = true;
                        player.classList.add("playing")
                        cdThumbAnimation.play()
                    }
                    //Xu li khi song duoc pause 
                    audio.onpause = function(){
                        app.isPlaying = false;
                        player.classList.remove("playing")
                        cdThumbAnimation.pause()
                    }

                    // Tien do bai hat thay doi
                    audio.ontimeupdate = function(){
                        //console.log(1)
                        //console.log()
                        progressPercent = audio.currentTime/audio.duration*100;
                        progress.value = progressPercent;// tai vi value cua progree de theo phan
                        //tram da cai truoc
                    }
                    // kéo bài hát
                    progress.oninput = function(e){
                        seekTime = e.target.value * audio.duration/100;
                        audio.currentTime = seekTime;
                    }
            }
            // next song
            nextBtn.onclick = function(){
                if(app.isRandom){
                    app.randomSong();
                    //audio.play();
                }
                else{
                    app.nextSong();
                }     
                audio.play();
                app.ActiveSong();
                app.scrollToActiveSong();
                //this.cdThumbAnimation.pause();
                //console.log(app.songs.length);
            }
            preBtn.onclick = function(){
                if(app.isRandom){
                    app.randomSong();
                    //audio.play();
                }
                else{
                    app.preSong();
                }     
                audio.play();
                app.ActiveSong();
                app.scrollToActiveSong();   
            }
            randomBtn.onclick = function(){
                app.isRandom = ! app.isRandom;
                app.setConfig('isRandom',app.isRandom);
                randomBtn.classList.toggle("active",app.isRandom);
                
            }
            repeatBtn.onclick = function(){
                app.isRepeat =! app.isRepeat;
                audio.loop = true;
                app.setConfig('isRepeat',app.isRepeat);
                repeatBtn.classList.toggle("active",app.isRepeat);
            }
            audio.onended = function(){
                //console.log(132)
                nextBtn.click();
            }

            //  lắng nghe hành vi click vào playlist
            playlist.onclick = function(e){
                // xử lí khi click vào song
               // console.log(e.target)
                songNode = e.target.closest('.song: (.active)');
                if(songNode || !e.target.closest('.option')){
                    if(songNode){
                        //console.log(songNode.getAttribute('data-index'))
                        //console.log(songNode.dataset.index)
                        app.currentIndex = songNode.dataset.index
                        app.loadCurrentSong();
                        audio.play();
                        app.ActiveSong();
                        app.scrollToActiveSong();   
                    }
                    //xu ly khi click vao option
                    if(e.target.closest('.song:not(.active)')){

                    }
                }
            }
        },
        nextSong: function(){
            this.currentIndex++;
            console.log(this.songs.length)
            this.currentIndex %= this.songs.length; // nếu quá số bài hát thì quay lại đầu
            this.loadCurrentSong();
        },
        loadConfig: function(){
            this.isRandom = this.config.isRandom
            this.isRepeat = this.config.isRepeat
        },
        preSong: function(){
            this.currentIndex--;
            if(this.currentIndex < 0) this.currentIndex = 4;// nếu quá số bài hát thì quay lại cuối
            this.loadCurrentSong();
        },

        randomSong: function(){
            let newSong;
            do{
            newSong = Math.floor(Math.random()*(this.songs.length));
            //console.log(newSong,currentIndex)
            }while(newSong === this.currentIndex);
            this.currentIndex = newSong;
            this.loadCurrentSong();
        },
        scrollToActiveSong: function(){
            setTimeout(()=>{
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
            },300)
        },
        ActiveSong : function(){
            const isActiveSong = $('.song.active');
              if (isActiveSong) {
              isActiveSong.classList.remove('active');
              }
            const activeSongs = $(`div[data-index="${this.currentIndex}"]`);
            activeSongs.classList.add('active');   
        },
        loadCurrentSong: function() {
           
            //console.log(nameSong, cdThumb, audio);
            console.log(this.currentSong)
            nameSong.textContent = this.currentSong.name;
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
            audio.src = this.currentSong.path; 


            // if ($('.song.active')) {
            //     $('.song.active').classList.remove('active');
            //   }
            //   const list = $$('.songs');
            //   list.forEach((song) => {
            //     if (song.getAttribute('data-index') === this.currentIndex) {
            //       song.classList.add('active');
            //     }
            //   });
        },
        // mọi thứ làm trong hàm start 
        start: function(){
            this.loadConfig();
            //Định nghĩa các thuộc tính cho object
            this.defineProperties();
            // lắng nghe và xử lý các sự kiện (DOM)
            this.handlEvents();
            // load bai hat
            this.loadCurrentSong();
            // render playlist
            this.render();

            randomBtn.classList.toggle("active",this.isRandom);
            repeatBtn.classList.toggle("active",this.isRepeat);
        }
    }

app.start();
// for ( var i of songs){

// }
