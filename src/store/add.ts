import { reactive } from "vue";

export interface Add {
  showing_modal: boolean;
  default_date: Date | null;
  show(date: Date|null): void;
  hide(): void;
  getShowing(): boolean;
}

export const add = reactive<Add>({
  showing_modal: false,
  default_date: null,
  hide(): void {
    this.showing_modal = false;
  },
  show(date: Date|null): void {
    this.showing_modal = true;
    this.default_date = date;
  },
  getShowing(): boolean{
    return this.showing_modal;
  }
});
