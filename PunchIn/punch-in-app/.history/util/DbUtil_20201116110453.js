export default {
  openSqlite () {
    //创建数据库或者打开
    //这plus.sqlite只在手机上运行
    return new Promise((resolve, reject) => {
      plus.sqlite.openDatabase({
        name: 'pop',  //数据库名称
        path: '_doc/pop.db',   //数据库地址，uniapp推荐以下划线为开头
        success (e) {
          resolve(e); //成功回调
        },
        fail (e) {
          reject(e); //失败回调
        }
      })
    })
  },
  function userInfoSQL(){
  return new Promise((resolve, reject) => {
    //创建表格在executeSql方法里写
    plus.sqlite.executeSql({
      name: 'pop',
      //表格创建或者打开，后面为表格结构
      sql: 'create table if not exists userInfo("list" INTEGER PRIMARY KEY AUTOINCREMENT,"id" TEXT,"name" TEXT,"gender" TEXT,"avatar" TEXT)',
      success (e) {
        resolve(e);
      },
      fail (e) {
        reject(e);
      }
    })
  })
}
}

