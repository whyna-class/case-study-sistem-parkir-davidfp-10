-- CreateTable
CREATE TABLE `Parkir` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plat_nomor` VARCHAR(191) NOT NULL,
    `jenis_kendaraan` ENUM('roda2', 'roda4') NOT NULL,
    `durasi` INTEGER NOT NULL,
    `totalTarif` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
