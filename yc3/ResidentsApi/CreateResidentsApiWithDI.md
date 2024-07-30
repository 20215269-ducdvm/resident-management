# Create WebApi ResidentsApi With Design Pattern: Unit of Work in Repository Pattern with Dependency Injection

- Quản lý thông tin cư dân và thông tin căn hộ. Một cư dân có nhiều căn hộ, 1 căn hộ có nhiều cư dân
- Thêm sửa xóa căn hộ, thêm sửa xóa cư dân
- Thiết kế theo Design Pattern: Unit of Work in Repository and Dependency Injection.

## Repository Pattern

Nhược điểm của cách thực thi ở yc2 là các đoạn code thao tác với CSDL (GetAll, GetById, ...) đều bị lặp lại đối với các lớp khác nhau. Việc này sẽ dẫn đến việc dư thừa code, dẫn đến kém hiệu quả và linh hoạt khi ta thêm các lớp điều khiển cho các lớp khác.

Do đó chúng ta có thể thực thi lại với một mẫu thiết kế khác đó là Repository.

Về cơ bản, mẫu thiết kế này sẽ gói gọn lại tất cả những phần code thao tác với CSDL phổ biến (GetAll, GetById, Insert, Delete, Update, Save) vào một lớp trung gian. Sau đó ta sẽ cài đặt các phương thức riêng để thao tác dữ liệu cho từng lớp cụ thể.

## Unit of Work in Repository

Khi triển khai cấu trúc Repository, có một vấn đề xảy ra: Các lớp Repository tự tạo ra các lớp Context của riêng mình, căn bản là tự tạo ra một bản sao của CSDL và thực hiện thao tác dữ liệu trên đó. Việc này có thể dẫn đến sự mất nhất quán dữ liệu. Để giải quyết việc này, ta phải gom lại các thao tác với CSDL của từng lớp Repository và thực hiện chúng như một giao dịch thống nhất. Unit of Work sẽ giải quyết vấn đề trên bằng cách cho các lớp Repository chỉ sử dụng chung một lớp Context.

## Dependency Injection

Việc áp dụng Dependency Injection là không thể thiếu trong việc thực thi hai mẫu thiết kế Repository và Unit of Work.
Các đối tượng của lớp A sẽ không tự tạo ra đối tượng phụ thuộc B, mà đối tượng phụ thuộc B sẽ được chèn vào phương thức khởi tạo của đối tượng ban đầu. Cách này sẽ giúp làm sự phụ thuộc trực tiếp giữa các lớp với nhau, tăng sự linh hoạt trong việc triển khai, sẽ mang lại lợi ích trong việc kiểm thử cũng như bảo trì.

## Tạo webapi ResidentsApi

```.NET CLI
dotnet new webapi --use-controllers -o ResidentsApi
```

Thêm chứng thư HTTPS để tăng độ tin cậy

```.NET CLI
dotnet dev-certs https --trust
```

## Tải package

- Microsoft.EntityFrameworkCore
- Npgsql.EntityFrameworkCore.PostgreSQL
- Microsoft.EntityFrameworkCore.Design
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore

## Cấu trúc thư mục

Vì ta đang triển khai Repository Design Pattern, nên cấu trúc thư mục sẽ được bố trí khác so với yc2. Cấu trúc sẽ bao gồm:

- Controllers: chứa các lớp điều khiển, thực thi luồng điều khiển chung của chương trình
- DAL: chứa các lớp thực thể và các lớp DbContext
- GenericRepository: Định nghĩa các thao tác CRUD chung cho các lớp DbContext: GetAll, GetById, Insert, Update, Delete. Tất cả các lớp Repository sẽ dùng lại cài đặt cụ thể của từng thao tác, đồng thời tự cài đặt các thao tác của riêng chúng.
- Repository: chứa các lớp Repository tương ứng với từng lớp trong gói DAL để thao tác với CSDL.
- UnitOfWork: tầng trung gian giữa controller và Repository, đồng nhất các thao tác với các thực thể liên quan đến nhau.

## Tạo namespace DAL

Trong namespace DAL, tạo các lớp thực thể và cấu hình mối quan hệ giữa chúng:

- Resident với key: ResidentId
- Apartment với key: ApartmentId
- Cấu hình mối quan hệ n-n giữa ResidentId với ApartmentId
  - Tạo thêm lớp trung gian ResidentApartment với key (ResidentId, ApartmentId)
  - Thêm thuộc tính kiểu List&lt;ResidentApartment&gt; ở 2 lớp ResidentId và ApartmentId

### Tạo một lớp kiểu DbContext

- Tạo lớp ResidentDBContext, đây là một schema chứa các lớp, thuộc tính các lớp và mối quan hệ giữa các lớp
- Cấu hình từng thuộc tính và mối quan hệ giữa các lớp trong phương thức OnModelCreating
- Đây sẽ là lớp làm việc trực tiếp với CSDL
- Các thay đổi của các thực thể trong lớp DbContext sẽ được thay đổi vào CSDL khi thực hiện việc di trú (migration)

Tại đây ta có thể thực hiện việc di trú tới CSDL và tạo code cho Controller như trong yc2, nhưng việc triển khai mẫu thiết kế Repository và Unit Of Work cần thêm một số việc sau:

## Tạo namespace GenericRepository

- Tạo một giao diện IGenericRepostiory chứa các phương thức cần có của một kho lưu trữ: GetAll, GetById, Insert, Update, Delete
- Tạo một lớp GenericRepository thực thi giao diện IGenericRepository. Trong phương thức khởi tạo của lớp này sẽ có một lớp ResidentContext chứa các lớp Resident, Apartment, ResidentApartment và quan hệ giữa các lớp

Nếu chúng ta chỉ cần thực hiện các thao tác thêm, sửa, xóa đơn giản với các thực thể trong CSDL thì nên triển khai Generic Repository vì nó quy định các phương thức chung này đối với tất cả các lớp thực thể, ta không phải viết lặp đi lặp lại các đoạn code thêm, sửa, xóa cho từng thực thể nữa.

Tuy nhiên các lớp thực thể này sẽ có thể có một số thao tác truy cập dữ liệu của riêng chúng. Trong trường hợp như vậy ta triển khai thêm mẫu thiết kế Non-Generic Repository. Mẫu thiết kế này sẽ cài đặt cụ thể các thao tác truy cập dữ liệu của từng lớp thực thể.

## Tạo namespace Repository

- Tạo các giao diện Repository tương ứng với các lớp trong DAL. Các giao diện này, ngoài việc dùng lại các chữ ký từ giao diện IGenericRepository, sẽ phát triển thêm các phương thức riêng đối với từng lớp/thực thể trong CSDL.
- Tạo các lớp Repository thực thi các giao diện này.

Một vấn đề có thể xảy ra: khi chúng ta cần thực hiện thao tác dữ liệu của nhiều lớp, các lớp Repository tương ứng  sẽ tự tạo ra và duy trì một đối tượng lớp DBContext của riêng chúng.
Nếu thao tác dữ liệu của một lớp thất bại và lớp còn lại thành công, nó có thể dẫn đến việc mất nhất quán dữ liệu.
(Xóa một phòng trong Apartment nhưng không xóa việc cư dân ở phòng đó trong lớp ResidentApartment, không cập nhật lại thông tin cư dân đã từng ở phòng đó trong Resident)

## Tạo namespace Unit of Work

Vấn đề mất nhất quán dữ liệu nằm ở việc mỗi lớp Repository tự tạo ra một lớp DBContext để thao tác với CSDL. Để tránh việc này, ta phải cho các lớp Repository dùng chung một lớp DBContext. Đó là cách thức hoạt động của Unit of Work.

Do đó khi thao tác với nhiều thực thể (Repository) liên quan với nhau trong CSDL, tất cả các thao tác này đều được gom thành một giao dịch chung. Nếu chỉ một thao tác thất bại, giao dịch sẽ rollback. Nếu tất cả các thao tác thành công, giao dịch sẽ commit.

Namespace UnitOfWork bao gồm:

- Giao diện IUnitOfWork bao gồm các phương thức thao tác giao dịch:
  - Create: Bắt đầu một giao dịch mới.
  - Commit: Xác nhận và lưu tất cả các thay đổi trong giao dịch vào CSDL.
  - Rollback: Hoàn tác tất cả các thay đổi nếu có lỗi.
  - Save: Lưu các thay đổi vào bộ nhớ đệm, sẵn sàng cho việc commit.
- Lớp UnitOfWork thực thi giao diện này.

## Tạo Controller

- Khác với yc2, chúng ta sẽ tự cài đặt các Controller để chúng thực hiện nghiệp vụ như yêu cầu.

## Di trú đến CSDL

Đây là bước để kết nối các lớp trong namespace model vào cơ sở dữ liệu.

```.NET CLI
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Sau đó, một thư mục Migrations đã được tạo để lưu trữ lịch sử thay đổi CSDL.

## Kết nối CSDL

Tạo một CSDL, thực thi kết nối khi chạy.
Có thể cấu hình Connection String ở trong appsettings.json, sau đó chương trình sẽ kết nối với CSDL trong mỗi lần chạy

## Query data

Việc tương tác với CSDL, thực hiện CRUD đơn giản có thể được thực thi trong các lớp Controller
