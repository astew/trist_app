
import DefaultIcon from "../defaultIcon.svg";
import todo_icon from "../pages/icons/todo_icon.png";
import smarthome_icon from "../pages/icons/smart_home_icon.png";
import clipboard_icon from "../pages/icons/clipboard_icon.png";

const modules = [
  {
    name: "To-Do",
    route: "/todo",
    icon: todo_icon,
  },
  {
    name: "Smart Home",
    route: "/smarthome",
    icon: smarthome_icon,
  },
  {
    name: "Clipboard",
    route: "/clipboard",
    icon: clipboard_icon,
  },
]

class TristramModules {
  constructor() {
    this.modules = modules;
    this.defaultIcon = DefaultIcon;

    this.route_map = {};
    this.modules.forEach((module) => {
      this.route_map[module.route] = module;
    });
  }

  getModules() {
    return this.modules;
  }

  getDefaultIcon() {
    return this.defaultIcon;
  }

  getNameFromRoute(route) {
    // if the route is not in our map, return empty string
    if(!(route in this.route_map)) return "";
    return this.route_map[route].name;
  }

};

const tristram_modules = new TristramModules();

export default tristram_modules;