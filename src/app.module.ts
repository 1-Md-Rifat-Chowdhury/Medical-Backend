import { Module } from '@nestjs/common';
import { AdminModule } from './admin/module/adminmodule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module
(
  {
    imports: 
    [AdminModule, TypeOrmModule.forRoot
      (
        {
          type:            'postgres',
          host:            'localhost',
          port:             5432,
          username:        'postgres',
          password:        'root',
          database:        'Medical',
          autoLoadEntities: true,
          synchronize:      true,
        }
      ),

      ServeStaticModule.forRoot
      (
        {
          rootPath: join(__dirname, '..','../public'),
          serveRoot: '/public'
        }
      ),
    
    
    ],


    controllers: [],
    providers: [],
  }
)
export class AppModule {}
