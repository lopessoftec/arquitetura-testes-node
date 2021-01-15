import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

// toda vez que minha aplicação precisar de 'StorageProvider', irei mandar usar o DiskStorageProvider,
container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)
