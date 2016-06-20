import {WidgetType} from "./WidgetType";
import {Color} from "./Color";



export interface GlobalOptions {
  dot: {
    color: Color;
    radius: number;
  };
  segment: {
    show: boolean;
    color: Color;
    angle: number;
    padding: number;
  };
}


export interface ConfigOption {
  title: string;
  dot: {
    color: {
      global: boolean;
      value: Color;
    };
    radius: {
      global: boolean;
      value: number;
    };
  };
  segment: {
    show: {
      global: boolean;
      value: boolean;
    };
    color: {
      global: boolean;
      value: Color;
    };
    angle: {
      global: boolean;
      value: number;
    };
    padding: {
      global: boolean;
      value: number;
    };
  };
}
