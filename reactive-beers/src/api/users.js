import PouchDB from "pouchdb";

//Khai báo cơ sở dữ liệu cục bộ
const usersDatabase = new PouchDB("users")
//Khai báo cơ sở dữ liệu từ xa
export const remoteusersDatabase = new PouchDB("http://192.168.1.23:5984/users")

// Đồng bộ hóa cơ sở dữ liệu cục bộ và từ xa
PouchDB.sync(usersDatabase, remoteusersDatabase, {
    live: true,
    timeout: false, //Vô hiệu hóa thời gian chờ
    retry: true,    //Thử đồng bộ lại nếu thất bại
})
//Nếu cơ sở dữ liệu user chưa tồn tại => được tạo tự động khi một đối tượng được thêm mới
export const addUser = user => usersDatabase.post(user)
// Cap nhat user
export const editUser = user => usersDatabase.put(user)
//Xoa user
export const removeUser = user => usersDatabase.get(user).then(doc => usersDatabase.remove(doc._id, doc._rev))
//Liệt kê tất cả
export const getUsers = () =>
  usersDatabase
    .allDocs({
      include_docs: true,
      descending: true,
    })
    .then(doc => doc.rows.map(row => row.doc));

//Lắng nghe các thay đổi
export const onUsersChange = callback =>
  usersDatabase.changes({ since: "now", live: true }).on("change", callback);