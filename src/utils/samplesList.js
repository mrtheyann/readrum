import samplesJson from '../config/samplesList.json';

const samplesList = () => samplesJson.samples.map(sample => ({
  ...sample,
  url: `${process.env.PUBLIC_URL}${sample.url}`,
}));

export default samplesList;
