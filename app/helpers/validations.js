
/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
 const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
  };

/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
 const isEmpty = (input) => {
    if (input === undefined || input === '') {
      return true;
    }
    if (input.replace(/\s/g, '').length) {
      return false;
    } return true;
  };




  module.exports = {
    isValidEmail,
    isEmpty,
  };
  