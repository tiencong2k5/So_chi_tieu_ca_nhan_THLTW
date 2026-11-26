# Sổ chi tiêu cá nhân

## Thông tin sinh viên

- **Họ và tên:** Phạm Tiến Công
- **Mã sinh viên:** B23DCCC025

## Giới thiệu

Bài tập gồm hai ứng dụng React + TypeScript độc lập:

- **Phần A — Class Component:** quản lý khoản chi bằng state của Class Component.
- **Phần B — Function Component + Hooks:** dùng Hooks, custom hooks và REST mock API cục bộ.

Cả hai phần hỗ trợ thêm, lọc, tìm kiếm và xóa khoản chi; hiển thị tổng chi và thống kê theo loại.

## Yêu cầu

- Node.js phiên bản 20 trở lên
- npm

## Cách chạy Phần A

Mở terminal tại thư mục dự án và chạy:

```bash
cd part-a-class
npm install
npm run dev
```

Mở địa chỉ local mà Vite hiển thị trong terminal.

## Cách chạy Phần B

Mở một terminal khác tại thư mục dự án và chạy:

```bash
cd part-b-hooks
npm install
npm run dev
```

Phần B sử dụng REST mock API cục bộ tại `/api/expenses` khi chạy bằng Vite. Dữ liệu ban đầu và các thay đổi được lưu trong [part-b-hooks/mock-data.json](./part-b-hooks/mock-data.json). Không cần cấu hình endpoint bên ngoài.

## Kiểm tra

Chạy các lệnh sau trong thư mục của phần muốn kiểm tra:

```bash
npm run lint
npm run build
```
