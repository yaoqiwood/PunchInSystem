export default {
  openSqlite () {
    //创建数据库或者打开
    //这plus.sqlite只在手机上运行
    return new Promise((resolve, reject) => {
      plus.sqlite.openDatabase({
        name: 'pop',  //数据库名称
        path: '_doc/pop.db',   //数据库地址，uniapp推荐以下划线为开头，这到底存在哪里去了，我也不清楚，哈哈
        success (e) {
          resolve(e); //成功回调
        },
        fail (e) {
          reject(e); //失败回调
        }
      })
    })
  }

}

