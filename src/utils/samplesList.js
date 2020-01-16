import originalList from '../config/samplesList.json';

const samplesList = () => originalList.samples.map(sample => ({
  ...sample,
  url: `${process.env.PUBLIC_URL}${sample.url}`,
}));

export default samplesList;
