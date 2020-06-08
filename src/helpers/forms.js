export const handleValidate = (value, rules = []) => {
  if (!rules.length || typeof rule === 'string') return false

  let hasError = false, error = ''

  const results = rules.map(validation => {
    if (typeof validation === 'string') return validation

    const validationResult = validation(value)

    return typeof validationResult === 'string' ? validationResult : ''
  }).filter(message => message !== '')
  
  if (results.length) {
    hasError = true
    error = results[0] // Покажем первую найденную ошибку
  }

  return { hasError, error }
}

/**
 * wait object with hasError property
 * @param {Object} data
 * @param {String} propName - prop to be checked, default - hasError
 * @returns {Boolean} - returns the inverse value
 */
export const hasErrorStateFromModel = (data = {}, propName = 'hasError') => {
  if (typeof data !== 'object') return false

  return !Object
    .entries(data)
    // eslint-disable-next-line no-unused-vars
    .reduce((acc, [_, value]) => acc * !value[propName], true)
}

export const getValueFromObject = (data = {}, valuePropName = 'value') => {
  if (typeof data !== 'object') return data

  return Object
    .entries(data)
    .reduce((acc, [propName, value]) => !value ? acc : { ...acc, ...{[propName]: getValue(value, valuePropName)} }, {})
}

export const mergeFormWithValues = (destinationForm = {}, valuesForm = {},  options = {}) => {
  if (typeof valuesForm !== 'object' || typeof destinationForm !== 'object') return destinationForm

  const { fieldModel = {}, valuePropName = 'value' } = options

  return Object
    .entries(destinationForm)
    .reduce((acc, [propName, value]) => {
      return !value ? acc : {
        ...acc,
        ...({[propName]: { ...fieldModel, ...value, [valuePropName]: valuesForm[propName] }})
      }
    }, {})
}

const getValue = (data = {}, propName) => {
  if (typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, propName)) {
    return data[propName]
  }

  return data
}
