const getCurrentTimeFormat = () => {
    const d = new Date();
    return `${d.toLocaleDateString('ro-RO')} ${d.toLocaleTimeString('ro-RO')}`;
  };
  
  module.exports = {
    getCurrentTimeFormat,
  };