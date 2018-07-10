<template>
    <div class="sc-list">
      <ul>
        <li class="li-hr" v-for="item in listData" :key="item.label"
            v-show="displayHandler(item.index, item.typeIndex)">
          <label :class="labelStyle" v-if="!item.address">
            {{item.label}}
          </label>
          <div class="mulite-line" v-else>
            <div class="no-address" v-if="item.address.length === 0" @click.prevent.stop="goToAddAddress">
              <i class="icon-add-outline"></i><span>{{item.label}}</span>
            </div>
            <div class="sign-address" v-else @click.prevent.stop="goToAddAddress">
              <h3>{{item.address[0].address}}</h3>
              <p><strong>{{item.address[0].name}}</strong><span>{{item.address[0].phone}}</span></p>
            </div>
          </div>
          <i class="icon-chevron-right" v-show="item.address && item.address.length"></i>
          <input v-if="item.placeholder" :type="item.type" :maxlength="item.length" :placeholder="item.placeholder" v-model="item.attr">
          <span v-if="item.text && (item.text.price !== undefined)"><span class="price">{{item.text.price}}</span> {{item.text.unit}}</span>
          <span v-if="item.text && (item.text.price === undefined)">{{item.text}}</span>
          <span v-if="item.toggle" :class="`switch ${setSwitch(item.toggle)}`" @click.prevent.stop="toggleSwitch(item.toggle)"><i></i></span>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
  import Jsbridge from '../../utils/jsbridge';
  import { getUserAddress } from '../../mock/mock';
    export default {
        name: 'panel-list',
        data () {
          return {
          }
        },
        props: {
          listData: {
            type: Array,
            default: () => []
          },
          listType: {
            type: String,
            default: 'form'
          },
          checkIndex: {
            type: Number,
            default: 0
          },
          checkIndex1: {
            type: Number,
            default: 0
          },
          accountId: {
            type: String,
            default: ''
          },
          address: {
            type: Object,
            default: () => {}
          }
        },
        computed: {
          labelStyle () {
            return this.listType === 'text' ? 'weak-label' : '';
          }
        },
        created () {
          this.jsbridge = new Jsbridge();
        },
        methods: {
          displayHandler (index, typeIndex) {
            if (typeIndex) {
              return this.checkIndex === typeIndex && this.checkIndex1 === index;
            } else {
              return this.checkIndex1 === index || (index === undefined);
            }
          },
          setSwitch (toggle) {
            return toggle > 0 ? 'switch-on' : 'switch-off';
          },
          toggleSwitch (toggle) {
            this.$emit('toggleSwitch', toggle * -1);
          },
          goToAddAddress () {
            // this.fetchUserAddress('578140a0-3917-464d-8e4f-e8e792d25229');
            this.jsbridge.call('goToSelectAddress', {
              accountId: this.accountId
            }, (addressId) => {
              this.fetchUserAddress(addressId);
            })
          },
          async fetchUserAddress (id) {
            try {
              let resData = await getUserAddress({
                addressId: id
              });
              const addressObj = resData.data.data;

              this.$emit('changeAddress', {
                address: `${addressObj.city}${addressObj.area}${addressObj.address}`,
                name: addressObj.name,
                phone: addressObj.phone
              });
            } catch (e) {
              console.log(e);
            }
          }
        }
    }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import '../../assets/css/mixin.styl';
  .sc-list
    background-color #fff
    font-size rpx(28)
    .li-hr
      padding 0 rpx(30)
      border-bottom rpx(1) solid #edecec
      display flex
      justify-content space-between
      align-items center
      height rpx(120)
      & i
        color #ccc
      .mulite-line
        .no-address
          color #f97624
          & i
            position relative
            top rpx(2)
            margin-right rpx(28)
            color #f97624
        .sign-address
          color #000000
          & h3
            width rpx(600)
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
            padding 0
            font-weight 700
            line-height rpx(60)
          & p
            font-size rpx(26)
            color #ccc
            & span
              margin-left rpx(64)
              color #999
      .weak-label
        color #999
      & input
        font-size rpx(26)
        padding rpx(20) 0
        text-align right
        width rpx(400)
      .price
        color #f97624
      .switch
        display block
        width rpx(90)
        height rpx(40)
        border-radius rpx(40)
        padding rpx(4)
        box-sizing border-box
        & i
          display block
          width rpx(32)
          height rpx(32)
          background-color #fff
          border-radius rpx(32)
          transition all 200ms ease
        &.switch-off
          background-color #ddd
          & i
            transform translate3d(0, 0, 0)
        &.switch-on
          background-color #ff8a4e
          & i
            transform translate3d(rpx(50), 0, 0)

  ::-webkit-input-placeholder
    color #ccc
    font-size rpx(24)
</style>
