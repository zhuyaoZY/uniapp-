<template>
	<view class="content">
		<view class="left">
			<image src="../../../static/icon/shangyishou.svg"></image>
		</view>
		<view class="center">
			<image v-show="!isplay" src="../../../static/icon/bofang.svg" @click="playClick"></image>
			<image v-show="isplay" src="../../../static/icon/tianchongxing-.svg" @click="playClick"></image>
		</view>
		<view class="right">
			<image src="../../../static/icon/xiayishou.svg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//音频对象
				bgAudioMannager:null,
				//是否播放
				isplay:false
			}
		},
		props:{
			audio:{
				type:Array,
				default:[]
			}
		},
		methods: {
			//点击播放按钮播放
			playClick() {
				//判断isplay是为播放状态
				if(!this.isplay){
					if(this.bgAudioMannager){
						this.bgAudioMannager.play()	
						console.log('存在');
					}else{
						this.bgAudioMannager = uni.getBackgroundAudioManager();
						this.bgAudioMannager.title = '一首好听音乐正在播放';
						this.bgAudioMannager.singer = '暂无';
						this.bgAudioMannager.coverImgUrl =
							'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7fbf26a0-4f4a-11eb-b680-7980c8a877b8.png';
						this.bgAudioMannager.src =this.audio[0];
						console.log('不存在');
					}
					this.isplay=true
				}else{
					//
					this.bgAudioMannager.pause()
					this.isplay=false
				}
			}
		}
	}
</script>

<style lang="less">
	.content {
		display: flex;
		width: 750rpx;
		height: 200rpx;

		view {
			flex: 1;
			height: 100%;
			text-align: center;
			image{
				width: 100rpx;
				height: 100%;
			}
		}
		.center image{
			width: 200rpx;
		}
	}
</style>
