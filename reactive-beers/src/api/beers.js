import PouchDB from 'pouchdb'

//Khai báo cơ sở dữ liệu cục bộ
const beersDatabase = new PouchDB("beers")
//Khai báo cơ sở dữ liệu từ xa
const remoteBeersDatabase = new PouchDB('http://192.168.1.23:5984/beers')
// Đồng bộ hóa cơ sở dữ liệu cục bộ và từ xa
PouchDB.sync(beersDatabase, remoteBeersDatabase, {
    live: true,
    timeout: false, //Vô hiệu hóa thời gian chờ
    retry: true,    //Thử đồng bộ lại nếu thất bại
})
//Nếu cơ sở dữ liệu bia chưa tồn tại => được tạo tự động khi một đối tượng được thêm mới
export const addBeer = beer => beersDatabase.post(beer)
//Cap nhat bia
export const editBeer = beer => beersDatabase.put(beer)
// Xoa bia
export const removeBeer = beer => beersDatabase.get(beer).then(doc => beersDatabase.remove(doc._id, doc._rev))
//Liệt kê tất cả
export const getBeers = () =>
    beersDatabase
        .allDocs({
            include_docs: true,
            descending: true,
        })
        .then(doc => doc.rows.map(row => row.doc))
//Lắng nghe các thay đổi
export const onBeersChange = callback =>
        beersDatabase.changes({ since: "now", live: true}).on("change", callback)