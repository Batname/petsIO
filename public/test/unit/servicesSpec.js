describe('service', function() {
  beforeEach(module('petsIO'));

  describe('Auth', function() {
    it('should return current version', inject(function(Auth) {
      expect(Auth).toBeDefined();
    }));
  });
});