export default {
  openSqlite () {
    //创建数据库或者打开
    //这plus.sqlite只在手机上运行
		let that = this
    return new Promise((resolve, reject) => {
			// console.log(that.isOpenDatabase())
			if(!that.isOpenDatabase()){
				plus.sqlite.openDatabase({
				  name: 'punchIn',  //数据库名称
				  path: '_doc/punchInSys.db',   //数据库地址，uniapp推荐以下划线为开头
				  success (e) {
						console.log("openDatabase success!");
				    resolve(e); //成功回调
				  },
				  fail (e) {
						console.log(e)
				    reject(e); //失败回调
				  }
				})
			}else{
				resolve()
			}
    })
  },
  punchInTimestampSQL () {
    return new Promise((resolve, reject) => {
      //创建表格在executeSql方法里写
      plus.sqlite.executeSql({
        name: 'punchIn',
        //表格创建或者打开，后面为表格结构
        sql: 'create table if not exists check_in_timestamp("cit_id" INTEGER PRIMARY KEY AUTOINCREMENT,"chek_in_time" TIMESTAMP)',
        success (e) {
          // resolve(e);
        },
        fail (e) {
          reject(e);
        }
      })
    })
  },
	isOpenDatabase () {
		return plus.sqlite.isOpenDatabase({
			name: 'punchIn',
			path: '_doc/punchInSys.db'
		})
	},
	closeDatabase () {
		return new Promise((resolve,reject)=>{
			plus.sqlite.closeDatabase({
				name: 'punchIn',
				success(e){
					resolve(e)
					console.log("close database success")
				},
				fail(e){
					console.log(e)
					reject(e)
				}
			})
		})
	},
	executeSql (sql) {
		let that = this
		return new Promise((resolve,reject)=>{
			that.openSqlite().then(resp=>{
				plus.sqlite.executeSql({
					name: 'punchIn',
					sql: sql,
					success(e){
						console.log(sql)
						that.closeDatabase().then(result=>{
							console.log("executeSql Success")
							resolve(e)
						})
					},
					fail(e){
						console.log(e)
						reject(e)
						that.closeDatabase()
					}
				})
			})
		})
	},
	selectSql(sql) {
		let that = this
		console.log(sql)
		return new Promise((resolve,reject)=>{
			that.openSqlite().then(resp=>{
				plus.sqlite.selectSql({
					name: 'punchIn',
					sql: sql,
					success (e){
						console.log(e)
						resolve(e)
						that.closeDatabase()
					},
					fail(e){
						console.log(e)
						reject(e)
						that.closeDatabase()
					}
				})
			})
		})
	}
}

