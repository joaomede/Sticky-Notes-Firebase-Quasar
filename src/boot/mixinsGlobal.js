import mixinsComputed from '../mixins/mixinsComputed'
import crud from '../mixins/crud'

export default async ({ Vue }) => {
  Vue.mixin(mixinsComputed)
  Vue.mixin(crud)
}
