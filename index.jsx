import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <meta charSet='utf-8' />
        </head>
        <body>
          <p>
            Hello, {this.props.name}!
          </p>
        </body>
      </html>
    )
  }
}
