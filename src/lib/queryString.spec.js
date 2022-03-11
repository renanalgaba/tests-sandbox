const { queryString, parse } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when a object is provided', () => {
    const obj = {
      name: 'Renan',
      profession: 'developer',
    };

    queryString(obj);
    expect(queryString(obj)).toBe('name=Renan&profession=developer');
  });

  it('should create a alid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Renan',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Renan&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Renan',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should conert a query string to object', () => {
    const qs = 'name=Renan&profession=developer';
    expect(parse(qs)).toEqual({
      name: 'Renan',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const qs = 'name=Renan';
    expect(parse(qs)).toEqual({
      name: 'Renan',
    });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Renan&abilities=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'Renan',
      abilities: ['JS', 'TDD'],
    });
  });
});
