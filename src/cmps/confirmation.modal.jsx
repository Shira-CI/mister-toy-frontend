import Swal from 'sweetalert2'

export function ConfirmationModal({setConfirmationMsgIsShown, afterRemoveConfirmation}) {

  Swal.fire({
    title: 'Are you sure?',
    showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: 'Remove',
    denyButtonText: `Cancel`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Saved!', '', 'success')
      setConfirmationMsgIsShown(false)
      afterRemoveConfirmation()
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
      setConfirmationMsgIsShown(false)

    }
  })
}

