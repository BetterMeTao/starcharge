<template>
    <div class="sc-container">
      <scrollList ref="rankList" :loadMore="false" :bounce="false">
        <div slot="defaultScroll" v-if="checkGpArr.length">
          <!-- panel组 -->
          <panel :title="titleArr[0]">
            <div slot="panel-slot" class="panel-content">
              <!-- nav組件 -->
              <checknav
                :checkGp="checkGpArr[0].item"
                :checkIndex="checkGpArr[0].index"
                :checkType="checkType[0]"
                @toggleChecked="toggleChecked(0, $event)">
              </checknav>
              <div class="panel-tip">
                <p>电子发票与纸质发票具有同等法律效力，可支持报销入账，</p>
                <p class="panel-tip-force">推荐使用电子发票。</p>
              </div>
            </div>
          </panel>
          <panel :title="titleArr[0]">
            <div slot="panel-slot" class="panel-content" v-if="checkGpArr.length">
              <checknav :checkGp="checkGpArr[1].item"
                        :checkIndex="checkGpArr[1].index"
                        :checkType="checkType[1]"
                        @toggleChecked="toggleChecked(1, $event)"
              ></checknav>
            </div>
          </panel>
          <panel :title="titleArr[1]">
            <div slot="panel-slot" class="panel-content">
              <list :listData="listDataArr" :checkIndex="checkGpArr[0].index" :checkIndex1="checkGpArr[1].index" @toggleSwitch="switchHandle"></list>
            </div>
          </panel>
          <panel :title="titleArr[2]" v-show="checkGpArr[0].index">
            <div slot="panel-slot" class="panel-content">
              <list :listData="receiveDataArr" :checkIndex="checkGpArr[1].index" :accountId="accountId"
              @changeAddress="changeAddress"></list>
            </div>
          </panel>
          <panel :title="isFreightFree() ? titleArr[3] : `开票金额满${applyState.limitAmount}元，由星星充电提供运费`" v-show="checkGpArr[0].index">
            <div slot="panel-slot" class="panel-content"  v-if="isFreightFree()">
              <navlist
                :checkGp="checkGpArr[2].item"
                :checkIndex="checkGpArr[2].index"
                :disabledIndex="checkGpArr[2].disabledIndex"
                @toggleChecked="toggleChecked(2, $event)"
              ></navlist>
            </div>
          </panel>
          <div class="sc-btn-gp">
            <button class="sc-sub-btn" type="button" @click.prevent.stop="subInvoice()">提交</button>
          </div>
        </div>
      </scrollList>
      <toast :open="toastVisible" :delay="true" :commitFlag="toastFlag" @close="closeToast">
        <div slot="tipmes">{{toastMes}}</div>
      </toast>
    </div>
</template>

<script type="text/ecmascript-6">
  /*
  *  申请发票
  *  @params{titleArr} Array 表单标题组
  *  @params{checkTyle} Array check类型组
  *  @params{checkGpArr} Array 定义选择组件条目状态
  *  @params{listDataArr} Array 定义表单状态组
  *  @params{receiveDataArr} Array 定义收货地址数据组
  *  @params{toggleState} Number 定义switch按钮初始状态
  *  @params{applayState} Object 定义请求界面初始数据
  *  @params{disabledIndex} Number 定义选项是否禁用
  * */
  import panel from '../components/display/panel';
  import checknav from '../components/display/nav';
  import navlist from '../components/display/navlist';
  import list from '../components/display/list';
  import scrollList from '../components/scroll/list'
  import toast from '../components/feedback/toast';
  import {getInvoiceInfo, subInvoiceOrder, confirmApplyInvoice} from '../mock/mock';
  import functionalTool from '../utils/functionTools';
  import Jsbridge from '../utils/jsbridge';
  import qs from 'qs';
  export default {
    name: 'applyInvoice',
    data () {
      return {
        accountId: '',
        orderIds: '',
        titleArr: ['请选择发票类型', '发票详情', '收货信息', ''],
        checkType: ['button', 'radio'],
        checkGpArr: [],
        billIndex: 0,
        listDataArr: [],
        receiveDataArr: [],
        toggleState: -1,
        applyState: {},
        jsbridge: new Jsbridge(),
        toastVisible: !1,
        toastMes: '',
        toastFlag: !0
      }
    },
    mounted () {
      this.initialData();
      this.subObj = {};
    },
    methods: {
      // 设置初始表单
      initialData () {
        this.accountId = functionalTool.getUrlParam('accountId');
        this.orderIds = functionalTool.getUrlParam('orderIds');
        this.fetchInvoiceInfo().then(() => {
          this.checkGpArr = [
            {
              item: ['电子发票', '纸质发票'],
              index: 1
            },
            {
              item: ['企业发票', '个人发票'],
              index: 0
            },
            {
              item: [
                {
                  title: '账户余额',
                  content: `余额 ${this.applyState.userAmount || 0} 元`,
                  visible: !0
                },
                {
                  title: `${this.applyState.deductPoint || 0}积分抵运费`,
                  content: `可用${this.applyState.userIntegral || 0}积分`,
                  visible: !0
                },
                {
                  icon: 'alipay',
                  title: '支付宝支付',
                  visible: !1
                },
                {
                  icon: 'wechat',
                  title: '微信支付',
                  visible: !1
                },
                {
                  title: '货到付款',
                  visible: !0
                }
              ],
              index: this.checkPayMethods(),
              disabledIndex: this.disabledIndex
            }
          ];
          this.baseListArr = [
            {
              label: '公司抬头',
              type: 'text',
              placeholder: '请填写公司抬头',
              length: 90,
              attr: null
            },
            {
              index: 0,
              label: '纳税识别号',
              type: 'text',
              placeholder: '请填写公司纳税识别号',
              length: 18,
              attr: null
            },
            {
              label: '发票内容',
              type: 'text',
              placeholder: '请填写发票内容',
              length: 18,
              attr: '充电服务费'
            },
            {
              label: '发票金额',
              text: {
                price: this.applyState.totalAmount || 0,
                unit: '元'
              },
              attr: this.applyState.totalAmount || 0
            },
            {
              label: '更多信息',
              type: 'text',
              placeholder: '填写购买方、备注、收款人等',
              length: 200,
              attr: null
            },
            {
              index: 0,
              typeIndex: 1,
              label: '开具增值税专用发票',
              toggle: this.toggleState,
              attr: null
            }
          ];
          this.receiveDataArr = [
            {
              label: '请添加收货地址',
              address: []
            }
          ];
          this.titleArr[3] = `运费${this.applyState.expAmount}元，货到付款10元`;
          this.setAddedValueTax();
          this.isHasAddress();
          this.initialScrollList();
        });
      },
      async fetchInvoiceInfo () {
        try {
          let resData = await getInvoiceInfo({
            accountId: this.accountId,
            orderIds: this.orderIds
          });
          resData.data.code === '200' && resData.data.data &&
          (this.applyState = resData.data.data);
        } catch (e) {
          console.log(e);
        }
      },
      // 判断是否需要开具增值税发票
      setAddedValueTax () {
        this.baseListArr[this.baseListArr.length - 1].toggle = this.toggleState;
        this.avtArr = (this.toggleState > 0 && this.checkGpArr[1].index === 0 && this.checkGpArr[0].index === 1) ? [
          {
            label: '公司经营地址',
            type: 'text',
            placeholder: '填写公司经营地址',
            length: 200,
            attr: null
          },
          {
            label: '开户支行名称',
            type: 'text',
            placeholder: '填写开户支行名称',
            length: 50,
            attr: null
          },
          {
            label: '开户银行账号',
            type: 'tel',
            placeholder: '填写公司开户银行账号',
            length: 25,
            attr: null
          },
          {
            label: '开户电话',
            type: 'tel',
            placeholder: '填写公司开户账号联系电话',
            attr: null
          }
        ] : [];
        this.listDataArr = this.baseListArr.concat(this.avtArr);
      },
      toggleChecked (index, e) {
       this.checkGpArr[index].index = e;
       if (index === 1) {
         this.$set(this.baseListArr[0], 'label', e > 0 ? '个人抬头' : '公司抬头');
         this.baseListArr[0].placeholder = e > 0 ? '请填写个人姓名' : '请填写公司抬头';
       }
        index === 2 || this.setAddedValueTax();
      },
      switchHandle (t) {
        this.toggleState = t;
        this.setAddedValueTax();
      },
      // 初始化滚动组件
      initialScrollList () {
        this.$nextTick(() => {
          this.$refs.rankList && this.$refs.rankList._initComponent();
        });
      },
      checkPayMethods () {
        if (this.applyState.userAmount >= this.applyState.expAmount) {
          this.disabledIndex = this.applyState.userIntegral < this.applyState.deductPoint ? 1 : null;
          return 0;
        } else if (this.applyState.userIntegral >= this.applyState.deductPoint) {
          return 1;
        } else {
          return 4;
        }
      },
      isFreightFree () {
        return this.applyState.totalAmount < this.applyState.limitAmount;
      },
      subInvoice () {
        this.generateParams();
      },
      isHasAddress () {
        if (this.applyState.addressId) {
          this.receiveDataArr[0].address = [];
          this.receiveDataArr[0].address.push({
            name: this.applyState.name,
            address: this.applyState.address,
            phone: this.applyState.phone.toString()
          });
        }
      },
      changeAddress (e) {
        this.receiveDataArr[0].address = [];
        setTimeout(() => {
          this.receiveDataArr[0].address = [e];
        }, 1);
      },
      checkNeedInputPw (payType, formData) {
        (payType === 1 || payType === 2) && this.applyState.hasPayPassword
          ? this.jsbridge.call('showPasswordDialogForPayPwd', {
          accountId: this.accountId
          }, (newPw) => {
            formData['payPassword'] = newPw;
            this.submitInvoice(formData);
          }) : this.submitInvoice(formData);
      },
      combineConfirmInfo (formData) {
        const changeLineSymbol = '\n';
        let confirmMsg = '' + changeLineSymbol;
        confirmMsg += '发票材质: ' + ((formData.invoiceMaterial === 1 ? '纸质发票' : '电子发票') + changeLineSymbol);
        confirmMsg += '发票类型: ' + ((formData.drawerType === 1 ? '个人发票' : '企业发票') + changeLineSymbol);
        confirmMsg += '抬头: ' + formData.title + changeLineSymbol;
        if (formData.drawerType === 2 && formData.taxNo) {
          confirmMsg += '纳税识别号: ' + formData.taxNo + changeLineSymbol;
        }
        formData.remark && (confirmMsg += '更多信息: ' + formData.remark + changeLineSymbol);

        // 增值发票信息
        if (formData.billType === 2 && formData.invoiceMaterial === 1) {
          confirmMsg += changeLineSymbol;
          confirmMsg += '公司经营地址: ' + formData.compAddress + changeLineSymbol;
          confirmMsg += '开户支行名称: ' + formData.compBankName + changeLineSymbol;
          confirmMsg += '开户银行账号: ' + formData.compAccount + changeLineSymbol;
          confirmMsg += '开户电话: ' + formData.compPhone + changeLineSymbol;
        }

        // 收货地址信息
        confirmMsg += changeLineSymbol;
        formData.address && (confirmMsg += '收货地址: ' + formData.address + changeLineSymbol);
        confirmMsg += changeLineSymbol;
        return confirmMsg;
      },
      confirmSubmit (payType, formData) {
        this.jsbridge.call('frameShowConfirm', {
          message: this.combineConfirmInfo(formData),
          position: 'left'
        }, (data) => {
          if (data === 1) {
            this.checkNeedInputPw(payType, formData);
          }
        });
      },
      // 构建提交参数
      generateParams () {
        let subParams = {
          userId: this.accountId,
          orderIds: this.orderIds,
          invoiceMaterial: this.checkGpArr[0].index === 0 ? 2 : 1,
          drawerType: this.checkGpArr[1].index === 0 ? 2 : 1
        };
        ['title', 'taxNo', 'content', 'money', 'remark', 'billType'].forEach((key, index) => {
          if (key === 'billType') {
            subParams[key] = this.baseListArr[index].toggle > 0 &&
            (this.checkGpArr[0].index === 1) &&
            (this.checkGpArr[1].index === 0) ? 2 : 1;
          } else {
            if (this.baseListArr[index].attr !== null && this.baseListArr[index].attr.toString().trim().length > 0) {
              subParams[key] = typeof this.baseListArr[index].attr === 'string' ? this.baseListArr[index].attr.trim() : this.baseListArr[index].attr;
            };
          }
        });
        if (this.toggleState > 0 && this.checkGpArr[0].index > 0 && this.checkGpArr[1].index === 0) {
          ['compAddress', 'compBankName', 'compAccount', 'compPhone'].forEach((key, index) => {
            if (this.avtArr[index].attr !== null && this.avtArr[index].attr.toString().trim().length > 0) {
              subParams[key] = typeof this.avtArr[index].attr === 'string' ? this.avtArr[index].attr.trim() : this.avtArr[index].attr;
            };
          });
        }
        // 判断是否选择为纸质发票
        if (this.checkGpArr[0].index > 0) {
          // 判断是否免运费
          if (this.applyState.totalAmount < this.applyState.limitAmount) {
            // 选择支付方式组下标 + 1
            subParams['payType'] = this.checkGpArr[2].index + 1;
          } else {
            // 免运费payType为0
            subParams['payType'] = 0;
          }
          if (this.receiveDataArr[0].address.length) {
            subParams['name'] = this.receiveDataArr[0].address[0].name;
            subParams['address'] = this.receiveDataArr[0].address[0].address;
            subParams['phone'] = this.receiveDataArr[0].address[0].phone;
          }
        }
        if (!subParams.title) {
          this.showToast('请填写抬头', !1);
        } else if (this.toggleState > 0 && this.checkGpArr[0].index > 0 && this.checkGpArr[1].index === 0 &&
          (!subParams.compAddress || !subParams.compBankName || !subParams.compAccount || !subParams.compPhone)) {
          this.showToast('请将增值税发票信息填写完整', !1);
        } else if (!subParams.address && this.checkGpArr[0].index > 0) {
          this.showToast('请选择收货地址！', !1);
        } else {
          console.log(subParams);
          this.confirmSubmit(subParams['payType'], subParams);
        }
      },
      // 提交事务
      async submitInvoice (dataForm) {
        // 处理axios post java后台接受不到参数
        const params = qs.stringify(dataForm);
        try {
          const resData = await subInvoiceOrder(params);
          if (resData.data.code === '200') {
            this.jsbridge.call('showInvoiceSuccessAlert', {
              message: '提交成功\n正在为您办理'
            }, (data) => {
              this.jsbridge.call('goToBillOrderList', {
                accountId: this.accountId
              });
            });
          } else {
            this.showToast(resData.data.text.substr(0, 12), !1);
          }
        } catch (e) {
          console.log(e);
        }
      },
      showToast (mes, toastFlag) {
        this.toastMes = mes;
        this.toastFlag = toastFlag;
        this.toastVisible = !0;
      },
      closeToast (v) {
        this.toastVisible = v;
      }
    },
    components: {
      panel,
      checknav,
      navlist,
      list,
      scrollList,
      toast
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../assets/css/mixin.styl';
  .panel-content
    background-color #fff
    .panel-tip
      padding 0 rpx(30)
      font-size $fontsize-xm
      text-align justify
      line-height rpx(38)
      padding-bottom rpx(10)
      .panel-tip-force
        color #f97624

  .footer-tip
    font-size $fontsize-xm
    color #ccc
    padding rpx(20) rpx(30)
</style>
