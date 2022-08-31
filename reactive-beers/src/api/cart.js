import PouchDB from 'pouchdb'

//Khai báo cơ sở dữ liệu cục bộ
const cartDatabase = new PouchDB("cart")
//Khai báo cơ sở dữ liệu từ xa
const remoteCartDatabase = new PouchDB('http://192.168.1.23:5984/cart')
// Đồng bộ hóa cơ sở dữ liệu cục bộ và từ xa
PouchDB.sync(cartDatabase, remoteCartDatabase, {
    live: true,
    timeout: false, //Vô hiệu hóa thời gian chờ
    retry: true,    //Thử đồng bộ lại nếu thất bại
})
//Nếu cơ sở dữ liệu cart chưa tồn tại => được tạo tự động khi một đối tượng được thêm mới
export const addCart = cart => cartDatabase.post(cart)
//Cap nhat giỏ hàng
export const editCart = cart => cartDatabase.put(cart)
// Xoa giỏ hàng
export const removeCart = cart => cartDatabase.get(cart).then(doc => cartDatabase.remove(doc._id, doc._rev))
//Liệt kê tất cả
export const getCart = () =>
    cartDatabase
        .allDocs({
            include_docs: true,
            descending: true,
        })
        .then(doc => doc.rows.map(row => row.doc))
//Lắng nghe các thay đổi
export const onCartChange = callback =>
        cartDatabase.changes({ since: "now", live: true}).on("change", callback)