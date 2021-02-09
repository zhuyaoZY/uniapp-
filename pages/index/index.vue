<template>
	<view>
		<!-- 信息 -->
		<view class="myInfo">
			<image class="img" :src="musicData.coverImgUrl" lazy-load="true"></image>
			<view class="mytitle">
				<view class="title">{{musicData.name}}</view>
				<view>{{musicData.description}}</view>
			</view>
		</view>
		<!-- 歌单列表 -->
		<view class="musicList">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
			 @scroll="scroll">
				<view class="list">
					<view class="list-item" @click="musicplay(item.id,index)" v-for="(item,index) in musicList" :key='item.id'>
						<image :src="item.album.picUrl" lazy-load="true"></image>
						<view class="musname">
							<view>{{item.name}}</view>
							<view>{{item.artists[0].name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//获取的歌单数据
				musicData: [],
				//我喜欢的歌单列表
				musicList: [],
				//个人信息
				myInfo: [],
				//滚动
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		onLoad() {
			this.getmusicList()
		},
		methods: {
			//获取歌单数据
			async getmusicList() {
				const res = await this.$myRequest2({
					url: '/api/playlist/detail?id=3778678'
					// url: '/api/playlist/detail?id=719564626'
				})
				console.log(res);
				this.musicData = res.data.result
				this.musicList = res.data.result.tracks
				this.myInfo = res.data.result.creator
			},
			//滚动条
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			//跳转到播放页
			musicplay(id,index) {
				uni.navigateTo({
					url: '../play/play?id=' + id+'&crentindex='+index
				})
				//必须先跳转页面之后在接收
				setTimeout(()=>{
					uni.$emit("test", this.musicList);
				},500)
				console.log("发射事件test成功");
			}
		}
	}
</script>

<style lang="scss">
	.myInfo {
		height: 400rpx;
		position: relative;
		display: flex;
		align-items: center;
		background-color: rgba($color: #000000, $alpha: .3);

		.mytitle {
			flex: 1;
			padding: 0 20rpx;
			font-size: 24rpx;
			color: #e3e2e7;

			.title {
				margin-bottom: 40rpx;
				font-size: 40rpx;
				color: #FFFFFF;
				padding-bottom: 30rpx;
				border-bottom: 2px solid #d996e6;
			}
		}
	}

	.myInfo::before {
		content: '';
		position: absolute;
		background: url('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3271739782,3661796413&fm=26&gp=0.jpg') no-repeat;
		background-size: 750rpx 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
	}

	.img {
		width: 260rpx;
		height: 260rpx;
		margin-left: 20rpx;
		border-radius: 50%;
		border: 30rpx solid rgba(255, 255, 255, .1);
	}

	.musicList {
		height: 100%;
		width: 750rpx;

		.list {
			padding: 30rpx 20rpx;
			width: 100%px;
			height: 100%;

			.list-item {
				display: flex;
				align-items: center;
				height: 180rpx;
				margin-bottom: 30rpx;
				background-color: #fff;
				border-radius: 20rpx;
				box-shadow: 0 2px 6px rgba($color: #d996e6, $alpha: 0.8);

				image {
					width: 120rpx;
					height: 120rpx;
					margin-left: 30rpx;
					border-radius: 10rpx;
				}

				.musname {
					flex: 1;
					padding: 40rpx;

					view:nth-child(1) {
						font-size: 36rpx;
						border-left: 6rpx solid #d996e6;
						padding-left: 10rpx;
					}

					view:nth-child(2) {
						font-size: 24rpx;
						text-align: right;
					}
				}
			}
		}
	}
</style>
