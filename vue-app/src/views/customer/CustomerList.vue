<template>
  <div>
    <div class="page-title">
      <div class="page-left">Danh sách khách hàng</div>
      <div class="page-right">
        <button id="btnAdd" class="btn-default" @click="btnAddOnClick()">
          Thêm khách hàng
        </button>
      </div>
    </div>
    <div class="toolbar">
      <input
        type="text"
        class="input-search"
        style="width: 320px"
        placeholder="Tìm kiếm theo mã, tên khách hàng"
      />
      <button class="btn-refresh"></button>
      <button class="btn-delete"></button>
    </div>
    <div class="grid">
      <table id="tblListCustomer" class="table" width="100%" border="0">
        <thead>
          <tr>
            <th>Mã khách hàng</th>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Nhóm khách hàng</th>
            <th>Điện thoại</th>
            <th>Email</th>
            <th class="text-align-right">Số tiền nợ</th>
            <th class="text-align-center">Đang hoạt động</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="customer in customers"
            :key="customer.CustomerId"
            @dblclick="rowOnDblClick(customer.CustomerId)"
          >
            <td>{{ customer.CustomerCode }}</td>
            <td>{{ customer.FullName }}</td>
            <td>{{ customer.GenderName }}</td>
            <td>{{ customer.DateOfBirth }}</td>
            <td>{{ customer.CustomerGroupName }}</td>
            <td>{{ customer.PhoneNumber }}</td>
            <td>{{ customer.Email }}</td>
            <td class="text-align-right">{{ customer.DebitAmount }}</td>
            <td class="text-align-center"><input type="checkbox" checked /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="paging">
      <div data-v-a72348a4="" class="paging-bar">
        <div data-v-a72348a4="" class="paging-record-info">
          Hiển thị <b data-v-a72348a4="">1-10/1000</b> nhân viên
        </div>
        <div data-v-a72348a4="" class="paging-option">
          <div data-v-a72348a4="" class="btn-select-page m-btn-firstpage"></div>
          <div data-v-a72348a4="" class="btn-select-page m-btn-prev-page"></div>
          <div data-v-a72348a4="" class="m-btn-list-page">
            <button
              data-v-a72348a4=""
              class="btn-pagenumber btn-pagenumber-selected"
            >
              1</button
            ><button data-v-a72348a4="" class="btn-pagenumber">2</button
            ><button data-v-a72348a4="" class="btn-pagenumber">3</button
            ><button data-v-a72348a4="" class="btn-pagenumber">4</button>
          </div>
          <div data-v-a72348a4="" class="btn-select-page m-btn-next-page"></div>
          <div data-v-a72348a4="" class="btn-select-page m-btn-lastpage"></div>
        </div>
        <div data-v-a72348a4="" class="paging-record-option">
          <b data-v-a72348a4="">10</b> nhân viên/trang
        </div>
      </div>
    </div>
      <CustomerDetail
        :isHide="isHideDialogDetail"
        :customerId="customerId"
        :formMode="DetailFormMode"
        @btnAddOnClick="btnAddOnClick"
      />
    </div>
</template>
<script>
import axios from "axios";
import CustomerDetail from "./CustomerDetail.vue";
export default {
  components: {
    CustomerDetail,
  },
  created() {
    axios.get("http://api.manhnv.net/api/customers").then((response) => {
      console.log(response);
      this.customers = response.data;
    });
  },
  methods: {
    btnAddOnClick(isShowDialog) {
      if (isShowDialog == true) {
        this.isHideDialogDetail = true;
      } else {
        this.isHideDialogDetail = false;
      }
    },
    /**
     * Th
     */
    rowOnDblClick(customerId) {
      this.customerId = customerId;
      this.isHideDialogDetail = false;
      this.detailFormMode = 'update';
    },
  },
  data() {
    return {
      isHideDialogDetail: true,
      customerId: null,
      detailFormMode: null,
      customers: [
        {
          CustomerId: 1,
          FullName: "Nguyễn Văn Mạnh",
        },
        {
          CustomerId: 2,
          FullName: "Nguyễn Văn Mạnh",
        },
        {
          CustomerId: 3,
          FullName: "Nguyễn Văn Mạnh",
        },
        {
          CustomerId: 4,
          FullName: "Nguyễn Văn Mạnh",
        },
      ],
    };
  },
};
</script>

<style scoped>
.page-title {
  height: 40px;
  display: flex;
  align-items: center;
}

.page-title .page-right {
  position: absolute;
  right: 24px;
}

.page-title .page-left {
  font-size: 24px;
  font-weight: bold;
}

.toolbar {
  margin-top: 16px;
  display: flex;
  width: 100%;
  align-items: center;
  height: 42px;
  /* background-color: #ff0000; */
}

.grid {
  position: absolute;
  right: 24px;
  left: 24px;
  bottom: 60px;
  top: 128px;
  overflow-y: auto;
}

.paging {
  position: absolute;
  bottom: 0;
  height: 60px;
  left: 24px;
  right: 24px;
}

.m-col {
  width: 50%;
  float: left;
  padding: 0 4px;
  box-sizing: border-box;
}

.m-row {
  width: 100%;
  display: flex;
  margin-top: 8px;
  position: relative;
}

.m-row label {
  display: block;
}

.m-row input,
select {
  margin-top: 4px;
}
</style>