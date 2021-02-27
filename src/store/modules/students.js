import axios from "axios";
import Vue from "vue";
export default {
  namespaced: true,
  state: {
    students: [], // danh sách tất cả students
    isOpeningDialog: false, //trạng thái dialog
    isOverlay: false, //trạng thái overlay
    isEditting: false, //trạng thái sửa
    isDeleting: false, //trạng thái xóa
    listChecked: [], //danh sách id các student đang được checked
    student: { //thông tin 1 học sinh
      FullName: "",
      StudentCode: "",
      DateOfBirth: "",
      Gender: 0,
      PhoneNumber: "",
      Email: "",
      Address: "",
      Class: ""
    },
    studentNull: { //thông tin rỗng của học sinh dùng để gán lại sau khi thực hiện thao tác
      FullName: "",
      StudentCode: "",
      DateOfBirth: "",
      Gender: 0,
      PhoneNumber: "",
      Email: "",
      Address: "",
      Class: ""
    },
    notify: { //thông tin thông báo
      isNotify: false,
      message: "",
      notifyStyle: {
        "background-color": "#019160"
      }
    }
  },

  getters: {
    /**
     * Lấy danh sách học sinh
     * @param {*} state
     */
    getStudents(state) {
      return state.students;
    },

    /**
     *
     */
    getStudent(state) {
      return state.student;
    },

    /**
     * Lấy trạng thái của dialog
     * @param {*} state
     */
    getIsOpeningDialog: state => {
      return state.isOpeningDialog;
    },

    /**
     * Lấy trạng thái của overlay
     * @param {*} state
     */
    getIsOverlay: state => {
      return state.isOverlay;
    },

    /**
     * Lấy trạng thái xem người dùng có đang sửa hay không
     * @param {*} state 
     */
    getIsEditting: state => {
      return state.isEditting;
    },

    /**
     * Lấy trạng thái xem người dùng có đang xóa hay không
     * @param {*} state 
     */
    getIsDeleting: state => {
      return state.isDeleting;
    },

    /**
     * Lấy thông tin từ state notify - thông báo
     * @param {} state 
     */
    getNotify: state => {
      return state.notify
    }
  },

  mutations: {
    /**
     * Mở Dialog
     * @param {*} state
     */
    openDialog(state) {
      state.isOpeningDialog = true;
      //bật overlay
      state.isOverlay = true;
    },

    /**
     * Đóng Dialog
     * @param {*} state
     */
    closeDialog(state) {
      state.isOpeningDialog = false;
      //tắt overlay
      state.isOverlay = false;
      //tắt trạng thái sửa
      state.isEditting = false;
      //gán giá trị mặc định cho student
      state.student = state.studentNull;
    },

    /**
     * set giá trị cho students
     * @param {Object} state
     * @param {Object} students
     * CreatedBy: NTQuy
     * CreatedDate: 25/02/2021
     */
    getStudents(state, students) {
      state.students = students;
    },

    /**
     * Lấy thông tin student bằng id
     * @param {*} state
     * @param {*} student
     */
    getStudentById(state, student) {
      state.student = student;
      //bật trạng thái sửa
      state.isEditting = true;
    },

    /**
     *set giá trị cho student khi người dùng nhập
     * @param {Object} state
     * @param {Object} student
     */
    setStudent(state, student) {
      state.student = student;
    },

    /**
     * Kiểm tra xem student nào đang được check
     * @param {*} state 
     * @param {*} checked 
     */
    setListChecked(state, checked){
      //kiểm tra trong mảng checked
      //nếu mảng có 2 giá trị trùng nhau tức là người dùng bỏ check
      let index = state.listChecked.findIndex(item => item == checked);
      if(index >= 0){
        state.listChecked.splice(index, 1);
      }else{
        state.listChecked.push(checked);
      }
      if(state.listChecked.length > 0){
        state.isDeleting = true
      }else{
        state.isDeleting = false
      }
    },

    /**
     * Thêm 1 student
     * @param {Object} state
     * @param {Object} students
     * CreatedBy: NTQuy
     * CreatedDate: 25/02/2021
     */
    addStudent(state, student) {
      state.students.push(student);
      //thông báo cho vue là sudents đã được cập nhật
      Vue.set(state.students, state.students.length - 1, student);
    },

    /**
     *Xóa 1 phần tử trong state students
     * @param {Object} state
     * CreatedBy: NTQuy
     * CreatedDate: 25/02/2021
     */
    deleteStudent(state, studentId) {
      let index = state.students.findIndex(student => student.id == studentId);
      state.students.splice(index, 1);

    },

    /**
     * Sửa 1 phần tử trong state students
     * @param {Object} state
     * @param {string} studentId
     * @param {Object} student
     * CreatedBy: NTQuy
     * CreatedDate: 22/05/2021
     */
    updateStudent(state, student) {
      let index = state.students.findIndex(item => item.id == student.id);
      state.students[index] = student;
      Vue.set(state.students, index, student);
    }
  },

  actions: {
    /**
     * Mở Dialog
     * 
     */
    openDialog: ({ commit }) => {
      commit("openDialog");
    },

    /**
     * Đóng Dialog
     * 
     */
    closeDialog: ({ commit }) => {
      commit("closeDialog");
    },

    // /**
    //  * 
    //  * @param {*} param0 
    //  * @param {*} listChecked 
    //  */
    // setIsDeleting: ({commit}, listChecked) =>{
    //   commit("setIsDeleting", listChecked)
    // },

    /**
     * kiểm tra xem student nào đang được check
     * @param {*} param0 
     * @param {*} checked 
     */
    setListChecked: ({commit}, checked) =>{
      commit("setListChecked", checked)
    },

    /**
     * gọi API lấy danh sách students
     * @param {*} param0
     * CreatedBy: NTQuy
     * CreatedDate: 25/02/2021
     */
    loadStudents: ({ commit }) => {
      axios
        .get("http://localhost:3000/students")
        .then(res => res.data)
        .then(students => commit("getStudents", students));
    },

    /**
     *  gọi API lấy thông tin 1 student
     * @param {*} param0
     * @param {*} studentId
     */
    getStudentById: ({ commit }, studentId) => {
      axios
        .get("http://localhost:3000/students/" + studentId)
        .then(res => commit("getStudentById", res.data));
    },
    /**
     * gọi API thêm student
     * @param {*} param0
     * @param {Object} student
     * CreatedBy: NTQuy
     * CreatedDate: 25/02/2021
     */
    addStudent: ({ commit, dispatch, state }, student) => {
      axios
        .post("http://localhost:3000/students", student)
        .then(commit("addStudent", student))
        .finally(
          //khi thêm xong thì gọi lại API để lấy danh sách students đã được cập nhật
          dispatch("loadStudents"),
          state.notify.isNotify = true,
          state.notify.message = "Thêm thành công",
          setTimeout(() => {
            state.notify.isNotify = false;
          }, 1500)
        )

    },

    /**
     * gọi API xóa học sinh
     * @param {*} param0 
     */
    deleteStudent: ({commit, state} ) =>{
      state.listChecked.forEach(studentId => {
        axios.delete("http://localhost:3000/students/"+ studentId)
        .then(commit("deleteStudent", studentId) )
        .finally(
          //xóa xong thì gán lại giá trị cho mảng checked
          state.listChecked = [],
          state.isDeleting = false,
          state.notify.isNotify = true,
          state.notify.message = "Xóa thành công",
          setTimeout(() => {
            state.notify.isNotify = false;
          }, 1500)
        )
      })
    },
    /**
     * gọi API sửa student
     * @param {*} param0
     * @param {*} student
     * CreatedBy: NTQuy
     * CreatedDate: 25/02/2021
     */
    updateStudent: ({ commit, state }, student) => {
      axios
        .put("http://localhost:3000/students/" + student.id, student)
        .then(commit("updateStudent", student))
        .finally(
          state.notify.isNotify = true,
          state.notify.message = "Sửa thành công",
          setTimeout(() => {
            state.notify.isNotify  = false;
          }, 1500)
        );
    }
  }
};
