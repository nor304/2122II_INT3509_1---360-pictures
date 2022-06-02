<template>
  <div>
    <div
      id="dlgCustomerDetail"
      class="dialog"
      :class="{ 'dialog-hide': isHide }"
    >
      <div class="model"></div>
      <div class="dialog-content">
        <div class="dialog-header">
          <div class="dialog-title">THÔNG TIN KHÁCH HÀNG</div>
          <div class="dialog-close-button" @click="btnCloseOnClick()">
            &#x2715;
          </div>
        </div>
        <div class="dialog-body">
          <div class="m-row">
            <div class="m-col">
              <label>Mã khách hàng</label>
              <input
                id="txtCustomerCode"
                type="text"
                v-bind:value="customer.CustomerCode"
              />
            </div>
            <div class="m-col">
              <label>Họ và tên</label>
              <input
                id="txtFullName"
                type="text"
                v-bind:value="customer.FullName"
              />
            </div>
          </div>
          <div class="m-row">
            <div class="m-col">
              <label>Nhóm khách hàng</label>
              <select id="cbCustomerGroup">
                <option value="0cb5da7c-59cd-4953-b17e-c9adc9161663">
                  Nhóm khách hàng MISA
                </option>
                <option value="19165ed7-212e-21c4-0428-030d4265475f">
                  Khách VIP
                </option>
                <option value="3631011e-4559-4ad8-b0ad-cb989f2177da">
                  Khách vãng lai
                </option>
                <option value="7a0b757e-41eb-4df6-c6f8-494a84b910f4">
                  Khách thường
                </option>
              </select>
            </div>
          </div>
          <div class="m-row">
            <div class="m-col">
              <label>Giới tính</label>
              <select id="cbGender">
                <option value="1">Nam</option>
                <option value="0">Nữ</option>
                <option value="2">Không xác định</option>
              </select>
            </div>
            <div class="m-col">
              <label>Ngày sinh</label>
              <input id="dtDateOfBirth" type="date" />
            </div>
          </div>
          <div class="m-row">
            <div class="m-col">
              <label>Số điện thoại</label>
              <input id="txtPhoneNumber" type="text" />
            </div>
            <div class="m-col">
              <label>Email</label>
              <input id="txtEmail" type="text" />
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <button id="btnSave" class="btn-default" @click="btnSaveOnClick()">
            Lưu
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    isHide: { type: Boolean, default: true },
    customerId: { type: String, default: null },
    formMode: { type: Number, default: null },
  },
  created() {},
  watch: {
    customerId: function () {
      // Lấy dữ liệu từ Api:
      axios
        .get("http://api.manhnv.net/api/customers/" + this.customerId)
        .then((response) => {
          this.customer = response.data;
        })
        .catch((res) => {
          alert(res.status);
        });
    },
  },
  methods: {
    btnCloseOnClick() {
      this.$emit("btnAddOnClick", true);
    },
    /**
     * Thực hiện cất dữ liệu
     * CreatedBy: NVMANH (29/03/2021)
     * ModifiedBy: NVThang - sửa lại cơ chế cất dữ liệu (30/03/2021)
     * ModifiedBy: NVThang - sửa lại cơ chế cất dữ liệu (30/03/2021)
     */
    btnSaveOnClick() {
      // Lấy id của khách hàng:
      //var customerID = this.customerID;
      // Kiểm tra trạng thái của form (là thêm mới hay là sửa):
      // Gọi service thực hiện cất dữ liệu:
      if (this.formMode == "add") {
        axios.post("", this.customer);
      } else {
        axios.post("", this.customer);
      }

      // Kiểm tra kết quả của việc cất dữ liệu"
    },
  },
  data() {
    return {
      customer: { CustomerCode: "KH0001", FullName: "Nguyễn Văn Mạnh" },
    };
  },
};
</script>
<style scoped>
</style>
