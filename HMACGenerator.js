const crypto = require('crypto');

class HMACGenerator {
  static generateHMAC(key, move) {
    return crypto.createHmac('sha256', key).update(move).digest('hex');
  }
}

module.exports = HMACGenerator;
