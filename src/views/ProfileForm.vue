<template>
    <v-stepper v-model="e1" :alt-labels="true">
        <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1" :editable="true">Data Diri</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2" :editable="true">Data Tambahan</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3"> Selesai</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items class="mt-2">
            <v-stepper-content step="1" >
                <DatePicker v-model="details.dateOfBirth" format="DD-MMM-YYYY"></DatePicker>
                <v-text-field
                    class="profile-form mt-2"
                    outlined
                    dense
                    prepend-inner-icon="ri ri-map-pin-add-line"
                    label="Alamat"
                    v-model.trim="details.address"
                    @blur="$v.details.address.$touch()"
                    clearable
                    required
                    :error="isAddressError"
                    :loading="isLoading"
                    :disabled="disabled"
                />
                <p v-if="!$v.details.address.minLength" class="text-red mt-m-25 fs-12">Alamat minimal 5 huruf.</p>
                <div v-if="$v.details.address.$error">
                    <p v-if="!$v.details.address.required" class="text-red mt-m-25 fs-12">Alamat harap diisi.</p>
                </div>
                <v-text-field
                    class="profile-form mt-2"
                    outlined
                    dense
                    type="number"
                    prepend-inner-icon="ri ri-map-pin-add-line"
                    label="Nomor HP"
                    v-model.trim="details.phoneNumber"
                    @blur="$v.details.phoneNumber.$touch()"
                    clearable
                    required
                    :error="isPhoneNumberError"
                    :loading="isLoading"
                    :disabled="disabled"
                />
                <p v-if="!$v.details.phoneNumber.minLength" class="text-red mt-m-25 fs-12">Nomor Handphone minimal 11 digit</p>
                <div v-if="$v.details.phoneNumber.$error">
                    <p v-if="!$v.details.phoneNumber.required" class="text-red mt-m-25 fs-12">Nomor Handphone Wajib Diisi</p>
                </div>
                <v-radio-group v-model="details.gender" class="d-flex radio-gender">
                  <v-radio
                    label="Laki-Laki"
                    value="1"
                  ></v-radio>
                  <v-radio
                    label="Perempuan"
                    value="2"
                  ></v-radio>
                </v-radio-group>
            <v-btn
              color="primary"
              @click="e1 = 2"
            >
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-content step="2" class="mt-2">
            <v-text-field
                    outlined
                    class="profile-form mt-4"
                    prepend-inner-icon="ri ri-phone-line"
                    label="No Hp"
                    dense
                    v-model.trim="details.memberCode"
                    @blur="$v.details.memberCode.$touch()"
                    clearable
                    required
                    :error="isMemberCodeError"
                    :loading="isLoading"
                    :disabled="disabled"
                />
            <v-select
              :items="selectStatus"
              label="Outlined style"
              dense
              v-model="valueStatus"
              outlined
            >
            </v-select>
            <v-file-input
              class="profile-form__image"
              v-model="files"
              label="File input"
              dense
              placeholder="Select your files"
              outlined
            >
            </v-file-input>
            

            <v-btn
              color="primary"
              @click="e1 = 3"
            >
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-content step="3" class="mt-2">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>

            <v-btn
              color="primary"
              @click="e1 = 1"
            >
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>
        </v-stepper-items>
  </v-stepper>
</template>

<script>
import { required, minLength,numeric } from "vuelidate/lib/validators";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
  export default {
    components: { DatePicker },
    data () {
        return {
            e1: 1,
            files: [],


            //if any error when typing text field
            isAddressError: false,
            isPhoneNumberError: false,

            //loading bar text field
            isLoading: false,

            //disabled text field
            disabled: false,

            selectStatus: ['Pelajar', 'Mahasiswa', 'Karyawan'],

            details : {
                address : null,
                dateOfBirth: null,
                phoneNumber: null,
                gender: null,
                memberCode: null,
                valueStatus: null,
            }
        }
    },
    updated(){
        if(!this.$v.details.address.minLength){
            this.isAddressError = true
        }
        else {
            this.isAddressError = false
        }
        if(!this.$v.details.phoneNumber.minLength){
            this.isPhoneNumberError = true
        }
        else {
            this.isPhoneNumberError = false
        }
    },
    validations: {
        details : {
            address : {
                required,
                minLength: minLength(5)
            },
            phoneNumber : {
                required,numeric,
                minLength: minLength(10)
            }
        }
    },
  }
</script>

<style lang="scss">
.v-stepper__label {
  display: flex !important;
}
.v-stepper--alt-labels .v-stepper__step {
  flex-basis: auto !important;
}

.profile-form .v-icon {
  font-size: 18px;
}

.radio-gender{
  margin-top: 0px !important;
}

.profile-form {

  &__image {
    margin-top: 20px !important;
  }
}

//datepicker
.mx-datepicker {
  width: 314px;
  margin-bottom: 20px;
}
.mx-input {
  padding: 20px 30px;
}
</style>