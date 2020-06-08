<template>
  <main class="main">
    <form @submit.prevent="save">
      <FormInput
        label="Имя"
        :error="form.first_name.error"
        v-model.trim="form.first_name.value"
        @input="handleValidation(form.first_name, requiredRules)"
      />
      <FormInput
        label="Фамилия"
        :error="form.last_name.error"
        v-model.trim="form.last_name.value"
        @input="handleValidation(form.last_name, requiredRules)"
      />
      <FormInput
        label="Отчество"
        :error="form.middle_name.error"
        v-model.trim="form.middle_name.value"
        @input="handleValidation(form.middle_name, requiredRules)"
      />
      <button
        type="submit"
        :disabled="loading || !isValid"
      >Сохранить</button>
    </form>
  </main>
</template>
<script>
import FormInput from './components/FormInput'
import { handleValidationMixin } from './mixins/handleValidationMixin'
import {
  hasErrorStateFromModel,
  getValueFromObject,
  mergeFormWithValues
} from './helpers/forms'

export default {
  mixins: [handleValidationMixin],
  data: () => ({
    loading: false,
    requiredRules: [
      v => !!v || 'Поле обязательно для заполнения'
    ],
    form: {
      first_name: {},
      last_name: {},
      middle_name: {},
    }
  }),
  mounted () {
    this.getProfile()
  },
  components: {
    FormInput
  },
  computed: {
    isValid: ({ form }) => !hasErrorStateFromModel(form)
  },
  methods: {
    save () {
      if (!this.isValid) return false

      this.loading = true

      const payload = getValueFromObject(this.form)

      fetch('/save', {
        method: 'POST',
        body: JSON.stringify(payload)
      }).finally(() => this.loading = false)
    },
    getProfile () {
      this.loading = true

      fetch('/data.json')
        .then(res => res.json())
        .then(res => {
          this.form = mergeFormWithValues(this.form, res, {
            fieldModel: {
              value: null,
              error: '',
              hasError: false
            }
          })
        })
        .finally(() => this.loading = false)
    }
  }
}
</script>
<style lang="scss" scoped>
  .main {
    padding: 0;
    margin: 0;
  }
</style>
