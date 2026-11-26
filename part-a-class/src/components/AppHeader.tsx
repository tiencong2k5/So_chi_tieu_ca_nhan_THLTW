import { Component } from 'react'
import Clock from './Clock'

export default class AppHeader extends Component {
  render() {
    return (
      <header className="topbar">
        <a className="brand" href="#" aria-label="Sổ chi tiêu cá nhân">
          <span className="brand-icon" aria-hidden="true">₫</span>
          <span>Sổ <strong>chi tiêu</strong></span>
        </a>
        <div className="topbar-note"><span className="live-dot" /> Hôm nay, một ngày tốt để cân đối</div>
        <div className="clock-wrap"><span>GIỜ HIỆN TẠI</span><Clock /></div>
      </header>
    )
  }
}
