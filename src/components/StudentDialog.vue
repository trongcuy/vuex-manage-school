<template>
  <div class="dialog">
    <div class="dialog__title">
      THÔNG TIN HỌC SINH
      <div class="dialog__title__close-dialog">
        <i @click="closeDialog" class="fas fa-times"></i>
      </div>
    </div>
    <div class="dialog__content">
      <div class="dialog__content__avatar">
        <div class="img"></div>
        <div class="note">
          (Vui lòng chọn ảnh có định dạng
          <br />
          <b>.jpg, .jpeg, .png, .gif.</b>
          )
        </div>
      </div>
      <div class="dialog__content__main">
        <div class="label">
          THÔNG TIN CHUNG:
        </div>
        <div class="input">
          <BaseInput class="input__field" v-model="student.StudentCode"
            >Mã học sinh</BaseInput
          >
          <BaseInput class="input__field" v-model="student.FullName"
            >Tên học sinh</BaseInput
          >
        </div>

        <div class="input">
          <BaseInput
            class="input__field"
            type="date"
            v-model="student.DateOfBirth"
            >Ngày sinh</BaseInput
          >
          <div class="input__field">
            <label>Giới tính</label>
            <select v-model="student.Gender">
              <option value="0">Nữ</option>
              <option value="1">Nam</option>
              <option value="2">Khác</option>
            </select>
          </div>
        </div>

        <div class="input">
          <BaseInput class="input__field" v-model="student.Email"
            >Email</BaseInput
          >
          <BaseInput class="input__field" v-model="student.PhoneNumber"
            >Số điện thoại</BaseInput
          >
        </div>

        <div class="input">
          <BaseInput class="input__field" v-model="student.Address"
            >Địa chỉ</BaseInput
          >
          <BaseInput class="input__field" v-model="student.Class"
            >Lớp học</BaseInput
          >
        </div>
      </div>
    </div>
    <div class="dialog__footer">
      <BaseButton @click.native="closeDialog" class="btn btn--close"
        >Hủy</BaseButton
      >

      <BaseButton
        @click.native="updateStudent"
        v-if="isEditting"
        class="btn btn--save"
        ><i class="far fa-save" slot="icon-button"></i>Sửa</BaseButton
      >

      <BaseButton @click.native="saveStudent" v-else class="btn btn--save"
        ><i class="far fa-save" slot="icon-button"></i>Lưu</BaseButton
      >
    </div>
  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";
import BaseButton from "./BaseButton.vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  components: { BaseInput, BaseButton },
  computed: {
    ...mapGetters("students", {
      isEditting: "getIsEditting",
      student: "getStudent"
    })
  },

  data() {
    return {
    };
  },
  methods: {
    /**
     * lấy data từ store
     */
    ...mapActions("students", {
      openDialog: "openDialog",
      closeDialog: "closeDialog"
    }),

    /**
     * Thêm 1 student
     */
    saveStudent() {
      this.$store.dispatch("students/addStudent", this.student);
      this.closeDialog();
    },

    /**
     * Sửa 1 student
     */
    updateStudent() {
      this.$store.dispatch("students/updateStudent", this.student);
      this.closeDialog();
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  background-color: #fff;
  height: auto;
  width: 800px;
  z-index: 99;
  position: absolute;
  left: 50%;
  top: 40px;
  margin-left: -400px;
  padding-top: 24px;
  border-radius: 4px;

  &__title {
    font-size: 20px;
    font-weight: 700;
    padding: 0 24px;
    padding-bottom: 16px;
    &__close-dialog {
      top: 0;
      right: 0;
      position: absolute;
      cursor: pointer;
      opacity: 0.7;
      background-size: 20px;
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      color: #333;
    }
  }
  &__content {
    display: flex;
    padding: 0 24px;
    &__avatar {
      padding-top: 16px;
      padding-right: 16px;
      flex: 1;
      text-align: center;
      .img {
        background-image: url("/assets/images/default-avatar.jpg");
        background-repeat: no-repeat;
        width: 160px;
        height: 160px;
        background-position: center;
        background-size: cover;
        border: 1px solid #ccc;
        border-radius: 50%;
        margin: 0;
      }
    }
    &__main {
      flex: 4;
      .label {
        font-weight: 700;
        margin-top: 10px;
        position: relative;
        height: 30px;
        margin-bottom: 10px;
        &::before {
          content: "";
          position: absolute;
          width: 70px;
          height: 4px;
          bottom: 0;
          left: 0;
          background-color: #019160;
        }
      }
      .input {
        display: flex;
        margin-top: 16px;
        &__field {
          flex: 1;
          position: relative;
          select {
            width: 100%;
          }
        }
        & > .input__field {
          margin-right: 10px;
        }
      }
    }
  }
  &__footer {
    background-color: #e9ebee;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 60px;
    padding: 0 24px;
    margin-top: 24px;
    i {
      margin-right: 8px;
    }
  }
}
</style>
