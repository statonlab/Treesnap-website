import React from 'react'

export default class TwitterFeed extends React.Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      if (window.twttr) {
        window.twttr.widgets.load()
        clearInterval(this.interval)
      }
    }, 15)
  }

  render() {
    return (
      <div>
        <a className="twitter-timeline"
           data-height="487"
           data-width="432"
           data-link-color="#2A9D8F"
           href="https://twitter.com/Treesnapapp?ref_src=twsrc%5Etfw">Tweets by Treesnapapp</a>
      </div>
    )
  }
}
