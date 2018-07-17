<template>
    <div class="sc-container">
      <scrollList ref="rankList" :loadMore="false" :bounce="false">
        <div slot="defaultScroll">
          <header class="header-tip" v-if="billMaterial > 1" @click.prevent.stop="goToInvoicePanel">
            <div class="tip-text">
              <h3>{{title}}</h3>
              <p>{{tipText}}</p>
            </div>
            <i class="icon-chevron-thin-right"></i>
          </header>
          <header class="header-tip" v-else @click.prevent.stop="goToProgressPanel">
            <div class="tip-text tip-center">
              <h3 v-if="billStatus !== void 0">{{showBillStatus}}</h3>
            </div>
          </header>
          <panel v-for="(item, index) in titleArr" :key="`${item}-${index}`" :title="item">
            <div slot="panel-slot" class="panel-content">
              <list :listData="listArr[index].data" :listType="listType"></list>
            </div>
          </panel>
          <div class="jump-tip" @click.prevent.stop="goToInvoiceList">一次发票含{{orderCount}}次充电<i class="icon-chevron-right"></i></div>
        </div>
      </scrollList>
    </div>
</template>

<script type="text/ecmascript-6">
  import panel from '../components/display/panel';
  import list from '../components/display/list';
  import Jsbrige from '../utils/jsbridge';
  import {getBillInfo} from '../mock/mock';
  import scrollList from '../components/scroll/list';
  import functionalTool from '../utils/functionTools';
  import { DEV } from '../utils/dispatchEnv';
    export default {
        name: 'invoiceInfo',
        data () {
          return {
            title: '电子发票已开票',
            billStatus: undefined,
            billMaterial: null,
            orderCount: 0,
            tipText: '(电子发票查阅有效期为六个月，请及时存储。)',
            titleArr: ['订单信息', '发票信息'],
            listType: 'text',
            listArr: [
              {
                data: [
                  {
                    label: '订单号',
                    text: ''
                  },
                  {
                    label: '申请时间',
                    text: ''
                  }
                ]
              },
              {
                data: [
                  {
                    label: '发票类型',
                    key: 'drawerType',
                    text: null
                  },
                  {
                    label: '发票抬头',
                    key: 'title',
                    text: null
                  },
                  {
                    label: '发票内容',
                    key: 'content',
                    text: null
                  },
                  {
                    label: '开票金额',
                    key: 'money',
                    text: null
                  },
                  {
                    label: '开票人姓名',
                    key: 'name',
                    text: null
                  },
                  {
                    label: '开票人联系电话',
                    key: 'phone',
                    text: null
                  },
                  {
                    label: '开票人地址',
                    key: 'address',
                    text: null
                  },
                  {
                    label: '开户行',
                    key: 'compBankName',
                    text: null
                  },
                  {
                    label: '开户行账号',
                    key: 'compAccount',
                    text: null
                  },
                  {
                    label: '增值税发票-税号',
                    key: 'billTariff',
                    text: null
                  },
                  {
                    label: '增值税发票-发票地址',
                    key: 'billAddress',
                    text: null
                  },
                  {
                    label: '增值税发票-联系方式',
                    key: 'billPhone',
                    text: null
                  },
                  {
                    label: '更多信息',
                    key: 'remark',
                    text: null
                  },
                  {
                    label: '快递支付人',
                    key: 'expressPayer',
                    text: null
                  },
                  {
                    label: '快递金额',
                    key: 'expressMoney',
                    text: null
                  },
                  {
                    label: '运费支付方式',
                    key: 'payType',
                    text: null
                  },
                  {
                    label: '快递名称',
                    key: 'expressName',
                    text: null
                  }
                ]
              }
            ],
            listInfo: []
          }
        },
      computed: {
        showBillStatus () {
          if (this.billStatus === 0) {
            return '开票中';
          } else if (this.billStatus === 1) {
            return '已开票';
          } else if (this.billStatus === 2) {
            return '已寄出';
          }
        }
      },
      created () {
        this.jsbridge = new Jsbrige();
      },
      mounted () {
        const billId = functionalTool.getUrlParam('billId');
        this.billId = billId;
        this.initialData(billId).then(() => {
          this.$nextTick(() => {
            this.$refs.rankList && this.$refs.rankList._initComponent();
          });
        });
      },
      methods: {
        async initialData (id) {
          try {
            let resData = await getBillInfo({
              billId: id
            });
            if (resData.data.code === '200') {
              const infoData = resData.data.data;
              this.listArr[0].data[0].text = infoData.billNo;
              this.listArr[0].data[1].text = infoData.applyTime;
              this.billMaterial = infoData.billMaterial;
              this.billStatus = infoData.status;
              this.orderCount = infoData.orderCount;
              this.eInvoiceMiniUrl = infoData.eInvoiceMiniUrl;
              this.eInvoiceUrl = infoData.eInvoiceUrl;
              // 构建页面数据渲染数组
              this.listArr[1].data.forEach((item, index) => {
                item.text = infoData[item.key];
                item.key === 'drawerType' && (item.text = item.text === '1' ? '个人发票' : '企业发票');
                item.key === 'expressPayer' && (item.text = item.text === 0 ? '购票方' : '出票方');
                item.key === 'billType' && (item.text = item.text === '1' ? '普通发票' : '增值税发票');
                (item.text !== null && item.text !== 'null' && item.text.length > 0) && this.listInfo.push(item);
              });
              this.listArr[1].data = this.listInfo;
            }
          } catch (e) {
            console.log(e);
          }
        },
        goToInvoicePanel () {
          this.jsbridge.call('goToInvoicePreview', {
            billId: this.billId,
            eInvoiceMiniUrl: this.eInvoiceMiniUrl,
            eInvoiceUrl: this.eInvoiceUrl
          });
        },
        goToProgressPanel () {
          const hostUrl = DEV ? 'http://10.9.35.50:8005' : window.location.host;
          const jumpUrl = `mobile4/appInvoice/invoiceProgress.htm?billId=${this.billId}`;
          this.jsbridge.call('frameShowDeepPage', {
            url: jumpUrl,
            title: '开票进度'
          });
        },
        goToInvoiceList () {
          const hostUrl = DEV ? 'http://10.9.35.50:8005' : window.location.host;
          const jumpUrl = `mobile4/appInvoice/invoiceOrderList.htm?billId=${this.billId}`;
          this.jsbridge.call('frameShowDeepPage', {
            url: jumpUrl,
            title: '发票订单详情'
          });
        }
      },
      components: {
        panel,
        list,
        scrollList
      }
    }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../assets/css/mixin.styl';
  .header-tip
    background-color #fedfc2
    font-size $fontsize-medium
    color #f97624
    padding rpx(16) rpx(30)
    line-height rpx(48)
    position relative
    & h3
      font-weight bold
      & p
        font-size $fontsize-xm
    & i
      position absolute
      right rpx(20)
      top 50%
      margin-top rpx(-10)
    .tip-center
      text-align center
  .jump-tip
    font-size $fontsize-medium
    padding rpx(28) rpx(10) rpx(80) rpx(32)
    color #999
    position relative
    & i
      position absolute
      right rpx(32)
</style>
