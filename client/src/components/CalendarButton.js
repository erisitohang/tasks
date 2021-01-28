import React, {
  forwardRef
} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FaCalendar } from 'react-icons/fa'

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

// eslint-disable-next-line react/display-name
const CalendarButton = forwardRef(({ onClick }, ref) => {
  return (
    <StyledButton onClick={onClick}>
      <FaCalendar size={18} />
    </StyledButton>
  )
})

CalendarButton.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
}

export default CalendarButton
