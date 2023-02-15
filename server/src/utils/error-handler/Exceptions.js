class InvalidArgumentError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = 'InvalidArgumentError';
  }
}

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
    this.name = 'Unauthorized';
  }
}

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
    this.name = 'Forbidden ';
  }
}

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.name = 'NotFound';
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
    this.name = 'InternalServerError';
  }
}

module.exports = {
  InvalidArgumentError,
  NotFound,
  Unauthorized,
  Forbidden,
  InternalServerError,
};
