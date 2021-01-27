import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import EditTaskButton from './EditTaskButton'

const ItemTitle = styled.div`
  background: white;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.1);
  margin: 0 10px 10px 10px;
  padding: 8px;
  border-radius: 5px;
  position: relative;
  overflow-wrap: break-word;
  overflow: visible;
  word-wrap: break-word;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover,
  &:active,
  &:focus {
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.3);
  }
`

const ButtonWrapper = styled.div`
  height: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Item = ({ task: { name }, index }) => {
  return (
    <Draggable draggableId={name} index={index}>
      {provided => (
        <ItemTitle
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {name}
          <ButtonWrapper>
            <EditTaskButton />
          </ButtonWrapper>
        </ItemTitle>
      )}
    </Draggable>
  )
}

Item.propTypes = {
  task: PropTypes.object.isRequired,
  name: PropTypes.string,
  index: PropTypes.number.isRequired
}

export default Item
