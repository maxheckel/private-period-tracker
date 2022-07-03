import { reactive } from "vue";
import { decrypt, encrypt } from "@/services/crypto";

interface EncryptedDay {
  date: string;
  on_period: string;
  notes: string;
  flow: string | undefined;
  period_ended: string;
  uuid: string;
}

export interface DecryptedDay {
  date: Date;
  on_period: boolean;
  notes: string;
  flow: number | undefined;
  period_ended: boolean;
  uuid: string;
}
interface Days {
  days: EncryptedDay[];
  addDay(day: DecryptedDay): void;
  store(): void;
  load(): void;
  removeDay(day: DecryptedDay): void;
  updateDay(day: DecryptedDay): void;
  getDays(): DecryptedDay[];
}

function decryptDay(day: EncryptedDay): DecryptedDay {
  const decryptedDay = {} as DecryptedDay;
  decryptedDay.notes = decrypt(day.notes).replace(day.uuid + "|", "");
  decryptedDay.date = new Date(decrypt(day.date).replace(day.uuid + "|", ""));
  decryptedDay.on_period =
    decrypt(day.on_period).replace(day.uuid + "|", "") === "1";

  decryptedDay.period_ended =
    decrypt(day.period_ended).replace(day.uuid + "|", "") === "1";
  if (day.flow !== undefined) {
    decryptedDay.flow = +decrypt(day.flow).replace(day.uuid + "|", "");
  }
  decryptedDay.uuid = day.uuid;
  return decryptedDay;
}

function encryptDay(day: DecryptedDay) {
  const encrypted = {} as EncryptedDay;
  if (!day.uuid) {
    day.uuid = crypto.randomUUID();
  }
  encrypted.uuid = day.uuid;
  encrypted.date = encrypt(encrypted.uuid + "|" + day.date.toDateString());
  if (day.flow !== undefined) {
    encrypted.flow = encrypt(encrypted.uuid + "|" + day.flow.toString());
  }

  encrypted.notes = encrypt(encrypted.uuid + "|" + day.notes);
  encrypted.on_period = encrypt(
    encrypted.uuid + "|" + day.on_period ? "1" : "0"
  );

  encrypted.period_ended = encrypt(
    encrypted.uuid + "|" + (day.period_ended ? "1" : "0")
  );
  return encrypted;
}

export const days = reactive<Days>({
  days: [],

  store() {
    localStorage.setItem("days", JSON.stringify(this.days));
  },
  load() {
    const raw = localStorage.getItem("days");
    if (!raw) {
      return;
    }
    const daysData = JSON.parse(raw);
    this.days = [];
    daysData.forEach((day: EncryptedDay) => {
      this.days.push(day);
    });
  },
  addDay(day: DecryptedDay) {
    this.days.push(encryptDay(day));
    this.store();
  },
  updateDay(day: DecryptedDay) {
    for (let x = 0; x < this.days.length; x++) {
      if (this.days[x].uuid == day.uuid) {
        this.days[x] = encryptDay(day);
        return;
      }
    }
    this.store();
  },
  removeDay(day: DecryptedDay) {
    this.days = this.days.filter(function (check) {
      return check.uuid != day.uuid;
    });
    this.store();
  },
  getDays(): DecryptedDay[] {
    if (this.days.length === 0) {
      this.load();
    }
    const decrypted = [] as DecryptedDay[];
    this.days.forEach(function (day) {
      decrypted.push(decryptDay(day));
    });
    return decrypted;
  },
});
