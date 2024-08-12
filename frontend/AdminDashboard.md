# Admin Dashboard Quản lý dân cư

Tạo một giao diện web quản lý dân cư sử dụng React.

## Sử dụng thư viện Material-UI

Trước tiên, tải các package của thư viện Material-UI, một framework nổi tiếng của React.

```CLI
npm i @mui/material @emotion/react @emotion/styled @mui/x-data-grid @mui/icons-material react-router-dom@6 react-pro-sidebar formik yup
```

### Các thành phần UI trọng tâm

- @mui/material: Cung cấp tất cả các thành phần quan trọng của Material-UI để xây dựng giao diện người dùng bắt mắt.
- @emotion/react: Thư viện Emotion, dùng để viết CSS style với JavaScript.
- @emotion/styled: API được dùng để thiết kế các thành phần theo phong cách riêng.

### Data Grid

- @mui/x-data-grid: Cung cấp những thành phần để hiển thị các tập dữ liệu lớn.

### Icons

- @mui/icons-material: Cung cấp các icon kiểu Material

### Routing

- react-router-dom@6: Quan trọng trong việc định hướng của ứng dụng React.

### Sidebar

- react-pro-sidebar: Tạo ra một sidebar kéo ra thụt vào.

### Form

- formik: thư viện tạo và quản lý các form trong React.

### Xác thực form

- yup: dùng để duyệt và xác thực các giá trị điền trong form.

## Code Setup

Chuẩn bị code cho project.

- Giữ lại các file App.js, index.css, index.js và xóa các file còn lại.
- Trong index.js, import component BrowserRouter để xử lý việc routing.

```javascript
import { BrowserRouter } from 'react-router-dom';
```

- Trong index.css: cài đặt style cho scroll bar
- Data: Dữ liệu về dân cư và các phòng

## Cấu trúc File, Folder

