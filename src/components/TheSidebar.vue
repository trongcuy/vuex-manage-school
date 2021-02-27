<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <router-link to="/">
        <img src="./../assets/images/logo.svg" alt="logo"
      /></router-link>
    </div>
    <div class="sidebar__list">
      <ul>
        <li>
          <router-link to="/overview"
            ><i class="fas fa-tachometer-alt"></i> Tổng quan</router-link
          >
        </li>
        <li>
          <router-link to="/students"
            ><i class="fas fa-user-graduate"></i> Danh sách học
            sinh</router-link
          >
        </li>
        <li>
          <router-link to="/teachers"
            ><i class="fas fa-chalkboard-teacher"></i> Danh sách giáo
            viên</router-link
          >
        </li>
        <li>
          <router-link to="/classes"
            ><i class="fas fa-door-open"></i> Danh sách lớp học</router-link
          >
        </li>
        <li>
          <router-link to="/subjects"
            ><i class="fas fa-book"></i> Danh sách môn học</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 220px;
  height: 100vh;
  border-right: 1px solid #bbbbbb;
  &__logo {
    padding: 12px 0 12px 16px;
  }
  &__list {
    li {
      list-style-type: none;
      a {
        color: #000;
        display: block;
        padding: 16px 0 16px 16px;
        &:hover {
          background-color: #e5e5e5;
        }
        i {
          font-size: 15px;
          width: 25px;
        }
      }
    }
  }
}
</style>
