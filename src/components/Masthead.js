import React, { Component } from 'react'
class Masthead extends Component {
  constructor (props) {
    super(props)
    this.hasLanguageSelector = props.hasLanguageSelector
    // TODO: Test if input language is allowed
    this.state = {
      selectedLanguage: props.defaultLanguage ? props.defaultLanguage : 'English',
      isActive: false
    }
    this.languageSelectHandler = props.languageSelectHandler
    // should languages be extensible?
    this.languages = ['English', '中文', 'Bahasa Melayu', 'தமிழ்']
  }

  renderLanguageList () {
    return this.languages.map((language) => {
      return language !== this.state.selectedLanguage ? (<li key={language} alt={language} onClick={() => {
        this.setState({ selectedLanguage: language })
        if (this.languageSelectHandler) {
          this.languageSelectHandler(language)
        }
      }}>{language}</li>) : ('')
    })
  }

  renderLanguageSelector () {
    if (this.hasLanguageSelector) {
      const style = { display: this.state.isActive ? 'block' : 'none' }
      return (
        <div className="language_selector--dropdown" style={style} >
          <ul>
            {this.renderLanguageList()}
          </ul>
        </div>
      )
    }
  }

  toggleLanguageSelector () {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  renderSelectedLanguage () {
    if (this.hasLanguageSelector) {
      return (
        <div onClick={this.toggleLanguageSelector.bind(this)} className="col is-flex has-text-right language_selector">
          {this.state.selectedLanguage}
        </div>
      )
    }
  }

  render () {
    return (
      <div className="sgds-masthead">
        <div className="sgds-container">
          <div className="row">
            <div className="col is-9">
              <a href="https://www.gov.sg" >
                <span className="sgds-icon sgds-icon-sg-crest"></span>
                <span className="is-text">A Singapore Government Agency Website</span>
              </a>
            </div>
            {this.renderSelectedLanguage()}
          </div>
        </div>
        {this.renderLanguageSelector()}
      </div>
    )
  }
}

export default Masthead
