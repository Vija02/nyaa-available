const chai = require('chai');
const nyaa = require('../index.js');

describe('index', function() {
  describe('#checkEpisode()', function() {
    it('should return false when checking a non-existing episode', function() {
      nyaa.checkEpisode('Clannad', 24).then((res) => {
        chai.expect(res).to.be.false;
      });
    });
    it('should return true when checking an existing episode (Last episode)', function() {
      nyaa.checkEpisode('No Game No Life', 12).then((res) => {
        chai.expect(res).to.be.true;
      });
    });
    it('should return true when checking an existing episode (Episode < 10)', function() {
      nyaa.checkEpisode("K-On!", 3).then((res) => {
        chai.expect(res).to.be.true;
      });
    });
  });
  describe('#modifyTitle()', function() {
    it('should change season to Sx format', function() {
      chai.expect(nyaa.modifyTitle('Tales of Zestiria the X 2nd Season')).to.deep.equal('Tales of Zestiria the X S2');
    });
  });
});
