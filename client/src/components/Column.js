import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import Item from './Item'
import styled from 'styled-components'

const ListColumn = styled.div`
  width: 268px;
  background: rgb(248, 248, 248);
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 14px;
  margin: 8px;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  padding: 8px;
`

const Column = ({ col: { list, id, name } }) => {
  return (
    <Droppable droppableId={id.toString()}>
      {provided => (
        <ListColumn>
          <h2>{name}</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '120px'
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((task, index) => (
              <Item task={task} key={task.id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </ListColumn>
      )}
    </Droppable>
  )
}

Column.propTypes = {
  col: PropTypes.object.isRequired,
  list: PropTypes.array,
  id: PropTypes.number,
  name: PropTypes.string
}

export default Column
