import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  static: true,
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  //redis: {
  // enable: false,
  //  package: 'egg-redis',
  //},
  io: {
    enable: true,
    package: 'egg-socket.io',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
};

export default plugin;
