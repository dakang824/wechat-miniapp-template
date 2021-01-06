import { Comp, app } from "../component";

Comp({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    model: {
      type: Array,
      value: [],
    },
  },
  data: {},
  methods: {},
});
