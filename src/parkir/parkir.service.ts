import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateParkirDto } from './dto/create-parkir.dto';
import { UpdateParkirDto } from './dto/update-parkir.dto';
import { FindParkirDto } from './dto/find-parkir.dto';

@Injectable()
export class ParkirService {
  constructor(private prisma: PrismaService) { }

  // Create Data Parkir with Total Tarif Calculation
  async create(dto: CreateParkirDto) {
    // Menghitung Total Tarif
    const tarifJamPertama =
      dto.jenis_kendaraan === 'roda2' ? 3000 : 6000;
    const tarifPerJamSelanjutnya =
      dto.jenis_kendaraan === 'roda2' ? 2000 : 4000;

    let totalTarif = 0;
    if (dto.durasi === 1) {
      totalTarif = tarifJamPertama;
    } else if (dto.durasi > 1) {
      totalTarif = tarifJamPertama + (dto.durasi - 1) * tarifPerJamSelanjutnya;
    }

    const data = await this.prisma.parkir.create({
      data: {
        ...dto,
        totalTarif,
      },
    })

    return {
      success: true,
      message: 'Data Parkir berhasil ditambahkan',
      data,
    }
  }

  async findAll(query: FindParkirDto) {
    const {
      search = '',
      jenis_kendaraan,
      page = 1,
      limit = 10,
    } = query;

    const skip = (page - 1) * limit;
    const where: any = {}
    // Search berdasarkan plat nomor
    if (search) {
      where.plat_nomor = { contains: search }
    }

    // Filter berdasarkan jenis kendaraan
    if (jenis_kendaraan) {
      where.jenis_kendaraan = jenis_kendaraan;
    }

    const data = await this.prisma.parkir.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    });

    const total = await this.prisma.parkir.count({ where });

    return {
      success: true,
      message: 'Data Parkir berhasil diambil',
      data,
      meta: {
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      }
    }
  }

  // Get detail dari Id
  async findOne(id: number) {
    const data = await this.prisma.parkir.findUnique({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException(`Data Parkir dengan ID ${id} tidak ditemukan`);
    }
    return {
      success: true,
      message: 'Data Parkir berhasil diambil',
      data,
    }
  }


  async totalPendapatan() {
    const total = await this.prisma.parkir.aggregate({
      _sum: { totalTarif: true },
    });

    return {
      success: true,
      message: 'Total pendapatan berhasil dihitung',
      totalPendapatan: total._sum.totalTarif ?? 0,
    }
  }

  async update(id: number, dto: UpdateParkirDto) {
    const existing = await this.prisma.parkir.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Data Parkir dengan ID ${id} tidak ditemukan`);
    }

    // Menghitung ulang total tarif setelah di update
    let totalTarif = existing.totalTarif;

    if (dto.durasi) {
      const tarifJamPertama =
        existing.jenis_kendaraan === 'roda2' ? 3000 : 6000;
      const tarifPerJamSelanjutnya =
        existing.jenis_kendaraan === 'roda2' ? 2000 : 4000;

      if (dto.durasi === 1) {
        totalTarif = tarifJamPertama;
      } else if (dto.durasi > 1) {
        totalTarif = tarifJamPertama + (dto.durasi - 1) * tarifPerJamSelanjutnya;
      }
    }

    const data = await this.prisma.parkir.update({
      where: { id },
      data: {
        ...dto,
        totalTarif,
      },
    });

    return {
      success: true,
      message: 'Data Parkir berhasil diupdate',
      data,
    };
  }

  async remove(id: number) {
    const existing = await this.prisma.parkir.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Data Parkir dengan ID ${id} tidak ditemukan`);
    }

    await this.prisma.parkir.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Data Parkir berhasil dihapus',
    };
  }
}
