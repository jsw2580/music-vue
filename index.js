var app = new Vue({
    el: "#player",
    data: {
        query: "",
        musicList: [],
        musicUrl: "",
        musicCover: "",
        hotComments: [],
        isPlaying: false,
        isShow: false,
        mvUrl: ""
    },
    methods: {
        // 歌曲搜索
        searchMusic: function() {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
            .then(function(response) {
                that.musicList = response.data.result.songs;
            }, function(err) {}
            );
        },
        // 歌曲播放
        playMusic: function(musicId) {
            var that = this;
            // 获取歌曲地址
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
            .then(function(response) {
                that.musicUrl =  response.data.data[0].url;
            }, function(err) {})
            // 歌曲详情获取
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
            .then(function(response) {
                that.musicCover = response.data.songs[0].al.picUrl;
            }, function(err) {})
            // 歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
            .then(function(response) {
                that.hotComments = response.data.hotComments;
            }, function(err) {})
        },
        play: function() {
            this.isPlaying = true;
        },
        pause: function() {
            this.isPlaying = false;
        },
        playMV: function(mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
            .then(function(response) {
                that.isShow = true;
                that.mvUrl = response.data.data.url;
            }, function(err) {})
        },
        hide: function() {
            this.isShow = false;
            this.mvUrl = "";
        }
    }
})