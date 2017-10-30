import React from 'react'

// Component
class CoolButton extends React.Component {
  componentWillMount () {
    this.setState({count: 0})
  }

  render () {
    const {count} = this.state

    return (
      <button type='button' onClick={() => this.setState({count: count + 1})}>
        Click HERE to increment: {count}
      </button>
    )
  }
}

// Export default for server first rendering
export default class extends React.Component {
  render () {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <meta charSet='utf-8' />
        </head>
        <body>
          <CoolButton />
          {/* Require the index bundle */}
          <script src='/bundle/index' />
        </body>
      </html>
    )
  }
}

// Export for the bundle
export { CoolButton }
