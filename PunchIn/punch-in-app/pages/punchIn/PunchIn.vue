<template>
	<view>
		<view style="text-align: center;color: #B9B9B9;">柴柴Bruce 打卡记录专用</view>
		<view class="title_time_center">
			<text @tap="tap2ResetBtnShow">当前时间为：{{viewDateTime}}</text> 
		</view>
		<view class="punch-box">
			<view class="punch-btn"
						:style="btnColor"
			      @tap="punchIn">
				<text>{{btnPunchText}}</text>
			</view>
		</view>
		<view class="more-link_btn"
		      @tap="viewMorePage">
			<text>查看更多记录</text>
		</view>
		<view v-if="resetBtnShow"
					class="reset-btn" 
					@tap="tap2CleanData">重置</view>
	</view>
</template>

<script>
	import DBUtil from '@/util/DBUtil'
	import Service from '@/service/PunchInService'
	import Utils from '@/util/Utils'
	import Constants from '@/util/Constants'
	export default {
		onLoad() {
			this.initData()
		},
		onReady(){
			plus.globalEvent.addEventListener('touchstart',()=>{})
		},
		data:()=> {
			return {
				viewDateTime:'',
				btnPunchText:'',
				btnStatus: '',
				btnColor: '',
				btnBlueColor: "background-color: #009DEE",
				btnRedColor: "background-color:#D74B28",
				resetBtnShow: false,
				countOnShow: 0
			}
		},
		methods:{
			initTable(){
				return new Promise((resolve,reject)=>{
					Service.initDBTable().then(resp=>{
						resolve(resp)
					})
				}) 
			},
			initData(){
				this.initTable().then(resp=>{
					this.getLastStatus4ChangeInf()
					this.getDate()
				})
			},
			getDate(){
				let that = this
				that.viewDateTime = Utils.getDate()
				setTimeout(()=>{
					that.viewDateTime = Utils.getDate()
					that.getDate()
				},1000)
			},
			getLastStatus4ChangeInf(callBack){
				Service.selectTodayMaxOne().then(result=>{
					if(0 == result.length){
						this.btnPunchText = Constants.ENUM_PUNCH_STATUS.PUNCH_IN.name
						this.btnStatus = Constants.ENUM_PUNCH_STATUS.PUNCH_IN.code
						this.btnColor = this.btnBlueColor
					}else{
						this.btnPunchText = result[0].pi_status == Constants.ENUM_PUNCH_STATUS.PUNCH_OUT.code ? Constants.ENUM_PUNCH_STATUS.PUNCH_IN.name:Constants.ENUM_PUNCH_STATUS.PUNCH_OUT.name
						this.btnStatus = result[0].pi_status == Constants.ENUM_PUNCH_STATUS.PUNCH_OUT.code ? Constants.ENUM_PUNCH_STATUS.PUNCH_IN.code:Constants.ENUM_PUNCH_STATUS.PUNCH_OUT.code
						this.btnColor = result[0].pi_status == Constants.ENUM_PUNCH_STATUS.PUNCH_OUT.code ? this.btnBlueColor: this.btnRedColor
					}
					callBack()
				})
			},
			viewMorePage(){
				uni.navigateTo({
					url:'../punchRecords/PunchRecords'
				})
			},
			punchIn(){
				let that = this
				this.getLastStatus4ChangeInf(()=>{
					uni.showModal({
						title:"",
						content:"确定要" + this.btnPunchText + "?",
						success:(res)=>{
							if (res.confirm) {
								Service.punchRecord(this.btnStatus).then(resp=>{
									that.getLastStatus4ChangeInf()
								})
							}
						}
					})
				})
			},
			tap2ResetBtnShow(){
				this.countOnShow ++
				if(this.countOnShow == 20){
					this.resetBtnShow = true
				}
			},
			tap2CleanData(){
				let that = this
				Service.deleteTableTodayRecords(()=>{
					that.getLastStatus4ChangeInf()
				})
			}
		}
	}
</script>

<style scoped lang="less" src='./css/PunchIn.less'>
</style>
