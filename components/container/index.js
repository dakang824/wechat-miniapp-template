import { Comp, app } from "../component";

Comp({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    isGray: {
      type: Boolean,
      value: false,
    },
    isGap: {
      type: Boolean,
      value: false,
    },
  },
  needLogin: ["needLoginComp"],
  needToLogin: ["needToLoginComp"],
  data: {},
  lifetimes: {
    attached: () => {},
    moved: () => {},
    detached: () => {},
  },
  methods: {
    needLoginComp() {
      console.log("登陆后我才执行-我是组件里面的");
    },
    needToLoginComp() {
      console.log("我可是会让你去登录的-我是组件里面的");
    },
  },
});
