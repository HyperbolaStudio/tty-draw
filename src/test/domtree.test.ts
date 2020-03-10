import {expect} from 'chai';
import { TTYDocument } from '../lib/layout/dom/TTYDocument';
import { TTYElement } from '../lib/layout/dom/TTYElement';
describe('DOMTree',()=>{
    it('unassigned should be null.',()=>{
        let doc = new TTYDocument();
        expect(doc.parent).to.be.not.ok;
        expect(doc.childNodes).to.be.empty;
        expect(doc.isConnected).to.be.false;
        expect(doc.nextSibling).to.be.not.ok;
        expect(doc.previousSibling).to.be.not.ok;
    });

    it('add element to tree.',()=>{
        // let doc = new TTYDocument();
        let root = new TTYElement('aa1');
        let elem1 = new TTYElement('bb1');
        root.appendChild(elem1);
        expect(elem1.isConnected).to.be.true;
        expect(elem1.parent).to.equal(root);
        expect(root.childNodes[0]).to.equal(elem1);
        let elem2 = new TTYElement('bb2');
        root.prependChild(elem2);
        expect(elem2.isConnected).to.be.true;
        expect(elem2.parent).to.equal(root);
        expect(root.childNodes[0]).to.equal(elem2);
        expect(root.childNodes[1]).to.equal(elem1);
        expect(elem2.nextSibling).to.equal(elem1);
        expect(elem1.previousSibling).to.equal(elem2);
        let elem3 = new TTYElement('bb3');
        let elem4 = new TTYElement('bb4');
        root.appendChild(elem3,elem4);
        expect(elem3.parent).to.equal(elem4.parent).and.equal(root);
        expect(root.childElements).to.have.members([elem2,elem1,elem3,elem4]);
        expect(elem4.previousElementSibling).to.equal(elem3);
        elem3.appendChild(elem4);
        expect(root.childElements).to.have.members([elem2,elem1,elem3]);
        expect(elem3.nextElementSibling).to.be.not.ok;
        expect(elem4.parent).to.equal(elem3);
        elem4.remove();
        expect(elem4.parent).to.be.not.ok;
        expect(elem4.isConnected).to.be.false;
        elem2.replaceWith(elem4);
        expect(root.childElements).to.have.members([elem4,elem1,elem3]);
        expect(elem4.parent).to.equal(root);
        expect(elem4.isConnected).to.be.true;
        expect(elem4.nextElementSibling).to.equal(elem1);

    });

    it('attributes',()=>{
        let elem = new TTYElement('aa1');
        elem.setAttribute('x','1');
        elem.setAttribute('y','2');
        elem.setAttribute('z','3');
        expect(elem.attributes[1][1]).to.equal('2');
        expect(elem.attributes).with.length(3);
        expect(elem.getAttribute('x')).to.equal('1');
        elem.setAttribute('y','4');
        expect(elem.getAttribute('y')).to.equal('4');
        elem.removeAttribute('z');
        expect(elem.getAttribute('z')).not.to.be.ok;
        elem.setAttribute('z','5');
        expect(elem.getAttribute('z')).to.equal('5');
    });

    it('id & class',()=>{
        let elem = new TTYElement('aa1');
        elem.id = 'xx';
        expect(elem.id).to.equal('xx');
        elem.id = null;
        expect(elem.id).to.equal(null);
        elem.className = 'aa bb cc';
        expect(elem.className).to.equal('aa bb cc');
        expect(elem.classList).to.have.members(['aa','bb','cc']);
        elem.classList = ['xx','yy'];
        expect(elem.className).to.equal('xx yy');
        elem.className = null;
        expect(elem.className).to.be.null;
    });

    it('getElementById',()=>{
        let root = new TTYElement('a');
        let elem1 = new TTYElement('b');
        elem1.id = 'x';
        let elem2 = new TTYElement('c');
        elem2.id = 'x';
        root.appendChild(elem1,elem2);
        expect(root.getElementById('x')).to.equal(elem1);
    });
});