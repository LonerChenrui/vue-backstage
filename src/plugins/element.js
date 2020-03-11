import Vue from 'vue'
import {
  Button,
  Row,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  RadioButton,
  RadioGroup
  
} from 'element-ui'

Vue.use(Button)
Vue.use(Row)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(RadioButton)
Vue.use(RadioGroup)




// element中的Message需要全局配置才可使用
Vue.prototype.$message = Message
