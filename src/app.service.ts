import { Injectable } from '@nestjs/common';
import { Coodinate, Radius } from './dto/geojson.dto';
import { Point } from 'geojson';
import { PrismaService } from './prisma/prisma.service';
import { Location, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createLocation({ array }: Coodinate): Promise<Location> {
    const geojson: Point = {
      type: 'Point',
      coordinates: [array[0], array[1]],
    };
    const toDb: Prisma.InputJsonValue =
      geojson as unknown as Prisma.InputJsonValue;
    const result = await this.prisma.location.create({
      data: {
        name: 'test',
        coordinate: toDb,
      },
    });
    return result;
  }

  async getLocationFrom(
    { array }: Coodinate,
    { radius }: Radius,
  ): Promise<Location[]> {
    console.log(array);
    console.log(radius);
    const query = await this.prisma.$queryRaw<
      Location[]
    >`SELECT * FROM "Location" WHERE st_dwithin(st_geomfromgeojson(coordinate), st_setsrid(st_makepoint(${
      array[0]
    },${array[1]}), 4326),${parseFloat(radius)})`;
    console.log(query);

    return query;
  }
}
