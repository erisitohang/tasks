/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Textarea from 'react-textarea-autosize'
import DatePicker from 'react-datepicker'
import EditTaskButton from './EditTaskButton'
import AssigneeTaksButton from './AssigneeTaksButton'
import UserDialog from './UserDialog'
import CalendarButton from './CalendarButton'
import { Context } from '../Store'
import { update } from '../services/tasks'
import 'react-datepicker/dist/react-datepicker.css'

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
const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 10px;
`
const ButtonWrapper = styled.div`
  height: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
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

const Item = ({ cIndex, tIndex }) => {
  const [data, setData] = useContext(Context)
  const { tasks } = data.columns[cIndex]
  // eslint-disable-next-line camelcase
  const { name, id, dueDate } = tasks[tIndex]
  const [tempTaskTitle, setTempTaskTitle] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const [startDate, setStartDate] = useState(new Date(dueDate))

  const openTaskEditor = (event, columnId, taskId) => {
    event.preventDefault()
    const newData = Object.assign({}, data)
    const newInEdit = { cIndex: columnId, tIndex: taskId }
    newData.inEdit = newInEdit
    setData(newData)
  }

  const openListUser = (event, columnId, taskId) => {
    setOpenDialog(true)
  }
  const handleCloseDialogUser = (value) => {
    setOpenDialog(false)
    setSelectedValue(value)
  }
  const handleTaskEditorChange = (event) => {
    setTempTaskTitle(event.target.value)
  }
  const handleKeyDown = (event, callback) => {
    if (event.keyCode === 13) {
      callback(event)
    }
  }
  const handleTaskEdit = async (e) => {
    e.preventDefault()
    if (tempTaskTitle.length < 1) {
      // onDeleteCard(cardInEdit)
    } else {
      onEditTask({ description: tempTaskTitle })
    }
  }

  const onEditTask = async (req) => {
    const { tasks } = data.columns[cIndex]
    const cId = data.columns[cIndex].id
    const { id } = tasks[tIndex]
    update({ id, ...req }).then((result) => {
      const newData = Object.assign({}, data)
      const newInEdit = { cIndex: -1, tIndex: -1 }
      if ('description' in req) {
        newData.columns[cId].tasks[tIndex].name = req.description
        newData.inEdit = newInEdit
        setTempTaskTitle('')
      }
      if ('due_date' in req) {
        newData.columns[cId].tasks[tIndex].dueDate = req.due_date
        setStartDate(req.due_date)
      }
      setData(newData)
    })
  }

  const handleTaskUpdateDate = async (date) => {
    onEditTask({ due_date: date })
  }

  return (
    <Draggable draggableId={id.toString()} index={tIndex}>
      {provided => (
          <div ref={provided.innerRef}>
          { data && data.inEdit && data.inEdit.cIndex === cIndex && data.inEdit.tIndex === tIndex
            ? (
              <TextareaWrapper
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
                <StyledTextarea
                defaultValue={name}
                onChange={handleTaskEditorChange}
                onKeyDown={(e) => handleKeyDown(e, handleTaskEdit)}
                onBlur={handleTaskEdit}
                />
              </TextareaWrapper>
              )
            : (
            <ItemTitle
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {name}
              <ButtonWrapper>
                <EditTaskButton onClick={(e) => openTaskEditor(e, cIndex, tIndex)} />
                <AssigneeTaksButton onClick={(e) => openListUser(e, cIndex, tIndex)} />
                <UserDialog selectedValue={selectedValue} open={openDialog} onClose={handleCloseDialogUser} />
                <DatePicker
                selected={startDate}
                onChange={date => handleTaskUpdateDate(date)}
                customInput={<CalendarButton />}
                />
              </ButtonWrapper>
            </ItemTitle>
              )}
        </div>
      )}
    </Draggable>
  )
}

Item.propTypes = {
  cIndex: PropTypes.string.isRequired,
  tIndex: PropTypes.number.isRequired
}

export default Item
