export default {
  url: process.env.NODE_ENV !== 'production' ?
    process.env.NODE_ENV === 'develop' ? '127.0.0.1:7001'
      : '127.0.0.1:7001' : '',
  res: location.href.split('#')[0] + '#',
};
