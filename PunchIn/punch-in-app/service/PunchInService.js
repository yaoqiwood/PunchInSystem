import PunchInDao from "@/dao/PunchInDao"
export default {
	initDBTable(){
		return new Promise((resolve,reject)=>{
			PunchInDao.initDBTable().then(resp=>{
				resolve(resp)
			})
		})
	},
	punchRecord(status){
		return new Promise((resolve,reject)=>{
			PunchInDao.punchRecord(status).then(resp=>{
				resolve(resp)
			})
		})
	},
	selectRecord(dateBegin,dateEnd){
		return new Promise((resolve,reject)=>{
			PunchInDao.selectRecord(dateBegin,dateEnd).then(resp=>{
				resolve(resp)
			})
		})
	},
	selectTodayMaxOne(){
		return new Promise((resolve,reject)=>{
			PunchInDao.selectTodayMaxOne().then(resp=>{
				resolve(resp)
			})
		})
	},
	deleteTableRecords(){
		return new Promise((resolve,reject)=>{
			PunchInDao.deleteTableRecords().then(resp=>{
				resolve(resp)
			})
		})
	},
	deleteTableTodayRecords(fun){
		PunchInDao.deleteTableTodayRecords().then(resp=>{
			fun()
		})
	}
}