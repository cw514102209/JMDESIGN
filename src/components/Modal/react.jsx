import React from 'react'
import Button from '../Button'
import Modal from './index'

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  onToggle = type => {
    this.setState(prevState => ({ [`visible${type}`]: !prevState[`visible${type}`] }))
  }

  render() {
    const { visibledefault, visiblefullScreen, visiblerightScreen, visiblehide, visible } = this.state
    return (
      <div>
        <Button type="default" onClick={this.onToggle.bind(this, 'default')}>show default modal</Button>
        <Modal
          visible={visibledefault}
          onOk={this.onToggle.bind(this, 'default')}
          onCancel={this.onToggle.bind(this, 'default')}
        >
          default Modal
        </Modal>
        <br /><br />
        <Button type="control" onClick={this.onToggle.bind(this, 'fullScreen')}>show fullScreen modal</Button>
        <Modal
          fullScreen
          icon="home"
          title="title"
          description="description"
          visible={visiblefullScreen}
          onOk={this.onToggle.bind(this, 'fullScreen')}
          onCancel={this.onToggle.bind(this, 'fullScreen')}
        >
          fullScreen Modal
        </Modal>
        <br /><br />
        <Button type="danger" onClick={this.onToggle.bind(this, 'rightScreen')}>show rightScreen modal</Button>
        <Modal
          rightScreen
          icon="home"
          title="title"
          description="description"
          visible={visiblerightScreen}
          onOk={this.onToggle.bind(this, 'rightScreen')}
          onCancel={this.onToggle.bind(this, 'rightScreen')}
        >
          rightScreen Modal
        </Modal>
        <br /><br />
        <Button type="primary" onClick={this.onToggle.bind(this, 'hide')}>show hide modal</Button>
        <Modal
          hideHeader
          hideFooter
          width={900}
          visible={visiblehide}
          onOk={this.onToggle.bind(this, 'hide')}
          onCancel={this.onToggle.bind(this, 'hide')}
        >
          hide Modal
        </Modal>
        <br /><br />
        <Button type="flat" onClick={this.onToggle.bind(this, '')}>show modal</Button>
        <Modal
          closable={false}
          maskClosable={false}
          visible={visible}
          icon="home"
          title="title"
          description="description"
          okText="ok"
          cancelText="cancel"
          okButtonType="primary"
          cancelButtonType="danger"
          onOk={this.onToggle.bind(this, '')}
          onCancel={this.onToggle.bind(this, '')}
        >
          show Modal
        </Modal>
      </div>
    )
  }
}