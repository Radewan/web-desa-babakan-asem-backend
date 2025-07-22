import { StatusDesa } from "@prisma/client";
import { prismaClient } from "../application/database";

export async function seedPenduduk() {
  const seed = process.env.SEED_PENDUDUK === "true";
  if (!seed) return;
  await prismaClient.resident.createMany({
    data: [
      {
        title: "Laki-laki",
        amount: 650,
      },
      {
        title: "Perempuan",
        amount: 500,
      },
      {
        title: "Kepala Keluarga",
        amount: 300,
      },
      {
        title: "Anak-anak",
        amount: 400,
      },
    ],
  });
}

export async function seedSdgs() {
  const seed = process.env.SEED_SDGS === "true";
  if (!seed) return;
  await prismaClient.sdgs.createMany({
    data: [
      {
        name: "Tanpa Kemiskinan",
        progress: 75,
      },
      {
        name: "Tanpa Kelaparan",
        progress: 80,
      },
      {
        name: "Kesehatan & Kesejahteraan",
        progress: 85,
      },
      {
        name: "Pendidikan Berkualitas",
        progress: 90,
      },
      {
        name: "Kesetaraan Gender",
        progress: 70,
      },
      {
        name: "Air Bersih & Sanitasi",
        progress: 92,
      },
      {
        name: "Energi Bersih & Terjangkau",
        progress: 65,
      },
      {
        name: "Pekerjaan Layak & Ekonomi",
        progress: 78,
      },
      {
        name: "Infrastruktur & Inovasi",
        progress: 68,
      },
      {
        name: "Mengurangi Ketimpangan",
        progress: 60,
      },
      {
        name: "Kota & Komunitas Berkelanjutan",
        progress: 74,
      },
      {
        name: "Konsumsi Bertanggung Jawab",
        progress: 81,
      },
      {
        name: "Aksi Iklim",
        progress: 77,
      },
      {
        name: "Ekosistem Lautan",
        progress: 69,
      },
      {
        name: "Ekosistem Daratan",
        progress: 83,
      },
      {
        name: "Perdamaian & Keadilan",
        progress: 88,
      },
      {
        name: "Kemitraan untuk Tujuan",
        progress: 72,
      },
    ],
  });
}

export async function seedExtraIdm() {
  const seed = process.env.SEED_EXTRA_IDM === "true";
  if (!seed) return;
  await prismaClient.extraIdm.createMany({
    data: [
      {
        status_desa: StatusDesa.MAJU,
        sosial: 0.8,
        ekonomi: 0.8,
        lingkungan: 0.8,
      },
    ],
  });
}
