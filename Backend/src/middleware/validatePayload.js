const schemaValidation = (schema) => async (req, res, next) => {
  try {
    const { body: payload } = req;

    await schema.validateAsync(payload);
    next();
  } catch (error) {
    next({
      message: error.message,
      stack: error.stack,
    });
  }
};
module.exports = schemaValidation;
