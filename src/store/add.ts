import { reactive } from "vue";

export interface Add {
  showing_modal: boolean;
  show(): void;
  hide(): void;
}

export const add = reactive<Add>({
  showing_modal: false,
  hide(): void {
    this.showing_modal = false;
  },
  show(): void {
    this.showing_modal = true;
  },
});
