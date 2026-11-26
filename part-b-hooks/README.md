# Sổ chi tiêu cá nhân — Phần B (Function Component + Hooks)

Ứng dụng React + TypeScript dùng REST mock API để tải, thêm và xóa khoản chi. Không dùng React Router, Redux hay thư viện UI.

## API mặc định (không cần cấu hình)

Mặc định ứng dụng sử dụng REST mock API cục bộ do Vite cung cấp tại `/api/expenses`. API hỗ trợ `GET`, `POST` và `DELETE`; dữ liệu mẫu và các thay đổi được lưu trong `mock-data.json`, không cần tài khoản, endpoint hay cài thêm thư viện.

## Dùng MockAPI.io

Muốn dùng project MockAPI.io của bạn, tạo resource `expenses` với các trường `description`, `amount`, `category`, `date`, sau đó đặt URL endpoint resource trong `.env.local`:

```env
VITE_MOCKAPI_URL=https://<project-id>.mockapi.io/api/v1/expenses
```

Khởi động lại Vite sau khi đổi biến môi trường. Khi được đặt, endpoint này thay thế API local.

## Hooks và bài học từ Class

- `useEffect` thay vòng đời của Class: đăng ký/dọn interval đồng hồ, đồng bộ tiêu đề tab và debounce tìm kiếm; cleanup gom ngay cạnh tác vụ cần dọn.
- `useClock` đóng gói đồng hồ thành logic tái sử dụng, thay cho các lifecycle và phương thức quản lý timer rải trong Class.
- `useState` quản lý state cục bộ rõ ràng hơn; `useFetch` tập trung tải/thêm/xóa và trạng thái loading/error thay cho việc trộn xử lý API vào lifecycle.
- `useRef` focus lại ô nội dung sau khi thêm thành công mà không gây render; `useContext` chia sẻ chế độ sáng/tối, không cần truyền props qua nhiều cấp.
