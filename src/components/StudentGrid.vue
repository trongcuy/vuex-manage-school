<template>
  <div class="table-content">
    <table cellspacing="0" border="0" width="100%">
      <thead>
        <tr>
          <th style="width: 20px"></th>
          <th style="width: 50px">STT</th>
          <th v-for="key in getKeyFieldName" :key="key">
            {{ fieldNames[key] }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          @dblclick="updateStudent(student.id)"
          v-for="(student, index) in students"
          :key="student.id"
        >
          <td>
            <input
              type="checkbox"
              :value="student.id"
              @change="checked($event)"
            />
          </td>
          <td>{{ index + 1 }}</td>
          <td v-for="fieldName in getKeyFieldName" :key="fieldName">
            {{ student[fieldName] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      fieldNames: {
        FullName: "Họ và tên",
        StudentCode: "Mã học sinh",
        DateOfBirth: "Ngày sinh",
        Gender: "Giới tính",
        PhoneNumber: "Số điện thoại",
        Email: "Email",
        Address: "Địa chỉ",
        Class: "Lớp"
      },
    };
  },

  computed: {
    /**
     * Lấy danh sách học sinh từ store
     */
    
    ...mapGetters("students", { students: "getStudents"}),
    /**
     * Lấy key từ data: fieldNames
     */
    getKeyFieldName() {
      return Object.keys(this.fieldNames);
  
    }
  },

  methods: {
    updateStudent(studentId) {
      this.$store.dispatch("students/getStudentById", studentId);
      this.$store.dispatch("students/openDialog");
    },

    checked(event){
      this.$store.dispatch("students/setListChecked", event.target.value)
    }
  }
};
</script>

<style lang="scss" scoped>
.table-content {
  table-layout: fixed;
  height: calc(100vh - 61px - 16px - 58px - 50px);
  overflow: auto;
}
thead {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}
tr,
td,
th {
  border-bottom: 1px solid #bbbbbb;
  padding: 10px 16px;
  text-align: left;
}
td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
