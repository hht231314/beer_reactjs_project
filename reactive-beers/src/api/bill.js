import PouchDB from 'pouchdb'

//Khai báo cơ sở dữ liệu cục bộ
const billDatabase = new PouchDB("bill")
//Khai báo cơ sở dữ liệu từ xa
const remoteBillDatabase = new PouchDB('http://192.168.1.23:5984/bill')
// Đồng bộ hóa cơ sở dữ liệu cục bộ và từ xa
PouchDB.sync(billDatabase, remoteBillDatabase, {
    live: true,
    timeout: false, //Vô hiệu hóa thời gian chờ
    retry: true,    //Thử đồng bộ lại nếu thất bại
})
//Nếu cơ sở dữ liệu bia chưa tồn tại => được tạo tự động khi một đối tượng được thêm mới
export const addBill = bill => billDatabase.post(bill)
//Cap nhat bia
export const editBill = bill => billDatabase.put(bill)
// Xoa bia
export const removeBill = bill => billDatabase.get(bill).then(doc => billDatabase.remove(doc._id, doc._rev))
//Liệt kê tất cả
export const getBill = () =>
    billDatabase
        .allDocs({
            include_docs: true,
            descending: true,
        })
        .then(doc => doc.rows.map(row => row.doc))
//Lắng nghe các thay đổi
export const onBillChange = callback =>
        billDatabase.changes({ since: "now", live: true}).on("change", callback)