import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { FaUser } from 'react-icons/fa'
import { blue } from '@material-ui/core/colors'
import { getList } from '../services/users'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
})

function UserDialog ({ user, onClose, selectedValue, open }) {
  const classes = useStyles()
  const [users, setUsers] = useState([])

  useEffect(() => {
    getList().then(response => {
      setUsers(response)
    })
  }, [])

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }

  return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          Assigned: {user.name}
        </DialogTitle>
        <hr />
        <List>
          {users.map((item) => (
            <ListItem button onClick={() => handleListItemClick(item)} key={item.email}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <FaUser />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Dialog>
  )
}

UserDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
}

export default UserDialog
