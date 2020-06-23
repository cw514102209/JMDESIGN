import React from 'react'
import classNames from 'classnames'
import { Icon } from 'antd'
import Button from '../Button'
import Indicator from '../Indicator'

import './index.less'

export default class Item extends React.Component {
  renderDetail(details) {
    return details.map((detail, index) => (
      <div key={index} className="jm_list_text">
        <div className="jm_list_title">{detail.title}</div>
        {detail.description && (
          <div className="jm_list_description">{detail.description}</div>
        )}
      </div>
    ))
  }

  render() {
    const {
      icon,
      image,
      title,
      status,
      description,
      extras,
      details,
      operations,
      onDelete,
      onEdit,
      onClick,
      className,
      titleClass,
    } = this.props

    return (
      <div
        className={classNames(
          'jm_list_item',
          {
            jm_list_withIcon: icon || image,
          },
          className,
        )}
        onClick={onClick}
      >
        <div className="jm_list_icon">
          {image ? (
            <img src={image} alt="" />
          ) : (
            icon && <Icon type={icon} style={{ fontSize: 40 }} />
          )}
          {status ? (
            <Indicator className="jm_list_indicator" type={status} />
          ) : null}
        </div>
        <div className="jm_list_texts">
          <div className={classNames('jm_list_text', titleClass)}>
            <div className="jm_list_title">{title}</div>
            <div className="jm_list_description">{description}</div>
          </div>
          {details && this.renderDetail(details)}
        </div>
        {extras}
        {operations || (
          <div className="jm_list_btns">
            {onDelete && <Button type="flat" icon="delete" onClick={onDelete} />}
            {onEdit && <Button type="flat" icon="edit" onClick={onEdit} />}
          </div>
        )}
      </div>
    )
  }
}
