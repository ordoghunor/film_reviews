import Filter from 'bad-words';

const filter = new Filter();
filter.addWords('segg', 'szar', 'fos', 'buzi', 'kurva', 'picsa', 'picsaja', 'szopd', 'baszd', 'seggem', 'seggfej', 'kibaszott', 'geci', 'fasz');
// Ez csak azert hogy ne nagyon lehessen csunyakat irni magyarul se. (Comment section)

export default filter;
