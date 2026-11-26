import { Component } from 'react'

export default class WelcomeBanner extends Component {
  render() {
    return (
      <section className="welcome">
        <div>
          <span className="eyebrow">TÀI CHÍNH CỦA BẠN, TRONG TẦM TAY</span>
          <h1>Mỗi khoản chi,<br /><em>một lựa chọn.</em></h1>
          <p>Ghi lại hôm nay, an tâm ngày mai.</p>
        </div>
        <div className="welcome-decoration" aria-hidden="true"><span>₫</span><i>✳</i></div>
      </section>
    )
  }
}
