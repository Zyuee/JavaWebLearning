/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var app = new Vue({
  el:'#player',
  data:{
    // 查询关键字
    query: "",
    musicList: [],
    musicUrl:"",
    musicCover:"",
    hotComments: [],

  },
  
  methods:{
    // 歌曲搜索
    searchMusic: function() {
      var that = this;
      
      axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
        function(response) {
          // console.log(response);
          that.musicList = response.data.result.songs;
          //alert(that.musicList[0].name);
          console.log(response.data.result.songs);
        },
        function(err) {

        });

    },
    
    
    //获得歌曲地址
    playMusic:function(musicId){

      var that = this;
      console.log(musicId);
      axios.get("https://autumnfish.cn/song/url?id="+musicId).then(
        function(repsponds){
          //console.log(repsponds.data.data[0].url);
          that.musicUrl=repsponds.data.data[0].url;

        },
        function(error){}
      );



       //获取封面的地址
      axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(
        function(responds){
          //console.log(responds.data.songs[0].al.picUrl);
          that.musicCover = responds.data.songs[0].al.picUrl;
        },
        function(error){}
      );

      //获取评论

     

      // 歌曲评论获取
      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(
        function(response) {
           //console.log(response);
          console.log(response.data.hotComments);
          that.hotComments = response.data.hotComments;
        },
        function(err) {}
      );
      

      


    }
  }
    
      

    
  
  
})

// var app = new Vue({
//   el: "#player",
//   data: {
//     // 查询关键字
//     query: "",
//     // 歌曲数组
//     musicList: [],
    
//   },
//   methods: {
//     // 歌曲搜索
//     searchMusic: function() {
//       var that = this;
//       axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
//         function(response) {
//           // console.log(response);
//           that.musicList = response.data.result.songs;
//           alert(that.musicList[0].name);
//         },
//         function(err) {}
//       );
//     },
    
    
//   }
// });

