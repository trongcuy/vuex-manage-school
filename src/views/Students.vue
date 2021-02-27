<template>
  <div class="content">
    <div class="page-head">
      <h1>Danh sách học sinh</h1>
      <BaseButton class="btn btn--add" @click.native="openDialog">
        <i slot="icon-button" class="fas fa-plus"></i>
        Thêm học sinh
      </BaseButton>
    </div>
    <div class="top-bar">
      <div>
        <BaseInput placeholder="Tìm kiếm theo tên ..." />
      </div>
      <BaseButton @click.native="removeStudent" v-if="isDeleting" class="btn btn--delete">Xóa</BaseButton>
    </div>
    <StudentGrid />
    <StudentDialog v-if="isOpeningDialog" />
    <div class="overlay" v-if="isOverlay"></div>
    <div class="notify" v-bind:style="notify.notifyStyle" v-if="notify.isNotify">{{notify.message}}</div>
  </div>
</template>

<script>
import StudentGrid from "./../components/StudentGrid";
import StudentDialog from "./../components/StudentDialog";
import BaseButton from "./../components/BaseButton";
import BaseInput from "./../components/BaseInput";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
// import { mapStates } from "vuex";
export default {
  inheritAttrs: false,
  components: {
    StudentGrid,
    StudentDialog,
    BaseButton,
    BaseInput
  },
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters("students", {
      isOpeningDialog: "getIsOpeningDialog",
      isOverlay: "getIsOverlay",
      isDeleting: "getIsDeleting",
      notify: "getNotify",
    })
    // ...mapStates("isOpeningDialog")
  },
  created() {
    this.$store.dispatch("students/loadStudents");
  },

  methods: {
    /**
     * Lấy data từ store
     */
    ...mapActions("students", {
      openDialog: "openDialog",
      closeDialog: "closeDialog",
      deleteStudent: "deleteStudent"
    }),

    /**
     * xóa student
     */
    removeStudent(){
      if(confirm("Bạn muốn chắc chắn xóa!")){
        this.deleteStudent();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 16px;
  padding-bottom: 0;
  .page-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
    h1 {
      font-weight: 700;
    }
  }
  .button-base {
    display: flex;
    justify-content: center;
  }
  .overlay {
    background-color: #000;
    opacity: 0.5;
    z-index: 98;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
  }
  .top-bar {
    display: flex;
    justify-content: space-between;
  }
  .notify{
    position: fixed;
    width: 150px;
    height: 40px;
    bottom: 10px;
    right: -150px;
    border-radius: 4px 0 0 4px;
    animation-name: notify;
    animation-duration: 1.5s;
    text-align: center;
    line-height: 40px;
    color: #fff;

  }
  @keyframes notify {
    0% {right: -150px;}
    50% {right: 0px;}
    100% {right: -150px;}
  }
}
</style>
