<template>
  <div class="header">
    <div class="header__name">
      <h2>Trường Đại học Công Nghiệp Hà Nội</h2>
    </div>
    <div class="header__account">
      <div class="header__account__avatar">
        <img src="./../assets/images/avatar-default.png" alt="avatar" />
      </div>
      <div class="header__account__name">
        Nguyễn Trọng Quý
      </div>
      <div class="header__account__option">
        <a href="">
          <img src="./../assets/images/option.png" alt="option" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bbbbbb;
  &__name {
    margin-left: 34px;
  }
  &__account {
    display: flex;
    align-items: center;
    margin-right: 34px;
    &__avatar {
      img {
        width: 30px;
      }
    }
    &__name {
      padding: 0 16px;
    }
    &__option {
      position: relative;
      top: 3px;
    }
  }
}
</style>
