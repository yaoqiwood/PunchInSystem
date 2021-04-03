import DBUtil from '@/util/DBUtil'
export default {
	initDBTable(){
		return new Promise((resolve,reject)=>{
			DBUtil.executeSql(
				"CREATE TABLE IF NOT EXISTS punch_in_time_line(" +
				"\"id\" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
				"\"punch_time\" TEXT(32) NOT NULL DEFAULT (datetime('now', 'localtime'))," +
				"\"pi_status\" TEXT(32) NOT NULL," + 
				"\"create_time\" TEXT(32) NOT NULL DEFAULT (datetime('now', 'localtime'))" + 
				")"
			).then(result=>{
				resolve(result)
				// DBUtil.closeDatabase()
			})
		})
	},
	punchRecord(status){
		return new Promise((resolve,reject)=>{
			DBUtil.executeSql(
				"INSERT INTO punch_in_time_line (id, pi_status) VALUES(NULL, '"+ status +"')"
			).then(result=>{
				resolve(result)
				// DBUtil.closeDatabase()
			})
		})
	},
	selectRecord(dateBegin,dateEnd){
		return new Promise((resolve,reject)=>{
			DBUtil.selectSql(
				"SELECT" +
				" * "	+ 
				" FROM" +
				" punch_in_time_line A " +
				" WHERE " + 
				" A.punch_time BETWEEN '" + dateBegin + "' AND '" + dateEnd +"' ORDER BY A.punch_time DESC" 
			).then(result=>{
				resolve(result)
			})
		})
	},
	selectTodayMaxOne(){
		return new Promise((resolve,reject)=>{
			DBUtil.selectSql(
				"SELECT "+
				"* " +
				"FROM " +
				"punch_in_time_line A " + 
				"WHERE "+
				"A.punch_time BETWEEN ( SELECT DATE( 'now', 'localtime' ) || ' 00:00:00' ) " + 
				"AND ( SELECT DATE( 'now', 'localtime' ) || ' 23:59:59' ) " + 
				"ORDER BY " +
				"create_time DESC " + 	
				"LIMIT 1 "
			).then(resp=>{
				resolve(resp)
			})
		})
	},
	deleteTableRecords(){
		return new Promise((resolve,reject)=>{
			DBUtil.executeSql(
				"DELETE FROM punch_in_time_line"
			).then(resp=>{
				resolve(resp)
			})
		})
	},
	deleteTableTodayRecords(){
		return new Promise((resolve,reject)=>{
			DBUtil.executeSql(
				"DELETE FROM punch_in_time_line WHERE "+
				"punch_time BETWEEN ( SELECT DATE( 'now', 'localtime' ) || ' 00:00:00' ) " +
				"AND ( SELECT DATE( 'now', 'localtime' ) || ' 23:59:59' )"
			).then(resp=>{
				resolve(resp)
			})
		})
	}
}