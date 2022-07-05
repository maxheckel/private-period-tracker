import { reactive } from "vue";

export interface Add {
  showing_modal: boolean;
  date: Date;
  show(date: Date | null): void;
  hide(): void;
  getDate(): Date;
  getShowing(): boolean;
}

export const add = reactive<Add>({
  showing_modal: false,
  date: new Date(),
  getDate(): Date {
    return this.date;
  },
  hide(): void {
    this.showing_modal = false;
  },
  show(date: Date | null): void {
    this.showing_modal = true;
    if (date) {
      this.date = date;
    }
  },
  getShowing(): boolean {
    return this.showing_modal;
  },
});
