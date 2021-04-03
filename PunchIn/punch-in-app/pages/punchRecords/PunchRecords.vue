<template>
	<view>
		<view style="text-align: center;margin-top: 55upx;">当前日期：{{currentDate}}</view>
		<view style="display: flex;justify-content: center;margin-top: 25upx;">
			<view class="calendar-selecter"
						@click="selectDate">选择日期</view>
		</view>
		<u-time-line style="margin-left: 50px;margin-top: 50px;">
			<u-time-line-item v-for="(item,index) in punchTimeList">
				<template v-slot:node
									v-if="index == 0">
					<view class="u-node" style="background: #19be6b;">
						<!-- 此处为uView的icon组件 -->
						<u-icon name="pushpin-fill" color="#fff" :size="24"></u-icon>
					</view>
				</template>
				<!-- 此处自定义了左边内容，用一个图标替代 -->
				<template v-slot:content>
					<view>
						<view class="u-order-title">{{getEnumName(item.pi_status)}}</view>
						<!-- <view class="u-order-desc">[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。</view> -->
						<view class="u-order-time">{{item.punch_time}}</view>
					</view>
				</template>
			</u-time-line-item>
		</u-time-line>
		<u-calendar v-model="show" 
								:mode="mode"  
								@change="dateChange" />
	</view>
</template>

<script>
	import Utils from '@/util/Utils'
	import Service from '@/service/PunchInService'
	import Constants from '@/util/Constants'
	export default {
		onLoad() {
			this.initData()
		},
		data:()=> {
			return {
				show: false,
				mode: 'date',
				currentDate:'',
				punchTimeList: []
			}
		},
		methods:{
			initData(){
				this.currentDate = Utils.getCurrentDate()
				this.selectRecord()
			},
			selectDate(){
				this.show = true
			},
			dateChange(e){
				this.currentDate = e.result
				this.selectRecord()
			},
			selectRecord(){
				Service.selectRecord(Utils.getDateBegin(this.currentDate),Utils.getDateEnd(this.currentDate)).then(resp=>{
					this.punchTimeList = resp
				})
			},
			getEnumName(code){
				for (let name in Constants.ENUM_PUNCH_STATUS){
					if (Constants.ENUM_PUNCH_STATUS[name].code == code){
						return Constants.ENUM_PUNCH_STATUS[name].name;
					}
				}
				return '';
			}
		}
	}
</script>

<style scoped lang="less" src="./css/PunchRecords.less">
</style>
