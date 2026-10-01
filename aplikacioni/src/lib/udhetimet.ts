export type Udhetim = {
  id: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  vendtakimi: string;
  vende: number;
  shoferi: string;
};

export const udhetimet: Udhetim[] = [
  {
    id: "1",
    nisja: "Prishtinë",
    destinacioni: "Kolegji AAB",
    ora: "07:45",
    vendtakimi: "Stacioni i autobusëve",
    vende: 2,
    shoferi: "Arta",
  },
  {
    id: "2",
    nisja: "Fushë Kosovë",
    destinacioni: "Kolegji AAB",
    ora: "08:15",
    vendtakimi: "Te stacioni kryesor",
    vende: 1,
    shoferi: "Dreni",
  },
  {
    id: "3",
    nisja: "Lipjan",
    destinacioni: "Kolegji AAB",
    ora: "07:30",
    vendtakimi: "Qendra e qytetit",
    vende: 0,
    shoferi: "Blerimi",
  },
];

export function gjejUdhetimin(id: string) {
  return udhetimet.find((udhetim) => udhetim.id === id);
}
