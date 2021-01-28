import React, { useContext, useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import Textarea from 'react-textarea-autosize'
import Item from './Item'
import styled from 'styled-components'
import { Context } from '../Store'
import Button from './Button'

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
const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 10px;
  margin: 0 10px 10px 10px;
`

const StyledTextarea = styled(Textarea)`
  border-radius: 4px;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.1);
  border: none;
  padding: 8px;
  margin-bottom: 10px;
  overflow: ;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  outline: none;
  resize: none;
`
const Column = ({ id }) => {
  const [data] = useContext(Context)
  const [newTaskFormIsOpen, setNewTaskFormIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const { name } = data.columns[id]
  const tasks = data.columns[id].tasks || []
  const toggleTaskComposer = () => setNewTaskFormIsOpen(!newTaskFormIsOpen)
  const handleSubmitTask = (event) => {
    event.preventDefault()
    setNewTaskFormIsOpen(false)
    if (newTaskTitle.length < 1) return
    onSubmitTask()
  }
  const handleTaskComposerChange = (event) => {
    setNewTaskTitle(event.target.value)
  }
  const handleKeyDown = (event, callback) => {
    if (event.keyCode === 13) {
      callback(event)
    }
  }
  const onSubmitTask = async () => {
    setIsLoading(true)
    setIsLoading(false)
  }

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
            {tasks.map((task, index) => (
              <Item cIndex={id} key={task.id} tIndex={index} />
            ))}
            {provided.placeholder}
          </div>
          {(newTaskFormIsOpen || isLoading) && (
              <TextareaWrapper>
                <StyledTextarea
                  value={newTaskTitle}
                  onChange={handleTaskComposerChange}
                  onKeyDown={(e) => handleKeyDown(e, handleSubmitTask)}
                  onBlur={handleSubmitTask}
                />
                <Button variant="add" onClick={handleSubmitTask} text="Add" disabled={newTaskTitle === ''} />
              </TextareaWrapper>
          )}
          {!newTaskFormIsOpen && !isLoading && (
            <Button variant="card" text="Add new card" onClick={toggleTaskComposer}>
              Add new task
            </Button>
          )}
        </ListColumn>
      )}
    </Droppable>
  )
}

Column.propTypes = {
  id: PropTypes.string
}

export default Column
