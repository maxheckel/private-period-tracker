import { reactive } from "vue";
import { decrypt, encrypt } from "@/services/crypto";

export interface BirthControlDecrypted {
  name: string;
  average_days: number;
  average_flow: number;
  active: boolean;
  uuid: string;
}

interface BirthControlEncrypted {
  name: string;
  average_days: string;
  average_flow: string;
  active: string;
  uuid: string;
}

interface BirthControlTracker {
  birthControls: BirthControlEncrypted[];
  load(): void;
  store(): void;
  getBirthControls(): BirthControlDecrypted[];
  getCurrentBirthControl(): BirthControlDecrypted | undefined;
  addBirthControl(bc: BirthControlDecrypted): void;
  removeBirthControl(bc: BirthControlDecrypted): void;
  updateBirthControl(bc: BirthControlDecrypted): void;
}

function encryptBirthControl(bc: BirthControlDecrypted): BirthControlEncrypted {
  const enc = {} as BirthControlEncrypted;
  if (!bc.uuid) {
    bc.uuid = crypto.randomUUID();
  }
  enc.uuid = bc.uuid;
  enc.active = encrypt(enc.uuid + "|" + enc.active ? "1" : "0");
  enc.name = encrypt(enc.uuid + "|" + enc.name);
  enc.average_days = encrypt(enc.uuid + "|" + enc.average_days);
  enc.average_flow = encrypt(enc.uuid + "|" + enc.average_flow);

  return enc;
}

function decryptBirthControl(bc: BirthControlEncrypted): BirthControlDecrypted {
  const dec = {} as BirthControlDecrypted;
  dec.active = decrypt(bc.active).replace(bc.uuid + "|", "") === "1";
  dec.average_flow = +decrypt(bc.average_flow).replace(bc.uuid + "|", "");
  dec.average_days = +decrypt(bc.average_days).replace(bc.uuid + "|", "");
  dec.name = decrypt(bc.name).replace(bc.uuid + "|", "");
  dec.uuid = bc.uuid;
  return dec;
}

export const birthControl = reactive<BirthControlTracker>({
  birthControls: [],
  addBirthControl(bc: BirthControlDecrypted): void {
    this.birthControls.push(encryptBirthControl(bc));
  },
  getBirthControls(): BirthControlDecrypted[] {
    const decrypted = [] as BirthControlDecrypted[];
    this.birthControls.forEach((enc) => {
      decrypted.push(decryptBirthControl(enc));
    })
    return decrypted;
  },
  getCurrentBirthControl(): BirthControlDecrypted | undefined {
    return this.getBirthControls().find((bc) => {
      return bc.active;
    });
  },
  removeBirthControl(bc: BirthControlDecrypted): void {
    this.birthControls = this.birthControls.filter(function (check) {
      return check.uuid != bc.uuid;
    });
  },
  updateBirthControl(bc: BirthControlDecrypted): void {
    for(let x = 0; x < this.birthControls.length; x++){
      if (this.birthControls[x].uuid == bc.uuid){
        this.birthControls[x] = encryptBirthControl(bc);
        return;
      }
    }
  },
  load(): void {
    const raw = localStorage.getItem("birthControls");
    if (!raw) {
      return;
    }
    const birthControlsData = JSON.parse(raw);
    this.birthControls = [];
    birthControlsData.forEach((birthControl: BirthControlEncrypted) => {
      this.birthControls.push(birthControl);
    });
  },
  store(): void {
    localStorage.setItem("birthControls", JSON.stringify(this.birthControls));
  },
});