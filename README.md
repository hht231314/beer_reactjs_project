> ## GIỚI THIỆU TRANG REACTIVE BEER
___________________________________________________________________________________________________________________
 **Demo đầy đủ (đã tua nhanh): [tại đây](https://drive.google.com/file/d/10Ve9uauCTFg17VR5Eq3Rv3NgZYkuQSGm/view?usp=sharing) 
<br>Demo Offline: [tại đây](https://drive.google.com/file/d/1K9I_Sc_bzRaSeWqDkBwsyEbaUvo391d3/view?usp=sharing)
<br>Folder Video Demo: [tại đây](https://drive.google.com/drive/folders/1S4s8AoHADqm9dlfMe5bPVrG3fCIX_3gM?usp=sharing)**
___________________________________________________________________________________________________________________
> ### 1. Công nghệ sử dụng
- Front-End: ReactJS
- Back-End: NodeJS
- Database: CouchDB Version 2.3.1 + PouchDB
> ### 2. Mô tả hệ thống
- Sử dụng ReactJS là Framework của JavaScript để xây dựng hệ thống.
- Về phía Back-End dùng NodeJS để viết API.
- Về phần Database thì đây là loại Database NoSQL. Lưu trữ dưới dạng Document, định dạng JSON.
- Tận dụng hệ thống sao chép của PouchDB để lưu trữ dữ liệu cục bộ khi ngoại tuyến và đồng bộ hóa nó với một CouchDB từ xa sau khi ứng dụng trực tuyến trở lại.

**Thiết lập cơ sở dữ liệu:** Chúng ta có thể tạo hoặc sử dụng local Database hoặc sử dụng PouchDB như một Client cho 1 remote Database CouchDB.

<img src="Image/1.png" width="800" >

Một điểm khá hữu ích là nó đồng bộ dữ liệu cục bộ với CouchDB từ xa và ngược lại.

<img src="Image/2.png" width="800" >

Dữ liệu được lưu giữ trong PouchDB cục bộ và được sao chép khi có thể.

<img src="Image/3.png" width="800" >

Theo dõi sự thay đổi của dữ liệu để khi nhận thấy thay đổi thì sẽ cập nhật ngay.

<img src="Image/4.png" width="800" >

> ### 3. Demo cụ thể
Trang chủ: hiện tất cả sản phẩm ở đây

<img src="Image/5.png" width="800" >

Thanh menu thay đổi tùy  cấp bậc:

```Thanh menu khi chưa đăng nhập:```

<img src="Image/6.png" width="800" >

```Thanh menu khi khách hàng đăng nhập:```

<img src="Image/7.png" width="800" >

```Thanh menu khi Admin đăng nhập:```

<img src="Image/8.png" width="800" >

Trang đăng ký: Báo lỗi khi đăng ký.

<img src="Image/9.png" width="800" >
<img src="Image/10.png" width="800" >

Báo lỗi khi password không khớp

<img src="Image/11.png" width="800" >

Báo lỗi sai cú pháp Email

<img src="Image/12.png" width="800" >

Báo lỗi sai định dạng số điện thoại + lỗi trùng số điện thoại

<img src="Image/13.png" width="800" >

Thông báo đăng ký thành công

<img src="Image/14.png" width="800" >

Báo lỗi Form đăng nhập không được bỏ trống

<img src="Image/15.png" width="800" >

Báo lỗi số lượng: chỉ được nhập từ 1 đến giới hạn trên, không được bỏ trống.

<img src="Image/16.png" width="800" >
<img src="Image/17.png" width="800" >
<img src="Image/18.png" width="800" >

Thông báo thêm thành công

<img src="Image/19.png" width="800" >

Giỏ hàng có thể cập nhật số lượng và đặt hàng. Nếu thêm sản phẩm đã có trong giỏ hàng thì sẽ cộng dồn số lượng.

<img src="Image/20.png" width="800" >

Thay đổi số lượng

<img src="Image/21.png" width="800" >

Thông báo đặt hàng thành công

<img src="Image/22.png" width="800" >

Trang Profile có thể sửa thông tin và đăng xuất. Đơn hàng cũng sẽ hiện ở đây.

<img src="Image/23.png" width="800" >

Đổi thông tin cá nhân

<img src="Image/24.png" width="800" >

Form sửa thông tin cá nhân

<img src="Image/25.png" width="800" >

Quản lý User: có thể xóa hoặc cấp quyền Admin hoặc thu hồi quyền admin.

<img src="Image/26.png" width="800" >

Cấp quyền Admin hoặc User

<img src="Image/27.png" width="800" >

Quản lý Bia có thể thêm, sửa, xóa bia

<img src="Image/28.png" width="800" >

Cập Nhật Bia, hiện ảnh ra cho người dùng xem.

<img src="Image/29.png" width="800" >

Form thêm Bia: vì giới hạn số lượng lớn hơn 0 nên bia mới thêm mặc định sẽ ở trạng thái "active". Hết hàng sẽ chuyển về trạng thái "passive" và ẩn sản phẩm đó.

<img src="Image/30.png" width="800" >

Báo lỗi thêm Bia

<img src="Image/31.png" width="800" >

Thêm Bia

<img src="Image/32.png" width="800" >
<img src="Image/33.png" width="800" >

Trang quản lý đơn hàng: Cập nhật trạng thái đơn hàng:

<img src="Image/34.png" width="800" >

Form mua Bia: Hiện thông tin cá nhân ra cho người dùng xem. Người dùng chỉ nhập số lượng và Submit.

<img src="Image/35.png" width="800" >

Trang xem đơn hàng đã đặt. Trang này nằm chung với trang Profile.

<img src="Image/36.png" width="800" >

Nếu không còn bia thì sẽ ẩn bia đó

<img src="Image/37.png" width="800" >

Chuyển trạng thái về “passive” nếu hết bia

<img src="Image/38.png" width="800" >
