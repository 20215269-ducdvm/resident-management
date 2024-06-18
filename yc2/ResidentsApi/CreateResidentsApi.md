# CreateResidentsApi
-	Quản lý thông tin cư dân và thông tin căn hộ. Một cư dân có nhiều căn hộ, 1 căn hộ có nhiều cư dân 
-	Thêm sửa xóa căn hộ, thêm sửa xóa cư dân

## Tải package: 
- Microsoft.EntityFrameworkCore
- Npgsql.EntityFrameworkCore.PostgreSQL
- Microsoft.EntityFrameworkCore.Design 

## Tạo các lớp, cấu hình quan hệ 
- Resident với key: ResidentId
- Apartment với key: ApartmentId
- Cấu hình mối quan hệ n-n giữa ResidentId với ApartmentId
    - Tạo thêm lớp trung gian ResidentApartment với key (ResidentId, ApartmentId)
    - Thêm thuộc tính kiểu List<ResidentApartment> ở 2 lớp ResidentId và ApartmentId

## Tạo một lớp kiểu DbContext
- Tạo lớp ResidentContext, đây là một schema chứa các lớp, thuộc tính các lớp và mối quan hệ giữa các lớp
- Cấu hình từng thuộc tính và mối quan hệ giữa các lớp trong phương thức OnModelCreating
- Đây sẽ là lớp làm việc trực tiếp với CSDL
- Các thay đổi của các thực thể trong lớp DbContext sẽ được thay đổi vào CSDL khi thực hiện việc di trú (migration)

## Di trú đến CSDL
Đây là bước để kết nối các lớp trong gói model vào cơ sở dữ liệu.
dotnet ef migrations add InitialCreate
dotnet ef database update

## Query data
Thông thường, với một WebApi MVC, việc tương tác với CSDL sẽ được thực thi trong các lớp Controller
### Tạo Controller
- Thêm một số package cần thiết:
    - Microsoft.VisualStudio.Web.CodeGeneration.Design
    - Microsoft.EntityFrameworkCore.Tools
- Ngoài ra còn thêm cả trình sinh code tự động (scaffolding engine)

```.NET CLI
dotnet tool uninstall -g dotnet-aspnet-codegenerator
dotnet tool install -g dotnet-aspnet-codegenerator
dotnet tool update -g dotnet-aspnet-codegenerator
```
Sau đó, tạo các Controller cho mỗi lớp và sinh code tự động cho chúng.

```.NET CLI
dotnet aspnet-codegenerator controller -name ResidentsController -async -api -m Resident -dc ResidentContext -outDir Controllers

dotnet aspnet-codegenerator controller -name ApartmentsController -async -api -m Apartment -dc ResidentContext -outDir Controllers

dotnet aspnet-codegenerator controller -name ResidentApartmentsController -async -api -m ResidentApartment -dc ResidentContext -outDir ControllersControllers
```

### Query Apartment
#### Thêm căn hộ
#### Sửa căn hộ
#### Xóa căn hộ

### Query Resident
#### Thêm cư dân
#### Sửa cư dân
#### Xóa cư dân