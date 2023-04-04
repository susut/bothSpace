// components/modal/modal.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {
    hide: {
      type: Boolean,
      value: true
    },
    showCloseBtn: {
      type: Boolean,
      value: true
    }
  },
  data: {

  },
  methods: {
    hideFn() {
      this.triggerEvent('hide')
    }
  }
})
