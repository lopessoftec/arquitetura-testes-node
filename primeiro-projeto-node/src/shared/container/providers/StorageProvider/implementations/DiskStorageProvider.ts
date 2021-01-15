import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider{
  public async saveFile(file: string): Promise<string>{
    // rename faz mover um arquivo de um lado para o outro
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, 'uploads', file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void>{
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    // verificar se arquivo existe
    try{
      // se encontrar o arquivo não irá entrar no cath
      await fs.promises.stat(filePath)
    }catch{
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
