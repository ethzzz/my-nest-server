import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private address: string;
  constructor(private configService: ConfigService) {
    this.address =
      `${this.configService.get<string>('ADDRESS')}:${this.configService.get<string>('PORT')}` ||
      'http://localhost:8888';
  }
  // 单文件上传
  handleSingleFile(file: Express.Multer.File) {
    return {
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalname: file.originalname,
    };
  }

  // 多文件上传
  handleMultipleFiles(files: Array<Express.Multer.File>) {
    return files.map((file) => ({
      url: `${this.address}/uploads/${file.filename}`,
      filename: file.filename,
      originalname: file.originalname,
    }));
  }

  // 上传分片
  async handleChunkUpload(
    file: Express.Multer.File,
    fileHash: string,
    chunkIndex: string,
  ) {
    const chunkDir = path.join('./uploads', fileHash);
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir, { recursive: true });
    }
    fs.renameSync(file.path, path.join(chunkDir, chunkIndex));
    return { message: 'chunk uploaded' };
  }

  // 合并分片
  async handleMergeChunks(
    fileHash: string,
    filename: string,
    totalChunks: number,
  ) {
    const chunkDir = path.join('./uploads', fileHash);
    const filePath = path.join('./uploads', filename);
    const writeStream = fs.createWriteStream(filePath);
    for (let i = 0; i < totalChunks; i++) {
      const chunkPath = path.join(chunkDir, String(i));
      const data = fs.readFileSync(chunkPath);
      writeStream.write(data);
      fs.unlinkSync(chunkPath);
    }
    writeStream.end();
    fs.rmdirSync(chunkDir);
    return { url: `/uploads/${filename}` };
  }

  // 查询已上传分片
  getUploadedChunks(fileHash: string) {
    const chunkDir = path.join('./uploads', fileHash);
    if (!fs.existsSync(chunkDir)) return [];
    return fs.readdirSync(chunkDir);
  }
}
