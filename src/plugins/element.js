import Vue from 'vue'
import {
  Button,
  ColorPicker,
  Container,
  DatePicker,
  Dialog,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Header,
  Input,
  Loading,
  Main,
  Menu,
  MenuItem,
  Message,
  Option,
  Pagination,
  Radio,
  RadioGroup,
  Select,
  Submenu,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  Upload
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Divider)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(ColorPicker)

Vue.prototype.$msg = Message
Vue.prototype.$loading = Loading
