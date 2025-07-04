import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadService } from './upload.service';
import { getAnyDay } from 'src/utils/date';
import * as fs from 'fs';

const uploadFilePath = './public/uploads';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 单文件上传
  @Post('single')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // 根据日期创建目录
          const datePath = getAnyDay();
          const dir = `${uploadFilePath}/${datePath}`;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.handleSingleFile(file);
  }

  // 多文件上传
  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: uploadFilePath,
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  uploadMultiple(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.uploadService.handleMultipleFiles(files);
  }

  // 上传分片
  @Post('chunk')
  @UseInterceptors(FileInterceptor('file'))
  async uploadChunk(
    @UploadedFile() file: Express.Multer.File,
    @Body('filename') filename: string, // 原始文件名
    @Body('fileHash') fileHash: string, // 文件唯一标识
    @Body('chunkIndex') chunkIndex: string, // 分片序号
  ) {
    return this.uploadService.handleChunkUpload(file, fileHash, chunkIndex);
  }

  // 合并分片
  @Post('merge')
  async mergeChunks(
    @Body('fileHash') fileHash: string,
    @Body('filename') filename: string,
    @Body('totalChunks') totalChunks: number,
  ) {
    return this.uploadService.handleMergeChunks(
      fileHash,
      filename,
      totalChunks,
    );
  }

  // 查询已上传的分片（用于断点续传）
  @Get('uploaded')
  getUploadedChunks(@Query('fileHash') fileHash: string) {
    return this.uploadService.getUploadedChunks(fileHash);
  }
}
