export default function errorHandler(err, req, res, next) {

  console.log('🤖 Error Has Occurred')
  console.log(err.name)
  console.log(err)

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid parameter given' })
  }

  if (err.name === 'NotFound') {
    return res.status(404).json({ message: 'Not found' })
  }
 
  if (err.name === 'NotValid') {
    return res.status(400).json({ message: 'There was a problem.' })
  }


  if (err.name === 'ValidationError') {
    const errors = {}

    for (const key in err.errors) {
      errors[key] = err.errors[key].message
    }

    return res.status(422).json({
      message: 'Form Validation Error',
      errors,
    })
  }

  res.sendStatus(500)
  next(err)
}