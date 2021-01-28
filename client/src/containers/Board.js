import React, { useContext, useEffect } from 'react'
import Column from '../components/Column'
import { DragDropContext } from 'react-beautiful-dnd'
import { Context } from '../Store'
import { getList } from '../services/tasks'

function Board () {
  const [data, setData] = useContext(Context)
  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) { return null }

    // Set start and end variables
    const start = data.columns[source.droppableId]
    const end = data.columns[destination.droppableId]

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the tasks
      // Start by making a new tasks without the dragged item
      const newTasks = start.tasks.filter(
        (_, idx) => idx !== source.index
      )

      // Then insert the item at the right location
      newTasks.splice(destination.index, 0, start.tasks[source.index])

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        tasks: newTasks
      }

      // Update the state
      const newData = Object.assign({}, data)
      newData.columns[newCol.id] = newCol
      setData(newData)
      return null
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start tasks like before
      const newStartTasks = start.tasks.filter(
        (_, idx) => idx !== source.index
      )

      // Create a new start column
      const newStartCol = {
        id: start.id,
        name: start.name,
        tasks: newStartTasks
      }

      // Make a new end tasks array
      const newEndTasks = end.tasks

      // Insert the item into the end tasks
      newEndTasks.splice(destination.index, 0, start.tasks[source.index])

      // Create a new end column
      const newEndCol = {
        id: end.id,
        name: end.name,
        tasks: newEndTasks
      }

      // !TODO call enponint to update task
      // task need to be update start.tasks[source.index]
      // category end.id

      const newData = Object.assign({}, data)
      newData.columns[newStartCol.id] = newStartCol
      newData.columns[newEndCol.id] = newEndCol
      setData(newData)
      return null
    }
  }
  useEffect(() => {
    getList().then(response => {
      const data = {
        inEdit: {
          cIndex: -1,
          tIndex: -1
        },
        columns: response.data
      }
      setData(data)
    })
  }, [])

  const searchStyle = { width: '20rem', background: '#F2F1F9', border: 'none', padding: '0.5rem' }
  return (
      <div>
        <input style={searchStyle} type="text" placeholder={'search task'} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            margin: '24px auto',
            width: '80%',
            gap: '8px'
          }}
        >
          {Object.values(data.columns).map(col => (
            <Column id={col.id} key={col.id}/>
          ))}
        </div>
      </DragDropContext>
      </div>
  )
}

export default Board
