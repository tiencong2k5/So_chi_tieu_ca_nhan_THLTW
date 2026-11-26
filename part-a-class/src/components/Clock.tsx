import { Component } from 'react'

export default class Clock extends Component<Record<string, never>, { now: Date }> {
  private intervalId: number | undefined

  state = { now: new Date() }

  componentDidMount() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
    if (!document.hidden) this.startClock()
  }

  componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    this.stopClock()
  }

  private startClock = () => {
    this.stopClock()
    this.intervalId = window.setInterval(() => this.setState({ now: new Date() }), 1000)
  }

  private stopClock = () => {
    if (this.intervalId !== undefined) {
      window.clearInterval(this.intervalId)
      this.intervalId = undefined
    }
  }

  private handleVisibilityChange = () => {
    if (document.hidden) this.stopClock()
    else {
      this.setState({ now: new Date() })
      this.startClock()
    }
  }

  render() {
    return (
      <time className="clock" dateTime={this.state.now.toISOString()}>
        {this.state.now.toLocaleTimeString('vi-VN')}
      </time>
    )
  }
}
