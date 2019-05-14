import React, { Component } from 'react'
import Button from './button'
import Navigation from './navigation'
import Slider from './slider/index.js'
import { ReaderContext } from '../../context'

import { mdiBookOpen, mdiFullscreen, mdiBookOpenOutline } from '@mdi/js'

class Toolbar extends Component {
  static contextType = ReaderContext

  constructor(props) {
    super(props)
  }

  render() {
    const { navigateForward, navigateBackward, toggleSetting } = this.context
    const { pages, bookMode, currentPage, totalPages } = this.context.state
    const layoutProps = {
      icon: bookMode ? mdiBookOpenOutline : mdiBookOpen,
      label: bookMode ? 'Book mode' : 'Single page',
      title: bookMode ? 'Book mode' : 'Single page',
    }

    const progress = (pages.length / totalPages) * 100

    return (
      <div className={'villain-toolbar'}>
        <Slider
          max={totalPages}
          value={currentPage}
          bufferProgress={progress}
          onChange={this.context.navigateToPage}
        />
        <Navigation currentPage={currentPage} totalPages={totalPages} />
        <div className={'villain-toolbar-group'}>
          <Button
            type={'toggler'}
            onClick={() => toggleSetting('bookMode')}
            {...layoutProps}
          />
          <Button
            type={'icon'}
            title={'Fullscreen'}
            icon={mdiFullscreen}
            onClick={() => toggleSetting('fullscreen')}
          />
        </div>
      </div>
    )
  }
}

export default Toolbar
