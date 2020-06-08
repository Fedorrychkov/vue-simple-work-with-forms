import { handleValidate } from '../helpers/forms'

export const handleValidationMixin = {
  methods: {
    handleValidation (model, rules = []) {
      const { hasError, error } = handleValidate(model.value, rules)
      
      model.hasError = hasError
      model.error = error
    },
  },
}
