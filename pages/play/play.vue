<template>
	<view class="musicplay">
		<view class="playImg">
			<image :class="isplays" :src="musicdata[now].album.picUrl"></image>
			<view class="dian"></view>
		</view>
		<view class="musictitle">
			<view class="title">{{musicdata[now].album.name}}</view>
			<view class="geshou">歌手:{{musicdata[now].artists[0].name}}</view>
		</view>
		<view class="control">
			<play-control @isplay="isPlays" :audio="audio"></play-control>
		</view>
	</view>
</template>

<script>
	import playControl from './playCpms/control'
	export default {
		data() {
			return {
				id: 0,
				//歌曲详情数据
				musicdata: [],
				audio: [],
				now: 0,
				isplay:false
			}
		},
		components: {
			playControl
		},
		onLoad(options) {
			//接收歌曲id
			this.id = options.id
			this.now=options.crentindex
			this.getmusicplay()
			//接收传递过来的歌曲列表数据
			uni.$on("test", (data) => {
				this.musicdata = data
			})
		},
		computed:{
			isplays(){
				return this.isplay?"active":"paused"
			}
		},
		methods: {
			//请求歌曲播放地址
			getmusicplay() {
				uni.request({
					url: "https://api.imjad.cn/cloudmusic/?type=song&id=" + this.id + "&br=128000",
					success: (res) => {
						this.audio.push(res.data.data[0].url)
						console.log(res);
					}
				})
			},
			isPlays(isplay){
				this.isplay=isplay
				console.log(isplay);
			}
		}
	}
</script>

<style lang="less">
	page{
		height: 100%;
	}
	.musicplay{
		width: 750rpx;
		height: 100%;
		position: relative;
	}
	.control{
		position: absolute;
		bottom: 100rpx;
		left: 0;
		right: 0;
	}
	.playImg {
		width: 550rpx;
		height: 550rpx;
		border-radius: 50%;
		border: 2px solid #d996e6;
		position: absolute;
		top: 50rpx;
		left: 50%;
		transform: translate(-50%);
		image {
			width: 400rpx;
			height: 400rpx;
			border-radius: 50%;
			position: absolute;
			top: 50%;
			left: 50%;
			// transform: translate(-50%, -50%);
			border: 40rpx solid rgba(255, 255, 255, .5);
			  -webkit-animation: play 10s linear infinite;
			       -moz-animation: play 10s linear infinite;
			            animation: play 10s linear infinite;
			  
		}
		//旋转特效
		@-webkit-keyframes play{
		    0%{-webkit-transform: translate(-50%, -50%) rotate(0deg);}
		    100%{transform: translate(-50%, -50%) rotate(360deg);}
		}
		@-moz-keyframes play {
		    0%{-moz-transform: translate(-50%, -50%) rotate(0deg);}
		    100%{transform: translate(-50%, -50%) rotate(360deg);}
		}
		@keyframes play{
		    0%{transform: translate(-50%, -50%) rotate(0deg);}
		    100%{transform: translate(-50%, -50%) rotate(360deg);}
		}
		//动画播放
		.active {
		  animation-play-state: running;
		}
		//动画暂停
		.paused {
		  animation-play-state: paused;
		}

		.dian {
			background-color: #843196;
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			position: absolute;
			top: 460rpx;
			right: 68rpx;
		}
	}
	.musictitle{
		width: 750rpx;
		height: 250rpx;
		position: absolute;
		top: 640rpx;
		text-align: center;
		.title{
			font-size: 50rpx;
		}
		.geshou{
			font-size: 24rpx;
			color: #ccc;
			margin-top: 20rpx;
		}
	}
	
</style>
