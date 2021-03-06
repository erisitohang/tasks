import React from 'react'
import styled from 'styled-components'
import { FaEdit } from 'react-icons/fa'

const StyledButton = styled.button`
  position: relative;
  padding: 0;
  margin: 0 0 1.5px 4px;
  border: 0;
  opacity: 0.1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(46, 68, 78);
  &:hover,
  &:focus,
  &:active {
    opacity: 1;
  }
`

const EditTaskButton = ({ ...props }) => {
  return (
    <StyledButton {...props}>
      <FaEdit size={18} />
    </StyledButton>
  )
}

export default EditTaskButton
