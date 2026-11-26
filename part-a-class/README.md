# Sổ chi tiêu cá nhân — Phần A (Class Component)

Ứng dụng React + TypeScript ghi chép, lọc và thống kê các khoản chi. Dữ liệu mẫu được khai báo trong `src/App.tsx` và được lưu trong state khi ứng dụng chạy.

## Chạy ứng dụng

```bash
npm install
npm run dev
```

## Nội dung thực hành

- `App` quản lý danh sách khoản chi và loại đang lọc; tiêu đề tab được cập nhật theo tổng chi trong `componentDidUpdate`.
- `Clock` tạo interval trong `componentDidMount`, dừng khi tab ẩn và dọn interval/listener trong `componentWillUnmount`.
- Form kiểm tra nội dung, số tiền và ngày; danh sách hỗ trợ xác nhận trước khi xóa, lọc theo loại và tìm kiếm có debounce.
- Bảng tóm tắt hiển thị tổng chi theo từng loại.
