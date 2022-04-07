const corsList = [
  // firebase preview
  /\.web\.app$/,
];

if (process.env.APP_ENV !== 'prod') {
  corsList.push('http://localhost:3000');
}

module.exports = {
  corsList,
};
