import Vue from 'vue'
import { 
  Button,
  Row,
  Form,
  FormItem,
  Input,
  Message
} from 'element-ui'

Vue.use(Button)
Vue.use(Row)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// element中的Message需要全局配置才可使用
Vue.prototype.$message = Message
