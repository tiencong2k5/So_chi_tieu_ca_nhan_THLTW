import useClock from '../hooks/useClock'
import useTheme from '../context/useTheme'

export default function AppHeader() {
  const now = useClock()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="topbar">
      <a className="brand" href="#" aria-label="Sổ chi tiêu cá nhân">
        <span className="brand-icon" aria-hidden="true">₫</span>
        <span>Sổ <strong>chi tiêu</strong></span>
      </a>
      <div className="topbar-note"><span className="live-dot" /> Hôm nay, một ngày tốt để cân đối</div>
      <div className="topbar-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          type="button"
          aria-label={`Chuyển sang giao diện ${theme === 'light' ? 'tối' : 'sáng'}`}
        >
          {theme === 'light' ? '☾' : '☀'}
        </button>
        <div className="clock-wrap">
          <span>GIỜ HIỆN TẠI</span>
          <time className="clock" dateTime={now.toISOString()}>{now.toLocaleTimeString('vi-VN')}</time>
        </div>
      </div>
    </header>
  )
}
