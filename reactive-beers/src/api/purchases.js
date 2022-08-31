import PouchDB from "pouchdb";

//Khai báo cơ sở dữ liệu cục bộ
const purchasesDatabase = new PouchDB("purchases")

//Khai báo cơ sở dữ liệu từ xa
const remotePurchasesDatabase = new PouchDB('http://192.168.1.23:5984/purchases')

// Đồng bộ hóa cơ sở dữ liệu cục bộ và từ xa
PouchDB.sync(purchasesDatabase, remotePurchasesDatabase, {
  live: true, 
  timeout: false, //Vô hiệu hóa thời gian chờ
  retry: true, //Thử đồng bộ lại nếu thất bại
});
//Nếu cơ sở dữ liệu purchase chưa tồn tại => được tạo tự động khi một đối tượng được thêm mới
export const addPurchase = purchase => purchasesDatabase.post(purchase)
// Cap nhat Purchase
export const editPurchase = purchase => purchasesDatabase.put(purchase)
// Xoa purchase
export const removePurchase = purchase => purchasesDatabase.get(purchase).then(doc => purchasesDatabase.remove(doc._id, doc._rev))
//Liệt kê tất cả
export const getPurchases = () =>
purchasesDatabase
    .allDocs({
      include_docs: true,
      descending: true,
    })
    .then(doc => doc.rows.map(row => row.doc));

//Lắng nghe các thay đổi
export const onPurchasesChange = callback =>
purchasesDatabase.changes({ since: "now", live: true }).on("change", callback);