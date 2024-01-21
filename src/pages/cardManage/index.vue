<template>
  <view class="content cardManage">
    <nav-aside></nav-aside>
    <view class="topBar"></view>
    <view class="info-main">
      <view class="info-title">
        <text class="title-text">{{ $t("cardManage.index.title") }}</text>
        <uni-icons
          type="close"
          size="40"
          @click="$Router.push('/')"
        ></uni-icons>
      </view>
      <!-- 银行卡列表 -->
      <view :class="bankStatus == 0 ? 'hideCss' : 'bankCardbankCardView '">
        <view class="bank-top">
          <p class="bank-name-p">{{ $t("cardManage.index.bankTitle") }}</p>
        </view>
        <p class="bank-encoding-p">
          {{ $t("cardManage.index.bankName") }}:
          <text class="bank-encoding-t">{{ cardInfo.bankName }}</text>
        </p>
        <p class="bank-encoding-p">
          {{ $t("cardManage.index.bankEncod") }}:
          <text class="bank-encoding-t">{{ cardInfo.backEncoding }}</text>
        </p>
        <p class="bank-num-p">
          {{ $t("cardManage.index.bankNum") }}:
          <text class="bank-num-t"> {{ cardInfo.cardNumber }}</text>
        </p>
        <view class="btn-edit">
          <view class="btn-edit-t" @click="editBank">{{
            $t("cardManage.index.editBtn")
          }}</view>
        </view>
      </view>

      <!-- USDT列表 -->
      <view
        :class="ustdStatus == 0 ? 'hideCss' : 'bankCardbankCardView '"
        v-for="(item, index) in ustdInfo"
        :key="index"
      >
        <view class="bank-top">
          <p class="bank-name-p">{{ $t("cardManage.index.usdtTitle") }}</p>
          <uni-icons
            type="trash-filled"
            size="20"
            @click="delUsdt(item.id)"
          ></uni-icons>
        </view>
        <p class="bank-encoding-p">
          {{ $t("cardManage.index.usdtAddr") }}:
          <text class="bank-encoding-t">{{ item.addr }}</text>
        </p>
        <p class="bank-num-p">
          {{ $t("cardManage.index.usdtProtocol") }}:
          <text class="bank-num-t"> {{ item.protocol }}</text>
        </p>
        <view class="btn-edit">
          <view class="btn-edit-t" @click="editUsdt(item)">{{
            $t("cardManage.index.editBtn")
          }}</view>
        </view>
      </view>
      <!-- 钱包列表 -->
      <view
        :class="walletStatus == 2 ? 'hideCss' : 'bankCardbankCardView '"
        v-for="items in walletInfo"
      >
        <view class="bank-top">
          <p class="bank-name-p">{{ items.type }}</p>
          <!-- <uni-icons
            type="trash-filled"
            size="20"
            @click="delWallet(items.id)"
          ></uni-icons> -->
        </view>
        <p class="bank-encoding-p">
          {{ $t("cardManage.index.usdtAddr") }}:
          <text class="bank-encoding-t">{{ items.address }}</text>
        </p>
        <p class="bank-num-p">
          {{ $t("cardManage.index.walletType") }}:
          <text class="bank-num-t">{{ items.type }}</text>
        </p>
        <view class="btn-edit">
          <view class="btn-edit-t" @click="editWallet(items)">{{
            $t("cardManage.index.editBtn")
          }}</view>
        </view>
      </view>

      <!-- <no-data v-if="noDataStatus == 0"></no-data> -->
      <button class="add-btn" @click="choosePopup">
        {{ $t("cardManage.index.addBankUsdtBtn") }}
      </button>

      <uni-popup ref="chooseBind" type="center">
        <view class="bs-pupop">
          <view class="title">
            <text style="font-weight: 700">card type</text>
            <uni-icons
              type="closeempty"
              size="20"
              @click="closeChoose"
            ></uni-icons>
          </view>
          <view v-for="(item, index) in dtxx" :key="index">
            <button
              :disabled="item.type == 1 && bankStatus != 0 ? true : false"
              :class="
                item.type == 1
                  ? bankStatus == 0
                    ? 'btns btn-qy'
                    : 'btns btn-disabled'
                  : 'btns btn-qy'
              "
              @click="dtxxz(item.type)"
            >
              {{ item.name }}
            </button>
            <!-- <button
              id="disabledBtns"
              :class="bankStatus == 0 ? 'btns btn-qy' : 'btns btn-disabled'"
              :disabled="btnDisable"
              @click="chooseCard"
            >
              Bank card
            </button>
            <button class="btns btn-qy" @click="chooseUsdt">USDT</button> -->
          </view>
        </view>
      </uni-popup>
    </view>
    <bank-card ref="bankRef"></bank-card>
    <update-bank
      ref="updateBankRef"
      :cardInfo="cardInfo"
      v-if="isCard"
    ></update-bank>
    <add-usdt ref="addUsdtRef"></add-usdt>
    <update-usdt :usdtUpInfo="usdtUpInfo" ref="updateUsdt"></update-usdt>
    <add-wallet ref="walletRef" :dtxx="dtxx"></add-wallet>
    <update-wallet
      ref="updateWalletRef"
      :dtxx="dtxx"
      :walletUpdateData="walletUpdateData"
    ></update-wallet>
  </view>
</template>
<script>
import AddUsdt from "./components/addUsdt.vue";
import AddWallet from "./components/addWallet.vue";
import BankCard from "./components/bankCard.vue";
import UpdateBank from "./components/updateBank.vue";
import UpdateUsdt from "./components/updateUsdt.vue";
import UpdateWallet from "./components/updateWallet.vue";
export default {
  name: "cardManage",
  components: {
    BankCard,
    UpdateBank,
    AddUsdt,
    UpdateUsdt,
    AddWallet,
    UpdateWallet,
  },
  props: {},
  data() {
    return {
      isCard: false,
      noDataStatus: 0,
      btnDisable: false,
      bankStatus: 0,
      ustdStatus: 0,
      walletStatus: 2,
      cardInfo: {},
      ustdInfo: [],
      walletInfo: [],
      usdtUpInfo: { id: "", addr: "", payPwd: "", code: "" },
      walletUpdateData: {
        id: "",
        type: "",
        account: "",
        address: "",
        payPwd: "",
        code: " ",
      },
      dtxx: [],
    };
  },
  computed: {},
  methods: {
    dtxxz(type) {
      if (type == 1) {
        this.chooseCard();
      } else if (type == 2) {
        this.chooseUsdt();
      } else {
        this.chooseWallet();
      }
    },

    //-------------

    dialogClose() {
      this.$refs.alertDialog.close();
    },
    //--------------------
    editBank() {
      this.$refs.updateBankRef.openPopup();
    },
    choosePopup() {
      if (this.bankStatus === 1) {
        this.btnDisable = true;
      }
      this.$refs.chooseBind.open();
    },
    closeChoose() {
      this.$refs.chooseBind.close();
    },
    chooseCard() {
      this.$refs.bankRef.openPopup();
    },
    chooseUsdt() {
      this.$refs.addUsdtRef.openPopup();
    },
    chooseWallet() {
      this.$refs.walletRef.openPopup();
    },
    editWallet(data) {
      this.walletUpdateData = data;
      this.$refs.updateWalletRef.openPopup();
    },
    editUsdt(data) {
      this.usdtUpInfo.id = data.id;
      this.usdtUpInfo.addr = data.addr;
      this.$refs.updateUsdt.openPopup();
    },
    delUsdt(id) {
      let that = this;
      uni.showModal({
        title: this.$t("cardManage.index.showModelTitle"),
        content: this.$t("cardManage.index.showModelContent"),
        confirmText: this.$t("cardManage.index.showModelConfirmText"),
        cancelText: this.$t("cardManage.index.showModelCancelText"),
        success: function (res) {
          if (res.confirm) {
            that.$api.delVirtual({ id: id }).then((res) => {
              that.$Router.push("/cardManage");
            });
          } else if (res.cancel) {
          }
        },
      });
    },
    async initData() {
      let a = await this.$api.getCardInfo();
      if (a.data != null) {
        this.isCard = true;
        this.cardInfo = a.data;
        this.noDataStatus = 1;
        this.bankStatus = 1;
      }
      let b = await this.$api.getVirtualList();
      if (b.data.length !== 0) {
        this.ustdInfo = b.data;
        this.ustdStatus = 1;
        this.noDataStatus = 1;
      }
      let c = await this.$api.walletInfo();
      if (c.data.length !== 0) {
        this.walletInfo = c.data;
        this.walletStatus = 1;
        this.noDataStatus = 1;
      }
      let d = await this.$api.withdrawalPre();
      this.dtxx = d.data;
    },
  },
  watch: {},
  onShow() {
    this.initData();
  },
};
</script>
<style scoped lang="scss">
.cardManage {
  .topBar {
    height: 60px;
  }
  .hideCss {
    display: none;
  }
  .bankCardbankCardView {
    margin-top: 20px;
    padding: 10px;
    min-height: 100px !important;
    background: var(--inv-card-bg-1) !important;
    background-size: cover !important;
    border-radius: 8px;
    .bank-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .bank-name-p {
        font-weight: 700;
        background: var(--team-lv-color1) 10%;
        font-size: 20px;
        padding: 10px;
        color: #fff;
      }
    }

    .bank-encoding-p {
      padding: 0 0 10px 10px;
      font-size: 16px;
      color: #006633;
      .bank-encoding-t {
        font-size: 14px;
        padding: 0 0 0 10px;
        color: #663300;
      }
    }
    .bank-num-p {
      padding: 0 0 0 10px;
      color: #006633;
      .bank-num-t {
        font-size: 14px;
        padding: 0 0 0 10px;
        color: #663300;
      }
    }
    .btn-edit {
      display: flex;
      justify-content: flex-end;
      .btn-edit-t {
        text-align: center;
        align-items: center;
        width: 40px;
        height: 18px;
        line-height: 18px;
        border: 1px solid #66cccc;
        padding: 1px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 300;
        color: #66cccc;
      }
      .btn-del {
        text-align: center;
        align-items: center;
        width: 40px;
        height: 18px;
        line-height: 18px;
        border: 1px solid #663300;
        background-color: #663300;
        padding: 1px;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 300;
        color: #fff;
        margin-right: 10px;
      }
    }
  }
  .info-main {
    padding: 14px;
    .info-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      .title-text {
        font-size: 15px;
        font-weight: 700;
      }
      .uni-icons {
        color: var(--close-color) !important;
      }
    }
    .add-btn {
      margin: 50px 0 20px 0;
      color: #fff !important;
      background: var(--gradient-color) !important;
      border-radius: var(--card-radius);
      font-size: 18px;
    }
  }
  .bs-pupop {
    width: 320px !important;
    border-radius: var(--card-radius);
    overflow: hidden;
    background: var(--bs-popup-bg);
    padding-bottom: env(safe-area-inset-bottom);
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      background-color: var(--bs-popup-hd);
      font-size: 16px;
    }
    .btns {
      margin: 15px;
      height: 50px;
      line-height: 50px;
      box-shadow: var(--shadow-bg);

      font-weight: 700;
      font-size: 15px;
      position: relative;
    }
    .btn-disabled {
      background: var(--btn-gray-color) !important;
      color: #999 !important;
    }
    .btn-qy {
      background: var(--btn--info-bg) !important;
      color: #fff !important;
    }
  }
}
</style>
