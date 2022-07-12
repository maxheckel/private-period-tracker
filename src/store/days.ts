import { reactive } from "vue";
import { decrypt, encrypt, UUID } from "@/services/crypto";
const version = 4;

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
  decryptedDays: DecryptedDay[];
  loaded: boolean;

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
    day.uuid = UUID();
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
  decryptedDays: [],
  loaded: false,
  store() {
    console.log("storing");
    // localStorage.setItem("days", JSON.stringify(this.days));
    // We trust that the schema has already been built because it is loaded always before it's stored
    const request = window.indexedDB.open("ppt", version);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction("days", "readwrite"); // (1)
      const days = transaction.objectStore("days"); // (2)
      try {
        console.log('adding')
        days.put({ id: 1, data: JSON.stringify(this.days) });
      } catch (e) {
        console.log(e)
        days.add({ id: 1, data: JSON.stringify(this.days) });
      }

      console.log(this.days);
    };
    request.onerror = (err) => {
      console.log(err);
    };
  },
  load() {
    if (this.loaded) {
      return;
    }
    let raw = localStorage.getItem("days");
    // Load from indexedDB instead
    if (window.indexedDB) {
      const request = window.indexedDB.open("ppt", version);
      request.onupgradeneeded = (event) => {
        console.log("here");
        const db = event?.target?.result;
        const objectStore = db.createObjectStore("days", {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("data", "data", { unique: false });
        objectStore.transaction.oncomplete = () => {
          // We just created the database, if we have data, load it in
          if (!raw) {
            this.loaded = true;
            return;
          }
          const daysData = JSON.parse(raw);
          this.days = [];
          daysData.forEach((day: EncryptedDay) => {
            this.days.push(day);
          });
          const decrypted = [] as DecryptedDay[];
          this.days.forEach(function (day) {
            decrypted.push(decryptDay(day));
          });
          this.decryptedDays = decrypted;
          this.loaded = true;
          const transaction = db.transaction("days", "readwrite"); // (1)
          const days = transaction.objectStore("days"); // (2)
          days.add({ id: 1, data: JSON.stringify(this.days) });
        };
      };
      // Still load the data even if the schema already exists
      request.onsuccess = () => {
        console.log("loading - no creation")
        const db = request.result;
        const objectStore = db.transaction("days").objectStore("days");
        objectStore.openCursor().onsuccess = (event: any) => {
          const cursor = event.target.result;
          console.log(cursor);
          if (cursor) {
            raw = cursor.value.data;
            console.log("Loaded Database" + cursor.value.data);
            if (!raw) {
              this.loaded = true;
              return;
            }
            const daysData = JSON.parse(raw);
            this.days = [];
            daysData.forEach((day: EncryptedDay) => {
              this.days.push(day);
            });
            const decrypted = [] as DecryptedDay[];
            this.days.forEach(function (day) {
              decrypted.push(decryptDay(day));
            });
            this.decryptedDays = decrypted;
            this.loaded = true;
            const check = localStorage.getItem("days");
            if (check != null){

              this.store();
              // localStorage.removeItem("days");
            }
            cursor.continue();
          }
        };
      };
      if (!raw) {
        this.loaded = true;
        return;
      }
      const daysData = JSON.parse(raw);
      this.days = [];
      daysData.forEach((day: EncryptedDay) => {
        this.days.push(day);
      });
      const decrypted = [] as DecryptedDay[];
      this.days.forEach(function (day) {
        decrypted.push(decryptDay(day));
      });
      this.decryptedDays = decrypted;
      this.loaded = true;
    }

  },
  addDay(day: DecryptedDay) {
    if (!day.uuid) {
      day.uuid = UUID();
    }

    this.decryptedDays.every((check) => {
      // if it's the same day, remove the old day and replace it with the new
      if (
        day.date.getDate() == check.date.getDate() &&
        day.date.getMonth() == check.date.getMonth() &&
        day.date.getFullYear() == check.date.getFullYear()
      ) {
        this.removeDay(check);
        return false;
      }
      return true;
    });

    this.decryptedDays.push(day);
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
    for (let x = 0; x < this.decryptedDays.length; x++) {
      if (this.decryptedDays[x].uuid == day.uuid) {
        this.decryptedDays[x] = day;
        return;
      }
    }
    this.store();
  },
  removeDay(day: DecryptedDay) {
    this.days = this.days.filter(function (check) {
      return check.uuid != day.uuid;
    });
    this.decryptedDays = this.decryptedDays.filter(function (check) {
      return check.uuid != day.uuid;
    });
    this.store();
  },
  getDays(): DecryptedDay[] {
    if (this.decryptedDays.length > 0) {
      return this.decryptedDays;
    }
    if (this.days.length === 0 && !this.loaded) {
      this.load();
    }
    const decrypted = [] as DecryptedDay[];
    this.days.forEach(function (day) {
      decrypted.push(decryptDay(day));
    });
    this.decryptedDays = decrypted;
    return decrypted;
  },
});
