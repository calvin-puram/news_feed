<template>
  <div class="md-layout md-alignment-center-center" style="height: 100vh;">
    <md-card class="md-layout-item md-size-50">
      <md-card-header>
        <div class="md-title">Login</div>
      </md-card-header>

      <!-- Register Form -->
      <form @submit.prevent="validateForm">
        <md-card-content>
          <md-field md-clearable :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input
              id="email"
              v-model="form.email"
              :disabled="loading"
              type="email"
              name="email"
              autocomplete="email"
            />
            <span v-if="!$v.form.email.required" class="md-error"
              >email is required</span
            >
            <span v-else-if="!$v.form.email.email" class="md-error"
              >invalid email</span
            >
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Password</label>
            <md-input
              id="password"
              v-model="form.password"
              :disabled="loading"
              type="password"
              name="password"
              autocomplete="password"
            />
            <span v-if="!$v.form.password.required" class="md-error"
              >password is required</span
            >
            <span v-else-if="!$v.form.password.minLength" class="md-error"
              >password too short</span
            >
            <span v-else-if="!$v.form.password.maxLength" class="md-error"
              >password too long</span
            >
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button to="/register">Go to Register</md-button>
          <md-button
            :disabled="loading"
            class="md-primary md-raised"
            type="submit"
            >Submit</md-button
          >
        </md-card-actions>
      </form>
      <md-snackbar :md-active.sync="isAuthenticated">
        {{ form.email }} was successfully logged In!
      </md-snackbar>
    </md-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
const {
  required,
  email,
  maxLength,
  minLength,
} = require('vuelidate/lib/validators');

export default {
  mixins: [validationMixin],
  middleware: ['auth'],
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
    },
  },
  computed: {
    loading() {
      return this.$store.getters['auth/loading'];
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
  },

  methods: {
    validateForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store
          .dispatch('auth/register_user', {
            action: 'login',
            Api_Url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FB_AUTH_KEY}`,
            email: this.form.email,
            password: this.form.password,
            returnSecureToken: true,
          })
          .then((data) => {
            if (data) {
              this.$router.push('/');
            }
          });
      }
    },

    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
  },
};
</script>
