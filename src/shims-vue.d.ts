declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue2-google-maps' {
  import { PluginFunction } from 'vue'
  export const install: PluginFunction<any>
  export function gmapApi(): any
}
