import React, {Component} from 'react'

export default class Scene extends Component {
  constructor(props) {
    super(props)

    if (window.ga) {
      setTimeout(() => window.ga('send', 'pageview'), 2500)
    }
  }
}
