import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme'
import Card from '../src/js/components/bulma/card';
import { splitTextKeyToArray } from '../src/js/lib/splits';

describe('initial tests', () => {
  describe('card tests', () => {
    it('should render with title prop', () => {
      const wrap = mount(<Card title='test' />);
      const html = wrap.html();
      expect(html.indexOf('<div') !== -1).to.equal(true);
    });

    it('should NOT render without title prop', () => {
      const wrap = mount(<Card title='' />);
      const html = wrap.html();
      expect(!!html).to.equal(false);
    });

    it('should render a footer with footer prop', () => {
      const wrap = mount(<Card title='test' />);
      const html = wrap.html();
      expect(html.indexOf('<footer') === -1).to.equal(true);
    });

    it('should NOT render a footer without footer prop', () => {
      const wrap = mount(<Card footer='test' title='test' />);
      const html = wrap.html();
      expect(html.indexOf('<footer') !== -1).to.equal(true);
    });
  });

  describe('split tests', () => {
    const deepPath = { deep: { time: { path: "123Z789" } } };
    const shallowPath = { startTime: "123T456T789" };
    it('should return empty array', () => {
      const emptyArray = splitTextKeyToArray();
      expect(emptyArray.length).to.equal(0);
    });

    it('should return array of 3 from shallow path', () => {
      const array = splitTextKeyToArray(shallowPath, 'startTime', 'T');
      expect(array.length).to.equal(3);
    });

    it('should return array of 2 from deep path', () => {
      const array = splitTextKeyToArray(deepPath, 'deep.time.path', 'Z');
      expect(array.length).to.equal(2);
    });
  });
});