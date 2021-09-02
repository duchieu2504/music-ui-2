/**
 * 1. Render songs
 * 2. Scrol top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next - prev
 * 6. random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document);

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');

const cd = $('.cd')
const cdWidth = cd.offsetWidth;

const progress = $('#progress');
const player = $('.player');
const playBtn  = $('.btn-toggle-play');

const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');

const playlist = $(".playlist");

const app = {
  isPlaying : false,
  isRandom : false,
  isRepeat : false,
  currentIndex: 0,
  songs: [
    {
      name: "Xa vắng",
      singer: "Tuấn Hưng",
      path: "./assets/song/XaVang-TuanHung-3784149.mp3",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Mãi mãi không phải anh",
      singer: "Thanh Bình",
      path: "./assets/song/MaiMaiKhongPhaiAnhThanhBinh.mp3",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    },
    {
      name: "Đã từng vô giá",
      singer: "Mr.Siro",
      path: "./assets/song/DaTungVoGia-MrSiro-4891849.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
    },
    {
      name: " Mùa đông đã quá lạnh",
      singer: "Raftaar x Nawazuddin Siddiqui",
      path: "./assets/song/Mùa đông đã quá lạnh để có thể chia tay 128 kbps.mp3",
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
    },
    {
      name: "Nàng thơ",
      singer: "Hoàng Dũng",
      path: "./assets/song/NangTho-HoangDung-6413381.mp3",
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
    },
    {
      name: "Như ngày hôm qua",
      singer: "Sơn tùng MTP",
      path:
        "./assets/song/Nhu-Ngay-Hom-Qua-Son-Tung-M-TP.mp3",
      image:
        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
    },
    {
      name: "Phố cũ còn anh",
      singer: "Quinn - Chilly",
      path: "./assets/song/PhoCuConAnh-QuinnChilly-6791854.mp3",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    },
    {
      name: "Phố cũ còn anh",
      singer: "Quinn - Chilly",
      path: "./assets/song/PhoCuConAnh-QuinnChilly-6791854.mp3",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    },
    {
      name: "Phố cũ còn anh",
      singer: "Quinn - Chilly",
      path: "./assets/song/PhoCuConAnh-QuinnChilly-6791854.mp3",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    },
    {
      name: "Phố cũ còn anh",
      singer: "Quinn - Chilly",
      path: "./assets/song/PhoCuConAnh-QuinnChilly-6791854.mp3",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    }
  ],
  render: function() {
    const playlist = $('.playlist')
    const htmls = this.songs.map((song, index) => {
      return `
          <div class="song ${ index === this.currentIndex ? "active" : ""}" data-index = ${index}>
              <div class="thumb" style="background-image: url('${song.image}')">
              </div>
              <div class="body">
                  <h3 class="title">${song.name}</h3>
                  <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
              </div>
          </div>
      `
    });
    playlist.innerHTML = htmls.join("")
  },
  defineProperties: function() {
    Object.defineProperty(this, "currentSong", {
      get: function() {
        return this.songs[this.currentIndex];
      }
    })
  },

  loadCurrentSong: function() {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url("${this.currentSong.image}")`;
    audio.src = this.currentSong.path;
  },

  handleEvents: function () {
    const _this = this

    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(0deg)" },{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity
    });
    cdThumbAnimate.pause()

    document.onscroll = function() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth
    };

    // Play Btn
    playBtn.onclick = function () {
      if(_this.isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
    };
    audio.onplay = function() {
      _this.isPlaying = true
      player.classList.add('playing');
      cdThumbAnimate.play()
    };
    audio.onpause = function() {
      _this.isPlaying = false
      player.classList.remove('playing');
      cdThumbAnimate.pause()
    };
    audio.ontimeupdate = function() {
      if(audio.duration){
        const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100) 
        progress.value = progressPercent
      }
    }
    progress.onchange = function(e) {
      const seekTime = (audio.duration / 100) * e.target.value
      audio.currentTime = seekTime
    }

    nextBtn.onclick = function() {
      if(_this.isRandom) {
        _this.playRandomSong()
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render()
      _this.scrollToActiveSong()
    }
    prevBtn.onclick = function() {
      if(_this.isRandom) {
        _this.playRandomSong()
      } else {
        _this.prevSong();
      }
      audio.play()
      _this.render();
      _this.scrollToActiveSong()
    }


    randomBtn.onclick = function() {
      _this.isRandom = !_this.isRandom
      randomBtn.classList.toggle('active', _this.isRandom);
    },

    repeatBtn.onclick = function() {
      _this.isRepeat = !_this.isRepeat
      repeatBtn.classList.toggle('active', _this.isRepeat);
    },


    audio.onended = function() {
      if(_this.isRepeat) {
        audio.play()
      } else {
        nextBtn.click()
      }
    }


    playlist.onclick = function(e) {
      const songNode = e.target.closest('.song:not(.active)'); // trả vê thẻ div
      if( songNode || !e.target.closest('.option')) {
        if(songNode) {
          _this.currentIndex = Number(songNode.dataset.index)
          _this.loadCurrentSong();
          _this.render();
          audio.play()
        }
        if(e.target.closest('.option')) {
          console.log(e.target)
        }
      }
    }

  },
  nextSong: function() {
    this.currentIndex++
    if(this.currentIndex >= this.songs.length) {
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },
  prevSong: function() {
    this.currentIndex--
    if(this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1
    }
    this.loadCurrentSong()
  },
  playRandomSong: function() {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * this.songs.length)
    } while (newIndex === this.currentIndex) // điều kiện để khi random không vào bài hát đang hát hiện tại
    this.currentIndex = newIndex
    this.loadCurrentSong()
  },
  scrollToActiveSong: function() {
    $('.song.active').scrollIntoView({
      behavior : "smooth",
      block: "nearest"
    })
  },
  start: function() {
    this.render();

    this.defineProperties();

    this.loadCurrentSong()

    this.handleEvents()
  },
}
app.start()